import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CreateNewJobComponent } from './pages/create-new-job/create-new-job.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobListingComponent } from './pages/job-listing/job-listing.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { LoginComponent } from './pages/login/login.component';
import { MyJobsComponent } from './pages/my-jobs/my-jobs.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { SeekerHomeComponent } from './pages/seeker-home/seeker-home.component';
import { CompanyHomeComponent } from './pages/company-home/company-home.component';
import { SeekerProfileComponent } from './pages/seeker-profile/seeker-profile.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewJobComponent,
    HomeComponent,
    JobDetailsComponent,
    JobListingComponent,
    JobsComponent,
    LoginComponent,
    MyJobsComponent,
    RegistrationComponent,
    SeekerHomeComponent,
    CompanyHomeComponent,
    SeekerProfileComponent,
    CompanyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule,
    provideFirebaseApp(() => initializeApp({"projectId":"hciproject-b8011","appId":"1:78677101439:web:5eae78747ed90f8d16284a","storageBucket":"hciproject-b8011.appspot.com","apiKey":"AIzaSyBgMQYbSBeptwRP8pS5lpvFsFSJajJGTzU","authDomain":"hciproject-b8011.firebaseapp.com","messagingSenderId":"78677101439"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
