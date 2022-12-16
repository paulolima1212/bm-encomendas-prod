export const dateFormatter = new Intl.DateTimeFormat('pt-pt', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export const priceFormatter = new Intl.NumberFormat('pt-pt', {
  style: 'currency',
  currency: 'EUR',
});
