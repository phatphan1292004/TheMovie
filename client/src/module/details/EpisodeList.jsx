import React, { useState } from "react";

const EPISODES_PER_PAGE = 50;

const EpisodeList = ({ episodes = [] }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);
  const currentList = episodes.slice(
    (page - 1) * EPISODES_PER_PAGE,
    page * EPISODES_PER_PAGE
  );

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-white">Danh sách tập phim</h2>

      <div className="flex flex-wrap gap-2">
        {currentList.map((ep, i) => (
          <button
            key={i}
            onClick={() => setSelectedEpisode(ep)}
            className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-600 text-sm"
          >
            {ep.name}
          </button>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-white text-sm">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {selectedEpisode && (
        <>
          <div className="mt-40">
            <h3 className="text-white font-semibold mb-2">
              Bạn đang xem phim{" "}
              <span className="text-yellow-400">{selectedEpisode.name}</span>
            </h3>

            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => {
                  const index = episodes.findIndex(
                    (e) => e.name === selectedEpisode.name
                  );
                  if (index > 0) setSelectedEpisode(episodes[index - 1]);
                }}
                disabled={
                  episodes.findIndex((e) => e.name === selectedEpisode.name) ===
                  0
                }
                className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-40"
              >
                ◀ Tập trước
              </button>

              <button
                onClick={() => {
                  const index = episodes.findIndex(
                    (e) => e.name === selectedEpisode.name
                  );
                  if (index < episodes.length - 1)
                    setSelectedEpisode(episodes[index + 1]);
                }}
                disabled={
                  episodes.findIndex((e) => e.name === selectedEpisode.name) ===
                  episodes.length - 1
                }
                className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-40"
              >
                Tập tiếp ▶
              </button>
            </div>

            <div className="aspect-video w-full">
              <iframe
                src={selectedEpisode.link_embed}
                allowFullScreen
                title={selectedEpisode.name}
                className="w-full h-full rounded"
              ></iframe>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EpisodeList;
