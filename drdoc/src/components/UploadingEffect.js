import React from 'react';

const UploadingEffect = () => {
  return (
    <div className="loading" style={{display:'flex',justifyContent:'center'}}>
      <div style={{alignItems:'center'}}>
      <div className="spinner-border text-primary spinner-border-lg" role="status">
        <span className="sr-only"></span>
      </div>
      <p>Uploading...</p></div>
    </div>
  );
};

export default UploadingEffect;
