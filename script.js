//Unsplash API: https://unsplash.com/documentation#location
let count = 5;
//Key can be found here: https://unsplash.com/oauth/applications create a new project
const apiKey = 'Y3K2YuayvN65QMiB7aCxHCeNZvGQVVBJ0BjADaYEKpM';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImage = 0;
let photosArray = [];

// Helper Function to Set Attributes on DOM Elements
function setAttibutes(element, attributes)
{
    for (const key in attributes)
    {
        element.setAttribute(key, attributes[key])
    }
}

//Check if all images have loaded
function imageLoaded()
{
    imagesLoaded++;
    if (imagesLoaded === totalImage)
    {
        ready = true;
        count = 30
    }
}

//Create Elements for Links and Photos, Add to DOM
function displayPhotos()
{
    imagesLoaded = 0;
    totalImage = photosArray.length;
    //Run on each object in photos array
    photosArray.forEach(photo =>
    {
        //Create an <a> anchor element to link to Unsplash
        const item = document.createElement('a');
        setAttibutes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        //Create <img> for photo
        const img = document.createElement('img');
        setAttibutes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Listener, check when each is finshed loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash api
async function getPhotos()
{
    try
    {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
        loader.hidden = true;

    } catch (error)
    {
        //Catch Error Here
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () =>
{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
    }
})

//On Load
getPhotos();