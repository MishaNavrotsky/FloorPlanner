import { CanvasSizeProvider } from "./providers/canvas";
import CanvasRoot from "./CanvasRoot";

const App = () => {
  return (
    <CanvasSizeProvider>
        <CanvasRoot />
    </CanvasSizeProvider>
  );
};

export default App;