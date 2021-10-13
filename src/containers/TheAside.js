import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  CSidebar,
  // CSidebarClose,
  CSidebarNav,
  CSidebarNavItem,
  CCreateElement,
  CSidebarNavTitle,
  CSidebarNavDivider,
  CSidebarNavDropdown
} from '@coreui/react'
import { Link } from 'react-router-dom';
import navigation from "./_nav";

const TheAside = () => {
  const show = useSelector(state => state.asideShow)
  const dispatch = useDispatch()
  const setState = (state) => dispatch({type: 'set', asideShow: state})

  return (
    <CSidebar
      aside
      colorScheme='primary'
      size='lg'
      overlaid
      show={show}
      onShowChange={(state) => setState(state)}
    >
      {/* <CSidebarClose onClick={() => setState(false) } /> */}
      {/*aside content*/}
      {/* <div className="nav-underline">
        <div className="nav nav-tabs">
          <div className="nav-item">
            <div className="nav-link">Aside</div>
          </div>
        </div>
      </div> */}

      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>  
    </CSidebar>
  )
}

export default React.memo(TheAside)
