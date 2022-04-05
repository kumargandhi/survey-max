import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

export interface ISurveyUser {
    userId: DocumentReference;
    surveys: DocumentReference[];
}
