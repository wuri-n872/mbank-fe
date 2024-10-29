import React from 'react'
import { Outlet } from 'react-router-dom'

import './Layout.scss'
import Page from 'components/Page/Page'

export default function Layout() {
  return (
    <div className='layout'>
      <div className="layout-wrapper">
        <Page>
          <Outlet />
        </Page>
      </div>
    </div>
  )
}
