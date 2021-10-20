
function CakeCard({edit, setEdit, handleCakeClick,cakeObj, editCake, cakeObj:{flavor,size = '6" cake',price,liked}}){

    //moved below like functionality to CakeDetail
//const [liked, setLiked] = useState(false)
// const handleLike = () =>{
//     //setLiked((currentLike) => !currentLike)
//     cakeObj.liked = !cakeObj.liked
//     console.log(cakeObj.liked)
// }
    
return(
        <div onClick={() => handleCakeClick(cakeObj)}>
            <h1>Flavor: {flavor}</h1>
            <p>Size:{size}</p>
            <p>Price: {price}</p>
            {/*moved below like functionality to CakeDetail */}
            {/* <p onClick={handleLike}>{liked?'♥':'♡'}</p> */}
            <p>{liked?'♥':'♡'}</p>
            <button onClick={(e) => editCake(e, cakeObj)}>Edit</button>
        </div>
    )
}
export default CakeCard

