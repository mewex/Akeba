import mongo from "mongoose";

const userID = new mongo.Types.ObjectId();

export const user = {
  _id: userID,
  firstName: "Ethiopian",
  lastName: "Fox",
  email: "fox@gmail.com",
  password: "$2b$1dsasdgsasda//G9JxQ48KXf4OAIe/X/AK9WUy",
  picturePath: "P1.jpeg",
  friends: [],
  location: "Shire, ET",
  occupation: "Educator",
  viewedProfile: 9847,
  impressions: 4736,
  createdAt: 100423,
  updatedAt: 110423,
  __v: 0,
};
