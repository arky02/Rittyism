import React, { useState } from "react";
import KeyboardInputSection from "/public/images/keyboard-input-section.svg";
import Image from "next/image";
import Button from "@/components/Button";
import RittyLogo from "@/components/RittyLogo";
import { Toaster } from "react-hot-toast";

interface SendPhotoPageProps {
  onPhotoSendClick: () => void;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
}

const SendPhotoPage = ({
  onPhotoSendClick,
  setPhoneNumber,
  phoneNumber,
}: SendPhotoPageProps) => {
  const [ruleAccepted, setRuleAccepted] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-[40px]">
      <RittyLogo isHero isSmall></RittyLogo>
      <div className="p-[32px] flex flex-col gap-[12px] rounded-[44px] bg-[#ffffff] justify-center items-center">
        <div className="flex flex-col gap-[12px] text-center mt-[15px]">
          <h3 className="font-bold text-[24px]">
            사진을 받을 휴대전화 번호를 입력해주세요!
          </h3>
          <h5 className="text-[#2c2d3883]">
            촬영한 리티이즘 사진은 문자메시지의 링크로
            <span className="text-[#3876F3]"> 당일 저녁까지</span> 전송돼요.
          </h5>
        </div>

        <div className="rounded-[32px] bg-[#f9f9f9] rounded-[32px] w-[376px] mb-[15px] mt-[30px] h-[95px]">
          <input
            className="w-full h-full p-[20px] rounded-[32px] bg-[#f9f9f9] text-[32px] font-bold text-center"
            type="text"
            placeholder="010 - 0000 - 0000"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex gap-[16px] items-center">
          <input
            title="ruleAccepted"
            type="checkbox"
            className="border-[#b1b1b1] rounded-[5px] w-[22px] h-[22px] border-[3px]"
            checked={ruleAccepted}
            onChange={(e) => setRuleAccepted(e.target.checked)}
          />
          <h5 className="text-[#62626e] font-semibold text-[18px]">
            삼냥이즈의{" "}
            <span className="text-[#6B65FF] underline">개인정보취급방침</span>에
            동의해요.
          </h5>
        </div>
        <Image
          src={KeyboardInputSection}
          alt="keyboard input section"
          className="mt-[40px] mb-[18px]"
        />
        <Button
          text="나의 휴대전화로 리티이즘 보내기!"
          disabled={!ruleAccepted || phoneNumber.length < 10}
          onClick={() => onPhotoSendClick()}
        />
        <Toaster />
      </div>
    </div>
  );
};
export default SendPhotoPage;
