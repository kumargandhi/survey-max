import { DocumentReference } from '@angular/fire/compat/firestore/interfaces';

export interface IQuestion {
    id?: string | number;
    type: number;
    question: string;
    options?: string | number | IOption | IOption[];
    surveyId?: DocumentReference;
    creationDate?: Date;
}

export interface IOption {
    selected: boolean;
    answer: string;
}
