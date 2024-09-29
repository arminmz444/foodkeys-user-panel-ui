export function toCurrency(
  number: number | string,
  disableDecimal = false,
  decimalPlaces = 2
) {
  const formatter = new Intl.NumberFormat('fa-ir', {
    style: 'currency',
    currency: 'IRR',
    minimumFractionDigits: disableDecimal ? 0 : decimalPlaces,
    maximumFractionDigits: disableDecimal ? 0 : decimalPlaces,
  });
  return formatter.format(+number);
}
