import { BUILDING_COSTS } from '../game/Config.js';

const BUILDING_INFO = {
  sawmill: { name: '锯木厂', cost: BUILDING_COSTS.sawmill },
  furnitureFactory: { name: '家具厂', cost: BUILDING_COSTS.furnitureFactory },
  warehouse: { name: '仓库', cost: BUILDING_COSTS.warehouse },
  parkingLot: { name: '停车场', cost: BUILDING_COSTS.parkingLot },
  road: { name: '道路', cost: BUILDING_COSTS.road },
};

export class BuildMenu {
  static render() {
    return `
      <div class="build-menu">
        <h4>建造</h4>
        ${Object.entries(BUILDING_INFO).map(([type, info]) => `
          <button onclick="game.selectBuildType('${type}')">
            ${info.name} (${info.cost} 金币)
          </button>
        `).join('')}
      </div>
    `;
  }
}
