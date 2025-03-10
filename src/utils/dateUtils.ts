/**
 * Format a date in "MMM DD, YYYY" format (e.g., "Jan 15, 2023")
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  /**
   * Creates a date range string (e.g., "Jan 2020 - Present" or "Jan 2020 - Dec 2022")
   */
  export function dateRange(startDate: Date, endDate?: Date | string): string {
    const startMonth = startDate.toLocaleString('default', { month: 'short' });
    const startYear = startDate.getFullYear().toString();
    
    let endDisplay;
    if (!endDate) {
      endDisplay = 'Present';
    } else if (typeof endDate === 'string') {
      endDisplay = endDate;
    } else {
      const endMonth = endDate.toLocaleString('default', { month: 'short' });
      const endYear = endDate.getFullYear().toString();
      endDisplay = `${endMonth} ${endYear}`;
    }
  
    return `${startMonth} ${startYear} - ${endDisplay}`;
  }