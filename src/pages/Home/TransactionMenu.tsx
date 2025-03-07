import Link from 'components/Button/Link'
import React from 'react'
import { User } from 'store/services/types'

type TransactionMenuProps = {
  user: User,
}

export default function TransactionMenu({ user }: TransactionMenuProps) {
  return (
    <div className='transaction-menu'>
      <div className='transaction-menu-info'>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: 0 }}>Welcome <strong>{user.name}</strong></h2>
        </div>

        <div>
          Current Balance
          <div style={{ textAlign: 'left', fontSize: '2rem' }} data-testid="account-balance-info">
            <span>$</span><strong>{user.balance.toLocaleString('en-US')}</strong>
          </div>
        </div>
      </div>
      <Link to={'/withdraw'}>Withdraw</Link>
      <Link to={'/deposit'}>Deposit</Link>
    </div>
  )
}
