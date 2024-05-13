import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit{
  jobList: any []= [];

  constructor(private firestore: AngularFirestore, private jobSer: ServiceService, private router: Router){}

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
          return { id, ...filteredData };
        });
      })
    ).subscribe(documents => {
      this.jobList = documents;
    });
  }

}
