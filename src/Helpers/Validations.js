const emailValidation = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

const passwordValidation = (password) => {
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passRegex.test(password)) {
    return true;
  } else {
    return false;
  }
};

export { emailValidation,passwordValidation };
