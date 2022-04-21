import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';
import { ISurvey } from '../../../common/interfaces/survey.interface';
import { SurveyService } from '../../../common/services/survey.service';
import { DestroyService } from '../../../common/services/destroy.service';

@Component({
    selector: 'app-my-survey-card',
    templateUrl: './my-survey-card.component.html',
    styleUrls: ['./my-survey-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class MySurveyCardComponent implements OnInit {
    _survey: ISurvey;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService
    ) {}

    @Input() set survey(val: DocumentReference) {
        if (val) {
            this._surveyService.getSurveyFromId(val.id).then((doc) => {
                if (doc.exists) {
                    this._survey = doc.data() as ISurvey;
                }
                this._cd.markForCheck();
            });
            this._cd.markForCheck();
        }
    }

    ngOnInit(): void {}
}
