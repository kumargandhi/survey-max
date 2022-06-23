import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { getMySurveys, mySurveysFetched,mySurveysLoading } from '../actions/my-surveys.action';
import { ITakeSurvey } from '../../interfaces/take-survey.interface';
import { MySurveyService } from '../../services/my-survey.service';
import { EMPTY, forkJoin } from 'rxjs';
import { SurveyService } from '../../services/survey.service';

@Injectable()
export class MySurveysEffects {

    getMySurveys$ = createEffect(() => 
        this.actions$.pipe(
            ofType(getMySurveys),
            mergeMap(({val}) => {
                return this._mySurveys.getMySurveysFromSurvey(val.id).pipe(
                    tap((data) => {
                        const items = data.map(e => e.payload.doc.data() as ITakeSurvey);
                        this.store.dispatch(
                            mySurveysFetched({ val: JSON.parse(JSON.stringify(items))})
                        );
                    }),
                    catchError(() => EMPTY),
                    map((data) => mySurveysLoading({ val: false}))
                )
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private _mySurveys: MySurveyService,
        private _surveyService: SurveyService
    ) {}
}
