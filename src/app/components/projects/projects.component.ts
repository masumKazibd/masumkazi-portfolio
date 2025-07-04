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
      title: 'E-Commerce Platform',
      description: 'A fully functional e-commerce site with product catalogs, shopping cart, and checkout.',
      image: 'assets/images/projects/project1.webp',
      techStack: 'Angular, Node.js, Express, MongoDB',
      githubLink: '#',
      demoLink: '#'
    },
    {
      title: 'Task Management App',
      description: 'A Kanban-style task management application to organize workflows and improve productivity.',
      image: 'assets/images/projects/project2.webp',
      techStack: 'Angular, Firebase, Tailwind CSS',
      githubLink: '#',
      demoLink: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'This very portfolio, built to showcase my skills and projects using modern web tech.',
      image: 'assets/images/projects/project3.webp',
      techStack: 'Angular 17, Tailwind CSS, Netlify',
      githubLink: '#',
      demoLink: '#'
    }
  ];
}
