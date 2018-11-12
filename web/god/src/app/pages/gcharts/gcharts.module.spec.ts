import { GchartsModule } from './charts.module';

describe('ChartsModule', () => {
    let chartsModule: GchartsModule;

    beforeEach(() => {
        chartsModule = new GchartsModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
