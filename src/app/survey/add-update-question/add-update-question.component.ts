import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { QuestionService } from '../../common/services/question.service';
import { IQuestion } from '../../common/interfaces/question.interface';
import { DestroyService } from '../../common/services/destroy.service';

@Component({
    selector: 'app-add-update-question',
    templateUrl: './add-update-question.component.html',
    styleUrls: ['./add-update-question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddUpdateQuestionComponent implements OnInit {
    form: FormGroup;

    loading = false;

    _errorText = '';

    _question: IQuestion;

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _questionService: QuestionService
    ) {}

    @Input() set question(val) {
        this._question = val;
    }

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            type: [this._question?.type, Validators.required],
            question: [this._question?.question, Validators.required],
        });
    }

    formSubscribe() {
        this.form.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe((data) => this.onValueChanged(data));
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
        };
    }

    set errorText(value) {
        this._errorText = value;
    }
}
