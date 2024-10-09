import { useEffect, useState } from "react";

function useFilterSearch(
  path,
  page,
  fetchEvents,
  events,
  currentPage,
  setCurrentPage
) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [perPageCount, setPerPageCount] = useState("10");

  useEffect(() => {
    fetchEvents();
  }, [path, perPageCount]);

  useEffect(() => {
    const perPage =
      perPageCount === "10" ? 10 : perPageCount === "20" ? 20 : 30;
    const startIndex = currentPage * perPage;
    const paginatedData = events.slice(startIndex, startIndex + perPage);
    setData(paginatedData);
  }, [currentPage, perPageCount, events]);

  useEffect(() => {
    setCurrentPage(0);
  }, [perPageCount]);

  const handleChange = () => {
    const newData = events.filter((oneData) => {
      switch (page) {
        case "Upcoming Challenges":
          return (
            oneData.gamename.toString().includes(search) ||
            oneData.eventid.toString().includes(search) ||
            oneData.country.toString().includes(search) ||
            oneData.location.toString().includes(search)
          );
        case "Challenges":
          return (
            oneData.productName.includes(search) || oneData._id.includes(search)
          );
        default:
          return false;
      }
    });
    setData(newData);
  };

  return {
    handleChange,
    data,
    setSearch,
    setPerPageCount,
    currentPage,
    perPageCount,
    setCurrentPage,
  };
}

export default useFilterSearch;
