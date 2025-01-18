import Button from "@/components/Button";
import { useRouter } from "next/router";
import BlueStarFrame from "/public/images/rittyism-frame/preview/blue-star.svg";
import BlackHeart from "/public/images/rittyism-frame/preview/black-heart.svg";
import LavenderBorder from "/public/images/rittyism-frame/preview/lavender-border.svg";
import WhiteStar from "/public/images/rittyism-frame/preview/white-star.svg";

import Image from "next/image";
import RittyLogo from "@/components/RittyLogo";
import { useState } from "react";

const SelectFramePage = () => {
  const router = useRouter();
  const { ritty } = router.query;

  const [selectedFrame, setSelectedFrame] = useState<
    "white-star" | "black-heart" | "lavender-border" | "blue-star"
  >();

  return (
    <main className="flex flex-col justify-center items-center gap-[45px]">
      <RittyLogo isHero isSmall></RittyLogo>
      {/* 흰색 Content Section */}
      <div className="color-white bg-[#ffffff] rounded-[44px] border-[3px] border-[#AEABF9] px-[50px] pt-[40px] pb-[30px] flex flex-col justify-center  items-center">
        <div className="text-center">
          <h2 className="font-bold text-[26px]">프레임을 선택해주세요!</h2>
          <p className="text-[#2c2d3883]">
            다양한 스타일 중 마음에 드는 프레임을 골라 리티와 특별한 추억을
            만들어보세요.
          </p>
        </div>
        <div className="flex gap-[40px] my-[30px] h-[400px] items-center">
          <Image
            src={WhiteStar}
            className={`h-full ${
              selectedFrame === "white-star"
                ? "w-[140px] border-[#6B65FF] border-[4px] rounded"
                : ""
            }`}
            onClick={() => setSelectedFrame("white-star")}
            alt="frames"
            height={400}
          />
          <Image
            src={BlackHeart}
            className={`h-full ${
              selectedFrame === "black-heart"
                ? "w-[139px] border-[#6B65FF] border-[4px] rounded"
                : ""
            }`}
            onClick={() => setSelectedFrame("black-heart")}
            alt="frames"
            height={400}
          ></Image>
          <Image
            src={LavenderBorder}
            className={`h-full ${
              selectedFrame === "lavender-border"
                ? "w-[140px] border-[#6B65FF] border-[4px] rounded"
                : ""
            }`}
            onClick={() => setSelectedFrame("lavender-border")}
            alt="frames"
            height={400}
          ></Image>
          <Image
            src={BlueStarFrame}
            className={`h-full ${
              selectedFrame === "blue-star"
                ? "w-[139px] border-[#6B65FF] border-[4px] rounded"
                : ""
            }`}
            onClick={() => setSelectedFrame("blue-star")}
            alt="frames"
            height={400}
          ></Image>
        </div>

        <Button
          text="리티이즘 프레임을 선택해주세요"
          onClick={() =>
            router.push("/shot?ritty=" + ritty + "&frame=" + selectedFrame)
          }
        ></Button>
      </div>
    </main>
  );
};

export default SelectFramePage;
