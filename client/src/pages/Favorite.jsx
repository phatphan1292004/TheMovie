import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import InputField from "../components/input/InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
const Favorite = () => {
  const [collections, setCollections] = useState([
    {
      name: "Anime",
      movies: [
        {
          title: "Naruto",
          img: "https://i.imgur.com/YOJ6Flt.jpg",
          slug: "naruto",
        },
        { title: "AOT", img: "https://i.imgur.com/HsBGJqe.jpg", slug: "aot" },
      ],
    },
    {
      name: "Hành động",
      movies: [
        {
          title: "John Wick",
          img: "https://i.imgur.com/nNxN9vF.jpg",
          slug: "john-wick",
        },
      ],
    },
  ]);

  const [openCollections, setOpenCollections] = useState({});
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const toggleCollection = (name) => {
    setOpenCollections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAddCollection = (e) => {
    e.preventDefault();
    const name = newCollectionName.trim();
    if (!name) return;
    if (collections.find((c) => c.name === name)) {
      alert("Bộ sưu tập đã tồn tại!");
      return;
    }
    setCollections([...collections, { name, movies: [] }]);
    setNewCollectionName("");
    setShowForm(false); // ẩn form sau khi thêm
  };
  const newReleases = [
    {
      title: "Oppenheimer",
      img: "https://i.imgur.com/YOJ6Flt.jpg",
      slug: "oppenheimer",
    },
    {
      title: "The Marvels",
      img: "https://i.imgur.com/HsBGJqe.jpg",
      slug: "marvels",
    },
    {
      title: "Godzilla x Kong",
      img: "https://i.imgur.com/nNxN9vF.jpg",
      slug: "godzilla-kong",
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({
    mode: "onChange",
  });

  return (
    <Layout>
      <div className="container mt-[120px] flex justify-between gap-10 relative">
        {/* LEFT: Danh sách bộ sưu tập */}
        <div className="text-white flex-1">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-primary font-semibold text-2xl">
              Your Favorites
            </h3>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              + Add Collection
            </button>
          </div>

          {collections.map((collection, index) => (
            <div key={index} className="mb-6">
              <h4
                className="text-lg font-bold cursor-pointer text-white hover:text-primary transition"
                onClick={() => toggleCollection(collection.name)}
              >
                ▶ {collection.name}
              </h4>

              {openCollections[collection.name] && (
                <>
                  {collection.movies.length === 0 ? (
                    <p className="text-gray-400 italic mt-2">
                      Chưa có phim nào trong bộ này.
                    </p>
                  ) : (
                    <div className="flex gap-4 overflow-x-auto mt-3">
                      {collection.movies.map((movie, i) => (
                        <div key={i} className="w-[280px]">
                          <Link to={`/phim/${movie.slug}`}>
                            <img
                              src={movie.img}
                              alt={movie.title}
                              className="rounded mb-1 w-[300px]"
                            />

                            <p className="text-sm text-left hover:text-primary transition">
                              {movie.title}
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: Phim mới ra mắt */}
        <div className="w-[400px] bg-[#1f2937] rounded p-6 text-white shadow-md h-fit sticky top-[120px]">
          <h4 className="text-lg font-semibold mb-4">Phim mới ra mắt</h4>
          <div className="space-y-4">
            {newReleases.map((movie, index) => (
              <div key={index} className="flex gap-4 items-center">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <Link to={`/phim/${movie.slug}`}>
                  <p className="hover:text-primary">{movie.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL FORM: Overlay thêm bộ sưu tập */}
        {showForm && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setShowForm(false)}
          >
            <div
              className="bg-[#1f2937] p-6 rounded w-full max-w-md text-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-xl font-semibold mb-4">Add your favorites</h4>
              <form onSubmit={handleAddCollection}>
                <InputField
                  control={control}
                  label="Name of your Favorite"
                  defaultValue=""
                  id="colection_name"
                  placeholder="Ex: Anime, Action"
                  name="colection_name"
                />

                <div className="flex mt-4 gap-2">
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-purple-700 text-white py-2 rounded transition"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorite;
