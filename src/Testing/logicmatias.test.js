import axios from "axios";

import {
  getStore,
  getFirstChartStats,
  handleSelectedShoe
} from "../Logic/logicmatias";

const shoe = {
  shoe_id: 1,
  shoe_model: "Nike Air Max",
  colorway: "Black",
  brand: "Nike",
  price: 15000,
  description: "blah blah blah",
  year_released: 2016
};

describe("Tests getStore function", () => {
  it("should be a function", () => {
    expect(typeof getStore).toBe("function");
  });
});

describe("Tests getFirstChartStats", () => {
  it("should be a function", () => {
    expect(typeof getFirstChartStats).toBe("function");
  });
});

describe("Tests handleSelectedShoe", () => {
  it("should have an object as a parameter", () => {
    expect(shoe).toBeInstanceOf(Object);
  });

  it("should not have an array as a parameter", () => {
    expect(shoe).not.toBe(Array);
  });

  it("should have a parameter with a property of shoe_id with a value of number", () => {
    expect(typeof shoe.shoe_id).toBe("number");
  });
});
