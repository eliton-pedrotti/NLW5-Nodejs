
import { Request, Response } from 'express';
import UserService from '../services/UsersService';

export default class UsersController {
    async create(req: Request, res: Response): Promise<Response> {

        const { email } = req.body;

        const users_service = new UserService();

        try {

            const user = await users_service.create(email)

            return res.json(user);

        } catch (error) {

            return res.status(400).json({
                message: error.message,

            })
        }
    }
}