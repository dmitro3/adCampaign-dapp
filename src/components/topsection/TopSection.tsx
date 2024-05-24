import './TopSection.scss';
import Button from '../reuseablecomponent/button/button';
export default function TopSection() {
    return (
<div className='topsection flex justify-center bg-dark mt-8'>

        <div className='main-container bg-dark'>

        <div className="landing-page-container bg-dark mt-8">
            <div className="grid-container grid-cols-2-md">
                <div className="content">
                    <h1 className='font-size-49'>Reach more people in real time</h1>
                    <p className='font-size-16 font-mulish'>Lorem Ipsum dior random content about ads etc that can be pushed over here and tells the story about our product to be added here</p>
                    <div className="buttons flex gap-8 font-mulish">
                        <Button title="Become an Affiliate" color="blue" />                        
                        <Button title="Start Campaign" color="white" />                        
                    </div>
                </div>
                <div className="video-container">
                    <div className="live-badge  font-size-16 font-weight-400 font-mulish">LIVE</div>
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
