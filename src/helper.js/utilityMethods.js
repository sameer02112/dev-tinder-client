const bufferToBase64 = (bufferData) => {
    const chunkSize = 8192; // Process 8192 elements at a time
    let binaryString = '';
  
    for (let i = 0; i < bufferData.length; i += chunkSize) {
      const chunk = bufferData.slice(i, i + chunkSize);
      binaryString += String.fromCharCode(...chunk);
    }
  
    return btoa(binaryString);
  };

export const getPhoto = (uploadedPhotoId, photoUrl) => {

    const imgData = uploadedPhotoId?.profilePicture;
    const {contentType, data} = imgData || {};
    if(contentType && data){
      const base64String = bufferToBase64(new Uint8Array(data?.data));
      return `data:${contentType};base64,${base64String}`;
    }
    return photoUrl;
}

