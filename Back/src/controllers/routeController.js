import { isConnected, shortestPath } from '../services/routeService.js';

export const checkConnectivity = async (req, res, next) => {
  try {
    const ok = await isConnected();
    res.json({ connected: ok });
  } catch (err) {
    next(err);
  }
};

export const getShortestPath = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ message: 'Faltan parámetros start/end' });
    }
    const result = await shortestPath(start, end);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
