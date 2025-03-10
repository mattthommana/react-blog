/**
 * Calculate approximate reading time for a given text in minutes
 * Assuming average reading speed of 200 words per minute
 */
export function calculateReadingTime(text: string): number {
    // Strip HTML tags if the text contains them
    const plainText = text.replace(/<[^>]+>/g, '');
    const words = plainText.split(/\s+/).length;
    return Math.ceil(words / 200);
  }
  
  /**
   * Truncate a string with ellipsis after a certain number of characters
   */
  export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  /**
   * Convert a string to slug format for URLs
   */
  export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }