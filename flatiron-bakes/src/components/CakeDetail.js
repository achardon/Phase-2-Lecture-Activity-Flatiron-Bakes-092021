function CakeDetail({selectedCake, selectedCake:{flavor,size = '6" cake',price, image,description,liked}, handleDelete, updateHandler}){   
    return(
            <>
                <img src={image} alt={flavor}/>
                <h1>Flavor: {flavor}</h1>
                <p>Size:{size}</p>
                <p>Price: {price}</p>
                <p>{description}</p>
                <button onClick={() => updateHandler(selectedCake)}>{selectedCake.liked?"❤️" : "♡"}</button>
                <button onClick={() => handleDelete(selectedCake)}>Delete</button>
            </>
        )
    }
    export default CakeDetail
    
    