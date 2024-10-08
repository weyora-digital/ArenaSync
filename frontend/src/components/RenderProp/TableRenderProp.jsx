import React, { useEffect, useState } from "react";
import PaginationButton from "../PaginationButton/PaginationButton";

function TableRenderProp({
  handleClick,
  events,
  tableHeading,
  render,
  totalElements,
  heading,
  buttonName,
  currentPage,
  setCurrentPage,
}) {
  const [data, setData] = useState([]);
  const [perPageCount, setPerPageCount] = useState("10");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const perPage = Number(perPageCount);
    const pages = Math.ceil(events.length / perPage);
    setTotalPages(pages);
    setCurrentPage(0);
  }, [events, perPageCount]);

  useEffect(() => {
    const perPage = Number(perPageCount);
    const startIndex = currentPage * perPage;
    const paginatedData = events.slice(startIndex, startIndex + perPage);
    setData(paginatedData);
  }, [currentPage, perPageCount, events]);

  return (
    <section className="flex flex-col mx-10 mt-16">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[24px] font-[600px]">{heading}</span>
          <div>
            <select
              name="perpagecount"
              id="perpagecount"
              onChange={(e) => setPerPageCount(e.target.value)}
              className="rounded border border-name_background px-2"
              value={perPageCount}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <span className="pl-2">entries per page</span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="bg-organizer_background rounded py-3 px-4 font-bold text-primary_text">
            <button
              className="flex justify-center items-center space-x-3"
              onClick={handleClick}
            >
              <span className="text-lg">+</span>
              <span className="text-base">{buttonName}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[500px] border-2 mt-4 rounded-lg border-event_text overflow-x-auto overflow-y-auto">
        {tableHeading.length > 0 && (
          <div
            className={`sticky top-0 bg-background grid grid-cols-${tableHeading.length} h-16 items-center border-b-2 border-b-event_text font-bold`}
          >
            {tableHeading.map((heading, index) => (
              <p key={index} className="text-center">
                {heading}
              </p>
            ))}
          </div>
        )}
        {data.length > 0 && render(data)}
      </div>

      <div className="flex justify-between p-3">
        <div className="p-3">
          <p>
            Showing {currentPage * Number(perPageCount) + 1} to{" "}
            {Math.min((currentPage + 1) * Number(perPageCount), totalElements)}{" "}
            of {totalElements} entries
          </p>
        </div>
        <div>
          <PaginationButton
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}

export default TableRenderProp;
