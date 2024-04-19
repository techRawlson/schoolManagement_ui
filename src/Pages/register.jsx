import { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl, FormLabel, Input
} from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';

function Register() {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOpen, setIsOpen] = useState(true)
    const [onOpen, setOnOpen] = useState(false)
    const [onClose, setOnClose] = useState(false)


    const nameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()

    const navigate = useNavigate();
    const register = async () => {
        try {
            console.log(nameRef.current.value, emailRef.current.value, passRef.current.value);

            const data = await fetch('http://192.168.1.10:8081/auth/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passRef.current.value,
                })

            })
            const fdata = await data.json()
            console.log(fdata);
            if (data.ok) {
                // notify()
                console.log('register success')
                navigate("/login")
            }
           
        } catch (error) {
            console.log(error)
        }
    }





    return (
        <>
            {/* <Button onClick={()=>setIsOpen(true)}>Open Modal</Button> */}
            {/* <Button ml={4} ref={finalRef}>
      I'll receive focus on close
    </Button> */}
            <ToastContainer/> {/* Add this line */}
            <Modal
                initialFocusRef={nameRef}
                finalFocusRef={emailRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton onClick={() => setIsOpen(false)} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Your name</FormLabel>
                            <Input ref={nameRef} placeholder='Your name' />
                        </FormControl>

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
                        <Button colorScheme='blue' mr={200} onClick={() => register()}>
                            Register
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default Register
