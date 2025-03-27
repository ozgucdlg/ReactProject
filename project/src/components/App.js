import React from 'react';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditMovie from './EditMovie';
import { movieData } from '../data/movieData';

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    componentDidMount() {
        this.setState({ movies: movieData.movies });
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

    searchMovie = (event) => {
        // console.log(event.target.value);
        this.setState({ searchQuery: event.target.value });
    }

    AddMovie = (movie) => {
        const newMovie = {
            ...movie,
            id: this.state.movies.length + 1
        };
        this.setState(state => ({
            movies: [...state.movies, newMovie]
        }));
    }

    EditMovie = (id, updatedMovie) => {
        const updatedMovies = this.state.movies.map(movie =>
            movie.id === parseInt(id) ? { ...updatedMovie, id: parseInt(id) } : movie
        );
        this.setState({ movies: updatedMovies });
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