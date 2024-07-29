import { FC } from 'react';
import { animated, useSpring } from '@react-spring/web';
import '../styles/globals.css';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Avatar, Tooltip ,Badge} from '@material-ui/core';

const Banner: FC = () => {
  const animationProps = useSpring({
    to: { transform: 'rotateY(0deg)' },
    from: { transform: 'rotateY(90deg)' },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <animated.div style={animationProps} className='banner'>
      <Typography variant="h5">Welcome to Digi  jobs Campus</Typography>
      <Typography variant="body1">Get career guidance, upskill yourself, learn from experts, and find opportunities.</Typography>
    </animated.div>
  );
};

export default Banner;
