const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
	// TODO: Implement methods to work with fighters
	getAll() {
		return FighterRepository.getAll();
	}

	create(body) {
		return FighterRepository.create(body);
	}

	search(id) {
		const item = FighterRepository.getOne(id);
		if (!item) {
			return null;
		}
		return item;
	}

	update(id, dataToUpdate) {
		return FighterRepository.update(id, dataToUpdate);
	}

	delete(id) {
		return FighterRepository.delete(id);
	}
}

module.exports = new FighterService();
