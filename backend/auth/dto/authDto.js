export default class AuthDto {
	email;
	id;
	username;
	isActivated;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
		this.username = model.username;
		this.isActivated = model.isActivated;
	}
}
