
import { getCustomRepository, Repository } from 'typeorm';
import User from '../entities/UserEntities';
import UsersRepository from '../repositories/UsersRepository';



export default class UsersService {

    private users_repository: Repository<User>

    constructor(){
        this.users_repository = getCustomRepository(UsersRepository);
    }
    async create(email: string) {

        const user_already_exists = await this.users_repository.findOne({
            email
        });

        if (user_already_exists) {
            return user_already_exists;
        }

        const user = this.users_repository.create({
           email
        });

        await this.users_repository.save(user);

        return user;
    }
}