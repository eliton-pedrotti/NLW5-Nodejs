
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SettingsRepository from '../repositories/SettingsRepositories';

export default class SettingsController {
    async create(req: Request, res: Response) {
        const { chat, username } = req.body;

        const settings_repository = getCustomRepository(SettingsRepository);

        const settings = settings_repository.create({
            chat,
            username
        });

        await settings_repository.save(settings);

        res.json(settings);
    }
}