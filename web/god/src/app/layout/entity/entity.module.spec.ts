import { EntityModule } from './entity.module';

describe('ApplicationServersModule', () => {
  let entityModule: EntityModule;

  beforeEach(() => {
    entityModule = new EntityModule();
  });

  it('should create an instance', () => {
    expect(entityModule).toBeTruthy();
  });
});
