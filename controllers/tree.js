import Tree from "../models/tree.js"
import Queue from "./queue.js";

export const getAllTreeElements = async (req, res) => {
  try {
    const tree = await Tree.find();

    res.status(200).json({
      tree: tree,
      message: 'This is the Binary Tree, to perform bfs, run the get API with endpoint - /perform-bfs/:startingNodeId, to add an element - /add-element with body: {parentId(as id), value, position: ("left" or "right")}'
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
}

export const addElement = async (req, res) => {
  try {
    const { id, value, position } = req.body;
    //the id under which we want to add a new element
    if(!position){
      throw new Error('position is necessary, either left or right.')
    }
    if(!id){
      // create new tree
      const newTree = new Tree({
        value: value,
      });
      await newTree.save();

      res.status(201).json({
        treeRoot: newTree,
        message: "New Tree Created"
      });
    }else{
      const treeNode = await Tree.findById(id);

      if(treeNode.leftChild && position === 'left'){
        throw new Error('Left child of this node are full');
      }
      if(treeNode.rightChild && position === 'right'){
        throw new Error('Right child of this node are full');
      }

      const newNode = new Tree({
        value: value,
        parent: id,
      })
      await newNode.save();

      if(position === 'left'){
        treeNode.leftChild = newNode._id
      }else if(position === 'right'){
        treeNode.rightChild = newNode._id
      }

      const updatedNode = await Tree.findByIdAndUpdate(
        id,
        { leftChild: treeNode.leftChild, rightChild: treeNode.rightChild },
        { new: true }
      );

      res.status(201).json({
        treeRoot: updatedNode,
        newNode: newNode,
        message: "Element added."
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }
}

export const performBFS = async (req, res) => {
  try {
    const { startId } = req.params;

    const treeRoot = await Tree.findById(startId);
    if(!treeRoot){
      throw new Error(`No Tree Found with _id: ${startId}.`)
    }

    let q = new Queue;
    const BFSTraversal = [];
    q.enqueue(treeRoot._id);
    while(!q.isEmpty()){
      const nodeId = q.peek();
      q.dequeue();
      if(!nodeId){
        break;
      }

      const node = await Tree.findById(nodeId);

      BFSTraversal.push({
        _id: nodeId,
        value: node.value
      });

      if(node.leftChild){
        q.enqueue(node.leftChild);
      }
      if(node.rightChild){
        q.enqueue(node.rightChild);
      }

    }

    res.status(200).json({
      message: "The BFS Traversal of the Tree with values and _ids is: ",
      BFSTraversal: BFSTraversal
    });

  } catch (err) {
    res.status(404).json({
      message: err.message
    })
  }

}