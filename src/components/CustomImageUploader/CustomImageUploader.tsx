import toast, { Toaster } from 'react-hot-toast';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './CustomImageUploader.scss';

const CustomImageUploader = ({placeholder, backgroundColor, handleImage, image}: any) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const newImage = {
      file: file,
      preview: URL.createObjectURL(file),
    };
    handleImage(newImage);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'image/heic': [],
      'image/jfif': [],
    },
    onDrop,
    onError:(error)=>{
      toast.error(`${error.name} - Please upload image file`);
      console.log('error-->', error.name)
    },
    multiple: false,
  });

  return (
    <div>
      <Toaster />
      {<div className="dropzone-container" style={{backgroundColor}} {...getRootProps()}>
      {!image ? 
          <>
            <input {...getInputProps()}/>
            {placeholder}
          </> 
          : 
          <>  
            <img className='image-preview' src={image} alt="Preview" />
          </>
        }
      </div>}
    </div>
  );
};

export default CustomImageUploader;
