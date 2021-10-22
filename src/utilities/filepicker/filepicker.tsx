import React from 'react';

import { useFilePicker } from 'use-file-picker';

function filePicker() {
  const [openFileSelector, { filesContent, loading, errors, plainFiles }] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFilePicker({
      multiple: true,
      readAs: 'DataURL',
      accept: ['.json', '.pdf'],
      limitFilesConfig: { min: 2, max: 3 },
    });

  if (errors.length) {
    return (
      <div>
        <button onClick={() => openFileSelector()}>
          Something went wrong, retry!{' '}
        </button>
        {errors[0].fileSizeTooSmall && 'File size is too small!'}
        {errors[0].fileSizeToolarge && 'File size is too large!'}
        {errors[0].readerError && 'Problem occured while reading file!'}
        {errors[0].maxLimitExceeded && 'Too many files'}
        {errors[0].minLimitNotReached && 'Not enought files'}
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => openFileSelector()}>Choose File</button>
      <br />

      <br />
      {plainFiles.map((file) => (
        <div key={file.name}>{file.name}</div>
      ))}
    </div>
  );
}
export default filePicker;
