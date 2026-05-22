import React from "react"

function Search({placeholder, onSearch, input, setInput}) {


    return(
        <div className=" container-fluid">
            <div className="row mx-4">
                <div className=" my-5 searchContainer col-10 col-md-4 ">
                    <input className="search w-100" onChange={e => setInput(e.target.value)} value={input} type="search" placeholder={placeholder}   />
                </div>
                <div className="col-2 col-md my-5">
                    <button className="searchbtn" onClick={onSearch}><span className="material-symbols-outlined text-white searchIcon">search</span></button>
                </div>
            </div>


        </div>


    )
}

export default Search