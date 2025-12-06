import { useState } from "react"
import { ControlToolsContext, controlToolsContextDefaults, type TOOL_TYPE_VALUES } from "./ControlToolsContext"


export const ControlToolsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTool, setSelectedTool] = useState<TOOL_TYPE_VALUES>(controlToolsContextDefaults.selectedTool);
  return (
    <ControlToolsContext.Provider value={{ selectedTool, setSelectedTool }}>
      {children}
    </ControlToolsContext.Provider>)
}