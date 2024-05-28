import './CardStats.scss'
interface CardStatsProps {
    children: React.ReactNode
}

export default function CardStats({children}: CardStatsProps) {
    return (
        <div className="card-stats font-size-14 flex text-gray">
            <div className="flex justify-space-around align-center no-of-clicks bg-white dimension-styles">
               {children}
            </div>
        </div>
    );
}

