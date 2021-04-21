import { Repository, EntityRepository } from "typeorm";
import Message from '../entities/MessageEntities';

@EntityRepository(Message)
export default class MessagesRepository extends Repository<Message>{

}