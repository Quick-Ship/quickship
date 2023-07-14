import { create } from "zustand";

interface PaginationStoreState {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
  setPageInfo: (pageInfo: any) => void;
  pagingData: {
    startCursor?: string;
    endCursor?: string;
  };
  setPagingData: (pagingData: {
    startCursor?: string;
    endCursor?: string;
  }) => void;
}

export const usePaginationStore = create<PaginationStoreState>((set) => ({
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  },
  setPageInfo: (pageInfo: any) =>
    set({
      pageInfo: {
        hasNextPage: pageInfo.hasNextPage,
        hasPreviousPage: pageInfo.hasPreviousPage,
        startCursor: pageInfo.startCursor,
        endCursor: pageInfo.endCursor,
      },
    }),
  pagingData: {
    startCursor: "",
    endCursor: "",
  },
  setPagingData: (pagingData) => set({ pagingData }),
}));
