import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { START_LOADING, STOP_LOADING, REQUEST_FOR_MOVIE } from './../../constants/action-types';

class Show extends Component {
  componentWillMount() {
    this.props.getMovie(this.props.match.params.id);
  }

  render() {
    if (this.props.loading) {
      this.props.startLoading();
      return null;
    }
    this.props.stopLoading();
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
}

const mapStateToProps = state => ({ movie: state.movie, loading: state.loading });

const mapDispatchToProps = dispatch => ({
  getMovie: movie => dispatch({ type: REQUEST_FOR_MOVIE, movie }),
  startLoading: () => dispatch({ type: START_LOADING }),
  stopLoading: () => dispatch({ type: STOP_LOADING }),
});

Show.contextTypes = {
  movie: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
