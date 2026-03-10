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
      title: 'Software Engineer',
      company: 'PlayOn24',
      period: 'Dec 2025 - Present',
      description:
        'Contributing to a .NET Core-based HRM, Factory & POS ERP, focusing on full-stack development and testing'
    },
    {
      title: 'Junior Software Engineer',
      company: 'PlacoVU, Inc.',
      period: 'Feb 2024 - Nov 2025',
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
  educationList: Education[] = [
    {
      title: 'Bachelor of Science, Computer Science',
      institution: 'Southeast University',
      period: '2023 - 2027'
    },
    {
      title: 'Diploma in Engineering, Computer Technology',
      institution: 'Chandpur Polytechnic Institute',
      period: '2018 - 2022'
    },
    {
      title: 'Industrial Attachment, Node.js',
      institution: 'PeopleNTech Limited',
      period: '2022 - 2023'
    }
  ];

  volunteeringList: Volunteering[] = [
    {
      title: 'FNV',
      organization: 'UNDP Bangladesh',
      period: 'July 2025 - Present'
    },
    {
      title: 'Google Local Guides',
      organization: 'Google Maps',
      period: 'March 2020 - Present'
    }
  ];
}
interface Education {
  title: string;
  institution: string;
  period: string;
}

interface Volunteering {
  title: string;
  organization: string;
  period: string;
}