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
import { CloudUpload } from '@material-ui/icons';
import { storage } from '../../firebase';


const Images=(props)=> {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const imagesUrlsArray= props.data;
    const images = imagesUrlsArray?imagesUrlsArray.map((imageUrl)=>{
        return imageUrl;
    }):[];

    const useStyles = makeStyles((theme) => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
          marginTop: theme.spacing(4),
        },
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8),
        },
        card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        cardMedia: {
          paddingTop: '56.25%', // 16:9
        },
        cardContent: {
          flexGrow: 1,
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(6),
        },
      }));
      
    
    
     
    // const imageUrl = props.data[0].imageUrl
    const openImageViewer = useCallback(index => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };

      const uploadFileHandler = () => {
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    // storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    //     urlArray.push(url);
                    //     console.log(urlArray);
                    //     db.collection("imagesData").add({
                    //         imageUrl: url,
                    //         imageName: image.name
                    //     });

                    // })
                }
            )
        }
    };

const selectFileHandler = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }

    }
   const classes= useStyles();
    return (
        <div >
             <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
             
            {imagesUrlsArray? imagesUrlsArray.map((imageUrl, index) => (
                <Grid item xs={12} sm={6} md={4}>
                <Card>
                    
                  <img 
          src={imageUrl}
          onClick={() => openImageViewer(index)}
          width="300"
          key={index}
          style={{ margin: "2px", objectFit:"cover" }}
          alt=""
        />
       
        
                </Card>
                </Grid>
                
       
      )): <div> FETCHING DATA.. </div>}
      
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
      <br/>

 <Card style={{margin:"auto"}}>
      <input type="file" onChange={selectFileHandler} id="upload-button" />

<Button
    onClick={uploadFileHandler}
    variant="contained"
    color="primary"
    // className="uploadButton"
    startIcon={<CloudUpload />}
>
    Upload
</Button>
<br/>
<progress value={progress} max="100" />
                <br />
      </Card>
     
                </Grid>
                </Container>
        </div>
    )
}
export default Images;