import './TopSection.scss';
import CustomButton from '../CustomButton/CustomButton';
export default function TopSection() {
    return (
<div className='topsection flex justify-center bg-dark '>

        <div className='main-container bg-dark'>

        <div className="landing-page-container bg-dark ">
            <div className="grid-container grid-cols-2-md topsectiongrid">
                <div className="content">
                    <h1 className='font-size-49 text-white'>Reach more people in real time</h1>
                    <p className='font-size-16 ff-primary text-white'>Lorem Ipsum dior random content about ads etc that can be pushed over here and tells the story about our product to be added here</p>
                    <div className="buttons flex gap-8 ff-primary">
                        <CustomButton title="Become an Affiliate" color="white" backgroundColor="#006AFF"/>                        
                        <CustomButton title="Start Campaign" color="white" backgroundColor="black" border="1px solid white"/>                        
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
