import { forwardRef } from "react";
import { PieceObject } from "../PiecePlane";
import { PngPlane, PngPlaneRef } from "../../Components/PngPlane/PngPlane";
import { BasisPlaneViewModel } from "./BasisPlaneViewModel";
import { IRenderable } from "../../Interfaces/IRenderable";
import { Vector3 } from "three";
import { v4 as uuidv4 } from "uuid";

export class PiecePlaneViewModel implements IRenderable {
  public PiecePlane: PieceObject;
  public id: string;

  parent: BasisPlaneViewModel | null = null;
  isFlipped: boolean = false;
  constructor(BasisPlane: PieceObject, id?: string) {
    this.PiecePlane = { ...BasisPlane };
    this.id = id || uuidv4();
  }

  setParent(BasisPlane: BasisPlaneViewModel) {
    this.parent = BasisPlane;
  }

  removeParent() {
    this.parent = null;
  }

  leftPosition: () => number = () => {
    return this.PiecePlane.position.x - this.PiecePlane.piece.width / 100;
  };

  rightPosition: () => number = () => {
    return this.PiecePlane.position.x + this.PiecePlane.piece.width / 100;
  };

  baseLeft: () => number = () => {
    if (this.isFlipped) {
      return (
        this.PiecePlane.piece.width / 2 -
        this.PiecePlane.piece.baseWidth -
        this.PiecePlane.piece.baseOffset
      );
    } else
      return this.PiecePlane.piece.width / 2 - this.PiecePlane.piece.baseOffset;
  };

  baseRight: () => number = () => {
    if (this.isFlipped) {
      return this.PiecePlane.piece.width / 2 - this.PiecePlane.piece.baseOffset;
    } else
      return (
        -this.PiecePlane.piece.width / 2 +
        this.PiecePlane.piece.baseWidth +
        this.PiecePlane.piece.baseOffset
      );
  };

  Render = forwardRef<PngPlaneRef>((_props, ref) => {
    return (
      <PngPlane
        ref={ref}
        {...this.PiecePlane.piece}
        id={this.id}
        scale={this.isFlipped ? new Vector3(-1, 1, 1) : new Vector3(1, 1, 1)}
        applyOffset
      />
    );
  });
}
