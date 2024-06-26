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
  FormControl, FormLabel, Input, Stack,
  Toast,
  IconButton,
  InputRightElement,
  InputGroup
} from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import { useData } from '../context/DataContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
// import { useDispatch } from 'react-redux';
// import { setUser } from './Redux/userActions';
function Login({ setToken, setUser }) {
  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true)
  const [onOpen, setOnOpen] = useState(false)
  const [onClose, setOnClose] = useState(false)

  const { Role, updateData } = useData();
  console.log(Role)
  const emailRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate();



  const login = async () => {
    try {
      const body = {
        userId: emailRef.current.value,
        password: passRef.current.value,
      };

      console.log(body);

      const response = await fetch('http://192.168.1.121:8081/api/Login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        throw new Error(errorText);
      }

      const responseData = await response.json();
      console.log(responseData);

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("token", responseData.token); // Assuming response contains a token
        localStorage.setItem("username", emailRef.current.value);
        updateData(responseData.role);

        // Show success toast notification
        toast.success('Login Successful', {
          autoClose: 1500,
          onClose: () => {
            // Navigate to the next page after the toast is closed
            navigate("/dashboard");
          },
        });
      } else {
        const errorText = await response.text();
        console.log(errorText);
        toast.error(errorText);
        console.error("Login failed:", response.statusText);
        // Handle login failure here
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'An error occurred during login');
      // Handle error here
    }
  };


//for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack minH="100vh" minW="100vw">
      <ToastContainer />


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
              <Input ref={emailRef} placeholder='name_id' type="text" autoComplete="new-password" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  ref={passRef}
                  pr='4.5rem' // Padding right to accommodate the button
                  type={showPassword ? 'text' : 'password'} // Toggle input type based on state
                  placeholder='Password'
                  autoComplete='off'
                />
                <InputRightElement width='4.5rem'>
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    variant='ghost'
                    colorScheme='blue'
                    size='sm'
                    onClick={togglePasswordVisibility}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  />
                </InputRightElement>
              </InputGroup>
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
