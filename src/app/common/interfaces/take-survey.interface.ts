import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

export interface ITakeSurvey {
  surveyId?: DocumentReference;
  answers: IAnswer[];
  creationDate?: Date;
  score: number;
}

export interface IAnswer {
  questionId?: DocumentReference;
  options?: string | number | number[];
  isCorrect: boolean;
}
