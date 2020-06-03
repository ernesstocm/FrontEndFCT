import gql from 'graphql-tag';

// export const updateUser = gql`
// 	mutation updateUser($updateUserInput: UpdateUserInput) {
// 		updateUser(updateUserInput: $updateUserInput)
// 	}
// `;
export const createTask = gql`
	mutation createTask($createTaskInputDto: CreateTaskInputDto) {
		createTask(createTaskInputDto: $createTaskInputDto){
			result
		}
	}
`;
export const updateTask = gql`
	mutation updateTask($updateTaskInputDto: UpdateTaskInputDto) {
		updateTask(updateTaskInputDto: $updateTaskInputDto){
			result
		}
	}
`;