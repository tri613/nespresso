export function isColorBetween(colorRgb, coffeeRgb) {
  const [r, g, b] = colorRgb;
  const [cr, cg, cb] = coffeeRgb;
  const dx = r - cr;
  const dy = g - cg;
  const dz = b - cb;

  return dx * dx + dy * dy + dz * dz < 1300;
}
