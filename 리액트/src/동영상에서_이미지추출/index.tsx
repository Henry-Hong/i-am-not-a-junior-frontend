import { useRef, useState } from "react";

export default function 동영상에서_이미지추출() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    /**
     * drawImage의 첫번째인자는 CanvasImageSource이며, 다음을 포함한다.
     * - HTMLImageElement
     * - HTMLCanvasElement
     * - HTMLVideoElement
     * - HTMLSvgElement
     * ...
     */
    ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const objectUrl = URL.createObjectURL(blob);
      setImageSrc(objectUrl);
    });
  };

  return (
    <>
      <video ref={videoRef} controls>
        <source type="" src="/sample_video.mp4"></source>
        Your browser does not support the video tag.
      </video>
      <button onClick={capture}>capture</button>
      <canvas ref={canvasRef}></canvas>

      <img src={imageSrc}></img>
    </>
  );
}
