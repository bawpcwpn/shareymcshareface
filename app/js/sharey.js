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

var once = function(fn, context) {
    var result;

    return function() {
        if(fn) {
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

var initFacebookShare = function() {
    console.log('Facebook share fired');
};

/**
 * Initialise Twitter sharing
 * @return {undefined}
 */

var initTwitterShare = function() {

};

/**
 * Initialise Email sharing
 * @return {undefined}
 */

var initEmailShare = function() {

};

/**
 * Initialise LinkedIn sharing
 * @return {undefined}
 */

var initLinkedInShare = function() {

};

/**
 *  Initialises share on individual items once hovered
 *  @param {string} shareType - the type of share item, eg. facebook, twitter, linkedin etc
 *  @return {undefined}
 */
var initShareItem = function(shareType) {

    // Check which shareType it matches and initialise each
    // share item individually, only once it's been hovered
    switch(shareType) {
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
var initShare = function(){

    // get nodeList ($shareNode) of span's starting with 'sharey_' class and turn
    // it into a an array ($shareItems)
    var $shareNode = document.querySelectorAll(shareyElementType+'[class^="'+shareyBaseClass+'"]'),
        $shareItems = Array.from($shareNode);


    // Iterate over $shareItems
    for (let $shareItem of $shareItems) {

        // Grab the classList
        // set shareType
        let classList = $shareItem.classList,
            shareType;

        // Loop over classes in classList
        for (var i = 0; i < classList.length; i++) {
            // set className as a string of the current class
            let className = classList.item(i).toString();

            // Check if class starts with 'sharey_'
            // to avoid other classes
            if(className.startsWith(shareyBaseClass)){
                // set the shareType eg. facebook, twitter etc
                shareType = className.replace(shareyBaseClass,'');
            }
        }

        // set initialise to fire once
        let fireOnce = once(initShareItem(shareType));

        // Add an event listener on hover of share items
        $shareItem.addEventListener('mouseover',function(event){
            // initialise share item of the type
            fireOnce();
        });

    }
};

(global => {

    // Initialise Sharing
    initShare();

})(window);

