import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-49e19","appId":"1:463069897060:web:a8e5d26a38d98584c25a71","storageBucket":"ring-of-fire-49e19.appspot.com","apiKey":"AIzaSyBAcZ0jvW66htavDmOJr01ax4Ynn-B53Sg","authDomain":"ring-of-fire-49e19.firebaseapp.com","messagingSenderId":"463069897060"})), provideFirestore(() => getFirestore())]
};
