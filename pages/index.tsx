import { useEffect } from "react";

const IndexPage = () => {
  useEffect(() => {
    window.location.href = "/v2";
  }, []);
  return (
    <main className="flex justify-center items-center h-full w-full flex-col gap-[65px]"></main>
  );
};

export default IndexPage;
