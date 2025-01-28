export const MinimumPriceUnitToUSD = (MPC: number) => {
  return MPC / 100;
};

export const To2DigitFixed = (number: number) => {
  return Math.round(number * 100) / 100;
};

export const CalculatePrice = (price: number, quantity: number) => {
  return To2DigitFixed(MinimumPriceUnitToUSD(price * quantity));
};
