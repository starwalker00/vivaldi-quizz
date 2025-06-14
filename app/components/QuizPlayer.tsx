'use client';

import { useRef, useState, useEffect } from 'react';
import { useQuizStore } from '@/app/lib/store';

export default function QuizPlayer() {
    const { shuffled, index, next, score, incrementScore, reset } = useQuizStore();
    const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
    const [triche, setTriche] = useState(true);
    const [success, setSuccess] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const current = shuffled[index];
    const total = shuffled.length;
    const ratés = index - score;

    useEffect(() => {
        audioRef.current?.load();
        audioRef.current?.play();
        setWrongAnswers([]);
    }, [index]);

    const handleAnswer = (saison: string) => {
        if (saison === current.saison) {
            if (wrongAnswers.length === 0) {
                incrementScore(); // bon du premier coup
                setSuccess(true);
                setTimeout(() => setSuccess(false), 1000); // effet pendant 1s
            }
            setTimeout(() => next(), 500);
        } else {
            if (!wrongAnswers.includes(saison)) {
                setWrongAnswers((prev) => [...prev, saison]);
            }
        }
    };

    const toutesSaisons = ['Printemps', 'Été', 'Automne', 'Hiver'];

    if (index >= total) {
        return (
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">🎉 Quiz terminé !</h2>
                <p className="text-lg">✅ Réussis : {score} / {total}</p>
                <p className="text-lg">❌ Ratés : {ratés}</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center gap-6 transition-colors duration-500 ${success ? 'bg-green-200' : ''}`}>            <div className="text-center space-y-1">
            <p>✅ Réussis : {score}</p>
            <p>❌ Ratés : {ratés}</p>
            <p>🎼 Morceau : {index + 1} / {total}</p>
        </div>

            <audio controls ref={audioRef} autoPlay>
                <source src={current.fichier} type="audio/mpeg" />
                Votre navigateur ne supporte pas l&apos;audio.
            </audio>

            {triche && (
                <div className="mt-2 text-sm font-mono text-gray-600 space-y-1">
                    <p>Nom fichier (état React) : {current.fichier}</p>
                    <p>Source audio (DOM) : {audioRef.current?.currentSrc || 'chargement...'}</p>
                </div>
            )}

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
            <button
                onClick={() => reset()}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
                🔁 Rejouer le quiz
            </button>
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
        </div>
    );
}
