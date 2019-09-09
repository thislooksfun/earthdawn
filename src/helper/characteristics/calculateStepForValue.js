export default function(v) {
  // Check if v is in range
  if (v < 1 || v > 30) throw new Error(`Invalid value ${v}`);
  // Offset v by 1 so the math works easier
  return 2 + Math.floor((v - 1) / 3);
}
