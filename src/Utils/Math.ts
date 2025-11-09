export function changeHealth(input: number, output: number) {
  return input * (Math.pow(1, (output / input) - 1));
}

export function updateHealth(previousHealth: number, level: number) {
  return Math.ceil(previousHealth * (1 + (level / 4)));
}

export function updateInput(health: number, level: number) {
  return Math.floor(health / level);
}
