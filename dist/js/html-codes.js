let x = document.getElementById("snackbar");

let menuItemBtn  = document.getElementById('menuItem'),
    menuItem = `<li><a href='#!'>
    <span class='material-symbols-outlined'/>
    <span>NOME MENU AQUI</span></a></li>`;


let searchCode  = document.getElementById('searchCodeBtn'),
    searchCodeBtn= `<div class="max-width search-section">

    <div class="search-box">
        <form action='/search' autocomplete='off' class='bs-search' id='searchbox' method='get'>
            <input autocomplete='off' id='bs-search' name='q' placeholder='Digite a sua busca aqui...' type='text'/>
            <input name='max-results' type='hidden' value='28'/>
        </form>
    </div>
    
    <h1 style="margin-top: 16px">Explorar por Categorias</h1>
    
    <div class="categories-grid">

    <!-- Code Image Here -->
      
    
    </div>
    
    </div>
  
`;

let searchCodeImg  = document.getElementById('searchCodeImgBtn'),
    searchCodeImgBtn= `<a href="#!" class="swiper-slide banner-card banner-card-tags">
    <img src="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/uAjMQlbPkVHmUahhCouANlHSDW2.jpg"/>
    <div class="banner-card--info">
        <span>THRILLER</span>
    </div>
</a>
  
`;



function toast() {
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function copyCode(item, itemCode) {
    item.addEventListener('click', () => {
        navigator.clipboard.writeText(itemCode);
        toast();
    })
}

copyCode(menuItemBtn, menuItem);
copyCode(searchCode, searchCodeBtn);
copyCode(searchCodeImg, searchCodeImgBtn);

