
import { io } from '../http';
import ConnectionService from '../services/ConnectionService';
import MessagesServices from '../services/MessageService';

io.on("connect", async (socket) => {

    const connections_service = new ConnectionService();
    const message_service = new MessagesServices();

    const all_connections_without_admin = await connections_service.findAllWithoutAdmin();

    io.emit("admin_list_all_users", all_connections_without_admin);

    socket.on("admin_list_messages_by_users", async (params, callback) => {
        const { user_id } = params;

        const all_messages = await message_service.list_by_user(user_id);

        callback(all_messages);
    });

    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;

        await message_service.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const { socket_id } = await connections_service.findByUserId(user_id);

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        });
    });

    socket.on("admin_user_in_support", async params => {
        const { user_id } = params;
        
        await connections_service.update_admin_id(user_id, socket.id);

        const all_connections_without_admin = await connections_service.findAllWithoutAdmin();

        io.emit("admin_list_all_users", all_connections_without_admin);


    });
});