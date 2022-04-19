import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ISurveyUser } from '../interfaces/survey-user.interface';
import { ISurvey } from '../interfaces/survey.interface';
import { COLLECTION_SURVEY } from './survey.service';
import { ROLES } from '../../main/constants';

export const COLLECTION_USERS = 'users';
export const COLLECTION_SURVEY_USER = 'survey_user';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    currentUser$ = new Subject<IUser>();

    private _currentUser: IUser;

    constructor(
        public firestore: AngularFirestore,
        public fireAuth: AngularFireAuth
    ) {}

    set currentUser(val: IUser) {
        this._currentUser = val;
        if (val) {
            this.currentUser$.next(val);
        }
    }

    getCurrentUser(): IUser {
        return this._currentUser;
    }

    isCurrentUserStudent(): boolean {
        return this._currentUser.roles.indexOf(ROLES.STUDENT) > -1;
    }

    getUsers() {
        return this.firestore.collection(COLLECTION_USERS).snapshotChanges();
    }

    getUser(user) {
        return this.firestore.collection(COLLECTION_USERS).doc(user.uid).ref.get();
    }

    saveUser(user: IUser) {
        return this.fireAuth
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                /* TODO : Call the SendVerificaitonMail() function when new user is created and returns promise */
                // this.sendVerificationMail();
                user.uid = result.user.uid;
                this.setUserAdditionalData(user);
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    setUserAdditionalData(user) {
        const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
            `users/${user.uid}`
        );
        const userData: IUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: null,
            emailVerified: false,
            roles: user.roles,
        };
        return userRef.set(userData, {
            merge: true,
        });
    }

    updateUser(user: IUser) {
        const id = user.id;
        delete user.id;
        return this.firestore.doc(`${COLLECTION_USERS}/` + id).update(user);
    }

    deleteUser(userId) {
        return this.firestore.doc(`${COLLECTION_USERS}/` + userId).delete();
    }

    saveSurveyUser(user: IUser, surveys: ISurvey[]) {
        const surveyUser: ISurveyUser = {
            userId: null,
            surveys: []
        };

        const userDoc = this.firestore
          .collection(COLLECTION_USERS)
          .doc(user.id);

        surveyUser.userId = userDoc.ref;

        surveys.forEach((value) => {
            const surveyDoc = this.firestore
              .collection(COLLECTION_SURVEY)
              .doc(value.id);
            surveyUser.surveys.push(surveyDoc.ref);
        });

        return this.firestore.collection(COLLECTION_SURVEY_USER).add(surveyUser);
    }
}
