"use client";

import { useState, useEffect } from "react";
import { pieces } from "./lib/data";
import AudioPlayer from "./components/AudioPlayer";
import Question from "./components/Question";
import Feedback from "./components/Feedback";

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    const random = Math.floor(Math.random() * pieces.length);
    setIndex(random);
    setAnswer(null);
  }, []);

  const handleAnswer = (userAnswer: string) => {
    setAnswer(userAnswer);
  };

  const handleNext = () => {
    const random = Math.floor(Math.random() * pieces.length);
    setIndex(random);
    setAnswer(null);
  };

  const current = pieces[index];
  const isCorrect = answer === current.saison;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">🎻 Les 4 Saisons de Vivaldi</h1>
      <AudioPlayer src={current.fichier} />
      {!answer ? (
        <Question onAnswer={handleAnswer} />
      ) : (
        <Feedback correct={isCorrect} expected={current.saison} onNext={handleNext} />
      )}
    </div>
  );
}
