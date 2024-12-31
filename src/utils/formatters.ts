export function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd'
  });

  return formatter.format(value);
}

export function formatDate(date: number, locale = 'en-US') {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const formattedDate = formatter.format(date);

  return formattedDate;
}

export function formatMonth(seconds: any) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short'
  });
  return formatter.format(new Date(seconds));
}

export function formatDateOrTime(date: Date): string {
  const currentDate = new Date();

  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    const timeDifference = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (timeDifference < 1) {
      const minutesDifference = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60));
      return `${minutesDifference} min ago`;
    } else {
      return `${timeDifference} hr ago`;
    }
  } else {
    const dayNameOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('en-US', dayNameOptions);
  }
}
