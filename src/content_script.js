(() => {
  const addToAnki = (midashiElement: HTMLElement, linkElement: HTMLElement) => {
    linkElement.innerText = "Adding..."

    const bodyElement = midashiElement.parentElement.querySelectorAll("div")[1].cloneNode(true) as HTMLElement
    bodyElement.querySelectorAll("span.kana").forEach(e => e.parentNode.removeChild(e))
    chrome.runtime.sendMessage({
      type: "addToAnki",
      front: midashiElement.innerText,
      back: bodyElement.innerHTML,
    }, (resp) => {
      linkElement.innerText = resp.message
    })
  }

  const domLoaded = () => {
    document.querySelectorAll("td.summaryL").forEach(e => {
      const tabl = document.createElement("td")
      tabl.className = 'summaryAnki'
      const node = document.createElement("div")
      node.className = 'h1keywords'
      const link = document.createElement("a")
      link.href = "#"
      link.innerText = "Add to Anki"
      link.onclick = (ev) => {
        ev.preventDefault()
        addToAnki(e as HTMLElement, link)
      }
      node.appendChild(link)
      tabl.appendChild(node)
      e.parentElement.insertBefore(tabl, e.nextSibling)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', domLoaded);
  } else {
    domLoaded();
  }
})()
