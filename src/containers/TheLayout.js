import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import NotificationComponent from 'components/notificationComponent/NotificationComponent';
import {
  TheContent,
  TheHeader,
  TheAside,
} from './index'

const TheLayout = () => {
  const darkMode = useSelector(state => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )

  return (
    <div className={classes}>
      <NotificationComponent />
      <TheAside/>
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
      </div>
    </div>
  )
}

export default TheLayout
