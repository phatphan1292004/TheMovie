// controllers/favoriteController.js
import Favorite from "../models/Favorite.js";

export const addCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;

    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      // Nếu chưa có record favorites cho user → tạo mới
      favorite = new Favorite({
        userId,
        collections: [{ name, movies: [] }],
      });
    } else {
      // Kiểm tra trùng tên collection
      const exists = favorite.collections.find((c) => c.name === name);
      if (exists) return res.status(400).json({ message: "Collection đã tồn tại" });

      favorite.collections.push({ name, movies: [] });
    }

    await favorite.save();
    res.status(200).json({ message: "Đã thêm bộ sưu tập", favorite });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
