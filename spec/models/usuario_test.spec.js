var mongoose = require("mongoose");
var Bicicleta = require("../../models/modelo_bici");
var Usuario = require("../../models/usuario");
var Reserva = require("../../models/reserva");


describe("Testing Usuarios", function () {
    beforeEach(function(done) {
        var mongoDB  = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error: '));
        db.once('open', function () {
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach(function(done) {
        Reserva.deleteMany({}, function (err, succes){
            if (err) console.log(err);
            Usuario.deleteMany({},function (err,succes) {
                if (err) console.log(err);
                Bicicleta.deleteMany({},function (err, succes) {
                    if (err) console.log(err); done();
                })
            })
        });
    });

    describe('Cuando un Usuario reserva una bici', () => {
        it('desde existir la reserva', (done) => {
            const usuario = new Usuario({nombre: 'Ezequiel'});
            usuario.save();
            const bicicleta = new Bicicleta({code: 1, color: "Verde", modelo: "BMX"});
            bicicleta.save();

            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate + 1);
            usuario.reservar(Bicicleta.id, hoy, mañana, function(err, reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                    console.log(err);
                    expect(reservas.length).toBe(1);
                    //expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].Bicicleta.code).toBe(1);
                    //expect(reservas[0].Bicicleta.code).toBe(1);
                   // expect(reservas[0].usuario.code).toBe(usuario.nombre);
                    done();
                })
            })
        })
    })
})