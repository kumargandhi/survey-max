export interface IUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    emailVerified?: boolean;
    roles: string[];
}

export let userIns = {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    emailVerified: false,
    roles: [],
};
