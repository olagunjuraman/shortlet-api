import { Router } from 'express';
import { RegionController } from '../controllers/regionController';
const router = Router();
const regionController = new RegionController();
router.get('/', regionController.getRegions.bind(regionController));
export default router;