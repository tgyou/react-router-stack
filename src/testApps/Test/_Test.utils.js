export function getRandomFruit() {
  const fruits = [
    'Apple',
    'Banana',
    'Pear',
    'Mango',
    'Cherry',
    'Strawberry',
    'Raspberry',
    'Blueberry',
    'Kiwi',
    'Lime',
    'Lemon',
    'Plum',
    'Watermelon',
    'Orange',
  ];

  return fruits[Math.floor(Math.random() * fruits.length)];
}
