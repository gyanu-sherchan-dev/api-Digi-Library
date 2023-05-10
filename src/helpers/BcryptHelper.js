import bcrypt from "bcryptjs";

const saltRounds = 10; //how many time it will encrypt, 10 rounds

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};
