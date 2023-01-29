import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllMenu } from '../utils/functions/menu'
import { Button, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const useMenu = () => {
  const [menu, setMenu] = React.useState([])

  const getDataMenu = async () => {
    try {
      const data = await getAllMenu();
      setMenu(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getDataMenu();
  }, [])

  return {
    menu,
  };
}

const Menu = () => {
  const { menu } = useMenu();
  console.log({ menu })
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default Menu