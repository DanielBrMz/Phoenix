import React, { useState } from "react";

interface PopUpProps {
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-4 text-center">
        {page === 1 && (
          <>
            <h2 className="text-xl font-bold">Pop Up1</h2>
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={nextPage}
            >
              Siguiente
            </button>
          </>
        )}
        {page === 2 && (
          <>
            <h2 className="text-xl font-bold">Pop Up2</h2>
            <div className="mt-4 flex justify-between">
              <button
                className="rounded bg-gray-500 px-4 py-2 text-white"
                onClick={prevPage}
              >
                Atrás
              </button>
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white"
                onClick={nextPage}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
        {page === 3 && (
          <>
            <h2 className="text-xl font-bold">Pop Up3</h2>
            <div className="mt-4 flex justify-between">
              <button
                className="rounded bg-gray-500 px-4 py-2 text-white"
                onClick={prevPage}
              >
                Atrás
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopUp;
