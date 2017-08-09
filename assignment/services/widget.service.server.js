var createGenericService = require("./generic.service.server");
var widgetModel = require("../model/widget/widget.model.server.js");

module.exports = function (app, pageService, deleteChildrenByFkSupplier) {
    var widgetService = createGenericService(app, "/api/page/:pid/widget", "/api/widget/:wgid", "wgid", "pid", widgetModel, pageService, "_page", null, deleteChildrenByFkSupplier);
    // var widgets = [
    //     { "_id": "123", "type": "HEADING", "_page": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "type": "HEADING", "_page": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "type": "IMAGE", "_page": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "type": "HTML", "_page": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "type": "HEADING", "_page": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "type": "YOUTUBE", "_page": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "type": "HTML", "_page": "321", "text": "<p>Lorem ipsum</p>"}
    // ];

    // image upload
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('file'), uploadImage);

    return widgetService;

    // image upload
    function uploadImage(req, res) {
        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;
        var wgid = req.body.wgid;

        var file = req.file;

        var widget = {
            type: "IMAGE",
            _page: pid,
            name: req.body.name,
            text: req.body.text,
            url: file ? '/uploads/' + file.filename : req.body.url,
            width: req.body.width,
        };

        widgetService.update(wgid, widget)
            .then(function () {
                var callbackUrl = "/assignment/#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget";
                res.redirect(callbackUrl);
            });
    }

};
