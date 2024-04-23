import { create } from 'zustand';

type TransferGroupStore = {
  transferGroup: string | null;
  setTransferGroup: (transferGroup: string | null) => void;
};

const useTransferGroupStore = create<TransferGroupStore>((set) => ({
  transferGroup: null,
  setTransferGroup: (transferGroup) => set({ transferGroup })
}));

export default useTransferGroupStore;
