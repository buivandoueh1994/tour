import { Tour, Language } from '@/types';

export function formatCurrency(amount: number, lang: Language = 'vi'): string {
  if (lang === 'en') {
    return `${new Intl.NumberFormat('en-US').format(amount)} VND`;
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

export function getLocalizedTour(tour: Tour, lang: Language): Tour {
  if (lang !== 'en') return tour;
  return {
    ...tour,
    title: tour.titleEn || tour.title,
    duration: tour.durationEn || tour.duration,
    transportLabel: tour.transportLabelEn || tour.transportLabel,
    difficulty: (tour.difficultyEn as Tour['difficulty']) || tour.difficulty,
    tag: tour.tagEn || tour.tag,
    shortDesc: tour.shortDescEn || tour.shortDesc,
    highlights: tour.highlightsEn || tour.highlights,
    inclusions: tour.inclusionsEn || tour.inclusions,
    exclusions: tour.exclusionsEn || tour.exclusions,
    vehicleOptions: tour.vehicleOptionsEn || tour.vehicleOptions,
  };
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
