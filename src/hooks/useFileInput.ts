import { useCallback, useState } from 'react';

const useFileInput: (accept: string) => [() => void, File | null] = (
  accept
) => {
  const [file, setFile] = useState<null | File>(null);
  const click = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;

    input.onchange = (e) => {
      //@ts-expect-error
      setFile(e.target!.files[0]);
    };
    input.click();
  }, []);
  return [click, file];
};

export default useFileInput;
