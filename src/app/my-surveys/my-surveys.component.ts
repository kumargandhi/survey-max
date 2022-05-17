import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { DestroyService } from '../common/services/destroy.service';
import { UserService } from '../common/services/user.service';
import { ISurveyUser } from '../common/interfaces/survey-user.interface';
import { takeUntil } from 'rxjs/operators';
import { MySurveyService } from '../common/services/my-survey.service';
import { ISurvey } from '../common/interfaces/survey.interface';

@Component({
    selector: 'app-my-surveys',
    templateUrl: './my-surveys.component.html',
    styleUrls: ['./my-surveys.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class MySurveysComponent implements OnInit {

    loading = false;

    errorText = '';

    surveyUser: ISurveyUser;

    takeSurvey: ISurvey;

    constructor(private _cd: ChangeDetectorRef,
                private _destroy$: DestroyService,
                private _userService: UserService,
                private _mySurveyService: MySurveyService) {
        this._mySurveyService.surveyUser$
          .pipe(takeUntil(this._destroy$))
          .subscribe((data) => {
              this.surveyUser = data;
              this._cd.markForCheck();
          });
    }

    ngOnInit(): void {
        if (this._userService.getCurrentUser()) {
            this._mySurveyService.getSurveysForCurrentUser();
            this._cd.markForCheck();
        }
    }

    takeSurveyClicked($event: ISurvey) {
        if (!$event) {
            return;
        }
        this.takeSurvey = $event as ISurvey;
    }

    takeSurveyCancelled($event) {
        this.takeSurvey = null;
    }

}
