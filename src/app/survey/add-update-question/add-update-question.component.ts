import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { head } from 'lodash';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormArray,
    FormControl,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { QuestionService } from '../../common/services/question.service';
import { IOption, IQuestion } from '../../common/interfaces/question.interface';
import { DestroyService } from '../../common/services/destroy.service';
import { IQuestionTypes } from '../../common/interfaces/question-types.interface';
import { QUESTION_TYPES } from '../../main/constants';

@Component({
    selector: 'app-add-update-question',
    templateUrl: './add-update-question.component.html',
    styleUrls: ['./add-update-question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddUpdateQuestionComponent implements OnInit {
    readonly QUESTION_TYPES = QUESTION_TYPES;

    form: FormGroup;

    loading = false;

    _errorText = '';

    _question: IQuestion;

    @Input() questionTypes: IQuestionTypes[];

    selectedOption = 0;

    isOptionSelected = false;

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _questionService: QuestionService
    ) {}

    @Input() set question(val) {
        this._question = val;
    }

    get question() {
        return this._question;
    }

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            type: [
                !this._question?.type
                    ? head(this.questionTypes).id
                    : this._question?.type,
                Validators.required,
            ],
            question: [this._question?.question, Validators.required],
        });
        this.initFormForOptions();
    }

    formSubscribe() {
        this.form.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((data) => this.onValueChanged(data));
        this.form.controls.type.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this.initFormForOptions();
            });
    }

    initFormForOptions() {
        this.cleanTheOptionsForm();
        if (
            this.form.controls.type.value === QUESTION_TYPES.RADIO ||
            this.form.controls.type.value === QUESTION_TYPES.MULTI_SELECT
        ) {
            this.form.addControl('options', this._fb.array([]));
            if (this.question) {
                // Add options to UI form for update
                const options = this.form.get('options') as FormArray;
                options.clear();
                const optionsData = this.question.options as IOption[];
                optionsData.forEach((item, index) => {
                    const getSelectedValue = () => {
                        if (
                            this.form.controls.type.value ===
                            QUESTION_TYPES.RADIO
                        ) {
                            if (item.selected) {
                                this.selectedOption = index;
                            }
                            return item.selected ? `selected${index}` : null;
                        } else {
                            return item.selected;
                        }
                    };
                    const option = new FormGroup({
                        selected: new FormControl(getSelectedValue()),
                        answer: new FormControl(item.answer, [
                            Validators.required,
                        ]),
                    });
                    options.push(option);
                });
            } else {
                this.addOption(true);
            }
            this._cd.markForCheck();
        } else if (this.form.controls.type.value === QUESTION_TYPES.YES_AND_NO) {
            this.form.addControl('options', this._fb.array([]));
            if (this.question) {
                // Add options to UI form for update
                const options = this.form.get('options') as FormArray;
                options.clear();
                const optionsData = this.question.options as IOption[];
                optionsData.forEach((item, index) => {
                    const getSelectedValue = () => {
                        if (item.selected) {
                            this.selectedOption = index;
                        }
                        return item.selected ? `selected${index}` : null;
                    };
                    const option = new FormGroup({
                        selected: new FormControl(getSelectedValue())
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

    get getQuestion(): IQuestion | null {
        if (!this.form.valid) {
            return null;
        }
        const { type, question } = this.form.controls;
        return {
            type: type.value,
            question: question.value,
            options: this.getOptions(),
        };
    }

    getOptions() {
        if (
            this.form.controls.type.value === QUESTION_TYPES.RADIO ||
            this.form.controls.type.value === QUESTION_TYPES.MULTI_SELECT ||
            this.form.controls.type.value === QUESTION_TYPES.YES_AND_NO
        ) {
            const options = this.form.get('options') as FormArray;
            const optionsData = options.getRawValue();
            optionsData.forEach((item, index) => {
                if (this.form.controls.type.value === QUESTION_TYPES.MULTI_SELECT) {
                    item.selected = !!item.selected;
                } else {
                    item.selected = index === this.selectedOption;
                }
            });
            return optionsData;
        } else {
            return null;
        }
    }

    set errorText(value) {
        this._errorText = value;
    }

    get optionsFormArray(): FormArray {
        return this.form.get('options') as FormArray;
    }

    addOption(isInit = false) {
        const options = this.form.get('options') as FormArray;
        const option = new FormGroup({
            selected: new FormControl(),
            answer: new FormControl('', [Validators.required]),
        });
        if (isInit && options.length > 0) {
            return;
        }
        options.push(option);
    }

    addOptionsForYesAndNo() {
        const options = this.form.get('options') as FormArray;
        const optionYes = new FormGroup({
            selected: new FormControl()
        });
        options.push(optionYes);
        const optionNo = new FormGroup({
            selected: new FormControl()
        });
        options.push(optionNo);
    }

    deleteOption(index: number) {
        const options = this.form.get('options') as FormArray;
        options.removeAt(index);
        this._cd.markForCheck();
    }

    optionClicked(index: number) {
        this.selectedOption = index;
        this.isOptionSelected = true;
    }

    getOptionsFormGroup(index: number): FormGroup {
        const options = this.form.get('options') as FormArray;
        return options.get('' + index) as FormGroup;
    }

    isOptionDeleteBtnDisabled() {
        const options = this.form.get('options') as FormArray;
        return options?.length === 1;
    }
}
