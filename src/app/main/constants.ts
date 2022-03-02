export const MENU_ITEMS = [
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
