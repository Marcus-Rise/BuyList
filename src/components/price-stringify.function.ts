const PriceStringify = (val: number): string => {
  let buf = String(val);
  let text = "";

  const DIVIDER = 3;

  while (buf.length > DIVIDER) {
    const subStr = buf.substr(buf.length - DIVIDER);
    text = ` ${subStr}` + text;

    buf = buf.substr(0, buf.length - DIVIDER);
  }

  return buf + text;
};

export { PriceStringify };
