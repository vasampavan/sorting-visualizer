# sorting-visualizer

This is a web-based Sorting Algorithm Visualizer built using HTML, CSS, and JavaScript. It allows you to visualize different sorting algorithms in real-time, including Bubble Sort, Selection Sort, Insertion Sort, Quick Sort and Merge Sort. You can also control the speed of visualization and provide a custom array for sorting.

link: https://vasampavan.github.io/sorting-visualizer/

Preview:

![image](https://github.com/user-attachments/assets/4b539aae-2e3f-47b7-95dc-d48465f4e3d2)


## Features

- **Random Array Generation**: Generate a random array of numbers to sort.
- **User Input Array**: Enter a custom array of numbers (comma-separated) for sorting.
- **Sorting Algorithms**:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Quick Sort (with pivot highlighted)
  - Merge Sort
- **Visualization Controls**:
  - Adjust the speed of the sorting visualization using a slider.
  - Sorted bars turn green.

## How to Use

1. **Generate Random Array**: Click on the "Generate Random Array" button to create a random array of numbers that will be displayed as bars.
2. **Enter Custom Array**: Type a custom array of numbers in the input field (comma-separated, e.g., `10, 5, 8, 3, 7`) and click "Sort Array" to visualize the sorting of your input.
3. **Select Sorting Algorithm**: Choose the sorting algorithm you want to visualize from the dropdown menu.
4. **Adjust Speed**: Use the slider to control the speed of the sorting visualization. The farther to the right, the faster the sorting.
5. **Start Sorting**: Click the "Sort Array" button after choosing an algorithm and speed to start the sorting visualization.

## Algorithms Overview

### 1. Bubble Sort
A simple comparison-based algorithm where adjacent elements are swapped if they are in the wrong order. This process is repeated until the array is sorted.

### 2. Selection Sort
This algorithm selects the smallest (or largest) element from the unsorted part of the array and swaps it with the first unsorted element.

### 3. Insertion Sort
Insertion sort builds the sorted array one element at a time by comparing each new element with those already sorted and inserting it at the correct position.

### 4. Quick Sort
Quick Sort is a divide-and-conquer algorithm. It selects a pivot element and partitions the array around the pivot, recursively sorting the left and right subarrays.

### 5. Merge Sort
Merge Sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and merges the sorted halves.
