import { createAction, props } from '@ngrx/store';
import { ISurvey } from '../../interfaces/survey.interface';
import { ITakeSurvey } from '../../interfaces/take-survey.interface';

export const mySurveysFetched = createAction(
    '[My surveys] my taken surveys fetched',
    props<{val: ITakeSurvey[]}>()
);

export const getMySurveys = createAction(
    '[My surveys] get my taken surveys',
    props<{val: ISurvey}>()
);

export const mySurveysLoading = createAction(
    '[API] Surveys loading',
    props<{ val: boolean }>()
);
