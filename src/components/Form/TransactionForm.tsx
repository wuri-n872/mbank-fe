import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import InputControl from "components/Form/InputControl"
import Button from "components/Button/Button"

export type TransactionAttrsType = {
  amount: number;
}

type TransactionFormProps = {
  onCommitTransaction: (values: TransactionAttrsType) => void;
  submitButton: String;
  isLoading?: boolean;
}

const validationSchema = yup.object().shape({
  amount: yup.number().required().min(1),
})

const defaultValues: { amount: number } = {
  amount: 0,
}

function TransactionForm({ onCommitTransaction, submitButton, isLoading = false }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionAttrsType>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const onSubmit: SubmitHandler<TransactionAttrsType> = onCommitTransaction;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: '2rem' }}>
        <InputControl label="Amount" error={errors.amount}>
          <input type="number" style={{textAlign: "right"}} {...register("amount")} id="Transaction_amount" />
        </InputControl>
      </div>

      <Button type="submit" disabled={isLoading} aria-disabled={isLoading} id="Transaction_submit">
        {submitButton}
      </Button>
    </form>
  )
}

export default TransactionForm
