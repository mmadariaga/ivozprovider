import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CallInterface, AuthRequestInterface } from '@shared/interfaces';
import { environment as env } from '@env/environment';
import { AuthService } from "./auth.service";

@Injectable()
export class WebsocketService {

    private socket$: WebSocketSubject<any>;

    private sharedObservable$;

    constructor(
       private authService: AuthService
    ) {
        const wsUrl = `${env.ws.protocol}${window.location.hostname}:${env.ws.port}/${env.ws.endpoint}`;
        this.socket$ = new WebSocketSubject(wsUrl);

        this.connect(authService.getToken())
    }

    // public asObservable(): Observable<CallInterface> {
    //     return this.sharedObservable$;
    // }


    public asObservable(): Observable<CallInterface> {

        let fakeData = [
            {
                "Event": "answer",
                "time": 1541518691,
                "callid": "a571e776-4cbb-4099-b848-1d45e79debe3",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541519468,
                "callid": "7bc6e981-1466-4eb2-9f32-ca13e8af32c3",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+33",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "FR",
                "carrierId": "Movistar"
            },
            {
                "Event": "answer",
                "time": 1541522947,
                "callid": "48993981-2043-48bd-9229-c3bb3dce67c2",
                "brand": 'Nexus',
                "company": 'Ticketbis',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+44",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "UK",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541523183,
                "callid": "eeae093c-cd8f-44d8-b093-53a4cfb3e020",
                "brand": 'Nexus',
                "company": 'Ticketbis',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+44",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "UK",
                "carrierId": "Movistar"
            },
            {
                "Event": "answer",
                "time": 1541523885,
                "callid": "a74aeaff-c820-41cc-81e6-036d4110de7a",
                "brand": 'Nexus',
                "company": 'Travioor',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+33",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "FR",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541523958,
                "callid": "5dd01e9d-2314-47c5-b3f4-2e979e1d1515",
                "brand": 'Nexus',
                "company": 'Travioor',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541582439,
                "callid": "80a6a744-de53-4eb2-91f4-c271ce49c7d4",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+44",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "UK",
                "carrierId": "Movistar"
            },
            {
                "Event": "answer",
                "time": 1541584189,
                "callid": "f8ca54ff-57c7-4d6b-84ff-815d42dbcca6",
                "brand": 'Centrex',
                "company": 'Iberdrola',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+44",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "UK",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541585451,
                "callid": "ef3431dc-d54e-40ad-b0b2-41a088d05a6a",
                "brand": 'Centrex',
                "company": 'Iberdrola',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+34",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "ES",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541586156,
                "callid": "45531117-b125-47f6-af6e-52202dcbea29",
                "brand": 'Centrex',
                "company": 'BBVA',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+33",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "FR",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541586225,
                "callid": "9809e701-d4d1-426c-8fcb-2c0755726b92",
                "brand": 'Centrex',
                "company": 'BBVA',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+70",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "RU",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541593949,
                "callid": "9d41683e-50df-43b2-8cfc-e546da3bef93",
                "brand": 'Equinox',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+70",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "RU",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541595667,
                "callid": "211f99b8-ccb7-4eb1-b737-28dabb7fd40c",
                "brand": 'Equinox',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541600156,
                "callid": "0706c350-1a6b-43a1-ada0-8541372f707d",
                "brand": 'Equinox',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541601105,
                "callid": "f0a44922-2faa-4e59-9b3e-92f0eee9af96",
                "brand": 'Equinox',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+44",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "UK",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541601177,
                "callid": "779e7c9f-8300-4cd8-8c46-20ffd362f7be",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+33",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "FR",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541601281,
                "callid": "7aad6189-f31d-43b8-be17-85852b290dc8",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+33",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "FR",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541601614,
                "callid": "80827864-f2e6-428a-8379-75edc603eb10",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+33",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "FR",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541601800,
                "callid": "dd31a209-abc5-4151-b5b2-4e75c5fe0e88",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+54",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "AR",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541601855,
                "callid": "3ddaeec2-fcdc-4f33-bc3c-d7d4a5b1432a",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+54",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "AR",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541601997,
                "callid": "4af63509-2cb2-45f1-b0dc-58d5fe720608",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+19",
                "callee": "+70",
                "type": "vpbx",
                "caller_country": "US",
                "callee_country": "RU",
                "carrierId": "Pepephone"
            },
            {
                "Event": "answer",
                "time": 1541602116,
                "callid": "eebffdfb-f9bc-48e8-b0ad-130723b54ea0",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Movistar"
            },
            {
                "Event": "answer",
                "time": 1541602138,
                "callid": "dd8a76a6-cad9-4c91-afcd-7677ad5e4ef2",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541603897,
                "callid": "7407d2d8-47c8-4d81-a353-25bcf2e698f9",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Irontec"
            },
            {
                "Event": "answer",
                "time": 1541606613,
                "callid": "44d38ae3-0679-49cc-a439-33f98dab9759",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Movistar"
            },
            {
                "Event": "answer",
                "time": 1541607140,
                "callid": "309a77f1-83a7-4f9f-be90-c6e2189149c1",
                "brand": 'Nexus',
                "company": 'Irontec',
                "direction": "Outbound",
                "caller": "+34",
                "callee": "+16",
                "type": "vpbx",
                "caller_country": "ES",
                "callee_country": "US",
                "carrierId": "Pepephone"
            }
        ];
        let ongoingCalls = {};

        let fakeDataClone = fakeData.concat([]);

        const ids = [];

        const fakeObs = new Observable<CallInterface>(sub => {

            let timeout = null;

            // recursively send a random number to the subscriber
            // after a random delay
            (function push() {
                timeout = setTimeout(
                    () => {

                        if (fakeData.length < 1 && ids.length < 1) {
                            fakeData = fakeDataClone.concat([]);
                            ongoingCalls = {}

                            push();
                            return;
                        }

                        if (fakeData.length < 1) {



                            let id = ids.pop();
                            let value =  <CallInterface>{
                                "Event":"hangup",
                                "callid": id
                            };
                            sub.next(value);

                            fakeData.push(ongoingCalls[id]);
                            delete ongoingCalls[id];

                            push();
                            return;
                        }

                        let randomNum = Math.random() * 10;

                        if (randomNum < 5 &&  ids.length > 15) {



                            let id = ids.shift();
                            let value=  <CallInterface>{
                                Event: "hangup",
                                callid: id
                            };
                            sub.next(value);

                            fakeData.push(ongoingCalls[id]);
                            delete ongoingCalls[id];

                            push();
                            return;
                        }

                        let value = <CallInterface>fakeData.shift();
                        ids.push(value.callid);

                        // @ts-ignore
                        value.time = parseInt(Date.now()/1000, 10);

                        if (value.caller.length < 5) {
                            value.caller += ("" + Math.random()).substring(2, 10);
                            value.callee += ("" + Math.random()).substring(2, 10);
                        }

                        ongoingCalls[value.callid] = value;
                        sub.next(value);
                        push();
                    },
                    750
                );
            })();

            // clear any pending timeout on teardown
            return () => clearTimeout(timeout);
        });

        return fakeObs.pipe(
            shareReplay()
        );

        // return this.sharedObservable$;
     }


    private connect(token: string = 'API-TOKEN'): void {

        if (this.sharedObservable$) {
            return this.sharedObservable$;
        }

        const payload = <AuthRequestInterface> {
            Command: 'AUTH',
            AuthToken: token
        };
        this.socket$
            .next(payload);

        this.sharedObservable$ = this
            .socket$
            .asObservable()
            .pipe(
                map(_ => JSON.parse(_)),
                shareReplay()
            );
    }
}