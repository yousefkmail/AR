import { createContext, useRef } from "react";
import { Group, Object3DEventMap } from "three";
import { MutableRefObject } from "react";

interface EnvironmentContextProps {
  environment: MutableRefObject<Group<Object3DEventMap> | null>;
}
export const EnvironmentContext = createContext<EnvironmentContextProps>(
  {} as EnvironmentContextProps
);

export const EnvironmentContextProvider = ({ children }: any) => {
  const ref = useRef<Group<Object3DEventMap>>(null);
  return (
    <EnvironmentContext.Provider value={{ environment: ref }}>
      {children}
    </EnvironmentContext.Provider>
  );
};
