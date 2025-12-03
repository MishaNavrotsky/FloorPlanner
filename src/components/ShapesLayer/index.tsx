import { Layer } from "react-konva";

const ShapesLayer = ({ children }: { children?: React.ReactNode }) => {
  return <Layer>{children}</Layer>
}

export default ShapesLayer;