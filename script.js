"use strict";

/* ==========================================
GET HTML ELEMENTS
========================================== */

const container = document.getElementById("arrayContainer");
const algorithm = document.getElementById("algorithm");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const sizeValue = document.getElementById("sizeValue");
const speedValue = document.getElementById("speedValue");
const generateBtn = document.getElementById("generateBtn");
const sortBtn = document.getElementById("sortBtn");
const comparisonsText = document.getElementById("comparisons");
const swapsText = document.getElementById("swaps");
const statusText = document.getElementById("status");

/* ==========================================
VARIABLES
========================================== */

let array = [];
let comparisons = 0;
let swaps = 0;
let isSorting = false;

/* ==========================================
GENERATE ARRAY
========================================== */

function generateArray() {
    if (isSorting) return;

    array = [];
    const size = Number(sizeSlider.value);

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 90) + 10;
        array.push(value);
    }

    comparisons = 0;
    swaps = 0;

    updateStatistics();
    drawArray();
}

/* ==========================================
DRAW ARRAY
========================================== */

function drawArray() {
    container.innerHTML = "";

    if (array.length === 0) return;

    const max = Math.max(...array);

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        const height = (array[i] / max) * 100;
        bar.style.height = height + "%";
        container.appendChild(bar);
    }
}

/* ==========================================
UPDATE BAR
========================================== */

function updateBar(index) {
    const bars = container.children;
    if (!bars[index]) return;
    const max = Math.max(...array);
    bars[index].style.height = (array[index] / max) * 100 + "%";
}

/* ==========================================
DELAY
========================================== */

function sleep(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

function getDelay() {
    const speed = Number(speedSlider.value);
    // Slider: 1 = slow, 100 = fast
    return 510 - speed * 5;
}

/* ==========================================
WAIT
========================================== */

async function wait() {
    await sleep(getDelay());
}

/* ==========================================
COMPARE
========================================== */

async function compare(i, j) {
    const bars = container.children;

    comparisons++;
    updateStatistics();

    if (bars[i]) bars[i].classList.add("comparing");
    if (bars[j]) bars[j].classList.add("comparing");

    await wait();

    if (bars[i]) bars[i].classList.remove("comparing");
    if (bars[j]) bars[j].classList.remove("comparing");
}

/* ==========================================
SWAP
========================================== */

async function swap(i, j) {
    const bars = container.children;

    if (bars[i]) bars[i].classList.add("swapping");
    if (bars[j]) bars[j].classList.add("swapping");

    await wait();

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    updateBar(i);
    updateBar(j);

    swaps++;
    updateStatistics();

    await wait();

    if (bars[i]) bars[i].classList.remove("swapping");
    if (bars[j]) bars[j].classList.remove("swapping");
}

/* ==========================================
MARK SORTED
========================================== */

function markSorted(index) {
    const bars = container.children;
    if (bars[index]) bars[index].classList.add("sorted");
}

async function markAllSorted() {
    const bars = container.children;
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.remove("comparing");
        bars[i].classList.remove("swapping");
        bars[i].classList.add("sorted");
        await sleep(10);
    }
}

/* ==========================================
BUBBLE SORT
========================================== */

async function bubbleSort() {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let changed = false;

        for (let j = 0; j < n - i - 1; j++) {
            await compare(j, j + 1);

            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
                changed = true;
            }
        }

        markSorted(n - i - 1);

        if (!changed) break;
    }

    if (n > 0) markSorted(0);
}

/* ==========================================
SELECTION SORT
========================================== */

async function selectionSort() {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let min = i;

        for (let j = i + 1; j < n; j++) {
            await compare(min, j);
            if (array[j] < array[min]) {
                min = j;
            }
        }

        if (min !== i) {
            await swap(i, min);
        }

        markSorted(i);
    }

    if (n > 0) markSorted(n - 1);
}

/* ==========================================
INSERTION SORT
========================================== */

