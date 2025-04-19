import Button from "@/components/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import RittyLogo from "@/components/RittyLogo";
import { useState } from "react";

const SelectFramePage = () => {
  const router = useRouter();

  const [selectedFrame, setSelectedFrame] = useState<
    "purple" | "black" | "pink" | "skyblue"
  >();

  return (
    <main className="flex flex-col justify-center items-center gap-[30px]">
      <RittyLogo isHero isSmall rittyismVersion="v2"></RittyLogo>
      {/* 흰색 Content Section */}
      <div className="w-[800px] color-white bg-[#ffffff] rounded-[44px] border-[3px] border-[#AEABF9] px-[50px] pt-[40px] pb-[30px] flex flex-col justify-center  items-center">
        <div className="text-center">
          <h2 className="font-bold text-[26px]">프레임을 선택해주세요!</h2>
          <p className="text-[#2c2d3883]">
            다양한 스타일 중 마음에 드는 프레임을 골라 리티와 특별한 추억을
            만들어보세요.
          </p>
        </div>
        <div className="flex gap-[40px] my-[30px] h-[400px] items-center">
          <div
            className={`h-fit w-fit border-[4px] ${
              selectedFrame === "purple"
                ? "border-[#6B65FF] rounded bg-[#6a65ff36]"
                : "border-white"
            }`}
          >
            <Image
              src={"/images/v2/rittyism-frame/purple.png"}
              className={`h-full`}
              onClick={() => setSelectedFrame("purple")}
              alt="frames"
              height={414}
              width={140}
            />
          </div>

          <div
            className={`h-fit w-fit border-[4px] ${
              selectedFrame === "black"
                ? "border-[#6B65FF] rounded bg-[#6a65ff36]"
                : "border-white"
            }`}
          >
            <Image
              src={"/images/v2/rittyism-frame/black.png"}
              className={`h-full`}
              onClick={() => setSelectedFrame("black")}
              alt="frames"
              height={414}
              width={140}
            />
          </div>

          <div
            className={`h-fit w-fit border-[4px]  ${
              selectedFrame === "pink"
                ? "border-[#6B65FF] rounded bg-[#6a65ff36]"
                : "border-white"
            }`}
          >
            <Image
              src={"/images/v2/rittyism-frame/pink.png"}
              className={`h-full`}
              onClick={() => setSelectedFrame("pink")}
              alt="frames"
              height={414}
              width={140}
            />
          </div>

          <div
            className={`h-fit w-fit border-[4px] ${
              selectedFrame === "skyblue"
                ? "border-[#6B65FF] rounded bg-[#6a65ff36]"
                : "border-white"
            }`}
          >
            <Image
              src={"/images/v2/rittyism-frame/skyblue.png"}
              className={`h-full`}
              onClick={() => setSelectedFrame("skyblue")}
              alt="frames"
              height={414}
              width={140}
            />
          </div>
        </div>

        <Button
          text="리티이즘 프레임을 선택해주세요"
          onClick={() => router.push("/v2/shot?frame=" + selectedFrame)}
        ></Button>
      </div>
    </main>
  );
};

export default SelectFramePage;
