export default class Counter {

    constructor(
        private id: string,
        private counter: number = 0
    ) {}

    toArray(): Array<any> {
        return [
            this.getId(),
            this.getCounter()
        ];
    }

    getId(): string {
        return this.id;
    }

    getCounter(): number {
        return this.counter;
    }

    incrementCounter() {
        this.counter++;
        return this;
    }
}
