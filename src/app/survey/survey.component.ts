import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    ActivatedRoute,
    Router,
    NavigationEnd,
    RouterEvent,
} from '@angular/router';
import { DestroyService } from '../common/services/destroy.service';
import { SURVEY_BREAD_CRUMBS } from '../main/constants';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class SurveyComponent implements OnInit {
    menu = SURVEY_BREAD_CRUMBS;

    surveyId: string;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        _router.events
            .pipe(takeUntil(this._destroy$))
            .pipe(filter((ev) => ev instanceof NavigationEnd))
            .subscribe((data: RouterEvent) => {
                if (data.url && data.url.indexOf('survey-list') > -1) {
                    this.menu[1].disabled = true;
                } else if (data.url && data.url.indexOf('question-list') > -1) {
                    this.updateMenuWithSurveyId();
                }
            });
    }

    ngOnInit(): void {}

    updateMenuWithSurveyId() {
        this.surveyId = this._route.snapshot.firstChild.params.surveyId;
        this.menu[1].routerLink = [`${this.surveyId}/question-list`];
        this.menu[1].disabled = false;
        this._cd.markForCheck();
    }
}
