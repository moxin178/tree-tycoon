import { Economy } from '../../js/systems/Economy.js';

describe('Economy', () => {
  test('selling wood gives gold', () => {
    const economy = new Economy();
    const earned = economy.sellResource('wood', 5);
    expect(earned).toBe(10);
    expect(economy.gold).toBe(10);
  });

  test('selling planks gives more gold per unit', () => {
    const economy = new Economy();
    const earned = economy.sellResource('planks', 2);
    expect(earned).toBe(12);
  });

  test('spendGold reduces gold', () => {
    const economy = new Economy();
    economy.addGold(100);
    expect(economy.spendGold(30)).toBe(true);
    expect(economy.gold).toBe(70);
  });

  test('cannot spend more than available', () => {
    const economy = new Economy();
    expect(economy.spendGold(30)).toBe(false);
  });
});
