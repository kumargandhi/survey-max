import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { DestroyService } from '../common/services/destroy.service';
import { UserService } from '../common/services/user.service';
import { ISurveyUser } from '../common/interfaces/survey-user.interface';
import { filter, takeUntil } from 'rxjs/operators';
import { MySurveyService } from '../common/services/my-survey.service';
import { MY_SURVEY_BREAD_CRUMBS } from '../main/constants';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-my-surveys',
    templateUrl: './my-surveys.component.html',
    styleUrls: ['./my-surveys.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class MySurveysComponent implements OnInit {

    menu = MY_SURVEY_BREAD_CRUMBS;

    loading = false;

    errorText = '';

    surveyUser: ISurveyUser;

    surveyId: string;

    constructor(private _cd: ChangeDetectorRef,
                private _destroy$: DestroyService,
                private _userService: UserService,
                private _mySurveyService: MySurveyService,
                private _route: ActivatedRoute,
                private _router: Router) {
        _router.events
          .pipe(takeUntil(this._destroy$))
          .pipe(filter((ev) => ev instanceof NavigationEnd))
          .subscribe((data: RouterEvent) => {
              if (data.url && data.url.indexOf('my-surveys-list') > -1) {
                  this.menu[1].disabled = true;
              } else if (data.url && data.url.indexOf('take-survey') > -1) {
                  this.updateMenuWithSurveyId();
              }
          });

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

    updateMenuWithSurveyId() {
        this.surveyId = this._route.snapshot.firstChild.params.surveyId;
        this.menu[1].routerLink = [`${this.surveyId}/take-survey`];
        this.menu[1].disabled = false;
        this._cd.markForCheck();
    }
}
