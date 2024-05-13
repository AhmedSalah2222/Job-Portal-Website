import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CreateNewJobComponent } from './pages/create-new-job/create-new-job.component';
import { JobListingComponent } from './pages/job-listing/job-listing.component';
import { MyJobsComponent } from './pages/my-jobs/my-jobs.component';
import { SeekerHomeComponent } from './pages/seeker-home/seeker-home.component';
import { CompanyHomeComponent } from './pages/company-home/company-home.component';
import { SeekerProfileComponent } from './pages/seeker-profile/seeker-profile.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'seeker-home',
    component: SeekerHomeComponent
  },
  {
    path:'company-home',
    component: CompanyHomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'jobs',
    component:JobsComponent
  },
  {
    path:'job-detail/:id',
    component:JobDetailsComponent
  },
  {
    path:'new-job',
    component:CreateNewJobComponent
  },
  {
    path:'job-listing',
    component:JobListingComponent
  },
  {
    path:'seeker-profile',
    component:SeekerProfileComponent
  },
  {
    path:'company-profile',
    component:CompanyProfileComponent
  },
  {
    path:'my-jobs',
    component:MyJobsComponent
  },
  {
    path:'**',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
