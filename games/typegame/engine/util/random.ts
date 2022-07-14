export function rangeInteger(max: number, min: number = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function rangeFloat(max: number, min: number = 0) {
  return Math.random() * (max - min) + min;
}

export function color() {
  return Math.round(Math.random() * 0xffffff);
}
