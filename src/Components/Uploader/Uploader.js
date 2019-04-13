import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { v4 as randomString } from "uuid";
import axios from "axios";
import SearchItem from "./SearchItem";
import { OutlinedInput } from "@material-ui/core";

class Uploader extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      files: [],
      products: [],
      selectedShoe: ""
    };
  }

  componentDidMount() {
    this.getStore();
  }

  handleOpen() {
    this.setState({
      open: true
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
    this.getSignedRequest(files);
  }

  getStore = async () => {
    let shoes = await axios.get("/api/shoes");
    console.log(shoes.data);
    this.setState({
      products: shoes.data
    });
  };

  getSignedRequest = files => {
    const images = [];
    files.map(file => {
      let fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;
      axios
        .get("/api/signs3", {
          params: {
            "file-name": fileName,
            "file-type": file.type
          }
        })
        .then(response => {
          const { signedRequest, url } = response.data;

          this.uploadFile(file, signedRequest, url, images);
        });
    });
  };

  uploadFile = async (file, signedRequest, url, images) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options).then(response => {
      console.log(response)
    });
    images.push(url);
    console.log(images)
    this.setState({ files: images });
    console.log(this.state.files)
  };

  handleSelectedShoe(shoe) {
    console.log("hit!", shoe);
  }

  render() {
    const mappedProducts = this.state.products
    
      .filter(shoe => {
        console.log("hit filter", this.state.selectedShoe);
        const filterString = shoe.shoe_model + " " + shoe.brand;
        return filterString.toLowerCase().includes(this.state.selectedShoe);
      })
      .map(shoe => {
        console.log("hit map");
        return (
          <SearchItem
            key={shoe.shoe_id}
            shoe={shoe}
            handleSelectedShoe={this.handleSelectedShoe}
          />
        );
      });
      console.log(this.state.files)
    const img = this.state.files.map(image => {
      console.log(image,typeof image)
      return (
        <div>
          <img
            src={image}
            alt="shoe"
            style={{ height: "25px", width: "25px" }}
          />
        </div>
      );
    });
    return (
      <div
        style={{
          display: "flex",
          height: 700,
          width: 700,
          justifyContent: "space-between"
        }}
      >
        <div
          style={{
            height: "100%",
            width: "40%",
            border: "solid 1px black",
            borderRadius: "10px"
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              borderBottom: "solid 1px black"
            }}
          >
            <input
              placeholder="Select a shoe"
              value={this.state.selectedShoe}
              onChange={e =>
                this.setState({ selectedShoe: e.target.value.toLowerCase() })
              }
              style={{
                width: "90%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "5px",
                borderRadius: "10px",
                outline: "none"
              }}
            />
          </div>
          <div
            style={{
              padding: "10px",
              overflow: "scroll",
              height: "92.5%"
            }}
          >
            {mappedProducts}
          </div>
        </div>

        <div
          style={{
            flexDirection: "column",
            width: "40%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button onClick={this.handleOpen.bind(this)}>Add Image</Button>

          {img}
          <DropzoneDialog
            align="center"
            open={this.state.open}
            onSave={this.handleSave.bind(this)}
            filesLimit={4}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            showPreviews={true}
            maxFileSize={10000000}
            onClose={this.handleClose.bind(this)}
            height={450}
            width={400}
          />

          <button onClick={() => {}}>Add Shoe</button>
        </div>
      </div>
    );
  }
}

export default Uploader;
