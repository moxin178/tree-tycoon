function sellWood(state) {
  const woodToSell = Math.max(0, state.wood);
  const earnings = woodToSell * state.woodPrice;
  state.gold += earnings;
  state.wood = 0;
  return earnings;
}

module.exports = { sellWood };
