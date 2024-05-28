import './StartCampaignBtn.css'
interface StartCampaignBtnProps {
   line1: string;
    line2: string;
}
export default function StartCampaignBtn({ line1, line2 }: StartCampaignBtnProps) {
    return (
        <button className="campaign-button">
        <span>{line1}</span>
        <span>{line2}</span>
      </button>
    );
}   