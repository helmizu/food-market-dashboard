import React, { useContext, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Header from '../components/Header';
import { UserContext } from '../utils/context';
import { setUser as setUserStorage } from '../utils/storage';
import { Navigate } from 'react-router-dom';

const useLogin = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const signin = async ({ email, password }) => {
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential?.user) {
        setUser(userCredential?.user);
        setUserStorage(userCredential?.user);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    signin,
  }
}

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
}).required();

const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema)
  });
  const { signin, loading, user } = useLogin();
  const onSubmit = data => {
    signin(data)
  };
  
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Header auth={false} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} textAlign="center">
          <Typography variant="h5">Welcome to Food Market</Typography>
          <Typography variant="body1" pb={6}>Sign in to access dashboard</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Email"
                sx={{ minWidth: 300 }}
                color="info"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Password"
                sx={{ minWidth: 300 }}
                color="info"
                type="password"
              />
            )}
          />
          <Button type="submit" variant='outlined' disabled={loading}>
            Sign in
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default Login