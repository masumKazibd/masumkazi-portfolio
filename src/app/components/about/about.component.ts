import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../experience/experience.component';



@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ExperienceComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  
}

