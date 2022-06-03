import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';

export const saveUser = createAction(
    '[User mgmt] Save user',
    props<{val: IUser}>()
);

export const getUser = createAction(
    '[User mgmt] Get user',
);
