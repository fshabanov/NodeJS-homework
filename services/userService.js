const { UserRepository } = require("../repositories/userRepository");

class UserService {
	// TODO: Implement methods to work with user

	getAll() {
		return UserRepository.getAll();
	}

	search(search) {
		const item = UserRepository.getOne(search);
		if (!item) {
			return null;
		}
		return item;
	}

	create(data) {
		return UserRepository.create(data);
	}

	update(id, dataToUpdate) {
		return UserRepository.update(id, dataToUpdate);
	}

	delete(id) {
		return UserRepository.delete(id);
	}
}

module.exports = new UserService();
