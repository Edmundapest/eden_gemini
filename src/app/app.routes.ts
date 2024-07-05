import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { AccessGuardService } from './access-guard.service'
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component'
import { HomePhotosComponent } from './home/home-photos/home-photos.component'
import { HomePhotosDebugComponent } from './home/home-photos-debug/home-photos-debug.component'
import { HomeThreeJsComponent } from './home/home-three-js/home-three-js.component'
import { HomePhotosBentoComponent } from './home/home-photos-bento/home-photos-bento.component'

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'HomePage' },
    children: [
      {
        path: '',
        component: HomeDashboardComponent,
        data: { animation: 'HomeDashboardPage' },
      },
      {
        path: 'dashboard',
        component: HomeDashboardComponent,
        data: { animation: 'HomeDashboardPage' },
      },
      {
        path: 'photos',
        component: HomePhotosComponent,
        data: { animation: 'HomePhotosPage' },
      },
      {
        path: 'photos-debug',
        component: HomePhotosDebugComponent,
        data: { animation: 'HomePhotosDebugPage' },
      },
      {
        path: 'photos-bento',
        component: HomePhotosBentoComponent,
        data: { animation: 'HomePhotosBentoPage' },
      },
      {
        path: 'three-js',
        component: HomeThreeJsComponent,
        data: { animation: 'HomeThreeJsPage' },
      },
    ],
  },
]
