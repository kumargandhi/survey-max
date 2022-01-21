import { Injectable } from '@angular/core';

// Firebase
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(public afs: AngularFirestore) {}

    getSurveys() {
        return this.afs.collection('survey').snapshotChanges();
    }
}
