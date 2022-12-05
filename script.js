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

const trendImg = document.getElementById('trendImg');
const trendTitle = document.querySelector('.trending-title');

const trendingA = document.getElementById('trendingA');
const imgRandom = document.querySelectorAll('#imgRandom');




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '93ed9305c7msh8bee1838f559b6bp1e62efjsnaa270facb818',
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
    }
};

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


const recommendations = document.querySelector('.rec');
const title = document.querySelector('rec-title');


