import { io } from '../http';
import ConnectionService from '../services/ConnectionService';
import UserService from '../services/UsersService';
import MessagesServices from '../services/MessageService';

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {

    const connection_service = new ConnectionService();
    const user_service = new UserService();
    const messages_service = new MessagesServices();

    socket.on("client_first_access",  async (params) => {

        const socket_id = socket.id;

        const { text, email } = params as IParams;

        let user_id = null;

        const user_already_exists = await user_service.findByEmail(email);

        if(!user_already_exists){
            const user = await user_service.create(email);

            await connection_service.create({
                socket_id,
                user_id: user.id
            })

            user_id = user.id;
        }else{

            user_id = user_already_exists.id;

            const connection = await connection_service.findByUserId(user_already_exists.id);

            if(!connection){
                await connection_service.create({
                    socket_id,
                    user_id: user_already_exists.id
                })
            }else{
                connection.socket_id = socket_id;

                await connection_service.create(connection);
            }

            await connection_service.create({
                socket_id,
                user_id: user_already_exists.id
            })
        }

        await messages_service.create({
            text,
            user_id
        })
    })
});