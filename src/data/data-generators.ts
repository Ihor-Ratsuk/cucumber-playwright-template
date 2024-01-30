export const generators = {
  random_number: (min: number = 0, max: number = 65536) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};