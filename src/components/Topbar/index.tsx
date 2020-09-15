import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import Link from 'next/link';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(4),
    },
    homeIcon: {
      marginRight: theme.spacing(2),
    },
    cursor: {
      cursor: 'pointer',
    },
  })
);

const TopBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="regular">
          <Link href="/" passHref>
            <IconButton
              edge="start"
              className={classes.homeIcon}
              color="inherit"
              aria-label="home"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Link href="/" passHref>
            <Typography variant="h6" color="inherit" className={classes.cursor}>
              Desafio - Vnda
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
