var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');



//Pagina de inicio (home)
router.get('/', function(req, res) {
    res.render('index', { title: 'Quiz' });
});

//Pagina de creditos
router.get('/author', function(req, res) {
    res.render('author', {});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);


// Rutas Preguntas y respuestas
router.get('/quizes', quizController.index);  // muestra todas las preguntas y  busqueda de preguntas
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//Crear preguntas
router.get('/quizes/new', quizController.new); 
router.post('/quizes/create', quizController.create); 
  


module.exports = router;


