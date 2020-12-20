import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import SnackbarOpen from './SnackBar'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Buscador = ({ setItems }) => {
  const classes = useStyles();

  // en este hooks se guarda lo ingresado en los inputs
  const [user, setuser] = useState({
    seller_id: null,
    site_id: "",
  });

  const [error, setError] = React.useState({
    msg: "",
    open: false
  });
  const { msg, open } = error;

  //destroyoning
  const { seller_id, site_id } = user;

  // guarda en el hook user lo ingresado en los 2 inputs
  const onChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    //previene el reinicio de pantalla
    e.preventDefault();

    // parsea de string a int
    const idUser = parseInt(seller_id);

    //convierte todo el texto a mayusculas
    const siteid = site_id.toUpperCase()

    // si esta ok entra en el try si no en el catch
    try {
      // aguarda los item que vienen de la api
      const item = await axios.get(
        `https://api.mercadolibre.com/sites/${siteid}/search?seller_id=${idUser}`
      );

      // guarda en el hooks los items
      setItems(item.data.results);
      setError({
        msg: "",
        open: false
      })
    } catch (error) {
      setError({
        msg: error.response.data.message,
        open: true
      })
    }
  };

  // si el usuario no llena los inputs se bloquea el boton BUSCAR
  const buttonDisabled = () => {
    return seller_id === null || isEmpty(site_id);
  };

  const isEmpty = (aField) => {
    return aField === "";
  };

  // este metodo sirve para cerrar el snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError({
      msg: "",
      open: false
    })
  };
  
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "#E2E8E7" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Buscar Productos
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              {/*seller_id  */}
              <TextField
                type="number"
                autoComplete="fname"
                name="seller_id"
                variant="outlined"
                required
                fullWidth
                label="ingrese ID Usuario"
                autoFocus
                value={seller_id || ""}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* site_id */}
              <TextField
                autoComplete="fname"
                name="site_id"
                variant="outlined"
                required
                fullWidth
                label="ingrese el sitio"
                value={site_id || ""}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={buttonDisabled()}
          >
            Buscar
          </Button>
          <SnackbarOpen msg={msg} open={open} handleClose={handleClose}/>
        </form>
      </div>
    </Container>
  );
};

export default Buscador;
