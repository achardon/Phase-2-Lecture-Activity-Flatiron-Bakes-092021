import {useEffect, useState} from 'react'
//Components
import CakeContainer from "./CakeContainer";
import Header from "./Header";
import Search from "./Search";
import CakeDetail from "./CakeDetail"
import Flavors from './Flavors';
import Form from './Form';

//data
// import {cakes, flavorsData} from "../data/cakesData"


function App() {
  const [cakes, setCakes] = useState([])
  const [flavorsData, setFlavorsData] = useState([])
  
  const [cakeList, setCakeList] = useState([])
  const [selectedCake, setSelectedCake] = useState(null)
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(true)

  const [formData, setFormData] = useState({
    flavor:'',
    size:'',
    image:'',
    price:''
  })

  useEffect(() => {
    fetch('http://localhost:4000/cakes')
    .then(r => r.json())
    .then(data => {
      setCakes(data)
      setCakeList(data)
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/flavorsData')
    .then(r => r.json())
    .then(data => setFlavorsData(data))
  }, [])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCakeList(cakeList.filter(cake => cake.flavor.includes(e.target.value)))
  }

  const handleCakeClick = (cake) => {
    setSelectedCake(cake)
  }

  const handleFilter = (flavor) => {
    setCakeList(cakeList.filter(cake => cake.flavor === flavor))
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
      //another way to do this:
      //copyOfCakes[idx] = cake
      setCakeList(copyOfCakes)
    }
  }

  const editCake = (e, cake) => {
    e.stopPropagation()
    setFormData(cake)
  }

  return (
  
    <div className="App">
      <Header bakeryName="FlatironBakes" slogan="live love code bake repeat"/>
      {selectedCake?<CakeDetail selectedCake={selectedCake} />:null}
      <Search search={search} handleSearch={handleSearch}/>
      <br/>
      <br/>
      <button
      onClick={() => setVisible(!visible)}
      >{visible? "Hide Form": "Show Form"}</button>
      {visible?
      <Form handleAddCake={handleAddCake} formData={formData} setFormData={setFormData}/> : null}
      <Flavors handleFilter={handleFilter} flavorsData={flavorsData}/>
      <CakeContainer cakeList={cakeList} handleCakeClick={handleCakeClick} editCake={editCake}/>
    </div>
  );
};

export default App;
