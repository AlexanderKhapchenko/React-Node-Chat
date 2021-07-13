const { UserRepository } = require('../repositories/userRepository');

class UserService {
    search(search) {
        const user = UserRepository.getOne(search);
        if(!user) {
            null;
        }
        return user;
    }

    getAll(){
        const users = UserRepository.getAll();
        if (!users) {
            return null;
        }
        return users;
    }

    create(user){	
        const newUser = UserRepository.create(user);
        if (!newUser) {
            return null;
        }
        return newUser;
    }

    update(id, data){
        const updatedUser = UserRepository.update(id, data);
        if (!updatedUser) {
            return null;
        }
        return updatedUser;
    }

    delete(id){
        const removedUser = UserRepository.delete(id);
        if (!removedUser) {
          return null;
        }
        return removedUser;
    }
}

module.exports = new UserService();