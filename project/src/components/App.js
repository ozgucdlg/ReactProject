import React from 'react';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EditMovie from './EditMovie';
import { movieData } from '../data/movieData';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <div className="container mt-5">
                <h1>Something went wrong.</h1>
                <pre>{this.state.error.toString()}</pre>
            </div>;
        }
        return this.props.children;
    }
}

class App extends React.Component {
    state = {
        movies: [],
        searchQuery: "",
        loading: true,
        error: null
    }

    componentDidMount() {
        console.log('App mounted');
        try {
            this.setState({ loading: true });
            this.setState({ 
                movies: movieData.movies,
                loading: false 
            }, () => {
                console.log('Movies loaded:', this.state.movies);
            });
        } catch (error) {
            console.error('Error loading movies:', error);
            this.setState({ 
                error: error.message,
                loading: false 
            });
        }
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
        console.log('Rendering App with movies:', this.state.movies);
        
        if (this.state.loading) {
            return (
                <div className="container mt-5">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.error) {
            return (
                <div className="container mt-5">
                    <div className="alert alert-danger" role="alert">
                        Error: {this.state.error}
                    </div>
                </div>
            );
        }

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });

        return (
            <ErrorBoundary>
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
                                    {filteredMovies.length === 0 ? (
                                        <div className="alert alert-info">
                                            No movies found.
                                        </div>
                                    ) : (
                                        <MovieList
                                            movies={filteredMovies}
                                            deleteMovieProp={this.deleteMovie}
                                        />
                                    )}
                                </React.Fragment>
                            )} />

                            <Route path="/Add" render={({ history }) => (
                                <AddMovie
                                    onAddMovie={(movie) => {
                                        this.AddMovie(movie)
                                        history.push("/")
                                    }}
                                />
                            )} />

                            <Route path="/edit/:id" render={(props) => (
                                <EditMovie
                                    {...props}
                                    onEditMovie={(id, movie) => {
                                        this.EditMovie(id, movie)                                   
                                    }}
                                />
                            )} />
                        </Switch>
                    </div>
                </Router>
            </ErrorBoundary>
        );
    }
}

export default App;