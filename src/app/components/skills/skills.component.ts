import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
skillCategories = [
    { title: 'Programming Languages', skills: ['C#', 'JavaScript'] },
    { title: 'Frameworks', skills: ['.Net Core', 'Angular', 'Entity Framework', 'MVC.Net', 'Express Js'] },
    { title: 'Web Application', skills: ['HTML', 'CSS', 'Node.js', 'API', 'Bootstrap', 'Jquery'] },
    { title: 'Database', skills: ['SQL Server', 'SQL'] },
    { title: 'Developer Tools', skills: ['Visual Studio', 'SQL Server', 'VsCode', 'Git & GitHub', 'Jira'] },
    { title: 'Operating Systems', skills: ['Windows', 'Ubuntu', 'Linux', 'Debian'] },
    { title: 'Test Automation', skills: ['Selenium', 'NUnit', 'BrowserStack', 'LeapWork', 'Appium'] },
    { title: 'Others', skills: ['Clean Code', 'WordPress', 'Shopify', 'Hostinger VPS'] }
  ];

  // This function provides a unique SVG path for each icon
  icons = [
    // Languages
    `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />`,
    // Frameworks
    `<path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3.75v3.75m-3.75-3.75v3.75m-3.75-3.75v3.75m9-15v15M3 20.25a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 3 4.5h18a2.25 2.25 0 0 1 2.25 2.25v11.25a2.25 2.25 0 0 1-2.25 2.25H3Z" />`,
    // Web Application
    `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />`,
    // Database
    `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />`,
    // Dev Tools
    `<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />`,
    // OS
    `<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.375 .5-1.037 1.037 0 0 0-.5.879V21M9 17.25h6M18 17.25v1.007a3 3 0 0 0 .375.5c.155.154.34.296.5.421v1.812M12 17.25v3.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />`,
    // Test Automation
    `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25h2.25A2.25 2.25 0 0 1 20.25 7.5v2.25m-2.25 9h-2.25a2.25 2.25 0 0 1-2.25-2.25v-1.5m-3 3h3m-6.75-6.75 2.25 2.25 4.5-4.5M6 5.25H4.5A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75H6m6-13.5h-3m3 13.5h-3" />`,
    
    // Others
    `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />`
  ];
  constructor(private sanitizer:  DomSanitizer){}
  getIcon(index: number): SafeHtml {
    const iconSvg = this.icons[index] || this.icons[0];
    return this.sanitizer.bypassSecurityTrustHtml(iconSvg);
  }
}