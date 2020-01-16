import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//Redux
import { editUserDetails } from '../actions'
//Formik
import { useFormik } from 'formik';
import * as Yup from 'yup';


//Style
import styled from 'styled-components';

import {
    Box,
    Card,
    Image,
    Heading,
    Text,
    Button,
    Flex,
    Link
} from 'rebass/styled-components'

import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
} from '@rebass/forms/styled-components'

const EditProfile = ({ user: { credentials }, editUserDetails, closeModal }) => {

    //During the first rendering bio, location and website of credentials will
    //be undefined.
    //Because of that, the input field will become uncontrolled.
    //Once we revceive this property (async api call), our state will be updated 
    //and credentials in our props too. 
    //And at that time the input field gets converted into a controlled component;
    // that's why you are getting the error: 'A component is changing an uncontrolled input of type text 
    //to be controlled.
    //Solution: We define an empty string as default value for bio, location and website.
    const { bio = '', location = '', website = '' } = credentials;

    const formik = useFormik({
        initialValues: { bio, location, website },
        enableReinitialize: true,
        validationSchema: Yup.object({
            bio: Yup.string()
                .max(160, 'Must be 160 characters or less'),
            location: Yup.string()
                .max(30, 'Must be 30 characters or less'),
            website: Yup.string().url()
                .max(100, 'Must be 100 characters or less')
        }),
        onSubmit: values => {
            editUserDetails(values);
            closeModal();
        }
    });

    return (
        <Box
            as='form'
            onSubmit={formik.handleSubmit}
        >
            <Flex mx={-2} mb={3} flexDirection="column">
                <Box px={2}>
                    <Label htmlFor='bio'>Bio</Label>
                    <Input
                        value={formik.values.bio}
                        id='bio'
                        name='bio'
                        placeholder='Add biography'
                        {...formik.getFieldProps('bio')}
                    />
                    {formik.touched.bio && formik.errors.bio ? (
                        <Box color="red">{formik.errors.bio}</Box>
                    ) : null}
                </Box>
                <Box px={2}>
                    <Label htmlFor='location'>Location</Label>
                    <Input
                        id='location'
                        name='location'
                        placeholder='Add location'
                        {...formik.getFieldProps('location')}
                    />
                    {formik.touched.location && formik.errors.location ? (
                        <Box color="red">{formik.errors.location}</Box>
                    ) : null}
                </Box>
                <Box px={2}>
                    <Label htmlFor='website'>website</Label>
                    <Input
                        id='website'
                        name='website'
                        placeholder='Add website'
                        {...formik.getFieldProps('website')}
                    />
                    {formik.touched.website && formik.errors.website ? (
                        <Box color="red">{formik.errors.website}</Box>
                    ) : null}
                </Box>
                <Box pt={3} px={2} ml='auto'>
                    <Button type="submit">
                        Submit
                    </Button>
                </Box>
                {/* {error ? (
                    <Box pt={3} px={2}>
                        <ErrorMessage>{error[Object.keys(error)[0]]}</ErrorMessage>
                    </Box>
                ) : null} */}
            </Flex>
        </Box>
    );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
}


export default connect(mapStateToProps, {
    editUserDetails
})(EditProfile);