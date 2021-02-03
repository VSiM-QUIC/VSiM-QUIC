(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
module.exports = {
  XmlEntities: _dereq_('./lib/xml-entities.js'),
  Html4Entities: _dereq_('./lib/html4-entities.js'),
  Html5Entities: _dereq_('./lib/html5-entities.js'),
  AllHtmlEntities: _dereq_('./lib/html5-entities.js')
};

},{"./lib/html4-entities.js":2,"./lib/html5-entities.js":3,"./lib/xml-entities.js":4}],2:[function(_dereq_,module,exports){
var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;

},{}],3:[function(_dereq_,module,exports){
var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;

},{}],4:[function(_dereq_,module,exports){
var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;

},{}],5:[function(_dereq_,module,exports){
(function (global){
/*!
    localForage -- Offline Storage, Improved
    Version 1.7.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support (#5572)
        // since Safari 10.1 shipped with fetch, we can use that to detect it
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback retuns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = req.onblocked = function (err) {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(err);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventsBase = (function () {
    function EventsBase() {
        _classCallCheck(this, EventsBase);
    }

    _createClass(EventsBase, [{
        key: 'extend',
        value: function extend(events, config) {
            if (!events) return;

            var override = config ? config.override : false;
            var publicOnly = config ? config.publicOnly : false;

            for (var evt in events) {
                if (!events.hasOwnProperty(evt) || this[evt] && !override) continue;
                if (publicOnly && events[evt].indexOf('public_') === -1) continue;
                this[evt] = events[evt];
            }
        }
    }]);

    return EventsBase;
})();

exports['default'] = EventsBase;
module.exports = exports['default'];

},{}],7:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsOfflineConstants = _dereq_('./constants/OfflineConstants');

var _constantsOfflineConstants2 = _interopRequireDefault(_constantsOfflineConstants);

var _OfflineStream = _dereq_('./OfflineStream');

var _OfflineStream2 = _interopRequireDefault(_OfflineStream);

var _utilsOfflineIndexDBManifestParser = _dereq_('./utils/OfflineIndexDBManifestParser');

var _utilsOfflineIndexDBManifestParser2 = _interopRequireDefault(_utilsOfflineIndexDBManifestParser);

var _errorsOfflineErrors = _dereq_('./errors/OfflineErrors');

var _errorsOfflineErrors2 = _interopRequireDefault(_errorsOfflineErrors);

/**
 * @class OfflineDownload
 */
function OfflineDownload(config) {
    config = config || {};

    var manifestLoader = config.manifestLoader;
    var adapter = config.adapter;
    var offlineStoreController = config.offlineStoreController;
    var manifestId = config.id;
    var eventBus = config.eventBus;
    var errHandler = config.errHandler;
    var events = config.events;
    var debug = config.debug;
    var manifestUpdater = config.manifestUpdater;
    var baseURLController = config.baseURLController;
    var constants = config.constants;
    var dashConstants = config.dashConstants;
    var urlUtils = config.urlUtils;

    var context = this.context;

    var instance = undefined,
        logger = undefined,
        _manifestURL = undefined,
        _offlineURL = undefined,
        _xmlManifest = undefined,
        _streams = undefined,
        _manifest = undefined,
        _isDownloadingStatus = undefined,
        _isComposed = undefined,
        _representationsToUpdate = undefined,
        _indexDBManifestParser = undefined,
        _progressionById = undefined,
        _progression = undefined,
        _status = undefined;

    function setup() {
        logger = debug.getLogger(instance);
        manifestUpdater.initialize();
        _streams = [];
        _isDownloadingStatus = false;
        _isComposed = false;
        _progressionById = {};
        _progression = 0;
        _status = undefined;
    }

    function getId() {
        return manifestId;
    }

    function getOfflineUrl() {
        return _offlineURL;
    }

    function getManifestUrl() {
        return _manifestURL;
    }

    function getStatus() {
        return _status;
    }

    function setInitialState(state) {
        _offlineURL = state.url;
        _progression = state.progress;
        _manifestURL = state.originalUrl;
        _status = state.status;
    }

    /**
     * Download a stream, from url of manifest
     * @param {string} url
     * @instance
     */
    function downloadFromUrl(url) {
        _manifestURL = url;
        _offlineURL = _constantsOfflineConstants2['default'].OFFLINE_SCHEME + '://' + manifestId;
        _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_CREATED;
        setupOfflineEvents();
        var offlineManifest = {
            'fragmentStore': manifestId,
            'status': _status,
            'manifestId': manifestId,
            'url': _offlineURL,
            'originalURL': url
        };
        return createOfflineManifest(offlineManifest);
    }

    function initDownload() {
        manifestLoader.load(_manifestURL);
        _isDownloadingStatus = true;
    }

    function setupOfflineEvents() {
        eventBus.on(events.MANIFEST_UPDATED, onManifestUpdated, instance);
        eventBus.on(events.ORIGINAL_MANIFEST_LOADED, onOriginalManifestLoaded, instance);
        setupIndexedDBEvents();
    }

    function setupIndexedDBEvents() {
        eventBus.on(events.ERROR, onError, instance);
    }

    function isDownloading() {
        return _isDownloadingStatus;
    }

    function onManifestUpdated(e) {
        if (_isComposed) {
            return;
        }
        if (!e.error) {
            try {
                _manifest = e.manifest;
            } catch (err) {
                _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
                errHandler.error({
                    code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                    message: err.message,
                    data: {
                        id: manifestId,
                        status: _status
                    }
                });
            }
        }
    }

    function onDownloadingStarted(e) {
        if (e.id !== manifestId) {
            return;
        }
        if (!e.error && manifestId !== null) {
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_STARTED;
            offlineStoreController.setDownloadingStatus(manifestId, _status).then(function () {
                eventBus.trigger(events.DOWNLOADING_STARTED, { id: manifestId, message: 'Downloading started for this stream !' });
            });
        } else {
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
            errHandler.error({
                code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                message: 'Cannot start download ',
                data: {
                    id: manifestId,
                    status: _status,
                    error: e.error
                }
            });
        }
    }

    function OnStreamProgression(stream, downloaded, available) {

        _progressionById[stream.getStreamInfo().id] = {
            downloaded: downloaded,
            available: available
        };

        var segments = 0;
        var allSegments = 0;
        var waitForAllProgress = undefined;
        for (var property in _progressionById) {
            if (_progressionById.hasOwnProperty(property)) {
                if (_progressionById[property] === null) {
                    waitForAllProgress = true;
                } else {
                    segments += _progressionById[property].downloaded;
                    allSegments += _progressionById[property].available;
                }
            }
        }

        if (!waitForAllProgress) {
            // all progression have been started, we can compute global progression
            _progression = segments / allSegments;

            // store progression
            offlineStoreController.getManifestById(manifestId).then(function (item) {
                item.progress = _progression;
                return updateOfflineManifest(item);
            });
        }
    }

    function onDownloadingFinished(e) {
        if (e.id !== manifestId) {
            return;
        }
        if (!e.error && manifestId !== null) {
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_FINISHED;
            offlineStoreController.setDownloadingStatus(manifestId, _status).then(function () {
                eventBus.trigger(events.DOWNLOADING_FINISHED, { id: manifestId, message: 'Downloading has been successfully completed for this stream !' });
                resetDownload();
            });
        } else {
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
            errHandler.error({
                code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                message: 'Error finishing download ',
                data: {
                    id: manifestId,
                    status: _status,
                    error: e.error
                }
            });
        }
    }

    function onManifestUpdateNeeded(e) {
        if (e.id !== manifestId) {
            return;
        }

        _representationsToUpdate = e.representations;

        if (_representationsToUpdate.length > 0) {
            _indexDBManifestParser.parse(_xmlManifest, _representationsToUpdate).then(function (parsedManifest) {
                if (parsedManifest !== null && manifestId !== null) {
                    offlineStoreController.getManifestById(manifestId).then(function (item) {
                        item.manifest = parsedManifest;
                        return updateOfflineManifest(item);
                    }).then(function () {
                        for (var i = 0, ln = _streams.length; i < ln; i++) {
                            _streams[i].startOfflineStreamProcessors();
                        }
                    });
                } else {
                    throw 'falling parsing offline manifest';
                }
            })['catch'](function (err) {
                throw err;
            });
        }
    }

    function composeStreams() {
        try {
            adapter.updatePeriods(_manifest);
            baseURLController.initialize(_manifest);
            var streamsInfo = adapter.getStreamsInfo();
            if (streamsInfo.length === 0) {
                _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
                errHandler.error({
                    code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                    message: 'Cannot download - no streams',
                    data: {
                        id: manifestId,
                        status: _status
                    }
                });
            }
            for (var i = 0, ln = streamsInfo.length; i < ln; i++) {
                var streamInfo = streamsInfo[i];
                var stream = (0, _OfflineStream2['default'])(context).create({
                    id: manifestId,
                    callbacks: {
                        started: onDownloadingStarted,
                        progression: OnStreamProgression,
                        finished: onDownloadingFinished,
                        updateManifestNeeded: onManifestUpdateNeeded
                    },
                    constants: constants,
                    eventBus: eventBus,
                    events: events,
                    debug: debug,
                    adapter: adapter,
                    offlineStoreController: offlineStoreController
                });
                _streams.push(stream);

                // initialise stream and get downloadable representations
                stream.initialize(streamInfo);
                _progressionById[streamInfo.id] = null;
            }
            _isComposed = true;
        } catch (e) {
            logger.info(e);
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
            errHandler.error({
                code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                message: e.message,
                data: {
                    id: manifestId,
                    status: _status,
                    error: e.error
                }
            });
        }
    }

    function getDownloadableRepresentations() {
        _streams.forEach(function (stream) {
            stream.getDownloadableRepresentations();
        });
    }

    /**
     * Init databsse to store fragments
     * @param {number} manifestId
     * @instance
     */
    function createFragmentStore(manifestId) {
        return offlineStoreController.createFragmentStore(manifestId);
    }

    /**
     * Store in database the string representation of offline manifest (with only downloaded representations)
     * @param {object} offlineManifest
     * @instance
     */
    function createOfflineManifest(offlineManifest) {
        return offlineStoreController.createOfflineManifest(offlineManifest);
    }

    /**
     * Store in database the string representation of offline manifest (with only downloaded representations)
     * @param {object} offlineManifest
     * @instance
     */
    function updateOfflineManifest(offlineManifest) {
        return offlineStoreController.updateOfflineManifest(offlineManifest);
    }

    /**
     * Triggered when manifest is loaded from internet.
     * @param {Object[]} e
     */
    function onOriginalManifestLoaded(e) {
        // unregister form event
        eventBus.off(events.ORIGINAL_MANIFEST_LOADED, onOriginalManifestLoaded, instance);

        _xmlManifest = e.originalManifest;

        if (_manifest.type === dashConstants.DYNAMIC) {
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
            errHandler.error({
                code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                message: 'Cannot handle DYNAMIC manifest',
                data: {
                    id: manifestId,
                    status: _status
                }
            });
            logger.error('Cannot handle DYNAMIC manifest');

            return;
        }

        if (_manifest.Period_asArray.length > 1) {
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
            errHandler.error({
                code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                message: 'MultiPeriod manifest are not yet supported',
                data: {
                    id: manifestId,
                    status: _status
                }
            });
            logger.error('MultiPeriod manifest are not yet supported');

            return;
        }

        // save original manifest (for resume)

        // initialise offline streams
        composeStreams(_manifest);

        // get downloadable representations
        getDownloadableRepresentations();

        eventBus.trigger(events.STREAMS_COMPOSED);
    }

    function initializeAllMediasInfoList(selectedRepresentations) {
        for (var i = 0; i < _streams.length; i++) {
            _streams[i].initializeAllMediasInfoList(selectedRepresentations);
        }
    }

    function formatSelectedRepresentations(selectedRepresentations) {
        var ret = {};

        ret[constants.VIDEO] = [];
        ret[constants.AUDIO] = [];
        ret[constants.TEXT] = [];
        ret[constants.FRAGMENTED_TEXT] = [];
        selectedRepresentations.video.forEach(function (item) {
            ret[constants.VIDEO].push(item.id);
        });
        selectedRepresentations.audio.forEach(function (item) {
            ret[constants.AUDIO].push(item.id);
        });
        selectedRepresentations.text.forEach(function (item) {
            ret[item.type].push(item.id);
        });

        return ret;
    }

    function startDownload(selectedRepresentations) {
        try {
            (function () {
                var rep = formatSelectedRepresentations(selectedRepresentations);

                offlineStoreController.saveSelectedRepresentations(manifestId, rep).then(function () {
                    return createFragmentStore(manifestId);
                }).then(function () {
                    return generateOfflineManifest(_xmlManifest, rep, manifestId);
                }).then(function () {
                    initializeAllMediasInfoList(rep);
                });
            })();
        } catch (err) {
            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_ERROR;
            errHandler.error({
                code: _errorsOfflineErrors2['default'].OFFLINE_ERROR,
                message: err.message,
                data: {
                    id: manifestId,
                    status: _status
                }
            });
        }
    }

    /**
     * Create the parser used to convert original manifest in offline manifest
     * Creates a JSON object that will be stored in database
     * @param {string} XMLManifest
     * @param {Object[]} selectedRepresentations
     * @param {number} manifestId
     * @instance
     */
    function generateOfflineManifest(XMLManifest, selectedRepresentations, manifestId) {
        _indexDBManifestParser = (0, _utilsOfflineIndexDBManifestParser2['default'])(context).create({
            manifestId: manifestId,
            allMediaInfos: selectedRepresentations,
            debug: debug,
            dashConstants: dashConstants,
            constants: constants,
            urlUtils: urlUtils
        });

        return _indexDBManifestParser.parse(XMLManifest).then(function (parsedManifest) {
            if (parsedManifest !== null && manifestId !== null) {
                return offlineStoreController.getManifestById(manifestId).then(function (item) {
                    item.originalURL = _manifest.url;
                    item.originalManifest = _manifest;
                    item.manifest = parsedManifest;
                    return updateOfflineManifest(item);
                });
            } else {
                return Promise.reject('falling parsing offline manifest');
            }
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Stops downloading of fragments
     * @instance
     */
    function stopDownload() {
        if (manifestId !== null && isDownloading()) {
            for (var i = 0, ln = _streams.length; i < ln; i++) {
                _streams[i].stopOfflineStreamProcessors();
            }

            // remove streams
            _streams = [];

            _isComposed = false;

            _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_STOPPED;
            // update status
            offlineStoreController.setDownloadingStatus(manifestId, _status).then(function () {
                eventBus.trigger(events.DOWNLOADING_STOPPED, {
                    sender: this,
                    id: manifestId,
                    status: _status,
                    message: 'Downloading has been stopped for this stream !'
                });
                _isDownloadingStatus = false;
            });
        }
    }

    /**
     * Delete an offline manifest (and all of its data)
     * @instance
     */
    function deleteDownload() {
        stopDownload();
    }

    /**
     * Resume download of a stream
     * @instance
     */
    function resumeDownload() {
        if (!isDownloading()) {
            (function () {
                _isDownloadingStatus = true;

                var selectedRepresentation = undefined;

                offlineStoreController.getManifestById(manifestId).then(function (item) {
                    _manifest = item.originalManifest;
                    selectedRepresentation = item.selected;

                    composeStreams(_manifest);
                    eventBus.trigger(events.STREAMS_COMPOSED);

                    return createFragmentStore(manifestId);
                }).then(function () {
                    initializeAllMediasInfoList(selectedRepresentation);
                });
            })();
        }
    }

    /**
     * Compute the progression of download
     * @instance
     */
    function getDownloadProgression() {
        return Math.round(_progression * 100);
    }

    /**
     * Reset events listeners
     * @instance
     */
    function resetDownload() {
        for (var i = 0, ln = _streams.length; i < ln; i++) {
            _streams[i].reset();
        }
        _indexDBManifestParser = null;
        _isDownloadingStatus = false;
        _streams = [];
        eventBus.off(events.MANIFEST_UPDATED, onManifestUpdated, instance);
        eventBus.off(events.ORIGINAL_MANIFEST_LOADED, onOriginalManifestLoaded, instance);
        resetIndexedDBEvents();
    }

    function onError(e) {
        if (e.error.code === _errorsOfflineErrors2['default'].INDEXEDDB_QUOTA_EXCEED_ERROR || e.error.code === _errorsOfflineErrors2['default'].INDEXEDDB_INVALID_STATE_ERROR) {
            stopDownload();
        }
    }

    function resetIndexedDBEvents() {
        eventBus.on(events.ERROR, onError, instance);
    }

    /**
     * Reset
     * @instance
     */
    function reset() {
        if (isDownloading()) {
            resetDownload();
        }
        baseURLController.reset();
        manifestUpdater.reset();
    }

    instance = {
        reset: reset,
        getId: getId,
        getOfflineUrl: getOfflineUrl,
        getManifestUrl: getManifestUrl,
        getStatus: getStatus,
        setInitialState: setInitialState,
        initDownload: initDownload,
        downloadFromUrl: downloadFromUrl,
        startDownload: startDownload,
        stopDownload: stopDownload,
        resumeDownload: resumeDownload,
        deleteDownload: deleteDownload,
        getDownloadProgression: getDownloadProgression,
        isDownloading: isDownloading,
        resetDownload: resetDownload
    };

    setup();

    return instance;
}

OfflineDownload.__dashjs_factory_name = 'OfflineDownload';
exports['default'] = dashjs.FactoryMaker.getClassFactory(OfflineDownload);
/* jshint ignore:line */
module.exports = exports['default'];

},{"./OfflineStream":8,"./constants/OfflineConstants":10,"./errors/OfflineErrors":13,"./utils/OfflineIndexDBManifestParser":18}],8:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _OfflineStreamProcessor = _dereq_('./OfflineStreamProcessor');

var _OfflineStreamProcessor2 = _interopRequireDefault(_OfflineStreamProcessor);

/**
 * @module  OfflineStream
 * @description Initialize and Manage Offline Stream for each type
 * @param {Object} config - dependences
 */
function OfflineStream(config) {

    config = config || {};
    var context = this.context;
    var eventBus = config.eventBus;
    var events = config.events;
    var constants = config.constants;
    var debug = config.debug;
    var adapter = config.adapter;
    var offlineStoreController = config.offlineStoreController;
    var manifestId = config.id;
    var startedCb = config.callbacks && config.callbacks.started;
    var progressionCb = config.callbacks && config.callbacks.progression;
    var finishedCb = config.callbacks && config.callbacks.finished;
    var updateManifest = config.callbacks && config.callbacks.updateManifestNeeded;

    var instance = undefined,
        offlineStreamProcessors = undefined,
        startedOfflineStreamProcessors = undefined,
        finishedOfflineStreamProcessors = undefined,
        streamInfo = undefined,
        representationsToUpdate = undefined,
        allMediasInfosList = undefined,
        progressionById = undefined;

    function setup() {
        resetInitialSettings();
    }

    /**
     * Reset
     */
    function resetInitialSettings() {
        streamInfo = null;
        offlineStreamProcessors = [];
        startedOfflineStreamProcessors = 0;
        finishedOfflineStreamProcessors = 0;
        allMediasInfosList = [];
        representationsToUpdate = [];
        progressionById = {};
    }

    /**
     * Initialize offlinestream
     * @param {Object} initStreamInfo
     */
    function initialize(initStreamInfo) {
        streamInfo = initStreamInfo;
        eventBus.on(events.DATA_UPDATE_COMPLETED, onDataUpdateCompleted, this);
    }

    /**
     * Creates media bitrate list, so that user will be able to choose the representation he wants to download
     */
    function getDownloadableRepresentations() {
        var downloadableRepresentations = {
            video: [],
            audio: [],
            text: []
        };

        var trackKindMap = { subtitle: 'subtitles', caption: 'captions' }; //Dash Spec has no "s" on end of KIND but HTML needs plural.
        var getKind = function getKind(mediaInfo) {
            var kind = mediaInfo.roles.length > 0 ? trackKindMap[mediaInfo.roles[0]] : trackKindMap.caption;
            kind = kind === trackKindMap.caption || kind === trackKindMap.subtitle ? kind : trackKindMap.caption;
            return kind;
        };

        // video
        var mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.VIDEO);
        if (mediaInfo.length > 0) {
            mediaInfo.forEach(function (item) {
                item.bitrateList.forEach(function (bitrate) {
                    downloadableRepresentations.video.push({
                        id: bitrate.id,
                        bandwidth: bitrate.bandwidth,
                        width: bitrate.width,
                        height: bitrate.height
                    });
                });
            });
        }

        // audio
        mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.AUDIO);
        if (mediaInfo.length > 0) {
            mediaInfo.forEach(function (item) {
                item.bitrateList.forEach(function (bitrate) {
                    downloadableRepresentations.audio.push({
                        id: bitrate.id,
                        bandwidth: bitrate.bandwidth,
                        lang: item.lang
                    });
                });
            });
        }

        // text

        var addTextInfo = function addTextInfo(infos, type) {
            if (infos.length > 0) {

                infos.forEach(function (item) {
                    item.bitrateList.forEach(function (bitrate) {
                        downloadableRepresentations.text.push({
                            id: bitrate.id,
                            lang: item.lang,
                            kind: getKind(item),
                            roles: item.roles,
                            accessibility: item.accessibility,
                            type: type
                        });
                    });
                });
            }
        };

        mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.FRAGMENTED_TEXT);
        addTextInfo(mediaInfo, constants.FRAGMENTED_TEXT);

        mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.TEXT);
        addTextInfo(mediaInfo, constants.TEXT);

        /**
        mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.MUXED);
        if (mediaInfo.length > 0) {
            downloadableRepresentations.push(mediaInfo);
        }
        mediaInfo = adapter.getAllMediaInfoForType(streamInfo, constants.IMAGE);
        if (mediaInfo.length > 0) {
            downloadableRepresentations.push(mediaInfo);
        }
        */

        eventBus.trigger(events.DOWNLOADABLE_REPRESENTATIONS_LOADED, {
            data: {
                id: manifestId,
                downloadableRepresentations: downloadableRepresentations
            },
            sender: this
        });
    }

    /**
     * Initialize with choosen representations by user
     * @param {Object} mediasInfoList
     */
    function initializeAllMediasInfoList(mediasInfoList) {
        allMediasInfosList = mediasInfoList;
        initializeMedia(streamInfo);
    }

    /**
     * Initialize media for each type
     * @param {Object} streamInfo
     */
    function initializeMedia(streamInfo) {
        createOfflineStreamProcessorFor(constants.VIDEO, streamInfo);
        createOfflineStreamProcessorFor(constants.AUDIO, streamInfo);
        createOfflineStreamProcessorFor(constants.FRAGMENTED_TEXT, streamInfo);
        createOfflineStreamProcessorFor(constants.TEXT, streamInfo);

        for (var i = 0; i < offlineStreamProcessors.length; i++) {
            offlineStreamProcessors[i].initialize();
        }
        /*
        createOfflineStreamProcessorFor(constants.MUXED,streamInfo);
        createOfflineStreamProcessorFor(constants.IMAGE,streamInfo);
        */
    }

    function createOfflineStreamProcessorFor(type, streamInfo) {
        // filter mediaInfo according to choosen representation id
        var allMediaInfoForType = adapter.getAllMediaInfoForType(streamInfo, type);
        allMediaInfoForType.forEach(function (media) {
            media.bitrateList = media.bitrateList.filter(function (bitrate) {
                if (allMediasInfosList[type] && allMediasInfosList[type].indexOf(bitrate.id) !== -1) {
                    return true;
                }
                return false;
            });
        });

        allMediaInfoForType = allMediaInfoForType.filter(function (media) {
            return media.bitrateList && media.bitrateList.length > 0;
        });

        // cration of an offline stream processor for each choosen representation
        allMediaInfoForType.forEach(function (mediaInfo) {
            if (mediaInfo.bitrateList) {
                mediaInfo.bitrateList.forEach(function (bitrate) {
                    createStreamProcessor(mediaInfo, bitrate);
                });
            }
        });
        return allMediaInfoForType;
    }

    function createStreamProcessor(mediaInfo, bitrate) {

        var streamProcessor = (0, _OfflineStreamProcessor2['default'])(context).create({
            id: manifestId,
            callbacks: {
                completed: onStreamCompleted,
                progression: onStreamProgression
            },
            debug: debug,
            events: events,
            eventBus: eventBus,
            constants: constants
        });
        streamProcessor.setConfig({
            type: mediaInfo.type,
            mimeType: mediaInfo.mimeType,
            mediaInfo: mediaInfo,
            bitrate: bitrate,
            adapter: adapter,
            stream: instance,
            offlineStoreController: offlineStoreController
        });
        offlineStreamProcessors.push(streamProcessor);

        progressionById[bitrate.id] = null;
    }

    function onStreamCompleted() {
        finishedOfflineStreamProcessors++;
        if (finishedOfflineStreamProcessors === offlineStreamProcessors.length) {
            finishedCb({ sender: this, id: manifestId, message: 'Downloading has been successfully completed for this stream !' });
        }
    }

    function onStreamProgression(streamProcessor, downloadedSegments, availableSegments) {
        progressionById[streamProcessor.getRepresentationId()] = {
            downloadedSegments: downloadedSegments,
            availableSegments: availableSegments
        };

        var segments = 0;
        var allSegments = 0;
        var waitForAllProgress = undefined;
        for (var property in progressionById) {
            if (progressionById.hasOwnProperty(property)) {
                if (progressionById[property] === null) {
                    waitForAllProgress = true;
                } else {
                    segments += progressionById[property].downloadedSegments;
                    allSegments += progressionById[property].availableSegments;
                }
            }
        }

        if (!waitForAllProgress && progressionCb) {
            // all progression have been started, we can compute global progression
            if (allSegments > 0) {
                progressionCb(instance, segments, allSegments);
            }
        }
    }

    function onDataUpdateCompleted(e) {
        var repCtrl = e.sender;
        if (!streamInfo || repCtrl.getStreamId() !== streamInfo.id) return;

        if (e.currentRepresentation.segments && e.currentRepresentation.segments.length > 0) {
            representationsToUpdate.push(e.currentRepresentation);
        }

        var sp = undefined;
        // data are ready fr stream processor, let's start download
        for (var i = 0; i < offlineStreamProcessors.length; i++) {
            if (offlineStreamProcessors[i].getRepresentationController() === repCtrl) {
                sp = offlineStreamProcessors[i];
                break;
            }
        }

        if (sp) {
            checkIfAllOfflineStreamProcessorsStarted();
        }
    }

    function checkIfAllOfflineStreamProcessorsStarted() {
        startedOfflineStreamProcessors++;
        if (startedOfflineStreamProcessors === offlineStreamProcessors.length) {
            startedCb({ sender: this, id: manifestId, message: 'Downloading started for this stream !' });

            if (representationsToUpdate.length > 0) {
                updateManifest({ sender: this, id: manifestId, representations: representationsToUpdate });
            } else {
                startOfflineStreamProcessors();
            }
        }
    }

    function getStreamInfo() {
        return streamInfo;
    }

    function getStartTime() {
        return streamInfo ? streamInfo.start : NaN;
    }

    function getDuration() {
        return streamInfo ? streamInfo.duration : NaN;
    }

    /**
     * Stop offline stream processors
     */
    function stopOfflineStreamProcessors() {
        for (var i = 0; i < offlineStreamProcessors.length; i++) {
            offlineStreamProcessors[i].stop();
        }
    }

    /**
     * Start offline stream processors
     */
    function startOfflineStreamProcessors() {
        for (var i = 0; i < offlineStreamProcessors.length; i++) {
            offlineStreamProcessors[i].start();
        }
    }

    function deactivate() {
        var ln = offlineStreamProcessors ? offlineStreamProcessors.length : 0;
        for (var i = 0; i < ln; i++) {
            offlineStreamProcessors[i].removeExecutedRequestsBeforeTime(getStartTime() + getDuration());
            offlineStreamProcessors[i].reset();
        }
    }

    /**
     * Reset
     */
    function reset() {
        stopOfflineStreamProcessors();
        deactivate();
        resetInitialSettings();

        eventBus.off(events.DATA_UPDATE_COMPLETED, onDataUpdateCompleted, this);
    }

    instance = {
        initialize: initialize,
        getDownloadableRepresentations: getDownloadableRepresentations,
        initializeAllMediasInfoList: initializeAllMediasInfoList,
        getStreamInfo: getStreamInfo,
        stopOfflineStreamProcessors: stopOfflineStreamProcessors,
        startOfflineStreamProcessors: startOfflineStreamProcessors,
        reset: reset
    };

    setup();
    return instance;
}

OfflineStream.__dashjs_factory_name = 'OfflineStream';
exports['default'] = dashjs.FactoryMaker.getClassFactory(OfflineStream);
/* jshint ignore:line */
module.exports = exports['default'];

},{"./OfflineStreamProcessor":9}],9:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventsOfflineEvents = _dereq_('./events/OfflineEvents');

var _eventsOfflineEvents2 = _interopRequireDefault(_eventsOfflineEvents);

/**
 * @module OfflineStreamProcessor
 * @param {object} config configuration
 * @description Arrange downloading for each type
 */
function OfflineStreamProcessor(config) {

    config = config || {};
    var eventBus = config.eventBus;
    var events = config.events;
    var debug = config.debug;
    var constants = config.constants;
    var manifestId = config.id;
    var completedCb = config.callbacks && config.callbacks.completed;
    var progressCb = config.callbacks && config.callbacks.progression;

    var instance = undefined,
        adapter = undefined,
        logger = undefined,
        indexHandler = undefined,
        representationController = undefined,
        type = undefined,
        mimeType = undefined,
        fragmentModel = undefined,
        mediaInfo = undefined,
        bitrate = undefined,
        updating = undefined,
        offlineStoreController = undefined,
        downloadedSegments = undefined,
        isInitialized = undefined,
        isStopped = undefined,
        stream = undefined;

    function setConfig(config) {

        if (!config) return;

        if (config.type) {
            type = config.type;
        }

        if (config.stream) {
            stream = config.stream;
        }

        if (config.mimeType) {
            mimeType = config.mimeType;
        }

        if (config.adapter) {
            adapter = config.adapter;
        }

        if (config.mediaInfo) {
            mediaInfo = config.mediaInfo;
        }

        if (config.bitrate) {
            bitrate = config.bitrate;
        }

        if (config.offlineStoreController) {
            offlineStoreController = config.offlineStoreController;
        }
    }

    function setup() {
        resetInitialSettings();
        logger = debug.getLogger(instance);
        eventBus.on(events.STREAM_COMPLETED, onStreamCompleted, instance);
        eventBus.on(events.FRAGMENT_LOADING_COMPLETED, onFragmentLoadingCompleted, instance);
    }

    function isInitRequest(request) {
        return request.type === 'InitializationSegment';
    }

    function onFragmentLoadingCompleted(e) {
        if (e.sender !== fragmentModel) {
            return;
        }

        if (e.request !== null) {
            (function () {
                var isInit = isInitRequest(e.request);
                var suffix = isInit ? 'init' : e.request.index;
                var fragmentName = e.request.representationId + '_' + suffix;
                offlineStoreController.storeFragment(manifestId, fragmentName, e.response).then(function () {
                    if (!isInit) {
                        // store current index and downloadedSegments number
                        offlineStoreController.setRepresentationCurrentState(manifestId, e.request.representationId, {
                            index: e.request.index,
                            downloaded: downloadedSegments
                        });
                    }
                });
            })();
        }

        if (e.error && e.request.serviceLocation && !isStopped) {
            fragmentModel.executeRequest(e.request);
        } else {
            downloadedSegments++;
            download();
        }
    }

    function onStreamCompleted(e) {
        if (e.fragmentModel !== fragmentModel) {
            return;
        }
        logger.info('[' + manifestId + '] Stream is complete');
        stop();
        completedCb();
    }

    function getRepresentationController() {
        return representationController;
    }

    function getRepresentationId() {
        return representationController.getCurrentRepresentation().id;
    }

    /**
     * Stops download of fragments
     * @memberof OfflineStreamProcessor#
     */
    function stop() {
        if (isStopped) {
            return;
        }
        isStopped = true;
    }

    function initializeDownloader() {
        updateRepresentation(mediaInfo);
    }

    function setDashElements(handler, fragModel, repController) {
        indexHandler = handler;
        indexHandler.initialize(false);

        fragmentModel = fragModel;
        representationController = repController;

        initializeDownloader();
    }

    /**
     * Initialization
     * @memberof OfflineStreamProcessor#
    */
    function initialize() {
        eventBus.trigger(_eventsOfflineEvents2['default'].DASH_ELEMENTS_CREATION_NEEDED, { sender: instance, config: { type: type,
                mimeType: mimeType,
                streamInfo: getStreamInfo() } });
    }

    function removeExecutedRequestsBeforeTime(time) {
        if (fragmentModel) {
            fragmentModel.removeExecutedRequestsBeforeTime(time);
        }
    }

    /**
     * Execute init request for the represenation
     * @memberof OfflineStreamProcessor#
    */
    function getInitRequest() {
        if (!representationController.getCurrentRepresentation()) {
            return null;
        }

        return indexHandler.getInitRequest(getMediaInfo(), representationController.getCurrentRepresentation());
    }

    /**
     * Get next request
     * @memberof OfflineStreamProcessor#
    */
    function getNextRequest() {
        return indexHandler.getNextSegmentRequest(getMediaInfo(), representationController.getCurrentRepresentation());
    }

    /**
     * Start download
     * @memberof OfflineStreamProcessor#
    */
    function start() {
        if (representationController) {
            if (!representationController.getCurrentRepresentation()) {
                throw new Error('Start denied to OfflineStreamProcessor');
            }
            isStopped = false;

            offlineStoreController.getRepresentationCurrentState(manifestId, representationController.getCurrentRepresentation().id).then(function (state) {
                if (state) {
                    indexHandler.setCurrentIndex(state.index);
                    downloadedSegments = state.downloaded;
                }
                download();
            })['catch'](function () {
                // start from beginining
                download();
            });
        }
    }

    /**
     * Performs download of fragment according to type
     * @memberof OfflineStreamProcessor#
    */
    function download() {
        if (isStopped) {
            return;
        }

        if (isNaN(representationController.getCurrentRepresentation())) {
            var request = null;
            if (!isInitialized) {
                request = getInitRequest();
                isInitialized = true;
            } else {
                request = getNextRequest();

                // update progression : done here because availableSegmentsNumber is done in getNextRequest from dash handler
                updateProgression();
            }

            if (request) {
                logger.info('[' + manifestId + '] download request : ' + request.url);
                fragmentModel.executeRequest(request);
            } else {
                logger.info('[' + manifestId + '] no request to be downloaded');
            }
        }
    }

    /**
     * Update representation
     * @param {Object} mediaInfo - mediaInfo
     * @memberof OfflineStreamProcessor#
     */
    function updateRepresentation(mediaInfo) {
        updating = true;

        var voRepresentations = adapter.getVoRepresentations(mediaInfo);

        // get representation VO according to id.
        var quality = voRepresentations.findIndex(function (representation) {
            return representation.id === bitrate.id;
        });

        if (type !== constants.VIDEO && type !== constants.AUDIO && type !== constants.TEXT && type !== constants.FRAGMENTED_TEXT) {
            updating = false;
            return;
        }

        representationController.updateData(null, voRepresentations, type, quality);
    }

    function getStreamInfo() {
        return stream ? stream.getStreamInfo() : null;
    }

    function isUpdating() {
        return updating;
    }

    function getType() {
        return type;
    }

    function getMediaInfo() {
        return mediaInfo;
    }

    function getAvailableSegmentsNumber() {
        return representationController.getCurrentRepresentation().availableSegmentsNumber + 1; // do not forget init segment
    }

    function updateProgression() {
        if (progressCb) {
            progressCb(instance, downloadedSegments, getAvailableSegmentsNumber());
        }
    }

    function resetInitialSettings() {
        isInitialized = false;
        downloadedSegments = 0;
        mimeType = null;
        mediaInfo = null;
        bitrate = null;
        updating = false;
        type = null;
        stream = null;
    }

    /**
     * Reset
     * @memberof OfflineStreamProcessor#
    */
    function reset() {
        resetInitialSettings();
        indexHandler.reset();

        eventBus.off(events.STREAM_COMPLETED, onStreamCompleted, instance);
        eventBus.off(events.FRAGMENT_LOADING_COMPLETED, onFragmentLoadingCompleted, instance);
    }

    instance = {
        initialize: initialize,
        setConfig: setConfig,
        getStreamInfo: getStreamInfo,
        getMediaInfo: getMediaInfo,
        getRepresentationController: getRepresentationController,
        removeExecutedRequestsBeforeTime: removeExecutedRequestsBeforeTime,
        getType: getType,
        getRepresentationId: getRepresentationId,
        isUpdating: isUpdating,
        start: start,
        stop: stop,
        getAvailableSegmentsNumber: getAvailableSegmentsNumber,
        setDashElements: setDashElements,
        reset: reset
    };

    setup();

    return instance;
}
OfflineStreamProcessor.__dashjs_factory_name = 'OfflineStreamProcessor';
var factory = dashjs.FactoryMaker.getClassFactory(OfflineStreamProcessor); /* jshint ignore:line */
exports['default'] = factory;
module.exports = exports['default'];

},{"./events/OfflineEvents":14}],10:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Offline constants declaration
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var OfflineConstants = (function () {
  _createClass(OfflineConstants, [{
    key: 'init',
    value: function init() {
      this.OFFLINE_SCHEME = 'offline_indexdb';
      this.OFFLINE_URL_REGEX = /^offline_indexdb:\/\//i;
      this.OFFLINE_STATUS_CREATED = 'created';
      this.OFFLINE_STATUS_STARTED = 'started';
      this.OFFLINE_STATUS_STOPPED = 'stopped';
      this.OFFLINE_STATUS_FINISHED = 'finished';
      this.OFFLINE_STATUS_ERROR = 'error';
    }
  }]);

  function OfflineConstants() {
    _classCallCheck(this, OfflineConstants);

    this.init();
  }

  return OfflineConstants;
})();

var constants = new OfflineConstants();
exports['default'] = constants;
module.exports = exports['default'];

},{}],11:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsOfflineConstants = _dereq_('../constants/OfflineConstants');

var _constantsOfflineConstants2 = _interopRequireDefault(_constantsOfflineConstants);

var _OfflineStoreController = _dereq_('./OfflineStoreController');

var _OfflineStoreController2 = _interopRequireDefault(_OfflineStoreController);

var _OfflineDownload = _dereq_('../OfflineDownload');

var _OfflineDownload2 = _interopRequireDefault(_OfflineDownload);

var _netIndexDBOfflineLoader = _dereq_('../net/IndexDBOfflineLoader');

var _netIndexDBOfflineLoader2 = _interopRequireDefault(_netIndexDBOfflineLoader);

var _utilsOfflineUrlUtils = _dereq_('../utils/OfflineUrlUtils');

var _utilsOfflineUrlUtils2 = _interopRequireDefault(_utilsOfflineUrlUtils);

var _eventsOfflineEvents = _dereq_('../events/OfflineEvents');

var _eventsOfflineEvents2 = _interopRequireDefault(_eventsOfflineEvents);

var _errorsOfflineErrors = _dereq_('../errors/OfflineErrors');

var _errorsOfflineErrors2 = _interopRequireDefault(_errorsOfflineErrors);

var _voOfflineDownloadVo = _dereq_('../vo/OfflineDownloadVo');

var _voOfflineDownloadVo2 = _interopRequireDefault(_voOfflineDownloadVo);

/**
 * @class OfflineController
 */
function OfflineController() {

    var context = this.context;

    var instance = undefined,
        downloads = undefined,
        adapter = undefined,
        schemeLoaderFactory = undefined,
        debug = undefined,
        logger = undefined,
        manifestLoader = undefined,
        manifestModel = undefined,
        manifestUpdater = undefined,
        baseURLController = undefined,
        offlineStoreController = undefined,
        urlUtils = undefined,
        offlineUrlUtils = undefined,
        events = undefined,
        eventBus = undefined,
        constants = undefined,
        dashConstants = undefined,
        errHandler = undefined;

    function setup() {
        offlineUrlUtils = (0, _utilsOfflineUrlUtils2['default'])(context).getInstance();

        downloads = [];
    }

    function setConfig(config) {
        if (!config) return;

        if (config.errHandler) {
            errHandler = config.errHandler;
        }

        if (config.events && config.eventBus) {
            events = config.events;
            eventBus = config.eventBus;
            offlineStoreController = (0, _OfflineStoreController2['default'])(context).create({ eventBus: config.eventBus, errHandler: errHandler });
        }

        if (config.debug) {
            debug = config.debug;
            logger = debug.getLogger(instance);
        }

        if (config.manifestLoader) {
            manifestLoader = config.manifestLoader;
        }

        if (config.manifestModel) {
            manifestModel = config.manifestModel;
        }

        if (config.adapter) {
            adapter = config.adapter;
        }

        if (config.manifestUpdater) {
            manifestUpdater = config.manifestUpdater;
        }

        if (config.baseURLController) {
            baseURLController = config.baseURLController;
        }

        if (config.schemeLoaderFactory) {
            schemeLoaderFactory = config.schemeLoaderFactory;
        }

        if (config.constants) {
            constants = config.constants;
        }

        if (config.dashConstants) {
            dashConstants = config.dashConstants;
        }

        if (config.urlUtils) {
            urlUtils = config.urlUtils;
            urlUtils.registerUrlRegex(offlineUrlUtils.getRegex(), offlineUrlUtils);
        }

        schemeLoaderFactory.registerLoader(_constantsOfflineConstants2['default'].OFFLINE_SCHEME, _netIndexDBOfflineLoader2['default']);
    }

    /*
    ---------------------------------------------------------------------------
         DOWNLOAD LIST FUNCTIONS
     ---------------------------------------------------------------------------
    */
    function getDownloadFromId(id) {
        var download = downloads.find(function (item) {
            return item.getId() === id;
        });
        return download;
    }

    function createDownloadFromId(id) {
        var download = undefined;
        download = getDownloadFromId(id);

        if (!download) {
            // create download controller
            download = (0, _OfflineDownload2['default'])(context).create({
                id: id,
                eventBus: eventBus,
                events: events,
                manifestLoader: manifestLoader,
                manifestModel: manifestModel,
                manifestUpdater: manifestUpdater,
                baseURLController: baseURLController,
                adapter: adapter,
                errHandler: errHandler,
                offlineStoreController: offlineStoreController,
                debug: debug,
                constants: constants,
                dashConstants: dashConstants,
                urlUtils: urlUtils
            });

            downloads.push(download);
        }

        return download;
    }

    function createDownloadFromStorage(offline) {
        var download = getDownloadFromId(offline.manifestId);

        if (!download) {
            download = createDownloadFromId(offline.manifestId);
            var _status = offline.status;
            if (_status === _constantsOfflineConstants2['default'].OFFLINE_STATUS_STARTED) {
                _status = _constantsOfflineConstants2['default'].OFFLINE_STATUS_STOPPED;
            }

            download.setInitialState({
                url: offline.url,
                progress: offline.progress,
                originalUrl: offline.originalURL,
                status: _status
            });
        }

        return download;
    }

    function removeDownloadFromId(id) {
        return new Promise(function (resolve, reject) {
            var download = getDownloadFromId(id);
            var waitForStatusChanged = false;
            if (download) {
                //is download running?
                if (download.isDownloading()) {
                    (function () {
                        //register status changed event
                        waitForStatusChanged = true;
                        var downloadStopped = function downloadStopped() {
                            eventBus.off(events.DOWNLOADING_STOPPED, downloadStopped, instance);
                            return offlineStoreController.deleteDownloadById(id).then(function () {
                                resolve();
                            })['catch'](function (err) {
                                reject(err);
                            });
                        };
                        eventBus.on(events.DOWNLOADING_STOPPED, downloadStopped, instance);
                    })();
                }
                download.deleteDownload();
                var index = downloads.indexOf(download);
                downloads.splice(index, 1);
            }

            if (!waitForStatusChanged) {
                resolve();
            }
        });
    }

    /*
    ---------------------------------------------------------------------------
         DOWNLOAD FUNCTIONS
     ---------------------------------------------------------------------------
    */
    function generateManifestId() {
        var timestamp = new Date().getTime();
        return timestamp;
    }

    function loadDownloadsFromStorage() {

        return new Promise(function (resolve, reject) {
            offlineStoreController.getAllManifests().then(function (items) {
                items.manifests.forEach(function (offline) {
                    createDownloadFromStorage(offline);
                });

                resolve();
            })['catch'](function (e) {
                logger.error('Failed to load downloads ' + e);
                reject(e);
            });
        });
    }

    function createDownload(url) {
        return new Promise(function (resolve, reject) {
            var id = generateManifestId();

            // create download controller
            var download = createDownloadFromId(id);

            download.downloadFromUrl(url).then(function () {
                resolve(id);
            })['catch'](function (e) {
                logger.error('Failed to download ' + e);
                removeDownloadFromId(id).then(function () {
                    reject(e);
                });
            });
        });
    }

    function initDownload(id) {
        var download = getDownloadFromId(id);
        if (download) {
            download.initDownload();
        }
    }

    function startDownload(id, selectedRepresentations) {
        var download = getDownloadFromId(id);
        if (download) {
            download.startDownload(selectedRepresentations);
        }
    }

    function getAllDownloads() {

        var ret = [];
        downloads.forEach(function (download) {
            var offlineDownload = new _voOfflineDownloadVo2['default']();
            offlineDownload.id = download.getId();
            offlineDownload.progress = download.getDownloadProgression();
            offlineDownload.url = download.getOfflineUrl();
            offlineDownload.originalUrl = download.getManifestUrl();
            offlineDownload.status = download.getStatus();
            ret.push(offlineDownload);
        });

        return ret;
    }

    function stopDownload(id) {
        var download = getDownloadFromId(id);
        if (download) {
            download.stopDownload();
        }
    }

    function deleteDownload(id) {
        return removeDownloadFromId(id).then(function () {
            return offlineStoreController.deleteDownloadById(id);
        });
    }

    function resumeDownload(id) {
        var download = getDownloadFromId(id);
        if (download) {
            download.resumeDownload();
        }
    }

    function getDownloadProgression(id) {
        var download = getDownloadFromId(id);
        if (download) {
            return download.getDownloadProgression();
        }
        return 0;
    }

    function resetDownloads() {
        downloads.forEach(function (download) {
            download.resetDownload();
        });
    }

    /**
     * Reset
     * @instance
     */
    function reset() {
        resetDownloads();
        schemeLoaderFactory.unregisterLoader(_constantsOfflineConstants2['default'].OFFLINE_SCHEME);
    }

    instance = {
        setConfig: setConfig,
        loadDownloadsFromStorage: loadDownloadsFromStorage,
        createDownload: createDownload,
        initDownload: initDownload,
        startDownload: startDownload,
        stopDownload: stopDownload,
        resumeDownload: resumeDownload,
        deleteDownload: deleteDownload,
        getDownloadProgression: getDownloadProgression,
        getAllDownloads: getAllDownloads,
        resetDownloads: resetDownloads,
        reset: reset
    };

    setup();

    return instance;
}

OfflineController.__dashjs_factory_name = 'OfflineController';
var factory = dashjs.FactoryMaker.getClassFactory(OfflineController); /* jshint ignore:line */
factory.events = _eventsOfflineEvents2['default'];
factory.errors = _errorsOfflineErrors2['default'];
dashjs.FactoryMaker.updateClassFactory(OfflineController.__dashjs_factory_name, factory); /* jshint ignore:line */
exports['default'] = factory;
module.exports = exports['default'];

},{"../OfflineDownload":7,"../constants/OfflineConstants":10,"../errors/OfflineErrors":13,"../events/OfflineEvents":14,"../net/IndexDBOfflineLoader":16,"../utils/OfflineUrlUtils":19,"../vo/OfflineDownloadVo":20,"./OfflineStoreController":12}],12:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _storageIndexDBStore = _dereq_('../storage/IndexDBStore');

var _storageIndexDBStore2 = _interopRequireDefault(_storageIndexDBStore);

var _errorsOfflineErrors = _dereq_('../errors/OfflineErrors');

var _errorsOfflineErrors2 = _interopRequireDefault(_errorsOfflineErrors);

/**
 * @class OfflineStoreController
 * This class manages database store
 * @description Offline Storage Controller
 */
function OfflineStoreController(config) {

    config = config || {};
    var context = this.context;
    var errHandler = config.errHandler;

    var instance = undefined,
        indexDBStore = undefined;

    function setup() {
        indexDBStore = (0, _storageIndexDBStore2['default'])(context).getInstance();
    }

    function createFragmentStore(manifestId, storeName) {
        try {
            indexDBStore.createFragmentStore(manifestId, storeName);
        } catch (err) {
            manageDOMError(err);
        }
    }

    function storeFragment(manifestId, fragmentId, fragmentData) {
        return indexDBStore.storeFragment(manifestId, fragmentId, fragmentData)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function createOfflineManifest(manifest) {
        return indexDBStore.storeManifest(manifest)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function updateOfflineManifest(manifest) {
        return indexDBStore.updateManifest(manifest)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function getManifestById(manifestId) {
        return indexDBStore.getManifestById(manifestId)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function saveSelectedRepresentations(manifestId, selected) {
        return indexDBStore.saveSelectedRepresentations(manifestId, selected)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function getCurrentHigherManifestId() {
        return indexDBStore.getCurrentHigherManifestId()['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function getAllManifests() {
        return indexDBStore.getAllManifests()['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function deleteDownloadById(manifestId) {
        return indexDBStore.deleteDownloadById(manifestId)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function setDownloadingStatus(manifestId, status) {
        return indexDBStore.setDownloadingStatus(manifestId, status)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function setRepresentationCurrentState(manifestId, representationId, state) {
        return indexDBStore.setRepresentationCurrentState(manifestId, representationId, state)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function getRepresentationCurrentState(manifestId, representationId) {
        return indexDBStore.getRepresentationCurrentState(manifestId, representationId)['catch'](function (err) {
            manageDOMError(err);
        });
    }

    function manageDOMError(err) {
        var error = undefined;
        if (err) {
            switch (err.name) {
                case 'QuotaExceededError':
                    error = _errorsOfflineErrors2['default'].INDEXEDDB_QUOTA_EXCEED_ERROR;
                    break;
                case 'InvalidStateError':
                    error = _errorsOfflineErrors2['default'].INDEXEDDB_INVALID_STATE_ERROR;
                    break;
                case 'NotFoundError':
                    error = _errorsOfflineErrors2['default'].INDEXEDDB_NOT_FOUND_ERROR;
                    break;
                case 'VersionError':
                    error = _errorsOfflineErrors2['default'].INDEXEDDB_VERSION_ERROR;
                    break;
                // TODO : Manage all DOM cases
            }

            // avoid importing DashJSError object from streaming
            errHandler.error({ code: error, message: err.name, data: err });
        }
    }

    instance = {
        storeFragment: storeFragment,
        createOfflineManifest: createOfflineManifest,
        updateOfflineManifest: updateOfflineManifest,
        getManifestById: getManifestById,
        saveSelectedRepresentations: saveSelectedRepresentations,
        createFragmentStore: createFragmentStore,
        getCurrentHigherManifestId: getCurrentHigherManifestId,
        getAllManifests: getAllManifests,
        deleteDownloadById: deleteDownloadById,
        setDownloadingStatus: setDownloadingStatus,
        setRepresentationCurrentState: setRepresentationCurrentState,
        getRepresentationCurrentState: getRepresentationCurrentState
    };

    setup();

    return instance;
}

OfflineStoreController.__dashjs_factory_name = 'OfflineStoreController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(OfflineStoreController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"../errors/OfflineErrors":13,"../storage/IndexDBStore":17}],13:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * Offline Errors declaration
 * @class
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Errors = function Errors() {
  _classCallCheck(this, Errors);

  /**
   * Error code returned when an error occurs in offline module
   */
  this.OFFLINE_ERROR = 11000;

  // Based upon https://developer.mozilla.org/fr/docs/Web/API/DOMException
  this.INDEXEDDB_QUOTA_EXCEED_ERROR = 11001;
  this.INDEXEDDB_INVALID_STATE_ERROR = 11002;
  this.INDEXEDDB_NOT_READABLE_ERROR = 11003;
  this.INDEXEDDB_NOT_FOUND_ERROR = 11004;
  this.INDEXEDDB_NETWORK_ERROR = 11005;
  this.INDEXEDDB_DATA_ERROR = 11006;
  this.INDEXEDDB_TRANSACTION_INACTIVE_ERROR = 11007;
  this.INDEXEDDB_NOT_ALLOWED_ERROR = 11008;
  this.INDEXEDDB_NOT_SUPPORTED_ERROR = 11009;
  this.INDEXEDDB_VERSION_ERROR = 11010;
  this.INDEXEDDB_TIMEOUT_ERROR = 11011;
  this.INDEXEDDB_ABORT_ERROR = 11012;
  this.INDEXEDDB_UNKNOWN_ERROR = 11013;
};

var errors = new Errors();
exports["default"] = errors;
module.exports = exports["default"];

},{}],14:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreEventsEventsBase = _dereq_('./../../core/events/EventsBase');

var _coreEventsEventsBase2 = _interopRequireDefault(_coreEventsEventsBase);

/**
 * These are offline events that should be sent to the player level.
 * @class
 * @ignore
 */

var OfflineEvents = (function (_EventsBase) {
  _inherits(OfflineEvents, _EventsBase);

  function OfflineEvents() {
    _classCallCheck(this, OfflineEvents);

    _get(Object.getPrototypeOf(OfflineEvents.prototype), 'constructor', this).call(this);

    this.DOWNLOADING_PAUSED = 'downloadingPaused';

    /**
     * Triggered when all mediaInfo has been loaded on OfflineStream
     * Return a list of available bitrateInfo needed to download stream.
     */
    this.DOWNLOADABLE_REPRESENTATIONS_LOADED = 'public_downloadableRepresentationsInfoLoaded';

    this.DASH_ELEMENTS_CREATION_NEEDED = 'dashElementsCreationNeeded';

    /** Triggered when the downloading is initialize and started
    * @event OfflineEvents#DOWNLOADING_STOPPED
    */
    this.DOWNLOADING_STARTED = 'public_downloadingStarted';

    /**
    * Triggered when the user stop current downloading
    * @event OfflineEvents#DOWNLOADING_STOPPED
    */
    this.DOWNLOADING_STOPPED = 'public_downloadingStopped';

    /**
    * Triggered when all fragments has been downloaded
    * @event OfflineEvents#DOWNLOADING_FINISHED
    */
    this.DOWNLOADING_FINISHED = 'public_downloadingFinished';
  }

  return OfflineEvents;
})(_coreEventsEventsBase2['default']);

var offlineEvents = new OfflineEvents();
exports['default'] = offlineEvents;
module.exports = exports['default'];

},{"./../../core/events/EventsBase":6}],15:[function(_dereq_,module,exports){
(function (global){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _controllersOfflineController = _dereq_('./controllers/OfflineController');

var _controllersOfflineController2 = _interopRequireDefault(_controllersOfflineController);

// Shove both of these into the global scope
var context = typeof window !== 'undefined' && window || global;

var dashjs = context.dashjs;
if (!dashjs) {
  dashjs = context.dashjs = {};
}

dashjs.OfflineController = _controllersOfflineController2['default'];

exports['default'] = dashjs;
exports.OfflineController = _controllersOfflineController2['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./controllers/OfflineController":11}],16:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _storageIndexDBStore = _dereq_('../storage/IndexDBStore');

var _storageIndexDBStore2 = _interopRequireDefault(_storageIndexDBStore);

/**
 * @module
 * @description Load Offline resources
 * @param {Object} config - dependences
 */
function IndexDBOfflineLoader(config) {
    config = config || {};
    var context = this.context;
    var urlUtils = config.urlUtils;
    var constants = config.constants;
    var dashConstants = config.dashConstants;

    var instance = undefined,
        indexDBStore = undefined;

    function setup() {
        indexDBStore = (0, _storageIndexDBStore2['default'])(context).getInstance();
    }

    function getManifestId(url) {
        var myURL = urlUtils.removeHostname(url);
        var parts = myURL.split('/');
        return parts[0];
    }
    /**
     * Load manifest or fragment from indexeddb database
     * @param {object} config configuration of request
     * @memberof module:offline
     * @instance
     */
    function load(config) {
        if (config.request) {
            var manifestId = getManifestId(config.request.url);
            if (manifestId % 1 === 0) {
                if (config.request.mediaType === constants.AUDIO || config.request.mediaType === constants.VIDEO || config.request.mediaType === constants.TEXT || config.request.mediaType === constants.MUXED || config.request.mediaType === constants.IMAGE || config.request.mediaType === constants.FRAGMENTED_TEXT || config.request.mediaType === constants.EMBEDDED_TEXT) {
                    var suffix = config.request.type === 'InitializationSegment' ? 'init' : config.request.index;
                    var key = config.request.representationId + '_' + suffix;
                    indexDBStore.getFragmentByKey(manifestId, key).then(function (fragment) {
                        config.success(fragment, null, config.request.url, constants.ARRAY_BUFFER);
                    })['catch'](function (err) {
                        config.error(err);
                    });
                } else if (config.request.type === dashConstants.MPD) {
                    indexDBStore.getManifestById(manifestId).then(function (item) {
                        indexDBStore.createFragmentStore(item.fragmentStore);
                        config.success(item.manifest, null, config.request.url, constants.XML);
                    })['catch'](function (err) {
                        config.error(config.request, 404, err);
                    });
                }
            } else {
                config.error(config.request, null, 'MediaType can not be found');
            }
        }
    }

    function abort() {
        // nothing to do
    }

    setup();

    instance = {
        load: load,
        abort: abort
    };

    return instance;
}

IndexDBOfflineLoader.__dashjs_factory_name = 'IndexDBOfflineLoader';
var factory = dashjs.FactoryMaker.getClassFactory(IndexDBOfflineLoader); /* jshint ignore:line */
exports['default'] = factory;
module.exports = exports['default'];

},{"../storage/IndexDBStore":17}],17:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var localforage = _dereq_('localforage');
var entities = _dereq_('html-entities').XmlEntities;

/**
 * @module  IndexDBStore
 * @description IndexedDB Access
 */
function IndexDBStore() {

    var instance = undefined,
        manifestStore = undefined,
        fragmentStores = undefined;

    function setup() {
        fragmentStores = {};

        if (typeof window === 'undefined') {
            return;
        }

        localforage.config({
            driver: localforage.INDEXEDDB,
            name: 'dash_offline_db'
        });

        manifestStore = localforage.createInstance({
            driver: localforage.INDEXEDDB,
            name: 'dash_offline_db',
            version: 1.0,
            storeName: 'manifest'
        });
    }

    /////////////////////////////////////////
    //
    // GET/SET Methods
    //
    ////////////////////////////////////////

    /**
     * Creates an instance of localforage to store fragments in indexed db
     * @param {string} storeName
     * @memberof module:IndexDBStore
     * @instance
     */
    function createFragmentStore(storeName) {

        if (!fragmentStores[storeName]) {
            console.log('setStore  ' + storeName);
            var fragmentStore = localforage.createInstance({
                driver: localforage.INDEXEDDB,
                name: 'dash_offline_db',
                version: 1.0,
                storeName: storeName
            });
            fragmentStores[storeName] = fragmentStore;
        }
    }

    /**
     * Update download status
     * @memberof module:IndexDBStore
     * @param {number} manifestId
     * @param {string} newStatus
     * @returns {Promise} promise
     * @instance
     */
    function setDownloadingStatus(manifestId, newStatus) {
        return getManifestById(manifestId).then(function (item) {
            item.status = newStatus;
            return updateManifest(item)['catch'](function () {
                return Promise.reject('Cannot set status ' + newStatus + ' for this stream !');
            });
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Updat last downloaded fragment index for representationId
     * @memberof module:IndexDBStore
     * @param {number} manifestId - manifest id
      * @param {string} representationId - representation
     * @param {number} state - representation state
     * @returns {Promise} promise
     * @instance
     */
    function setRepresentationCurrentState(manifestId, representationId, state) {
        return getManifestById(manifestId).then(function (item) {
            if (!item.state) {
                item.state = {};
            }

            if (!item.state[representationId]) {
                item.state[representationId] = {
                    index: -1,
                    downloaded: 0
                };
            }

            item.state[representationId] = state;
            return updateManifest(item)['catch'](function () {
                return Promise.reject('Cannot set current index for represenation id ' + representationId);
            });
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Returns current downloaded segment index for representation
     * @memberof module:IndexDBStore
     * @param {number} manifestId - manifest id
     * @param {string} representationId - representation
     * @returns {Promise} promise
     * @instance
     */
    function getRepresentationCurrentState(manifestId, representationId) {
        return getManifestById(manifestId).then(function (item) {
            var state = {
                index: -1,
                downloaded: 0
            };
            if (item.state && item.state[representationId]) {
                state = item.state[representationId];
            }
            return Promise.resolve(state);
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Returns a fragment from its key
     * @memberof module:IndexDBStore
     * @param {number} manifestId
     * @param {number} key
     * @returns {Promise} fragment
     * @instance
     */
    function getFragmentByKey(manifestId, key) {
        var fragmentStore = fragmentStores[manifestId];

        if (!fragmentStore) {
            return Promise.reject(new Error('No fragment store found for manifest ' + manifestId));
        }

        return fragmentStore.getItem(key).then(function (value) {
            return Promise.resolve(value);
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Returns a manifest from its identifier
     * @memberof module:IndexDBStore
     * @param {number} id
     * @returns {Promise} {Object[]} manifests
     * @instance
     */
    function getManifestById(id) {
        return getAllManifests().then(function (array) {
            if (array) {
                var item = null;
                for (var i = 0; i < array.manifests.length; i++) {
                    if (array.manifests[i].manifestId === parseInt(id)) {
                        item = array.manifests[i];
                    }
                }
                if (item !== null) {
                    item.manifest = entities.decode(item.manifest);
                    return Promise.resolve(item);
                } else {
                    return Promise.reject('Cannot found manifest with this manifestId : ' + id);
                }
            } else {
                return Promise.reject('Any manifests stored in DB !');
            }
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Returns all offline manifests
     * @memberof module:IndexDBStore
     * @returns {Promise} {Object[]} manifests
     * @instance
     */
    function getAllManifests() {
        return manifestStore.getItem('manifest').then(function (array) {
            return Promise.resolve(array ? array : {
                'manifests': []
            });
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Return higher manifest id
     * @memberof module:IndexDBStore
     * @returns {Promise} number
     * @instance
     */
    function getCurrentHigherManifestId() {
        return getAllManifests().then(function (array) {
            var higherManifestId = 0;
            if (array) {
                for (var i = 0; i < array.manifests.length; i++) {
                    if (array.manifests[i].manifestId > higherManifestId) {
                        higherManifestId = array.manifests[i].manifestId;
                    }
                }
                return Promise.resolve(higherManifestId);
            } else {
                return Promise.resolve(higherManifestId);
            }
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Update manifest
     * @memberof module:IndexDBStore
     * @param {Object} manifest updated manifest
     * @returns {Promise} promise asynchronously resolved
     * @instance
     */
    function updateManifest(manifest) {
        return getAllManifests().then(function (array) {
            try {
                for (var i = 0; i < array.manifests.length; i++) {
                    if (array.manifests[i].manifestId === manifest.manifestId) {
                        array.manifests[i] = manifest;
                    }
                }
                return manifestStore.setItem('manifest', array);
            } catch (err) {
                throw new Error('Any results found !');
            }
        });
    }

    /**
     * save selected representation by user
     * @memberof module:IndexDBStore
     * @param {Object} manifest updated manifest
     * @param {Object} selected selected representations
     * @returns {Promise} promise asynchronously resolved
     * @instance
     */
    function saveSelectedRepresentations(manifest, selected) {
        return getManifestById(manifest).then(function (item) {
            if (!item.selected) {
                item.selected = {};
            }

            item.selected = selected;
            return updateManifest(item)['catch'](function () {
                return Promise.reject('Cannot save selected representations');
            });
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Store a manifest in manifest array
     * @memberof module:IndexDBStore
     * @param {Object} manifest
     * @instance
     */
    function storeManifest(manifest) {
        return manifestStore.getItem('manifest').then(function (results) {
            var array = results ? results : {
                'manifests': []
            };
            array.manifests.push(manifest);
            return manifestStore.setItem('manifest', array);
        });
    }

    /**
     * Store a fragment in fragment store
     * @memberof module:IndexDBStore
     * @param {number} manifestId
     * @param {number} fragmentId
     * @param {Object} fragmentData
     * @returns {Promise} promise asynchronously resolved
     * @instance
     */
    function storeFragment(manifestId, fragmentId, fragmentData) {
        var fragmentStore = fragmentStores[manifestId];

        if (!fragmentStore) {
            return Promise.reject(new Error('No fragment store found for manifest ' + manifestId));
        }

        return fragmentStore.setItem(fragmentId, fragmentData, function () {
            return Promise.resolve();
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /////////////////////////////////////////
    //
    // DROP Methods
    //
    ////////////////////////////////////////

    /**
     * Remove all manifest and fragment store
     * @memberof module:IndexDBStore
     * @returns {Promise} promise asynchronously resolved
     * @instance
     */
    function dropAll() {
        return localforage.clear().then(function () {
            return Promise.resolve();
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Remove framgent store given its name
     * @param {string} storeName
     * @memberof module:IndexDBStore
     * @instance
     */
    function dropFragmentStore(storeName) {
        localforage.dropInstance({
            driver: localforage.INDEXEDDB,
            name: 'dash_offline_db',
            version: 1.0,
            storeName: storeName
        }).then(function () {
            delete fragmentStores[storeName];
        })['catch'](function (err) {
            console.log('dropFragmentStore failed ' + err);
        });
        return;
    }

    /**
     * Remove download given its id (fragmentStore + manifest entry in manifest array)
     * @memberof module:IndexDBStore
     * @param {number} manifestId
     * @returns {Promise} promise asynchronously resolved
     * @instance
     */
    function deleteDownloadById(manifestId) {
        return manifestStore.getItem('manifest').then(function (array) {
            if (array) {
                return deleteFragmentStore(manifestId).then(function () {
                    for (var i = 0; i < array.manifests.length; i++) {
                        if (array.manifests[i].manifestId === parseInt(manifestId)) {
                            array.manifests.splice(i, 1);
                        }
                    }
                    return manifestStore.setItem('manifest', array).then(function () {
                        return Promise.resolve('This stream has been successfull removed !');
                    })['catch'](function () {
                        return Promise.reject('An error occured when trying to delete this manifest');
                    });
                });
            } else {
                return Promise.resolve('Nothing to delete !');
            }
        })['catch'](function (err) {
            return Promise.reject(err);
        });
    }

    /**
     * Remove fragment store
     * @memberof module:IndexDBStore
     * @param {string} storeName
     * @returns {Promise} promise asynchronously resolved
     * @instance
     */
    function deleteFragmentStore(storeName) {
        localforage.createInstance({
            name: 'dash_offline_db',
            storeName: storeName
        });
        return localforage.dropInstance({
            name: 'dash_offline_db',
            storeName: storeName
        }).then(function () {
            delete fragmentStores[storeName];
            return Promise.resolve();
        })['catch'](function (err) {
            console.log(err);
            return Promise.reject(err);
        });
    }

    setup();

    instance = {
        dropAll: dropAll,
        getFragmentByKey: getFragmentByKey,
        getManifestById: getManifestById,
        storeFragment: storeFragment,
        storeManifest: storeManifest,
        updateManifest: updateManifest,
        saveSelectedRepresentations: saveSelectedRepresentations,
        createFragmentStore: createFragmentStore,
        setDownloadingStatus: setDownloadingStatus,
        setRepresentationCurrentState: setRepresentationCurrentState,
        getRepresentationCurrentState: getRepresentationCurrentState,
        getCurrentHigherManifestId: getCurrentHigherManifestId,
        getAllManifests: getAllManifests,
        dropFragmentStore: dropFragmentStore,
        deleteDownloadById: deleteDownloadById
    };

    return instance;
}

IndexDBStore.__dashjs_factory_name = 'IndexDBStore';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(IndexDBStore);
/* jshint ignore:line */
module.exports = exports['default'];

},{"html-entities":1,"localforage":5}],18:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Entities = _dereq_('html-entities').XmlEntities;
var OFFLINE_BASE_URL = 'offline_indexdb://';

/**
 * @module OfflineIndexDBManifestParser
 * @description  Parse online manifest to offline manifest
 * @param {Object} config - dependances
*/
function OfflineIndexDBManifestParser(config) {

    var manifestId = config.manifestId;
    var allMediaInfos = config.allMediaInfos;
    var urlUtils = config.urlUtils;
    var debug = config.debug;
    var dashConstants = config.dashConstants;
    var constants = config.constants;

    var instance = undefined,
        DOM = undefined,
        logger = undefined;

    function setup() {
        logger = debug.getLogger(instance);
    }

    /**
     * Parse XML manifest
     * @param {string} XMLDoc - xml manifest
     * @param {object} representation
     * @returns {Promise} a promise that will be resolved or rejected at the end of encoding process
     * @memberof module:OfflineIndexDBManifestParser
     * @instance
    */
    function parse(XMLDoc, representation) {
        return new Promise(function (resolve, reject) {

            DOM = new DOMParser().parseFromString(XMLDoc, 'application/xml');
            var mpd = DOM.getElementsByTagName(dashConstants.MPD) ? DOM.getElementsByTagName(dashConstants.MPD) : null;

            for (var i = 0; i < mpd.length; i++) {
                if (mpd[i] !== null) {
                    editBaseURLAttribute(mpd[i]);
                    browsePeriods(mpd[i], representation);
                }
            }

            var manifestEncoded = encodeManifest(DOM);
            if (manifestEncoded !== '') {
                resolve(manifestEncoded);
            } else {
                reject('Encoded error');
            }
        });
    }

    /**
     * URL encode parsed manifest
     * @param {string} DOM
     * @memberof module:OfflineIndexDBManifestParser
     * @returns {string} Url encoded XML
     * @instance
    */
    function encodeManifest(DOM) {
        logger.info('encodedManifest ' + new XMLSerializer().serializeToString(DOM));
        return new Entities().encode(new XMLSerializer().serializeToString(DOM));
    }

    /**
     * Update baseURL to point to local stored data P
     * @param {XML} currentMPD
     * @memberof module:OfflineIndexDBManifestParser
     * @instance
    */
    function editBaseURLAttribute(currentMPD) {
        var basesURL = undefined,
            fragmentId = undefined,
            representationId = undefined;

        var url = '' + OFFLINE_BASE_URL + manifestId + '/';

        basesURL = currentMPD.getElementsByTagName(dashConstants.BASE_URL);

        if (basesURL.length === 0) {
            // add baseURL
            var element = DOM.createElement(dashConstants.BASE_URL);
            element.innerHTML = url;
            currentMPD.appendChild(element);
        }
        basesURL = currentMPD.getElementsByTagName(dashConstants.BASE_URL);
        for (var i = 0; i < basesURL.length; i++) {
            var _parent = basesURL[i].parentNode;

            if (_parent.nodeName === dashConstants.MPD) {
                basesURL[i].innerHTML = url;
            } else if (_parent.nodeName === dashConstants.REPRESENTATION) {
                var adaptationsSet = _parent.parentNode;
                if (adaptationsSet.nodeName == dashConstants.ADAPTATION_SET) {

                    if (urlUtils.isHTTPS(basesURL[i].innerHTML) || urlUtils.isHTTPURL(basesURL[i].innerHTML)) {
                        fragmentId = getFragmentId(basesURL[i].innerHTML);
                        representationId = getBestRepresentationId(adaptationsSet);
                        basesURL[i].innerHTML = url + representationId + '_' + fragmentId;
                    } else if (basesURL[i].innerHTML === './') {
                        basesURL[i].innerHTML = url;
                    } else {
                        fragmentId = getFragmentId(basesURL[i].innerHTML);
                        representationId = getBestRepresentationId(adaptationsSet);
                        basesURL[i].innerHTML = representationId + '_' + fragmentId;
                    }
                }
            } else {
                basesURL[i].innerHTML = url;
            }
        }
    }

    /**
     * Browse periods
     * @param {XML} currentMPD
     * @param {Object} representation
     * @memberof module:OfflineIndexDBManifestParser
     * @instance
    */
    function browsePeriods(currentMPD, representation) {
        var periods = currentMPD.getElementsByTagName(dashConstants.PERIOD);
        for (var j = 0; j < periods.length; j++) {
            browseAdaptationsSet(periods[j], representation);
        }
    }

    /**
     * Browse adapatation set to update data (delete those taht are not choosen by user ...)
     * @param {XML} currentPeriod
     * @param {Array} representationsToUpdate
     * @memberof module:offline
     * @instance
    */
    function browseAdaptationsSet(currentPeriod, representationsToUpdate) {
        var adaptationsSet = undefined,
            currentAdaptationSet = undefined,
            currentAdaptationType = undefined,
            representations = undefined;

        adaptationsSet = currentPeriod.getElementsByTagName(dashConstants.ADAPTATION_SET);

        for (var i = adaptationsSet.length - 1; i >= 0; i--) {
            currentAdaptationSet = adaptationsSet[i];
            if (currentAdaptationSet) {
                currentAdaptationType = findAdaptationType(currentAdaptationSet);
                representations = findRepresentations(currentAdaptationSet);

                findAndKeepOnlySelectedRepresentations(currentAdaptationSet, representations, currentAdaptationType);

                representations = findRepresentations(currentAdaptationSet);

                deleteSegmentBase(currentAdaptationSet);

                if (representations.length === 0) {
                    currentPeriod.removeChild(currentAdaptationSet);
                } else {
                    //detect Segment list use case
                    for (var _i = 0; _i < representations.length; _i++) {
                        var rep = representations[_i];
                        var segmentList = getSegmentList(rep);
                        if (segmentList.length >= 1) {
                            editSegmentListAttributes(segmentList, rep);
                        }
                    }

                    var segmentTemplate = getSegmentTemplate(currentAdaptationSet);
                    // segmentTemplate is defined, update attributes in order to be correctly played offline
                    if (segmentTemplate.length >= 1) {
                        editSegmentTemplateAttributes(segmentTemplate);
                    }

                    // detect SegmentBase use case => transfrom manifest to SegmentList in SegmentTemplate
                    if (representationsToUpdate && representationsToUpdate.length > 0) {
                        var selectedRep = undefined;
                        for (var _i2 = 0; _i2 < representations.length; _i2++) {
                            var rep = representations[_i2];
                            for (var j = 0; representationsToUpdate && j < representationsToUpdate.length; j++) {
                                if (representationsToUpdate[j].id === rep.id) {
                                    selectedRep = representationsToUpdate[j];
                                    break;
                                }
                            }
                        }
                        addSegmentTemplateAttributes(currentAdaptationSet, selectedRep);
                    }
                }
            }
        }
    }

    /**
     * Returns type of adapation set
     * @param {XML} currentAdaptationSet
     * @memberof module:offline
     * @returns {string|null} type
     * @instance
    */
    function findAdaptationType(currentAdaptationSet) {
        if (getIsMuxed(currentAdaptationSet)) {
            return constants.MUXED;
        } else if (getIsAudio(currentAdaptationSet)) {
            return constants.AUDIO;
        } else if (getIsVideo(currentAdaptationSet)) {
            return constants.VIDEO;
        } else if (getIsFragmentedText(currentAdaptationSet)) {
            return constants.FRAGMENTED_TEXT;
        } else if (getIsImage(currentAdaptationSet)) {
            return constants.IMAGE;
        }

        return constants.TEXT;
    }

    function getIsAudio(adaptation) {
        return getIsTypeOf(adaptation, constants.AUDIO);
    }

    function getIsVideo(adaptation) {
        return getIsTypeOf(adaptation, constants.VIDEO);
    }

    function getIsFragmentedText(adaptation) {
        return getIsTypeOf(adaptation, constants.FRAGMENTED_TEXT);
    }

    function getIsMuxed(adaptation) {
        return getIsTypeOf(adaptation, constants.MUXED);
    }

    function getIsImage(adaptation) {
        return getIsTypeOf(adaptation, constants.IMAGE);
    }

    // based upon DashManifestModel, but using DomParser
    function getIsTypeOf(adaptation, type) {

        if (!adaptation) {
            throw new Error('adaptation is not defined');
        }

        if (!type) {
            throw new Error('type is not defined');
        }

        // 1. check codecs for fragmented text
        if (isFragmentedTextCodecFound(adaptation)) {
            // fragmented text codec has been found for adaptation, let's check if tested type is fragmented text
            return type === constants.FRAGMENTED_TEXT;
        }

        // 2. test mime type
        return testMimeType(adaptation, type);
    }

    function testMimeType(adaptation, type) {
        var mimeTypeRegEx = type !== constants.TEXT ? new RegExp(type) : new RegExp('(vtt|ttml)');

        var mimeType = findMimeType(adaptation);
        if (mimeType) {
            return mimeTypeRegEx.test(mimeType);
        }

        // no mime type in adaptation, search in representation
        var representations = findRepresentations(adaptation);
        if (representations) {
            for (var i = 0; i < representations.length; i++) {
                var representation = representations[i];
                mimeType = findMimeType(representation);
                if (mimeType) {
                    return mimeTypeRegEx.test(mimeType);
                }
            }
        }
        return false;
    }

    /**
     * Search for fragmented text codec in adaptation (STPP or WVTT)
     * @param {Object} adaptation
     */
    function isFragmentedTextCodecFound(adaptation) {
        var isFragmentedTextCodecFoundInTag = function isFragmentedTextCodecFoundInTag(tag) {
            var codecs = tag.getAttribute(dashConstants.CODECS);
            if (codecs) {
                if (codecs.search(constants.STPP) === 0 || codecs.search(constants.WVTT) === 0) {
                    return true;
                }
            }
            return false;
        };

        if (isFragmentedTextCodecFoundInTag(adaptation)) {
            return true;
        }

        // check in representations
        var representations = findRepresentations(adaptation);
        if (representations && representations.length > 0) {

            if (isFragmentedTextCodecFoundInTag(representations[0])) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns mime-type of xml tag
     * @param {Object} tag
     * @memberof module:offline
     * @returns {string|null} mimeType
     * @instance
    */
    function findMimeType(tag) {
        return tag.getAttribute(dashConstants.MIME_TYPE);
    }

    /**
     * Returns representations of adaptation set
     * @param {XML} adaptation
     * @memberof module:offline
     * @returns {XML} representations
     * @instance
    */
    function findRepresentations(adaptation) {
        return adaptation.getElementsByTagName(dashConstants.REPRESENTATION);
    }

    /**
     * Return segment template list of adaptations set
     * @param {XML} currentAdaptationSet
     * @memberof module:offline
     * @returns {XML} representations
     * @instance
    */
    function getSegmentTemplate(currentAdaptationSet) {
        return currentAdaptationSet.getElementsByTagName(dashConstants.SEGMENT_TEMPLATE);
    }

    /**
     * Return segment list tags of adaptations set
     * @param {XML} tag
     * @memberof module:offline
     * @returns {XML} representations
     * @instance
    */
    function getSegmentList(tag) {
        return tag.getElementsByTagName(dashConstants.SEGMENT_LIST);
    }

    function deleteSegmentBase(tag) {
        var elements = tag.getElementsByTagName(dashConstants.SEGMENT_BASE);
        for (var i = 0; i < elements.length; i++) {
            var segmentBase = elements[i];
            segmentBase.parentNode.removeChild(segmentBase);
        }
    }

    /**
     * @param {XML} segmentTemplate
     * @param {object} rep
     * @memberof module:offline
     * @instance
    */
    function addSegmentTimelineElements(segmentTemplate, rep) {
        var S = DOM.createElement('S');
        if (rep && rep.segments) {
            var segmentTimelineElement = DOM.createElement(dashConstants.SEGMENT_TIMELINE);
            var changedDuration = getDurationChangeArray(rep);
            for (var i = 0; i < changedDuration.length; i++) {
                var repeatValue = i + 1 < changedDuration.length ? changedDuration[i + 1] - changedDuration[i] - 1 : 0;
                if (repeatValue > 1) {
                    S.setAttribute('r', repeatValue);
                }
                S.setAttribute('d', rep.segments[changedDuration[i]].duration);
                segmentTimelineElement.appendChild(S);
                S = DOM.createElement('S');
            }
            segmentTemplate.appendChild(segmentTimelineElement);
        }
    }

    function getDurationChangeArray(rep) {
        var array = [];
        array.push(0);
        for (var i = 1; i < rep.segments.length; i++) {
            if (rep.segments[i - 1].duration !== rep.segments[i].duration) {
                array.push(i);
            }
        }
        return array;
    }

    /**
     * Update attributes of segment templates to match offline urls
     * @param {Array} segmentsTemplates
     * @memberof module:offline
     * @instance
    */
    function editSegmentTemplateAttributes(segmentsTemplates) {
        for (var i = 0; i < segmentsTemplates.length; i++) {
            var media = segmentsTemplates[i].getAttribute(dashConstants.MEDIA);
            media = '$RepresentationID$_$Number$' + media.substring(media.indexOf('.'), media.length); //id + extension
            segmentsTemplates[i].setAttribute(dashConstants.START_NUMBER, '0');
            segmentsTemplates[i].setAttribute(dashConstants.MEDIA, media);
            segmentsTemplates[i].setAttribute(dashConstants.INITIALIZATION_MINUS, '$RepresentationID$_init');
        }
    }

    /**
     * Update attributes of segment list to match offline urls
     * @param {Array} segmentLists
     * @param {Object} representation
     * @memberof module:offline
     * @instance
    */
    function editSegmentListAttributes(segmentLists, representation) {
        var repId = representation.getAttribute(dashConstants.ID);
        for (var i = 0; i < segmentLists.length; i++) {

            var segmentList = segmentLists[i];
            var initialisation = segmentList.getElementsByTagName(dashConstants.INITIALIZATION);
            if (initialisation) {
                var sourceURL = initialisation[0].getAttribute(dashConstants.SOURCE_URL);
                sourceURL = repId + '_init';
                initialisation[0].setAttribute(dashConstants.SOURCE_URL, sourceURL);
            }
            var segmentURLs = segmentList.getElementsByTagName(dashConstants.SEGMENT_URL);

            if (segmentURLs) {
                for (var j = 0; j < segmentURLs.length; j++) {
                    var segmentUrl = segmentURLs[j];
                    var media = segmentUrl.getAttribute(dashConstants.MEDIA);
                    media = repId + '_' + j;
                    segmentUrl.setAttribute(dashConstants.MEDIA, media);
                }
            }
        }
    }

    /**
     * @param {XML} adaptationSet
     * @param {object} rep
     * @memberof module:offline
     * @instance
    */
    function addSegmentTemplateAttributes(adaptationSet, rep) {
        var segmentTemplateElement = DOM.createElement(dashConstants.SEGMENT_TEMPLATE);
        segmentTemplateElement.setAttribute(dashConstants.START_NUMBER, '0');
        segmentTemplateElement.setAttribute(dashConstants.MEDIA, '$RepresentationID$-$Time$');
        segmentTemplateElement.setAttribute(dashConstants.INITIALIZATION_MINUS, '$RepresentationID$_init');
        addSegmentTimelineElements(segmentTemplateElement, rep);
        adaptationSet.appendChild(segmentTemplateElement);
    }

    /**
     * Delete all representations except the one choosed by user
     * @param {XML} currentAdaptationSet
     * @param {XML} representations
     * @param {string} adaptationType
     * @memberof module:offline
     * @instance
    */
    function findAndKeepOnlySelectedRepresentations(currentAdaptationSet, representations, adaptationType) {
        for (var i = representations.length - 1; i >= 0; i--) {
            var representation = representations[i];
            var repId = representation.getAttribute(dashConstants.ID);
            if (allMediaInfos[adaptationType] && allMediaInfos[adaptationType].indexOf(repId) === -1) {
                // representation is not selected, remove it
                currentAdaptationSet.removeChild(representation);
            }
        }
    }

    //  UTILS
    /**
     * Get id of first representation of adaptation set
     * @param {XMl} currentAdaptationSet
     * @memberof module:offline
     * @returns {string} id
     * @instance
    */
    function getBestRepresentationId(currentAdaptationSet) {
        var bestRepresentation = currentAdaptationSet.getElementsByTagName(dashConstants.REPRESENTATION)[0];
        console.log(bestRepresentation.getAttribute(dashConstants.ID));
        return bestRepresentation.getAttribute(dashConstants.ID);
    }

    /**
     * Parse and returns fragments of offline url => xxxx://xxxx/fragmentId/
     * @param {string} url
     * @memberof module:offline
     * @returns {string} fragmentId
     * @instance
    */
    function getFragmentId(url) {
        var idxFragId = url.lastIndexOf('/');
        //logger.warn('fragId : ' + url.substring(idxFragId + 1, url.length));
        return url.substring(idxFragId, url.length);
    }

    setup();

    instance = {
        parse: parse
    };

    return instance;
}
OfflineIndexDBManifestParser.__dashjs_factory_name = 'OfflineIndexDBManifestParser';
exports['default'] = dashjs.FactoryMaker.getClassFactory(OfflineIndexDBManifestParser);
/* jshint ignore:line */
module.exports = exports['default'];

},{"html-entities":1}],19:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsOfflineConstants = _dereq_('../constants/OfflineConstants');

var _constantsOfflineConstants2 = _interopRequireDefault(_constantsOfflineConstants);

/**
 * @module OfflineUrlUtils
 * @description Provides utility functions for operating on offline URLs.
 * Initially this is simply a method to determine the Base URL of a URL, but
 * should probably include other things provided all over the place such as
 * determining whether a URL is relative/absolute, resolving two paths etc.
 */
function OfflineUrlUtils() {

    function setup() {}

    function getRegex() {
        return _constantsOfflineConstants2['default'].OFFLINE_URL_REGEX;
    }

    /*
     * -------------------
     * SPECIFIC BEHAVIOUR
     * -------------------
     */
    function removeHostname(url) {
        return url.replace(/(^\w+:|^)\/\//, '');
    }

    function isRelative() {
        return false;
    }

    function resolve(url, baseUrl) {
        if (baseUrl.charAt(baseUrl.length - 1) !== '/') {
            baseUrl = baseUrl.concat('/');
        }
        return baseUrl + url;
    }

    setup();
    var instance = {
        getRegex: getRegex,
        isRelative: isRelative,
        removeHostname: removeHostname,
        resolve: resolve
    };
    return instance;
}

OfflineUrlUtils.__dashjs_factory_name = 'OfflineUrlUtils';
exports['default'] = dashjs.FactoryMaker.getSingletonFactory(OfflineUrlUtils);
/* jshint ignore:line */
module.exports = exports['default'];

},{"../constants/OfflineConstants":10}],20:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OfflineDownload = function OfflineDownload() {
  _classCallCheck(this, OfflineDownload);

  this.id = null;
  this.url = null;
  this.originalUrl = null;
  this.status = null;
  this.progress = null;
};

exports["default"] = OfflineDownload;
module.exports = exports["default"];

},{}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9odG1sNC1lbnRpdGllcy5qcyIsIm5vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9odG1sNS1lbnRpdGllcy5qcyIsIm5vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi94bWwtZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvbG9jYWxmb3JhZ2UvZGlzdC9sb2NhbGZvcmFnZS5qcyIsIi9ob21lL3Byb25heWEvZ28vc3JjL2dpdGh1Yi5jb20vbHVjYXMtY2xlbWVudGUvcXVpYy1nby9leGFtcGxlL3BwZC9zZXJ2ZXIvZGFzaC5qcy9zcmMvY29yZS9ldmVudHMvRXZlbnRzQmFzZS5qcyIsIi9ob21lL3Byb25heWEvZ28vc3JjL2dpdGh1Yi5jb20vbHVjYXMtY2xlbWVudGUvcXVpYy1nby9leGFtcGxlL3BwZC9zZXJ2ZXIvZGFzaC5qcy9zcmMvb2ZmbGluZS9PZmZsaW5lRG93bmxvYWQuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL29mZmxpbmUvT2ZmbGluZVN0cmVhbS5qcyIsIi9ob21lL3Byb25heWEvZ28vc3JjL2dpdGh1Yi5jb20vbHVjYXMtY2xlbWVudGUvcXVpYy1nby9leGFtcGxlL3BwZC9zZXJ2ZXIvZGFzaC5qcy9zcmMvb2ZmbGluZS9PZmZsaW5lU3RyZWFtUHJvY2Vzc29yLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9vZmZsaW5lL2NvbnN0YW50cy9PZmZsaW5lQ29uc3RhbnRzLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9vZmZsaW5lL2NvbnRyb2xsZXJzL09mZmxpbmVDb250cm9sbGVyLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9vZmZsaW5lL2NvbnRyb2xsZXJzL09mZmxpbmVTdG9yZUNvbnRyb2xsZXIuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL29mZmxpbmUvZXJyb3JzL09mZmxpbmVFcnJvcnMuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL29mZmxpbmUvZXZlbnRzL09mZmxpbmVFdmVudHMuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL29mZmxpbmUvaW5kZXguanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL29mZmxpbmUvbmV0L0luZGV4REJPZmZsaW5lTG9hZGVyLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9vZmZsaW5lL3N0b3JhZ2UvSW5kZXhEQlN0b3JlLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9vZmZsaW5lL3V0aWxzL09mZmxpbmVJbmRleERCTWFuaWZlc3RQYXJzZXIuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL29mZmxpbmUvdXRpbHMvT2ZmbGluZVVybFV0aWxzLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9vZmZsaW5lL3ZvL09mZmxpbmVEb3dubG9hZFZvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzNzRk0sVUFBVTthQUFWLFVBQVU7OEJBQVYsVUFBVTs7O2lCQUFWLFVBQVU7O2VBQ0wsZ0JBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUNwQixnQkFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPOztBQUVwQixnQkFBSSxRQUFRLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ2hELGdCQUFJLFVBQVUsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7O0FBR3BELGlCQUFLLElBQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtBQUN0QixvQkFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxBQUFDLEVBQUUsU0FBUztBQUN0RSxvQkFBSSxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTO0FBQ2xFLG9CQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBRTNCO1NBQ0o7OztXQWRDLFVBQVU7OztxQkFpQkQsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQ3JCSSw4QkFBOEI7Ozs7NkJBQ2pDLGlCQUFpQjs7OztpREFDRixzQ0FBc0M7Ozs7bUNBQ3JELHdCQUF3Qjs7Ozs7OztBQUtsRCxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUU7QUFDN0IsVUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7O0FBRXRCLFFBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDN0MsUUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUMvQixRQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztBQUM3RCxRQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQzdCLFFBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDakMsUUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNyQyxRQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzdCLFFBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDM0IsUUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztBQUMvQyxRQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztBQUNuRCxRQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DLFFBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFDM0MsUUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7QUFFakMsUUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7QUFFN0IsUUFBSSxRQUFRLFlBQUE7UUFDUixNQUFNLFlBQUE7UUFDTixZQUFZLFlBQUE7UUFDWixXQUFXLFlBQUE7UUFDWCxZQUFZLFlBQUE7UUFDWixRQUFRLFlBQUE7UUFDUixTQUFTLFlBQUE7UUFDVCxvQkFBb0IsWUFBQTtRQUNwQixXQUFXLFlBQUE7UUFDWCx3QkFBd0IsWUFBQTtRQUN4QixzQkFBc0IsWUFBQTtRQUN0QixnQkFBZ0IsWUFBQTtRQUNoQixZQUFZLFlBQUE7UUFDWixPQUFPLFlBQUEsQ0FBQzs7QUFHWixhQUFTLEtBQUssR0FBRztBQUNiLGNBQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25DLHVCQUFlLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDN0IsZ0JBQVEsR0FBRyxFQUFFLENBQUM7QUFDZCw0QkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDN0IsbUJBQVcsR0FBRyxLQUFLLENBQUM7QUFDcEIsd0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLG9CQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLGVBQU8sR0FBRyxTQUFTLENBQUM7S0FDdkI7O0FBRUQsYUFBUyxLQUFLLEdBQUc7QUFDYixlQUFPLFVBQVUsQ0FBQztLQUNyQjs7QUFFRCxhQUFTLGFBQWEsR0FBSTtBQUN0QixlQUFPLFdBQVcsQ0FBQztLQUN0Qjs7QUFFRCxhQUFTLGNBQWMsR0FBSTtBQUN2QixlQUFPLFlBQVksQ0FBQztLQUN2Qjs7QUFFRCxhQUFTLFNBQVMsR0FBSTtBQUNsQixlQUFPLE9BQU8sQ0FBQztLQUNsQjs7QUFFRCxhQUFTLGVBQWUsQ0FBQyxLQUFLLEVBQUU7QUFDNUIsbUJBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQ3hCLG9CQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUM5QixvQkFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDakMsZUFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7S0FDMUI7Ozs7Ozs7QUFPRCxhQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUU7QUFDMUIsb0JBQVksR0FBRyxHQUFHLENBQUM7QUFDbkIsbUJBQVcsR0FBTSx1Q0FBaUIsY0FBYyxXQUFNLFVBQVUsQUFBRSxDQUFDO0FBQ25FLGVBQU8sR0FBRyx1Q0FBaUIsc0JBQXNCLENBQUM7QUFDbEQsMEJBQWtCLEVBQUUsQ0FBQztBQUNyQixZQUFJLGVBQWUsR0FBRztBQUNsQiwyQkFBZSxFQUFFLFVBQVU7QUFDM0Isb0JBQVEsRUFBRSxPQUFPO0FBQ2pCLHdCQUFZLEVBQUUsVUFBVTtBQUN4QixpQkFBSyxFQUFFLFdBQVc7QUFDbEIseUJBQWEsRUFBRSxHQUFHO1NBQ3JCLENBQUM7QUFDRixlQUFPLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2pEOztBQUVELGFBQVMsWUFBWSxHQUFHO0FBQ3BCLHNCQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2xDLDRCQUFvQixHQUFHLElBQUksQ0FBQztLQUMvQjs7QUFFRCxhQUFTLGtCQUFrQixHQUFHO0FBQzFCLGdCQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRSxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDakYsNEJBQW9CLEVBQUUsQ0FBQztLQUMxQjs7QUFFRCxhQUFTLG9CQUFvQixHQUFHO0FBQzVCLGdCQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ2hEOztBQUVELGFBQVMsYUFBYSxHQUFHO0FBQ3JCLGVBQU8sb0JBQW9CLENBQUM7S0FDL0I7O0FBRUQsYUFBUyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUU7QUFDMUIsWUFBSSxXQUFXLEVBQUU7QUFDYixtQkFBTztTQUNWO0FBQ0QsWUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFDVixnQkFBSTtBQUNBLHlCQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUMxQixDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ1YsdUJBQU8sR0FBRyx1Q0FBaUIsb0JBQW9CLENBQUM7QUFDaEQsMEJBQVUsQ0FBQyxLQUFLLENBQUM7QUFDYix3QkFBSSxFQUFFLGlDQUFjLGFBQWE7QUFDakMsMkJBQU8sRUFBRSxHQUFHLENBQUMsT0FBTztBQUNwQix3QkFBSSxFQUFFO0FBQ0YsMEJBQUUsRUFBRSxVQUFVO0FBQ2QsOEJBQU0sRUFBRSxPQUFPO3FCQUNsQjtpQkFDSixDQUFDLENBQUM7YUFDTjtTQUNKO0tBQ0o7O0FBRUQsYUFBUyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUU7QUFDN0IsWUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLFVBQVUsRUFBRTtBQUNyQixtQkFBTztTQUNWO0FBQ0QsWUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtBQUNqQyxtQkFBTyxHQUFHLHVDQUFpQixzQkFBc0IsQ0FBQztBQUNsRCxrQ0FBc0IsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVk7QUFDOUUsd0JBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsdUNBQXVDLEVBQUMsQ0FBQyxDQUFDO2FBQ3BILENBQUMsQ0FBQztTQUNOLE1BQU07QUFDSCxtQkFBTyxHQUFHLHVDQUFpQixvQkFBb0IsQ0FBQztBQUNoRCxzQkFBVSxDQUFDLEtBQUssQ0FBQztBQUNiLG9CQUFJLEVBQUUsaUNBQWMsYUFBYTtBQUNqQyx1QkFBTyxFQUFFLHdCQUF3QjtBQUNqQyxvQkFBSSxFQUFFO0FBQ0Ysc0JBQUUsRUFBRSxVQUFVO0FBQ2QsMEJBQU0sRUFBRSxPQUFPO0FBQ2YseUJBQUssRUFBRSxDQUFDLENBQUMsS0FBSztpQkFDakI7YUFDSixDQUFDLENBQUM7U0FDTjtLQUNKOztBQUVELGFBQVMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUU7O0FBRXhELHdCQUFnQixDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRztBQUMxQyxzQkFBVSxFQUFWLFVBQVU7QUFDVixxQkFBUyxFQUFULFNBQVM7U0FDWixDQUFDOztBQUVGLFlBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNqQixZQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDcEIsWUFBSSxrQkFBa0IsWUFBQSxDQUFDO0FBQ3ZCLGFBQUssSUFBSSxRQUFRLElBQUksZ0JBQWdCLEVBQUU7QUFDbkMsZ0JBQUksZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzNDLG9CQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtBQUNyQyxzQ0FBa0IsR0FBRyxJQUFJLENBQUM7aUJBQzdCLE1BQU07QUFDSCw0QkFBUSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUNsRCwrQkFBVyxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDdkQ7YUFDSjtTQUNKOztBQUVELFlBQUksQ0FBQyxrQkFBa0IsRUFBRTs7QUFFckIsd0JBQVksR0FBRyxRQUFRLEdBQUcsV0FBVyxDQUFDOzs7QUFHdEMsa0NBQXNCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUM3QyxJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDWixvQkFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7QUFDN0IsdUJBQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEMsQ0FBQyxDQUFDO1NBQ1Y7S0FDSjs7QUFFRCxhQUFTLHFCQUFxQixDQUFDLENBQUMsRUFBRTtBQUM5QixZQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUFFO0FBQ3JCLG1CQUFPO1NBQ1Y7QUFDRCxZQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQ2pDLG1CQUFPLEdBQUcsdUNBQWlCLHVCQUF1QixDQUFDO0FBQ25ELGtDQUFzQixDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FDL0QsSUFBSSxDQUFDLFlBQVk7QUFDZCx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsRUFBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwrREFBK0QsRUFBQyxDQUFDLENBQUM7QUFDMUksNkJBQWEsRUFBRSxDQUFDO2FBQ25CLENBQUMsQ0FBQztTQUNOLE1BQU07QUFDSCxtQkFBTyxHQUFHLHVDQUFpQixvQkFBb0IsQ0FBQztBQUNoRCxzQkFBVSxDQUFDLEtBQUssQ0FBQztBQUNiLG9CQUFJLEVBQUUsaUNBQWMsYUFBYTtBQUNqQyx1QkFBTyxFQUFFLDJCQUEyQjtBQUNwQyxvQkFBSSxFQUFFO0FBQ0Ysc0JBQUUsRUFBRSxVQUFVO0FBQ2QsMEJBQU0sRUFBRSxPQUFPO0FBQ2YseUJBQUssRUFBRSxDQUFDLENBQUMsS0FBSztpQkFDakI7YUFDSixDQUFDLENBQUM7U0FDTjtLQUNKOztBQUVELGFBQVMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFO0FBQy9CLFlBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7QUFDckIsbUJBQU87U0FDVjs7QUFFRCxnQ0FBd0IsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDOztBQUU3QyxZQUFJLHdCQUF3QixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDckMsa0NBQXNCLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLGNBQWMsRUFBRTtBQUNoRyxvQkFBSSxjQUFjLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFDaEQsMENBQXNCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUNqRCxJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDWiw0QkFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUM7QUFDL0IsK0JBQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3RDLENBQUMsQ0FDRCxJQUFJLENBQUUsWUFBWTtBQUNmLDZCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9DLG9DQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsNEJBQTRCLEVBQUUsQ0FBQzt5QkFDOUM7cUJBQ0osQ0FBQyxDQUFDO2lCQUNOLE1BQU07QUFDSCwwQkFBTSxrQ0FBa0MsQ0FBQztpQkFDNUM7YUFDSixDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwQixzQkFBTSxHQUFHLENBQUM7YUFDYixDQUFDLENBQUM7U0FDTjtLQUNKOztBQUVELGFBQVMsY0FBYyxHQUFHO0FBQ3RCLFlBQUk7QUFDQSxtQkFBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyw2QkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsZ0JBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUM3QyxnQkFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMxQix1QkFBTyxHQUFHLHVDQUFpQixvQkFBb0IsQ0FBQztBQUNoRCwwQkFBVSxDQUFDLEtBQUssQ0FBQztBQUNiLHdCQUFJLEVBQUUsaUNBQWMsYUFBYTtBQUNqQywyQkFBTyxFQUFFLDhCQUE4QjtBQUN2Qyx3QkFBSSxFQUFFO0FBQ0YsMEJBQUUsRUFBRSxVQUFVO0FBQ2QsOEJBQU0sRUFBRSxPQUFPO3FCQUNsQjtpQkFDSixDQUFDLENBQUM7YUFDTjtBQUNELGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xELG9CQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsb0JBQUksTUFBTSxHQUFHLGdDQUFjLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN2QyxzQkFBRSxFQUFFLFVBQVU7QUFDZCw2QkFBUyxFQUFFO0FBQ1AsK0JBQU8sRUFBRSxvQkFBb0I7QUFDN0IsbUNBQVcsRUFBRSxtQkFBbUI7QUFDaEMsZ0NBQVEsRUFBRSxxQkFBcUI7QUFDL0IsNENBQW9CLEVBQUUsc0JBQXNCO3FCQUMvQztBQUNELDZCQUFTLEVBQUUsU0FBUztBQUNwQiw0QkFBUSxFQUFFLFFBQVE7QUFDbEIsMEJBQU0sRUFBRSxNQUFNO0FBQ2QseUJBQUssRUFBRSxLQUFLO0FBQ1osMkJBQU8sRUFBRSxPQUFPO0FBQ2hCLDBDQUFzQixFQUFFLHNCQUFzQjtpQkFDakQsQ0FBQyxDQUFDO0FBQ0gsd0JBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUd0QixzQkFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QixnQ0FBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQzFDO0FBQ0QsdUJBQVcsR0FBRyxJQUFJLENBQUM7U0FDdEIsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNSLGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2YsbUJBQU8sR0FBRyx1Q0FBaUIsb0JBQW9CLENBQUM7QUFDaEQsc0JBQVUsQ0FBQyxLQUFLLENBQUM7QUFDYixvQkFBSSxFQUFFLGlDQUFjLGFBQWE7QUFDakMsdUJBQU8sRUFBRSxDQUFDLENBQUMsT0FBTztBQUNsQixvQkFBSSxFQUFFO0FBQ0Ysc0JBQUUsRUFBRSxVQUFVO0FBQ2QsMEJBQU0sRUFBRSxPQUFPO0FBQ2YseUJBQUssRUFBRSxDQUFDLENBQUMsS0FBSztpQkFDakI7YUFDSixDQUFDLENBQUM7U0FDTjtLQUNKOztBQUVELGFBQVMsOEJBQThCLEdBQUc7QUFDdEMsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDdkIsa0JBQU0sQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1NBQzNDLENBQUMsQ0FBQztLQUNOOzs7Ozs7O0FBT0QsYUFBUyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUU7QUFDckMsZUFBTyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNqRTs7Ozs7OztBQU9ELGFBQVMscUJBQXFCLENBQUMsZUFBZSxFQUFFO0FBQzVDLGVBQU8sc0JBQXNCLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDeEU7Ozs7Ozs7QUFPRCxhQUFTLHFCQUFxQixDQUFDLGVBQWUsRUFBRTtBQUM1QyxlQUFPLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3hFOzs7Ozs7QUFNRCxhQUFTLHdCQUF3QixDQUFDLENBQUMsRUFBRTs7QUFFakMsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUVsRixvQkFBWSxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFbEMsWUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7QUFDMUMsbUJBQU8sR0FBRyx1Q0FBaUIsb0JBQW9CLENBQUM7QUFDaEQsc0JBQVUsQ0FBQyxLQUFLLENBQUM7QUFDYixvQkFBSSxFQUFFLGlDQUFjLGFBQWE7QUFDakMsdUJBQU8sRUFBRSxnQ0FBZ0M7QUFDekMsb0JBQUksRUFBRTtBQUNGLHNCQUFFLEVBQUUsVUFBVTtBQUNkLDBCQUFNLEVBQUUsT0FBTztpQkFDbEI7YUFDSixDQUFDLENBQUM7QUFDSCxrQkFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDOztBQUUvQyxtQkFBTztTQUNWOztBQUVELFlBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3JDLG1CQUFPLEdBQUcsdUNBQWlCLG9CQUFvQixDQUFDO0FBQ2hELHNCQUFVLENBQUMsS0FBSyxDQUFDO0FBQ2Isb0JBQUksRUFBRSxpQ0FBYyxhQUFhO0FBQ2pDLHVCQUFPLEVBQUUsNENBQTRDO0FBQ3JELG9CQUFJLEVBQUU7QUFDRixzQkFBRSxFQUFFLFVBQVU7QUFDZCwwQkFBTSxFQUFFLE9BQU87aUJBQ2xCO2FBQ0osQ0FBQyxDQUFDO0FBQ0gsa0JBQU0sQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQzs7QUFFM0QsbUJBQU87U0FDVjs7Ozs7QUFLRCxzQkFBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7QUFHMUIsc0NBQThCLEVBQUUsQ0FBQzs7QUFFakMsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDN0M7O0FBRUQsYUFBUywyQkFBMkIsQ0FBQyx1QkFBdUIsRUFBRTtBQUMxRCxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDcEU7S0FDSjs7QUFFRCxhQUFTLDZCQUE2QixDQUFDLHVCQUF1QixFQUFFO0FBQzVELFlBQUksR0FBRyxHQUFHLEVBQ1QsQ0FBQzs7QUFFRixXQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixXQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixXQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN6QixXQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNwQywrQkFBdUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQzFDLGVBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QyxDQUFDLENBQUM7QUFDSCwrQkFBdUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQzFDLGVBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QyxDQUFDLENBQUM7QUFDSCwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ3pDLGVBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUM7O0FBRUgsZUFBTyxHQUFHLENBQUM7S0FDZDs7QUFFRCxhQUFTLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRTtBQUM1QyxZQUFJOztBQUNBLG9CQUFJLEdBQUcsR0FBRyw2QkFBNkIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUVqRSxzQ0FBc0IsQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQ2xFLElBQUksQ0FBQyxZQUFNO0FBQ1IsMkJBQU8sbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzFDLENBQUMsQ0FDRCxJQUFJLENBQUMsWUFBTTtBQUNSLDJCQUFPLHVCQUF1QixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2pFLENBQUMsQ0FDRCxJQUFJLENBQUMsWUFBWTtBQUNkLCtDQUEyQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNwQyxDQUFDLENBQUM7O1NBQ04sQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNWLG1CQUFPLEdBQUcsdUNBQWlCLG9CQUFvQixDQUFDO0FBQ2hELHNCQUFVLENBQUMsS0FBSyxDQUFDO0FBQ2Isb0JBQUksRUFBRSxpQ0FBYyxhQUFhO0FBQ2pDLHVCQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87QUFDcEIsb0JBQUksRUFBRTtBQUNGLHNCQUFFLEVBQUUsVUFBVTtBQUNkLDBCQUFNLEVBQUUsT0FBTztpQkFDbEI7YUFDSixDQUFDLENBQUM7U0FDTjtLQUNKOzs7Ozs7Ozs7O0FBVUQsYUFBUyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsVUFBVSxFQUFFO0FBQy9FLDhCQUFzQixHQUFHLG9EQUE2QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbEUsc0JBQVUsRUFBRSxVQUFVO0FBQ3RCLHlCQUFhLEVBQUUsdUJBQXVCO0FBQ3RDLGlCQUFLLEVBQUUsS0FBSztBQUNaLHlCQUFhLEVBQUUsYUFBYTtBQUM1QixxQkFBUyxFQUFFLFNBQVM7QUFDcEIsb0JBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQzs7QUFFSCxlQUFPLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxjQUFjLEVBQUU7QUFDNUUsZ0JBQUksY0FBYyxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQ2hELHVCQUFPLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FDeEQsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ1osd0JBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUNqQyx3QkFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztBQUNsQyx3QkFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUM7QUFDL0IsMkJBQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RDLENBQUMsQ0FBQzthQUNOLE1BQU07QUFDSCx1QkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7YUFDN0Q7U0FDSixDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwQixtQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOOzs7Ozs7QUFNRCxhQUFTLFlBQVksR0FBRztBQUNwQixZQUFJLFVBQVUsS0FBSyxJQUFJLElBQUksYUFBYSxFQUFFLEVBQUU7QUFDeEMsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDL0Msd0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2FBQzdDOzs7QUFHRCxvQkFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFZCx1QkFBVyxHQUFHLEtBQUssQ0FBQzs7QUFFcEIsbUJBQU8sR0FBRyx1Q0FBaUIsc0JBQXNCLENBQUM7O0FBRWxELGtDQUFzQixDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtBQUM5RSx3QkFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUU7QUFDekMsMEJBQU0sRUFBRSxJQUFJO0FBQ1osc0JBQUUsRUFBRSxVQUFVO0FBQ2QsMEJBQU0sRUFBRSxPQUFPO0FBQ2YsMkJBQU8sRUFBRSxnREFBZ0Q7aUJBQzVELENBQUMsQ0FBQztBQUNILG9DQUFvQixHQUFHLEtBQUssQ0FBQzthQUNoQyxDQUFDLENBQUM7U0FDTjtLQUNKOzs7Ozs7QUFNRCxhQUFTLGNBQWMsR0FBRztBQUN0QixvQkFBWSxFQUFFLENBQUM7S0FDbEI7Ozs7OztBQU1ELGFBQVMsY0FBYyxHQUFHO0FBQ3RCLFlBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTs7QUFDbEIsb0NBQW9CLEdBQUcsSUFBSSxDQUFDOztBQUU1QixvQkFBSSxzQkFBc0IsWUFBQSxDQUFDOztBQUUzQixzQ0FBc0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQ2pELElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUNaLDZCQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0FBQ2xDLDBDQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7O0FBRXZDLGtDQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUIsNEJBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRTFDLDJCQUFPLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUMxQyxDQUFDLENBQUUsSUFBSSxDQUFDLFlBQU07QUFDWCwrQ0FBMkIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2lCQUN2RCxDQUFDLENBQUM7O1NBQ047S0FDSjs7Ozs7O0FBTUQsYUFBUyxzQkFBc0IsR0FBRztBQUM5QixlQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7QUFNRCxhQUFTLGFBQWEsR0FBRztBQUNyQixhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9DLG9CQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7QUFDRCw4QkFBc0IsR0FBRyxJQUFJLENBQUM7QUFDOUIsNEJBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQzdCLGdCQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2QsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ25FLGdCQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRiw0QkFBb0IsRUFBRSxDQUFDO0tBQzFCOztBQUVELGFBQVMsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUNoQixZQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGlDQUFjLDRCQUE0QixJQUMzRCxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxpQ0FBYyw2QkFBNkIsRUFBRztBQUNoRSx3QkFBWSxFQUFFLENBQUM7U0FDbEI7S0FDSjs7QUFFRCxhQUFTLG9CQUFvQixHQUFHO0FBQzVCLGdCQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ2hEOzs7Ozs7QUFNRCxhQUFTLEtBQUssR0FBRztBQUNiLFlBQUksYUFBYSxFQUFFLEVBQUU7QUFDakIseUJBQWEsRUFBRSxDQUFDO1NBQ25CO0FBQ0QseUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDMUIsdUJBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUMzQjs7QUFFRCxZQUFRLEdBQUc7QUFDUCxhQUFLLEVBQUUsS0FBSztBQUNaLGFBQUssRUFBRSxLQUFLO0FBQ1oscUJBQWEsRUFBRSxhQUFhO0FBQzVCLHNCQUFjLEVBQUUsY0FBYztBQUM5QixpQkFBUyxFQUFFLFNBQVM7QUFDcEIsdUJBQWUsRUFBRSxlQUFlO0FBQ2hDLG9CQUFZLEVBQUUsWUFBWTtBQUMxQix1QkFBZSxFQUFFLGVBQWU7QUFDaEMscUJBQWEsRUFBRSxhQUFhO0FBQzVCLG9CQUFZLEVBQUUsWUFBWTtBQUMxQixzQkFBYyxFQUFFLGNBQWM7QUFDOUIsc0JBQWMsRUFBRSxjQUFjO0FBQzlCLDhCQUFzQixFQUFFLHNCQUFzQjtBQUM5QyxxQkFBYSxFQUFFLGFBQWE7QUFDNUIscUJBQWEsRUFBRSxhQUFhO0tBQy9CLENBQUM7O0FBRUYsU0FBSyxFQUFFLENBQUM7O0FBRVIsV0FBTyxRQUFRLENBQUM7Q0FDbkI7O0FBRUQsZUFBZSxDQUFDLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDO3FCQUMzQyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NDam1CaEMsMEJBQTBCOzs7Ozs7Ozs7QUFPN0QsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFOztBQUUzQixVQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUN0QixRQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzdCLFFBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDakMsUUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM3QixRQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DLFFBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDM0IsUUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUMvQixRQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztBQUM3RCxRQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBQzdCLFFBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFDL0QsUUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztBQUN2RSxRQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBQ2pFLFFBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQzs7QUFFakYsUUFBSSxRQUFRLFlBQUE7UUFDUix1QkFBdUIsWUFBQTtRQUN2Qiw4QkFBOEIsWUFBQTtRQUM5QiwrQkFBK0IsWUFBQTtRQUMvQixVQUFVLFlBQUE7UUFDVix1QkFBdUIsWUFBQTtRQUN2QixrQkFBa0IsWUFBQTtRQUNsQixlQUFlLFlBQUEsQ0FBQzs7QUFFcEIsYUFBUyxLQUFLLEdBQUc7QUFDYiw0QkFBb0IsRUFBRSxDQUFDO0tBQzFCOzs7OztBQUtELGFBQVMsb0JBQW9CLEdBQUc7QUFDNUIsa0JBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsK0JBQXVCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLHNDQUE4QixHQUFHLENBQUMsQ0FBQztBQUNuQyx1Q0FBK0IsR0FBRyxDQUFDLENBQUM7QUFDcEMsMEJBQWtCLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLCtCQUF1QixHQUFHLEVBQUUsQ0FBQztBQUM3Qix1QkFBZSxHQUFHLEVBQUUsQ0FBQztLQUN4Qjs7Ozs7O0FBTUQsYUFBUyxVQUFVLENBQUMsY0FBYyxFQUFFO0FBQ2hDLGtCQUFVLEdBQUcsY0FBYyxDQUFDO0FBQzVCLGdCQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMxRTs7Ozs7QUFLRCxhQUFTLDhCQUE4QixHQUFHO0FBQ3RDLFlBQUksMkJBQTJCLEdBQUc7QUFDOUIsaUJBQUssRUFBRSxFQUFFO0FBQ1QsaUJBQUssRUFBRSxFQUFFO0FBQ1QsZ0JBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQzs7QUFFRixZQUFNLFlBQVksR0FBRyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO0FBQ3BFLFlBQU0sT0FBTyxHQUFHLFNBQVYsT0FBTyxDQUFhLFNBQVMsRUFBRTtBQUNqQyxnQkFBSSxJQUFJLEdBQUcsQUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO0FBQ2xHLGdCQUFJLEdBQUcsQUFBQyxJQUFJLEtBQUssWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEtBQUssWUFBWSxDQUFDLFFBQVEsR0FBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztBQUN2RyxtQkFBTyxJQUFJLENBQUM7U0FDZixDQUFDOzs7QUFHRixZQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1RSxZQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLHFCQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3hCLG9CQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBSztBQUNsQywrQ0FBMkIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ25DLDBCQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7QUFDZCxpQ0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO0FBQzVCLDZCQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7QUFDcEIsOEJBQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtxQkFDekIsQ0FBQyxDQUFDO2lCQUNOLENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7QUFHRCxpQkFBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hFLFlBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDdEIscUJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDeEIsb0JBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQ2xDLCtDQUEyQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDbkMsMEJBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtBQUNkLGlDQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7QUFDNUIsNEJBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtxQkFDbEIsQ0FBQyxDQUFDO2lCQUNOLENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7O0FBSUQsWUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFXLENBQWEsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN2QyxnQkFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7QUFFbEIscUJBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDcEIsd0JBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQ2xDLG1EQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDbEMsOEJBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtBQUNkLGdDQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDZixnQ0FBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDbkIsaUNBQUssRUFBRSxJQUFJLENBQUMsS0FBSztBQUNqQix5Q0FBYSxFQUFFLElBQUksQ0FBQyxhQUFhO0FBQ2pDLGdDQUFJLEVBQUUsSUFBSTt5QkFDYixDQUFDLENBQUM7cUJBQ04sQ0FBQyxDQUFDO2lCQUNOLENBQUMsQ0FBQzthQUNOO1NBQ0osQ0FBQzs7QUFFRixpQkFBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2xGLG1CQUFXLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFbEQsaUJBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2RSxtQkFBVyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhdkMsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxFQUFFO0FBQ3pELGdCQUFJLEVBQUU7QUFDRixrQkFBRSxFQUFFLFVBQVU7QUFDZCwyQ0FBMkIsRUFBRSwyQkFBMkI7YUFDM0Q7QUFDRCxrQkFBTSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7S0FDTjs7Ozs7O0FBT0QsYUFBUywyQkFBMkIsQ0FBQyxjQUFjLEVBQUU7QUFDakQsMEJBQWtCLEdBQUcsY0FBYyxDQUFDO0FBQ3BDLHVCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDL0I7Ozs7OztBQU1ELGFBQVMsZUFBZSxDQUFDLFVBQVUsRUFBRTtBQUNqQyx1Q0FBK0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVELHVDQUErQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUQsdUNBQStCLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztBQUN0RSx1Q0FBK0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUzRCxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsdUJBQXVCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JELG1DQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzNDOzs7OztLQUtKOztBQUVELGFBQVMsK0JBQStCLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTs7QUFFdkQsWUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNFLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztBQUNuQyxpQkFBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLE9BQU8sRUFBSztBQUN0RCxvQkFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pGLDJCQUFPLElBQUksQ0FBQztpQkFDZjtBQUNELHVCQUFPLEtBQUssQ0FBQzthQUNoQixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7O0FBRUgsMkJBQW1CLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxFQUFLO0FBQ3hELG1CQUFRLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFO1NBQzlELENBQUMsQ0FBQzs7O0FBR0gsMkJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUyxFQUFLO0FBQ3ZDLGdCQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUU7QUFDdkIseUJBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQ3ZDLHlDQUFxQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDN0MsQ0FBQyxDQUFDO2FBQ047U0FDSixDQUFDLENBQUM7QUFDSCxlQUFPLG1CQUFtQixDQUFDO0tBQzlCOztBQUVELGFBQVMscUJBQXFCLENBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRTs7QUFFaEQsWUFBSSxlQUFlLEdBQUcseUNBQXVCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN6RCxjQUFFLEVBQUUsVUFBVTtBQUNkLHFCQUFTLEVBQUU7QUFDUCx5QkFBUyxFQUFFLGlCQUFpQjtBQUM1QiwyQkFBVyxFQUFFLG1CQUFtQjthQUNuQztBQUNELGlCQUFLLEVBQUUsS0FBSztBQUNaLGtCQUFNLEVBQUUsTUFBTTtBQUNkLG9CQUFRLEVBQUUsUUFBUTtBQUNsQixxQkFBUyxFQUFFLFNBQVM7U0FDdkIsQ0FBQyxDQUFDO0FBQ0gsdUJBQWUsQ0FBQyxTQUFTLENBQUM7QUFDdEIsZ0JBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtBQUNwQixvQkFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO0FBQzVCLHFCQUFTLEVBQUUsU0FBUztBQUNwQixtQkFBTyxFQUFFLE9BQU87QUFDaEIsbUJBQU8sRUFBRSxPQUFPO0FBQ2hCLGtCQUFNLEVBQUUsUUFBUTtBQUNoQixrQ0FBc0IsRUFBRSxzQkFBc0I7U0FDakQsQ0FBQyxDQUFDO0FBQ0gsK0JBQXVCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUU5Qyx1QkFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDdEM7O0FBRUQsYUFBUyxpQkFBaUIsR0FBRztBQUN6Qix1Q0FBK0IsRUFBRSxDQUFDO0FBQ2xDLFlBQUksK0JBQStCLEtBQUssdUJBQXVCLENBQUMsTUFBTSxFQUFFO0FBQ3BFLHNCQUFVLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLCtEQUErRCxFQUFDLENBQUMsQ0FBQztTQUN4SDtLQUNKOztBQUVELGFBQVMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFHO0FBQ2xGLHVCQUFlLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsR0FBRztBQUNyRCw4QkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLDZCQUFpQixFQUFqQixpQkFBaUI7U0FDcEIsQ0FBQzs7QUFFRixZQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsWUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFlBQUksa0JBQWtCLFlBQUEsQ0FBQztBQUN2QixhQUFLLElBQUksUUFBUSxJQUFJLGVBQWUsRUFBRTtBQUNsQyxnQkFBSSxlQUFlLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzFDLG9CQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDcEMsc0NBQWtCLEdBQUcsSUFBSSxDQUFDO2lCQUM3QixNQUFNO0FBQ0gsNEJBQVEsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLENBQUM7QUFDekQsK0JBQVcsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsaUJBQWlCLENBQUM7aUJBQzlEO2FBQ0o7U0FDSjs7QUFFRCxZQUFJLENBQUMsa0JBQWtCLElBQUksYUFBYSxFQUFFOztBQUV0QyxnQkFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO0FBQ2pCLDZCQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUNsRDtTQUNKO0tBQ0o7O0FBRUQsYUFBUyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUU7QUFDOUIsWUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN2QixZQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU87O0FBRW5FLFlBQUksQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDakYsbUNBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3pEOztBQUVELFlBQUksRUFBRSxZQUFBLENBQUM7O0FBRVAsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRztBQUN0RCxnQkFBSSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsRUFBRSxLQUFLLE9BQU8sRUFBRTtBQUN0RSxrQkFBRSxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLHNCQUFNO2FBQ1Q7U0FDSjs7QUFFRCxZQUFJLEVBQUUsRUFBRTtBQUNKLG9EQUF3QyxFQUFFLENBQUM7U0FDOUM7S0FDSjs7QUFFRCxhQUFTLHdDQUF3QyxHQUFHO0FBQ2hELHNDQUE4QixFQUFFLENBQUM7QUFDakMsWUFBSSw4QkFBOEIsS0FBSyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUU7QUFDbkUscUJBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsdUNBQXVDLEVBQUMsQ0FBQyxDQUFDOztBQUU1RixnQkFBSSx1QkFBdUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3BDLDhCQUFjLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQzthQUM3RixNQUFNO0FBQ0gsNENBQTRCLEVBQUUsQ0FBQzthQUNsQztTQUNKO0tBQ0o7O0FBRUQsYUFBUyxhQUFhLEdBQUc7QUFDckIsZUFBTyxVQUFVLENBQUM7S0FDckI7O0FBRUQsYUFBUyxZQUFZLEdBQUc7QUFDcEIsZUFBTyxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDOUM7O0FBRUQsYUFBUyxXQUFXLEdBQUc7QUFDbkIsZUFBTyxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7S0FDakQ7Ozs7O0FBS0QsYUFBUywyQkFBMkIsR0FBRztBQUNuQyxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsdUJBQXVCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JELG1DQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JDO0tBQ0o7Ozs7O0FBS0QsYUFBUyw0QkFBNEIsR0FBRztBQUNwQyxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsdUJBQXVCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JELG1DQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RDO0tBQ0o7O0FBRUQsYUFBUyxVQUFVLEdBQUc7QUFDbEIsWUFBSSxFQUFFLEdBQUcsdUJBQXVCLEdBQUcsdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN0RSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pCLG1DQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDNUYsbUNBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdEM7S0FDSjs7Ozs7QUFLRCxhQUFTLEtBQUssR0FBRztBQUNiLG1DQUEyQixFQUFFLENBQUM7QUFDOUIsa0JBQVUsRUFBRSxDQUFDO0FBQ2IsNEJBQW9CLEVBQUUsQ0FBQzs7QUFFdkIsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzNFOztBQUVELFlBQVEsR0FBRztBQUNQLGtCQUFVLEVBQUUsVUFBVTtBQUN0QixzQ0FBOEIsRUFBRSw4QkFBOEI7QUFDOUQsbUNBQTJCLEVBQUUsMkJBQTJCO0FBQ3hELHFCQUFhLEVBQUUsYUFBYTtBQUM1QixtQ0FBMkIsRUFBRSwyQkFBMkI7QUFDeEQsb0NBQTRCLEVBQUUsNEJBQTRCO0FBQzFELGFBQUssRUFBRSxLQUFLO0tBQ2YsQ0FBQzs7QUFFRixTQUFLLEVBQUUsQ0FBQztBQUNSLFdBQU8sUUFBUSxDQUFDO0NBQ25COztBQUVELGFBQWEsQ0FBQyxxQkFBcUIsR0FBRyxlQUFlLENBQUM7cUJBQ3ZDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0MvV3ZDLHdCQUF3Qjs7Ozs7Ozs7O0FBT2xELFNBQVMsc0JBQXNCLENBQUMsTUFBTSxFQUFFOztBQUVwQyxVQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUN0QixRQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2pDLFFBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDN0IsUUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMzQixRQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ25DLFFBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDN0IsUUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUNuRSxRQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztBQUVwRSxRQUFJLFFBQVEsWUFBQTtRQUNSLE9BQU8sWUFBQTtRQUNQLE1BQU0sWUFBQTtRQUNOLFlBQVksWUFBQTtRQUNaLHdCQUF3QixZQUFBO1FBQ3hCLElBQUksWUFBQTtRQUNKLFFBQVEsWUFBQTtRQUNSLGFBQWEsWUFBQTtRQUNiLFNBQVMsWUFBQTtRQUNULE9BQU8sWUFBQTtRQUNQLFFBQVEsWUFBQTtRQUNSLHNCQUFzQixZQUFBO1FBQ3RCLGtCQUFrQixZQUFBO1FBQ2xCLGFBQWEsWUFBQTtRQUNiLFNBQVMsWUFBQTtRQUNULE1BQU0sWUFBQSxDQUFDOztBQUVYLGFBQVMsU0FBUyxDQUFDLE1BQU0sRUFBRTs7QUFFdkIsWUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPOztBQUVwQixZQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDYixnQkFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDdEI7O0FBRUQsWUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ2Ysa0JBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQzFCOztBQUVELFlBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNqQixvQkFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDOUI7O0FBRUQsWUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQ2hCLG1CQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztTQUM1Qjs7QUFFRCxZQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbEIscUJBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ2hDOztBQUVELFlBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUNoQixtQkFBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDNUI7O0FBRUQsWUFBSSxNQUFNLENBQUMsc0JBQXNCLEVBQUU7QUFDL0Isa0NBQXNCLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1NBQzFEO0tBQ0o7O0FBRUQsYUFBUyxLQUFLLEdBQUc7QUFDYiw0QkFBb0IsRUFBRSxDQUFDO0FBQ3ZCLGNBQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25DLGdCQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRSxnQkFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDeEY7O0FBRUQsYUFBUyxhQUFhLENBQUMsT0FBTyxFQUFFO0FBQzVCLGVBQU8sT0FBTyxDQUFDLElBQUksS0FBSyx1QkFBdUIsQ0FBQztLQUNuRDs7QUFFRCxhQUFTLDBCQUEwQixDQUFDLENBQUMsRUFBRTtBQUNuQyxZQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssYUFBYSxFQUFFO0FBQzVCLG1CQUFPO1NBQ1Y7O0FBRUQsWUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTs7QUFDcEIsb0JBQUksTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEMsb0JBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDL0Msb0JBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztBQUM3RCxzQ0FBc0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQ3pFLElBQUksQ0FBQyxZQUFNO0FBQ1Isd0JBQUksQ0FBQyxNQUFNLEVBQUU7O0FBRVQsOENBQXNCLENBQUMsNkJBQTZCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7QUFDekYsaUNBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUs7QUFDdEIsc0NBQVUsRUFBRSxrQkFBa0I7eUJBQ2pDLENBQUUsQ0FBQztxQkFDUDtpQkFDSixDQUFDLENBQUM7O1NBQ047O0FBRUQsWUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ3BELHlCQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQyxNQUFNO0FBQ0gsOEJBQWtCLEVBQUUsQ0FBQztBQUNyQixvQkFBUSxFQUFFLENBQUM7U0FDZDtLQUNKOztBQUVELGFBQVMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFO0FBQzFCLFlBQUksQ0FBQyxDQUFDLGFBQWEsS0FBSyxhQUFhLEVBQUU7QUFDbkMsbUJBQU87U0FDVjtBQUNELGNBQU0sQ0FBQyxJQUFJLE9BQUssVUFBVSwwQkFBdUIsQ0FBQztBQUNsRCxZQUFJLEVBQUUsQ0FBQztBQUNQLG1CQUFXLEVBQUUsQ0FBQztLQUNqQjs7QUFFRCxhQUFTLDJCQUEyQixHQUFJO0FBQ3BDLGVBQU8sd0JBQXdCLENBQUM7S0FDbkM7O0FBRUQsYUFBUyxtQkFBbUIsR0FBRztBQUMzQixlQUFPLHdCQUF3QixDQUFDLHdCQUF3QixFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ2pFOzs7Ozs7QUFNRCxhQUFTLElBQUksR0FBRztBQUNaLFlBQUksU0FBUyxFQUFFO0FBQ1gsbUJBQU87U0FDVjtBQUNELGlCQUFTLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOztBQUVELGFBQVMsb0JBQW9CLEdBQUk7QUFDN0IsNEJBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbkM7O0FBRUQsYUFBUyxlQUFlLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUU7QUFDeEQsb0JBQVksR0FBRyxPQUFPLENBQUM7QUFDdkIsb0JBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRS9CLHFCQUFhLEdBQUcsU0FBUyxDQUFDO0FBQzFCLGdDQUF3QixHQUFHLGFBQWEsQ0FBQzs7QUFFekMsNEJBQW9CLEVBQUUsQ0FBQztLQUMxQjs7Ozs7O0FBTUQsYUFBUyxVQUFVLEdBQUc7QUFDbEIsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsaUNBQWMsNkJBQTZCLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJO0FBQ2hHLHdCQUFRLEVBQUUsUUFBUTtBQUNsQiwwQkFBVSxFQUFFLGFBQWEsRUFBRSxFQUFDLEVBQUMsQ0FBRSxDQUFDO0tBQ3ZDOztBQUVELGFBQVMsZ0NBQWdDLENBQUMsSUFBSSxFQUFFO0FBQzVDLFlBQUksYUFBYSxFQUFFO0FBQ2YseUJBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4RDtLQUNKOzs7Ozs7QUFNRCxhQUFTLGNBQWMsR0FBRztBQUN0QixZQUFJLENBQUMsd0JBQXdCLENBQUMsd0JBQXdCLEVBQUUsRUFBRTtBQUN0RCxtQkFBTyxJQUFJLENBQUM7U0FDZjs7QUFFRCxlQUFPLFlBQVksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEVBQUUsd0JBQXdCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO0tBQzNHOzs7Ozs7QUFNRCxhQUFTLGNBQWMsR0FBRztBQUN0QixlQUFPLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSx3QkFBd0IsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7S0FDbEg7Ozs7OztBQU1ELGFBQVMsS0FBSyxHQUFHO0FBQ2IsWUFBSSx3QkFBd0IsRUFBRTtBQUMxQixnQkFBSSxDQUFDLHdCQUF3QixDQUFDLHdCQUF3QixFQUFFLEVBQUU7QUFDdEQsc0JBQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUM3RDtBQUNELHFCQUFTLEdBQUcsS0FBSyxDQUFDOztBQUVsQixrQ0FBc0IsQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLEVBQUUsd0JBQXdCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDdkgsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFLO0FBQ2Isb0JBQUksS0FBSyxFQUFFO0FBQ1AsZ0NBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLHNDQUFrQixHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7aUJBQ3pDO0FBQ0Qsd0JBQVEsRUFBRSxDQUFDO2FBQ2QsQ0FBQyxTQUFNLENBQUMsWUFBTTs7QUFFWCx3QkFBUSxFQUFFLENBQUM7YUFDZCxDQUFDLENBQUM7U0FDTjtLQUNKOzs7Ozs7QUFNRCxhQUFTLFFBQVEsR0FBRztBQUNoQixZQUFJLFNBQVMsRUFBRTtBQUNYLG1CQUFPO1NBQ1Y7O0FBRUQsWUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFO0FBQzVELGdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDbkIsZ0JBQUksQ0FBQyxhQUFhLEVBQUU7QUFDaEIsdUJBQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQztBQUMzQiw2QkFBYSxHQUFHLElBQUksQ0FBQzthQUN4QixNQUFNO0FBQ0gsdUJBQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQzs7O0FBRzNCLGlDQUFpQixFQUFFLENBQUM7YUFDdkI7O0FBRUQsZ0JBQUksT0FBTyxFQUFFO0FBQ1Qsc0JBQU0sQ0FBQyxJQUFJLE9BQUssVUFBVSw2QkFBd0IsT0FBTyxDQUFDLEdBQUcsQ0FBRyxDQUFDO0FBQ2pFLDZCQUFhLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pDLE1BQU07QUFDSCxzQkFBTSxDQUFDLElBQUksT0FBSyxVQUFVLG1DQUFnQyxDQUFDO2FBQzlEO1NBQ0o7S0FDSjs7Ozs7OztBQU9ELGFBQVMsb0JBQW9CLENBQUMsU0FBUyxFQUFFO0FBQ3JDLGdCQUFRLEdBQUcsSUFBSSxDQUFDOztBQUVoQixZQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7O0FBR2hFLFlBQUksT0FBTyxHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxVQUFDLGNBQWMsRUFBSztBQUMxRCxtQkFBTyxjQUFjLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDM0MsQ0FBQyxDQUFDOztBQUVILFlBQUksSUFBSSxLQUFLLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLFNBQVMsQ0FBQyxLQUFLLElBQUssSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsQ0FBQyxlQUFlLEVBQUU7QUFDeEgsb0JBQVEsR0FBRyxLQUFLLENBQUM7QUFDakIsbUJBQU87U0FDVjs7QUFFRCxnQ0FBd0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMvRTs7QUFFRCxhQUFTLGFBQWEsR0FBRztBQUNyQixlQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQ2pEOztBQUVELGFBQVMsVUFBVSxHQUFHO0FBQ2xCLGVBQU8sUUFBUSxDQUFDO0tBQ25COztBQUVELGFBQVMsT0FBTyxHQUFHO0FBQ2YsZUFBTyxJQUFJLENBQUM7S0FDZjs7QUFFRCxhQUFTLFlBQVksR0FBRztBQUNwQixlQUFPLFNBQVMsQ0FBQztLQUNwQjs7QUFFRCxhQUFTLDBCQUEwQixHQUFHO0FBQ2xDLGVBQU8sd0JBQXdCLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7S0FDMUY7O0FBRUQsYUFBUyxpQkFBaUIsR0FBSTtBQUMxQixZQUFJLFVBQVUsRUFBRTtBQUNaLHNCQUFVLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQztTQUMxRTtLQUNKOztBQUVELGFBQVMsb0JBQW9CLEdBQUc7QUFDNUIscUJBQWEsR0FBRyxLQUFLLENBQUM7QUFDdEIsMEJBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGlCQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGVBQU8sR0FBRyxJQUFJLENBQUM7QUFDZixnQkFBUSxHQUFHLEtBQUssQ0FBQztBQUNqQixZQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ1osY0FBTSxHQUFHLElBQUksQ0FBQztLQUNqQjs7Ozs7O0FBTUQsYUFBUyxLQUFLLEdBQUc7QUFDYiw0QkFBb0IsRUFBRSxDQUFDO0FBQ3ZCLG9CQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRXJCLGdCQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNuRSxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDekY7O0FBRUQsWUFBUSxHQUFHO0FBQ1Asa0JBQVUsRUFBRSxVQUFVO0FBQ3RCLGlCQUFTLEVBQUUsU0FBUztBQUNwQixxQkFBYSxFQUFFLGFBQWE7QUFDNUIsb0JBQVksRUFBRSxZQUFZO0FBQzFCLG1DQUEyQixFQUFFLDJCQUEyQjtBQUN4RCx3Q0FBZ0MsRUFBRSxnQ0FBZ0M7QUFDbEUsZUFBTyxFQUFFLE9BQU87QUFDaEIsMkJBQW1CLEVBQUUsbUJBQW1CO0FBQ3hDLGtCQUFVLEVBQUUsVUFBVTtBQUN0QixhQUFLLEVBQUUsS0FBSztBQUNaLFlBQUksRUFBRSxJQUFJO0FBQ1Ysa0NBQTBCLEVBQUUsMEJBQTBCO0FBQ3RELHVCQUFlLEVBQUUsZUFBZTtBQUNoQyxhQUFLLEVBQUUsS0FBSztLQUNmLENBQUM7O0FBRUYsU0FBSyxFQUFFLENBQUM7O0FBRVIsV0FBTyxRQUFRLENBQUM7Q0FDbkI7QUFDRCxzQkFBc0IsQ0FBQyxxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQztBQUN4RSxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3FCQUM3RCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzFVaEIsZ0JBQWdCO2VBQWhCLGdCQUFnQjs7V0FFaEIsZ0JBQUc7QUFDSCxVQUFJLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDO0FBQ3hDLFVBQUksQ0FBQyxpQkFBaUIsR0FBRyx3QkFBd0IsQ0FBQztBQUNsRCxVQUFJLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxDQUFDO0FBQ3hDLFVBQUksQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUM7QUFDeEMsVUFBSSxDQUFDLHNCQUFzQixHQUFHLFNBQVMsQ0FBQztBQUN4QyxVQUFJLENBQUMsdUJBQXVCLEdBQUcsVUFBVSxDQUFDO0FBQzFDLFVBQUksQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7S0FDdkM7OztBQUVXLFdBWlIsZ0JBQWdCLEdBWUw7MEJBWlgsZ0JBQWdCOztBQWFoQixRQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDZjs7U0FkRyxnQkFBZ0I7OztBQWlCdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO3FCQUN4QixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQ3ZCSywrQkFBK0I7Ozs7c0NBQ3pCLDBCQUEwQjs7OzsrQkFDakMsb0JBQW9COzs7O3VDQUNmLDZCQUE2Qjs7OztvQ0FDbEMsMEJBQTBCOzs7O21DQUM1Qix5QkFBeUI7Ozs7bUNBQ3pCLHlCQUF5Qjs7OzttQ0FDckIseUJBQXlCOzs7Ozs7O0FBS3ZELFNBQVMsaUJBQWlCLEdBQUc7O0FBRXpCLFFBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7O0FBRTdCLFFBQUksUUFBUSxZQUFBO1FBQ1IsU0FBUyxZQUFBO1FBQ1QsT0FBTyxZQUFBO1FBQ1AsbUJBQW1CLFlBQUE7UUFDbkIsS0FBSyxZQUFBO1FBQ0wsTUFBTSxZQUFBO1FBQ04sY0FBYyxZQUFBO1FBQ2QsYUFBYSxZQUFBO1FBQ2IsZUFBZSxZQUFBO1FBQ2YsaUJBQWlCLFlBQUE7UUFDakIsc0JBQXNCLFlBQUE7UUFDdEIsUUFBUSxZQUFBO1FBQ1IsZUFBZSxZQUFBO1FBQ2YsTUFBTSxZQUFBO1FBQ04sUUFBUSxZQUFBO1FBQ1IsU0FBUyxZQUFBO1FBQ1QsYUFBYSxZQUFBO1FBQ2IsVUFBVSxZQUFBLENBQUM7O0FBRWYsYUFBUyxLQUFLLEdBQUc7QUFDYix1QkFBZSxHQUFHLHVDQUFnQixPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7QUFFekQsaUJBQVMsR0FBRyxFQUFFLENBQUM7S0FDbEI7O0FBRUQsYUFBUyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3ZCLFlBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTzs7QUFFcEIsWUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ25CLHNCQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUNsQzs7QUFFRCxZQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNsQyxrQkFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDdkIsb0JBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQzNCLGtDQUFzQixHQUFHLHlDQUF1QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztTQUN6SDs7QUFFRCxZQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDZCxpQkFBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDckIsa0JBQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDOztBQUVELFlBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTtBQUN2QiwwQkFBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7U0FDMUM7O0FBRUQsWUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO0FBQ3RCLHlCQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUN4Qzs7QUFFRCxZQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDaEIsbUJBQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQzVCOztBQUVELFlBQUksTUFBTSxDQUFDLGVBQWUsRUFBRTtBQUN4QiwyQkFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7U0FDNUM7O0FBRUQsWUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7QUFDMUIsNkJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1NBQ2hEOztBQUVELFlBQUksTUFBTSxDQUFDLG1CQUFtQixFQUFFO0FBQzVCLCtCQUFtQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztTQUNwRDs7QUFFRCxZQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbEIscUJBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ2hDOztBQUVELFlBQUksTUFBTSxDQUFDLGFBQWEsRUFBRTtBQUN0Qix5QkFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDeEM7O0FBRUQsWUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ2pCLG9CQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUMzQixvQkFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUMxRTs7QUFFRCwyQkFBbUIsQ0FBQyxjQUFjLENBQUMsdUNBQWlCLGNBQWMsdUNBQXVCLENBQUM7S0FDN0Y7Ozs7Ozs7QUFTRCxhQUFTLGlCQUFpQixDQUFDLEVBQUUsRUFBRTtBQUMzQixZQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ3BDLG1CQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0FBQ0gsZUFBTyxRQUFRLENBQUM7S0FDbkI7O0FBRUQsYUFBUyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUU7QUFDOUIsWUFBSSxRQUFRLFlBQUEsQ0FBQztBQUNiLGdCQUFRLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRWpDLFlBQUksQ0FBQyxRQUFRLEVBQUU7O0FBRVgsb0JBQVEsR0FBRyxrQ0FBZ0IsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3ZDLGtCQUFFLEVBQUUsRUFBRTtBQUNOLHdCQUFRLEVBQUUsUUFBUTtBQUNsQixzQkFBTSxFQUFFLE1BQU07QUFDZCw4QkFBYyxFQUFFLGNBQWM7QUFDOUIsNkJBQWEsRUFBRSxhQUFhO0FBQzVCLCtCQUFlLEVBQUUsZUFBZTtBQUNoQyxpQ0FBaUIsRUFBRSxpQkFBaUI7QUFDcEMsdUJBQU8sRUFBRSxPQUFPO0FBQ2hCLDBCQUFVLEVBQUUsVUFBVTtBQUN0QixzQ0FBc0IsRUFBRSxzQkFBc0I7QUFDOUMscUJBQUssRUFBRSxLQUFLO0FBQ1oseUJBQVMsRUFBRSxTQUFTO0FBQ3BCLDZCQUFhLEVBQUUsYUFBYTtBQUM1Qix3QkFBUSxFQUFFLFFBQVE7YUFDckIsQ0FBQyxDQUFDOztBQUVILHFCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVCOztBQUVELGVBQU8sUUFBUSxDQUFDO0tBQ25COztBQUVELGFBQVMseUJBQXlCLENBQUMsT0FBTyxFQUFFO0FBQ3hDLFlBQUksUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFckQsWUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNYLG9CQUFRLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELGdCQUFJLE9BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzVCLGdCQUFJLE9BQU0sS0FBSyx1Q0FBaUIsc0JBQXNCLEVBQUU7QUFDcEQsdUJBQU0sR0FBRyx1Q0FBaUIsc0JBQXNCLENBQUM7YUFDcEQ7O0FBRUQsb0JBQVEsQ0FBQyxlQUFlLENBQUM7QUFDckIsbUJBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztBQUNoQix3QkFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO0FBQzFCLDJCQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7QUFDaEMsc0JBQU0sRUFBRSxPQUFNO2FBQ2pCLENBQUMsQ0FBQztTQUNOOztBQUVELGVBQU8sUUFBUSxDQUFDO0tBQ25COztBQUVELGFBQVMsb0JBQW9CLENBQUMsRUFBRSxFQUFFO0FBQzlCLGVBQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQzFDLGdCQUFJLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQyxnQkFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDakMsZ0JBQUksUUFBUSxFQUFFOztBQUVWLG9CQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRTs7O0FBRTFCLDRDQUFvQixHQUFHLElBQUksQ0FBQztBQUM1Qiw0QkFBTSxlQUFlLEdBQUcsU0FBbEIsZUFBZSxHQUFlO0FBQ2hDLG9DQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEUsbUNBQU8sc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVk7QUFDbEUsdUNBQU8sRUFBRSxDQUFDOzZCQUNiLENBQUMsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3BCLHNDQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ2YsQ0FBQyxDQUFDO3lCQUNOLENBQUM7QUFDRixnQ0FBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztpQkFDdEU7QUFDRCx3QkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzFCLG9CQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLHlCQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM5Qjs7QUFFRCxnQkFBSSxDQUFDLG9CQUFvQixFQUFFO0FBQ3ZCLHVCQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0osQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7QUFTRCxhQUFTLGtCQUFrQixHQUFHO0FBQzFCLFlBQUksU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckMsZUFBTyxTQUFTLENBQUM7S0FDcEI7O0FBRUQsYUFBUyx3QkFBd0IsR0FBRzs7QUFFaEMsZUFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDMUMsa0NBQXNCLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFLO0FBQ3JELHFCQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBSztBQUNqQyw2Q0FBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEMsQ0FBQyxDQUFDOztBQUVILHVCQUFPLEVBQUUsQ0FBQzthQUNiLENBQUMsU0FBTSxDQUFDLFVBQUMsQ0FBQyxFQUFLO0FBQ1osc0JBQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUMsc0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQztLQUNOOztBQUVELGFBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRTtBQUN6QixlQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMxQyxnQkFBSSxFQUFFLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQzs7O0FBRzlCLGdCQUFJLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFeEMsb0JBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDckMsdUJBQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNmLENBQUMsU0FDSSxDQUFDLFVBQUMsQ0FBQyxFQUFLO0FBQ1Ysc0JBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEMsb0NBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVk7QUFDdEMsMEJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTjs7QUFFRCxhQUFTLFlBQVksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsWUFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckMsWUFBSSxRQUFRLEVBQUU7QUFDVixvQkFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzNCO0tBQ0o7O0FBRUQsYUFBUyxhQUFhLENBQUMsRUFBRSxFQUFFLHVCQUF1QixFQUFFO0FBQ2hELFlBQUksUUFBUSxHQUFHLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLFlBQUksUUFBUSxFQUFFO0FBQ1Ysb0JBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUNuRDtLQUNKOztBQUVELGFBQVMsZUFBZSxHQUFHOztBQUV2QixZQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixpQkFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBSztBQUM1QixnQkFBTSxlQUFlLEdBQUcsc0NBQXVCLENBQUM7QUFDaEQsMkJBQWUsQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3RDLDJCQUFlLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQzdELDJCQUFlLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUMvQywyQkFBZSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDeEQsMkJBQWUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzlDLGVBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDN0IsQ0FBQyxDQUFDOztBQUVILGVBQU8sR0FBRyxDQUFDO0tBQ2Q7O0FBRUQsYUFBUyxZQUFZLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFlBQUksUUFBUSxHQUFHLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLFlBQUksUUFBUSxFQUFFO0FBQ1Ysb0JBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUMzQjtLQUNKOztBQUVELGFBQVMsY0FBYyxDQUFDLEVBQUUsRUFBRTtBQUN4QixlQUFPLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQzdDLG1CQUFPLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hELENBQUMsQ0FBQztLQUNOOztBQUVELGFBQVMsY0FBYyxDQUFDLEVBQUUsRUFBRTtBQUN4QixZQUFJLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQyxZQUFJLFFBQVEsRUFBRTtBQUNWLG9CQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDN0I7S0FDSjs7QUFFRCxhQUFTLHNCQUFzQixDQUFDLEVBQUUsRUFBRTtBQUNoQyxZQUFJLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyQyxZQUFJLFFBQVEsRUFBRTtBQUNWLG1CQUFPLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQzVDO0FBQ0QsZUFBTyxDQUFDLENBQUM7S0FDWjs7QUFFRCxhQUFTLGNBQWMsR0FBRztBQUN0QixpQkFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBSztBQUM1QixvQkFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQztLQUNOOzs7Ozs7QUFNRCxhQUFTLEtBQUssR0FBRztBQUNiLHNCQUFjLEVBQUUsQ0FBQztBQUNqQiwyQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyx1Q0FBaUIsY0FBYyxDQUFDLENBQUM7S0FDekU7O0FBRUQsWUFBUSxHQUFHO0FBQ1AsaUJBQVMsRUFBRSxTQUFTO0FBQ3BCLGdDQUF3QixFQUFFLHdCQUF3QjtBQUNsRCxzQkFBYyxFQUFFLGNBQWM7QUFDOUIsb0JBQVksRUFBRSxZQUFZO0FBQzFCLHFCQUFhLEVBQUUsYUFBYTtBQUM1QixvQkFBWSxFQUFFLFlBQVk7QUFDMUIsc0JBQWMsRUFBRSxjQUFjO0FBQzlCLHNCQUFjLEVBQUUsY0FBYztBQUM5Qiw4QkFBc0IsRUFBRSxzQkFBc0I7QUFDOUMsdUJBQWUsRUFBRSxlQUFlO0FBQ2hDLHNCQUFjLEVBQUUsY0FBYztBQUM5QixhQUFLLEVBQUUsS0FBSztLQUNmLENBQUM7O0FBRUYsU0FBSyxFQUFFLENBQUM7O0FBRVIsV0FBTyxRQUFRLENBQUM7Q0FDbkI7O0FBRUQsaUJBQWlCLENBQUMscUJBQXFCLEdBQUcsbUJBQW1CLENBQUM7QUFDOUQsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN2RSxPQUFPLENBQUMsTUFBTSxtQ0FBZ0IsQ0FBQztBQUMvQixPQUFPLENBQUMsTUFBTSxtQ0FBZ0IsQ0FBQztBQUMvQixNQUFNLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO3FCQUMxRSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNDblZHLHlCQUF5Qjs7OzttQ0FDeEIseUJBQXlCOzs7Ozs7Ozs7QUFPbkQsU0FBUyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7O0FBRXBDLFVBQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO0FBQ3RCLFFBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDN0IsUUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7QUFFckMsUUFBSSxRQUFRLFlBQUE7UUFDUixZQUFZLFlBQUEsQ0FBQzs7QUFFakIsYUFBUyxLQUFLLEdBQUc7QUFDYixvQkFBWSxHQUFHLHNDQUFhLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3REOztBQUVELGFBQVMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRTtBQUNoRCxZQUFJO0FBQ0Esd0JBQVksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDM0QsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNWLDBCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7S0FDSjs7QUFFRCxhQUFTLGFBQWEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRTtBQUN6RCxlQUFPLFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3pGLDBCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkIsQ0FBQyxDQUFDO0tBQ047O0FBRUQsYUFBUyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUU7QUFDckMsZUFBTyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDN0QsMEJBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QixDQUFDLENBQUM7S0FDTjs7QUFFRCxhQUFTLHFCQUFxQixDQUFDLFFBQVEsRUFBRTtBQUNyQyxlQUFPLFlBQVksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUM5RCwwQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztLQUNOOztBQUVELGFBQVMsZUFBZSxDQUFDLFVBQVUsRUFBRTtBQUNqQyxlQUFPLFlBQVksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNqRSwwQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztLQUNOOztBQUVELGFBQVMsMkJBQTJCLENBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtBQUN4RCxlQUFPLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUN2RiwwQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztLQUNOOztBQUVELGFBQVMsMEJBQTBCLEdBQUc7QUFDbEMsZUFBTyxZQUFZLENBQUMsMEJBQTBCLEVBQUUsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ2xFLDBCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkIsQ0FBQyxDQUFDO0tBQ047O0FBRUQsYUFBUyxlQUFlLEdBQUc7QUFDdkIsZUFBTyxZQUFZLENBQUMsZUFBZSxFQUFFLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUN2RCwwQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztLQUNOOztBQUVELGFBQVMsa0JBQWtCLENBQUMsVUFBVSxFQUFFO0FBQ3BDLGVBQU8sWUFBWSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEUsMEJBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QixDQUFDLENBQUM7S0FDTjs7QUFFRCxhQUFTLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUU7QUFDOUMsZUFBTyxZQUFZLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDOUUsMEJBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QixDQUFDLENBQUM7S0FDTjs7QUFFRCxhQUFTLDZCQUE2QixDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUU7QUFDeEUsZUFBTyxZQUFZLENBQUMsNkJBQTZCLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDeEcsMEJBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QixDQUFDLENBQUM7S0FDTjs7QUFFRCxhQUFTLDZCQUE2QixDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRTtBQUNqRSxlQUFPLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ2pHLDBCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkIsQ0FBQyxDQUFDO0tBQ047O0FBRUQsYUFBUyxjQUFjLENBQUMsR0FBRyxFQUFFO0FBQ3pCLFlBQUksS0FBSyxZQUFBLENBQUM7QUFDVixZQUFJLEdBQUcsRUFBRTtBQUNMLG9CQUFRLEdBQUcsQ0FBQyxJQUFJO0FBQ1oscUJBQUssb0JBQW9CO0FBQ3JCLHlCQUFLLEdBQUcsaUNBQWMsNEJBQTRCLENBQUM7QUFDbkQsMEJBQU07QUFBQSxBQUNWLHFCQUFLLG1CQUFtQjtBQUNwQix5QkFBSyxHQUFHLGlDQUFjLDZCQUE2QixDQUFDO0FBQ3BELDBCQUFNO0FBQUEsQUFDVixxQkFBSyxlQUFlO0FBQ2hCLHlCQUFLLEdBQUcsaUNBQWMseUJBQXlCLENBQUM7QUFDaEQsMEJBQU07QUFBQSxBQUNWLHFCQUFLLGNBQWM7QUFDZix5QkFBSyxHQUFHLGlDQUFjLHVCQUF1QixDQUFDO0FBQzlDLDBCQUFNO0FBQUE7YUFFYjs7O0FBR0Qsc0JBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO1NBQ2pFO0tBQ0o7O0FBRUQsWUFBUSxHQUFHO0FBQ1AscUJBQWEsRUFBRSxhQUFhO0FBQzVCLDZCQUFxQixFQUFFLHFCQUFxQjtBQUM1Qyw2QkFBcUIsRUFBRSxxQkFBcUI7QUFDNUMsdUJBQWUsRUFBRSxlQUFlO0FBQ2hDLG1DQUEyQixFQUFFLDJCQUEyQjtBQUN4RCwyQkFBbUIsRUFBRSxtQkFBbUI7QUFDeEMsa0NBQTBCLEVBQUUsMEJBQTBCO0FBQ3RELHVCQUFlLEVBQUUsZUFBZTtBQUNoQywwQkFBa0IsRUFBRSxrQkFBa0I7QUFDdEMsNEJBQW9CLEVBQUUsb0JBQW9CO0FBQzFDLHFDQUE2QixFQUFFLDZCQUE2QjtBQUM1RCxxQ0FBNkIsRUFBRSw2QkFBNkI7S0FDL0QsQ0FBQzs7QUFFRixTQUFLLEVBQUUsQ0FBQzs7QUFFUixXQUFPLFFBQVEsQ0FBQztDQUNuQjs7QUFFRCxzQkFBc0IsQ0FBQyxxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQztxQkFDekQsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDeElwRSxNQUFNLEdBQ0ksU0FEVixNQUFNLEdBQ087d0JBRGIsTUFBTTs7Ozs7QUFLSixNQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs7O0FBRzNCLE1BQUksQ0FBQyw0QkFBNEIsR0FBRyxLQUFLLENBQUM7QUFDMUMsTUFBSSxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQztBQUMzQyxNQUFJLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxDQUFDO0FBQzFDLE1BQUksQ0FBQyx5QkFBeUIsR0FBRyxLQUFLLENBQUM7QUFDdkMsTUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztBQUNyQyxNQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQ2xDLE1BQUksQ0FBQyxvQ0FBb0MsR0FBRyxLQUFLLENBQUM7QUFDbEQsTUFBSSxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQztBQUN6QyxNQUFJLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDO0FBQzNDLE1BQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7QUFDckMsTUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztBQUNyQyxNQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0FBQ25DLE1BQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7Q0FDeEM7O0FBR0wsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztxQkFDWCxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NDM0RFLGdDQUFnQzs7Ozs7Ozs7OztJQU1qRCxhQUFhO1lBQWIsYUFBYTs7QUFDSCxXQURWLGFBQWEsR0FDQTswQkFEYixhQUFhOztBQUVYLCtCQUZGLGFBQWEsNkNBRUg7O0FBRVIsUUFBSSxDQUFDLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDOzs7Ozs7QUFNOUMsUUFBSSxDQUFDLG1DQUFtQyxHQUFHLDhDQUE4QyxDQUFDOztBQUUxRixRQUFJLENBQUMsNkJBQTZCLEdBQUcsNEJBQTRCLENBQUM7Ozs7O0FBS2xFLFFBQUksQ0FBQyxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQzs7Ozs7O0FBTXZELFFBQUksQ0FBQyxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQzs7Ozs7O0FBTXZELFFBQUksQ0FBQyxvQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQztHQUM1RDs7U0E5QkMsYUFBYTs7O0FBaUNuQixJQUFJLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO3FCQUN6QixhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0NURSxpQ0FBaUM7Ozs7O0FBRy9ELElBQUksT0FBTyxHQUFHLEFBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sSUFBSyxNQUFNLENBQUM7O0FBRWxFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNULFFBQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUNoQzs7QUFFRCxNQUFNLENBQUMsaUJBQWlCLDRDQUFvQixDQUFDOztxQkFFOUIsTUFBTTtRQUNaLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0NkRCx5QkFBeUI7Ozs7Ozs7OztBQU9sRCxTQUFTLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtBQUNsQyxVQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUN0QixRQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzdCLFFBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDakMsUUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNuQyxRQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDOztBQUUzQyxRQUFJLFFBQVEsWUFBQTtRQUNSLFlBQVksWUFBQSxDQUFDOztBQUVqQixhQUFTLEtBQUssR0FBRztBQUNiLG9CQUFZLEdBQUcsc0NBQWEsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEQ7O0FBRUQsYUFBUyxhQUFhLENBQUUsR0FBRyxFQUFFO0FBQ3pCLFlBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsWUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixlQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjs7Ozs7OztBQU9ELGFBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNsQixZQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDaEIsZ0JBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELGdCQUFJLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3RCLG9CQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxLQUFLLElBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxLQUFLLElBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLElBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxLQUFLLElBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxLQUFLLElBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxlQUFlLElBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxhQUFhLEVBQ3REO0FBQ0Usd0JBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLHVCQUF1QixHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUM3Rix3QkFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO0FBQ3pELGdDQUFZLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLFFBQVEsRUFBRTtBQUNwRSw4QkFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDOUUsQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEIsOEJBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3JCLENBQUMsQ0FBQztpQkFDTixNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUNsRCxnQ0FBWSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUU7QUFDMUQsb0NBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckQsOEJBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMxRSxDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwQiw4QkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztxQkFDMUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0osTUFBTTtBQUNILHNCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixDQUFDLENBQUM7YUFDcEU7U0FDSjtLQUNKOztBQUVELGFBQVMsS0FBSyxHQUFHOztLQUVoQjs7QUFFRCxTQUFLLEVBQUUsQ0FBQzs7QUFFUixZQUFRLEdBQUc7QUFDUCxZQUFJLEVBQUUsSUFBSTtBQUNWLGFBQUssRUFBRSxLQUFLO0tBQ2YsQ0FBQzs7QUFFRixXQUFPLFFBQVEsQ0FBQztDQUNuQjs7QUFFRCxvQkFBb0IsQ0FBQyxxQkFBcUIsR0FBRyxzQkFBc0IsQ0FBQztBQUNwRSxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3FCQUMzRCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRnRCLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDOzs7Ozs7QUFNdEQsU0FBUyxZQUFZLEdBQUc7O0FBRXBCLFFBQUksUUFBUSxZQUFBO1FBQ1IsYUFBYSxZQUFBO1FBQ2IsY0FBYyxZQUFBLENBQUM7O0FBRW5CLGFBQVMsS0FBSyxHQUFHO0FBQ2Isc0JBQWMsR0FBRyxFQUFFLENBQUM7O0FBRXBCLFlBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0FBQy9CLG1CQUFPO1NBQ1Y7O0FBRUQsbUJBQVcsQ0FBQyxNQUFNLENBQUM7QUFDZixrQkFBTSxFQUFFLFdBQVcsQ0FBQyxTQUFTO0FBQzdCLGdCQUFJLEVBQUUsaUJBQWlCO1NBQzFCLENBQUMsQ0FBQzs7QUFFSCxxQkFBYSxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUM7QUFDdkMsa0JBQU0sRUFBRSxXQUFXLENBQUMsU0FBUztBQUM3QixnQkFBSSxFQUFFLGlCQUFpQjtBQUN2QixtQkFBTyxFQUFFLEdBQUc7QUFDWixxQkFBUyxFQUFFLFVBQVU7U0FDeEIsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7Ozs7Ozs7O0FBY0QsYUFBUyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUU7O0FBRXBDLFlBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDNUIsbUJBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0FBQ3RDLGdCQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO0FBQzNDLHNCQUFNLEVBQUUsV0FBVyxDQUFDLFNBQVM7QUFDN0Isb0JBQUksRUFBRSxpQkFBaUI7QUFDdkIsdUJBQU8sRUFBRSxHQUFHO0FBQ1oseUJBQVMsRUFBRSxTQUFTO2FBQ3ZCLENBQUMsQ0FBQztBQUNILDBCQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDO1NBQzdDO0tBQ0o7Ozs7Ozs7Ozs7QUFVRCxhQUFTLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUU7QUFDakQsZUFBTyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQ3BELGdCQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN4QixtQkFBTyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQU0sQ0FBQyxZQUFZO0FBQzFDLHVCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxHQUFHLG9CQUFvQixDQUFDLENBQUM7YUFDbEYsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEIsbUJBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7S0FDTjs7Ozs7Ozs7Ozs7QUFXRCxhQUFTLDZCQUE2QixDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUU7QUFDeEUsZUFBTyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQ3BELGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNiLG9CQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUNuQjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtBQUMvQixvQkFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQzNCLHlCQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsOEJBQVUsRUFBRSxDQUFDO2lCQUNoQixDQUFDO2FBQ0w7O0FBRUQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDckMsbUJBQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFNLENBQUMsWUFBWTtBQUMxQyx1QkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGdEQUFnRCxHQUFHLGdCQUFnQixDQUFDLENBQUM7YUFDOUYsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEIsbUJBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7S0FDTjs7Ozs7Ozs7OztBQVVELGFBQVMsNkJBQTZCLENBQUMsVUFBVSxFQUFFLGdCQUFnQixFQUFFO0FBQ2pFLGVBQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtBQUNwRCxnQkFBSSxLQUFLLEdBQUc7QUFDUixxQkFBSyxFQUFFLENBQUMsQ0FBQztBQUNULDBCQUFVLEVBQUUsQ0FBQzthQUNoQixDQUFDO0FBQ0YsZ0JBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7QUFDNUMscUJBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDeEM7QUFDRCxtQkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDLENBQUMsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3BCLG1CQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7Ozs7QUFVRCxhQUFTLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7QUFDdkMsWUFBSSxhQUFhLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUvQyxZQUFJLENBQUMsYUFBYSxFQUFFO0FBQ2hCLG1CQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLDJDQUEwQyxVQUFVLENBQUcsQ0FBQyxDQUFDO1NBQzNGOztBQUVELGVBQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDcEQsbUJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQyxDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwQixtQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUVOOzs7Ozs7Ozs7QUFTRCxhQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUU7QUFDekIsZUFBTyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDM0MsZ0JBQUksS0FBSyxFQUFFO0FBQ1Asb0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdDLHdCQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoRCw0QkFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzdCO2lCQUNKO0FBQ0Qsb0JBQUksSUFBSSxLQUFLLElBQUksRUFBRTtBQUNmLHdCQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLDJCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hDLE1BQU07QUFDSCwyQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLCtDQUErQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUMvRTthQUNKLE1BQU07QUFDSCx1QkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUM7YUFDekQ7U0FDSixDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwQixtQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOOzs7Ozs7OztBQVFELGFBQVMsZUFBZSxHQUFHO0FBQ3ZCLGVBQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDM0QsbUJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQ25DLDJCQUFXLEVBQUUsRUFBRTthQUNsQixDQUFDLENBQUM7U0FDTixDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwQixtQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOOzs7Ozs7OztBQVFELGFBQVMsMEJBQTBCLEdBQUc7QUFDbEMsZUFBTyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDM0MsZ0JBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFJLEtBQUssRUFBRTtBQUNQLHFCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0Msd0JBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLEVBQUU7QUFDbEQsd0NBQWdCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7cUJBQ3BEO2lCQUNKO0FBQ0QsdUJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQzVDLE1BQU07QUFDSCx1QkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDNUM7U0FDSixDQUFDLFNBQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNwQixtQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQztLQUNOOzs7Ozs7Ozs7QUFTRCxhQUFTLGNBQWMsQ0FBQyxRQUFRLEVBQUU7QUFDOUIsZUFBTyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDM0MsZ0JBQUk7QUFDQSxxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdDLHdCQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxVQUFVLEVBQUU7QUFDdkQsNkJBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO3FCQUNqQztpQkFDSjtBQUNELHVCQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25ELENBQUMsT0FBTyxHQUFHLEVBQUU7QUFDVixzQkFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzFDO1NBQ0osQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7Ozs7QUFVRCxhQUFTLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDckQsZUFBTyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQ2xELGdCQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNoQixvQkFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7YUFDdEI7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLG1CQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBTSxDQUFDLFlBQVk7QUFDMUMsdUJBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2FBQ2pFLENBQUMsQ0FBQztTQUNOLENBQUMsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3BCLG1CQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7O0FBUUQsYUFBUyxhQUFhLENBQUMsUUFBUSxFQUFFO0FBQzdCLGVBQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDN0QsZ0JBQUksS0FBSyxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUc7QUFDNUIsMkJBQVcsRUFBRSxFQUFFO2FBQ2xCLENBQUM7QUFDRixpQkFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsbUJBQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkQsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7Ozs7O0FBV0QsYUFBUyxhQUFhLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUU7QUFDekQsWUFBSSxhQUFhLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUvQyxZQUFJLENBQUMsYUFBYSxFQUFFO0FBQ2hCLG1CQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLDJDQUEwQyxVQUFVLENBQUcsQ0FBQyxDQUFDO1NBQzNGOztBQUVELGVBQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVk7QUFDL0QsbUJBQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzVCLENBQUMsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3BCLG1CQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7Ozs7Ozs7O0FBY0QsYUFBUyxPQUFPLEdBQUc7QUFDZixlQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWTtBQUN4QyxtQkFBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUIsQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEIsbUJBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7S0FDTjs7Ozs7Ozs7QUFRRCxhQUFTLGlCQUFpQixDQUFDLFNBQVMsRUFBRTtBQUNsQyxtQkFBVyxDQUFDLFlBQVksQ0FBQztBQUNyQixrQkFBTSxFQUFFLFdBQVcsQ0FBQyxTQUFTO0FBQzdCLGdCQUFJLEVBQUUsaUJBQWlCO0FBQ3ZCLG1CQUFPLEVBQUUsR0FBRztBQUNaLHFCQUFTLEVBQUUsU0FBUztTQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVk7QUFDaEIsbUJBQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BDLENBQUMsU0FBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ3BCLG1CQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2xELENBQUMsQ0FBQztBQUNILGVBQU87S0FDVjs7Ozs7Ozs7O0FBU0QsYUFBUyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUU7QUFDcEMsZUFBTyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRTtBQUMzRCxnQkFBSSxLQUFLLEVBQUU7QUFDUCx1QkFBTyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtBQUNwRCx5QkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdDLDRCQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN4RCxpQ0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNoQztxQkFDSjtBQUNELDJCQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQzdELCtCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQztxQkFDeEUsQ0FBQyxTQUFNLENBQUMsWUFBWTtBQUNqQiwrQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7cUJBQ2pGLENBQUMsQ0FBQztpQkFDTixDQUFDLENBQUM7YUFDTixNQUFNO0FBQ0gsdUJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0osQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEIsbUJBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7S0FDTjs7Ozs7Ozs7O0FBU0QsYUFBUyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUU7QUFDcEMsbUJBQVcsQ0FBQyxjQUFjLENBQUM7QUFDdkIsZ0JBQUksRUFBRSxpQkFBaUI7QUFDdkIscUJBQVMsRUFBRSxTQUFTO1NBQ3ZCLENBQUMsQ0FBQztBQUNILGVBQU8sV0FBVyxDQUFDLFlBQVksQ0FBQztBQUM1QixnQkFBSSxFQUFFLGlCQUFpQjtBQUN2QixxQkFBUyxFQUFFLFNBQVM7U0FDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQ2hCLG1CQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxtQkFBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUIsQ0FBQyxTQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7QUFDcEIsbUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsbUJBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7S0FFTjs7QUFHRCxTQUFLLEVBQUUsQ0FBQzs7QUFFUixZQUFRLEdBQUc7QUFDUCxlQUFPLEVBQUUsT0FBTztBQUNoQix3QkFBZ0IsRUFBRSxnQkFBZ0I7QUFDbEMsdUJBQWUsRUFBRSxlQUFlO0FBQ2hDLHFCQUFhLEVBQUUsYUFBYTtBQUM1QixxQkFBYSxFQUFFLGFBQWE7QUFDNUIsc0JBQWMsRUFBRSxjQUFjO0FBQzlCLG1DQUEyQixFQUFFLDJCQUEyQjtBQUN4RCwyQkFBbUIsRUFBRSxtQkFBbUI7QUFDeEMsNEJBQW9CLEVBQUUsb0JBQW9CO0FBQzFDLHFDQUE2QixFQUFFLDZCQUE2QjtBQUM1RCxxQ0FBNkIsRUFBRSw2QkFBNkI7QUFDNUQsa0NBQTBCLEVBQUUsMEJBQTBCO0FBQ3RELHVCQUFlLEVBQUUsZUFBZTtBQUNoQyx5QkFBaUIsRUFBRSxpQkFBaUI7QUFDcEMsMEJBQWtCLEVBQUUsa0JBQWtCO0tBQ3pDLENBQUM7O0FBRUYsV0FBTyxRQUFRLENBQUM7Q0FDbkI7O0FBRUQsWUFBWSxDQUFDLHFCQUFxQixHQUFHLGNBQWMsQ0FBQztxQkFDckMsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNWFwRSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsV0FBVyxDQUFDO0FBQ3RELElBQU0sZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUM7Ozs7Ozs7QUFPOUMsU0FBUyw0QkFBNEIsQ0FBQyxNQUFNLEVBQUU7O0FBRTFDLFFBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDckMsUUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUMzQyxRQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2pDLFFBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDM0IsUUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUMzQyxRQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDOztBQUVuQyxRQUFJLFFBQVEsWUFBQTtRQUNSLEdBQUcsWUFBQTtRQUNILE1BQU0sWUFBQSxDQUFDOztBQUdYLGFBQVMsS0FBSyxHQUFHO0FBQ2IsY0FBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdEM7Ozs7Ozs7Ozs7QUFVRCxhQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFO0FBQ25DLGVBQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFOztBQUUxQyxlQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDakUsZ0JBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7O0FBRTNHLGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNqQyxvQkFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ2pCLHdDQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLGlDQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2lCQUN6QzthQUNKOztBQUVELGdCQUFJLGVBQWUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMsZ0JBQUksZUFBZSxLQUFLLEVBQUUsRUFBRTtBQUN4Qix1QkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzVCLE1BQU07QUFDSCxzQkFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzNCO1NBQ0osQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7OztBQVNELGFBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRTtBQUN6QixjQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksYUFBYSxFQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3RSxlQUFPLElBQUksUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM1RTs7Ozs7Ozs7QUFRRCxhQUFTLG9CQUFvQixDQUFDLFVBQVUsRUFBRTtBQUN0QyxZQUFJLFFBQVEsWUFBQTtZQUNSLFVBQVUsWUFBQTtZQUNWLGdCQUFnQixZQUFBLENBQUM7O0FBRXJCLFlBQUksR0FBRyxRQUFNLGdCQUFnQixHQUFHLFVBQVUsTUFBRyxDQUFDOztBQUU5QyxnQkFBUSxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRW5FLFlBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBRXZCLGdCQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4RCxtQkFBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDeEIsc0JBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkM7QUFDRCxnQkFBUSxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsZ0JBQUksT0FBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7O0FBRXBDLGdCQUFJLE9BQU0sQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUN2Qyx3QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7YUFDL0IsTUFBTSxJQUFJLE9BQU0sQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLGNBQWMsRUFBRTtBQUN6RCxvQkFBSSxjQUFjLEdBQUcsT0FBTSxDQUFDLFVBQVUsQ0FBQztBQUN2QyxvQkFBSSxjQUFjLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxjQUFjLEVBQUU7O0FBRXpELHdCQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQ3RGLGtDQUFVLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRCx3Q0FBZ0IsR0FBRyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMzRCxnQ0FBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQztxQkFDckUsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO0FBQ3ZDLGdDQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztxQkFDL0IsTUFBTTtBQUNILGtDQUFVLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRCx3Q0FBZ0IsR0FBRyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMzRCxnQ0FBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDO3FCQUMvRDtpQkFDSjthQUNKLE1BQU07QUFDSCx3QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7YUFDL0I7U0FDSjtLQUNKOzs7Ozs7Ozs7QUFTRCxhQUFTLGFBQWEsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFO0FBQy9DLFlBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEUsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsZ0NBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3BEO0tBQ0o7Ozs7Ozs7OztBQVNELGFBQVMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLHVCQUF1QixFQUFFO0FBQ2xFLFlBQUksY0FBYyxZQUFBO1lBQ2Qsb0JBQW9CLFlBQUE7WUFDcEIscUJBQXFCLFlBQUE7WUFDckIsZUFBZSxZQUFBLENBQUM7O0FBRXBCLHNCQUFjLEdBQUcsYUFBYSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFbEYsYUFBSyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2pELGdDQUFvQixHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxnQkFBSSxvQkFBb0IsRUFBRTtBQUN0QixxQ0FBcUIsR0FBRyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2pFLCtCQUFlLEdBQUcsbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFNUQsc0RBQXNDLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixDQUFDLENBQUM7O0FBRXJHLCtCQUFlLEdBQUcsbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFNUQsaUNBQWlCLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFeEMsb0JBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDOUIsaUNBQWEsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztpQkFDbkQsTUFBTTs7QUFFSCx5QkFBSyxJQUFJLEVBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxFQUFFLEVBQUU7QUFDN0MsNEJBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUM3Qiw0QkFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLDRCQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ3pCLHFEQUF5QixDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQzt5QkFDL0M7cUJBQ0o7O0FBRUQsd0JBQUksZUFBZSxHQUFHLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRS9ELHdCQUFJLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQzdCLHFEQUE2QixDQUFDLGVBQWUsQ0FBQyxDQUFDO3FCQUNsRDs7O0FBR0Qsd0JBQUksdUJBQXVCLElBQUksdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRztBQUNoRSw0QkFBSSxXQUFXLFlBQUEsQ0FBQztBQUNoQiw2QkFBSyxJQUFJLEdBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFLEVBQUU7QUFDN0MsZ0NBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUM3QixpQ0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsdUJBQXVCLElBQUksQ0FBQyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRixvQ0FBSSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRTtBQUMxQywrQ0FBVyxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLDBDQUFNO2lDQUNUOzZCQUNKO3lCQUNKO0FBQ0Qsb0RBQTRCLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLENBQUM7cUJBQ25FO2lCQUNKO2FBQ0o7U0FDSjtLQUNKOzs7Ozs7Ozs7QUFTRCxhQUFTLGtCQUFrQixDQUFDLG9CQUFvQixFQUFFO0FBQzlDLFlBQUksVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDbEMsbUJBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQztTQUMxQixNQUFNLElBQUksVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDekMsbUJBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQztTQUMxQixNQUFNLElBQUksVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDekMsbUJBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQztTQUMxQixNQUFNLElBQUksbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsRUFBRTtBQUNsRCxtQkFBTyxTQUFTLENBQUMsZUFBZSxDQUFDO1NBQ3BDLE1BQU0sSUFBSSxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBRTtBQUN6QyxtQkFBTyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQzFCOztBQUVELGVBQU8sU0FBUyxDQUFDLElBQUksQ0FBQztLQUN6Qjs7QUFFRCxhQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUU7QUFDNUIsZUFBTyxXQUFXLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuRDs7QUFFRCxhQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUU7QUFDNUIsZUFBTyxXQUFXLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuRDs7QUFFRCxhQUFTLG1CQUFtQixDQUFDLFVBQVUsRUFBRTtBQUNyQyxlQUFPLFdBQVcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQzdEOztBQUVELGFBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRTtBQUM1QixlQUFPLFdBQVcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25EOztBQUVELGFBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRTtBQUM1QixlQUFPLFdBQVcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25EOzs7QUFHRCxhQUFTLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFOztBQUVuQyxZQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2Isa0JBQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUNoRDs7QUFFRCxZQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1Asa0JBQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUMxQzs7O0FBR0QsWUFBSSwwQkFBMEIsQ0FBQyxVQUFVLENBQUMsRUFBRTs7QUFFeEMsbUJBQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQyxlQUFlLENBQUM7U0FDN0M7OztBQUdELGVBQU8sWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN6Qzs7QUFFRCxhQUFTLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLFlBQUksYUFBYSxHQUFHLEFBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJLEdBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRTVGLFlBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QyxZQUFJLFFBQVEsRUFBRTtBQUNWLG1CQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7OztBQUdELFlBQUksZUFBZSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RELFlBQUksZUFBZSxFQUFFO0FBQ2pCLGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxvQkFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLHdCQUFRLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3hDLG9CQUFJLFFBQVEsRUFBRTtBQUNWLDJCQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0o7U0FDSjtBQUNELGVBQU8sS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7QUFNRCxhQUFTLDBCQUEwQixDQUFFLFVBQVUsRUFBRTtBQUM3QyxZQUFJLCtCQUErQixHQUFHLFNBQWxDLCtCQUErQixDQUFhLEdBQUcsRUFBRTtBQUNqRCxnQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEQsZ0JBQUksTUFBTSxFQUFFO0FBQ1Isb0JBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUc7QUFDdEMsMkJBQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7QUFDRCxtQkFBTyxLQUFLLENBQUM7U0FDaEIsQ0FBQzs7QUFFRixZQUFJLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzdDLG1CQUFPLElBQUksQ0FBQztTQUNmOzs7QUFHRCxZQUFJLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RCxZQUFJLGVBQWUsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7QUFFL0MsZ0JBQUksK0JBQStCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDckQsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtBQUNELGVBQU8sS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7Ozs7QUFTRCxhQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDdkIsZUFBTyxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNwRDs7Ozs7Ozs7O0FBU0QsYUFBUyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUU7QUFDckMsZUFBTyxVQUFVLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3hFOzs7Ozs7Ozs7QUFTRCxhQUFTLGtCQUFrQixDQUFDLG9CQUFvQixFQUFFO0FBQzlDLGVBQU8sb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDcEY7Ozs7Ozs7OztBQVNELGFBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRTtBQUN6QixlQUFPLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDL0Q7O0FBRUQsYUFBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7QUFDNUIsWUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwRSxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QyxnQkFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLHVCQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuRDtLQUNKOzs7Ozs7OztBQVFELGFBQVMsMEJBQTBCLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtBQUN0RCxZQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLFlBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7QUFDckIsZ0JBQUksc0JBQXNCLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMvRSxnQkFBSSxlQUFlLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdDLG9CQUFJLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQUFBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pHLG9CQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUU7QUFDakIscUJBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNwQztBQUNELGlCQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9ELHNDQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxpQkFBQyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7QUFDRCwyQkFBZSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3ZEO0tBQ0o7O0FBRUQsYUFBUyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7QUFDakMsWUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNkLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQyxnQkFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7QUFDM0QscUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakI7U0FDSjtBQUNELGVBQU8sS0FBSyxDQUFDO0tBQ2hCOzs7Ozs7OztBQVFELGFBQVMsNkJBQTZCLENBQUMsaUJBQWlCLEVBQUU7QUFDdEQsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMvQyxnQkFBSSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRSxpQkFBSyxHQUFHLDZCQUE2QixHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUYsNkJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkUsNkJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUQsNkJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ25HO0tBQ0o7Ozs7Ozs7OztBQVNELGFBQVMseUJBQXlCLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRTtBQUM3RCxZQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxRCxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7QUFFMUMsZ0JBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxnQkFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwRixnQkFBSSxjQUFjLEVBQUU7QUFDaEIsb0JBQUksU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pFLHlCQUFTLEdBQU0sS0FBSyxVQUFPLENBQUM7QUFDNUIsOEJBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN2RTtBQUNELGdCQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUU5RSxnQkFBSSxXQUFXLEVBQUU7QUFDYixxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekMsd0JBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyx3QkFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekQseUJBQUssR0FBTSxLQUFLLFNBQUksQ0FBQyxBQUFFLENBQUM7QUFDeEIsOEJBQVUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDdkQ7YUFDSjtTQUNKO0tBQ0o7Ozs7Ozs7O0FBUUQsYUFBUyw0QkFBNEIsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0FBQ3RELFlBQUksc0JBQXNCLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMvRSw4QkFBc0IsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNyRSw4QkFBc0IsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0FBQ3RGLDhCQUFzQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUMseUJBQXlCLENBQUMsQ0FBQztBQUNsRyxrQ0FBMEIsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4RCxxQkFBYSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0tBQ3JEOzs7Ozs7Ozs7O0FBVUQsYUFBUyxzQ0FBc0MsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFO0FBQ25HLGFBQU0sSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNuRCxnQkFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLGdCQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxRCxnQkFBSSxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7QUFFdEYsb0NBQW9CLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3BEO1NBQ0o7S0FDSjs7Ozs7Ozs7OztBQVVELGFBQVMsdUJBQXVCLENBQUMsb0JBQW9CLEVBQUU7QUFDbkQsWUFBSSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEcsZUFBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsZUFBTyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzVEOzs7Ozs7Ozs7QUFTRCxhQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUU7QUFDeEIsWUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFckMsZUFBTyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUM7O0FBRUQsU0FBSyxFQUFFLENBQUM7O0FBRVIsWUFBUSxHQUFHO0FBQ1AsYUFBSyxFQUFFLEtBQUs7S0FDZixDQUFDOztBQUVGLFdBQU8sUUFBUSxDQUFDO0NBQ25CO0FBQ0QsNEJBQTRCLENBQUMscUJBQXFCLEdBQUcsOEJBQThCLENBQUM7cUJBQ3JFLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLDRCQUE0QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0NwZ0JuRCwrQkFBK0I7Ozs7Ozs7Ozs7O0FBUzVELFNBQVMsZUFBZSxHQUFHOztBQUV2QixhQUFTLEtBQUssR0FBRyxFQUNoQjs7QUFFRCxhQUFTLFFBQVEsR0FBRztBQUNoQixlQUFPLHVDQUFpQixpQkFBaUIsQ0FBQztLQUM3Qzs7Ozs7OztBQU9ELGFBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRTtBQUN6QixlQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzNDOztBQUVELGFBQVMsVUFBVSxHQUFHO0FBQ2xCLGVBQU8sS0FBSyxDQUFDO0tBQ2hCOztBQUVELGFBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDM0IsWUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLEtBQUssR0FBRyxFQUFFO0FBQzdDLG1CQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQztBQUNELGVBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQztLQUN4Qjs7QUFFRCxTQUFLLEVBQUUsQ0FBQztBQUNSLFFBQU0sUUFBUSxHQUFHO0FBQ2IsZ0JBQVEsRUFBWSxRQUFRO0FBQzVCLGtCQUFVLEVBQVUsVUFBVTtBQUM5QixzQkFBYyxFQUFNLGNBQWM7QUFDbEMsZUFBTyxFQUFhLE9BQU87S0FDOUIsQ0FBQztBQUNGLFdBQU8sUUFBUSxDQUFDO0NBQ25COztBQUVELGVBQWUsQ0FBQyxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztxQkFDM0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDOUNqRSxlQUFlLEdBQ04sU0FEVCxlQUFlLEdBQ0g7d0JBRFosZUFBZTs7QUFFYixNQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNmLE1BQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLE1BQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLE1BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0NBQ3hCOztxQkFHVSxlQUFlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFhtbEVudGl0aWVzOiByZXF1aXJlKCcuL2xpYi94bWwtZW50aXRpZXMuanMnKSxcbiAgSHRtbDRFbnRpdGllczogcmVxdWlyZSgnLi9saWIvaHRtbDQtZW50aXRpZXMuanMnKSxcbiAgSHRtbDVFbnRpdGllczogcmVxdWlyZSgnLi9saWIvaHRtbDUtZW50aXRpZXMuanMnKSxcbiAgQWxsSHRtbEVudGl0aWVzOiByZXF1aXJlKCcuL2xpYi9odG1sNS1lbnRpdGllcy5qcycpXG59O1xuIiwidmFyIEhUTUxfQUxQSEEgPSBbJ2Fwb3MnLCAnbmJzcCcsICdpZXhjbCcsICdjZW50JywgJ3BvdW5kJywgJ2N1cnJlbicsICd5ZW4nLCAnYnJ2YmFyJywgJ3NlY3QnLCAndW1sJywgJ2NvcHknLCAnb3JkZicsICdsYXF1bycsICdub3QnLCAnc2h5JywgJ3JlZycsICdtYWNyJywgJ2RlZycsICdwbHVzbW4nLCAnc3VwMicsICdzdXAzJywgJ2FjdXRlJywgJ21pY3JvJywgJ3BhcmEnLCAnbWlkZG90JywgJ2NlZGlsJywgJ3N1cDEnLCAnb3JkbScsICdyYXF1bycsICdmcmFjMTQnLCAnZnJhYzEyJywgJ2ZyYWMzNCcsICdpcXVlc3QnLCAnQWdyYXZlJywgJ0FhY3V0ZScsICdBY2lyYycsICdBdGlsZGUnLCAnQXVtbCcsICdBcmluZycsICdBZWxpZycsICdDY2VkaWwnLCAnRWdyYXZlJywgJ0VhY3V0ZScsICdFY2lyYycsICdFdW1sJywgJ0lncmF2ZScsICdJYWN1dGUnLCAnSWNpcmMnLCAnSXVtbCcsICdFVEgnLCAnTnRpbGRlJywgJ09ncmF2ZScsICdPYWN1dGUnLCAnT2NpcmMnLCAnT3RpbGRlJywgJ091bWwnLCAndGltZXMnLCAnT3NsYXNoJywgJ1VncmF2ZScsICdVYWN1dGUnLCAnVWNpcmMnLCAnVXVtbCcsICdZYWN1dGUnLCAnVEhPUk4nLCAnc3psaWcnLCAnYWdyYXZlJywgJ2FhY3V0ZScsICdhY2lyYycsICdhdGlsZGUnLCAnYXVtbCcsICdhcmluZycsICdhZWxpZycsICdjY2VkaWwnLCAnZWdyYXZlJywgJ2VhY3V0ZScsICdlY2lyYycsICdldW1sJywgJ2lncmF2ZScsICdpYWN1dGUnLCAnaWNpcmMnLCAnaXVtbCcsICdldGgnLCAnbnRpbGRlJywgJ29ncmF2ZScsICdvYWN1dGUnLCAnb2NpcmMnLCAnb3RpbGRlJywgJ291bWwnLCAnZGl2aWRlJywgJ29zbGFzaCcsICd1Z3JhdmUnLCAndWFjdXRlJywgJ3VjaXJjJywgJ3V1bWwnLCAneWFjdXRlJywgJ3Rob3JuJywgJ3l1bWwnLCAncXVvdCcsICdhbXAnLCAnbHQnLCAnZ3QnLCAnT0VsaWcnLCAnb2VsaWcnLCAnU2Nhcm9uJywgJ3NjYXJvbicsICdZdW1sJywgJ2NpcmMnLCAndGlsZGUnLCAnZW5zcCcsICdlbXNwJywgJ3RoaW5zcCcsICd6d25qJywgJ3p3aicsICdscm0nLCAncmxtJywgJ25kYXNoJywgJ21kYXNoJywgJ2xzcXVvJywgJ3JzcXVvJywgJ3NicXVvJywgJ2xkcXVvJywgJ3JkcXVvJywgJ2JkcXVvJywgJ2RhZ2dlcicsICdEYWdnZXInLCAncGVybWlsJywgJ2xzYXF1bycsICdyc2FxdW8nLCAnZXVybycsICdmbm9mJywgJ0FscGhhJywgJ0JldGEnLCAnR2FtbWEnLCAnRGVsdGEnLCAnRXBzaWxvbicsICdaZXRhJywgJ0V0YScsICdUaGV0YScsICdJb3RhJywgJ0thcHBhJywgJ0xhbWJkYScsICdNdScsICdOdScsICdYaScsICdPbWljcm9uJywgJ1BpJywgJ1JobycsICdTaWdtYScsICdUYXUnLCAnVXBzaWxvbicsICdQaGknLCAnQ2hpJywgJ1BzaScsICdPbWVnYScsICdhbHBoYScsICdiZXRhJywgJ2dhbW1hJywgJ2RlbHRhJywgJ2Vwc2lsb24nLCAnemV0YScsICdldGEnLCAndGhldGEnLCAnaW90YScsICdrYXBwYScsICdsYW1iZGEnLCAnbXUnLCAnbnUnLCAneGknLCAnb21pY3JvbicsICdwaScsICdyaG8nLCAnc2lnbWFmJywgJ3NpZ21hJywgJ3RhdScsICd1cHNpbG9uJywgJ3BoaScsICdjaGknLCAncHNpJywgJ29tZWdhJywgJ3RoZXRhc3ltJywgJ3Vwc2loJywgJ3BpdicsICdidWxsJywgJ2hlbGxpcCcsICdwcmltZScsICdQcmltZScsICdvbGluZScsICdmcmFzbCcsICd3ZWllcnAnLCAnaW1hZ2UnLCAncmVhbCcsICd0cmFkZScsICdhbGVmc3ltJywgJ2xhcnInLCAndWFycicsICdyYXJyJywgJ2RhcnInLCAnaGFycicsICdjcmFycicsICdsQXJyJywgJ3VBcnInLCAnckFycicsICdkQXJyJywgJ2hBcnInLCAnZm9yYWxsJywgJ3BhcnQnLCAnZXhpc3QnLCAnZW1wdHknLCAnbmFibGEnLCAnaXNpbicsICdub3RpbicsICduaScsICdwcm9kJywgJ3N1bScsICdtaW51cycsICdsb3dhc3QnLCAncmFkaWMnLCAncHJvcCcsICdpbmZpbicsICdhbmcnLCAnYW5kJywgJ29yJywgJ2NhcCcsICdjdXAnLCAnaW50JywgJ3RoZXJlNCcsICdzaW0nLCAnY29uZycsICdhc3ltcCcsICduZScsICdlcXVpdicsICdsZScsICdnZScsICdzdWInLCAnc3VwJywgJ25zdWInLCAnc3ViZScsICdzdXBlJywgJ29wbHVzJywgJ290aW1lcycsICdwZXJwJywgJ3Nkb3QnLCAnbGNlaWwnLCAncmNlaWwnLCAnbGZsb29yJywgJ3JmbG9vcicsICdsYW5nJywgJ3JhbmcnLCAnbG96JywgJ3NwYWRlcycsICdjbHVicycsICdoZWFydHMnLCAnZGlhbXMnXTtcbnZhciBIVE1MX0NPREVTID0gWzM5LCAxNjAsIDE2MSwgMTYyLCAxNjMsIDE2NCwgMTY1LCAxNjYsIDE2NywgMTY4LCAxNjksIDE3MCwgMTcxLCAxNzIsIDE3MywgMTc0LCAxNzUsIDE3NiwgMTc3LCAxNzgsIDE3OSwgMTgwLCAxODEsIDE4MiwgMTgzLCAxODQsIDE4NSwgMTg2LCAxODcsIDE4OCwgMTg5LCAxOTAsIDE5MSwgMTkyLCAxOTMsIDE5NCwgMTk1LCAxOTYsIDE5NywgMTk4LCAxOTksIDIwMCwgMjAxLCAyMDIsIDIwMywgMjA0LCAyMDUsIDIwNiwgMjA3LCAyMDgsIDIwOSwgMjEwLCAyMTEsIDIxMiwgMjEzLCAyMTQsIDIxNSwgMjE2LCAyMTcsIDIxOCwgMjE5LCAyMjAsIDIyMSwgMjIyLCAyMjMsIDIyNCwgMjI1LCAyMjYsIDIyNywgMjI4LCAyMjksIDIzMCwgMjMxLCAyMzIsIDIzMywgMjM0LCAyMzUsIDIzNiwgMjM3LCAyMzgsIDIzOSwgMjQwLCAyNDEsIDI0MiwgMjQzLCAyNDQsIDI0NSwgMjQ2LCAyNDcsIDI0OCwgMjQ5LCAyNTAsIDI1MSwgMjUyLCAyNTMsIDI1NCwgMjU1LCAzNCwgMzgsIDYwLCA2MiwgMzM4LCAzMzksIDM1MiwgMzUzLCAzNzYsIDcxMCwgNzMyLCA4MTk0LCA4MTk1LCA4MjAxLCA4MjA0LCA4MjA1LCA4MjA2LCA4MjA3LCA4MjExLCA4MjEyLCA4MjE2LCA4MjE3LCA4MjE4LCA4MjIwLCA4MjIxLCA4MjIyLCA4MjI0LCA4MjI1LCA4MjQwLCA4MjQ5LCA4MjUwLCA4MzY0LCA0MDIsIDkxMywgOTE0LCA5MTUsIDkxNiwgOTE3LCA5MTgsIDkxOSwgOTIwLCA5MjEsIDkyMiwgOTIzLCA5MjQsIDkyNSwgOTI2LCA5MjcsIDkyOCwgOTI5LCA5MzEsIDkzMiwgOTMzLCA5MzQsIDkzNSwgOTM2LCA5MzcsIDk0NSwgOTQ2LCA5NDcsIDk0OCwgOTQ5LCA5NTAsIDk1MSwgOTUyLCA5NTMsIDk1NCwgOTU1LCA5NTYsIDk1NywgOTU4LCA5NTksIDk2MCwgOTYxLCA5NjIsIDk2MywgOTY0LCA5NjUsIDk2NiwgOTY3LCA5NjgsIDk2OSwgOTc3LCA5NzgsIDk4MiwgODIyNiwgODIzMCwgODI0MiwgODI0MywgODI1NCwgODI2MCwgODQ3MiwgODQ2NSwgODQ3NiwgODQ4MiwgODUwMSwgODU5MiwgODU5MywgODU5NCwgODU5NSwgODU5NiwgODYyOSwgODY1NiwgODY1NywgODY1OCwgODY1OSwgODY2MCwgODcwNCwgODcwNiwgODcwNywgODcwOSwgODcxMSwgODcxMiwgODcxMywgODcxNSwgODcxOSwgODcyMSwgODcyMiwgODcyNywgODczMCwgODczMywgODczNCwgODczNiwgODc0MywgODc0NCwgODc0NSwgODc0NiwgODc0NywgODc1NiwgODc2NCwgODc3MywgODc3NiwgODgwMCwgODgwMSwgODgwNCwgODgwNSwgODgzNCwgODgzNSwgODgzNiwgODgzOCwgODgzOSwgODg1MywgODg1NSwgODg2OSwgODkwMSwgODk2OCwgODk2OSwgODk3MCwgODk3MSwgOTAwMSwgOTAwMiwgOTY3NCwgOTgyNCwgOTgyNywgOTgyOSwgOTgzMF07XG5cbnZhciBhbHBoYUluZGV4ID0ge307XG52YXIgbnVtSW5kZXggPSB7fTtcblxudmFyIGkgPSAwO1xudmFyIGxlbmd0aCA9IEhUTUxfQUxQSEEubGVuZ3RoO1xud2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICB2YXIgYSA9IEhUTUxfQUxQSEFbaV07XG4gICAgdmFyIGMgPSBIVE1MX0NPREVTW2ldO1xuICAgIGFscGhhSW5kZXhbYV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgIG51bUluZGV4W2NdID0gYTtcbiAgICBpKys7XG59XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEh0bWw0RW50aXRpZXMoKSB7fVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mKCM/W1xcd1xcZF0rKTs/L2csIGZ1bmN0aW9uKHMsIGVudGl0eSkge1xuICAgICAgICB2YXIgY2hyO1xuICAgICAgICBpZiAoZW50aXR5LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gZW50aXR5LmNoYXJBdCgxKS50b0xvd2VyQ2FzZSgpID09PSAneCcgP1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMiksIDE2KSA6XG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigxKSk7XG5cbiAgICAgICAgICAgIGlmICghKGlzTmFOKGNvZGUpIHx8IGNvZGUgPCAtMzI3NjggfHwgY29kZSA+IDY1NTM1KSkge1xuICAgICAgICAgICAgICAgIGNociA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaHIgPSBhbHBoYUluZGV4W2VudGl0eV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNociB8fCBzO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5IdG1sNEVudGl0aWVzLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDRFbnRpdGllcygpLmRlY29kZShzdHIpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5IdG1sNEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCAhc3RyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcbiAgICAgICAgdmFyIGFscGhhID0gbnVtSW5kZXhbc3RyLmNoYXJDb2RlQXQoaSldO1xuICAgICAgICByZXN1bHQgKz0gYWxwaGEgPyBcIiZcIiArIGFscGhhICsgXCI7XCIgOiBzdHIuY2hhckF0KGkpO1xuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZW5jb2RlKHN0cik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgY2MgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgdmFyIGFscGhhID0gbnVtSW5kZXhbY2NdO1xuICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIiZcIiArIGFscGhhICsgXCI7XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY2MgPCAzMiB8fCBjYyA+IDEyNikge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJiNcIiArIGNjICsgXCI7XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZW5jb2RlTm9uVVRGKHN0cik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDw9IDI1NSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHN0cltpKytdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9ICcmIycgKyBjICsgJzsnO1xuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw0RW50aXRpZXMuZW5jb2RlTm9uQVNDSUkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IEh0bWw0RW50aXRpZXMoKS5lbmNvZGVOb25BU0NJSShzdHIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sNEVudGl0aWVzO1xuIiwidmFyIEVOVElUSUVTID0gW1snQWFjdXRlJywgWzE5M11dLCBbJ2FhY3V0ZScsIFsyMjVdXSwgWydBYnJldmUnLCBbMjU4XV0sIFsnYWJyZXZlJywgWzI1OV1dLCBbJ2FjJywgWzg3NjZdXSwgWydhY2QnLCBbODc2N11dLCBbJ2FjRScsIFs4NzY2LCA4MTldXSwgWydBY2lyYycsIFsxOTRdXSwgWydhY2lyYycsIFsyMjZdXSwgWydhY3V0ZScsIFsxODBdXSwgWydBY3knLCBbMTA0MF1dLCBbJ2FjeScsIFsxMDcyXV0sIFsnQUVsaWcnLCBbMTk4XV0sIFsnYWVsaWcnLCBbMjMwXV0sIFsnYWYnLCBbODI4OV1dLCBbJ0FmcicsIFsxMjAwNjhdXSwgWydhZnInLCBbMTIwMDk0XV0sIFsnQWdyYXZlJywgWzE5Ml1dLCBbJ2FncmF2ZScsIFsyMjRdXSwgWydhbGVmc3ltJywgWzg1MDFdXSwgWydhbGVwaCcsIFs4NTAxXV0sIFsnQWxwaGEnLCBbOTEzXV0sIFsnYWxwaGEnLCBbOTQ1XV0sIFsnQW1hY3InLCBbMjU2XV0sIFsnYW1hY3InLCBbMjU3XV0sIFsnYW1hbGcnLCBbMTA4MTVdXSwgWydhbXAnLCBbMzhdXSwgWydBTVAnLCBbMzhdXSwgWydhbmRhbmQnLCBbMTA4MzddXSwgWydBbmQnLCBbMTA4MzVdXSwgWydhbmQnLCBbODc0M11dLCBbJ2FuZGQnLCBbMTA4NDRdXSwgWydhbmRzbG9wZScsIFsxMDg0MF1dLCBbJ2FuZHYnLCBbMTA4NDJdXSwgWydhbmcnLCBbODczNl1dLCBbJ2FuZ2UnLCBbMTA2NjBdXSwgWydhbmdsZScsIFs4NzM2XV0sIFsnYW5nbXNkYWEnLCBbMTA2NjRdXSwgWydhbmdtc2RhYicsIFsxMDY2NV1dLCBbJ2FuZ21zZGFjJywgWzEwNjY2XV0sIFsnYW5nbXNkYWQnLCBbMTA2NjddXSwgWydhbmdtc2RhZScsIFsxMDY2OF1dLCBbJ2FuZ21zZGFmJywgWzEwNjY5XV0sIFsnYW5nbXNkYWcnLCBbMTA2NzBdXSwgWydhbmdtc2RhaCcsIFsxMDY3MV1dLCBbJ2FuZ21zZCcsIFs4NzM3XV0sIFsnYW5ncnQnLCBbODczNV1dLCBbJ2FuZ3J0dmInLCBbODg5NF1dLCBbJ2FuZ3J0dmJkJywgWzEwNjUzXV0sIFsnYW5nc3BoJywgWzg3MzhdXSwgWydhbmdzdCcsIFsxOTddXSwgWydhbmd6YXJyJywgWzkwODRdXSwgWydBb2dvbicsIFsyNjBdXSwgWydhb2dvbicsIFsyNjFdXSwgWydBb3BmJywgWzEyMDEyMF1dLCBbJ2FvcGYnLCBbMTIwMTQ2XV0sIFsnYXBhY2lyJywgWzEwODYzXV0sIFsnYXAnLCBbODc3Nl1dLCBbJ2FwRScsIFsxMDg2NF1dLCBbJ2FwZScsIFs4Nzc4XV0sIFsnYXBpZCcsIFs4Nzc5XV0sIFsnYXBvcycsIFszOV1dLCBbJ0FwcGx5RnVuY3Rpb24nLCBbODI4OV1dLCBbJ2FwcHJveCcsIFs4Nzc2XV0sIFsnYXBwcm94ZXEnLCBbODc3OF1dLCBbJ0FyaW5nJywgWzE5N11dLCBbJ2FyaW5nJywgWzIyOV1dLCBbJ0FzY3InLCBbMTE5OTY0XV0sIFsnYXNjcicsIFsxMTk5OTBdXSwgWydBc3NpZ24nLCBbODc4OF1dLCBbJ2FzdCcsIFs0Ml1dLCBbJ2FzeW1wJywgWzg3NzZdXSwgWydhc3ltcGVxJywgWzg3ODFdXSwgWydBdGlsZGUnLCBbMTk1XV0sIFsnYXRpbGRlJywgWzIyN11dLCBbJ0F1bWwnLCBbMTk2XV0sIFsnYXVtbCcsIFsyMjhdXSwgWydhd2NvbmludCcsIFs4NzU1XV0sIFsnYXdpbnQnLCBbMTA3NjldXSwgWydiYWNrY29uZycsIFs4NzgwXV0sIFsnYmFja2Vwc2lsb24nLCBbMTAxNF1dLCBbJ2JhY2twcmltZScsIFs4MjQ1XV0sIFsnYmFja3NpbScsIFs4NzY1XV0sIFsnYmFja3NpbWVxJywgWzg5MDldXSwgWydCYWNrc2xhc2gnLCBbODcyNl1dLCBbJ0JhcnYnLCBbMTA5ODNdXSwgWydiYXJ2ZWUnLCBbODg5M11dLCBbJ2JhcndlZCcsIFs4OTY1XV0sIFsnQmFyd2VkJywgWzg5NjZdXSwgWydiYXJ3ZWRnZScsIFs4OTY1XV0sIFsnYmJyaycsIFs5MTQxXV0sIFsnYmJya3RicmsnLCBbOTE0Ml1dLCBbJ2Jjb25nJywgWzg3ODBdXSwgWydCY3knLCBbMTA0MV1dLCBbJ2JjeScsIFsxMDczXV0sIFsnYmRxdW8nLCBbODIyMl1dLCBbJ2JlY2F1cycsIFs4NzU3XV0sIFsnYmVjYXVzZScsIFs4NzU3XV0sIFsnQmVjYXVzZScsIFs4NzU3XV0sIFsnYmVtcHR5dicsIFsxMDY3Ml1dLCBbJ2JlcHNpJywgWzEwMTRdXSwgWydiZXJub3UnLCBbODQ5Ml1dLCBbJ0Jlcm5vdWxsaXMnLCBbODQ5Ml1dLCBbJ0JldGEnLCBbOTE0XV0sIFsnYmV0YScsIFs5NDZdXSwgWydiZXRoJywgWzg1MDJdXSwgWydiZXR3ZWVuJywgWzg4MTJdXSwgWydCZnInLCBbMTIwMDY5XV0sIFsnYmZyJywgWzEyMDA5NV1dLCBbJ2JpZ2NhcCcsIFs4ODk4XV0sIFsnYmlnY2lyYycsIFs5NzExXV0sIFsnYmlnY3VwJywgWzg4OTldXSwgWydiaWdvZG90JywgWzEwNzUyXV0sIFsnYmlnb3BsdXMnLCBbMTA3NTNdXSwgWydiaWdvdGltZXMnLCBbMTA3NTRdXSwgWydiaWdzcWN1cCcsIFsxMDc1OF1dLCBbJ2JpZ3N0YXInLCBbOTczM11dLCBbJ2JpZ3RyaWFuZ2xlZG93bicsIFs5NjYxXV0sIFsnYmlndHJpYW5nbGV1cCcsIFs5NjUxXV0sIFsnYmlndXBsdXMnLCBbMTA3NTZdXSwgWydiaWd2ZWUnLCBbODg5N11dLCBbJ2JpZ3dlZGdlJywgWzg4OTZdXSwgWydia2Fyb3cnLCBbMTA1MDldXSwgWydibGFja2xvemVuZ2UnLCBbMTA3MzFdXSwgWydibGFja3NxdWFyZScsIFs5NjQyXV0sIFsnYmxhY2t0cmlhbmdsZScsIFs5NjUyXV0sIFsnYmxhY2t0cmlhbmdsZWRvd24nLCBbOTY2Ml1dLCBbJ2JsYWNrdHJpYW5nbGVsZWZ0JywgWzk2NjZdXSwgWydibGFja3RyaWFuZ2xlcmlnaHQnLCBbOTY1Nl1dLCBbJ2JsYW5rJywgWzkyNTFdXSwgWydibGsxMicsIFs5NjE4XV0sIFsnYmxrMTQnLCBbOTYxN11dLCBbJ2JsazM0JywgWzk2MTldXSwgWydibG9jaycsIFs5NjA4XV0sIFsnYm5lJywgWzYxLCA4NDIxXV0sIFsnYm5lcXVpdicsIFs4ODAxLCA4NDIxXV0sIFsnYk5vdCcsIFsxMDk4OV1dLCBbJ2Jub3QnLCBbODk3Nl1dLCBbJ0JvcGYnLCBbMTIwMTIxXV0sIFsnYm9wZicsIFsxMjAxNDddXSwgWydib3QnLCBbODg2OV1dLCBbJ2JvdHRvbScsIFs4ODY5XV0sIFsnYm93dGllJywgWzg5MDRdXSwgWydib3hib3gnLCBbMTA2OTddXSwgWydib3hkbCcsIFs5NDg4XV0sIFsnYm94ZEwnLCBbOTU1N11dLCBbJ2JveERsJywgWzk1NThdXSwgWydib3hETCcsIFs5NTU5XV0sIFsnYm94ZHInLCBbOTQ4NF1dLCBbJ2JveGRSJywgWzk1NTRdXSwgWydib3hEcicsIFs5NTU1XV0sIFsnYm94RFInLCBbOTU1Nl1dLCBbJ2JveGgnLCBbOTQ3Ml1dLCBbJ2JveEgnLCBbOTU1Ml1dLCBbJ2JveGhkJywgWzk1MTZdXSwgWydib3hIZCcsIFs5NTcyXV0sIFsnYm94aEQnLCBbOTU3M11dLCBbJ2JveEhEJywgWzk1NzRdXSwgWydib3hodScsIFs5NTI0XV0sIFsnYm94SHUnLCBbOTU3NV1dLCBbJ2JveGhVJywgWzk1NzZdXSwgWydib3hIVScsIFs5NTc3XV0sIFsnYm94bWludXMnLCBbODg2M11dLCBbJ2JveHBsdXMnLCBbODg2Ml1dLCBbJ2JveHRpbWVzJywgWzg4NjRdXSwgWydib3h1bCcsIFs5NDk2XV0sIFsnYm94dUwnLCBbOTU2M11dLCBbJ2JveFVsJywgWzk1NjRdXSwgWydib3hVTCcsIFs5NTY1XV0sIFsnYm94dXInLCBbOTQ5Ml1dLCBbJ2JveHVSJywgWzk1NjBdXSwgWydib3hVcicsIFs5NTYxXV0sIFsnYm94VVInLCBbOTU2Ml1dLCBbJ2JveHYnLCBbOTQ3NF1dLCBbJ2JveFYnLCBbOTU1M11dLCBbJ2JveHZoJywgWzk1MzJdXSwgWydib3h2SCcsIFs5NTc4XV0sIFsnYm94VmgnLCBbOTU3OV1dLCBbJ2JveFZIJywgWzk1ODBdXSwgWydib3h2bCcsIFs5NTA4XV0sIFsnYm94dkwnLCBbOTU2OV1dLCBbJ2JveFZsJywgWzk1NzBdXSwgWydib3hWTCcsIFs5NTcxXV0sIFsnYm94dnInLCBbOTUwMF1dLCBbJ2JveHZSJywgWzk1NjZdXSwgWydib3hWcicsIFs5NTY3XV0sIFsnYm94VlInLCBbOTU2OF1dLCBbJ2JwcmltZScsIFs4MjQ1XV0sIFsnYnJldmUnLCBbNzI4XV0sIFsnQnJldmUnLCBbNzI4XV0sIFsnYnJ2YmFyJywgWzE2Nl1dLCBbJ2JzY3InLCBbMTE5OTkxXV0sIFsnQnNjcicsIFs4NDkyXV0sIFsnYnNlbWknLCBbODI3MV1dLCBbJ2JzaW0nLCBbODc2NV1dLCBbJ2JzaW1lJywgWzg5MDldXSwgWydic29sYicsIFsxMDY5M11dLCBbJ2Jzb2wnLCBbOTJdXSwgWydic29saHN1YicsIFsxMDE4NF1dLCBbJ2J1bGwnLCBbODIyNl1dLCBbJ2J1bGxldCcsIFs4MjI2XV0sIFsnYnVtcCcsIFs4NzgyXV0sIFsnYnVtcEUnLCBbMTA5MjZdXSwgWydidW1wZScsIFs4NzgzXV0sIFsnQnVtcGVxJywgWzg3ODJdXSwgWydidW1wZXEnLCBbODc4M11dLCBbJ0NhY3V0ZScsIFsyNjJdXSwgWydjYWN1dGUnLCBbMjYzXV0sIFsnY2FwYW5kJywgWzEwODIwXV0sIFsnY2FwYnJjdXAnLCBbMTA4MjVdXSwgWydjYXBjYXAnLCBbMTA4MjddXSwgWydjYXAnLCBbODc0NV1dLCBbJ0NhcCcsIFs4OTE0XV0sIFsnY2FwY3VwJywgWzEwODIzXV0sIFsnY2FwZG90JywgWzEwODE2XV0sIFsnQ2FwaXRhbERpZmZlcmVudGlhbEQnLCBbODUxN11dLCBbJ2NhcHMnLCBbODc0NSwgNjUwMjRdXSwgWydjYXJldCcsIFs4MjU3XV0sIFsnY2Fyb24nLCBbNzExXV0sIFsnQ2F5bGV5cycsIFs4NDkzXV0sIFsnY2NhcHMnLCBbMTA4MjldXSwgWydDY2Fyb24nLCBbMjY4XV0sIFsnY2Nhcm9uJywgWzI2OV1dLCBbJ0NjZWRpbCcsIFsxOTldXSwgWydjY2VkaWwnLCBbMjMxXV0sIFsnQ2NpcmMnLCBbMjY0XV0sIFsnY2NpcmMnLCBbMjY1XV0sIFsnQ2NvbmludCcsIFs4NzUyXV0sIFsnY2N1cHMnLCBbMTA4MjhdXSwgWydjY3Vwc3NtJywgWzEwODMyXV0sIFsnQ2RvdCcsIFsyNjZdXSwgWydjZG90JywgWzI2N11dLCBbJ2NlZGlsJywgWzE4NF1dLCBbJ0NlZGlsbGEnLCBbMTg0XV0sIFsnY2VtcHR5dicsIFsxMDY3NF1dLCBbJ2NlbnQnLCBbMTYyXV0sIFsnY2VudGVyZG90JywgWzE4M11dLCBbJ0NlbnRlckRvdCcsIFsxODNdXSwgWydjZnInLCBbMTIwMDk2XV0sIFsnQ2ZyJywgWzg0OTNdXSwgWydDSGN5JywgWzEwNjNdXSwgWydjaGN5JywgWzEwOTVdXSwgWydjaGVjaycsIFsxMDAwM11dLCBbJ2NoZWNrbWFyaycsIFsxMDAwM11dLCBbJ0NoaScsIFs5MzVdXSwgWydjaGknLCBbOTY3XV0sIFsnY2lyYycsIFs3MTBdXSwgWydjaXJjZXEnLCBbODc5MV1dLCBbJ2NpcmNsZWFycm93bGVmdCcsIFs4NjM0XV0sIFsnY2lyY2xlYXJyb3dyaWdodCcsIFs4NjM1XV0sIFsnY2lyY2xlZGFzdCcsIFs4ODU5XV0sIFsnY2lyY2xlZGNpcmMnLCBbODg1OF1dLCBbJ2NpcmNsZWRkYXNoJywgWzg4NjFdXSwgWydDaXJjbGVEb3QnLCBbODg1N11dLCBbJ2NpcmNsZWRSJywgWzE3NF1dLCBbJ2NpcmNsZWRTJywgWzk0MTZdXSwgWydDaXJjbGVNaW51cycsIFs4ODU0XV0sIFsnQ2lyY2xlUGx1cycsIFs4ODUzXV0sIFsnQ2lyY2xlVGltZXMnLCBbODg1NV1dLCBbJ2NpcicsIFs5Njc1XV0sIFsnY2lyRScsIFsxMDY5MV1dLCBbJ2NpcmUnLCBbODc5MV1dLCBbJ2NpcmZuaW50JywgWzEwNzY4XV0sIFsnY2lybWlkJywgWzEwOTkxXV0sIFsnY2lyc2NpcicsIFsxMDY5MF1dLCBbJ0Nsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbCcsIFs4NzU0XV0sIFsnY2x1YnMnLCBbOTgyN11dLCBbJ2NsdWJzdWl0JywgWzk4MjddXSwgWydjb2xvbicsIFs1OF1dLCBbJ0NvbG9uJywgWzg3NTldXSwgWydDb2xvbmUnLCBbMTA4NjhdXSwgWydjb2xvbmUnLCBbODc4OF1dLCBbJ2NvbG9uZXEnLCBbODc4OF1dLCBbJ2NvbW1hJywgWzQ0XV0sIFsnY29tbWF0JywgWzY0XV0sIFsnY29tcCcsIFs4NzA1XV0sIFsnY29tcGZuJywgWzg3MjhdXSwgWydjb21wbGVtZW50JywgWzg3MDVdXSwgWydjb21wbGV4ZXMnLCBbODQ1MF1dLCBbJ2NvbmcnLCBbODc3M11dLCBbJ2Nvbmdkb3QnLCBbMTA4NjFdXSwgWydDb25ncnVlbnQnLCBbODgwMV1dLCBbJ2NvbmludCcsIFs4NzUwXV0sIFsnQ29uaW50JywgWzg3NTFdXSwgWydDb250b3VySW50ZWdyYWwnLCBbODc1MF1dLCBbJ2NvcGYnLCBbMTIwMTQ4XV0sIFsnQ29wZicsIFs4NDUwXV0sIFsnY29wcm9kJywgWzg3MjBdXSwgWydDb3Byb2R1Y3QnLCBbODcyMF1dLCBbJ2NvcHknLCBbMTY5XV0sIFsnQ09QWScsIFsxNjldXSwgWydjb3B5c3InLCBbODQ3MV1dLCBbJ0NvdW50ZXJDbG9ja3dpc2VDb250b3VySW50ZWdyYWwnLCBbODc1NV1dLCBbJ2NyYXJyJywgWzg2MjldXSwgWydjcm9zcycsIFsxMDAwN11dLCBbJ0Nyb3NzJywgWzEwNzk5XV0sIFsnQ3NjcicsIFsxMTk5NjZdXSwgWydjc2NyJywgWzExOTk5Ml1dLCBbJ2NzdWInLCBbMTA5NTldXSwgWydjc3ViZScsIFsxMDk2MV1dLCBbJ2NzdXAnLCBbMTA5NjBdXSwgWydjc3VwZScsIFsxMDk2Ml1dLCBbJ2N0ZG90JywgWzg5NDNdXSwgWydjdWRhcnJsJywgWzEwNTUyXV0sIFsnY3VkYXJycicsIFsxMDU0OV1dLCBbJ2N1ZXByJywgWzg5MjZdXSwgWydjdWVzYycsIFs4OTI3XV0sIFsnY3VsYXJyJywgWzg2MzBdXSwgWydjdWxhcnJwJywgWzEwNTU3XV0sIFsnY3VwYnJjYXAnLCBbMTA4MjRdXSwgWydjdXBjYXAnLCBbMTA4MjJdXSwgWydDdXBDYXAnLCBbODc4MV1dLCBbJ2N1cCcsIFs4NzQ2XV0sIFsnQ3VwJywgWzg5MTVdXSwgWydjdXBjdXAnLCBbMTA4MjZdXSwgWydjdXBkb3QnLCBbODg0NV1dLCBbJ2N1cG9yJywgWzEwODIxXV0sIFsnY3VwcycsIFs4NzQ2LCA2NTAyNF1dLCBbJ2N1cmFycicsIFs4NjMxXV0sIFsnY3VyYXJybScsIFsxMDU1Nl1dLCBbJ2N1cmx5ZXFwcmVjJywgWzg5MjZdXSwgWydjdXJseWVxc3VjYycsIFs4OTI3XV0sIFsnY3VybHl2ZWUnLCBbODkxMF1dLCBbJ2N1cmx5d2VkZ2UnLCBbODkxMV1dLCBbJ2N1cnJlbicsIFsxNjRdXSwgWydjdXJ2ZWFycm93bGVmdCcsIFs4NjMwXV0sIFsnY3VydmVhcnJvd3JpZ2h0JywgWzg2MzFdXSwgWydjdXZlZScsIFs4OTEwXV0sIFsnY3V3ZWQnLCBbODkxMV1dLCBbJ2N3Y29uaW50JywgWzg3NTRdXSwgWydjd2ludCcsIFs4NzUzXV0sIFsnY3lsY3R5JywgWzkwMDVdXSwgWydkYWdnZXInLCBbODIyNF1dLCBbJ0RhZ2dlcicsIFs4MjI1XV0sIFsnZGFsZXRoJywgWzg1MDRdXSwgWydkYXJyJywgWzg1OTVdXSwgWydEYXJyJywgWzg2MDldXSwgWydkQXJyJywgWzg2NTldXSwgWydkYXNoJywgWzgyMDhdXSwgWydEYXNodicsIFsxMDk4MF1dLCBbJ2Rhc2h2JywgWzg4NjddXSwgWydkYmthcm93JywgWzEwNTExXV0sIFsnZGJsYWMnLCBbNzMzXV0sIFsnRGNhcm9uJywgWzI3MF1dLCBbJ2RjYXJvbicsIFsyNzFdXSwgWydEY3knLCBbMTA0NF1dLCBbJ2RjeScsIFsxMDc2XV0sIFsnZGRhZ2dlcicsIFs4MjI1XV0sIFsnZGRhcnInLCBbODY1MF1dLCBbJ0REJywgWzg1MTddXSwgWydkZCcsIFs4NTE4XV0sIFsnRERvdHJhaGQnLCBbMTA1MTNdXSwgWydkZG90c2VxJywgWzEwODcxXV0sIFsnZGVnJywgWzE3Nl1dLCBbJ0RlbCcsIFs4NzExXV0sIFsnRGVsdGEnLCBbOTE2XV0sIFsnZGVsdGEnLCBbOTQ4XV0sIFsnZGVtcHR5dicsIFsxMDY3M11dLCBbJ2RmaXNodCcsIFsxMDYyM11dLCBbJ0RmcicsIFsxMjAwNzFdXSwgWydkZnInLCBbMTIwMDk3XV0sIFsnZEhhcicsIFsxMDU5N11dLCBbJ2RoYXJsJywgWzg2NDNdXSwgWydkaGFycicsIFs4NjQyXV0sIFsnRGlhY3JpdGljYWxBY3V0ZScsIFsxODBdXSwgWydEaWFjcml0aWNhbERvdCcsIFs3MjldXSwgWydEaWFjcml0aWNhbERvdWJsZUFjdXRlJywgWzczM11dLCBbJ0RpYWNyaXRpY2FsR3JhdmUnLCBbOTZdXSwgWydEaWFjcml0aWNhbFRpbGRlJywgWzczMl1dLCBbJ2RpYW0nLCBbODkwMF1dLCBbJ2RpYW1vbmQnLCBbODkwMF1dLCBbJ0RpYW1vbmQnLCBbODkwMF1dLCBbJ2RpYW1vbmRzdWl0JywgWzk4MzBdXSwgWydkaWFtcycsIFs5ODMwXV0sIFsnZGllJywgWzE2OF1dLCBbJ0RpZmZlcmVudGlhbEQnLCBbODUxOF1dLCBbJ2RpZ2FtbWEnLCBbOTg5XV0sIFsnZGlzaW4nLCBbODk0Nl1dLCBbJ2RpdicsIFsyNDddXSwgWydkaXZpZGUnLCBbMjQ3XV0sIFsnZGl2aWRlb250aW1lcycsIFs4OTAzXV0sIFsnZGl2b254JywgWzg5MDNdXSwgWydESmN5JywgWzEwMjZdXSwgWydkamN5JywgWzExMDZdXSwgWydkbGNvcm4nLCBbODk5MF1dLCBbJ2RsY3JvcCcsIFs4OTczXV0sIFsnZG9sbGFyJywgWzM2XV0sIFsnRG9wZicsIFsxMjAxMjNdXSwgWydkb3BmJywgWzEyMDE0OV1dLCBbJ0RvdCcsIFsxNjhdXSwgWydkb3QnLCBbNzI5XV0sIFsnRG90RG90JywgWzg0MTJdXSwgWydkb3RlcScsIFs4Nzg0XV0sIFsnZG90ZXFkb3QnLCBbODc4NV1dLCBbJ0RvdEVxdWFsJywgWzg3ODRdXSwgWydkb3RtaW51cycsIFs4NzYwXV0sIFsnZG90cGx1cycsIFs4NzI0XV0sIFsnZG90c3F1YXJlJywgWzg4NjVdXSwgWydkb3VibGViYXJ3ZWRnZScsIFs4OTY2XV0sIFsnRG91YmxlQ29udG91ckludGVncmFsJywgWzg3NTFdXSwgWydEb3VibGVEb3QnLCBbMTY4XV0sIFsnRG91YmxlRG93bkFycm93JywgWzg2NTldXSwgWydEb3VibGVMZWZ0QXJyb3cnLCBbODY1Nl1dLCBbJ0RvdWJsZUxlZnRSaWdodEFycm93JywgWzg2NjBdXSwgWydEb3VibGVMZWZ0VGVlJywgWzEwOTgwXV0sIFsnRG91YmxlTG9uZ0xlZnRBcnJvdycsIFsxMDIzMl1dLCBbJ0RvdWJsZUxvbmdMZWZ0UmlnaHRBcnJvdycsIFsxMDIzNF1dLCBbJ0RvdWJsZUxvbmdSaWdodEFycm93JywgWzEwMjMzXV0sIFsnRG91YmxlUmlnaHRBcnJvdycsIFs4NjU4XV0sIFsnRG91YmxlUmlnaHRUZWUnLCBbODg3Ml1dLCBbJ0RvdWJsZVVwQXJyb3cnLCBbODY1N11dLCBbJ0RvdWJsZVVwRG93bkFycm93JywgWzg2NjFdXSwgWydEb3VibGVWZXJ0aWNhbEJhcicsIFs4NzQxXV0sIFsnRG93bkFycm93QmFyJywgWzEwNTE1XV0sIFsnZG93bmFycm93JywgWzg1OTVdXSwgWydEb3duQXJyb3cnLCBbODU5NV1dLCBbJ0Rvd25hcnJvdycsIFs4NjU5XV0sIFsnRG93bkFycm93VXBBcnJvdycsIFs4NjkzXV0sIFsnRG93bkJyZXZlJywgWzc4NV1dLCBbJ2Rvd25kb3duYXJyb3dzJywgWzg2NTBdXSwgWydkb3duaGFycG9vbmxlZnQnLCBbODY0M11dLCBbJ2Rvd25oYXJwb29ucmlnaHQnLCBbODY0Ml1dLCBbJ0Rvd25MZWZ0UmlnaHRWZWN0b3InLCBbMTA1NzZdXSwgWydEb3duTGVmdFRlZVZlY3RvcicsIFsxMDU5MF1dLCBbJ0Rvd25MZWZ0VmVjdG9yQmFyJywgWzEwNTgyXV0sIFsnRG93bkxlZnRWZWN0b3InLCBbODYzN11dLCBbJ0Rvd25SaWdodFRlZVZlY3RvcicsIFsxMDU5MV1dLCBbJ0Rvd25SaWdodFZlY3RvckJhcicsIFsxMDU4M11dLCBbJ0Rvd25SaWdodFZlY3RvcicsIFs4NjQxXV0sIFsnRG93blRlZUFycm93JywgWzg2MTVdXSwgWydEb3duVGVlJywgWzg4NjhdXSwgWydkcmJrYXJvdycsIFsxMDUxMl1dLCBbJ2RyY29ybicsIFs4OTkxXV0sIFsnZHJjcm9wJywgWzg5NzJdXSwgWydEc2NyJywgWzExOTk2N11dLCBbJ2RzY3InLCBbMTE5OTkzXV0sIFsnRFNjeScsIFsxMDI5XV0sIFsnZHNjeScsIFsxMTA5XV0sIFsnZHNvbCcsIFsxMDc0Ml1dLCBbJ0RzdHJvaycsIFsyNzJdXSwgWydkc3Ryb2snLCBbMjczXV0sIFsnZHRkb3QnLCBbODk0NV1dLCBbJ2R0cmknLCBbOTY2M11dLCBbJ2R0cmlmJywgWzk2NjJdXSwgWydkdWFycicsIFs4NjkzXV0sIFsnZHVoYXInLCBbMTA2MDddXSwgWydkd2FuZ2xlJywgWzEwNjYyXV0sIFsnRFpjeScsIFsxMDM5XV0sIFsnZHpjeScsIFsxMTE5XV0sIFsnZHppZ3JhcnInLCBbMTAyMzldXSwgWydFYWN1dGUnLCBbMjAxXV0sIFsnZWFjdXRlJywgWzIzM11dLCBbJ2Vhc3RlcicsIFsxMDg2Ml1dLCBbJ0VjYXJvbicsIFsyODJdXSwgWydlY2Fyb24nLCBbMjgzXV0sIFsnRWNpcmMnLCBbMjAyXV0sIFsnZWNpcmMnLCBbMjM0XV0sIFsnZWNpcicsIFs4NzkwXV0sIFsnZWNvbG9uJywgWzg3ODldXSwgWydFY3knLCBbMTA2OV1dLCBbJ2VjeScsIFsxMTAxXV0sIFsnZUREb3QnLCBbMTA4NzFdXSwgWydFZG90JywgWzI3OF1dLCBbJ2Vkb3QnLCBbMjc5XV0sIFsnZURvdCcsIFs4Nzg1XV0sIFsnZWUnLCBbODUxOV1dLCBbJ2VmRG90JywgWzg3ODZdXSwgWydFZnInLCBbMTIwMDcyXV0sIFsnZWZyJywgWzEyMDA5OF1dLCBbJ2VnJywgWzEwOTA2XV0sIFsnRWdyYXZlJywgWzIwMF1dLCBbJ2VncmF2ZScsIFsyMzJdXSwgWydlZ3MnLCBbMTA5MDJdXSwgWydlZ3Nkb3QnLCBbMTA5MDRdXSwgWydlbCcsIFsxMDkwNV1dLCBbJ0VsZW1lbnQnLCBbODcxMl1dLCBbJ2VsaW50ZXJzJywgWzkxOTFdXSwgWydlbGwnLCBbODQ2N11dLCBbJ2VscycsIFsxMDkwMV1dLCBbJ2Vsc2RvdCcsIFsxMDkwM11dLCBbJ0VtYWNyJywgWzI3NF1dLCBbJ2VtYWNyJywgWzI3NV1dLCBbJ2VtcHR5JywgWzg3MDldXSwgWydlbXB0eXNldCcsIFs4NzA5XV0sIFsnRW1wdHlTbWFsbFNxdWFyZScsIFs5NzIzXV0sIFsnZW1wdHl2JywgWzg3MDldXSwgWydFbXB0eVZlcnlTbWFsbFNxdWFyZScsIFs5NjQzXV0sIFsnZW1zcDEzJywgWzgxOTZdXSwgWydlbXNwMTQnLCBbODE5N11dLCBbJ2Vtc3AnLCBbODE5NV1dLCBbJ0VORycsIFszMzBdXSwgWydlbmcnLCBbMzMxXV0sIFsnZW5zcCcsIFs4MTk0XV0sIFsnRW9nb24nLCBbMjgwXV0sIFsnZW9nb24nLCBbMjgxXV0sIFsnRW9wZicsIFsxMjAxMjRdXSwgWydlb3BmJywgWzEyMDE1MF1dLCBbJ2VwYXInLCBbODkxN11dLCBbJ2VwYXJzbCcsIFsxMDcyM11dLCBbJ2VwbHVzJywgWzEwODY1XV0sIFsnZXBzaScsIFs5NDldXSwgWydFcHNpbG9uJywgWzkxN11dLCBbJ2Vwc2lsb24nLCBbOTQ5XV0sIFsnZXBzaXYnLCBbMTAxM11dLCBbJ2VxY2lyYycsIFs4NzkwXV0sIFsnZXFjb2xvbicsIFs4Nzg5XV0sIFsnZXFzaW0nLCBbODc3MF1dLCBbJ2Vxc2xhbnRndHInLCBbMTA5MDJdXSwgWydlcXNsYW50bGVzcycsIFsxMDkwMV1dLCBbJ0VxdWFsJywgWzEwODY5XV0sIFsnZXF1YWxzJywgWzYxXV0sIFsnRXF1YWxUaWxkZScsIFs4NzcwXV0sIFsnZXF1ZXN0JywgWzg3OTldXSwgWydFcXVpbGlicml1bScsIFs4NjUyXV0sIFsnZXF1aXYnLCBbODgwMV1dLCBbJ2VxdWl2REQnLCBbMTA4NzJdXSwgWydlcXZwYXJzbCcsIFsxMDcyNV1dLCBbJ2VyYXJyJywgWzEwNjA5XV0sIFsnZXJEb3QnLCBbODc4N11dLCBbJ2VzY3InLCBbODQ5NV1dLCBbJ0VzY3InLCBbODQ5Nl1dLCBbJ2VzZG90JywgWzg3ODRdXSwgWydFc2ltJywgWzEwODY3XV0sIFsnZXNpbScsIFs4NzcwXV0sIFsnRXRhJywgWzkxOV1dLCBbJ2V0YScsIFs5NTFdXSwgWydFVEgnLCBbMjA4XV0sIFsnZXRoJywgWzI0MF1dLCBbJ0V1bWwnLCBbMjAzXV0sIFsnZXVtbCcsIFsyMzVdXSwgWydldXJvJywgWzgzNjRdXSwgWydleGNsJywgWzMzXV0sIFsnZXhpc3QnLCBbODcwN11dLCBbJ0V4aXN0cycsIFs4NzA3XV0sIFsnZXhwZWN0YXRpb24nLCBbODQ5Nl1dLCBbJ2V4cG9uZW50aWFsZScsIFs4NTE5XV0sIFsnRXhwb25lbnRpYWxFJywgWzg1MTldXSwgWydmYWxsaW5nZG90c2VxJywgWzg3ODZdXSwgWydGY3knLCBbMTA2MF1dLCBbJ2ZjeScsIFsxMDkyXV0sIFsnZmVtYWxlJywgWzk3OTJdXSwgWydmZmlsaWcnLCBbNjQyNTldXSwgWydmZmxpZycsIFs2NDI1Nl1dLCBbJ2ZmbGxpZycsIFs2NDI2MF1dLCBbJ0ZmcicsIFsxMjAwNzNdXSwgWydmZnInLCBbMTIwMDk5XV0sIFsnZmlsaWcnLCBbNjQyNTddXSwgWydGaWxsZWRTbWFsbFNxdWFyZScsIFs5NzI0XV0sIFsnRmlsbGVkVmVyeVNtYWxsU3F1YXJlJywgWzk2NDJdXSwgWydmamxpZycsIFsxMDIsIDEwNl1dLCBbJ2ZsYXQnLCBbOTgzN11dLCBbJ2ZsbGlnJywgWzY0MjU4XV0sIFsnZmx0bnMnLCBbOTY0OV1dLCBbJ2Zub2YnLCBbNDAyXV0sIFsnRm9wZicsIFsxMjAxMjVdXSwgWydmb3BmJywgWzEyMDE1MV1dLCBbJ2ZvcmFsbCcsIFs4NzA0XV0sIFsnRm9yQWxsJywgWzg3MDRdXSwgWydmb3JrJywgWzg5MTZdXSwgWydmb3JrdicsIFsxMDk2OV1dLCBbJ0ZvdXJpZXJ0cmYnLCBbODQ5N11dLCBbJ2ZwYXJ0aW50JywgWzEwNzY1XV0sIFsnZnJhYzEyJywgWzE4OV1dLCBbJ2ZyYWMxMycsIFs4NTMxXV0sIFsnZnJhYzE0JywgWzE4OF1dLCBbJ2ZyYWMxNScsIFs4NTMzXV0sIFsnZnJhYzE2JywgWzg1MzddXSwgWydmcmFjMTgnLCBbODUzOV1dLCBbJ2ZyYWMyMycsIFs4NTMyXV0sIFsnZnJhYzI1JywgWzg1MzRdXSwgWydmcmFjMzQnLCBbMTkwXV0sIFsnZnJhYzM1JywgWzg1MzVdXSwgWydmcmFjMzgnLCBbODU0MF1dLCBbJ2ZyYWM0NScsIFs4NTM2XV0sIFsnZnJhYzU2JywgWzg1MzhdXSwgWydmcmFjNTgnLCBbODU0MV1dLCBbJ2ZyYWM3OCcsIFs4NTQyXV0sIFsnZnJhc2wnLCBbODI2MF1dLCBbJ2Zyb3duJywgWzg5OTRdXSwgWydmc2NyJywgWzExOTk5NV1dLCBbJ0ZzY3InLCBbODQ5N11dLCBbJ2dhY3V0ZScsIFs1MDFdXSwgWydHYW1tYScsIFs5MTVdXSwgWydnYW1tYScsIFs5NDddXSwgWydHYW1tYWQnLCBbOTg4XV0sIFsnZ2FtbWFkJywgWzk4OV1dLCBbJ2dhcCcsIFsxMDg4Nl1dLCBbJ0dicmV2ZScsIFsyODZdXSwgWydnYnJldmUnLCBbMjg3XV0sIFsnR2NlZGlsJywgWzI5MF1dLCBbJ0djaXJjJywgWzI4NF1dLCBbJ2djaXJjJywgWzI4NV1dLCBbJ0djeScsIFsxMDQzXV0sIFsnZ2N5JywgWzEwNzVdXSwgWydHZG90JywgWzI4OF1dLCBbJ2dkb3QnLCBbMjg5XV0sIFsnZ2UnLCBbODgwNV1dLCBbJ2dFJywgWzg4MDddXSwgWydnRWwnLCBbMTA4OTJdXSwgWydnZWwnLCBbODkyM11dLCBbJ2dlcScsIFs4ODA1XV0sIFsnZ2VxcScsIFs4ODA3XV0sIFsnZ2Vxc2xhbnQnLCBbMTA4NzhdXSwgWydnZXNjYycsIFsxMDkyMV1dLCBbJ2dlcycsIFsxMDg3OF1dLCBbJ2dlc2RvdCcsIFsxMDg4MF1dLCBbJ2dlc2RvdG8nLCBbMTA4ODJdXSwgWydnZXNkb3RvbCcsIFsxMDg4NF1dLCBbJ2dlc2wnLCBbODkyMywgNjUwMjRdXSwgWydnZXNsZXMnLCBbMTA5MDBdXSwgWydHZnInLCBbMTIwMDc0XV0sIFsnZ2ZyJywgWzEyMDEwMF1dLCBbJ2dnJywgWzg4MTFdXSwgWydHZycsIFs4OTIxXV0sIFsnZ2dnJywgWzg5MjFdXSwgWydnaW1lbCcsIFs4NTAzXV0sIFsnR0pjeScsIFsxMDI3XV0sIFsnZ2pjeScsIFsxMTA3XV0sIFsnZ2xhJywgWzEwOTE3XV0sIFsnZ2wnLCBbODgyM11dLCBbJ2dsRScsIFsxMDg5OF1dLCBbJ2dsaicsIFsxMDkxNl1dLCBbJ2duYXAnLCBbMTA4OTBdXSwgWydnbmFwcHJveCcsIFsxMDg5MF1dLCBbJ2duZScsIFsxMDg4OF1dLCBbJ2duRScsIFs4ODA5XV0sIFsnZ25lcScsIFsxMDg4OF1dLCBbJ2duZXFxJywgWzg4MDldXSwgWydnbnNpbScsIFs4OTM1XV0sIFsnR29wZicsIFsxMjAxMjZdXSwgWydnb3BmJywgWzEyMDE1Ml1dLCBbJ2dyYXZlJywgWzk2XV0sIFsnR3JlYXRlckVxdWFsJywgWzg4MDVdXSwgWydHcmVhdGVyRXF1YWxMZXNzJywgWzg5MjNdXSwgWydHcmVhdGVyRnVsbEVxdWFsJywgWzg4MDddXSwgWydHcmVhdGVyR3JlYXRlcicsIFsxMDkxNF1dLCBbJ0dyZWF0ZXJMZXNzJywgWzg4MjNdXSwgWydHcmVhdGVyU2xhbnRFcXVhbCcsIFsxMDg3OF1dLCBbJ0dyZWF0ZXJUaWxkZScsIFs4ODE5XV0sIFsnR3NjcicsIFsxMTk5NzBdXSwgWydnc2NyJywgWzg0NThdXSwgWydnc2ltJywgWzg4MTldXSwgWydnc2ltZScsIFsxMDg5NF1dLCBbJ2dzaW1sJywgWzEwODk2XV0sIFsnZ3RjYycsIFsxMDkxOV1dLCBbJ2d0Y2lyJywgWzEwODc0XV0sIFsnZ3QnLCBbNjJdXSwgWydHVCcsIFs2Ml1dLCBbJ0d0JywgWzg4MTFdXSwgWydndGRvdCcsIFs4OTE5XV0sIFsnZ3RsUGFyJywgWzEwNjQ1XV0sIFsnZ3RxdWVzdCcsIFsxMDg3Nl1dLCBbJ2d0cmFwcHJveCcsIFsxMDg4Nl1dLCBbJ2d0cmFycicsIFsxMDYxNl1dLCBbJ2d0cmRvdCcsIFs4OTE5XV0sIFsnZ3RyZXFsZXNzJywgWzg5MjNdXSwgWydndHJlcXFsZXNzJywgWzEwODkyXV0sIFsnZ3RybGVzcycsIFs4ODIzXV0sIFsnZ3Ryc2ltJywgWzg4MTldXSwgWydndmVydG5lcXEnLCBbODgwOSwgNjUwMjRdXSwgWydndm5FJywgWzg4MDksIDY1MDI0XV0sIFsnSGFjZWsnLCBbNzExXV0sIFsnaGFpcnNwJywgWzgyMDJdXSwgWydoYWxmJywgWzE4OV1dLCBbJ2hhbWlsdCcsIFs4NDU5XV0sIFsnSEFSRGN5JywgWzEwNjZdXSwgWydoYXJkY3knLCBbMTA5OF1dLCBbJ2hhcnJjaXInLCBbMTA1NjhdXSwgWydoYXJyJywgWzg1OTZdXSwgWydoQXJyJywgWzg2NjBdXSwgWydoYXJydycsIFs4NjIxXV0sIFsnSGF0JywgWzk0XV0sIFsnaGJhcicsIFs4NDYzXV0sIFsnSGNpcmMnLCBbMjkyXV0sIFsnaGNpcmMnLCBbMjkzXV0sIFsnaGVhcnRzJywgWzk4MjldXSwgWydoZWFydHN1aXQnLCBbOTgyOV1dLCBbJ2hlbGxpcCcsIFs4MjMwXV0sIFsnaGVyY29uJywgWzg4ODldXSwgWydoZnInLCBbMTIwMTAxXV0sIFsnSGZyJywgWzg0NjBdXSwgWydIaWxiZXJ0U3BhY2UnLCBbODQ1OV1dLCBbJ2hrc2Vhcm93JywgWzEwNTMzXV0sIFsnaGtzd2Fyb3cnLCBbMTA1MzRdXSwgWydob2FycicsIFs4NzAzXV0sIFsnaG9tdGh0JywgWzg3NjNdXSwgWydob29rbGVmdGFycm93JywgWzg2MTddXSwgWydob29rcmlnaHRhcnJvdycsIFs4NjE4XV0sIFsnaG9wZicsIFsxMjAxNTNdXSwgWydIb3BmJywgWzg0NjFdXSwgWydob3JiYXInLCBbODIxM11dLCBbJ0hvcml6b250YWxMaW5lJywgWzk0NzJdXSwgWydoc2NyJywgWzExOTk5N11dLCBbJ0hzY3InLCBbODQ1OV1dLCBbJ2hzbGFzaCcsIFs4NDYzXV0sIFsnSHN0cm9rJywgWzI5NF1dLCBbJ2hzdHJvaycsIFsyOTVdXSwgWydIdW1wRG93bkh1bXAnLCBbODc4Ml1dLCBbJ0h1bXBFcXVhbCcsIFs4NzgzXV0sIFsnaHlidWxsJywgWzgyNTldXSwgWydoeXBoZW4nLCBbODIwOF1dLCBbJ0lhY3V0ZScsIFsyMDVdXSwgWydpYWN1dGUnLCBbMjM3XV0sIFsnaWMnLCBbODI5MV1dLCBbJ0ljaXJjJywgWzIwNl1dLCBbJ2ljaXJjJywgWzIzOF1dLCBbJ0ljeScsIFsxMDQ4XV0sIFsnaWN5JywgWzEwODBdXSwgWydJZG90JywgWzMwNF1dLCBbJ0lFY3knLCBbMTA0NV1dLCBbJ2llY3knLCBbMTA3N11dLCBbJ2lleGNsJywgWzE2MV1dLCBbJ2lmZicsIFs4NjYwXV0sIFsnaWZyJywgWzEyMDEwMl1dLCBbJ0lmcicsIFs4NDY1XV0sIFsnSWdyYXZlJywgWzIwNF1dLCBbJ2lncmF2ZScsIFsyMzZdXSwgWydpaScsIFs4NTIwXV0sIFsnaWlpaW50JywgWzEwNzY0XV0sIFsnaWlpbnQnLCBbODc0OV1dLCBbJ2lpbmZpbicsIFsxMDcxNl1dLCBbJ2lpb3RhJywgWzg0ODldXSwgWydJSmxpZycsIFszMDZdXSwgWydpamxpZycsIFszMDddXSwgWydJbWFjcicsIFsyOThdXSwgWydpbWFjcicsIFsyOTldXSwgWydpbWFnZScsIFs4NDY1XV0sIFsnSW1hZ2luYXJ5SScsIFs4NTIwXV0sIFsnaW1hZ2xpbmUnLCBbODQ2NF1dLCBbJ2ltYWdwYXJ0JywgWzg0NjVdXSwgWydpbWF0aCcsIFszMDVdXSwgWydJbScsIFs4NDY1XV0sIFsnaW1vZicsIFs4ODg3XV0sIFsnaW1wZWQnLCBbNDM3XV0sIFsnSW1wbGllcycsIFs4NjU4XV0sIFsnaW5jYXJlJywgWzg0NTNdXSwgWydpbicsIFs4NzEyXV0sIFsnaW5maW4nLCBbODczNF1dLCBbJ2luZmludGllJywgWzEwNzE3XV0sIFsnaW5vZG90JywgWzMwNV1dLCBbJ2ludGNhbCcsIFs4ODkwXV0sIFsnaW50JywgWzg3NDddXSwgWydJbnQnLCBbODc0OF1dLCBbJ2ludGVnZXJzJywgWzg0ODRdXSwgWydJbnRlZ3JhbCcsIFs4NzQ3XV0sIFsnaW50ZXJjYWwnLCBbODg5MF1dLCBbJ0ludGVyc2VjdGlvbicsIFs4ODk4XV0sIFsnaW50bGFyaGsnLCBbMTA3NzVdXSwgWydpbnRwcm9kJywgWzEwODEyXV0sIFsnSW52aXNpYmxlQ29tbWEnLCBbODI5MV1dLCBbJ0ludmlzaWJsZVRpbWVzJywgWzgyOTBdXSwgWydJT2N5JywgWzEwMjVdXSwgWydpb2N5JywgWzExMDVdXSwgWydJb2dvbicsIFszMDJdXSwgWydpb2dvbicsIFszMDNdXSwgWydJb3BmJywgWzEyMDEyOF1dLCBbJ2lvcGYnLCBbMTIwMTU0XV0sIFsnSW90YScsIFs5MjFdXSwgWydpb3RhJywgWzk1M11dLCBbJ2lwcm9kJywgWzEwODEyXV0sIFsnaXF1ZXN0JywgWzE5MV1dLCBbJ2lzY3InLCBbMTE5OTk4XV0sIFsnSXNjcicsIFs4NDY0XV0sIFsnaXNpbicsIFs4NzEyXV0sIFsnaXNpbmRvdCcsIFs4OTQ5XV0sIFsnaXNpbkUnLCBbODk1M11dLCBbJ2lzaW5zJywgWzg5NDhdXSwgWydpc2luc3YnLCBbODk0N11dLCBbJ2lzaW52JywgWzg3MTJdXSwgWydpdCcsIFs4MjkwXV0sIFsnSXRpbGRlJywgWzI5Nl1dLCBbJ2l0aWxkZScsIFsyOTddXSwgWydJdWtjeScsIFsxMDMwXV0sIFsnaXVrY3knLCBbMTExMF1dLCBbJ0l1bWwnLCBbMjA3XV0sIFsnaXVtbCcsIFsyMzldXSwgWydKY2lyYycsIFszMDhdXSwgWydqY2lyYycsIFszMDldXSwgWydKY3knLCBbMTA0OV1dLCBbJ2pjeScsIFsxMDgxXV0sIFsnSmZyJywgWzEyMDA3N11dLCBbJ2pmcicsIFsxMjAxMDNdXSwgWydqbWF0aCcsIFs1NjddXSwgWydKb3BmJywgWzEyMDEyOV1dLCBbJ2pvcGYnLCBbMTIwMTU1XV0sIFsnSnNjcicsIFsxMTk5NzNdXSwgWydqc2NyJywgWzExOTk5OV1dLCBbJ0pzZXJjeScsIFsxMDMyXV0sIFsnanNlcmN5JywgWzExMTJdXSwgWydKdWtjeScsIFsxMDI4XV0sIFsnanVrY3knLCBbMTEwOF1dLCBbJ0thcHBhJywgWzkyMl1dLCBbJ2thcHBhJywgWzk1NF1dLCBbJ2thcHBhdicsIFsxMDA4XV0sIFsnS2NlZGlsJywgWzMxMF1dLCBbJ2tjZWRpbCcsIFszMTFdXSwgWydLY3knLCBbMTA1MF1dLCBbJ2tjeScsIFsxMDgyXV0sIFsnS2ZyJywgWzEyMDA3OF1dLCBbJ2tmcicsIFsxMjAxMDRdXSwgWydrZ3JlZW4nLCBbMzEyXV0sIFsnS0hjeScsIFsxMDYxXV0sIFsna2hjeScsIFsxMDkzXV0sIFsnS0pjeScsIFsxMDM2XV0sIFsna2pjeScsIFsxMTE2XV0sIFsnS29wZicsIFsxMjAxMzBdXSwgWydrb3BmJywgWzEyMDE1Nl1dLCBbJ0tzY3InLCBbMTE5OTc0XV0sIFsna3NjcicsIFsxMjAwMDBdXSwgWydsQWFycicsIFs4NjY2XV0sIFsnTGFjdXRlJywgWzMxM11dLCBbJ2xhY3V0ZScsIFszMTRdXSwgWydsYWVtcHR5dicsIFsxMDY3Nl1dLCBbJ2xhZ3JhbicsIFs4NDY2XV0sIFsnTGFtYmRhJywgWzkyM11dLCBbJ2xhbWJkYScsIFs5NTVdXSwgWydsYW5nJywgWzEwMjE2XV0sIFsnTGFuZycsIFsxMDIxOF1dLCBbJ2xhbmdkJywgWzEwNjQxXV0sIFsnbGFuZ2xlJywgWzEwMjE2XV0sIFsnbGFwJywgWzEwODg1XV0sIFsnTGFwbGFjZXRyZicsIFs4NDY2XV0sIFsnbGFxdW8nLCBbMTcxXV0sIFsnbGFycmInLCBbODY3Nl1dLCBbJ2xhcnJiZnMnLCBbMTA1MjddXSwgWydsYXJyJywgWzg1OTJdXSwgWydMYXJyJywgWzg2MDZdXSwgWydsQXJyJywgWzg2NTZdXSwgWydsYXJyZnMnLCBbMTA1MjVdXSwgWydsYXJyaGsnLCBbODYxN11dLCBbJ2xhcnJscCcsIFs4NjE5XV0sIFsnbGFycnBsJywgWzEwNTUzXV0sIFsnbGFycnNpbScsIFsxMDYxMV1dLCBbJ2xhcnJ0bCcsIFs4NjEwXV0sIFsnbGF0YWlsJywgWzEwNTIxXV0sIFsnbEF0YWlsJywgWzEwNTIzXV0sIFsnbGF0JywgWzEwOTIzXV0sIFsnbGF0ZScsIFsxMDkyNV1dLCBbJ2xhdGVzJywgWzEwOTI1LCA2NTAyNF1dLCBbJ2xiYXJyJywgWzEwNTA4XV0sIFsnbEJhcnInLCBbMTA1MTBdXSwgWydsYmJyaycsIFsxMDA5OF1dLCBbJ2xicmFjZScsIFsxMjNdXSwgWydsYnJhY2snLCBbOTFdXSwgWydsYnJrZScsIFsxMDYzNV1dLCBbJ2xicmtzbGQnLCBbMTA2MzldXSwgWydsYnJrc2x1JywgWzEwNjM3XV0sIFsnTGNhcm9uJywgWzMxN11dLCBbJ2xjYXJvbicsIFszMThdXSwgWydMY2VkaWwnLCBbMzE1XV0sIFsnbGNlZGlsJywgWzMxNl1dLCBbJ2xjZWlsJywgWzg5NjhdXSwgWydsY3ViJywgWzEyM11dLCBbJ0xjeScsIFsxMDUxXV0sIFsnbGN5JywgWzEwODNdXSwgWydsZGNhJywgWzEwNTUwXV0sIFsnbGRxdW8nLCBbODIyMF1dLCBbJ2xkcXVvcicsIFs4MjIyXV0sIFsnbGRyZGhhcicsIFsxMDU5OV1dLCBbJ2xkcnVzaGFyJywgWzEwNTcxXV0sIFsnbGRzaCcsIFs4NjI2XV0sIFsnbGUnLCBbODgwNF1dLCBbJ2xFJywgWzg4MDZdXSwgWydMZWZ0QW5nbGVCcmFja2V0JywgWzEwMjE2XV0sIFsnTGVmdEFycm93QmFyJywgWzg2NzZdXSwgWydsZWZ0YXJyb3cnLCBbODU5Ml1dLCBbJ0xlZnRBcnJvdycsIFs4NTkyXV0sIFsnTGVmdGFycm93JywgWzg2NTZdXSwgWydMZWZ0QXJyb3dSaWdodEFycm93JywgWzg2NDZdXSwgWydsZWZ0YXJyb3d0YWlsJywgWzg2MTBdXSwgWydMZWZ0Q2VpbGluZycsIFs4OTY4XV0sIFsnTGVmdERvdWJsZUJyYWNrZXQnLCBbMTAyMTRdXSwgWydMZWZ0RG93blRlZVZlY3RvcicsIFsxMDU5M11dLCBbJ0xlZnREb3duVmVjdG9yQmFyJywgWzEwNTg1XV0sIFsnTGVmdERvd25WZWN0b3InLCBbODY0M11dLCBbJ0xlZnRGbG9vcicsIFs4OTcwXV0sIFsnbGVmdGhhcnBvb25kb3duJywgWzg2MzddXSwgWydsZWZ0aGFycG9vbnVwJywgWzg2MzZdXSwgWydsZWZ0bGVmdGFycm93cycsIFs4NjQ3XV0sIFsnbGVmdHJpZ2h0YXJyb3cnLCBbODU5Nl1dLCBbJ0xlZnRSaWdodEFycm93JywgWzg1OTZdXSwgWydMZWZ0cmlnaHRhcnJvdycsIFs4NjYwXV0sIFsnbGVmdHJpZ2h0YXJyb3dzJywgWzg2NDZdXSwgWydsZWZ0cmlnaHRoYXJwb29ucycsIFs4NjUxXV0sIFsnbGVmdHJpZ2h0c3F1aWdhcnJvdycsIFs4NjIxXV0sIFsnTGVmdFJpZ2h0VmVjdG9yJywgWzEwNTc0XV0sIFsnTGVmdFRlZUFycm93JywgWzg2MTJdXSwgWydMZWZ0VGVlJywgWzg4NjddXSwgWydMZWZ0VGVlVmVjdG9yJywgWzEwNTg2XV0sIFsnbGVmdHRocmVldGltZXMnLCBbODkwN11dLCBbJ0xlZnRUcmlhbmdsZUJhcicsIFsxMDcwM11dLCBbJ0xlZnRUcmlhbmdsZScsIFs4ODgyXV0sIFsnTGVmdFRyaWFuZ2xlRXF1YWwnLCBbODg4NF1dLCBbJ0xlZnRVcERvd25WZWN0b3InLCBbMTA1NzddXSwgWydMZWZ0VXBUZWVWZWN0b3InLCBbMTA1OTJdXSwgWydMZWZ0VXBWZWN0b3JCYXInLCBbMTA1ODRdXSwgWydMZWZ0VXBWZWN0b3InLCBbODYzOV1dLCBbJ0xlZnRWZWN0b3JCYXInLCBbMTA1NzhdXSwgWydMZWZ0VmVjdG9yJywgWzg2MzZdXSwgWydsRWcnLCBbMTA4OTFdXSwgWydsZWcnLCBbODkyMl1dLCBbJ2xlcScsIFs4ODA0XV0sIFsnbGVxcScsIFs4ODA2XV0sIFsnbGVxc2xhbnQnLCBbMTA4NzddXSwgWydsZXNjYycsIFsxMDkyMF1dLCBbJ2xlcycsIFsxMDg3N11dLCBbJ2xlc2RvdCcsIFsxMDg3OV1dLCBbJ2xlc2RvdG8nLCBbMTA4ODFdXSwgWydsZXNkb3RvcicsIFsxMDg4M11dLCBbJ2xlc2cnLCBbODkyMiwgNjUwMjRdXSwgWydsZXNnZXMnLCBbMTA4OTldXSwgWydsZXNzYXBwcm94JywgWzEwODg1XV0sIFsnbGVzc2RvdCcsIFs4OTE4XV0sIFsnbGVzc2VxZ3RyJywgWzg5MjJdXSwgWydsZXNzZXFxZ3RyJywgWzEwODkxXV0sIFsnTGVzc0VxdWFsR3JlYXRlcicsIFs4OTIyXV0sIFsnTGVzc0Z1bGxFcXVhbCcsIFs4ODA2XV0sIFsnTGVzc0dyZWF0ZXInLCBbODgyMl1dLCBbJ2xlc3NndHInLCBbODgyMl1dLCBbJ0xlc3NMZXNzJywgWzEwOTEzXV0sIFsnbGVzc3NpbScsIFs4ODE4XV0sIFsnTGVzc1NsYW50RXF1YWwnLCBbMTA4NzddXSwgWydMZXNzVGlsZGUnLCBbODgxOF1dLCBbJ2xmaXNodCcsIFsxMDYyMF1dLCBbJ2xmbG9vcicsIFs4OTcwXV0sIFsnTGZyJywgWzEyMDA3OV1dLCBbJ2xmcicsIFsxMjAxMDVdXSwgWydsZycsIFs4ODIyXV0sIFsnbGdFJywgWzEwODk3XV0sIFsnbEhhcicsIFsxMDU5NF1dLCBbJ2xoYXJkJywgWzg2MzddXSwgWydsaGFydScsIFs4NjM2XV0sIFsnbGhhcnVsJywgWzEwNjAyXV0sIFsnbGhibGsnLCBbOTYwNF1dLCBbJ0xKY3knLCBbMTAzM11dLCBbJ2xqY3knLCBbMTExM11dLCBbJ2xsYXJyJywgWzg2NDddXSwgWydsbCcsIFs4ODEwXV0sIFsnTGwnLCBbODkyMF1dLCBbJ2xsY29ybmVyJywgWzg5OTBdXSwgWydMbGVmdGFycm93JywgWzg2NjZdXSwgWydsbGhhcmQnLCBbMTA2MDNdXSwgWydsbHRyaScsIFs5NzIyXV0sIFsnTG1pZG90JywgWzMxOV1dLCBbJ2xtaWRvdCcsIFszMjBdXSwgWydsbW91c3RhY2hlJywgWzkxMzZdXSwgWydsbW91c3QnLCBbOTEzNl1dLCBbJ2xuYXAnLCBbMTA4ODldXSwgWydsbmFwcHJveCcsIFsxMDg4OV1dLCBbJ2xuZScsIFsxMDg4N11dLCBbJ2xuRScsIFs4ODA4XV0sIFsnbG5lcScsIFsxMDg4N11dLCBbJ2xuZXFxJywgWzg4MDhdXSwgWydsbnNpbScsIFs4OTM0XV0sIFsnbG9hbmcnLCBbMTAyMjBdXSwgWydsb2FycicsIFs4NzAxXV0sIFsnbG9icmsnLCBbMTAyMTRdXSwgWydsb25nbGVmdGFycm93JywgWzEwMjI5XV0sIFsnTG9uZ0xlZnRBcnJvdycsIFsxMDIyOV1dLCBbJ0xvbmdsZWZ0YXJyb3cnLCBbMTAyMzJdXSwgWydsb25nbGVmdHJpZ2h0YXJyb3cnLCBbMTAyMzFdXSwgWydMb25nTGVmdFJpZ2h0QXJyb3cnLCBbMTAyMzFdXSwgWydMb25nbGVmdHJpZ2h0YXJyb3cnLCBbMTAyMzRdXSwgWydsb25nbWFwc3RvJywgWzEwMjM2XV0sIFsnbG9uZ3JpZ2h0YXJyb3cnLCBbMTAyMzBdXSwgWydMb25nUmlnaHRBcnJvdycsIFsxMDIzMF1dLCBbJ0xvbmdyaWdodGFycm93JywgWzEwMjMzXV0sIFsnbG9vcGFycm93bGVmdCcsIFs4NjE5XV0sIFsnbG9vcGFycm93cmlnaHQnLCBbODYyMF1dLCBbJ2xvcGFyJywgWzEwNjI5XV0sIFsnTG9wZicsIFsxMjAxMzFdXSwgWydsb3BmJywgWzEyMDE1N11dLCBbJ2xvcGx1cycsIFsxMDc5N11dLCBbJ2xvdGltZXMnLCBbMTA4MDRdXSwgWydsb3dhc3QnLCBbODcyN11dLCBbJ2xvd2JhcicsIFs5NV1dLCBbJ0xvd2VyTGVmdEFycm93JywgWzg2MDFdXSwgWydMb3dlclJpZ2h0QXJyb3cnLCBbODYwMF1dLCBbJ2xveicsIFs5Njc0XV0sIFsnbG96ZW5nZScsIFs5Njc0XV0sIFsnbG96ZicsIFsxMDczMV1dLCBbJ2xwYXInLCBbNDBdXSwgWydscGFybHQnLCBbMTA2NDNdXSwgWydscmFycicsIFs4NjQ2XV0sIFsnbHJjb3JuZXInLCBbODk5MV1dLCBbJ2xyaGFyJywgWzg2NTFdXSwgWydscmhhcmQnLCBbMTA2MDVdXSwgWydscm0nLCBbODIwNl1dLCBbJ2xydHJpJywgWzg4OTVdXSwgWydsc2FxdW8nLCBbODI0OV1dLCBbJ2xzY3InLCBbMTIwMDAxXV0sIFsnTHNjcicsIFs4NDY2XV0sIFsnbHNoJywgWzg2MjRdXSwgWydMc2gnLCBbODYyNF1dLCBbJ2xzaW0nLCBbODgxOF1dLCBbJ2xzaW1lJywgWzEwODkzXV0sIFsnbHNpbWcnLCBbMTA4OTVdXSwgWydsc3FiJywgWzkxXV0sIFsnbHNxdW8nLCBbODIxNl1dLCBbJ2xzcXVvcicsIFs4MjE4XV0sIFsnTHN0cm9rJywgWzMyMV1dLCBbJ2xzdHJvaycsIFszMjJdXSwgWydsdGNjJywgWzEwOTE4XV0sIFsnbHRjaXInLCBbMTA4NzNdXSwgWydsdCcsIFs2MF1dLCBbJ0xUJywgWzYwXV0sIFsnTHQnLCBbODgxMF1dLCBbJ2x0ZG90JywgWzg5MThdXSwgWydsdGhyZWUnLCBbODkwN11dLCBbJ2x0aW1lcycsIFs4OTA1XV0sIFsnbHRsYXJyJywgWzEwNjE0XV0sIFsnbHRxdWVzdCcsIFsxMDg3NV1dLCBbJ2x0cmknLCBbOTY2N11dLCBbJ2x0cmllJywgWzg4ODRdXSwgWydsdHJpZicsIFs5NjY2XV0sIFsnbHRyUGFyJywgWzEwNjQ2XV0sIFsnbHVyZHNoYXInLCBbMTA1NzBdXSwgWydsdXJ1aGFyJywgWzEwNTk4XV0sIFsnbHZlcnRuZXFxJywgWzg4MDgsIDY1MDI0XV0sIFsnbHZuRScsIFs4ODA4LCA2NTAyNF1dLCBbJ21hY3InLCBbMTc1XV0sIFsnbWFsZScsIFs5Nzk0XV0sIFsnbWFsdCcsIFsxMDAxNl1dLCBbJ21hbHRlc2UnLCBbMTAwMTZdXSwgWydNYXAnLCBbMTA1MDFdXSwgWydtYXAnLCBbODYxNF1dLCBbJ21hcHN0bycsIFs4NjE0XV0sIFsnbWFwc3RvZG93bicsIFs4NjE1XV0sIFsnbWFwc3RvbGVmdCcsIFs4NjEyXV0sIFsnbWFwc3RvdXAnLCBbODYxM11dLCBbJ21hcmtlcicsIFs5NjQ2XV0sIFsnbWNvbW1hJywgWzEwNzkzXV0sIFsnTWN5JywgWzEwNTJdXSwgWydtY3knLCBbMTA4NF1dLCBbJ21kYXNoJywgWzgyMTJdXSwgWydtRERvdCcsIFs4NzYyXV0sIFsnbWVhc3VyZWRhbmdsZScsIFs4NzM3XV0sIFsnTWVkaXVtU3BhY2UnLCBbODI4N11dLCBbJ01lbGxpbnRyZicsIFs4NDk5XV0sIFsnTWZyJywgWzEyMDA4MF1dLCBbJ21mcicsIFsxMjAxMDZdXSwgWydtaG8nLCBbODQ4N11dLCBbJ21pY3JvJywgWzE4MV1dLCBbJ21pZGFzdCcsIFs0Ml1dLCBbJ21pZGNpcicsIFsxMDk5Ml1dLCBbJ21pZCcsIFs4NzM5XV0sIFsnbWlkZG90JywgWzE4M11dLCBbJ21pbnVzYicsIFs4ODYzXV0sIFsnbWludXMnLCBbODcyMl1dLCBbJ21pbnVzZCcsIFs4NzYwXV0sIFsnbWludXNkdScsIFsxMDc5NF1dLCBbJ01pbnVzUGx1cycsIFs4NzIzXV0sIFsnbWxjcCcsIFsxMDk3MV1dLCBbJ21sZHInLCBbODIzMF1dLCBbJ21ucGx1cycsIFs4NzIzXV0sIFsnbW9kZWxzJywgWzg4NzFdXSwgWydNb3BmJywgWzEyMDEzMl1dLCBbJ21vcGYnLCBbMTIwMTU4XV0sIFsnbXAnLCBbODcyM11dLCBbJ21zY3InLCBbMTIwMDAyXV0sIFsnTXNjcicsIFs4NDk5XV0sIFsnbXN0cG9zJywgWzg3NjZdXSwgWydNdScsIFs5MjRdXSwgWydtdScsIFs5NTZdXSwgWydtdWx0aW1hcCcsIFs4ODg4XV0sIFsnbXVtYXAnLCBbODg4OF1dLCBbJ25hYmxhJywgWzg3MTFdXSwgWydOYWN1dGUnLCBbMzIzXV0sIFsnbmFjdXRlJywgWzMyNF1dLCBbJ25hbmcnLCBbODczNiwgODQwMl1dLCBbJ25hcCcsIFs4Nzc3XV0sIFsnbmFwRScsIFsxMDg2NCwgODI0XV0sIFsnbmFwaWQnLCBbODc3OSwgODI0XV0sIFsnbmFwb3MnLCBbMzI5XV0sIFsnbmFwcHJveCcsIFs4Nzc3XV0sIFsnbmF0dXJhbCcsIFs5ODM4XV0sIFsnbmF0dXJhbHMnLCBbODQ2OV1dLCBbJ25hdHVyJywgWzk4MzhdXSwgWyduYnNwJywgWzE2MF1dLCBbJ25idW1wJywgWzg3ODIsIDgyNF1dLCBbJ25idW1wZScsIFs4NzgzLCA4MjRdXSwgWyduY2FwJywgWzEwODE5XV0sIFsnTmNhcm9uJywgWzMyN11dLCBbJ25jYXJvbicsIFszMjhdXSwgWydOY2VkaWwnLCBbMzI1XV0sIFsnbmNlZGlsJywgWzMyNl1dLCBbJ25jb25nJywgWzg3NzVdXSwgWyduY29uZ2RvdCcsIFsxMDg2MSwgODI0XV0sIFsnbmN1cCcsIFsxMDgxOF1dLCBbJ05jeScsIFsxMDUzXV0sIFsnbmN5JywgWzEwODVdXSwgWyduZGFzaCcsIFs4MjExXV0sIFsnbmVhcmhrJywgWzEwNTMyXV0sIFsnbmVhcnInLCBbODU5OV1dLCBbJ25lQXJyJywgWzg2NjNdXSwgWyduZWFycm93JywgWzg1OTldXSwgWyduZScsIFs4ODAwXV0sIFsnbmVkb3QnLCBbODc4NCwgODI0XV0sIFsnTmVnYXRpdmVNZWRpdW1TcGFjZScsIFs4MjAzXV0sIFsnTmVnYXRpdmVUaGlja1NwYWNlJywgWzgyMDNdXSwgWydOZWdhdGl2ZVRoaW5TcGFjZScsIFs4MjAzXV0sIFsnTmVnYXRpdmVWZXJ5VGhpblNwYWNlJywgWzgyMDNdXSwgWyduZXF1aXYnLCBbODgwMl1dLCBbJ25lc2VhcicsIFsxMDUzNl1dLCBbJ25lc2ltJywgWzg3NzAsIDgyNF1dLCBbJ05lc3RlZEdyZWF0ZXJHcmVhdGVyJywgWzg4MTFdXSwgWydOZXN0ZWRMZXNzTGVzcycsIFs4ODEwXV0sIFsnbmV4aXN0JywgWzg3MDhdXSwgWyduZXhpc3RzJywgWzg3MDhdXSwgWydOZnInLCBbMTIwMDgxXV0sIFsnbmZyJywgWzEyMDEwN11dLCBbJ25nRScsIFs4ODA3LCA4MjRdXSwgWyduZ2UnLCBbODgxN11dLCBbJ25nZXEnLCBbODgxN11dLCBbJ25nZXFxJywgWzg4MDcsIDgyNF1dLCBbJ25nZXFzbGFudCcsIFsxMDg3OCwgODI0XV0sIFsnbmdlcycsIFsxMDg3OCwgODI0XV0sIFsnbkdnJywgWzg5MjEsIDgyNF1dLCBbJ25nc2ltJywgWzg4MjFdXSwgWyduR3QnLCBbODgxMSwgODQwMl1dLCBbJ25ndCcsIFs4ODE1XV0sIFsnbmd0cicsIFs4ODE1XV0sIFsnbkd0dicsIFs4ODExLCA4MjRdXSwgWyduaGFycicsIFs4NjIyXV0sIFsnbmhBcnInLCBbODY1NF1dLCBbJ25ocGFyJywgWzEwOTk0XV0sIFsnbmknLCBbODcxNV1dLCBbJ25pcycsIFs4OTU2XV0sIFsnbmlzZCcsIFs4OTU0XV0sIFsnbml2JywgWzg3MTVdXSwgWydOSmN5JywgWzEwMzRdXSwgWyduamN5JywgWzExMTRdXSwgWydubGFycicsIFs4NjAyXV0sIFsnbmxBcnInLCBbODY1M11dLCBbJ25sZHInLCBbODIyOV1dLCBbJ25sRScsIFs4ODA2LCA4MjRdXSwgWydubGUnLCBbODgxNl1dLCBbJ25sZWZ0YXJyb3cnLCBbODYwMl1dLCBbJ25MZWZ0YXJyb3cnLCBbODY1M11dLCBbJ25sZWZ0cmlnaHRhcnJvdycsIFs4NjIyXV0sIFsnbkxlZnRyaWdodGFycm93JywgWzg2NTRdXSwgWydubGVxJywgWzg4MTZdXSwgWydubGVxcScsIFs4ODA2LCA4MjRdXSwgWydubGVxc2xhbnQnLCBbMTA4NzcsIDgyNF1dLCBbJ25sZXMnLCBbMTA4NzcsIDgyNF1dLCBbJ25sZXNzJywgWzg4MTRdXSwgWyduTGwnLCBbODkyMCwgODI0XV0sIFsnbmxzaW0nLCBbODgyMF1dLCBbJ25MdCcsIFs4ODEwLCA4NDAyXV0sIFsnbmx0JywgWzg4MTRdXSwgWydubHRyaScsIFs4OTM4XV0sIFsnbmx0cmllJywgWzg5NDBdXSwgWyduTHR2JywgWzg4MTAsIDgyNF1dLCBbJ25taWQnLCBbODc0MF1dLCBbJ05vQnJlYWsnLCBbODI4OF1dLCBbJ05vbkJyZWFraW5nU3BhY2UnLCBbMTYwXV0sIFsnbm9wZicsIFsxMjAxNTldXSwgWydOb3BmJywgWzg0NjldXSwgWydOb3QnLCBbMTA5ODhdXSwgWydub3QnLCBbMTcyXV0sIFsnTm90Q29uZ3J1ZW50JywgWzg4MDJdXSwgWydOb3RDdXBDYXAnLCBbODgxM11dLCBbJ05vdERvdWJsZVZlcnRpY2FsQmFyJywgWzg3NDJdXSwgWydOb3RFbGVtZW50JywgWzg3MTNdXSwgWydOb3RFcXVhbCcsIFs4ODAwXV0sIFsnTm90RXF1YWxUaWxkZScsIFs4NzcwLCA4MjRdXSwgWydOb3RFeGlzdHMnLCBbODcwOF1dLCBbJ05vdEdyZWF0ZXInLCBbODgxNV1dLCBbJ05vdEdyZWF0ZXJFcXVhbCcsIFs4ODE3XV0sIFsnTm90R3JlYXRlckZ1bGxFcXVhbCcsIFs4ODA3LCA4MjRdXSwgWydOb3RHcmVhdGVyR3JlYXRlcicsIFs4ODExLCA4MjRdXSwgWydOb3RHcmVhdGVyTGVzcycsIFs4ODI1XV0sIFsnTm90R3JlYXRlclNsYW50RXF1YWwnLCBbMTA4NzgsIDgyNF1dLCBbJ05vdEdyZWF0ZXJUaWxkZScsIFs4ODIxXV0sIFsnTm90SHVtcERvd25IdW1wJywgWzg3ODIsIDgyNF1dLCBbJ05vdEh1bXBFcXVhbCcsIFs4NzgzLCA4MjRdXSwgWydub3RpbicsIFs4NzEzXV0sIFsnbm90aW5kb3QnLCBbODk0OSwgODI0XV0sIFsnbm90aW5FJywgWzg5NTMsIDgyNF1dLCBbJ25vdGludmEnLCBbODcxM11dLCBbJ25vdGludmInLCBbODk1MV1dLCBbJ25vdGludmMnLCBbODk1MF1dLCBbJ05vdExlZnRUcmlhbmdsZUJhcicsIFsxMDcwMywgODI0XV0sIFsnTm90TGVmdFRyaWFuZ2xlJywgWzg5MzhdXSwgWydOb3RMZWZ0VHJpYW5nbGVFcXVhbCcsIFs4OTQwXV0sIFsnTm90TGVzcycsIFs4ODE0XV0sIFsnTm90TGVzc0VxdWFsJywgWzg4MTZdXSwgWydOb3RMZXNzR3JlYXRlcicsIFs4ODI0XV0sIFsnTm90TGVzc0xlc3MnLCBbODgxMCwgODI0XV0sIFsnTm90TGVzc1NsYW50RXF1YWwnLCBbMTA4NzcsIDgyNF1dLCBbJ05vdExlc3NUaWxkZScsIFs4ODIwXV0sIFsnTm90TmVzdGVkR3JlYXRlckdyZWF0ZXInLCBbMTA5MTQsIDgyNF1dLCBbJ05vdE5lc3RlZExlc3NMZXNzJywgWzEwOTEzLCA4MjRdXSwgWydub3RuaScsIFs4NzE2XV0sIFsnbm90bml2YScsIFs4NzE2XV0sIFsnbm90bml2YicsIFs4OTU4XV0sIFsnbm90bml2YycsIFs4OTU3XV0sIFsnTm90UHJlY2VkZXMnLCBbODgzMl1dLCBbJ05vdFByZWNlZGVzRXF1YWwnLCBbMTA5MjcsIDgyNF1dLCBbJ05vdFByZWNlZGVzU2xhbnRFcXVhbCcsIFs4OTI4XV0sIFsnTm90UmV2ZXJzZUVsZW1lbnQnLCBbODcxNl1dLCBbJ05vdFJpZ2h0VHJpYW5nbGVCYXInLCBbMTA3MDQsIDgyNF1dLCBbJ05vdFJpZ2h0VHJpYW5nbGUnLCBbODkzOV1dLCBbJ05vdFJpZ2h0VHJpYW5nbGVFcXVhbCcsIFs4OTQxXV0sIFsnTm90U3F1YXJlU3Vic2V0JywgWzg4NDcsIDgyNF1dLCBbJ05vdFNxdWFyZVN1YnNldEVxdWFsJywgWzg5MzBdXSwgWydOb3RTcXVhcmVTdXBlcnNldCcsIFs4ODQ4LCA4MjRdXSwgWydOb3RTcXVhcmVTdXBlcnNldEVxdWFsJywgWzg5MzFdXSwgWydOb3RTdWJzZXQnLCBbODgzNCwgODQwMl1dLCBbJ05vdFN1YnNldEVxdWFsJywgWzg4NDBdXSwgWydOb3RTdWNjZWVkcycsIFs4ODMzXV0sIFsnTm90U3VjY2VlZHNFcXVhbCcsIFsxMDkyOCwgODI0XV0sIFsnTm90U3VjY2VlZHNTbGFudEVxdWFsJywgWzg5MjldXSwgWydOb3RTdWNjZWVkc1RpbGRlJywgWzg4MzEsIDgyNF1dLCBbJ05vdFN1cGVyc2V0JywgWzg4MzUsIDg0MDJdXSwgWydOb3RTdXBlcnNldEVxdWFsJywgWzg4NDFdXSwgWydOb3RUaWxkZScsIFs4NzY5XV0sIFsnTm90VGlsZGVFcXVhbCcsIFs4NzcyXV0sIFsnTm90VGlsZGVGdWxsRXF1YWwnLCBbODc3NV1dLCBbJ05vdFRpbGRlVGlsZGUnLCBbODc3N11dLCBbJ05vdFZlcnRpY2FsQmFyJywgWzg3NDBdXSwgWyducGFyYWxsZWwnLCBbODc0Ml1dLCBbJ25wYXInLCBbODc0Ml1dLCBbJ25wYXJzbCcsIFsxMTAwNSwgODQyMV1dLCBbJ25wYXJ0JywgWzg3MDYsIDgyNF1dLCBbJ25wb2xpbnQnLCBbMTA3NzJdXSwgWyducHInLCBbODgzMl1dLCBbJ25wcmN1ZScsIFs4OTI4XV0sIFsnbnByZWMnLCBbODgzMl1dLCBbJ25wcmVjZXEnLCBbMTA5MjcsIDgyNF1dLCBbJ25wcmUnLCBbMTA5MjcsIDgyNF1dLCBbJ25yYXJyYycsIFsxMDU0NywgODI0XV0sIFsnbnJhcnInLCBbODYwM11dLCBbJ25yQXJyJywgWzg2NTVdXSwgWyducmFycncnLCBbODYwNSwgODI0XV0sIFsnbnJpZ2h0YXJyb3cnLCBbODYwM11dLCBbJ25SaWdodGFycm93JywgWzg2NTVdXSwgWyducnRyaScsIFs4OTM5XV0sIFsnbnJ0cmllJywgWzg5NDFdXSwgWyduc2MnLCBbODgzM11dLCBbJ25zY2N1ZScsIFs4OTI5XV0sIFsnbnNjZScsIFsxMDkyOCwgODI0XV0sIFsnTnNjcicsIFsxMTk5NzddXSwgWyduc2NyJywgWzEyMDAwM11dLCBbJ25zaG9ydG1pZCcsIFs4NzQwXV0sIFsnbnNob3J0cGFyYWxsZWwnLCBbODc0Ml1dLCBbJ25zaW0nLCBbODc2OV1dLCBbJ25zaW1lJywgWzg3NzJdXSwgWyduc2ltZXEnLCBbODc3Ml1dLCBbJ25zbWlkJywgWzg3NDBdXSwgWyduc3BhcicsIFs4NzQyXV0sIFsnbnNxc3ViZScsIFs4OTMwXV0sIFsnbnNxc3VwZScsIFs4OTMxXV0sIFsnbnN1YicsIFs4ODM2XV0sIFsnbnN1YkUnLCBbMTA5NDksIDgyNF1dLCBbJ25zdWJlJywgWzg4NDBdXSwgWyduc3Vic2V0JywgWzg4MzQsIDg0MDJdXSwgWyduc3Vic2V0ZXEnLCBbODg0MF1dLCBbJ25zdWJzZXRlcXEnLCBbMTA5NDksIDgyNF1dLCBbJ25zdWNjJywgWzg4MzNdXSwgWyduc3VjY2VxJywgWzEwOTI4LCA4MjRdXSwgWyduc3VwJywgWzg4MzddXSwgWyduc3VwRScsIFsxMDk1MCwgODI0XV0sIFsnbnN1cGUnLCBbODg0MV1dLCBbJ25zdXBzZXQnLCBbODgzNSwgODQwMl1dLCBbJ25zdXBzZXRlcScsIFs4ODQxXV0sIFsnbnN1cHNldGVxcScsIFsxMDk1MCwgODI0XV0sIFsnbnRnbCcsIFs4ODI1XV0sIFsnTnRpbGRlJywgWzIwOV1dLCBbJ250aWxkZScsIFsyNDFdXSwgWydudGxnJywgWzg4MjRdXSwgWydudHJpYW5nbGVsZWZ0JywgWzg5MzhdXSwgWydudHJpYW5nbGVsZWZ0ZXEnLCBbODk0MF1dLCBbJ250cmlhbmdsZXJpZ2h0JywgWzg5MzldXSwgWydudHJpYW5nbGVyaWdodGVxJywgWzg5NDFdXSwgWydOdScsIFs5MjVdXSwgWydudScsIFs5NTddXSwgWydudW0nLCBbMzVdXSwgWydudW1lcm8nLCBbODQ3MF1dLCBbJ251bXNwJywgWzgxOTldXSwgWydudmFwJywgWzg3ODEsIDg0MDJdXSwgWydudmRhc2gnLCBbODg3Nl1dLCBbJ252RGFzaCcsIFs4ODc3XV0sIFsnblZkYXNoJywgWzg4NzhdXSwgWyduVkRhc2gnLCBbODg3OV1dLCBbJ252Z2UnLCBbODgwNSwgODQwMl1dLCBbJ252Z3QnLCBbNjIsIDg0MDJdXSwgWydudkhhcnInLCBbMTA1MDBdXSwgWydudmluZmluJywgWzEwNzE4XV0sIFsnbnZsQXJyJywgWzEwNDk4XV0sIFsnbnZsZScsIFs4ODA0LCA4NDAyXV0sIFsnbnZsdCcsIFs2MCwgODQwMl1dLCBbJ252bHRyaWUnLCBbODg4NCwgODQwMl1dLCBbJ252ckFycicsIFsxMDQ5OV1dLCBbJ252cnRyaWUnLCBbODg4NSwgODQwMl1dLCBbJ252c2ltJywgWzg3NjQsIDg0MDJdXSwgWydud2FyaGsnLCBbMTA1MzFdXSwgWydud2FycicsIFs4NTk4XV0sIFsnbndBcnInLCBbODY2Ml1dLCBbJ253YXJyb3cnLCBbODU5OF1dLCBbJ253bmVhcicsIFsxMDUzNV1dLCBbJ09hY3V0ZScsIFsyMTFdXSwgWydvYWN1dGUnLCBbMjQzXV0sIFsnb2FzdCcsIFs4ODU5XV0sIFsnT2NpcmMnLCBbMjEyXV0sIFsnb2NpcmMnLCBbMjQ0XV0sIFsnb2NpcicsIFs4ODU4XV0sIFsnT2N5JywgWzEwNTRdXSwgWydvY3knLCBbMTA4Nl1dLCBbJ29kYXNoJywgWzg4NjFdXSwgWydPZGJsYWMnLCBbMzM2XV0sIFsnb2RibGFjJywgWzMzN11dLCBbJ29kaXYnLCBbMTA4MDhdXSwgWydvZG90JywgWzg4NTddXSwgWydvZHNvbGQnLCBbMTA2ODRdXSwgWydPRWxpZycsIFszMzhdXSwgWydvZWxpZycsIFszMzldXSwgWydvZmNpcicsIFsxMDY4N11dLCBbJ09mcicsIFsxMjAwODJdXSwgWydvZnInLCBbMTIwMTA4XV0sIFsnb2dvbicsIFs3MzFdXSwgWydPZ3JhdmUnLCBbMjEwXV0sIFsnb2dyYXZlJywgWzI0Ml1dLCBbJ29ndCcsIFsxMDY4OV1dLCBbJ29oYmFyJywgWzEwNjc3XV0sIFsnb2htJywgWzkzN11dLCBbJ29pbnQnLCBbODc1MF1dLCBbJ29sYXJyJywgWzg2MzRdXSwgWydvbGNpcicsIFsxMDY4Nl1dLCBbJ29sY3Jvc3MnLCBbMTA2ODNdXSwgWydvbGluZScsIFs4MjU0XV0sIFsnb2x0JywgWzEwNjg4XV0sIFsnT21hY3InLCBbMzMyXV0sIFsnb21hY3InLCBbMzMzXV0sIFsnT21lZ2EnLCBbOTM3XV0sIFsnb21lZ2EnLCBbOTY5XV0sIFsnT21pY3JvbicsIFs5MjddXSwgWydvbWljcm9uJywgWzk1OV1dLCBbJ29taWQnLCBbMTA2NzhdXSwgWydvbWludXMnLCBbODg1NF1dLCBbJ09vcGYnLCBbMTIwMTM0XV0sIFsnb29wZicsIFsxMjAxNjBdXSwgWydvcGFyJywgWzEwNjc5XV0sIFsnT3BlbkN1cmx5RG91YmxlUXVvdGUnLCBbODIyMF1dLCBbJ09wZW5DdXJseVF1b3RlJywgWzgyMTZdXSwgWydvcGVycCcsIFsxMDY4MV1dLCBbJ29wbHVzJywgWzg4NTNdXSwgWydvcmFycicsIFs4NjM1XV0sIFsnT3InLCBbMTA4MzZdXSwgWydvcicsIFs4NzQ0XV0sIFsnb3JkJywgWzEwODQ1XV0sIFsnb3JkZXInLCBbODUwMF1dLCBbJ29yZGVyb2YnLCBbODUwMF1dLCBbJ29yZGYnLCBbMTcwXV0sIFsnb3JkbScsIFsxODZdXSwgWydvcmlnb2YnLCBbODg4Nl1dLCBbJ29yb3InLCBbMTA4MzhdXSwgWydvcnNsb3BlJywgWzEwODM5XV0sIFsnb3J2JywgWzEwODQzXV0sIFsnb1MnLCBbOTQxNl1dLCBbJ09zY3InLCBbMTE5OTc4XV0sIFsnb3NjcicsIFs4NTAwXV0sIFsnT3NsYXNoJywgWzIxNl1dLCBbJ29zbGFzaCcsIFsyNDhdXSwgWydvc29sJywgWzg4NTZdXSwgWydPdGlsZGUnLCBbMjEzXV0sIFsnb3RpbGRlJywgWzI0NV1dLCBbJ290aW1lc2FzJywgWzEwODA2XV0sIFsnT3RpbWVzJywgWzEwODA3XV0sIFsnb3RpbWVzJywgWzg4NTVdXSwgWydPdW1sJywgWzIxNF1dLCBbJ291bWwnLCBbMjQ2XV0sIFsnb3ZiYXInLCBbOTAyMV1dLCBbJ092ZXJCYXInLCBbODI1NF1dLCBbJ092ZXJCcmFjZScsIFs5MTgyXV0sIFsnT3ZlckJyYWNrZXQnLCBbOTE0MF1dLCBbJ092ZXJQYXJlbnRoZXNpcycsIFs5MTgwXV0sIFsncGFyYScsIFsxODJdXSwgWydwYXJhbGxlbCcsIFs4NzQxXV0sIFsncGFyJywgWzg3NDFdXSwgWydwYXJzaW0nLCBbMTA5OTVdXSwgWydwYXJzbCcsIFsxMTAwNV1dLCBbJ3BhcnQnLCBbODcwNl1dLCBbJ1BhcnRpYWxEJywgWzg3MDZdXSwgWydQY3knLCBbMTA1NV1dLCBbJ3BjeScsIFsxMDg3XV0sIFsncGVyY250JywgWzM3XV0sIFsncGVyaW9kJywgWzQ2XV0sIFsncGVybWlsJywgWzgyNDBdXSwgWydwZXJwJywgWzg4NjldXSwgWydwZXJ0ZW5rJywgWzgyNDFdXSwgWydQZnInLCBbMTIwMDgzXV0sIFsncGZyJywgWzEyMDEwOV1dLCBbJ1BoaScsIFs5MzRdXSwgWydwaGknLCBbOTY2XV0sIFsncGhpdicsIFs5ODFdXSwgWydwaG1tYXQnLCBbODQ5OV1dLCBbJ3Bob25lJywgWzk3NDJdXSwgWydQaScsIFs5MjhdXSwgWydwaScsIFs5NjBdXSwgWydwaXRjaGZvcmsnLCBbODkxNl1dLCBbJ3BpdicsIFs5ODJdXSwgWydwbGFuY2snLCBbODQ2M11dLCBbJ3BsYW5ja2gnLCBbODQ2Ml1dLCBbJ3BsYW5rdicsIFs4NDYzXV0sIFsncGx1c2FjaXInLCBbMTA3ODddXSwgWydwbHVzYicsIFs4ODYyXV0sIFsncGx1c2NpcicsIFsxMDc4Nl1dLCBbJ3BsdXMnLCBbNDNdXSwgWydwbHVzZG8nLCBbODcyNF1dLCBbJ3BsdXNkdScsIFsxMDc4OV1dLCBbJ3BsdXNlJywgWzEwODY2XV0sIFsnUGx1c01pbnVzJywgWzE3N11dLCBbJ3BsdXNtbicsIFsxNzddXSwgWydwbHVzc2ltJywgWzEwNzkwXV0sIFsncGx1c3R3bycsIFsxMDc5MV1dLCBbJ3BtJywgWzE3N11dLCBbJ1BvaW5jYXJlcGxhbmUnLCBbODQ2MF1dLCBbJ3BvaW50aW50JywgWzEwNzczXV0sIFsncG9wZicsIFsxMjAxNjFdXSwgWydQb3BmJywgWzg0NzNdXSwgWydwb3VuZCcsIFsxNjNdXSwgWydwcmFwJywgWzEwOTM1XV0sIFsnUHInLCBbMTA5MzldXSwgWydwcicsIFs4ODI2XV0sIFsncHJjdWUnLCBbODgyOF1dLCBbJ3ByZWNhcHByb3gnLCBbMTA5MzVdXSwgWydwcmVjJywgWzg4MjZdXSwgWydwcmVjY3VybHllcScsIFs4ODI4XV0sIFsnUHJlY2VkZXMnLCBbODgyNl1dLCBbJ1ByZWNlZGVzRXF1YWwnLCBbMTA5MjddXSwgWydQcmVjZWRlc1NsYW50RXF1YWwnLCBbODgyOF1dLCBbJ1ByZWNlZGVzVGlsZGUnLCBbODgzMF1dLCBbJ3ByZWNlcScsIFsxMDkyN11dLCBbJ3ByZWNuYXBwcm94JywgWzEwOTM3XV0sIFsncHJlY25lcXEnLCBbMTA5MzNdXSwgWydwcmVjbnNpbScsIFs4OTM2XV0sIFsncHJlJywgWzEwOTI3XV0sIFsncHJFJywgWzEwOTMxXV0sIFsncHJlY3NpbScsIFs4ODMwXV0sIFsncHJpbWUnLCBbODI0Ml1dLCBbJ1ByaW1lJywgWzgyNDNdXSwgWydwcmltZXMnLCBbODQ3M11dLCBbJ3BybmFwJywgWzEwOTM3XV0sIFsncHJuRScsIFsxMDkzM11dLCBbJ3BybnNpbScsIFs4OTM2XV0sIFsncHJvZCcsIFs4NzE5XV0sIFsnUHJvZHVjdCcsIFs4NzE5XV0sIFsncHJvZmFsYXInLCBbOTAwNl1dLCBbJ3Byb2ZsaW5lJywgWzg5NzhdXSwgWydwcm9mc3VyZicsIFs4OTc5XV0sIFsncHJvcCcsIFs4NzMzXV0sIFsnUHJvcG9ydGlvbmFsJywgWzg3MzNdXSwgWydQcm9wb3J0aW9uJywgWzg3NTldXSwgWydwcm9wdG8nLCBbODczM11dLCBbJ3Byc2ltJywgWzg4MzBdXSwgWydwcnVyZWwnLCBbODg4MF1dLCBbJ1BzY3InLCBbMTE5OTc5XV0sIFsncHNjcicsIFsxMjAwMDVdXSwgWydQc2knLCBbOTM2XV0sIFsncHNpJywgWzk2OF1dLCBbJ3B1bmNzcCcsIFs4MjAwXV0sIFsnUWZyJywgWzEyMDA4NF1dLCBbJ3FmcicsIFsxMjAxMTBdXSwgWydxaW50JywgWzEwNzY0XV0sIFsncW9wZicsIFsxMjAxNjJdXSwgWydRb3BmJywgWzg0NzRdXSwgWydxcHJpbWUnLCBbODI3OV1dLCBbJ1FzY3InLCBbMTE5OTgwXV0sIFsncXNjcicsIFsxMjAwMDZdXSwgWydxdWF0ZXJuaW9ucycsIFs4NDYxXV0sIFsncXVhdGludCcsIFsxMDc3NF1dLCBbJ3F1ZXN0JywgWzYzXV0sIFsncXVlc3RlcScsIFs4Nzk5XV0sIFsncXVvdCcsIFszNF1dLCBbJ1FVT1QnLCBbMzRdXSwgWydyQWFycicsIFs4NjY3XV0sIFsncmFjZScsIFs4NzY1LCA4MTddXSwgWydSYWN1dGUnLCBbMzQwXV0sIFsncmFjdXRlJywgWzM0MV1dLCBbJ3JhZGljJywgWzg3MzBdXSwgWydyYWVtcHR5dicsIFsxMDY3NV1dLCBbJ3JhbmcnLCBbMTAyMTddXSwgWydSYW5nJywgWzEwMjE5XV0sIFsncmFuZ2QnLCBbMTA2NDJdXSwgWydyYW5nZScsIFsxMDY2MV1dLCBbJ3JhbmdsZScsIFsxMDIxN11dLCBbJ3JhcXVvJywgWzE4N11dLCBbJ3JhcnJhcCcsIFsxMDYxM11dLCBbJ3JhcnJiJywgWzg2NzddXSwgWydyYXJyYmZzJywgWzEwNTI4XV0sIFsncmFycmMnLCBbMTA1NDddXSwgWydyYXJyJywgWzg1OTRdXSwgWydSYXJyJywgWzg2MDhdXSwgWydyQXJyJywgWzg2NThdXSwgWydyYXJyZnMnLCBbMTA1MjZdXSwgWydyYXJyaGsnLCBbODYxOF1dLCBbJ3JhcnJscCcsIFs4NjIwXV0sIFsncmFycnBsJywgWzEwNTY1XV0sIFsncmFycnNpbScsIFsxMDYxMl1dLCBbJ1JhcnJ0bCcsIFsxMDUxOF1dLCBbJ3JhcnJ0bCcsIFs4NjExXV0sIFsncmFycncnLCBbODYwNV1dLCBbJ3JhdGFpbCcsIFsxMDUyMl1dLCBbJ3JBdGFpbCcsIFsxMDUyNF1dLCBbJ3JhdGlvJywgWzg3NThdXSwgWydyYXRpb25hbHMnLCBbODQ3NF1dLCBbJ3JiYXJyJywgWzEwNTA5XV0sIFsnckJhcnInLCBbMTA1MTFdXSwgWydSQmFycicsIFsxMDUxMl1dLCBbJ3JiYnJrJywgWzEwMDk5XV0sIFsncmJyYWNlJywgWzEyNV1dLCBbJ3JicmFjaycsIFs5M11dLCBbJ3JicmtlJywgWzEwNjM2XV0sIFsncmJya3NsZCcsIFsxMDYzOF1dLCBbJ3JicmtzbHUnLCBbMTA2NDBdXSwgWydSY2Fyb24nLCBbMzQ0XV0sIFsncmNhcm9uJywgWzM0NV1dLCBbJ1JjZWRpbCcsIFszNDJdXSwgWydyY2VkaWwnLCBbMzQzXV0sIFsncmNlaWwnLCBbODk2OV1dLCBbJ3JjdWInLCBbMTI1XV0sIFsnUmN5JywgWzEwNTZdXSwgWydyY3knLCBbMTA4OF1dLCBbJ3JkY2EnLCBbMTA1NTFdXSwgWydyZGxkaGFyJywgWzEwNjAxXV0sIFsncmRxdW8nLCBbODIyMV1dLCBbJ3JkcXVvcicsIFs4MjIxXV0sIFsnQ2xvc2VDdXJseURvdWJsZVF1b3RlJywgWzgyMjFdXSwgWydyZHNoJywgWzg2MjddXSwgWydyZWFsJywgWzg0NzZdXSwgWydyZWFsaW5lJywgWzg0NzVdXSwgWydyZWFscGFydCcsIFs4NDc2XV0sIFsncmVhbHMnLCBbODQ3N11dLCBbJ1JlJywgWzg0NzZdXSwgWydyZWN0JywgWzk2NDVdXSwgWydyZWcnLCBbMTc0XV0sIFsnUkVHJywgWzE3NF1dLCBbJ1JldmVyc2VFbGVtZW50JywgWzg3MTVdXSwgWydSZXZlcnNlRXF1aWxpYnJpdW0nLCBbODY1MV1dLCBbJ1JldmVyc2VVcEVxdWlsaWJyaXVtJywgWzEwNjA3XV0sIFsncmZpc2h0JywgWzEwNjIxXV0sIFsncmZsb29yJywgWzg5NzFdXSwgWydyZnInLCBbMTIwMTExXV0sIFsnUmZyJywgWzg0NzZdXSwgWydySGFyJywgWzEwNTk2XV0sIFsncmhhcmQnLCBbODY0MV1dLCBbJ3JoYXJ1JywgWzg2NDBdXSwgWydyaGFydWwnLCBbMTA2MDRdXSwgWydSaG8nLCBbOTI5XV0sIFsncmhvJywgWzk2MV1dLCBbJ3Job3YnLCBbMTAwOV1dLCBbJ1JpZ2h0QW5nbGVCcmFja2V0JywgWzEwMjE3XV0sIFsnUmlnaHRBcnJvd0JhcicsIFs4Njc3XV0sIFsncmlnaHRhcnJvdycsIFs4NTk0XV0sIFsnUmlnaHRBcnJvdycsIFs4NTk0XV0sIFsnUmlnaHRhcnJvdycsIFs4NjU4XV0sIFsnUmlnaHRBcnJvd0xlZnRBcnJvdycsIFs4NjQ0XV0sIFsncmlnaHRhcnJvd3RhaWwnLCBbODYxMV1dLCBbJ1JpZ2h0Q2VpbGluZycsIFs4OTY5XV0sIFsnUmlnaHREb3VibGVCcmFja2V0JywgWzEwMjE1XV0sIFsnUmlnaHREb3duVGVlVmVjdG9yJywgWzEwNTg5XV0sIFsnUmlnaHREb3duVmVjdG9yQmFyJywgWzEwNTgxXV0sIFsnUmlnaHREb3duVmVjdG9yJywgWzg2NDJdXSwgWydSaWdodEZsb29yJywgWzg5NzFdXSwgWydyaWdodGhhcnBvb25kb3duJywgWzg2NDFdXSwgWydyaWdodGhhcnBvb251cCcsIFs4NjQwXV0sIFsncmlnaHRsZWZ0YXJyb3dzJywgWzg2NDRdXSwgWydyaWdodGxlZnRoYXJwb29ucycsIFs4NjUyXV0sIFsncmlnaHRyaWdodGFycm93cycsIFs4NjQ5XV0sIFsncmlnaHRzcXVpZ2Fycm93JywgWzg2MDVdXSwgWydSaWdodFRlZUFycm93JywgWzg2MTRdXSwgWydSaWdodFRlZScsIFs4ODY2XV0sIFsnUmlnaHRUZWVWZWN0b3InLCBbMTA1ODddXSwgWydyaWdodHRocmVldGltZXMnLCBbODkwOF1dLCBbJ1JpZ2h0VHJpYW5nbGVCYXInLCBbMTA3MDRdXSwgWydSaWdodFRyaWFuZ2xlJywgWzg4ODNdXSwgWydSaWdodFRyaWFuZ2xlRXF1YWwnLCBbODg4NV1dLCBbJ1JpZ2h0VXBEb3duVmVjdG9yJywgWzEwNTc1XV0sIFsnUmlnaHRVcFRlZVZlY3RvcicsIFsxMDU4OF1dLCBbJ1JpZ2h0VXBWZWN0b3JCYXInLCBbMTA1ODBdXSwgWydSaWdodFVwVmVjdG9yJywgWzg2MzhdXSwgWydSaWdodFZlY3RvckJhcicsIFsxMDU3OV1dLCBbJ1JpZ2h0VmVjdG9yJywgWzg2NDBdXSwgWydyaW5nJywgWzczMF1dLCBbJ3Jpc2luZ2RvdHNlcScsIFs4Nzg3XV0sIFsncmxhcnInLCBbODY0NF1dLCBbJ3JsaGFyJywgWzg2NTJdXSwgWydybG0nLCBbODIwN11dLCBbJ3Jtb3VzdGFjaGUnLCBbOTEzN11dLCBbJ3Jtb3VzdCcsIFs5MTM3XV0sIFsncm5taWQnLCBbMTA5OTBdXSwgWydyb2FuZycsIFsxMDIyMV1dLCBbJ3JvYXJyJywgWzg3MDJdXSwgWydyb2JyaycsIFsxMDIxNV1dLCBbJ3JvcGFyJywgWzEwNjMwXV0sIFsncm9wZicsIFsxMjAxNjNdXSwgWydSb3BmJywgWzg0NzddXSwgWydyb3BsdXMnLCBbMTA3OThdXSwgWydyb3RpbWVzJywgWzEwODA1XV0sIFsnUm91bmRJbXBsaWVzJywgWzEwNjA4XV0sIFsncnBhcicsIFs0MV1dLCBbJ3JwYXJndCcsIFsxMDY0NF1dLCBbJ3JwcG9saW50JywgWzEwNzcwXV0sIFsncnJhcnInLCBbODY0OV1dLCBbJ1JyaWdodGFycm93JywgWzg2NjddXSwgWydyc2FxdW8nLCBbODI1MF1dLCBbJ3JzY3InLCBbMTIwMDA3XV0sIFsnUnNjcicsIFs4NDc1XV0sIFsncnNoJywgWzg2MjVdXSwgWydSc2gnLCBbODYyNV1dLCBbJ3JzcWInLCBbOTNdXSwgWydyc3F1bycsIFs4MjE3XV0sIFsncnNxdW9yJywgWzgyMTddXSwgWydDbG9zZUN1cmx5UXVvdGUnLCBbODIxN11dLCBbJ3J0aHJlZScsIFs4OTA4XV0sIFsncnRpbWVzJywgWzg5MDZdXSwgWydydHJpJywgWzk2NTddXSwgWydydHJpZScsIFs4ODg1XV0sIFsncnRyaWYnLCBbOTY1Nl1dLCBbJ3J0cmlsdHJpJywgWzEwNzAyXV0sIFsnUnVsZURlbGF5ZWQnLCBbMTA3NDBdXSwgWydydWx1aGFyJywgWzEwNjAwXV0sIFsncngnLCBbODQ3OF1dLCBbJ1NhY3V0ZScsIFszNDZdXSwgWydzYWN1dGUnLCBbMzQ3XV0sIFsnc2JxdW8nLCBbODIxOF1dLCBbJ3NjYXAnLCBbMTA5MzZdXSwgWydTY2Fyb24nLCBbMzUyXV0sIFsnc2Nhcm9uJywgWzM1M11dLCBbJ1NjJywgWzEwOTQwXV0sIFsnc2MnLCBbODgyN11dLCBbJ3NjY3VlJywgWzg4MjldXSwgWydzY2UnLCBbMTA5MjhdXSwgWydzY0UnLCBbMTA5MzJdXSwgWydTY2VkaWwnLCBbMzUwXV0sIFsnc2NlZGlsJywgWzM1MV1dLCBbJ1NjaXJjJywgWzM0OF1dLCBbJ3NjaXJjJywgWzM0OV1dLCBbJ3NjbmFwJywgWzEwOTM4XV0sIFsnc2NuRScsIFsxMDkzNF1dLCBbJ3NjbnNpbScsIFs4OTM3XV0sIFsnc2Nwb2xpbnQnLCBbMTA3NzFdXSwgWydzY3NpbScsIFs4ODMxXV0sIFsnU2N5JywgWzEwNTddXSwgWydzY3knLCBbMTA4OV1dLCBbJ3Nkb3RiJywgWzg4NjVdXSwgWydzZG90JywgWzg5MDFdXSwgWydzZG90ZScsIFsxMDg1NF1dLCBbJ3NlYXJoaycsIFsxMDUzM11dLCBbJ3NlYXJyJywgWzg2MDBdXSwgWydzZUFycicsIFs4NjY0XV0sIFsnc2VhcnJvdycsIFs4NjAwXV0sIFsnc2VjdCcsIFsxNjddXSwgWydzZW1pJywgWzU5XV0sIFsnc2Vzd2FyJywgWzEwNTM3XV0sIFsnc2V0bWludXMnLCBbODcyNl1dLCBbJ3NldG1uJywgWzg3MjZdXSwgWydzZXh0JywgWzEwMDM4XV0sIFsnU2ZyJywgWzEyMDA4Nl1dLCBbJ3NmcicsIFsxMjAxMTJdXSwgWydzZnJvd24nLCBbODk5NF1dLCBbJ3NoYXJwJywgWzk4MzldXSwgWydTSENIY3knLCBbMTA2NV1dLCBbJ3NoY2hjeScsIFsxMDk3XV0sIFsnU0hjeScsIFsxMDY0XV0sIFsnc2hjeScsIFsxMDk2XV0sIFsnU2hvcnREb3duQXJyb3cnLCBbODU5NV1dLCBbJ1Nob3J0TGVmdEFycm93JywgWzg1OTJdXSwgWydzaG9ydG1pZCcsIFs4NzM5XV0sIFsnc2hvcnRwYXJhbGxlbCcsIFs4NzQxXV0sIFsnU2hvcnRSaWdodEFycm93JywgWzg1OTRdXSwgWydTaG9ydFVwQXJyb3cnLCBbODU5M11dLCBbJ3NoeScsIFsxNzNdXSwgWydTaWdtYScsIFs5MzFdXSwgWydzaWdtYScsIFs5NjNdXSwgWydzaWdtYWYnLCBbOTYyXV0sIFsnc2lnbWF2JywgWzk2Ml1dLCBbJ3NpbScsIFs4NzY0XV0sIFsnc2ltZG90JywgWzEwODU4XV0sIFsnc2ltZScsIFs4NzcxXV0sIFsnc2ltZXEnLCBbODc3MV1dLCBbJ3NpbWcnLCBbMTA5MTBdXSwgWydzaW1nRScsIFsxMDkxMl1dLCBbJ3NpbWwnLCBbMTA5MDldXSwgWydzaW1sRScsIFsxMDkxMV1dLCBbJ3NpbW5lJywgWzg3NzRdXSwgWydzaW1wbHVzJywgWzEwNzg4XV0sIFsnc2ltcmFycicsIFsxMDYxMF1dLCBbJ3NsYXJyJywgWzg1OTJdXSwgWydTbWFsbENpcmNsZScsIFs4NzI4XV0sIFsnc21hbGxzZXRtaW51cycsIFs4NzI2XV0sIFsnc21hc2hwJywgWzEwODAzXV0sIFsnc21lcGFyc2wnLCBbMTA3MjRdXSwgWydzbWlkJywgWzg3MzldXSwgWydzbWlsZScsIFs4OTk1XV0sIFsnc210JywgWzEwOTIyXV0sIFsnc210ZScsIFsxMDkyNF1dLCBbJ3NtdGVzJywgWzEwOTI0LCA2NTAyNF1dLCBbJ1NPRlRjeScsIFsxMDY4XV0sIFsnc29mdGN5JywgWzExMDBdXSwgWydzb2xiYXInLCBbOTAyM11dLCBbJ3NvbGInLCBbMTA2OTJdXSwgWydzb2wnLCBbNDddXSwgWydTb3BmJywgWzEyMDEzOF1dLCBbJ3NvcGYnLCBbMTIwMTY0XV0sIFsnc3BhZGVzJywgWzk4MjRdXSwgWydzcGFkZXN1aXQnLCBbOTgyNF1dLCBbJ3NwYXInLCBbODc0MV1dLCBbJ3NxY2FwJywgWzg4NTFdXSwgWydzcWNhcHMnLCBbODg1MSwgNjUwMjRdXSwgWydzcWN1cCcsIFs4ODUyXV0sIFsnc3FjdXBzJywgWzg4NTIsIDY1MDI0XV0sIFsnU3FydCcsIFs4NzMwXV0sIFsnc3FzdWInLCBbODg0N11dLCBbJ3Nxc3ViZScsIFs4ODQ5XV0sIFsnc3FzdWJzZXQnLCBbODg0N11dLCBbJ3Nxc3Vic2V0ZXEnLCBbODg0OV1dLCBbJ3Nxc3VwJywgWzg4NDhdXSwgWydzcXN1cGUnLCBbODg1MF1dLCBbJ3Nxc3Vwc2V0JywgWzg4NDhdXSwgWydzcXN1cHNldGVxJywgWzg4NTBdXSwgWydzcXVhcmUnLCBbOTYzM11dLCBbJ1NxdWFyZScsIFs5NjMzXV0sIFsnU3F1YXJlSW50ZXJzZWN0aW9uJywgWzg4NTFdXSwgWydTcXVhcmVTdWJzZXQnLCBbODg0N11dLCBbJ1NxdWFyZVN1YnNldEVxdWFsJywgWzg4NDldXSwgWydTcXVhcmVTdXBlcnNldCcsIFs4ODQ4XV0sIFsnU3F1YXJlU3VwZXJzZXRFcXVhbCcsIFs4ODUwXV0sIFsnU3F1YXJlVW5pb24nLCBbODg1Ml1dLCBbJ3NxdWFyZicsIFs5NjQyXV0sIFsnc3F1JywgWzk2MzNdXSwgWydzcXVmJywgWzk2NDJdXSwgWydzcmFycicsIFs4NTk0XV0sIFsnU3NjcicsIFsxMTk5ODJdXSwgWydzc2NyJywgWzEyMDAwOF1dLCBbJ3NzZXRtbicsIFs4NzI2XV0sIFsnc3NtaWxlJywgWzg5OTVdXSwgWydzc3RhcmYnLCBbODkwMl1dLCBbJ1N0YXInLCBbODkwMl1dLCBbJ3N0YXInLCBbOTczNF1dLCBbJ3N0YXJmJywgWzk3MzNdXSwgWydzdHJhaWdodGVwc2lsb24nLCBbMTAxM11dLCBbJ3N0cmFpZ2h0cGhpJywgWzk4MV1dLCBbJ3N0cm5zJywgWzE3NV1dLCBbJ3N1YicsIFs4ODM0XV0sIFsnU3ViJywgWzg5MTJdXSwgWydzdWJkb3QnLCBbMTA5NDFdXSwgWydzdWJFJywgWzEwOTQ5XV0sIFsnc3ViZScsIFs4ODM4XV0sIFsnc3ViZWRvdCcsIFsxMDk0N11dLCBbJ3N1Ym11bHQnLCBbMTA5NDVdXSwgWydzdWJuRScsIFsxMDk1NV1dLCBbJ3N1Ym5lJywgWzg4NDJdXSwgWydzdWJwbHVzJywgWzEwOTQzXV0sIFsnc3VicmFycicsIFsxMDYxN11dLCBbJ3N1YnNldCcsIFs4ODM0XV0sIFsnU3Vic2V0JywgWzg5MTJdXSwgWydzdWJzZXRlcScsIFs4ODM4XV0sIFsnc3Vic2V0ZXFxJywgWzEwOTQ5XV0sIFsnU3Vic2V0RXF1YWwnLCBbODgzOF1dLCBbJ3N1YnNldG5lcScsIFs4ODQyXV0sIFsnc3Vic2V0bmVxcScsIFsxMDk1NV1dLCBbJ3N1YnNpbScsIFsxMDk1MV1dLCBbJ3N1YnN1YicsIFsxMDk2NV1dLCBbJ3N1YnN1cCcsIFsxMDk2M11dLCBbJ3N1Y2NhcHByb3gnLCBbMTA5MzZdXSwgWydzdWNjJywgWzg4MjddXSwgWydzdWNjY3VybHllcScsIFs4ODI5XV0sIFsnU3VjY2VlZHMnLCBbODgyN11dLCBbJ1N1Y2NlZWRzRXF1YWwnLCBbMTA5MjhdXSwgWydTdWNjZWVkc1NsYW50RXF1YWwnLCBbODgyOV1dLCBbJ1N1Y2NlZWRzVGlsZGUnLCBbODgzMV1dLCBbJ3N1Y2NlcScsIFsxMDkyOF1dLCBbJ3N1Y2NuYXBwcm94JywgWzEwOTM4XV0sIFsnc3VjY25lcXEnLCBbMTA5MzRdXSwgWydzdWNjbnNpbScsIFs4OTM3XV0sIFsnc3VjY3NpbScsIFs4ODMxXV0sIFsnU3VjaFRoYXQnLCBbODcxNV1dLCBbJ3N1bScsIFs4NzIxXV0sIFsnU3VtJywgWzg3MjFdXSwgWydzdW5nJywgWzk4MzRdXSwgWydzdXAxJywgWzE4NV1dLCBbJ3N1cDInLCBbMTc4XV0sIFsnc3VwMycsIFsxNzldXSwgWydzdXAnLCBbODgzNV1dLCBbJ1N1cCcsIFs4OTEzXV0sIFsnc3VwZG90JywgWzEwOTQyXV0sIFsnc3VwZHN1YicsIFsxMDk2OF1dLCBbJ3N1cEUnLCBbMTA5NTBdXSwgWydzdXBlJywgWzg4MzldXSwgWydzdXBlZG90JywgWzEwOTQ4XV0sIFsnU3VwZXJzZXQnLCBbODgzNV1dLCBbJ1N1cGVyc2V0RXF1YWwnLCBbODgzOV1dLCBbJ3N1cGhzb2wnLCBbMTAxODVdXSwgWydzdXBoc3ViJywgWzEwOTY3XV0sIFsnc3VwbGFycicsIFsxMDYxOV1dLCBbJ3N1cG11bHQnLCBbMTA5NDZdXSwgWydzdXBuRScsIFsxMDk1Nl1dLCBbJ3N1cG5lJywgWzg4NDNdXSwgWydzdXBwbHVzJywgWzEwOTQ0XV0sIFsnc3Vwc2V0JywgWzg4MzVdXSwgWydTdXBzZXQnLCBbODkxM11dLCBbJ3N1cHNldGVxJywgWzg4MzldXSwgWydzdXBzZXRlcXEnLCBbMTA5NTBdXSwgWydzdXBzZXRuZXEnLCBbODg0M11dLCBbJ3N1cHNldG5lcXEnLCBbMTA5NTZdXSwgWydzdXBzaW0nLCBbMTA5NTJdXSwgWydzdXBzdWInLCBbMTA5NjRdXSwgWydzdXBzdXAnLCBbMTA5NjZdXSwgWydzd2FyaGsnLCBbMTA1MzRdXSwgWydzd2FycicsIFs4NjAxXV0sIFsnc3dBcnInLCBbODY2NV1dLCBbJ3N3YXJyb3cnLCBbODYwMV1dLCBbJ3N3bndhcicsIFsxMDUzOF1dLCBbJ3N6bGlnJywgWzIyM11dLCBbJ1RhYicsIFs5XV0sIFsndGFyZ2V0JywgWzg5ODJdXSwgWydUYXUnLCBbOTMyXV0sIFsndGF1JywgWzk2NF1dLCBbJ3RicmsnLCBbOTE0MF1dLCBbJ1RjYXJvbicsIFszNTZdXSwgWyd0Y2Fyb24nLCBbMzU3XV0sIFsnVGNlZGlsJywgWzM1NF1dLCBbJ3RjZWRpbCcsIFszNTVdXSwgWydUY3knLCBbMTA1OF1dLCBbJ3RjeScsIFsxMDkwXV0sIFsndGRvdCcsIFs4NDExXV0sIFsndGVscmVjJywgWzg5ODFdXSwgWydUZnInLCBbMTIwMDg3XV0sIFsndGZyJywgWzEyMDExM11dLCBbJ3RoZXJlNCcsIFs4NzU2XV0sIFsndGhlcmVmb3JlJywgWzg3NTZdXSwgWydUaGVyZWZvcmUnLCBbODc1Nl1dLCBbJ1RoZXRhJywgWzkyMF1dLCBbJ3RoZXRhJywgWzk1Ml1dLCBbJ3RoZXRhc3ltJywgWzk3N11dLCBbJ3RoZXRhdicsIFs5NzddXSwgWyd0aGlja2FwcHJveCcsIFs4Nzc2XV0sIFsndGhpY2tzaW0nLCBbODc2NF1dLCBbJ1RoaWNrU3BhY2UnLCBbODI4NywgODIwMl1dLCBbJ1RoaW5TcGFjZScsIFs4MjAxXV0sIFsndGhpbnNwJywgWzgyMDFdXSwgWyd0aGthcCcsIFs4Nzc2XV0sIFsndGhrc2ltJywgWzg3NjRdXSwgWydUSE9STicsIFsyMjJdXSwgWyd0aG9ybicsIFsyNTRdXSwgWyd0aWxkZScsIFs3MzJdXSwgWydUaWxkZScsIFs4NzY0XV0sIFsnVGlsZGVFcXVhbCcsIFs4NzcxXV0sIFsnVGlsZGVGdWxsRXF1YWwnLCBbODc3M11dLCBbJ1RpbGRlVGlsZGUnLCBbODc3Nl1dLCBbJ3RpbWVzYmFyJywgWzEwODAxXV0sIFsndGltZXNiJywgWzg4NjRdXSwgWyd0aW1lcycsIFsyMTVdXSwgWyd0aW1lc2QnLCBbMTA4MDBdXSwgWyd0aW50JywgWzg3NDldXSwgWyd0b2VhJywgWzEwNTM2XV0sIFsndG9wYm90JywgWzkwMTRdXSwgWyd0b3BjaXInLCBbMTA5OTNdXSwgWyd0b3AnLCBbODg2OF1dLCBbJ1RvcGYnLCBbMTIwMTM5XV0sIFsndG9wZicsIFsxMjAxNjVdXSwgWyd0b3Bmb3JrJywgWzEwOTcwXV0sIFsndG9zYScsIFsxMDUzN11dLCBbJ3RwcmltZScsIFs4MjQ0XV0sIFsndHJhZGUnLCBbODQ4Ml1dLCBbJ1RSQURFJywgWzg0ODJdXSwgWyd0cmlhbmdsZScsIFs5NjUzXV0sIFsndHJpYW5nbGVkb3duJywgWzk2NjNdXSwgWyd0cmlhbmdsZWxlZnQnLCBbOTY2N11dLCBbJ3RyaWFuZ2xlbGVmdGVxJywgWzg4ODRdXSwgWyd0cmlhbmdsZXEnLCBbODc5Nl1dLCBbJ3RyaWFuZ2xlcmlnaHQnLCBbOTY1N11dLCBbJ3RyaWFuZ2xlcmlnaHRlcScsIFs4ODg1XV0sIFsndHJpZG90JywgWzk3MDhdXSwgWyd0cmllJywgWzg3OTZdXSwgWyd0cmltaW51cycsIFsxMDgxMF1dLCBbJ1RyaXBsZURvdCcsIFs4NDExXV0sIFsndHJpcGx1cycsIFsxMDgwOV1dLCBbJ3RyaXNiJywgWzEwNzAxXV0sIFsndHJpdGltZScsIFsxMDgxMV1dLCBbJ3RycGV6aXVtJywgWzkxODZdXSwgWydUc2NyJywgWzExOTk4M11dLCBbJ3RzY3InLCBbMTIwMDA5XV0sIFsnVFNjeScsIFsxMDYyXV0sIFsndHNjeScsIFsxMDk0XV0sIFsnVFNIY3knLCBbMTAzNV1dLCBbJ3RzaGN5JywgWzExMTVdXSwgWydUc3Ryb2snLCBbMzU4XV0sIFsndHN0cm9rJywgWzM1OV1dLCBbJ3R3aXh0JywgWzg4MTJdXSwgWyd0d29oZWFkbGVmdGFycm93JywgWzg2MDZdXSwgWyd0d29oZWFkcmlnaHRhcnJvdycsIFs4NjA4XV0sIFsnVWFjdXRlJywgWzIxOF1dLCBbJ3VhY3V0ZScsIFsyNTBdXSwgWyd1YXJyJywgWzg1OTNdXSwgWydVYXJyJywgWzg2MDddXSwgWyd1QXJyJywgWzg2NTddXSwgWydVYXJyb2NpcicsIFsxMDU2OV1dLCBbJ1VicmN5JywgWzEwMzhdXSwgWyd1YnJjeScsIFsxMTE4XV0sIFsnVWJyZXZlJywgWzM2NF1dLCBbJ3VicmV2ZScsIFszNjVdXSwgWydVY2lyYycsIFsyMTldXSwgWyd1Y2lyYycsIFsyNTFdXSwgWydVY3knLCBbMTA1OV1dLCBbJ3VjeScsIFsxMDkxXV0sIFsndWRhcnInLCBbODY0NV1dLCBbJ1VkYmxhYycsIFszNjhdXSwgWyd1ZGJsYWMnLCBbMzY5XV0sIFsndWRoYXInLCBbMTA2MDZdXSwgWyd1ZmlzaHQnLCBbMTA2MjJdXSwgWydVZnInLCBbMTIwMDg4XV0sIFsndWZyJywgWzEyMDExNF1dLCBbJ1VncmF2ZScsIFsyMTddXSwgWyd1Z3JhdmUnLCBbMjQ5XV0sIFsndUhhcicsIFsxMDU5NV1dLCBbJ3VoYXJsJywgWzg2MzldXSwgWyd1aGFycicsIFs4NjM4XV0sIFsndWhibGsnLCBbOTYwMF1dLCBbJ3VsY29ybicsIFs4OTg4XV0sIFsndWxjb3JuZXInLCBbODk4OF1dLCBbJ3VsY3JvcCcsIFs4OTc1XV0sIFsndWx0cmknLCBbOTcyMF1dLCBbJ1VtYWNyJywgWzM2Ml1dLCBbJ3VtYWNyJywgWzM2M11dLCBbJ3VtbCcsIFsxNjhdXSwgWydVbmRlckJhcicsIFs5NV1dLCBbJ1VuZGVyQnJhY2UnLCBbOTE4M11dLCBbJ1VuZGVyQnJhY2tldCcsIFs5MTQxXV0sIFsnVW5kZXJQYXJlbnRoZXNpcycsIFs5MTgxXV0sIFsnVW5pb24nLCBbODg5OV1dLCBbJ1VuaW9uUGx1cycsIFs4ODQ2XV0sIFsnVW9nb24nLCBbMzcwXV0sIFsndW9nb24nLCBbMzcxXV0sIFsnVW9wZicsIFsxMjAxNDBdXSwgWyd1b3BmJywgWzEyMDE2Nl1dLCBbJ1VwQXJyb3dCYXInLCBbMTA1MTRdXSwgWyd1cGFycm93JywgWzg1OTNdXSwgWydVcEFycm93JywgWzg1OTNdXSwgWydVcGFycm93JywgWzg2NTddXSwgWydVcEFycm93RG93bkFycm93JywgWzg2NDVdXSwgWyd1cGRvd25hcnJvdycsIFs4NTk3XV0sIFsnVXBEb3duQXJyb3cnLCBbODU5N11dLCBbJ1VwZG93bmFycm93JywgWzg2NjFdXSwgWydVcEVxdWlsaWJyaXVtJywgWzEwNjA2XV0sIFsndXBoYXJwb29ubGVmdCcsIFs4NjM5XV0sIFsndXBoYXJwb29ucmlnaHQnLCBbODYzOF1dLCBbJ3VwbHVzJywgWzg4NDZdXSwgWydVcHBlckxlZnRBcnJvdycsIFs4NTk4XV0sIFsnVXBwZXJSaWdodEFycm93JywgWzg1OTldXSwgWyd1cHNpJywgWzk2NV1dLCBbJ1Vwc2knLCBbOTc4XV0sIFsndXBzaWgnLCBbOTc4XV0sIFsnVXBzaWxvbicsIFs5MzNdXSwgWyd1cHNpbG9uJywgWzk2NV1dLCBbJ1VwVGVlQXJyb3cnLCBbODYxM11dLCBbJ1VwVGVlJywgWzg4NjldXSwgWyd1cHVwYXJyb3dzJywgWzg2NDhdXSwgWyd1cmNvcm4nLCBbODk4OV1dLCBbJ3VyY29ybmVyJywgWzg5ODldXSwgWyd1cmNyb3AnLCBbODk3NF1dLCBbJ1VyaW5nJywgWzM2Nl1dLCBbJ3VyaW5nJywgWzM2N11dLCBbJ3VydHJpJywgWzk3MjFdXSwgWydVc2NyJywgWzExOTk4NF1dLCBbJ3VzY3InLCBbMTIwMDEwXV0sIFsndXRkb3QnLCBbODk0NF1dLCBbJ1V0aWxkZScsIFszNjBdXSwgWyd1dGlsZGUnLCBbMzYxXV0sIFsndXRyaScsIFs5NjUzXV0sIFsndXRyaWYnLCBbOTY1Ml1dLCBbJ3V1YXJyJywgWzg2NDhdXSwgWydVdW1sJywgWzIyMF1dLCBbJ3V1bWwnLCBbMjUyXV0sIFsndXdhbmdsZScsIFsxMDY2M11dLCBbJ3ZhbmdydCcsIFsxMDY1Ml1dLCBbJ3ZhcmVwc2lsb24nLCBbMTAxM11dLCBbJ3ZhcmthcHBhJywgWzEwMDhdXSwgWyd2YXJub3RoaW5nJywgWzg3MDldXSwgWyd2YXJwaGknLCBbOTgxXV0sIFsndmFycGknLCBbOTgyXV0sIFsndmFycHJvcHRvJywgWzg3MzNdXSwgWyd2YXJyJywgWzg1OTddXSwgWyd2QXJyJywgWzg2NjFdXSwgWyd2YXJyaG8nLCBbMTAwOV1dLCBbJ3ZhcnNpZ21hJywgWzk2Ml1dLCBbJ3ZhcnN1YnNldG5lcScsIFs4ODQyLCA2NTAyNF1dLCBbJ3ZhcnN1YnNldG5lcXEnLCBbMTA5NTUsIDY1MDI0XV0sIFsndmFyc3Vwc2V0bmVxJywgWzg4NDMsIDY1MDI0XV0sIFsndmFyc3Vwc2V0bmVxcScsIFsxMDk1NiwgNjUwMjRdXSwgWyd2YXJ0aGV0YScsIFs5NzddXSwgWyd2YXJ0cmlhbmdsZWxlZnQnLCBbODg4Ml1dLCBbJ3ZhcnRyaWFuZ2xlcmlnaHQnLCBbODg4M11dLCBbJ3ZCYXInLCBbMTA5ODRdXSwgWydWYmFyJywgWzEwOTg3XV0sIFsndkJhcnYnLCBbMTA5ODVdXSwgWydWY3knLCBbMTA0Ml1dLCBbJ3ZjeScsIFsxMDc0XV0sIFsndmRhc2gnLCBbODg2Nl1dLCBbJ3ZEYXNoJywgWzg4NzJdXSwgWydWZGFzaCcsIFs4ODczXV0sIFsnVkRhc2gnLCBbODg3NV1dLCBbJ1ZkYXNobCcsIFsxMDk4Ml1dLCBbJ3ZlZWJhcicsIFs4ODkxXV0sIFsndmVlJywgWzg3NDRdXSwgWydWZWUnLCBbODg5N11dLCBbJ3ZlZWVxJywgWzg3OTRdXSwgWyd2ZWxsaXAnLCBbODk0Ml1dLCBbJ3ZlcmJhcicsIFsxMjRdXSwgWydWZXJiYXInLCBbODIxNF1dLCBbJ3ZlcnQnLCBbMTI0XV0sIFsnVmVydCcsIFs4MjE0XV0sIFsnVmVydGljYWxCYXInLCBbODczOV1dLCBbJ1ZlcnRpY2FsTGluZScsIFsxMjRdXSwgWydWZXJ0aWNhbFNlcGFyYXRvcicsIFsxMDA3Ml1dLCBbJ1ZlcnRpY2FsVGlsZGUnLCBbODc2OF1dLCBbJ1ZlcnlUaGluU3BhY2UnLCBbODIwMl1dLCBbJ1ZmcicsIFsxMjAwODldXSwgWyd2ZnInLCBbMTIwMTE1XV0sIFsndmx0cmknLCBbODg4Ml1dLCBbJ3Zuc3ViJywgWzg4MzQsIDg0MDJdXSwgWyd2bnN1cCcsIFs4ODM1LCA4NDAyXV0sIFsnVm9wZicsIFsxMjAxNDFdXSwgWyd2b3BmJywgWzEyMDE2N11dLCBbJ3Zwcm9wJywgWzg3MzNdXSwgWyd2cnRyaScsIFs4ODgzXV0sIFsnVnNjcicsIFsxMTk5ODVdXSwgWyd2c2NyJywgWzEyMDAxMV1dLCBbJ3ZzdWJuRScsIFsxMDk1NSwgNjUwMjRdXSwgWyd2c3VibmUnLCBbODg0MiwgNjUwMjRdXSwgWyd2c3VwbkUnLCBbMTA5NTYsIDY1MDI0XV0sIFsndnN1cG5lJywgWzg4NDMsIDY1MDI0XV0sIFsnVnZkYXNoJywgWzg4NzRdXSwgWyd2emlnemFnJywgWzEwNjUwXV0sIFsnV2NpcmMnLCBbMzcyXV0sIFsnd2NpcmMnLCBbMzczXV0sIFsnd2VkYmFyJywgWzEwODQ3XV0sIFsnd2VkZ2UnLCBbODc0M11dLCBbJ1dlZGdlJywgWzg4OTZdXSwgWyd3ZWRnZXEnLCBbODc5M11dLCBbJ3dlaWVycCcsIFs4NDcyXV0sIFsnV2ZyJywgWzEyMDA5MF1dLCBbJ3dmcicsIFsxMjAxMTZdXSwgWydXb3BmJywgWzEyMDE0Ml1dLCBbJ3dvcGYnLCBbMTIwMTY4XV0sIFsnd3AnLCBbODQ3Ml1dLCBbJ3dyJywgWzg3NjhdXSwgWyd3cmVhdGgnLCBbODc2OF1dLCBbJ1dzY3InLCBbMTE5OTg2XV0sIFsnd3NjcicsIFsxMjAwMTJdXSwgWyd4Y2FwJywgWzg4OThdXSwgWyd4Y2lyYycsIFs5NzExXV0sIFsneGN1cCcsIFs4ODk5XV0sIFsneGR0cmknLCBbOTY2MV1dLCBbJ1hmcicsIFsxMjAwOTFdXSwgWyd4ZnInLCBbMTIwMTE3XV0sIFsneGhhcnInLCBbMTAyMzFdXSwgWyd4aEFycicsIFsxMDIzNF1dLCBbJ1hpJywgWzkyNl1dLCBbJ3hpJywgWzk1OF1dLCBbJ3hsYXJyJywgWzEwMjI5XV0sIFsneGxBcnInLCBbMTAyMzJdXSwgWyd4bWFwJywgWzEwMjM2XV0sIFsneG5pcycsIFs4OTU1XV0sIFsneG9kb3QnLCBbMTA3NTJdXSwgWydYb3BmJywgWzEyMDE0M11dLCBbJ3hvcGYnLCBbMTIwMTY5XV0sIFsneG9wbHVzJywgWzEwNzUzXV0sIFsneG90aW1lJywgWzEwNzU0XV0sIFsneHJhcnInLCBbMTAyMzBdXSwgWyd4ckFycicsIFsxMDIzM11dLCBbJ1hzY3InLCBbMTE5OTg3XV0sIFsneHNjcicsIFsxMjAwMTNdXSwgWyd4c3FjdXAnLCBbMTA3NThdXSwgWyd4dXBsdXMnLCBbMTA3NTZdXSwgWyd4dXRyaScsIFs5NjUxXV0sIFsneHZlZScsIFs4ODk3XV0sIFsneHdlZGdlJywgWzg4OTZdXSwgWydZYWN1dGUnLCBbMjIxXV0sIFsneWFjdXRlJywgWzI1M11dLCBbJ1lBY3knLCBbMTA3MV1dLCBbJ3lhY3knLCBbMTEwM11dLCBbJ1ljaXJjJywgWzM3NF1dLCBbJ3ljaXJjJywgWzM3NV1dLCBbJ1ljeScsIFsxMDY3XV0sIFsneWN5JywgWzEwOTldXSwgWyd5ZW4nLCBbMTY1XV0sIFsnWWZyJywgWzEyMDA5Ml1dLCBbJ3lmcicsIFsxMjAxMThdXSwgWydZSWN5JywgWzEwMzFdXSwgWyd5aWN5JywgWzExMTFdXSwgWydZb3BmJywgWzEyMDE0NF1dLCBbJ3lvcGYnLCBbMTIwMTcwXV0sIFsnWXNjcicsIFsxMTk5ODhdXSwgWyd5c2NyJywgWzEyMDAxNF1dLCBbJ1lVY3knLCBbMTA3MF1dLCBbJ3l1Y3knLCBbMTEwMl1dLCBbJ3l1bWwnLCBbMjU1XV0sIFsnWXVtbCcsIFszNzZdXSwgWydaYWN1dGUnLCBbMzc3XV0sIFsnemFjdXRlJywgWzM3OF1dLCBbJ1pjYXJvbicsIFszODFdXSwgWyd6Y2Fyb24nLCBbMzgyXV0sIFsnWmN5JywgWzEwNDddXSwgWyd6Y3knLCBbMTA3OV1dLCBbJ1pkb3QnLCBbMzc5XV0sIFsnemRvdCcsIFszODBdXSwgWyd6ZWV0cmYnLCBbODQ4OF1dLCBbJ1plcm9XaWR0aFNwYWNlJywgWzgyMDNdXSwgWydaZXRhJywgWzkxOF1dLCBbJ3pldGEnLCBbOTUwXV0sIFsnemZyJywgWzEyMDExOV1dLCBbJ1pmcicsIFs4NDg4XV0sIFsnWkhjeScsIFsxMDQ2XV0sIFsnemhjeScsIFsxMDc4XV0sIFsnemlncmFycicsIFs4NjY5XV0sIFsnem9wZicsIFsxMjAxNzFdXSwgWydab3BmJywgWzg0ODRdXSwgWydac2NyJywgWzExOTk4OV1dLCBbJ3pzY3InLCBbMTIwMDE1XV0sIFsnendqJywgWzgyMDVdXSwgWyd6d25qJywgWzgyMDRdXV07XG5cbnZhciBhbHBoYUluZGV4ID0ge307XG52YXIgY2hhckluZGV4ID0ge307XG5cbmNyZWF0ZUluZGV4ZXMoYWxwaGFJbmRleCwgY2hhckluZGV4KTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSHRtbDVFbnRpdGllcygpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYoIz9bXFx3XFxkXSspOz8vZywgZnVuY3Rpb24ocywgZW50aXR5KSB7XG4gICAgICAgIHZhciBjaHI7XG4gICAgICAgIGlmIChlbnRpdHkuY2hhckF0KDApID09PSBcIiNcIikge1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBlbnRpdHkuY2hhckF0KDEpID09PSAneCcgP1xuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgMTYpIDpcbiAgICAgICAgICAgICAgICBwYXJzZUludChlbnRpdHkuc3Vic3RyKDEpKTtcblxuICAgICAgICAgICAgaWYgKCEoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpKSB7XG4gICAgICAgICAgICAgICAgY2hyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNociA9IGFscGhhSW5kZXhbZW50aXR5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hyIHx8IHM7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmRlY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSHRtbDVFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaGFySW5mbyA9IGNoYXJJbmRleFtzdHIuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGlmIChjaGFySW5mbykge1xuICAgICAgICAgICAgdmFyIGFscGhhID0gY2hhckluZm9bc3RyLmNoYXJDb2RlQXQoaSArIDEpXTtcbiAgICAgICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxwaGEgPSBjaGFySW5mb1snJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCImXCIgKyBhbHBoYSArIFwiO1wiO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG4gSHRtbDVFbnRpdGllcy5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IEh0bWw1RW50aXRpZXMoKS5lbmNvZGUoc3RyKTtcbiB9O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbkh0bWw1RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB2YXIgY2hhckluZm8gPSBjaGFySW5kZXhbY107XG4gICAgICAgIGlmIChjaGFySW5mbykge1xuICAgICAgICAgICAgdmFyIGFscGhhID0gY2hhckluZm9bc3RyLmNoYXJDb2RlQXQoaSArIDEpXTtcbiAgICAgICAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxwaGEgPSBjaGFySW5mb1snJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCImXCIgKyBhbHBoYSArIFwiO1wiO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA8IDMyIHx8IGMgPiAxMjYpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuIEh0bWw1RW50aXRpZXMuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlTm9uVVRGKHN0cik7XG4gfTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5IdG1sNUVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25BU0NJSSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8PSAyNTUpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHJbaSsrXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBIdG1sNUVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcbiB9O1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbHBoYUluZGV4IFBhc3NlZCBieSByZWZlcmVuY2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY2hhckluZGV4IFBhc3NlZCBieSByZWZlcmVuY2UuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluZGV4ZXMoYWxwaGFJbmRleCwgY2hhckluZGV4KSB7XG4gICAgdmFyIGkgPSBFTlRJVElFUy5sZW5ndGg7XG4gICAgdmFyIF9yZXN1bHRzID0gW107XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgZSA9IEVOVElUSUVTW2ldO1xuICAgICAgICB2YXIgYWxwaGEgPSBlWzBdO1xuICAgICAgICB2YXIgY2hhcnMgPSBlWzFdO1xuICAgICAgICB2YXIgY2hyID0gY2hhcnNbMF07XG4gICAgICAgIHZhciBhZGRDaGFyID0gKGNociA8IDMyIHx8IGNociA+IDEyNikgfHwgY2hyID09PSA2MiB8fCBjaHIgPT09IDYwIHx8IGNociA9PT0gMzggfHwgY2hyID09PSAzNCB8fCBjaHIgPT09IDM5O1xuICAgICAgICB2YXIgY2hhckluZm87XG4gICAgICAgIGlmIChhZGRDaGFyKSB7XG4gICAgICAgICAgICBjaGFySW5mbyA9IGNoYXJJbmRleFtjaHJdID0gY2hhckluZGV4W2Nocl0gfHwge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXJzWzFdKSB7XG4gICAgICAgICAgICB2YXIgY2hyMiA9IGNoYXJzWzFdO1xuICAgICAgICAgICAgYWxwaGFJbmRleFthbHBoYV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjIpO1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChhZGRDaGFyICYmIChjaGFySW5mb1tjaHIyXSA9IGFscGhhKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbHBoYUluZGV4W2FscGhhXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKTtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goYWRkQ2hhciAmJiAoY2hhckluZm9bJyddID0gYWxwaGEpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIdG1sNUVudGl0aWVzO1xuIiwidmFyIEFMUEhBX0lOREVYID0ge1xuICAgICcmbHQnOiAnPCcsXG4gICAgJyZndCc6ICc+JyxcbiAgICAnJnF1b3QnOiAnXCInLFxuICAgICcmYXBvcyc6ICdcXCcnLFxuICAgICcmYW1wJzogJyYnLFxuICAgICcmbHQ7JzogJzwnLFxuICAgICcmZ3Q7JzogJz4nLFxuICAgICcmcXVvdDsnOiAnXCInLFxuICAgICcmYXBvczsnOiAnXFwnJyxcbiAgICAnJmFtcDsnOiAnJidcbn07XG5cbnZhciBDSEFSX0lOREVYID0ge1xuICAgIDYwOiAnbHQnLFxuICAgIDYyOiAnZ3QnLFxuICAgIDM0OiAncXVvdCcsXG4gICAgMzk6ICdhcG9zJyxcbiAgICAzODogJ2FtcCdcbn07XG5cbnZhciBDSEFSX1NfSU5ERVggPSB7XG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJ1xcJyc6ICcmYXBvczsnLFxuICAgICcmJzogJyZhbXA7J1xufTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gWG1sRW50aXRpZXMoKSB7fVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cblhtbEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCAhc3RyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvPHw+fFwifCd8Ji9nLCBmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBDSEFSX1NfSU5ERVhbc107XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbiBYbWxFbnRpdGllcy5lbmNvZGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlKHN0cik7XG4gfTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5YbWxFbnRpdGllcy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYjP1swLTlhLXpBLVpdKzs/L2csIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgaWYgKHMuY2hhckF0KDEpID09PSAnIycpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gcy5jaGFyQXQoMikudG9Mb3dlckNhc2UoKSA9PT0gJ3gnID9cbiAgICAgICAgICAgICAgICBwYXJzZUludChzLnN1YnN0cigzKSwgMTYpIDpcbiAgICAgICAgICAgICAgICBwYXJzZUludChzLnN1YnN0cigyKSk7XG5cbiAgICAgICAgICAgIGlmIChpc05hTihjb2RlKSB8fCBjb2RlIDwgLTMyNzY4IHx8IGNvZGUgPiA2NTUzNSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBTFBIQV9JTkRFWFtzXSB8fCBzO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG4gWG1sRW50aXRpZXMuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIG5ldyBYbWxFbnRpdGllcygpLmRlY29kZShzdHIpO1xuIH07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB2YXIgYWxwaGEgPSBDSEFSX0lOREVYW2NdO1xuICAgICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBcIiZcIiArIGFscGhhICsgXCI7XCI7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA8IDMyIHx8IGMgPiAxMjYpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuIFhtbEVudGl0aWVzLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBuZXcgWG1sRW50aXRpZXMoKS5lbmNvZGVOb25VVEYoc3RyKTtcbiB9O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cblhtbEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25BU0NJSSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHN0ckxlbmdodCA9IHN0ci5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmdodCkge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8PSAyNTUpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdHJbaSsrXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG4gWG1sRW50aXRpZXMuZW5jb2RlTm9uQVNDSUkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcbiB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhtbEVudGl0aWVzO1xuIiwiLyohXG4gICAgbG9jYWxGb3JhZ2UgLS0gT2ZmbGluZSBTdG9yYWdlLCBJbXByb3ZlZFxuICAgIFZlcnNpb24gMS43LjNcbiAgICBodHRwczovL2xvY2FsZm9yYWdlLmdpdGh1Yi5pby9sb2NhbEZvcmFnZVxuICAgIChjKSAyMDEzLTIwMTcgTW96aWxsYSwgQXBhY2hlIExpY2Vuc2UgMi4wXG4qL1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcubG9jYWxmb3JhZ2UgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgKGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIiwgZil9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG52YXIgTXV0YXRpb24gPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblxudmFyIHNjaGVkdWxlRHJhaW47XG5cbntcbiAgaWYgKE11dGF0aW9uKSB7XG4gICAgdmFyIGNhbGxlZCA9IDA7XG4gICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uKG5leHRUaWNrKTtcbiAgICB2YXIgZWxlbWVudCA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50LCB7XG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfSk7XG4gICAgc2NoZWR1bGVEcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGVsZW1lbnQuZGF0YSA9IChjYWxsZWQgPSArK2NhbGxlZCAlIDIpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoIWdsb2JhbC5zZXRJbW1lZGlhdGUgJiYgdHlwZW9mIGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgY2hhbm5lbCA9IG5ldyBnbG9iYWwuTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IG5leHRUaWNrO1xuICAgIHNjaGVkdWxlRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoJ2RvY3VtZW50JyBpbiBnbG9iYWwgJiYgJ29ucmVhZHlzdGF0ZWNoYW5nZScgaW4gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKSB7XG4gICAgc2NoZWR1bGVEcmFpbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgdmFyIHNjcmlwdEVsID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0RWwub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBuZXh0VGljaygpO1xuXG4gICAgICAgIHNjcmlwdEVsLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgIHNjcmlwdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0RWwpO1xuICAgICAgICBzY3JpcHRFbCA9IG51bGw7XG4gICAgICB9O1xuICAgICAgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHRFbCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBzY2hlZHVsZURyYWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2V0VGltZW91dChuZXh0VGljaywgMCk7XG4gICAgfTtcbiAgfVxufVxuXG52YXIgZHJhaW5pbmc7XG52YXIgcXVldWUgPSBbXTtcbi8vbmFtZWQgbmV4dFRpY2sgZm9yIGxlc3MgY29uZnVzaW5nIHN0YWNrIHRyYWNlc1xuZnVuY3Rpb24gbmV4dFRpY2soKSB7XG4gIGRyYWluaW5nID0gdHJ1ZTtcbiAgdmFyIGksIG9sZFF1ZXVlO1xuICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICB3aGlsZSAobGVuKSB7XG4gICAgb2xkUXVldWUgPSBxdWV1ZTtcbiAgICBxdWV1ZSA9IFtdO1xuICAgIGkgPSAtMTtcbiAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICBvbGRRdWV1ZVtpXSgpO1xuICAgIH1cbiAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIH1cbiAgZHJhaW5pbmcgPSBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbW1lZGlhdGU7XG5mdW5jdGlvbiBpbW1lZGlhdGUodGFzaykge1xuICBpZiAocXVldWUucHVzaCh0YXNrKSA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICBzY2hlZHVsZURyYWluKCk7XG4gIH1cbn1cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHt9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcbnZhciBpbW1lZGlhdGUgPSBfZGVyZXFfKDEpO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gSU5URVJOQUwoKSB7fVxuXG52YXIgaGFuZGxlcnMgPSB7fTtcblxudmFyIFJFSkVDVEVEID0gWydSRUpFQ1RFRCddO1xudmFyIEZVTEZJTExFRCA9IFsnRlVMRklMTEVEJ107XG52YXIgUEVORElORyA9IFsnUEVORElORyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5cbmZ1bmN0aW9uIFByb21pc2UocmVzb2x2ZXIpIHtcbiAgaWYgKHR5cGVvZiByZXNvbHZlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Jlc29sdmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG4gIHRoaXMuc3RhdGUgPSBQRU5ESU5HO1xuICB0aGlzLnF1ZXVlID0gW107XG4gIHRoaXMub3V0Y29tZSA9IHZvaWQgMDtcbiAgaWYgKHJlc29sdmVyICE9PSBJTlRFUk5BTCkge1xuICAgIHNhZmVseVJlc29sdmVUaGVuYWJsZSh0aGlzLCByZXNvbHZlcik7XG4gIH1cbn1cblxuUHJvbWlzZS5wcm90b3R5cGVbXCJjYXRjaFwiXSA9IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG59O1xuUHJvbWlzZS5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICBpZiAodHlwZW9mIG9uRnVsZmlsbGVkICE9PSAnZnVuY3Rpb24nICYmIHRoaXMuc3RhdGUgPT09IEZVTEZJTExFRCB8fFxuICAgIHR5cGVvZiBvblJlamVjdGVkICE9PSAnZnVuY3Rpb24nICYmIHRoaXMuc3RhdGUgPT09IFJFSkVDVEVEKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFyIHByb21pc2UgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihJTlRFUk5BTCk7XG4gIGlmICh0aGlzLnN0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgdmFyIHJlc29sdmVyID0gdGhpcy5zdGF0ZSA9PT0gRlVMRklMTEVEID8gb25GdWxmaWxsZWQgOiBvblJlamVjdGVkO1xuICAgIHVud3JhcChwcm9taXNlLCByZXNvbHZlciwgdGhpcy5vdXRjb21lKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2gobmV3IFF1ZXVlSXRlbShwcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuZnVuY3Rpb24gUXVldWVJdGVtKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIGlmICh0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gb25GdWxmaWxsZWQ7XG4gICAgdGhpcy5jYWxsRnVsZmlsbGVkID0gdGhpcy5vdGhlckNhbGxGdWxmaWxsZWQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5vblJlamVjdGVkID0gb25SZWplY3RlZDtcbiAgICB0aGlzLmNhbGxSZWplY3RlZCA9IHRoaXMub3RoZXJDYWxsUmVqZWN0ZWQ7XG4gIH1cbn1cblF1ZXVlSXRlbS5wcm90b3R5cGUuY2FsbEZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBoYW5kbGVycy5yZXNvbHZlKHRoaXMucHJvbWlzZSwgdmFsdWUpO1xufTtcblF1ZXVlSXRlbS5wcm90b3R5cGUub3RoZXJDYWxsRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHVud3JhcCh0aGlzLnByb21pc2UsIHRoaXMub25GdWxmaWxsZWQsIHZhbHVlKTtcbn07XG5RdWV1ZUl0ZW0ucHJvdG90eXBlLmNhbGxSZWplY3RlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBoYW5kbGVycy5yZWplY3QodGhpcy5wcm9taXNlLCB2YWx1ZSk7XG59O1xuUXVldWVJdGVtLnByb3RvdHlwZS5vdGhlckNhbGxSZWplY3RlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB1bndyYXAodGhpcy5wcm9taXNlLCB0aGlzLm9uUmVqZWN0ZWQsIHZhbHVlKTtcbn07XG5cbmZ1bmN0aW9uIHVud3JhcChwcm9taXNlLCBmdW5jLCB2YWx1ZSkge1xuICBpbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXR1cm5WYWx1ZTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuVmFsdWUgPSBmdW5jKHZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gaGFuZGxlcnMucmVqZWN0KHByb21pc2UsIGUpO1xuICAgIH1cbiAgICBpZiAocmV0dXJuVmFsdWUgPT09IHByb21pc2UpIHtcbiAgICAgIGhhbmRsZXJzLnJlamVjdChwcm9taXNlLCBuZXcgVHlwZUVycm9yKCdDYW5ub3QgcmVzb2x2ZSBwcm9taXNlIHdpdGggaXRzZWxmJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVycy5yZXNvbHZlKHByb21pc2UsIHJldHVyblZhbHVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5oYW5kbGVycy5yZXNvbHZlID0gZnVuY3Rpb24gKHNlbGYsIHZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSB0cnlDYXRjaChnZXRUaGVuLCB2YWx1ZSk7XG4gIGlmIChyZXN1bHQuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgcmV0dXJuIGhhbmRsZXJzLnJlamVjdChzZWxmLCByZXN1bHQudmFsdWUpO1xuICB9XG4gIHZhciB0aGVuYWJsZSA9IHJlc3VsdC52YWx1ZTtcblxuICBpZiAodGhlbmFibGUpIHtcbiAgICBzYWZlbHlSZXNvbHZlVGhlbmFibGUoc2VsZiwgdGhlbmFibGUpO1xuICB9IGVsc2Uge1xuICAgIHNlbGYuc3RhdGUgPSBGVUxGSUxMRUQ7XG4gICAgc2VsZi5vdXRjb21lID0gdmFsdWU7XG4gICAgdmFyIGkgPSAtMTtcbiAgICB2YXIgbGVuID0gc2VsZi5xdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgc2VsZi5xdWV1ZVtpXS5jYWxsRnVsZmlsbGVkKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNlbGY7XG59O1xuaGFuZGxlcnMucmVqZWN0ID0gZnVuY3Rpb24gKHNlbGYsIGVycm9yKSB7XG4gIHNlbGYuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgc2VsZi5vdXRjb21lID0gZXJyb3I7XG4gIHZhciBpID0gLTE7XG4gIHZhciBsZW4gPSBzZWxmLnF1ZXVlLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgIHNlbGYucXVldWVbaV0uY2FsbFJlamVjdGVkKGVycm9yKTtcbiAgfVxuICByZXR1cm4gc2VsZjtcbn07XG5cbmZ1bmN0aW9uIGdldFRoZW4ob2JqKSB7XG4gIC8vIE1ha2Ugc3VyZSB3ZSBvbmx5IGFjY2VzcyB0aGUgYWNjZXNzb3Igb25jZSBhcyByZXF1aXJlZCBieSB0aGUgc3BlY1xuICB2YXIgdGhlbiA9IG9iaiAmJiBvYmoudGhlbjtcbiAgaWYgKG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYXBweVRoZW4oKSB7XG4gICAgICB0aGVuLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhZmVseVJlc29sdmVUaGVuYWJsZShzZWxmLCB0aGVuYWJsZSkge1xuICAvLyBFaXRoZXIgZnVsZmlsbCwgcmVqZWN0IG9yIHJlamVjdCB3aXRoIGVycm9yXG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gb25FcnJvcih2YWx1ZSkge1xuICAgIGlmIChjYWxsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FsbGVkID0gdHJ1ZTtcbiAgICBoYW5kbGVycy5yZWplY3Qoc2VsZiwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25TdWNjZXNzKHZhbHVlKSB7XG4gICAgaWYgKGNhbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIGhhbmRsZXJzLnJlc29sdmUoc2VsZiwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5VG9VbndyYXAoKSB7XG4gICAgdGhlbmFibGUob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSB0cnlDYXRjaCh0cnlUb1Vud3JhcCk7XG4gIGlmIChyZXN1bHQuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgb25FcnJvcihyZXN1bHQudmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyeUNhdGNoKGZ1bmMsIHZhbHVlKSB7XG4gIHZhciBvdXQgPSB7fTtcbiAgdHJ5IHtcbiAgICBvdXQudmFsdWUgPSBmdW5jKHZhbHVlKTtcbiAgICBvdXQuc3RhdHVzID0gJ3N1Y2Nlc3MnO1xuICB9IGNhdGNoIChlKSB7XG4gICAgb3V0LnN0YXR1cyA9ICdlcnJvcic7XG4gICAgb3V0LnZhbHVlID0gZTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5Qcm9taXNlLnJlc29sdmUgPSByZXNvbHZlO1xuZnVuY3Rpb24gcmVzb2x2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiB0aGlzKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiBoYW5kbGVycy5yZXNvbHZlKG5ldyB0aGlzKElOVEVSTkFMKSwgdmFsdWUpO1xufVxuXG5Qcm9taXNlLnJlamVjdCA9IHJlamVjdDtcbmZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgdmFyIHByb21pc2UgPSBuZXcgdGhpcyhJTlRFUk5BTCk7XG4gIHJldHVybiBoYW5kbGVycy5yZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbn1cblxuUHJvbWlzZS5hbGwgPSBhbGw7XG5mdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXJhYmxlKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKCdtdXN0IGJlIGFuIGFycmF5JykpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGl0ZXJhYmxlLmxlbmd0aDtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICBpZiAoIWxlbikge1xuICAgIHJldHVybiB0aGlzLnJlc29sdmUoW10pO1xuICB9XG5cbiAgdmFyIHZhbHVlcyA9IG5ldyBBcnJheShsZW4pO1xuICB2YXIgcmVzb2x2ZWQgPSAwO1xuICB2YXIgaSA9IC0xO1xuICB2YXIgcHJvbWlzZSA9IG5ldyB0aGlzKElOVEVSTkFMKTtcblxuICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgYWxsUmVzb2x2ZXIoaXRlcmFibGVbaV0sIGkpO1xuICB9XG4gIHJldHVybiBwcm9taXNlO1xuICBmdW5jdGlvbiBhbGxSZXNvbHZlcih2YWx1ZSwgaSkge1xuICAgIHNlbGYucmVzb2x2ZSh2YWx1ZSkudGhlbihyZXNvbHZlRnJvbUFsbCwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBoYW5kbGVycy5yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHJlc29sdmVGcm9tQWxsKG91dFZhbHVlKSB7XG4gICAgICB2YWx1ZXNbaV0gPSBvdXRWYWx1ZTtcbiAgICAgIGlmICgrK3Jlc29sdmVkID09PSBsZW4gJiYgIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBoYW5kbGVycy5yZXNvbHZlKHByb21pc2UsIHZhbHVlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblByb21pc2UucmFjZSA9IHJhY2U7XG5mdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyYWJsZSkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICByZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcignbXVzdCBiZSBhbiBhcnJheScpKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBpdGVyYWJsZS5sZW5ndGg7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgaWYgKCFsZW4pIHtcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlKFtdKTtcbiAgfVxuXG4gIHZhciBpID0gLTE7XG4gIHZhciBwcm9taXNlID0gbmV3IHRoaXMoSU5URVJOQUwpO1xuXG4gIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICByZXNvbHZlcihpdGVyYWJsZVtpXSk7XG4gIH1cbiAgcmV0dXJuIHByb21pc2U7XG4gIGZ1bmN0aW9uIHJlc29sdmVyKHZhbHVlKSB7XG4gICAgc2VsZi5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgaGFuZGxlcnMucmVzb2x2ZShwcm9taXNlLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBoYW5kbGVycy5yZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbn0se1wiMVwiOjF9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcbmlmICh0eXBlb2YgZ2xvYmFsLlByb21pc2UgIT09ICdmdW5jdGlvbicpIHtcbiAgZ2xvYmFsLlByb21pc2UgPSBfZGVyZXFfKDIpO1xufVxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wiMlwiOjJ9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBnZXRJREIoKSB7XG4gICAgLyogZ2xvYmFsIGluZGV4ZWREQix3ZWJraXRJbmRleGVkREIsbW96SW5kZXhlZERCLE9JbmRleGVkREIsbXNJbmRleGVkREIgKi9cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGluZGV4ZWREQiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleGVkREI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB3ZWJraXRJbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gd2Via2l0SW5kZXhlZERCO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbW96SW5kZXhlZERCICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIG1vekluZGV4ZWREQjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIE9JbmRleGVkREIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gT0luZGV4ZWREQjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG1zSW5kZXhlZERCICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIG1zSW5kZXhlZERCO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuXG52YXIgaWRiID0gZ2V0SURCKCk7XG5cbmZ1bmN0aW9uIGlzSW5kZXhlZERCVmFsaWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBJbmRleGVkREI7IGZhbGwgYmFjayB0byB2ZW5kb3ItcHJlZml4ZWQgdmVyc2lvbnNcbiAgICAgICAgLy8gaWYgbmVlZGVkLlxuICAgICAgICBpZiAoIWlkYikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIG1pbWljIFBvdWNoREIgaGVyZTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gV2UgdGVzdCBmb3Igb3BlbkRhdGFiYXNlIGJlY2F1c2UgSUUgTW9iaWxlIGlkZW50aWZpZXMgaXRzZWxmXG4gICAgICAgIC8vIGFzIFNhZmFyaS4gT2ggdGhlIGx1bHouLi5cbiAgICAgICAgdmFyIGlzU2FmYXJpID0gdHlwZW9mIG9wZW5EYXRhYmFzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgLyhTYWZhcml8aVBob25lfGlQYWR8aVBvZCkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIS9DaHJvbWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIS9CbGFja0JlcnJ5Ly50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSk7XG5cbiAgICAgICAgdmFyIGhhc0ZldGNoID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIGZldGNoLnRvU3RyaW5nKCkuaW5kZXhPZignW25hdGl2ZSBjb2RlJykgIT09IC0xO1xuXG4gICAgICAgIC8vIFNhZmFyaSA8MTAuMSBkb2VzIG5vdCBtZWV0IG91ciByZXF1aXJlbWVudHMgZm9yIElEQiBzdXBwb3J0ICgjNTU3MilcbiAgICAgICAgLy8gc2luY2UgU2FmYXJpIDEwLjEgc2hpcHBlZCB3aXRoIGZldGNoLCB3ZSBjYW4gdXNlIHRoYXQgdG8gZGV0ZWN0IGl0XG4gICAgICAgIHJldHVybiAoIWlzU2FmYXJpIHx8IGhhc0ZldGNoKSAmJiB0eXBlb2YgaW5kZXhlZERCICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAvLyBzb21lIG91dGRhdGVkIGltcGxlbWVudGF0aW9ucyBvZiBJREIgdGhhdCBhcHBlYXIgb24gU2Ftc3VuZ1xuICAgICAgICAvLyBhbmQgSFRDIEFuZHJvaWQgZGV2aWNlcyA8NC40IGFyZSBtaXNzaW5nIElEQktleVJhbmdlXG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvbG9jYWxGb3JhZ2UvaXNzdWVzLzEyOFxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL2xvY2FsRm9yYWdlL2lzc3Vlcy8yNzJcbiAgICAgICAgdHlwZW9mIElEQktleVJhbmdlICE9PSAndW5kZWZpbmVkJztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8vIEFic3RyYWN0cyBjb25zdHJ1Y3RpbmcgYSBCbG9iIG9iamVjdCwgc28gaXQgYWxzbyB3b3JrcyBpbiBvbGRlclxuLy8gYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IHRoZSBuYXRpdmUgQmxvYiBjb25zdHJ1Y3Rvci4gKGkuZS5cbi8vIG9sZCBRdFdlYktpdCB2ZXJzaW9ucywgYXQgbGVhc3QpLlxuLy8gQWJzdHJhY3RzIGNvbnN0cnVjdGluZyBhIEJsb2Igb2JqZWN0LCBzbyBpdCBhbHNvIHdvcmtzIGluIG9sZGVyXG4vLyBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgdGhlIG5hdGl2ZSBCbG9iIGNvbnN0cnVjdG9yLiAoaS5lLlxuLy8gb2xkIFF0V2ViS2l0IHZlcnNpb25zLCBhdCBsZWFzdCkuXG5mdW5jdGlvbiBjcmVhdGVCbG9iKHBhcnRzLCBwcm9wZXJ0aWVzKSB7XG4gICAgLyogZ2xvYmFsIEJsb2JCdWlsZGVyLE1TQmxvYkJ1aWxkZXIsTW96QmxvYkJ1aWxkZXIsV2ViS2l0QmxvYkJ1aWxkZXIgKi9cbiAgICBwYXJ0cyA9IHBhcnRzIHx8IFtdO1xuICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBuZXcgQmxvYihwYXJ0cywgcHJvcGVydGllcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZS5uYW1lICE9PSAnVHlwZUVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgQnVpbGRlciA9IHR5cGVvZiBCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iQnVpbGRlciA6IHR5cGVvZiBNU0Jsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJyA/IE1TQmxvYkJ1aWxkZXIgOiB0eXBlb2YgTW96QmxvYkJ1aWxkZXIgIT09ICd1bmRlZmluZWQnID8gTW96QmxvYkJ1aWxkZXIgOiBXZWJLaXRCbG9iQnVpbGRlcjtcbiAgICAgICAgdmFyIGJ1aWxkZXIgPSBuZXcgQnVpbGRlcigpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBidWlsZGVyLmFwcGVuZChwYXJ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1aWxkZXIuZ2V0QmxvYihwcm9wZXJ0aWVzLnR5cGUpO1xuICAgIH1cbn1cblxuLy8gVGhpcyBpcyBDb21tb25KUyBiZWNhdXNlIGxpZSBpcyBhbiBleHRlcm5hbCBkZXBlbmRlbmN5LCBzbyBSb2xsdXBcbi8vIGNhbiBqdXN0IGlnbm9yZSBpdC5cbmlmICh0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBJbiB0aGUgXCJub3Byb21pc2VzXCIgYnVpbGQgdGhpcyB3aWxsIGp1c3QgdGhyb3cgaWYgeW91IGRvbid0IGhhdmVcbiAgICAvLyBhIGdsb2JhbCBwcm9taXNlIG9iamVjdCwgYnV0IGl0IHdvdWxkIHRocm93IGFueXdheSBsYXRlci5cbiAgICBfZGVyZXFfKDMpO1xufVxudmFyIFByb21pc2UkMSA9IFByb21pc2U7XG5cbmZ1bmN0aW9uIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjaykge1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXhlY3V0ZVR3b0NhbGxiYWNrcyhwcm9taXNlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvbWlzZVtcImNhdGNoXCJdKGVycm9yQ2FsbGJhY2spO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplS2V5KGtleSkge1xuICAgIC8vIENhc3QgdGhlIGtleSB0byBhIHN0cmluZywgYXMgdGhhdCdzIGFsbCB3ZSBjYW4gc2V0IGFzIGEga2V5LlxuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zb2xlLndhcm4oa2V5ICsgJyB1c2VkIGFzIGEga2V5LCBidXQgaXQgaXMgbm90IGEgc3RyaW5nLicpO1xuICAgICAgICBrZXkgPSBTdHJpbmcoa2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5O1xufVxuXG5mdW5jdGlvbiBnZXRDYWxsYmFjaygpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAmJiB0eXBlb2YgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICB9XG59XG5cbi8vIFNvbWUgY29kZSBvcmlnaW5hbGx5IGZyb20gYXN5bmNfc3RvcmFnZS5qcyBpblxuLy8gW0dhaWFdKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhLWIyZy9nYWlhKS5cblxudmFyIERFVEVDVF9CTE9CX1NVUFBPUlRfU1RPUkUgPSAnbG9jYWwtZm9yYWdlLWRldGVjdC1ibG9iLXN1cHBvcnQnO1xudmFyIHN1cHBvcnRzQmxvYnMgPSB2b2lkIDA7XG52YXIgZGJDb250ZXh0cyA9IHt9O1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gVHJhbnNhY3Rpb24gTW9kZXNcbnZhciBSRUFEX09OTFkgPSAncmVhZG9ubHknO1xudmFyIFJFQURfV1JJVEUgPSAncmVhZHdyaXRlJztcblxuLy8gVHJhbnNmb3JtIGEgYmluYXJ5IHN0cmluZyB0byBhbiBhcnJheSBidWZmZXIsIGJlY2F1c2Ugb3RoZXJ3aXNlXG4vLyB3ZWlyZCBzdHVmZiBoYXBwZW5zIHdoZW4geW91IHRyeSB0byB3b3JrIHdpdGggdGhlIGJpbmFyeSBzdHJpbmcgZGlyZWN0bHkuXG4vLyBJdCBpcyBrbm93bi5cbi8vIEZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDk2NzY0Ny8gKGNvbnRpbnVlcyBvbiBuZXh0IGxpbmUpXG4vLyBlbmNvZGUtZGVjb2RlLWltYWdlLXdpdGgtYmFzZTY0LWJyZWFrcy1pbWFnZSAoMjAxMy0wNC0yMSlcbmZ1bmN0aW9uIF9iaW5TdHJpbmdUb0FycmF5QnVmZmVyKGJpbikge1xuICAgIHZhciBsZW5ndGggPSBiaW4ubGVuZ3RoO1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIobGVuZ3RoKTtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycltpXSA9IGJpbi5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xufVxuXG4vL1xuLy8gQmxvYnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gYWxsIHZlcnNpb25zIG9mIEluZGV4ZWREQiwgbm90YWJseVxuLy8gQ2hyb21lIDwzNyBhbmQgQW5kcm9pZCA8NS4gSW4gdGhvc2UgdmVyc2lvbnMsIHN0b3JpbmcgYSBibG9iIHdpbGwgdGhyb3cuXG4vL1xuLy8gVmFyaW91cyBvdGhlciBibG9iIGJ1Z3MgZXhpc3QgaW4gQ2hyb21lIHYzNy00MiAoaW5jbHVzaXZlKS5cbi8vIERldGVjdGluZyB0aGVtIGlzIGV4cGVuc2l2ZSBhbmQgY29uZnVzaW5nIHRvIHVzZXJzLCBhbmQgQ2hyb21lIDM3LTQyXG4vLyBpcyBhdCB2ZXJ5IGxvdyB1c2FnZSB3b3JsZHdpZGUsIHNvIHdlIGRvIGEgaGFja3kgdXNlckFnZW50IGNoZWNrIGluc3RlYWQuXG4vL1xuLy8gY29udGVudC10eXBlIGJ1ZzogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQwODEyMFxuLy8gNDA0IGJ1ZzogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ0NzkxNlxuLy8gRmlsZVJlYWRlciBidWc6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NDc4MzZcbi8vXG4vLyBDb2RlIGJvcnJvd2VkIGZyb20gUG91Y2hEQi4gU2VlOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvdWNoZGIvcG91Y2hkYi9ibG9iL21hc3Rlci9wYWNrYWdlcy9ub2RlX21vZHVsZXMvcG91Y2hkYi1hZGFwdGVyLWlkYi9zcmMvYmxvYlN1cHBvcnQuanNcbi8vXG5mdW5jdGlvbiBfY2hlY2tCbG9iU3VwcG9ydFdpdGhvdXRDYWNoaW5nKGlkYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHZhciB0eG4gPSBpZGIudHJhbnNhY3Rpb24oREVURUNUX0JMT0JfU1VQUE9SVF9TVE9SRSwgUkVBRF9XUklURSk7XG4gICAgICAgIHZhciBibG9iID0gY3JlYXRlQmxvYihbJyddKTtcbiAgICAgICAgdHhuLm9iamVjdFN0b3JlKERFVEVDVF9CTE9CX1NVUFBPUlRfU1RPUkUpLnB1dChibG9iLCAna2V5Jyk7XG5cbiAgICAgICAgdHhuLm9uYWJvcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHRyYW5zYWN0aW9uIGFib3J0cyBub3cgaXRzIGR1ZSB0byBub3QgYmVpbmcgYWJsZSB0b1xuICAgICAgICAgICAgLy8gd3JpdGUgdG8gdGhlIGRhdGFiYXNlLCBsaWtlbHkgZHVlIHRvIHRoZSBkaXNrIGJlaW5nIGZ1bGxcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0eG4ub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGVkQ2hyb21lID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlZEVkZ2UgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvLyk7XG4gICAgICAgICAgICAvLyBNUyBFZGdlIHByZXRlbmRzIHRvIGJlIENocm9tZSA0MjpcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaGg4NjkzMDElMjh2PXZzLjg1JTI5LmFzcHhcbiAgICAgICAgICAgIHJlc29sdmUobWF0Y2hlZEVkZ2UgfHwgIW1hdGNoZWRDaHJvbWUgfHwgcGFyc2VJbnQobWF0Y2hlZENocm9tZVsxXSwgMTApID49IDQzKTtcbiAgICAgICAgfTtcbiAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBlcnJvciwgc28gYXNzdW1lIHVuc3VwcG9ydGVkXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9jaGVja0Jsb2JTdXBwb3J0KGlkYikge1xuICAgIGlmICh0eXBlb2Ygc3VwcG9ydHNCbG9icyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlJDEucmVzb2x2ZShzdXBwb3J0c0Jsb2JzKTtcbiAgICB9XG4gICAgcmV0dXJuIF9jaGVja0Jsb2JTdXBwb3J0V2l0aG91dENhY2hpbmcoaWRiKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBzdXBwb3J0c0Jsb2JzID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBzdXBwb3J0c0Jsb2JzO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfZGVmZXJSZWFkaW5lc3MoZGJJbmZvKSB7XG4gICAgdmFyIGRiQ29udGV4dCA9IGRiQ29udGV4dHNbZGJJbmZvLm5hbWVdO1xuXG4gICAgLy8gQ3JlYXRlIGEgZGVmZXJyZWQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBkYXRhYmFzZSBvcGVyYXRpb24uXG4gICAgdmFyIGRlZmVycmVkT3BlcmF0aW9uID0ge307XG5cbiAgICBkZWZlcnJlZE9wZXJhdGlvbi5wcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGRlZmVycmVkT3BlcmF0aW9uLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBkZWZlcnJlZE9wZXJhdGlvbi5yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG5cbiAgICAvLyBFbnF1ZXVlIHRoZSBkZWZlcnJlZCBvcGVyYXRpb24uXG4gICAgZGJDb250ZXh0LmRlZmVycmVkT3BlcmF0aW9ucy5wdXNoKGRlZmVycmVkT3BlcmF0aW9uKTtcblxuICAgIC8vIENoYWluIGl0cyBwcm9taXNlIHRvIHRoZSBkYXRhYmFzZSByZWFkaW5lc3MuXG4gICAgaWYgKCFkYkNvbnRleHQuZGJSZWFkeSkge1xuICAgICAgICBkYkNvbnRleHQuZGJSZWFkeSA9IGRlZmVycmVkT3BlcmF0aW9uLnByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGJDb250ZXh0LmRiUmVhZHkgPSBkYkNvbnRleHQuZGJSZWFkeS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZE9wZXJhdGlvbi5wcm9taXNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9hZHZhbmNlUmVhZGluZXNzKGRiSW5mbykge1xuICAgIHZhciBkYkNvbnRleHQgPSBkYkNvbnRleHRzW2RiSW5mby5uYW1lXTtcblxuICAgIC8vIERlcXVldWUgYSBkZWZlcnJlZCBvcGVyYXRpb24uXG4gICAgdmFyIGRlZmVycmVkT3BlcmF0aW9uID0gZGJDb250ZXh0LmRlZmVycmVkT3BlcmF0aW9ucy5wb3AoKTtcblxuICAgIC8vIFJlc29sdmUgaXRzIHByb21pc2UgKHdoaWNoIGlzIHBhcnQgb2YgdGhlIGRhdGFiYXNlIHJlYWRpbmVzc1xuICAgIC8vIGNoYWluIG9mIHByb21pc2VzKS5cbiAgICBpZiAoZGVmZXJyZWRPcGVyYXRpb24pIHtcbiAgICAgICAgZGVmZXJyZWRPcGVyYXRpb24ucmVzb2x2ZSgpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWRPcGVyYXRpb24ucHJvbWlzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9yZWplY3RSZWFkaW5lc3MoZGJJbmZvLCBlcnIpIHtcbiAgICB2YXIgZGJDb250ZXh0ID0gZGJDb250ZXh0c1tkYkluZm8ubmFtZV07XG5cbiAgICAvLyBEZXF1ZXVlIGEgZGVmZXJyZWQgb3BlcmF0aW9uLlxuICAgIHZhciBkZWZlcnJlZE9wZXJhdGlvbiA9IGRiQ29udGV4dC5kZWZlcnJlZE9wZXJhdGlvbnMucG9wKCk7XG5cbiAgICAvLyBSZWplY3QgaXRzIHByb21pc2UgKHdoaWNoIGlzIHBhcnQgb2YgdGhlIGRhdGFiYXNlIHJlYWRpbmVzc1xuICAgIC8vIGNoYWluIG9mIHByb21pc2VzKS5cbiAgICBpZiAoZGVmZXJyZWRPcGVyYXRpb24pIHtcbiAgICAgICAgZGVmZXJyZWRPcGVyYXRpb24ucmVqZWN0KGVycik7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZE9wZXJhdGlvbi5wcm9taXNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX2dldENvbm5lY3Rpb24oZGJJbmZvLCB1cGdyYWRlTmVlZGVkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBkYkNvbnRleHRzW2RiSW5mby5uYW1lXSA9IGRiQ29udGV4dHNbZGJJbmZvLm5hbWVdIHx8IGNyZWF0ZURiQ29udGV4dCgpO1xuXG4gICAgICAgIGlmIChkYkluZm8uZGIpIHtcbiAgICAgICAgICAgIGlmICh1cGdyYWRlTmVlZGVkKSB7XG4gICAgICAgICAgICAgICAgX2RlZmVyUmVhZGluZXNzKGRiSW5mbyk7XG4gICAgICAgICAgICAgICAgZGJJbmZvLmRiLmNsb3NlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGRiSW5mby5kYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGJBcmdzID0gW2RiSW5mby5uYW1lXTtcblxuICAgICAgICBpZiAodXBncmFkZU5lZWRlZCkge1xuICAgICAgICAgICAgZGJBcmdzLnB1c2goZGJJbmZvLnZlcnNpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wZW5yZXEgPSBpZGIub3Blbi5hcHBseShpZGIsIGRiQXJncyk7XG5cbiAgICAgICAgaWYgKHVwZ3JhZGVOZWVkZWQpIHtcbiAgICAgICAgICAgIG9wZW5yZXEub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGIgPSBvcGVucmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShkYkluZm8uc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUub2xkVmVyc2lvbiA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGRlZCB3aGVuIHN1cHBvcnQgZm9yIGJsb2Igc2hpbXMgd2FzIGFkZGVkXG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5jcmVhdGVPYmplY3RTdG9yZShERVRFQ1RfQkxPQl9TVVBQT1JUX1NUT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleC5uYW1lID09PSAnQ29uc3RyYWludEVycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgZGF0YWJhc2UgXCInICsgZGJJbmZvLm5hbWUgKyAnXCInICsgJyBoYXMgYmVlbiB1cGdyYWRlZCBmcm9tIHZlcnNpb24gJyArIGUub2xkVmVyc2lvbiArICcgdG8gdmVyc2lvbiAnICsgZS5uZXdWZXJzaW9uICsgJywgYnV0IHRoZSBzdG9yYWdlIFwiJyArIGRiSW5mby5zdG9yZU5hbWUgKyAnXCIgYWxyZWFkeSBleGlzdHMuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBvcGVucmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmVqZWN0KG9wZW5yZXEuZXJyb3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG9wZW5yZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzb2x2ZShvcGVucmVxLnJlc3VsdCk7XG4gICAgICAgICAgICBfYWR2YW5jZVJlYWRpbmVzcyhkYkluZm8pO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfZ2V0T3JpZ2luYWxDb25uZWN0aW9uKGRiSW5mbykge1xuICAgIHJldHVybiBfZ2V0Q29ubmVjdGlvbihkYkluZm8sIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gX2dldFVwZ3JhZGVkQ29ubmVjdGlvbihkYkluZm8pIHtcbiAgICByZXR1cm4gX2dldENvbm5lY3Rpb24oZGJJbmZvLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gX2lzVXBncmFkZU5lZWRlZChkYkluZm8sIGRlZmF1bHRWZXJzaW9uKSB7XG4gICAgaWYgKCFkYkluZm8uZGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGlzTmV3U3RvcmUgPSAhZGJJbmZvLmRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoZGJJbmZvLnN0b3JlTmFtZSk7XG4gICAgdmFyIGlzRG93bmdyYWRlID0gZGJJbmZvLnZlcnNpb24gPCBkYkluZm8uZGIudmVyc2lvbjtcbiAgICB2YXIgaXNVcGdyYWRlID0gZGJJbmZvLnZlcnNpb24gPiBkYkluZm8uZGIudmVyc2lvbjtcblxuICAgIGlmIChpc0Rvd25ncmFkZSkge1xuICAgICAgICAvLyBJZiB0aGUgdmVyc2lvbiBpcyBub3QgdGhlIGRlZmF1bHQgb25lXG4gICAgICAgIC8vIHRoZW4gd2FybiBmb3IgaW1wb3NzaWJsZSBkb3duZ3JhZGUuXG4gICAgICAgIGlmIChkYkluZm8udmVyc2lvbiAhPT0gZGVmYXVsdFZlcnNpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVGhlIGRhdGFiYXNlIFwiJyArIGRiSW5mby5uYW1lICsgJ1wiJyArIFwiIGNhbid0IGJlIGRvd25ncmFkZWQgZnJvbSB2ZXJzaW9uIFwiICsgZGJJbmZvLmRiLnZlcnNpb24gKyAnIHRvIHZlcnNpb24gJyArIGRiSW5mby52ZXJzaW9uICsgJy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBbGlnbiB0aGUgdmVyc2lvbnMgdG8gcHJldmVudCBlcnJvcnMuXG4gICAgICAgIGRiSW5mby52ZXJzaW9uID0gZGJJbmZvLmRiLnZlcnNpb247XG4gICAgfVxuXG4gICAgaWYgKGlzVXBncmFkZSB8fCBpc05ld1N0b3JlKSB7XG4gICAgICAgIC8vIElmIHRoZSBzdG9yZSBpcyBuZXcgdGhlbiBpbmNyZW1lbnQgdGhlIHZlcnNpb24gKGlmIG5lZWRlZCkuXG4gICAgICAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIGFuIFwidXBncmFkZW5lZWRlZFwiIGV2ZW50IHdoaWNoIGlzIHJlcXVpcmVkXG4gICAgICAgIC8vIGZvciBjcmVhdGluZyBhIHN0b3JlLlxuICAgICAgICBpZiAoaXNOZXdTdG9yZSkge1xuICAgICAgICAgICAgdmFyIGluY1ZlcnNpb24gPSBkYkluZm8uZGIudmVyc2lvbiArIDE7XG4gICAgICAgICAgICBpZiAoaW5jVmVyc2lvbiA+IGRiSW5mby52ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgZGJJbmZvLnZlcnNpb24gPSBpbmNWZXJzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBlbmNvZGUgYSBibG9iIGZvciBpbmRleGVkZGIgZW5naW5lcyB0aGF0IGRvbid0IHN1cHBvcnQgYmxvYnNcbmZ1bmN0aW9uIF9lbmNvZGVCbG9iKGJsb2IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgYmFzZTY0ID0gYnRvYShlLnRhcmdldC5yZXN1bHQgfHwgJycpO1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgX19sb2NhbF9mb3JhZ2VfZW5jb2RlZF9ibG9iOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGE6IGJhc2U2NCxcbiAgICAgICAgICAgICAgICB0eXBlOiBibG9iLnR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzQmluYXJ5U3RyaW5nKGJsb2IpO1xuICAgIH0pO1xufVxuXG4vLyBkZWNvZGUgYW4gZW5jb2RlZCBibG9iXG5mdW5jdGlvbiBfZGVjb2RlQmxvYihlbmNvZGVkQmxvYikge1xuICAgIHZhciBhcnJheUJ1ZmYgPSBfYmluU3RyaW5nVG9BcnJheUJ1ZmZlcihhdG9iKGVuY29kZWRCbG9iLmRhdGEpKTtcbiAgICByZXR1cm4gY3JlYXRlQmxvYihbYXJyYXlCdWZmXSwgeyB0eXBlOiBlbmNvZGVkQmxvYi50eXBlIH0pO1xufVxuXG4vLyBpcyB0aGlzIG9uZSBvZiBvdXIgZmFuY3kgZW5jb2RlZCBibG9icz9cbmZ1bmN0aW9uIF9pc0VuY29kZWRCbG9iKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLl9fbG9jYWxfZm9yYWdlX2VuY29kZWRfYmxvYjtcbn1cblxuLy8gU3BlY2lhbGl6ZSB0aGUgZGVmYXVsdCBgcmVhZHkoKWAgZnVuY3Rpb24gYnkgbWFraW5nIGl0IGRlcGVuZGVudFxuLy8gb24gdGhlIGN1cnJlbnQgZGF0YWJhc2Ugb3BlcmF0aW9ucy4gVGh1cywgdGhlIGRyaXZlciB3aWxsIGJlIGFjdHVhbGx5XG4vLyByZWFkeSB3aGVuIGl0J3MgYmVlbiBpbml0aWFsaXplZCAoZGVmYXVsdCkgKmFuZCogdGhlcmUgYXJlIG5vIHBlbmRpbmdcbi8vIG9wZXJhdGlvbnMgb24gdGhlIGRhdGFiYXNlIChpbml0aWF0ZWQgYnkgc29tZSBvdGhlciBpbnN0YW5jZXMpLlxuZnVuY3Rpb24gX2Z1bGx5UmVhZHkoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IHNlbGYuX2luaXRSZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGJDb250ZXh0ID0gZGJDb250ZXh0c1tzZWxmLl9kYkluZm8ubmFtZV07XG5cbiAgICAgICAgaWYgKGRiQ29udGV4dCAmJiBkYkNvbnRleHQuZGJSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuIGRiQ29udGV4dC5kYlJlYWR5O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleGVjdXRlVHdvQ2FsbGJhY2tzKHByb21pc2UsIGNhbGxiYWNrLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIFRyeSB0byBlc3RhYmxpc2ggYSBuZXcgZGIgY29ubmVjdGlvbiB0byByZXBsYWNlIHRoZVxuLy8gY3VycmVudCBvbmUgd2hpY2ggaXMgYnJva2VuIChpLmUuIGV4cGVyaWVuY2luZ1xuLy8gSW52YWxpZFN0YXRlRXJyb3Igd2hpbGUgY3JlYXRpbmcgYSB0cmFuc2FjdGlvbikuXG5mdW5jdGlvbiBfdHJ5UmVjb25uZWN0KGRiSW5mbykge1xuICAgIF9kZWZlclJlYWRpbmVzcyhkYkluZm8pO1xuXG4gICAgdmFyIGRiQ29udGV4dCA9IGRiQ29udGV4dHNbZGJJbmZvLm5hbWVdO1xuICAgIHZhciBmb3JhZ2VzID0gZGJDb250ZXh0LmZvcmFnZXM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcmFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZvcmFnZSA9IGZvcmFnZXNbaV07XG4gICAgICAgIGlmIChmb3JhZ2UuX2RiSW5mby5kYikge1xuICAgICAgICAgICAgZm9yYWdlLl9kYkluZm8uZGIuY2xvc2UoKTtcbiAgICAgICAgICAgIGZvcmFnZS5fZGJJbmZvLmRiID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkYkluZm8uZGIgPSBudWxsO1xuXG4gICAgcmV0dXJuIF9nZXRPcmlnaW5hbENvbm5lY3Rpb24oZGJJbmZvKS50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgICAgICBkYkluZm8uZGIgPSBkYjtcbiAgICAgICAgaWYgKF9pc1VwZ3JhZGVOZWVkZWQoZGJJbmZvKSkge1xuICAgICAgICAgICAgLy8gUmVvcGVuIHRoZSBkYXRhYmFzZSBmb3IgdXBncmFkaW5nLlxuICAgICAgICAgICAgcmV0dXJuIF9nZXRVcGdyYWRlZENvbm5lY3Rpb24oZGJJbmZvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGI7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICAgICAgLy8gc3RvcmUgdGhlIGxhdGVzdCBkYiByZWZlcmVuY2VcbiAgICAgICAgLy8gaW4gY2FzZSB0aGUgZGIgd2FzIHVwZ3JhZGVkXG4gICAgICAgIGRiSW5mby5kYiA9IGRiQ29udGV4dC5kYiA9IGRiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcmFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvcmFnZXNbaV0uX2RiSW5mby5kYiA9IGRiO1xuICAgICAgICB9XG4gICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIF9yZWplY3RSZWFkaW5lc3MoZGJJbmZvLCBlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG59XG5cbi8vIEZGIGRvZXNuJ3QgbGlrZSBQcm9taXNlcyAobWljcm8tdGFza3MpIGFuZCBJRERCIHN0b3JlIG9wZXJhdGlvbnMsXG4vLyBzbyB3ZSBoYXZlIHRvIGRvIGl0IHdpdGggY2FsbGJhY2tzXG5mdW5jdGlvbiBjcmVhdGVUcmFuc2FjdGlvbihkYkluZm8sIG1vZGUsIGNhbGxiYWNrLCByZXRyaWVzKSB7XG4gICAgaWYgKHJldHJpZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXRyaWVzID0gMTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICB2YXIgdHggPSBkYkluZm8uZGIudHJhbnNhY3Rpb24oZGJJbmZvLnN0b3JlTmFtZSwgbW9kZSk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHR4KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKHJldHJpZXMgPiAwICYmICghZGJJbmZvLmRiIHx8IGVyci5uYW1lID09PSAnSW52YWxpZFN0YXRlRXJyb3InIHx8IGVyci5uYW1lID09PSAnTm90Rm91bmRFcnJvcicpKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZSQxLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRiSW5mby5kYiB8fCBlcnIubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InICYmICFkYkluZm8uZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhkYkluZm8uc3RvcmVOYW1lKSAmJiBkYkluZm8udmVyc2lvbiA8PSBkYkluZm8uZGIudmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgZGIgdmVyc2lvbiwgdG8gY3JlYXRlIHRoZSBuZXcgT2JqZWN0U3RvcmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRiSW5mby5kYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGJJbmZvLnZlcnNpb24gPSBkYkluZm8uZGIudmVyc2lvbiArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVvcGVuIHRoZSBkYXRhYmFzZSBmb3IgdXBncmFkaW5nLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2dldFVwZ3JhZGVkQ29ubmVjdGlvbihkYkluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdHJ5UmVjb25uZWN0KGRiSW5mbykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRyYW5zYWN0aW9uKGRiSW5mbywgbW9kZSwgY2FsbGJhY2ssIHJldHJpZXMgLSAxKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURiQ29udGV4dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAvLyBSdW5uaW5nIGxvY2FsRm9yYWdlcyBzaGFyaW5nIGEgZGF0YWJhc2UuXG4gICAgICAgIGZvcmFnZXM6IFtdLFxuICAgICAgICAvLyBTaGFyZWQgZGF0YWJhc2UuXG4gICAgICAgIGRiOiBudWxsLFxuICAgICAgICAvLyBEYXRhYmFzZSByZWFkaW5lc3MgKHByb21pc2UpLlxuICAgICAgICBkYlJlYWR5OiBudWxsLFxuICAgICAgICAvLyBEZWZlcnJlZCBvcGVyYXRpb25zIG9uIHRoZSBkYXRhYmFzZS5cbiAgICAgICAgZGVmZXJyZWRPcGVyYXRpb25zOiBbXVxuICAgIH07XG59XG5cbi8vIE9wZW4gdGhlIEluZGV4ZWREQiBkYXRhYmFzZSAoYXV0b21hdGljYWxseSBjcmVhdGVzIG9uZSBpZiBvbmUgZGlkbid0XG4vLyBwcmV2aW91c2x5IGV4aXN0KSwgdXNpbmcgYW55IG9wdGlvbnMgc2V0IGluIHRoZSBjb25maWcuXG5mdW5jdGlvbiBfaW5pdFN0b3JhZ2Uob3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZGJJbmZvID0ge1xuICAgICAgICBkYjogbnVsbFxuICAgIH07XG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGRiSW5mb1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgY29udGV4dCBvZiB0aGUgZGF0YWJhc2U7XG4gICAgdmFyIGRiQ29udGV4dCA9IGRiQ29udGV4dHNbZGJJbmZvLm5hbWVdO1xuXG4gICAgLy8gLi4ub3IgY3JlYXRlIGEgbmV3IGNvbnRleHQuXG4gICAgaWYgKCFkYkNvbnRleHQpIHtcbiAgICAgICAgZGJDb250ZXh0ID0gY3JlYXRlRGJDb250ZXh0KCk7XG4gICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBuZXcgY29udGV4dCBpbiB0aGUgZ2xvYmFsIGNvbnRhaW5lci5cbiAgICAgICAgZGJDb250ZXh0c1tkYkluZm8ubmFtZV0gPSBkYkNvbnRleHQ7XG4gICAgfVxuXG4gICAgLy8gUmVnaXN0ZXIgaXRzZWxmIGFzIGEgcnVubmluZyBsb2NhbEZvcmFnZSBpbiB0aGUgY3VycmVudCBjb250ZXh0LlxuICAgIGRiQ29udGV4dC5mb3JhZ2VzLnB1c2goc2VsZik7XG5cbiAgICAvLyBSZXBsYWNlIHRoZSBkZWZhdWx0IGByZWFkeSgpYCBmdW5jdGlvbiB3aXRoIHRoZSBzcGVjaWFsaXplZCBvbmUuXG4gICAgaWYgKCFzZWxmLl9pbml0UmVhZHkpIHtcbiAgICAgICAgc2VsZi5faW5pdFJlYWR5ID0gc2VsZi5yZWFkeTtcbiAgICAgICAgc2VsZi5yZWFkeSA9IF9mdWxseVJlYWR5O1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhbiBhcnJheSBvZiBpbml0aWFsaXphdGlvbiBzdGF0ZXMgb2YgdGhlIHJlbGF0ZWQgbG9jYWxGb3JhZ2VzLlxuICAgIHZhciBpbml0UHJvbWlzZXMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGlnbm9yZUVycm9ycygpIHtcbiAgICAgICAgLy8gRG9uJ3QgaGFuZGxlIGVycm9ycyBoZXJlLFxuICAgICAgICAvLyBqdXN0IG1ha2VzIHN1cmUgcmVsYXRlZCBsb2NhbEZvcmFnZXMgYXJlbid0IHBlbmRpbmcuXG4gICAgICAgIHJldHVybiBQcm9taXNlJDEucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGJDb250ZXh0LmZvcmFnZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIGZvcmFnZSA9IGRiQ29udGV4dC5mb3JhZ2VzW2pdO1xuICAgICAgICBpZiAoZm9yYWdlICE9PSBzZWxmKSB7XG4gICAgICAgICAgICAvLyBEb24ndCB3YWl0IGZvciBpdHNlbGYuLi5cbiAgICAgICAgICAgIGluaXRQcm9taXNlcy5wdXNoKGZvcmFnZS5faW5pdFJlYWR5KClbXCJjYXRjaFwiXShpZ25vcmVFcnJvcnMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRha2UgYSBzbmFwc2hvdCBvZiB0aGUgcmVsYXRlZCBsb2NhbEZvcmFnZXMuXG4gICAgdmFyIGZvcmFnZXMgPSBkYkNvbnRleHQuZm9yYWdlcy5zbGljZSgwKTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGNvbm5lY3Rpb24gcHJvY2VzcyBvbmx5IHdoZW5cbiAgICAvLyBhbGwgdGhlIHJlbGF0ZWQgbG9jYWxGb3JhZ2VzIGFyZW4ndCBwZW5kaW5nLlxuICAgIHJldHVybiBQcm9taXNlJDEuYWxsKGluaXRQcm9taXNlcykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRiSW5mby5kYiA9IGRiQ29udGV4dC5kYjtcbiAgICAgICAgLy8gR2V0IHRoZSBjb25uZWN0aW9uIG9yIG9wZW4gYSBuZXcgb25lIHdpdGhvdXQgdXBncmFkZS5cbiAgICAgICAgcmV0dXJuIF9nZXRPcmlnaW5hbENvbm5lY3Rpb24oZGJJbmZvKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgICAgICBkYkluZm8uZGIgPSBkYjtcbiAgICAgICAgaWYgKF9pc1VwZ3JhZGVOZWVkZWQoZGJJbmZvLCBzZWxmLl9kZWZhdWx0Q29uZmlnLnZlcnNpb24pKSB7XG4gICAgICAgICAgICAvLyBSZW9wZW4gdGhlIGRhdGFiYXNlIGZvciB1cGdyYWRpbmcuXG4gICAgICAgICAgICByZXR1cm4gX2dldFVwZ3JhZGVkQ29ubmVjdGlvbihkYkluZm8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYjtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgICAgICBkYkluZm8uZGIgPSBkYkNvbnRleHQuZGIgPSBkYjtcbiAgICAgICAgc2VsZi5fZGJJbmZvID0gZGJJbmZvO1xuICAgICAgICAvLyBTaGFyZSB0aGUgZmluYWwgY29ubmVjdGlvbiBhbW9uZ3N0IHJlbGF0ZWQgbG9jYWxGb3JhZ2VzLlxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGZvcmFnZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIHZhciBmb3JhZ2UgPSBmb3JhZ2VzW2tdO1xuICAgICAgICAgICAgaWYgKGZvcmFnZSAhPT0gc2VsZikge1xuICAgICAgICAgICAgICAgIC8vIFNlbGYgaXMgYWxyZWFkeSB1cC10by1kYXRlLlxuICAgICAgICAgICAgICAgIGZvcmFnZS5fZGJJbmZvLmRiID0gZGJJbmZvLmRiO1xuICAgICAgICAgICAgICAgIGZvcmFnZS5fZGJJbmZvLnZlcnNpb24gPSBkYkluZm8udmVyc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtKGtleSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBrZXkgPSBub3JtYWxpemVLZXkoa2V5KTtcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNyZWF0ZVRyYW5zYWN0aW9uKHNlbGYuX2RiSW5mbywgUkVBRF9PTkxZLCBmdW5jdGlvbiAoZXJyLCB0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuX2RiSW5mby5zdG9yZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gc3RvcmUuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlcS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaXNFbmNvZGVkQmxvYih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF9kZWNvZGVCbG9iKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIEl0ZXJhdGUgb3ZlciBhbGwgaXRlbXMgc3RvcmVkIGluIGRhdGFiYXNlLlxuZnVuY3Rpb24gaXRlcmF0ZShpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjcmVhdGVUcmFuc2FjdGlvbihzZWxmLl9kYkluZm8sIFJFQURfT05MWSwgZnVuY3Rpb24gKGVyciwgdHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzZWxmLl9kYkluZm8uc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZXJhdGlvbk51bWJlciA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJzb3IgPSByZXEucmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaXNFbmNvZGVkQmxvYih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfZGVjb2RlQmxvYih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpdGVyYXRvcih2YWx1ZSwgY3Vyc29yLmtleSwgaXRlcmF0aW9uTnVtYmVyKyspO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgaXRlcmF0b3IgY2FsbGJhY2sgcmV0dW5zIGFueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIChub24tYHVuZGVmaW5lZGApIHZhbHVlLCB0aGVuIHdlIHN0b3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgaXRlcmF0aW9uIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JbXCJjb250aW51ZVwiXSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gc2V0SXRlbShrZXksIHZhbHVlLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGtleSA9IG5vcm1hbGl6ZUtleShrZXkpO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGRiSW5mbztcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBCbG9iXScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NoZWNrQmxvYlN1cHBvcnQoZGJJbmZvLmRiKS50aGVuKGZ1bmN0aW9uIChibG9iU3VwcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmxvYlN1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VuY29kZUJsb2IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgY3JlYXRlVHJhbnNhY3Rpb24oc2VsZi5fZGJJbmZvLCBSRUFEX1dSSVRFLCBmdW5jdGlvbiAoZXJyLCB0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuX2RiSW5mby5zdG9yZU5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSByZWFzb24gd2UgZG9uJ3QgX3NhdmVfIG51bGwgaXMgYmVjYXVzZSBJRSAxMCBkb2VzXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBzdXBwb3J0IHNhdmluZyB0aGUgYG51bGxgIHR5cGUgaW4gSW5kZXhlZERCLiBIb3dcbiAgICAgICAgICAgICAgICAgICAgLy8gaXJvbmljLCBnaXZlbiB0aGUgYnVnIGJlbG93IVxuICAgICAgICAgICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL2xvY2FsRm9yYWdlL2lzc3Vlcy8xNjFcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBzdG9yZS5wdXQodmFsdWUsIGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhc3QgdG8gdW5kZWZpbmVkIHNvIHRoZSB2YWx1ZSBwYXNzZWQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrL3Byb21pc2UgaXMgdGhlIHNhbWUgYXMgd2hhdCBvbmUgd291bGQgZ2V0IG91dFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgYGdldEl0ZW0oKWAgbGF0ZXIuIFRoaXMgbGVhZHMgdG8gc29tZSB3ZWlyZG5lc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIChzZXRJdGVtKCdmb28nLCB1bmRlZmluZWQpIHdpbGwgcmV0dXJuIGBudWxsYCksIGJ1dFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBub3QgbXkgZmF1bHQgbG9jYWxTdG9yYWdlIGlzIG91ciBiYXNlbGluZSBhbmQgdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQncyB3ZWlyZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25hYm9ydCA9IHRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gcmVxLmVycm9yID8gcmVxLmVycm9yIDogcmVxLnRyYW5zYWN0aW9uLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0oa2V5LCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGtleSA9IG5vcm1hbGl6ZUtleShrZXkpO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3JlYXRlVHJhbnNhY3Rpb24oc2VsZi5fZGJJbmZvLCBSRUFEX1dSSVRFLCBmdW5jdGlvbiAoZXJyLCB0cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuX2RiSW5mby5zdG9yZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSB1c2UgYSBHcnVudCB0YXNrIHRvIG1ha2UgdGhpcyBzYWZlIGZvciBJRSBhbmQgc29tZVxuICAgICAgICAgICAgICAgICAgICAvLyB2ZXJzaW9ucyBvZiBBbmRyb2lkIChpbmNsdWRpbmcgdGhvc2UgdXNlZCBieSBDb3Jkb3ZhKS5cbiAgICAgICAgICAgICAgICAgICAgLy8gTm9ybWFsbHkgSUUgd29uJ3QgbGlrZSBgLmRlbGV0ZSgpYCBhbmQgd2lsbCBpbnNpc3Qgb25cbiAgICAgICAgICAgICAgICAgICAgLy8gdXNpbmcgYFsnZGVsZXRlJ10oKWAsIGJ1dCB3ZSBoYXZlIGEgYnVpbGQgc3RlcCB0aGF0XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpeGVzIHRoaXMgZm9yIHVzIG5vdy5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHN0b3JlW1wiZGVsZXRlXCJdKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXEuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSByZXF1ZXN0IHdpbGwgYmUgYWxzbyBiZSBhYm9ydGVkIGlmIHdlJ3ZlIGV4Y2VlZGVkIG91ciBzdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwYWNlLlxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IHJlcS5lcnJvciA/IHJlcS5lcnJvciA6IHJlcS50cmFuc2FjdGlvbi5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBjbGVhcihjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNyZWF0ZVRyYW5zYWN0aW9uKHNlbGYuX2RiSW5mbywgUkVBRF9XUklURSwgZnVuY3Rpb24gKGVyciwgdHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzZWxmLl9kYkluZm8uc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHN0b3JlLmNsZWFyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmFib3J0ID0gdHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSByZXEuZXJyb3IgPyByZXEuZXJyb3IgOiByZXEudHJhbnNhY3Rpb24uZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gbGVuZ3RoKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3JlYXRlVHJhbnNhY3Rpb24oc2VsZi5fZGJJbmZvLCBSRUFEX09OTFksIGZ1bmN0aW9uIChlcnIsIHRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc2VsZi5fZGJJbmZvLnN0b3JlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBzdG9yZS5jb3VudCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIGtleShuLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChuIDwgMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY3JlYXRlVHJhbnNhY3Rpb24oc2VsZi5fZGJJbmZvLCBSRUFEX09OTFksIGZ1bmN0aW9uIChlcnIsIHRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc2VsZi5fZGJJbmZvLnN0b3JlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZHZhbmNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gc3RvcmUub3BlbkN1cnNvcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Vyc29yID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBtZWFucyB0aGVyZSB3ZXJlbid0IGVub3VnaCBrZXlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRoZSBmaXJzdCBrZXksIHJldHVybiBpdCBpZiB0aGF0J3Mgd2hhdCB0aGV5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2FudGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3Vyc29yLmtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWR2YW5jZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhc2sgdGhlIGN1cnNvciB0byBza2lwIGFoZWFkIG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVjb3Jkcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuYWR2YW5jZShuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHdlIGdldCBoZXJlLCB3ZSd2ZSBnb3QgdGhlIG50aCBrZXkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3Vyc29yLmtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcS5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIGtleXMoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjcmVhdGVUcmFuc2FjdGlvbihzZWxmLl9kYkluZm8sIFJFQURfT05MWSwgZnVuY3Rpb24gKGVyciwgdHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzZWxmLl9kYkluZm8uc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHN0b3JlLm9wZW5DdXJzb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnNvciA9IHJlcS5yZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShrZXlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChjdXJzb3Iua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcltcImNvbnRpbnVlXCJdKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVxLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gZHJvcEluc3RhbmNlKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sgPSBnZXRDYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGN1cnJlbnRDb25maWcgPSB0aGlzLmNvbmZpZygpO1xuICAgIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyAhPT0gJ2Z1bmN0aW9uJyAmJiBvcHRpb25zIHx8IHt9O1xuICAgIGlmICghb3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBjdXJyZW50Q29uZmlnLm5hbWU7XG4gICAgICAgIG9wdGlvbnMuc3RvcmVOYW1lID0gb3B0aW9ucy5zdG9yZU5hbWUgfHwgY3VycmVudENvbmZpZy5zdG9yZU5hbWU7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwcm9taXNlO1xuICAgIGlmICghb3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlJDEucmVqZWN0KCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpc0N1cnJlbnREYiA9IG9wdGlvbnMubmFtZSA9PT0gY3VycmVudENvbmZpZy5uYW1lICYmIHNlbGYuX2RiSW5mby5kYjtcblxuICAgICAgICB2YXIgZGJQcm9taXNlID0gaXNDdXJyZW50RGIgPyBQcm9taXNlJDEucmVzb2x2ZShzZWxmLl9kYkluZm8uZGIpIDogX2dldE9yaWdpbmFsQ29ubmVjdGlvbihvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChkYikge1xuICAgICAgICAgICAgdmFyIGRiQ29udGV4dCA9IGRiQ29udGV4dHNbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgICAgIHZhciBmb3JhZ2VzID0gZGJDb250ZXh0LmZvcmFnZXM7XG4gICAgICAgICAgICBkYkNvbnRleHQuZGIgPSBkYjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9yYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvcmFnZXNbaV0uX2RiSW5mby5kYiA9IGRiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRiO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMuc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gZGJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgICAgICAgICAgX2RlZmVyUmVhZGluZXNzKG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRiQ29udGV4dCA9IGRiQ29udGV4dHNbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgICAgICAgICB2YXIgZm9yYWdlcyA9IGRiQ29udGV4dC5mb3JhZ2VzO1xuXG4gICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcmFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcmFnZSA9IGZvcmFnZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvcmFnZS5fZGJJbmZvLmRiID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZHJvcERCUHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gaWRiLmRlbGV0ZURhdGFiYXNlKG9wdGlvbnMubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSByZXEub25ibG9ja2VkID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRiID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRiID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRiKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkcm9wREJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRiQ29udGV4dC5kYiA9IGRiO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcmFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZm9yYWdlID0gZm9yYWdlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hZHZhbmNlUmVhZGluZXNzKF9mb3JhZ2UuX2RiSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9yZWplY3RSZWFkaW5lc3Mob3B0aW9ucywgZXJyKSB8fCBQcm9taXNlJDEucmVzb2x2ZSgpKVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlID0gZGJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKG9wdGlvbnMuc3RvcmVOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZlcnNpb24gPSBkYi52ZXJzaW9uICsgMTtcblxuICAgICAgICAgICAgICAgIF9kZWZlclJlYWRpbmVzcyhvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHZhciBkYkNvbnRleHQgPSBkYkNvbnRleHRzW29wdGlvbnMubmFtZV07XG4gICAgICAgICAgICAgICAgdmFyIGZvcmFnZXMgPSBkYkNvbnRleHQuZm9yYWdlcztcblxuICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmb3JhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JhZ2UgPSBmb3JhZ2VzW2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3JhZ2UuX2RiSW5mby5kYiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGZvcmFnZS5fZGJJbmZvLnZlcnNpb24gPSBuZXdWZXJzaW9uO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBkcm9wT2JqZWN0UHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gaWRiLm9wZW4ob3B0aW9ucy5uYW1lLCBuZXdWZXJzaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYiA9IHJlcS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYiA9IHJlcS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5kZWxldGVPYmplY3RTdG9yZShvcHRpb25zLnN0b3JlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYiA9IHJlcS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZHJvcE9iamVjdFByb21pc2UudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGJDb250ZXh0LmRiID0gZGI7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZm9yYWdlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9mb3JhZ2UyID0gZm9yYWdlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mb3JhZ2UyLl9kYkluZm8uZGIgPSBkYjtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hZHZhbmNlUmVhZGluZXNzKF9mb3JhZ2UyLl9kYkluZm8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIChfcmVqZWN0UmVhZGluZXNzKG9wdGlvbnMsIGVycikgfHwgUHJvbWlzZSQxLnJlc29sdmUoKSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxudmFyIGFzeW5jU3RvcmFnZSA9IHtcbiAgICBfZHJpdmVyOiAnYXN5bmNTdG9yYWdlJyxcbiAgICBfaW5pdFN0b3JhZ2U6IF9pbml0U3RvcmFnZSxcbiAgICBfc3VwcG9ydDogaXNJbmRleGVkREJWYWxpZCgpLFxuICAgIGl0ZXJhdGU6IGl0ZXJhdGUsXG4gICAgZ2V0SXRlbTogZ2V0SXRlbSxcbiAgICBzZXRJdGVtOiBzZXRJdGVtLFxuICAgIHJlbW92ZUl0ZW06IHJlbW92ZUl0ZW0sXG4gICAgY2xlYXI6IGNsZWFyLFxuICAgIGxlbmd0aDogbGVuZ3RoLFxuICAgIGtleToga2V5LFxuICAgIGtleXM6IGtleXMsXG4gICAgZHJvcEluc3RhbmNlOiBkcm9wSW5zdGFuY2Vcbn07XG5cbmZ1bmN0aW9uIGlzV2ViU1FMVmFsaWQoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvcGVuRGF0YWJhc2UgPT09ICdmdW5jdGlvbic7XG59XG5cbi8vIFNhZGx5LCB0aGUgYmVzdCB3YXkgdG8gc2F2ZSBiaW5hcnkgZGF0YSBpbiBXZWJTUUwvbG9jYWxTdG9yYWdlIGlzIHNlcmlhbGl6aW5nXG4vLyBpdCB0byBCYXNlNjQsIHNvIHRoaXMgaXMgaG93IHdlIHN0b3JlIGl0IHRvIHByZXZlbnQgdmVyeSBzdHJhbmdlIGVycm9ycyB3aXRoIGxlc3Ncbi8vIHZlcmJvc2Ugd2F5cyBvZiBiaW5hcnkgPC0+IHN0cmluZyBkYXRhIHN0b3JhZ2UuXG52YXIgQkFTRV9DSEFSUyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxudmFyIEJMT0JfVFlQRV9QUkVGSVggPSAnfn5sb2NhbF9mb3JhZ2VfdHlwZX4nO1xudmFyIEJMT0JfVFlQRV9QUkVGSVhfUkVHRVggPSAvXn5+bG9jYWxfZm9yYWdlX3R5cGV+KFtefl0rKX4vO1xuXG52YXIgU0VSSUFMSVpFRF9NQVJLRVIgPSAnX19sZnNjX186JztcbnZhciBTRVJJQUxJWkVEX01BUktFUl9MRU5HVEggPSBTRVJJQUxJWkVEX01BUktFUi5sZW5ndGg7XG5cbi8vIE9NRyB0aGUgc2VyaWFsaXphdGlvbnMhXG52YXIgVFlQRV9BUlJBWUJVRkZFUiA9ICdhcmJmJztcbnZhciBUWVBFX0JMT0IgPSAnYmxvYic7XG52YXIgVFlQRV9JTlQ4QVJSQVkgPSAnc2kwOCc7XG52YXIgVFlQRV9VSU5UOEFSUkFZID0gJ3VpMDgnO1xudmFyIFRZUEVfVUlOVDhDTEFNUEVEQVJSQVkgPSAndWljOCc7XG52YXIgVFlQRV9JTlQxNkFSUkFZID0gJ3NpMTYnO1xudmFyIFRZUEVfSU5UMzJBUlJBWSA9ICdzaTMyJztcbnZhciBUWVBFX1VJTlQxNkFSUkFZID0gJ3VyMTYnO1xudmFyIFRZUEVfVUlOVDMyQVJSQVkgPSAndWkzMic7XG52YXIgVFlQRV9GTE9BVDMyQVJSQVkgPSAnZmwzMic7XG52YXIgVFlQRV9GTE9BVDY0QVJSQVkgPSAnZmw2NCc7XG52YXIgVFlQRV9TRVJJQUxJWkVEX01BUktFUl9MRU5HVEggPSBTRVJJQUxJWkVEX01BUktFUl9MRU5HVEggKyBUWVBFX0FSUkFZQlVGRkVSLmxlbmd0aDtcblxudmFyIHRvU3RyaW5nJDEgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiBzdHJpbmdUb0J1ZmZlcihzZXJpYWxpemVkU3RyaW5nKSB7XG4gICAgLy8gRmlsbCB0aGUgc3RyaW5nIGludG8gYSBBcnJheUJ1ZmZlci5cbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gc2VyaWFsaXplZFN0cmluZy5sZW5ndGggKiAwLjc1O1xuICAgIHZhciBsZW4gPSBzZXJpYWxpemVkU3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgaTtcbiAgICB2YXIgcCA9IDA7XG4gICAgdmFyIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuXG4gICAgaWYgKHNlcmlhbGl6ZWRTdHJpbmdbc2VyaWFsaXplZFN0cmluZy5sZW5ndGggLSAxXSA9PT0gJz0nKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICBpZiAoc2VyaWFsaXplZFN0cmluZ1tzZXJpYWxpemVkU3RyaW5nLmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpO1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgZW5jb2RlZDEgPSBCQVNFX0NIQVJTLmluZGV4T2Yoc2VyaWFsaXplZFN0cmluZ1tpXSk7XG4gICAgICAgIGVuY29kZWQyID0gQkFTRV9DSEFSUy5pbmRleE9mKHNlcmlhbGl6ZWRTdHJpbmdbaSArIDFdKTtcbiAgICAgICAgZW5jb2RlZDMgPSBCQVNFX0NIQVJTLmluZGV4T2Yoc2VyaWFsaXplZFN0cmluZ1tpICsgMl0pO1xuICAgICAgICBlbmNvZGVkNCA9IEJBU0VfQ0hBUlMuaW5kZXhPZihzZXJpYWxpemVkU3RyaW5nW2kgKyAzXSk7XG5cbiAgICAgICAgLypqc2xpbnQgYml0d2lzZTogdHJ1ZSAqL1xuICAgICAgICBieXRlc1twKytdID0gZW5jb2RlZDEgPDwgMiB8IGVuY29kZWQyID4+IDQ7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDIgJiAxNSkgPDwgNCB8IGVuY29kZWQzID4+IDI7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDMgJiAzKSA8PCA2IHwgZW5jb2RlZDQgJiA2MztcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuLy8gQ29udmVydHMgYSBidWZmZXIgdG8gYSBzdHJpbmcgdG8gc3RvcmUsIHNlcmlhbGl6ZWQsIGluIHRoZSBiYWNrZW5kXG4vLyBzdG9yYWdlIGxpYnJhcnkuXG5mdW5jdGlvbiBidWZmZXJUb1N0cmluZyhidWZmZXIpIHtcbiAgICAvLyBiYXNlNjQtYXJyYXlidWZmZXJcbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgIHZhciBiYXNlNjRTdHJpbmcgPSAnJztcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICAvKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4gICAgICAgIGJhc2U2NFN0cmluZyArPSBCQVNFX0NIQVJTW2J5dGVzW2ldID4+IDJdO1xuICAgICAgICBiYXNlNjRTdHJpbmcgKz0gQkFTRV9DSEFSU1soYnl0ZXNbaV0gJiAzKSA8PCA0IHwgYnl0ZXNbaSArIDFdID4+IDRdO1xuICAgICAgICBiYXNlNjRTdHJpbmcgKz0gQkFTRV9DSEFSU1soYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIgfCBieXRlc1tpICsgMl0gPj4gNl07XG4gICAgICAgIGJhc2U2NFN0cmluZyArPSBCQVNFX0NIQVJTW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG5cbiAgICBpZiAoYnl0ZXMubGVuZ3RoICUgMyA9PT0gMikge1xuICAgICAgICBiYXNlNjRTdHJpbmcgPSBiYXNlNjRTdHJpbmcuc3Vic3RyaW5nKDAsIGJhc2U2NFN0cmluZy5sZW5ndGggLSAxKSArICc9JztcbiAgICB9IGVsc2UgaWYgKGJ5dGVzLmxlbmd0aCAlIDMgPT09IDEpIHtcbiAgICAgICAgYmFzZTY0U3RyaW5nID0gYmFzZTY0U3RyaW5nLnN1YnN0cmluZygwLCBiYXNlNjRTdHJpbmcubGVuZ3RoIC0gMikgKyAnPT0nO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjRTdHJpbmc7XG59XG5cbi8vIFNlcmlhbGl6ZSBhIHZhbHVlLCBhZnRlcndhcmRzIGV4ZWN1dGluZyBhIGNhbGxiYWNrICh3aGljaCB1c3VhbGx5XG4vLyBpbnN0cnVjdHMgdGhlIGBzZXRJdGVtKClgIGNhbGxiYWNrL3Byb21pc2UgdG8gYmUgZXhlY3V0ZWQpLiBUaGlzIGlzIGhvd1xuLy8gd2Ugc3RvcmUgYmluYXJ5IGRhdGEgd2l0aCBsb2NhbFN0b3JhZ2UuXG5mdW5jdGlvbiBzZXJpYWxpemUodmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlVHlwZSA9ICcnO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB2YWx1ZVR5cGUgPSB0b1N0cmluZyQxLmNhbGwodmFsdWUpO1xuICAgIH1cblxuICAgIC8vIENhbm5vdCB1c2UgYHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXJgIG9yIHN1Y2ggaGVyZSwgYXMgdGhlc2VcbiAgICAvLyBjaGVja3MgZmFpbCB3aGVuIHJ1bm5pbmcgdGhlIHRlc3RzIHVzaW5nIGNhc3Blci5qcy4uLlxuICAgIC8vXG4gICAgLy8gVE9ETzogU2VlIHdoeSB0aG9zZSB0ZXN0cyBmYWlsIGFuZCB1c2UgYSBiZXR0ZXIgc29sdXRpb24uXG4gICAgaWYgKHZhbHVlICYmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScgfHwgdmFsdWUuYnVmZmVyICYmIHRvU3RyaW5nJDEuY2FsbCh2YWx1ZS5idWZmZXIpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSkge1xuICAgICAgICAvLyBDb252ZXJ0IGJpbmFyeSBhcnJheXMgdG8gYSBzdHJpbmcgYW5kIHByZWZpeCB0aGUgc3RyaW5nIHdpdGhcbiAgICAgICAgLy8gYSBzcGVjaWFsIG1hcmtlci5cbiAgICAgICAgdmFyIGJ1ZmZlcjtcbiAgICAgICAgdmFyIG1hcmtlciA9IFNFUklBTElaRURfTUFSS0VSO1xuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBidWZmZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX0FSUkFZQlVGRkVSO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnVmZmVyID0gdmFsdWUuYnVmZmVyO1xuXG4gICAgICAgICAgICBpZiAodmFsdWVUeXBlID09PSAnW29iamVjdCBJbnQ4QXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX0lOVDhBUlJBWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnW29iamVjdCBVaW50OEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIgKz0gVFlQRV9VSU5UOEFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIgKz0gVFlQRV9VSU5UOENMQU1QRURBUlJBWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnW29iamVjdCBJbnQxNkFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIgKz0gVFlQRV9JTlQxNkFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IFVpbnQxNkFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIgKz0gVFlQRV9VSU5UMTZBUlJBWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnW29iamVjdCBJbnQzMkFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIgKz0gVFlQRV9JTlQzMkFSUkFZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IFVpbnQzMkFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIgKz0gVFlQRV9VSU5UMzJBUlJBWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnW29iamVjdCBGbG9hdDMyQXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX0ZMT0FUMzJBUlJBWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVUeXBlID09PSAnW29iamVjdCBGbG9hdDY0QXJyYXldJykge1xuICAgICAgICAgICAgICAgIG1hcmtlciArPSBUWVBFX0ZMT0FUNjRBUlJBWTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobmV3IEVycm9yKCdGYWlsZWQgdG8gZ2V0IHR5cGUgZm9yIEJpbmFyeUFycmF5JykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sobWFya2VyICsgYnVmZmVyVG9TdHJpbmcoYnVmZmVyKSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEJsb2JdJykge1xuICAgICAgICAvLyBDb252ZXIgdGhlIGJsb2IgdG8gYSBiaW5hcnlBcnJheSBhbmQgdGhlbiB0byBhIHN0cmluZy5cbiAgICAgICAgdmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gQmFja3dhcmRzLWNvbXBhdGlibGUgcHJlZml4IGZvciB0aGUgYmxvYiB0eXBlLlxuICAgICAgICAgICAgdmFyIHN0ciA9IEJMT0JfVFlQRV9QUkVGSVggKyB2YWx1ZS50eXBlICsgJ34nICsgYnVmZmVyVG9TdHJpbmcodGhpcy5yZXN1bHQpO1xuXG4gICAgICAgICAgICBjYWxsYmFjayhTRVJJQUxJWkVEX01BUktFUiArIFRZUEVfQkxPQiArIHN0cik7XG4gICAgICAgIH07XG5cbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBjb252ZXJ0IHZhbHVlIGludG8gYSBKU09OIHN0cmluZzogXCIsIHZhbHVlKTtcblxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIERlc2VyaWFsaXplIGRhdGEgd2UndmUgaW5zZXJ0ZWQgaW50byBhIHZhbHVlIGNvbHVtbi9maWVsZC4gV2UgcGxhY2Vcbi8vIHNwZWNpYWwgbWFya2VycyBpbnRvIG91ciBzdHJpbmdzIHRvIG1hcmsgdGhlbSBhcyBlbmNvZGVkOyB0aGlzIGlzbid0XG4vLyBhcyBuaWNlIGFzIGEgbWV0YSBmaWVsZCwgYnV0IGl0J3MgdGhlIG9ubHkgc2FuZSB0aGluZyB3ZSBjYW4gZG8gd2hpbHN0XG4vLyBrZWVwaW5nIGxvY2FsU3RvcmFnZSBzdXBwb3J0IGludGFjdC5cbi8vXG4vLyBPZnRlbnRpbWVzIHRoaXMgd2lsbCBqdXN0IGRlc2VyaWFsaXplIEpTT04gY29udGVudCwgYnV0IGlmIHdlIGhhdmUgYVxuLy8gc3BlY2lhbCBtYXJrZXIgKFNFUklBTElaRURfTUFSS0VSLCBkZWZpbmVkIGFib3ZlKSwgd2Ugd2lsbCBleHRyYWN0XG4vLyBzb21lIGtpbmQgb2YgYXJyYXlidWZmZXIvYmluYXJ5IGRhdGEvdHlwZWQgYXJyYXkgb3V0IG9mIHRoZSBzdHJpbmcuXG5mdW5jdGlvbiBkZXNlcmlhbGl6ZSh2YWx1ZSkge1xuICAgIC8vIElmIHdlIGhhdmVuJ3QgbWFya2VkIHRoaXMgc3RyaW5nIGFzIGJlaW5nIHNwZWNpYWxseSBzZXJpYWxpemVkIChpLmUuXG4gICAgLy8gc29tZXRoaW5nIG90aGVyIHRoYW4gc2VyaWFsaXplZCBKU09OKSwgd2UgY2FuIGp1c3QgcmV0dXJuIGl0IGFuZCBiZVxuICAgIC8vIGRvbmUgd2l0aCBpdC5cbiAgICBpZiAodmFsdWUuc3Vic3RyaW5nKDAsIFNFUklBTElaRURfTUFSS0VSX0xFTkdUSCkgIT09IFNFUklBTElaRURfTUFSS0VSKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgZGVhbHMgd2l0aCBkZXNlcmlhbGl6aW5nIHNvbWUga2luZCBvZiBCbG9iIG9yXG4gICAgLy8gVHlwZWRBcnJheS4gRmlyc3Qgd2Ugc2VwYXJhdGUgb3V0IHRoZSB0eXBlIG9mIGRhdGEgd2UncmUgZGVhbGluZ1xuICAgIC8vIHdpdGggZnJvbSB0aGUgZGF0YSBpdHNlbGYuXG4gICAgdmFyIHNlcmlhbGl6ZWRTdHJpbmcgPSB2YWx1ZS5zdWJzdHJpbmcoVFlQRV9TRVJJQUxJWkVEX01BUktFUl9MRU5HVEgpO1xuICAgIHZhciB0eXBlID0gdmFsdWUuc3Vic3RyaW5nKFNFUklBTElaRURfTUFSS0VSX0xFTkdUSCwgVFlQRV9TRVJJQUxJWkVEX01BUktFUl9MRU5HVEgpO1xuXG4gICAgdmFyIGJsb2JUeXBlO1xuICAgIC8vIEJhY2t3YXJkcy1jb21wYXRpYmxlIGJsb2IgdHlwZSBzZXJpYWxpemF0aW9uIHN0cmF0ZWd5LlxuICAgIC8vIERCcyBjcmVhdGVkIHdpdGggb2xkZXIgdmVyc2lvbnMgb2YgbG9jYWxGb3JhZ2Ugd2lsbCBzaW1wbHkgbm90IGhhdmUgdGhlIGJsb2IgdHlwZS5cbiAgICBpZiAodHlwZSA9PT0gVFlQRV9CTE9CICYmIEJMT0JfVFlQRV9QUkVGSVhfUkVHRVgudGVzdChzZXJpYWxpemVkU3RyaW5nKSkge1xuICAgICAgICB2YXIgbWF0Y2hlciA9IHNlcmlhbGl6ZWRTdHJpbmcubWF0Y2goQkxPQl9UWVBFX1BSRUZJWF9SRUdFWCk7XG4gICAgICAgIGJsb2JUeXBlID0gbWF0Y2hlclsxXTtcbiAgICAgICAgc2VyaWFsaXplZFN0cmluZyA9IHNlcmlhbGl6ZWRTdHJpbmcuc3Vic3RyaW5nKG1hdGNoZXJbMF0ubGVuZ3RoKTtcbiAgICB9XG4gICAgdmFyIGJ1ZmZlciA9IHN0cmluZ1RvQnVmZmVyKHNlcmlhbGl6ZWRTdHJpbmcpO1xuXG4gICAgLy8gUmV0dXJuIHRoZSByaWdodCB0eXBlIGJhc2VkIG9uIHRoZSBjb2RlL3R5cGUgc2V0IGR1cmluZ1xuICAgIC8vIHNlcmlhbGl6YXRpb24uXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgVFlQRV9BUlJBWUJVRkZFUjpcbiAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgIGNhc2UgVFlQRV9CTE9COlxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogYmxvYlR5cGUgfSk7XG4gICAgICAgIGNhc2UgVFlQRV9JTlQ4QVJSQVk6XG4gICAgICAgICAgICByZXR1cm4gbmV3IEludDhBcnJheShidWZmZXIpO1xuICAgICAgICBjYXNlIFRZUEVfVUlOVDhBUlJBWTpcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgICAgICBjYXNlIFRZUEVfVUlOVDhDTEFNUEVEQVJSQVk6XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGNhc2UgVFlQRV9JTlQxNkFSUkFZOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnQxNkFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGNhc2UgVFlQRV9VSU5UMTZBUlJBWTpcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDE2QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgY2FzZSBUWVBFX0lOVDMyQVJSQVk6XG4gICAgICAgICAgICByZXR1cm4gbmV3IEludDMyQXJyYXkoYnVmZmVyKTtcbiAgICAgICAgY2FzZSBUWVBFX1VJTlQzMkFSUkFZOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50MzJBcnJheShidWZmZXIpO1xuICAgICAgICBjYXNlIFRZUEVfRkxPQVQzMkFSUkFZOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyKTtcbiAgICAgICAgY2FzZSBUWVBFX0ZMT0FUNjRBUlJBWTpcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmxvYXQ2NEFycmF5KGJ1ZmZlcik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua293biB0eXBlOiAnICsgdHlwZSk7XG4gICAgfVxufVxuXG52YXIgbG9jYWxmb3JhZ2VTZXJpYWxpemVyID0ge1xuICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplLFxuICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZSxcbiAgICBzdHJpbmdUb0J1ZmZlcjogc3RyaW5nVG9CdWZmZXIsXG4gICAgYnVmZmVyVG9TdHJpbmc6IGJ1ZmZlclRvU3RyaW5nXG59O1xuXG4vKlxuICogSW5jbHVkZXMgY29kZSBmcm9tOlxuICpcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlclxuICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiBOaWtsYXMgdm9uIEhlcnR6ZW5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEYlRhYmxlKHQsIGRiSW5mbywgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICB0LmV4ZWN1dGVTcWwoJ0NSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICcgKyBkYkluZm8uc3RvcmVOYW1lICsgJyAnICsgJyhpZCBJTlRFR0VSIFBSSU1BUlkgS0VZLCBrZXkgdW5pcXVlLCB2YWx1ZSknLCBbXSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xufVxuXG4vLyBPcGVuIHRoZSBXZWJTUUwgZGF0YWJhc2UgKGF1dG9tYXRpY2FsbHkgY3JlYXRlcyBvbmUgaWYgb25lIGRpZG4ndFxuLy8gcHJldmlvdXNseSBleGlzdCksIHVzaW5nIGFueSBvcHRpb25zIHNldCBpbiB0aGUgY29uZmlnLlxuZnVuY3Rpb24gX2luaXRTdG9yYWdlJDEob3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZGJJbmZvID0ge1xuICAgICAgICBkYjogbnVsbFxuICAgIH07XG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGRiSW5mb1tpXSA9IHR5cGVvZiBvcHRpb25zW2ldICE9PSAnc3RyaW5nJyA/IG9wdGlvbnNbaV0udG9TdHJpbmcoKSA6IG9wdGlvbnNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGJJbmZvUHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBPcGVuIHRoZSBkYXRhYmFzZTsgdGhlIG9wZW5EYXRhYmFzZSBBUEkgd2lsbCBhdXRvbWF0aWNhbGx5XG4gICAgICAgIC8vIGNyZWF0ZSBpdCBmb3IgdXMgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRiSW5mby5kYiA9IG9wZW5EYXRhYmFzZShkYkluZm8ubmFtZSwgU3RyaW5nKGRiSW5mby52ZXJzaW9uKSwgZGJJbmZvLmRlc2NyaXB0aW9uLCBkYkluZm8uc2l6ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgb3VyIGtleS92YWx1ZSB0YWJsZSBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGNyZWF0ZURiVGFibGUodCwgZGJJbmZvLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fZGJJbmZvID0gZGJJbmZvO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGRiSW5mby5zZXJpYWxpemVyID0gbG9jYWxmb3JhZ2VTZXJpYWxpemVyO1xuICAgIHJldHVybiBkYkluZm9Qcm9taXNlO1xufVxuXG5mdW5jdGlvbiB0cnlFeGVjdXRlU3FsKHQsIGRiSW5mbywgc3FsU3RhdGVtZW50LCBhcmdzLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIHQuZXhlY3V0ZVNxbChzcWxTdGF0ZW1lbnQsIGFyZ3MsIGNhbGxiYWNrLCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IGVycm9yLlNZTlRBWF9FUlIpIHtcbiAgICAgICAgICAgIHQuZXhlY3V0ZVNxbCgnU0VMRUNUIG5hbWUgRlJPTSBzcWxpdGVfbWFzdGVyICcgKyBcIldIRVJFIHR5cGU9J3RhYmxlJyBBTkQgbmFtZSA9ID9cIiwgW2RiSW5mby5zdG9yZU5hbWVdLCBmdW5jdGlvbiAodCwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0cy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdGFibGUgaXMgbWlzc2luZyAod2FzIGRlbGV0ZWQpXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlLWNyZWF0ZSBpdCB0YWJsZSBhbmQgcmV0cnlcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRGJUYWJsZSh0LCBkYkluZm8sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuZXhlY3V0ZVNxbChzcWxTdGF0ZW1lbnQsIGFyZ3MsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayh0LCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKHQsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0sIGVycm9yQ2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtJDEoa2V5LCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGtleSA9IG5vcm1hbGl6ZUtleShrZXkpO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgICAgIGRiSW5mby5kYi50cmFuc2FjdGlvbihmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgIHRyeUV4ZWN1dGVTcWwodCwgZGJJbmZvLCAnU0VMRUNUICogRlJPTSAnICsgZGJJbmZvLnN0b3JlTmFtZSArICcgV0hFUkUga2V5ID0gPyBMSU1JVCAxJywgW2tleV0sIGZ1bmN0aW9uICh0LCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzLnJvd3MubGVuZ3RoID8gcmVzdWx0cy5yb3dzLml0ZW0oMCkudmFsdWUgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGlzIGlzIHNlcmlhbGl6ZWQgY29udGVudCB3ZSBuZWVkIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIHVucGFjay5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZGJJbmZvLnNlcmlhbGl6ZXIuZGVzZXJpYWxpemUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBpdGVyYXRlJDEoaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcblxuICAgICAgICAgICAgZGJJbmZvLmRiLnRyYW5zYWN0aW9uKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5RXhlY3V0ZVNxbCh0LCBkYkluZm8sICdTRUxFQ1QgKiBGUk9NICcgKyBkYkluZm8uc3RvcmVOYW1lLCBbXSwgZnVuY3Rpb24gKHQsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSByZXN1bHRzLnJvd3M7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSByb3dzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJvd3MuaXRlbShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpdGVtLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhpcyBpcyBzZXJpYWxpemVkIGNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdW5wYWNrLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRiSW5mby5zZXJpYWxpemVyLmRlc2VyaWFsaXplKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGl0ZXJhdG9yKHJlc3VsdCwgaXRlbS5rZXksIGkgKyAxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdm9pZCgwKSBwcmV2ZW50cyBwcm9ibGVtcyB3aXRoIHJlZGVmaW5pdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgYHVuZGVmaW5lZGAuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIF9zZXRJdGVtKGtleSwgdmFsdWUsIGNhbGxiYWNrLCByZXRyaWVzTGVmdCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGtleSA9IG5vcm1hbGl6ZUtleShrZXkpO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gVGhlIGxvY2FsU3RvcmFnZSBBUEkgZG9lc24ndCByZXR1cm4gdW5kZWZpbmVkIHZhbHVlcyBpbiBhblxuICAgICAgICAgICAgLy8gXCJleHBlY3RlZFwiIHdheSwgc28gdW5kZWZpbmVkIGlzIGFsd2F5cyBjYXN0IHRvIG51bGwgaW4gYWxsXG4gICAgICAgICAgICAvLyBkcml2ZXJzLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL2xvY2FsRm9yYWdlL3B1bGwvNDJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTYXZlIHRoZSBvcmlnaW5hbCB2YWx1ZSB0byBwYXNzIHRvIHRoZSBjYWxsYmFjay5cbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHZhciBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgICAgICBkYkluZm8uc2VyaWFsaXplci5zZXJpYWxpemUodmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeUV4ZWN1dGVTcWwodCwgZGJJbmZvLCAnSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyAnICsgZGJJbmZvLnN0b3JlTmFtZSArICcgJyArICcoa2V5LCB2YWx1ZSkgVkFMVUVTICg/LCA/KScsIFtrZXksIHZhbHVlXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob3JpZ2luYWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChzcWxFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHRyYW5zYWN0aW9uIGZhaWxlZDsgY2hlY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIHNlZSBpZiBpdCdzIGEgcXVvdGEgZXJyb3IuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3FsRXJyb3IuY29kZSA9PT0gc3FsRXJyb3IuUVVPVEFfRVJSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgcmVqZWN0IHRoZSBjYWxsYmFjayBvdXRyaWdodCBmb3Igbm93LCBidXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpdCdzIHdvcnRoIHRyeWluZyB0byByZS1ydW4gdGhlIHRyYW5zYWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV2ZW4gaWYgdGhlIHVzZXIgYWNjZXB0cyB0aGUgcHJvbXB0IHRvIHVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vcmUgc3RvcmFnZSBvbiBTYWZhcmksIHRoaXMgZXJyb3Igd2lsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJlIGNhbGxlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyeSB0byByZS1ydW4gdGhlIHRyYW5zYWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRyaWVzTGVmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfc2V0SXRlbS5hcHBseShzZWxmLCBba2V5LCBvcmlnaW5hbFZhbHVlLCBjYWxsYmFjaywgcmV0cmllc0xlZnQgLSAxXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzcWxFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBzZXRJdGVtJDEoa2V5LCB2YWx1ZSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gX3NldEl0ZW0uYXBwbHkodGhpcywgW2tleSwgdmFsdWUsIGNhbGxiYWNrLCAxXSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0kMShrZXksIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAga2V5ID0gbm9ybWFsaXplS2V5KGtleSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICAgICAgZGJJbmZvLmRiLnRyYW5zYWN0aW9uKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5RXhlY3V0ZVNxbCh0LCBkYkluZm8sICdERUxFVEUgRlJPTSAnICsgZGJJbmZvLnN0b3JlTmFtZSArICcgV0hFUkUga2V5ID0gPycsIFtrZXldLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBEZWxldGVzIGV2ZXJ5IGl0ZW0gaW4gdGhlIHRhYmxlLlxuLy8gVE9ETzogRmluZCBvdXQgaWYgdGhpcyByZXNldHMgdGhlIEFVVE9fSU5DUkVNRU5UIG51bWJlci5cbmZ1bmN0aW9uIGNsZWFyJDEoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICAgICAgZGJJbmZvLmRiLnRyYW5zYWN0aW9uKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5RXhlY3V0ZVNxbCh0LCBkYkluZm8sICdERUxFVEUgRlJPTSAnICsgZGJJbmZvLnN0b3JlTmFtZSwgW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0ocmVqZWN0KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIERvZXMgYSBzaW1wbGUgYENPVU5UKGtleSlgIHRvIGdldCB0aGUgbnVtYmVyIG9mIGl0ZW1zIHN0b3JlZCBpblxuLy8gbG9jYWxGb3JhZ2UuXG5mdW5jdGlvbiBsZW5ndGgkMShjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICAvLyBBaGhoLCBTUUwgbWFrZXMgdGhpcyBvbmUgc29vb29vbyBlYXN5LlxuICAgICAgICAgICAgICAgIHRyeUV4ZWN1dGVTcWwodCwgZGJJbmZvLCAnU0VMRUNUIENPVU5UKGtleSkgYXMgYyBGUk9NICcgKyBkYkluZm8uc3RvcmVOYW1lLCBbXSwgZnVuY3Rpb24gKHQsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHMucm93cy5pdGVtKDApLmM7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBSZXR1cm4gdGhlIGtleSBsb2NhdGVkIGF0IGtleSBpbmRleCBYOyBlc3NlbnRpYWxseSBnZXRzIHRoZSBrZXkgZnJvbSBhXG4vLyBgV0hFUkUgaWQgPSA/YC4gVGhpcyBpcyB0aGUgbW9zdCBlZmZpY2llbnQgd2F5IEkgY2FuIHRoaW5rIHRvIGltcGxlbWVudFxuLy8gdGhpcyByYXJlbHktdXNlZCAoaW4gbXkgZXhwZXJpZW5jZSkgcGFydCBvZiB0aGUgQVBJLCBidXQgaXQgY2FuIHNlZW1cbi8vIGluY29uc2lzdGVudCwgYmVjYXVzZSB3ZSBkbyBgSU5TRVJUIE9SIFJFUExBQ0UgSU5UT2Agb24gYHNldEl0ZW0oKWAsIHNvXG4vLyB0aGUgSUQgb2YgZWFjaCBrZXkgd2lsbCBjaGFuZ2UgZXZlcnkgdGltZSBpdCdzIHVwZGF0ZWQuIFBlcmhhcHMgYSBzdG9yZWRcbi8vIHByb2NlZHVyZSBmb3IgdGhlIGBzZXRJdGVtKClgIFNRTCB3b3VsZCBzb2x2ZSB0aGlzIHByb2JsZW0/XG4vLyBUT0RPOiBEb24ndCBjaGFuZ2UgSUQgb24gYHNldEl0ZW0oKWAuXG5mdW5jdGlvbiBrZXkkMShuLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYkluZm8gPSBzZWxmLl9kYkluZm87XG4gICAgICAgICAgICBkYkluZm8uZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICB0cnlFeGVjdXRlU3FsKHQsIGRiSW5mbywgJ1NFTEVDVCBrZXkgRlJPTSAnICsgZGJJbmZvLnN0b3JlTmFtZSArICcgV0hFUkUgaWQgPSA/IExJTUlUIDEnLCBbbiArIDFdLCBmdW5jdGlvbiAodCwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0cy5yb3dzLmxlbmd0aCA/IHJlc3VsdHMucm93cy5pdGVtKDApLmtleSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVtcImNhdGNoXCJdKHJlamVjdCk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiBrZXlzJDEoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBzZWxmLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICAgICAgZGJJbmZvLmRiLnRyYW5zYWN0aW9uKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgdHJ5RXhlY3V0ZVNxbCh0LCBkYkluZm8sICdTRUxFQ1Qga2V5IEZST00gJyArIGRiSW5mby5zdG9yZU5hbWUsIFtdLCBmdW5jdGlvbiAodCwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2gocmVzdWx0cy5yb3dzLml0ZW0oaSkua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoa2V5cyk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHQsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShyZWplY3QpO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRhdGFiYXNlLyNkYXRhYmFzZXNcbi8vID4gVGhlcmUgaXMgbm8gd2F5IHRvIGVudW1lcmF0ZSBvciBkZWxldGUgdGhlIGRhdGFiYXNlcyBhdmFpbGFibGUgZm9yIGFuIG9yaWdpbiBmcm9tIHRoaXMgQVBJLlxuZnVuY3Rpb24gZ2V0QWxsU3RvcmVOYW1lcyhkYikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZGIudHJhbnNhY3Rpb24oZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHQuZXhlY3V0ZVNxbCgnU0VMRUNUIG5hbWUgRlJPTSBzcWxpdGVfbWFzdGVyICcgKyBcIldIRVJFIHR5cGU9J3RhYmxlJyBBTkQgbmFtZSA8PiAnX19XZWJLaXREYXRhYmFzZUluZm9UYWJsZV9fJ1wiLCBbXSwgZnVuY3Rpb24gKHQsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmVOYW1lcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVOYW1lcy5wdXNoKHJlc3VsdHMucm93cy5pdGVtKGkpLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBkYjogZGIsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlTmFtZXM6IHN0b3JlTmFtZXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0LCBlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHNxbEVycm9yKSB7XG4gICAgICAgICAgICByZWplY3Qoc3FsRXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZHJvcEluc3RhbmNlJDEob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IGdldENhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgY3VycmVudENvbmZpZyA9IHRoaXMuY29uZmlnKCk7XG4gICAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zICE9PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMgfHwge307XG4gICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgb3B0aW9ucy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IGN1cnJlbnRDb25maWcubmFtZTtcbiAgICAgICAgb3B0aW9ucy5zdG9yZU5hbWUgPSBvcHRpb25zLnN0b3JlTmFtZSB8fCBjdXJyZW50Q29uZmlnLnN0b3JlTmFtZTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHByb21pc2U7XG4gICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgcHJvbWlzZSA9IFByb21pc2UkMS5yZWplY3QoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHZhciBkYjtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm5hbWUgPT09IGN1cnJlbnRDb25maWcubmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgZGIgcmVmZXJlbmNlIG9mIHRoZSBjdXJyZW50IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgZGIgPSBzZWxmLl9kYkluZm8uZGI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRiID0gb3BlbkRhdGFiYXNlKG9wdGlvbnMubmFtZSwgJycsICcnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnN0b3JlTmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIGRyb3AgYWxsIGRhdGFiYXNlIHRhYmxlc1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZ2V0QWxsU3RvcmVOYW1lcyhkYikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgZGI6IGRiLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZU5hbWVzOiBbb3B0aW9ucy5zdG9yZU5hbWVdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKG9wZXJhdGlvbkluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25JbmZvLmRiLnRyYW5zYWN0aW9uKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRyb3BUYWJsZShzdG9yZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LmV4ZWN1dGVTcWwoJ0RST1AgVEFCTEUgSUYgRVhJU1RTICcgKyBzdG9yZU5hbWUsIFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAodCwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9wZXJhdGlvbkluZm8uc3RvcmVOYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9ucy5wdXNoKGRyb3BUYWJsZShvcGVyYXRpb25JbmZvLnN0b3JlTmFtZXNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UkMS5hbGwob3BlcmF0aW9ucykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHNxbEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChzcWxFcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxudmFyIHdlYlNRTFN0b3JhZ2UgPSB7XG4gICAgX2RyaXZlcjogJ3dlYlNRTFN0b3JhZ2UnLFxuICAgIF9pbml0U3RvcmFnZTogX2luaXRTdG9yYWdlJDEsXG4gICAgX3N1cHBvcnQ6IGlzV2ViU1FMVmFsaWQoKSxcbiAgICBpdGVyYXRlOiBpdGVyYXRlJDEsXG4gICAgZ2V0SXRlbTogZ2V0SXRlbSQxLFxuICAgIHNldEl0ZW06IHNldEl0ZW0kMSxcbiAgICByZW1vdmVJdGVtOiByZW1vdmVJdGVtJDEsXG4gICAgY2xlYXI6IGNsZWFyJDEsXG4gICAgbGVuZ3RoOiBsZW5ndGgkMSxcbiAgICBrZXk6IGtleSQxLFxuICAgIGtleXM6IGtleXMkMSxcbiAgICBkcm9wSW5zdGFuY2U6IGRyb3BJbnN0YW5jZSQxXG59O1xuXG5mdW5jdGlvbiBpc0xvY2FsU3RvcmFnZVZhbGlkKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbG9jYWxTdG9yYWdlICE9PSAndW5kZWZpbmVkJyAmJiAnc2V0SXRlbScgaW4gbG9jYWxTdG9yYWdlICYmXG4gICAgICAgIC8vIGluIElFOCB0eXBlb2YgbG9jYWxTdG9yYWdlLnNldEl0ZW0gPT09ICdvYmplY3QnXG4gICAgICAgICEhbG9jYWxTdG9yYWdlLnNldEl0ZW07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0S2V5UHJlZml4KG9wdGlvbnMsIGRlZmF1bHRDb25maWcpIHtcbiAgICB2YXIga2V5UHJlZml4ID0gb3B0aW9ucy5uYW1lICsgJy8nO1xuXG4gICAgaWYgKG9wdGlvbnMuc3RvcmVOYW1lICE9PSBkZWZhdWx0Q29uZmlnLnN0b3JlTmFtZSkge1xuICAgICAgICBrZXlQcmVmaXggKz0gb3B0aW9ucy5zdG9yZU5hbWUgKyAnLyc7XG4gICAgfVxuICAgIHJldHVybiBrZXlQcmVmaXg7XG59XG5cbi8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSB0aHJvd3Mgd2hlbiBzYXZpbmcgYW4gaXRlbVxuZnVuY3Rpb24gY2hlY2tJZkxvY2FsU3RvcmFnZVRocm93cygpIHtcbiAgICB2YXIgbG9jYWxTdG9yYWdlVGVzdEtleSA9ICdfbG9jYWxmb3JhZ2Vfc3VwcG9ydF90ZXN0JztcblxuICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsU3RvcmFnZVRlc3RLZXksIHRydWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2NhbFN0b3JhZ2VUZXN0S2V5KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSBpcyB1c2FibGUgYW5kIGFsbG93cyB0byBzYXZlIGFuIGl0ZW1cbi8vIFRoaXMgbWV0aG9kIGNoZWNrcyBpZiBsb2NhbFN0b3JhZ2UgaXMgdXNhYmxlIGluIFNhZmFyaSBQcml2YXRlIEJyb3dzaW5nXG4vLyBtb2RlLCBvciBpbiBhbnkgb3RoZXIgY2FzZSB3aGVyZSB0aGUgYXZhaWxhYmxlIHF1b3RhIGZvciBsb2NhbFN0b3JhZ2Vcbi8vIGlzIDAgYW5kIHRoZXJlIHdhc24ndCBhbnkgc2F2ZWQgaXRlbXMgeWV0LlxuZnVuY3Rpb24gX2lzTG9jYWxTdG9yYWdlVXNhYmxlKCkge1xuICAgIHJldHVybiAhY2hlY2tJZkxvY2FsU3RvcmFnZVRocm93cygpIHx8IGxvY2FsU3RvcmFnZS5sZW5ndGggPiAwO1xufVxuXG4vLyBDb25maWcgdGhlIGxvY2FsU3RvcmFnZSBiYWNrZW5kLCB1c2luZyBvcHRpb25zIHNldCBpbiB0aGUgY29uZmlnLlxuZnVuY3Rpb24gX2luaXRTdG9yYWdlJDIob3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZGJJbmZvID0ge307XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBkYkluZm9baV0gPSBvcHRpb25zW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGJJbmZvLmtleVByZWZpeCA9IF9nZXRLZXlQcmVmaXgob3B0aW9ucywgc2VsZi5fZGVmYXVsdENvbmZpZyk7XG5cbiAgICBpZiAoIV9pc0xvY2FsU3RvcmFnZVVzYWJsZSgpKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlJDEucmVqZWN0KCk7XG4gICAgfVxuXG4gICAgc2VsZi5fZGJJbmZvID0gZGJJbmZvO1xuICAgIGRiSW5mby5zZXJpYWxpemVyID0gbG9jYWxmb3JhZ2VTZXJpYWxpemVyO1xuXG4gICAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKCk7XG59XG5cbi8vIFJlbW92ZSBhbGwga2V5cyBmcm9tIHRoZSBkYXRhc3RvcmUsIGVmZmVjdGl2ZWx5IGRlc3Ryb3lpbmcgYWxsIGRhdGEgaW5cbi8vIHRoZSBhcHAncyBrZXkvdmFsdWUgc3RvcmUhXG5mdW5jdGlvbiBjbGVhciQyKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwcm9taXNlID0gc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIga2V5UHJlZml4ID0gc2VsZi5fZGJJbmZvLmtleVByZWZpeDtcblxuICAgICAgICBmb3IgKHZhciBpID0gbG9jYWxTdG9yYWdlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gbG9jYWxTdG9yYWdlLmtleShpKTtcblxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKGtleVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBSZXRyaWV2ZSBhbiBpdGVtIGZyb20gdGhlIHN0b3JlLiBVbmxpa2UgdGhlIG9yaWdpbmFsIGFzeW5jX3N0b3JhZ2Vcbi8vIGxpYnJhcnkgaW4gR2FpYSwgd2UgZG9uJ3QgbW9kaWZ5IHJldHVybiB2YWx1ZXMgYXQgYWxsLiBJZiBhIGtleSdzIHZhbHVlXG4vLyBpcyBgdW5kZWZpbmVkYCwgd2UgcGFzcyB0aGF0IHZhbHVlIHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbmZ1bmN0aW9uIGdldEl0ZW0kMihrZXksIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAga2V5ID0gbm9ybWFsaXplS2V5KGtleSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgdmFyIHJlc3VsdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGRiSW5mby5rZXlQcmVmaXggKyBrZXkpO1xuXG4gICAgICAgIC8vIElmIGEgcmVzdWx0IHdhcyBmb3VuZCwgcGFyc2UgaXQgZnJvbSB0aGUgc2VyaWFsaXplZFxuICAgICAgICAvLyBzdHJpbmcgaW50byBhIEpTIG9iamVjdC4gSWYgcmVzdWx0IGlzbid0IHRydXRoeSwgdGhlIGtleVxuICAgICAgICAvLyBpcyBsaWtlbHkgdW5kZWZpbmVkIGFuZCB3ZSdsbCBwYXNzIGl0IHN0cmFpZ2h0IHRvIHRoZVxuICAgICAgICAvLyBjYWxsYmFjay5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZGJJbmZvLnNlcmlhbGl6ZXIuZGVzZXJpYWxpemUocmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBJdGVyYXRlIG92ZXIgYWxsIGl0ZW1zIGluIHRoZSBzdG9yZS5cbmZ1bmN0aW9uIGl0ZXJhdGUkMihpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgcHJvbWlzZSA9IHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgdmFyIGtleVByZWZpeCA9IGRiSW5mby5rZXlQcmVmaXg7XG4gICAgICAgIHZhciBrZXlQcmVmaXhMZW5ndGggPSBrZXlQcmVmaXgubGVuZ3RoO1xuICAgICAgICB2YXIgbGVuZ3RoID0gbG9jYWxTdG9yYWdlLmxlbmd0aDtcblxuICAgICAgICAvLyBXZSB1c2UgYSBkZWRpY2F0ZWQgaXRlcmF0b3IgaW5zdGVhZCBvZiB0aGUgYGlgIHZhcmlhYmxlIGJlbG93XG4gICAgICAgIC8vIHNvIG90aGVyIGtleXMgd2UgZmV0Y2ggaW4gbG9jYWxTdG9yYWdlIGFyZW4ndCBjb3VudGVkIGluXG4gICAgICAgIC8vIHRoZSBgaXRlcmF0aW9uTnVtYmVyYCBhcmd1bWVudCBwYXNzZWQgdG8gdGhlIGBpdGVyYXRlKClgXG4gICAgICAgIC8vIGNhbGxiYWNrLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTZWU6IGdpdGh1Yi5jb20vbW96aWxsYS9sb2NhbEZvcmFnZS9wdWxsLzQzNSNkaXNjdXNzaW9uX3IzODA2MTUzMFxuICAgICAgICB2YXIgaXRlcmF0aW9uTnVtYmVyID0gMTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gbG9jYWxTdG9yYWdlLmtleShpKTtcbiAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZihrZXlQcmVmaXgpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuXG4gICAgICAgICAgICAvLyBJZiBhIHJlc3VsdCB3YXMgZm91bmQsIHBhcnNlIGl0IGZyb20gdGhlIHNlcmlhbGl6ZWRcbiAgICAgICAgICAgIC8vIHN0cmluZyBpbnRvIGEgSlMgb2JqZWN0LiBJZiByZXN1bHQgaXNuJ3QgdHJ1dGh5LCB0aGVcbiAgICAgICAgICAgIC8vIGtleSBpcyBsaWtlbHkgdW5kZWZpbmVkIGFuZCB3ZSdsbCBwYXNzIGl0IHN0cmFpZ2h0XG4gICAgICAgICAgICAvLyB0byB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRiSW5mby5zZXJpYWxpemVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsdWUgPSBpdGVyYXRvcih2YWx1ZSwga2V5LnN1YnN0cmluZyhrZXlQcmVmaXhMZW5ndGgpLCBpdGVyYXRpb25OdW1iZXIrKyk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBTYW1lIGFzIGxvY2FsU3RvcmFnZSdzIGtleSgpIG1ldGhvZCwgZXhjZXB0IHRha2VzIGEgY2FsbGJhY2suXG5mdW5jdGlvbiBrZXkkMihuLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcHJvbWlzZSA9IHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxvY2FsU3RvcmFnZS5rZXkobik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBwcmVmaXggZnJvbSB0aGUga2V5LCBpZiBhIGtleSBpcyBmb3VuZC5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnN1YnN0cmluZyhkYkluZm8ua2V5UHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24ga2V5cyQyKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBwcm9taXNlID0gc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGJJbmZvID0gc2VsZi5fZGJJbmZvO1xuICAgICAgICB2YXIgbGVuZ3RoID0gbG9jYWxTdG9yYWdlLmxlbmd0aDtcbiAgICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbUtleSA9IGxvY2FsU3RvcmFnZS5rZXkoaSk7XG4gICAgICAgICAgICBpZiAoaXRlbUtleS5pbmRleE9mKGRiSW5mby5rZXlQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGl0ZW1LZXkuc3Vic3RyaW5nKGRiSW5mby5rZXlQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8vIFN1cHBseSB0aGUgbnVtYmVyIG9mIGtleXMgaW4gdGhlIGRhdGFzdG9yZSB0byB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG5mdW5jdGlvbiBsZW5ndGgkMihjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcHJvbWlzZSA9IHNlbGYua2V5cygpLnRoZW4oZnVuY3Rpb24gKGtleXMpIHtcbiAgICAgICAgcmV0dXJuIGtleXMubGVuZ3RoO1xuICAgIH0pO1xuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLy8gUmVtb3ZlIGFuIGl0ZW0gZnJvbSB0aGUgc3RvcmUsIG5pY2UgYW5kIHNpbXBsZS5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0kMihrZXksIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAga2V5ID0gbm9ybWFsaXplS2V5KGtleSk7XG5cbiAgICB2YXIgcHJvbWlzZSA9IHNlbGYucmVhZHkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oZGJJbmZvLmtleVByZWZpeCArIGtleSk7XG4gICAgfSk7XG5cbiAgICBleGVjdXRlQ2FsbGJhY2socHJvbWlzZSwgY2FsbGJhY2spO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vLyBTZXQgYSBrZXkncyB2YWx1ZSBhbmQgcnVuIGFuIG9wdGlvbmFsIGNhbGxiYWNrIG9uY2UgdGhlIHZhbHVlIGlzIHNldC5cbi8vIFVubGlrZSBHYWlhJ3MgaW1wbGVtZW50YXRpb24sIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpcyBwYXNzZWQgdGhlIHZhbHVlLFxuLy8gaW4gY2FzZSB5b3Ugd2FudCB0byBvcGVyYXRlIG9uIHRoYXQgdmFsdWUgb25seSBhZnRlciB5b3UncmUgc3VyZSBpdFxuLy8gc2F2ZWQsIG9yIHNvbWV0aGluZyBsaWtlIHRoYXQuXG5mdW5jdGlvbiBzZXRJdGVtJDIoa2V5LCB2YWx1ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBrZXkgPSBub3JtYWxpemVLZXkoa2V5KTtcblxuICAgIHZhciBwcm9taXNlID0gc2VsZi5yZWFkeSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBDb252ZXJ0IHVuZGVmaW5lZCB2YWx1ZXMgdG8gbnVsbC5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvbG9jYWxGb3JhZ2UvcHVsbC80MlxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgb3JpZ2luYWwgdmFsdWUgdG8gcGFzcyB0byB0aGUgY2FsbGJhY2suXG4gICAgICAgIHZhciBvcmlnaW5hbFZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIGRiSW5mbyA9IHNlbGYuX2RiSW5mbztcbiAgICAgICAgICAgIGRiSW5mby5zZXJpYWxpemVyLnNlcmlhbGl6ZSh2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShkYkluZm8ua2V5UHJlZml4ICsga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9yaWdpbmFsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2NhbFN0b3JhZ2UgY2FwYWNpdHkgZXhjZWVkZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBNYWtlIHRoaXMgYSBzcGVjaWZpYyBlcnJvci9ldmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8IGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIGRyb3BJbnN0YW5jZSQyKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sgPSBnZXRDYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zICE9PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMgfHwge307XG4gICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRDb25maWcgPSB0aGlzLmNvbmZpZygpO1xuICAgICAgICBvcHRpb25zLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgY3VycmVudENvbmZpZy5uYW1lO1xuICAgICAgICBvcHRpb25zLnN0b3JlTmFtZSA9IG9wdGlvbnMuc3RvcmVOYW1lIHx8IGN1cnJlbnRDb25maWcuc3RvcmVOYW1lO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcHJvbWlzZTtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZSQxLnJlamVjdCgnSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnN0b3JlTmFtZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUob3B0aW9ucy5uYW1lICsgJy8nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShfZ2V0S2V5UHJlZml4KG9wdGlvbnMsIHNlbGYuX2RlZmF1bHRDb25maWcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoa2V5UHJlZml4KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbG9jYWxTdG9yYWdlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGxvY2FsU3RvcmFnZS5rZXkoaSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5LmluZGV4T2Yoa2V5UHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZUNhbGxiYWNrKHByb21pc2UsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxudmFyIGxvY2FsU3RvcmFnZVdyYXBwZXIgPSB7XG4gICAgX2RyaXZlcjogJ2xvY2FsU3RvcmFnZVdyYXBwZXInLFxuICAgIF9pbml0U3RvcmFnZTogX2luaXRTdG9yYWdlJDIsXG4gICAgX3N1cHBvcnQ6IGlzTG9jYWxTdG9yYWdlVmFsaWQoKSxcbiAgICBpdGVyYXRlOiBpdGVyYXRlJDIsXG4gICAgZ2V0SXRlbTogZ2V0SXRlbSQyLFxuICAgIHNldEl0ZW06IHNldEl0ZW0kMixcbiAgICByZW1vdmVJdGVtOiByZW1vdmVJdGVtJDIsXG4gICAgY2xlYXI6IGNsZWFyJDIsXG4gICAgbGVuZ3RoOiBsZW5ndGgkMixcbiAgICBrZXk6IGtleSQyLFxuICAgIGtleXM6IGtleXMkMixcbiAgICBkcm9wSW5zdGFuY2U6IGRyb3BJbnN0YW5jZSQyXG59O1xuXG52YXIgc2FtZVZhbHVlID0gZnVuY3Rpb24gc2FtZVZhbHVlKHgsIHkpIHtcbiAgICByZXR1cm4geCA9PT0geSB8fCB0eXBlb2YgeCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHkgPT09ICdudW1iZXInICYmIGlzTmFOKHgpICYmIGlzTmFOKHkpO1xufTtcblxudmFyIGluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMoYXJyYXksIHNlYXJjaEVsZW1lbnQpIHtcbiAgICB2YXIgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBpZiAoc2FtZVZhbHVlKGFycmF5W2ldLCBzZWFyY2hFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuLy8gRHJpdmVycyBhcmUgc3RvcmVkIGhlcmUgd2hlbiBgZGVmaW5lRHJpdmVyKClgIGlzIGNhbGxlZC5cbi8vIFRoZXkgYXJlIHNoYXJlZCBhY3Jvc3MgYWxsIGluc3RhbmNlcyBvZiBsb2NhbEZvcmFnZS5cbnZhciBEZWZpbmVkRHJpdmVycyA9IHt9O1xuXG52YXIgRHJpdmVyU3VwcG9ydCA9IHt9O1xuXG52YXIgRGVmYXVsdERyaXZlcnMgPSB7XG4gICAgSU5ERVhFRERCOiBhc3luY1N0b3JhZ2UsXG4gICAgV0VCU1FMOiB3ZWJTUUxTdG9yYWdlLFxuICAgIExPQ0FMU1RPUkFHRTogbG9jYWxTdG9yYWdlV3JhcHBlclxufTtcblxudmFyIERlZmF1bHREcml2ZXJPcmRlciA9IFtEZWZhdWx0RHJpdmVycy5JTkRFWEVEREIuX2RyaXZlciwgRGVmYXVsdERyaXZlcnMuV0VCU1FMLl9kcml2ZXIsIERlZmF1bHREcml2ZXJzLkxPQ0FMU1RPUkFHRS5fZHJpdmVyXTtcblxudmFyIE9wdGlvbmFsRHJpdmVyTWV0aG9kcyA9IFsnZHJvcEluc3RhbmNlJ107XG5cbnZhciBMaWJyYXJ5TWV0aG9kcyA9IFsnY2xlYXInLCAnZ2V0SXRlbScsICdpdGVyYXRlJywgJ2tleScsICdrZXlzJywgJ2xlbmd0aCcsICdyZW1vdmVJdGVtJywgJ3NldEl0ZW0nXS5jb25jYXQoT3B0aW9uYWxEcml2ZXJNZXRob2RzKTtcblxudmFyIERlZmF1bHRDb25maWcgPSB7XG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIGRyaXZlcjogRGVmYXVsdERyaXZlck9yZGVyLnNsaWNlKCksXG4gICAgbmFtZTogJ2xvY2FsZm9yYWdlJyxcbiAgICAvLyBEZWZhdWx0IERCIHNpemUgaXMgX0pVU1QgVU5ERVJfIDVNQiwgYXMgaXQncyB0aGUgaGlnaGVzdCBzaXplXG4gICAgLy8gd2UgY2FuIHVzZSB3aXRob3V0IGEgcHJvbXB0LlxuICAgIHNpemU6IDQ5ODA3MzYsXG4gICAgc3RvcmVOYW1lOiAna2V5dmFsdWVwYWlycycsXG4gICAgdmVyc2lvbjogMS4wXG59O1xuXG5mdW5jdGlvbiBjYWxsV2hlblJlYWR5KGxvY2FsRm9yYWdlSW5zdGFuY2UsIGxpYnJhcnlNZXRob2QpIHtcbiAgICBsb2NhbEZvcmFnZUluc3RhbmNlW2xpYnJhcnlNZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2FyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHJldHVybiBsb2NhbEZvcmFnZUluc3RhbmNlLnJlYWR5KCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxGb3JhZ2VJbnN0YW5jZVtsaWJyYXJ5TWV0aG9kXS5hcHBseShsb2NhbEZvcmFnZUluc3RhbmNlLCBfYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICAgIGlmIChhcmcpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9rZXkgaW4gYXJnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZy5oYXNPd25Qcm9wZXJ0eShfa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShhcmdbX2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHNbMF1bX2tleV0gPSBhcmdbX2tleV0uc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50c1swXVtfa2V5XSA9IGFyZ1tfa2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG59XG5cbnZhciBMb2NhbEZvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2NhbEZvcmFnZShvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMb2NhbEZvcmFnZSk7XG5cbiAgICAgICAgZm9yICh2YXIgZHJpdmVyVHlwZUtleSBpbiBEZWZhdWx0RHJpdmVycykge1xuICAgICAgICAgICAgaWYgKERlZmF1bHREcml2ZXJzLmhhc093blByb3BlcnR5KGRyaXZlclR5cGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRyaXZlciA9IERlZmF1bHREcml2ZXJzW2RyaXZlclR5cGVLZXldO1xuICAgICAgICAgICAgICAgIHZhciBkcml2ZXJOYW1lID0gZHJpdmVyLl9kcml2ZXI7XG4gICAgICAgICAgICAgICAgdGhpc1tkcml2ZXJUeXBlS2V5XSA9IGRyaXZlck5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoIURlZmluZWREcml2ZXJzW2RyaXZlck5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIHRoZSBkZWZhdWx0IGRyaXZlcnMgY2FuIGJlIGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gYSBibG9ja2luZyBtYW5uZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVEcml2ZXIoZHJpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kZWZhdWx0Q29uZmlnID0gZXh0ZW5kKHt9LCBEZWZhdWx0Q29uZmlnKTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gZXh0ZW5kKHt9LCB0aGlzLl9kZWZhdWx0Q29uZmlnLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZHJpdmVyU2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5pdERyaXZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RiSW5mbyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fd3JhcExpYnJhcnlNZXRob2RzV2l0aFJlYWR5KCk7XG4gICAgICAgIHRoaXMuc2V0RHJpdmVyKHRoaXMuX2NvbmZpZy5kcml2ZXIpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge30pO1xuICAgIH1cblxuICAgIC8vIFNldCBhbnkgY29uZmlnIHZhbHVlcyBmb3IgbG9jYWxGb3JhZ2U7IGNhbiBiZSBjYWxsZWQgYW55dGltZSBiZWZvcmVcbiAgICAvLyB0aGUgZmlyc3QgQVBJIGNhbGwgKGUuZy4gYGdldEl0ZW1gLCBgc2V0SXRlbWApLlxuICAgIC8vIFdlIGxvb3AgdGhyb3VnaCBvcHRpb25zIHNvIHdlIGRvbid0IG92ZXJ3cml0ZSBleGlzdGluZyBjb25maWdcbiAgICAvLyB2YWx1ZXMuXG5cblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5jb25maWcgPSBmdW5jdGlvbiBjb25maWcob3B0aW9ucykge1xuICAgICAgICAvLyBJZiB0aGUgb3B0aW9ucyBhcmd1bWVudCBpcyBhbiBvYmplY3QsIHdlIHVzZSBpdCB0byBzZXQgdmFsdWVzLlxuICAgICAgICAvLyBPdGhlcndpc2UsIHdlIHJldHVybiBlaXRoZXIgYSBzcGVjaWZpZWQgY29uZmlnIHZhbHVlIG9yIGFsbFxuICAgICAgICAvLyBjb25maWcgdmFsdWVzLlxuICAgICAgICBpZiAoKHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvcHRpb25zKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvLyBJZiBsb2NhbGZvcmFnZSBpcyByZWFkeSBhbmQgZnVsbHkgaW5pdGlhbGl6ZWQsIHdlIGNhbid0IHNldFxuICAgICAgICAgICAgLy8gYW55IG5ldyBjb25maWd1cmF0aW9uIHZhbHVlcy4gSW5zdGVhZCwgd2UgcmV0dXJuIGFuIGVycm9yLlxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlYWR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkNhbid0IGNhbGwgY29uZmlnKCkgYWZ0ZXIgbG9jYWxmb3JhZ2UgXCIgKyAnaGFzIGJlZW4gdXNlZC4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09ICdzdG9yZU5hbWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0gPSBvcHRpb25zW2ldLnJlcGxhY2UoL1xcVy9nLCAnXycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpID09PSAndmVyc2lvbicgJiYgdHlwZW9mIG9wdGlvbnNbaV0gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0RhdGFiYXNlIHZlcnNpb24gbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWdbaV0gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZnRlciBhbGwgY29uZmlnIG9wdGlvbnMgYXJlIHNldCBhbmRcbiAgICAgICAgICAgIC8vIHRoZSBkcml2ZXIgb3B0aW9uIGlzIHVzZWQsIHRyeSBzZXR0aW5nIGl0XG4gICAgICAgICAgICBpZiAoJ2RyaXZlcicgaW4gb3B0aW9ucyAmJiBvcHRpb25zLmRyaXZlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldERyaXZlcih0aGlzLl9jb25maWcuZHJpdmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnW29wdGlvbnNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBVc2VkIHRvIGRlZmluZSBhIGN1c3RvbSBkcml2ZXIsIHNoYXJlZCBhY3Jvc3MgYWxsIGluc3RhbmNlcyBvZlxuICAgIC8vIGxvY2FsRm9yYWdlLlxuXG5cbiAgICBMb2NhbEZvcmFnZS5wcm90b3R5cGUuZGVmaW5lRHJpdmVyID0gZnVuY3Rpb24gZGVmaW5lRHJpdmVyKGRyaXZlck9iamVjdCwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGRyaXZlck5hbWUgPSBkcml2ZXJPYmplY3QuX2RyaXZlcjtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGxpYW5jZUVycm9yID0gbmV3IEVycm9yKCdDdXN0b20gZHJpdmVyIG5vdCBjb21wbGlhbnQ7IHNlZSAnICsgJ2h0dHBzOi8vbW96aWxsYS5naXRodWIuaW8vbG9jYWxGb3JhZ2UvI2RlZmluZWRyaXZlcicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQSBkcml2ZXIgbmFtZSBzaG91bGQgYmUgZGVmaW5lZCBhbmQgbm90IG92ZXJsYXAgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAvLyBsaWJyYXJ5LWRlZmluZWQsIGRlZmF1bHQgZHJpdmVycy5cbiAgICAgICAgICAgICAgICBpZiAoIWRyaXZlck9iamVjdC5fZHJpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChjb21wbGlhbmNlRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRyaXZlck1ldGhvZHMgPSBMaWJyYXJ5TWV0aG9kcy5jb25jYXQoJ19pbml0U3RvcmFnZScpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkcml2ZXJNZXRob2RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcml2ZXJNZXRob2ROYW1lID0gZHJpdmVyTWV0aG9kc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSBwcm9wZXJ0eSBpcyB0aGVyZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGEgbWV0aG9kIGV2ZW4gd2hlbiBvcHRpb25hbFxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNSZXF1aXJlZCA9ICFpbmNsdWRlcyhPcHRpb25hbERyaXZlck1ldGhvZHMsIGRyaXZlck1ldGhvZE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGlzUmVxdWlyZWQgfHwgZHJpdmVyT2JqZWN0W2RyaXZlck1ldGhvZE5hbWVdKSAmJiB0eXBlb2YgZHJpdmVyT2JqZWN0W2RyaXZlck1ldGhvZE5hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoY29tcGxpYW5jZUVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjb25maWd1cmVNaXNzaW5nTWV0aG9kcyA9IGZ1bmN0aW9uIGNvbmZpZ3VyZU1pc3NpbmdNZXRob2RzKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kTm90SW1wbGVtZW50ZWRGYWN0b3J5ID0gZnVuY3Rpb24gbWV0aG9kTm90SW1wbGVtZW50ZWRGYWN0b3J5KG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdNZXRob2QgJyArIG1ldGhvZE5hbWUgKyAnIGlzIG5vdCBpbXBsZW1lbnRlZCBieSB0aGUgY3VycmVudCBkcml2ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UkMS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVDYWxsYmFjayhwcm9taXNlLCBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfbGVuID0gT3B0aW9uYWxEcml2ZXJNZXRob2RzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uYWxEcml2ZXJNZXRob2QgPSBPcHRpb25hbERyaXZlck1ldGhvZHNbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkcml2ZXJPYmplY3Rbb3B0aW9uYWxEcml2ZXJNZXRob2RdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVyT2JqZWN0W29wdGlvbmFsRHJpdmVyTWV0aG9kXSA9IG1ldGhvZE5vdEltcGxlbWVudGVkRmFjdG9yeShvcHRpb25hbERyaXZlck1ldGhvZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uZmlndXJlTWlzc2luZ01ldGhvZHMoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzZXREcml2ZXJTdXBwb3J0ID0gZnVuY3Rpb24gc2V0RHJpdmVyU3VwcG9ydChzdXBwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChEZWZpbmVkRHJpdmVyc1tkcml2ZXJOYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdSZWRlZmluaW5nIExvY2FsRm9yYWdlIGRyaXZlcjogJyArIGRyaXZlck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIERlZmluZWREcml2ZXJzW2RyaXZlck5hbWVdID0gZHJpdmVyT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICBEcml2ZXJTdXBwb3J0W2RyaXZlck5hbWVdID0gc3VwcG9ydDtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3QgdXNlIGEgdGhlbiwgc28gdGhhdCB3ZSBjYW4gZGVmaW5lXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyaXZlcnMgdGhhdCBoYXZlIHNpbXBsZSBfc3VwcG9ydCBtZXRob2RzXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIGEgYmxvY2tpbmcgbWFubmVyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCdfc3VwcG9ydCcgaW4gZHJpdmVyT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkcml2ZXJPYmplY3QuX3N1cHBvcnQgJiYgdHlwZW9mIGRyaXZlck9iamVjdC5fc3VwcG9ydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVyT2JqZWN0Ll9zdXBwb3J0KCkudGhlbihzZXREcml2ZXJTdXBwb3J0LCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RHJpdmVyU3VwcG9ydCghIWRyaXZlck9iamVjdC5fc3VwcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXREcml2ZXJTdXBwb3J0KHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV4ZWN1dGVUd29DYWxsYmFja3MocHJvbWlzZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgTG9jYWxGb3JhZ2UucHJvdG90eXBlLmRyaXZlciA9IGZ1bmN0aW9uIGRyaXZlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RyaXZlciB8fCBudWxsO1xuICAgIH07XG5cbiAgICBMb2NhbEZvcmFnZS5wcm90b3R5cGUuZ2V0RHJpdmVyID0gZnVuY3Rpb24gZ2V0RHJpdmVyKGRyaXZlck5hbWUsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBnZXREcml2ZXJQcm9taXNlID0gRGVmaW5lZERyaXZlcnNbZHJpdmVyTmFtZV0gPyBQcm9taXNlJDEucmVzb2x2ZShEZWZpbmVkRHJpdmVyc1tkcml2ZXJOYW1lXSkgOiBQcm9taXNlJDEucmVqZWN0KG5ldyBFcnJvcignRHJpdmVyIG5vdCBmb3VuZC4nKSk7XG5cbiAgICAgICAgZXhlY3V0ZVR3b0NhbGxiYWNrcyhnZXREcml2ZXJQcm9taXNlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBnZXREcml2ZXJQcm9taXNlO1xuICAgIH07XG5cbiAgICBMb2NhbEZvcmFnZS5wcm90b3R5cGUuZ2V0U2VyaWFsaXplciA9IGZ1bmN0aW9uIGdldFNlcmlhbGl6ZXIoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNlcmlhbGl6ZXJQcm9taXNlID0gUHJvbWlzZSQxLnJlc29sdmUobG9jYWxmb3JhZ2VTZXJpYWxpemVyKTtcbiAgICAgICAgZXhlY3V0ZVR3b0NhbGxiYWNrcyhzZXJpYWxpemVyUHJvbWlzZSwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gc2VyaWFsaXplclByb21pc2U7XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIHJlYWR5KGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB2YXIgcHJvbWlzZSA9IHNlbGYuX2RyaXZlclNldC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl9yZWFkeSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3JlYWR5ID0gc2VsZi5faW5pdERyaXZlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5fcmVhZHk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV4ZWN1dGVUd29DYWxsYmFja3MocHJvbWlzZSwgY2FsbGJhY2ssIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5zZXREcml2ZXIgPSBmdW5jdGlvbiBzZXREcml2ZXIoZHJpdmVycywgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICghaXNBcnJheShkcml2ZXJzKSkge1xuICAgICAgICAgICAgZHJpdmVycyA9IFtkcml2ZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdXBwb3J0ZWREcml2ZXJzID0gdGhpcy5fZ2V0U3VwcG9ydGVkRHJpdmVycyhkcml2ZXJzKTtcblxuICAgICAgICBmdW5jdGlvbiBzZXREcml2ZXJUb0NvbmZpZygpIHtcbiAgICAgICAgICAgIHNlbGYuX2NvbmZpZy5kcml2ZXIgPSBzZWxmLmRyaXZlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZXh0ZW5kU2VsZldpdGhEcml2ZXIoZHJpdmVyKSB7XG4gICAgICAgICAgICBzZWxmLl9leHRlbmQoZHJpdmVyKTtcbiAgICAgICAgICAgIHNldERyaXZlclRvQ29uZmlnKCk7XG5cbiAgICAgICAgICAgIHNlbGYuX3JlYWR5ID0gc2VsZi5faW5pdFN0b3JhZ2Uoc2VsZi5fY29uZmlnKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLl9yZWFkeTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGluaXREcml2ZXIoc3VwcG9ydGVkRHJpdmVycykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudERyaXZlckluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRyaXZlclByb21pc2VMb29wKCkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY3VycmVudERyaXZlckluZGV4IDwgc3VwcG9ydGVkRHJpdmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkcml2ZXJOYW1lID0gc3VwcG9ydGVkRHJpdmVyc1tjdXJyZW50RHJpdmVySW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudERyaXZlckluZGV4Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2RiSW5mbyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9yZWFkeSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmdldERyaXZlcihkcml2ZXJOYW1lKS50aGVuKGV4dGVuZFNlbGZXaXRoRHJpdmVyKVtcImNhdGNoXCJdKGRyaXZlclByb21pc2VMb29wKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNldERyaXZlclRvQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcignTm8gYXZhaWxhYmxlIHN0b3JhZ2UgbWV0aG9kIGZvdW5kLicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9kcml2ZXJTZXQgPSBQcm9taXNlJDEucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuX2RyaXZlclNldDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZHJpdmVyUHJvbWlzZUxvb3AoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGVyZSBtaWdodCBiZSBhIGRyaXZlciBpbml0aWFsaXphdGlvbiBpbiBwcm9ncmVzc1xuICAgICAgICAvLyBzbyB3YWl0IGZvciBpdCB0byBmaW5pc2ggaW4gb3JkZXIgdG8gYXZvaWQgYSBwb3NzaWJsZVxuICAgICAgICAvLyByYWNlIGNvbmRpdGlvbiB0byBzZXQgX2RiSW5mb1xuICAgICAgICB2YXIgb2xkRHJpdmVyU2V0RG9uZSA9IHRoaXMuX2RyaXZlclNldCAhPT0gbnVsbCA/IHRoaXMuX2RyaXZlclNldFtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlJDEucmVzb2x2ZSgpO1xuICAgICAgICB9KSA6IFByb21pc2UkMS5yZXNvbHZlKCk7XG5cbiAgICAgICAgdGhpcy5fZHJpdmVyU2V0ID0gb2xkRHJpdmVyU2V0RG9uZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkcml2ZXJOYW1lID0gc3VwcG9ydGVkRHJpdmVyc1swXTtcbiAgICAgICAgICAgIHNlbGYuX2RiSW5mbyA9IG51bGw7XG4gICAgICAgICAgICBzZWxmLl9yZWFkeSA9IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmLmdldERyaXZlcihkcml2ZXJOYW1lKS50aGVuKGZ1bmN0aW9uIChkcml2ZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9kcml2ZXIgPSBkcml2ZXIuX2RyaXZlcjtcbiAgICAgICAgICAgICAgICBzZXREcml2ZXJUb0NvbmZpZygpO1xuICAgICAgICAgICAgICAgIHNlbGYuX3dyYXBMaWJyYXJ5TWV0aG9kc1dpdGhSZWFkeSgpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2luaXREcml2ZXIgPSBpbml0RHJpdmVyKHN1cHBvcnRlZERyaXZlcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0RHJpdmVyVG9Db25maWcoKTtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcignTm8gYXZhaWxhYmxlIHN0b3JhZ2UgbWV0aG9kIGZvdW5kLicpO1xuICAgICAgICAgICAgc2VsZi5fZHJpdmVyU2V0ID0gUHJvbWlzZSQxLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5fZHJpdmVyU2V0O1xuICAgICAgICB9KTtcblxuICAgICAgICBleGVjdXRlVHdvQ2FsbGJhY2tzKHRoaXMuX2RyaXZlclNldCwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcy5fZHJpdmVyU2V0O1xuICAgIH07XG5cbiAgICBMb2NhbEZvcmFnZS5wcm90b3R5cGUuc3VwcG9ydHMgPSBmdW5jdGlvbiBzdXBwb3J0cyhkcml2ZXJOYW1lKSB7XG4gICAgICAgIHJldHVybiAhIURyaXZlclN1cHBvcnRbZHJpdmVyTmFtZV07XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5fZXh0ZW5kID0gZnVuY3Rpb24gX2V4dGVuZChsaWJyYXJ5TWV0aG9kc0FuZFByb3BlcnRpZXMpIHtcbiAgICAgICAgZXh0ZW5kKHRoaXMsIGxpYnJhcnlNZXRob2RzQW5kUHJvcGVydGllcyk7XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5fZ2V0U3VwcG9ydGVkRHJpdmVycyA9IGZ1bmN0aW9uIF9nZXRTdXBwb3J0ZWREcml2ZXJzKGRyaXZlcnMpIHtcbiAgICAgICAgdmFyIHN1cHBvcnRlZERyaXZlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGRyaXZlcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkcml2ZXJOYW1lID0gZHJpdmVyc1tpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnN1cHBvcnRzKGRyaXZlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkRHJpdmVycy5wdXNoKGRyaXZlck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWREcml2ZXJzO1xuICAgIH07XG5cbiAgICBMb2NhbEZvcmFnZS5wcm90b3R5cGUuX3dyYXBMaWJyYXJ5TWV0aG9kc1dpdGhSZWFkeSA9IGZ1bmN0aW9uIF93cmFwTGlicmFyeU1ldGhvZHNXaXRoUmVhZHkoKSB7XG4gICAgICAgIC8vIEFkZCBhIHN0dWIgZm9yIGVhY2ggZHJpdmVyIEFQSSBtZXRob2QgdGhhdCBkZWxheXMgdGhlIGNhbGwgdG8gdGhlXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgZHJpdmVyIG1ldGhvZCB1bnRpbCBsb2NhbEZvcmFnZSBpcyByZWFkeS4gVGhlc2Ugc3R1YnNcbiAgICAgICAgLy8gd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgZHJpdmVyIG1ldGhvZHMgYXMgc29vbiBhcyB0aGUgZHJpdmVyIGlzXG4gICAgICAgIC8vIGxvYWRlZCwgc28gdGhlcmUgaXMgbm8gcGVyZm9ybWFuY2UgaW1wYWN0LlxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gTGlicmFyeU1ldGhvZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNhbGxXaGVuUmVhZHkodGhpcywgTGlicmFyeU1ldGhvZHNbaV0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIExvY2FsRm9yYWdlLnByb3RvdHlwZS5jcmVhdGVJbnN0YW5jZSA9IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMb2NhbEZvcmFnZShvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIExvY2FsRm9yYWdlO1xufSgpO1xuXG4vLyBUaGUgYWN0dWFsIGxvY2FsRm9yYWdlIG9iamVjdCB0aGF0IHdlIGV4cG9zZSBhcyBhIG1vZHVsZSBvciB2aWEgYVxuLy8gZ2xvYmFsLiBJdCdzIGV4dGVuZGVkIGJ5IHB1bGxpbmcgaW4gb25lIG9mIG91ciBvdGhlciBsaWJyYXJpZXMuXG5cblxudmFyIGxvY2FsZm9yYWdlX2pzID0gbmV3IExvY2FsRm9yYWdlKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbG9jYWxmb3JhZ2VfanM7XG5cbn0se1wiM1wiOjN9XX0se30sWzRdKSg0KVxufSk7XG4iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuLyoqXG4gKiBAY2xhc3NcbiAqIEBpZ25vcmVcbiAqL1xuY2xhc3MgRXZlbnRzQmFzZSB7XG4gICAgZXh0ZW5kIChldmVudHMsIGNvbmZpZykge1xuICAgICAgICBpZiAoIWV2ZW50cykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBvdmVycmlkZSA9IGNvbmZpZyA/IGNvbmZpZy5vdmVycmlkZSA6IGZhbHNlO1xuICAgICAgICBsZXQgcHVibGljT25seSA9IGNvbmZpZyA/IGNvbmZpZy5wdWJsaWNPbmx5IDogZmFsc2U7XG5cblxuICAgICAgICBmb3IgKGNvbnN0IGV2dCBpbiBldmVudHMpIHtcbiAgICAgICAgICAgIGlmICghZXZlbnRzLmhhc093blByb3BlcnR5KGV2dCkgfHwgKHRoaXNbZXZ0XSAmJiAhb3ZlcnJpZGUpKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChwdWJsaWNPbmx5ICYmIGV2ZW50c1tldnRdLmluZGV4T2YoJ3B1YmxpY18nKSA9PT0gLTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpc1tldnRdID0gZXZlbnRzW2V2dF07XG5cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRzQmFzZTsiLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuaW1wb3J0IE9mZmxpbmVDb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMvT2ZmbGluZUNvbnN0YW50cyc7XG5pbXBvcnQgT2ZmbGluZVN0cmVhbSBmcm9tICcuL09mZmxpbmVTdHJlYW0nO1xuaW1wb3J0IE9mZmxpbmVJbmRleERCTWFuaWZlc3RQYXJzZXIgZnJvbSAnLi91dGlscy9PZmZsaW5lSW5kZXhEQk1hbmlmZXN0UGFyc2VyJztcbmltcG9ydCBPZmZsaW5lRXJyb3JzIGZyb20gJy4vZXJyb3JzL09mZmxpbmVFcnJvcnMnO1xuXG4vKipcbiAqIEBjbGFzcyBPZmZsaW5lRG93bmxvYWRcbiAqL1xuZnVuY3Rpb24gT2ZmbGluZURvd25sb2FkKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAgIGNvbnN0IG1hbmlmZXN0TG9hZGVyID0gY29uZmlnLm1hbmlmZXN0TG9hZGVyO1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlcjtcbiAgICBjb25zdCBvZmZsaW5lU3RvcmVDb250cm9sbGVyID0gY29uZmlnLm9mZmxpbmVTdG9yZUNvbnRyb2xsZXI7XG4gICAgY29uc3QgbWFuaWZlc3RJZCA9IGNvbmZpZy5pZDtcbiAgICBjb25zdCBldmVudEJ1cyA9IGNvbmZpZy5ldmVudEJ1cztcbiAgICBjb25zdCBlcnJIYW5kbGVyID0gY29uZmlnLmVyckhhbmRsZXI7XG4gICAgY29uc3QgZXZlbnRzID0gY29uZmlnLmV2ZW50cztcbiAgICBjb25zdCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcbiAgICBjb25zdCBtYW5pZmVzdFVwZGF0ZXIgPSBjb25maWcubWFuaWZlc3RVcGRhdGVyO1xuICAgIGNvbnN0IGJhc2VVUkxDb250cm9sbGVyID0gY29uZmlnLmJhc2VVUkxDb250cm9sbGVyO1xuICAgIGNvbnN0IGNvbnN0YW50cyA9IGNvbmZpZy5jb25zdGFudHM7XG4gICAgY29uc3QgZGFzaENvbnN0YW50cyA9IGNvbmZpZy5kYXNoQ29uc3RhbnRzO1xuICAgIGNvbnN0IHVybFV0aWxzID0gY29uZmlnLnVybFV0aWxzO1xuXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcblxuICAgIGxldCBpbnN0YW5jZSxcbiAgICAgICAgbG9nZ2VyLFxuICAgICAgICBfbWFuaWZlc3RVUkwsXG4gICAgICAgIF9vZmZsaW5lVVJMLFxuICAgICAgICBfeG1sTWFuaWZlc3QsXG4gICAgICAgIF9zdHJlYW1zLFxuICAgICAgICBfbWFuaWZlc3QsXG4gICAgICAgIF9pc0Rvd25sb2FkaW5nU3RhdHVzLFxuICAgICAgICBfaXNDb21wb3NlZCxcbiAgICAgICAgX3JlcHJlc2VudGF0aW9uc1RvVXBkYXRlLFxuICAgICAgICBfaW5kZXhEQk1hbmlmZXN0UGFyc2VyLFxuICAgICAgICBfcHJvZ3Jlc3Npb25CeUlkLFxuICAgICAgICBfcHJvZ3Jlc3Npb24sXG4gICAgICAgIF9zdGF0dXM7XG5cblxuICAgIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgICAgICBsb2dnZXIgPSBkZWJ1Zy5nZXRMb2dnZXIoaW5zdGFuY2UpO1xuICAgICAgICBtYW5pZmVzdFVwZGF0ZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICBfc3RyZWFtcyA9IFtdO1xuICAgICAgICBfaXNEb3dubG9hZGluZ1N0YXR1cyA9IGZhbHNlO1xuICAgICAgICBfaXNDb21wb3NlZCA9IGZhbHNlO1xuICAgICAgICBfcHJvZ3Jlc3Npb25CeUlkID0ge307XG4gICAgICAgIF9wcm9ncmVzc2lvbiA9IDA7XG4gICAgICAgIF9zdGF0dXMgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SWQoKSB7XG4gICAgICAgIHJldHVybiBtYW5pZmVzdElkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9mZmxpbmVVcmwgKCkge1xuICAgICAgICByZXR1cm4gX29mZmxpbmVVUkw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWFuaWZlc3RVcmwgKCkge1xuICAgICAgICByZXR1cm4gX21hbmlmZXN0VVJMO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN0YXR1cyAoKSB7XG4gICAgICAgIHJldHVybiBfc3RhdHVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEluaXRpYWxTdGF0ZShzdGF0ZSkge1xuICAgICAgICBfb2ZmbGluZVVSTCA9IHN0YXRlLnVybDtcbiAgICAgICAgX3Byb2dyZXNzaW9uID0gc3RhdGUucHJvZ3Jlc3M7XG4gICAgICAgIF9tYW5pZmVzdFVSTCA9IHN0YXRlLm9yaWdpbmFsVXJsO1xuICAgICAgICBfc3RhdHVzID0gc3RhdGUuc3RhdHVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvd25sb2FkIGEgc3RyZWFtLCBmcm9tIHVybCBvZiBtYW5pZmVzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkb3dubG9hZEZyb21VcmwodXJsKSB7XG4gICAgICAgIF9tYW5pZmVzdFVSTCA9IHVybDtcbiAgICAgICAgX29mZmxpbmVVUkwgPSBgJHtPZmZsaW5lQ29uc3RhbnRzLk9GRkxJTkVfU0NIRU1FfTovLyR7bWFuaWZlc3RJZH1gO1xuICAgICAgICBfc3RhdHVzID0gT2ZmbGluZUNvbnN0YW50cy5PRkZMSU5FX1NUQVRVU19DUkVBVEVEO1xuICAgICAgICBzZXR1cE9mZmxpbmVFdmVudHMoKTtcbiAgICAgICAgbGV0IG9mZmxpbmVNYW5pZmVzdCA9IHtcbiAgICAgICAgICAgICdmcmFnbWVudFN0b3JlJzogbWFuaWZlc3RJZCxcbiAgICAgICAgICAgICdzdGF0dXMnOiBfc3RhdHVzLFxuICAgICAgICAgICAgJ21hbmlmZXN0SWQnOiBtYW5pZmVzdElkLFxuICAgICAgICAgICAgJ3VybCc6IF9vZmZsaW5lVVJMLFxuICAgICAgICAgICAgJ29yaWdpbmFsVVJMJzogdXJsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjcmVhdGVPZmZsaW5lTWFuaWZlc3Qob2ZmbGluZU1hbmlmZXN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0RG93bmxvYWQoKSB7XG4gICAgICAgIG1hbmlmZXN0TG9hZGVyLmxvYWQoX21hbmlmZXN0VVJMKTtcbiAgICAgICAgX2lzRG93bmxvYWRpbmdTdGF0dXMgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwT2ZmbGluZUV2ZW50cygpIHtcbiAgICAgICAgZXZlbnRCdXMub24oZXZlbnRzLk1BTklGRVNUX1VQREFURUQsIG9uTWFuaWZlc3RVcGRhdGVkLCBpbnN0YW5jZSk7XG4gICAgICAgIGV2ZW50QnVzLm9uKGV2ZW50cy5PUklHSU5BTF9NQU5JRkVTVF9MT0FERUQsIG9uT3JpZ2luYWxNYW5pZmVzdExvYWRlZCwgaW5zdGFuY2UpO1xuICAgICAgICBzZXR1cEluZGV4ZWREQkV2ZW50cygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwSW5kZXhlZERCRXZlbnRzKCkge1xuICAgICAgICBldmVudEJ1cy5vbihldmVudHMuRVJST1IsIG9uRXJyb3IsIGluc3RhbmNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0Rvd25sb2FkaW5nKCkge1xuICAgICAgICByZXR1cm4gX2lzRG93bmxvYWRpbmdTdGF0dXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NYW5pZmVzdFVwZGF0ZWQoZSkge1xuICAgICAgICBpZiAoX2lzQ29tcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWUuZXJyb3IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX21hbmlmZXN0ID0gZS5tYW5pZmVzdDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIF9zdGF0dXMgPSBPZmZsaW5lQ29uc3RhbnRzLk9GRkxJTkVfU1RBVFVTX0VSUk9SO1xuICAgICAgICAgICAgICAgIGVyckhhbmRsZXIuZXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBPZmZsaW5lRXJyb3JzLk9GRkxJTkVfRVJST1IsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbWFuaWZlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogX3N0YXR1c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRvd25sb2FkaW5nU3RhcnRlZChlKSB7XG4gICAgICAgIGlmIChlLmlkICE9PSBtYW5pZmVzdElkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlLmVycm9yICYmIG1hbmlmZXN0SWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIF9zdGF0dXMgPSBPZmZsaW5lQ29uc3RhbnRzLk9GRkxJTkVfU1RBVFVTX1NUQVJURUQ7XG4gICAgICAgICAgICBvZmZsaW5lU3RvcmVDb250cm9sbGVyLnNldERvd25sb2FkaW5nU3RhdHVzKG1hbmlmZXN0SWQsIF9zdGF0dXMpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoZXZlbnRzLkRPV05MT0FESU5HX1NUQVJURUQsIHtpZDogbWFuaWZlc3RJZCwgbWVzc2FnZTogJ0Rvd25sb2FkaW5nIHN0YXJ0ZWQgZm9yIHRoaXMgc3RyZWFtICEnfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9zdGF0dXMgPSBPZmZsaW5lQ29uc3RhbnRzLk9GRkxJTkVfU1RBVFVTX0VSUk9SO1xuICAgICAgICAgICAgZXJySGFuZGxlci5lcnJvcih7XG4gICAgICAgICAgICAgICAgY29kZTogT2ZmbGluZUVycm9ycy5PRkZMSU5FX0VSUk9SLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdDYW5ub3Qgc3RhcnQgZG93bmxvYWQgJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtYW5pZmVzdElkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IF9zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlLmVycm9yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBPblN0cmVhbVByb2dyZXNzaW9uKHN0cmVhbSwgZG93bmxvYWRlZCwgYXZhaWxhYmxlKSB7XG5cbiAgICAgICAgX3Byb2dyZXNzaW9uQnlJZFtzdHJlYW0uZ2V0U3RyZWFtSW5mbygpLmlkXSA9IHtcbiAgICAgICAgICAgIGRvd25sb2FkZWQsXG4gICAgICAgICAgICBhdmFpbGFibGVcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc2VnbWVudHMgPSAwO1xuICAgICAgICBsZXQgYWxsU2VnbWVudHMgPSAwO1xuICAgICAgICBsZXQgd2FpdEZvckFsbFByb2dyZXNzO1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBfcHJvZ3Jlc3Npb25CeUlkKSB7XG4gICAgICAgICAgICBpZiAoX3Byb2dyZXNzaW9uQnlJZC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3Byb2dyZXNzaW9uQnlJZFtwcm9wZXJ0eV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FpdEZvckFsbFByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cyArPSBfcHJvZ3Jlc3Npb25CeUlkW3Byb3BlcnR5XS5kb3dubG9hZGVkO1xuICAgICAgICAgICAgICAgICAgICBhbGxTZWdtZW50cyArPSBfcHJvZ3Jlc3Npb25CeUlkW3Byb3BlcnR5XS5hdmFpbGFibGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF3YWl0Rm9yQWxsUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIC8vIGFsbCBwcm9ncmVzc2lvbiBoYXZlIGJlZW4gc3RhcnRlZCwgd2UgY2FuIGNvbXB1dGUgZ2xvYmFsIHByb2dyZXNzaW9uXG4gICAgICAgICAgICBfcHJvZ3Jlc3Npb24gPSBzZWdtZW50cyAvIGFsbFNlZ21lbnRzO1xuXG4gICAgICAgICAgICAvLyBzdG9yZSBwcm9ncmVzc2lvblxuICAgICAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlci5nZXRNYW5pZmVzdEJ5SWQobWFuaWZlc3RJZClcbiAgICAgICAgICAgICAgICAudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnByb2dyZXNzID0gX3Byb2dyZXNzaW9uO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlT2ZmbGluZU1hbmlmZXN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Eb3dubG9hZGluZ0ZpbmlzaGVkKGUpIHtcbiAgICAgICAgaWYgKGUuaWQgIT09IG1hbmlmZXN0SWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWUuZXJyb3IgJiYgbWFuaWZlc3RJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgX3N0YXR1cyA9IE9mZmxpbmVDb25zdGFudHMuT0ZGTElORV9TVEFUVVNfRklOSVNIRUQ7XG4gICAgICAgICAgICBvZmZsaW5lU3RvcmVDb250cm9sbGVyLnNldERvd25sb2FkaW5nU3RhdHVzKG1hbmlmZXN0SWQsIF9zdGF0dXMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcihldmVudHMuRE9XTkxPQURJTkdfRklOSVNIRUQsIHtpZDogbWFuaWZlc3RJZCwgbWVzc2FnZTogJ0Rvd25sb2FkaW5nIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWQgZm9yIHRoaXMgc3RyZWFtICEnfSk7XG4gICAgICAgICAgICAgICAgcmVzZXREb3dubG9hZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfc3RhdHVzID0gT2ZmbGluZUNvbnN0YW50cy5PRkZMSU5FX1NUQVRVU19FUlJPUjtcbiAgICAgICAgICAgIGVyckhhbmRsZXIuZXJyb3Ioe1xuICAgICAgICAgICAgICAgIGNvZGU6IE9mZmxpbmVFcnJvcnMuT0ZGTElORV9FUlJPUixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3IgZmluaXNoaW5nIGRvd25sb2FkICcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBpZDogbWFuaWZlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBfc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZS5lcnJvclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NYW5pZmVzdFVwZGF0ZU5lZWRlZChlKSB7XG4gICAgICAgIGlmIChlLmlkICE9PSBtYW5pZmVzdElkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfcmVwcmVzZW50YXRpb25zVG9VcGRhdGUgPSBlLnJlcHJlc2VudGF0aW9ucztcblxuICAgICAgICBpZiAoX3JlcHJlc2VudGF0aW9uc1RvVXBkYXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIF9pbmRleERCTWFuaWZlc3RQYXJzZXIucGFyc2UoX3htbE1hbmlmZXN0LCBfcmVwcmVzZW50YXRpb25zVG9VcGRhdGUpLnRoZW4oZnVuY3Rpb24gKHBhcnNlZE1hbmlmZXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZE1hbmlmZXN0ICE9PSBudWxsICYmIG1hbmlmZXN0SWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlci5nZXRNYW5pZmVzdEJ5SWQobWFuaWZlc3RJZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubWFuaWZlc3QgPSBwYXJzZWRNYW5pZmVzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVPZmZsaW5lTWFuaWZlc3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbG4gPSBfc3RyZWFtcy5sZW5ndGg7IGkgPCBsbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3N0cmVhbXNbaV0uc3RhcnRPZmZsaW5lU3RyZWFtUHJvY2Vzc29ycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyAnZmFsbGluZyBwYXJzaW5nIG9mZmxpbmUgbWFuaWZlc3QnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXBvc2VTdHJlYW1zKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYWRhcHRlci51cGRhdGVQZXJpb2RzKF9tYW5pZmVzdCk7XG4gICAgICAgICAgICBiYXNlVVJMQ29udHJvbGxlci5pbml0aWFsaXplKF9tYW5pZmVzdCk7XG4gICAgICAgICAgICBjb25zdCBzdHJlYW1zSW5mbyA9IGFkYXB0ZXIuZ2V0U3RyZWFtc0luZm8oKTtcbiAgICAgICAgICAgIGlmIChzdHJlYW1zSW5mby5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBfc3RhdHVzID0gT2ZmbGluZUNvbnN0YW50cy5PRkZMSU5FX1NUQVRVU19FUlJPUjtcbiAgICAgICAgICAgICAgICBlcnJIYW5kbGVyLmVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogT2ZmbGluZUVycm9ycy5PRkZMSU5FX0VSUk9SLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnQ2Fubm90IGRvd25sb2FkIC0gbm8gc3RyZWFtcycsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtYW5pZmVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBfc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsbiA9IHN0cmVhbXNJbmZvLmxlbmd0aDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJlYW1JbmZvID0gc3RyZWFtc0luZm9baV07XG4gICAgICAgICAgICAgICAgbGV0IHN0cmVhbSA9IE9mZmxpbmVTdHJlYW0oY29udGV4dCkuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1hbmlmZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRlZDogb25Eb3dubG9hZGluZ1N0YXJ0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc2lvbjogT25TdHJlYW1Qcm9ncmVzc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmlzaGVkOiBvbkRvd25sb2FkaW5nRmluaXNoZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVNYW5pZmVzdE5lZWRlZDogb25NYW5pZmVzdFVwZGF0ZU5lZWRlZFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb25zdGFudHM6IGNvbnN0YW50cyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXM6IGV2ZW50QnVzLFxuICAgICAgICAgICAgICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgICAgICAgICAgICAgZGVidWc6IGRlYnVnLFxuICAgICAgICAgICAgICAgICAgICBhZGFwdGVyOiBhZGFwdGVyLFxuICAgICAgICAgICAgICAgICAgICBvZmZsaW5lU3RvcmVDb250cm9sbGVyOiBvZmZsaW5lU3RvcmVDb250cm9sbGVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3N0cmVhbXMucHVzaChzdHJlYW0pO1xuXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhbGlzZSBzdHJlYW0gYW5kIGdldCBkb3dubG9hZGFibGUgcmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAgICAgc3RyZWFtLmluaXRpYWxpemUoc3RyZWFtSW5mbyk7XG4gICAgICAgICAgICAgICAgX3Byb2dyZXNzaW9uQnlJZFtzdHJlYW1JbmZvLmlkXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfaXNDb21wb3NlZCA9IHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKGUpO1xuICAgICAgICAgICAgX3N0YXR1cyA9IE9mZmxpbmVDb25zdGFudHMuT0ZGTElORV9TVEFUVVNfRVJST1I7XG4gICAgICAgICAgICBlcnJIYW5kbGVyLmVycm9yKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBPZmZsaW5lRXJyb3JzLk9GRkxJTkVfRVJST1IsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1hbmlmZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogX3N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGUuZXJyb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERvd25sb2FkYWJsZVJlcHJlc2VudGF0aW9ucygpIHtcbiAgICAgICAgX3N0cmVhbXMuZm9yRWFjaChzdHJlYW0gPT4ge1xuICAgICAgICAgICAgc3RyZWFtLmdldERvd25sb2FkYWJsZVJlcHJlc2VudGF0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGRhdGFic3NlIHRvIHN0b3JlIGZyYWdtZW50c1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYW5pZmVzdElkXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRTdG9yZShtYW5pZmVzdElkKSB7XG4gICAgICAgIHJldHVybiBvZmZsaW5lU3RvcmVDb250cm9sbGVyLmNyZWF0ZUZyYWdtZW50U3RvcmUobWFuaWZlc3RJZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgaW4gZGF0YWJhc2UgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBvZmZsaW5lIG1hbmlmZXN0ICh3aXRoIG9ubHkgZG93bmxvYWRlZCByZXByZXNlbnRhdGlvbnMpXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9mZmxpbmVNYW5pZmVzdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU9mZmxpbmVNYW5pZmVzdChvZmZsaW5lTWFuaWZlc3QpIHtcbiAgICAgICAgcmV0dXJuIG9mZmxpbmVTdG9yZUNvbnRyb2xsZXIuY3JlYXRlT2ZmbGluZU1hbmlmZXN0KG9mZmxpbmVNYW5pZmVzdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgaW4gZGF0YWJhc2UgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBvZmZsaW5lIG1hbmlmZXN0ICh3aXRoIG9ubHkgZG93bmxvYWRlZCByZXByZXNlbnRhdGlvbnMpXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9mZmxpbmVNYW5pZmVzdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZU9mZmxpbmVNYW5pZmVzdChvZmZsaW5lTWFuaWZlc3QpIHtcbiAgICAgICAgcmV0dXJuIG9mZmxpbmVTdG9yZUNvbnRyb2xsZXIudXBkYXRlT2ZmbGluZU1hbmlmZXN0KG9mZmxpbmVNYW5pZmVzdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIHdoZW4gbWFuaWZlc3QgaXMgbG9hZGVkIGZyb20gaW50ZXJuZXQuXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uT3JpZ2luYWxNYW5pZmVzdExvYWRlZChlKSB7XG4gICAgICAgIC8vIHVucmVnaXN0ZXIgZm9ybSBldmVudFxuICAgICAgICBldmVudEJ1cy5vZmYoZXZlbnRzLk9SSUdJTkFMX01BTklGRVNUX0xPQURFRCwgb25PcmlnaW5hbE1hbmlmZXN0TG9hZGVkLCBpbnN0YW5jZSk7XG5cbiAgICAgICAgX3htbE1hbmlmZXN0ID0gZS5vcmlnaW5hbE1hbmlmZXN0O1xuXG4gICAgICAgIGlmIChfbWFuaWZlc3QudHlwZSA9PT0gZGFzaENvbnN0YW50cy5EWU5BTUlDKSB7XG4gICAgICAgICAgICBfc3RhdHVzID0gT2ZmbGluZUNvbnN0YW50cy5PRkZMSU5FX1NUQVRVU19FUlJPUjtcbiAgICAgICAgICAgIGVyckhhbmRsZXIuZXJyb3Ioe1xuICAgICAgICAgICAgICAgIGNvZGU6IE9mZmxpbmVFcnJvcnMuT0ZGTElORV9FUlJPUixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnQ2Fubm90IGhhbmRsZSBEWU5BTUlDIG1hbmlmZXN0JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtYW5pZmVzdElkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IF9zdGF0dXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignQ2Fubm90IGhhbmRsZSBEWU5BTUlDIG1hbmlmZXN0Jyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfbWFuaWZlc3QuUGVyaW9kX2FzQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgX3N0YXR1cyA9IE9mZmxpbmVDb25zdGFudHMuT0ZGTElORV9TVEFUVVNfRVJST1I7XG4gICAgICAgICAgICBlcnJIYW5kbGVyLmVycm9yKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBPZmZsaW5lRXJyb3JzLk9GRkxJTkVfRVJST1IsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ011bHRpUGVyaW9kIG1hbmlmZXN0IGFyZSBub3QgeWV0IHN1cHBvcnRlZCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBpZDogbWFuaWZlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBfc3RhdHVzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ011bHRpUGVyaW9kIG1hbmlmZXN0IGFyZSBub3QgeWV0IHN1cHBvcnRlZCcpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzYXZlIG9yaWdpbmFsIG1hbmlmZXN0IChmb3IgcmVzdW1lKVxuXG4gICAgICAgIC8vIGluaXRpYWxpc2Ugb2ZmbGluZSBzdHJlYW1zXG4gICAgICAgIGNvbXBvc2VTdHJlYW1zKF9tYW5pZmVzdCk7XG5cbiAgICAgICAgLy8gZ2V0IGRvd25sb2FkYWJsZSByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgZ2V0RG93bmxvYWRhYmxlUmVwcmVzZW50YXRpb25zKCk7XG5cbiAgICAgICAgZXZlbnRCdXMudHJpZ2dlcihldmVudHMuU1RSRUFNU19DT01QT1NFRCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUFsbE1lZGlhc0luZm9MaXN0KHNlbGVjdGVkUmVwcmVzZW50YXRpb25zKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3N0cmVhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIF9zdHJlYW1zW2ldLmluaXRpYWxpemVBbGxNZWRpYXNJbmZvTGlzdChzZWxlY3RlZFJlcHJlc2VudGF0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRTZWxlY3RlZFJlcHJlc2VudGF0aW9ucyhzZWxlY3RlZFJlcHJlc2VudGF0aW9ucykge1xuICAgICAgICBsZXQgcmV0ID0ge1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldFtjb25zdGFudHMuVklERU9dID0gW107XG4gICAgICAgIHJldFtjb25zdGFudHMuQVVESU9dID0gW107XG4gICAgICAgIHJldFtjb25zdGFudHMuVEVYVF0gPSBbXTtcbiAgICAgICAgcmV0W2NvbnN0YW50cy5GUkFHTUVOVEVEX1RFWFRdID0gW107XG4gICAgICAgIHNlbGVjdGVkUmVwcmVzZW50YXRpb25zLnZpZGVvLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICByZXRbY29uc3RhbnRzLlZJREVPXS5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZWN0ZWRSZXByZXNlbnRhdGlvbnMuYXVkaW8uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldFtjb25zdGFudHMuQVVESU9dLnB1c2goaXRlbS5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3RlZFJlcHJlc2VudGF0aW9ucy50ZXh0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICByZXRbaXRlbS50eXBlXS5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0RG93bmxvYWQoc2VsZWN0ZWRSZXByZXNlbnRhdGlvbnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXAgPSBmb3JtYXRTZWxlY3RlZFJlcHJlc2VudGF0aW9ucyhzZWxlY3RlZFJlcHJlc2VudGF0aW9ucyk7XG5cbiAgICAgICAgICAgIG9mZmxpbmVTdG9yZUNvbnRyb2xsZXIuc2F2ZVNlbGVjdGVkUmVwcmVzZW50YXRpb25zKG1hbmlmZXN0SWQsIHJlcClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlRnJhZ21lbnRTdG9yZShtYW5pZmVzdElkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlT2ZmbGluZU1hbmlmZXN0KF94bWxNYW5pZmVzdCwgcmVwLCBtYW5pZmVzdElkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZUFsbE1lZGlhc0luZm9MaXN0KHJlcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfc3RhdHVzID0gT2ZmbGluZUNvbnN0YW50cy5PRkZMSU5FX1NUQVRVU19FUlJPUjtcbiAgICAgICAgICAgIGVyckhhbmRsZXIuZXJyb3Ioe1xuICAgICAgICAgICAgICAgIGNvZGU6IE9mZmxpbmVFcnJvcnMuT0ZGTElORV9FUlJPUixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnIubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtYW5pZmVzdElkLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IF9zdGF0dXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgcGFyc2VyIHVzZWQgdG8gY29udmVydCBvcmlnaW5hbCBtYW5pZmVzdCBpbiBvZmZsaW5lIG1hbmlmZXN0XG4gICAgICogQ3JlYXRlcyBhIEpTT04gb2JqZWN0IHRoYXQgd2lsbCBiZSBzdG9yZWQgaW4gZGF0YWJhc2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gWE1MTWFuaWZlc3RcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBzZWxlY3RlZFJlcHJlc2VudGF0aW9uc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYW5pZmVzdElkXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVPZmZsaW5lTWFuaWZlc3QoWE1MTWFuaWZlc3QsIHNlbGVjdGVkUmVwcmVzZW50YXRpb25zLCBtYW5pZmVzdElkKSB7XG4gICAgICAgIF9pbmRleERCTWFuaWZlc3RQYXJzZXIgPSBPZmZsaW5lSW5kZXhEQk1hbmlmZXN0UGFyc2VyKGNvbnRleHQpLmNyZWF0ZSh7XG4gICAgICAgICAgICBtYW5pZmVzdElkOiBtYW5pZmVzdElkLFxuICAgICAgICAgICAgYWxsTWVkaWFJbmZvczogc2VsZWN0ZWRSZXByZXNlbnRhdGlvbnMsXG4gICAgICAgICAgICBkZWJ1ZzogZGVidWcsXG4gICAgICAgICAgICBkYXNoQ29uc3RhbnRzOiBkYXNoQ29uc3RhbnRzLFxuICAgICAgICAgICAgY29uc3RhbnRzOiBjb25zdGFudHMsXG4gICAgICAgICAgICB1cmxVdGlsczogdXJsVXRpbHNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIF9pbmRleERCTWFuaWZlc3RQYXJzZXIucGFyc2UoWE1MTWFuaWZlc3QpLnRoZW4oZnVuY3Rpb24gKHBhcnNlZE1hbmlmZXN0KSB7XG4gICAgICAgICAgICBpZiAocGFyc2VkTWFuaWZlc3QgIT09IG51bGwgJiYgbWFuaWZlc3RJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvZmZsaW5lU3RvcmVDb250cm9sbGVyLmdldE1hbmlmZXN0QnlJZChtYW5pZmVzdElkKVxuICAgICAgICAgICAgICAgIC50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luYWxVUkwgPSBfbWFuaWZlc3QudXJsO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbmFsTWFuaWZlc3QgPSBfbWFuaWZlc3Q7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubWFuaWZlc3QgPSBwYXJzZWRNYW5pZmVzdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU9mZmxpbmVNYW5pZmVzdChpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdmYWxsaW5nIHBhcnNpbmcgb2ZmbGluZSBtYW5pZmVzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgZG93bmxvYWRpbmcgb2YgZnJhZ21lbnRzXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3RvcERvd25sb2FkKCkge1xuICAgICAgICBpZiAobWFuaWZlc3RJZCAhPT0gbnVsbCAmJiBpc0Rvd25sb2FkaW5nKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsbiA9IF9zdHJlYW1zLmxlbmd0aDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfc3RyZWFtc1tpXS5zdG9wT2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHN0cmVhbXNcbiAgICAgICAgICAgIF9zdHJlYW1zID0gW107XG5cbiAgICAgICAgICAgIF9pc0NvbXBvc2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIF9zdGF0dXMgPSBPZmZsaW5lQ29uc3RhbnRzLk9GRkxJTkVfU1RBVFVTX1NUT1BQRUQ7XG4gICAgICAgICAgICAvLyB1cGRhdGUgc3RhdHVzXG4gICAgICAgICAgICBvZmZsaW5lU3RvcmVDb250cm9sbGVyLnNldERvd25sb2FkaW5nU3RhdHVzKG1hbmlmZXN0SWQsIF9zdGF0dXMpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoZXZlbnRzLkRPV05MT0FESU5HX1NUT1BQRUQsIHtcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBpZDogbWFuaWZlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBfc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRG93bmxvYWRpbmcgaGFzIGJlZW4gc3RvcHBlZCBmb3IgdGhpcyBzdHJlYW0gISdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfaXNEb3dubG9hZGluZ1N0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYW4gb2ZmbGluZSBtYW5pZmVzdCAoYW5kIGFsbCBvZiBpdHMgZGF0YSlcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWxldGVEb3dubG9hZCgpIHtcbiAgICAgICAgc3RvcERvd25sb2FkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzdW1lIGRvd25sb2FkIG9mIGEgc3RyZWFtXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzdW1lRG93bmxvYWQoKSB7XG4gICAgICAgIGlmICghaXNEb3dubG9hZGluZygpKSB7XG4gICAgICAgICAgICBfaXNEb3dubG9hZGluZ1N0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFJlcHJlc2VudGF0aW9uO1xuXG4gICAgICAgICAgICBvZmZsaW5lU3RvcmVDb250cm9sbGVyLmdldE1hbmlmZXN0QnlJZChtYW5pZmVzdElkKVxuICAgICAgICAgICAgLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBfbWFuaWZlc3QgPSBpdGVtLm9yaWdpbmFsTWFuaWZlc3Q7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSZXByZXNlbnRhdGlvbiA9IGl0ZW0uc2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICBjb21wb3NlU3RyZWFtcyhfbWFuaWZlc3QpO1xuICAgICAgICAgICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoZXZlbnRzLlNUUkVBTVNfQ09NUE9TRUQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50U3RvcmUobWFuaWZlc3RJZCk7XG4gICAgICAgICAgICB9KS4gdGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZUFsbE1lZGlhc0luZm9MaXN0KHNlbGVjdGVkUmVwcmVzZW50YXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHRoZSBwcm9ncmVzc2lvbiBvZiBkb3dubG9hZFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldERvd25sb2FkUHJvZ3Jlc3Npb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKF9wcm9ncmVzc2lvbiAqIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgZXZlbnRzIGxpc3RlbmVyc1xuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc2V0RG93bmxvYWQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsbiA9IF9zdHJlYW1zLmxlbmd0aDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgICAgIF9zdHJlYW1zW2ldLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgX2luZGV4REJNYW5pZmVzdFBhcnNlciA9IG51bGw7XG4gICAgICAgIF9pc0Rvd25sb2FkaW5nU3RhdHVzID0gZmFsc2U7XG4gICAgICAgIF9zdHJlYW1zID0gW107XG4gICAgICAgIGV2ZW50QnVzLm9mZihldmVudHMuTUFOSUZFU1RfVVBEQVRFRCwgb25NYW5pZmVzdFVwZGF0ZWQsIGluc3RhbmNlKTtcbiAgICAgICAgZXZlbnRCdXMub2ZmKGV2ZW50cy5PUklHSU5BTF9NQU5JRkVTVF9MT0FERUQsIG9uT3JpZ2luYWxNYW5pZmVzdExvYWRlZCwgaW5zdGFuY2UpO1xuICAgICAgICByZXNldEluZGV4ZWREQkV2ZW50cygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRXJyb3IoZSkge1xuICAgICAgICBpZiAoIGUuZXJyb3IuY29kZSA9PT0gT2ZmbGluZUVycm9ycy5JTkRFWEVEREJfUVVPVEFfRVhDRUVEX0VSUk9SIHx8XG4gICAgICAgICAgICAgZS5lcnJvci5jb2RlID09PSBPZmZsaW5lRXJyb3JzLklOREVYRUREQl9JTlZBTElEX1NUQVRFX0VSUk9SICkge1xuICAgICAgICAgICAgc3RvcERvd25sb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldEluZGV4ZWREQkV2ZW50cygpIHtcbiAgICAgICAgZXZlbnRCdXMub24oZXZlbnRzLkVSUk9SLCBvbkVycm9yLCBpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgaWYgKGlzRG93bmxvYWRpbmcoKSkge1xuICAgICAgICAgICAgcmVzZXREb3dubG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VVUkxDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgIG1hbmlmZXN0VXBkYXRlci5yZXNldCgpO1xuICAgIH1cblxuICAgIGluc3RhbmNlID0ge1xuICAgICAgICByZXNldDogcmVzZXQsXG4gICAgICAgIGdldElkOiBnZXRJZCxcbiAgICAgICAgZ2V0T2ZmbGluZVVybDogZ2V0T2ZmbGluZVVybCxcbiAgICAgICAgZ2V0TWFuaWZlc3RVcmw6IGdldE1hbmlmZXN0VXJsLFxuICAgICAgICBnZXRTdGF0dXM6IGdldFN0YXR1cyxcbiAgICAgICAgc2V0SW5pdGlhbFN0YXRlOiBzZXRJbml0aWFsU3RhdGUsXG4gICAgICAgIGluaXREb3dubG9hZDogaW5pdERvd25sb2FkLFxuICAgICAgICBkb3dubG9hZEZyb21Vcmw6IGRvd25sb2FkRnJvbVVybCxcbiAgICAgICAgc3RhcnREb3dubG9hZDogc3RhcnREb3dubG9hZCxcbiAgICAgICAgc3RvcERvd25sb2FkOiBzdG9wRG93bmxvYWQsXG4gICAgICAgIHJlc3VtZURvd25sb2FkOiByZXN1bWVEb3dubG9hZCxcbiAgICAgICAgZGVsZXRlRG93bmxvYWQ6IGRlbGV0ZURvd25sb2FkLFxuICAgICAgICBnZXREb3dubG9hZFByb2dyZXNzaW9uOiBnZXREb3dubG9hZFByb2dyZXNzaW9uLFxuICAgICAgICBpc0Rvd25sb2FkaW5nOiBpc0Rvd25sb2FkaW5nLFxuICAgICAgICByZXNldERvd25sb2FkOiByZXNldERvd25sb2FkXG4gICAgfTtcblxuICAgIHNldHVwKCk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbk9mZmxpbmVEb3dubG9hZC5fX2Rhc2hqc19mYWN0b3J5X25hbWUgPSAnT2ZmbGluZURvd25sb2FkJztcbmV4cG9ydCBkZWZhdWx0IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE9mZmxpbmVEb3dubG9hZCk7IC8qIGpzaGludCBpZ25vcmU6bGluZSAqL1xuIiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBPZmZsaW5lU3RyZWFtUHJvY2Vzc29yIGZyb20gJy4vT2ZmbGluZVN0cmVhbVByb2Nlc3Nvcic7XG5cbi8qKlxuICogQG1vZHVsZSAgT2ZmbGluZVN0cmVhbVxuICogQGRlc2NyaXB0aW9uIEluaXRpYWxpemUgYW5kIE1hbmFnZSBPZmZsaW5lIFN0cmVhbSBmb3IgZWFjaCB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gZGVwZW5kZW5jZXNcbiAqL1xuZnVuY3Rpb24gT2ZmbGluZVN0cmVhbShjb25maWcpIHtcblxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgIGNvbnN0IGV2ZW50QnVzID0gY29uZmlnLmV2ZW50QnVzO1xuICAgIGNvbnN0IGV2ZW50cyA9IGNvbmZpZy5ldmVudHM7XG4gICAgY29uc3QgY29uc3RhbnRzID0gY29uZmlnLmNvbnN0YW50cztcbiAgICBjb25zdCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcbiAgICBjb25zdCBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXI7XG4gICAgY29uc3Qgb2ZmbGluZVN0b3JlQ29udHJvbGxlciA9IGNvbmZpZy5vZmZsaW5lU3RvcmVDb250cm9sbGVyO1xuICAgIGNvbnN0IG1hbmlmZXN0SWQgPSBjb25maWcuaWQ7XG4gICAgY29uc3Qgc3RhcnRlZENiID0gY29uZmlnLmNhbGxiYWNrcyAmJiBjb25maWcuY2FsbGJhY2tzLnN0YXJ0ZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3Npb25DYiA9IGNvbmZpZy5jYWxsYmFja3MgJiYgY29uZmlnLmNhbGxiYWNrcy5wcm9ncmVzc2lvbjtcbiAgICBjb25zdCBmaW5pc2hlZENiID0gY29uZmlnLmNhbGxiYWNrcyAmJiBjb25maWcuY2FsbGJhY2tzLmZpbmlzaGVkO1xuICAgIGNvbnN0IHVwZGF0ZU1hbmlmZXN0ID0gY29uZmlnLmNhbGxiYWNrcyAmJiBjb25maWcuY2FsbGJhY2tzLnVwZGF0ZU1hbmlmZXN0TmVlZGVkO1xuXG4gICAgbGV0IGluc3RhbmNlLFxuICAgICAgICBvZmZsaW5lU3RyZWFtUHJvY2Vzc29ycyxcbiAgICAgICAgc3RhcnRlZE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzLFxuICAgICAgICBmaW5pc2hlZE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzLFxuICAgICAgICBzdHJlYW1JbmZvLFxuICAgICAgICByZXByZXNlbnRhdGlvbnNUb1VwZGF0ZSxcbiAgICAgICAgYWxsTWVkaWFzSW5mb3NMaXN0LFxuICAgICAgICBwcm9ncmVzc2lvbkJ5SWQ7XG5cbiAgICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICAgICAgcmVzZXRJbml0aWFsU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc2V0SW5pdGlhbFNldHRpbmdzKCkge1xuICAgICAgICBzdHJlYW1JbmZvID0gbnVsbDtcbiAgICAgICAgb2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMgPSBbXTtcbiAgICAgICAgc3RhcnRlZE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzID0gMDtcbiAgICAgICAgZmluaXNoZWRPZmZsaW5lU3RyZWFtUHJvY2Vzc29ycyA9IDA7XG4gICAgICAgIGFsbE1lZGlhc0luZm9zTGlzdCA9IFtdO1xuICAgICAgICByZXByZXNlbnRhdGlvbnNUb1VwZGF0ZSA9IFtdO1xuICAgICAgICBwcm9ncmVzc2lvbkJ5SWQgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIG9mZmxpbmVzdHJlYW1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5pdFN0cmVhbUluZm9cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKGluaXRTdHJlYW1JbmZvKSB7XG4gICAgICAgIHN0cmVhbUluZm8gPSBpbml0U3RyZWFtSW5mbztcbiAgICAgICAgZXZlbnRCdXMub24oZXZlbnRzLkRBVEFfVVBEQVRFX0NPTVBMRVRFRCwgb25EYXRhVXBkYXRlQ29tcGxldGVkLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIG1lZGlhIGJpdHJhdGUgbGlzdCwgc28gdGhhdCB1c2VyIHdpbGwgYmUgYWJsZSB0byBjaG9vc2UgdGhlIHJlcHJlc2VudGF0aW9uIGhlIHdhbnRzIHRvIGRvd25sb2FkXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RG93bmxvYWRhYmxlUmVwcmVzZW50YXRpb25zKCkge1xuICAgICAgICBsZXQgZG93bmxvYWRhYmxlUmVwcmVzZW50YXRpb25zID0ge1xuICAgICAgICAgICAgdmlkZW86IFtdLFxuICAgICAgICAgICAgYXVkaW86IFtdLFxuICAgICAgICAgICAgdGV4dDogW11cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0cmFja0tpbmRNYXAgPSB7IHN1YnRpdGxlOiAnc3VidGl0bGVzJywgY2FwdGlvbjogJ2NhcHRpb25zJyB9OyAvL0Rhc2ggU3BlYyBoYXMgbm8gXCJzXCIgb24gZW5kIG9mIEtJTkQgYnV0IEhUTUwgbmVlZHMgcGx1cmFsLlxuICAgICAgICBjb25zdCBnZXRLaW5kID0gZnVuY3Rpb24gKG1lZGlhSW5mbykge1xuICAgICAgICAgICAgbGV0IGtpbmQgPSAobWVkaWFJbmZvLnJvbGVzLmxlbmd0aCA+IDApID8gdHJhY2tLaW5kTWFwW21lZGlhSW5mby5yb2xlc1swXV0gOiB0cmFja0tpbmRNYXAuY2FwdGlvbjtcbiAgICAgICAgICAgIGtpbmQgPSAoa2luZCA9PT0gdHJhY2tLaW5kTWFwLmNhcHRpb24gfHwga2luZCA9PT0gdHJhY2tLaW5kTWFwLnN1YnRpdGxlKSA/IGtpbmQgOiB0cmFja0tpbmRNYXAuY2FwdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBraW5kO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHZpZGVvXG4gICAgICAgIGxldCBtZWRpYUluZm8gPSBhZGFwdGVyLmdldEFsbE1lZGlhSW5mb0ZvclR5cGUoc3RyZWFtSW5mbywgY29uc3RhbnRzLlZJREVPKTtcbiAgICAgICAgaWYgKG1lZGlhSW5mby5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtZWRpYUluZm8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uYml0cmF0ZUxpc3QuZm9yRWFjaCgoYml0cmF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkb3dubG9hZGFibGVSZXByZXNlbnRhdGlvbnMudmlkZW8ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYml0cmF0ZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbmR3aWR0aDogYml0cmF0ZS5iYW5kd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYml0cmF0ZS53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogYml0cmF0ZS5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF1ZGlvXG4gICAgICAgIG1lZGlhSW5mbyA9IGFkYXB0ZXIuZ2V0QWxsTWVkaWFJbmZvRm9yVHlwZShzdHJlYW1JbmZvLCBjb25zdGFudHMuQVVESU8pO1xuICAgICAgICBpZiAobWVkaWFJbmZvLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1lZGlhSW5mby5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5iaXRyYXRlTGlzdC5mb3JFYWNoKChiaXRyYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvd25sb2FkYWJsZVJlcHJlc2VudGF0aW9ucy5hdWRpby5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBiaXRyYXRlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFuZHdpZHRoOiBiaXRyYXRlLmJhbmR3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmc6IGl0ZW0ubGFuZ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGV4dFxuXG4gICAgICAgIGNvbnN0IGFkZFRleHRJbmZvID0gZnVuY3Rpb24gKGluZm9zLCB0eXBlKSB7XG4gICAgICAgICAgICBpZiAoaW5mb3MubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgaW5mb3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJpdHJhdGVMaXN0LmZvckVhY2goKGJpdHJhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkYWJsZVJlcHJlc2VudGF0aW9ucy50ZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBiaXRyYXRlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmc6IGl0ZW0ubGFuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kOiBnZXRLaW5kKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzOiBpdGVtLnJvbGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHk6IGl0ZW0uYWNjZXNzaWJpbGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbWVkaWFJbmZvID0gYWRhcHRlci5nZXRBbGxNZWRpYUluZm9Gb3JUeXBlKHN0cmVhbUluZm8sIGNvbnN0YW50cy5GUkFHTUVOVEVEX1RFWFQpO1xuICAgICAgICBhZGRUZXh0SW5mbyhtZWRpYUluZm8sIGNvbnN0YW50cy5GUkFHTUVOVEVEX1RFWFQpO1xuXG4gICAgICAgIG1lZGlhSW5mbyA9IGFkYXB0ZXIuZ2V0QWxsTWVkaWFJbmZvRm9yVHlwZShzdHJlYW1JbmZvLCBjb25zdGFudHMuVEVYVCk7XG4gICAgICAgIGFkZFRleHRJbmZvKG1lZGlhSW5mbywgY29uc3RhbnRzLlRFWFQpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICBtZWRpYUluZm8gPSBhZGFwdGVyLmdldEFsbE1lZGlhSW5mb0ZvclR5cGUoc3RyZWFtSW5mbywgY29uc3RhbnRzLk1VWEVEKTtcbiAgICAgICAgaWYgKG1lZGlhSW5mby5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBkb3dubG9hZGFibGVSZXByZXNlbnRhdGlvbnMucHVzaChtZWRpYUluZm8pO1xuICAgICAgICB9XG4gICAgICAgIG1lZGlhSW5mbyA9IGFkYXB0ZXIuZ2V0QWxsTWVkaWFJbmZvRm9yVHlwZShzdHJlYW1JbmZvLCBjb25zdGFudHMuSU1BR0UpO1xuICAgICAgICBpZiAobWVkaWFJbmZvLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGRvd25sb2FkYWJsZVJlcHJlc2VudGF0aW9ucy5wdXNoKG1lZGlhSW5mbyk7XG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgICAgICBldmVudEJ1cy50cmlnZ2VyKGV2ZW50cy5ET1dOTE9BREFCTEVfUkVQUkVTRU5UQVRJT05TX0xPQURFRCwge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGlkOiBtYW5pZmVzdElkLFxuICAgICAgICAgICAgICAgIGRvd25sb2FkYWJsZVJlcHJlc2VudGF0aW9uczogZG93bmxvYWRhYmxlUmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyOiB0aGlzXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB3aXRoIGNob29zZW4gcmVwcmVzZW50YXRpb25zIGJ5IHVzZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWVkaWFzSW5mb0xpc3RcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplQWxsTWVkaWFzSW5mb0xpc3QobWVkaWFzSW5mb0xpc3QpIHtcbiAgICAgICAgYWxsTWVkaWFzSW5mb3NMaXN0ID0gbWVkaWFzSW5mb0xpc3Q7XG4gICAgICAgIGluaXRpYWxpemVNZWRpYShzdHJlYW1JbmZvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIG1lZGlhIGZvciBlYWNoIHR5cGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3RyZWFtSW5mb1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVNZWRpYShzdHJlYW1JbmZvKSB7XG4gICAgICAgIGNyZWF0ZU9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JGb3IoY29uc3RhbnRzLlZJREVPLHN0cmVhbUluZm8pO1xuICAgICAgICBjcmVhdGVPZmZsaW5lU3RyZWFtUHJvY2Vzc29yRm9yKGNvbnN0YW50cy5BVURJTyxzdHJlYW1JbmZvKTtcbiAgICAgICAgY3JlYXRlT2ZmbGluZVN0cmVhbVByb2Nlc3NvckZvcihjb25zdGFudHMuRlJBR01FTlRFRF9URVhULHN0cmVhbUluZm8pO1xuICAgICAgICBjcmVhdGVPZmZsaW5lU3RyZWFtUHJvY2Vzc29yRm9yKGNvbnN0YW50cy5URVhULHN0cmVhbUluZm8pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzW2ldLmluaXRpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICBjcmVhdGVPZmZsaW5lU3RyZWFtUHJvY2Vzc29yRm9yKGNvbnN0YW50cy5NVVhFRCxzdHJlYW1JbmZvKTtcbiAgICAgICAgY3JlYXRlT2ZmbGluZVN0cmVhbVByb2Nlc3NvckZvcihjb25zdGFudHMuSU1BR0Usc3RyZWFtSW5mbyk7XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlT2ZmbGluZVN0cmVhbVByb2Nlc3NvckZvcih0eXBlLCBzdHJlYW1JbmZvKSB7XG4gICAgICAgIC8vIGZpbHRlciBtZWRpYUluZm8gYWNjb3JkaW5nIHRvIGNob29zZW4gcmVwcmVzZW50YXRpb24gaWRcbiAgICAgICAgbGV0IGFsbE1lZGlhSW5mb0ZvclR5cGUgPSBhZGFwdGVyLmdldEFsbE1lZGlhSW5mb0ZvclR5cGUoc3RyZWFtSW5mbywgdHlwZSk7XG4gICAgICAgIGFsbE1lZGlhSW5mb0ZvclR5cGUuZm9yRWFjaCgobWVkaWEpID0+IHtcbiAgICAgICAgICAgIG1lZGlhLmJpdHJhdGVMaXN0ID0gbWVkaWEuYml0cmF0ZUxpc3QuZmlsdGVyKChiaXRyYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFsbE1lZGlhc0luZm9zTGlzdFt0eXBlXSAmJiBhbGxNZWRpYXNJbmZvc0xpc3RbdHlwZV0uaW5kZXhPZihiaXRyYXRlLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBhbGxNZWRpYUluZm9Gb3JUeXBlID0gYWxsTWVkaWFJbmZvRm9yVHlwZS5maWx0ZXIoKG1lZGlhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKG1lZGlhLmJpdHJhdGVMaXN0ICYmIG1lZGlhLmJpdHJhdGVMaXN0Lmxlbmd0aCA+IDApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjcmF0aW9uIG9mIGFuIG9mZmxpbmUgc3RyZWFtIHByb2Nlc3NvciBmb3IgZWFjaCBjaG9vc2VuIHJlcHJlc2VudGF0aW9uXG4gICAgICAgIGFsbE1lZGlhSW5mb0ZvclR5cGUuZm9yRWFjaCgobWVkaWFJbmZvKSA9PiB7XG4gICAgICAgICAgICBpZiAobWVkaWFJbmZvLmJpdHJhdGVMaXN0KSB7XG4gICAgICAgICAgICAgICAgbWVkaWFJbmZvLmJpdHJhdGVMaXN0LmZvckVhY2goKGJpdHJhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlU3RyZWFtUHJvY2Vzc29yKG1lZGlhSW5mbywgYml0cmF0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYWxsTWVkaWFJbmZvRm9yVHlwZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTdHJlYW1Qcm9jZXNzb3IgKG1lZGlhSW5mbywgYml0cmF0ZSkge1xuXG4gICAgICAgIGxldCBzdHJlYW1Qcm9jZXNzb3IgPSBPZmZsaW5lU3RyZWFtUHJvY2Vzc29yKGNvbnRleHQpLmNyZWF0ZSh7XG4gICAgICAgICAgICBpZDogbWFuaWZlc3RJZCxcbiAgICAgICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogb25TdHJlYW1Db21wbGV0ZWQsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3Npb246IG9uU3RyZWFtUHJvZ3Jlc3Npb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJ1ZzogZGVidWcsXG4gICAgICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgICAgIGNvbnN0YW50czogY29uc3RhbnRzXG4gICAgICAgIH0pO1xuICAgICAgICBzdHJlYW1Qcm9jZXNzb3Iuc2V0Q29uZmlnKHtcbiAgICAgICAgICAgIHR5cGU6IG1lZGlhSW5mby50eXBlLFxuICAgICAgICAgICAgbWltZVR5cGU6IG1lZGlhSW5mby5taW1lVHlwZSxcbiAgICAgICAgICAgIG1lZGlhSW5mbzogbWVkaWFJbmZvLFxuICAgICAgICAgICAgYml0cmF0ZTogYml0cmF0ZSxcbiAgICAgICAgICAgIGFkYXB0ZXI6IGFkYXB0ZXIsXG4gICAgICAgICAgICBzdHJlYW06IGluc3RhbmNlLFxuICAgICAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlcjogb2ZmbGluZVN0b3JlQ29udHJvbGxlclxuICAgICAgICB9KTtcbiAgICAgICAgb2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMucHVzaChzdHJlYW1Qcm9jZXNzb3IpO1xuXG4gICAgICAgIHByb2dyZXNzaW9uQnlJZFtiaXRyYXRlLmlkXSA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TdHJlYW1Db21wbGV0ZWQoKSB7XG4gICAgICAgIGZpbmlzaGVkT2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMrKztcbiAgICAgICAgaWYgKGZpbmlzaGVkT2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMgPT09IG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgZmluaXNoZWRDYih7c2VuZGVyOiB0aGlzLCBpZDogbWFuaWZlc3RJZCwgbWVzc2FnZTogJ0Rvd25sb2FkaW5nIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWQgZm9yIHRoaXMgc3RyZWFtICEnfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblN0cmVhbVByb2dyZXNzaW9uKHN0cmVhbVByb2Nlc3NvciwgZG93bmxvYWRlZFNlZ21lbnRzLCBhdmFpbGFibGVTZWdtZW50cyApIHtcbiAgICAgICAgcHJvZ3Jlc3Npb25CeUlkW3N0cmVhbVByb2Nlc3Nvci5nZXRSZXByZXNlbnRhdGlvbklkKCldID0ge1xuICAgICAgICAgICAgZG93bmxvYWRlZFNlZ21lbnRzLFxuICAgICAgICAgICAgYXZhaWxhYmxlU2VnbWVudHNcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc2VnbWVudHMgPSAwO1xuICAgICAgICBsZXQgYWxsU2VnbWVudHMgPSAwO1xuICAgICAgICBsZXQgd2FpdEZvckFsbFByb2dyZXNzO1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwcm9ncmVzc2lvbkJ5SWQpIHtcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc2lvbkJ5SWQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzaW9uQnlJZFtwcm9wZXJ0eV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2FpdEZvckFsbFByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cyArPSBwcm9ncmVzc2lvbkJ5SWRbcHJvcGVydHldLmRvd25sb2FkZWRTZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgYWxsU2VnbWVudHMgKz0gcHJvZ3Jlc3Npb25CeUlkW3Byb3BlcnR5XS5hdmFpbGFibGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXdhaXRGb3JBbGxQcm9ncmVzcyAmJiBwcm9ncmVzc2lvbkNiKSB7XG4gICAgICAgICAgICAvLyBhbGwgcHJvZ3Jlc3Npb24gaGF2ZSBiZWVuIHN0YXJ0ZWQsIHdlIGNhbiBjb21wdXRlIGdsb2JhbCBwcm9ncmVzc2lvblxuICAgICAgICAgICAgaWYgKGFsbFNlZ21lbnRzID4gMCkge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzaW9uQ2IoaW5zdGFuY2UsIHNlZ21lbnRzLCBhbGxTZWdtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRhdGFVcGRhdGVDb21wbGV0ZWQoZSkge1xuICAgICAgICBsZXQgcmVwQ3RybCA9IGUuc2VuZGVyO1xuICAgICAgICBpZiAoIXN0cmVhbUluZm8gfHwgcmVwQ3RybC5nZXRTdHJlYW1JZCgpICE9PSBzdHJlYW1JbmZvLmlkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGUuY3VycmVudFJlcHJlc2VudGF0aW9uLnNlZ21lbnRzICYmIGUuY3VycmVudFJlcHJlc2VudGF0aW9uLnNlZ21lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uc1RvVXBkYXRlLnB1c2goZS5jdXJyZW50UmVwcmVzZW50YXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwO1xuICAgICAgICAvLyBkYXRhIGFyZSByZWFkeSBmciBzdHJlYW0gcHJvY2Vzc29yLCBsZXQncyBzdGFydCBkb3dubG9hZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgaWYgKG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzW2ldLmdldFJlcHJlc2VudGF0aW9uQ29udHJvbGxlcigpID09PSByZXBDdHJsKSB7XG4gICAgICAgICAgICAgICAgc3AgPSBvZmZsaW5lU3RyZWFtUHJvY2Vzc29yc1tpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcCkge1xuICAgICAgICAgICAgY2hlY2tJZkFsbE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzU3RhcnRlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZkFsbE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzU3RhcnRlZCgpIHtcbiAgICAgICAgc3RhcnRlZE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzKys7XG4gICAgICAgIGlmIChzdGFydGVkT2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMgPT09IG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RhcnRlZENiKHtzZW5kZXI6IHRoaXMsIGlkOiBtYW5pZmVzdElkLCBtZXNzYWdlOiAnRG93bmxvYWRpbmcgc3RhcnRlZCBmb3IgdGhpcyBzdHJlYW0gISd9KTtcblxuICAgICAgICAgICAgaWYgKHJlcHJlc2VudGF0aW9uc1RvVXBkYXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVNYW5pZmVzdCh7c2VuZGVyOiB0aGlzLCBpZDogbWFuaWZlc3RJZCwgcmVwcmVzZW50YXRpb25zOiByZXByZXNlbnRhdGlvbnNUb1VwZGF0ZSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZsaW5lU3RyZWFtUHJvY2Vzc29ycygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3RyZWFtSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHN0cmVhbUluZm87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3RhcnRUaW1lKCkge1xuICAgICAgICByZXR1cm4gc3RyZWFtSW5mbyA/IHN0cmVhbUluZm8uc3RhcnQgOiBOYU47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RHVyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBzdHJlYW1JbmZvID8gc3RyZWFtSW5mby5kdXJhdGlvbiA6IE5hTjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9wIG9mZmxpbmUgc3RyZWFtIHByb2Nlc3NvcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdG9wT2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzW2ldLnN0b3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IG9mZmxpbmUgc3RyZWFtIHByb2Nlc3NvcnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdGFydE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvZmZsaW5lU3RyZWFtUHJvY2Vzc29yc1tpXS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgbGV0IGxuID0gb2ZmbGluZVN0cmVhbVByb2Nlc3NvcnMgPyBvZmZsaW5lU3RyZWFtUHJvY2Vzc29ycy5sZW5ndGggOiAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxuOyBpKyspIHtcbiAgICAgICAgICAgIG9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzW2ldLnJlbW92ZUV4ZWN1dGVkUmVxdWVzdHNCZWZvcmVUaW1lKGdldFN0YXJ0VGltZSgpICsgZ2V0RHVyYXRpb24oKSk7XG4gICAgICAgICAgICBvZmZsaW5lU3RyZWFtUHJvY2Vzc29yc1tpXS5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgc3RvcE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JzKCk7XG4gICAgICAgIGRlYWN0aXZhdGUoKTtcbiAgICAgICAgcmVzZXRJbml0aWFsU2V0dGluZ3MoKTtcblxuICAgICAgICBldmVudEJ1cy5vZmYoZXZlbnRzLkRBVEFfVVBEQVRFX0NPTVBMRVRFRCwgb25EYXRhVXBkYXRlQ29tcGxldGVkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZSA9IHtcbiAgICAgICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZSxcbiAgICAgICAgZ2V0RG93bmxvYWRhYmxlUmVwcmVzZW50YXRpb25zOiBnZXREb3dubG9hZGFibGVSZXByZXNlbnRhdGlvbnMsXG4gICAgICAgIGluaXRpYWxpemVBbGxNZWRpYXNJbmZvTGlzdDogaW5pdGlhbGl6ZUFsbE1lZGlhc0luZm9MaXN0LFxuICAgICAgICBnZXRTdHJlYW1JbmZvOiBnZXRTdHJlYW1JbmZvLFxuICAgICAgICBzdG9wT2ZmbGluZVN0cmVhbVByb2Nlc3NvcnM6IHN0b3BPZmZsaW5lU3RyZWFtUHJvY2Vzc29ycyxcbiAgICAgICAgc3RhcnRPZmZsaW5lU3RyZWFtUHJvY2Vzc29yczogc3RhcnRPZmZsaW5lU3RyZWFtUHJvY2Vzc29ycyxcbiAgICAgICAgcmVzZXQ6IHJlc2V0XG4gICAgfTtcblxuICAgIHNldHVwKCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5PZmZsaW5lU3RyZWFtLl9fZGFzaGpzX2ZhY3RvcnlfbmFtZSA9ICdPZmZsaW5lU3RyZWFtJztcbmV4cG9ydCBkZWZhdWx0IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE9mZmxpbmVTdHJlYW0pOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5pbXBvcnQgT2ZmbGluZUV2ZW50cyBmcm9tICcuL2V2ZW50cy9PZmZsaW5lRXZlbnRzJztcblxuLyoqXG4gKiBAbW9kdWxlIE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgY29uZmlndXJhdGlvblxuICogQGRlc2NyaXB0aW9uIEFycmFuZ2UgZG93bmxvYWRpbmcgZm9yIGVhY2ggdHlwZVxuICovXG5mdW5jdGlvbiBPZmZsaW5lU3RyZWFtUHJvY2Vzc29yKGNvbmZpZykge1xuXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbnN0IGV2ZW50QnVzID0gY29uZmlnLmV2ZW50QnVzO1xuICAgIGNvbnN0IGV2ZW50cyA9IGNvbmZpZy5ldmVudHM7XG4gICAgY29uc3QgZGVidWcgPSBjb25maWcuZGVidWc7XG4gICAgY29uc3QgY29uc3RhbnRzID0gY29uZmlnLmNvbnN0YW50cztcbiAgICBjb25zdCBtYW5pZmVzdElkID0gY29uZmlnLmlkO1xuICAgIGNvbnN0IGNvbXBsZXRlZENiID0gY29uZmlnLmNhbGxiYWNrcyAmJiBjb25maWcuY2FsbGJhY2tzLmNvbXBsZXRlZDtcbiAgICBjb25zdCBwcm9ncmVzc0NiID0gY29uZmlnLmNhbGxiYWNrcyAmJiBjb25maWcuY2FsbGJhY2tzLnByb2dyZXNzaW9uO1xuXG4gICAgbGV0IGluc3RhbmNlLFxuICAgICAgICBhZGFwdGVyLFxuICAgICAgICBsb2dnZXIsXG4gICAgICAgIGluZGV4SGFuZGxlcixcbiAgICAgICAgcmVwcmVzZW50YXRpb25Db250cm9sbGVyLFxuICAgICAgICB0eXBlLFxuICAgICAgICBtaW1lVHlwZSxcbiAgICAgICAgZnJhZ21lbnRNb2RlbCxcbiAgICAgICAgbWVkaWFJbmZvLFxuICAgICAgICBiaXRyYXRlLFxuICAgICAgICB1cGRhdGluZyxcbiAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlcixcbiAgICAgICAgZG93bmxvYWRlZFNlZ21lbnRzLFxuICAgICAgICBpc0luaXRpYWxpemVkLFxuICAgICAgICBpc1N0b3BwZWQsXG4gICAgICAgIHN0cmVhbTtcblxuICAgIGZ1bmN0aW9uIHNldENvbmZpZyhjb25maWcpIHtcblxuICAgICAgICBpZiAoIWNvbmZpZykgcmV0dXJuO1xuXG4gICAgICAgIGlmIChjb25maWcudHlwZSkge1xuICAgICAgICAgICAgdHlwZSA9IGNvbmZpZy50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5zdHJlYW0pIHtcbiAgICAgICAgICAgIHN0cmVhbSA9IGNvbmZpZy5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLm1pbWVUeXBlKSB7XG4gICAgICAgICAgICBtaW1lVHlwZSA9IGNvbmZpZy5taW1lVHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuYWRhcHRlcikge1xuICAgICAgICAgICAgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5tZWRpYUluZm8pIHtcbiAgICAgICAgICAgIG1lZGlhSW5mbyA9IGNvbmZpZy5tZWRpYUluZm87XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmJpdHJhdGUpIHtcbiAgICAgICAgICAgIGJpdHJhdGUgPSBjb25maWcuYml0cmF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcub2ZmbGluZVN0b3JlQ29udHJvbGxlcikge1xuICAgICAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlciA9IGNvbmZpZy5vZmZsaW5lU3RvcmVDb250cm9sbGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAgIHJlc2V0SW5pdGlhbFNldHRpbmdzKCk7XG4gICAgICAgIGxvZ2dlciA9IGRlYnVnLmdldExvZ2dlcihpbnN0YW5jZSk7XG4gICAgICAgIGV2ZW50QnVzLm9uKGV2ZW50cy5TVFJFQU1fQ09NUExFVEVELCBvblN0cmVhbUNvbXBsZXRlZCwgaW5zdGFuY2UpO1xuICAgICAgICBldmVudEJ1cy5vbihldmVudHMuRlJBR01FTlRfTE9BRElOR19DT01QTEVURUQsIG9uRnJhZ21lbnRMb2FkaW5nQ29tcGxldGVkLCBpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJbml0UmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiByZXF1ZXN0LnR5cGUgPT09ICdJbml0aWFsaXphdGlvblNlZ21lbnQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRnJhZ21lbnRMb2FkaW5nQ29tcGxldGVkKGUpIHtcbiAgICAgICAgaWYgKGUuc2VuZGVyICE9PSBmcmFnbWVudE1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5yZXF1ZXN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaXNJbml0ID0gaXNJbml0UmVxdWVzdChlLnJlcXVlc3QpO1xuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IGlzSW5pdCA/ICdpbml0JyA6IGUucmVxdWVzdC5pbmRleDtcbiAgICAgICAgICAgIGxldCBmcmFnbWVudE5hbWUgPSBlLnJlcXVlc3QucmVwcmVzZW50YXRpb25JZCArICdfJyArIHN1ZmZpeDtcbiAgICAgICAgICAgIG9mZmxpbmVTdG9yZUNvbnRyb2xsZXIuc3RvcmVGcmFnbWVudChtYW5pZmVzdElkLCBmcmFnbWVudE5hbWUsIGUucmVzcG9uc2UpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0luaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgY3VycmVudCBpbmRleCBhbmQgZG93bmxvYWRlZFNlZ21lbnRzIG51bWJlclxuICAgICAgICAgICAgICAgICAgICBvZmZsaW5lU3RvcmVDb250cm9sbGVyLnNldFJlcHJlc2VudGF0aW9uQ3VycmVudFN0YXRlKG1hbmlmZXN0SWQsIGUucmVxdWVzdC5yZXByZXNlbnRhdGlvbklkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogZS5yZXF1ZXN0LmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRlZDogZG93bmxvYWRlZFNlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLmVycm9yICYmIGUucmVxdWVzdC5zZXJ2aWNlTG9jYXRpb24gJiYgIWlzU3RvcHBlZCkge1xuICAgICAgICAgICAgZnJhZ21lbnRNb2RlbC5leGVjdXRlUmVxdWVzdChlLnJlcXVlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG93bmxvYWRlZFNlZ21lbnRzKys7XG4gICAgICAgICAgICBkb3dubG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TdHJlYW1Db21wbGV0ZWQoZSkge1xuICAgICAgICBpZiAoZS5mcmFnbWVudE1vZGVsICE9PSBmcmFnbWVudE1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmluZm8oYFske21hbmlmZXN0SWR9XSBTdHJlYW0gaXMgY29tcGxldGVgKTtcbiAgICAgICAgc3RvcCgpO1xuICAgICAgICBjb21wbGV0ZWRDYigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFJlcHJlc2VudGF0aW9uQ29udHJvbGxlciAoKSB7XG4gICAgICAgIHJldHVybiByZXByZXNlbnRhdGlvbkNvbnRyb2xsZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UmVwcmVzZW50YXRpb25JZCgpIHtcbiAgICAgICAgcmV0dXJuIHJlcHJlc2VudGF0aW9uQ29udHJvbGxlci5nZXRDdXJyZW50UmVwcmVzZW50YXRpb24oKS5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBkb3dubG9hZCBvZiBmcmFnbWVudHNcbiAgICAgKiBAbWVtYmVyb2YgT2ZmbGluZVN0cmVhbVByb2Nlc3NvciNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICBpZiAoaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplRG93bmxvYWRlciAoKSB7XG4gICAgICAgIHVwZGF0ZVJlcHJlc2VudGF0aW9uKG1lZGlhSW5mbyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RGFzaEVsZW1lbnRzKGhhbmRsZXIsIGZyYWdNb2RlbCwgcmVwQ29udHJvbGxlcikge1xuICAgICAgICBpbmRleEhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICBpbmRleEhhbmRsZXIuaW5pdGlhbGl6ZShmYWxzZSk7XG5cbiAgICAgICAgZnJhZ21lbnRNb2RlbCA9IGZyYWdNb2RlbDtcbiAgICAgICAgcmVwcmVzZW50YXRpb25Db250cm9sbGVyID0gcmVwQ29udHJvbGxlcjtcblxuICAgICAgICBpbml0aWFsaXplRG93bmxvYWRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemF0aW9uXG4gICAgICogQG1lbWJlcm9mIE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3IjXG4gICAgKi9cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgICBldmVudEJ1cy50cmlnZ2VyKE9mZmxpbmVFdmVudHMuREFTSF9FTEVNRU5UU19DUkVBVElPTl9ORUVERUQsIHtzZW5kZXI6IGluc3RhbmNlLCBjb25maWc6IHt0eXBlOiB0eXBlLFxuICAgICAgICAgICAgbWltZVR5cGU6IG1pbWVUeXBlLFxuICAgICAgICAgICAgc3RyZWFtSW5mbzogZ2V0U3RyZWFtSW5mbygpfX0gKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFeGVjdXRlZFJlcXVlc3RzQmVmb3JlVGltZSh0aW1lKSB7XG4gICAgICAgIGlmIChmcmFnbWVudE1vZGVsKSB7XG4gICAgICAgICAgICBmcmFnbWVudE1vZGVsLnJlbW92ZUV4ZWN1dGVkUmVxdWVzdHNCZWZvcmVUaW1lKHRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBpbml0IHJlcXVlc3QgZm9yIHRoZSByZXByZXNlbmF0aW9uXG4gICAgICogQG1lbWJlcm9mIE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3IjXG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXRJbml0UmVxdWVzdCgpIHtcbiAgICAgICAgaWYgKCFyZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIuZ2V0Q3VycmVudFJlcHJlc2VudGF0aW9uKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4SGFuZGxlci5nZXRJbml0UmVxdWVzdChnZXRNZWRpYUluZm8oKSwgcmVwcmVzZW50YXRpb25Db250cm9sbGVyLmdldEN1cnJlbnRSZXByZXNlbnRhdGlvbigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbmV4dCByZXF1ZXN0XG4gICAgICogQG1lbWJlcm9mIE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3IjXG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXROZXh0UmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4SGFuZGxlci5nZXROZXh0U2VnbWVudFJlcXVlc3QoZ2V0TWVkaWFJbmZvKCksIHJlcHJlc2VudGF0aW9uQ29udHJvbGxlci5nZXRDdXJyZW50UmVwcmVzZW50YXRpb24oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgZG93bmxvYWRcbiAgICAgKiBAbWVtYmVyb2YgT2ZmbGluZVN0cmVhbVByb2Nlc3NvciNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAocmVwcmVzZW50YXRpb25Db250cm9sbGVyKSB7XG4gICAgICAgICAgICBpZiAoIXJlcHJlc2VudGF0aW9uQ29udHJvbGxlci5nZXRDdXJyZW50UmVwcmVzZW50YXRpb24oKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhcnQgZGVuaWVkIHRvIE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzU3RvcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBvZmZsaW5lU3RvcmVDb250cm9sbGVyLmdldFJlcHJlc2VudGF0aW9uQ3VycmVudFN0YXRlKG1hbmlmZXN0SWQsIHJlcHJlc2VudGF0aW9uQ29udHJvbGxlci5nZXRDdXJyZW50UmVwcmVzZW50YXRpb24oKS5pZClcbiAgICAgICAgICAgIC50aGVuKChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleEhhbmRsZXIuc2V0Q3VycmVudEluZGV4KHN0YXRlLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgZG93bmxvYWRlZFNlZ21lbnRzID0gc3RhdGUuZG93bmxvYWRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG93bmxvYWQoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCBmcm9tIGJlZ2luaW5pbmdcbiAgICAgICAgICAgICAgICBkb3dubG9hZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBkb3dubG9hZCBvZiBmcmFnbWVudCBhY2NvcmRpbmcgdG8gdHlwZVxuICAgICAqIEBtZW1iZXJvZiBPZmZsaW5lU3RyZWFtUHJvY2Vzc29yI1xuICAgICovXG4gICAgZnVuY3Rpb24gZG93bmxvYWQoKSB7XG4gICAgICAgIGlmIChpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTihyZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIuZ2V0Q3VycmVudFJlcHJlc2VudGF0aW9uKCkpKSB7XG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIWlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gZ2V0SW5pdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICBpc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IGdldE5leHRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcHJvZ3Jlc3Npb24gOiBkb25lIGhlcmUgYmVjYXVzZSBhdmFpbGFibGVTZWdtZW50c051bWJlciBpcyBkb25lIGluIGdldE5leHRSZXF1ZXN0IGZyb20gZGFzaCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgdXBkYXRlUHJvZ3Jlc3Npb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuaW5mbyhgWyR7bWFuaWZlc3RJZH1dIGRvd25sb2FkIHJlcXVlc3QgOiAke3JlcXVlc3QudXJsfWApO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50TW9kZWwuZXhlY3V0ZVJlcXVlc3QocmVxdWVzdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5pbmZvKGBbJHttYW5pZmVzdElkfV0gbm8gcmVxdWVzdCB0byBiZSBkb3dubG9hZGVkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgcmVwcmVzZW50YXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWVkaWFJbmZvIC0gbWVkaWFJbmZvXG4gICAgICogQG1lbWJlcm9mIE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3IjXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlUmVwcmVzZW50YXRpb24obWVkaWFJbmZvKSB7XG4gICAgICAgIHVwZGF0aW5nID0gdHJ1ZTtcblxuICAgICAgICBsZXQgdm9SZXByZXNlbnRhdGlvbnMgPSBhZGFwdGVyLmdldFZvUmVwcmVzZW50YXRpb25zKG1lZGlhSW5mbyk7XG5cbiAgICAgICAgLy8gZ2V0IHJlcHJlc2VudGF0aW9uIFZPIGFjY29yZGluZyB0byBpZC5cbiAgICAgICAgbGV0IHF1YWxpdHkgPSB2b1JlcHJlc2VudGF0aW9ucy5maW5kSW5kZXgoKHJlcHJlc2VudGF0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVwcmVzZW50YXRpb24uaWQgPT09IGJpdHJhdGUuaWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlICE9PSBjb25zdGFudHMuVklERU8gJiYgdHlwZSAhPT0gY29uc3RhbnRzLkFVRElPICAmJiB0eXBlICE9PSBjb25zdGFudHMuVEVYVCAmJiB0eXBlICE9PSBjb25zdGFudHMuRlJBR01FTlRFRF9URVhUKSB7XG4gICAgICAgICAgICB1cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVwcmVzZW50YXRpb25Db250cm9sbGVyLnVwZGF0ZURhdGEobnVsbCwgdm9SZXByZXNlbnRhdGlvbnMsIHR5cGUsIHF1YWxpdHkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN0cmVhbUluZm8oKSB7XG4gICAgICAgIHJldHVybiBzdHJlYW0gPyBzdHJlYW0uZ2V0U3RyZWFtSW5mbygpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1VwZGF0aW5nKCkge1xuICAgICAgICByZXR1cm4gdXBkYXRpbmc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWVkaWFJbmZvKCkge1xuICAgICAgICByZXR1cm4gbWVkaWFJbmZvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEF2YWlsYWJsZVNlZ21lbnRzTnVtYmVyKCkge1xuICAgICAgICByZXR1cm4gcmVwcmVzZW50YXRpb25Db250cm9sbGVyLmdldEN1cnJlbnRSZXByZXNlbnRhdGlvbigpLmF2YWlsYWJsZVNlZ21lbnRzTnVtYmVyICsgMTsgLy8gZG8gbm90IGZvcmdldCBpbml0IHNlZ21lbnRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQcm9ncmVzc2lvbiAoKSB7XG4gICAgICAgIGlmIChwcm9ncmVzc0NiKSB7XG4gICAgICAgICAgICBwcm9ncmVzc0NiKGluc3RhbmNlLCBkb3dubG9hZGVkU2VnbWVudHMsIGdldEF2YWlsYWJsZVNlZ21lbnRzTnVtYmVyKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRJbml0aWFsU2V0dGluZ3MoKSB7XG4gICAgICAgIGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgZG93bmxvYWRlZFNlZ21lbnRzID0gMDtcbiAgICAgICAgbWltZVR5cGUgPSBudWxsO1xuICAgICAgICBtZWRpYUluZm8gPSBudWxsO1xuICAgICAgICBiaXRyYXRlID0gbnVsbDtcbiAgICAgICAgdXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdHlwZSA9IG51bGw7XG4gICAgICAgIHN0cmVhbSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRcbiAgICAgKiBAbWVtYmVyb2YgT2ZmbGluZVN0cmVhbVByb2Nlc3NvciNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICByZXNldEluaXRpYWxTZXR0aW5ncygpO1xuICAgICAgICBpbmRleEhhbmRsZXIucmVzZXQoKTtcblxuICAgICAgICBldmVudEJ1cy5vZmYoZXZlbnRzLlNUUkVBTV9DT01QTEVURUQsIG9uU3RyZWFtQ29tcGxldGVkLCBpbnN0YW5jZSk7XG4gICAgICAgIGV2ZW50QnVzLm9mZihldmVudHMuRlJBR01FTlRfTE9BRElOR19DT01QTEVURUQsIG9uRnJhZ21lbnRMb2FkaW5nQ29tcGxldGVkLCBpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UgPSB7XG4gICAgICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG4gICAgICAgIHNldENvbmZpZzogc2V0Q29uZmlnLFxuICAgICAgICBnZXRTdHJlYW1JbmZvOiBnZXRTdHJlYW1JbmZvLFxuICAgICAgICBnZXRNZWRpYUluZm86IGdldE1lZGlhSW5mbyxcbiAgICAgICAgZ2V0UmVwcmVzZW50YXRpb25Db250cm9sbGVyOiBnZXRSZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIsXG4gICAgICAgIHJlbW92ZUV4ZWN1dGVkUmVxdWVzdHNCZWZvcmVUaW1lOiByZW1vdmVFeGVjdXRlZFJlcXVlc3RzQmVmb3JlVGltZSxcbiAgICAgICAgZ2V0VHlwZTogZ2V0VHlwZSxcbiAgICAgICAgZ2V0UmVwcmVzZW50YXRpb25JZDogZ2V0UmVwcmVzZW50YXRpb25JZCxcbiAgICAgICAgaXNVcGRhdGluZzogaXNVcGRhdGluZyxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBzdG9wOiBzdG9wLFxuICAgICAgICBnZXRBdmFpbGFibGVTZWdtZW50c051bWJlcjogZ2V0QXZhaWxhYmxlU2VnbWVudHNOdW1iZXIsXG4gICAgICAgIHNldERhc2hFbGVtZW50czogc2V0RGFzaEVsZW1lbnRzLFxuICAgICAgICByZXNldDogcmVzZXRcbiAgICB9O1xuXG4gICAgc2V0dXAoKTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cbk9mZmxpbmVTdHJlYW1Qcm9jZXNzb3IuX19kYXNoanNfZmFjdG9yeV9uYW1lID0gJ09mZmxpbmVTdHJlYW1Qcm9jZXNzb3InO1xuY29uc3QgZmFjdG9yeSA9IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE9mZmxpbmVTdHJlYW1Qcm9jZXNzb3IpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbmV4cG9ydCBkZWZhdWx0IGZhY3Rvcnk7XG4iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuXG4vKipcbiAqIE9mZmxpbmUgY29uc3RhbnRzIGRlY2xhcmF0aW9uXG4gKiBAY2xhc3NcbiAqIEBpZ25vcmVcbiAqL1xuY2xhc3MgT2ZmbGluZUNvbnN0YW50cyB7XG5cbiAgaW5pdCgpIHtcbiAgICAgIHRoaXMuT0ZGTElORV9TQ0hFTUUgPSAnb2ZmbGluZV9pbmRleGRiJztcbiAgICAgIHRoaXMuT0ZGTElORV9VUkxfUkVHRVggPSAvXm9mZmxpbmVfaW5kZXhkYjpcXC9cXC8vaTtcbiAgICAgIHRoaXMuT0ZGTElORV9TVEFUVVNfQ1JFQVRFRCA9ICdjcmVhdGVkJztcbiAgICAgIHRoaXMuT0ZGTElORV9TVEFUVVNfU1RBUlRFRCA9ICdzdGFydGVkJztcbiAgICAgIHRoaXMuT0ZGTElORV9TVEFUVVNfU1RPUFBFRCA9ICdzdG9wcGVkJztcbiAgICAgIHRoaXMuT0ZGTElORV9TVEFUVVNfRklOSVNIRUQgPSAnZmluaXNoZWQnO1xuICAgICAgdGhpcy5PRkZMSU5FX1NUQVRVU19FUlJPUiA9ICdlcnJvcic7XG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgfVxufVxuXG5sZXQgY29uc3RhbnRzID0gbmV3IE9mZmxpbmVDb25zdGFudHMoKTtcbmV4cG9ydCBkZWZhdWx0IGNvbnN0YW50cztcbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cbmltcG9ydCBPZmZsaW5lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9PZmZsaW5lQ29uc3RhbnRzJztcbmltcG9ydCBPZmZsaW5lU3RvcmVDb250cm9sbGVyIGZyb20gJy4vT2ZmbGluZVN0b3JlQ29udHJvbGxlcic7XG5pbXBvcnQgT2ZmbGluZURvd25sb2FkIGZyb20gJy4uL09mZmxpbmVEb3dubG9hZCc7XG5pbXBvcnQgSW5kZXhEQk9mZmxpbmVMb2FkZXIgZnJvbSAnLi4vbmV0L0luZGV4REJPZmZsaW5lTG9hZGVyJztcbmltcG9ydCBPZmZsaW5lVXJsVXRpbHMgZnJvbSAnLi4vdXRpbHMvT2ZmbGluZVVybFV0aWxzJztcbmltcG9ydCBPZmZsaW5lRXZlbnRzIGZyb20gJy4uL2V2ZW50cy9PZmZsaW5lRXZlbnRzJztcbmltcG9ydCBPZmZsaW5lRXJyb3JzIGZyb20gJy4uL2Vycm9ycy9PZmZsaW5lRXJyb3JzJztcbmltcG9ydCBPZmZsaW5lRG93bmxvYWRWbyBmcm9tICcuLi92by9PZmZsaW5lRG93bmxvYWRWbyc7XG5cbi8qKlxuICogQGNsYXNzIE9mZmxpbmVDb250cm9sbGVyXG4gKi9cbmZ1bmN0aW9uIE9mZmxpbmVDb250cm9sbGVyKCkge1xuXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcblxuICAgIGxldCBpbnN0YW5jZSxcbiAgICAgICAgZG93bmxvYWRzLFxuICAgICAgICBhZGFwdGVyLFxuICAgICAgICBzY2hlbWVMb2FkZXJGYWN0b3J5LFxuICAgICAgICBkZWJ1ZyxcbiAgICAgICAgbG9nZ2VyLFxuICAgICAgICBtYW5pZmVzdExvYWRlcixcbiAgICAgICAgbWFuaWZlc3RNb2RlbCxcbiAgICAgICAgbWFuaWZlc3RVcGRhdGVyLFxuICAgICAgICBiYXNlVVJMQ29udHJvbGxlcixcbiAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlcixcbiAgICAgICAgdXJsVXRpbHMsXG4gICAgICAgIG9mZmxpbmVVcmxVdGlscyxcbiAgICAgICAgZXZlbnRzLFxuICAgICAgICBldmVudEJ1cyxcbiAgICAgICAgY29uc3RhbnRzLFxuICAgICAgICBkYXNoQ29uc3RhbnRzLFxuICAgICAgICBlcnJIYW5kbGVyO1xuXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAgIG9mZmxpbmVVcmxVdGlscyA9IE9mZmxpbmVVcmxVdGlscyhjb250ZXh0KS5nZXRJbnN0YW5jZSgpO1xuXG4gICAgICAgIGRvd25sb2FkcyA9IFtdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgaWYgKCFjb25maWcpIHJldHVybjtcblxuICAgICAgICBpZiAoY29uZmlnLmVyckhhbmRsZXIpIHtcbiAgICAgICAgICAgIGVyckhhbmRsZXIgPSBjb25maWcuZXJySGFuZGxlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuZXZlbnRzICYmIGNvbmZpZy5ldmVudEJ1cykge1xuICAgICAgICAgICAgZXZlbnRzID0gY29uZmlnLmV2ZW50cztcbiAgICAgICAgICAgIGV2ZW50QnVzID0gY29uZmlnLmV2ZW50QnVzO1xuICAgICAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlciA9IE9mZmxpbmVTdG9yZUNvbnRyb2xsZXIoY29udGV4dCkuY3JlYXRlKHsgZXZlbnRCdXM6IGNvbmZpZy5ldmVudEJ1cywgZXJySGFuZGxlcjogZXJySGFuZGxlcn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICAgICAgZGVidWcgPSBjb25maWcuZGVidWc7XG4gICAgICAgICAgICBsb2dnZXIgPSBkZWJ1Zy5nZXRMb2dnZXIoaW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5tYW5pZmVzdExvYWRlcikge1xuICAgICAgICAgICAgbWFuaWZlc3RMb2FkZXIgPSBjb25maWcubWFuaWZlc3RMb2FkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLm1hbmlmZXN0TW9kZWwpIHtcbiAgICAgICAgICAgIG1hbmlmZXN0TW9kZWwgPSBjb25maWcubWFuaWZlc3RNb2RlbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuYWRhcHRlcikge1xuICAgICAgICAgICAgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5tYW5pZmVzdFVwZGF0ZXIpIHtcbiAgICAgICAgICAgIG1hbmlmZXN0VXBkYXRlciA9IGNvbmZpZy5tYW5pZmVzdFVwZGF0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmJhc2VVUkxDb250cm9sbGVyKSB7XG4gICAgICAgICAgICBiYXNlVVJMQ29udHJvbGxlciA9IGNvbmZpZy5iYXNlVVJMQ29udHJvbGxlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuc2NoZW1lTG9hZGVyRmFjdG9yeSkge1xuICAgICAgICAgICAgc2NoZW1lTG9hZGVyRmFjdG9yeSA9IGNvbmZpZy5zY2hlbWVMb2FkZXJGYWN0b3J5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5jb25zdGFudHMpIHtcbiAgICAgICAgICAgIGNvbnN0YW50cyA9IGNvbmZpZy5jb25zdGFudHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmRhc2hDb25zdGFudHMpIHtcbiAgICAgICAgICAgIGRhc2hDb25zdGFudHMgPSBjb25maWcuZGFzaENvbnN0YW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcudXJsVXRpbHMpIHtcbiAgICAgICAgICAgIHVybFV0aWxzID0gY29uZmlnLnVybFV0aWxzO1xuICAgICAgICAgICAgdXJsVXRpbHMucmVnaXN0ZXJVcmxSZWdleChvZmZsaW5lVXJsVXRpbHMuZ2V0UmVnZXgoKSwgb2ZmbGluZVVybFV0aWxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjaGVtZUxvYWRlckZhY3RvcnkucmVnaXN0ZXJMb2FkZXIoT2ZmbGluZUNvbnN0YW50cy5PRkZMSU5FX1NDSEVNRSwgSW5kZXhEQk9mZmxpbmVMb2FkZXIpO1xuICAgIH1cblxuICAgIC8qXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgRE9XTkxPQUQgTElTVCBGVU5DVElPTlNcblxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RG93bmxvYWRGcm9tSWQoaWQpIHtcbiAgICAgICAgbGV0IGRvd25sb2FkID0gZG93bmxvYWRzLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmdldElkKCkgPT09IGlkO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRvd25sb2FkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURvd25sb2FkRnJvbUlkKGlkKSB7XG4gICAgICAgIGxldCBkb3dubG9hZDtcbiAgICAgICAgZG93bmxvYWQgPSBnZXREb3dubG9hZEZyb21JZChpZCk7XG5cbiAgICAgICAgaWYgKCFkb3dubG9hZCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGRvd25sb2FkIGNvbnRyb2xsZXJcbiAgICAgICAgICAgIGRvd25sb2FkID0gT2ZmbGluZURvd25sb2FkKGNvbnRleHQpLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgICAgICAgICBtYW5pZmVzdExvYWRlcjogbWFuaWZlc3RMb2FkZXIsXG4gICAgICAgICAgICAgICAgbWFuaWZlc3RNb2RlbDogbWFuaWZlc3RNb2RlbCxcbiAgICAgICAgICAgICAgICBtYW5pZmVzdFVwZGF0ZXI6IG1hbmlmZXN0VXBkYXRlcixcbiAgICAgICAgICAgICAgICBiYXNlVVJMQ29udHJvbGxlcjogYmFzZVVSTENvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgYWRhcHRlcjogYWRhcHRlcixcbiAgICAgICAgICAgICAgICBlcnJIYW5kbGVyOiBlcnJIYW5kbGVyLFxuICAgICAgICAgICAgICAgIG9mZmxpbmVTdG9yZUNvbnRyb2xsZXI6IG9mZmxpbmVTdG9yZUNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgZGVidWc6IGRlYnVnLFxuICAgICAgICAgICAgICAgIGNvbnN0YW50czogY29uc3RhbnRzLFxuICAgICAgICAgICAgICAgIGRhc2hDb25zdGFudHM6IGRhc2hDb25zdGFudHMsXG4gICAgICAgICAgICAgICAgdXJsVXRpbHM6IHVybFV0aWxzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG93bmxvYWRzLnB1c2goZG93bmxvYWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRvd25sb2FkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZURvd25sb2FkRnJvbVN0b3JhZ2Uob2ZmbGluZSkge1xuICAgICAgICBsZXQgZG93bmxvYWQgPSBnZXREb3dubG9hZEZyb21JZChvZmZsaW5lLm1hbmlmZXN0SWQpO1xuXG4gICAgICAgIGlmICghZG93bmxvYWQpIHtcbiAgICAgICAgICAgIGRvd25sb2FkID0gY3JlYXRlRG93bmxvYWRGcm9tSWQob2ZmbGluZS5tYW5pZmVzdElkKTtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSBvZmZsaW5lLnN0YXR1cztcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IE9mZmxpbmVDb25zdGFudHMuT0ZGTElORV9TVEFUVVNfU1RBUlRFRCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cyA9IE9mZmxpbmVDb25zdGFudHMuT0ZGTElORV9TVEFUVVNfU1RPUFBFRDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG93bmxvYWQuc2V0SW5pdGlhbFN0YXRlKHtcbiAgICAgICAgICAgICAgICB1cmw6IG9mZmxpbmUudXJsLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiBvZmZsaW5lLnByb2dyZXNzLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVXJsOiBvZmZsaW5lLm9yaWdpbmFsVVJMLFxuICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkb3dubG9hZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVEb3dubG9hZEZyb21JZChpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IGRvd25sb2FkID0gZ2V0RG93bmxvYWRGcm9tSWQoaWQpO1xuICAgICAgICAgICAgbGV0IHdhaXRGb3JTdGF0dXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZG93bmxvYWQpIHtcbiAgICAgICAgICAgICAgICAvL2lzIGRvd25sb2FkIHJ1bm5pbmc/XG4gICAgICAgICAgICAgICAgaWYgKGRvd25sb2FkLmlzRG93bmxvYWRpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAvL3JlZ2lzdGVyIHN0YXR1cyBjaGFuZ2VkIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIHdhaXRGb3JTdGF0dXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRTdG9wcGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMub2ZmKGV2ZW50cy5ET1dOTE9BRElOR19TVE9QUEVELCBkb3dubG9hZFN0b3BwZWQsIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZmZsaW5lU3RvcmVDb250cm9sbGVyLmRlbGV0ZURvd25sb2FkQnlJZChpZCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzLm9uKGV2ZW50cy5ET1dOTE9BRElOR19TVE9QUEVELCBkb3dubG9hZFN0b3BwZWQsIGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG93bmxvYWQuZGVsZXRlRG93bmxvYWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBkb3dubG9hZHMuaW5kZXhPZihkb3dubG9hZCk7XG4gICAgICAgICAgICAgICAgZG93bmxvYWRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghd2FpdEZvclN0YXR1c0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgRE9XTkxPQUQgRlVOQ1RJT05TXG5cbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWFuaWZlc3RJZCgpIHtcbiAgICAgICAgbGV0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gdGltZXN0YW1wO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWREb3dubG9hZHNGcm9tU3RvcmFnZSgpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgb2ZmbGluZVN0b3JlQ29udHJvbGxlci5nZXRBbGxNYW5pZmVzdHMoKS50aGVuKChpdGVtcykgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zLm1hbmlmZXN0cy5mb3JFYWNoKChvZmZsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURvd25sb2FkRnJvbVN0b3JhZ2Uob2ZmbGluZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcignRmFpbGVkIHRvIGxvYWQgZG93bmxvYWRzICcgKyBlKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRG93bmxvYWQodXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgaWQgPSBnZW5lcmF0ZU1hbmlmZXN0SWQoKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRvd25sb2FkIGNvbnRyb2xsZXJcbiAgICAgICAgICAgIGxldCBkb3dubG9hZCA9IGNyZWF0ZURvd25sb2FkRnJvbUlkKGlkKTtcblxuICAgICAgICAgICAgZG93bmxvYWQuZG93bmxvYWRGcm9tVXJsKHVybCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdGYWlsZWQgdG8gZG93bmxvYWQgJyArIGUpO1xuICAgICAgICAgICAgICAgIHJlbW92ZURvd25sb2FkRnJvbUlkKGlkKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXREb3dubG9hZChpZCkge1xuICAgICAgICBsZXQgZG93bmxvYWQgPSBnZXREb3dubG9hZEZyb21JZChpZCk7XG4gICAgICAgIGlmIChkb3dubG9hZCkge1xuICAgICAgICAgICAgZG93bmxvYWQuaW5pdERvd25sb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydERvd25sb2FkKGlkLCBzZWxlY3RlZFJlcHJlc2VudGF0aW9ucykge1xuICAgICAgICBsZXQgZG93bmxvYWQgPSBnZXREb3dubG9hZEZyb21JZChpZCk7XG4gICAgICAgIGlmIChkb3dubG9hZCkge1xuICAgICAgICAgICAgZG93bmxvYWQuc3RhcnREb3dubG9hZChzZWxlY3RlZFJlcHJlc2VudGF0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxEb3dubG9hZHMoKSB7XG5cbiAgICAgICAgbGV0IHJldCA9IFtdO1xuICAgICAgICBkb3dubG9hZHMuZm9yRWFjaCgoZG93bmxvYWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmxpbmVEb3dubG9hZCA9IG5ldyBPZmZsaW5lRG93bmxvYWRWbygpO1xuICAgICAgICAgICAgb2ZmbGluZURvd25sb2FkLmlkID0gZG93bmxvYWQuZ2V0SWQoKTtcbiAgICAgICAgICAgIG9mZmxpbmVEb3dubG9hZC5wcm9ncmVzcyA9IGRvd25sb2FkLmdldERvd25sb2FkUHJvZ3Jlc3Npb24oKTtcbiAgICAgICAgICAgIG9mZmxpbmVEb3dubG9hZC51cmwgPSBkb3dubG9hZC5nZXRPZmZsaW5lVXJsKCk7XG4gICAgICAgICAgICBvZmZsaW5lRG93bmxvYWQub3JpZ2luYWxVcmwgPSBkb3dubG9hZC5nZXRNYW5pZmVzdFVybCgpO1xuICAgICAgICAgICAgb2ZmbGluZURvd25sb2FkLnN0YXR1cyA9IGRvd25sb2FkLmdldFN0YXR1cygpO1xuICAgICAgICAgICAgcmV0LnB1c2gob2ZmbGluZURvd25sb2FkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wRG93bmxvYWQoaWQpIHtcbiAgICAgICAgbGV0IGRvd25sb2FkID0gZ2V0RG93bmxvYWRGcm9tSWQoaWQpO1xuICAgICAgICBpZiAoZG93bmxvYWQpIHtcbiAgICAgICAgICAgIGRvd25sb2FkLnN0b3BEb3dubG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlRG93bmxvYWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZURvd25sb2FkRnJvbUlkKGlkKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBvZmZsaW5lU3RvcmVDb250cm9sbGVyLmRlbGV0ZURvd25sb2FkQnlJZChpZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3VtZURvd25sb2FkKGlkKSB7XG4gICAgICAgIGxldCBkb3dubG9hZCA9IGdldERvd25sb2FkRnJvbUlkKGlkKTtcbiAgICAgICAgaWYgKGRvd25sb2FkKSB7XG4gICAgICAgICAgICBkb3dubG9hZC5yZXN1bWVEb3dubG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RG93bmxvYWRQcm9ncmVzc2lvbihpZCkge1xuICAgICAgICBsZXQgZG93bmxvYWQgPSBnZXREb3dubG9hZEZyb21JZChpZCk7XG4gICAgICAgIGlmIChkb3dubG9hZCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvd25sb2FkLmdldERvd25sb2FkUHJvZ3Jlc3Npb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldERvd25sb2FkcygpIHtcbiAgICAgICAgZG93bmxvYWRzLmZvckVhY2goKGRvd25sb2FkKSA9PiB7XG4gICAgICAgICAgICBkb3dubG9hZC5yZXNldERvd25sb2FkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIHJlc2V0RG93bmxvYWRzKCk7XG4gICAgICAgIHNjaGVtZUxvYWRlckZhY3RvcnkudW5yZWdpc3RlckxvYWRlcihPZmZsaW5lQ29uc3RhbnRzLk9GRkxJTkVfU0NIRU1FKTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZSA9IHtcbiAgICAgICAgc2V0Q29uZmlnOiBzZXRDb25maWcsXG4gICAgICAgIGxvYWREb3dubG9hZHNGcm9tU3RvcmFnZTogbG9hZERvd25sb2Fkc0Zyb21TdG9yYWdlLFxuICAgICAgICBjcmVhdGVEb3dubG9hZDogY3JlYXRlRG93bmxvYWQsXG4gICAgICAgIGluaXREb3dubG9hZDogaW5pdERvd25sb2FkLFxuICAgICAgICBzdGFydERvd25sb2FkOiBzdGFydERvd25sb2FkLFxuICAgICAgICBzdG9wRG93bmxvYWQ6IHN0b3BEb3dubG9hZCxcbiAgICAgICAgcmVzdW1lRG93bmxvYWQ6IHJlc3VtZURvd25sb2FkLFxuICAgICAgICBkZWxldGVEb3dubG9hZDogZGVsZXRlRG93bmxvYWQsXG4gICAgICAgIGdldERvd25sb2FkUHJvZ3Jlc3Npb246IGdldERvd25sb2FkUHJvZ3Jlc3Npb24sXG4gICAgICAgIGdldEFsbERvd25sb2FkczogZ2V0QWxsRG93bmxvYWRzLFxuICAgICAgICByZXNldERvd25sb2FkczogcmVzZXREb3dubG9hZHMsXG4gICAgICAgIHJlc2V0OiByZXNldFxuICAgIH07XG5cbiAgICBzZXR1cCgpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5PZmZsaW5lQ29udHJvbGxlci5fX2Rhc2hqc19mYWN0b3J5X25hbWUgPSAnT2ZmbGluZUNvbnRyb2xsZXInO1xuY29uc3QgZmFjdG9yeSA9IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE9mZmxpbmVDb250cm9sbGVyKTsgLyoganNoaW50IGlnbm9yZTpsaW5lICovXG5mYWN0b3J5LmV2ZW50cyA9IE9mZmxpbmVFdmVudHM7XG5mYWN0b3J5LmVycm9ycyA9IE9mZmxpbmVFcnJvcnM7XG5kYXNoanMuRmFjdG9yeU1ha2VyLnVwZGF0ZUNsYXNzRmFjdG9yeShPZmZsaW5lQ29udHJvbGxlci5fX2Rhc2hqc19mYWN0b3J5X25hbWUsIGZhY3RvcnkpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbmV4cG9ydCBkZWZhdWx0IGZhY3Rvcnk7XG4iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuaW1wb3J0IEluZGV4REJTdG9yZSBmcm9tICcuLi9zdG9yYWdlL0luZGV4REJTdG9yZSc7XG5pbXBvcnQgT2ZmbGluZUVycm9ycyBmcm9tICcuLi9lcnJvcnMvT2ZmbGluZUVycm9ycyc7XG5cbi8qKlxuICogQGNsYXNzIE9mZmxpbmVTdG9yZUNvbnRyb2xsZXJcbiAqIFRoaXMgY2xhc3MgbWFuYWdlcyBkYXRhYmFzZSBzdG9yZVxuICogQGRlc2NyaXB0aW9uIE9mZmxpbmUgU3RvcmFnZSBDb250cm9sbGVyXG4gKi9cbmZ1bmN0aW9uIE9mZmxpbmVTdG9yZUNvbnRyb2xsZXIoY29uZmlnKSB7XG5cbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBlcnJIYW5kbGVyID0gY29uZmlnLmVyckhhbmRsZXI7XG5cbiAgICBsZXQgaW5zdGFuY2UsXG4gICAgICAgIGluZGV4REJTdG9yZTtcblxuICAgIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgICAgICBpbmRleERCU3RvcmUgPSBJbmRleERCU3RvcmUoY29udGV4dCkuZ2V0SW5zdGFuY2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGcmFnbWVudFN0b3JlKG1hbmlmZXN0SWQsIHN0b3JlTmFtZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaW5kZXhEQlN0b3JlLmNyZWF0ZUZyYWdtZW50U3RvcmUobWFuaWZlc3RJZCwgc3RvcmVOYW1lKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBtYW5hZ2VET01FcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcmVGcmFnbWVudChtYW5pZmVzdElkLCBmcmFnbWVudElkLCBmcmFnbWVudERhdGEpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4REJTdG9yZS5zdG9yZUZyYWdtZW50KG1hbmlmZXN0SWQsIGZyYWdtZW50SWQsIGZyYWdtZW50RGF0YSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgbWFuYWdlRE9NRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlT2ZmbGluZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG4gICAgICAgIHJldHVybiBpbmRleERCU3RvcmUuc3RvcmVNYW5pZmVzdChtYW5pZmVzdCkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgbWFuYWdlRE9NRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlT2ZmbGluZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG4gICAgICAgIHJldHVybiBpbmRleERCU3RvcmUudXBkYXRlTWFuaWZlc3QobWFuaWZlc3QpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIG1hbmFnZURPTUVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1hbmlmZXN0QnlJZChtYW5pZmVzdElkKSB7XG4gICAgICAgIHJldHVybiBpbmRleERCU3RvcmUuZ2V0TWFuaWZlc3RCeUlkKG1hbmlmZXN0SWQpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIG1hbmFnZURPTUVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdmVTZWxlY3RlZFJlcHJlc2VudGF0aW9ucyAobWFuaWZlc3RJZCwgc2VsZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4REJTdG9yZS5zYXZlU2VsZWN0ZWRSZXByZXNlbnRhdGlvbnMobWFuaWZlc3RJZCwgc2VsZWN0ZWQpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIG1hbmFnZURPTUVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRIaWdoZXJNYW5pZmVzdElkKCkge1xuICAgICAgICByZXR1cm4gaW5kZXhEQlN0b3JlLmdldEN1cnJlbnRIaWdoZXJNYW5pZmVzdElkKCkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgbWFuYWdlRE9NRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsTWFuaWZlc3RzKCkge1xuICAgICAgICByZXR1cm4gaW5kZXhEQlN0b3JlLmdldEFsbE1hbmlmZXN0cygpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIG1hbmFnZURPTUVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZURvd25sb2FkQnlJZChtYW5pZmVzdElkKSB7XG4gICAgICAgIHJldHVybiBpbmRleERCU3RvcmUuZGVsZXRlRG93bmxvYWRCeUlkKG1hbmlmZXN0SWQpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIG1hbmFnZURPTUVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldERvd25sb2FkaW5nU3RhdHVzKG1hbmlmZXN0SWQsIHN0YXR1cykge1xuICAgICAgICByZXR1cm4gaW5kZXhEQlN0b3JlLnNldERvd25sb2FkaW5nU3RhdHVzKG1hbmlmZXN0SWQsIHN0YXR1cykuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgbWFuYWdlRE9NRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0UmVwcmVzZW50YXRpb25DdXJyZW50U3RhdGUobWFuaWZlc3RJZCwgcmVwcmVzZW50YXRpb25JZCwgc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4REJTdG9yZS5zZXRSZXByZXNlbnRhdGlvbkN1cnJlbnRTdGF0ZShtYW5pZmVzdElkLCByZXByZXNlbnRhdGlvbklkLCBzdGF0ZSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgbWFuYWdlRE9NRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UmVwcmVzZW50YXRpb25DdXJyZW50U3RhdGUobWFuaWZlc3RJZCwgcmVwcmVzZW50YXRpb25JZCkge1xuICAgICAgICByZXR1cm4gaW5kZXhEQlN0b3JlLmdldFJlcHJlc2VudGF0aW9uQ3VycmVudFN0YXRlKG1hbmlmZXN0SWQsIHJlcHJlc2VudGF0aW9uSWQpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIG1hbmFnZURPTUVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hbmFnZURPTUVycm9yKGVycikge1xuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdRdW90YUV4Y2VlZGVkRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IE9mZmxpbmVFcnJvcnMuSU5ERVhFRERCX1FVT1RBX0VYQ0VFRF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSW52YWxpZFN0YXRlRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IE9mZmxpbmVFcnJvcnMuSU5ERVhFRERCX0lOVkFMSURfU1RBVEVfRVJST1I7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ05vdEZvdW5kRXJyb3InOlxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IE9mZmxpbmVFcnJvcnMuSU5ERVhFRERCX05PVF9GT1VORF9FUlJPUjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnVmVyc2lvbkVycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBPZmZsaW5lRXJyb3JzLklOREVYRUREQl9WRVJTSU9OX0VSUk9SO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBUT0RPIDogTWFuYWdlIGFsbCBET00gY2FzZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYXZvaWQgaW1wb3J0aW5nIERhc2hKU0Vycm9yIG9iamVjdCBmcm9tIHN0cmVhbWluZ1xuICAgICAgICAgICAgZXJySGFuZGxlci5lcnJvcih7Y29kZTogZXJyb3IsIG1lc3NhZ2U6IGVyci5uYW1lLCBkYXRhOiBlcnJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbmNlID0ge1xuICAgICAgICBzdG9yZUZyYWdtZW50OiBzdG9yZUZyYWdtZW50LFxuICAgICAgICBjcmVhdGVPZmZsaW5lTWFuaWZlc3Q6IGNyZWF0ZU9mZmxpbmVNYW5pZmVzdCxcbiAgICAgICAgdXBkYXRlT2ZmbGluZU1hbmlmZXN0OiB1cGRhdGVPZmZsaW5lTWFuaWZlc3QsXG4gICAgICAgIGdldE1hbmlmZXN0QnlJZDogZ2V0TWFuaWZlc3RCeUlkLFxuICAgICAgICBzYXZlU2VsZWN0ZWRSZXByZXNlbnRhdGlvbnM6IHNhdmVTZWxlY3RlZFJlcHJlc2VudGF0aW9ucyxcbiAgICAgICAgY3JlYXRlRnJhZ21lbnRTdG9yZTogY3JlYXRlRnJhZ21lbnRTdG9yZSxcbiAgICAgICAgZ2V0Q3VycmVudEhpZ2hlck1hbmlmZXN0SWQ6IGdldEN1cnJlbnRIaWdoZXJNYW5pZmVzdElkLFxuICAgICAgICBnZXRBbGxNYW5pZmVzdHM6IGdldEFsbE1hbmlmZXN0cyxcbiAgICAgICAgZGVsZXRlRG93bmxvYWRCeUlkOiBkZWxldGVEb3dubG9hZEJ5SWQsXG4gICAgICAgIHNldERvd25sb2FkaW5nU3RhdHVzOiBzZXREb3dubG9hZGluZ1N0YXR1cyxcbiAgICAgICAgc2V0UmVwcmVzZW50YXRpb25DdXJyZW50U3RhdGU6IHNldFJlcHJlc2VudGF0aW9uQ3VycmVudFN0YXRlLFxuICAgICAgICBnZXRSZXByZXNlbnRhdGlvbkN1cnJlbnRTdGF0ZTogZ2V0UmVwcmVzZW50YXRpb25DdXJyZW50U3RhdGVcbiAgICB9O1xuXG4gICAgc2V0dXAoKTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cblxuT2ZmbGluZVN0b3JlQ29udHJvbGxlci5fX2Rhc2hqc19mYWN0b3J5X25hbWUgPSAnT2ZmbGluZVN0b3JlQ29udHJvbGxlcic7XG5leHBvcnQgZGVmYXVsdCBkYXNoanMuRmFjdG9yeU1ha2VyLmdldENsYXNzRmFjdG9yeShPZmZsaW5lU3RvcmVDb250cm9sbGVyKTsgLyoganNoaW50IGlnbm9yZTpsaW5lICovXG4iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuLyoqXG4gKiBPZmZsaW5lIEVycm9ycyBkZWNsYXJhdGlvblxuICogQGNsYXNzXG4gKi9cbmNsYXNzIEVycm9ycyB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogRXJyb3IgY29kZSByZXR1cm5lZCB3aGVuIGFuIGVycm9yIG9jY3VycyBpbiBvZmZsaW5lIG1vZHVsZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5PRkZMSU5FX0VSUk9SID0gMTEwMDA7XG5cbiAgICAgICAgLy8gQmFzZWQgdXBvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9BUEkvRE9NRXhjZXB0aW9uXG4gICAgICAgIHRoaXMuSU5ERVhFRERCX1FVT1RBX0VYQ0VFRF9FUlJPUiA9IDExMDAxO1xuICAgICAgICB0aGlzLklOREVYRUREQl9JTlZBTElEX1NUQVRFX0VSUk9SID0gMTEwMDI7XG4gICAgICAgIHRoaXMuSU5ERVhFRERCX05PVF9SRUFEQUJMRV9FUlJPUiA9IDExMDAzO1xuICAgICAgICB0aGlzLklOREVYRUREQl9OT1RfRk9VTkRfRVJST1IgPSAxMTAwNDtcbiAgICAgICAgdGhpcy5JTkRFWEVEREJfTkVUV09SS19FUlJPUiA9IDExMDA1O1xuICAgICAgICB0aGlzLklOREVYRUREQl9EQVRBX0VSUk9SID0gMTEwMDY7XG4gICAgICAgIHRoaXMuSU5ERVhFRERCX1RSQU5TQUNUSU9OX0lOQUNUSVZFX0VSUk9SID0gMTEwMDc7XG4gICAgICAgIHRoaXMuSU5ERVhFRERCX05PVF9BTExPV0VEX0VSUk9SID0gMTEwMDg7XG4gICAgICAgIHRoaXMuSU5ERVhFRERCX05PVF9TVVBQT1JURURfRVJST1IgPSAxMTAwOTtcbiAgICAgICAgdGhpcy5JTkRFWEVEREJfVkVSU0lPTl9FUlJPUiA9IDExMDEwO1xuICAgICAgICB0aGlzLklOREVYRUREQl9USU1FT1VUX0VSUk9SID0gMTEwMTE7XG4gICAgICAgIHRoaXMuSU5ERVhFRERCX0FCT1JUX0VSUk9SID0gMTEwMTI7XG4gICAgICAgIHRoaXMuSU5ERVhFRERCX1VOS05PV05fRVJST1IgPSAxMTAxMztcbiAgICB9XG59XG5cbmxldCBlcnJvcnMgPSBuZXcgRXJyb3JzKCk7XG5leHBvcnQgZGVmYXVsdCBlcnJvcnM7XG4iLCJpbXBvcnQgRXZlbnRzQmFzZSBmcm9tICcuLy4uLy4uL2NvcmUvZXZlbnRzL0V2ZW50c0Jhc2UnO1xuLyoqXG4gKiBUaGVzZSBhcmUgb2ZmbGluZSBldmVudHMgdGhhdCBzaG91bGQgYmUgc2VudCB0byB0aGUgcGxheWVyIGxldmVsLlxuICogQGNsYXNzXG4gKiBAaWdub3JlXG4gKi9cbmNsYXNzIE9mZmxpbmVFdmVudHMgZXh0ZW5kcyBFdmVudHNCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5ET1dOTE9BRElOR19QQVVTRUQgPSAnZG93bmxvYWRpbmdQYXVzZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhbGwgbWVkaWFJbmZvIGhhcyBiZWVuIGxvYWRlZCBvbiBPZmZsaW5lU3RyZWFtXG4gICAgICAgICAqIFJldHVybiBhIGxpc3Qgb2YgYXZhaWxhYmxlIGJpdHJhdGVJbmZvIG5lZWRlZCB0byBkb3dubG9hZCBzdHJlYW0uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkRPV05MT0FEQUJMRV9SRVBSRVNFTlRBVElPTlNfTE9BREVEID0gJ3B1YmxpY19kb3dubG9hZGFibGVSZXByZXNlbnRhdGlvbnNJbmZvTG9hZGVkJztcblxuICAgICAgICB0aGlzLkRBU0hfRUxFTUVOVFNfQ1JFQVRJT05fTkVFREVEID0gJ2Rhc2hFbGVtZW50c0NyZWF0aW9uTmVlZGVkJztcblxuICAgICAgICAvKiogVHJpZ2dlcmVkIHdoZW4gdGhlIGRvd25sb2FkaW5nIGlzIGluaXRpYWxpemUgYW5kIHN0YXJ0ZWRcbiAgICAgICAgKiBAZXZlbnQgT2ZmbGluZUV2ZW50cyNET1dOTE9BRElOR19TVE9QUEVEXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuRE9XTkxPQURJTkdfU1RBUlRFRCA9ICdwdWJsaWNfZG93bmxvYWRpbmdTdGFydGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgdXNlciBzdG9wIGN1cnJlbnQgZG93bmxvYWRpbmdcbiAgICAgICAgKiBAZXZlbnQgT2ZmbGluZUV2ZW50cyNET1dOTE9BRElOR19TVE9QUEVEXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuRE9XTkxPQURJTkdfU1RPUFBFRCA9ICdwdWJsaWNfZG93bmxvYWRpbmdTdG9wcGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhbGwgZnJhZ21lbnRzIGhhcyBiZWVuIGRvd25sb2FkZWRcbiAgICAgICAgKiBAZXZlbnQgT2ZmbGluZUV2ZW50cyNET1dOTE9BRElOR19GSU5JU0hFRFxuICAgICAgICAqL1xuICAgICAgICB0aGlzLkRPV05MT0FESU5HX0ZJTklTSEVEID0gJ3B1YmxpY19kb3dubG9hZGluZ0ZpbmlzaGVkJztcbiAgICB9XG59XG5cbmxldCBvZmZsaW5lRXZlbnRzID0gbmV3IE9mZmxpbmVFdmVudHMoKTtcbmV4cG9ydCBkZWZhdWx0IG9mZmxpbmVFdmVudHM7XG4iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuXG5pbXBvcnQgT2ZmbGluZUNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9PZmZsaW5lQ29udHJvbGxlcic7XG5cbi8vIFNob3ZlIGJvdGggb2YgdGhlc2UgaW50byB0aGUgZ2xvYmFsIHNjb3BlXG52YXIgY29udGV4dCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cpIHx8IGdsb2JhbDtcblxudmFyIGRhc2hqcyA9IGNvbnRleHQuZGFzaGpzO1xuaWYgKCFkYXNoanMpIHtcbiAgICBkYXNoanMgPSBjb250ZXh0LmRhc2hqcyA9IHt9O1xufVxuXG5kYXNoanMuT2ZmbGluZUNvbnRyb2xsZXIgPSBPZmZsaW5lQ29udHJvbGxlcjtcblxuZXhwb3J0IGRlZmF1bHQgZGFzaGpzO1xuZXhwb3J0IHsgT2ZmbGluZUNvbnRyb2xsZXIgfTtcbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5pbXBvcnQgSW5kZXhEQlN0b3JlIGZyb20gJy4uL3N0b3JhZ2UvSW5kZXhEQlN0b3JlJztcblxuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb24gTG9hZCBPZmZsaW5lIHJlc291cmNlc1xuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIGRlcGVuZGVuY2VzXG4gKi9cbmZ1bmN0aW9uIEluZGV4REJPZmZsaW5lTG9hZGVyKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgIGNvbnN0IHVybFV0aWxzID0gY29uZmlnLnVybFV0aWxzO1xuICAgIGNvbnN0IGNvbnN0YW50cyA9IGNvbmZpZy5jb25zdGFudHM7XG4gICAgY29uc3QgZGFzaENvbnN0YW50cyA9IGNvbmZpZy5kYXNoQ29uc3RhbnRzO1xuXG4gICAgbGV0IGluc3RhbmNlLFxuICAgICAgICBpbmRleERCU3RvcmU7XG5cbiAgICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICAgICAgaW5kZXhEQlN0b3JlID0gSW5kZXhEQlN0b3JlKGNvbnRleHQpLmdldEluc3RhbmNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWFuaWZlc3RJZCAodXJsKSB7XG4gICAgICAgIGxldCBteVVSTCA9IHVybFV0aWxzLnJlbW92ZUhvc3RuYW1lKHVybCk7XG4gICAgICAgIHZhciBwYXJ0cyA9IG15VVJMLnNwbGl0KCcvJyk7XG4gICAgICAgIHJldHVybiBwYXJ0c1swXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9hZCBtYW5pZmVzdCBvciBmcmFnbWVudCBmcm9tIGluZGV4ZWRkYiBkYXRhYmFzZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgY29uZmlndXJhdGlvbiBvZiByZXF1ZXN0XG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpvZmZsaW5lXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gbG9hZChjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5yZXF1ZXN0KSB7XG4gICAgICAgICAgICBsZXQgbWFuaWZlc3RJZCA9IGdldE1hbmlmZXN0SWQoY29uZmlnLnJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgIGlmIChtYW5pZmVzdElkICUgMSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnJlcXVlc3QubWVkaWFUeXBlID09PSBjb25zdGFudHMuQVVESU8gfHxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnJlcXVlc3QubWVkaWFUeXBlID09PSBjb25zdGFudHMuVklERU8gfHxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnJlcXVlc3QubWVkaWFUeXBlID09PSBjb25zdGFudHMuVEVYVCB8fFxuICAgICAgICAgICAgICAgICAgICBjb25maWcucmVxdWVzdC5tZWRpYVR5cGUgPT09IGNvbnN0YW50cy5NVVhFRCB8fFxuICAgICAgICAgICAgICAgICAgICBjb25maWcucmVxdWVzdC5tZWRpYVR5cGUgPT09IGNvbnN0YW50cy5JTUFHRSB8fFxuICAgICAgICAgICAgICAgICAgICBjb25maWcucmVxdWVzdC5tZWRpYVR5cGUgPT09IGNvbnN0YW50cy5GUkFHTUVOVEVEX1RFWFQgfHxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLnJlcXVlc3QubWVkaWFUeXBlID09PSBjb25zdGFudHMuRU1CRURERURfVEVYVFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VmZml4ID0gY29uZmlnLnJlcXVlc3QudHlwZSA9PT0gJ0luaXRpYWxpemF0aW9uU2VnbWVudCcgPyAnaW5pdCcgOiBjb25maWcucmVxdWVzdC5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IGNvbmZpZy5yZXF1ZXN0LnJlcHJlc2VudGF0aW9uSWQgKyAnXycgKyBzdWZmaXg7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4REJTdG9yZS5nZXRGcmFnbWVudEJ5S2V5KG1hbmlmZXN0SWQsIGtleSkudGhlbihmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zdWNjZXNzKGZyYWdtZW50LCBudWxsLCBjb25maWcucmVxdWVzdC51cmwsIGNvbnN0YW50cy5BUlJBWV9CVUZGRVIpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWcucmVxdWVzdC50eXBlID09PSBkYXNoQ29uc3RhbnRzLk1QRCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleERCU3RvcmUuZ2V0TWFuaWZlc3RCeUlkKG1hbmlmZXN0SWQpLnRoZW4oZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4REJTdG9yZS5jcmVhdGVGcmFnbWVudFN0b3JlKGl0ZW0uZnJhZ21lbnRTdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuc3VjY2VzcyhpdGVtLm1hbmlmZXN0LCBudWxsLCBjb25maWcucmVxdWVzdC51cmwsIGNvbnN0YW50cy5YTUwpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZXJyb3IoY29uZmlnLnJlcXVlc3QsIDQwNCwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuZXJyb3IoY29uZmlnLnJlcXVlc3QsIG51bGwsICdNZWRpYVR5cGUgY2FuIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWJvcnQoKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgdG8gZG9cbiAgICB9XG5cbiAgICBzZXR1cCgpO1xuXG4gICAgaW5zdGFuY2UgPSB7XG4gICAgICAgIGxvYWQ6IGxvYWQsXG4gICAgICAgIGFib3J0OiBhYm9ydFxuICAgIH07XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbkluZGV4REJPZmZsaW5lTG9hZGVyLl9fZGFzaGpzX2ZhY3RvcnlfbmFtZSA9ICdJbmRleERCT2ZmbGluZUxvYWRlcic7XG5jb25zdCBmYWN0b3J5ID0gZGFzaGpzLkZhY3RvcnlNYWtlci5nZXRDbGFzc0ZhY3RvcnkoSW5kZXhEQk9mZmxpbmVMb2FkZXIpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbmV4cG9ydCBkZWZhdWx0IGZhY3Rvcnk7XG4iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuY29uc3QgbG9jYWxmb3JhZ2UgPSByZXF1aXJlKCdsb2NhbGZvcmFnZScpO1xuY29uc3QgZW50aXRpZXMgPSByZXF1aXJlKCdodG1sLWVudGl0aWVzJykuWG1sRW50aXRpZXM7XG5cbi8qKlxuICogQG1vZHVsZSAgSW5kZXhEQlN0b3JlXG4gKiBAZGVzY3JpcHRpb24gSW5kZXhlZERCIEFjY2Vzc1xuICovXG5mdW5jdGlvbiBJbmRleERCU3RvcmUoKSB7XG5cbiAgICBsZXQgaW5zdGFuY2UsXG4gICAgICAgIG1hbmlmZXN0U3RvcmUsXG4gICAgICAgIGZyYWdtZW50U3RvcmVzO1xuXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAgIGZyYWdtZW50U3RvcmVzID0ge307XG5cbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbGZvcmFnZS5jb25maWcoe1xuICAgICAgICAgICAgZHJpdmVyOiBsb2NhbGZvcmFnZS5JTkRFWEVEREIsXG4gICAgICAgICAgICBuYW1lOiAnZGFzaF9vZmZsaW5lX2RiJ1xuICAgICAgICB9KTtcblxuICAgICAgICBtYW5pZmVzdFN0b3JlID0gbG9jYWxmb3JhZ2UuY3JlYXRlSW5zdGFuY2Uoe1xuICAgICAgICAgICAgZHJpdmVyOiBsb2NhbGZvcmFnZS5JTkRFWEVEREIsXG4gICAgICAgICAgICBuYW1lOiAnZGFzaF9vZmZsaW5lX2RiJyxcbiAgICAgICAgICAgIHZlcnNpb246IDEuMCxcbiAgICAgICAgICAgIHN0b3JlTmFtZTogJ21hbmlmZXN0J1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gR0VUL1NFVCBNZXRob2RzXG4gICAgLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGxvY2FsZm9yYWdlIHRvIHN0b3JlIGZyYWdtZW50cyBpbiBpbmRleGVkIGRiXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0b3JlTmFtZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6SW5kZXhEQlN0b3JlXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRTdG9yZShzdG9yZU5hbWUpIHtcblxuICAgICAgICBpZiAoIWZyYWdtZW50U3RvcmVzW3N0b3JlTmFtZV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXRTdG9yZSAgJyArIHN0b3JlTmFtZSk7XG4gICAgICAgICAgICBsZXQgZnJhZ21lbnRTdG9yZSA9IGxvY2FsZm9yYWdlLmNyZWF0ZUluc3RhbmNlKHtcbiAgICAgICAgICAgICAgICBkcml2ZXI6IGxvY2FsZm9yYWdlLklOREVYRUREQixcbiAgICAgICAgICAgICAgICBuYW1lOiAnZGFzaF9vZmZsaW5lX2RiJyxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiAxLjAsXG4gICAgICAgICAgICAgICAgc3RvcmVOYW1lOiBzdG9yZU5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnJhZ21lbnRTdG9yZXNbc3RvcmVOYW1lXSA9IGZyYWdtZW50U3RvcmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgZG93bmxvYWQgc3RhdHVzXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpJbmRleERCU3RvcmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWFuaWZlc3RJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdTdGF0dXNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldERvd25sb2FkaW5nU3RhdHVzKG1hbmlmZXN0SWQsIG5ld1N0YXR1cykge1xuICAgICAgICByZXR1cm4gZ2V0TWFuaWZlc3RCeUlkKG1hbmlmZXN0SWQpLnRoZW4oZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU1hbmlmZXN0KGl0ZW0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBzZXQgc3RhdHVzICcgKyBuZXdTdGF0dXMgKyAnIGZvciB0aGlzIHN0cmVhbSAhJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0IGxhc3QgZG93bmxvYWRlZCBmcmFnbWVudCBpbmRleCBmb3IgcmVwcmVzZW50YXRpb25JZFxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6SW5kZXhEQlN0b3JlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1hbmlmZXN0SWQgLSBtYW5pZmVzdCBpZFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwcmVzZW50YXRpb25JZCAtIHJlcHJlc2VudGF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXRlIC0gcmVwcmVzZW50YXRpb24gc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldFJlcHJlc2VudGF0aW9uQ3VycmVudFN0YXRlKG1hbmlmZXN0SWQsIHJlcHJlc2VudGF0aW9uSWQsIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBnZXRNYW5pZmVzdEJ5SWQobWFuaWZlc3RJZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKCFpdGVtLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGF0ZSA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWl0ZW0uc3RhdGVbcmVwcmVzZW50YXRpb25JZF0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLnN0YXRlW3JlcHJlc2VudGF0aW9uSWRdID0ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgICAgIGRvd25sb2FkZWQ6IDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLnN0YXRlW3JlcHJlc2VudGF0aW9uSWRdID0gc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlTWFuaWZlc3QoaXRlbSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnQ2Fubm90IHNldCBjdXJyZW50IGluZGV4IGZvciByZXByZXNlbmF0aW9uIGlkICcgKyByZXByZXNlbnRhdGlvbklkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IGRvd25sb2FkZWQgc2VnbWVudCBpbmRleCBmb3IgcmVwcmVzZW50YXRpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOkluZGV4REJTdG9yZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYW5pZmVzdElkIC0gbWFuaWZlc3QgaWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwcmVzZW50YXRpb25JZCAtIHJlcHJlc2VudGF0aW9uXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2VcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZXByZXNlbnRhdGlvbkN1cnJlbnRTdGF0ZShtYW5pZmVzdElkLCByZXByZXNlbnRhdGlvbklkKSB7XG4gICAgICAgIHJldHVybiBnZXRNYW5pZmVzdEJ5SWQobWFuaWZlc3RJZCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0ge1xuICAgICAgICAgICAgICAgIGluZGV4OiAtMSxcbiAgICAgICAgICAgICAgICBkb3dubG9hZGVkOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdGUgJiYgaXRlbS5zdGF0ZVtyZXByZXNlbnRhdGlvbklkXSkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gaXRlbS5zdGF0ZVtyZXByZXNlbnRhdGlvbklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZyYWdtZW50IGZyb20gaXRzIGtleVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6SW5kZXhEQlN0b3JlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1hbmlmZXN0SWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ga2V5XG4gICAgICogQHJldHVybnMge1Byb21pc2V9IGZyYWdtZW50XG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RnJhZ21lbnRCeUtleShtYW5pZmVzdElkLCBrZXkpIHtcbiAgICAgICAgbGV0IGZyYWdtZW50U3RvcmUgPSBmcmFnbWVudFN0b3Jlc1ttYW5pZmVzdElkXTtcblxuICAgICAgICBpZiAoIWZyYWdtZW50U3RvcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IgKGBObyBmcmFnbWVudCBzdG9yZSBmb3VuZCBmb3IgbWFuaWZlc3QgJHttYW5pZmVzdElkfWApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmcmFnbWVudFN0b3JlLmdldEl0ZW0oa2V5KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBtYW5pZmVzdCBmcm9tIGl0cyBpZGVudGlmaWVyXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpJbmRleERCU3RvcmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0ge09iamVjdFtdfSBtYW5pZmVzdHNcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRNYW5pZmVzdEJ5SWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIGdldEFsbE1hbmlmZXN0cygpLnRoZW4oZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5tYW5pZmVzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5Lm1hbmlmZXN0c1tpXS5tYW5pZmVzdElkID09PSBwYXJzZUludChpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBhcnJheS5tYW5pZmVzdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5tYW5pZmVzdCA9IGVudGl0aWVzLmRlY29kZShpdGVtLm1hbmlmZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0Nhbm5vdCBmb3VuZCBtYW5pZmVzdCB3aXRoIHRoaXMgbWFuaWZlc3RJZCA6ICcgKyBpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0FueSBtYW5pZmVzdHMgc3RvcmVkIGluIERCICEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIG9mZmxpbmUgbWFuaWZlc3RzXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpJbmRleERCU3RvcmVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0ge09iamVjdFtdfSBtYW5pZmVzdHNcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRBbGxNYW5pZmVzdHMoKSB7XG4gICAgICAgIHJldHVybiBtYW5pZmVzdFN0b3JlLmdldEl0ZW0oJ21hbmlmZXN0JykudGhlbihmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYXJyYXkgPyBhcnJheSA6IHtcbiAgICAgICAgICAgICAgICAnbWFuaWZlc3RzJzogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGhpZ2hlciBtYW5pZmVzdCBpZFxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6SW5kZXhEQlN0b3JlXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IG51bWJlclxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRIaWdoZXJNYW5pZmVzdElkKCkge1xuICAgICAgICByZXR1cm4gZ2V0QWxsTWFuaWZlc3RzKCkudGhlbihmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBoaWdoZXJNYW5pZmVzdElkID0gMDtcbiAgICAgICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubWFuaWZlc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheS5tYW5pZmVzdHNbaV0ubWFuaWZlc3RJZCA+IGhpZ2hlck1hbmlmZXN0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlck1hbmlmZXN0SWQgPSBhcnJheS5tYW5pZmVzdHNbaV0ubWFuaWZlc3RJZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhpZ2hlck1hbmlmZXN0SWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhpZ2hlck1hbmlmZXN0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG1hbmlmZXN0XG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpJbmRleERCU3RvcmVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFuaWZlc3QgdXBkYXRlZCBtYW5pZmVzdFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIGFzeW5jaHJvbm91c2x5IHJlc29sdmVkXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlTWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICAgICAgcmV0dXJuIGdldEFsbE1hbmlmZXN0cygpLnRoZW4oZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubWFuaWZlc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheS5tYW5pZmVzdHNbaV0ubWFuaWZlc3RJZCA9PT0gbWFuaWZlc3QubWFuaWZlc3RJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkubWFuaWZlc3RzW2ldID0gbWFuaWZlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hbmlmZXN0U3RvcmUuc2V0SXRlbSgnbWFuaWZlc3QnLCBhcnJheSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FueSByZXN1bHRzIGZvdW5kICEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2F2ZSBzZWxlY3RlZCByZXByZXNlbnRhdGlvbiBieSB1c2VyXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpJbmRleERCU3RvcmVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFuaWZlc3QgdXBkYXRlZCBtYW5pZmVzdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzZWxlY3RlZCBzZWxlY3RlZCByZXByZXNlbnRhdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSBhc3luY2hyb25vdXNseSByZXNvbHZlZFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNhdmVTZWxlY3RlZFJlcHJlc2VudGF0aW9ucyhtYW5pZmVzdCwgc2VsZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGdldE1hbmlmZXN0QnlJZChtYW5pZmVzdCkudGhlbihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKCFpdGVtLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlTWFuaWZlc3QoaXRlbSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnQ2Fubm90IHNhdmUgc2VsZWN0ZWQgcmVwcmVzZW50YXRpb25zJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgbWFuaWZlc3QgaW4gbWFuaWZlc3QgYXJyYXlcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOkluZGV4REJTdG9yZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYW5pZmVzdFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0b3JlTWFuaWZlc3QobWFuaWZlc3QpIHtcbiAgICAgICAgcmV0dXJuIG1hbmlmZXN0U3RvcmUuZ2V0SXRlbSgnbWFuaWZlc3QnKS50aGVuKGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICBsZXQgYXJyYXkgPSByZXN1bHRzID8gcmVzdWx0cyA6IHtcbiAgICAgICAgICAgICAgICAnbWFuaWZlc3RzJzogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhcnJheS5tYW5pZmVzdHMucHVzaChtYW5pZmVzdCk7XG4gICAgICAgICAgICByZXR1cm4gbWFuaWZlc3RTdG9yZS5zZXRJdGVtKCdtYW5pZmVzdCcsIGFycmF5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmcmFnbWVudCBpbiBmcmFnbWVudCBzdG9yZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6SW5kZXhEQlN0b3JlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1hbmlmZXN0SWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZnJhZ21lbnRJZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBmcmFnbWVudERhdGFcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSBhc3luY2hyb25vdXNseSByZXNvbHZlZFxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0b3JlRnJhZ21lbnQobWFuaWZlc3RJZCwgZnJhZ21lbnRJZCwgZnJhZ21lbnREYXRhKSB7XG4gICAgICAgIGxldCBmcmFnbWVudFN0b3JlID0gZnJhZ21lbnRTdG9yZXNbbWFuaWZlc3RJZF07XG5cbiAgICAgICAgaWYgKCFmcmFnbWVudFN0b3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yIChgTm8gZnJhZ21lbnQgc3RvcmUgZm91bmQgZm9yIG1hbmlmZXN0ICR7bWFuaWZlc3RJZH1gKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ21lbnRTdG9yZS5zZXRJdGVtKGZyYWdtZW50SWQsIGZyYWdtZW50RGF0YSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvL1xuICAgIC8vIERST1AgTWV0aG9kc1xuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBtYW5pZmVzdCBhbmQgZnJhZ21lbnQgc3RvcmVcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOkluZGV4REJTdG9yZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIGFzeW5jaHJvbm91c2x5IHJlc29sdmVkXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gZHJvcEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZm9yYWdlLmNsZWFyKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZnJhbWdlbnQgc3RvcmUgZ2l2ZW4gaXRzIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVOYW1lXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpJbmRleERCU3RvcmVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkcm9wRnJhZ21lbnRTdG9yZShzdG9yZU5hbWUpIHtcbiAgICAgICAgbG9jYWxmb3JhZ2UuZHJvcEluc3RhbmNlKHtcbiAgICAgICAgICAgIGRyaXZlcjogbG9jYWxmb3JhZ2UuSU5ERVhFRERCLFxuICAgICAgICAgICAgbmFtZTogJ2Rhc2hfb2ZmbGluZV9kYicsXG4gICAgICAgICAgICB2ZXJzaW9uOiAxLjAsXG4gICAgICAgICAgICBzdG9yZU5hbWU6IHN0b3JlTmFtZVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBmcmFnbWVudFN0b3Jlc1tzdG9yZU5hbWVdO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZHJvcEZyYWdtZW50U3RvcmUgZmFpbGVkICcgKyBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBkb3dubG9hZCBnaXZlbiBpdHMgaWQgKGZyYWdtZW50U3RvcmUgKyBtYW5pZmVzdCBlbnRyeSBpbiBtYW5pZmVzdCBhcnJheSlcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOkluZGV4REJTdG9yZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYW5pZmVzdElkXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgYXN5bmNocm9ub3VzbHkgcmVzb2x2ZWRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWxldGVEb3dubG9hZEJ5SWQobWFuaWZlc3RJZCkge1xuICAgICAgICByZXR1cm4gbWFuaWZlc3RTdG9yZS5nZXRJdGVtKCdtYW5pZmVzdCcpLnRoZW4oZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVsZXRlRnJhZ21lbnRTdG9yZShtYW5pZmVzdElkKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5tYW5pZmVzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheS5tYW5pZmVzdHNbaV0ubWFuaWZlc3RJZCA9PT0gcGFyc2VJbnQobWFuaWZlc3RJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5tYW5pZmVzdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYW5pZmVzdFN0b3JlLnNldEl0ZW0oJ21hbmlmZXN0JywgYXJyYXkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnVGhpcyBzdHJlYW0gaGFzIGJlZW4gc3VjY2Vzc2Z1bGwgcmVtb3ZlZCAhJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnQW4gZXJyb3Igb2NjdXJlZCB3aGVuIHRyeWluZyB0byBkZWxldGUgdGhpcyBtYW5pZmVzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTm90aGluZyB0byBkZWxldGUgIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGZyYWdtZW50IHN0b3JlXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpJbmRleERCU3RvcmVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVOYW1lXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgYXN5bmNocm9ub3VzbHkgcmVzb2x2ZWRcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWxldGVGcmFnbWVudFN0b3JlKHN0b3JlTmFtZSkge1xuICAgICAgICBsb2NhbGZvcmFnZS5jcmVhdGVJbnN0YW5jZSh7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaF9vZmZsaW5lX2RiJyxcbiAgICAgICAgICAgIHN0b3JlTmFtZTogc3RvcmVOYW1lXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbG9jYWxmb3JhZ2UuZHJvcEluc3RhbmNlKHtcbiAgICAgICAgICAgIG5hbWU6ICdkYXNoX29mZmxpbmVfZGInLFxuICAgICAgICAgICAgc3RvcmVOYW1lOiBzdG9yZU5hbWVcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWxldGUgZnJhZ21lbnRTdG9yZXNbc3RvcmVOYW1lXTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgc2V0dXAoKTtcblxuICAgIGluc3RhbmNlID0ge1xuICAgICAgICBkcm9wQWxsOiBkcm9wQWxsLFxuICAgICAgICBnZXRGcmFnbWVudEJ5S2V5OiBnZXRGcmFnbWVudEJ5S2V5LFxuICAgICAgICBnZXRNYW5pZmVzdEJ5SWQ6IGdldE1hbmlmZXN0QnlJZCxcbiAgICAgICAgc3RvcmVGcmFnbWVudDogc3RvcmVGcmFnbWVudCxcbiAgICAgICAgc3RvcmVNYW5pZmVzdDogc3RvcmVNYW5pZmVzdCxcbiAgICAgICAgdXBkYXRlTWFuaWZlc3Q6IHVwZGF0ZU1hbmlmZXN0LFxuICAgICAgICBzYXZlU2VsZWN0ZWRSZXByZXNlbnRhdGlvbnM6IHNhdmVTZWxlY3RlZFJlcHJlc2VudGF0aW9ucyxcbiAgICAgICAgY3JlYXRlRnJhZ21lbnRTdG9yZTogY3JlYXRlRnJhZ21lbnRTdG9yZSxcbiAgICAgICAgc2V0RG93bmxvYWRpbmdTdGF0dXM6IHNldERvd25sb2FkaW5nU3RhdHVzLFxuICAgICAgICBzZXRSZXByZXNlbnRhdGlvbkN1cnJlbnRTdGF0ZTogc2V0UmVwcmVzZW50YXRpb25DdXJyZW50U3RhdGUsXG4gICAgICAgIGdldFJlcHJlc2VudGF0aW9uQ3VycmVudFN0YXRlOiBnZXRSZXByZXNlbnRhdGlvbkN1cnJlbnRTdGF0ZSxcbiAgICAgICAgZ2V0Q3VycmVudEhpZ2hlck1hbmlmZXN0SWQ6IGdldEN1cnJlbnRIaWdoZXJNYW5pZmVzdElkLFxuICAgICAgICBnZXRBbGxNYW5pZmVzdHM6IGdldEFsbE1hbmlmZXN0cyxcbiAgICAgICAgZHJvcEZyYWdtZW50U3RvcmU6IGRyb3BGcmFnbWVudFN0b3JlLFxuICAgICAgICBkZWxldGVEb3dubG9hZEJ5SWQ6IGRlbGV0ZURvd25sb2FkQnlJZFxuICAgIH07XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbkluZGV4REJTdG9yZS5fX2Rhc2hqc19mYWN0b3J5X25hbWUgPSAnSW5kZXhEQlN0b3JlJztcbmV4cG9ydCBkZWZhdWx0IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0U2luZ2xldG9uRmFjdG9yeShJbmRleERCU3RvcmUpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cbmNvbnN0IEVudGl0aWVzID0gcmVxdWlyZSgnaHRtbC1lbnRpdGllcycpLlhtbEVudGl0aWVzO1xuY29uc3QgT0ZGTElORV9CQVNFX1VSTCA9ICdvZmZsaW5lX2luZGV4ZGI6Ly8nO1xuXG4vKipcbiAqIEBtb2R1bGUgT2ZmbGluZUluZGV4REJNYW5pZmVzdFBhcnNlclxuICogQGRlc2NyaXB0aW9uICBQYXJzZSBvbmxpbmUgbWFuaWZlc3QgdG8gb2ZmbGluZSBtYW5pZmVzdFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIGRlcGVuZGFuY2VzXG4qL1xuZnVuY3Rpb24gT2ZmbGluZUluZGV4REJNYW5pZmVzdFBhcnNlcihjb25maWcpIHtcblxuICAgIGNvbnN0IG1hbmlmZXN0SWQgPSBjb25maWcubWFuaWZlc3RJZDtcbiAgICBjb25zdCBhbGxNZWRpYUluZm9zID0gY29uZmlnLmFsbE1lZGlhSW5mb3M7XG4gICAgY29uc3QgdXJsVXRpbHMgPSBjb25maWcudXJsVXRpbHM7XG4gICAgY29uc3QgZGVidWcgPSBjb25maWcuZGVidWc7XG4gICAgY29uc3QgZGFzaENvbnN0YW50cyA9IGNvbmZpZy5kYXNoQ29uc3RhbnRzO1xuICAgIGNvbnN0IGNvbnN0YW50cyA9IGNvbmZpZy5jb25zdGFudHM7XG5cbiAgICBsZXQgaW5zdGFuY2UsXG4gICAgICAgIERPTSxcbiAgICAgICAgbG9nZ2VyO1xuXG5cbiAgICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICAgICAgbG9nZ2VyID0gZGVidWcuZ2V0TG9nZ2VyKGluc3RhbmNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBYTUwgbWFuaWZlc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gWE1MRG9jIC0geG1sIG1hbmlmZXN0XG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcHJlc2VudGF0aW9uXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgb3IgcmVqZWN0ZWQgYXQgdGhlIGVuZCBvZiBlbmNvZGluZyBwcm9jZXNzXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpPZmZsaW5lSW5kZXhEQk1hbmlmZXN0UGFyc2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgKi9cbiAgICBmdW5jdGlvbiBwYXJzZShYTUxEb2MsIHJlcHJlc2VudGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIERPTSA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoWE1MRG9jLCAnYXBwbGljYXRpb24veG1sJyk7XG4gICAgICAgICAgICBsZXQgbXBkID0gRE9NLmdldEVsZW1lbnRzQnlUYWdOYW1lKGRhc2hDb25zdGFudHMuTVBEKSA/IERPTS5nZXRFbGVtZW50c0J5VGFnTmFtZShkYXNoQ29uc3RhbnRzLk1QRCkgOiBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1wZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChtcGRbaV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdEJhc2VVUkxBdHRyaWJ1dGUobXBkW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgYnJvd3NlUGVyaW9kcyhtcGRbaV0sIHJlcHJlc2VudGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBtYW5pZmVzdEVuY29kZWQgPSBlbmNvZGVNYW5pZmVzdChET00pO1xuICAgICAgICAgICAgaWYgKG1hbmlmZXN0RW5jb2RlZCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG1hbmlmZXN0RW5jb2RlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdCgnRW5jb2RlZCBlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVUkwgZW5jb2RlIHBhcnNlZCBtYW5pZmVzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBET01cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOk9mZmxpbmVJbmRleERCTWFuaWZlc3RQYXJzZXJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVcmwgZW5jb2RlZCBYTUxcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGVuY29kZU1hbmlmZXN0KERPTSkge1xuICAgICAgICBsb2dnZXIuaW5mbygnZW5jb2RlZE1hbmlmZXN0ICcgKyBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKERPTSkpO1xuICAgICAgICByZXR1cm4gbmV3IEVudGl0aWVzKCkuZW5jb2RlKG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoRE9NKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJhc2VVUkwgdG8gcG9pbnQgdG8gbG9jYWwgc3RvcmVkIGRhdGEgUFxuICAgICAqIEBwYXJhbSB7WE1MfSBjdXJyZW50TVBEXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpPZmZsaW5lSW5kZXhEQk1hbmlmZXN0UGFyc2VyXG4gICAgICogQGluc3RhbmNlXG4gICAgKi9cbiAgICBmdW5jdGlvbiBlZGl0QmFzZVVSTEF0dHJpYnV0ZShjdXJyZW50TVBEKSB7XG4gICAgICAgIGxldCBiYXNlc1VSTCxcbiAgICAgICAgICAgIGZyYWdtZW50SWQsXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbklkO1xuXG4gICAgICAgIGxldCB1cmwgPSBgJHtPRkZMSU5FX0JBU0VfVVJMfSR7bWFuaWZlc3RJZH0vYDtcblxuICAgICAgICBiYXNlc1VSTCA9IGN1cnJlbnRNUEQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZGFzaENvbnN0YW50cy5CQVNFX1VSTCk7XG5cbiAgICAgICAgaWYgKGJhc2VzVVJMLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gYWRkIGJhc2VVUkxcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoZGFzaENvbnN0YW50cy5CQVNFX1VSTCk7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHVybDtcbiAgICAgICAgICAgIGN1cnJlbnRNUEQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZXNVUkwgPSBjdXJyZW50TVBELmdldEVsZW1lbnRzQnlUYWdOYW1lKGRhc2hDb25zdGFudHMuQkFTRV9VUkwpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VzVVJMLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gYmFzZXNVUkxbaV0ucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgaWYgKHBhcmVudC5ub2RlTmFtZSA9PT0gZGFzaENvbnN0YW50cy5NUEQpIHtcbiAgICAgICAgICAgICAgICBiYXNlc1VSTFtpXS5pbm5lckhUTUwgPSB1cmw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5ub2RlTmFtZSA9PT0gZGFzaENvbnN0YW50cy5SRVBSRVNFTlRBVElPTikge1xuICAgICAgICAgICAgICAgIGxldCBhZGFwdGF0aW9uc1NldCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIGlmIChhZGFwdGF0aW9uc1NldC5ub2RlTmFtZSA9PSBkYXNoQ29uc3RhbnRzLkFEQVBUQVRJT05fU0VUKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybFV0aWxzLmlzSFRUUFMoYmFzZXNVUkxbaV0uaW5uZXJIVE1MKSB8fCB1cmxVdGlscy5pc0hUVFBVUkwoYmFzZXNVUkxbaV0uaW5uZXJIVE1MKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRJZCA9IGdldEZyYWdtZW50SWQoYmFzZXNVUkxbaV0uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uSWQgPSBnZXRCZXN0UmVwcmVzZW50YXRpb25JZChhZGFwdGF0aW9uc1NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlc1VSTFtpXS5pbm5lckhUTUwgPSB1cmwgKyByZXByZXNlbnRhdGlvbklkICsgJ18nICsgZnJhZ21lbnRJZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChiYXNlc1VSTFtpXS5pbm5lckhUTUwgPT09ICcuLycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VzVVJMW2ldLmlubmVySFRNTCA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50SWQgPSBnZXRGcmFnbWVudElkKGJhc2VzVVJMW2ldLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXByZXNlbnRhdGlvbklkID0gZ2V0QmVzdFJlcHJlc2VudGF0aW9uSWQoYWRhcHRhdGlvbnNTZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZXNVUkxbaV0uaW5uZXJIVE1MID0gcmVwcmVzZW50YXRpb25JZCArICdfJyArIGZyYWdtZW50SWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhc2VzVVJMW2ldLmlubmVySFRNTCA9IHVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJyb3dzZSBwZXJpb2RzXG4gICAgICogQHBhcmFtIHtYTUx9IGN1cnJlbnRNUERcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVwcmVzZW50YXRpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOk9mZmxpbmVJbmRleERCTWFuaWZlc3RQYXJzZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJyb3dzZVBlcmlvZHMoY3VycmVudE1QRCwgcmVwcmVzZW50YXRpb24pIHtcbiAgICAgICAgbGV0IHBlcmlvZHMgPSBjdXJyZW50TVBELmdldEVsZW1lbnRzQnlUYWdOYW1lKGRhc2hDb25zdGFudHMuUEVSSU9EKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwZXJpb2RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBicm93c2VBZGFwdGF0aW9uc1NldChwZXJpb2RzW2pdLCByZXByZXNlbnRhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCcm93c2UgYWRhcGF0YXRpb24gc2V0IHRvIHVwZGF0ZSBkYXRhIChkZWxldGUgdGhvc2UgdGFodCBhcmUgbm90IGNob29zZW4gYnkgdXNlciAuLi4pXG4gICAgICogQHBhcmFtIHtYTUx9IGN1cnJlbnRQZXJpb2RcbiAgICAgKiBAcGFyYW0ge0FycmF5fSByZXByZXNlbnRhdGlvbnNUb1VwZGF0ZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICovXG4gICAgZnVuY3Rpb24gYnJvd3NlQWRhcHRhdGlvbnNTZXQoY3VycmVudFBlcmlvZCwgcmVwcmVzZW50YXRpb25zVG9VcGRhdGUpIHtcbiAgICAgICAgbGV0IGFkYXB0YXRpb25zU2V0LFxuICAgICAgICAgICAgY3VycmVudEFkYXB0YXRpb25TZXQsXG4gICAgICAgICAgICBjdXJyZW50QWRhcHRhdGlvblR5cGUsXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbnM7XG5cbiAgICAgICAgYWRhcHRhdGlvbnNTZXQgPSBjdXJyZW50UGVyaW9kLmdldEVsZW1lbnRzQnlUYWdOYW1lKGRhc2hDb25zdGFudHMuQURBUFRBVElPTl9TRVQpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBhZGFwdGF0aW9uc1NldC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY3VycmVudEFkYXB0YXRpb25TZXQgPSBhZGFwdGF0aW9uc1NldFtpXTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50QWRhcHRhdGlvblNldCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBZGFwdGF0aW9uVHlwZSA9IGZpbmRBZGFwdGF0aW9uVHlwZShjdXJyZW50QWRhcHRhdGlvblNldCk7XG4gICAgICAgICAgICAgICAgcmVwcmVzZW50YXRpb25zID0gZmluZFJlcHJlc2VudGF0aW9ucyhjdXJyZW50QWRhcHRhdGlvblNldCk7XG5cbiAgICAgICAgICAgICAgICBmaW5kQW5kS2VlcE9ubHlTZWxlY3RlZFJlcHJlc2VudGF0aW9ucyhjdXJyZW50QWRhcHRhdGlvblNldCwgcmVwcmVzZW50YXRpb25zLCBjdXJyZW50QWRhcHRhdGlvblR5cGUpO1xuXG4gICAgICAgICAgICAgICAgcmVwcmVzZW50YXRpb25zID0gZmluZFJlcHJlc2VudGF0aW9ucyhjdXJyZW50QWRhcHRhdGlvblNldCk7XG5cbiAgICAgICAgICAgICAgICBkZWxldGVTZWdtZW50QmFzZShjdXJyZW50QWRhcHRhdGlvblNldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVwcmVzZW50YXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGVyaW9kLnJlbW92ZUNoaWxkKGN1cnJlbnRBZGFwdGF0aW9uU2V0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2RldGVjdCBTZWdtZW50IGxpc3QgdXNlIGNhc2VcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXByZXNlbnRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXAgPSByZXByZXNlbnRhdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VnbWVudExpc3QgPSBnZXRTZWdtZW50TGlzdChyZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnRMaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdFNlZ21lbnRMaXN0QXR0cmlidXRlcyhzZWdtZW50TGlzdCwgcmVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWdtZW50VGVtcGxhdGUgPSBnZXRTZWdtZW50VGVtcGxhdGUoY3VycmVudEFkYXB0YXRpb25TZXQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWdtZW50VGVtcGxhdGUgaXMgZGVmaW5lZCwgdXBkYXRlIGF0dHJpYnV0ZXMgaW4gb3JkZXIgdG8gYmUgY29ycmVjdGx5IHBsYXllZCBvZmZsaW5lXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWdtZW50VGVtcGxhdGUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRTZWdtZW50VGVtcGxhdGVBdHRyaWJ1dGVzKHNlZ21lbnRUZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBkZXRlY3QgU2VnbWVudEJhc2UgdXNlIGNhc2UgPT4gdHJhbnNmcm9tIG1hbmlmZXN0IHRvIFNlZ21lbnRMaXN0IGluIFNlZ21lbnRUZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVwcmVzZW50YXRpb25zVG9VcGRhdGUgJiYgcmVwcmVzZW50YXRpb25zVG9VcGRhdGUubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFJlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwcmVzZW50YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcCA9IHJlcHJlc2VudGF0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgcmVwcmVzZW50YXRpb25zVG9VcGRhdGUgJiYgaiA8IHJlcHJlc2VudGF0aW9uc1RvVXBkYXRlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXByZXNlbnRhdGlvbnNUb1VwZGF0ZVtqXS5pZCA9PT0gcmVwLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFJlcCA9IHJlcHJlc2VudGF0aW9uc1RvVXBkYXRlW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRTZWdtZW50VGVtcGxhdGVBdHRyaWJ1dGVzKGN1cnJlbnRBZGFwdGF0aW9uU2V0LCBzZWxlY3RlZFJlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHR5cGUgb2YgYWRhcGF0aW9uIHNldFxuICAgICAqIEBwYXJhbSB7WE1MfSBjdXJyZW50QWRhcHRhdGlvblNldFxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gdHlwZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICovXG4gICAgZnVuY3Rpb24gZmluZEFkYXB0YXRpb25UeXBlKGN1cnJlbnRBZGFwdGF0aW9uU2V0KSB7XG4gICAgICAgIGlmIChnZXRJc011eGVkKGN1cnJlbnRBZGFwdGF0aW9uU2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50cy5NVVhFRDtcbiAgICAgICAgfSBlbHNlIGlmIChnZXRJc0F1ZGlvKGN1cnJlbnRBZGFwdGF0aW9uU2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50cy5BVURJTztcbiAgICAgICAgfSBlbHNlIGlmIChnZXRJc1ZpZGVvKGN1cnJlbnRBZGFwdGF0aW9uU2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50cy5WSURFTztcbiAgICAgICAgfSBlbHNlIGlmIChnZXRJc0ZyYWdtZW50ZWRUZXh0KGN1cnJlbnRBZGFwdGF0aW9uU2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0YW50cy5GUkFHTUVOVEVEX1RFWFQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0SXNJbWFnZShjdXJyZW50QWRhcHRhdGlvblNldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdGFudHMuSU1BR0U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uc3RhbnRzLlRFWFQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SXNBdWRpbyhhZGFwdGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBnZXRJc1R5cGVPZihhZGFwdGF0aW9uLCBjb25zdGFudHMuQVVESU8pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElzVmlkZW8oYWRhcHRhdGlvbikge1xuICAgICAgICByZXR1cm4gZ2V0SXNUeXBlT2YoYWRhcHRhdGlvbiwgY29uc3RhbnRzLlZJREVPKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJc0ZyYWdtZW50ZWRUZXh0KGFkYXB0YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGdldElzVHlwZU9mKGFkYXB0YXRpb24sIGNvbnN0YW50cy5GUkFHTUVOVEVEX1RFWFQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElzTXV4ZWQoYWRhcHRhdGlvbikge1xuICAgICAgICByZXR1cm4gZ2V0SXNUeXBlT2YoYWRhcHRhdGlvbiwgY29uc3RhbnRzLk1VWEVEKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJc0ltYWdlKGFkYXB0YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGdldElzVHlwZU9mKGFkYXB0YXRpb24sIGNvbnN0YW50cy5JTUFHRSk7XG4gICAgfVxuXG4gICAgLy8gYmFzZWQgdXBvbiBEYXNoTWFuaWZlc3RNb2RlbCwgYnV0IHVzaW5nIERvbVBhcnNlclxuICAgIGZ1bmN0aW9uIGdldElzVHlwZU9mKGFkYXB0YXRpb24sIHR5cGUpIHtcblxuICAgICAgICBpZiAoIWFkYXB0YXRpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWRhcHRhdGlvbiBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3R5cGUgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDEuIGNoZWNrIGNvZGVjcyBmb3IgZnJhZ21lbnRlZCB0ZXh0XG4gICAgICAgIGlmIChpc0ZyYWdtZW50ZWRUZXh0Q29kZWNGb3VuZChhZGFwdGF0aW9uKSkge1xuICAgICAgICAgICAgLy8gZnJhZ21lbnRlZCB0ZXh0IGNvZGVjIGhhcyBiZWVuIGZvdW5kIGZvciBhZGFwdGF0aW9uLCBsZXQncyBjaGVjayBpZiB0ZXN0ZWQgdHlwZSBpcyBmcmFnbWVudGVkIHRleHRcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSBjb25zdGFudHMuRlJBR01FTlRFRF9URVhUO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4gdGVzdCBtaW1lIHR5cGVcbiAgICAgICAgcmV0dXJuIHRlc3RNaW1lVHlwZShhZGFwdGF0aW9uLCB0eXBlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0TWltZVR5cGUoYWRhcHRhdGlvbiwgdHlwZSkge1xuICAgICAgICBsZXQgbWltZVR5cGVSZWdFeCA9ICh0eXBlICE9PSBjb25zdGFudHMuVEVYVCkgPyBuZXcgUmVnRXhwKHR5cGUpIDogbmV3IFJlZ0V4cCgnKHZ0dHx0dG1sKScpO1xuXG4gICAgICAgIGxldCBtaW1lVHlwZSA9IGZpbmRNaW1lVHlwZShhZGFwdGF0aW9uKTtcbiAgICAgICAgaWYgKG1pbWVUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWltZVR5cGVSZWdFeC50ZXN0KG1pbWVUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIG1pbWUgdHlwZSBpbiBhZGFwdGF0aW9uLCBzZWFyY2ggaW4gcmVwcmVzZW50YXRpb25cbiAgICAgICAgbGV0IHJlcHJlc2VudGF0aW9ucyA9IGZpbmRSZXByZXNlbnRhdGlvbnMoYWRhcHRhdGlvbik7XG4gICAgICAgIGlmIChyZXByZXNlbnRhdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwcmVzZW50YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcHJlc2VudGF0aW9uID0gcmVwcmVzZW50YXRpb25zW2ldO1xuICAgICAgICAgICAgICAgIG1pbWVUeXBlID0gZmluZE1pbWVUeXBlKHJlcHJlc2VudGF0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAobWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1pbWVUeXBlUmVnRXgudGVzdChtaW1lVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGZyYWdtZW50ZWQgdGV4dCBjb2RlYyBpbiBhZGFwdGF0aW9uIChTVFBQIG9yIFdWVFQpXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFkYXB0YXRpb25cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0ZyYWdtZW50ZWRUZXh0Q29kZWNGb3VuZCAoYWRhcHRhdGlvbikge1xuICAgICAgICBsZXQgaXNGcmFnbWVudGVkVGV4dENvZGVjRm91bmRJblRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICAgIGxldCBjb2RlY3MgPSB0YWcuZ2V0QXR0cmlidXRlKGRhc2hDb25zdGFudHMuQ09ERUNTKTtcbiAgICAgICAgICAgIGlmIChjb2RlY3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29kZWNzLnNlYXJjaChjb25zdGFudHMuU1RQUCkgPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgY29kZWNzLnNlYXJjaChjb25zdGFudHMuV1ZUVCkgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaXNGcmFnbWVudGVkVGV4dENvZGVjRm91bmRJblRhZyhhZGFwdGF0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpbiByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgbGV0IHJlcHJlc2VudGF0aW9ucyA9IGZpbmRSZXByZXNlbnRhdGlvbnMoYWRhcHRhdGlvbik7XG4gICAgICAgIGlmIChyZXByZXNlbnRhdGlvbnMgJiYgcmVwcmVzZW50YXRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgaWYgKGlzRnJhZ21lbnRlZFRleHRDb2RlY0ZvdW5kSW5UYWcocmVwcmVzZW50YXRpb25zWzBdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1pbWUtdHlwZSBvZiB4bWwgdGFnXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhZ1xuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH0gbWltZVR5cGVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRNaW1lVHlwZSh0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRhZy5nZXRBdHRyaWJ1dGUoZGFzaENvbnN0YW50cy5NSU1FX1RZUEUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVwcmVzZW50YXRpb25zIG9mIGFkYXB0YXRpb24gc2V0XG4gICAgICogQHBhcmFtIHtYTUx9IGFkYXB0YXRpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOm9mZmxpbmVcbiAgICAgKiBAcmV0dXJucyB7WE1MfSByZXByZXNlbnRhdGlvbnNcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRSZXByZXNlbnRhdGlvbnMoYWRhcHRhdGlvbikge1xuICAgICAgICByZXR1cm4gYWRhcHRhdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZShkYXNoQ29uc3RhbnRzLlJFUFJFU0VOVEFUSU9OKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gc2VnbWVudCB0ZW1wbGF0ZSBsaXN0IG9mIGFkYXB0YXRpb25zIHNldFxuICAgICAqIEBwYXJhbSB7WE1MfSBjdXJyZW50QWRhcHRhdGlvblNldFxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEByZXR1cm5zIHtYTUx9IHJlcHJlc2VudGF0aW9uc1xuICAgICAqIEBpbnN0YW5jZVxuICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U2VnbWVudFRlbXBsYXRlKGN1cnJlbnRBZGFwdGF0aW9uU2V0KSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50QWRhcHRhdGlvblNldC5nZXRFbGVtZW50c0J5VGFnTmFtZShkYXNoQ29uc3RhbnRzLlNFR01FTlRfVEVNUExBVEUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBzZWdtZW50IGxpc3QgdGFncyBvZiBhZGFwdGF0aW9ucyBzZXRcbiAgICAgKiBAcGFyYW0ge1hNTH0gdGFnXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpvZmZsaW5lXG4gICAgICogQHJldHVybnMge1hNTH0gcmVwcmVzZW50YXRpb25zXG4gICAgICogQGluc3RhbmNlXG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTZWdtZW50TGlzdCh0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRhZy5nZXRFbGVtZW50c0J5VGFnTmFtZShkYXNoQ29uc3RhbnRzLlNFR01FTlRfTElTVCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlU2VnbWVudEJhc2UodGFnKSB7XG4gICAgICAgIGxldCBlbGVtZW50cyA9IHRhZy5nZXRFbGVtZW50c0J5VGFnTmFtZShkYXNoQ29uc3RhbnRzLlNFR01FTlRfQkFTRSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzZWdtZW50QmFzZSA9IGVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgc2VnbWVudEJhc2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWdtZW50QmFzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1hNTH0gc2VnbWVudFRlbXBsYXRlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcFxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICovXG4gICAgZnVuY3Rpb24gYWRkU2VnbWVudFRpbWVsaW5lRWxlbWVudHMoc2VnbWVudFRlbXBsYXRlLCByZXApIHtcbiAgICAgICAgbGV0IFMgPSBET00uY3JlYXRlRWxlbWVudCgnUycpO1xuICAgICAgICBpZiAocmVwICYmIHJlcC5zZWdtZW50cykge1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRUaW1lbGluZUVsZW1lbnQgPSBET00uY3JlYXRlRWxlbWVudChkYXNoQ29uc3RhbnRzLlNFR01FTlRfVElNRUxJTkUpO1xuICAgICAgICAgICAgbGV0IGNoYW5nZWREdXJhdGlvbiA9IGdldER1cmF0aW9uQ2hhbmdlQXJyYXkocmVwKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlZER1cmF0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcGVhdFZhbHVlID0gaSArIDEgPCBjaGFuZ2VkRHVyYXRpb24ubGVuZ3RoID8gKGNoYW5nZWREdXJhdGlvbltpICsgMV0gLSBjaGFuZ2VkRHVyYXRpb25baV0pIC0gMSA6IDA7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGVhdFZhbHVlID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBTLnNldEF0dHJpYnV0ZSgncicsIHJlcGVhdFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgUy5zZXRBdHRyaWJ1dGUoJ2QnLCByZXAuc2VnbWVudHNbY2hhbmdlZER1cmF0aW9uW2ldXS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgc2VnbWVudFRpbWVsaW5lRWxlbWVudC5hcHBlbmRDaGlsZChTKTtcbiAgICAgICAgICAgICAgICBTID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ1MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlZ21lbnRUZW1wbGF0ZS5hcHBlbmRDaGlsZChzZWdtZW50VGltZWxpbmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldER1cmF0aW9uQ2hhbmdlQXJyYXkocmVwKSB7XG4gICAgICAgIGxldCBhcnJheSA9IFtdO1xuICAgICAgICBhcnJheS5wdXNoKDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJlcC5zZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlcC5zZWdtZW50c1tpIC0gMV0uZHVyYXRpb24gIT09IHJlcC5zZWdtZW50c1tpXS5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhdHRyaWJ1dGVzIG9mIHNlZ21lbnQgdGVtcGxhdGVzIHRvIG1hdGNoIG9mZmxpbmUgdXJsc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHNlZ21lbnRzVGVtcGxhdGVzXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpvZmZsaW5lXG4gICAgICogQGluc3RhbmNlXG4gICAgKi9cbiAgICBmdW5jdGlvbiBlZGl0U2VnbWVudFRlbXBsYXRlQXR0cmlidXRlcyhzZWdtZW50c1RlbXBsYXRlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzVGVtcGxhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbWVkaWEgPSBzZWdtZW50c1RlbXBsYXRlc1tpXS5nZXRBdHRyaWJ1dGUoZGFzaENvbnN0YW50cy5NRURJQSk7XG4gICAgICAgICAgICBtZWRpYSA9ICckUmVwcmVzZW50YXRpb25JRCRfJE51bWJlciQnICsgbWVkaWEuc3Vic3RyaW5nKG1lZGlhLmluZGV4T2YoJy4nKSwgbWVkaWEubGVuZ3RoKTsgLy9pZCArIGV4dGVuc2lvblxuICAgICAgICAgICAgc2VnbWVudHNUZW1wbGF0ZXNbaV0uc2V0QXR0cmlidXRlKGRhc2hDb25zdGFudHMuU1RBUlRfTlVNQkVSLCAnMCcpO1xuICAgICAgICAgICAgc2VnbWVudHNUZW1wbGF0ZXNbaV0uc2V0QXR0cmlidXRlKGRhc2hDb25zdGFudHMuTUVESUEsIG1lZGlhKTtcbiAgICAgICAgICAgIHNlZ21lbnRzVGVtcGxhdGVzW2ldLnNldEF0dHJpYnV0ZShkYXNoQ29uc3RhbnRzLklOSVRJQUxJWkFUSU9OX01JTlVTLCckUmVwcmVzZW50YXRpb25JRCRfaW5pdCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGF0dHJpYnV0ZXMgb2Ygc2VnbWVudCBsaXN0IHRvIG1hdGNoIG9mZmxpbmUgdXJsc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHNlZ21lbnRMaXN0c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXByZXNlbnRhdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICovXG4gICAgZnVuY3Rpb24gZWRpdFNlZ21lbnRMaXN0QXR0cmlidXRlcyhzZWdtZW50TGlzdHMsIHJlcHJlc2VudGF0aW9uKSB7XG4gICAgICAgIGxldCByZXBJZCA9IHJlcHJlc2VudGF0aW9uLmdldEF0dHJpYnV0ZShkYXNoQ29uc3RhbnRzLklEKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdtZW50TGlzdHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgbGV0IHNlZ21lbnRMaXN0ID0gc2VnbWVudExpc3RzW2ldO1xuICAgICAgICAgICAgbGV0IGluaXRpYWxpc2F0aW9uID0gc2VnbWVudExpc3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZGFzaENvbnN0YW50cy5JTklUSUFMSVpBVElPTik7XG4gICAgICAgICAgICBpZiAoaW5pdGlhbGlzYXRpb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlVVJMID0gaW5pdGlhbGlzYXRpb25bMF0uZ2V0QXR0cmlidXRlKGRhc2hDb25zdGFudHMuU09VUkNFX1VSTCk7XG4gICAgICAgICAgICAgICAgc291cmNlVVJMID0gYCR7cmVwSWR9X2luaXRgO1xuICAgICAgICAgICAgICAgIGluaXRpYWxpc2F0aW9uWzBdLnNldEF0dHJpYnV0ZShkYXNoQ29uc3RhbnRzLlNPVVJDRV9VUkwsIHNvdXJjZVVSTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgc2VnbWVudFVSTHMgPSBzZWdtZW50TGlzdC5nZXRFbGVtZW50c0J5VGFnTmFtZShkYXNoQ29uc3RhbnRzLlNFR01FTlRfVVJMKTtcblxuICAgICAgICAgICAgaWYgKHNlZ21lbnRVUkxzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWdtZW50VVJMcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VnbWVudFVybCA9IHNlZ21lbnRVUkxzW2pdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVkaWEgPSBzZWdtZW50VXJsLmdldEF0dHJpYnV0ZShkYXNoQ29uc3RhbnRzLk1FRElBKTtcbiAgICAgICAgICAgICAgICAgICAgbWVkaWEgPSBgJHtyZXBJZH1fJHtqfWA7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnRVcmwuc2V0QXR0cmlidXRlKGRhc2hDb25zdGFudHMuTUVESUEsIG1lZGlhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1hNTH0gYWRhcHRhdGlvblNldFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXBcbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOm9mZmxpbmVcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFNlZ21lbnRUZW1wbGF0ZUF0dHJpYnV0ZXMoYWRhcHRhdGlvblNldCwgcmVwKSB7XG4gICAgICAgIGxldCBzZWdtZW50VGVtcGxhdGVFbGVtZW50ID0gRE9NLmNyZWF0ZUVsZW1lbnQoZGFzaENvbnN0YW50cy5TRUdNRU5UX1RFTVBMQVRFKTtcbiAgICAgICAgc2VnbWVudFRlbXBsYXRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoZGFzaENvbnN0YW50cy5TVEFSVF9OVU1CRVIsICcwJyk7XG4gICAgICAgIHNlZ21lbnRUZW1wbGF0ZUVsZW1lbnQuc2V0QXR0cmlidXRlKGRhc2hDb25zdGFudHMuTUVESUEsICckUmVwcmVzZW50YXRpb25JRCQtJFRpbWUkJyk7XG4gICAgICAgIHNlZ21lbnRUZW1wbGF0ZUVsZW1lbnQuc2V0QXR0cmlidXRlKGRhc2hDb25zdGFudHMuSU5JVElBTElaQVRJT05fTUlOVVMsJyRSZXByZXNlbnRhdGlvbklEJF9pbml0Jyk7XG4gICAgICAgIGFkZFNlZ21lbnRUaW1lbGluZUVsZW1lbnRzKHNlZ21lbnRUZW1wbGF0ZUVsZW1lbnQsIHJlcCk7XG4gICAgICAgIGFkYXB0YXRpb25TZXQuYXBwZW5kQ2hpbGQoc2VnbWVudFRlbXBsYXRlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGFsbCByZXByZXNlbnRhdGlvbnMgZXhjZXB0IHRoZSBvbmUgY2hvb3NlZCBieSB1c2VyXG4gICAgICogQHBhcmFtIHtYTUx9IGN1cnJlbnRBZGFwdGF0aW9uU2V0XG4gICAgICogQHBhcmFtIHtYTUx9IHJlcHJlc2VudGF0aW9uc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZGFwdGF0aW9uVHlwZVxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEBpbnN0YW5jZVxuICAgICovXG4gICAgZnVuY3Rpb24gZmluZEFuZEtlZXBPbmx5U2VsZWN0ZWRSZXByZXNlbnRhdGlvbnMoY3VycmVudEFkYXB0YXRpb25TZXQsIHJlcHJlc2VudGF0aW9ucywgYWRhcHRhdGlvblR5cGUpIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSByZXByZXNlbnRhdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCByZXByZXNlbnRhdGlvbiA9IHJlcHJlc2VudGF0aW9uc1tpXTtcbiAgICAgICAgICAgIGxldCByZXBJZCA9IHJlcHJlc2VudGF0aW9uLmdldEF0dHJpYnV0ZShkYXNoQ29uc3RhbnRzLklEKTtcbiAgICAgICAgICAgIGlmIChhbGxNZWRpYUluZm9zW2FkYXB0YXRpb25UeXBlXSAmJiBhbGxNZWRpYUluZm9zW2FkYXB0YXRpb25UeXBlXS5pbmRleE9mKHJlcElkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRhdGlvbiBpcyBub3Qgc2VsZWN0ZWQsIHJlbW92ZSBpdFxuICAgICAgICAgICAgICAgIGN1cnJlbnRBZGFwdGF0aW9uU2V0LnJlbW92ZUNoaWxkKHJlcHJlc2VudGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vICBVVElMU1xuICAgIC8qKlxuICAgICAqIEdldCBpZCBvZiBmaXJzdCByZXByZXNlbnRhdGlvbiBvZiBhZGFwdGF0aW9uIHNldFxuICAgICAqIEBwYXJhbSB7WE1sfSBjdXJyZW50QWRhcHRhdGlvblNldFxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6b2ZmbGluZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGlkXG4gICAgICogQGluc3RhbmNlXG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXRCZXN0UmVwcmVzZW50YXRpb25JZChjdXJyZW50QWRhcHRhdGlvblNldCkge1xuICAgICAgICBsZXQgYmVzdFJlcHJlc2VudGF0aW9uID0gY3VycmVudEFkYXB0YXRpb25TZXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZGFzaENvbnN0YW50cy5SRVBSRVNFTlRBVElPTilbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKGJlc3RSZXByZXNlbnRhdGlvbi5nZXRBdHRyaWJ1dGUoZGFzaENvbnN0YW50cy5JRCkpO1xuICAgICAgICByZXR1cm4gYmVzdFJlcHJlc2VudGF0aW9uLmdldEF0dHJpYnV0ZShkYXNoQ29uc3RhbnRzLklEKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhbmQgcmV0dXJucyBmcmFnbWVudHMgb2Ygb2ZmbGluZSB1cmwgPT4geHh4eDovL3h4eHgvZnJhZ21lbnRJZC9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpvZmZsaW5lXG4gICAgICogQHJldHVybnMge3N0cmluZ30gZnJhZ21lbnRJZFxuICAgICAqIEBpbnN0YW5jZVxuICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RnJhZ21lbnRJZCh1cmwpIHtcbiAgICAgICAgbGV0IGlkeEZyYWdJZCA9IHVybC5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICAvL2xvZ2dlci53YXJuKCdmcmFnSWQgOiAnICsgdXJsLnN1YnN0cmluZyhpZHhGcmFnSWQgKyAxLCB1cmwubGVuZ3RoKSk7XG4gICAgICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKGlkeEZyYWdJZCx1cmwubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBzZXR1cCgpO1xuXG4gICAgaW5zdGFuY2UgPSB7XG4gICAgICAgIHBhcnNlOiBwYXJzZVxuICAgIH07XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5PZmZsaW5lSW5kZXhEQk1hbmlmZXN0UGFyc2VyLl9fZGFzaGpzX2ZhY3RvcnlfbmFtZSA9ICdPZmZsaW5lSW5kZXhEQk1hbmlmZXN0UGFyc2VyJztcbmV4cG9ydCBkZWZhdWx0IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE9mZmxpbmVJbmRleERCTWFuaWZlc3RQYXJzZXIpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cbmltcG9ydCBPZmZsaW5lQ29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cy9PZmZsaW5lQ29uc3RhbnRzJztcblxuLyoqXG4gKiBAbW9kdWxlIE9mZmxpbmVVcmxVdGlsc1xuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIHV0aWxpdHkgZnVuY3Rpb25zIGZvciBvcGVyYXRpbmcgb24gb2ZmbGluZSBVUkxzLlxuICogSW5pdGlhbGx5IHRoaXMgaXMgc2ltcGx5IGEgbWV0aG9kIHRvIGRldGVybWluZSB0aGUgQmFzZSBVUkwgb2YgYSBVUkwsIGJ1dFxuICogc2hvdWxkIHByb2JhYmx5IGluY2x1ZGUgb3RoZXIgdGhpbmdzIHByb3ZpZGVkIGFsbCBvdmVyIHRoZSBwbGFjZSBzdWNoIGFzXG4gKiBkZXRlcm1pbmluZyB3aGV0aGVyIGEgVVJMIGlzIHJlbGF0aXZlL2Fic29sdXRlLCByZXNvbHZpbmcgdHdvIHBhdGhzIGV0Yy5cbiAqL1xuZnVuY3Rpb24gT2ZmbGluZVVybFV0aWxzKCkge1xuXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UmVnZXgoKSB7XG4gICAgICAgIHJldHVybiBPZmZsaW5lQ29uc3RhbnRzLk9GRkxJTkVfVVJMX1JFR0VYO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIFNQRUNJRklDIEJFSEFWSU9VUlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZW1vdmVIb3N0bmFtZSh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKC8oXlxcdys6fF4pXFwvXFwvLywgJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzUmVsYXRpdmUoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlKHVybCwgYmFzZVVybCkge1xuICAgICAgICBpZiAoYmFzZVVybC5jaGFyQXQoYmFzZVVybC5sZW5ndGggLSAxICkgIT09ICcvJykge1xuICAgICAgICAgICAgYmFzZVVybCA9IGJhc2VVcmwuY29uY2F0KCcvJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhc2VVcmwgKyB1cmw7XG4gICAgfVxuXG4gICAgc2V0dXAoKTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICAgICAgZ2V0UmVnZXg6ICAgICAgICAgICBnZXRSZWdleCxcbiAgICAgICAgaXNSZWxhdGl2ZTogICAgICAgICBpc1JlbGF0aXZlLFxuICAgICAgICByZW1vdmVIb3N0bmFtZTogICAgIHJlbW92ZUhvc3RuYW1lLFxuICAgICAgICByZXNvbHZlOiAgICAgICAgICAgIHJlc29sdmVcbiAgICB9O1xuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cblxuT2ZmbGluZVVybFV0aWxzLl9fZGFzaGpzX2ZhY3RvcnlfbmFtZSA9ICdPZmZsaW5lVXJsVXRpbHMnO1xuZXhwb3J0IGRlZmF1bHQgZGFzaGpzLkZhY3RvcnlNYWtlci5nZXRTaW5nbGV0b25GYWN0b3J5KE9mZmxpbmVVcmxVdGlscyk7IC8qIGpzaGludCBpZ25vcmU6bGluZSAqL1xuIiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAaWdub3JlXG4gKi9cbmNsYXNzIE9mZmxpbmVEb3dubG9hZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICB0aGlzLnVybCA9IG51bGw7XG4gICAgICAgIHRoaXMub3JpZ2luYWxVcmwgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2ZmbGluZURvd25sb2FkO1xuIl19
