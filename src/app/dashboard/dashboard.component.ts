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

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService
    ) {}

    ngOnInit(): void {
        this.getSurveys();
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
