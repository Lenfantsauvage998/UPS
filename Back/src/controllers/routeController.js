// src/controllers/routeController.js
import Node from '../models/node.js';
import Edge from '../models/edge.js'; // supongamos que tu modelo de arista

/**
 * Dijkstra sencillo sobre grafo en memoria
 */
function dijkstra(adjList, source, target) {
  const dist = {};
  const prev = {};
  const pq = new Map();

  Object.keys(adjList).forEach(u => {
    dist[u] = Infinity;
    prev[u] = null;
    pq.set(u, Infinity);
  });
  dist[source] = 0;
  pq.set(source, 0);

  while (pq.size) {
    // extraer nodo con menor distancia
    const u = [...pq.entries()].reduce((a, b) => a[1] < b[1] ? a : b)[0];
    pq.delete(u);
    if (u === target) break;

    for (const { to, weight } of adjList[u] || []) {
      const alt = dist[u] + weight;
      if (alt < dist[to]) {
        dist[to] = alt;
        prev[to] = u;
        if (pq.has(to)) pq.set(to, alt);
      }
    }
  }

  if (dist[target] === Infinity) return null;
  // reconstruir camino
  const path = [];
  let u = target;
  while (u) {
    path.unshift(u);
    u = prev[u];
  }
  return { path, distance: dist[target] };
}

/**
 * POST /api/route/shortest
 * Body: { nodes: [id1, id2, ..., idN] }
 */
export const getShortestPath = async (req, res, next) => {
  try {
    const { nodes } = req.body;

    // 1) Obtener todas las aristas
    const edges = await Edge.find().lean();
    // 2) Construir lista de adyacencia
    const adj = {};
    edges.forEach(e => {
      const from = e.from.toString();
      const to   = e.to.toString();
      if (!adj[from]) adj[from] = [];
      adj[from].push({ to, weight: e.weight });
      // si el grafo es no dirigido:
      if (!adj[to]) adj[to] = [];
      adj[to].push({ to: from, weight: e.weight });
    });

    // 3) Calcular trayecto concatenado
    let fullPath = [];
    let totalDist = 0;

    for (let i = 0; i < nodes.length - 1; i++) {
      const src = nodes[i];
      const dst = nodes[i + 1];
      const result = dijkstra(adj, src, dst);
      if (!result) {
        return res.status(404).json({
          error: `No hay camino entre ${src} y ${dst}`
        });
      }
      // unir sin duplicar el nodo de enlace
      if (i === 0) {
        fullPath = result.path;
      } else {
        fullPath = fullPath.concat(result.path.slice(1));
      }
      totalDist += result.distance;
    }

    // 4) Opcional: poblar nombres
    const docs = await Node.find({ _id: { $in: fullPath } })
      .select('name')
      .lean();
    const nameMap = docs.reduce((m, d) => (m[d._id] = d.name, m), {});

    const detailed = fullPath.map(id => ({
      id,
      name: nameMap[id] || null
    }));

    res.json({
      nodes: detailed,
      totalDistance: totalDist
    });
  } catch (err) {
    next(err);
  }
};
