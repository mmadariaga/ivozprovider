import CountryStats from '../models/CountryStats'
import { CallInterface } from "@app/shared";
import * as Immutable from 'immutable';

export default class CountryStatFactory {

    static fromOngoingCalls(calls: Immutable.Map<string, CallInterface>): Map<string, CountryStats> {

        const statMap = new Map();

        calls.forEach((call) => {

            const callerCountry = call.caller_country;
            if (!statMap.has(callerCountry)) {
                statMap.set(
                    callerCountry,
                    new CountryStats(callerCountry)
                );
            }

            const calleeCountry = call.callee_country;
            if (!statMap.has(calleeCountry)) {
                statMap.set(
                    calleeCountry,
                    new CountryStats(calleeCountry)
                );
            }

            statMap.get(call.caller_country).addOutgoingCall();
            statMap.get(call.callee_country).addIncomingCall();
        });

        return statMap;
    }
}