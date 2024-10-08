import React from "react";
import { ClipLoader } from "react-spinners";

function ClipLoading(props) {
  const { size, loading } = props;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-custom_black bg-opacity-20">
      <ClipLoader size={size} color={"#ea580c"} loading={loading} />
    </div>
  );
}

export default ClipLoading;
