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
var getMetaTagValue = tagName => {
    var metas = document.getElementsByTagName('meta');

    for (var i=0; i<metas.length; i++) {
        if (metas[i].getAttribute("property") == tagName) {
            return metas[i].getAttribute("content");
        }
    }

    return false;
};

/**
 * Set share parameters
 */
var setShareParameters = () => {

    for(let shareDetail in shareDetailsObject) {

        // Check for description tag
        let description = getMetaTagValue('description');
        if(description != false) {
            shareDetailsObject.description = description;
        }

        // check for Open graph tags
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

var getShareElement = elementName => {
    return document.querySelector(shareyElementType + '.' + shareyBaseClass + elementName);
};

/**
 * Opens url on click in new window
 * @param elementName - name of element to bind click event to
 * @param shareUrl - the url to open in a new window
 * @param windowTarget - the target of the window
 */

var bindShareUrl = (elementName, shareUrl, windowTarget = "_blank") => {

    let $shareButton = getShareElement(elementName);

    $shareButton.addEventListener('click', event => {
        window.open(shareUrl, windowTarget);
    });

};


/**
 * Initialise Facebook sharing
 * @param {string} elementName - suffix of element for selecting
 * @return {undefined}
 */

var initFacebookShare = elementName => {

    bindShareUrl(elementName, 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareDetailsObject.url));

};

/**
 * Initialise Twitter sharing
 * @param {string} elementName - suffix of element for selecting
 * @return {undefined}
 */

var initTwitterShare = elementName => {

    let $shareButton = getShareElement(elementName),
        twitterShareUrl = 'https://twitter.com/intent/tweet?text=',
        twitterUrlLength = 23,
        twitterPostLength = 140,
        twitterShareMessage = '';


    // Add url of site which will equal twitterUrlLength to share url
    twitterShareMessage += shareDetailsObject.url;
    twitterPostLength -= twitterUrlLength;

    // Check if Username exists to see if it needs to be subtracted from twitterPostLength
    if($shareButton.hasAttribute('data-username') && $shareButton.getAttribute('data-username') != '') {
        let username = $shareButton.getAttribute('data-username').toString();
        twitterShareMessage += ' via @' + username;
        twitterPostLength -= username.length - 6;
    }

    let description = null;

    // Check if description object value already set
    if(shareDetailsObject.description != null && shareDetailsObject.description != '') {
        description = shareDetailsObject;
    }
    // Check for button override
    if($shareButton.hasAttribute('data-description') && $shareButton.getAttribute('data-description') != '') {
        description = $shareButton.getAttribute('data-description');
    }
    // check if description is still null
    if(description != null && description != '') {
        let descriptionLength = description.length;

        // Remove one character from twitterPostLength to account for space
        twitterUrlLength -= 1;

        if(descriptionLength > twitterUrlLength) {
            // Remove 3 characters for ...
            twitterPostLength -= 3;
            // Trim description length
            description = description.substring(0, Math.min(description.length, twitterPostLength)) + '... ';
        }

        // Add description to message
        twitterShareMessage = description + twitterShareMessage;
    }

    // Encode URL
    twitterShareUrl += encodeURIComponent(twitterShareMessage);

    bindShareUrl(elementName, twitterShareUrl);

};

/**
 * Initialise Email sharing
 * @param {string} elementName - suffix of element for selecting
 * @return {undefined}
 */

var initEmailShare = elementName => {

    let subject,
        message,
        encodedMessage,
        $shareBtn = getShareElement(elementName);

    encodedMessage = 'mailto:';

    // Add Subject
    subject = shareDetailsObject.title;

    if($shareBtn.hasAttribute('data-subject')){
        subject = $shareBtn.getAttribute('data-subject');
    }

    encodedMessage += '?Subject=' + encodeURIComponent(subject);

    // Add Message
    message = encodeURIComponent('Hey! ') + '%0D%0A' +
        '%0D%0A' +
        encodeURIComponent('Thought you might like this...') + '%0D%0A%0D%0A';

    if($shareBtn.hasAttribute('data-message')) {
        message = $shareBtn.getAttribute('data-message');
    }

    message += encodeURIComponent(shareDetailsObject.title + ' ') + '%0D%0A' +
        encodeURIComponent(shareDetailsObject.url+ ' ') + '%0D%0A';

    encodedMessage += '&Body=' + message;

    bindShareUrl(elementName, encodedMessage, '_self');

};

/**
 * Initialise LinkedIn sharing
 * @param {string} elementName - suffix of element for selecting
 * @return {undefined}
 */

var initLinkedInShare = elementName => {

    let $shareBtn = getShareElement(elementName),
        linkedInUrl;

    linkedInUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareDetailsObject.url);

    // Optional title attribute
    if($shareBtn.hasAttribute('data-title') && $shareBtn.getAttribute('data-title') != ''){
        linkedInUrl += '&title=' + encodeURIComponent($shareBtn.getAttribute('data-title'));
    }

    // Optional summary attribute
    if($shareBtn.hasAttribute('data-summary') && $shareBtn.getAttribute('data-summary') != ''){
        linkedInUrl += '&summary=' + encodeURIComponent($shareBtn.getAttribute('data-summary'));
    }

    // Optional source attribute
    if($shareBtn.hasAttribute('data-source') && $shareBtn.getAttribute('data-source') != ''){
        linkedInUrl += '&source=' + encodeURIComponent($shareBtn.getAttribute('data-source'));
    }

    bindShareUrl(elementName, linkedInUrl);

};

/**
 *  Initialises share on individual items once hovered
 *  @param {string} shareType - the type of share item, eg. facebook, twitter, linkedin etc
 *  @return {undefined}
 */
var initShareItem = shareType => {

    // Check which shareType it matches and initialise each
    // share item individually, only once it's been hovered
    // Pass sharey suffix class
    switch(shareType) {
        // Facebook share type
        case 'facebook':
            initFacebookShare('facebook');
            break;
        // Twitter share type
        case 'twitter':
            initTwitterShare('twitter');
            break;
        // LinkedIn share type
        case 'linkedin':
            initLinkedInShare('linkedin');
            break;
        // Email share type
        case 'email':
            initEmailShare('email');
            break;
    }

};

/**
 *  Initialises share on 'sharey_' items
 *  @return {undefined}
 */
var initShare = () => {

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

                        !shareParametersSet ? setShareParameters() : null;
                        !shareParametersSet ? shareParametersSet = true : null;

                        initShareItem(shareType);
                        shareEvent.eventFired = true;
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