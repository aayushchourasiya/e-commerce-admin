const updateData = (update) => {
  return {
    type: "UPDATE",
    payload: update,
  };
};

const currentUser = (user) => {
  return {
    type: "USER",
    payload: user,
  };
};

export { updateData, currentUser };
