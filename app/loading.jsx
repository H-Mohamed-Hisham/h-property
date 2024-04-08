"use client";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = ({ loading }) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      size={150}
      cssOverride={override}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
