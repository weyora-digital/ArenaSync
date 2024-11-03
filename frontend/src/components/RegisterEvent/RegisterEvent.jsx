import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/images/logo.png";
import * as Yup from "yup";
import {
  fetchCountries,
  registerTournament,
  updateRegisteredEvent,
} from "../../helper/helper";

export default function RegisterEvent({ onClose, eventid, fetchData, item }) {
  const [countryList, setCountryList] = useState([]);

  const initialValues =
    item == null
      ? {
          event_id: eventid,
          country: "",
          phone_number: "",
          date_of_birth: "",
          gender: "",
          university_id: "",
          batch_id: "",
        }
      : {
          event_id: item.event_id || eventid,
          country: item.country || "",
          phone_number: item.phone_number || "",
          date_of_birth: formatDate(item.date_of_birth) || "",
          gender: item.gender || "",
          university_id: item.university_id || "",
          batch_id: item.batch_id || "",
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      phone_number: Yup.string().required("Phone Number is required"),
      date_of_birth: Yup.string().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
      university_id: Yup.string()
        .matches(
          /^[0-9]{2}UG[0-9]{4}$/,
          "University ID must be in the format XXUGXXXX"
        )
        .required("University ID is required"),
      batch_id: Yup.string()
        .required("Batch Id is required")
        .test(
          "matches-university_id",
          "Batch Id didn't match",
          function (batch_id) {
            const { university_id } = this.parent;
            if (!university_id) return true;
            const universityIdPrefix = university_id.slice(0, 2);
            return batch_id === universityIdPrefix;
          }
        ),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (item == null) {
        try {
          await registerTournament(values);
          toast.success("Registered successfully");
          fetchData();
          setTimeout(() => {
            toast.dismiss();
            onClose();
          }, 1000);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Registration Failed");
          setTimeout(() => {
            toast.dismiss();
          }, 1000);
        }
      } else {
        try {
          await updateRegisteredEvent(values, item.registration_id);
          toast.success("Update successfully");
          fetchData();
          setTimeout(() => {
            toast.dismiss();
            onClose();
          }, 1000);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Update Failed");
          setTimeout(() => {
            toast.dismiss();
          }, 1000);
        }
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Toaster position="top-center" />

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-primary_text w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary_text"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex justify-center mb-6">
          <img src={logo} alt="ArenaSync Esports Logo" className="w-16" />
        </div>
        <h2 className="text-2xl text-center mb-6">Register to Tournament</h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="country"
              className="text-primary_text text-lg font-medium"
            >
              Country
            </label>
            <select
              name="country"
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300  
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
          <div>
            <label
              htmlFor="phone_number"
              className="text-primary_text text-lg font-medium"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              id="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300 ${
                formik.errors.phone_number
                  ? "border-custom_red"
                  : "border-name_background"
              } rounded pl-3`}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.phone_number}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="date_of_birth"
              className="text-primary_text text-lg font-medium"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              placeholder="Date of Birth"
              id="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300 ${
                formik.errors.phone_number
                  ? "border-custom_red"
                  : "border-name_background"
              } rounded pl-3`}
            />
            {formik.touched.phone_number && formik.errors.date_of_birth && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.date_of_birth}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-primary_text text-lg font-medium"
            >
              Gender
            </label>
            <select
              name="gender"
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300  
                ${
                  formik.errors.gender
                    ? "border-custom_red"
                    : "border-name_background"
                }`}
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="" hidden>
                Gender
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.gender}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="university_id"
              className="text-primary_text text-lg font-medium"
            >
              University Id
            </label>
            <input
              type="text"
              name="university_id"
              placeholder="University Id"
              id="university_id"
              value={formik.values.university_id}
              onChange={formik.handleChange}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300 ${
                formik.errors.university_id
                  ? "border-custom_red"
                  : "border-name_background"
              } rounded pl-3`}
            />
            {formik.touched.university_id && formik.errors.university_id && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.university_id}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="batch_id"
              className="text-primary_text text-lg font-medium"
            >
              Batch Id
            </label>
            <input
              type="text"
              name="batch_id"
              placeholder="Batch Id"
              id="batch_id"
              value={formik.values.batch_id}
              onChange={formik.handleChange}
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300 ${
                formik.errors.batch_id
                  ? "border-custom_red"
                  : "border-name_background"
              } rounded pl-3`}
            />
            {formik.touched.batch_id && formik.errors.batch_id && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.batch_id}
              </p>
            )}
          </div>
          <button
            className="w-full bg-blue-600 p-3 rounded-md hover:bg-blue-700"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
