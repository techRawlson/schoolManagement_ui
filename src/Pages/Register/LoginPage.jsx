import { Box, Heading } from "@chakra-ui/react"
import Navbar from "../../components/Navbar"
import './login.css'
const Loginpage = () => {

    return <div className="main">
        <Navbar />
        <Box W="100vw" height="100vh"  >
            <video className='videoTag' src="../public/school.mp4"  autoPlay loop muted />
            <Heading>hello</Heading>
        </Box>
        
        
    </div>

}
export default Loginpage