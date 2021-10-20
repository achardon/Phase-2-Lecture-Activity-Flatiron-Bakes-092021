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
  const [edit, setEdit] = useState('')

  const [formData, setFormData] = useState({
    flavor:'',
    size:'',
    image:'',
    price:'',
    liked: false
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
    //console.log(formData)
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
    //if we are editing cake (still need to add PATCH request)
    if (edit) {
    //figure out which index cake is
    const idx = cakeList.findIndex(cakeInList => cakeInList.flavor === cake.flavor)
    //update existing cake with edited info
      const copyOfCakes = [...cakeList]
      const updatedCake = {...copyOfCakes[idx], image: cake.image, size: cake.size, price: cake.price}
      copyOfCakes.splice(idx, 1, updatedCake)
      //another way to do this:
      //copyOfCakes[idx] = cake
      setCakeList(copyOfCakes)
    }
    //POST request when adding a cake (because edit is empty)
    else {
      fetch('http://localhost:4000/cakes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(r => r.json())
      .then(data => {
        setCakeList([data, ...cakeList])
        setFormData({
          flavor: '',
          size: '',
          image: '',
          price: ''
        })
      })
    }
  }

  const editCake = (e, cake) => {
    e.stopPropagation()
    setEdit(cake)
    setFormData(cake)
  }

  const handleDelete = (deletedCake) => {
    console.log(deletedCake)
    fetch(`http://localhost:4000/cakes/${deletedCake.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const filteredCakes = cakes.filter(cake => cake.id !== deletedCake.id)
      setCakes(filteredCakes)
      setCakeList(filteredCakes)
      setSelectedCake(null)
    })
  }

  const updateHandler = (cake) => {
    //console.log(cake)
    const updatedCake = {...cake, liked: !cake.liked}

    fetch (`http://localhost:4000/cakes/${updatedCake.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCake)
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      const updatedCakes = cakeList.map(cake => {
        if (cake.id === updatedCake.id) {
          return updatedCake
        }
        else {
          return cake
        }
      })
      console.log(updatedCakes)
      setCakeList(updatedCakes)
      setSelectedCake(updatedCake)
    })

  }

  return (
  
    <div className="App">
      <Header bakeryName="FlatironBakes" slogan="live love code bake repeat"/>
      {selectedCake?<CakeDetail selectedCake={selectedCake} handleDelete={handleDelete} updateHandler={updateHandler}/>:null}
      <Search search={search} handleSearch={handleSearch}/>
      <br/>
      <br/>
      <button
      onClick={() => setVisible(!visible)}
      >{visible? "Hide Form": "Show Form"}</button>
      {visible?
      <Form handleAddCake={handleAddCake} formData={formData} setFormData={setFormData}/> : null}
      <Flavors handleFilter={handleFilter} flavorsData={flavorsData}/>
      <CakeContainer cakeList={cakeList} handleCakeClick={handleCakeClick} editCake={editCake} edit={edit} setEdit={setEdit}/>
    </div>
  );
};

export default App;
