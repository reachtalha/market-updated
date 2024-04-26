import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type TransferGroupStore = {
  transferGroup: string | null;
  setTransferGroup: (transferGroup: string | null) => void;
};

export const useTransferGroupStore = create(
  persist<TransferGroupStore>(
    (set, get) => ({
      transferGroup: null,
      setTransferGroup: (transferGroup: string | null) => set({ transferGroup })
    }),
    {
      name: 'transfer-group',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useTransferGroupStore;
