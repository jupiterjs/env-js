
/**
 * DOM Style Level 2
 */
var CSS2Properties,
    CSSRule,
    CSSStyleSheet;
    
/*
 * Envjs css.1.2.0.0 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

(function(){





/**
 * @author john resig
 */
// Helper method for extending one object with another.  
function __extend__(a,b) {
    for ( var i in b ) {
        var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
        if ( g || s ) {
            if ( g ) a.__defineGetter__(i, g);
            if ( s ) a.__defineSetter__(i, s);
        } else
            a[i] = b[i];
    } return a;
};
/**
 * @author john resig
 */
//from jQuery
function __setArray__( target, array ) {
    // Resetting the length to 0, then using the native Array push
    // is a super-fast way to populate an object with array-like properties
    target.length = 0;
    Array.prototype.push.apply( target, array );
};
/*
* CSS2Properties - DOM Level 2 CSS
*/
CSS2Properties = function(element){
    //this.onSetCallback = options.onSet?options.onSet:(function(){});
    this.styleIndex = __supportedStyles__();//non-standard
    this.type = element.tagName;//non-standard
    __setArray__(this,[]);
    __cssTextToStyles__(this, element.getAttribute('style')||'');
};
__extend__(CSS2Properties.prototype, {
    get cssText(){
        var css = '',
            i;
        for(i=0;i<this.length;i++){
            css+=this[i]+": "+this.getPropertyValue(this[i])+';';
            if(i+1<this.length)
                css+=" ";
        }
        return css;
    },
    set cssText(cssText){ 
        __cssTextToStyles__(this, cssText); 
    },
    getPropertyCSSValue : function(name){
        //?
    },
    getPropertyPriority : function(){
        
    },
    getPropertyValue : function(name){
        var index;
        if(name in this.styleIndex){
            //$info(name +' in style index');
            return this[name];
        }else{
            index = Array.prototype.indexOf.apply(this, name)
            if(index > -1)
                return this[index];
        }
        //$info(name +' not found');
        return null;
    },
    item : function(index){
        return this[index];
    },
    removeProperty: function(name){
        this.styleIndex[name] = null;
        name = __toDashed__(name);
        var index = Array.prototype.indexOf.apply(this, [name]);
        if(index > -1){
            Array.prototype.splice.apply(this, [1,index]);
        }
    },
    setProperty: function(name, value, priority){
        //$info('setting css property '+name+' : '+value);
        name = __toCamelCase__(name);
        if(name in this.styleIndex  && value !== undefined){
            //$info('setting camel case css property ');
            this.styleIndex[name] = value;
            //$info('setting dashed name css property ');
            name = __toDashed__(name);
            if( Array.prototype.indexOf.apply(this, [name]) === -1 ){
                Array.prototype.push.apply(this,[name]);
            }
        }
        //$info('finished setting css property '+name+' : '+value);
    },
    toString:function(){
        return '[object CSS2Properties]';
    }
});



var __cssTextToStyles__ = function(css2props, cssText){
    
    //console.log('__cssTextToStyles__ %s %s', css2props, cssText);
    //var styleArray=[];
    var style, styles = cssText.split(';');
    for ( var i = 0; i < styles.length; i++ ) {
        //$log("Adding style property " + styles[i]);
    	style = styles[i].split(':');
        //$log(" style  " + style[0]);
    	if ( style.length == 2 ){
            //$log(" value  " + style[1]);
    	    css2props.setProperty( style[0].replace(" ",'','g'), style[1].replace(" ",'','g'));
    	}
    }
};

var __toCamelCase__ = function(name) {
    //$info('__toCamelCase__'+name);
    if(name){
    	return name.replace(/\-(\w)/g, function(all, letter){
    		return letter.toUpperCase();
    	});
    }
    return name;
};

var __toDashed__ = function(camelCaseName) {
    //$info("__toDashed__"+camelCaseName);
    if(camelCaseName){
    	return camelCaseName.replace(/[A-Z]/g, function(all) {
    		return "-" + all.toLowerCase();
    	});
    }
    return camelCaseName;
};

