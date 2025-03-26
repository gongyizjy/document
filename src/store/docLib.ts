import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DocLib {
  docLibId: string;
  setDocLibId: (docLibId: string) => void;
}

export const useDocLib = create<DocLib>()(
  persist(
    (set) => ({
      docLibId: "",
      setDocLibId: (docLibId: string) => set({ docLibId }),
    }),
    {
      name: "doc-lib-id",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDocLib;
