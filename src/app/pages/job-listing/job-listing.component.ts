import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.css'
})
export class JobListingComponent implements OnInit {
  jobs: any[] = [];
  id: string = '';

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    const collectionName = 'Jobs';
    const fields = ['job_title', 'company_name', 'location', 'brief_job_description'];

    this.firestore.collection(collectionName).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any; // Type assertion
          const id = a.payload.doc.id;
          const filteredData: any = {};
          fields.forEach(field => {
            if (data.hasOwnProperty(field)) {
              filteredData[field] = data[field];
            }
          });
          return { id,...filteredData };
        });
      })
    ).subscribe(documents => {
      this.jobs = documents;
    });

  }

  redirectToJobDetails(jobId: string): void {
    this.id = jobId;
    this.router.navigate(['/job-detail', jobId]);
  }
}
