import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap } from 'rxjs/operators';
import { getMySurveys, mySurveysFetched,mySurveysLoading } from '../actions/my-surveys.action';
import { ITakeSurvey } from '../../interfaces/take-survey.interface';
import {
    StorageService,
} from '../../services/storage.service';
import { MySurveyService } from '../../services/my-survey.service';

@Injectable()
export class MySurveysEffects {

    getMySurveys$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getMySurveys),
            mergeMap(({val}) => {
                return this._mySurveys.getMySurveysFromSurvey(val.id).pipe(
                    tap((data) => {
                        const takenSurveys = data.map((e) => {
                            const s: ITakeSurvey = e.payload.doc.data() as ITakeSurvey;
                            return s;
                        })
                        this.store.dispatch(mySurveysFetched({ val: takenSurveys }));
                    }),
                    map(() => mySurveysLoading({ val: false }))
                );
            })
        );
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private _storageService: StorageService,
        private _mySurveys: MySurveyService
    ) {}
}
