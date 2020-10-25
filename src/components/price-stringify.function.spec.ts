import { PriceStringify } from "./price-stringify.function";

describe("PriceStringify", () => {
  test("15000", () => {
    expect(PriceStringify(15000)).toEqual("15 000");
  });

  test("700", () => {
    expect(PriceStringify(700)).toEqual("700");
  });

  test("20", () => {
    expect(PriceStringify(20)).toEqual("20");
  });

  test("1700", () => {
    expect(PriceStringify(1700)).toEqual("1 700");
  });

  test("2111700", () => {
    expect(PriceStringify(2111700)).toEqual("2 111 700");
  });
});
