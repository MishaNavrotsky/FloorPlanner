import { CanvasSizeProvider } from "./providers/canvas";
import CanvasRoot from "./CanvasRoot";
import { EditorProvider } from "./providers/editor";

const App = () => {
  return (
    <CanvasSizeProvider>
      <EditorProvider>
        <CanvasRoot />
      </EditorProvider>
    </CanvasSizeProvider>
  );
};

export default App;