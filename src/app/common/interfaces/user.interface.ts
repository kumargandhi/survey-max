import { ROLES } from '../../main/constants';

export interface IUser {
    id?: string;
    uid?: string;
    email: string;
    password?: string;
    displayName: string;
    photoURL?: string;
    emailVerified?: boolean;
    roles: ROLES[];
}
