var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

//Pagina de inicio (home)
router.get('/', function(req, res) {
    res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res) {
    res.render('author', {});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);


// Preguntas y respuestas
router.get('/quizes', quizController.index);  // muestra todas las preguntas
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
  


module.exports = router;


