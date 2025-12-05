import type { LineConfig } from "konva/lib/shapes/Line";
import { createContext, useContext } from "react";

export interface ConfigData {
  tempShapeLine: Partial<LineConfig>,
  shapeLine: Partial<LineConfig>,
  gridLine: Partial<LineConfig>,
  backgroundColor: string,
}

interface ConfigContextValue {
  config: ConfigData;
  patchConfig: (config: Partial<ConfigData>) => void;
}

export const configContextDefaults: ConfigContextValue = {
  config: {
    tempShapeLine: {
      stroke: '#4da3ff', strokeWidth: 1, dashEnabled: true, dash: [10],
    },
    shapeLine: {
      fill: '#fefefe', strokeWidth: 10, stroke: '#e8eaffff',
    },
    gridLine: {
      stroke: '#e8eaffff', strokeWidth: 2,
    },
    backgroundColor: '#fbfeffff',
  },
  patchConfig(_) { },
}

export const ConfigContext = createContext<ConfigContextValue>(configContextDefaults);

export const useConfig = () => useContext(ConfigContext);