import { Entry } from "contentful";
import { Piece } from "../Contentful/Types/PieceType";
import { Vector3 } from "three";

export class PlaneNodeData {
  id: number = 0;
  data: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>;
  position: Vector3 = new Vector3(1, 1, 1);
  rotation: Vector3 = new Vector3(0, 0, 0);
  constructor(
    id: number,
    data: Entry<Piece, "WITHOUT_UNRESOLVABLE_LINKS", string>
  ) {
    this.id = id;
    this.data = data;
  }
}

export class PlaneNode {
  parent: PlaneNode | null;
  children: PlaneNode[];
  data: PlaneNodeData;
  constructor(data: PlaneNodeData) {
    this.parent = null;
    this.children = [];
    this.data = data;
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
