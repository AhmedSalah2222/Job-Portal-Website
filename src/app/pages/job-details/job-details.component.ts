import { Component, Inject, OnInit } from '@angular/core';
import { ServiceService, Job } from '../../services/service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  jobs: Job[] = [];
  selectedFile: File | null = null;
  selectedJob: Job = {} as Job;

  constructor(private route: ActivatedRoute, private firebaseService: ServiceService, private firestorage: AngularFireStorage, private firestore: AngularFirestore, private fireauth : AngularFireAuth) { }

  ngOnInit(): void {
    // Get the job ID from the route parameters
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      this.firebaseService.getJobDetails(jobId).subscribe(job => {
        this.selectedJob = job;
      });
    });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.firebaseService.uploadFile(this.selectedFile)
    }
  }



}
