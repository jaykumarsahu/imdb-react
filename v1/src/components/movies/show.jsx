import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';
import { REQUEST_FOR_MOVIE } from './../../constants/action-types';
import { isUserLoggedIn } from './../../services/user-info';
import { alertError } from '../../pages/alert';

class Show extends Component {
  componentWillMount() {
    if (isUserLoggedIn()) {
      this.props.getMovie(this.props.match.params.id);
    }
  }

  render() {
    if (isUserLoggedIn()) {
      return (
        <Jumbotron>
          <h1>{this.props.movie.name}</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button bsStyle="primary">Learn more</Button>
          </p>
        </Jumbotron>
      );
    }
    alertError('Please sign in first.');
    return <Redirect to="/signin" />;
  }
}

const mapStateToProps = state => ({ movie: state.movie, loading: state.loading });

const mapDispatchToProps = dispatch => ({
  getMovie: id => dispatch({ type: REQUEST_FOR_MOVIE, id }),
});

Show.contextTypes = {
  movie: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
