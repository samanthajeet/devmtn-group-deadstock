import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import LayoutBody from '../components/LayoutBody';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
  },
  images: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://stockx-360.imgix.net/Reebok-Alien-Stomper-Mid-Final-Scene-Pack/Images/Reebok-Alien-Stomper-Mid-Final-Scene-Pack/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1546757226&w=2200',
      title: 'Alien Stomper Mid Final Scene Pack',
      width: '60%',
    },
    {
      url:
        'https://stockx-360.imgix.net/Adidas-ZX-4000-4D-Carbon/Images/Adidas-ZX-4000-4D-Carbon/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1551111806&w=2200',
      title: 'ZX 4000 4D Carbon',
      width: '40%',
    },
    {
      url:
        'https://stockx-360.imgix.net/asics-gel-diablo-ronnie-fieg-volcano-2-0_TruView/Images/asics-gel-diablo-ronnie-fieg-volcano-2-0_TruView/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1538080256&w=2200',
      title: 'Gel-Diablo',
      width: '38%',
    },
    {
      url:
        'https://stockx-360.imgix.net/Asics-Gel-Lyte-III-Titolo-Papercut/Images/Asics-Gel-Lyte-III-Titolo-Papercut/Lv2/img30.jpg?auto=format,compress&q=90&updated_at=1546679336&w=2200',
      title: `Gel Lyte 3 Titolo "Papercut"`,
      width: '38%',
    },
    {
      url:
        'https://stockx-360.imgix.net/Air-Jordan-4-Retro-UNDFTD_TruView/Images/Air-Jordan-4-Retro-UNDFTD_TruView/Lv2/img12.jpg?auto=format,compress&q=90&updated_at=1538080256&w=2200',
      title: 'Jordan 4 Retro UNDFTD' ,
      width: '24%',
    },
    {
      url:
        'https://stockx-360.imgix.net/Nike-Cortez-Basic-Leather-Forrest-Gump-2017/Images/Nike-Cortez-Basic-Leather-Forrest-Gump-2017/Lv2/img24.jpg?auto=format,compress&q=90&updated_at=1545966773&w=1300',
      title: 'Cortez',
      width: '40%',
    },
    {
      url:
        'https://assets.reebok.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/f66b4a0987b34c59bed9a44c0189064c_9366/Freestyle_Hi_White_70_01_standard.jpg',
      title: 'Freestyle HI',
      width: '60%',
    },
  ];

  return (
    <LayoutBody className={classes.root} component="section" width="large">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton} >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </LayoutBody>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);