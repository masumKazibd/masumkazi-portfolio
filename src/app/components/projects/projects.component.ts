import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
projects = [
    {
      title: 'CRM for ISP',
      description: 'A Customer Relationship Management system for an ISP, built with a modern stack.',
      techStack: ['Angular', '.Net Core'],  
      liveLink: '',
      codeLink: 'https://github.com/masumKazibd/CRM-ISP-Angular'
    },
    {
      title: 'Quizfolio',  
      description: 'A quiz application with Salesforce integration for lead capture and management.',
      techStack: ['.Net Core MVC', 'Salesforce'], 
      liveLink: 'https://quizfolio.somee.com/',  
      codeLink: 'https://github.com/masumkazibd/QuizFolio'
    },
    {
      title: 'Candidate Management System',
      description: 'A system to manage job candidates, built with a separate front-end and back-end.',
      techStack: ['Angular', '.Net Core'], 
      liveLink: '',
      codeLink: 'https://github.com/masumkazibd/Candidate-management-angular'
    },
    {
      title: 'Tour Management System', 
      description: 'A web application for managing tours and bookings.',
      techStack: ['ASP.NET MVC-5'],
      liveLink: '',
      codeLink: 'https://github.com/masumkazibd/tour-management'
    },
    {
      title: 'Daily Discipline SPA', 
      description: 'A web application for improving your productivity.',
      techStack: ['JavaScript', 'Firebase'],
      liveLink: 'https://dailydiscipline.netlify.app/',
      codeLink: 'https://github.com/masumKazibd/daily-routine-spa'
    },
    {
      title: 'Mini Account Management System', 
      description: 'A web application for managing accounts with role & right manage.',
      techStack: ['ASP.NET core', 'Store Procedure'],
      liveLink: 'https://accountms.somee.com/',
      codeLink: 'https://github.com/masumKazibd/MiniAccountManagement'
    },
  ];
}
