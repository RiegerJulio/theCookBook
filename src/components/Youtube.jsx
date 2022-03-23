import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

class Youtube extends React.Component {
  onReady(event) {
    event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '200',
      width: '300',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const { video } = this.props;

    return (
      <YouTube
        className="youtube-video"
        videoId={ video }
        opts={ opts }
        onReady={ this.onReady }
      />
    );
  }
}

Youtube.propTypes = {
  video: PropTypes.string,
}.isRequired;

export default Youtube;
