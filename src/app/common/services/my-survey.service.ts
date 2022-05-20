import { Injectable } from '@angular/core';
import {
    AngularFirestore,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { cloneDeep, head } from 'lodash';
import { COLLECTION_SURVEY_USER, COLLECTION_USERS, UserService } from './user.service';
import { ITakeSurvey } from '../interfaces/take-survey.interface';
import { ISurveyUser } from '../interfaces/survey-user.interface';
import { Subject } from 'rxjs';

const COLLECTION_MY_SURVEYS = 'my_surveys';

@Injectable({
    providedIn: 'root',
})
export class MySurveyService {
    _surveyUser: ISurveyUser;

    surveyUser$ = new Subject<ISurveyUser>();

    _mySurveys: ITakeSurvey[];

    mySurveys$ = new Subject<ITakeSurvey[]>();

    constructor(
        public firestore: AngularFirestore,
        public fireAuth: AngularFireAuth,
        private _userService: UserService,
    ) {
        this._userService.currentUser$
          .subscribe(() => {
              this.getSurveysForCurrentUser();
          });
    }

    getSurveysForCurrentUser() {
        this.getSurveysForUser(this._userService.getCurrentUser().uid).subscribe(
            (data) => {
                this._surveyUser = head(cloneDeep(
                    data.map((e) => {
                        const s: ISurveyUser = e.payload.doc.data() as ISurveyUser;
                        return s;
                    }))
                );
                this.surveyUser$.next(this._surveyUser);
            },
            (error) => {
                console.log('getSurveysForCurrentUser-error-' + error);
            }
        );
    }

    getSurveysForUser(userId: string) {
        const userDoc = this.firestore.collection(COLLECTION_USERS).doc(userId);
        return this.firestore
            .collection(COLLECTION_SURVEY_USER, (ref) =>
                ref.where('userId', '==', userDoc.ref)
            )
            .snapshotChanges();
    }

    saveMySurvey(takeSurvey: ITakeSurvey) {
        takeSurvey.userId = this._userService.getUserDocumentFrommId(this._userService.getCurrentUser().uid);
        return this.firestore.collection(COLLECTION_MY_SURVEYS).add(takeSurvey);
    }

    getMySurveys(userId: string) {
        const userDoc = this.firestore.collection(COLLECTION_USERS).doc(userId);
        // const surveyDoc = this.firestore.collection(COLLECTION_SURVEY).doc(surveyId);
        return this.firestore
          .collection(COLLECTION_MY_SURVEYS, (ref) =>
              ref.where('userId', '==', userDoc.ref)
              // .where('surveyId', '==', surveyDoc.ref)
          )
          .snapshotChanges();
    }

    getMySurveysForCurrentUser() {
        this.getMySurveys(this._userService.getCurrentUser().uid).subscribe(
            (data) => {
                this._mySurveys = cloneDeep(
                    data.map((e) => {
                        const s: ITakeSurvey = e.payload.doc.data() as ITakeSurvey;
                        return s;
                    })
                );
                this.mySurveys$.next(this._mySurveys);
            },
            (error) => {
                console.log('getMySurveysForCurrentUser-error-' + error);
            }
        );
    }
}
