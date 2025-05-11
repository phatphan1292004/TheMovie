import { useState, useRef } from "react";
import HoverCardPreview from "./HoverCardPreview";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { getMovieDetailBySlug } from "../../axios/movieapi";

const MovieCardPopular = ({
  title,
  image,
  year,
  duration,
  rating,
  heightImg,
  genres = [],
  slug,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const [cardPosition, setCardPosition] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCardPosition(rect);
        const viewportWidth = window.innerWidth;
        const shouldAlignRight = rect.left + 700 > viewportWidth;
        setAlignRight(shouldAlignRight);
      }

      // ❗ Gọi API chi tiết chỉ khi hover
      if (!trailer) {
        try {
          const detail = await getMovieDetailBySlug(slug);
          const trailerUrl = detail?.movie?.trailer_url || detail?.movie?.trailer || null;
          setTrailer(trailerUrl);
        } catch (err) {
          console.warn("Không lấy được trailer:", slug);
        }
      }

      setShowPreview(true);
    }, 1000); // delay hover
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowPreview(false);
    }, 200);
  };

  const imgUrl = image?.includes("https://phimimg.com/")
    ? image
    : `https://phimimg.com/${image}`;

  return (
    <div
      ref={cardRef}
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/phim/${slug}`}>
        <div className="p-3 rounded-lg transition text-white cursor-pointer">
          <img
            src={imgUrl}
            alt=""
            className={`rounded-lg mb-4 object-cover w-full ${heightImg || "h-auto"}`}
          />
          <h3 className="text-lg font-medium truncate">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
            <span>{year}</span>
            <span>{duration}</span>
            <span>{rating}</span>
          </div>
        </div>
      </Link>

      {showPreview &&
        ReactDOM.createPortal(
          <HoverCardPreview
            alignRight={alignRight}
            showPreview={showPreview}
            videoSrc={trailer}
            title={title}
            year={year}
            duration={duration}
            rating={rating}
            slug={slug}
            genres={genres}
            cardPosition={cardPosition}
          />,
          document.body
        )}
    </div>
  );
};

export default MovieCardPopular;
