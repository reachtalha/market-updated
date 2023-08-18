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
