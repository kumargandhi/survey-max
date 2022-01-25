import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import * as _ from 'lodash';
import { DestroyService } from '../common/services/destroy.service';
import { SURVEY_BREAD_CRUMBS } from '../main/constants';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class SurveyComponent implements OnInit {
    readonly SURVEY_BREAD_CRUMBS = SURVEY_BREAD_CRUMBS;
    defaultBreadCrumb = _.head(SURVEY_BREAD_CRUMBS);

    constructor(private _cd: ChangeDetectorRef) {}

    ngOnInit(): void {}
}
