import Counter from '../models/Counter'
import { CallInterface } from "@app/shared";
import * as Immutable from 'immutable';

export default class CounterFactory {

    static brandStatsFromOngoingCalls(calls: Immutable.Map<string, CallInterface>): Map<string, Counter> {

        return CounterFactory.fromOngoingCalls(
            'brand',
            calls
        );
    }

    static companyStatsFromOngoingCalls(calls: Immutable.Map<string, CallInterface>): Map<string, Counter> {

        return CounterFactory.fromOngoingCalls(
            'company',
            calls
        );
    }

    static companyStatsFromCarrierCalls(calls: Immutable.Map<string, CallInterface>): Map<string, Counter> {

        return CounterFactory.fromOngoingCalls(
            'carrierId',
            calls
        );
    }

    private static fromOngoingCalls(
        idField: string,
        calls: Immutable.Map<string, CallInterface>)
    : Map<string, Counter> {

        const statMap = new Map();

        calls.forEach((call) => {

            const id = call[idField];
            if (!statMap.has(id)) {
                statMap.set(
                    id,
                    new Counter(id)
                );
            }

            statMap.get(id).incrementCounter();
        });

        return statMap;
    }
}