import React from 'react';

import MovieList from './MovieList';
import SearchBar from './SearchBar';




class App extends React.Component  {

    state = {
        movies: [],
        searchQuery: ""
    }

    async componentDidMount(){

        const baseUrl = "http://localhost:3002/movies";
        const response = await fetch(baseUrl);
        console.log(response);
        console.data =  await response.json();
        console.log(data);
        this.setState({movies: data})
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