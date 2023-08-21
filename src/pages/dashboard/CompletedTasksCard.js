import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CompletedTasksCard = ({ completedTasks }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Tareas Completadas: {completedTasks.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompletedTasksCard;
