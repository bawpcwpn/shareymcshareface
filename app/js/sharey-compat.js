'use strict';

/*
    Sharey McShareface
    Thomas Huxley 2016
    http://www.thomashuxley.com
    (Name courtesy of Sam Sargent)
 */

/*
    Default options
 */

var shareyElementType = 'span',
    shareyClassPrefix = 'sharey',
    shareyClassSeperator = '_',
    shareyBaseClass = shareyClassPrefix + shareyClassSeperator;

/**
 * Fires attached function only once
 * @param {function} fn - the function you supply
 * @param {object} context\
 * @return {function} result
 */

var once = function once(fn, context) {
    var result;

    return function () {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
};

/**
 * Initialise Facebook sharing
 * @return {undefined}
 */

var initFacebookShare = function initFacebookShare() {
    console.log('Facebook share fired');
};

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
    var $shareNode = document.querySelectorAll(shareyElementType + '[class^="' + shareyBaseClass + '"]'),
        $shareItems = Array.from($shareNode);

    var fireEvents = [];

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
                if (className.startsWith(shareyBaseClass)) {
                    // set the shareType eg. facebook, twitter etc
                    shareType = className.replace(shareyBaseClass, '');
                }
            }

            fireEvents.push({ shareName: shareType, eventFired: false });

            // Add an event listener on hover of share items
            $shareItem.addEventListener('mouseover', function (event) {
                // initialise share item of the type
                // set initialise to fire once

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = fireEvents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var shareEvent = _step2.value;

                        if (shareEvent.hasOwnProperty('shareName') && shareEvent['shareName'] == shareType) {
                            if (shareEvent.hasOwnProperty('eventFired') && !shareEvent.eventFired) {
                                initShareItem(shareType);
                                shareEvent.eventFired = true;
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
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