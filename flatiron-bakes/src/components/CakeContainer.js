import CakeCard from "./CakeCard";

function CakeContainer({cakeList, handleCakeClick, editCake, edit, setEdit}){
    return(
        <>
        {cakeList.map(cake => <CakeCard key={cake.flavor} handleCakeClick={handleCakeClick} editCake={editCake} cakeObj={cake} edit={edit} setEdit={setEdit}/>)}
        </>
    )
}

export default CakeContainer

