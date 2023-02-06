import {recommendationData} from "./recommendationData";
import {recommendationData2} from "./recommendationData2";
import {updates} from "./updates";








//Define all the genres for the site
function getGenres(){
  const genres = ["Action ","Adult ","Adventure ","Comedy ","Cooking ","Doujinshi ","Drama ","Ecchi ","Fantasy ","Gender bender ","Harem ","Historical ","Horror ","Isekai ","Josei ","Manhua ","Manhwa ","Martial arts ","Mature ","Mecha ","Medical ","Mystery ","One shot ","Psychological ","Romance ","School life ","Sci fi ","Seinen ","Shoujo ","Shoujo ai ","Shounen ","Shounen ai ","Slice of life ","Smut ","Sports ","Supernatural ","Tragedy ","Webtoons ","Yaoi ","Yuri "]


//Randomly Select Genres
  var pickedGenres3 = new Set([genres[Math.trunc(Math.random()*40)],genres[Math.trunc(Math.random()*40)],genres[Math.trunc(Math.random()*40)]])
  var pickedGenres5 = new Set([genres[Math.trunc(Math.random()*genres.length)],genres[Math.trunc(Math.random()*genres.length)],genres[Math.trunc(Math.random()*genres.length)]])

  return `${[...pickedGenres3]}`
}


const container = document.querySelector('.container');
const topNav = document.querySelector('.top-nav');
const bottomNav = document.querySelector('.bottom-nav');

const topContainer = document.querySelector('.top-container');
const trendImg = document.getElementById('trendImg');
const trendTitle = document.querySelector('.trending-title');

const trendingA = document.getElementById('trendingA');
const imgRandom = document.querySelectorAll('#imgRandom');
const searchTerm = document.getElementById('search-bar');
const recommendations = document.querySelector('.rec');
const title = document.querySelector('rec-title');
const results = document.querySelector('.results');
const imgEl = document.querySelectorAll('img');
const cellContainer = document.querySelector('.cell-container');
const recContainer = document.querySelector('.rec-container');
const containerPopular = document.querySelector('.container-popular')
const latestUpdateContainer = document.querySelector('.latest-update-container')
const containerSlide = document.querySelector('container-slide');
const chapterContainer = document.querySelector('.chapter__container');
const mangaDataContainer = document.querySelector('.manga-data__container');
const commentSection = document.querySelector('.commentSection');
const chapterList = document.querySelector('.chapter-list');
const chapterButtonsContainer = document.querySelector('.chapter-buttons__container')
const weeklyEl = document.getElementById('weekly');
const monthlyEl = document.getElementById('monthly')
const allEl = document.getElementById('all');
const nextBtn = document.querySelector('.next-btn')



function showClickedManga(){   
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

}


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
    }
};



const Ratings = [
  {
    rate:"9.9",
  },
  {
    rate:"9.7",
  },
  {
    rate:"9.7",
  },
  {
    rate:"9.7",
  },
  {
    rate:"9.7",
  },
]


getTrendingImg()
async function getTrendingImg(){
const response = await fetch('https://manga-scrapper.p.rapidapi.com/search/action/?provider=asura',options)
const data = await response.json()
.catch(err => console.log(err));
const trendingEl = document.createElement('div');
    trendingEl.classList.add('trending');
    trendingEl.innerHTML=`
    <a href="">
    <img src=${data.data.result[Math.trunc(Math.random()*data.data.result.length)].MangaCover}
    width="196.500px" height="280" alt="">

    </a>
    <h3 class="trending-title">ELITE SCANS <br>Trending This Week</h3>`;
    topContainer.appendChild(trendingEl);
}

