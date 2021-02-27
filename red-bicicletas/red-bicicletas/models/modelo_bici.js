var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    Ubicacion: {
        type: [Number], index: {type: '2dsphere', sparse: true}
    }
});

bicicletaSchema.statics.createInstance = function (code,color,modelo,Ubicacion) {
    return new  this({
        code: code,
        color: color,
        modelo: modelo,
        Ubicacion: Ubicacion
    })
}

bicicletaSchema.methods.toString = function () {
    return `code:   ${this.code}   | color:  ${this.color}`
}


bicicletaSchema.statics.allBicis = function(cb){
    return this.find({},cb);
}

bicicletaSchema.statics.add = function (aBici, cb) {
    this.create(aBici,cb);
}

bicicletaSchema.statics.findByCode = function (aBici, cb) {
    this.findOne({code: aBici}, cb)
}

bicicletaSchema.statics.removeByCode = function (aBici, cb) {
    this.deleteOne({code: aBici} ,cb);
}

module.exports = mongoose.model('Bicicletas', bicicletaSchema);

