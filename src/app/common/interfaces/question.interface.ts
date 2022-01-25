import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

export interface IQuestion {
    id?: string | number;
    type: string;
    question: string;
    // answer: string | number | IOption | IOption[];
    surveyId?: DocumentReference;
    creationDate?: Date;
}

export interface IOption {
    option: string;
    index: number;
}
