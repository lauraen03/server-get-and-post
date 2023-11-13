const express = require('express');
const Joi = require('joi');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const data = [
    {
      id: 1,
      title: 'The Last of Us',
      genre: 'Action-Adventure',
      releaseYear: 2013,
      platform: 'PlayStation',
      characters: ['Joel', 'Ellie'],
      imageUrl: 'tlou-image.png',
      description: 'Embark on an emotional journey through a post-apocalyptic world.',
      trailerUrl: 'https://www.youtube.com/watch?v=W2Wnvvj33Wo',
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2',
      genre: 'Action',
      releaseYear: 2018,
      platform: 'PlayStation, Xbox, PC',
      characters: ['Arthur Morgan', 'John Marston'],
      imageUrl: 'red-dead-redemption.png',
      description: 'Immerse yourself in the expansive and immersive Wild West world.',
      trailerUrl: 'https://www.youtube.com/watch?v=eaW0tYpxyp0',
    },
    {
        id: 3,
        title: 'World of Warcraft',
        genre: 'MMORPG',
        releaseYear: 2004,
        platform: 'PC',
        characters: ['Arthas Menethil', 'Sylvanas Windrunner'],
        imageUrl: 'world-of-warcraft-image.jpg',
        description: 'Enter the epic fantasy world of Azeroth and join the Horde or the Alliance.',
        trailerUrl: 'https://www.youtube.com/watch?v=jSJr3dXZfcg',
      },
    {
      id: 4,
      title: "Assassin's Creed Valhalla",
      genre: 'Action RPG',
      releaseYear: 2020,
      platform: 'PlayStation, Xbox, PC',
      characters: ['Eivor', 'Sigurd'],
      imageUrl: 'assassins-creed.jpg',
      description: 'Experience the Viking age as you raid and conquer new territories.',
      trailerUrl: 'https://www.youtube.com/watch?v=ND5DUrN_ZLw',
    },
    {
      id: 5,
      title: 'God of War',
      genre: 'Action-Adventure',
      releaseYear: 2018,
      platform: 'PlayStation',
      characters: ['Kratos', 'Atreus'],
      imageUrl: 'god-of-war.png',
      description: 'Join Kratos and Atreus on a mythological journey in the world of gods and monsters.',
      trailerUrl: 'https://www.youtube.com/watch?v=CJ_GCPaKywg',
    },
    {
      id: 6,
      title: 'The Witcher 3: Wild Hunt',
      genre: 'Action RPG',
      releaseYear: 2015,
      platform: 'PlayStation, Xbox, PC',
      characters: ['Geralt of Rivia', 'Ciri'],
      imageUrl: 'the-witcher.png',
      description: 'Hunt monsters, explore a vast open world, and make impactful choices in this fantasy RPG.',
      trailerUrl: 'https://www.youtube.com/watch?v=c0i88t0Kacs',
    },
   
  ];


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const itemSchema = Joi.object({
  
});

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.post('/api/add-item', upload.single('file'), async (req, res) => {
  try {
   
    const validatedData = await itemSchema.validateAsync(req.body);

 
    data.push(validatedData);


    res.status(200).send('Item added successfully');
  } catch (error) {
  
    res.status(400).send('Error adding item');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});