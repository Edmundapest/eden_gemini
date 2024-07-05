import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideOAuthClient } from 'angular-oauth2-oidc'
import { provideHttpClient } from '@angular/common/http'

import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { environment } from '../../environment'
import { FIREBASE_OPTIONS } from '@angular/fire/compat'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideOAuthClient(),
    provideHttpClient(),
    provideAnimationsAsync(),
    //provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    //provideFirestore(() => getFirestore()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
}
