import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  // templateUrl: './skills.component.html',
  // styleUrl: './skills.component.css'
template: `
    <section id="skills" class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Technical Skills</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
          <div *ngFor="let skill of skills" class="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <p class="font-semibold text-gray-700">{{ skill }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
skills = [
    'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Node.js', 'Express', 'Python', 'Firebase', 'SQL', 'Git'
  ];
}
