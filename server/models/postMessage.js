import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: []
  },
  createAt: {
    type: Date,
    default: new Date(),
  }
});

// 转换PostMessage为model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;