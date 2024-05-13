import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-create-new-job',
  templateUrl: './create-new-job.component.html',
  styleUrl: './create-new-job.component.css'
})
export class CreateNewJobComponent {

  job_title : string = '';
	brief_job_description : string = '';
	responsibilities : string = '';
	qualifications : string = '';
	benefits : string = '';
	company_name : string = '';
	location : string = '';
  seekers_id : string[] = [];

  constructor(private jobSrv: ServiceService){}

  CreateJob(){
    if(this.job_title == '') {
      alert('Please enter job_title');
      return;
    }
    if(this.qualifications == '') {
      alert('Please enter qualifications');
      return;
    }
    if(this.location == '') {
      alert('Please enter location');
      return;
    }

    this.jobSrv.createJob(this.job_title, this.brief_job_description, this.responsibilities, this.qualifications, this.benefits, this.company_name, this.location)
    this.job_title = '';
    this.brief_job_description = '';
    this.responsibilities = '';
    this.qualifications = '';
    this.benefits = '';
    this.company_name = '';
    this.location = '';
  }


}
