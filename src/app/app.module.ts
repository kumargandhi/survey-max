import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        InputTextModule,
        PanelModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        TagModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
