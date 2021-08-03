import React from 'react';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditMovie from './EditMovie';

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    async componentDidMount() {
        const baseURL = "http://localhost:3002/movies";
        const response = await fetch(baseURL);
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({ movies: data }) 
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get("http://localhost:3002/movies");
        this.setState({movies:response.data});
        
    }
    // this is event functione and set state part next part is being update button side in MoveLisr.js page
    // this is function to delete movie with onclick
    deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState({
            movies: newMovieList
        })
    }
    /*  FETCH API 
     deleteMovie =  async (movie)=>{
         const baseUrl =  `http://localhost:30002/movies/${movie.id}`
         await fetch(baseUrl, {
             method:"DELETE"        })
          const newMovieList = this.state.movies.filter(
              m =>m.id !==movie.id
          );
          this.setState ({
              movies : newMovieList
          })
      } */

    /*  AXIOS  API 
   deleteMovie =  async (movie)=>{
      axios.delete(`http://localhost:30002/movies/${movie.id}`)
       const newMovieList = this.state.movies.filter(
           m =>m.id !==movie.id
       );
       this.setState ({
           movies : newMovieList
       })
   } */




    searchMovie = (event) => {
        // console.log(event.target.value);
        this.setState({ searchQuery: event.target.value });
    }

    AddMovie = async (movie) => {
            await axios.post(`http://localhost:3002/movies/`, movie)
            this.setState(
                state => ({ movies: state.movies.concat([movie]) }),
            )   
            this.getMovies();     
    }

    EditMovie = async (id,updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
        this.getMovies();
             
}
 
    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });

        return (

            <Router>

                <div className="container">
                    <Switch>
                        <Route path="/" exact render={() => (
                            <React.Fragment>
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

                            </React.Fragment>
                        )}>
                        </Route>


                        <Route path="/Add" render={({ history }) => (

                            <AddMovie
                                onAddMovie={(movie) => {
                                    this.AddMovie(movie)
                                    history.push("/")
                                }}
                            />


                        )}>
                        </Route>

                        <Route path="/edit/:id" render={(props) => (

                            <EditMovie
                                {...props}

                                onEditMovie={(id, movie) => {
                                    this.EditMovie(id, movie)                                   
                                }
                                }
                            />


                        )}>
                        </Route>
                        


                    </Switch>

                </div>
            </Router>
        )
    }
}

export default App;