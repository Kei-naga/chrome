chrome.runtime.onInstalled.addListener(() => {
  const parent = chrome.contextMenus.create({
      title: 'Anki',
      type: "normal",
      contexts: ["selection"],
       onclick: (info, tab)=>{
         // open popup.html alog with param as popup window
         const text = info.selectionText;
         const url = 'https://eow.alc.co.jp/search?q=' + text;
         window.open(url, "window", "width=600,height=400,status=yes,scrollbars=yes,resizable=yes");
      }
    })
};
