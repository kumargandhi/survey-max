import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IQuestion } from '../interfaces/question.interface';
import { COLLECTION_SURVEY } from './survey.service';

const COLLECTION_QUESTION = 'question';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    constructor(public firestore: AngularFirestore) {}

    getQuestionsForSurvey(surveyId: string) {
        const surveyDoc = this.firestore
            .collection(COLLECTION_SURVEY)
            .doc(surveyId);
        return this.firestore
            .collection(COLLECTION_QUESTION, (ref) =>
                ref.where('surveyId', '==', surveyDoc.ref)
            )
            .snapshotChanges();
    }

    saveQuestion(question: IQuestion, surveyId: string) {
        const surveyDoc = this.firestore
            .collection(COLLECTION_SURVEY)
            .doc(surveyId);
        question.surveyId = surveyDoc.ref;
        return this.firestore.collection(COLLECTION_QUESTION).add(question);
    }

    updateQuestion(question: IQuestion) {
        const id = question.id;
        delete question.id;
        return this.firestore
            .doc(`${COLLECTION_QUESTION}/` + id)
            .update(question);
    }

    deleteQuestion(questionId) {
        return this.firestore
            .doc(`${COLLECTION_QUESTION}/` + questionId)
            .delete();
    }
}
