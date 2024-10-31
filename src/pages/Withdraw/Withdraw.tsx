import React, { useEffect, useState } from 'react'

import { useWithdrawMutation } from 'store/services/accountApi';
import { useAppSelector } from 'hooks/reduxHooks';
import { User } from 'store/services/types';
import Link from 'components/Button/Link';

import TransactionForm, { TransactionAttrsType } from 'components/Form/TransactionForm';

import './Withdraw.scss'

function renderSuccessPage(user: User) {
  return (
    <div className="withdraw-success">
      <h1>Withdraw success</h1>
      <p style={{ fontSize: '1.5rem'}}>
        Your balance <strong>${user.balance.toLocaleString()}</strong>.
        <br />Thank you for banking with us.
      </p>

      <Link to={'/'}>Back</Link>
    </div>
  )
}

function renderErrorPage(user: User, { data }: any) {
  return (
    <div className="withdraw-error">
      <h1>{data.message}</h1>
      <p style={{ fontSize: '1.5rem'}}>
        Transaction cannot be processed!
        <br /> Your balance is <strong>${user.balance.toLocaleString()}</strong>.
      </p>

      <Link to={'/'}>Back</Link>
    </div>
  )
}

export default function Withdraw() {
  const [withdraw, { isLoading, isSuccess, isError, error }] = useWithdrawMutation()
  const { user } = useAppSelector(({ userState }) => userState);
  const commitTransactionHandler = ({ amount }: TransactionAttrsType) => withdraw(amount)

  return (
    <div className='withdraw'>
      {isError ? renderErrorPage(user!, error) : (
        isSuccess ? renderSuccessPage(user!) : (
          <TransactionForm
            onCommitTransaction={commitTransactionHandler}
            submitButton={'Withdraw'}
            isLoading={isLoading}
          />
        )
      )}
    </div>
  )
}
