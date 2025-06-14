import { create } from 'zustand';
import { pieces } from './data';

// type Saison = 'Printemps' | 'Été' | 'Automne' | 'Hiver';
type Resultat = 'success' | 'fail' | null;

interface QuizState {
    shuffled: typeof pieces;
    index: number;
    score: number;
    next: () => void;
    incrementScore: () => void;
    reset: () => void;
    history: Resultat[];
    addHistory: (result: Resultat) => void;
}

function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export const useQuizStore = create<QuizState>((set) => ({
    shuffled: shuffle(pieces),
    index: 0,
    score: 0,
    next: () =>
        set((state) => ({
            index: state.index + 1,
        })),
    incrementScore: () =>
        set((state) => ({
            score: state.score + 1,
        })),
    history: [] as Resultat[],
    addHistory: (result: Resultat) => set((state) => ({
        history: [...state.history, result]
    })),
    reset: () =>
        set(() => ({
            shuffled: shuffle(pieces),
            index: 0,
            score: 0,
            history: [],
        })),
}));
