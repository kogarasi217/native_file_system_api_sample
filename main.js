const canUseAPI = window.chooseFileSystemEntries !== undefined;
console.log(canUseAPI ? 'Native File System is available' : 'Native File System is NOT available');

let handle;
let isAutoSave = false;


// 開く処理
const openFile = async () => {
  try {
    handle = await window.chooseFileSystemEntries({
      accepts: [{
        description: 'Text file',
        mimeTypes: ['text/plain'],
        extensions: ['txt'],
      }]
    });
    const file = await handle.getFile();
    const textarea = document.querySelector('#txt');
    textarea.value = await file.text();
  } catch (err) {
    console.error(err.name, err.message);
  }
}

// 保存処理
const saveFile = async () => {
  try {
    if (!handle) return;
    const writer = await handle.createWritable();
    const textarea = document.querySelector('#txt');
    await writer.write(textarea.value.toString());
    await writer.close();
    console.log('saving is success.');
  } catch (err) {
    console.error(err.name, err.message);
  }
}

// 自動保存ON/OFF
const onChangeAutoSave = (_) => {
  const cb = document.getElementById('auto-save');
  isAutoSave = cb.checked;
}

// テキストエリアの変更感知
const onChangeTextArea = (_) => {
  if (isAutoSave) saveFile();
}
