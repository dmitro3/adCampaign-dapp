

interface InfoBadgeProps {
    type: 'text' | 'img';
}

const InfoBadge: React.FC<InfoBadgeProps> = ({ type }) => {
    if (type === 'text') {
        return (
            <div className="views-modal font-weight-600 ff-primary font-size-16 text-black">
                <div className="view-option">
                    <span>Views</span>
                    <span>4m+</span>
                </div>
                <div className="view-option active">
                    <span>Views</span>
                    <span>7m+</span>
                </div>
                <div className="view-option">
                    <span>Views</span>
                    <span>4m+</span>
                </div>
            </div>
        );
    } else if (type === 'img') {
        return (
            <div className="views-modal2 font-weight-600 ff-primary font-size-16 text-black">
            <img src="/message.png" alt="Message Icon" />
        </div>
        );
    } else {

        return <div>Invalid type</div>;
    }
}

export default InfoBadge;
