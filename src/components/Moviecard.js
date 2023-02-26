import React,{useState} from 'react';

const Moviecard = (props) => {

  const [isHover, setIsHover] = useState(false);

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
              <div 
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className='movie-poster'>
                <i className="fa-solid fa-crown"></i>
                {
                  isHover && (
                    <><div className='play-btn'><i className="fa-regular fa-circle-play"></i></div>
                    <button className='add-btn'>Add to favourites</button></>
                  )
                }
                <img className="img-hover" src={baseImgUrl} alt="" />
              </div>
              
              <div className='movie-details'>
                <h2>{original_title}</h2>
                <p>{year}</p>
              </div>
              </>
            </div>
    );
};

export default Moviecard;