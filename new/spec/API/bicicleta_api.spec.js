var mongoose = require("mongoose");
var bicicleta = require("../../models/modelo_bici");
var request = require("request");
var server = require("../../bin/www");
const Bicicletas = require("../../models/modelo_bici");
var base_url = "http://localhost:5000/API/bicicletas";


describe('Testing Bicicletas', function () {
    beforeEach(function(done) {
        var mongoDB  = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error: '));
        db.once('open', function () {
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach(function(done) {
        Bicicletas.deleteMany({}, function (err,succes){
            if (err) console.log(err);
            mongoose.disconnect();
            done();
        });
    });

   describe("GET BICICLETAS /", () => {
       it("Status 200", (done) => {
            request.get(base_url, function(err, response, body){
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                //expect(result.Bicicletas.length).toBe(0);
                done();
            })
        });
   });

   
   describe("POST BICICLETAS /create", () => {
        it("Status 200", (done) => {
            var headers = {'content-type' : 'application/json'};
            var aBici = "{'code': 1, 'color': 'Azul', modelo: 'BMX', 'lat': 38.1338, lng: -110.5863}";
            request.post({
                headers: headers,
                url: base_url + "/create",
                body: aBici
            }, function(error,response,body ){
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("Azul");
                expect(bici.ubicacion[0]).toBe(38.1338);
                expect(bici.ubicacion[1]).toBe(-110.5863);
                done();
            });
        
        });
    });

});

