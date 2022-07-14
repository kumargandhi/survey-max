import { createReducer, on } from '@ngrx/store';
import { ISurvey } from '../../interfaces/survey.interface';
import { ITakeSurvey } from '../../interfaces/take-survey.interface';
import { getMySurveys, mySurveysFetched, mySurveysLoading } from '../actions/my-surveys.action';

export interface MySurveysState {
  mySurveys: ITakeSurvey[];
  survey: ISurvey;
  loading: boolean;
}

export const initialState: MySurveysState = {
    mySurveys: [],
    survey: null,
    loading: false
};

export const mySurveysReducer = createReducer(
    initialState,
    on(getMySurveys, (state, { val }): MySurveysState => ({ ...state, survey: val })),
    on(mySurveysFetched, (state, { val }): MySurveysState => ({ ...state, mySurveys: val })),
    on(mySurveysLoading, (state, { val }): MySurveysState => ({ ...state, loading: val }))
);
