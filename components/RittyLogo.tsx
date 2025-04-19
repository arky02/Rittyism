import Image from "next/image";

const RittyLogo = ({
  isHero = false,
  isSmall = false,
  rittyismVersion = "v1",
}: {
  isHero?: boolean;
  isSmall?: boolean;
  rittyismVersion?: "v1" | "v2";
}) => {
  return (
    <div className={`relative w-fit`}>
      <Image
        src={
          isHero
            ? `/images/${rittyismVersion}/rittyism-hero-logo.svg`
            : `/images/${rittyismVersion}/rittyism-logo.svg`
        }
        height={isSmall ? (isHero ? 60 : 45) : 110}
        width={isSmall ? (isHero ? 210 : 220) : 370}
        alt="rittyism"
        className=""
      />
      {isHero && rittyismVersion === "v1" && (
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
