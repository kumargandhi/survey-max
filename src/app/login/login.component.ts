import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyService } from '../service/destroy.service';
import { takeUntil } from 'rxjs/operators';
import { LoginAdapter } from './login.adapter';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    loading = false;

    constructor(
        private _fb: FormBuilder,
        private _destroy$: DestroyService,
        private _loginAdapter: LoginAdapter,
        private _router: Router,
        private _cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
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
    }

    login() {
        const { username, password } = this.form.controls;
        this.loading = true;
        this._loginAdapter
            .login(username.value, password.value)
            .subscribe((data) => {
                console.log('User data - ' + JSON.stringify(data));
                this.loading = false;
                this._router.navigate(['dashboard']);
            });
    }
}
