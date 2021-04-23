import { getCustomRepository, Repository } from 'typeorm';
import Setting from '../entities/SettingsEntities';
import SettingsRepository from '../repositories/SettingsRepositories';

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

export default class SettingsService {

    private settings_repository: Repository<Setting>;

    constructor(){
        this.settings_repository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {


        const user_already_exists = await this.settings_repository.findOne({
            username
        });

        if(user_already_exists){
            throw new Error('User already exists!');
        }

        const settings = this.settings_repository.create({
            chat,
            username
        });

        await this.settings_repository.save(settings);

        return settings;
    }

    async findByUsername(username: string){
        const settings = await this.settings_repository.findOne({
            username
        });

        return settings;
    }

    async update(username: string, chat: boolean){
        const settings = await this.settings_repository.createQueryBuilder().update(Setting).set({chat}).where("username = :username", {
            username
        }).execute();
    }   
}