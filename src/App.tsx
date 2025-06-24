// import { useState } from 'react'
import AppHeader from "./clients/layouts/app.header"
import { Outlet } from "react-router-dom"



function AppLayout() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AppHeader />
        <Outlet />
      </div>

    </>
  )
}

export default AppLayout
