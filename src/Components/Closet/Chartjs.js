import React, { Component } from "react";
import { Doughnut, defaults } from "react-chartjs-2";

defaults.global.maintainAspectRatio = false;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   width: "",
      //   height: "",
      //   size: true,
      chart1Data: {
        labels: ["Nike", "Adidas", "Reebok", "Puma", "Asics", "Jordan"],
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgb(0, 0, 0, 1)",
              "rgba(154, 18, 179, 1)",
              "rgb(0, 17, 255, 1)",
              "rgb(38, 247, 255, 1)",
              "rgb(255, 255, 255, 1)",
              "rgb(163, 163, 163, 1)"
            ],
            borderColor: [
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)"
            ],
            borderWidth: 1
          }
        ]
      },
      chart2Data: {
        labels: ["Nike", "Adidas", "Reebok", "Puma", "Asics", "Jordan"],
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgb(0, 0, 0, 1)",
              "rgba(154, 18, 179, 1)",
              "rgb(0, 17, 255, 1)",
              "rgb(38, 247, 255, 1)",
              "rgb(255, 255, 255, 1)",
              "rgb(163, 163, 163, 1)"
            ],
            borderColor: [
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)",
              "rgb(255, 255, 255, .8)"
            ],
            borderWidth: 1
          }
        ]
      },
      chart3Data: {
        labels: ["Vintage", "Regular"],
        datasets: [
          {
            data: [12, 19],
            backgroundColor: ["rgb(0, 0, 0, 1)", "rgb(38, 247, 255, 1)"],
            borderColor: ["rgb(255, 255, 255, .8)", "rgb(255, 255, 255, .8)"],
            borderWidth: 1
          }
        ]
      }
    };
  }

  /**
   * Calculate & Update state of new dimensions
   */
  //   updateDimensions() {
  //     if (window.innerWidth < 500) {
  //       this.setState({ width: 450, height: 102 });
  //     } else {
  //       let update_width = window.innerWidth - 100;
  //       let update_height = Math.round(update_width / 4.4);
  //       this.setState({ width: update_width, height: update_height });
  //     }
  //   }

  /**
   * Add event listener
   */
  //   componentDidMount() {
  //     this.updateDimensions();
  //     window.addEventListener("resize", this.updateDimensions.bind(this));
  //   }

  /**
   * Remove event listener
   */
  //   componentWillUnmount() {
  //     window.removeEventListener("resize", this.updateDimensions.bind(this));
  //   }

  render() {
    // console.log(this.state.width, this.state.height);
    // const showLabels = this.state.width > 678 ? true : false;
    const showLabels = true;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            width: "50vw",
            height: "33vh",
            boxSizing: "border-box",
            overflow: "hidden"
          }}
        >
          <div
            className="canvas-container"
            style={{ height: "100%", width: "33%" }}
          >
            <Doughnut
              data={this.state.chart1Data}
              options={{ maintainAspectRatio: false }}
              options={{
                legend: {
                  position: "left",
                  display: showLabels,
                  labels: {
                    fontColor: "white",
                    fontSize: 12,
                    boxWidth: 12
                  }
                },
                title: {
                  display: true,
                  position: "top",
                  text: "Brands",
                  fontSize: 18,
                  fontColor: "white",
                  fontStyle: "bold"
                }
              }}
            />
          </div>
          <div
            className="canvas-container"
            style={{ height: "100%", width: "33%" }}
          >
            <Doughnut
              data={this.state.chart2Data}
              options={{ maintainAspectRatio: false }}
              options={{
                legend: {
                  position: "left",
                  display: showLabels,
                  labels: {
                    fontColor: "white",
                    fontSize: 12,
                    boxWidth: 12
                  }
                },
                title: {
                  display: true,
                  position: "top",
                  text: "Value",
                  fontSize: 18,
                  fontColor: "white",
                  fontStyle: "bold"
                }
              }}
            />
          </div>
          <div
            className="canvas-container"
            style={{ height: "100%", width: "33%", color: "white" }}
          >
            <Doughnut
              data={this.state.chart3Data}
              options={{ maintainAspectRatio: false }}
              options={{
                legend: {
                  position: "left",
                  display: showLabels,
                  labels: {
                    fontColor: "white",
                    fontSize: 12,
                    boxWidth: 12
                  }
                },
                title: {
                  display: true,
                  position: "top",
                  text: "Vintage",
                  fontSize: 18,
                  fontColor: "white",
                  fontStyle: "bold"
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
