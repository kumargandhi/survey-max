import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ISurvey } from '../interfaces/survey.interface';

const COLLECTION_SURVEY = 'survey';

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(public firestore: AngularFirestore) {}

    getSurveys() {
        return this.firestore.collection(COLLECTION_SURVEY).snapshotChanges();
    }

    saveSurvey(survey: ISurvey) {
        return this.firestore.collection(COLLECTION_SURVEY).add(survey);
    }

    updateSurvey(survey: ISurvey) {
        // delete survey.id;
        return this.firestore
            .doc(`${COLLECTION_SURVEY}/` + survey.id)
            .update(survey);
    }

    deleteSurvey(surveyId) {
        return this.firestore.doc(`${COLLECTION_SURVEY}/` + surveyId).delete();
    }
}
