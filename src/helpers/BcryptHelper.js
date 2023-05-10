import bcrypt from "bcryptjs";

const saltRounds = 10; //how many time it will encrypt, 10 rounds

//hashing the password
export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};

export const comparePassword = (plainPassword, hashedPasswordFromDB) => {
  return bcrypt.compareSync(plainPassword, hashedPasswordFromDB);
};
