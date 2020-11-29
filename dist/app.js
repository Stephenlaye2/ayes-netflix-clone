// this.APIKEY = '804b527c';
//      this.APIURL= 'http://www.omdbapi.com/?i=tt3896198&apikey=804b527c'
const pageState = function(){
  let currentState = new homeState(this);

  this.init = function(){
    this.changeState(new homeState);
  }

  this.changeState = function(state){
    currentState = state;
  }
}

const homePage = document.querySelector('.home-page'),
  searchPage = document.querySelector('.search-page');

const homeState = function(){
  

  homePage.innerHTML = `
  <!-- Section A - Showcase -->
  <div id="showcase">
    <div class="jumbotron jumbotron-fluid text-white ">

    </div>
  </div>
  <!-- <div class="container"> -->
  <!-- <div class="row no-gutters m-auto "></div> -->
  <div class="row popular-row">
    <div class="popular-heading">Popular on Netflix</div>
    <div class="col movie ">
    </div>
  </div>
  <div class="row trending-row mt-3">
    <div class="trending-heading">Trending Now</div>
    <div class="col trending-movies">
    </div>
  </div>
  <div class="row all-row mt-3">
    <div class="all-heading">Netflix Originals</div>
    <div class="col all-movies">
    </div>
  </div>
  <div class="row top-rated-row mt-3">
    <div class="top-rated-heading">Top Rated</div>
    <div class="col top-rated-movies">
    </div>
  </div>
  <div class="row upcoming-row mt-3">
    <div class="upcoming-heading">Upcoming Movies and Series</div>
    <div class="col upcoming-movies">
    </div>
  </div>
  `;

  searchPage.innerHTML = '';
}

const searchState = function(){
 
  homePage.innerHTML = '';
  searchPage.innerHTML = `
  <div class="row no-gutters search-section mt-5">
    </div>
  `
}
// Initialise pagestate
const page = new pageState();

page.init();


class HTTP{
  constructor(){

    this.APIKEY = 'd5abee883c3c9432a085d9af7b6a9898';
     this.porpularAPIURL= 'https://api.themoviedb.org/3/discover/movie?api_key=d5abee883c3c9432a085d9af7b6a9898&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
     this.allAPIURL = 'https://api.themoviedb.org/3/trending/all/day?api_key=d5abee883c3c9432a085d9af7b6a9898';
     this.trendingAPIURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=d5abee883c3c9432a085d9af7b6a9898&language=en-US&page=1';
     this.topRatedURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=d5abee883c3c9432a085d9af7b6a9898&language=en-US&page=1';
     this.upcomingURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=d5abee883c3c9432a085d9af7b6a9898&language=en-US&page=1';
     this.search = 'https://api.themoviedb.org/3/search/multi?api_key=d5abee883c3c9432a085d9af7b6a9898&language=en-US&query=hard&page=1&include_adult=false';
     this.IMGPATH = 'https://image.tmdb.org/t/p/w500';
  }

  async get(){
    const resp = await fetch(this.porpularAPIURL);
 
    const resData = await resp.json();

    return resData;
  }

  async getAll(){
    const resp = await fetch(this.allAPIURL);

    const resData = await resp.json();

    console.log('ALL', resData);

    return resData;
  }

  async getTrending(){
    const resp = await fetch(this.trendingAPIURL);

    const resData = await resp.json();

    console.log('Trending:', resData);

    return resData;
  }

  async getTopRated(){
    const resp = await fetch(this.topRatedURL);

    const resData = await resp.json();

    return resData;
  }

  async getUpcoming(){
    const resp = await fetch(this.upcomingURL);

   const resData = await resp.json();

    return resData;
  }
  
  async getSearch(url){
const resp = await fetch(url);
const resData = await resp.json();
// console.log('encoded:', searchEnc)

    return resData;
  }
}


//  initialise HTTP
const http = new HTTP();

