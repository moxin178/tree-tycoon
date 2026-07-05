export class Pathfinder {
  static findPath(world, start, end) {
    if (!world.isWalkable(start.x, start.y) || !world.isWalkable(end.x, end.y)) {
      return null;
    }

    const open = [];
    const closed = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    const key = (p) => `${p.x},${p.y}`;

    open.push(start);
    gScore.set(key(start), 0);
    fScore.set(key(start), Pathfinder.heuristic(start, end));

    while (open.length > 0) {
      open.sort((a, b) => fScore.get(key(a)) - fScore.get(key(b)));
      const current = open.shift();
      const currentKey = key(current);

      if (current.x === end.x && current.y === end.y) {
        return Pathfinder.reconstructPath(cameFrom, current);
      }

      closed.add(currentKey);

      for (const neighbor of Pathfinder.getNeighbors(world, current)) {
        const neighborKey = key(neighbor);
        if (closed.has(neighborKey)) continue;

        const tentativeG = gScore.get(currentKey) + 1;

        if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeG);
          fScore.set(neighborKey, tentativeG + Pathfinder.heuristic(neighbor, end));

          if (!open.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
            open.push(neighbor);
          }
        }
      }
    }

    return null;
  }

  static heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  static getNeighbors(world, point) {
    const dirs = [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
    ];
    return dirs
      .map(d => ({ x: point.x + d.x, y: point.y + d.y }))
      .filter(p => world.isWalkable(p.x, p.y));
  }

  static reconstructPath(cameFrom, current) {
    const path = [current];
    const key = (p) => `${p.x},${p.y}`;
    while (cameFrom.has(key(current))) {
      current = cameFrom.get(key(current));
      path.unshift(current);
    }
    return path;
  }
}
