import CakeCard from "./CakeCard";

function CakeContainer({cakeList, handleCakeClick, editCake}){
    return(
        <>
        {cakeList.map(cake => <CakeCard key={cake.flavor} handleCakeClick={handleCakeClick} editCake={editCake} cakeObj={cake}/>)}
        </>
    )
}

export default CakeContainer

