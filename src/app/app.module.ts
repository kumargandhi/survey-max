import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { CORE_PRIME_NG_MODULES } from './constants';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from './common/services/auth.service';

import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { userMgmtReducer } from './common/state/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './common/state/effects/user.effects';
import { MySurveysEffects } from './common/state/effects/my-surveys.effects';
import { mySurveysReducer } from './common/state/reducers/my-surveys.reducer';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ...CORE_PRIME_NG_MODULES,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        StoreModule.forRoot({
            router: routerReducer,
            userMgmt: userMgmtReducer,
            mySurveys: mySurveysReducer
        }, {}),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([UserEffects, MySurveysEffects])
    ],
    providers: [
        [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
        AuthService
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {}
