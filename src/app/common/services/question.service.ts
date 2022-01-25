import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IQuestion } from '../interfaces/question.interface';

const COLLECTION_QUESTION = 'question';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    constructor(public firestore: AngularFirestore) {}

    getQuestionsForSurvey(surveyId: string) {
        return this.firestore.collection(COLLECTION_QUESTION).snapshotChanges();
    }

    saveQuestion(question: IQuestion) {
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
