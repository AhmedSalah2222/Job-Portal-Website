import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import{AngularFireAuth}from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';

export interface Job {
  job_title: string;
  responsibilities: string;
  qualifications: string;
  benefits: string;
  // id: string
  // Add other fields if necessary
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  apiEndPoint: string = '';

  constructor(private fireauth : AngularFireAuth, private firestorage: AngularFireStorage, private firestore: AngularFirestore, private router : Router, private http: HttpClient) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        const userId = res.user?.uid;

        // Check if user is a seeker
        this.firestore.collection('seekers').doc(userId).get()
          .pipe(
            map(doc => {
              if (doc.exists) {
                localStorage.setItem('token', 'true');
                this.router.navigate(['/seeker-home']).then(() => {
                  alert('Logged in successfully as a seeker');
                });
              } else {
                // Check if user is a company
                this.firestore.collection('companies').doc(userId).get()
                  .pipe(
                    map(doc => {
                      if (doc.exists) {
                        localStorage.setItem('token', 'true');
                        this.router.navigate(['/company-home']).then(() => {
                          alert('Logged in successfully as a company');
                        });
                      } else {
                        console.log('User document not found in either collection');
                      }
                    })
                  )
                  .subscribe(() => {}, error => {
                    console.error('Error getting company document:', error);
                  });
              }
            })
          )
          .subscribe(() => {}, error => {
            console.error('Error getting seeker document:', error);
          });
      })
      .catch((err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      });
  }


  register(email: string, password: string, name: string, phone_number: string, isseeker: boolean, iscompany: boolean, fileURL: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential && userCredential.user) {
          const uid = userCredential.user.uid;

          let collectionName;
          let data;

          if (isseeker) {
            collectionName = 'seekers';
            const seekerDocRef = this.firestore.collection('seekers').doc();
            data = {
              email: email,
              name: name,
              phone_number: phone_number,
              isseeker: true,
              iscompany: false,
              id : seekerDocRef.ref.id,
              cvURL: fileURL,
              job_preferences: ''
            };
          } else if (iscompany) {
            collectionName = 'companies';
            const companyDocRef = this.firestore.collection('companies').doc();
            data = {
              email: email,
              name: name,
              phone_number: phone_number,
              iscompany: true,
              isseeker: false,
              id : companyDocRef.ref.id,
              logoURL: fileURL,
              company_description: ''
            };
          } else {
            throw new Error('User must be either seeker or company.');
          }

          return this.firestore.collection(collectionName).doc(uid).set(data);
        } else {
          throw new Error('User creation failed.');
        }
      })
      .then(() => {
        alert('User registered successfully');
        if (isseeker) {
          this.router.navigate(['/seeker-homw']);
        } else if (iscompany) {
          this.router.navigate(['/company-home']);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  createJob(
    job_title: string,
    brief_job_description: string,
    responsibilities: string,
    qualifications: string,
    benefits: string,
    company_name: string,
    location: string
  ) {
    // Create a unique ID for the job
    const jobDocRef = this.firestore.collection('companies').doc();
    const jobId = this.firestore.createId();
    // Prepare the data object to be added to Firestore
    const jobData = {
      job_title: job_title,
      brief_job_description: brief_job_description,
      responsibilities: responsibilities,
      qualifications: qualifications,
      benefits: benefits,
      company_name: company_name,
      location: location,
      id : jobDocRef.ref.id
    };
    alert('The job is added successfully');

    // Add the job data to a new collection named 'jobs' in Firestore
    return this.firestore.collection('Jobs').doc(jobId).set(jobData);
  }



  getAllJobs(): Observable<Job[]> {
    return this.firestore.collection('Jobs').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Job;
          return {
            job_title: data.job_title,
            responsibilities: data.responsibilities,
            qualifications: data.qualifications,
            benefits: data.benefits
          };
        });
      })
    );
  }


  getActiveUser(){
    let userId: string = '';
    // let activeUser: string;
    this.fireauth.currentUser.then((value)=>{
      userId = value!.uid;
      console.log(userId)

      // this.firestore.collection('seekers').doc(userId).get()
    })
    return userId;
  }

  uploadFile(file: File) {
    console.log("i'm in service upload file")
    const userId = this.getActiveUser();
    let ref = this.firestorage.ref(userId).child('file.pdf');

    let uploadTask = ref.put(file).then((value)=>{
      let fileURL = ref.getDownloadURL();

        // Check if user is a seeker
        this.firestore.collection('seekers').doc(userId).get()
          .pipe(
            map(doc => {
              if (doc.exists) {
                // User is a seeker
                this.firestore.collection('seekers').doc(userId).update({
                  cvURL: fileURL
                })
                alert("seeker")
              } else {
                // Check if user is a company
                this.firestore.collection('companies').doc(userId).update({
                  logoURL: fileURL
                })
                alert("company")
              }
            })
          )
          .subscribe(() => {}, error => {
            console.error('Error getting seeker document:', error);
          });

    });
  }

  getJobDetails(jobId: string): Observable<Job> {
    return this.firestore.collection('Jobs').doc(jobId).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Job;
        const id = action.payload.id;
        return { id, ...data };
      })
    );
  }

}
