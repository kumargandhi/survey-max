import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { cloneDeep, head, filter } from 'lodash';

import { DestroyService } from '../../../common/services/destroy.service';
import { ISurvey } from '../../../common/interfaces/survey.interface';
import { SurveyService } from '../../../common/services/survey.service';
import {
    IOption,
    IQuestion,
} from '../../../common/interfaces/question.interface';
import { QuestionService } from '../../../common/services/question.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { QUESTION_TYPES } from '../../../main/constants';
import { ConfirmationService } from 'primeng/api';
import { ITakeSurvey } from '../../../common/interfaces/take-survey.interface';

enum TakeSurveyActions {
    CANCEL_SURVEY,
    COMPLETE_SURVEY,
    NEXT_QUESTION,
    PREVIOUS_QUESTION,
}

@Component({
    selector: 'app-take-survey',
    templateUrl: './take-survey.component.html',
    styleUrls: ['./take-survey.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService, ConfirmationService],
})
export class TakeSurveyComponent implements OnInit {
    readonly QUESTION_TYPES = QUESTION_TYPES;

    readonly TakeSurveyActions = TakeSurveyActions;

    @Output() cancelClicked = new EventEmitter();

    _survey: ISurvey;

    loading = false;

    errorText = '';

    questions: IQuestion[];

    selectedQuestion: IQuestion;

    questionIndex = 1;

    form: FormGroup;

    selectedOption = 0;

    isOptionSelected = false;

    confirmationMessage = '';

    takeSurvey: ITakeSurvey[];

    constructor(
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyService,
        private _surveyService: SurveyService,
        private _questionService: QuestionService,
        private _confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {}

    @Input() set survey(val: ISurvey) {
        if (val) {
            this._survey = val;
            this.getQuestions();
            this._cd.markForCheck();
        }
    }

    formCreate() {
        this.takeSurvey = [];
        this.form = this._fb.group({});
        this.initFormForOptions();
    }

    formSubscribe() {
        this.form.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((data) => this.onValueChanged(data));
    }

    initFormForOptions() {
        this.cleanTheOptionsForm();
        if (
            this.selectedQuestion.type === QUESTION_TYPES.RADIO ||
            this.selectedQuestion.type === QUESTION_TYPES.MULTI_SELECT
        ) {
            this.form.addControl('options', this._fb.array([]));
            if (this.selectedQuestion) {
                // Add options to UI form for update
                const options = this.form.get('options') as FormArray;
                options.clear();
                const optionsData = this.selectedQuestion.options as IOption[];
                optionsData.forEach((item) => {
                    const option = new FormGroup({
                        selected: new FormControl(null),
                    });
                    options.push(option);
                });
            } else {
                this.addOption(true);
            }
            this._cd.markForCheck();
        } else if (this.selectedQuestion.type === QUESTION_TYPES.YES_AND_NO) {
            this.form.addControl('options', this._fb.array([]));
            if (this.selectedQuestion) {
                // Add options to UI form for update
                const options = this.form.get('options') as FormArray;
                options.clear();
                const optionsData = this.selectedQuestion.options as IOption[];
                optionsData.forEach((item) => {
                    const option = new FormGroup({
                        selected: new FormControl(null),
                    });
                    options.push(option);
                });
            } else {
                this.addOptionsForYesAndNo();
            }
            this._cd.markForCheck();
        } else {
            this.cleanTheOptionsForm();
        }
    }

    cleanTheOptionsForm() {
        this.selectedOption = 0;
        this.isOptionSelected = false;
        // Clean the options form
        if (!this.form.get('options')) {
            return;
        }
        const options = this.form.get('options') as FormArray;
        options.clear();
        this.form.removeControl('options');
        this._cd.markForCheck();
    }

    onValueChanged(data?: any) {
        if (!data) {
            return;
        }
        this.loading = false;
        this.errorText = '';
    }

    addOption(isInit = false) {
        const options = this.form.get('options') as FormArray;
        const option = new FormGroup({
            selected: new FormControl(),
        });
        if (isInit && options.length > 0) {
            return;
        }
        options.push(option);
    }

    addOptionsForYesAndNo() {
        const options = this.form.get('options') as FormArray;
        const optionYes = new FormGroup({
            selected: new FormControl(),
        });
        options.push(optionYes);
        const optionNo = new FormGroup({
            selected: new FormControl(),
        });
        options.push(optionNo);
    }

    getQuestions() {
        this.loading = true;
        this.errorText = '';
        this._questionService.getQuestionsForSurvey(this._survey.id).subscribe(
            (data) => {
                this.questions = cloneDeep(
                    data.map((e) => {
                        const s: IQuestion = e.payload.doc.data() as IQuestion;
                        s.id = e.payload.doc.id;
                        return s;
                    })
                );
                this.loading = false;
                this.selectedQuestion = head(this.questions);
                this.formCreate();
                this.formSubscribe();
                this._cd.markForCheck();
            },
            (error) => {
                this.errorText = error;
                this.loading = false;
                this._cd.markForCheck();
            }
        );
    }

    get optionsFormArray(): FormArray {
        if (!this.form) {
            return null;
        }
        return this.form.get('options') as FormArray;
    }

    getOptionsFormGroup(index: number): FormGroup {
        const options = this.form.get('options') as FormArray;
        return options.get('' + index) as FormGroup;
    }

    optionClicked(index: number) {
        this.selectedOption = index;
        this.isOptionSelected = true;
    }

    actionHandler(action: TakeSurveyActions) {
        switch (action) {
            case TakeSurveyActions.CANCEL_SURVEY: {
                this.cancelClicked.emit();
                break;
            }
            case TakeSurveyActions.NEXT_QUESTION: {
                if (!this.getOptions()) {
                    this.errorText = 'Select options';
                    return;
                }
                this.selectedQuestion = this.questions[this.questionIndex];
                this.questionIndex++;
                const takeSurvey: ITakeSurvey = {
                    surveyId: this.selectedQuestion.surveyId,
                    questionId: this.selectedQuestion.id,
                    options: this.getOptions(),
                };
                this.initFormForOptions();
                break;
            }
            case TakeSurveyActions.PREVIOUS_QUESTION: {
                this.questionIndex--;
                this.selectedQuestion = this.questions[this.questionIndex - 1];
                this.initFormForOptions();
                break;
            }
            case TakeSurveyActions.COMPLETE_SURVEY: {
                this.confirmationMessage = `Are you sure that you want to complete the Survey?`;
                this._confirmationService.confirm({
                    message: this.confirmationMessage,
                    accept: () => {
                        // TODO : Survey completed take action
                    },
                });
                break;
            }
            default:
                break;
        }
    }

    getOptions() {
        if (
            this.selectedQuestion.type === QUESTION_TYPES.RADIO ||
            this.selectedQuestion.type === QUESTION_TYPES.MULTI_SELECT ||
            this.selectedQuestion.type === QUESTION_TYPES.YES_AND_NO
        ) {
            const options = this.form.get('options') as FormArray;
            const optionsData = options.getRawValue();
            optionsData.forEach((item, index) => {
                if (
                    this.selectedQuestion.type === QUESTION_TYPES.MULTI_SELECT
                ) {
                    item.selected = !!item.selected;
                } else {
                    item.selected = index === this.selectedOption;
                }
            });
            return filter(optionsData, 'selected').length === 0
                ? null
                : filter(optionsData, 'selected');
        } else {
            return null;
        }
    }
}
