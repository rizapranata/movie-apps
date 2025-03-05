import { create } from "zustand";

const useMovieStore = create((set) => ({
  isPositionDetailPage: false,
  onChangePosition: (status) => set((state) => ({ isPositionDetailPage: state.isPositionDetailPage = status })),
}));

export default useMovieStore;