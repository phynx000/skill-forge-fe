// import { useState } from 'react'
import AppHeader from "./clients/layouts/app.header"
import { Outlet } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop.tsx"



function AppLayout() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ScrollToTop />
        <AppHeader />
        <Outlet />
      </div>

    </>
  )
}

export default AppLayout
