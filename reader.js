const IMAGE_HOST = "https://pub-1a1df4914e3e45ac98f3c294515cbbb1.r2.dev";
let manga;
let chapter;

let library;


const params = new URLSearchParams(window.location.search);

manga = params.get("manga");
chapter = Number(params.get("chapter"));



fetch("library.json")
.then(r => r.json())
.then(data => {

    library = data;

    loadReader();

});



function loadReader(){

    document.getElementById("title").innerText =
        manga + " - Chapter " + chapter;


    let chapters =
        library[manga].chapters;


    let select =
        document.getElementById("chapterSelect");


    select.innerHTML="";


    Object.keys(chapters)
    .sort((a,b)=>a-b)
    .forEach(c=>{

        let option=document.createElement("option");

        option.value=c;
        option.text=c;

        if(Number(c)==chapter)
            option.selected=true;


        select.appendChild(option);

    });


    select.onchange=function(){

        location.href =
        `reader.html?manga=${encodeURIComponent(manga)}&chapter=${this.value}`;

    };


    let pages=document.getElementById("pages");

    pages.innerHTML="";


    let count =
    chapters[chapter].pages;



    for(let i=0;i<=count;i++){

        let img=document.createElement("img");


        let chapterFolder = `chapter ${chapter}`;
        
        img.src = `${IMAGE_HOST}/manga/${manga}/chapter ${chapter}/image${String(i).padStart(3,"0")}.webp`;
        console.log(img.src);

        pages.appendChild(img);

    }

}



function previousChapter(){

    if(chapter>1){

        location.href =
        `reader.html?manga=${encodeURIComponent(manga)}&chapter=${chapter-1}`;

    }

}



function nextChapter(){

    let max =
    Object.keys(library[manga].chapters).length;


    if(chapter < max){

        location.href =
        `reader.html?manga=${encodeURIComponent(manga)}&chapter=${chapter+1}`;

    }

}



const themeButton =
document.getElementById("themeButton");


function setTheme(){

    if(localStorage.theme=="light"){

        document.body.classList.add("light");

    }

}


setTheme();



themeButton.onclick=function(){

    document.body.classList.toggle("light");


    if(document.body.classList.contains("light"))

        localStorage.theme="light";

    else

        localStorage.theme="dark";

};


// =========================================
// MOBILE PAGE TAP NAVIGATION
// =========================================

const mobileLeftZone =
    document.getElementById("mobileLeftZone");

const mobileRightZone =
    document.getElementById("mobileRightZone");


if (mobileLeftZone && mobileRightZone) {

    mobileLeftZone.addEventListener("click", () => {

        // Find all currently loaded pages
        const pages =
            document.querySelectorAll("#pages img");

        if (pages.length === 0) return;

        /*
         * Determine which page is currently
         * closest to the middle of the screen.
         */

        let currentPage = 0;
        let smallestDistance = Infinity;

        const screenMiddle =
            window.innerHeight / 2;

        pages.forEach((page, index) => {

            const rect =
                page.getBoundingClientRect();

            const pageMiddle =
                rect.top + rect.height / 2;

            const distance =
                Math.abs(pageMiddle - screenMiddle);

            if (distance < smallestDistance) {

                smallestDistance = distance;
                currentPage = index;

            }

        });


        if (currentPage > 0) {

            pages[currentPage - 1].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });


    mobileRightZone.addEventListener("click", () => {

        const pages =
            document.querySelectorAll("#pages img");

        if (pages.length === 0) return;


        let currentPage = 0;
        let smallestDistance = Infinity;

        const screenMiddle =
            window.innerHeight / 2;


        pages.forEach((page, index) => {

            const rect =
                page.getBoundingClientRect();

            const pageMiddle =
                rect.top + rect.height / 2;

            const distance =
                Math.abs(pageMiddle - screenMiddle);

            if (distance < smallestDistance) {

                smallestDistance = distance;
                currentPage = index;

            }

        });


        if (currentPage < pages.length - 1) {

            pages[currentPage + 1].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    });

}
