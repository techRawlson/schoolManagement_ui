import Navbar from "../../components/Navbar"
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Avatar,
    Flex,
} from '@chakra-ui/react'
import { IoArrowDownCircleOutline } from "react-icons/io5";
import ModalForm from "./ModalForm";
const Annoucement = () => {
    return <div style={{ width: '100vw', height: '100vh',margin:'0' ,paddin:'0'}}>
        <Navbar />
       
        <div style={{ padding: '20px' }}>
      <ModalForm />
    </div>
    </div>
}
export default Annoucement