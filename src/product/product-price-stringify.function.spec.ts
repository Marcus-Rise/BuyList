import { ProductPriceStringify } from "./product-price-stringify.function";

describe("ProductPriceStringify", () => {
  test("15000", () => {
    expect(ProductPriceStringify(15000)).toEqual("15 000");
  });

  test("700", () => {
    expect(ProductPriceStringify(700)).toEqual("700");
  });

  test("20", () => {
    expect(ProductPriceStringify(20)).toEqual("20");
  });

  test("1700", () => {
    expect(ProductPriceStringify(1700)).toEqual("1 700");
  });

  test("2111700", () => {
    expect(ProductPriceStringify(2111700)).toEqual("2 111 700");
  });
});
