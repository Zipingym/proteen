import { useCallback, useEffect, useState } from 'react';

const useWebcam: () => [
  Array<MediaDeviceInfo>,
  (
    element: HTMLVideoElement,
    idx: number,
    option: MediaTrackConstraints
  ) => void
] = () => {
  const [webcamList, setWebcamList] = useState<Array<MediaDeviceInfo>>(
    new Array()
  );
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          setWebcamList(devices.filter(({ deviceId }) => deviceId != ''));
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    });
  }, []);

  const setWebcam = useCallback(
    (element: HTMLVideoElement, idx: number, option: MediaTrackConstraints) => {
      navigator.mediaDevices
        .getUserMedia({
          video: { ...option, deviceId: webcamList[idx].deviceId },
        })
        .then((stream) => {
          element.srcObject = stream;
          element.play();
        })
        .catch((error) => {
          alert("Can't use Webcam");
        });
    },
    [webcamList]
  );
  return [webcamList, setWebcam];
};

export default useWebcam;
