// User mock data
import { IUser } from '../common/interfaces/user.interface';

export const MOCK_USERS_DATA: IUser[] = [
    {
        uid: '1',
        email: 'jackbing@gmail.com',
        roles: ['Customer'],
        displayName: 'Jack Bing',
    },
    {
        uid: '2',
        email: 'chandlerbing@gmail.com',
        roles: ['Customer'],
        displayName: 'Chandler Bing',
    },
    {
        uid: '3',
        email: 'appAdmin@gmail.com',
        roles: ['Admin'],
        displayName: 'Admin',
    },
];
