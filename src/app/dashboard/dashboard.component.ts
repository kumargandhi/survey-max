import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { DestroyService } from '../common/services/destroy.service';
import { SurveyService } from '../common/services/survey.service';
import { ISurvey } from '../common/interfaces/survey.interface';
import { ROLES } from '../main/constants';
import { MySurveyService } from '../common/services/my-survey.service';
import { takeUntil } from 'rxjs/operators';
import { ISurveyUser } from '../common/interfaces/survey-user.interface';
import { UserService } from "../common/services/user.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class DashboardComponent implements OnInit {
    readonly ROLES = ROLES;
    loading = false;
    surveys: ISurvey[];
    surveyUser: ISurveyUser;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService,
        private _userService: UserService,
        private _mySurveyService: MySurveyService
    ) {
        this._mySurveyService.surveyUser$
        .pipe(takeUntil(this._destroy$))
        .subscribe((data) => {
            this.surveyUser = data;
            this._cd.markForCheck();
        });
    }

    ngOnInit(): void {
        this.getSurveys();
        if (this._userService.getCurrentUser()) {
            this._mySurveyService.getSurveysForCurrentUser();
            this._cd.markForCheck();
        }
    }

    getSurveys() {
        this.loading = true;
        this._surveyService.getSurveys().subscribe(
            (data) => {
                this.surveys = cloneDeep(
                    data.map((e) => {
                        const s: ISurvey = e.payload.doc.data() as ISurvey;
                        s.id = e.payload.doc.id;
                        return s;
                    })
                );
                this.loading = false;
                this._cd.markForCheck();
            },
            () => {
                this.loading = false;
                this._cd.markForCheck();
            }
        );
    }
}
