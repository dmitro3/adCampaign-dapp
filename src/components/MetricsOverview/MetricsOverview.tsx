import './MetricsOverview.scss'

interface MetricsOverviewProps {
    children: React.ReactNode
}

export default function MetricsOverview({children}: MetricsOverviewProps) {
    return (
        <div className="card-stats font-size-14 flex text-gray">
        <div className="flex justify-space-around align-center no-of-clicks bg-white dimension-styles">
           {children}
        </div>
    </div>
    );
}