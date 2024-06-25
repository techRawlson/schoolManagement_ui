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
    IconButton,
} from '@chakra-ui/react'
import { IoArrowBack, IoArrowDownCircleOutline } from "react-icons/io5";
import ModalForm from "./ModalForm";
import { useNavigate } from "react-router-dom";
const Annoucement = () => {
    const navigate = useNavigate()
    const goback = () => {
        navigate(-1)
    }
    return <div style={{ width: '100vw', height: '100vh',margin:'0' ,paddin:'0'}}>
        <Navbar />
        <IconButton as={IoArrowBack} cursor="pointer" onClick={goback} size="sm" m='2vw'/>
        <div style={{ padding: '20px' }}>
      <ModalForm />
    </div>
    </div>
}
export default Annoucement