import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../common/services/destroy.service';
import { IUser } from '../../common/interfaces/user.interface';
import { UserService } from '../../common/services/user.service';

@Component({
    selector: 'app-add-survey-user',
    templateUrl: './add-survey-user.component.html',
    styleUrls: ['./add-survey-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddSurveyUserComponent implements OnInit {
    form: FormGroup;

    loading = false;

    _errorText = '';

    _user: IUser;

    constructor(
      private _fb: FormBuilder,
      private _destroy$: DestroyService,
      private _cd: ChangeDetectorRef,
      private _userSurvey: UserService
    ) {}

    @Input() set user(val) {
        this._user = val;
    }

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {

    }

    formSubscribe() {

    }

    onValueChanged(data?: any) {
        if (!data) {
            return;
        }
        this.loading = false;
        this.errorText = '';
    }

    set errorText(value) {
        this._errorText = value;
    }
}
