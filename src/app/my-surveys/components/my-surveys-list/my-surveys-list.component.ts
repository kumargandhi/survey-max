import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { DestroyService } from '../../../common/services/destroy.service';
import { ISurveyUser } from '../../../common/interfaces/survey-user.interface';
import { UserService } from '../../../common/services/user.service';
import { MySurveyService } from '../../../common/services/my-survey.service';
import { ISurvey } from '../../../common/interfaces/survey.interface';

@Component({
    selector: 'app-my-surveys-list',
    templateUrl: './my-surveys-list.component.html',
    styleUrls: ['./my-surveys-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class MySurveysListComponent implements OnInit {
    loading = false;

    errorText = '';

    surveyUser: ISurveyUser;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
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

    ngOnInit(): void {}

    takeSurveyClicked($event: ISurvey) {
        if (!$event) {
            return;
        }
        // this.takeSurvey = $event as ISurvey;
    }

    showResultsClicked($event: ISurvey) {
        if (!$event) {
            return;
        }
        // this.takeSurvey = null;
        // this.resultSurvey = $event as ISurvey;
    }
}
