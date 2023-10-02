const $contentRow = document.querySelector('.content-row');

function getContent(DMA) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=${DMA}&size=30&apikey=aeMvG0zyzdpO1jAkGyCZeGxxQK4vIfpe`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const response = xhr.response._embedded.events;

    for (let i = 0; i < response.length; i++) {
      const $imagesColumnFull = document.createElement('div');
      $imagesColumnFull.setAttribute('class', 'images-column-full');

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
      $date.textContent = response[i].dates.start.localDate;

      for (let j = 0; j < response[i].images.length; j++) {
        const currentImage = response[i].images[j];
        if (currentImage.ratio === '4_3') {
          $image.src = currentImage.url;
          $image.setAttribute('class', 'image');
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
  });
  xhr.send();
}

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
