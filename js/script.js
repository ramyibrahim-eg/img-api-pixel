// Copyrights - disgin.website

const imageWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closebtc = document.querySelector(".fa-times");
const downloadbtc = document.querySelector(".fa-cloud-download");
const faArrowRightbtc = document.querySelector(".fa-arrow-right");

const apiKey = "XPpGMUXTGkwqOHwceLKFLSNNHKJkjjO4jVeW6nWWTZTZtdsS8mK8BMVK ";
const perpage = 10;
let currentPage = 1;

const downloadImg = (imgURL) => {
  fetch(imgURL)
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Faild to download image!"));
};

const hideLightBox = () => {
  lightBox.classList.remove("show");
  document.body.style.overflow = "auto";
};

const showLightbox = (name, img) => {
  downloadbtc.setAttribute("data-img", img);
  lightBox.querySelector("img").src = img;
  lightBox.querySelector("img").alt = name;
  lightBox.querySelector("span").innerHTML = name;
  lightBox.classList.add("show");
  document.body.style.overflow = "hidden";
};

const generateHTML = (images) => {
  imageWrapper.innerHTML += images
    .map(
      (
        img
      ) => `<li class="card" onclick="showLightbox('${img.photographer}' , '${img.src.large2x}')">
    <img src="${img.src.large2x}" alt="${img.alt}"/>
    <div class="details">
      <div class="photographer">
        <i class="fa fa-camera"></i>
        <span>${img.photographer}</span>
      </div>
      <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
          <i class="fa fa-cloud-download"></i>
        </button>
    </div>
  </li>`
    )
    .join("");
};

const getImages = (apiUrl) => {
  loadMoreBtn.innerHTML = "Loading...";
  loadMoreBtn.classList.add("disabled");
  fetch(apiUrl, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
      loadMoreBtn.innerHTML = "Load More";
      loadMoreBtn.classList.remove("disabled");
    });
  // .catch(() => alert("Faild to load images"));
};

const loadMoreImage = () => {
  let searchTerm = searchInput.value;

  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perpage}`;
  apiURL = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perpage}`
    : apiURL;
  getImages(apiURL);
};

const loadSearchImages = () => {
  if (searchInput.value === "") {
    getImages(
      `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perpage}`
    );
  }

  let searchTerm = searchInput.value;
  imageWrapper.innerHTML = "";
  getImages(
    `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perpage}`
  );
};

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perpage}`
);

loadMoreBtn.addEventListener("click", loadMoreImage);
searchInput.addEventListener("keyup", loadSearchImages);
closebtc.addEventListener("click", hideLightBox);
downloadbtc.addEventListener("click", (e) => downloadImg(e.target.dataset.img));

let buttontop = document.querySelector("#buttonup");
let faAngleDoubleUp = document.querySelector("i.fa.fa-angle-double-up");
let faSearch = document.querySelector("i.fa.fa-search");
let search = document.querySelector(".search");

document.body.appendChild(buttontop);

window.onscroll = function () {
  if (window.scrollY >= 200) {
    buttontop.style.display = "block";
    faSearch.style.cssText =
      "position: fixed !important; top: 3% !important; right: 0 !important; font-size: 2rem; color: #fff !important; /* transform: translateY(-50%); */ cursor: pointer; border: 3px solid #fff; padding: 7px; border-radius: 25px; border-top-right-radius: 0; border-bottom-right-radius: 0;border-right-color: transparent;z-index: 99;";
    search.style.cssText = "";
  } else {
    faSearch.style.cssText = "";
    buttontop.style.cssText = "display:none;border: 3px solid #fff;";
    faAngleDoubleUp.style.cssText = "color: #fff;";
  }
};

faSearch.onclick = function () {
  search.style.cssText = "position: sticky; top: 0; z-index: 9;";
  faSearch.style.cssText = "";
};

buttontop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  buttontop.style.cssText = "border: 3px solid #fff;background: #fff;";
  faAngleDoubleUp.style.cssText = "color: #fff;";
};
