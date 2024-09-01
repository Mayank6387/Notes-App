import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import {Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <div>
      {
      <Routes>
        <Route path="/dashboard" element={<Home></Home>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/signup" element={<Signup></Signup>}/>
      </Routes>
      }
    </div>
  )
}

export default App