getSlider();
 async function getSlider(){
    const response = await fetch('https://manga-scrapper.p.rapidapi.com/search/fantasy/?provider=asura',options )
    const data = await response.json()
    .catch(err=> console.log(err));
    showSlider(data)
    showPopular(data.data.result)
 }

 function showSlider(data){
    const slider = document.querySelectorAll('.mySlides');
    let data1 = "";
    let data2 = "";
    let data3 = "";

    slider.forEach((sli,idx)=>{
      const {MangaCover,MangaSynopsis, MangaTitle, _id} = data.data.result[idx];
      if (idx === 0) {
        data1 = {MangaCover,MangaSynopsis, MangaTitle, _id};
      } else if (idx === 1) {
        data2 = {MangaCover,MangaSynopsis, MangaTitle, _id};
      } else if (idx === 2) {
        data3 = {MangaCover,MangaSynopsis, MangaTitle, _id};
      }

        const synopsis = [MangaSynopsis.slice(0,161)] + '...';
           
        const slideEl = document.createElement('div');
        slideEl.classList.add('slide-container')
        slideEl.innerHTML=
        `
        <h3 class="slide-title">${MangaTitle}</h3>
        </a>
        <a href="">
            <h6 class="slide-genre">${getGenres()}</h6>
        </a>
        <p class="summary-title">Summary</p>
        <p class="summary-text">${synopsis}</p>
        
            <img
                    src=${MangaCover}
                    alt="" class="img-slide" width="120px" height="200px">
            <div class="slideImg">
                <img src=${MangaCover}
                    style="width: 619px" >
            `
            slider[idx].appendChild(slideEl);
            const imgSlide = slideEl.querySelector('.img-slide');
            imgSlide.addEventListener('click',()=>{
              if(idx==0){
                removeElements()
              getMangaInfo(data1,_id)
              }else if(idx ==1){
                removeElements()
              getMangaInfo(data2,_id)
              }else if(idx==2){
                removeElements()
              getMangaInfo(data3,_id)
              }
            }
              )

    })
        
        
}


//Get the Data for latest Updates
getLatestUpdates()
async function getLatestUpdates(){
  
  
    updates.map((manga )=>{
        const {MangaTitle,MangaCover,MangaShortUrl,MangaUrl,MangaSynopsis,_id,_type,frontChap1,frontChap2,frontChap3, uploaded}= manga;
        const cellEl = document.createElement('div');

       
        cellEl.classList.add("cell");
cellEl.innerHTML = `
    <div class="manga-container">
        <img src=${MangaCover} alt="${MangaTitle}" class="latest-img" width="100" height="150"  >
    <div class="manga-info">
        <label id="latest-title">${
          MangaTitle.length > 30
            ? MangaTitle.slice(0, 30) + "..."
            : MangaTitle
        }</label>
        <ul>
            <li>Chapter ${frontChap1}<span class="dAgo">${uploaded}</span></li>
            <li>Chapter ${frontChap2}<span class="dAgo">${uploaded}</span></li>
            <li>Chapter ${frontChap3}<span class="dAgo">${uploaded}</span></li>
        </ul>
    </div>
</div>
    `;

    cellContainer.appendChild(cellEl);
    const mangaCoverEl = cellEl.querySelector(".latest-img");
    mangaCoverEl.addEventListener("click", () => {
      removeElements()
            
            
            getMangaInfo(manga,_id) 

          });
          const mangaInfoEl = cellEl.querySelector(".manga-info ul");
const mangaChapterEls = mangaInfoEl.querySelectorAll("li");
mangaChapterEls.forEach((mangaChapterEl, index) => {
  mangaChapterEl.addEventListener("click", () => {
 
    if (index === 0) {
      removeElements()
      showMangaChapters(_id,frontChap1)
    } else if (index === 1) {
      removeElements()
      showMangaChapters(_id,frontChap2) 
    } else if (index === 2) {
      showMangaChapters(_id,frontChap3)
      removeElements()
    }

  });
});
});
}
/////////////////////Next Btn///////////////////////////////////
nextBtn.addEventListener('click', ()=> location.reload())



///Remove Elements//////////////
function removeElements(){
  latestUpdateContainer.classList.toggle("display");
      containerPopular.classList.toggle("display");
      topContainer.classList.toggle("display");
}

////////////////Recommendation Buttons


///////////////Show Recommendations
showRecommendations(recommendationData)
function showRecommendations(recommendations) {
  
  recommendations.map((rec)=>{


    const {MangaTitle,MangaCover,MangaShortUrl,MangaUrl,MangaSynopsis,_id,_type} = rec;
    const recEl = document.createElement("div");
    
    recEl.classList.add("rec");
    recEl.innerHTML = `
            <img src=${MangaCover} class="rec-img" width="58px" height="78px" alt="">
            <div class="rec-title">${
              MangaTitle.length > 30
                ? MangaTitle.slice(0, 30) + "..."
                : MangaTitle
            }</div>
            <p class="genres"><span class="gSpan">Genres: </span>Adventure, Comedy, Fantasy, Martial Arts, Rebirth<br><i class="fa-solid fa-star"></i>10</p>
        </div>
        `;
    recEl.addEventListener("click", () => getMangaInfo(rec, _id));
    recContainer.appendChild(recEl);

    

    const mangaCoverEl = recEl.querySelector(".rec-img");
    mangaCoverEl.addEventListener("click", () => {
      latestUpdateContainer.classList.add("display");
      containerPopular.classList.add("display");
      topContainer.classList.add("display");
    });
});
}

