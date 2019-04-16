import axios from 'axios';

export function getCollection() {
    axios.get(`/api/collection`).then( response => {
      return response.data
    })
}

export function setComma(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function  combineModelColor(model, colorway){
  const modelColorway = model + ' - ' + colorway
  return modelColorway
}
