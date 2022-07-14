import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { IOption, IQuestion } from 'src/app/common/interfaces/question.interface';
import { IAnswer } from 'src/app/common/interfaces/take-survey.interface';
import { DestroyService } from 'src/app/common/services/destroy.service';
import { head } from 'lodash';

@Component({
    selector: 'app-question-result',
    templateUrl: './question-result.component.html',
    styleUrls: ['./question-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class QuestionResultComponent implements OnInit {

    _question: IQuestion;

    _answer: IAnswer;

    constructor(private _cd: ChangeDetectorRef) {}

    ngOnInit(): void {}

    @Input()
    set answer(answer: IAnswer) {
        if (answer) {
            this._answer = answer;
            this.getQuestion();
        }
    }

    getQuestion() {
        this._answer.questionId
            .get()
            .then((doc) => {
                if (doc.exists) {
                    this._question = doc.data() as IQuestion;
                    this._cd.markForCheck();
                } else {
                    console.log('No such document question!');
                }
            })
            .catch(function (error) {
                console.log('Error getting document question:', error);
            });
    }

    getOptionHighlight(option: IOption, i: number) {
        if (option.selected && i === head(this._answer.options)) {
            return 'text-success';
        } else if (option.selected && i !== head(this._answer.options)) {
            return 'text-success';
        } if (!option.selected && i === head(this._answer.options)) {
            return 'text-danger';
        } else if (option.selected) {
            return 'text-success';
        } else {
            return '';
        }
    }
}
