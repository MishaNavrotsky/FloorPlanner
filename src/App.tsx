import { CanvasSizeProvider } from "./providers/canvas/size";
import CanvasRoot from "./components/CanvasRoot";
import { CanvasShapesProvider } from "./providers/canvas/shapes";
import { ControlEventsProvider } from "./providers/control/events";
import { ConfigProvider } from "./providers/config";
import { ControlToolsProvider } from "./providers/control/tools";
import ToolsSelector from "./components/ToolsSelector";

const App = () => {
  return (
    <ConfigProvider>
      <CanvasSizeProvider>
        <ControlEventsProvider>
          <ControlToolsProvider>
            <CanvasShapesProvider>
              <CanvasRoot />
              <ToolsSelector />
            </CanvasShapesProvider>
          </ControlToolsProvider>
        </ControlEventsProvider>
      </CanvasSizeProvider>
    </ConfigProvider>
  );
};

export default App;