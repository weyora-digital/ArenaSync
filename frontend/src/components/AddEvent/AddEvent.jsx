import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import { createAdminEvent, updateEvent } from "../../helper/adminhelper";
import { fetchCountries } from "../../helper/helper";
import { RxCross2 } from "react-icons/rx";
import ClipLoading from "../ClipLoading/ClipLoading";

const AddEvent = ({ onClose, editEvent, item, fetchEvents, resetPage }) => {
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("admin_token");

  const formik = useFormik({
    initialValues: editEvent
      ? {
          gamename: item.gamename || "",
          country: item.country || "",
          organizer: item.organizer || "",
          location: item.location || "",
          startingDate: item.starting_date || "",
          endDate: item.end_date || "",
          startingTime: item.starting_time || "",
          endTime: item.end_time || "",
          registrationClosing: item.registration_closing || "",
          file: item.img_path || "",
        }
      : {
          gamename: "",
          country: "",
          organizer: "",
          location: "",
          startingDate: "",
          endDate: "",
          startingTime: "",
          endTime: "",
          registrationClosing: "",
          file: null,
        },
    validationSchema: Yup.object({
      gamename: Yup.string().required("Game Name is required"),
      country: Yup.string().required("Country is required"),
      organizer: Yup.string().required("Organizer is required"),
      location: Yup.string().required("Location is required"),
      startingDate: Yup.string().required("Starting Date is required"),
      endDate: Yup.string().required("End Date is required"),
      startingTime: Yup.string().required("Starting Time is required"),
      endTime: Yup.string().required("End Time is required"),
      registrationClosing: Yup.string().required(
        "Registration Closing Date is required"
      ),
      file: Yup.mixed().required("Banner is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("gamename", values.gamename);
      formData.append("country", values.country);
      formData.append("organizer", values.organizer);
      formData.append("location", values.location);
      formData.append("startingDate", values.startingDate);
      formData.append("endDate", values.endDate);
      formData.append("startingTime", values.startingTime);
      formData.append("endTime", values.endTime);
      formData.append("registrationClosing", values.registrationClosing);
      formData.append("file", values.file);
      if (editEvent) {
        try {
          await updateEvent(item.eventid, formData, token);
          toast.success("Event updated successfully");
          setTimeout(() => {
            fetchEvents();
            toast.dismiss();
            setLoading(false);
            resetPage();
            onClose();
          }, 1000);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Event Update Failed");
          setTimeout(() => {
            toast.dismiss();
            setLoading(false);
          }, 1000);
        }
      } else {
        try {
          await createAdminEvent(formData, token);
          toast.success("Event created successfully");
          setTimeout(() => {
            fetchEvents();
            toast.dismiss();
            setLoading(false);
            resetPage();
            onClose();
          }, 1000);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Event Creating Failed");
          setTimeout(() => {
            toast.dismiss();
            setLoading(false);
          }, 1000);
        }
      }
    },
  });

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("file", file);
    console.log(formik.file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCountries] = await Promise.all([fetchCountries()]);
        setCountryList(fetchedCountries);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Toaster position="top-center" />
      {loading && <ClipLoading />}
      <div className="relative h-5/6 flex flex-col bg-background sm:px-12 p-6 pt-16 rounded-lg w-80 sm:w-8/12 md:w-5/12 overflow-y-auto">
        <div className="absolute top-0 left-0 w-full flex justify-center items-center p-4 bg-custom_white z-10">
          <p className="text-custom_black text-xl sm:text-4xl font-bold">
            {editEvent ? "Update Event" : "Create New Event"}
          </p>
          <div
            className="text-custom_orange cursor-pointer absolute right-6"
            onClick={onClose}
          >
            <RxCross2 className="text-custom_red" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full sm:pt-10">
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="gamename"
              className="text-black text-lg font-semibold"
            >
              Game Name
            </label>
            <input
              type="text"
              name="gamename"
              placeholder="Enter game name"
              id="gamename"
              value={formik.values.gamename}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.gamename
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.gamename && formik.errors.gamename && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.gamename}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="country"
              className="text-black text-lg font-semibold"
            >
              Country
            </label>
            <select
              name="country"
              className={`w-full p-2 bg-primary_text text-black border border-gray-700 rounded-md 
                ${
                  formik.errors.country
                    ? "border-custom_red"
                    : "border-name_background"
                }`}
              value={formik.values.country}
              onChange={formik.handleChange}
            >
              <option value="" hidden>
                Select Country
              </option>
              {countryList.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
            {formik.touched.country && formik.errors.country && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.country}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="organizer"
              className="text-black text-lg font-semibold"
            >
              Organizer
            </label>
            <input
              type="text"
              name="organizer"
              placeholder="Enter organizer"
              id="organizer"
              value={formik.values.organizer}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.organizer
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.organizer && formik.errors.organizer && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.organizer}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="location"
              className="text-black text-lg font-semibold"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              id="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.location
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.location && formik.errors.location && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.location}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="startingDate"
              className="text-black text-lg font-semibold"
            >
              Starting Date
            </label>
            <input
              type="date"
              name="startingDate"
              placeholder="Enter startingDate"
              id="startingDate"
              value={formik.values.startingDate}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.startingDate
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.startingDate && formik.errors.startingDate && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.startingDate}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="endDate"
              className="text-black text-lg font-semibold"
            >
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              placeholder="Enter startingDate"
              id="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.endDate
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.endDate}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="startingTime"
              className="text-black text-lg font-semibold"
            >
              Starting Time
            </label>
            <input
              type="time"
              name="startingTime"
              placeholder="Enter startingDate"
              id="startingTime"
              value={formik.values.startingTime}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.startingTime
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.startingTime && formik.errors.startingTime && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.startingTime}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="endTime"
              className="text-black text-lg font-semibold"
            >
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              placeholder="Enter startingDate"
              id="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.endTime
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.endTime && formik.errors.endTime && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.endTime}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="registrationClosing"
              className="text-black text-lg font-semibold"
            >
              Registration Closing Date
            </label>
            <input
              type="date"
              name="registrationClosing"
              placeholder="Enter startingDate"
              id="registrationClosing"
              value={formik.values.registrationClosing}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.registrationClosing
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.registrationClosing &&
              formik.errors.registrationClosing && (
                <p className="pt-1 text-custom_red text-sm">
                  {formik.errors.registrationClosing}
                </p>
              )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label htmlFor="file" className="text-black text-lg font-semibold">
              Banner
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleBannerChange}
              className={`w-full border text-black ${
                formik.errors.file
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.file && formik.errors.file && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.file}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 text-xl font-semibold items-center justify-center border-2 border-name_background text-primary_text rounded-md bg-name_background hover:bg-country_background hover:shadow-[0_0_10px_5px_rgba(0,0,30,0.4)]"
          >
            {editEvent ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
