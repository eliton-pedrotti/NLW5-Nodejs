import { Request, Response } from 'express';

import MessagesService from '../services/MessageService';

export default class MessagesController {
    async create(req: Request, res: Response) {

        const { admin_id, text, user_id } = req.body;


        const messages_service = new MessagesService();

        const message = await messages_service.create({
            admin_id,
            text,
            user_id

        })

        return res.json(message);

    }

    async show_by_user(req: Request, res: Response) {
        const { id } = req.params;

        const messages_service = new MessagesService();

        const list = await messages_service.list_by_user(id);

        return res.json(list);

    }
}