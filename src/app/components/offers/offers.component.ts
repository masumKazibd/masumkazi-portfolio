import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
})
export class OffersComponent {
  copiedCode: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  offers = [
    // Job Offers
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
      actionLink: '#contact',
      badge: 'Remote',
      color: 'emerald'
    },
    // Course Offers
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
      actionLink: '#contact',
      badge: 'Limited Seats',
      color: 'blue'
    },
    {
      id: 3,
      type: 'course',
      category: 'Course Offer',
      title: 'Full-Stack Web Development with .NET & Angular',
      company: 'TechSkill Academy',
      description: 'Complete guide to building scalable applications with .NET Core backend and Angular frontend.',
      price: '$399 (Black Friday: $99)',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6.042 12M12 6.042a8.967 8.967 0 0 1 5.958 5.958M12 6.042a9 9 0 1 1 0 11.916m3.75-7.25a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" />`,
      actionLabel: 'View Curriculum',
      actionLink: '#contact',
      badge: 'Best Seller',
      color: 'indigo'
    },
    // Product/Service Discount
    {
      id: 4,
      type: 'discount',
      category: 'Product Discount',
      title: 'Web Development Services',
      company: 'Masum Kazi Portfolio',
      description: 'Professional web development, consulting, and technical architecture services.',
      discount: '30% OFF for first 3 clients',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5.432 9.75a2.25 2.25 0 0 0-.659-1.591V3.104m0 0a2.25 2.25 0 1 1 3.18 2.098A23.488 23.488 0 0 1 12 8.684m0 0A2.25 2.25 0 0 0 9.75 5.104M12 8.684v-5.58a2.25 2.25 0 0 1 .659-1.591L14.568 3a2.25 2.25 0 0 1 .659 1.591m0 0a2.25 2.25 0 1 0-3.18-2.098A23.488 23.488 0 0 0 12 8.684m0 0a2.25 2.25 0 0 1-.659 1.591M12 8.684a2.25 2.25 0 0 0 .659 1.591m-1.318 0a2.25 2.25 0 0 1 .659 1.591V15a2.25 2.25 0 0 1-2.25 2.25h-5.25A2.25 2.25 0 0 1 3 15v-2.625c0 .596.235 1.17.659 1.591m0 0a2.25 2.25 0 0 0 .659-1.591m10.317 0a2.25 2.25 0 0 0 .659 1.591V15a2.25 2.25 0 0 0 2.25-2.25h5.25a2.25 2.25 0 0 0 2.25-2.25v-2.625c0 .596-.235 1.17-.659 1.591m0 0a2.25 2.25 0 0 1 .659-1.591M5.432 15a2.25 2.25 0 0 1 .659-1.591" />`,
      actionLabel: 'Get a Quote',
      actionLink: '#contact',
      badge: 'Limited Time',
      color: 'rose'
    },
    // Coupon Offer
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
      actionLabel: 'Use Coupon',
      actionLink: '#contact',
      badge: 'Code: MASUM50',
      color: 'amber'
    },
    {
      id: 6,
      type: 'coupon',
      category: 'Coupon Offer',
      title: 'Code Review & Optimization',
      company: 'Masum Kazi',
      description: 'Professional code review, performance optimization, and refactoring for your projects.',
      coupon: 'REVIEW30',
      discount: '30% OFF',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
      actionLabel: 'Claim Offer',
      actionLink: '#contact',
      badge: 'Code: REVIEW30',
      color: 'purple'
    },
    // Opportunity
    {
      id: 7,
      type: 'opportunity',
      category: 'Business Opportunity',
      title: 'Partnership & Collaboration',
      company: 'Masum Kazi',
      description: 'Looking to collaborate on innovative projects, startups, or freelance partnerships.',
      prize: 'Revenue Share Model Available',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962a3.75 3.75 0 0 1-4.134 0m0 0a3 3 0 0 1-4.135-2.472V9.75c0-1.355.744-2.548 1.838-3.162M18 18.72v-7.5m-7.5-2.962v7.5m-7.5 2.962V9.75M6 6.375a3.375 3.375 0 0 1-3-3.375m15.75 0a3.375 3.375 0 0 0-3-3.375M6 6.375a3.375 3.375 0 0 0 3 3.375m-3 3.375a3.375 3.375 0 0 1 3 3.375m9.75-3.375a3.375 3.375 0 0 0 3 3.375M9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />`,
      actionLabel: 'Let\'s Connect',
      actionLink: '#contact',
      badge: 'Open for Discussion',
      color: 'cyan'
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
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-t-indigo-500',
        badge: 'bg-indigo-100 text-indigo-700',
        text: 'text-indigo-600'
      },
      rose: {
        bg: 'bg-rose-50',
        border: 'border-t-rose-500',
        badge: 'bg-rose-100 text-rose-700',
        text: 'text-rose-600'
      },
      amber: {
        bg: 'bg-amber-50',
        border: 'border-t-amber-500',
        badge: 'bg-amber-100 text-amber-700',
        text: 'text-amber-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-t-purple-500',
        badge: 'bg-purple-100 text-purple-700',
        text: 'text-purple-600'
      },
      cyan: {
        bg: 'bg-cyan-50',
        border: 'border-t-cyan-500',
        badge: 'bg-cyan-100 text-cyan-700',
        text: 'text-cyan-600'
      }
    };
    return colorMap[color] || colorMap['blue'];
  }

  getOffersByCategory(category: string) {
    return this.offers.filter(offer => offer.category === category);
  }

  copyToClipboard(text: string, event: Event) {
    event.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      this.copiedCode = text;
      // Reset after 2 seconds
      setTimeout(() => {
        this.copiedCode = null;
      }, 2000);
    });
  }
}
