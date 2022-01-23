import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { SurveyService } from '../../common/services/survey.service';
import { ISurvey } from '../../common/interfaces/survey.interface';
import { DestroyService } from '../../common/services/destroy.service';

@Component({
    selector: 'app-add-update-survey',
    templateUrl: './add-update-survey.component.html',
    styleUrls: ['./add-update-survey.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddUpdateSurveyComponent implements OnInit {
    form: FormGroup;

    loading = false;

    _errorText = '';

    _survey: ISurvey;

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _surveyService: SurveyService
    ) {}

    @Input() set survey(val) {
        this._survey = val;
    }

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            name: [this._survey?.name, Validators.required],
            desc: [this._survey?.desc, Validators.required],
            passScore: [this._survey?.passScore, Validators.required],
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

    get getSurvey(): ISurvey | null {
        if (!this.form.valid) {
            return null;
        }
        const { name, desc, passScore } = this.form.controls;
        return {
            name: name.value,
            desc: desc.value,
            passScore: passScore.value,
            isConfigured: false,
        };
    }

    set errorText(value) {
        this._errorText = value;
    }
}
