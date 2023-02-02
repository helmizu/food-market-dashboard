import * as React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { addRestaurant } from '../utils/functions/restaurant';
import { useNavigate } from 'react-router-dom';
import { forwardGeocode } from '../utils/functions/geolocation';

const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  rating: yup.number().min(1).max(5).required(),
  image: yup.mixed().required(),
}).required();

const CreateRestaurant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      address: '',
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = async data => {
    try {
      setLoading(true);
      const geocode = await forwardGeocode(data.address);
      const payload = { ...data, ...geocode }
      const doc = await addRestaurant(payload);
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
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Address"
                sx={{ width: 300 }}
                color="info"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="rating"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Rating"
                sx={{ width: 300 }}
                color="info"
                type="number"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="image"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl>
                <input
                accept='.png,.jpeg,.jpg'
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

export default CreateRestaurant