import { create } from "zustand";

interface LogObject {
  Action: string;
  Date: string;
  Success: string | boolean;
  Time: string;
}

interface LogState {
  logs: LogObject[];
  addLog: (Action: string, isSucces: string) => void;
}
const currentdateLL = new Date();
const useLogStore = create<LogState>((set) => ({
  logs: [],
  addLog: (Action: string, isSucces: string) => {
    set((state) => ({
      logs: [
        ...state.logs,
        {
          Action: Action,
          Date:
            currentdateLL.getDate() +
            "/" +
            (currentdateLL.getMonth() + 1) +
            "/" +
            currentdateLL.getFullYear(),
          Success: isSucces,
          Time:
            currentdateLL.getHours() +
            ":" +
            currentdateLL.getMinutes() +
            ":" +
            currentdateLL.getSeconds(),
        } as LogObject,
      ],
    }));
  },
}));

export default useLogStore;
