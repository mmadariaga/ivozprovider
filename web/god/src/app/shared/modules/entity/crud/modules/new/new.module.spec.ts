import { NewModule } from './new.module';

describe('FormModule', () => {
    let formModule: NewModule;

    beforeEach(() => {
        formModule = new NewModule();
    });

    it('should create an instance', () => {
        expect(formModule).toBeTruthy();
    });
});
