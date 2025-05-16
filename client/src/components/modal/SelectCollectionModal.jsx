import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import axiosClient from "../../axios/axiosClient";

const SelectCollectionModal = ({ show, setShow, slug, movieInfo }) => {
  const [collections, setCollections] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axiosClient.get(`/favorites/${user.id}/collections`);
        setCollections(res.data.collections || []);
      } catch (err) {
        toast.error("Không thể tải bộ sưu tập.");
      }
    };

    if (show) fetchCollections();
  }, [show]);

  const handleAddToCollection = async (collectionName) => {
    try {
      await axiosClient.post(`/favorites/${user.id}/collections/add-movie`, {
        name: collectionName,
        movie: movieInfo,
      });

      toast.success("✅ Đã thêm phim vào bộ sưu tập!");
      setShow(false);
    } catch (err) {
      console.error(err);
      toast.error("❌ Thêm thất bại.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Select your Collections
        </h2>

        {collections.length === 0 ? (
          <p className="text-gray-500 text-center italic">Bạn chưa có bộ sưu tập nào.</p>
        ) : (
          <ul className="space-y-3">
            {collections.map((c, i) => (
              <li key={i}>
                <button
                  onClick={() => handleAddToCollection(c.name)}
                  className="w-full bg-gray-100 hover:bg-purple-100 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all border border-gray-200 text-left"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => setShow(false)}
            className="text-sm text-red-500 hover:underline font-medium"
          >
            ✖ Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCollectionModal;
