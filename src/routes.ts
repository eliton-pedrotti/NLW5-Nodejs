
import { Router } from 'express';
import MessagesController from './controllers/MessagesController';
import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersControllers';

const routes = Router();

const settings_controller = new SettingsController();
const users_controller = new UsersController();
const message_controller = new MessagesController();

routes.post('/settings', settings_controller.create);
routes.get('/settings/:username', settings_controller.findByUsername);
routes.put('/settings/:username', settings_controller.update);
routes.post('/users', users_controller.create);
routes.post('/messages', message_controller.create);
routes.get('/messages/:id', message_controller.show_by_user);

export default routes;