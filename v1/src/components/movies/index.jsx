import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { alertError } from '../../pages/alert';
import noImage from './../../no_image.png';
import { isUserLoggedIn } from './../../services/user-info';
import { REQUEST_FOR_MOVIES } from './../../constants/action-types';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.movieRow = this.movieRow.bind(this);
  }

  componentWillMount() {
    if (isUserLoggedIn()) {
      this.props.getMovies();
    }
  }

  movieRow(movie) {
    return (
      <Col sm={6} md={3} key={movie.id}>
        <div className="movie-thumb thumbnail">
          <Link to={`/movies/${movie.id}`} key={movie.id} >
            <div className="movie">
              <Image src={movie.image_url || noImage} />
            </div>

            <div className="text-center caption">
              <OverlayTrigger placement="top" overlay={this.tooltip(movie.name)}>
                <h3 style={{ fontFamily: 'cursive' }}>{movie.name}</h3>
              </OverlayTrigger>
            </div>
          </Link>
        </div>
      </Col>
    );
  }

  tooltip(text) {
    return (
      <Tooltip id="tooltip">
        <strong>{text}</strong>
      </Tooltip>
    );
  }

  render() {
    if (isUserLoggedIn()) {
      return (
        <Grid>
          <Row>
            { this.props.movies.map(this.movieRow) }
          </Row>
        </Grid>
      );
    }
    alertError('Please sign in first.');
    return <Redirect to="/signin" />;
  }
}

const mapStateToProps = state => ({ movies: state.movies, loading: state.loading });

const mapDispatchToProps = dispatch => ({
  getMovies: () => dispatch({ type: REQUEST_FOR_MOVIES }),
});

Movies.contextTypes = {
  movies: PropTypes.array,
  getMovies: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
