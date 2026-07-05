function sellWood(state) {
  const earnings = state.wood * state.woodPrice;
  state.gold += earnings;
  state.wood = 0;
}

module.exports = { sellWood };
