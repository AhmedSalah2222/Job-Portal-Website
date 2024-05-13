import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  styleUrl: './seeker-profile.component.css'
})
export class SeekerProfileComponent {

  selectedFile: File | null = null;

  constructor(private firebaseService: ServiceService){}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.firebaseService.uploadFile(this.selectedFile)
    }
  }
}
