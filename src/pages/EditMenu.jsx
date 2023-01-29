import * as React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import { getRestaurants } from '../utils/functions/restaurant';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMenu, getMenu } from '../utils/functions/menu';

const schema = yup.object({
  restaurantId: yup.string().required().label('restaurant'),
  type: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  modal: yup.number().required(),
  price: yup.number().required(),
  image: yup.mixed().required(),
}).required();

const TYPES = ['Food', 'Drink', 'Snack']

const EditMenu = () => {
  const { menuId = '' } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = React.useState([])
  const [initData, setInitData] = React.useState({})
  const [loading, setLoading] = React.useState(false);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      restaurantId: '',
      type: '',
      name: '',
      description: '',
      price: '',
      modal: '',
      image: null,
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    try {
      const snapshot = await updateMenu({ ...initData, ...data })
      navigate('/restaurant/menu');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async () => {
    try {
      const menu = await getMenu(menuId);
      setValue('restaurantId', menu.restaurantId)
      setValue('type', menu.type)
      setValue('name', menu.name)
      setValue('description', menu.description)
      setValue('price', menu.price)
      setValue('modal', menu.modal)
      setValue('image', menu.image)
      setInitData(menu);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getData();
    getDataRestaurants();
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="restaurantId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                select
                label="Restaurant"
                sx={{ width: 300 }}
                color="info"
                disabled
              >
                {restaurants.map((restaurant) => (
                  <MenuItem key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                select
                label="Type"
                sx={{ width: 300 }}
                color="info"
                disabled
              >
                {TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Name"
                sx={{ width: 300 }}
                color="info"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Description"
                sx={{ width: 300 }}
                color="info"
                multiline
                rows="2"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="modal"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Modal"
                sx={{ width: 300 }}
                color="info"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Price"
                sx={{ width: 300 }}
                color="info"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="image"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl >
                <input
                  id="image"
                  type="file"
                  {...field}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  value={field.value?.filename}
                />
                <FormHelperText error={!!fieldState.error}>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant='outlined' sx={{ width: 300 }} disabled={loading}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default EditMenu