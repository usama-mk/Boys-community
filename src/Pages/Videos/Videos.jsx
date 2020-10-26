import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Player } from 'video-react';
import { storage } from '../../firebase';
import { CloudUpload } from '@material-ui/icons';



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

  
 

const Videos=(props)=> {
    const [video, setVideo] = useState(null);
    const [progress, setProgress] = useState(0);
    
    const classes = useStyles();
    const videoUrlsArray= props.data;

    const uploadFileHandler = () => {
        if (video) {
            const uploadTask = storage.ref(`videos/${video.name}`).put(video);
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
            setVideo(event.target.files[0]);
        }
    
    }

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {videoUrlsArray? videoUrlsArray.map((videoUrl) => (
              <Grid item key={videoUrl} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <Player
      playsInline
      poster="https://cdn.vox-cdn.com/thumbor/PrT3w2zUdK37BZk35jXXCaIwUuY=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/64758257/acastro_180403_1777_youtube_0002.0.0.jpg"
      src={videoUrl}
    />
                 
                </Card>
              </Grid>
            )): <div>FETCHING DATA..</div>}
          </Grid>
        </Container>
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
        </div>
    )
}
export default Videos;