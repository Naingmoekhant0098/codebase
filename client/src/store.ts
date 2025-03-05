import { create } from 'zustand'

interface stateProps {
    count :number,
    increasePopulation:()=>void

}
export const useStore = create<stateProps>((set) => ({
    count: 0,
  increasePopulation: () => set((state) => ({ count: state.count + 1 })),
   
}))