async function insertionSort() {
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let j = i;

        while (j > 0) {
            await compare(j - 1, j);

            if (array[j - 1] > array[j]) {
                await swap(j - 1, j);
                j--;
            } else {
                break;
            }
        }
    }

    await markAllSorted();
}

/* ==========================================
MERGE SORT
========================================== */

async function mergeSort(left, right) {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);

    await mergeSort(left, middle);
    await mergeSort(middle + 1, right);
    await merge(left, middle, right);
}

async function merge(left, middle, right) {
    const temp = [];
    let i = left;
    let j = middle + 1;

    while (i <= middle && j <= right) {
        await compare(i, j);

        if (array[i] <= array[j]) {
            temp.push(array[i]);
            i++;
        } else {
            temp.push(array[j]);
            j++;
        }
    }

    while (i <= middle) {
        temp.push(array[i]);
        i++;
    }

    while (j <= right) {
        temp.push(array[j]);
        j++;
    }

    for (let k = 0; k < temp.length; k++) {
        array[left + k] = temp[k];
        updateBar(left + k);
        await wait();
    }
}

/* ==========================================
QUICK SORT
========================================== */

async function quickSort(low, high) {
    if (low >= high) return;

    const pivot = await partition(low, high);
    await quickSort(low, pivot - 1);
    await quickSort(pivot + 1, high);
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        await compare(j, high);

        if (array[j] <= pivot) {
            i++;
            if (i !== j) {
                await swap(i, j);
            }
        }
    }

    if (i + 1 !== high) {
        await swap(i + 1, high);
    }

    return i + 1;
}

/* ==========================================
HEAP SORT
========================================== */

async function heapSort() {
    const n = array.length;

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // Extract maximum
    for (let i = n - 1; i > 0; i--) {
        await swap(0, i);
        markSorted(i);
        await heapify(i, 0);
    }

    if (n > 0) markSorted(0);
}

async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
        await compare(left, largest);
        if (array[left] > array[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        await compare(right, largest);
        if (array[right] > array[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        await swap(i, largest);
        await heapify(n, largest);
    }
}

/* ==========================================
START SORTING
========================================== */

async function startSorting() {
    if (isSorting) return;

    isSorting = true;

    // Disable controls
    generateBtn.disabled = true;
    sortBtn.disabled = true;
    algorithm.disabled = true;
    sizeSlider.disabled = true;

    statusText.textContent = "Sorting...";

    comparisons = 0;
    swaps = 0;
    updateStatistics();

    try {
        switch (algorithm.value) {
            case "bubble":
                await bubbleSort();
                break;
            case "selection":
                await selectionSort();
                break;
            case "insertion":
                await insertionSort();
                break;
            case "merge":
                await mergeSort(0, array.length - 1);
                await markAllSorted();
                break;
            case "quick":
                await quickSort(0, array.length - 1);
                await markAllSorted();
                break;
            case "heap":
                await heapSort();
                break;
            default:
                // unknown algorithm
                break;
        }

        statusText.textContent = "Completed";
    } catch (error) {
        console.error(error);
        statusText.textContent = "Error";
        alert("An error occurred. Press F12 and check Console.");
    }

    isSorting = false;

    // Enable controls
    generateBtn.disabled = false;
    sortBtn.disabled = false;
    algorithm.disabled = false;
    sizeSlider.disabled = false;
}

/* ==========================================
UPDATE STATISTICS
========================================== */

function updateStatistics() {
    comparisonsText.textContent = comparisons;
    swapsText.textContent = swaps;
    sizeValue.textContent = sizeSlider.value;
    speedValue.textContent = speedSlider.value;
}

/* ==========================================
EVENT LISTENERS
========================================== */

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", startSorting);

sizeSlider.addEventListener("input", function () {
    if (!isSorting) {
        sizeValue.textContent = this.value;
        generateArray();
    }
});

speedSlider.addEventListener("input", function () {
    speedValue.textContent = this.value;
});

/* ==========================================
INITIAL ARRAY
========================================== */

generateArray();
