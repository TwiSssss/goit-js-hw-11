import{a as i,S as c,i as u}from"./assets/vendor-CjMXM2Of.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const p="48857458-08a5976c2d7ede66ca4c44a57",d="https://pixabay.com/api/",f=r=>i.get(d,{params:{key:p,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data.hits).catch(o=>(console.error(o),[]));function y(r){return`
<li class="gallery-item">
    <a class="gallery-link" href="${r.largeImageURL}">
        <img class="gallery-image" src="${r.webformatURL}" alt="${r.tags}" />
        <div class="info">
            <p>
                <b>Likes</b><br>${r.likes}
            </p>
            <p>
                <b>Views</b><br>${r.views}
            </p>
            <p>
                <b>Comments</b><br>${r.comments}
            </p>
            <p>
                <b>Downloads</b><br>${r.downloads}
            </p>
        </div>
    </a>
</li>
`}function h(r){return r.map(y).join("")}let m=new c(".gallery-item a",{captionsData:"alt",captionDelay:250});const n={gallery:document.querySelector(".gallery"),searchBtn:document.querySelector(".search-btn"),searchInput:document.querySelector(".search-input"),loader:document.querySelector(".loader")};n.searchBtn.addEventListener("submit",r=>{r.preventDefault();const o=n.searchInput.value.trim();o&&(n.gallery.innerHTML="",n.searchInput.value="",n.loader.style.display="inline-block",f(o).then(s=>{s.length===0?(u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.gallery.innerHTML=""):(n.gallery.innerHTML=h(s),m.refresh())}).catch(s=>{console.error(s),n.gallery.innerHTML=""}).finally(()=>{n.loader.style.display="none"}))});
//# sourceMappingURL=index.js.map
