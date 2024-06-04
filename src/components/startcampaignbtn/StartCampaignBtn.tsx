import { useNavigate } from 'react-router-dom';
import './StartCampaignBtn.css'
interface StartCampaignBtnProps {
   line1: string;
    line2: string;
}
export default function StartCampaignBtn({ line1, line2 }: StartCampaignBtnProps) {
   const navigate = useNavigate();
    return (
        <button className="campaign-button" onClick={()=>navigate('/campaign/create')} >
        <span>{line1}</span>
        <span>{line2}</span>
      </button>
    );
}   