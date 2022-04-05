export interface ISurvey {
    id?: string;
    name: string;
    desc: string;
    isConfigured: boolean;
    passScore: number;
    creationDate?: number;
}
