import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Credentials } from "store/services/types"
import InputControl from "components/Form/InputControl"
import Button from "components/Button/Button"

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const defaultValues: Credentials = {
  email: "",
  password: "",
}

type LoginFormProps = {
  handleLogin: (values: Credentials) => void;
  isLoading?: boolean;
}

function LoginForm({ handleLogin, isLoading = false }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const onSubmit: SubmitHandler<Credentials> = handleLogin;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '2rem' }}>
        <InputControl label="Email" error={errors.email}>
          <input {...register("email")} id="LoginForm_email" />
        </InputControl>

        <InputControl label="Password" error={errors.password}>
          <input type="password" {...register("password")} id="LoginForm_password" />
        </InputControl>
      </div>

      <Button type="submit" disabled={isLoading} aria-disabled={isLoading} id="LoginForm_submit">
        Log In
      </Button>
    </form>
  )
}

export default LoginForm
