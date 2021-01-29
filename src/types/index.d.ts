declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import type { FC, SVGAttributes } from "react";
  const src: string;
  const ReactComponent: FC<SVGAttributes<SVGElement>>;

  export { ReactComponent };
  export default src;
}
declare module "*.gif";
