import React from 'react';

class SearchBar extends React.Component{
    

    handleFormSubmit = (event) =>{
        event.preventDefault();
    }
    render (){
        return(
               <form>
                   <div className="form-row mb-5" >
                       <div className="col-12"> 
                            <br/>
                           <input onChange={this.props.searchMovieProp}                                           type="text"
                            className="form-control" placeholder="Search a movie *"
                            />
                       </div>

                   </div>
               </form>

        );
    }
}

export default SearchBar;