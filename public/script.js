document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/data');
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayData(data) {
  const appDiv = document.getElementById('app');

  appDiv.innerHTML = '';

  data.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    itemDiv.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.title}" />
      <h2>${item.title}</h2>
      <p>${item.genre}</p>
      <p>${item.releaseYear}</p>
      <p>${item.platform}</p>
      <p>
        Characters: 
        <span class="character-list">${item.characters.join(', ')}</span>
      </p>
      <p>Description: ${item.description}</p>
      <a href="${item.trailerUrl}" target="_blank">Watch Trailer</a>
    `;

    appDiv.appendChild(itemDiv);

    // Add event listener to character list within the itemDiv
    const characterList = itemDiv.querySelector('.character-list');
    characterList.addEventListener('click', () => showCharacterImages(item.title, item.characters));
  });
}

function showCharacterImages(game, characters) {
  const modal = document.createElement('div');
  modal.className = 'modal';

  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';

  modal.appendChild(closeButton);

  const characterImagesContainer = document.createElement('div');
  characterImagesContainer.className = 'character-images-container';

  characters.forEach(character => {
    const characterImage = document.createElement('img');
    characterImage.src = getCharacterImageUrl(game, character);
    characterImage.alt = character;
    characterImagesContainer.appendChild(characterImage);
  });

  modal.appendChild(characterImagesContainer);
  document.body.appendChild(modal);

  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}


function getCharacterImageUrl(game, character) {
  const characterImages = {
    'Red Dead Redemption 2': {
      'Arthur Morgan': 'arthur-morgan.jpg',
      'John Marston': 'john-marston.jpg',
     
    },
    'The Last of Us': {
      'Joel': 'joel-miller.jpg',
      'Ellie': 'ellie-image.jpg',
      
    },
    'World of Warcraft': {
      'Arthas Menethil': 'arthus-image.jpg',
      'Sylvanus Windrunner': 'sylvanus-image.jpg',
    
    },
    'Assassin\'s Creed Valhalla': {
      'Eivor': 'eivor.jpg',
      'Sigurd': 'sigurd.jpg',
    
    },
    'God of War': {
      'Kratos': 'krados.jpg',
      'Atreus': 'atreus.jpg',
     
    },
    'The Witcher 3: Wild Hunt': {
      'Geralt of Rivia': 'geralt-rivia.jpg',
      'Ciri': 'ciri.jpg',
     
    },
    // Add more games as needed
  };

  const imageUrl = characterImages[game]?.[character];

  if (!imageUrl) {
    console.error(`Image not found for ${character} in ${game}`);
    return 'default.jpg'; // Default image if character image is not found
  }

  return imageUrl;
}



function toggleForm() {
  const form = document.getElementById('addItemForm');

  // Toggle the form's visibility
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function addItem() {
  const title = document.getElementById('title').value;
  const genre = document.getElementById('genre').value;
  const releaseYear = document.getElementById('releaseYear').value;
  const platform = document.getElementById('platform').value;
  const characters = document.getElementById('characters').value.split(',').map(char => char.trim());
  const imageUrl = document.getElementById('imageUrl').value;

  try {
    const response = await fetch('http://localhost:3000/api/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Date.now(), // Using timestamp as a simple unique ID
        title,
        genre,
        releaseYear,
        platform,
        characters,
        imageUrl,
      }),
    });

    const result = await response.text();

    // Display success or error message
    displayMessage(result);
    
    // Refresh the data after adding an item
    fetchData();
  } catch (error) {
    console.error('Error adding item:', error);
  }
}

function displayMessage(message) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;

  // Show the message for 3 seconds
  setTimeout(() => {
    messageDiv.textContent = '';
  }, 3000);
}
