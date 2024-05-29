import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl, FormLabel, Input, Stack
} from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { setUser } from './Redux/userActions';
function Login({ setToken, setUser }) {
  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true)
  const [onOpen, setOnOpen] = useState(false)
  const [onClose, setOnClose] = useState(false)



  const emailRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate();



  const login = async () => {


    try {
      const body = {
        staffId: emailRef.current.value,
        password: passRef.current.value,
      }
      console.log(body)
      const data = await fetch('http://localhost:8083/api/staff-login/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      const dataf = await data.json()
      // console.log(dataf)
      if (data.status >= 200 && data.status < 300) {
        console.log("ok", data)
        localStorage.setItem("token", "fdata.username");
        localStorage.setItem("staffName", dataf.staffName);
        localStorage.setItem("username", dataf.userId)
        navigate("/dashboard");
        toast.success('welcome')
      } else {
        const er=await data.text()
        toast.error(er)
        console.error("Login failed:", data.statusText);
        // Handle login failure here
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error here
    }
  }






  return (
    <Stack minH="100vh" minW="100vw">
      <ToastContainer />
      {/* <Button onClick={()=>setIsOpen(true)}>Open Modal</Button> */}
      {/* <Button ml={4} ref={finalRef}>
      I'll receive focus on close
    </Button> */}

      <Modal
        finalFocusRef={emailRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalCloseButton onClick={() => setIsOpen(false)} />
          <ModalBody pb={6}>


            <FormControl mt={4}>
              <FormLabel>UserId</FormLabel>
              <Input ref={emailRef} placeholder='name_id' type="text" autoComplete="new-password"/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input ref={passRef} placeholder='password' autoComplete='off' />
            </FormControl>
          </ModalBody>



          <ModalFooter>
            <Button colorScheme='blue' mr={200} onClick={() => login()}>
              Login
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )

}

export default Login
