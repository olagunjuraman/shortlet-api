import { Router } from 'express';
import { LanguageController } from '../controllers/languageController';
const router = Router();
const languageController = new LanguageController();
router.get('/', languageController.getLanguages.bind(languageController));

export default router;