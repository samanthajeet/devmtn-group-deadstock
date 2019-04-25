import React, { Component } from "react";
import { Doughnut, defaults } from "react-chartjs-2";
import axios from 'axios';

defaults.global.maintainAspectRatio = false;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   width: "",
      //   height: "",
      //   size: true,
      chart1Data: {
        labels: [],
        datasets: [
          {
            data: [],
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
        labels: [],
        datasets: [
          {
            data: [],
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
        labels: ["Regular", "Vintage"],
        datasets: [
          {
            data: [],
            backgroundColor: ["rgb(0, 0, 0, 1)", "rgb(38, 247, 255, 1)"],
            borderColor: ["rgb(255, 255, 255, .8)", "rgb(255, 255, 255, .8)"],
            borderWidth: 1
          }
        ]
      }
    };
  }


  componentDidMount() {
    this.getFirstChartStats();
    this.getSecondChartStats();
    this.getThirdChartStats();
  }

  getFirstChartStats = async () => {
    let brands = await axios.get('/api/closetstats1')
    brands = brands.data
    let chart1Data = { ...this.state.chart1Data }
    let labels = [...chart1Data.labels]
    let data = [...chart1Data.datasets[0].data]
    brands.forEach((brand, i) => {
      labels.push(brand.brand)
      data.push(brand.count)
    })
    chart1Data.labels = labels
    chart1Data.datasets[0].data = data
    this.setState({
      chart1Data
    })
  }

  getSecondChartStats = async () => {
    let value = await axios.get('api/closetstats2')
    value = value.data;
    let chart2Data = { ...this.state.chart2Data }
    let labels = [...chart2Data.labels]
    let data = [...chart2Data.datasets[0].data]
    value.forEach((value, i) => {
      labels.push(value.brand)
      data.push(value.sum)
    })
    chart2Data.labels = labels
    chart2Data.datasets[0].data = data
    this.setState({
      chart2Data
    })
  }

  getThirdChartStats = async () => {
    let shoes = await axios.get('/api/closetstats3')
    shoes = shoes.data
    let chart3Data = { ...this.state.chart3Data }
    let data = [...chart3Data.datasets[0].data]
    data.push(shoes[0].regular, shoes[1].vintage)
    chart3Data.datasets[0].data = data
    this.setState({
      chart3Data
    })
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
    // const showLabels = this.state.width > 678 ? true : false;
    // console.log(this.props)
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
