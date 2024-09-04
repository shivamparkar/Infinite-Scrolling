const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//unsplash Api
let count = 5;
const apiKey = ``;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check if all the images are loaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  console.log(imageLoaded);

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    console.log("ready =", ready);
  }
}

//helper function
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links & photos, Add to Dom
const displayPhotos = () => {
  imageLoaded = 0;
  totalImages = photosArray.length;
  console.log("totalImages", totalImages);

  // run function for each object in photosarray
  photosArray.forEach((photo) => {
    //create <a> to link unsplash
    const item = document.createElement("a");

    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);
    //put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get Photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.error();
  }
};

window.addEventListener("scroll", () => {
  console.log("scrolled");
  if (
    window.innerHeight + window.scrollY >= document.body.offsetWidth - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