//Obviously these arent all supported but by commenting out various sections
//this provides a single location to configure what is exposed as supported.
var __supportedStyles__ = function(){
    return {
        azimuth:                null,
        background:	            null,
        backgroundAttachment:	null,
        backgroundColor:	    null,
        backgroundImage:	    null,
        backgroundPosition:	    null,
        backgroundRepeat:	    null,
        border:	                null,
        borderBottom:	        null,
        borderBottomColor:	    null,
        borderBottomStyle:	    null,
        borderBottomWidth:	    null,
        borderCollapse:	        null,
        borderColor:	        null,
        borderLeft:	            null,
        borderLeftColor:	    null,
        borderLeftStyle:	    null,
        borderLeftWidth:	    null,
        borderRight:	        null,
        borderRightColor:	    null,
        borderRightStyle:	    null,
        borderRightWidth:	    null,
        borderSpacing:	        null,
        borderStyle:	        null,
        borderTop:	            null,
        borderTopColor:	        null,
        borderTopStyle:	        null,
        borderTopWidth:	        null,
        borderWidth:	        null,
        bottom:	                null,
        captionSide:	        null,
        clear:	                null,
        clip:	                null,
        color:	                null,
        content:	            null,
        counterIncrement:	    null,
        counterReset:	        null,
        cssFloat:	            null,
        cue:	                null,
        cueAfter:	            null,
        cueBefore:	            null,
        cursor:	                null,
        direction:	            'ltr',
        display:	            null,
        elevation:	            null,
        emptyCells:	            null,
        font:	                null,
        fontFamily:	            null,
        fontSize:	            "1em",
        fontSizeAdjust:	null,
        fontStretch:	null,
        fontStyle:	null,
        fontVariant:	null,
        fontWeight:	null,
        height:	'',
        left:	null,
        letterSpacing:	null,
        lineHeight:	null,
        listStyle:	null,
        listStyleImage:	null,
        listStylePosition:	null,
        listStyleType:	null,
        margin:	null,
        marginBottom:	"0px",
        marginLeft:	"0px",
        marginRight:	"0px",
        marginTop:	"0px",
        markerOffset:	null,
        marks:	null,
        maxHeight:	null,
        maxWidth:	null,
        minHeight:	null,
        minWidth:	null,
        opacity:	1,
        orphans:	null,
        outline:	null,
        outlineColor:	null,
        outlineOffset:	null,
        outlineStyle:	null,
        outlineWidth:	null,
        overflow:	null,
        overflowX:	null,
        overflowY:	null,
        padding:	null,
        paddingBottom:	"0px",
        paddingLeft:	"0px",
        paddingRight:	"0px",
        paddingTop:	"0px",
        page:	null,
        pageBreakAfter:	null,
        pageBreakBefore:	null,
        pageBreakInside:	null,
        pause:	null,
        pauseAfter:	null,
        pauseBefore:	null,
        pitch:	null,
        pitchRange:	null,
        position:	null,
        quotes:	null,
        richness:	null,
        right:	null,
        size:	null,
        speak:	null,
        speakHeader:	null,
        speakNumeral:	null,
        speakPunctuation:	null,
        speechRate:	null,
        stress:	null,
        tableLayout:	null,
        textAlign:	null,
        textDecoration:	null,
        textIndent:	null,
        textShadow:	null,
        textTransform:	null,
        top:	null,
        unicodeBidi:	null,
        verticalAlign:	null,
        visibility:	null,
        voiceFamily:	null,
        volume:	null,
        whiteSpace:	null,
        widows:	null,
        width:	'1px',
        wordSpacing:	null,
        zIndex:	1
    };
};

var __displayMap__ = {
		"DIV"      : "block",
		"P"        : "block",
		"A"        : "inline",
		"CODE"     : "inline",
		"PRE"      : "block",
		"SPAN"     : "inline",
		"TABLE"    : "table",
		"THEAD"    : "table-header-group",
		"TBODY"    : "table-row-group",
		"TR"       : "table-row",
		"TH"       : "table-cell",
		"TD"       : "table-cell",
		"UL"       : "block",
		"LI"       : "list-item"
};
var __styleMap__ = __supportedStyles__();

