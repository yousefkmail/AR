import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IRenderable {
  Render: ForwardRefExoticComponent<RefAttributes<any>>;
}
