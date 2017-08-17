module.exports = function () {
    var categories = [
        { abbrev: "73", name: "TI-73" },
        { abbrev: "80", name: "TI-80" },
        { abbrev: "81", name: "TI-81" },
        { abbrev: "82", name: "TI-82" },
        { abbrev: "83", name: "TI-83" },
        { abbrev: "83plus", name: "TI-83+" },
        { abbrev: "84plus", name: "TI-84+" },
        { abbrev: "84plusce", name: "TI-84+CE" },
        { abbrev: "84pluscse", name: "TI-84+CSE" },
        { abbrev: "85", name: "TI-85" },
        { abbrev: "86", name: "TI-86" },
        { abbrev: "89", name: "TI-89" },
        { abbrev: "92", name: "TI-92" },
        { abbrev: "92plus", name: "TI-92+" },
        { abbrev: "amiga", name: "Amiga" },
        { abbrev: "ataru", name: "Atari" },
        { abbrev: "beos", name: "BeOS" },
        { abbrev: "dos", name: "DOS" },
        { abbrev: "mac", name: "Mac" },
        { abbrev: "miscellaneous", name: "Misc" },
        { abbrev: "msx", name: "MSX" },
        { abbrev: "nspire", name: "TI-Nspire" },
        { abbrev: "text", name: "Info" },
        { abbrev: "unix", name: "Unix" },
        { abbrev: "v200", name: "Voyage 200" },
        { abbrev: "web", name: "Web" },
        { abbrev: "win", name: "Windows" },
    ];

    var api = {
        findByAbbrev: findByAbbrev
    };

    return api;

    function findByAbbrev(abbrev) {
        return categories.find(function (category) {
            return category.abbrev === abbrev;
        });
    }
};
