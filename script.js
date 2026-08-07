let library;


fetch("library.json")
.then(response => response.json())
.then(data => {

    library = data;

    let container = document.getElementById("library");


    Object.keys(library).forEach(manga => {

        let box = document.createElement("div");

        box.className = "manga";


        box.innerHTML = `
            <h2>${manga}</h2>

            <a href="reader.html?manga=${encodeURIComponent(manga)}&chapter=1">
                Start Reading
            </a>
        `;


        container.appendChild(box);

    });

});



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
