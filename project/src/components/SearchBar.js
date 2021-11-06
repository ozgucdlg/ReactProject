import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {


    handleFormSubmit = (event) => {
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <br/>
                <div className="row" >
                    <section className="col-10"  >
                        <input
                            onChange={this.props.searchMovieProp}
                            type="text" className="form-control"
                            placeholder="Search a movie *"
                        />
                    </section>
                    <section className="col-2">
                        <Link
                            to="/add"
                            type="button"
                            className="btn btn-md btn-danger"
                            style={{ float: 'right' }}> Add Movie
                        </Link>
                    </section>

                    
                </div>

                <br />
            </form>


        );
    }
}

export default SearchBar;