import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ISurvey } from '../interfaces/survey.interface';
import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

export const COLLECTION_SURVEY = 'survey';

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(public firestore: AngularFirestore) {}

    getSurveys() {
        return this.firestore.collection(COLLECTION_SURVEY).snapshotChanges();
    }

    getSurveyFromDoc(surveyDoc: DocumentReference): Promise<ISurvey | void> {
        return surveyDoc.get().then((doc) => {
            console.log('surveyDoc.get()!');
            if (doc.exists) {
                console.log('doc.exists');
                return doc.data() as ISurvey;
            } else {
                console.log('No such document survey!');
            }
        }).catch(function(error) {
            console.log('Error getting document survey:', error);
        });
    }

    getSurveyFromId(surveyId) {
        return this.firestore.collection(COLLECTION_SURVEY).doc(surveyId).ref.get();
    }

    saveSurvey(survey: ISurvey) {
        return this.firestore.collection(COLLECTION_SURVEY).add(survey);
    }

    updateSurvey(survey: ISurvey) {
        const id = survey.id;
        delete survey.id;
        return this.firestore.doc(`${COLLECTION_SURVEY}/` + id).update(survey);
    }

    deleteSurvey(surveyId) {
        return this.firestore.doc(`${COLLECTION_SURVEY}/` + surveyId).delete();
    }
}
