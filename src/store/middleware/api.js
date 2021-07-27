import axios from 'axios'

const add = (row) => {
    axios.post('https://sheet.best/api/sheets/e93f28d3-ea08-4ffc-9be5-3e1649ab0899', row);
  }

const fetch = async () => {
  let data = [];
  await axios.get('https://sheet.best/api/sheets/e93f28d3-ea08-4ffc-9be5-3e1649ab0899')
  .then(response => {
      data = response.data;
  })
  return data;
}

export default {add,fetch}