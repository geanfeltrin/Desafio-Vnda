import React, { useState, MouseEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import MenuItem from '@material-ui/core/MenuItem';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import MenuPopup from '../MenuPopup';
import TableHead from './TableHead';
import { colors } from '@material-ui/core';
import api from '../../services/api';
import Snackbar from '../Snackbar';

interface Data {
  id: number;
  name: string;
  email: string;
  external_code: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    edit: {
      color: colors.red[600],
    },
    delete: {
      color: colors.blue[600],
    },
  })
);

type dataProps = {
  data: Data[];
};

const TableComponent: React.FC<dataProps> = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBar, setSnackBar] = useState({
    message: '',
    type: 'error',
  });

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      setSnackBar({
        message: 'Usuário removido com sucesso',
        type: 'success',
      });
      setOpenSnackbar(true);
    } catch (error) {
      setSnackBar({
        message: 'Não foi possível remover o usuário',
        type: 'error',
      });
      setOpenSnackbar(true);
    }
  };
  const handleRemoveUser = (id: number, name: string) => {
    const confirmRemove = window.confirm(
      `Você deseja remover o usuário - ${name}?`
    );
    if (confirmRemove) {
      deleteUser(id);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.external_code}</TableCell>
                      <TableCell align="center" padding="none">
                        <MenuPopup>
                          <Link href="/user/[id]" as={`/user/${row.id}`}>
                            <MenuItem className={classes.edit}>Editar</MenuItem>
                          </Link>
                          <MenuItem
                            className={classes.delete}
                            onClick={() => handleRemoveUser(row.id, row.name)}
                          >
                            Excluir
                          </MenuItem>
                        </MenuPopup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
        message={snackBar.message}
        type={snackBar.type === 'error' ? 'error' : 'success'}
      />
    </div>
  );
};

export default TableComponent;
