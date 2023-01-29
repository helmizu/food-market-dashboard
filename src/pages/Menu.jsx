import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteMenu, getAllMenu } from '../utils/functions/menu'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const useMenu = () => {
  const [menu, setMenu] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState(null);

  const getDataMenu = async () => {
    try {
      const data = await getAllMenu();
      setMenu(data);
    } catch (error) {
      console.log(error);
    }
  }

  const onClickDelete = (menuId) => {
    setDeleteId(menuId);
  }

  const onCancelDelete = () => {
    setDeleteId(null);
  }

  const onConfirmDelete = async () => {
    try {
      await deleteMenu(deleteId);
      await setDeleteId(null);
      await getDataMenu();
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getDataMenu();
  }, [])

  return {
    menu,
    deleteId,
    onClickDelete,
    onConfirmDelete,
    onCancelDelete,
  };
}

const Menu = () => {
  const {
    menu,
    deleteId,
    onClickDelete,
    onConfirmDelete,
    onCancelDelete,
  } = useMenu();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Stack spacing={2} alignItems="flex-end">
            <Link to="/restaurant/menu/add">
              <Button variant="contained">Add Menu</Button>
            </Link>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Modal</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menu.map((menu) => (
                    <TableRow
                      key={menu.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th">{menu.name}</TableCell>
                      <TableCell align="right"><img src={menu.imageUrl} height={100} /></TableCell>
                      <TableCell align="right">{menu.type}</TableCell>
                      <TableCell align="right">{menu.description}</TableCell>
                      <TableCell align="right">{menu.modal}</TableCell>
                      <TableCell align="right">{menu.price}</TableCell>
                      <TableCell align="right">
                        <Link to={`/restaurant/menu/${menu.id}/edit`}>
                          <Button>Edit</Button>
                        </Link>
                        <Button
                          onClick={() => onClickDelete(menu.id)}
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      </Grid>
      <Dialog open={!!deleteId} onClose={onCancelDelete}>
        <DialogTitle>
          Do you want to delete {menu.find(item => item.id === deleteId)?.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelDelete} color="secondary" variant='outlined'>Cancel</Button>
          <Button onClick={onConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Menu