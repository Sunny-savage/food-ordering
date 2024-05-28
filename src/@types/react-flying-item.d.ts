declare module "react-flying-item" {
  import { ComponentType, HTMLAttributes } from "react";

  interface FlyingButtonProps extends HTMLAttributes<HTMLDivElement> {
    targetTop: string;
    targetLeft: string;
    src: string;
  }

  const FlyingButton: ComponentType<FlyingButtonProps>;

  export default FlyingButton;
}
