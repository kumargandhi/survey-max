import { UserMgmtState } from '../reducers/user.reducer';
import { createSelector } from '@ngrx/store';
import { MySurveysState } from '../reducers/my-surveys.reducer';

export interface AppState {
    userMgmt: UserMgmtState;
    mySurveys: MySurveysState
}

export const selectUserMgmt = (state: AppState) => state.userMgmt;
export const selectMySurveys = (state: AppState) => state.mySurveys;

export const selectUserMgmtUser = createSelector(
    selectUserMgmt,
    (state: UserMgmtState) => state.user
);
