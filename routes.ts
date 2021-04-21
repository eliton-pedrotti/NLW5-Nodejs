
import { Router } from 'express';
import SettingsController from './src/controllers/SettingsController';

const routes = Router();

const settings_controller = new SettingsController();

routes.post('/settings', settings_controller.create);

export default routes;