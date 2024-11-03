import React, { useEffect, useState } from "react";
import {
  getUserDetails,
  updateUserDetails,
  fetchAllGames,
  getFavGames,
  updateFavGames,
} from "../../helper/helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import ManageRegiterdEvents from "../ManageRegiterdEvents/ManageRegiterdEvents";
import ClipLoading from "../ClipLoading/ClipLoading";

const personalInformationInitialValues = {
  email: "",
  nickname: "",
};

export default function UserDashboard() {
  const [gameList, setGameList] = useState([]);
  const [personalInfoloading, setPersonalInfoLoading] = useState(false);
  const [favGameLoading, setFavGamesLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [fetchedDetails, fetchedGames, fetchedFavGames] =
          await Promise.all([getUserDetails(), fetchAllGames(), getFavGames()]);
        const userDetails = {
          email: fetchedDetails.data.email,
          nickname: fetchedDetails.data.nickname,
        };
        personalInformationFormik.setValues(userDetails);
        setGameList(fetchedGames.data);

        const gameNames = fetchedFavGames.data.map((game) => game.game);
        gameListFormik.setFieldValue("game_names", gameNames);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const personalInformationFormik = useFormik({
    initialValues: personalInformationInitialValues,
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email address")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Please enter a valid email address"
        )
        .required("Email is required"),
      nickname: Yup.string().required("Nickname is required"),
    }),
    onSubmit: async (values) => {
      setPersonalInfoLoading(true);
      try {
        await updateUserDetails(values);
        toast.success("Update Successful");
        setTimeout(() => {
          toast.dismiss();
          setPersonalInfoLoading(false);
          personalInformationFormik.setTouched({});
        }, 2000);
      } catch (error) {
        toast.error("Update Unsuccessful");
        setTimeout(() => {
          toast.dismiss();
          setPersonalInfoLoading(false);
        }, 2000);
      }
    },
  });

  const gameListFormik = useFormik({
    initialValues: {
      game_names: [],
    },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: Yup.object({
      game_names: Yup.array().min(1, "At least one game must be selected"),
    }),
    onSubmit: async (values) => {
      setFavGamesLoading(true);
      try {
        await updateFavGames(values);
        toast.success("Update Successful");
        setTimeout(() => {
          toast.dismiss();
          setFavGamesLoading(false);
        }, 2000);
      } catch (error) {
        toast.error("Update Unsuccessful");
        setTimeout(() => {
          toast.dismiss();
          setFavGamesLoading(false);
        }, 2000);
      }
    },
  });

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      gameListFormik.setFieldValue("game_names", [
        ...gameListFormik.values.game_names,
        value,
      ]);
    } else {
      gameListFormik.setFieldValue(
        "game_names",
        gameListFormik.values.game_names.filter((name) => name !== value)
      );
    }
  };

  return (
    <div className="flex w-screen h-fit justify-center items-center">
      <Toaster position="top-center" />
      <div className="flex flex-col my-5 w-full 2xl:w-7/12  h-fit bg-primary_bg p-20">
        <div>
          <div className="flex flex-row h-fit">
            <div className="w-1 bg-blue_text mr-2" />
            <p className="text-primary_text uppercase font-semibold text-2xl">
              Personal Information
            </p>
          </div>
          <form onSubmit={personalInformationFormik.handleSubmit}>
            <div className="pt-5 flex flex-row justify-stretch space-x-10">
              <div className="w-1/2 flex flex-col mb-5">
                <label htmlFor="email" className="mb-1 text-primary_text">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={personalInformationFormik.values.email}
                  className="w-full p-3 bg-gray-700 rounded-md text-primary_text"
                  onChange={personalInformationFormik.handleChange}
                />
                {personalInformationFormik.touched.email &&
                  personalInformationFormik.errors.email && (
                    <p className="text-custom_red text-sm mt-2">
                      {personalInformationFormik.errors.email}
                    </p>
                  )}
              </div>
              <div className="w-1/2 flex flex-col mb-5">
                <label htmlFor="nickname" className="mb-1 text-primary_text">
                  Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={personalInformationFormik.values.nickname}
                  onChange={personalInformationFormik.handleChange}
                  className="w-full p-3 bg-gray-700 rounded-md text-primary_text"
                />
                {personalInformationFormik.touched.nickname &&
                  personalInformationFormik.errors.nickname && (
                    <p className="text-custom_red text-sm mt-2">
                      {personalInformationFormik.errors.nickname}
                    </p>
                  )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="w-1/4 bg-blue-600 p-3 rounded-md hover:bg-blue-700 h-12 text-primary_text"
                type="submit"
                disabled={personalInfoloading}
              >
                {personalInfoloading ? (
                  <ClipLoading size={25} color={"#fff"} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="pt-20">
          <div className="flex flex-row h-fit">
            <div className="w-1 bg-blue_text mr-2" />
            <p className="text-primary_text uppercase font-semibold text-2xl">
              Registration Information
            </p>
          </div>
          <ManageRegiterdEvents />
        </div>
        <div className="pt-20">
          <div className="flex flex-row h-fit">
            <div className="w-1 bg-blue_text mr-2" />
            <p className="text-primary_text uppercase font-semibold text-2xl">
              Favourite Games
            </p>
          </div>
          <div
            className={`pt-5 ${gameList.length > 5 ? "grid grid-cols-2" : ""}`}
          >
            {gameList.map((game) => (
              <div key={game.gameId} className="checkbox-container flex mb-2">
                <input
                  type="checkbox"
                  id={`game-${game.gameId}`}
                  name="game_names"
                  value={game.gameName}
                  onChange={handleCheckboxChange}
                  className="custom-checkbox custom-checkbox-form"
                  checked={gameListFormik.values.game_names.includes(
                    game.gameName
                  )}
                />
                <label
                  htmlFor={`game-${game.gameId}`}
                  className="custom-label uppercase text-primary_text"
                >
                  {game.gameName}
                </label>
              </div>
            ))}
            {gameListFormik.touched.game_names &&
              gameListFormik.errors.game_names && (
                <p className="pt-1 text-custom_red text-sm">
                  {gameListFormik.errors.game_names}
                </p>
              )}
          </div>
          <div className="flex justify-end">
            <button
              className="w-1/4 bg-blue-600 p-3 rounded-md hover:bg-blue-700 h-12 text-primary_text"
              type="submit"
              onClick={gameListFormik.handleSubmit}
              disabled={favGameLoading}
            >
              {favGameLoading ? (
                <ClipLoading size={25} color={"#fff"} />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
