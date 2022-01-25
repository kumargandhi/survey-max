export interface ISurvey {
    id?: string | number;
    name: string;
    desc: string;
    isConfigured: boolean;
    passScore: number;
    creationDate?: number;
}
