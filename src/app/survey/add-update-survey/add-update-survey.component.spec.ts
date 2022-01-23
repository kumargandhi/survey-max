import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSurveyComponent } from './add-update-survey.component';

describe('AddUpdateSurveyComponent', () => {
    let component: AddUpdateSurveyComponent;
    let fixture: ComponentFixture<AddUpdateSurveyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddUpdateSurveyComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddUpdateSurveyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
