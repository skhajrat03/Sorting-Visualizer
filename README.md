# Sorting-Visualizer

An interactive sorting visualizer built using **HTML, CSS, and JavaScript**.

The project visually demonstrates the sorting process by representing array elements as bars and animating comparisons and swaps.

## 🚀 Live Demo

[Sorting Visualizer](https://sorting-visualizer168.netlify.app/)

## 📌 About the Project

This project provides a visual representation of different sorting algorithms.

Users can:

* Generate a random array
* Change the array size
* Select a sorting algorithm
* Adjust the sorting speed
* Start the sorting visualization
* View the number of comparisons
* View the number of swaps

The JavaScript code maintains the array and sorting statistics and controls the visualization.

## 🧮 Sorting Algorithms

The project currently implements:

1. Bubble Sort
2. Selection Sort
3. Insertion Sort
4. Merge Sort
5. Quick Sort
6. Heap Sort

The six algorithms are implemented directly in the JavaScript code.

## 🛠️ Technologies Used

* HTML
* CSS
* JavaScript

## ✨ Features

* Random array generation
* Array size control
* Sorting speed control
* Sorting algorithm selection
* Animated comparisons
* Animated swaps
* Comparison counter
* Swap counter
* Sorted-element highlighting

The application uses JavaScript functions such as `compare()`, `swap()`, `updateBar()`, and `markSorted()` to control the visualization.

## 📂 Project Structure

sorting-visualizer/
│
├── index.html
├── style.css
├── script.js
│
├── bubble.js
├── selection.js
├── insertion.js
├── merge.js
├── quick.js
├── heap.js
│
│
└── README.md

> Keep the structure above only if these files are actually present in your repository.

## ⚙️ How It Works

The application follows this basic flow:

Generate Array
      ↓
Create Random Values
      ↓
Display Values as Bars
      ↓
Select Algorithm
      ↓
Start Sorting
      ↓
Compare Elements
      ↓
Swap / Rearrange Elements
      ↓
Update Visualization
      ↓
Update Statistics
      ↓
Mark Sorted Elements

The array is generated using random values and then rendered as HTML elements whose heights represent the array values.

## 📊 Statistics

The visualizer tracks:

### Comparisons

Counts the comparisons performed during the visualization.

### Swaps

Counts the swaps performed during the visualization.

The counters are updated during the sorting process.

## 🎨 Visualization

Each array element is represented by a vertical bar.

The height of a bar is calculated based on the value of the corresponding array element.

During sorting, elements can be visually identified as:

* Comparing
* Swapping
* Sorted

## 🧠 Sorting Algorithms

### Bubble Sort

Repeatedly compares adjacent elements and swaps them when they are in the wrong order.

The implementation also stops early when no changes occur during a pass.

### Selection Sort

Finds the minimum element in the remaining unsorted portion and swaps it into the current position.

### Insertion Sort

Builds the sorted portion by comparing neighboring elements and swapping elements when necessary.

### Merge Sort

Uses recursive division of the array followed by merging the sorted portions.

### Quick Sort

Uses a partition operation around a pivot and recursively sorts the resulting portions.

### Heap Sort

Builds a max heap and repeatedly moves the maximum element to the end of the array.

## ⚡ Sorting Animation

The project uses JavaScript `async/await`, Promises, and delays to make individual sorting operations visible.

The `compare()` function highlights elements during comparison, while the `swap()` function updates the array and corresponding bars.

## 🎮 How to Use

1. Open the application.
2. Generate an array.
3. Select a sorting algorithm.
4. Adjust the array size if required.
5. Adjust the sorting speed.
6. Start the sorting process.
7. Observe the sorting visualization and statistics.

## 💻 Run Locally

Clone the repository:

git clone https://github.com/YOUR-USERNAME/sorting-visualizer.git

Go to the project directory:

cd sorting-visualizer

Open `index.html` in a web browser.

You can also use a local development server such as **Live Server** in Visual Studio Code.

## 🌐 Deployment

The project is available online at:

https://sorting-visualizer168.netlify.app/

## 👨‍💻 Author

**Sk Hajrat**

B.Tech Computer Science and Engineering Student

## ⭐ Feedback

If you find the project useful, feel free to explore the source code and provide feedback.

---

**Built using HTML, CSS, and JavaScript.**
