let timer;
let deleteFirstPhotoDelay;
async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    //data.message to access the object that contains our dogs
    // console.log(data.message);
    createBreedList(data.message);
    const select = document.getElementById("select-breed");
    select.addEventListener("change", loadByBreed);
  } catch (error) {
    console.error("You have an error", error);
  }
}
start();
const createBreedList = (breedList) => {
  //we use Object.keys() to get all props of our Objr which represents the
  //aminal names w put in an array so we can use map
  document.getElementById("breed-div").innerHTML = ` <select id="select-breed">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList)
          .map((breed) => {
            return `<option>${breed}</option>`;
          })
          .join("")}
        
      </select>`;
};
const loadByBreed = async (e) => {
  try {
    e.preventDefault();
    const breed = e.target.value;
    if (breed !== "Choose a dog breed") {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await response.json();
      console.log(data);
      createSlideShow(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
const createSlideShow = (images) => {
  let currentPos = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>`;
    currentPos += 2;
    if (images.length === 2) {
      currentPos = 0;
    }
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}');"></div>
  <div class="slide"></div>`;
  }

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentPos]}');"></div>`
      );
    deleteFirstPhotoDelay = setTimeout(() => {
      //here we delete only first elmt after 1sec every time
      document.querySelector(".slide").remove();
    }, 1000);
    // if we reach the end of images
    if (currentPos + 1 >= images.length) {
      //reset it to 0
      currentPos = 0;
    } else {
      currentPos++;
    }
  }
};
