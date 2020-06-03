import { ActiveUserInputDto } from './../models/objects/user/active-user.input.dto';
import { DeleteUserInputDto } from './../models/objects/user/delete-user.input.dto';
import { UserLoginInputDto } from './../models/objects/user/user-login.input.dto';
import { createUser,loginUser, deleteUser, activeUser } from './../../graphql/user/mutations/mutations';
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

    getUsers$() {
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

    createUser$(createUserInputDto: CreateUserInputDto) {
        return this.apollo
            .mutate({
                mutation: createUser,
                variables: {
                    createUserInputDto
                }
            }).pipe(map(result => {
                return result.data['createUser'];
            }));
    }
    deleteUser$(deleteUserInputDto: DeleteUserInputDto) {
        return this.apollo
            .mutate({
                mutation: deleteUser,
                variables: {
                    deleteUserInputDto
                }
            }).pipe(map(result => {
                return result.data['deleteUser'];
            }));
    }
    activeUser$(activeUserInputDto: ActiveUserInputDto) {
        return this.apollo
            .mutate({
                mutation: activeUser,
                variables: {
                    activeUserInputDto
                }
            }).pipe(map(result => {
                return result.data['activeUser'];
            }));
    }

    login$(loginUserInput: UserLoginInputDto){
        return this.apollo
        .mutate({
            mutation: loginUser,
            variables: {
                loginUserInput
            }
        }).pipe(map(result => {
            return result.data['loginUser'];
        }));
    }
}