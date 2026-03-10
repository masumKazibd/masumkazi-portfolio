import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-offers-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offers-preview.component.html',
  styleUrl: './offers-preview.component.css',
})
export class OffersPreviewComponent {
  constructor(private sanitizer: DomSanitizer) {}

  topOffers = [
    {
      id: 1,
      type: 'job',
      category: 'Job Offer',
      title: 'Senior Angular Developer',
      company: 'TechCorp Solutions',
      description: 'Opportunity to lead frontend development with modern Angular technologies.',
      salary: '$100K - $130K/year',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m0 0C5.25 5.547 8.944 5 12 5c3.057 0 6.75.547 8.25 1.375M12 12.75c3.057 0 6.75-.547 8.25-1.375M12 12.75c-3.057 0-6.75.547-8.25 1.375M12 12.75v8.625m0-2.25v2.25m7.5-4.875v-2.25" />`,
      actionLabel: 'Learn More',
      actionLink: '/offers',
      badge: 'Remote',
      color: 'emerald'
    },
    {
      id: 2,
      type: 'course',
      category: 'Course Offer',
      title: 'Advanced Angular Masterclass',
      company: 'Learning Hub',
      description: '12-week comprehensive course on advanced Angular patterns and best practices.',
      price: '$299 (Early Bird: $199)',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60 60 0 0 0-1.97 6.51c-.944 2.765-.76 5.827.96 7.44s5.143 1.228 6.53.996c1.491-.23 4.501-1.196 5.635-3.12M6.826 6.75a9 9 0 1 1-3.576-7.25h7.327m0 0A9 9 0 0 0 6.826 6.75M6.826 6.75A3.375 3.375 0 0 0 3 10.125" />`,
      actionLabel: 'Enroll Now',
      actionLink: '/offers',
      badge: 'Limited Seats',
      color: 'blue'
    },
    {
      id: 5,
      type: 'coupon',
      category: 'Coupon Offer',
      title: 'Special Consultation Package',
      company: 'Masum Kazi',
      description: '1-on-1 consultation session for career guidance, technical mentoring, or project planning.',
      coupon: 'MASUM50',
      discount: '50% OFF',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />`,
      actionLabel: 'View All Offers',
      actionLink: '/offers',
      badge: 'Code: MASUM50',
      color: 'amber'
    },
  ];

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.sanitize(1, icon) || '';
  }

  getColorClasses(color: string) {
    const colorMap: { [key: string]: { bg: string; border: string; badge: string; text: string } } = {
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-t-emerald-500',
        badge: 'bg-emerald-100 text-emerald-700',
        text: 'text-emerald-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-t-blue-500',
        badge: 'bg-blue-100 text-blue-700',
        text: 'text-blue-600'
      },
      amber: {
        bg: 'bg-amber-50',
        border: 'border-t-amber-500',
        badge: 'bg-amber-100 text-amber-700',
        text: 'text-amber-600'
      }
    };
    return colorMap[color] || colorMap['blue'];
  }
}
