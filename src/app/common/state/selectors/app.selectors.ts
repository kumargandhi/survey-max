import { UserMgmtState } from '../reducers/user.reducer';
import { createSelector } from '@ngrx/store';

export interface AppState {
    userMgmt: UserMgmtState;
}

export const selectUserMgmt = (state: AppState) => state.userMgmt;

export const selectUserMgmtUser = createSelector(
    selectUserMgmt,
    (state: UserMgmtState) => state.user
);
