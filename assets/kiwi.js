// console.log("ST TEST")
let kiwiClone = null;
function cloneAndAddChartLink() {
  if(document.querySelector('variant-swatch-king').querySelector('#cloned-chart-modal-link')){
    console.log("already added")
    return
  }
  // Select the original chart modal link
  const originalChartModalLink = document.querySelector('.ks-chart-modal-link');
  if (!originalChartModalLink) {
    // console.error("Original chart modal link not found");
    return;
  }

  // Clone the original element
  const clonedChartModalLink = originalChartModalLink.cloneNode(true);
  clonedChartModalLink.id = 'cloned-chart-modal-link'; // Add a unique ID for the cloned element
  clonedChartModalLink.style.marginLeft='5px'
  // Add a click event listener to the cloned element
  clonedChartModalLink.addEventListener('click', () => {
    // console.log("Cloned element clicked. Triggering original element...");
    originalChartModalLink.click(); // Simulate a click on the original element
  });

  // Insert the cloned element after the input with name="Size"
  const tallaInputElement = document.querySelector('input[name="Size"]');
  if (tallaInputElement) {
    const parentElement = tallaInputElement.parentElement;
    if (parentElement) {
      parentElement.appendChild(clonedChartModalLink);
      // console.log("Cloned chart modal link added after Size input");
    } else {
      // console.error("Parent element for Size input not found");
    }
  } else {
    // console.error("Size input element not found");
  }
}

function debounceImmediate(func, delay) {
let timeout;
let called = false;

return function(...args) {
  // If not recently called, call the function right away
  if (!called) {
    func.apply(this, args);  // Immediate call
    called = true;
  }
  // Clear any existing timeout
  clearTimeout(timeout);
  // Set up a new timeout to call the function at the end of the debounce period
  timeout = setTimeout(() => {
    func.apply(this, args);  // Call at the end of the debounce period
    called = false; // Reset the immediate flag
  }, delay);
};
}

// // Define the debounced console log with immediate and end-of-debounce execution
const debouncedLog = debounceImmediate(() => {
// // console.log("change detected");
// addChartLink();
cloneAndAddChartLink()
}, 300);

function newAddVariantMutation() {
const targetNode = document.querySelector('variant-swatch-king');
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    debouncedLog();
  });
});
const config = {
  attributes: true, 
  childList: false,
  subtree: true, 
  attributeFilter: ['class', 'style'] 
};
observer.observe(targetNode, config);
}


var productBlocks = document.querySelector(".product-info");
var intervalIdKiwi = setInterval(function () {
  const fetchSwatchKing = document.querySelector('variant-swatch-king')
  // console.log('fetchSwatchKing',fetchSwatchKing)
  if(fetchSwatchKing){
    const fetchKiwiSizingChart = document.querySelector('.ks-chart-container.sizing-chart-container.ks-container-with-modal');
  // console.log('fetchKiwiSizingChart',fetchKiwiSizingChart)

  if(fetchKiwiSizingChart && fetchSwatchKing.querySelector('[option-name="Size"]')){
    document.querySelector('.ks-chart-container.sizing-chart-container.ks-container-with-modal').style.display='none'
    newAddVariantMutation();
    // addChartLink()
cloneAndAddChartLink()
    
    clearInterval(intervalIdKiwi);
  }
}
}, 500);