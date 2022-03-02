// User mock data
import { IUser } from '../common/interfaces/user.interface';
import { ROLES } from '../main/constants';

export const MOCK_USERS_DATA: IUser[] = [
    {
        uid: '1',
        email: 'jackbing@gmail.com',
        roles: [ROLES.STUDENT],
        displayName: 'Jack Bing',
    },
    {
        uid: '2',
        email: 'chandlerbing@gmail.com',
        roles: [ROLES.SUPER_ADMIN],
        displayName: 'Chandler Bing',
    },
    {
        uid: '3',
        email: 'appAdmin@gmail.com',
        roles: [ROLES.TEACHER],
        displayName: 'Admin',
    },
];
