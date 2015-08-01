//Definicion del modelo de quiz

module.exports = function(sequelize, DataTypes){
    
        return sequelize.define('Quiz', {
    
            pregunta:{ 
                      type: DataTypes.STRING,
                      validate:{ notEmpty: { msg: "Debes introducir una pregunta (campo obligatorio)" }}
            },                                         
            respuesta:{ 
                      type: DataTypes.STRING,
                      validate:{ notEmpty: { msg: "Debes introducir una respuesta (campo obligatorio)" }}
            }
        
        });

                           
};