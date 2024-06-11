import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    FormErrorMessage,
    Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const MyModal = ({ isOpen, onClose, formValues, setFormValues }) => {
    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.log(values);
            setFormValues(values);
            setSubmitting(false);
            onClose();
        }, 400);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW="60%">
                <ModalHeader>Add New</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={3}>
                    <Formik
                        initialValues={formValues}
                        validate={(values) => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Name is Required';
                            }
                            if (!values.email) {
                                errors.email = 'Email is required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.fathersname) {
                                errors.fathersname = "Father's name is required";
                            }
                            if (!values.mobile) {
                                errors.mobile = 'Mobile number is required';
                            } else if (!/^\d{10}$/.test(values.mobile)) {
                                errors.mobile = 'Mobile number must be 10 digits';
                            }
                            if (!values.class) {
                                errors.class = 'Class is required';
                            }
                            if (!values.section) {
                                errors.section = 'Section is required';
                            }
                            if (!values.gender) {
                                errors.gender = 'Gender is required';
                            }
                            if (!values.rollNo) {
                                errors.rollNo = 'Roll Number is required';
                            }
                            if (!values.category) {
                                errors.category = 'Category is Required';
                            }
                            if (!values.session) {
                                errors.session = 'Session is Required';
                            }
                            return errors;
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form>
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Field name="name">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name} isRequired>
                                                <FormLabel htmlFor="name">Name</FormLabel>
                                                <Input {...field} id="name" placeholder="Name" />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="email" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                                <Input {...field} id="email" placeholder="Email Address" />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="fathersname" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.fathersname && form.touched.fathersname} isRequired m="1">
                                                <FormLabel htmlFor="fathersname">Father Name</FormLabel>
                                                <Input {...field} placeholder='Father name' id="fathersname" name='fathersname' />
                                                <FormErrorMessage>{form.errors.fathersname}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>

                                <Flex justifyContent="space-between" alignItems="center">
                                    <Field name="mobile" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.mobile && form.touched.mobile} isRequired m="1">
                                                <FormLabel htmlFor="fathersname">Mobile</FormLabel>
                                                <Input
                                                    {...field}
                                                    placeholder='Mobile'
                                                    id="mobile"
                                                    name='mobile'
                                                    maxLength={10}
                                                    type="tel"
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        if (/^\d*$/.test(value)) {
                                                            form.setFieldValue('mobile', value);
                                                        }
                                                    }}
                                                />
                                                <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="address" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.address && form.touched.address} m="1">
                                                <FormLabel htmlFor="address">Address</FormLabel>
                                                <Input {...field} placeholder='Address' id="address" name='address' />
                                                <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Field name="class" as="select" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.class && form.touched.class} isRequired m="1">
                                                <FormLabel htmlFor="class">Class</FormLabel>
                                                <Select {...field} id="class" placeholder="Select option">
                                                    <option value="option1">Class 1</option>
                                                    <option value="option2">Class 2</option>
                                                    <option value="option3">Class 3</option>
                                                </Select>
                                                <FormErrorMessage>{form.errors.class}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="section" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.section && form.touched.section} isRequired m="1">
                                                <FormLabel htmlFor="section">Section</FormLabel>
                                                <Input {...field} placeholder='Section' id="section" name='section' />
                                                <FormErrorMessage>{form.errors.section}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="gender" as="select" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.gender && form.touched.gender} isRequired m="1">
                                                <FormLabel htmlFor="gender">Gender</FormLabel>
                                                <Select {...field} id="gender" placeholder="Select option">
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </Select>
                                                <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>

                                <Flex justifyContent="space-between" alignItems="center">
                                    <Field name="rollNo" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.rollNo && form.touched.rollNo} isRequired m="1">
                                                <FormLabel htmlFor="rollNo">Roll Number</FormLabel>
                                                <Input {...field} placeholder='Roll Number' id="rollNo" name='rollNo' />
                                                <FormErrorMessage>{form.errors.rollNo}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="category" as="select" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.category && form.touched.category} isRequired m="1">
                                                <FormLabel htmlFor="category">Category</FormLabel>
                                                <Select {...field} id="category" placeholder="Select option">
                                                    <option value="general">General</option>
                                                    <option value="obc">OBC</option>
                                                    <option value="sc">SC</option>
                                                    <option value="st">ST</option>
                                                </Select>
                                                <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="session" m="1">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.session && form.touched.session} isRequired m="1">
                                                <FormLabel htmlFor="session">Session</FormLabel>
                                                <Input {...field} placeholder='Session' id="session" name='session' />
                                                <FormErrorMessage>{form.errors.session}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Flex>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} isLoading={isSubmitting} type="submit" isDisabled={!isValid}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default MyModal;
