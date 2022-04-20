import { Injectable } from '@angular/core';
import {
    AngularFirestore,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { COLLECTION_SURVEY_USER, COLLECTION_USERS } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class MySurveyService {
    constructor(
        public firestore: AngularFirestore,
        public fireAuth: AngularFireAuth
    ) {}

    getSurveysForUser(userId: string) {
        const userDoc = this.firestore.collection(COLLECTION_USERS).doc(userId);
        return this.firestore
            .collection(COLLECTION_SURVEY_USER, (ref) =>
                ref.where('userId', '==', userDoc.ref)
            )
            .snapshotChanges();
    }
}
