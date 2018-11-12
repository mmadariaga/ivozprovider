import { EditModule } from './edit.module';

describe('FormModule', () => {
    let formModule: EditModule;

    beforeEach(() => {
        formModule = new EditModule();
    });

    it('should create an instance', () => {
        expect(formModule).toBeTruthy();
    });
});
