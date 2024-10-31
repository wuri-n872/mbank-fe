import React from 'react'

import { useDepositMutation } from 'store/services/accountApi';
import { useAppSelector } from 'hooks/reduxHooks';
import { User } from 'store/services/types';
import Link from 'components/Button/Link';

import TransactionForm, { TransactionAttrsType } from 'components/Form/TransactionForm';

import './Deposit.scss'

function renderSuccessPage(user: User) {
  return (
    <div className="deposit-success">
      <h1>Deposit success</h1>
      <p style={{ fontSize: '1.5rem'}}>
        Your balance <strong>${user.balance.toLocaleString()}</strong>.
        <br />Thank you for banking with us.
      </p>

      <Link to={'/'}>Back</Link>
    </div>
  )
}

export default function Deposit() {
  const [Deposit, { isLoading, isSuccess }] = useDepositMutation()
  const { user } = useAppSelector(({ userState }) => userState);
  const commitTransactionHandler = ({ amount }: TransactionAttrsType) => Deposit(amount)

  return (
    <div className='deposit'>
      {isSuccess ? renderSuccessPage(user!) : (
        <TransactionForm
          onCommitTransaction={commitTransactionHandler}
          submitButton={'Deposit'}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
