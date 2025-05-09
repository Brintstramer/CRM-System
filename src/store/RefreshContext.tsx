import { createContext, useContext } from "react";

type RefreshContextType = {
  pauseRefresh: () => void;
  resumeRefresh: () => void;
};

export const RefreshContext = createContext<RefreshContextType>({
  pauseRefresh: () => {},
  resumeRefresh: () => {},
});

export const useRefresh = () => useContext(RefreshContext);
