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
  FormControl, FormLabel, Input,Stack
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
      const body={
        email: emailRef.current.value,
        password: passRef.current.value,
      }
      console.log(body)
      const data = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (data.ok) {
        const fdata = await data.json();
        console.log(fdata);
        setUser(fdata)
        // dispatch(setUser(fdata));
        console.log(fdata.username)
        localStorage.setItem("token", fdata.jwtToken);
        localStorage.setItem("username",fdata.username)
        setToken(fdata.jwtToken)

        toast.success('wrong credentials')
        navigate("/dashboard");
      } else {
        toast.error('wrong credentials')
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
              <FormLabel>Email</FormLabel>
              <Input ref={emailRef} placeholder='abc@gmail.com' type="email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input ref={passRef} placeholder='Password' />
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
