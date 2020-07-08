import { numToUint8Array, numFromUint8Array, getPadding } from "./Helpers";

it("Buffer to number", () => {
  const numbers = [
    0,
    123,
    12314,
    123123,
    4324234,
    32434234,
    2147483648,
    3352352352,
  ];

  for (const num of numbers) {
    const buf = numToUint8Array(num);
    expect(num).toEqual(numFromUint8Array(buf));
  }
});

it("Padding is larger than content", async () => {
  // Because of how we use padding (unpadding) we need to make sure padding is always larger than the content
  // Otherwise we risk the unpadder to fail thinking it should unpad when it shouldn't.

  let bufsize = 0;
  for (let i = 1 ; i < (1 << 14) ; i++) {
    if (getPadding(i) === i) {
      bufsize = i;
    }
  }

  expect(bufsize).toEqual(0);
});
