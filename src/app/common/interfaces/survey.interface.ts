export interface ISurvey {
  name: string;
  description: string;
}

export interface IQuestion {
  type: string;
  question: string;
  answer: string | number | IOption | IOption[]
}

export interface IOption {
  option: string;
  index: number;
}
