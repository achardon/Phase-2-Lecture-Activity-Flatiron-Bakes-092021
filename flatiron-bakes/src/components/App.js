import {useState} from 'react'
//Components
import CakeContainer from "./CakeContainer";
import Header from "./Header";
import Search from "./Search";
import CakeDetail from "./CakeDetail"
import Flavors from './Flavors';
import Form from './Form';

//data
import {cakes, flavorsData} from "../data/cakesData"


function App() {
  const [cakeList, setCakeList] = useState(cakes)
  const [selectedCake, setSelectedCake] = useState(null)
  const [search, setSearch] = useState('')

  const [formData, setFormData] = useState({
    flavor:'',
    size:'',
    image:'',
    price:''
  })

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCakeList(cakes.filter(cake => cake.flavor.includes(e.target.value)))
  }

  const handleCakeClick = (cake) => {
    setSelectedCake(cake)
  }

  const handleFilter = (flavor) => {
    setCakeList(cakes.filter(cake => cake.flavor === flavor))
  }
  
  const handleAddCake = (cake) => {
    //figure out how to find out if cake already exists
    const idx = cakeList.findIndex(cakeInList => cakeInList.flavor === cake.flavor)
    //if cake does not exist, add new cake
    if (idx === -1) {
      setCakeList([cake, ...cakeList])
    }
    //if cake does exist, update existing cake with edited info
    else {
      const copyOfCakes = [...cakeList]
      const updatedCake = {...copyOfCakes[idx], image: cake.image, size: cake.size, price: cake.price}
      copyOfCakes.splice(idx, 1, updatedCake)
      setCakeList(copyOfCakes)
    }
  }

  const editCake = (cake) => {
    setFormData(cake)
  }

  return (
  
    <div className="App">
      <Header bakeryName="FlatironBakes" slogan="live love code bake repeat"/>
      {selectedCake?<CakeDetail selectedCake={selectedCake} />:null}
      <Search search={search} handleSearch={handleSearch}/>
      <Form handleAddCake={handleAddCake} formData={formData} setFormData={setFormData}/>
      <Flavors handleFilter={handleFilter} flavorsData={flavorsData}/>
      <CakeContainer cakeList={cakeList} handleCakeClick={handleCakeClick} editCake={editCake}/>
    </div>
  );
};

export default App;