weeklyEl.addEventListener('click', () => {
  recContainer.innerHTML = '';
  showRecommendations(recommendationData);
});

monthlyEl.addEventListener('click', () => {
  recContainer.innerHTML = '';
  showRecommendations(recommendationData2);
});

allEl.addEventListener('click', () => {
  recContainer.innerHTML = '';
  showRecommendations(recommendationData);
});






//Get the Data for the popular section
function showPopular(popular){ 
    let newArr = popular.splice(0,5);

    
    
    newArr.forEach((pop, i) => {
      const popGrid = document.querySelector('.popGrid');
      const {MangaCover, MangaTitle, _id} = pop;
                   
      const popEl = document.createElement('div');
      popEl.classList.add('popular')
      popEl.innerHTML=
        `
        <img src="${MangaCover}" width="147px" height="201px" alt="random image">
        <h3 class="pop-title">${MangaTitle}</h3>
        `;
    
      for (let j = 0; j < 5; j++) {
        popEl.innerHTML += '<i class="fa-solid fa-star ratings"></i>';
      }
      popEl.innerHTML += ` ${Ratings[i].rate}`;
    
      popGrid.appendChild(popEl);
    
      popEl.addEventListener('click',() => {
        removeElements()
        getMangaInfo(pop,_id)
      })
    });
    }

 //Get Request for the search button in Nav bar
async function search (){
    const response = await fetch(`https://manga-scrapper.p.rapidapi.com/search/${searchTerm.value}/`,options )
    const data = await response.json()
    .catch(err => console.log(err));
    showResults(data.data.result)   
}   

function showResults(manga){
  console.log(manga)
  results.innerHTML ="";
  results.classList.toggle('display');
  manga.forEach((man) => {
    const {MangaCover,MangaShortUrl, MangaSynopsis, MangaTitle,_id} = man;

    const resultsEl = document.createElement('div');
    resultsEl.classList.add('searchCell');
    resultsEl.innerHTML=`
      <img src=${MangaCover} width="40px" height="54px" class="search-img">
      <div>
        <p>${MangaTitle}</p>
        <p>${getGenres()}</p>
      </div>      
    `
    
    results.appendChild(resultsEl);
    const searchImg = document.querySelector('.search-img');
    searchImg.addEventListener('click',() => {
      results.removeChild(resultsEl);
      removeElements()
      results.classList.add('display')
      latestUpdateContainer.classList.add('display');
    containerPopular.classList.add('display');
    topContainer.classList.add('display');
      getMangaInfo(man,_id);
    });

    results.addEventListener('mouseleave', () => {
      results.classList.add('display');
    });
  });
}

searchTerm.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){  
        search();
    }
})

imgEl.forEach((img) => {
img.addEventListener('click', () => {
    latestUpdateContainer.classList.toggle('display');
    containerPopular.classList.toggle('display');
    topContainer.classList.toggle('display');
  });
});

async function showMangaChapters(id,chNum){
    const response = await fetch(`https://manga-scrapper.p.rapidapi.com/series/${id}/chapter/${id}-chapter-${chNum}/?provider=asura`, options)
    const data =  await response.json();data
    const response2 = await fetch(`https://manga-scrapper.p.rapidapi.com/series/${id}/chapters/?provider=asura`, options)
    const data2 =  await response2.json();data2
  

 getChapter(data,id,data2.data.series)
}

async function showMangaChapters2(id,ch){
  console.log(id,ch)
    const response = await fetch(`https://manga-scrapper.p.rapidapi.com/series/${id}/chapter/${ch}/?provider=asura`, options)
    const data =  await response.json(); data
    const response2 = await fetch(`https://manga-scrapper.p.rapidapi.com/series/${id}/chapters/?provider=asura`, options)
    const data2 =  await response2.json(); data2


  chapterContainer.classList.toggle('display')
getChapter(data,id,data2.data.series)
}

//Show the chapters that are available to read
const chapterListChapters = document.querySelector('.chapter-list__chapters');
           
