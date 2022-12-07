const container = document.querySelector('.container');
const topNav = document.querySelector('.top-nav');
const bottomNav = document.querySelector('.bottom-nav');

const trendImg = document.getElementById('trendImg');
const trendTitle = document.querySelector('.trending-title');

const trendingA = document.getElementById('trendingA');
const imgRandom = document.querySelectorAll('#imgRandom');
const searchTerm = document.getElementById('search-bar');
const recommendations = document.querySelector('.rec');
const title = document.querySelector('rec-title');
const results = document.querySelector('.results');

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






// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '93ed9305c7msh8bee1838f559b6bp1e62efjsnaa270facb818',
//         'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
//     }
// };

// fetch('https://manga-scrapper.p.rapidapi.com/series/return-of-the-disaster-class-hero/?provider=asura', options)
    // .then(response => response.json())
    // .then(result => {
    //     // console.log(result.data)

    //     //Set the source attribute of MangaCover
    //     trendImg.setAttribute('src', result.data['MangaCover']);

    //     //Set the text to the title of the Manga

    //     trendTitle.textContent = result.data['MangaTitle'];

    //     //Set the href of anchor tag so clicking the image goes to the correct place
    //     trendingA.setAttribute('href', result.data['MangaShortUrl'])
    // }
    // )
    // .catch(error => console.error(error));


const config = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '93ed9305c7msh8bee1838f559b6bp1e62efjsnaa270facb818',
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
    }
 }//; fetch('https://manga-scrapper.p.rapidapi.com/series/?provider=asura&limit=4', config)
    // .then(response => response.json())
    // .then(result => {
    //     const { series: data } = result.data;
    //     console.log(result.data.series[2].MangaCover)
    //     for (element of data) {
    //         if (element['MangaTitle'] === 'Join Our Discord') continue;


    //         imgRandom.forEach(img => {
    //             img.setAttribute('src', result.data.series[2].MangaCover)


    //         });










    //     }




    // })
    // .catch(error => console.error(error))








//Search Function
// getSearch('https://manga-scrapper.p.rapidapi.com/search/solo/?provider=asura', options)

// async function getSearch(url,options){
// const response = await fetch(url)
// const data = await response.json();
// console.log(data)
// // }

const genres = ["Action","Adult","Adventure","Comedy","Cooking","Doujinshi","Drama","Ecchi","Fantasy","Gender bender","Harem","Historical","Horror","Isekai","Josei","Manhua","Manhwa","Martial arts","Mature","Mecha","Medical","Mystery","One shot","Psychological","Romance","School life","Sci fi","Seinen","Shoujo","Shoujo ai","Shounen","Shounen ai","Slice of life","Smut","Sports","Supernatural","Tragedy","Webtoons","Yaoi","Yuri"]

var pickedGenres3 = new Set([genres[Math.trunc(Math.random()*40)],genres[Math.trunc(Math.random()*40)],genres[Math.trunc(Math.random()*40)]])
var pickedGenres5 = new Set([genres[Math.trunc(Math.random()*genres.length)],genres[Math.trunc(Math.random()*genres.length)],genres[Math.trunc(Math.random()*genres.length)]])




const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '93ed9305c7msh8bee1838f559b6bp1e62efjsnaa270facb818',
		'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
	}
};



async function search (){
    const response = await fetch(`https://manga-scrapper.p.rapidapi.com/search/${searchTerm.value}/`, options)
    const data = await response.json()
    .catch(err => console.log(err));
    console.log(data.data.result)
    showResults(data.data.result)   
}   

function showResults(manga){
    // container.classList.toggle('display');
    // results.classList.toggle('display');


    
        manga.forEach((man) => {

        const {MangaCover,MangaShortUrl, MangaSynopsis, MangaTitle, MangaUrl, _id,_type} = man;

        const resultsEl = document.createElement('div');
        resultsEl.classList.add('searchCell');
        resultsEl.innerHTML=`
        <a href="${MangaShortUrl}"><img src="${MangaCover}" width="40px" height="54px"></a>
    <div>
        <p>${MangaTitle}</p>
        <p>${pickedGenres3}</p>
    </div>      
                `
                resultsEl.appendChild(results);
    })
}

searchTerm.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){  
        search();
    }
})
