/* SiteCatalyst code version: H.14. Copyright Omniture, Inc. More info available at http://www.omniture.com */
/* Author: Neil Evans */
/************************** CONFIG SECTION ****************************************/
/* Specify the Report Suite(s) */
var s_account="sunopensolarisdev";
var sun_dynamicAccountSelection=true;
var sun_dynamicAccountList="sunglobal,sunopensolaris=opensolaris.org;sunopensolarisdev=.";
/* Specify the Report Suite ID */
var s_siteid="opensolaris:";
/* Settings for pageName */
if (typeof s_pageType=='undefined' || s_pageType=="") {
var s_pageName=window.location.host+window.location.pathname;
s_pageName=s_pageName.replace(/www.opensolaris.org/,"");
s_pageName=s_pageName.replace(/.opensolaris.org/,":");
s_pageName=s_pageName.replace(/opensolaris.org/,"");
}
/* Remote Omniture JS call  */
var sun_ssl=(window.location.protocol.toLowerCase().indexOf("https")!=-1);
	if(sun_ssl == true) { var fullURL = "https://www.sun.com/share/metrics/metrics_group1.js"; }
		else { var fullURL= "http://www-cdn.sun.com/share/metrics/metrics_group1.js"; }
document.write("<sc" + "ript type=\"text/javascript\" src=\""+fullURL+"\"></sc" + "ript>");
/************************** END CONFIG SECTION **************************************/
