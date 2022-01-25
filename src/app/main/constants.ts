export const MENU_ITEMS = [
    {
        label: 'Dashboard',
        routerLink: ['dashboard'],
    },
    {
        label: 'Users',
        routerLink: ['users'],
    },
    {
        label: 'Survey',
        routerLink: ['survey'],
    },
];

export const SURVEY_BREAD_CRUMBS = [
    {
        label: 'Survey',
        routerLink: ['survey-list'],
        routerLinkActive: 'active',
    },
    {
        label: 'Questions',
        disabled: false,
        routerLink: ['question-list'],
        routerLinkActive: 'active',
    },
];
