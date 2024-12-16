import { forwardRef } from "react";
import { BasisPlane } from "../BasisPlane";
import { PngPlane, PngPlaneRef } from "../../Components/PngPlane/PngPlane";
import { Vector3 } from "three";
import { PiecePlaneViewModel } from "./PiecePlaneViewModel";
import { IRenderable } from "../../Interfaces/IRenderable";

class LayeredChild {
  child: PiecePlaneViewModel;
  layerIndex: number = 0;

  constructor(child: PiecePlaneViewModel, layerIndex: number = 0) {
    this.child = child;
    this.layerIndex = layerIndex;
  }
}

export class BasisPlaneViewModel implements IRenderable {
  public BasisPlane: BasisPlane;
  children: LayeredChild[] = [];

  constructor(BasisPlane: BasisPlane) {
    this.BasisPlane = BasisPlane;
  }

  addChild(child: PiecePlaneViewModel, layer: number = 0, pos: number) {
    if (!this.children.find((childd) => childd.child === child)) {
      child.setParent(this);
      child.PiecePlane.position = new Vector3(pos, 0, 0);
      child.PiecePlane.rotation = new Vector3(-90, 0, 0);
      this.children.push(new LayeredChild(child, layer));
    }
  }

  UpdateChildLayer(child: PiecePlaneViewModel, layer: number) {
    this.children = this.children.map((item) =>
      item.child === child ? { child: item.child, layerIndex: layer } : item
    );
  }

  removeChild(child: PiecePlaneViewModel) {
    this.children = this.children.filter(
      (childd) => childd.child.PiecePlane.id === child.PiecePlane.id
    );
  }

  Render = forwardRef<PngPlaneRef>((props, ref) => {
    return (
      <PngPlane ref={ref} {...this.BasisPlane} rotation={new Vector3(90, 0, 0)}>
        {this.children.map((child, index) => (
          <PngPlane
            key={child.child.PiecePlane.id}
            {...child.child.PiecePlane}
            applyOffset
            position={
              new Vector3(
                child.child.PiecePlane.position.x,
                ((this.BasisPlane.layers[child.layerIndex - 1]
                  ?.positionOffset ?? 0) +
                  index * 0.01) /
                  50,
                child.child.PiecePlane.position.z
              )
            }
          />
        ))}
      </PngPlane>
    );
  });
}
