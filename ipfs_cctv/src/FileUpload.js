import React, { useRef, useEffect, useState } from "react";
import {Buffer} from 'buffer';
// import {
//   ListGroup,
//   ListGroupItem,
//   Row,
//   Col,
//   Form,
//   FormInput,
//   FormGroup,
//   FormCheckbox,
//   FormSelect,
//   Button
// } from "shards-react";

import { Form, Button, Badge, ProgressBar, Container } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
// const ipfsClient = require('ipfs-http-client');

const projectId = '2DCS0fCRlt3GtE33WGUMaHo05dI';
const projectSecret = '1df2c89edfa1422733bd46ebf81be1fa';
const auth1 =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    // apiPath: '/api/v0',
    headers: {
        authorization: auth1,
    },
});
// client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
//   console.log(res);
// });

// const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


export const FileUpload = ({ setUrl, setIpfs }) => {
    const [file, setFile] = useState({})
    const [fileUrl, setFileUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const uploadFile = async (e) => {
    // setLoading(true)
    e.preventDefault()

    try {
        console.log('Error ipfs')
        const added = await client.add(file);
        console.log('Error ipfs')
        console.log(file)
        console.log(added)
        const url = `https://safetymanagement.infura-ipfs.io/ipfs/${added.path}`
        console.log(url)
        // setUrl(url)
        setFileUrl(url)
        setUploaded(true)
        setIpfs(ipfsHash => added.path)
        setLoading(true)
        setUrl(url)
    } catch (err) {
        console.log('Error uploading the file : ', err)
        setLoading(false)
    }
    setLoading(false)

    }

    const preUpload = (e) => {
        if (e.target.value !== '') {
            setFile(e.target.files[0])
        } else {
            setFile({})
        }
    }

    const fileAndUploadButton = () => {
        if (file.name) {
            if (!loading) {
                return (
                    <div>
                        <h5>
                            {file.name} <Badge pill>{file.size} kb</Badge>
                        </h5>

                        {uploaded ? (
                            <h5>
                                ✅{' '}
                                <a
                                    href={fileUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    File
                                </a>{' '}
                                Uploaded Successfully ✅
                            </h5>
                        ) : (
                            <Button type='submit'>Upload File</Button>
                        )}
                    </div>
                )
            } else {
                return (
                    <Container>
                        <h4>Uploading File</h4>
                        <ProgressBar animated now={100} />
                        <h4>Please Wait ...</h4>
                    </Container>
                )
            }
        }
    }

    return (
        <div>
            <Form onSubmit={uploadFile}>
                <Form.Control
                    required
                    type='file'
                    onChange={(e) => preUpload(e)}
                    className='mb-3'
                />

                {fileAndUploadButton()}
            </Form>
        </div>
    )
}

export default FileUpload;