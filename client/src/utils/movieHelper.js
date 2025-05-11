import {
  getMovieDetailBySlug,
} from "../axios/movieapi";

export const enrichMovieList = async (items) => {
  const movies = items.map((item) => ({
    title: item?.name || item?.title || "No title",
    image: item?.thumb_url || item?.poster_url || "",
    year: item?.year || "N/A",
    duration: item?.time || "",
    rating: item?.rating || "N/A",
    genres: item?.category?.map((g) => g.name) || [],
    slug: item?.slug,
  }));

  return movies.filter((m) => m.slug); 
};
