export function photoTemplate(image) {
    return `
<li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
        <div class="info">
            <p>
                <b>Likes</b><br>${image.likes}
            </p>
            <p>
                <b>Views</b><br>${image.views}
            </p>
            <p>
                <b>Comments</b><br>${image.comments}
            </p>
            <p>
                <b>Downloads</b><br>${image.downloads}
            </p>
        </div>
    </a>
</li>
`;
}
export function photosTemplate(images) {
    return images.map(photoTemplate).join("");
}
