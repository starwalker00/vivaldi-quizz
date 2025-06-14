'use client';

import { useQuizStore } from '@/app/lib/store';
import { useEffect, useState, useRef } from 'react';

export default function ProgressBar() {
    const { shuffled, index, history, score } = useQuizStore();
    const total = shuffled.length;

    // État local pour l’index du point à faire clignoter
    const [blinkIndex, setBlinkIndex] = useState<number | null>(null);
    const prevIndex = useRef<number>(-1);

    useEffect(() => {
        if (prevIndex.current >= 0 && index > 0) {
            setBlinkIndex(prevIndex.current);
            const timer = setTimeout(() => setBlinkIndex(null), 1500);
            // Met à jour prevIndex seulement après avoir lancé le timer
            prevIndex.current = index;
            return () => clearTimeout(timer);
        } else {
            // Initialisation la première fois sans clignoter
            prevIndex.current = index;
        }
    }, [index]);

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
        <>
            <div className="flex flex-col items-center gap-2 my-4">
                <div className="flex gap-1 justify-center">
                    {Array.from({ length: total }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-5 h-5 rounded-sm ${getColor(i)} transition-all duration-300
                            ${blinkIndex === i ? 'blink-3' : ''}
                        `}
                            title={`Morceau ${i + 1}`}
                        ></div>
                    ))}
                </div>
                <div className="text-sm text-gray-700 font-medium">
                    {score} / {total}
                </div>
            </div>
            <style jsx>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .blink-3 {
          animation: blink 0.5s ease-in-out 3;
        }
      `}</style>
        </>
    );
}
