export type TUser = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export default class Users {
  private readonly usersData: TUser[];

  constructor() {
    this.usersData = [];
  }

  get allUsers(): TUser[] {
    return this.usersData;
  }

  getUser(id: string): TUser | undefined {
    return this.usersData.find((item) => item.id == id);
  }

  createUser(user: TUser): TUser {
    this.usersData.push(user);
    return user;
  }

  updateUser(user: TUser): TUser | undefined {
    const targetUser = this.getUser(user.id);
    if (!targetUser) return undefined;
    Object.assign(targetUser, user);
    return targetUser;
  }

  deleteUser(id: string) : void {
    const index = this.usersData.findIndex((item) => item.id === id);
    this.usersData.splice(index, 1);
  }
}