// Get popular movies
http.get().then((data)=>{
  console.log(data);
  const className = 'movie';
  const slider1 = 'slider1';
  movieCarousel(data, className, slider1);
  randMovie(data);
}).catch((err)=>console.log(err));

http.getAll().then((data)=>{
  const className = 'all-movies';
  const slider2 = 'slider2';
  movieCarousel(data, className, slider2);
}).catch((err)=>console.log(err));

http.getTrending().then((data)=>{
  const className = 'trending-movies';
  const slider3 = 'slider3';
  movieCarousel(data, className, slider3);
}).catch((err)=>console.log(err));

// Get upcoming movies
http.getUpcoming().then((data)=>{
console.log('top rated:', data);
const className = 'upcoming-movies';
const slider5 = 'slider5';
movieCarousel(data, className, slider5);
}).catch((err)=>console.log(err));

// Get top rated movies
http.getTopRated().then((data)=>{
console.log('top rated:', data);
const className = 'top-rated-movies';
const slider4 = 'slider4';
movieCarousel(data, className, slider4);
movieInfo();
}).catch((err)=>console.log(err));



// Get by search
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', searchTerm);
function searchTerm(){
  
  // homeSection= document.querySelector('.home-section');
  
  let searchValue = searchInput.value
url = `https://api.themoviedb.org/3/search/multi?api_key=d5abee883c3c9432a085d9af7b6a9898&query=${searchValue}&page=1&include_adult=false`

http.getSearch(url).then((data)=>{

document.addEventListener('keypress', (e)=>{
    // console.log(e.key);
    if(e.key === 'Enter'){
      page.changeState(new searchState);
  const searchSection = document.querySelector(`.search-section`);
      // homeSection.style.display = 'none';
      // searchSection.innerHTML = '';
      
// let movies = '';

  for(movie of data.results){
    const resData ={
      title: movie.title,
      year: movie.year,
      released: movie.release_date,
      rated: movie.imdbRating,
      actors: movie.Actors,
      description: movie.overview,
      poster: movie.poster_path,
      rating: movie.vote_average,
    }

  const elmntDiv = document.createElement('div');
  elmntDiv.classList = 'col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mt-5';
 const movies = `
 
<div class=" movie-img-div">
<div class = "movie-div ">
 <img class = "img-fluid movie-img " src = "${http.IMGPATH + resData.poster}">
</div>
<div class = "movie-info text-white hide">
 <div class="d-flex justify-content-between">
  <p>
   <i class="fas fa-play "></i>
   <i class="fas fa-plus "></i>
   <i class="far fa-thumbs-up "></i>
   <i class="far fa-thumbs-down "></i>
  </p>
  <p> <i class="fas fa-chevron-down "></i>
  </p>
 </div>
  <p class="movie-title">${resData.title}</p>
  <p class="movie-rating">Rating: 
   <span class="${getByRatingAvg(resData.rating)}"> ${resData.rating}</span>
  </p>
</div>
</div>
`;

elmntDiv.innerHTML = movies;
searchSection.append(elmntDiv);
movieInfo();
}
const movieDivs = document.querySelectorAll('.movie-div');
const movieDivsArr = Array.from(movieDivs);
movieDivsArr.forEach((movieDiv)=>{
  const movieImg = movieDiv.querySelector('img');
  const imgSrc = movieImg.getAttribute('src');
if(imgSrc===http.IMGPATH+'null' || imgSrc===http.IMGPATH+'undefined'){
  movieDiv.remove();
}

});
searchInput.value = '';
    }

  })
}).catch((err)=>console.log(err));
}

function getByRatingAvg(rating){
  if(rating<5){
    return 'red';
  }else if(rating >=5 & rating <=7){
    return 'orange';
  }else if(rating>7){
    return 'green';
  }
  }
