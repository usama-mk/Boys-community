import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactSimpleImageViewer from 'react-simple-image-viewer';


const Images=(props)=> {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const imagesUrlsArray= props.data;
    const images = imagesUrlsArray?imagesUrlsArray.map((imageUrl)=>{
        return imageUrl;
    }):[];
   
     
    // const imageUrl = props.data[0].imageUrl
    const openImageViewer = useCallback(index => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };
    return (
        <div>
            {imagesUrlsArray? imagesUrlsArray.map((imageUrl, index) => (
        <img
          src={imageUrl}
          onClick={() => openImageViewer(index)}
          width="300"
          key={index}
          style={{ margin: "2px" }}
          alt=""
        />
      )): <div> </div>}

      {isViewerOpen && (
        <ReactSimpleImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}
        </div>
    )
}
export default Images;