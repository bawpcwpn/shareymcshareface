'use strict';

/*
    Sharey
    Thomas Huxley 2016
 */

/**
 * Initialise Facebook sharing
 * @return {undefined}
 */

var initFacebookShare = function initFacebookShare() {};

/**
 * Initialise Twitter sharing
 * @return {undefined}
 */

var initTwitterShare = function initTwitterShare() {};

/**
 * Initialise Email sharing
 * @return {undefined}
 */

var initEmailShare = function initEmailShare() {};

/**
 * Initialise LinkedIn sharing
 * @return {undefined}
 */

var initLinkedInShare = function initLinkedInShare() {};

/**
 *  Initialises share on individual items once hovered
 *  @param {string} shareType - the type of share item, eg. facebook, twitter, linkedin etc
 *  @return {undefined}
 */
var initShareItem = function initShareItem(shareType) {

    // Check which shareType it matches and initialise each
    // share item individually, only once it's been hovered
    switch (shareType) {
        // Facebook share type
        case 'facebook':
            initFacebookShare();
            break;
        // Twitter share type
        case 'twitter':
            initTwitterShare();
            break;
        // LinkedIn share type
        case 'linkedin':
            initLinkedInShare();
            break;
        // Email share type
        case 'email':
            initEmailShare();
            break;
    }
};

/**
 *  Initialises share on 'sharey_' items
 *  @return {undefined}
 */
var initShare = function initShare() {

    // get nodeList ($shareNode) of span's starting with 'sharey_' class and turn
    // it into a an array ($shareItems)
    var $shareNode = document.querySelectorAll('span[class^="sharey_"]'),
        $shareItems = Array.from($shareNode);

    // Iterate over $shareItems
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var $shareItem = _step.value;


            // Grab the classList
            // set shareType
            var classList = $shareItem.classList,
                shareType = void 0;

            // Loop over classes in classList
            for (i = 0; i < classList.length; i++) {
                // set className as a string of the current class
                var className = classList.item(i).toString();

                // Check if class starts with 'sharey_'
                // to avoid other classes
                if (className.startsWith('sharey_')) {
                    // set the shareType eg. facebook, twitter etc
                    shareType = className.replace('sharey_', '');
                }
            }

            // Add an event listener on hover of share items
            $shareItem.addEventListener('mouseover', function (event) {
                // initialise share item of the type
                initShareItem(shareType);
            });
        };

        for (var _iterator = $shareItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var i;

            _loop();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

(function (global) {

    // Initialise Sharing
    initShare();
})(window);