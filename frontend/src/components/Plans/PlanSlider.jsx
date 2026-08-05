import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PlanCard from "./PlanCard";

const PlanSlider = ({
  plans,
  fetchPlans,
  setEditPlan,
  setOpenModal,
}) => {
  const cardsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(plans.length / cardsPerPage);

  const start = currentPage * cardsPerPage;

  const currentPlans = plans.slice(
    start,
    start + cardsPerPage
  );

  const nextSlide = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {currentPlans.map((plan) => (

          <div
            key={plan._id}
            className="transition-all duration-300 hover:scale-97 hover:-translate-y-2"
          >

            <PlanCard
              plan={plan}
              fetchPlans={fetchPlans}
              setEditPlan={setEditPlan}
              setOpenModal={setOpenModal}
            />

          </div>

        ))}

      </div>

      {plans.length > cardsPerPage && (

        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            onClick={prevSlide}
            disabled={currentPage === 0}
            className="flex  w-10 h-10 rounded-full border hover:bg-black hover:text-white disabled:opacity-40 items-center justify-center"
          >
            <FaChevronLeft />
          </button>

          <div className="flex gap-2">

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === index
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300"
                }`}
              />

            ))}

          </div>

          <button
            onClick={nextSlide}
            disabled={currentPage === totalPages - 1}
            className="flex  w-10 h-10 rounded-full border hover:bg-black hover:text-white disabled:opacity-40 items-center justify-center"
          >
            <FaChevronRight />
          </button>

        </div>

      )}

    </>
  );
};

export default PlanSlider;