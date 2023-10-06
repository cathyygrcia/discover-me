const $contentRow = document.querySelector('.content-row');
const $genreButton = document.querySelector('.genre');
const $artistButton = document.querySelector('.artist');
const $search = document.querySelector('.search');
const $homePage = document.querySelector('[data-view = "home"]');
const $artistInfo = document.querySelector('[data-view = "artist-info"]');
const $aristNameRow = document.querySelector('.artist-name-row');
const $artistInfoText = document.querySelector('.artist-info-text');
const $discoverMeText = document.querySelector('.discover-me-text');

function renderContent(response) {
  $contentRow.textContent = '';
  for (let i = 0; i < response.length; i++) {
    const $imagesColumnFull = document.createElement('div');
    $imagesColumnFull.setAttribute('class', 'images-column-full');
    const id = response[i]._embedded.attractions[0].id;
    $imagesColumnFull.setAttribute('data-artist-id', id);

    const $imageWrapper = document.createElement('div');
    $imageWrapper.setAttribute('class', 'image-wrapper');

    const $image = document.createElement('img');

    const $titleRow = document.createElement('div');
    $titleRow.setAttribute('class', 'title-row');

    const $titleColumnHalf = document.createElement('div');
    $titleColumnHalf.setAttribute('class', 'title-column-half');

    const $iconColumnHalf = document.createElement('div');
    $iconColumnHalf.setAttribute('class', 'title-column-half');

    const $title = document.createElement('p');
    $title.textContent = response[i].name;
    $title.setAttribute('class', 'title');

    const $icon = document.createElement('i');
    $icon.setAttribute('class', 'far fa-heart');

    const $venue = document.createElement('p');
    $venue.textContent = response[i]._embedded.venues[0].name;

    const $date = document.createElement('p');
    const formattedDate = formatDate(response[i].dates.start.localDate);
    $date.textContent = `${formattedDate}`;

    for (let j = 0; j < response[i].images.length; j++) {
      const currentImage = response[i].images[j];
      if (currentImage.ratio === '4_3') {
        $image.src = currentImage.url;
        $image.setAttribute('class', 'image');
        $image.setAttribute('alt', 'artist-image');
      }
    }
    $contentRow.appendChild($imagesColumnFull);
    $imagesColumnFull.appendChild($imageWrapper);
    $imageWrapper.appendChild($image);
    $imagesColumnFull.appendChild($titleRow);
    $imagesColumnFull.appendChild($venue);
    $imagesColumnFull.appendChild($date);
    $titleRow.appendChild($titleColumnHalf);
    $titleRow.appendChild($iconColumnHalf);
    $titleColumnHalf.appendChild($title);
    $iconColumnHalf.appendChild($icon);
  }
}
function showSearchBar() {
  $search.classList.remove('hidden');
}

function formatDate(inputDate) {
  const parts = inputDate.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return `${month}/${day}/${year}`;
}

function getContent(DMA) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${DMA}&size=30&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    renderContent(xhr.response._embedded.events);

  });
  xhr.send();
}

