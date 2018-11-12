import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { routerTransition } from '@app/router.animations';
import {Observable, interval} from 'rxjs';
import {scan, map, startWith, shareReplay, combineLatest, tap} from 'rxjs/operators';
import { WebsocketService } from '@shared/services/websocket.service';
import { CallInterface, CallEventType} from "@app/shared";
import * as Immutable from 'immutable';
import CountryStatFactory from './services/CountryStatFactory';
import CounterFactory from './services/CounterFactory'

@Component({
    selector: 'app-gcharts',
    templateUrl: './gcharts.component.html',
    styleUrls: ['./gcharts.component.scss'],
    animations: [routerTransition()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GchartsComponent implements OnInit, OnDestroy {

    private callsMessages$: Observable<CallInterface>;

    private onGoingCalls$: Observable<Immutable.Map<string, CallInterface>>;

    onGoingCallStats$: Observable<Object>;

    onGoingCallsPerCompany$: Observable<any>;

    perCountryCalls$: Observable<Object>;

    callsPerBrand$: Observable<Object>;

    callsPerCompany$: Observable<Object>;

    callsPerCarrier$: Observable<Object>;

    private currentTime:number = 0;

    private timestemapInterval;

    constructor(
        private websocketService: WebsocketService,
        private cdr: ChangeDetectorRef
    ) {
        this.callsMessages$ = this
            .websocketService
            .asObservable();

        const initialValue = Immutable.Map<string, CallInterface>();
        this.onGoingCalls$ = this.callsMessages$.pipe(
            scan(
                this.ongoingCallReducer,
                initialValue
            ),
            startWith(initialValue),
            shareReplay()
        );

        this.onGoingCalls$.pipe(

        );

        this.onGoingCallStats$ = this.onGoingCalls$.pipe(
            combineLatest(interval(1000)),
            map(([onGoingCalls$, ]) => {
                return onGoingCalls$;
            }),
            scan(
                (acc: Map<any, any>, ongoingCalls: Immutable.Map<string, CallInterface>) => {
                    return this.countOngoingCalls(acc, ongoingCalls);
                },
                new Map()
            ),
            map(_ => this.callNumberTimeline(_))
        );

        this.onGoingCallsPerCompany$ = this.onGoingCalls$.pipe(
            map(
                this.sortOngoingCallsByCompany
            )
        );

        this.perCountryCalls$ = this.onGoingCalls$.pipe(
            map(
                this.ongoingCallsToCallsPerCountry
            )
        );

        this.callsPerBrand$ = this.onGoingCalls$.pipe(
            map(
                this.ongoingCallsToBrandStats
            )
        );

        this.callsPerCompany$ = this.onGoingCalls$.pipe(
            map(
                this.ongoingCallsToCompanyStats
            )
        );


        this.callsPerCarrier$ = this.onGoingCalls$.pipe(
            map(
                this.ongoingCallsToCarrierStats
            )
        );

        this.keepCurrentTimestampUpdated();
    }

    ngOnInit() {}
    ngOnDestroy(): void {
        clearInterval(this.timestemapInterval);
    }

    private keepCurrentTimestampUpdated() {
        this.timestemapInterval = setInterval(
            () => {
                // @ts-ignore
                this.currentTime = parseInt(Date.now() / 1000, 10);
                this.cdr.detectChanges();
            },
            1000
        );
    }

    private callNumberTimeline(timeline: Map<any, any>): Object {

        const statHeader = ['Time', 'Calls'];
        const stats = [];
        // @ts-ignore
        const currentTimestamp = parseInt(Date.now() / 1000, 10);

        timeline.forEach(
            (value, timestamp) => {

                const iden = Math.abs(timestamp - currentTimestamp) + " ";
                stats.push([iden, value]);
            }
        );

        const response:any = {
            chartType: 'LineChart',
            options: {
                title: 'Call history',
                hAxis: {
                    title: 'Seconds ago'
                },
                vAxis: {
                    title: 'Max. concurrent calls',
                    minValue: 0
                }
            },
        };

        response.dataTable = stats.length
            ? [statHeader].concat(stats)
            : [['']];

        return response;
    }

    private countOngoingCalls(acc: Map<any, any>, ongoingCalls: Immutable.Map<string, CallInterface>): Map<any, any>
    {
        acc.set(this.currentTime, ongoingCalls.size);

        const secondsToRemember = 60;
        acc.forEach((value, timestamp) => {

            if ((timestamp + secondsToRemember) < this.currentTime) {
                acc.delete(timestamp);
            }
        });

        return acc;
    }

    private ongoingCallReducer(acc: Immutable.Map<string, CallInterface>, curr: CallInterface): Immutable.Map<string, CallInterface> {

        const idExists = acc.has(curr.callid);

        if (curr.Event === CallEventType.ANSWER) {

            if (idExists) {
                return acc;
            }

            return acc.set(
                curr.callid,
                curr
            );
        }

        if (!idExists) {
            return acc;
        }

        return acc.delete(curr.callid);
    }

    private sortOngoingCallsByCompany(onGoingCalls: Immutable.Map<string, CallInterface>): Object {

        const response = {};

        onGoingCalls.forEach(
            (call) => {

                const company = call.company;
                if (!response[company]) {
                    response[company] = [];
                }

                response[company].push(call);
            }
        );

        return response;
    }

    private ongoingCallsToCallsPerCountry(onGoingCalls: Immutable.Map<string, CallInterface>): Object {

        const statHeader = ['Country', 'Outgoing', 'Incoming'];
        const countryStats = [];
        const countryStatMap = CountryStatFactory.fromOngoingCalls(onGoingCalls);

        countryStatMap.forEach(
            (countryStat) => {
                countryStats.push(
                    countryStat.toArray()
                );
            }
        );

        const response:any = {
            chartType: 'GeoChart',
            options: {
                title: 'Call per country',
                keepAspectRatio: true,
                colorAxis: {colors: ['#78bc7c', '#456647']}
            },
        };

        response.dataTable = countryStats.length
            ? [statHeader].concat(countryStats)
            : [['']];

        return response;
    }

    private ongoingCallsToBrandStats(onGoingCalls: Immutable.Map<string, CallInterface>): Object {

        const statHeader = ['Brand', 'Calls in progress'];
        const brandStats = [];
        const brandStatMap = CounterFactory.brandStatsFromOngoingCalls(onGoingCalls);

        brandStatMap.forEach(
            (brandStat) => {
                brandStats.push(
                    brandStat.toArray()
                );
            }
        );

        const response:any = {
            chartType: 'PieChart',
            options: {'title': 'Calls per brand'},
        };

        response.dataTable = brandStats.length
            ? [statHeader].concat(brandStats)
            : [statHeader, [null, null]];

        return response;
    }

    private ongoingCallsToCompanyStats(onGoingCalls: Immutable.Map<string, CallInterface>): Object {

        const statHeader = ['Company', 'Calls in progress'];
        const companyStats = [];
        const companyStatMap = CounterFactory.companyStatsFromOngoingCalls(onGoingCalls);

        companyStatMap.forEach(
            (companyStat) => {
                companyStats.push(
                    companyStat.toArray()
                );
            }
        );

        const response:any = {
            chartType: 'PieChart',
            options: {'title': 'Calls per company'},
        };

        response.dataTable = companyStats.length
            ? [statHeader].concat(companyStats)
            : [statHeader, [null, null]];

        return response;
    }

    sortByIndex = (a, b) => {

        const aIsLower= parseInt(a.key, 10) < parseInt(b.key, 10);
        if (aIsLower) {
            return b.key;
        }

        return a.key;
    }

    private ongoingCallsToCarrierStats(onGoingCalls: Immutable.Map<string, CallInterface>): Object {

        const statHeader = ['Carrier', 'Calls in progress'];
        const companyStats = [];
        const companyStatMap = CounterFactory.companyStatsFromCarrierCalls(onGoingCalls);

        companyStatMap.forEach(
            (companyStat) => {
                companyStats.push(
                    companyStat.toArray()
                );
            }
        );

        const response:any = {
            chartType: 'PieChart',
            options: {'title': 'Calls per carrier'},
        };

        response.dataTable = companyStats.length
            ? [statHeader].concat(companyStats)
            : [statHeader, [null, null]];

        return response;
    }
}
