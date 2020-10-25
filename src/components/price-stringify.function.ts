const PriceStringify = (val: number): string => {
  return String(val)
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export { PriceStringify };
