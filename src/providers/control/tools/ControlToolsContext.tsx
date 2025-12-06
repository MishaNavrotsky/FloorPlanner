import { createContext, useContext } from "react";

export const TOOL_TYPE = {
  SELECT: 0,
  INSERT_RECT: 1,
} as const;

export type TOOL_TYPE_VALUES = (typeof TOOL_TYPE)[keyof typeof TOOL_TYPE];

export interface ControlToolsContextValue {
  selectedTool: TOOL_TYPE_VALUES;
  setSelectedTool: (tool: TOOL_TYPE_VALUES) => void;
}

export const controlToolsContextDefaults: ControlToolsContextValue = {
  selectedTool: TOOL_TYPE.SELECT,
  setSelectedTool(_) { },
}

export const ControlToolsContext = createContext<ControlToolsContextValue>(controlToolsContextDefaults);

export const useControlTools = () => useContext(ControlToolsContext);