import { forwardRef } from "react";
import { PiecePlane } from "../PiecePlane";
import { PngPlane, PngPlaneRef } from "../../Components/PngPlane/PngPlane";
import { BasisPlaneViewModel } from "./BasisPlaneViewModel";
import { IRenderable } from "../../Interfaces/IRenderable";
import { Vector3 } from "three";
import { v4 as uuidv4 } from "uuid";

export class PiecePlaneViewModel implements IRenderable {
  public PiecePlane: PiecePlane;
  public id: string;

  parent: BasisPlaneViewModel | null = null;
  isFlipped: boolean = false;
  constructor(BasisPlane: PiecePlane, id?: string) {
    this.PiecePlane = BasisPlane;
    this.id = id || uuidv4();
  }

  setParent(BasisPlane: BasisPlaneViewModel) {
    this.parent = BasisPlane;
  }

  removeParent() {
    this.parent = null;
  }

  leftPosition: () => number = () => {
    return this.PiecePlane.position.x - this.PiecePlane.width / 100;
  };

  rightPosition: () => number = () => {
    return this.PiecePlane.position.x + this.PiecePlane.width / 100;
  };

  baseLeft: () => number = () => {
    if (this.isFlipped) {
      return (
        this.PiecePlane.width / 2 -
        this.PiecePlane.baseWidth -
        this.PiecePlane.baseOffset
      );
    } else return this.PiecePlane.width / 2 - this.PiecePlane.baseOffset;
  };

  baseRight: () => number = () => {
    if (this.isFlipped) {
      return this.PiecePlane.width / 2 - this.PiecePlane.baseOffset;
    } else
      return (
        -this.PiecePlane.width / 2 +
        this.PiecePlane.baseWidth +
        this.PiecePlane.baseOffset
      );
  };

  Render = forwardRef<PngPlaneRef>((_props, ref) => {
    return (
      <PngPlane
        ref={ref}
        {...this.PiecePlane}
        id={this.id}
        scale={this.isFlipped ? new Vector3(-1, 1, 1) : new Vector3(1, 1, 1)}
        applyOffset
      />
    );
  });
}
