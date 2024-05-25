interface CardStatsProps {
    clicks: number;
    src: string;

}
export default function CardStats({ clicks,src }: CardStatsProps) {
    return (
        <div className="card-stats">
            <div className="flex justify-center align-center no-of-clicks bg-white">
                <img src={src} alt={src} />
                <span>{clicks} Clicks</span>
            </div>
        </div>
    );
}

