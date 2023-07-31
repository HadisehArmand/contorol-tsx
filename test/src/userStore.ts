import { create } from "zustand";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
}

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addMode: boolean;
  toggleAddMode: () => void;
  editMode: boolean;
  toggleEditMode: (id?: number) => void;
  currentId: number;
  setCurrentId: (id: number) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addMode: true,
  toggleAddMode: () =>
    set((state) => ({ addMode: !state.addMode, editMode: false })),
  editMode: false,
  toggleEditMode: (id) =>
    set((state) => ({
      editMode: !state.editMode,
      addMode: false,
      currentId: id || 0,
    })),
  currentId: 0,
  setCurrentId: (id) => set({ currentId: id }),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
