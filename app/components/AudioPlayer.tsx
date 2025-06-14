'use client';

import React, { forwardRef, useEffect, useState } from 'react';

type AudioPlayerProps = {
    src: string;
};

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(({ src }, ref) => {
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        setHighlight(true);
        const timer = setTimeout(() => setHighlight(false), 500);
        return () => clearTimeout(timer);
    }, [src]);

    return (
        <audio
            controls
            ref={ref}
            autoPlay
            className={`border-4 rounded-md transition-colors duration-500 ${highlight ? 'border-blue-600' : 'border-transparent'
                }`}
        >
            <source src={src} type="audio/mpeg" />
            Votre navigateur ne supporte pas l&apos;audio.
        </audio>
    );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
