import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences = [
    {
      title: 'Junior Software Engineer',
      company: 'PlacoVU, Inc.',
      period: 'Feb 2024 - Present',
      description:
        'Contributing to a .NET Core-based LMS & EHR, focusing on full-stack development and implementing automated testing with Playwright, BrowserStack, LeapWork and Appium.'
    },
    {
      title: 'Trainee',
      company: 'IDB-BISEW',
      period: 'Jun 2023 - Feb 2024',
      description:
        'Completed intensive training focused on Web Application Development using the ASP.NET framework.'
    },
    {
      title: 'Technical Staff, Cloud Services',
      company: 'imranslab',
      period: 'March 2022 - January 2024',
      description:
        'Managed cloud infrastructure, server administration, and provided technical support while handling critical data management tasks.'
    }
  ];
}
