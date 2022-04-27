import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { cloneDeep, head } from 'lodash';
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
        this._userService.currentUser$
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
              this.getSurveysForUser();
          });
    }

    ngOnInit(): void {
        if (this._userService.getCurrentUser()) {
            this.getSurveysForUser();
        }
    }

    getSurveysForUser() {
        this.loading = true;
        this.errorText = '';
        this._mySurveyService.getSurveysForUser(this._userService.getCurrentUser().uid).subscribe(
            (data) => {
                this.surveyUser = head(cloneDeep(
                    data.map((e) => {
                        const s: ISurveyUser = e.payload.doc.data() as ISurveyUser;
                        return s;
                    }))
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