for(var style in __supportedStyles__()){
    (function(name){
        if(name === 'width' || name === 'height'){
            CSS2Properties.prototype.__defineGetter__(name, function(){
                if(this.display==='none'){
                    return '0px';
                }
                //$info(name+' = '+this.getPropertyValue(name));
                return this.styleIndex[name];
            });
        }else if(name === 'display'){
            //display will be set to a tagName specific value if ""
            CSS2Properties.prototype.__defineGetter__(name, function(){
                var val = this.styleIndex[name];
                val = val?val:__displayMap__[this.type];
                //$log(" css2properties.get  " + name + "="+val+" for("+this.__element__.tagName+")");
                return val;
            });
        }else{
            CSS2Properties.prototype.__defineGetter__(name, function(){
                //$log(" css2properties.get  " + name + "="+this.styleIndex[name]);
                return this.styleIndex[name];
            });
       }
       CSS2Properties.prototype.__defineSetter__(name, function(value){
           //$log(" css2properties.set  " + name +"="+value);
           this.setProperty(name, value);
       });
    })(style);
};


/* 
* CSSRule - DOM Level 2
*/
CSSRule = function(options){
  var $style, 
      $selectorText = options.selectorText?options.selectorText:"";
      $style = new CSS2Properties({
          cssText:options.cssText?options.cssText:null
      });
    return __extend__(this, {
      get style(){
          return $style;
      },
      get selectorText(){
          return $selectorText;
      },
      set selectorText(selectorText){
          $selectorText = selectorText;
      }
    });
};


/* 
* CSSStyleSheet - DOM Level 2
*/
CSSStyleSheet = function(options){
    var $cssRules, 
        $disabled = options.disabled?options.disabled:false,
        $href = options.href?options.href:null,
        $parentStyleSheet = options.parentStyleSheet?options.parentStyleSheet:null,
        $title = options.title?options.title:"",
        $type = "text/css";
        
    function parseStyleSheet(text){
        //$debug("parsing css");
        //this is pretty ugly, but text is the entire text of a stylesheet
        var cssRules = [];
    	if (!text) text = "";
    	text = trim(text.replace(/\/\*(\r|\n|.)*\*\//g,""));
    	// TODO: @import ?
    	var blocks = text.split("}");
    	blocks.pop();
    	var i, len = blocks.length;
    	var definition_block, properties, selectors;
    	for (i=0; i<len; i++){
    		definition_block = blocks[i].split("{");
    		if(definition_block.length === 2){
          		selectors = definition_block[0].split(",");
          		for(var j=0;j<selectors.length;j++){
          		    cssRules.push(new CSSRule({
          		        selectorText:selectors[j],
          		        cssText:definition_block[1]
          		    }));
          		}
          		__setArray__($cssRules, cssRules);
    		}
    	}
    };
    parseStyleSheet(options.text);
    return __extend__(this, {
        get cssRules(){
            return $cssRules;
        },
        get rule(){
            return $cssRules;
        },//IE - may be deprecated
        get href(){
            return $href;
        },
        get parentStyleSheet(){
            return $parentStyleSheet;
        },
        get title(){
            return $title;
        },
        get type(){
            return $type;
        },
        addRule: function(selector, style, index){/*TODO*/},
        deleteRule: function(index){/*TODO*/},
        insertRule: function(rule, index){/*TODO*/},
        //IE - may be deprecated
        removeRule: function(index){
            this.deleteRule(index);
        }
    });
};



/**
 * @author envjs team
 */
$css2properties = [{}];

__extend__(HTMLElement.prototype, {
    get style(){
        if ( !this.css2uuid ) {
            this.css2uuid = $css2properties.length;
            $css2properties[this.css2uuid] = new CSS2Properties(this);
        }
        return $css2properties[this.css2uuid];
    },
    setAttribute: function (name, value) {
        Element.prototype.setAttribute.apply(this,[name, value]);
        if (name === "style") {
            __updateCss2Props__(this, value);
        }
    }
});

var __updateCss2Props__ = function(elem, values){
    //console.log('__updateCss2Props__ %s %s', elem, values);
    if ( !elem.css2uuid ) {
        elem.css2uuid = $css2properties.length;
        $css2properties[elem.css2uuid] = new CSS2Properties(elem);
    }
    __cssTextToStyles__($css2properties[elem.css2uuid], values);
};

/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */

})();
