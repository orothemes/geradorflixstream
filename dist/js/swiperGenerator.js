let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');

let types = document.querySelectorAll('input[type=radio][name=type]');




function convertMinutes(minutess){
    let hours = Math.floor(minutess / 60) ,
    minutes = Math.floor(minutess % 60),
    total = '';

    if (minutess < 60){
        total = `${minutes}m`
        return total
    } else if (minutess > 60){
      total = `${hours}h ${minutes}m`
      return total
    } else if (minutess = 60){
        total = `${hours}h`
        return total
    }
}

function generar() {
    let serieKey = document.getElementById('numero').value;
    let languaje = "en-US"

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=6d9fd0eceda02898513c9454f0b94ccf&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    console.log(datos)
                        
                    let tags = '';
    
                    datos.genres.forEach(genre => {
                        if (genre.name != datos.genres[datos.genres.length - 1].name) {
                            tags += `${genre.name}, `
                        } else {
                            tags += datos.genres[datos.genres.length - 1].name
                        }
                    });

    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = ` 
<!-- ${datos.name} -->
<div class='swiper-slide'>
<div class='big_slider_item'>
<div class='big_slider_item--bg' style='background: url(&#39;https://image.tmdb.org/t/p/w780/${datos.backdrop_path}&#39;) no-repeat center center / cover;'/>
<div class='big_slider_item--info max-width'>
<h1 class='bs-title'>${datos.name}</h1>
<ul class='big_slider_item--info_tags'>
<li>${datos.first_air_date.slice(0,4)}</li>
<li>${datos.number_of_seasons + genSeasonsCount}</li>
</ul>
<ul class='big_slider_item--info_category'>
<li>${tags}</li>
</ul>
<ul class="big_slider_item--info_rating">
<li class="big_slider_item--info_rating-stars">
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star-half-stroke"></i>
</li>
<li class="big_slider_item--info__rate-numbers">${datos.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>
</li>
</ul>
<p class='big_slider_item--info_resume'>${datos.overview}</p>
<!--more-->
<ul class='big_slider_item--info_buttons'>
<li>
<a class='btn-play' href=''>
<span class='material-symbols-rounded'>
play_arrow
</span>
</a>
</li>
<li>
<button class='btn fav-btn' fav-id='${datos.id}'>
<span class='material-symbols-rounded'>
playlist_add
</span>
ADICIONAR A MINHA LISTA
</button>
<div class='blogger-entry-data' entry-bg='https://image.tmdb.org/t/p/w780/${datos.backdrop_path}' entry-title='${datos.name}' entry-type='${tags}' style='display: none;'/>
</li>
</ul>
</div>
</div>
</div>

`;
                    
                    
    
                    const btnCopiar = document.getElementById('copiar');
    
                    
                    template.innerText = justHtml;
                   
    
                    let templateHTML = template.innerText;
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(justHtml);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${datos.poster_path}`)
                    genTitle.innerText = datos.name;
                    genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;
                    genYear.innerText = datos.first_air_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }
        } else
        if(isMovie.checked){
            try {

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=6d9fd0eceda02898513c9454f0b94ccf&language=${languaje}`);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                let tags = '';

                datos.genres.forEach(genre => {
                    if (genre.name != datos.genres[datos.genres.length - 1].name) {
                        tags += `${genre.name}, `
                    } else {
                        tags += datos.genres[datos.genres.length - 1].name
                    }
                });

               
            
                    let template = document.getElementById('html-final');

                    let justHtml = `
<!-- ${datos.title} -->
<div class='swiper-slide'>
<div class='big_slider_item'>
<div class='big_slider_item--bg' style='background: url(&#39;https://image.tmdb.org/t/p/w780/${datos.backdrop_path}&#39;) no-repeat center center / cover;'/>
<div class='big_slider_item--info max-width'>
<h1 class='bs-title'>${datos.title}</h1>
<ul class='big_slider_item--info_tags'>
<li>${convertMinutes(datos.runtime)} &#x2022; ${datos.release_date.slice(0,4)}</li>
</ul>
<ul class='big_slider_item--info_category'>
<li>${tags}</li>
</ul>
<ul class="big_slider_item--info_rating">
<li class="big_slider_item--info_rating-stars">
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star-half-stroke"></i>
</li>
<li class="big_slider_item--info__rate-numbers">${datos.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>
</li>
</ul>
<p class='big_slider_item--info_resume'>${datos.overview}</p>
<!--more-->
<ul class='big_slider_item--info_buttons'>
<li>
<a class='btn-play' href=''>
<span class='material-symbols-rounded'>
play_arrow
</span>
</a>
</li>
<li>
<button class='btn fav-btn' fav-id='${datos.id}'>
<span class='material-symbols-rounded'>
playlist_add
</span>
ADICIONAR A MINHA LISTA
</button>
<div class='blogger-entry-data' entry-bg='https://image.tmdb.org/t/p/w780/${datos.backdrop_path}' entry-title='${datos.title}' entry-type='${tags}' style='display: none;'/>
</li>
</ul>
</div>
</div>
</div>

`;                  
                    template.innerText = justHtml;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(justHtml);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w500/${datos.poster_path}`)
                    genTitle.innerText = datos.title;
                    genSeasons.innerText = "";
                    genYear.innerText = datos.release_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }           
        }

    }

    cargarPeliculas();
}

generar();



