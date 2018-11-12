import { ListModule } from './list.module';

describe('FormModule', () => {
    let formModule: ListModule;

    beforeEach(() => {
        formModule = new ListModule();
    });

    it('should create an instance', () => {
        expect(formModule).toBeTruthy();
    });
});
