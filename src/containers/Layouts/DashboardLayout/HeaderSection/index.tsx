import React, { useState } from 'react'
import Router from 'next/router'

import { Header, MenuLogout, Notification, Spacer } from 'pink-lava-ui'

import ICAccount from 'src/assets/icons/ic-avatar-default.svg'
import ICAccountSetting from 'src/assets/icons/ic-setting.svg'
import ICCompany from 'src/assets/icons/ic-company.svg'
import ICChangeLanguage from 'src/assets/icons/ic-globe.svg'
import ICLogout from 'src/assets/icons/ic-logout.svg'
import ICArrowBottom from 'src/assets/icons/ic-arrow-bottom.svg'
import {
  WrapeprProfile,
  WrapperMenuLogout,
  MenuDropdown,
  TextName,
  TextRole,
} from './styledComponents'

import { headerMenu, notificationItems } from 'src/configs/menus'

const flexStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  paddingBottom: '1rem',
  fontSize: '14px',
  cursor: 'pointer',
}

export default function HeaderSection() {
  const [current, setCurrent] = useState('0')

  const handleCLickTabNav = (e: any) => {
    setCurrent(e.key)
    Router.push('/dashboard')
  }

  const handleLogout = (e: any) => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <Header
      mode="horizontal"
      onClick={handleCLickTabNav}
      selectedKeys={[current]}
      items={headerMenu}
    >
      <div
        style={{
          display: 'flex',
          paddingTop: '.7rem',
          marginBottom: '.78rem',
          background: '#fff',
        }}
      >
        <Notification items={notificationItems} />
        <Spacer size={15} />
        <MenuLogout
          menu={
            <WrapperMenuLogout>
              <WrapeprProfile>
                <ICAccount />
                <div>
                  <TextName>Admin</TextName>
                  <TextRole>Super User</TextRole>
                </div>
              </WrapeprProfile>
              <a
                style={{
                  color: '#000',
                }}
                target="_blank"
                href="https://accounts.edot.id/infopribadi"
                rel="noopener noreferrer"
              >
                <div style={flexStyles}>
                  <ICAccountSetting />
                  <p>Account Settings</p>
                </div>
              </a>
              <div style={flexStyles}>
                <ICCompany />
                <p>Company List</p>
              </div>
              <div style={flexStyles}>
                <ICChangeLanguage />
                <p>Change Language</p>
              </div>
              <div style={flexStyles} onClick={handleLogout}>
                <ICLogout />
                <p>Logout</p>
              </div>
            </WrapperMenuLogout>
          }
        >
          <MenuDropdown>
            <div
              style={{
                gap: '5px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <ICAccount size={64} />
              <p>Admin</p>
            </div>
            <ICArrowBottom />
          </MenuDropdown>
        </MenuLogout>
      </div>
    </Header>
  )
}
