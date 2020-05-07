import gql from 'graphql-tag';

export const updateUser = gql`
	mutation updateUser($updateUserInput: UpdateUserInput) {
		updateUser(updateUserInput: $updateUserInput)
	}
`;
export const createUser = gql`
	mutation createUser($createUserInputDto: CreateUserInputDto) {
		createUser(createUserInputDto: $createUserInputDto){
			result
		}
	}
`;