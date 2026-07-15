const PRICES = {
  wood: 2,
  planks: 6,
  furniture: 30,
};

export class Economy {
  constructor() {
    this.gold = 0;
    this.diamonds = 0;
    this.totalEarned = 0;
  }

  addGold(amount) {
    this.gold += amount;
    this.totalEarned += amount;
  }

  spendGold(amount) {
    if (this.gold < amount) return false;
    this.gold -= amount;
    return true;
  }

  addDiamonds(amount) {
    this.diamonds += amount;
  }

  spendDiamonds(amount) {
    if (this.diamonds < amount) return false;
    this.diamonds -= amount;
    return true;
  }

  sellResource(type, amount) {
    const price = PRICES[type] || 0;
    const earnings = price * amount;
    this.addGold(earnings);
    return earnings;
  }

  getPrice(type) {
    return PRICES[type] || 0;
  }
}
