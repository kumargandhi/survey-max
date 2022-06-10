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
import { ActivatedRoute, Router } from '@angular/router';

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
        private _mySurveyService: MySurveyService,
        private _route: ActivatedRoute,
        private _router: Router,
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
        this._router.navigate([($event as ISurvey).id + '/take-survey'], {
            relativeTo: this._route.parent,
        });
    }

    showResultsClicked($event: ISurvey) {
        if (!$event) {
            return;
        }
        this._router.navigate([($event as ISurvey).id + '/survey-results'], {
            relativeTo: this._route.parent,
        });
    }
}
