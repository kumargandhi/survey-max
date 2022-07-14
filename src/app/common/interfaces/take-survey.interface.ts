import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';
import { ISurvey } from './survey.interface';
import { IUser } from './user.interface';

export interface ITakeSurvey {
  surveyId?: DocumentReference;
  answers: IAnswer[];
  creationDate?: Date;
  score: number;
  userId?: DocumentReference;

  survey?: ISurvey;
  user?: IUser;
}

export interface IAnswer {
  questionId?: DocumentReference;
  options?: string | number | number[];
  isCorrect: boolean;
}
