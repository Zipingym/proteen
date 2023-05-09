import { useCallback, useEffect, useState } from 'react';

const useRecord = () => {
  const [stream, setStream] = useState(new MediaStream());
  const setStreamVal = (stream: MediaStream) => {
    setStream(stream);
  };
  const [recorder, setRecorder] = useState(
    new MediaRecorder(stream, {
      mimeType: 'video/webm',
    })
  );
  const [result, setResult] = useState(new Array());
  useEffect(() => {
    setResult(new Array());
    setRecorder(
      new MediaRecorder(stream, {
        mimeType: 'video/webm',
      })
    );
    console.log(stream);
  }, [stream]);
  useEffect(() => {
    recorder.ondataavailable = (event) => {
      result.push(event.data);
    };
  }, [recorder]);

  const start = useCallback(() => {
    recorder.start();
  }, [recorder]);
  const stop = useCallback(() => {
    recorder.stop();
    const blob = new Blob(result, {
      type: 'video/mp4',
    });
    setResult(new Array());
    return window.URL.createObjectURL(blob);
  }, [recorder]);

  return [start, stop, setStreamVal];
};

export default useRecord;
