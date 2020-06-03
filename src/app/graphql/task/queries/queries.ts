import gql from 'graphql-tag';

export const getTaskActive = gql`
  query getTaskActive($getTaskActiveInput: GetTaskActiveByUserInput) {
    getTaskActive(getTaskActiveInput: $getTaskActiveInput){
        task{
        id,
        description,
        startDate,
        endDate,
        name,
        state,
      },
      count
    }
  }
`;
