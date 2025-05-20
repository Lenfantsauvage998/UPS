import { fetchAllNodes } from './nodeService';
import { fetchAllEdges } from './edgeService';

/**
 * Construye la lista de adyacencia:
 * { nodoId: [ { to: vecinoId, weight }, … ], … }
 */
const buildAdjList = (nodes, edges) => {
  const adj = {};
  nodes.forEach(n => { adj[n._id] = []; });
  edges.forEach(e => {
    adj[e.from._id].push({ to: e.to._id, weight: e.weight });
    adj[e.to._id].push({ to: e.from._id, weight: e.weight });
  });
  return adj;
};

/**
 * Comprueba si el grafo es conexo (BFS).
 */
export const isConnected = async () => {
  const nodes = await fetchAllNodes();
  const edges = await fetchAllEdges();
  const adj = buildAdjList(nodes, edges);

  const start = nodes[0]._id;
  const visited = new Set([start]);
  const queue = [start];

  while (queue.length) {
    const u = queue.shift();
    adj[u].forEach(({ to }) => {
      if (!visited.has(to)) {
        visited.add(to);
        queue.push(to);
      }
    });
  }
  return visited.size === nodes.length;
};

export const shortestPath = async (startId, endId) => {
  // A) Carga de datos y armado del grafo
  const nodes = await fetchAllNodes();
  const edges = await fetchAllEdges();
  const adj = buildAdjList(nodes, edges);

  // B) Inicialización de distancias y rastreo
  const dist = {};      // ①
  const prev = {};      // ②
  nodes.forEach(n => {  // ③
    dist[n._id] = Infinity;
    prev[n._id] = null;
  });
  dist[startId] = 0;    // ④

  const visited = new Set(); // ⑤

  // C) Bucle principal de Dijkstra
  while (visited.size < nodes.length) {               // ⑥
    // 1. Elegir el siguiente nodo más cercano no visitado
    let u = null;                                     // ⑦
    let minDist = Infinity;                           // ⑧
    for (const id of Object.keys(dist)) {             // ⑨
      if (!visited.has(id) && dist[id] < minDist) {
        minDist = dist[id];
        u = id;
      }
    }
    if (u === null) break;           // ⑩
    if (u === endId) break;          // ⑪

    visited.add(u);                  // ⑫

    // 2. Relajar aristas salientes de u
    adj[u].forEach(({ to, weight }) => { // ⑬
      if (visited.has(to)) return;       // ⑭
      const alt = dist[u] + weight;      // ⑮
      if (alt < dist[to]) {              // ⑯
        dist[to] = alt;                  // ⑰
        prev[to] = u;                    // ⑱
      }
    });
  }

  // D) Reconstruir la ruta óptima
  const path = [];                    // ⑲
  let u = endId;                      // ⑳
  while (u) {                         // ㉑
    path.unshift(u);                  // ㉒
    u = prev[u];                      // ㉓
  }

  return {
    path,
    distance: dist[endId] === Infinity ? null : dist[endId] // ㉔
  };
};
