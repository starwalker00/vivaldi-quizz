'use client';

import { useQuizStore } from '@/app/lib/store';

export default function ProgressBar() {
    const { shuffled, index, history } = useQuizStore();
    const total = shuffled.length;

    const getColor = (i: number) => {
        if (i < index) {
            return history[i] === 'success' ? 'bg-green-500' : 'bg-red-500';
        } else if (i === index) {
            return 'bg-yellow-400'; // morceau en cours
        } else {
            return 'bg-gray-300'; // pas encore joué
        }
    };

    return (
        <div className="flex gap-1 my-4 justify-center">
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    className={`w-5 h-5 rounded-sm ${getColor(i)} transition-all duration-300`}
                    title={`Morceau ${i + 1}`}
                ></div>
            ))}
        </div>
    );
}
