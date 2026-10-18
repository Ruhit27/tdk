const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function bnDigits(input: string | number) {
  return String(input).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}
