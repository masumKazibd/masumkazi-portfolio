import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // DomSanitizer ইমপোর্ট করুন

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {

  constructor(private sanitizer: DomSanitizer) {}

  projects = [
    {
      title: 'CRM for ISP',
      description: 'A Customer Relationship Management system for an ISP, built with a modern stack.',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962a3.75 3.75 0 0 1-4.134 0m0 0a3 3 0 0 1-4.135-2.472V9.75c0-1.355.744-2.548 1.838-3.162M18 18.72v-7.5m-7.5-2.962v7.5m-7.5 2.962V9.75M6 6.375a3.375 3.375 0 0 1-3-3.375m15.75 0a3.375 3.375 0 0 0-3-3.375M6 6.375a3.375 3.375 0 0 0 3 3.375m-3 3.375a3.375 3.375 0 0 1 3 3.375m9.75-3.375a3.375 3.375 0 0 0 3 3.375M9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />`,
      techStack: ['Angular', '.Net Core'],
      liveLink: '',
      codeLink: 'https://github.com/masumKazibd/CRM-ISP-Angular'
    },
    {
      title: 'Quizfolio',
      description: 'A quiz application with Salesforce integration for lead capture and management.',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />`,
      techStack: ['.Net Core MVC', 'Salesforce'],
      liveLink: 'https://quizfolio.somee.com/',
      codeLink: 'https://github.com/masumkazibd/QuizFolio'
    },
    {
      title: 'Candidate Management System',
      description: 'A system to manage job candidates, built with a separate front-end and back-end.',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.125-2.257 9.337 9.337 0 0 0-4.125-2.257 9.38 9.38 0 0 0-2.625.372M15 19.128v-3.75m-9.45-4.5a9.38 9.38 0 0 0-2.625.372 9.337 9.337 0 0 0-4.125 2.257 9.337 9.337 0 0 0 4.125 2.257 9.38 9.38 0 0 0 2.625-.372m-9.45-4.5v-3.75m9.45 4.5v3.75m-9.45-4.5a9.38 9.38 0 0 1 2.625-.372A9.337 9.337 0 0 1 12 11.25m-3.75 4.5a9.38 9.38 0 0 1-2.625-.372M12 11.25a9.337 9.337 0 0 1 4.125-2.257 9.38 9.38 0 0 1 2.625.372M12 11.25v-3.75m3.75 4.5a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.125-2.257 9.337 9.337 0 0 0-4.125-2.257 9.38 9.38 0 0 0-2.625.372m3.75 4.5v-3.75M3.75 12a9.337 9.337 0 0 1 4.125-2.257 9.38 9.38 0 0 1 2.625.372m0 0v-3.75m-3.75 4.5v-3.75" />`,
      techStack: ['Angular', '.Net Core'],
      liveLink: '',
      codeLink: 'https://github.com/masumkazibd/Candidate-management-angular'
    },
    {
      title: 'Tour Management System',
      description: 'A web application for managing tours and bookings.',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Z" />`,
      techStack: ['ASP.NET MVC-5'],
      liveLink: '',
      codeLink: 'https://github.com/masumkazibd/tour-management'
    },
    {
      title: 'Daily Discipline SPA',
      description: 'A web application for improving your productivity.',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />`,
      techStack: ['JavaScript', 'Firebase'],
      liveLink: 'https://dailydiscipline.netlify.app/',
      codeLink: 'https://github.com/masumKazibd/daily-routine-spa'
    },
    {
      title: 'Mini Account Management System',
      description: 'A web application for managing accounts with role & right manage.',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />`,
      techStack: ['ASP.NET core', 'Store Procedure'],
      liveLink: 'https://accountms.somee.com/',
      codeLink: 'https://github.com/masumKazibd/MiniAccountManagement'
    },
  ];

  getSafeIcon(svgPath: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgPath);
  }
}