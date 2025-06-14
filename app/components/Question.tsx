type Props = {
    onAnswer: (saison: string) => void;
};

export default function Question({ onAnswer }: Props) {
    const options = ["Printemps", "Été", "Automne", "Hiver"];

    return (
        <div className="space-y-2">
            <p className="text-xl font-medium">Quelle est cette saison ?</p>
            {options.map((saison) => (
                <button
                    key={saison}
                    onClick={() => onAnswer(saison)}
                    className="block w-full px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded"
                >
                    {saison}
                </button>
            ))}
        </div>
    );
}
