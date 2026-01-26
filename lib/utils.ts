import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date in Arknights style: "2026 // 01 / 20"
 */
export function formatArknightsDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year} // ${month} / ${day}`;
}

/**
 * Format section number: "// 00 / 05"
 */
export function formatSectionNumber(current: number, total: number): string {
  return `// ${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}
