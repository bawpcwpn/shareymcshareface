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
    shareyBaseClass = shareyClassPrefix + shareyClassSeperator,
    facebookAppId = '165738063828836';


/**
 * Share details to use across services
 * @type {{title: string, type: null, image: null, url: string, description: null, video: null}}
 */
var shareDetailsObject = {
    "title"       : document.title,
    "type"        : null,
    "image"       : null,
    "url"         : window.location.href,
    "description" : null,
    "video"       : null
};

/**
 * Gets meta tag values
 * @param tagName
 * @returns {*}
 */
var getMetaTagValue = function(tagName) {
    var metas = document.getElementsByTagName('meta');

    for (var i=0; i<metas.length; i++) {
        if (metas[i].getAttribute("property") == tagName) {
            return metas[i].getAttribute("content");
        }
    }

    return false;
};

var setShareParameters = function() {

    for(let shareDetail in shareDetailsObject) {

        if(shareDetailsObject.hasOwnProperty(shareDetail)) {
            let tagType = shareDetail.toString(),
                tagName = 'og:' + tagType,
                tagValue = getMetaTagValue(tagName);

            if(tagValue != false) {
                shareDetailsObject[tagType] = tagValue;
            }
        }
    }
};

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

    var sdkScript = "" +
        "<script>" +
            "window.fbAsyncInit = function() {" +
                "FB.init({" +
                    "appId      : " + facebookAppId + "," +
                    "xfbml      : true," +
                    "version    : 'v2.6'" +
                "});" +
            "};" +
            "" +
            "(function(d, s, id){" +
                "var js, fjs = d.getElementsByTagName(s)[0];" +
                "if (d.getElementById(id)) {return;}" +
                "js = d.createElement(s); js.id = id;" +
                "js.src = '\/\/connect.facebook.net/en_US/sdk.js';" +
                "fjs.parentNode.insertBefore(js, fjs);" +
            "}(document, 'script', 'facebook-jssdk'));" +
        "<\/script>";

    document.write(sdkScript);
};

/**
 * Initialise Twitter sharing
 * @return {undefined}
 */

var initTwitterShare = function() {
    console.log('Twitter share fired');
};

/**
 * Initialise Email sharing
 * @return {undefined}
 */

var initEmailShare = function() {
    console.log('Email share fired');
};

/**
 * Initialise LinkedIn sharing
 * @return {undefined}
 */

var initLinkedInShare = function() {
    console.log('LinkedIn share fired');
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


    var fireEvents = [],
        shareParametersSet = false;


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


        fireEvents.push({shareName: shareType, eventFired: false});

        // Add an event listener on hover of share items
        $shareItem.addEventListener('mouseover',function(event){
            // initialise share item of the type
            // set initialise to fire once

            for (let shareEvent of fireEvents) {
                if(shareEvent.hasOwnProperty('shareName') && shareEvent['shareName'] == shareType) {
                    if(shareEvent.hasOwnProperty('eventFired') && !shareEvent.eventFired) {
                        initShareItem(shareType);
                        shareEvent.eventFired = true;

                        !shareParametersSet ? setShareParameters() : null;
                        !shareParametersSet ? shareParametersSet = true : null;
                    }
                }
            }

        });

    }
};

(global => {

    // Initialise Sharing
    initShare();

})(window);