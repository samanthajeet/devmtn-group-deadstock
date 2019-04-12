import React, { Component } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import { v4 as randomString } from 'uuid';
import axios from 'axios';
import SearchItem from './SearchItem';

class Uploader extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            files: [],
            products:[],
            search:''
        };
    }

    componentDidMount(){
        this.getStore()
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }


    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
        this.getSignedRequest(files)
    }

    getStore=async()=>{
        let shoes = await axios.get('/api/shoes')
        console.log(shoes.data)
        this.setState({
            products:shoes.data
        })
    }

    getSignedRequest = (files) => {
        const images = []
        files.map(file => {
            let fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
            axios
                .get('/api/signs3', {
                    params: {
                        'file-name': fileName,
                        'file-type': file.type,
                    },
                })
                .then(response => {
                    const { signedRequest, url } = response.data;
                    
                    this.uploadFile(file, signedRequest, url,images);
                })

        })

    }

    uploadFile = (file, signedRequest, url,images) => {
        const options = {
            headers: {
                'Content-Type': file.type,
            },
        };        
        images.push(url)
        this.setState({ files:images });
        axios
        .put(signedRequest, file, options)
        .then(response => {
        })

    };



    render() {
        const img = this.state.files.map(image => {
            return (
                <div>
                    <img src={image} alt="shoe" style={{height:'25px',width:'25px'}}/>
                </div>
            )
        })
        return (
            <div style={{ height: 400, width: 400 }}>
                <Button onClick={this.handleOpen.bind(this)}>
                    Add Image
        </Button>

                {img}
                <DropzoneDialog
                    align="center"
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    filesLimit={4}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={10000000}
                    onClose={this.handleClose.bind(this)}
                    height={450}
                    width={400}
                />
                <h1>Description</h1>
                <h1>Drop-Down</h1>
                <SearchItem/>
                <button onClick={() => {}}>Add Shoe</button>
            </div>
        );
    }
}

export default Uploader;