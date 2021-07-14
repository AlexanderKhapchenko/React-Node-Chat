const { MessageRepository } = require('../repositories/messageRepository');

class MessageService {
    search(search) {
        const user = MessageRepository.getOne(search);
        if(!user) {
            null;
        }
        return user;
    }

    getAll(){
        const users = MessageRepository.getAll();
        if (!users) {
            return null;
        }
        return users;
    }

    create(user){
        const newMsg = MessageRepository.create(user);
        if (!newMsg) {
            return null;
        }
        return newMsg;
    }

    update(id, data){
        const updatedUser = MessageRepository.update(id, data);
        if (!updatedUser) {
            return null;
        }
        return updatedUser;
    }

    delete(id){
        const removed = MessageRepository.delete(id);
        if (!removed) {
          return null;
        }
        return removed;
    }
}

module.exports = new MessageService();