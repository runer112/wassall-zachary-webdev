(function () {
    angular
        .module("WebAppMaker")
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController($rootScope, $routeParams, $location, widgetService, flickrService) {
        $rootScope.title = "Search Flickr";

        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.uid = $routeParams["uid"];
        model.wid = $routeParams["wid"];
        model.pid = $routeParams["pid"];
        model.wgid = $routeParams["wgid"];

        var widget;
        widgetService.findWidgetById(model.wgid)
            .then(function (response) {
                widget = response.data;
            });

        function searchPhotos(searchTerm) {
            flickrService.searchPhotos(searchTerm)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            widget.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            widget.url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService.updateWidget(model.wgid, widget)
                .then(function (response) {
                    $location.url("user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + model.wgid);
                });
        }
    }
})();
