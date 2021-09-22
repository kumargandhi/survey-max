import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '../service/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private _fb: FormBuilder,
                private _destroy$: DestroyService,
                private _cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.formCreate();
        this.formSubscribe();
        this._cd.markForCheck();
    }

    formCreate() {
        this.form = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
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
}
