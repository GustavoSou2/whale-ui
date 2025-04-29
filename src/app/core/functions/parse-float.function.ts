export function parseCurrencyToFloat(value: string): number {
  if (!value) return 0;

  const cleaned = value
    .replace(/[^\d,.-]/g, '') // remove tudo que não for número, vírgula, ponto ou traço
    .replace(/\./g, '') // remove os pontos (milhar)
    .replace(',', '.'); // troca vírgula decimal por ponto

  return parseFloat(cleaned);
}
