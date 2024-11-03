export class PlaneNode {
  parent: PlaneNode | null;
  children: PlaneNode[];

  constructor() {
    this.parent = null;
    this.children = [];
  }

  // Method to set a parent for the node
  setParent(newParent: PlaneNode) {
    // If the node already has a parent, remove it from the parent's children
    if (this.parent) {
      this.parent.removeChild(this);
    }

    // Set the new parent and add this node to the new parent's children
    this.parent = newParent;
    if (newParent) {
      newParent.addChild(this);
    }
  }

  // Method to add a child node
  addChild(child: PlaneNode) {
    if (child && !this.children.includes(child)) {
      this.children.push(child);
      child.setParent(this);
    }
  }

  // Method to remove a child node
  removeChild(child: PlaneNode) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }
}
