import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
    { title: 'Frameworks', skills: ['MVC.Net', '.Net Core', 'Entity Framework', 'Angular'] },
    { title: 'Web Application', skills: ['HTML', 'CSS', 'Bootstrap', 'Node.js', 'API', 'Jquery'] },
    { title: 'Database', skills: ['SQL Server', 'SQL'] },
    { title: 'Developer Tools', skills: ['Visual Studio', 'SQL Server', 'VsCode', 'Hostinger VPS', 'Android Studio'] },
    { title: 'Operating Systems', skills: ['Windows', 'Ubuntu', 'Debian', 'Oracle', 'Linux'] },
    { title: 'Others', skills: ['Jira', 'Confluence', 'Git & GitHub', 'Clean Code', 'WordPress', 'Shopify'] }
  ];
}
