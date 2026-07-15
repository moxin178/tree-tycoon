import { BuildingPanel } from '../../js/ui/BuildingPanel.js';
import { Sawmill } from '../../js/buildings/Sawmill.js';

describe('BuildingPanel', () => {
  test('renders panel for sawmill', () => {
    const sawmill = new Sawmill(0, 0);
    const html = BuildingPanel.render(sawmill);
    expect(html).toContain('锯木厂');
    expect(html).toContain('等级');
  });

  test('upgrade cost scales with level', () => {
    const sawmill = new Sawmill(0, 0);
    const cost1 = BuildingPanel.getUpgradeCost(sawmill);
    sawmill.level = 2;
    const cost2 = BuildingPanel.getUpgradeCost(sawmill);
    expect(cost2).toBeGreaterThan(cost1);
  });
});
