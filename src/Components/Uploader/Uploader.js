import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { v4 as randomString } from "uuid";
import axios from "axios";
import SearchItem from "./SearchItem";
import { OutlinedInput } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";

class Uploader extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      files: [],
      products: [],
      selectedShoe: "",
      boolean: true,
      clickedShoe: ""
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
    await axios.put(signedRequest, file, options).then(response => {});
    images.push(url);
    this.setState({ files: images });
  };

  handleSelectedShoe = shoe => {
    this.setState({
      clickedShoe: shoe
    });
  };

  handleSwitchToCloset = async () => {
    await this.setState({ boolean: false });

    setTimeout(() => {
      this.props.history.push("/dashboard/closet");
    }, 500);
  };

  render() {
    const mappedProducts = this.state.products
      .filter(shoe => {
        const { selectedShoe } = this.state;
        const splitString = selectedShoe.toLowerCase().split(" ");

        for (let i = 0; i < splitString.length; i++) {
          const term = splitString[i];
          if (
            !shoe.brand.toLowerCase().includes(term) &&
            !shoe.shoe_model.toLowerCase().includes(term)
          ) {
            return false;
          }
        }
        return true;
      })
      .map(shoe => {
        return (
          <SearchItem
            key={shoe.shoe_id}
            shoe={shoe}
            handleSelectedShoe={this.handleSelectedShoe}
          />
        );
      });
    const img = this.state.files.map(image => {
      return (
        <>
          <img
            src={image}
            alt="shoe"
            style={{ height: "100px", width: "100px", marginTop: 0 }}
          />
        </>
      );
    });
    return (
      <Grow in={this.state.boolean}>
        <div
          style={{
            display: "flex",
            height: "calc(100% - 64px)",
            justifyContent: "space-around",
            backgroundColor: "transparent",
            padding: "2%"
          }}
        >
          <div
            style={{
              height: "100%",
              width: "40%",
              border: "solid 3px black",
              borderRadius: "20px",
              backgroundColor: "white",
              boxShadow: "0 0 5px #26f7ff"
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                borderBottom: "solid 1px black",
                height: "5vh",
                alignItems: "center"
              }}
            >
              <input
                placeholder="Find and select a shoe"
                value={this.state.selectedShoe}
                onChange={e =>
                  this.setState({
                    selectedShoe: e.target.value.toLowerCase()
                  })
                }
                style={{
                  width: "93%",
                  marginBottom: "10px",
                  marginTop: "10px",
                  padding: "5px",
                  borderRadius: "10px",
                  height: "3vh",
                  outline: "none"
                }}
              />
            </div>
            <div
              style={{
                padding: "10px",
                overflow: "scroll",
                height: "91.5%"
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
              justifyContent: "center",
              height: "100%",
              width: "40%",
              border: "solid 3px black",
              borderRadius: "20px",
              backgroundColor: "white",
              boxShadow: "0 0 5px #26f7ff"
            }}
          >
            <button
              style={{
                position: "absolute",
                right: ".75%",
                top: "-.75%",
                background: "transparent",
                border: "none",
                outline: "none"
              }}
              onClick={() => {
                this.handleSwitchToCloset();
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "1.75rem",
                  fontWeight: "bolder"
                }}
              >
                X
              </h1>
            </button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <div style={{ width: "90%" }}>
                <SearchItem shoe={this.state.clickedShoe} />
              </div>
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  border: "dashed 1px black",
                  height: "200px",
                  flexWrap: "wrap"
                }}
              >
                <div>{img}</div>
              </div>
              <Button onClick={this.handleOpen.bind(this)}>Add Image</Button>
              <div>
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
              </div>
              <div
                style={{
                  height: "20vh",
                  width: "90%",
                  backgroundColor: "blue"
                }}
              >
                Text Field
              </div>
            </div>
          </div>
        </div>
      </Grow>
    );
  }
}

export default Uploader;
