import axios from "axios";

export async function getStore() {
  let shoes = await axios.get("/api/shoes");
  this.setState({
    products: shoes.data
  });
}

export async function getFirstChartStats() {
  let brands = await axios.get("/api/closetstats1");
  brands = brands.data;
  let chart1Data = { ...this.state.chart1Data };
  let labels = [...chart1Data.labels];
  let data = [...chart1Data.datasets[0].data];
  brands.forEach((brand, i) => {
    labels.push(brand.brand);
    data.push(brand.count);
  });
  chart1Data.labels = labels;
  chart1Data.datasets[0].data = data;
  this.setState({
    chart1Data
  });
}

export function handleSelectedShoe(shoe) {
  this.setState({
    clickedShoe: shoe
  });
}
