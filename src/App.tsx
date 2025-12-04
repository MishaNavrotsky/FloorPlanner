import { CanvasSizeProvider } from "./providers/canvas";
import CanvasRoot from "./CanvasRoot";
import { EditorProvider } from "./providers/editor";
import { ControlProvider } from "./providers/control";

const App = () => {
  return (
    <CanvasSizeProvider>
      <ControlProvider>
        <EditorProvider>
          <CanvasRoot />
        </EditorProvider>
      </ControlProvider>
    </CanvasSizeProvider>
  );
};

export default App;