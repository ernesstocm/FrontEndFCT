import gql from 'graphql-tag';

// export const updateUser = gql`
// 	mutation updateUser($updateUserInput: UpdateUserInput) {
// 		updateUser(updateUserInput: $updateUserInput)
// 	}
// `;
export const createUser = gql`
	mutation createUser($createUserInputDto: CreateUserInputDto) {
		createUser(createUserInputDto: $createUserInputDto){
			result
		}
	}
`;
export const deleteUser = gql`
	mutation deleteUser($deleteUserInputDto: DeleteUserInputDto) {
		deleteUser(deleteUserInputDto: $deleteUserInputDto){
			result
		}
	}
`;
export const activeUser = gql`
	mutation activeUser($activeUserInputDto: ActiveUserInputDto) {
		activeUser(activeUserInputDto: $activeUserInputDto){
			result
		}
	}
`;
export const loginUser = gql`
	mutation loginUser($loginUserInput: LoginUserInput) {
		loginUser(loginUserInput: $loginUserInput){
			user{
				id,
				nick,
				urlImage,
				phone,
				role,
				email,
				deleted
			},
			result
		}
	}
`;