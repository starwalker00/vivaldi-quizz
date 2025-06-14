type Props = {
    correct: boolean;
    expected: string;
    onNext: () => void;
};

export default function Feedback({ correct, expected, onNext }: Props) {
    return (
        <div className="mt-4 space-y-2">
            <p className="text-lg font-semibold">
                {correct ? "✅ Bonne réponse !" : `❌ Mauvaise réponse. C'était : ${expected}`}
            </p>
            <button
                onClick={onNext}
                className="px-4 py-2 bg-green-400 hover:bg-green-500 rounded"
            >
                Suivant
            </button>
        </div>
    );
}
