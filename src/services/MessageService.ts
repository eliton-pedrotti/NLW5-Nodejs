
import { getCustomRepository, Repository } from "typeorm"
import MessagesRepository from "../repositories/MessagesRepository"
import Message from '../entities/MessageEntities';


interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

export default class MessagesServices {

    private messages_repository: Repository<Message>;

    constructor(){
        this.messages_repository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, text, user_id }: IMessageCreate) {

        const message = this.messages_repository.create({
            admin_id,
            text,
            user_id
        })

        await this.messages_repository.save(message);

        return message;
    }

    async list_by_user(user_id: string){
        
        const list = await this.messages_repository.find({
            where: {
                user_id
            },
            relations: ["user"]
        })

        return list;
    }
}