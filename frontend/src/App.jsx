import { Box,useColorModeValue } from '@chakra-ui/react'
import { Routes,Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
    <Box minH={"100vh"} bg={useColorModeValue("#f9f9f9","#151922")}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/create" element={<CreatePage/>}/>

      </Routes>
    </Box>
    </>
  )
}

export default App
