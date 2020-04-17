import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';



import { Monitoring } from '../pages/monitoring/monitoring';
import { Controlling } from '../pages/controlling/controlling';
import { Blindspot } from '../pages/blindspot/blindspot';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

export const environment = {
  production: false,
  firebase: {
     apiKey: "AIzaSyDT-G3C1EuVzmMVZL38liYTZgOcpvhydnk",
    authDomain: "iotproject-a8e31.firebaseapp.com",
    databaseURL: "https://iotproject-a8e31.firebaseio.com",
    projectId: "iotproject-a8e31",
    storageBucket: "iotproject-a8e31.appspot.com",
    messagingSenderId: "986287686668",
    appId: "1:986287686668:web:4af9a3390857a626acda29"
  }
};

@NgModule({
  declarations: [
    MyApp,
    Monitoring,
    Controlling,
    Blindspot,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Monitoring,
    Controlling,
    Blindspot,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