//Get Manga Info
async function getMangaInfo(manga, id) {
  let data;
  try {
    const response = await fetch(`https://manga-scrapper.p.rapidapi.com/series/${id}/chapters/?provider=asura`, options)
    data = await response.json();

    if(data && data.data && data.data.series){
      
    }else{
      console.log('data not currently available')
    }
  } catch (err) {
    console.error(err)
  }

  const mangaDataImageEl = document.querySelector('.manga-data__image-container') || document.createElement('div');
  if (!mangaDataImageEl.classList.contains('manga-data__image-container')) {
    mangaDataImageEl.classList.add('manga-data__image-container');
  }
  mangaDataImageEl.innerHTML = `
              <img src=${manga.MangaCover}  alt=${manga.MangaShortUrl} class="manga-data__image">
              <span>status: ongoing</span>
              <span>type: Manhua</span>
              <span>stars: 4</span>
              `;

  //////////////////////////////Chapter List//////////////////////////////////////////
  let chDataArr = [];
  if(data && data.data &&data.data.series){
    data.data.series.sort((a, b) => a.ChapterOrder - b.ChapterOrder)
      .map((chData) => {
        const {ChapterNumber, ChapterDate,ChapterOrder} = chData;
        const chapterListChapter = document.querySelector(`.chapter-list__chapter[data-chapter="${ChapterOrder}"]`) || document.createElement('div');
        if (!chapterListChapter.classList.contains('chapter-list__chapter')) {
          chapterListChapter.classList.add('chapter-list__chapter');
        }
        chapterListChapter.setAttribute('data-chapter', ChapterOrder);
        chapterListChapter.innerHTML = `
          ${ChapterNumber} <span>${ChapterDate} </span>
        `;
        chDataArr.push(ChapterOrder);
        
        if (!chapterListChapter.hasAttribute('data-event')) {
          chapterListChapter.addEventListener('click', () => showMangaChapters(manga._id, ChapterOrder));
          chapterListChapter.setAttribute('data-event', true);
        }

        if (!chapterListChapters.contains(chapterListChapter)) {
          chapterListChapters.appendChild(chapterListChapter);
        }

      });
  }
              
  /////////////////////////////GET INFO FOR 1ST AND LAST CHAPTER BUTTONS
  const chapterListButtonsEl = document.querySelector('.chapter-list__buttons') || document.createElement('div');
  if (!chapterListButtonsEl.classList.contains('chapter-list__buttons')) {
    chapterListButtonsEl.classList.add('chapter-list__buttons');
    chapterListButtonsEl.innerHTML =`
      <div class="chapter-list__btn firstCh">
        First Chapter
        <p>${data.data.series[0].ChapterNumber}</p>
      </div>
      <div class="chapter-list__btn newCh">
        New Chapter
        <p>${data.data.series[data.data.series.length-1].ChapterNumber}</p>
      </div>           
      `;
    chapterList.prepend(chapterListButtonsEl);
    const firstChapterBtn = document.querySelector('.firstCh');
    const newChapterBtn = document.querySelector('.newCh');
  
    firstChapterBtn.addEventListener('click', () => showMangaChapters(manga._id,data.data.series[0].ChapterOrder));
    newChapterBtn.addEventListener('click', () => showMangaChapters(manga._id,data.data.series[data.data.series.length-1].ChapterOrder));
  }
  
  const mangaDataTextEl = document.createElement('div');
  mangaDataTextEl.classList.add('manga-data__text');
  mangaDataTextEl.innerHTML = `
    <div class="manga-data__title">${manga.MangaTitle}</div>
    <div class="manga-data__synopsis">
      <h3>Synopsis ${manga.MangaTitle}</h3>
      <p>${manga.MangaSynopsis}</p>
      <p>Updated on ${manga.ScrapeDate}</p>
      <p>${getGenres()}</p>
    </div>
  `;
  
  mangaDataContainer.prepend(mangaDataImageEl);
  mangaDataContainer.appendChild(mangaDataTextEl);
  
  mangaDataContainer.classList.remove('display');
  chapterList.classList.remove('display');        
            }


            
            //Get Clicked Chapter then show its info
            function getChapter(data,id,chapters) {
              chapterContainer.innerHTML="";


              
              const chapterTitleEl = document.createElement('div');
              chapterTitleEl.classList.add('chapter-title');
              chapterTitleEl.innerHTML =`${data.data.ChapterTitle}`
              chapterContainer.prepend(chapterTitleEl);
              


              const existingChapterButtonsList = document.querySelector('.chapter-buttons__list');
              if (existingChapterButtonsList) {
                existingChapterButtonsList.remove();
              }
            
              const chapterButtonsList = document.createElement('select');
              chapterButtonsList.classList.add('chapter-buttons__list');
            
              const optionElements = chapters.sort((a, b) => a.ChapterOrder - b.ChapterOrder).map((chapter) => {
                const optionEl = document.createElement('option');
                optionEl.innerHTML = `Chapter ${chapter.ChapterOrder}`;
                optionEl.value = chapter.ChapterOrder;
                return optionEl;
              });
            
              optionElements.forEach((optionEl) => {
                chapterButtonsList.appendChild(optionEl);
              });
            
              chapterButtonsList.addEventListener('change', (event) => {
                const selectedOption = event.target.value;
                showMangaChapters(id,selectedOption)
              });
            
              chapterButtonsContainer.appendChild(chapterButtonsList);
              const chapterButtonsChangeChapter = document.createElement('div');
              chapterButtonsChangeChapter.classList.add('chapter-buttons__change-chapter');
              chapterButtonsChangeChapter.innerHTML=""
              chapterButtonsChangeChapter.innerHTML =`
                <div class="nextCh">Next <i class="fa-solid fa-greater-than"></i></div>
                <div class="prevCh"><i class="fa-solid fa-less-than"></i> Prev</div>
              `;
              chapterButtonsContainer.appendChild(chapterButtonsChangeChapter);
              const nextCh = document.querySelector('.nextCh');
              const prevCh = document.querySelector('.prevCh');

              nextCh.addEventListener('click',()=>showMangaChapters2(id,data.data.ChapterNextSlug))
              prevCh.addEventListener('click',()=>showMangaChapters2(id,data.data.ChapterPrevSlug))
            
              const chapterImagesEl = document.createElement('div');
              chapterImagesEl.classList.add('chapter__images');
            
              // Show images for the chapter
              data.data.ChapterContent.map(image => {
                const imageEl = document.createElement('img');
                imageEl.src = image;
                imageEl.alt = `Chapter image`;
                chapterImagesEl.appendChild(imageEl);
                chapterContainer.appendChild(chapterImagesEl);
              });
            
              chapterButtonsContainer.classList.remove('display');
              mangaDataContainer.classList.add('display');
              chapterList.classList.add('display');
              chapterContainer.classList.remove('display');
              commentSection.classList.remove('display');
              backToTopBtn.classList.remove("display");  
              recContainer.classList.add("display");             
            }
            
            //Button to go back to the top of the page
            const backToTopBtn = document.createElement("div");
            backToTopBtn.classList.add("display")
            backToTopBtn.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
            backToTopBtn.style.position = "fixed";
            backToTopBtn.style.bottom = "100px";
            backToTopBtn.style.right = "20px";
            document.body.appendChild(backToTopBtn);
            backToTopBtn.addEventListener("click", function() {
              window.scrollTo(0, 0);
            });

  // Retrieve comments from local storage
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const commentsContainer = document.getElementById("comments");

  // Display existing comments
  comments.forEach(function(comment) {
    displayComment(comment);
  });

  const addCommentBtn = document.getElementById("addCommentBtn");
  addCommentBtn.addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const newComment = document.getElementById("newComment").value;
    if (!username || !newComment) {
      alert("Please enter a name and a comment.");
      return;
    }
    const comment = {username, newComment};
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    displayComment(comment);
  });


