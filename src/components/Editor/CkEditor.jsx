import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser'
import './editor.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// import ckfinder from '@ckeditor/ckeditor5-ckfinder'
import axios from 'axios';
import { createLogicalNot } from 'typescript';
const URL = 'https://api-test.networkon.tk/'
// const URL = 'http://localhost:8000/'

export default function CkEditor({ login }) {
    const [addData, setVal] = useState("");
    const [addedData, showData] = useState(0);
    const [image, setImage] = useState(CloudUploadIcon);
    const fileUpload = React.createRef();

    const handleChange = (e, editor) => {
        const data = editor.getData();
        setVal(data);
    }
    const ImageHandler = async (ev) => {
        const formData = new FormData();
        formData.append("file", ev.target.files[0]);
        formData.append("entity", "resource");
        console.log(formData)
        let res = await axios.post(URL + "main/file/upload", formData).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
        console.log("image handler")

    };
    function UploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return new UploadAdapter(loader);
        };
    }

    class UploadAdapter {
        constructor(loader) {

            this.loader = loader;
        }


        upload() {
            return this.loader.file

                .then(file => new Promise((resolve, reject) => {
                    setImage(file);
                    console.log(file)
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("entity", "resource");
                    console.log(formData);
                    // axios.post(URL + "main/file/upload", formData, { "Content-Type": "multipart/form-data" }).then(res => {
                    //     console.log(res)
                    //     var resData = res.data;
                    //     resData.default = resData.url;
                    //     resolve(resData);
                    // }).catch(error => {
                    //     console.log(error)
                    //     reject(error)
                    // });
                }));
        }
        abort() {

        }
    }

    const a1 = "dfdfdfdfdfdfd";
    return (
        <div className="editor">
            <h3>Ckeditor</h3>
            <div style={{ width: '700px', display: 'inline-block', textAlign: 'left' }}>
                <div style={{ width: '700px', display: 'inline-block', textAlign: 'right', marginBottom: '5px' }}>
                    <button style={{ backgroundColor: 'black', color: 'white' }} onClick={() => showData(!addedData)}>{addedData ? 'Hide Data' : 'Show Data'} </button>

                </div>
                <div id="ckeditor"></div>

                <form onSubmit={() => login(addData)}>
                    <CKEditor editor={ClassicEditor} data={addData}
                        // onInit={editor => {
                        //     editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                        //         return new UploadAdapter(loader);
                        //     };
                        // }}
                        config={
                            { extraPlugins: [UploadAdapterPlugin] }
                            // {
                            //     plugins: [SimpleUploadAdapter],

                            //     simpleUpload: {
                            //         uploadUrl: URL + 'main/file/upload',
                            //         withCredentials: true,

                            //         headers: {
                            //             "Content-Type": "multipart/form-data"
                            //         }
                            //     }
                            // }
                        }


                        onChange={handleChange}></CKEditor>

                    <button type="submit" >submit</button>
                </form>
                {/* <div>
                    {addedData ? addData : ''}
                </div> */}

                {/* <label for="file-upload" className="image-upload">
                    <CloudUploadIcon /> Upload
                </label> */}
                <input
                    id="file-upload"
                    accept="image/*"
                    type="file"
                    onChange={ImageHandler}
                    ref={fileUpload}
                ></input>
            </div>
        </div>
    )
}