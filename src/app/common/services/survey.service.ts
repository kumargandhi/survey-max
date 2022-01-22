import { Injectable } from '@angular/core';

// Firebase
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ISurvey } from '../interfaces/survey.interface';

const COLLECTION_SURVEY = 'survey';

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(public afs: AngularFirestore) {}

    getSurveys() {
        return this.afs.collection(COLLECTION_SURVEY).snapshotChanges();
    }

    saveSurvey(survey: ISurvey) {
        return this.afs.collection(COLLECTION_SURVEY).add(survey);
    }
}
