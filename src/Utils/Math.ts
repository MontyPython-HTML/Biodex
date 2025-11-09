export function changeHealth(current: number, target: number) {
  const ratio = target / current;
  return current * ratio;
}

export function updateHealth(previousHealth: number, level: number) {
  const growthRate = 0.05;
  return Math.ceil(previousHealth * (1 + growthRate * level));
}

export function updateInput(totalHealth: number, level: number) {
  return Math.floor(totalHealth / (1 + 0.05 * level));
}
