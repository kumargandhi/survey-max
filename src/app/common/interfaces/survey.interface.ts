export interface ISurvey {
    id?: string | number;
    name: string;
    desc: string;
    isConfigured: boolean;
    passScore: number;
}

export interface IQuestion {
    type: string;
    question: string;
    answer: string | number | IOption | IOption[];
}

export interface IOption {
    option: string;
    index: number;
}
