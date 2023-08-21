import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PendingTasksCard = ({ pendingTasks }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Tareas Pendientes: {pendingTasks.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PendingTasksCard;
