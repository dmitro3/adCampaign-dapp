import './TopSection.scss';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';
export default function TopSection() {
    const navigate = useNavigate()
    return (
<div className='topsection flex justify-center bg-dark '>

        <div className='main-container bg-dark'>

        <div className="landing-page-container bg-dark ">
            <div className="grid-container grid-cols-2-md topsectiongrid justify-center">
                <div className="content">
                    <div className='mt-40'>
                    <h1 className='font-size-49 text-white'>Harness the Power of Decentralized Advertising</h1>
                    <p className='font-size-16 ff-primary text-white'>Become an affiliate and earn instantly by sharing ads, or create impactful campaigns that reach a global audience.</p>
                    <p className='font-size-16 ff-primary text-white'> Your ads, your way.</p>
                    <div className="buttons flex gap-8 ff-primary">
                        <CustomButton title="Become an Affiliate" color="white" backgroundColor="#006AFF" onClick={()=> navigate('/campaigns')} /> 
                        <CustomButton title="Start Campaign" color="white" backgroundColor="black" border="1px solid white" onClick={()=> navigate('/campaign/create')}/>                        
                    </div>
                    </div>
                </div>
                <div className="video-container mt-13">
                    <div className="live-badge  font-size-16 font-weight-400 ff-primary">LIVE</div>
                    <iframe className='video' src="https://drive.google.com/file/d/10VA8s2l_PDlXurINyVsxBA1OgPkfpmjL/preview" width="543px" height="342px" allow="autoplay"></iframe>
                </div>
            </div>
        </div>
        </div>
</div>
    );
}
