import { ClipLoader } from "react-spinners";
import Clock from "../Clock/Clock";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";

export default function AdminNavBar() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-screen">
      <div className="w-full h-[100px] bg-background_gray flex items-center justify-between fixed top-0 z-10 px-24">
        <div className="flex items-center">
          <img src={Logo} alt="" className="w-[100px] h-auto" />
        </div>
        <p className="text-xl text-primary_text">
          <Clock />
        </p>

        <button
          //   onClick={handleLogout}
          className="hover:border-custom_red text-custom_red bg-background_gray w-[105px] h-[48px] py-2 px-3 rounded-md hover:text-primary_text text-xl hover:bg-custom_red float-end flex items-center justify-center"
          to={""}
        >
          {loading ? (
            <ClipLoader
              className="mt-1 flex justify-items-center"
              size={20}
              color={"#fff"}
              loading={loading}
            />
          ) : (
            <span>Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}
