const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const full = new Intl.NumberFormat('en');

export const formatCompact = (n) => compact.format(n);
export const formatNumber = (n) => full.format(n);
