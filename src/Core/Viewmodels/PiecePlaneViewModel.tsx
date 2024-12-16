import { forwardRef } from "react";
import { PiecePlane } from "../PiecePlane";
import { PngPlane, PngPlaneRef } from "../../Components/PngPlane/PngPlane";
import { BasisPlaneViewModel } from "./BasisPlaneViewModel";
import { IRenderable } from "../../Interfaces/IRenderable";

export class PiecePlaneViewModel implements IRenderable {
  public PiecePlane: PiecePlane;
  parent: BasisPlaneViewModel | null = null;
  public physicsLayer: number = 0;

  constructor(BasisPlane: PiecePlane) {
    this.PiecePlane = BasisPlane;
  }

  setParent(BasisPlane: BasisPlaneViewModel) {
    this.parent = BasisPlane;
  }

  removeParent() {
    this.parent = null;
  }

  Render = forwardRef<PngPlaneRef>((_props, ref) => {
    return <PngPlane ref={ref} {...this.PiecePlane} applyOffset />;
  });
}
