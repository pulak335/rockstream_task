import React from 'react';

const Moviecard = (props) => {
    const {movie, idx} = props;
    const {release_date, poster_path, original_title} = movie;
    let year = release_date.slice(0, 4)
    

    const baseImgUrl = `http://image.tmdb.org/t/p/w500/${poster_path}`
    return (
            <div
              className="frame"
              key={idx}
            >
              <>
              <div className='movie-poster'>
                <img src={baseImgUrl} alt="" />
              </div>
              
              <div>
                <h1>{original_title}</h1>
                <p>{year}</p>
              </div>
              </>
            </div>
    );
};

export default Moviecard;