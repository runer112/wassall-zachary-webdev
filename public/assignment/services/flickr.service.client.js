(function () {
    angular
        .module("WebAppMaker")
        .factory("flickrService", flickrService);

    var key = "7c8771d455cabc59844a2f2e757856bd";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


    function flickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