// Get Random Movie
function randMovie(data){
  const moviesData = data.results;
  const randomMovies = moviesData[Math.floor(Math.random()*moviesData.length)];
  const jumbotron = document.querySelector('.jumbotron');
  jumbotron.style.background =`url('${http.IMGPATH + randomMovies.poster_path}') no-repeat center center/cover`;
  
  jumbotron.innerHTML = `
<div class = " overlay">
 
  <div class= "left-content col col-md-6 mt-5">
    <h1 >${randomMovies.title}</h1>
    <p >${randomMovies.overview}</p>
    <button class="play"><i class="fas fa-play p-2 px-4"> Play</i></button>
    <button class="more-info text-light p-2 px-4"><i class="fas fa-info-circle"></i> More Info</button>
  </div>
  <div class="row mt-4">
    <div class="col d-sm-none d-md-block  right-content">
     <i class="fas fa-volume-up"></i>
    </div>
  </div>
</div>
  `;
}

// Movie Carousel
function movieCarousel(data, className, slider){
  const elmntDiv = document.createElement('div');
elmntDiv.classList = slider;
let movies = '';
  for(movie of data.results){
    const resData ={
      title: movie.title,
      year: movie.year,
      released: movie.release_date,
      rated: movie.imdbRating,
      actors: movie.Actors,
      description: movie.overview,
      poster: movie.poster_path,
      rating: movie.vote_average,
    }

    movies += `
  
    <div class="movie-img-div">
    <div class = "movie-div">
<img class ="img-fluid movie-img" src = "${http.IMGPATH + resData.poster}">
</div>

<div class = "movie-info text-white hide">
<div class="d-flex justify-content-between">
 <p>
 <i class="fas fa-play "></i>
 <i class="fas fa-plus "></i>
 <i class="far fa-thumbs-up "></i>
 <i class="far fa-thumbs-down "></i>
 </p>
 <p> <i class="fas fa-chevron-down "></i>
 </p>
 </div>
 <p class="movie-title">${resData.title}</p>
 <p class="movie-rating">Rating: 
 <span class="${getByRatingAvg(resData.rating)}"> ${resData.rating}</span>
 </p>
 <p class="movie-date">Release Date: ${resData.released}
 </p>
 </div>
 </div>
`;

 }
 elmntDiv.innerHTML = movies;
document.querySelector(`.${className}`).appendChild(elmntDiv);


// Slick slider
$(`.${slider}`).slick({
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 6,
  // autoplay: true,
  responsive:[
    {
      breakpoint: 1200,
      settings:{
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    },
    {
      breakpoint: 1024,
      settings:{
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 768,
      settings: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 560,
      settings: {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    }
  ]
});


}



const searchBtn = document.querySelector('.search-btn'),
searchLi = document.querySelector('.search-li'),
searchAppend = document.querySelector('.search-append');

searchBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  searchBtn.style.display = 'none';
  searchLi.style.display = 'inline'
});

searchAppend.addEventListener('click', (e)=>{
  e.preventDefault();
searchLi.style.display = 'none';
searchBtn.style.display = 'inline';
});

const manageProfileList = document.querySelector('.manage-profile-list');
const manageProfile = document.querySelector('.manage-profile');

manageProfileList.addEventListener('click', (e)=>{
  e.preventDefault();
manageProfile.classList.remove('hide');
});

const movieInfo = function(){
  const movieImgDivs = document.querySelectorAll(`.movie-img-div`);
  const movieImgDivArr = Array.from(movieImgDivs);
  movieImgDivArr.forEach((movieImgDiv)=>{
    movieImgDiv.addEventListener('mouseover', (e)=>{
      e.preventDefault();
      const movieInfo = movieImgDiv.querySelector(`.movie-info`);
      // console.log(movieInfo);
        // console.log(movieInfo.classList)
        movieInfo.classList.remove('hide');
        movieInfo.style.transform = 'translateY(-150px)';
        // movieInfo.style.zIndex = '5';
      
    });
    movieImgDiv.addEventListener('mouseleave', (e)=>{
      e.preventDefault();
      const movieInfo = movieImgDiv.querySelector(`.movie-info`);
      movieInfo.classList.add('hide');
    })
  });
}


