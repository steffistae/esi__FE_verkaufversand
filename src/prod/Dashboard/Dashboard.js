import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import ProdAppBar from '../../components/ProdAppBar';
import FooterPage from '../../components/Footer';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  TshirtsProduced,
  UrgendOrders,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
     padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <div>
        <div><ProdAppBar /></div>
        
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={4}
              xs={12}
            >
              <Budget />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalUsers />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TshirtsProduced />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={4}
              xs={12}
            >
              <TasksProgress />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalProfit />
            </Grid>
            <Grid
              item
              lg={3}
              md={6}
              xl={3}
              xs={12}
            >
              <UrgendOrders />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={6}
              xs={12}
            >
              <LatestSales />
            </Grid>
            <Grid
              item
              lg={12}
              md={6}
              xl={3}
              xs={12}
            >
            </Grid>
          </Grid>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default Dashboard;
