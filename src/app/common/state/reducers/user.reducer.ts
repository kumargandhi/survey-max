import { createReducer, on } from '@ngrx/store';

import { IUser } from '../../interfaces/user.interface';
import { saveUser } from '../actions/user.action';

export interface UserMgmtState {
  user: IUser;
}

export const initialState: UserMgmtState = {
    user: null
};

export const userMgmtReducer = createReducer(
    initialState,
    on(saveUser, (state, { val }): UserMgmtState => ({ ...state, user: val }))
);
