const arrayContainer = document.getElementById('array-container');
const generateRandomButton = document.getElementById('generateRandom');
const sortArrayButton = document.getElementById('sortArray');
const userArrayInput = document.getElementById('userArray');
const sortTypeSelect = document.getElementById('sortType');
const speedInput = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');

let array = [];
let delay = 500; // Default speed (in ms)

// Function to update the delay based on the slider value
function updateDelay() {
  delay = (21 - speedInput.value) * 50; // Adjusted for desired range
  speedValue.textContent = `${delay} ms`; // Show the calculated delay
}

// Function to generate a random array
function generateRandomArray(size = 20) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderArray();
}
// Event listener for sorting the user input or random array
sortArrayButton.addEventListener('click', async () => {
  const userInput = userArrayInput.value;
  
  if (userInput.trim() !== "") {
    // Parse the user input into an array of numbers
    array = userInput.split(',').map(Number);

    // Check for any invalid inputs
    if (array.some(isNaN)) {
      alert("Please enter a valid array of numbers separated by commas.");
      return;
    }
  }

  // Render the array (either user-provided or random) before sorting
  renderArray();
  
  // Update delay for the current sorting speed
  updateDelay();
  
  const sortType = sortTypeSelect.value;
  switch (sortType) {
    case 'bubble':
      await bubbleSort();
      break;
    case 'selection':
      await selectionSort();
      break;
    case 'insertion':
      await insertionSort();
      break;
    case 'quick':
      await quickSort();
      break;
    case 'merge':
      await mergeSort();
      break;
    case 'heap':
      await heapSort();
      break;
    default:
      break;
  }
});

// Function to render the array as bars
// Function to render the array as bars with numbers
function renderArray() {
  arrayContainer.innerHTML = ''; // Clear previous bars

  array.forEach(value => {
    const barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');

    // Create the bar
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`;

    // Create the label to show the value
    const barLabel = document.createElement('span');
    barLabel.classList.add('bar-label');
    barLabel.innerText = value;

    // Append the label and bar to the container
    barContainer.appendChild(bar);
    barContainer.appendChild(barLabel);

    // Add the container to the array container
    arrayContainer.appendChild(barContainer);
  });
}


// Swap function for animations
async function swap(i, j) {
  return new Promise(resolve => {
    setTimeout(() => {
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      renderArray();
      resolve();
    }, delay);
  });
}

// Bubble Sort visualization
async function bubbleSort() {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        await swap(j, j + 1);
      }
    }
    arrayContainer.children[n - i - 1].classList.add('sorted');
  }
}

// Selection Sort visualization
async function selectionSort() {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      await swap(i, minIndex);
    }
    arrayContainer.children[n - i - 1].classList.add('sorted');
  }
}

// Insertion Sort visualization
async function insertionSort() {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray();  // Update the visualized array
      await new Promise(resolve => setTimeout(resolve, delay)); // Pause for the visualization
    }
    
    array[j + 1] = key;
    renderArray(); // Update the array with the newly inserted element
    await new Promise(resolve => setTimeout(resolve, delay)); // Pause for visualization
  }

  for (let i = 0; i < n; i++) {
    arrayContainer.children[i].classList.add('sorted');
  }
}

// Quick Sort visualization
async function quickSort(arr = array, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = await partition(arr, left, right);
    await quickSort(arr, left, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, right);
  }
}

async function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;

  // Highlight pivot bar
  arrayContainer.children[right].classList.add('pivot');

  for (let j = left; j < right; j++) {
    arrayContainer.children[j].classList.add('selected'); // Highlight selected
    if (arr[j] < pivot) {
      i++;
      await swap(i, j);
    }
    arrayContainer.children[j].classList.remove('selected'); // Remove selected highlight
  }
  await swap(i + 1, right); // Move pivot to the correct position

  // Remove pivot highlight after placement
  arrayContainer.children[right].classList.remove('pivot');
  arrayContainer.children[i + 1].classList.add('sorted'); // Mark pivot as sorted
  return i + 1;
}


// Merge Sort visualization
// Merge Sort visualization
async function mergeSort(left = 0, right = array.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSort(left, mid);
  await mergeSort(mid + 1, right);
  await merge(left, mid, right);
}

// Merge function that operates on the global array
async function merge(left, mid, right) {
  const leftArray = array.slice(left, mid + 1);
  const rightArray = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArray.length && j < rightArray.length) {
    // Compare and merge
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
    
    // Visualize the current step
    renderArray();
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Handle the remaining elements in leftArray
  while (i < leftArray.length) {
    array[k] = leftArray[i];
    i++;
    k++;
    
    // Visualize the current step
    renderArray();
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Handle the remaining elements in rightArray
  while (j < rightArray.length) {
    array[k] = rightArray[j];
    j++;
    k++;
    
    // Visualize the current step
    renderArray();
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Mark the portion as sorted
  for (let x = left; x <= right; x++) {
    arrayContainer.children[x].classList.add('sorted');
  }
}


// Heap Sort visualization
async function heapSort() {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    await swap(0, i);
    await heapify(i, 0);
  }
  
  for (let i = 0; i < n; i++) {
    arrayContainer.children[i].classList.add('sorted');
  }
}

async function heapify(n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    await swap(i, largest);
    await heapify(n, largest);
  }
}

// Event listeners
generateRandomButton.addEventListener('click', () => {
  generateRandomArray();
});

sortArrayButton.addEventListener('click', async () => {
  updateDelay();
  const sortType = sortTypeSelect.value;
  switch (sortType) {
    case 'bubble':
      await bubbleSort();
      break;
    case 'selection':
      await selectionSort();
      break;
    case 'insertion':
      await insertionSort();
      break;
    case 'quick':
      await quickSort();
      break;
    case 'merge':
      await mergeSort();
      break;
    case 'heap':
      await heapSort();
      break;
    default:
      break;
  }
});

// Update speed display on slider change
speedInput.addEventListener('input', updateDelay);
