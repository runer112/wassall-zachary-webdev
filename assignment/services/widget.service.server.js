module.exports = function (app, createGenericService) {
    var widgetService = createGenericService("/api/page/:pid/widget", "/api/widget/:wgid", "wgid", "pid", "pageId", []);
    widgetService.entities = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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
            widgetType: "IMAGE",
            pageId: pid,
            name: req.body.name,
            text: req.body.text,
            url: file ? '/uploads/' + file.filename : req.body.url,
            width: req.body.width,
        };

        widgetService.update(wgid, widget);

        var callbackUrl = "/assignment/#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget";

        res.redirect(callbackUrl);
    }

};
