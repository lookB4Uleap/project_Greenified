import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function RecipeReviewCard({ pub_date, title, link, source }) {
  const [expanded, setExpanded] = React.useState(false);
  const date = new Date(pub_date)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className='Posts Card' onClick={() => { window.location.href = link }}>
      <CardHeader
        title={title}
        subheader={`${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`}
      />
      <CardContent>
        {/* <Typography variant="body2" color="text.secondary">
          {title}
        </Typography> */}
      </CardContent>
    </Card>
  );
}
