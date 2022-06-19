export default class Users {
    constructor() {
        this.usersData = [];
    }
    get allUsers() {
        return this.usersData;
    }
    getUser(id) {
        return this.usersData.find((item) => item.id == id);
    }
    createUser(user) {
        this.usersData.push(user);
        return user;
    }
    updateUser(user) {
        const targetUser = this.getUser(user.id);
        if (!targetUser)
            return undefined;
        Object.assign(targetUser, user);
        return targetUser;
    }
    deleteUser(id) {
        const index = this.usersData.findIndex((item) => item.id === id);
        this.usersData.splice(index, 1);
    }
}
