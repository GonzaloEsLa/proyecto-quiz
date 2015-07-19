var models = require('../models/models.js');


// Autoload :id
exports.load = function(req, res, next, quizId) {
  
    models.Quiz.find(quizId).then(
      
      function(quiz) {
              if (quiz) {
                req.quiz = quiz;
                next();
              } else{next(new Error('No existe quizId=' + quizId))}
      }
        
  ).catch(function(error){next(error)});
};






// GET /quizes  y / quizes?searh
exports.index = function(req, res){
 
   //Busqueda de pregunta
   if(req.query.search) {
        
             var filtro  = (req.query.search || '').replace(" ", "%");
            
             models.Quiz.findAll({where:["pregunta like ?", '%'+filtro+'%'],order:'pregunta ASC'}).then(function(quizes){
                   res.render('quizes/index', {quizes: quizes});
             }).catch(function(error) { next(error);});
   
       
   //Mostrar todas las preguntas
   } else {

           models.Quiz.findAll().then(function(quizes){
               res.render('quizes/index', {quizes: quizes});
           }).catch(function(error) { next(error);});
  }
};






// GET /quizes/?search
exports.search= function(req, res) {
   
    var search  = (req.query.search || '').replace(" ", "%");
    
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(
        
        function(quizes_search){
              res.render('quizes/search.ejs', { quizes_search: req.quizes_search});
        }
    );
};




// GET /quizes/:id
exports.show= function(req, res) {
   
    models.Quiz.find(req.params.quizId).then(function(quiz){
              res.render('quizes/show', { quiz: req.quiz});
    });
};



// GET /quizes/answer
exports.answer= function(req, res) {
    
    
    var resultado = "Incorrecto";
            
    if(req.query.respuesta=== req.quiz.respuesta) resultado= "Correcto";
           
     res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado });
        
    
    
    
};

