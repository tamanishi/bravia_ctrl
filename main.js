const Bravia = require('bravia');
var express = require('express');
var app = express();

// Connects to a Bravia TV at 192.168.10.202:80 with the PSK 0000.
let bravia = new Bravia('192.168.10.202', '80', '0000');

app.get('/:command', function (req, res) {
    bravia.getIRCCCodes()
        .then(commands => {
            if (commands.filter(command => {
                return (command.name === req.params.command);
            }).length === 0) {
                res.status(404).send('N/A');
            } else {
                // Sends an IRCC code signal by name.
                bravia.send(req.params.command);
                res.status(200).send(req.params.command);
            }
        });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});
