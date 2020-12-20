import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Items = ({items}) => {
  const classes = useStyles();

  // si no hay items muestra este mensaje y si hay items carga la tabla
  if (items.length === 0)
  return <h1>no hay items disponibles</h1>;

  return (
     <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Nombre&nbsp;(g)</TableCell>
            <TableCell align="right">id categoria&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {items.map((item) => (
              <TableRow key={item.id}>
              
              <TableCell align="right">{item.id}</TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.category_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
  );
}

export default Items