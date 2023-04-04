You can take the demo of the server on postman, server is deployed on -> https://binary-cd9o.onrender.com
note: the server turns off when inactive for 15 minutes, so it may take time to load for the very first time.

To view the Binary tree and it's structure, run the GET API - 
  '/'

To view the binary tree, run the API with endpoint - 
  /add-element
  the body should have - 
  {
    id: 'this is the id of the parent under which you want to add the new element',
    value: 'numerical value of the new node',
    position: 'left or right indicating the position of new node under parent with _id = id'
  }

To perform BFS and get the desired output, run the API-
  /perform-bfs/:parentId,
  the parentId is the id of the starting node in the binary tree from which you want to perform BFS
