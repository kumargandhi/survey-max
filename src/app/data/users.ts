// User mock data
import { IUser } from '../common/interfaces/user.interface';

export const MOCK_USERS_DATA: IUser[] = [
    {
        id: 1,
        userName: 'jack',
        roles: ['Customer'],
        displayName: 'Jack Bing',
        email: 'jackbing@gmail.com',
    },
    {
        id: 2,
        userName: 'chandler',
        roles: ['Customer'],
        displayName: 'Chandler Bing',
        email: 'chandlerbing@gmail.com',
    },
    {
        id: 3,
        userName: 'admin',
        roles: ['Admin'],
        displayName: 'Admin',
        email: 'appAdmin@gmail.com',
    },
];
