export interface IQuestion {
    id?: string | number;
    type: string;
    question: string;
    // answer: string | number | IOption | IOption[];
    surveyId: string | number;
    creationDate?: number;
}

export interface IOption {
    option: string;
    index: number;
}
