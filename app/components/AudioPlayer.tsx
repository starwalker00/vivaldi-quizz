type Props = {
    src: string;
};

export default function AudioPlayer({ src }: Props) {
    return (
        <audio controls autoPlay>
            <source src={src} type="audio/mp3" />
            Ton navigateur ne supporte pas l’audio.
        </audio>
    );
}
