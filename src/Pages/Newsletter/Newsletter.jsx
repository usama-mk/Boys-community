import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';


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
  

const Newsletter=(props)=> {
    const pdfUrlsArray= props.data;
    console.log(pdfUrlsArray);
    const classes = useStyles();
     
    // const imageUrl = props.data[0].imageUrl
    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {pdfUrlsArray? pdfUrlsArray.map((pdfUrl) => (
              <Grid item key={pdfUrl} xs={12} sm={6} md={4}>
                <Card   className={classes.card}>
                  <CardMedia 
                    className={classes.cardMedia}
                    image="https://store-images.s-microsoft.com/image/apps.34200.14540311183413038.f028cadf-0853-4674-ad48-e9a3d9d1fab9.c5840b88-f3ae-4c44-be80-0da0a27b2193"
                    title="Image title"
                  />
                   {/* <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent> */}
                  <CardActions>
                      <a style={{textDecoration: "none"}} href={pdfUrl} target="_blank">
                    <Button size="small" color="primary">
                      View
                    </Button>
                      </a>
                    {/* <Button size="small" color="primary">
                      Edit
                    </Button> */}
                  </CardActions>
                 
                </Card>
              </Grid>
            )): <div></div>}
          </Grid>
        </Container>
        </div>
    )
}
export default Newsletter;

// After CardMedia