$genreButton.addEventListener('click', function (event) {
  showSearchBar();
  $genreButton.classList.add('green');
  $artistButton.classList.remove('green');
  $search.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
      const searchValue = event.target.value;
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${searchValue}&size=30&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`
      );
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {

        renderContent(xhr.response._embedded.events);
      });
      xhr.send();
    }
  });
});

$artistButton.addEventListener('click', function (event) {
  showSearchBar();
  $genreButton.classList.remove('green');
  $artistButton.classList.add('green');
  $search.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const xhr = new XMLHttpRequest();
      const searchValue = event.target.value;
      xhr.open(
        'GET',
        `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${searchValue}&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`
      );
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        const response = xhr.response._embedded.attractions;

        $contentRow.textContent = '';

        for (let i = 0; i < response.length; i++) {
          const $imagesColumnFull = document.createElement('div');
          $imagesColumnFull.setAttribute('class', 'images-column-full');

          const id = response[i].id;
          $imagesColumnFull.setAttribute('data-artist-id', id);

          const $imageWrapper = document.createElement('div');
          $imageWrapper.setAttribute('class', 'image-wrapper');

          const $image = document.createElement('img');

          const $titleRow = document.createElement('div');
          $titleRow.setAttribute('class', 'title-row');

          const $titleColumnHalf = document.createElement('div');
          $titleColumnHalf.setAttribute('class', 'title-column-half');

          const $iconColumnHalf = document.createElement('div');
          $iconColumnHalf.setAttribute('class', 'title-column-half');

          const $title = document.createElement('p');
          $title.textContent = response[i].name;
          $title.setAttribute('class', 'title');

          const $icon = document.createElement('i');
          $icon.setAttribute('class', 'far fa-heart');

          for (let j = 0; j < response[i].images.length; j++) {
            const currentImage = response[i].images[j];
            if (currentImage.ratio === '4_3') {
              $image.src = currentImage.url;
              $image.setAttribute('class', 'image');
              $image.setAttribute('alt', 'artist-image');
            }
          }
          $contentRow.appendChild($imagesColumnFull);
          $imagesColumnFull.appendChild($imageWrapper);
          $imageWrapper.appendChild($image);
          $imagesColumnFull.appendChild($titleRow);
          $titleRow.appendChild($titleColumnHalf);
          $titleRow.appendChild($iconColumnHalf);
          $titleColumnHalf.appendChild($title);
          $iconColumnHalf.appendChild($icon);
        }
      });
      xhr.send();
    }
  });
});

const dmaArray = [
  '324',
  '222',
  '228',
  '300',
  '264',
  '345',
  '354',
  '368',
  '372',
  '378',
  '380',
  '381',
  '382',
  '383',
  '385'
];

const randomIndex = Math.floor(Math.random() * dmaArray.length);
const randomDMA = dmaArray[randomIndex];
getContent(randomDMA);

function viewSwap(view) {
  if (view === 'artist-info') {
    $homePage.classList.add('hidden');
    $artistInfo.classList.remove('hidden');
    $artistInfoText.classList.remove('hide-text');
    $discoverMeText.classList.add('hide-text');
  } else {
    $homePage.classList.remove('hidden');
    $artistInfo.classList.add('hidden');
  }
}

$contentRow.addEventListener('click', function (event) {
  if (event.target.className === 'title' || event.target.tagName === 'IMG') {
    viewSwap('artist-info');
    const closestId = event.target.closest('.images-column-full').getAttribute('data-artist-id');

    const xhr = new XMLHttpRequest();

    xhr.open(
      'GET',
      `https://app.ticketmaster.com/discovery/v2/attractions/${closestId}.json?apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`
    );
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      const $artistName = document.createElement('h1');
      $artistName.textContent = xhr.response.name;
      $artistName.setAttribute('class', 'artist-name');

      const $testRow = document.createElement('div');
      $testRow.setAttribute('class', 'test-row');

      const $socialImageWrapper = document.createElement('div');
      $socialImageWrapper.setAttribute('class', 'socials-image-wrapper');

      const $image = document.createElement('img');

      const $genreName = document.createElement('h1');
      $genreName.textContent = 'Genre: ' + xhr.response.classifications[0].genre.name;
      $genreName.setAttribute('class', 'genre-name');

      const $socialsContainer = document.createElement('div');
      $socialsContainer.setAttribute('class', 'socials-container');

      const $instaLink = document.createElement('a');
      $instaLink.textContent = 'Instagram';
      $instaLink.setAttribute('class', 'socials-link-styling');
      $instaLink.setAttribute(
        'href',
        xhr.response.externalLinks.instagram[0].url
      );

      const $spotifyLink = document.createElement('a');
      $spotifyLink.textContent = 'Spotify';
      $spotifyLink.setAttribute('class', 'socials-link-styling');
      $spotifyLink.setAttribute(
        'href',
        xhr.response.externalLinks.spotify[0].url
      );

      const $youtubeLink = document.createElement('a');
      $youtubeLink.textContent = 'Youtube';
      $youtubeLink.setAttribute('class', 'socials-link-styling');
      $youtubeLink.setAttribute(
        'href',
        xhr.response.externalLinks.youtube[0].url
      );

      const $eventsLink = document.createElement('a');
      $eventsLink.textContent = 'Events';
      $eventsLink.setAttribute('class', 'socials-link-styling');
      $eventsLink.setAttribute(
        'href',
        xhr.response.url
      );

      for (let j = 0; j < xhr.response.images.length; j++) {
        const currentImage = xhr.response.images[j];
        if (currentImage.ratio === '4_3') {
          $image.src = currentImage.url;
          $image.setAttribute('class', 'image');
          $image.setAttribute('alt', 'artist-image');
        }
      }

      $aristNameRow.appendChild($testRow);
      $socialImageWrapper.appendChild($artistName);
      $testRow.appendChild($socialImageWrapper);
      $socialImageWrapper.appendChild($image);
      $socialImageWrapper.appendChild($genreName);
      $socialImageWrapper.appendChild($instaLink);
      $socialImageWrapper.appendChild($spotifyLink);
      $socialImageWrapper.appendChild($youtubeLink);
      $socialImageWrapper.appendChild($eventsLink);
    });
    xhr.send();
  }
});
