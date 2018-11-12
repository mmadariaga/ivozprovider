export default class CountryStats {

    constructor(
        private county: string,
        private incoming: number = 0,
        private outcoming: number = 0
    ) {}

    toArray(): Array<any> {
        return [
            this.getCountry(),
            this.getOutgoingCalls(),
            this.getIncomingCalls()
        ];
    }

    getCountry(): string {
        return this.county;
    }

    getOutgoingCalls(): number {
        return this.outcoming;
    }

    addOutgoingCall() {
        this.outcoming++;
        return this;
    }

    getIncomingCalls(): number {
        return this.incoming;
    }

    addIncomingCall() {
        this.incoming++;
        return this;
    }

}
