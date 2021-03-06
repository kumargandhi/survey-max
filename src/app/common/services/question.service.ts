import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IQuestion } from '../interfaces/question.interface';
import { COLLECTION_SURVEY, SurveyService } from './survey.service';
import { ISurvey } from '../interfaces/survey.interface';

const COLLECTION_QUESTION = 'question';
const COLLECTION_QUESTION_TYPES = 'question_types';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    constructor(public firestore: AngularFirestore, private surveyService: SurveyService) {}

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

    getQuestionTypes() {
        return this.firestore.collection(COLLECTION_QUESTION_TYPES).snapshotChanges();
    }

    saveQuestion(question: IQuestion, surveyId: string) {
        const surveyDoc = this.firestore
            .collection(COLLECTION_SURVEY)
            .doc(surveyId);
        let survey: ISurvey;
        surveyDoc.ref.get().then((doc) => {
            if (doc.exists) {
                survey = doc.data() as ISurvey;
                if (!survey.isConfigured) {
                    survey.isConfigured = true;
                    this.surveyService.updateSurvey({ ...survey, id: surveyId }).then(() => {
                        console.log('Survey updated as configured');
                    }).catch((error) => {
                        console.log('Survey updated as configured failed:', error);
                    });
                }
            } else {
                console.log('No such document survey!');
            }
        }).catch(function(error) {
            console.log('Error getting document survey:', error);
        });
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

    deleteQuestions(questionIds: string[]) {
        const docs = this.firestore.collection(COLLECTION_QUESTION)
          .ref.where('surveyId', '==', 'survey/' + questionIds[0])
          .get()
          .then((doc) => {
              console.log(doc);
          })
          .catch(function(error) {
              console.log('Error getting questions:', error);
          });
        console.log(docs);
        // docs.forEach(doc => doc.ref.delete());
    }

    getQuestionFromId(questionId) {
        return this.firestore.collection(COLLECTION_QUESTION).doc(questionId).ref;
    }
}
