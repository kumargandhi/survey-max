export const DEFAULT_MENU_ITEMS = [
    {
        label: 'Dashboard',
        routerLink: ['dashboard'],
    },
];

export const SUPER_ADMIN_MENU_ITEMS = [
    {
        label: 'Dashboard',
        routerLink: ['dashboard'],
    },
    {
        label: 'Survey',
        routerLink: ['survey'],
    },
    {
        label: 'Users',
        routerLink: ['users'],
    },
];

export const STUDENT_MENU_ITEMS = [
    {
        label: 'Dashboard',
        routerLink: ['dashboard'],
    },
    {
        label: 'My Surveys',
        routerLink: ['my-surveys'],
    },
];

export const SURVEY_BREAD_CRUMBS = [
    {
        label: 'Survey',
        routerLink: ['survey-list'],
    },
    {
        label: 'Questions',
        disabled: true,
        routerLink: [':surveyId/question-list'],
    },
];

export const MY_SURVEY_BREAD_CRUMBS = [
    {
        label: 'Surveys',
        routerLink: ['my-surveys-list'],
    },
    {
        label: 'Take Survey',
        disabled: true,
        routerLink: [':surveyId/take-survey'],
    },
    {
        label: 'Results',
        disabled: true,
        routerLink: [':surveyId/survey-results'],
    },
];

export enum QUESTION_TYPES {
    TEXT = 1,
    RADIO = 2,
    YES_AND_NO = 3,
    MULTI_SELECT = 4
}

export enum ROLES {
    SUPER_ADMIN = 'Super Admin',
    TEACHER = 'Teacher',
    STUDENT = 'Student'
}

export const PASSWORD_DUMMY_TEXT = 'PASSWORD_DUMMY_TEXT';
