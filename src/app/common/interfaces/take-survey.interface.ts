import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

export interface ITakeSurvey {
  surveyId?: DocumentReference;
  answers: IAnswer[];
  creationDate?: Date;
}

export interface IAnswer {
  questionId?: DocumentReference | string;
  options?: string | number | number[];
}
