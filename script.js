const arrayContainer = document.getElementById('array-container');
const generateRandomButton = document.getElementById('generateRandom');
const sortArrayButton = document.getElementById('sortArray');
const userArrayInput = document.getElementById('userArray');
const sortTypeSelect = document.getElementById('sortType');
const speedInput = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');

let array = [];
let delay = 500;

function updateDelay() {
  delay = (21 - speedInput.value) * 50;
  speedValue.textContent = `${delay} ms`;
}

function generateRandomArray(size = 20) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderArray();
}

generateRandomButton.addEventListener('click', () => {
  generateRandomArray();
});

sortArrayButton.addEventListener('click', async () => {
  const userInput = userArrayInput.value;
  
  if (userInput.trim() !== "") {
    array = userInput.split(',').map(Number);
    if (array.some(isNaN)) {
      alert("Please enter a valid array of numbers separated by commas.");
      return;
    }
  }

  renderArray();
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

function renderArray() {
  arrayContainer.innerHTML = '';
  array.forEach(value => {
    const barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`;
    const barLabel = document.createElement('span');
    barLabel.classList.add('bar-label');
    barLabel.innerText = value;
    barContainer.appendChild(bar);
    barContainer.appendChild(barLabel);
    arrayContainer.appendChild(barContainer);
  });
}

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

async function insertionSort() {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      renderArray();
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    array[j + 1] = key;
    renderArray();
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  for (let i = 0; i < n; i++) {
    arrayContainer.children[i].classList.add('sorted');
  }
}

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
  arrayContainer.children[right].classList.add('pivot');
  for (let j = left; j < right; j++) {
    arrayContainer.children[j].classList.add('selected');
    if (arr[j] < pivot) {
      i++;
      await swap(i, j);
    }
    arrayContainer.children[j].classList.remove('selected');
  }
  await swap(i + 1, right);
  arrayContainer.children[right].classList.remove('pivot');
  arrayContainer.children[i + 1].classList.add('sorted');
  return i + 1;
}

async function mergeSort(left = 0, right = array.length - 1) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSort(left, mid);
  await mergeSort(mid + 1, right);
  await merge(left, mid, right);
}

async function merge(left, mid, right) {
  const leftArray = array.slice(left, mid + 1);
  const rightArray = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
    renderArray();
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  while (i < leftArray.length) {
    array[k] = leftArray[i];
    i++;
    k++;
    renderArray();
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  while (j < rightArray.length) {
    array[k] = rightArray[j];
    j++;
    k++;
    renderArray();
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

speedInput.addEventListener('input', updateDelay);
