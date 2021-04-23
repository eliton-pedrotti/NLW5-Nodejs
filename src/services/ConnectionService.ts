
import { getCustomRepository, Repository } from "typeorm"
import ConnectionsRepository from "../repositories/ConnectionsRepository"
import Connection from '../entities/Connection.entities';


interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id? :string;
}

export default class ConnectionsService {

    private connections_repository: Repository<Connection>;

    constructor(){
        this.connections_repository = getCustomRepository(ConnectionsRepository);
    }

    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {

        const connection = this.connections_repository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.connections_repository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string){
        const connection = await this.connections_repository.findOne({
            user_id
        })

        return connection;
    }
}