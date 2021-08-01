import React from 'react';

const  MovieList =  (props) => {

     /* function handleClick (event) {
         console.log(event.pageY);
         console.log('buton clicked')

         onClick={handleClick} bu satir button divine yazilir
       } */
   
        return (
            <div className="row">

                
                {props.movies.map((movie, i) => (

                    <div className="col-lg-4" key={i}>
                        <div className="card mb-4 shadow-sm">
                            <img src= {movie.imageURL} className="card-img-top" alt="Sample Movie" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text"> {movie.overview}</p>
                                <div className="d-flex justify-content-between aligin-items-center">
                                    <button type="button" onClick={(event) => props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>
                                    <h2><span className="badge bg-warning text-dark">{movie.rating}</span></h2>
                                </div>
                            </div>
                        </div>
                    </div>

                ) )}






            </div>

        );
    
}

export default MovieList;