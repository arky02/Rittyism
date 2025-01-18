import RittyismHeroLogo from "/public/images/rittyism-hero-logo.svg";
import Image from "next/image";
import RittyMainLogo from "/public/images/rittyism-logo.svg";

const RittyLogo = ({
  isHero = false,
  isSmall = false,
}: {
  isHero?: boolean;
  isSmall?: boolean;
}) => {
  return (
    <div className={`relative w-fit`}>
      <Image
        src={isHero ? RittyismHeroLogo : RittyMainLogo}
        height={isSmall ? (isHero ? 60 : 45) : 110}
        alt="rittyism"
        className=""
      />
      {isHero && (
        <span
          className={`absolute ${
            isSmall
              ? "-bottom-1 -right-[1px] text-[15px]"
              : "-bottom-2 -right-1 text-[28px]"
          }
      `}
        >
          📸
        </span>
      )}
    </div>
  );
};

export default RittyLogo;
