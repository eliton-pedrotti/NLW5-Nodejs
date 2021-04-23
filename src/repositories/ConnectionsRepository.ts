import { Repository, EntityRepository } from "typeorm";
import Connection from '../entities/Connection.entities';

@EntityRepository(Connection)
export default class ConnectionsRepository extends Repository<Connection>{

}