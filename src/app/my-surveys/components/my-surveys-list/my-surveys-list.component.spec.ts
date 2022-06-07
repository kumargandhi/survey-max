import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySurveysListComponent } from './my-surveys-list.component';

describe('MySurveysListComponent', () => {
    let component: MySurveysListComponent;
    let fixture: ComponentFixture<MySurveysListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MySurveysListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MySurveysListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
