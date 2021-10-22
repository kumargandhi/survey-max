export interface IUser {
    id: number;
    userName: string;
    roles: string[];
    displayName: string;
    email: string;
}

export let userIns = {
    id: null,
    userName: null,
    roles: [],
    displayName: null,
    email: null,
};
