import { User } from './user';

export class UserResponse {
    users: Array<User>;

    constructor(users: Array<User>) {
        this.users = users;
    }
}