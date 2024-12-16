import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export interface IRenderable {
  Render: ForwardRefExoticComponent<RefAttributes<any>>;
}
