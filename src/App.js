import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, Card, CardHeader, CardContent, Grid, TextField, Button, Stack, Checkbox, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { appSelector, appActions } from "./redux/appRedux";
import { v4 as uuid } from 'uuid';
import Routes from "./pages/routes";

import './App.css';

function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todo = useSelector(appSelector.todo);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const addTask = () => {
    if (text.trim() !== "") {
      dispatch(appActions.addTodo({
        id: uuid(),
        text: text,
        completed: false,
      }));
      setText(""); 
    }
  };

  const handleChecked = (e, id) => {
    dispatch(appActions.setCompletedTodo({id, completed: e.target.checked}));
  };

  const delTask = async (id) => {
    dispatch(appActions.deleteTodo(id));
  };

  return (
    <CssBaseline>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <Card>
        <CardHeader title="Agrega una tarea" />
        <CardContent>
          <Stack sx={{ justifyContent: 'space-around' }} direction='row'>
            <Grid item md={6}>
              <TextField
                value={text}
                label="Tarea"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <Button
                variant="contained"
                onClick={addTask}
              >
                Agregar
              </Button>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Tareas" />
        <CardContent>
          {todo.map((t, index) => (
            <Stack key={t.id} sx={{ justifyContent: 'space-between' }} direction='row'>
              <Grid item md={1}>
                <Checkbox onChange={(e) => handleChecked(e, t.id)} />
              </Grid>
              <Grid item md={9} sx={{ pt: 1 }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>{t.text}</Typography>
              </Grid>
              <Grid item md={2}>
                <Button variant="contained" onClick={() => delTask(t.id)}>Eliminar</Button>
              </Grid>
            </Stack>
          ))}
        </CardContent>
      </Card>
    </CssBaseline>
  );
}

export default App;
