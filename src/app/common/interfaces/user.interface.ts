import { ROLES } from '../../main/constants';

export interface IUser {
    uid?: string;
    email: string;
    password?: string;
    displayName: string;
    photoURL?: string;
    emailVerified?: boolean;
    roles: ROLES[];
}

export const userIns = {
    uid: null,
    email: null,
    password: null,
    displayName: null,
    photoURL: null,
    emailVerified: false,
    roles: [],
};
