import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

export interface ITakeSurvey {
  surveyId?: DocumentReference;
  questionId?: DocumentReference | string;
  options?: string | number | number[];
}
