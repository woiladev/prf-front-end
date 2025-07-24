// Formatting utilities
export function formatCurrency(amount: number, currency = 'FCFA'): string {
  return `${amount.toLocaleString()} ${currency}`;
}

export function formatDate(date: string | Date, locale = 'fr-FR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale);
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'À l\'instant';
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 2592000) return `Il y a ${Math.floor(diffInSeconds / 86400)} jour${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''}`;
  
  return formatDate(dateObj);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 9) {
    const formatted = cleaned.slice(-9);
    return `+237 ${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6)}`;
  }
  return phone;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateAvatarUrl(name: string, size = 100): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=06b6d4&color=fff&size=${size}`;
}

export function extractPrice(priceString: string): number {
  return parseFloat(priceString.replace(/[^\d]/g, ''));
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString()} FCFA`;
}