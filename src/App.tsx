import { CanvasSizeProvider } from "./providers/canvas/size";
import CanvasRoot from "./CanvasRoot";
import { CanvasShapesProvider } from "./providers/canvas/shapes";
import { ControlProvider } from "./providers/control";
import { ConfigProvider } from "./providers/config";

const App = () => {
  return (
    <ConfigProvider>
      <CanvasSizeProvider>
        <ControlProvider>
          <CanvasShapesProvider>
            <CanvasRoot />
          </CanvasShapesProvider>
        </ControlProvider>
      </CanvasSizeProvider>
    </ConfigProvider>
  );
};

export default App;