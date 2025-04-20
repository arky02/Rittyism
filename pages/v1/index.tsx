import React, { useState } from "react";

import Button from "@/components/Button";
import RittyLogo from "@/components/RittyLogo";
import { useRouter } from "next/router";
import YellowRitty from "/public/images/v1/ritty/yellow.svg";
import GrayRitty from "/public/images/v1/ritty/gray.svg";
import WhiteRitty from "/public/images/v1/ritty/white.svg";
import BlackRitty from "/public/images/v1/ritty/black.svg";
import Image from "next/image";

const IndexPage = () => {
  const router = useRouter();
  const [selectedRitty, setSelectedRitty] = useState<
    "gray" | "yellow" | "white" | "black" | null
  >(null);

  const RittyTypeSelect = ({
    rittyType,
    rittyImg,
  }: {
    rittyType: "gray" | "yellow" | "white" | "black";
    rittyImg: string;
  }) => {
    return (
      <button
        title="rittyType"
        className={`flex justify-center items-center rounded-[24px] bg-[#f9f9f9] w-[192px] h-[192px] ${
          selectedRitty === rittyType
            ? "border-[3px] border-[#6B65FF] bg-[#eeedf9]"
            : ""
        }`}
        onClick={() => setSelectedRitty(rittyType)}
      >
        <Image src={rittyImg} alt="ritty"></Image>
      </button>
    );
  };

  return (
    <main className="flex justify-center items-center h-full w-full flex-col gap-[65px]">
      <RittyLogo isHero />
      {/* 흰색 Content Section */}
      <div className="color-white w-[880px] h-fit bg-[#ffffff] rounded-[44px] border-[3px] border-[#AEABF9] p-[32px] flex flex-col justify-center pt-[60px] items-center">
        <div className="text-center">
          <h2 className="font-bold text-[26px]">
            당신의 고양이는 어떤 고양이인가요?
          </h2>
          <p className="text-[#2c2d3883]">
            조금 전에 찾았던 당신의 고양이를 선택해주세요.
          </p>
        </div>
        <div className="flex gap-4 mt-[45px] mb-[26px]">
          <RittyTypeSelect rittyType={"gray"} rittyImg={GrayRitty} />
          <RittyTypeSelect rittyType={"yellow"} rittyImg={YellowRitty} />
          <RittyTypeSelect rittyType={"white"} rittyImg={WhiteRitty} />
          <RittyTypeSelect rittyType={"black"} rittyImg={BlackRitty} />
        </div>
        <Button
          text="이 고양이가 맞아요!"
          onClick={() => router.push("/v1/frame?ritty=" + selectedRitty)}
          disabled={selectedRitty === null}
        ></Button>
      </div>
    </main>
  );
};

export default IndexPage;
