const useTraverseTree = ()=>{
    function insertNode(tree,folderId,item,isFolder,){
        if(tree.id === folderId && tree.isFolder){
           return {
        ...tree,
        items: [
          {
            id: new Date().getTime(),
            name: item,
            isFolder,
            items: [],
          },
          ...tree.items, // This is the immutable way to unshift
        ],
      };
        }
        if (!tree.items) {
    return tree;
  }
        let lastestNode = []
        lastestNode = tree.items.map((obj)=>{
            return insertNode(obj,folderId,item,isFolder)
        })
        return {...tree,items:lastestNode}
    }
    return {insertNode}
}

export default useTraverseTree