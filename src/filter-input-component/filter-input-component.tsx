import './filter-input-component.scss';
import { BsSearch } from 'react-icons/bs';
import { useEffect } from 'react';
// Used to avoid re-writting the results
let loaded = false;
// Saves all the data results
let results: Array<any> = [];
function FilterInput(props: any) {
  // Save the hooked data, the first state of the props.items that has data
  // should include ALL searchable data
  useEffect(() => {
    if (props.items.length > 0 && !loaded) {
      results = props.items;
      loaded = true;
    }
  }, [props.items])


  /**
   * Executead each change event from the search input, grabs the search
   * term and filters trough the items
   * @param event React DOM event
   */
  function search(event: any) {
    let searchTerm = event.target.value.toLowerCase();
    let filtered = results;
    if (searchTerm !== "") {
      filtered = results.filter((data) => {
        return data.name.toLowerCase().indexOf(searchTerm) !== -1; 
      })
    }
    // Set the hook data to the filtered result
    props.setter(filtered);
  }

  return (
    <div className="FilterInput">
      <input type="text" placeholder="Search people!" onChange={(event) => { search(event) }} />
      <BsSearch />
    </div>
  );
}

export default FilterInput;