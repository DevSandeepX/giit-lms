import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserRoutes from "./routes/UserRoutes"
import AdminRoutes from "./routes/AdminRoutes"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public/User routes */}
        <Route path="/*" element={<UserRoutes />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App