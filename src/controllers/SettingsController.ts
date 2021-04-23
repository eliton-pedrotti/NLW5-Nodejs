
import { Request, Response } from 'express';
import SettingsService from '../services/SettingsServices';

export default class SettingsController {
    async create(req: Request, res: Response) {

        const { chat, username } = req.body;

        const settings_service = new SettingsService();

        try {
            const settings = await settings_service.create({
                chat,
                username
            })

            res.json(settings);
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async findByUsername(req: Request, res: Response) {
        const { username } = req.params;

        const settings_service = new SettingsService();

        const settings = await settings_service.findByUsername(username);

        return res.json(settings);
    }

    async update(req: Request, res: Response) {
        const { username } = req.params;
        const { chat } = req.body;

        const settings_service = new SettingsService();

        const settings = await settings_service.update(username, chat);

        return res.json(settings);
    }

}