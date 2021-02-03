(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
module.exports = {
  XmlEntities: _dereq_(4),
  Html4Entities: _dereq_(2),
  Html5Entities: _dereq_(3),
  AllHtmlEntities: _dereq_(3)
};

},{"2":2,"3":3,"4":4}],2:[function(_dereq_,module,exports){
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

var _constantsOfflineConstants = _dereq_(10);

var _constantsOfflineConstants2 = _interopRequireDefault(_constantsOfflineConstants);

var _OfflineStream = _dereq_(8);

var _OfflineStream2 = _interopRequireDefault(_OfflineStream);

var _utilsOfflineIndexDBManifestParser = _dereq_(18);

var _utilsOfflineIndexDBManifestParser2 = _interopRequireDefault(_utilsOfflineIndexDBManifestParser);

var _errorsOfflineErrors = _dereq_(13);

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

},{"10":10,"13":13,"18":18,"8":8}],8:[function(_dereq_,module,exports){
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

var _OfflineStreamProcessor = _dereq_(9);

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

},{"9":9}],9:[function(_dereq_,module,exports){
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

var _eventsOfflineEvents = _dereq_(14);

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

},{"14":14}],10:[function(_dereq_,module,exports){
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

var _constantsOfflineConstants = _dereq_(10);

var _constantsOfflineConstants2 = _interopRequireDefault(_constantsOfflineConstants);

var _OfflineStoreController = _dereq_(12);

var _OfflineStoreController2 = _interopRequireDefault(_OfflineStoreController);

var _OfflineDownload = _dereq_(7);

var _OfflineDownload2 = _interopRequireDefault(_OfflineDownload);

var _netIndexDBOfflineLoader = _dereq_(16);

var _netIndexDBOfflineLoader2 = _interopRequireDefault(_netIndexDBOfflineLoader);

var _utilsOfflineUrlUtils = _dereq_(19);

var _utilsOfflineUrlUtils2 = _interopRequireDefault(_utilsOfflineUrlUtils);

var _eventsOfflineEvents = _dereq_(14);

var _eventsOfflineEvents2 = _interopRequireDefault(_eventsOfflineEvents);

var _errorsOfflineErrors = _dereq_(13);

var _errorsOfflineErrors2 = _interopRequireDefault(_errorsOfflineErrors);

var _voOfflineDownloadVo = _dereq_(20);

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

},{"10":10,"12":12,"13":13,"14":14,"16":16,"19":19,"20":20,"7":7}],12:[function(_dereq_,module,exports){
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

var _storageIndexDBStore = _dereq_(17);

var _storageIndexDBStore2 = _interopRequireDefault(_storageIndexDBStore);

var _errorsOfflineErrors = _dereq_(13);

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

},{"13":13,"17":17}],13:[function(_dereq_,module,exports){
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

var _coreEventsEventsBase = _dereq_(6);

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

},{"6":6}],15:[function(_dereq_,module,exports){
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

var _controllersOfflineController = _dereq_(11);

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

},{"11":11}],16:[function(_dereq_,module,exports){
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

var _storageIndexDBStore = _dereq_(17);

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

},{"17":17}],17:[function(_dereq_,module,exports){
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
var localforage = _dereq_(5);
var entities = _dereq_(1).XmlEntities;

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

},{"1":1,"5":5}],18:[function(_dereq_,module,exports){
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
var Entities = _dereq_(1).XmlEntities;
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

},{"1":1}],19:[function(_dereq_,module,exports){
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

var _constantsOfflineConstants = _dereq_(10);

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

},{"10":10}],20:[function(_dereq_,module,exports){
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
//# sourceMappingURL=dash.offline.debug.js.map
