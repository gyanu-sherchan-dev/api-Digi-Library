import UserSchema from "./UserSchema.js";

//lets create the CRUD operation:

//create user
export const createUser = (userData) => {
  return UserSchema(userData).save();
};

// export const getUserByEmail = (filter) => {
//   return UserSchema.findOne({ filter });
// };

//get single user by user _id
export const getUserById = (_id) => {
  return UserSchema.findById(_id); //if you use findById, it is fast search query than not using because you have to go through unindex value. Also, you can use ByEmail too or user by filter
};
//get single user by filter, filter must be an object
export const getAnyUser = (filter) => {
  return UserSchema.findOne(filter); //if you use filter, then you have to call findOne(filter), so that it will return as object, but if you use only find(filter), then it will return as array
};

//update user, make sure _id is string and @updateDt is an object
export const udateUserById = (_id, updateDt) => {
  // we going to receive 2 arguments the user _id and the updating data
  return UserSchema.findByIdAndUpdate(_id, updateDt, { new: true });
};
//delete user, again _id must be a string
export const deleteUserById = (_id) => {
  return UserSchema.findByIdAndDelete(_id);
};
