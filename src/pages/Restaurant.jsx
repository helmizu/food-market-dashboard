import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getRestaurants } from '../utils/functions/restaurant'
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const useRestaurant = () => {
  const [restaurants, setRestaurants] = React.useState([])

  const getDataRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getDataRestaurants();
  }, [])

  return {
    restaurants,
  };
}

const Restaurant = () => {
  const { restaurants } = useRestaurant();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Stack spacing={2} alignItems="flex-end">
            <Link to="/restaurant/create-restaurant">
              <Button variant="contained">Add Restaurant</Button>
            </Link>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurants.map((restaurant) => (
                    <TableRow
                      key={restaurant.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {console.log(restaurant.name, { restaurant })}
                      <TableCell component="th">{restaurant.name}</TableCell>
                      <TableCell><img src={restaurant.imageUrl} height={100} /></TableCell>
                      <TableCell>{restaurant.city}</TableCell>
                      <TableCell>{restaurant.address || '-'}</TableCell>
                      <TableCell>
                        <Box display="inline-flex">
                          <span>{restaurant.rating || 0}</span>
                          <StarRoundedIcon color="warning" sx={{ fontSize: '18px' }} fontSize="inherit" />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Link to={`/restaurant/${restaurant.id}/menu`}>
                          <Button>Lihat Menu</Button>
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

export default Restaurant