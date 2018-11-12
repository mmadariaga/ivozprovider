import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GchartsComponent } from './gcharts.component';

describe('GchartsComponent', () => {
    let component: GchartsComponent;
    let fixture: ComponentFixture<GchartsComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [GchartsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GchartsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
