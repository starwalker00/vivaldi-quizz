'use client';

import { useRef, useState, useEffect } from 'react';
import { useQuizStore } from '@/app/lib/store';
import AudioPlayer from './AudioPlayer'; // adapte le chemin si besoin
import ProgressBar from './ProgressBar'; // adapte le chemin si besoin

function ResetButton() {
    const reset = useQuizStore((state) => state.reset);

    return (
        <button
            onClick={reset}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
            Rejouer le quiz
        </button>
    );
}
export default function QuizPlayer() {
    const { addHistory, shuffled, index, next, incrementScore } = useQuizStore();
    const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
    const [triche, setTriche] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const current = shuffled[index];
    const total = shuffled.length;

    useEffect(() => {
        audioRef.current?.load();
        audioRef.current?.play();
        setWrongAnswers([]);
    }, [index]);

    const handleAnswer = (saison: string) => {
        if (saison === current.saison) {
            if (wrongAnswers.length === 0) {
                // bon du premier coup
                incrementScore();
                addHistory('success');
            }
            else if (wrongAnswers.length > 0) {
                // bon mais pas du premier coup
                addHistory('fail');
            }
            setTimeout(() => next(), 500);
        } else {
            if (!wrongAnswers.includes(saison)) {
                setWrongAnswers((prev) => [...prev, saison]);
            }
        }
    };

    const toutesSaisons = ['Printemps', 'Été', 'Automne', 'Hiver'];

    // jeu fini
    if (index >= total) {
        return (
            <div className={`flex flex-col items-center gap-6`}>
                <ProgressBar />
                <ResetButton />
            </div>
        );
    }

    // jeu en cours
    return (
        <div className={`flex flex-col items-center gap-6 transition-colors duration-500 `}>
            {/* <div className="text-center space-y-1">
                <p>✅ Réussis : {score}</p>
                <p>❌ Ratés : {ratés}</p>
                <p>🎼 Morceau : {index + 1} / {total}</p>
            </div> */}
            <ProgressBar />
            <AudioPlayer ref={audioRef} src={current.fichier} />

            {
                triche && (
                    <div className="mt-2 text-sm font-mono text-gray-600 space-y-1">
                        <p>Nom fichier (état React) : {current.fichier}</p>
                        <p>Source audio (DOM) : {audioRef.current?.currentSrc || 'chargement...'}</p>
                    </div>
                )
            }

            <div className="grid grid-cols-2 gap-4 mt-4">
                {toutesSaisons.map((saison) => (
                    <button
                        key={saison}
                        onClick={() => handleAnswer(saison)}
                        disabled={wrongAnswers.includes(saison)}
                        className={`px-4 py-2 rounded-lg text-white font-semibold transition
              ${wrongAnswers.includes(saison)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }
            `}
                    >
                        {saison}
                    </button>
                ))}
            </div>
            <ResetButton />
            <div className="mt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={triche}
                        onChange={() => setTriche(!triche)}
                        className="form-checkbox"
                    />
                    <span>Afficher le nom du fichier (triche)</span>
                </label>
            </div>
        </div >
    );
}
