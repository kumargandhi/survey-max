import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IUser } from '../common/interfaces/user.interface';
import { MOCK_USERS_DATA } from '../data/users';

@Injectable({
    providedIn: 'root',
})
export class UsersAdapter {
    getUsers(): Observable<IUser[]> {
        return of(MOCK_USERS_DATA).pipe(delay(2000));
    }
}
