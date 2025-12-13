import { CanvasSizeProvider } from "./providers/canvas/size";
import CanvasRoot from "./components/CanvasRoot";
import { CanvasViewportProvider } from "./providers/canvas/viewport";
import { ControlEventsProvider } from "./providers/control/events";
import { ConfigProvider } from "./providers/config";
import { ControlToolsProvider } from "./providers/control/tools";
import ToolsSelector from "./components/ToolsSelector";
import Grid from "./components/Grid";

const App = () => {
  return (
    <ConfigProvider>
      <CanvasSizeProvider>
        <ControlEventsProvider>
          <ControlToolsProvider>
            <CanvasViewportProvider>
              <Grid />
              <CanvasRoot />
              <ToolsSelector />
            </CanvasViewportProvider>
          </ControlToolsProvider>
        </ControlEventsProvider>
      </CanvasSizeProvider>
    </ConfigProvider>
  );
};

export default App;