import { SaveMigrator } from '../../js/save/SaveMigrator.js';

describe('SaveMigrator', () => {
  test('migrates v3 gold to starting gold', () => {
    const oldData = { saveVersion: 3, gold: 500, axeLevel: 3 };
    const migrated = SaveMigrator.migrateV3ToV4(oldData);
    expect(migrated.saveVersion).toBe(4);
    expect(migrated.gold).toBe(500);
  });

  test('migrates missing gold to zero', () => {
    const oldData = { saveVersion: 3 };
    const migrated = SaveMigrator.migrateV3ToV4(oldData);
    expect(migrated.gold).toBe(0);
    expect(migrated.diamonds).toBe(0);
  });

  test('marks migration source', () => {
    const oldData = { saveVersion: 3, gold: 100 };
    const migrated = SaveMigrator.migrateV3ToV4(oldData);
    expect(migrated.migratedFromV3).toBe(true);
  });
});
