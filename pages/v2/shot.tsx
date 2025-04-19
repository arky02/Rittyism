import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import RittyLogo from "@/components/RittyLogo";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import SendPhotoPage from "./send-photo";
import toast from "react-hot-toast";
import NextImage from "next/image";

const 사진_촬영_준비_시간 = 8 as const;
const 사진_미리보기_시간 = 2 as const;
const 사진_1장_촬영_시간 = 사진_촬영_준비_시간 + 사진_미리보기_시간; //8

const ShotPage = () => {
  const camera = useRef(null);
  const router = useRouter();
  const canvasRef = useRef(null);
  const shotAudioRef = useRef<HTMLAudioElement | null>(null);

  const { frame } = router.query;

  const [takenPictures, setTakenPictures] = useState<string[]>([]);
  const [frameImg, SetFrameImg] = useState<string>("");
  const [isBrowser, setIsBrowser] = useState(false);
  const [shotWaitingTime, setShotWaitingTime] = useState<number>(
    사진_1장_촬영_시간 - 1
  );
  const [currPhotoNum, setCurrPhotoNum] = useState<number>(1);
  const [currStep, setCurrStep] = useState<
    "shotRittyism" | "showResult" | "sendPhoto"
  >("shotRittyism");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const shotIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const shotPhoto = () => {
    if (takenPictures.length >= 4) return;

    // 사진 촬영 소리 재생
    if (shotAudioRef.current) {
      shotAudioRef.current.currentTime = 0;
      shotAudioRef.current.play();
    }

    // @ts-expect-error "takePhoto" is not defined
    const photo = camera?.current.takePhoto();
    setTakenPictures((prev) => [...prev, photo]);
  };

  const handleMergeAndSavePhoto = async (files: string[]) => {
    if (phoneNumber.length !== 13) {
      toast.error("휴대전화 번호를 형식에 맞게 입력해주세요");
      return;
    }

    if (!files || files.length === 0) return;

    const canvas = canvasRef.current! as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const takenPictureBlobs = takenPictures.map(
      async (base64Img) =>
        await fetch(new URL(base64Img as string)).then((res) => res.blob())
    );

    // 이미지 로드
    const images = (await Promise.all(
      Array.from(takenPictureBlobs).map(async (blobImg) => {
        const img = new Image();
        img.src = URL.createObjectURL(await blobImg);
        return new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
        });
      })
    )) as HTMLImageElement[];

    const 프레임_가로_여백 = 55;
    const 프레임_위쪽_여백 = 80;
    const 프레임_아래쪽_여백 = 130;
    const 사진_사이_gap = 22;
    const 리티네컷_프레임_가로 =
      Math.max(...images.map((img) => img.width)) + 프레임_가로_여백 * 2;
    const 리티네컷_프레임_세로 =
      images.reduce((sum, img) => sum + img.height, 0) +
      프레임_위쪽_여백 +
      프레임_아래쪽_여백;

    // 캔버스 크기 설정 (가장 큰 이미지 크기를 기준으로 설정)
    const canvasWidth = 리티네컷_프레임_가로 * 2;
    const canvasHeight = 리티네컷_프레임_세로;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 이미지를 순서대로 캔버스에 렌더링
    Array.from([프레임_가로_여백, 리티네컷_프레임_가로 + 프레임_가로_여백]).map(
      (네컷사진_시작_x축_위치) => {
        let yOffset = 프레임_위쪽_여백;
        images.forEach((img) => {
          ctx?.save();
          ctx?.scale(-1, 1); // 좌우 반전
          ctx?.drawImage(
            img,
            -네컷사진_시작_x축_위치 - img.width, // 반전된 이미지를 그리기 위해 x 위치 조정
            yOffset,
            img.width,
            img.height
          );
          ctx?.restore();
          yOffset += img.height + 사진_사이_gap; // 다음 이미지 위치
        });
      }
    );

    // 프레임 이미지 로드 및 캔버스에 렌더링
    const frameImage = new Image();
    frameImage.src = frameImg;
    frameImage.onload = () => {
      // 프레임을 캔버스 위에 그리기
      Array.from([0, 리티네컷_프레임_가로]).map((프레임_시작_x축_위치) =>
        ctx?.drawImage(
          frameImage,
          프레임_시작_x축_위치,
          0,
          리티네컷_프레임_가로,
          리티네컷_프레임_세로
        )
      );

      // 최종 캔버스를 이미지 파일로 저장
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `rittyism_${phoneNumber}.png`);
        } else {
          toast.error("사진 저장에 실패했습니다. 다시 시도해주세요.");
        }
      });
    };

    toast.success(
      "사진이 성공적으로 전송되었어요! \n 5초 후 메인 페이지로 이동합니다 😻🚀"
    );
    setTimeout(() => {
      window.location.href = "/v2";
    }, 5000);
  };

  useEffect(() => {
    if (takenPictures.length >= 4) return;
    // 사진 찍기
    if (shotWaitingTime === 0 && takenPictures.length < 4) {
      shotPhoto();
      return;
    }
    // 현재 찍고있는 사진 번호
    if (shotWaitingTime === 사진_촬영_준비_시간 && takenPictures.length < 4) {
      setCurrPhotoNum(takenPictures.length + 1);
    }
  }, [shotWaitingTime]);

  useEffect(() => {
    // 첫 사진 촬영 => 처음 인터벌 설정
    if (takenPictures.length === 0)
      shotIntervalRef.current = setInterval(() => {
        setShotWaitingTime((prev) => prev - 1);
      }, 1000);

    if (takenPictures.length === 4) {
      setShotWaitingTime(사진_1장_촬영_시간);
      setTimeout(() => {
        setCurrStep("showResult");
        setShotWaitingTime(0);
      }, 사진_미리보기_시간 * 1000);
      if (shotIntervalRef.current) clearInterval(shotIntervalRef.current); // 기존 인터벌 정리
      return;
    }

    if (takenPictures.length !== 0) {
      if (shotIntervalRef.current) clearInterval(shotIntervalRef.current); // 기존 인터벌 정리
      setShotWaitingTime(사진_1장_촬영_시간); // 대기시간 초기화
      shotIntervalRef.current = setInterval(() => {
        setShotWaitingTime((prev) => prev - 0.5);
      }, 500);
    }
    return () => {
      if (shotIntervalRef.current) clearInterval(shotIntervalRef.current); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, [takenPictures]);

  useEffect(() => {
    const frameImgPath = `/images/v2/rittyism-frame/${frame}.png`;
    SetFrameImg(frameImgPath);
  }, [frame]);

  console.log(shotWaitingTime);

  const RittyismResultLayout = () => {
    return (
      <div className="flex items-center justify-around w-full">
        <div className="text-[36px] text-white font-bold">
          집사님 😻
          <br /> 사진이 준비됐어요!
        </div>
        <div className="flex flex-col gap-[4px] relative pt-[28px]">
          {frameImg && (
            <>
              {takenPictures.map((el, idx) => (
                <div
                  className="relative flex justify-center w-[260px] px-[20px] h-[180px] overflow-hidden"
                  key={idx}
                >
                  <NextImage
                    className="w-[220px] h-[180px] -scale-x-100"
                    src={el}
                    width={220}
                    height={180}
                    alt="rittyism photo"
                  />
                </div>
              ))}
              <NextImage
                src={frameImg}
                alt="rittyism frame"
                width={260}
                height={770}
                className="absolute w-[260px] min-w-[260px] h-[780px] top-0"
              />
            </>
          )}
        </div>
        <button
          className="bg-[#f9f9f957] border-[3px] border-[#f9f9f94d] text-[30px] font-bold rounded-[35px] px-[30px] py-[20px] text-white"
          onClick={() => setCurrStep("sendPhoto")}
        >
          확인했어요!
        </button>
      </div>
    );
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center flex-col">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <audio ref={shotAudioRef} src="/audio/shot.mp3" preload="auto" />
      {currStep === "shotRittyism" ? (
        <>
          <RittyLogo isSmall rittyismVersion="v2" />
          <div className="h-[740px] mt-[20px] relative text-[40px] text-white font-bold">
            {shotWaitingTime <= 사진_1장_촬영_시간 - 사진_미리보기_시간 && (
              <div className="absolute rounded-full bg-[#FD4D4C] top-1/2 left-[65px] text-[36px] w-[68px] h-[68px] text-[#ffffff] font-bold flex items-center justify-center shadow-md">
                {shotWaitingTime.toFixed(0)}
              </div>
            )}
            <NextImage
              src="/images/camera-background.svg"
              alt="camera background"
              height={745}
              width={1274}
              className="w-[1280px] h-[745px]"
            />
            <span className="absolute top-[350px] left-[480px]">
              리티이즘 로딩중 ... 🚀😻
            </span>
            <div className="absolute top-1/2 right-[60px] flex flex-col text-[#ffffff] items-center -mt-[40px]">
              <span className="text-[18px] font-medium">남은 횟수</span>
              <p className="text-[40px] font-bold">
                {4 - takenPictures.length}
                <span>/</span>4
              </p>
              <button
                className="rounded-[18px] border-[2px] border-[#f9f9f9a1] w-[90px] h-[50px] font-bold text-[18px] bg-[#f9f9f938] text-white mt-[40px]"
                onClick={shotPhoto}
                disabled={
                  shotWaitingTime > 사진_1장_촬영_시간 - 사진_미리보기_시간
                }
              >
                바로 찍기
              </button>
            </div>
            <div className="w-[900px] h-[740px] absolute top-[3px] left-[190px]">
              {shotWaitingTime === 사진_1장_촬영_시간 && (
                <div className="absolute z-20 w-[900px] h-[740px] bg-[#ffffff47]" />
              )}
              {takenPictures.length > 0 &&
                shotWaitingTime > 사진_1장_촬영_시간 - 사진_미리보기_시간 && (
                  // 마지막 찍은 사진 미리보기
                  <NextImage
                    className="absolute -scale-x-100 z-10 w-[900px] h-[740px] border-1px] border-[#ffffff] rounded-[10px]"
                    src={takenPictures[takenPictures.length - 1]}
                    width={900}
                    height={740}
                    alt="rittyism preview photo"
                  />
                )}
              {((frame === "black" && currPhotoNum === 3) ||
                (frame === "purple" && currPhotoNum === 2) ||
                (frame === "purple" && currPhotoNum === 4)) && (
                <NextImage
                  className="absolute z-10 w-[900px] h-[740px]"
                  src={`/images/v2/rittyism-overlay-rittyImg/${frame}/step-${currPhotoNum}.png`}
                  width={900}
                  height={740}
                  alt="ritty overlay image"
                />
              )}
              {isBrowser ? (
                <Camera
                  ref={camera}
                  errorMessages={{
                    noCameraAccessible: undefined,
                    permissionDenied: undefined,
                    switchCamera: undefined,
                    canvas: undefined,
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : currStep === "showResult" ? (
        <RittyismResultLayout />
      ) : (
        <SendPhotoPage
          onPhotoSendClick={() => handleMergeAndSavePhoto(takenPictures)}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
        />
      )}
    </div>
  );
};
export default ShotPage;
