import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../common/services/user.service';
import { IUser } from '../../common/interfaces/user.interface';
import { DestroyService } from '../../common/services/destroy.service';
import { ROLES } from '../../main/constants';

const PASSWORD_DUMMY_TEXT = 'PASSWORD_DUMMY_TEXT';

@Component({
    selector: 'app-add-update-user',
    templateUrl: './add-update-user.component.html',
    styleUrls: ['./add-update-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AddUpdateUserComponent implements OnInit {
    form: FormGroup;

    loading = false;

    _errorText = '';

    _user: IUser;

    roles = Object.values(ROLES).map((item) => ({ id: item, label: item }));

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
        this.form = this._fb.group({
            email: [
                { value: this._user?.email, disabled: this._user?.email },
                Validators.required,
            ],
            password: [
                { value: this._user ? PASSWORD_DUMMY_TEXT : '', disabled: this._user },
                Validators.required,
            ],
            displayName: [this._user?.displayName, Validators.required],
            roles: [this._user?.roles[0], Validators.required],
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

    get getUser(): IUser | null {
        if (!this.form.valid) {
            return null;
        }
        const { email, password, displayName, roles } = this.form.controls;
        return {
            email: email.value,
            password: password.value,
            displayName: displayName.value,
            roles: [roles.value],
        };
    }

    set errorText(value) {
        this._errorText = value;
    }
}
