const {Schema, model} = require('mongoose');

const Post = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  near_wallet: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  nft_link: {
    type: String,
  },
  likes: {
    type: Array,
  },
});

module.exports = model("Post", Post);