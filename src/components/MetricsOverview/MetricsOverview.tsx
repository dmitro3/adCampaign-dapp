import './MetricsOverview.css'
interface MetricsOverviewProps {
    clicks: number;
    src: string;

}
export default function MetricsOverview({ clicks,src }: MetricsOverviewProps) {
    return (
        <div className="card-stats font-size-14 flex text-gray">
            <div className="flex justify-space-around align-center no-of-clicks bg-white">
                <img src={src} alt={src} />
                <span>{clicks} Clicks</span>
            </div>
        </div>
    );
}

