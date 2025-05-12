import axiosClient from "../axios/axiosClient";

export const getNewMovie = async (page = 1) => {
  try {
    const res = await axiosClient.get(`/danh-sach/phim-moi-cap-nhat`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSeriesMovies = async (page = 1) => {
  try {
    const res = await axiosClient.get(`/danh-sach/phim-bo`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getSeriesMovies error:", error);
    return null;
  }
};

export const getSingleMovies = async (page = 1) => {
  try {
    const res = await axiosClient.get(`/danh-sach/phim-le`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getSingleMovies error:", error);
    return null;
  }
};

export const getAnimeMovies = async (page = 1) => {
  try {
    const res = await axiosClient.get(`/danh-sach/hoat-hinh`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getAnimeMovies error:", error);
    return null;
  }
};

export const getTVShowMovies = async (page = 1) => {
  try {
    const res = await axiosClient.get(`/danh-sach/tv-shows`, {
      params: { page },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getTVShowMovies error:", error);
    return null;
  }
};

export const getMovieDetailBySlug = async (slug) => {
  try {
    const res = await axiosClient.get(`/phim/${slug}`);
    return res.data;
  } catch (error) {
    console.error("❌ getMovieDetailBySlug error:", error);
    return null;
  }
};

export const getRelatedMovies = async (categorySlug, currentMovieSlug) => {
  try {
    const res = await axiosClient.get(`/tim-kiem`, {
      params: { keyword: categorySlug },
    });

    const movies = res.data?.data?.items || [];
    return movies.filter((movie) => movie.slug !== currentMovieSlug);
  } catch (err) {
    console.error("❌ Related movies error:", err);
    return [];
  }
};

export const getMovieListByType = async (type, page = 1) => {
  try {
    const res = await axiosClient.get(`/danh-sach/${type}`, {
      params: { page },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error loading movie list:", err);
    return null;
  }
};
