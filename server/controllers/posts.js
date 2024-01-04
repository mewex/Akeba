import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export const createNewPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await UserModel.findById(userId);
    const post = new PostModel({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await post.save();

    const allPosts = await PostModel.find();
    res.status(201).json(allPosts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const fetchFeedPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find();
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const retrieveUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await PostModel.find({ userId });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await PostModel.findById(id);
    const alreadyLiked = post.likes.get(userId);

    if (alreadyLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

