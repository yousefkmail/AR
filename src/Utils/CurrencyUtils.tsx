export const MinimumPriceUnitToUSD = (MPC: number) => {
  return MPC / 100;
};

export const To2DigitFixed = (number: number) => {
  return Math.round(number * 100) / 100;
};

export const CalculatePrice = (price: number, quantity: number = 1) => {
  return To2DigitFixed(MinimumPriceUnitToUSD(price * quantity));
};

export const GetCurrencyFormat = (price: number) => {
  return `$${price}`;
};
