import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import InsertChartIcon from '@material-ui/icons/FormatColorFill';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceIconDown: {
    color: "green"
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const TasksProgress = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h3"
            >
              Verbrauch Farbkanister
            </Typography>
            <Typography variant="h3">Cyan : &ensp; &ensp; 12 % mehr als im letzten Monat  <ArrowUpwardIcon className={classes.differenceIcon} /> </Typography>
            <Typography variant="h3">Magenta : &nbsp; 8 % mehr als im letzten Monat  <ArrowUpwardIcon className={classes.differenceIcon} /> </Typography>
            <Typography variant="h3">Yellow : &ensp; &ensp; 2 % weniger als im letzten Monat  <ArrowDownwardIcon className={classes.differenceIconDown} /> </Typography>
            <Typography variant="h3">Key : &emsp; &emsp; &nbsp;gleich wie im letzten Monat  <ArrowForwardIcon/> </Typography>

          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