//Button to clear the comments
  const clearCommentsBtn = document.getElementById("clearCommentsBtn");
  clearCommentsBtn.addEventListener("click", function() {
    localStorage.removeItem("comments");
    commentsContainer.innerHTML = "";
  });


//Function to display comments
  function displayComment(comment, replyTo) {
    if (comment.newComment.length > 200) {
      alert("Comment must be less than 200 characters.");
      return;
    }
    const newCommentElement = document.createElement("div");
    newCommentElement.innerHTML = `<b>${comment.username}:</b> ${comment.newComment}`;
    newCommentElement.style.marginLeft = replyTo ? "20px" : "0px";
    newCommentElement.style.fontSize = replyTo ? "0.8em" : "1em";
    newCommentElement.classList.add("comment");
    commentsContainer.appendChild(newCommentElement);
    // ... rest of the code
    const replyBtn = document.createElement("button");
    replyBtn.innerHTML = "Reply";
    replyBtn.style.marginLeft = "10px";
    replyBtn.classList.add("reply-btn");
    replyBtn.addEventListener("click", function() {
      const replyUsername = prompt("Enter your name:");
      const replyText = prompt("Enter your reply:");
      if (replyUsername && replyText) {
        const replyComment = {username: replyUsername, newComment: replyText};
        comments.push({...comment, reply: replyComment});
        localStorage.setItem("comments", JSON.stringify(comments));
        displayComment(replyComment, true);
      }
    });
    newCommentElement.appendChild(replyBtn);
    if (comment.reply) {
      displayComment(comment.reply, true);
    }
  }

  removeItem('comments')

