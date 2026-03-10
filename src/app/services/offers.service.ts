import { Injectable } from '@angular/core';

export interface Offer {
  id: number;
  type: string;
  category: string;
  title: string;
  company: string;
  description: string;
  salary?: string;
  price?: string;
  discount?: string;
  coupon?: string;
  prize?: string;
  referenceName?: string;
  icon: string;
  actionLabel: string;
  actionLink: string;
  isExternal?: boolean;
  badge: string;
  color: string;
  featured?: boolean;
  status?: 'active' | 'inactive' | 'expired';
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private allOffers: Offer[] = [
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
      actionLink: '/offers',
      badge: 'Remote',
      color: 'emerald',
      status: 'inactive',
      featured: true
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
      actionLink: '/offers',
      badge: 'Limited Seats',
      color: 'blue',
      status: 'inactive',
      featured: false
    },
    {
      id: 3,
      type: 'course',
      category: 'Course Offer',
      title: 'Free Social & Business English Course',
      company: 'UNDP Bangladesh & British Council',
      description: 'Improve your Social & Business English skills with this free opportunity. Deadline: 19 March 2026.',
      referenceName: 'Masum Kazi',
      price: 'FREE',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006.175 2h5.982c2.175 0 4.746.822 6.303 2.118M12 6.042A8.967 8.967 0 0118.825 2M12 6.042v5.958m0-5.958L9.172 3.172M12 6.042L14.828 3.172M12 11.25h4.125c.621 0 1.219.235 1.658.674.439.44.674 1.036.674 1.658v4.125m0 0v5.958M12 11.25H7.875c-.621 0-1.219.235-1.658.674-.439.44-.674 1.036-.674 1.658v4.125m0 0v5.958" />`,
      actionLabel: 'Register Now',
      actionLink: 'https://forms.gle/1RG3E4UWnUiLSyFy8',
      isExternal: true,
      badge: 'Deadline: 19 Mar',
      color: 'purple',
      featured: true
    },
    {
      id: 4,
      type: 'course',
      category: 'Course Offer',
      title: 'Full-Stack Web Development with .NET & Angular',
      company: 'TechSkill Academy',
      description: 'Complete guide to building scalable applications with .NET Core backend and Angular frontend.',
      price: '$399 (Black Friday: $99)',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6.042 12M12 6.042a8.967 8.967 0 0 1 5.958 5.958M12 6.042a9 9 0 1 1 0 11.916m3.75-7.25a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" />`,
      actionLabel: 'View Curriculum',
      actionLink: '/offers',
      badge: 'Best Seller',
      color: 'indigo',
      status: 'inactive',
      featured: false
    },
    // Product/Service Discount
    {
      id: 5,
      type: 'discount',
      category: 'Product Discount',
      title: 'Web Development Services',
      company: 'Masum Kazi Portfolio',
      description: 'Professional web development, consulting, and technical architecture services.',
      discount: '30% OFF for first 3 clients',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5.432 9.75a2.25 2.25 0 0 0-.659-1.591V3.104m0 0a2.25 2.25 0 1 1 3.18 2.098A23.488 23.488 0 0 1 12 8.684m0 0A2.25 2.25 0 0 0 9.75 5.104M12 8.684v-5.58a2.25 2.25 0 0 1 .659-1.591L14.568 3a2.25 2.25 0 0 1 .659 1.591m0 0a2.25 2.25 0 1 0-3.18-2.098A23.488 23.488 0 0 0 12 8.684m0 0a2.25 2.25 0 0 1-.659 1.591M12 8.684a2.25 2.25 0 0 0 .659 1.591m-1.318 0a2.25 2.25 0 0 1 .659 1.591V15a2.25 2.25 0 0 1-2.25 2.25h-5.25A2.25 2.25 0 0 1 3 15v-2.625c0 .596.235 1.17.659 1.591m0 0a2.25 2.25 0 0 0 .659-1.591m10.317 0a2.25 2.25 0 0 0 .659 1.591V15a2.25 2.25 0 0 0 2.25-2.25h5.25a2.25 2.25 0 0 0 2.25-2.25v-2.625c0 .596-.235 1.17-.659 1.591m0 0a2.25 2.25 0 0 1 .659-1.591M5.432 15a2.25 2.25 0 0 1 .659-1.591" />`,
      actionLabel: 'Get a Quote',
      actionLink: '/offers',
      badge: 'Limited Time',
      color: 'rose',
      status: 'inactive',
      featured: false
    },
    // Coupon Offer
    {
      id: 6,
      type: 'coupon',
      category: 'Coupon Offer',
      title: 'Special Consultation Package',
      company: 'Masum Kazi',
      description: '1-on-1 consultation session for career guidance, technical mentoring, or project planning.',
      coupon: 'MASUM50',
      discount: '50% OFF',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />`,
      actionLabel: 'Use Coupon',
      actionLink: '/offers',
      badge: 'Code: MASUM50',
      color: 'amber',
      status: 'inactive',
      featured: false
    },
    {
      id: 7,
      type: 'coupon',
      category: 'Coupon Offer',
      title: 'Code Review & Optimization',
      company: 'Masum Kazi',
      description: 'Professional code review, performance optimization, and refactoring for your projects.',
      coupon: 'REVIEW30',
      discount: '30% OFF',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
      actionLabel: 'Claim Offer',
      actionLink: '/offers',
      badge: 'Code: REVIEW30',
      color: 'indigo',
      status: 'inactive',
      featured: false
    },
    // Opportunity
    {
      id: 8,
      type: 'opportunity',
      category: 'Business Opportunity',
      title: 'Partnership & Collaboration',
      company: 'Masum Kazi',
      description: 'Looking to collaborate on innovative projects, startups, or freelance partnerships.',
      prize: 'Revenue Share Model Available',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962a3.75 3.75 0 0 1-4.134 0m0 0a3 3 0 0 1-4.135-2.472V9.75c0-1.355.744-2.548 1.838-3.162M18 18.72v-7.5m-7.5-2.962v7.5m-7.5 2.962V9.75M6 6.375a3.375 3.375 0 0 1-3-3.375m15.75 0a3.375 3.375 0 0 0-3-3.375M6 6.375a3.375 3.375 0 0 0 3 3.375m-3 3.375a3.375 3.375 0 0 1 3 3.375m9.75-3.375a3.375 3.375 0 0 0 3 3.375M9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />`,
      actionLabel: 'Let\'s Connect',
      actionLink: '/offers',
      badge: 'Open for Discussion',
      color: 'cyan',
      status: 'inactive',
      featured: false
    },
  ];

  constructor() {}

  getAllOffers(): Offer[] {
    // Return only active and expired offers (inactive are hidden)
    return this.allOffers.filter(offer => offer.status !== 'inactive');
  }

  getTopOffers(limit: number = 3): Offer[] {
    // Filter active and expired offers, then sort featured offers first
    const visibleOffers = this.allOffers.filter(o => o.status !== 'inactive');
    const sortedOffers = [
      ...visibleOffers.filter(o => o.featured),
      ...visibleOffers.filter(o => !o.featured)
    ];
    return sortedOffers.slice(0, limit);
  }

  getOfferById(id: number): Offer | undefined {
    return this.allOffers.find(offer => offer.id === id && offer.status !== 'inactive');
  }
}
