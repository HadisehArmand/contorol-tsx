import { create } from "zustand";

export type LogObject = {
  Action: string;
  Date: string;
  Success: string;
  Time: string;
};

interface LogStore {
  logs: LogObject[];
  addLog: (log: LogObject) => void;
}

const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
}));

export default useLogStore;
