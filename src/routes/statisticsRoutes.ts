import { Router } from 'express';
import { StatisticsController } from '../controllers/statisticsController';
const router = Router();
const statisticsController = new StatisticsController();
router.get('/', statisticsController.getStatistics.bind(statisticsController));
export default router;