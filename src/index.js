import transform from "./transform";

const transformNode = (node) => {
   node.nodeValue = transform(node.nodeValue)
};

const handleList = (list) => {
   list.forEach(node => {
   if (node.nodeType === Node.TEXT_NODE) {
      transformNode(node);
   }
   if (node.childNodes.length !== 0) {
      handleList(node.childNodes)
   }
   })
}

const callback = function(mutationsList, observer) {
   for (let mutation of mutationsList) {
   switch (mutation.type) {
      case "childList":
         handleList(mutation.addedNodes)
         break
      case "characterData":
         transformNode(mutation.target);
         break
   }
   }
   observer.takeRecords()
};

const config = {
   subtree: true,

   childList: true,
   characterData: true,
};

new MutationObserver(callback).observe(document, config);
