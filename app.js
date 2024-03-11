const express = require('express');
const app = express();

// Middleware personnalisé pour vérifier l'heure de la requête
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('L\'application est disponible uniquement pendant les heures de travail.');
  }
};

// Utilisation du middleware pour toutes les routes
app.use(checkWorkingHours);

// Middleware pour servir des fichiers statiques (CSS)
app.use(express.static('public'));

// Configuration du moteur de template (optionnel)
app.set('view engine', 'ejs'); // Vous pouvez utiliser n'importe quel moteur de template

// Itinéraires pour les différentes pages
app.get('/', (req, res) => {
  res.render('accueil'); // Utilisez le moteur de template pour rendre la page d'accueil
});

app.get('/services', (req, res) => {
  res.render('services'); // Utilisez le moteur de template pour rendre la page des services
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Utilisez le moteur de template pour rendre la page de contact
});

// Port d'écoute
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
