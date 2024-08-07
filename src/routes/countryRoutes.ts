import { Router } from 'express';
import { CountryController } from '../controllers/countryController';
const router = Router();
const countryController = new CountryController();
router.get('/', countryController.getCountries.bind(countryController));
router.get('/:id', countryController.getCountryDetails.bind(countryController));
export default router;