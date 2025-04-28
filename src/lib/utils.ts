import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names or class name objects into a single string
 * using clsx and tailwind-merge for proper handling of Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to a target element with offset for header
 */
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const headerHeight = document.querySelector('header')?.offsetHeight || 0;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

/**
 * Format a phone number to a readable format
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Basic formatting for US phone numbers
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumber;
}
