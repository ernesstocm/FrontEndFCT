import { updateUser, createUser, } from './../../graphql/user/mutations/mutations';
import { UpdateUserInput } from './../models/objects/user/updateUserInput';
import { getAllUsers, getAllUsersDeleted } from '../../graphql/user/queries/queries';
import { Apollo } from 'apollo-angular';
import { UserResponse } from '../models/objects/user/user.response';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CreateUserInputDto } from '../models/objects/user/create-user.input.dto';
import { User } from '../models/objects/user/user';

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(
        private readonly apollo: Apollo) { }

    getUsersActives$() {
        return this.apollo
            .query({
                query: getAllUsers,
                variables: {}
            }).pipe(map(result => {
                return new UserResponse(result.data['getAllUsers'])
            }));
    }

    getUsersDeleted$() {
        return this.apollo
            .query({
                query: getAllUsersDeleted,
                variables: {}
            }).pipe(map(result => {
                return new UserResponse(result.data['getAllUsersDeleted'])
            }));
    }

    updateUser$(UpdateUserInput: UpdateUserInput) {
        return this.apollo
            .mutate({
                mutation: updateUser,
                variables: {
                    UpdateUserInput
                }
            }).pipe(map(result => {
                return Boolean;
            }));
    }

    createUser$(createUserInputDto: CreateUserInputDto) {
        return this.apollo
            .mutate({
                mutation: createUser,
                variables: {
                    createUserInputDto
                }
            }).pipe(map(result => {
                console.log(result)
                return result.data['createUser'];
            }));
    }
}