import mongoose from "mongoose";

const treeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  parent: {
    type: String,
    default: null
  },
  leftChild: {
    type: String,
    default: null
  },
  rightChild: {
    type: String,
    default: null
  }
});

const Tree = mongoose.model('tree', treeSchema);

export default Tree;