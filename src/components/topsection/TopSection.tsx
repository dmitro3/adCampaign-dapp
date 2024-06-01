import './TopSection.scss';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
export default function TopSection() {
    const navigate = useNavigate()
    return (
<div className='topsection flex justify-center bg-dark '>

        <div className='main-container bg-dark'>

        <div className="landing-page-container bg-dark ">
            <div className="grid-container grid-cols-2-md topsectiongrid">
                <div className="content">
                    <h1 className='font-size-49 text-white'>Harness the Power of Decentralized Advertising</h1>
                    <p className='font-size-16 ff-primary text-white'>Become an affiliate and earn instantly by sharing ads, or create impactful campaigns that reach a global audience.</p>
                    <p className='font-size-16 ff-primary text-white'> Your ads, your way.</p>
                    <div className="buttons flex gap-8 ff-primary">
                        <CustomButton title="Become an Affiliate" color="white" backgroundColor="#006AFF" onClick={()=> navigate('/campaigns')} /> 
                        <CustomButton title="Start Campaign" color="white" backgroundColor="black" border="1px solid white" onClick={()=> navigate('/campaign/create')}/>                        
                    </div>
                </div>
                <div className="video-container">
                    <div className="live-badge  font-size-16 font-weight-400 ff-primary">LIVE</div>
                    <video className="video" controls>
                        <source src="" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
        </div>
</div>
    );
}
