import React, { useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from '../../redux/appRedux';
import { Grid, Paper, Box, Button} from '@mui/material';


const Todo = () => {
 const dispatch= useDispatch()
 const todo = useSelector(appSelector.todo)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box>
            Todo
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Todo;
