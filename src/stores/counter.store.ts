import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CounterState {
  count: number;
}

interface Actions {
  increment: (value: number) => void;
}

const storeApi: StateCreator<
  CounterState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  count: 0,

  // Actions
  increment: (value: number) => {
    const count = get().count + value;
    set({ count });
  },
});

export const useCounterStore = create<CounterState & Actions>()(
  devtools(storeApi)
);
