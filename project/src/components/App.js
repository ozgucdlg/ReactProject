import React from 'react';

import MovieList from './MovieList';
import SearchBar from './SearchBar';




class App extends React.Component  {

    state = {
        movies: [
            {
                "id": 7,
                "name": "The Matrix 3",
                "rating": "8.1",
                "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
                "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",

            },
            {
                "id": 8,
                "name": "The Matrix Reloaded",
                "rating": "6.9",
                "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jBegA6V243J6HUnpcOILsRvBnGb.jpg",
                "overview": "Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans, ability to see the codes of the things inside the matrix and a certain degree of pre-cognition.",

            },
            {
                "id": 11,
                "name": "Saw 3D",
                "rating": "7.5",
                "overview": "SAW legacy, a group of Jigsaw survivors gathers to seek the support of self-help guru and fellow survivor Bobby Dagen, a man whose own dark secrets unleash a new wave of terror.",
                "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qHCZ6LjtmqWDfXXN28TlIC9OppK.jpg",

            },

            {
                "id": 4,
                "name": "Rogue",
                "rating": 7.4,
                "overview": "This is a wider card with supporting text below as a natural lead-in to additional content.",
                "imageURL": "https://image.tmdb.org/t/p/w220_and_h330_face/uOw5JD8IlD546feZ6oxbIjvN66P.jpg"
            },

            {
                "id": 5,
                "name": "Project Power",
                "rating": 6.7,
                "overview": "This is a wider card with supporting text below as a natural lead-in to additional content.",
                "imageURL": "https://image.tmdb.org/t/p/w220_and_h330_face/TnOeov4w0sTtV2gqICqIxVi74V.jpg"
            },

            {
                "id": 6,
                "name": "Superman",
                "rating": 7.6,
                "overview": "This is a wider card with supporting text below as a natural lead-in to additional content.",
                "imageURL": "https://image.tmdb.org/t/p/w220_and_h330_face/6Bbq8qQWpoApLZYWFFAuZ1r2gFw.jpg"
            }
            
        ],
        searchQuery: ""

    }

    // this is event functione and set state part next part is being update button side in MoveLisr.js page
    // this is function to delete movie with onclick
    deleteMovie = (movie)=>{
        const newMovieList = this.state.movies.filter(
            m =>m.id !==movie.id
        );
        this.setState ({
            movies : newMovieList
        })

    }

    searchMovie= (event)=>{
        // console.log(event.target.value);
        this.setState({searchQuery:event.target.value});
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie)=>{
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            }
        )

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                       <SearchBar 
                       searchMovieProp={this.searchMovie}
                       />
                    </div>  
                </div>
                
                        <MovieList 
                         movies={filteredMovies} 
                         // we have to add new prop here to connect app.js page and movielist page each other
                         deleteMovieProp={this.deleteMovie} />
                   
                

            </div>

        )
    }

}

export default App;