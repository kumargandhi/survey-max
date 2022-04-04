import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSurveyUserComponent } from './add-survey-user.component';

describe('AddSurveyUserComponent', () => {
    let component: AddSurveyUserComponent;
    let fixture: ComponentFixture<AddSurveyUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddSurveyUserComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSurveyUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
