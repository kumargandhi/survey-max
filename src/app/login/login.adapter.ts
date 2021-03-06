import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

const MOCK_USER_DATA = {
    userName: 'admin',
    roles: ['Admin'],
    displayName: 'Admin',
};

@Injectable({
    providedIn: 'root',
})
export class LoginAdapter {
    login(userName: string, password: string): Observable<any> {
        console.log('userName:' + userName + ', password:' + password);
        // TODO Use real data when API is ready
        if (userName === 'admin' && password === 'admin') {
            return of(MOCK_USER_DATA).pipe(delay(2000));
        } else {
            return throwError(
                'Login failed!, check username and password.'
            ).pipe(delay(2000));
        }
    }

    logout(): Observable<any> {
        // TODO Use real data when API is ready
        return of(true).pipe(delay(1000));
    }
}
