import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';

// Firebase
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData: any;
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private storageService: StorageService
    ) {
        this.setUserDataToStorage();
    }

    async setUserDataToStorage() {
        /* Saving user data in localstorage when logged in and setting up null when logged out */
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Sign in with email/password
    signIn(email, password) {
        return this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['/main']);
                });
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    // Sign up with email/password
    signUp(email, password) {
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
         up and returns promise */
                this.sendVerificationMail();
                this.setUserData(result.user);
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    // Send email verfificaiton when new user sign up
    sendVerificationMail() {
        //    return this.afAuth.currentUser.sendEmailVerification()
        //      .then(() => {
        //        this.router.navigate(['verify-email-address']);
        //      })
    }

    // Reset Forggot password
    forgotPassword(passwordResetEmail) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        // TODO : Below line is the original code, we need to check the emailVerified also so in PROD we need to uncomment below line.
        // return user !== null && user.emailVerified !== false ? true : false;
        return user !== null ? true : false;
    }

    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );
        const userData: IUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            roles: [],
        };
        return userRef.set(userData, {
            merge: true,
        });
    }

    // Sign out
    signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }
}
