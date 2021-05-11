import { useState, useEffect } from 'react';
import './App.scss';
import FilterInput from './filter-input-component/filter-input-component';
import List from './list-component/list-component';

const API = 'https://swapi.dev/api/people/';
let allData: Array<any> = [];

/**
 * We fetch recursively because we know the amount of data we have,
 * if we had a bigger data set we would not attempt to retrieve
 * all data from the start.
 * @param url API url to fetch from
 * @param callback Function to execute once there is no more data to fetch
 */
const fetchData = (url: string, callback?: any) => {
  fetch(url).then((response) => {
    response.json().then((data) => {
      allData = allData.concat(data.results);
      if (data.next) {
        fetchData(data.next, callback);
      }
      else {
        callback(allData);
      }
    })
  });
}

function App() {
  const [items, setItems] = useState([]);
  
  // Fetch all data once app component is mounted
  useEffect(() => {
    fetchData(API, (data: any)=> {
      setItems(data)
    });
  }, []);

  return (
    <div className="App">
      <FilterInput items={items} setter={setItems}></FilterInput>
      <List items={items} page-size={4}></List>
    </div>
  );
}

export default App;
