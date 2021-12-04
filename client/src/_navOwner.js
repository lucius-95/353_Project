import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibDashlane, cibDraugiemLv, cilBank, cilDollar } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navOwner = [
  {
    component: CNavTitle,
    name: 'Pages',
  },
  {
    component: CNavItem,
    name: 'About Us',
    to: '/about',
    icon: <CIcon icon={cibDraugiemLv} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cibDashlane} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Actions',
  },
  {
    component: CNavGroup,
    name: 'Organization',
    to: '/organization',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View Organization',
        to: '/organization',
      },
      {
        component: CNavItem,
        name: 'Edit Organization',
        to: '/edit-company',
      },
      {
        component: CNavItem,
        name: 'Application Request',
        to: '/manage',
      },
      {
        component: CNavItem,
        name: 'Show Staff',
        to: '/staff',
      },
      {
        component: CNavItem,
        name: 'Show Customer',
        to: '/customer',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Donate',
    to: '/donation',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
]

export default _navOwner
