import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OffersService, Offer } from '../../services/offers.service';

@Component({
  selector: 'app-offers-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offers-preview.component.html',
  styleUrl: './offers-preview.component.css',
})
export class OffersPreviewComponent implements OnInit {
  topOffers: Offer[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private offersService: OffersService
  ) {}

  ngOnInit(): void {
    this.topOffers = this.offersService.getTopOffers(3);
  }

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.sanitize(1, icon) || '';
  }

  hasMoreOffers(): boolean {
    return this.offersService.getAllOffers().length > 3;
  }

  isExpired(offer: Offer): boolean {
    return offer.status === 'expired';
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
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-t-purple-500',
        badge: 'bg-purple-100 text-purple-700',
        text: 'text-purple-600'
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
      cyan: {
        bg: 'bg-cyan-50',
        border: 'border-t-cyan-500',
        badge: 'bg-cyan-100 text-cyan-700',
        text: 'text-cyan-600'
      }
    };
    return colorMap[color] || colorMap['blue'];
  }
}
