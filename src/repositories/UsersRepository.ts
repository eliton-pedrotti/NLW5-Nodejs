import { Repository , EntityRepository} from "typeorm";
import User from '../entities/UserEntities';

@EntityRepository(User)
export default class UsersRepository extends Repository<User>{

}