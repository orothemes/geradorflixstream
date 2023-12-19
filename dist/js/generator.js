let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');

let types = document.querySelectorAll('input[type=radio][name=type]');

types.forEach(type => {
    type.addEventListener('change', () =>{
        if (type.value == "movie") {
            document.getElementById('season-selector').style.display = "none";
        } else if (type.value == "serie"){
            document.getElementById('season-selector').style.display = "block";
        }
    })
})


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
    let seasonNumber = document.getElementById('numeroTemporada').value;

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=6d9fd0eceda02898513c9454f0b94ccf&language=${languaje}`);
                const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=6d9fd0eceda02898513c9454f0b94ccf&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    const datosTemporada = await respuesta3.json();
                        
                    let tags = '';
    
                    datos.genres.forEach(genre => {
                        if (genre.name != datos.genres[datos.genres.length - 1].name) {
                            tags += `${genre.name} • `
                        } else {
                            tags += datos.genres[datos.genres.length - 1].name
                        }
                    });

                    let creators = '';
    
                    datos.created_by.forEach((creator, i) => {
                        if (i == datos.created_by.length - 1){
                            creators += creator.name
                        } else{
                            creators += `${creator.name}, `

                        }
                    });
    
                       
                    let episodeList = '';
    
                    datosTemporada.episodes.forEach(episode => {
                        let runtime ;
                        if (episode.runtime != null) {
                            runtime = convertMinutes(episode.runtime);
                        } else {
                            runtime = ''
                        }
                        episodeList += `
                        <li>
                            <a href="#!" class="episode"
                                option-1-lang="Sub"
                                option-1-server="Server 1"
                                option-1-url="">

                                <div class="episode__img">
                                    <img src="https://image.tmdb.org/t/p/w300/${episode.still_path}" onerror="this.style='display:none';">
                                    <div class="episode__no-image"><i class="fa-regular fa-circle-play"></i></div>
                                </div>
                                <div class="epsiode__info">
                                    <h4 class="episode__info__title">${episode.episode_number}. ${episode.name}</h4>
                                    <div class="episode__info__duration">${runtime}</div>
                                </div>
                             </a>   
                        </li>
                        `
                    })
    


                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `<option value="${season.season_number}">Season ${season.season_number}</option>
                            `
                        }
                    })
    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Season"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Seasons"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = `
<b class='none the-entry-rate'>${datos.vote_average.toFixed(1)}</b>
<b class='none the-entry-type'>${tags}</b>
<img style="display: none; width: 0" src="https://image.tmdb.org/t/p/w300/${datos.poster_path}"/>

<div class="swiper-slide">
<div class="big_slider_item">
<div class="big_slider_item--bg" style="background: url('https://image.tmdb.org/t/p/w1280/${datos.poster_path}') no-repeat center center / cover;"></div>
<div class="big_slider_item--info max-width">
<h1 class="bs-title">${datos.name}</h1>

