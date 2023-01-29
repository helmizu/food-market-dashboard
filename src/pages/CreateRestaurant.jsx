import * as React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { addRestaurant } from '../utils/functions/restaurant';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required(),
  city: yup.string().required(),
}).required();

const CITIES = ['Jakarta', 'Surabaya', 'Malang']

const CreateRestaurant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      city: '',
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = async data => {
    try {
      setLoading(true);
      const doc = await addRestaurant(data);
      if (doc.id) {
        navigate('/restaurant');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
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
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                select
                label="City"
                placeholder='Select City'
                sx={{ width: 300 }}
                color="info"
              >
                {CITIES.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
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

export default CreateRestaurant