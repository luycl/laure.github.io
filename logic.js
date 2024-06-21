var allImages = [];
var totalAllPages = 0;
var currentPage = 1;
var imagesPerPage = 3;

var totalImages = 40;
var totalAllPages = Math.ceil(totalImages / imagesPerPage);

for (var i = 0; i < totalImages; i++) {
  allImages.push("public/images/" + i + ".png");
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageButtons(totalAllPages);
    loadImages();
  }
}

function nextPage() {
  if (currentPage < totalAllPages) {
    currentPage++;
    updatePageButtons(totalAllPages);
    loadImages();
  }
}

function updatePageButtons(nbPages) {
  var paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";

  var prevButton = document.createElement("a");
  prevButton.href = "#";
  prevButton.className = "style-bar-item style-button style-hover-black";
  prevButton.onclick = previousPage;
  prevButton.innerHTML = "«";
  paginationDiv.appendChild(prevButton);

  for (var i = 1; i <= nbPages; i++) {
    var pageButton = document.createElement("a");
    pageButton.href = "#";
    pageButton.id = "page" + i;
    pageButton.className = "style-bar-item style-button style-hover-black";
    pageButton.innerHTML = i;
    pageButton.onclick = function () {
      currentPage = parseInt(this.innerHTML);
      loadImages();
      updatePageButtons(totalAllPages);
    };
    paginationDiv.appendChild(pageButton);
  }

  var nextButton = document.createElement("a");
  nextButton.href = "#";
  nextButton.className = "style-bar-item style-button style-hover-black";
  nextButton.onclick = nextPage;
  nextButton.innerHTML = "»";
  paginationDiv.appendChild(nextButton);
}

function loadImages() {
  var startIdx = (currentPage - 1) * imagesPerPage;
  var endIdx = startIdx + imagesPerPage;
  var imagesToDisplay = allImages.slice(startIdx, endIdx);
  displayImages(imagesToDisplay);
}

function loadImagesOnClick() {
  currentPage = 1;
  updatePageButtons(totalAllPages);
  loadImages();
}

function displayImages(images) {
  var photoGrid = document.getElementById("photoGrid");
  photoGrid.innerHTML = "";

  images.forEach(function (imgSrc) {
    var imgAlt = imgSrc.split("/").pop();
    var imgDiv = document.createElement("div");
    imgDiv.className = "style-third style-container style-margin-bottom";
    imgDiv.innerHTML = `
      <img src="${imgSrc}" alt="${imgAlt}" style="width:100%" class="style-hover-opacity">
    `;
    photoGrid.appendChild(imgDiv);
  });
}

function loadImagesOnPageLoad() {
  updatePageButtons(totalAllPages);
  loadImages();
}

document.addEventListener("DOMContentLoaded", loadImagesOnPageLoad);
