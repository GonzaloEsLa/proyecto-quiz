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
                   res.render('quizes/index', {quizes: quizes, errors:[]});
             }).catch(function(error) { next(error);});
   
       
   //Mostrar todas las preguntas
   } else {

           models.Quiz.findAll().then(function(quizes){
               res.render('quizes/index', {quizes: quizes, errors:[]});
           }).catch(function(error) { next(error);});
  }
};






// GET /quizes/?search
exports.search= function(req, res) {
   
    var search  = (req.query.search || '').replace(" ", "%");
    
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(
        
        function(quizes_search){
              res.render('quizes/search.ejs', { quizes_search: req.quizes_search, errors:[]});
        }
    );
};





// GET /quizes/:id
exports.show= function(req, res) {
   
    models.Quiz.find(req.params.quizId).then(function(quiz){
              res.render('quizes/show', { quiz: req.quiz, errors:[]});
    });
};




// GET /quizes/answer
exports.answer= function(req, res) {
    
    
    var resultado = "Incorrecto";
            
    if(req.query.respuesta=== req.quiz.respuesta) resultado= "Correcto";
           
     res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors:[] });
        
};




// GET /quizes/new
exports.new= function(req, res) {
    
    
    var quiz = models.Quiz.build({  // cReamos un objeto quiz nuevo
        
        pregunta: "", respuesta: ""
    });
        
  
    res.render('quizes/new', {quiz: quiz, errors:[]});
        
};






// POST /quizes/create
/*exports.create= function(req, res) {
    
    
    var quiz = models.Quiz.build(req.body.quiz);  // creamos un objeto quiz nuevo
    
    
    quiz.validate().then(function(err){
            
            if(err){
                   // si hay error de validacion lo notificamos
                   res.render('quizes/new', {quiz: quiz, errors: err.errors});
            }else{
                
                    // Si no haty errores: Guardar en DB los campos de la pregunta 
                    quiz.save({ fileds: ["pregunta", "respuesta"]}).then(function(){

                          res.redirect('/quizes'); // redireccion http a las preguntas
                    });

            }
     
   });

}*/




// POST /quizes/create
exports.create = function (req, res) {
    
        var quiz= models.Quiz.build(req.body.quiz);

        var errors = quiz.validate();

        if (errors){

            var i=0; var errores=new Array(); //se convierte en [] con la propiedad message por compatibilida con layout
            for (var prop in errors) errores[i++]={message: errors[prop]};
            res.render('quizes/new', {quiz: quiz, errors: errores});

        } else {

            quiz // save: guarda en DB campos pregunta y respuesta de quiz
            .save({fields: ["pregunta", "respuesta"]})
            .then( function(){ res.redirect('/quizes')}) ;
        }

}; 