<ul class="big_slider_item--info_tags">
<li>${datos.first_air_date.slice(0,4)}</li>
<li>${datos.number_of_seasons + genSeasonsCount}</li>
</ul>
<ul class="big_slider_item--info_category">
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
<li class="big_slider_item--info__rate-numbers">
${datos.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>
</li>
<li><span>(${datos.vote_count})</span></li>
</ul>

<p class="big_slider_item--info_resume">${datos.overview}</p>

<a name='more'></a>
<ul class="big_slider_item--info_buttons">
<li>
<a href="#!" class="btn-play">
<span class="material-symbols-rounded">
play_arrow
</span>
</a>
</li>
<li>
<button class="btn fav-btn" fav-id="${datos.id}">
<span class="material-symbols-rounded">
playlist_add
</span>
ADICIONAR A MINHA LISTA
</button>

<div class="blogger-entry-data" style="display: none;" entry-type="${tags}" entry-bg="https://image.tmdb.org/t/p/w300/${datos.poster_path}" entry-title="${datos.name}"></div>
</li>
</ul>

</div>
</div>
</div>

<div class="max-width season-list" id="allEpList">
<div class="select-season">
<h2>Episódios</h2>
<select name="" id="select-season">
${seasonsOption}
</select>
</div>

<div id="temps">

<ul class="caps-grid animation" id="season-${seasonNumber}">
${episodeList}
</ul>

</div>
</div>


<div class="the-best-player">
<div class="player-bg" style="background: url('https://image.tmdb.org/t/p/w1280/${datos.poster_path}') no-repeat center center / cover;"></div>
<div class="max-width-header">
<div class="header-title-info">
<h1 class="header-title-info_tit">${datos.name}</h1>
<p class="header-title-info_sub"></p>
</div>
<div class="header-actions">
<a href="#allEpList" class="back-episode-list">
<span class="material-symbols-outlined"> format_list_bulleted </span>
<p>Episódios</p>
</a>
<div class="prev-episode">
<span class="material-symbols-outlined"> arrow_back </span>
<p>Anterior</p>
</div>
<div class="next-episode">
<p>Próximo</p>
<span class="material-symbols-outlined"> arrow_forward </span>
</div>
</div>
</div>

<div class="options_grid" id="optionsGrid">
</div>

<div class="iframe-container">
<iframe frameborder="0" src="" scrolling="no" allowfullscreen></iframe>
</div>
</div>

                    `;
                    
                    let seasonOnly = `
                    <ul class="caps-grid hide" id="season-${seasonNumber}">
                    ${episodeList}
                    </ul>
    
    
    
                    `;
    
                    const btnCopiar = document.getElementById('copiar');
    
                    if (seasonNumber == 1) {
                        template.innerText = justHtml;
                    } else if (seasonNumber > 1){
                        template.innerText = seasonOnly;
                    }
    
                    let templateHTML = template.innerText;
                    console.log(justHtml, typeof justHtml)
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
                    genTitle.innerText = datos.name;
                    genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;
                    genYear.innerText = datos.first_air_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('Does not exist');
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
                console.log(datos);


                let tags = '';

                datos.genres.forEach(genre => {
                    if (genre.name != datos.genres[datos.genres.length - 1].name) {
                        tags += `${genre.name} • `
                    } else {
                        tags += datos.genres[datos.genres.length - 1].name
                    }
                });


                    let template = document.getElementById('html-final');

                    let justHtml = `<b class='none the-entry-rate'>${datos.vote_average.toFixed(1)}</b>
<b class='none the-entry-type'>${tags}</b>
<img style="display: none; width: 0" src="https://image.tmdb.org/t/p/w300/${datos.poster_path}"/>                   
                    
                    
<div class="the-best-player">
<div class="player-bg" style="background: url('https://image.tmdb.org/t/p/w300/${datos.poster_path}') no-repeat center center / cover;"></div>
<div class="max-width-header">
<div class="header-title-info">
<h1 class="header-title-info_tit">${datos.title}</h1>
<p class="header-title-info_sub"></p>
</div>
<div class="header-actions">
<a href="#allEpList" class="back-episode-list">
<span class="material-symbols-outlined"> format_list_bulleted </span>
<p>Voltar</p>
</a>
</div>
</div>

<div class="options_grid" id="optionsGrid">
<div class="option-btn option-btn-active" data-link="">OPÇÃO 1</div>
<div class="option-btn" data-link="">OPÇÃO 2</div>
</div>

<div class="iframe-container">
<iframe src="" class="" frameborder="0" allowfullscreen="" ></iframe>
</div>
</div>

<div class="swiper-slide">
<div class="big_slider_item">
<div class="big_slider_item--bg" style="background: url('https://image.tmdb.org/t/p/w300/${datos.poster_path}') no-repeat center top / cover;"></div>
<div class="big_slider_item--info max-width">
<h1 class="bs-title">${datos.title}</h1>

<ul class="big_slider_item--info_tags">
<li>${datos.release_date.slice(0,4)}</li>
<li>${convertMinutes(datos.runtime)}</li>
</ul>
<ul class="big_slider_item--info_category">
<li>${tags}</li>
</ul>

<ul class="big_slider_item--info_rating">
<li class="big_slider_item--info_rating-stars">
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<!-- <i class="fa-solid fa-star-half-stroke"></i> -->
</li>
<li class="big_slider_item--info__rate-numbers">
${datos.vote_average.toFixed(1)} <i class="fa-solid fa-star"></i>
</li>
<span></span>
</ul>

<p class="big_slider_item--info_resume">${datos.overview}</p>


<!-- <h1 class="big_slider_item--info_opt-text">¡New Season!</h1> -->

<ul class="big_slider_item--info_buttons">
<li>
<a href="#!" class="btn-play">
<span class="material-symbols-rounded">
play_arrow
</span>
</a>
</li>
<!-- <li>
<button class="btn">
<span class="material-symbols-rounded">
movie
</span>
Ver trailer
</button>
</li> -->
<li>
<button class="btn fav-btn" fav-id="${datos.id}">
<span class="material-symbols-rounded">
playlist_add
</span>
Adicionar a minha lista
</button>
<div class="blogger-entry-data" style="display: none;" entry-type="${tags}" entry-bg="https://image.tmdb.org/t/p/w300/${datos.poster_path}" entry-title="${datos.title}"></div>

</li>
</ul>

</div>
</div>
</div>`;                  
                    template.innerText = justHtml;
                    let templateHTML = template.innerText;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/w300/${datos.poster_path}`)
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