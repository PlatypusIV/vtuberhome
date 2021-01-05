//example playlist url
//https://www.youtube.com/playlist?list=UUp6993wxpyDPHUpavwDFqgg

//example channel url
//https://www.youtube.com/channel/UCMwGHR0BTZuLsmjY_NT5Pwg

const craftChannelUrl=(channelId)=>{
    return "https://www.youtube.com/channel/"+channelId;
};

const craftUploadedUrl=(playlistId)=>{
    return "https://www.youtube.com/playlist?list="+playlistId;
}

module.exports={
    craftChannelUrl
}