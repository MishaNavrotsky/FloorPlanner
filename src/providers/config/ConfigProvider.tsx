import { useCallback, useState } from "react";
import { ConfigContext, configContextDefaults, type ConfigData } from "./ConfigContext";
import merge from "lodash.merge";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {

  const [config, setConfig] = useState<ConfigData>(configContextDefaults.config);
  const patchConfig = useCallback((patch: Partial<ConfigData>) => {
    setConfig((cfg) => merge({}, cfg, patch))
  }, []);

  return (
    <ConfigContext.Provider value={{ config, patchConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};