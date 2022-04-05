import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { DestroyService } from '../../common/services/destroy.service';
import { IUser } from '../../common/interfaces/user.interface';
import { UserService } from '../../common/services/user.service';
import { SurveyService } from '../../common/services/survey.service';
import { ISurvey } from '../../common/interfaces/survey.interface';

@Component({
    selector: 'app-add-survey-user',
    templateUrl: './add-survey-user.component.html',
    styleUrls: ['./add-survey-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddSurveyUserComponent implements OnInit {
    loading = false;

    _errorText = '';

    _user: IUser;

    surveys: ISurvey[];
    selectedSurveys: ISurvey[] = [];

    constructor(
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _userSurvey: UserService,
        private _surveyService: SurveyService
    ) {}

    @Input() set user(val) {
        this._user = val;
    }

    ngOnInit(): void {
        this.getSurveys();
        this._cd.markForCheck();
    }

    getSurveys() {
        this.loading = true;
        this.errorText = '';
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
            (error) => {
                this.errorText = error;
                this.loading = false;
                this._cd.markForCheck();
            }
        );
    }

    getTableSummary() {
        return `Total ${this.surveys ? this.surveys.length : 0} ${
            this.surveys && this.surveys.length > 1 ? 'Surveys' : 'Survey'
        }`;
    }

    set errorText(value) {
        this._errorText = value;
    }
}
