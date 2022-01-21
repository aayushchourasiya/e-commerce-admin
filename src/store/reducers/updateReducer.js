export const updateReducer = (state = false, action) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload;

    default:
      return state;
  }
};
