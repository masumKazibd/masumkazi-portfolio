import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm;
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submissionStatus = 'submitting';
      const headers = new HttpHeaders({'content-type': 'application/json'});
      const formspreeEndpoint = 'https://formspree.io/f/mdkdbgbl';

      this.http.post(formspreeEndpoint, this.contactForm.value, {headers: headers})
      .subscribe({
        next: (response) => {
          this.submissionStatus = 'success';
          this.contactForm.reset();
          setTimeout(() => {this.submissionStatus = 'idle';}, 5000);
        },
        error: (error)=> {
          console.error('Error sending message: ', error);
          this.submissionStatus = 'error';
          setTimeout(() => {this.submissionStatus = 'idle';}, 5000);
        }
      });
    }
  }
}