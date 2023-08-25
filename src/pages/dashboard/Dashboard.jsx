import React, { useEffect } from "react";
import { Grid, Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { appSelector } from '../../redux/appRedux';
import CompletedTasksCard from './CompletedTasksCard';
import PendingTasksCard from './PendingTasksCard';

const Dashboard = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [open, onClose]);

  const tasks = useSelector(appSelector.todo);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box>
            Dashboard
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <CompletedTasksCard completedTasks={completedTasks} />
      </Grid>
      <Grid item xs={6}>
        <PendingTasksCard pendingTasks={pendingTasks} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
