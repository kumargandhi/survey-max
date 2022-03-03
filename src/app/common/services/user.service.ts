import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { IUser } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const COLLECTION_USERS = 'users';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        public firestore: AngularFirestore,
        public fireAuth: AngularFireAuth
    ) {}

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
        // return this.fireAuth.createUserWithEmailAndPassword
        return this.firestore.doc(`${COLLECTION_USERS}/` + userId).delete()
          .then(() => {
              //
          })
          .catch((error) => {
              window.alert(error.message);
          });
    }
}
