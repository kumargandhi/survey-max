import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';

export const COLLECTION_SURVEY = 'user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(public firestore: AngularFirestore) {
    }
}
