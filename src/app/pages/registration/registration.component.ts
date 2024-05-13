import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
    username: string = '';
    password: string = '';
    confirmation_password: string = '';
    email: string = '';
    phone_number: string = '';
    isseeker: boolean = false ;
    iscompany: boolean = false ;
    fileURL: string = '';
    job_preferences: string = '';
    company_description: string = '';


  constructor(private auth:ServiceService){}

  //see after firebase
  // register(){
  //   // this.job.registrationOne(this.userObj).subscribe((res:any)=>{
  //   //   if(res.result){
  //   //     alert("registration succsess");
  //   //   }else{
  //   //     alert('nooooooooo')
  //   //   }
  //   // })
  // }


  register() {

    if(this.username == '') {
      alert('Please enter username');
      return;
    }

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.confirmation_password != this.password) {
      alert('Please enter the same password');
      return;
    }

    if(this.phone_number == '') {
      alert('Please enter phone_number');
      return;
    }

    if (this.isseeker && this.iscompany) {
      alert('Please select either seeker or company');
      return;
    }

    this.auth.register(this.email, this.password, this.username, this.phone_number, this.isseeker, this.iscompany, this.fileURL);

    this.username == ''
    this.email = '';
    this.password = '';
    this.confirmation_password = '';
    this.phone_number = '';

  }

}
