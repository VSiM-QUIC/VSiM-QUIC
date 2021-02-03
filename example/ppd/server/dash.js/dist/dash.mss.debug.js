(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

var bigInt = (function (undefined) {
  "use strict";var BASE = 1e7,
      LOG_BASE = 7,
      MAX_INT = 9007199254740992,
      MAX_INT_ARR = smallToArray(MAX_INT),
      DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";var supportsNativeBigInt = typeof BigInt === "function";function Integer(v, radix, alphabet, caseSensitive) {
    if (typeof v === "undefined") return Integer[0];if (typeof radix !== "undefined") return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);return parseValue(v);
  }function BigInteger(value, sign) {
    this.value = value;this.sign = sign;this.isSmall = false;
  }BigInteger.prototype = Object.create(Integer.prototype);function SmallInteger(value) {
    this.value = value;this.sign = value < 0;this.isSmall = true;
  }SmallInteger.prototype = Object.create(Integer.prototype);function NativeBigInt(value) {
    this.value = value;
  }NativeBigInt.prototype = Object.create(Integer.prototype);function isPrecise(n) {
    return -MAX_INT < n && n < MAX_INT;
  }function smallToArray(n) {
    if (n < 1e7) return [n];if (n < 1e14) return [n % 1e7, Math.floor(n / 1e7)];return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
  }function arrayToSmall(arr) {
    trim(arr);var length = arr.length;if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
      switch (length) {case 0:
          return 0;case 1:
          return arr[0];case 2:
          return arr[0] + arr[1] * BASE;default:
          return arr[0] + (arr[1] + arr[2] * BASE) * BASE;}
    }return arr;
  }function trim(v) {
    var i = v.length;while (v[--i] === 0);v.length = i + 1;
  }function createArray(length) {
    var x = new Array(length);var i = -1;while (++i < length) {
      x[i] = 0;
    }return x;
  }function truncate(n) {
    if (n > 0) return Math.floor(n);return Math.ceil(n);
  }function add(a, b) {
    var l_a = a.length,
        l_b = b.length,
        r = new Array(l_a),
        carry = 0,
        base = BASE,
        sum,
        i;for (i = 0; i < l_b; i++) {
      sum = a[i] + b[i] + carry;carry = sum >= base ? 1 : 0;r[i] = sum - carry * base;
    }while (i < l_a) {
      sum = a[i] + carry;carry = sum === base ? 1 : 0;r[i++] = sum - carry * base;
    }if (carry > 0) r.push(carry);return r;
  }function addAny(a, b) {
    if (a.length >= b.length) return add(a, b);return add(b, a);
  }function addSmall(a, carry) {
    var l = a.length,
        r = new Array(l),
        base = BASE,
        sum,
        i;for (i = 0; i < l; i++) {
      sum = a[i] - base + carry;carry = Math.floor(sum / base);r[i] = sum - carry * base;carry += 1;
    }while (carry > 0) {
      r[i++] = carry % base;carry = Math.floor(carry / base);
    }return r;
  }BigInteger.prototype.add = function (v) {
    var n = parseValue(v);if (this.sign !== n.sign) {
      return this.subtract(n.negate());
    }var a = this.value,
        b = n.value;if (n.isSmall) {
      return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
    }return new BigInteger(addAny(a, b), this.sign);
  };BigInteger.prototype.plus = BigInteger.prototype.add;SmallInteger.prototype.add = function (v) {
    var n = parseValue(v);var a = this.value;if (a < 0 !== n.sign) {
      return this.subtract(n.negate());
    }var b = n.value;if (n.isSmall) {
      if (isPrecise(a + b)) return new SmallInteger(a + b);b = smallToArray(Math.abs(b));
    }return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
  };SmallInteger.prototype.plus = SmallInteger.prototype.add;NativeBigInt.prototype.add = function (v) {
    return new NativeBigInt(this.value + parseValue(v).value);
  };NativeBigInt.prototype.plus = NativeBigInt.prototype.add;function subtract(a, b) {
    var a_l = a.length,
        b_l = b.length,
        r = new Array(a_l),
        borrow = 0,
        base = BASE,
        i,
        difference;for (i = 0; i < b_l; i++) {
      difference = a[i] - borrow - b[i];if (difference < 0) {
        difference += base;borrow = 1;
      } else borrow = 0;r[i] = difference;
    }for (i = b_l; i < a_l; i++) {
      difference = a[i] - borrow;if (difference < 0) difference += base;else {
        r[i++] = difference;break;
      }r[i] = difference;
    }for (; i < a_l; i++) {
      r[i] = a[i];
    }trim(r);return r;
  }function subtractAny(a, b, sign) {
    var value;if (compareAbs(a, b) >= 0) {
      value = subtract(a, b);
    } else {
      value = subtract(b, a);sign = !sign;
    }value = arrayToSmall(value);if (typeof value === "number") {
      if (sign) value = -value;return new SmallInteger(value);
    }return new BigInteger(value, sign);
  }function subtractSmall(a, b, sign) {
    var l = a.length,
        r = new Array(l),
        carry = -b,
        base = BASE,
        i,
        difference;for (i = 0; i < l; i++) {
      difference = a[i] + carry;carry = Math.floor(difference / base);difference %= base;r[i] = difference < 0 ? difference + base : difference;
    }r = arrayToSmall(r);if (typeof r === "number") {
      if (sign) r = -r;return new SmallInteger(r);
    }return new BigInteger(r, sign);
  }BigInteger.prototype.subtract = function (v) {
    var n = parseValue(v);if (this.sign !== n.sign) {
      return this.add(n.negate());
    }var a = this.value,
        b = n.value;if (n.isSmall) return subtractSmall(a, Math.abs(b), this.sign);return subtractAny(a, b, this.sign);
  };BigInteger.prototype.minus = BigInteger.prototype.subtract;SmallInteger.prototype.subtract = function (v) {
    var n = parseValue(v);var a = this.value;if (a < 0 !== n.sign) {
      return this.add(n.negate());
    }var b = n.value;if (n.isSmall) {
      return new SmallInteger(a - b);
    }return subtractSmall(b, Math.abs(a), a >= 0);
  };SmallInteger.prototype.minus = SmallInteger.prototype.subtract;NativeBigInt.prototype.subtract = function (v) {
    return new NativeBigInt(this.value - parseValue(v).value);
  };NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;BigInteger.prototype.negate = function () {
    return new BigInteger(this.value, !this.sign);
  };SmallInteger.prototype.negate = function () {
    var sign = this.sign;var small = new SmallInteger(-this.value);small.sign = !sign;return small;
  };NativeBigInt.prototype.negate = function () {
    return new NativeBigInt(-this.value);
  };BigInteger.prototype.abs = function () {
    return new BigInteger(this.value, false);
  };SmallInteger.prototype.abs = function () {
    return new SmallInteger(Math.abs(this.value));
  };NativeBigInt.prototype.abs = function () {
    return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
  };function multiplyLong(a, b) {
    var a_l = a.length,
        b_l = b.length,
        l = a_l + b_l,
        r = createArray(l),
        base = BASE,
        product,
        carry,
        i,
        a_i,
        b_j;for (i = 0; i < a_l; ++i) {
      a_i = a[i];for (var j = 0; j < b_l; ++j) {
        b_j = b[j];product = a_i * b_j + r[i + j];carry = Math.floor(product / base);r[i + j] = product - carry * base;r[i + j + 1] += carry;
      }
    }trim(r);return r;
  }function multiplySmall(a, b) {
    var l = a.length,
        r = new Array(l),
        base = BASE,
        carry = 0,
        product,
        i;for (i = 0; i < l; i++) {
      product = a[i] * b + carry;carry = Math.floor(product / base);r[i] = product - carry * base;
    }while (carry > 0) {
      r[i++] = carry % base;carry = Math.floor(carry / base);
    }return r;
  }function shiftLeft(x, n) {
    var r = [];while (n-- > 0) r.push(0);return r.concat(x);
  }function multiplyKaratsuba(x, y) {
    var n = Math.max(x.length, y.length);if (n <= 30) return multiplyLong(x, y);n = Math.ceil(n / 2);var b = x.slice(n),
        a = x.slice(0, n),
        d = y.slice(n),
        c = y.slice(0, n);var ac = multiplyKaratsuba(a, c),
        bd = multiplyKaratsuba(b, d),
        abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));trim(product);return product;
  }function useKaratsuba(l1, l2) {
    return -.012 * l1 - .012 * l2 + 15e-6 * l1 * l2 > 0;
  }BigInteger.prototype.multiply = function (v) {
    var n = parseValue(v),
        a = this.value,
        b = n.value,
        sign = this.sign !== n.sign,
        abs;if (n.isSmall) {
      if (b === 0) return Integer[0];if (b === 1) return this;if (b === -1) return this.negate();abs = Math.abs(b);if (abs < BASE) {
        return new BigInteger(multiplySmall(a, abs), sign);
      }b = smallToArray(abs);
    }if (useKaratsuba(a.length, b.length)) return new BigInteger(multiplyKaratsuba(a, b), sign);return new BigInteger(multiplyLong(a, b), sign);
  };BigInteger.prototype.times = BigInteger.prototype.multiply;function multiplySmallAndArray(a, b, sign) {
    if (a < BASE) {
      return new BigInteger(multiplySmall(b, a), sign);
    }return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
  }SmallInteger.prototype._multiplyBySmall = function (a) {
    if (isPrecise(a.value * this.value)) {
      return new SmallInteger(a.value * this.value);
    }return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
  };BigInteger.prototype._multiplyBySmall = function (a) {
    if (a.value === 0) return Integer[0];if (a.value === 1) return this;if (a.value === -1) return this.negate();return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
  };SmallInteger.prototype.multiply = function (v) {
    return parseValue(v)._multiplyBySmall(this);
  };SmallInteger.prototype.times = SmallInteger.prototype.multiply;NativeBigInt.prototype.multiply = function (v) {
    return new NativeBigInt(this.value * parseValue(v).value);
  };NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;function square(a) {
    var l = a.length,
        r = createArray(l + l),
        base = BASE,
        product,
        carry,
        i,
        a_i,
        a_j;for (i = 0; i < l; i++) {
      a_i = a[i];carry = 0 - a_i * a_i;for (var j = i; j < l; j++) {
        a_j = a[j];product = 2 * (a_i * a_j) + r[i + j] + carry;carry = Math.floor(product / base);r[i + j] = product - carry * base;
      }r[i + l] = carry;
    }trim(r);return r;
  }BigInteger.prototype.square = function () {
    return new BigInteger(square(this.value), false);
  };SmallInteger.prototype.square = function () {
    var value = this.value * this.value;if (isPrecise(value)) return new SmallInteger(value);return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
  };NativeBigInt.prototype.square = function (v) {
    return new NativeBigInt(this.value * this.value);
  };function divMod1(a, b) {
    var a_l = a.length,
        b_l = b.length,
        base = BASE,
        result = createArray(b.length),
        divisorMostSignificantDigit = b[b_l - 1],
        lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)),
        remainder = multiplySmall(a, lambda),
        divisor = multiplySmall(b, lambda),
        quotientDigit,
        shift,
        carry,
        borrow,
        i,
        l,
        q;if (remainder.length <= a_l) remainder.push(0);divisor.push(0);divisorMostSignificantDigit = divisor[b_l - 1];for (shift = a_l - b_l; shift >= 0; shift--) {
      quotientDigit = base - 1;if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
        quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
      }carry = 0;borrow = 0;l = divisor.length;for (i = 0; i < l; i++) {
        carry += quotientDigit * divisor[i];q = Math.floor(carry / base);borrow += remainder[shift + i] - (carry - q * base);carry = q;if (borrow < 0) {
          remainder[shift + i] = borrow + base;borrow = -1;
        } else {
          remainder[shift + i] = borrow;borrow = 0;
        }
      }while (borrow !== 0) {
        quotientDigit -= 1;carry = 0;for (i = 0; i < l; i++) {
          carry += remainder[shift + i] - base + divisor[i];if (carry < 0) {
            remainder[shift + i] = carry + base;carry = 0;
          } else {
            remainder[shift + i] = carry;carry = 1;
          }
        }borrow += carry;
      }result[shift] = quotientDigit;
    }remainder = divModSmall(remainder, lambda)[0];return [arrayToSmall(result), arrayToSmall(remainder)];
  }function divMod2(a, b) {
    var a_l = a.length,
        b_l = b.length,
        result = [],
        part = [],
        base = BASE,
        guess,
        xlen,
        highx,
        highy,
        check;while (a_l) {
      part.unshift(a[--a_l]);trim(part);if (compareAbs(part, b) < 0) {
        result.push(0);continue;
      }xlen = part.length;highx = part[xlen - 1] * base + part[xlen - 2];highy = b[b_l - 1] * base + b[b_l - 2];if (xlen > b_l) {
        highx = (highx + 1) * base;
      }guess = Math.ceil(highx / highy);do {
        check = multiplySmall(b, guess);if (compareAbs(check, part) <= 0) break;guess--;
      } while (guess);result.push(guess);part = subtract(part, check);
    }result.reverse();return [arrayToSmall(result), arrayToSmall(part)];
  }function divModSmall(value, lambda) {
    var length = value.length,
        quotient = createArray(length),
        base = BASE,
        i,
        q,
        remainder,
        divisor;remainder = 0;for (i = length - 1; i >= 0; --i) {
      divisor = remainder * base + value[i];q = truncate(divisor / lambda);remainder = divisor - q * lambda;quotient[i] = q | 0;
    }return [quotient, remainder | 0];
  }function divModAny(self, v) {
    var value,
        n = parseValue(v);if (supportsNativeBigInt) {
      return [new NativeBigInt(self.value / n.value), new NativeBigInt(self.value % n.value)];
    }var a = self.value,
        b = n.value;var quotient;if (b === 0) throw new Error("Cannot divide by zero");if (self.isSmall) {
      if (n.isSmall) {
        return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
      }return [Integer[0], self];
    }if (n.isSmall) {
      if (b === 1) return [self, Integer[0]];if (b == -1) return [self.negate(), Integer[0]];var abs = Math.abs(b);if (abs < BASE) {
        value = divModSmall(a, abs);quotient = arrayToSmall(value[0]);var remainder = value[1];if (self.sign) remainder = -remainder;if (typeof quotient === "number") {
          if (self.sign !== n.sign) quotient = -quotient;return [new SmallInteger(quotient), new SmallInteger(remainder)];
        }return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
      }b = smallToArray(abs);
    }var comparison = compareAbs(a, b);if (comparison === -1) return [Integer[0], self];if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];if (a.length + b.length <= 200) value = divMod1(a, b);else value = divMod2(a, b);quotient = value[0];var qSign = self.sign !== n.sign,
        mod = value[1],
        mSign = self.sign;if (typeof quotient === "number") {
      if (qSign) quotient = -quotient;quotient = new SmallInteger(quotient);
    } else quotient = new BigInteger(quotient, qSign);if (typeof mod === "number") {
      if (mSign) mod = -mod;mod = new SmallInteger(mod);
    } else mod = new BigInteger(mod, mSign);return [quotient, mod];
  }BigInteger.prototype.divmod = function (v) {
    var result = divModAny(this, v);return { quotient: result[0], remainder: result[1] };
  };NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger.prototype.divmod;BigInteger.prototype.divide = function (v) {
    return divModAny(this, v)[0];
  };NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function (v) {
    return new NativeBigInt(this.value / parseValue(v).value);
  };SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;BigInteger.prototype.mod = function (v) {
    return divModAny(this, v)[1];
  };NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function (v) {
    return new NativeBigInt(this.value % parseValue(v).value);
  };SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;BigInteger.prototype.pow = function (v) {
    var n = parseValue(v),
        a = this.value,
        b = n.value,
        value,
        x,
        y;if (b === 0) return Integer[1];if (a === 0) return Integer[0];if (a === 1) return Integer[1];if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];if (n.sign) {
      return Integer[0];
    }if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");if (this.isSmall) {
      if (isPrecise(value = Math.pow(a, b))) return new SmallInteger(truncate(value));
    }x = this;y = Integer[1];while (true) {
      if (b & 1 === 1) {
        y = y.times(x);--b;
      }if (b === 0) break;b /= 2;x = x.square();
    }return y;
  };SmallInteger.prototype.pow = BigInteger.prototype.pow;NativeBigInt.prototype.pow = function (v) {
    var n = parseValue(v);var a = this.value,
        b = n.value;var _0 = BigInt(0),
        _1 = BigInt(1),
        _2 = BigInt(2);if (b === _0) return Integer[1];if (a === _0) return Integer[0];if (a === _1) return Integer[1];if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];if (n.isNegative()) return new NativeBigInt(_0);var x = this;var y = Integer[1];while (true) {
      if ((b & _1) === _1) {
        y = y.times(x);--b;
      }if (b === _0) break;b /= _2;x = x.square();
    }return y;
  };BigInteger.prototype.modPow = function (exp, mod) {
    exp = parseValue(exp);mod = parseValue(mod);if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");var r = Integer[1],
        base = this.mod(mod);while (exp.isPositive()) {
      if (base.isZero()) return Integer[0];if (exp.isOdd()) r = r.multiply(base).mod(mod);exp = exp.divide(2);base = base.square().mod(mod);
    }return r;
  };NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger.prototype.modPow;function compareAbs(a, b) {
    if (a.length !== b.length) {
      return a.length > b.length ? 1 : -1;
    }for (var i = a.length - 1; i >= 0; i--) {
      if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
    }return 0;
  }BigInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
        a = this.value,
        b = n.value;if (n.isSmall) return 1;return compareAbs(a, b);
  };SmallInteger.prototype.compareAbs = function (v) {
    var n = parseValue(v),
        a = Math.abs(this.value),
        b = n.value;if (n.isSmall) {
      b = Math.abs(b);return a === b ? 0 : a > b ? 1 : -1;
    }return -1;
  };NativeBigInt.prototype.compareAbs = function (v) {
    var a = this.value;var b = parseValue(v).value;a = a >= 0 ? a : -a;b = b >= 0 ? b : -b;return a === b ? 0 : a > b ? 1 : -1;
  };BigInteger.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }if (v === -Infinity) {
      return 1;
    }var n = parseValue(v),
        a = this.value,
        b = n.value;if (this.sign !== n.sign) {
      return n.sign ? 1 : -1;
    }if (n.isSmall) {
      return this.sign ? -1 : 1;
    }return compareAbs(a, b) * (this.sign ? -1 : 1);
  };BigInteger.prototype.compareTo = BigInteger.prototype.compare;SmallInteger.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }if (v === -Infinity) {
      return 1;
    }var n = parseValue(v),
        a = this.value,
        b = n.value;if (n.isSmall) {
      return a == b ? 0 : a > b ? 1 : -1;
    }if (a < 0 !== n.sign) {
      return a < 0 ? -1 : 1;
    }return a < 0 ? 1 : -1;
  };SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;NativeBigInt.prototype.compare = function (v) {
    if (v === Infinity) {
      return -1;
    }if (v === -Infinity) {
      return 1;
    }var a = this.value;var b = parseValue(v).value;return a === b ? 0 : a > b ? 1 : -1;
  };NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;BigInteger.prototype.equals = function (v) {
    return this.compare(v) === 0;
  };NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;BigInteger.prototype.notEquals = function (v) {
    return this.compare(v) !== 0;
  };NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;BigInteger.prototype.greater = function (v) {
    return this.compare(v) > 0;
  };NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;BigInteger.prototype.lesser = function (v) {
    return this.compare(v) < 0;
  };NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;BigInteger.prototype.greaterOrEquals = function (v) {
    return this.compare(v) >= 0;
  };NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;BigInteger.prototype.lesserOrEquals = function (v) {
    return this.compare(v) <= 0;
  };NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;BigInteger.prototype.isEven = function () {
    return (this.value[0] & 1) === 0;
  };SmallInteger.prototype.isEven = function () {
    return (this.value & 1) === 0;
  };NativeBigInt.prototype.isEven = function () {
    return (this.value & BigInt(1)) === BigInt(0);
  };BigInteger.prototype.isOdd = function () {
    return (this.value[0] & 1) === 1;
  };SmallInteger.prototype.isOdd = function () {
    return (this.value & 1) === 1;
  };NativeBigInt.prototype.isOdd = function () {
    return (this.value & BigInt(1)) === BigInt(1);
  };BigInteger.prototype.isPositive = function () {
    return !this.sign;
  };SmallInteger.prototype.isPositive = function () {
    return this.value > 0;
  };NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;BigInteger.prototype.isNegative = function () {
    return this.sign;
  };SmallInteger.prototype.isNegative = function () {
    return this.value < 0;
  };NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;BigInteger.prototype.isUnit = function () {
    return false;
  };SmallInteger.prototype.isUnit = function () {
    return Math.abs(this.value) === 1;
  };NativeBigInt.prototype.isUnit = function () {
    return this.abs().value === BigInt(1);
  };BigInteger.prototype.isZero = function () {
    return false;
  };SmallInteger.prototype.isZero = function () {
    return this.value === 0;
  };NativeBigInt.prototype.isZero = function () {
    return this.value === BigInt(0);
  };BigInteger.prototype.isDivisibleBy = function (v) {
    var n = parseValue(v);if (n.isZero()) return false;if (n.isUnit()) return true;if (n.compareAbs(2) === 0) return this.isEven();return this.mod(n).isZero();
  };NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;function isBasicPrime(v) {
    var n = v.abs();if (n.isUnit()) return false;if (n.equals(2) || n.equals(3) || n.equals(5)) return true;if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;if (n.lesser(49)) return true;
  }function millerRabinTest(n, a) {
    var nPrev = n.prev(),
        b = nPrev,
        r = 0,
        d,
        t,
        i,
        x;while (b.isEven()) b = b.divide(2), r++;next: for (i = 0; i < a.length; i++) {
      if (n.lesser(a[i])) continue;x = bigInt(a[i]).modPow(b, n);if (x.isUnit() || x.equals(nPrev)) continue;for (d = r - 1; d != 0; d--) {
        x = x.square().mod(n);if (x.isUnit()) return false;if (x.equals(nPrev)) continue next;
      }return false;
    }return true;
  }BigInteger.prototype.isPrime = function (strict) {
    var isPrime = isBasicPrime(this);if (isPrime !== undefined) return isPrime;var n = this.abs();var bits = n.bitLength();if (bits <= 64) return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);var logN = Math.log(2) * bits.toJSNumber();var t = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);for (var a = [], i = 0; i < t; i++) {
      a.push(bigInt(i + 2));
    }return millerRabinTest(n, a);
  };NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;BigInteger.prototype.isProbablePrime = function (iterations) {
    var isPrime = isBasicPrime(this);if (isPrime !== undefined) return isPrime;var n = this.abs();var t = iterations === undefined ? 5 : iterations;for (var a = [], i = 0; i < t; i++) {
      a.push(bigInt.randBetween(2, n.minus(2)));
    }return millerRabinTest(n, a);
  };NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;BigInteger.prototype.modInv = function (n) {
    var t = bigInt.zero,
        newT = bigInt.one,
        r = parseValue(n),
        newR = this.abs(),
        q,
        lastT,
        lastR;while (!newR.isZero()) {
      q = r.divide(newR);lastT = t;lastR = r;t = newT;r = newR;newT = lastT.subtract(q.multiply(newT));newR = lastR.subtract(q.multiply(newR));
    }if (!r.isUnit()) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");if (t.compare(0) === -1) {
      t = t.add(n);
    }if (this.isNegative()) {
      return t.negate();
    }return t;
  };NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger.prototype.modInv;BigInteger.prototype.next = function () {
    var value = this.value;if (this.sign) {
      return subtractSmall(value, 1, this.sign);
    }return new BigInteger(addSmall(value, 1), this.sign);
  };SmallInteger.prototype.next = function () {
    var value = this.value;if (value + 1 < MAX_INT) return new SmallInteger(value + 1);return new BigInteger(MAX_INT_ARR, false);
  };NativeBigInt.prototype.next = function () {
    return new NativeBigInt(this.value + BigInt(1));
  };BigInteger.prototype.prev = function () {
    var value = this.value;if (this.sign) {
      return new BigInteger(addSmall(value, 1), true);
    }return subtractSmall(value, 1, this.sign);
  };SmallInteger.prototype.prev = function () {
    var value = this.value;if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);return new BigInteger(MAX_INT_ARR, true);
  };NativeBigInt.prototype.prev = function () {
    return new NativeBigInt(this.value - BigInt(1));
  };var powersOfTwo = [1];while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);var powers2Length = powersOfTwo.length,
      highestPower2 = powersOfTwo[powers2Length - 1];function shift_isSmall(n) {
    return Math.abs(n) <= BASE;
  }BigInteger.prototype.shiftLeft = function (v) {
    var n = parseValue(v).toJSNumber();if (!shift_isSmall(n)) {
      throw new Error(String(n) + " is too large for shifting.");
    }if (n < 0) return this.shiftRight(-n);var result = this;if (result.isZero()) return result;while (n >= powers2Length) {
      result = result.multiply(highestPower2);n -= powers2Length - 1;
    }return result.multiply(powersOfTwo[n]);
  };NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;BigInteger.prototype.shiftRight = function (v) {
    var remQuo;var n = parseValue(v).toJSNumber();if (!shift_isSmall(n)) {
      throw new Error(String(n) + " is too large for shifting.");
    }if (n < 0) return this.shiftLeft(-n);var result = this;while (n >= powers2Length) {
      if (result.isZero() || result.isNegative() && result.isUnit()) return result;remQuo = divModAny(result, highestPower2);result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];n -= powers2Length - 1;
    }remQuo = divModAny(result, powersOfTwo[n]);return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
  };NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;function bitwise(x, y, fn) {
    y = parseValue(y);var xSign = x.isNegative(),
        ySign = y.isNegative();var xRem = xSign ? x.not() : x,
        yRem = ySign ? y.not() : y;var xDigit = 0,
        yDigit = 0;var xDivMod = null,
        yDivMod = null;var result = [];while (!xRem.isZero() || !yRem.isZero()) {
      xDivMod = divModAny(xRem, highestPower2);xDigit = xDivMod[1].toJSNumber();if (xSign) {
        xDigit = highestPower2 - 1 - xDigit;
      }yDivMod = divModAny(yRem, highestPower2);yDigit = yDivMod[1].toJSNumber();if (ySign) {
        yDigit = highestPower2 - 1 - yDigit;
      }xRem = xDivMod[0];yRem = yDivMod[0];result.push(fn(xDigit, yDigit));
    }var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt(-1) : bigInt(0);for (var i = result.length - 1; i >= 0; i -= 1) {
      sum = sum.multiply(highestPower2).add(bigInt(result[i]));
    }return sum;
  }BigInteger.prototype.not = function () {
    return this.negate().prev();
  };NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger.prototype.not;BigInteger.prototype.and = function (n) {
    return bitwise(this, n, function (a, b) {
      return a & b;
    });
  };NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger.prototype.and;BigInteger.prototype.or = function (n) {
    return bitwise(this, n, function (a, b) {
      return a | b;
    });
  };NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger.prototype.or;BigInteger.prototype.xor = function (n) {
    return bitwise(this, n, function (a, b) {
      return a ^ b;
    });
  };NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger.prototype.xor;var LOBMASK_I = 1 << 30,
      LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;function roughLOB(n) {
    var v = n.value,
        x = typeof v === "number" ? v | LOBMASK_I : typeof v === "bigint" ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE | LOBMASK_BI;return x & -x;
  }function integerLogarithm(value, base) {
    if (base.compareTo(value) <= 0) {
      var tmp = integerLogarithm(value, base.square(base));var p = tmp.p;var e = tmp.e;var t = p.multiply(base);return t.compareTo(value) <= 0 ? { p: t, e: e * 2 + 1 } : { p: p, e: e * 2 };
    }return { p: bigInt(1), e: 0 };
  }BigInteger.prototype.bitLength = function () {
    var n = this;if (n.compareTo(bigInt(0)) < 0) {
      n = n.negate().subtract(bigInt(1));
    }if (n.compareTo(bigInt(0)) === 0) {
      return bigInt(0);
    }return bigInt(integerLogarithm(n, bigInt(2)).e).add(bigInt(1));
  };NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger.prototype.bitLength;function max(a, b) {
    a = parseValue(a);b = parseValue(b);return a.greater(b) ? a : b;
  }function min(a, b) {
    a = parseValue(a);b = parseValue(b);return a.lesser(b) ? a : b;
  }function gcd(a, b) {
    a = parseValue(a).abs();b = parseValue(b).abs();if (a.equals(b)) return a;if (a.isZero()) return b;if (b.isZero()) return a;var c = Integer[1],
        d,
        t;while (a.isEven() && b.isEven()) {
      d = min(roughLOB(a), roughLOB(b));a = a.divide(d);b = b.divide(d);c = c.multiply(d);
    }while (a.isEven()) {
      a = a.divide(roughLOB(a));
    }do {
      while (b.isEven()) {
        b = b.divide(roughLOB(b));
      }if (a.greater(b)) {
        t = b;b = a;a = t;
      }b = b.subtract(a);
    } while (!b.isZero());return c.isUnit() ? a : a.multiply(c);
  }function lcm(a, b) {
    a = parseValue(a).abs();b = parseValue(b).abs();return a.divide(gcd(a, b)).multiply(b);
  }function randBetween(a, b) {
    a = parseValue(a);b = parseValue(b);var low = min(a, b),
        high = max(a, b);var range = high.subtract(low).add(1);if (range.isSmall) return low.add(Math.floor(Math.random() * range));var digits = toBase(range, BASE).value;var result = [],
        restricted = true;for (var i = 0; i < digits.length; i++) {
      var top = restricted ? digits[i] : BASE;var digit = truncate(Math.random() * top);result.push(digit);if (digit < top) restricted = false;
    }return low.add(Integer.fromArray(result, BASE, false));
  }var parseBase = function parseBase(text, base, alphabet, caseSensitive) {
    alphabet = alphabet || DEFAULT_ALPHABET;text = String(text);if (!caseSensitive) {
      text = text.toLowerCase();alphabet = alphabet.toLowerCase();
    }var length = text.length;var i;var absBase = Math.abs(base);var alphabetValues = {};for (i = 0; i < alphabet.length; i++) {
      alphabetValues[alphabet[i]] = i;
    }for (i = 0; i < length; i++) {
      var c = text[i];if (c === "-") continue;if (c in alphabetValues) {
        if (alphabetValues[c] >= absBase) {
          if (c === "1" && absBase === 1) continue;throw new Error(c + " is not a valid digit in base " + base + ".");
        }
      }
    }base = parseValue(base);var digits = [];var isNegative = text[0] === "-";for (i = isNegative ? 1 : 0; i < text.length; i++) {
      var c = text[i];if (c in alphabetValues) digits.push(parseValue(alphabetValues[c]));else if (c === "<") {
        var start = i;do {
          i++;
        } while (text[i] !== ">" && i < text.length);digits.push(parseValue(text.slice(start + 1, i)));
      } else throw new Error(c + " is not a valid character");
    }return parseBaseFromArray(digits, base, isNegative);
  };function parseBaseFromArray(digits, base, isNegative) {
    var val = Integer[0],
        pow = Integer[1],
        i;for (i = digits.length - 1; i >= 0; i--) {
      val = val.add(digits[i].times(pow));pow = pow.times(base);
    }return isNegative ? val.negate() : val;
  }function stringify(digit, alphabet) {
    alphabet = alphabet || DEFAULT_ALPHABET;if (digit < alphabet.length) {
      return alphabet[digit];
    }return "<" + digit + ">";
  }function toBase(n, base) {
    base = bigInt(base);if (base.isZero()) {
      if (n.isZero()) return { value: [0], isNegative: false };throw new Error("Cannot convert nonzero numbers to base 0.");
    }if (base.equals(-1)) {
      if (n.isZero()) return { value: [0], isNegative: false };if (n.isNegative()) return { value: [].concat.apply([], Array.apply(null, Array(-n.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };var arr = Array.apply(null, Array(n.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);arr.unshift([1]);return { value: [].concat.apply([], arr), isNegative: false };
    }var neg = false;if (n.isNegative() && base.isPositive()) {
      neg = true;n = n.abs();
    }if (base.isUnit()) {
      if (n.isZero()) return { value: [0], isNegative: false };return { value: Array.apply(null, Array(n.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: neg };
    }var out = [];var left = n,
        divmod;while (left.isNegative() || left.compareAbs(base) >= 0) {
      divmod = left.divmod(base);left = divmod.quotient;var digit = divmod.remainder;if (digit.isNegative()) {
        digit = base.minus(digit).abs();left = left.next();
      }out.push(digit.toJSNumber());
    }out.push(left.toJSNumber());return { value: out.reverse(), isNegative: neg };
  }function toBaseString(n, base, alphabet) {
    var arr = toBase(n, base);return (arr.isNegative ? "-" : "") + arr.value.map(function (x) {
      return stringify(x, alphabet);
    }).join("");
  }BigInteger.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };SmallInteger.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };NativeBigInt.prototype.toArray = function (radix) {
    return toBase(this, radix);
  };BigInteger.prototype.toString = function (radix, alphabet) {
    if (radix === undefined) radix = 10;if (radix !== 10) return toBaseString(this, radix, alphabet);var v = this.value,
        l = v.length,
        str = String(v[--l]),
        zeros = "0000000",
        digit;while (--l >= 0) {
      digit = String(v[l]);str += zeros.slice(digit.length) + digit;
    }var sign = this.sign ? "-" : "";return sign + str;
  };SmallInteger.prototype.toString = function (radix, alphabet) {
    if (radix === undefined) radix = 10;if (radix != 10) return toBaseString(this, radix, alphabet);return String(this.value);
  };NativeBigInt.prototype.toString = SmallInteger.prototype.toString;NativeBigInt.prototype.toJSON = BigInteger.prototype.toJSON = SmallInteger.prototype.toJSON = function () {
    return this.toString();
  };BigInteger.prototype.valueOf = function () {
    return parseInt(this.toString(), 10);
  };BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;SmallInteger.prototype.valueOf = function () {
    return this.value;
  };SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function () {
    return parseInt(this.toString(), 10);
  };function parseStringValue(v) {
    if (isPrecise(+v)) {
      var x = +v;if (x === truncate(x)) return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);throw new Error("Invalid integer: " + v);
    }var sign = v[0] === "-";if (sign) v = v.slice(1);var split = v.split(/e/i);if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));if (split.length === 2) {
      var exp = split[1];if (exp[0] === "+") exp = exp.slice(1);exp = +exp;if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");var text = split[0];var decimalPlace = text.indexOf(".");if (decimalPlace >= 0) {
        exp -= text.length - decimalPlace - 1;text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
      }if (exp < 0) throw new Error("Cannot include negative exponent part for integers");text += new Array(exp + 1).join("0");v = text;
    }var isValid = /^([0-9][0-9]*)$/.test(v);if (!isValid) throw new Error("Invalid integer: " + v);if (supportsNativeBigInt) {
      return new NativeBigInt(BigInt(sign ? "-" + v : v));
    }var r = [],
        max = v.length,
        l = LOG_BASE,
        min = max - l;while (max > 0) {
      r.push(+v.slice(min, max));min -= l;if (min < 0) min = 0;max -= l;
    }trim(r);return new BigInteger(r, sign);
  }function parseNumberValue(v) {
    if (supportsNativeBigInt) {
      return new NativeBigInt(BigInt(v));
    }if (isPrecise(v)) {
      if (v !== truncate(v)) throw new Error(v + " is not an integer.");return new SmallInteger(v);
    }return parseStringValue(v.toString());
  }function parseValue(v) {
    if (typeof v === "number") {
      return parseNumberValue(v);
    }if (typeof v === "string") {
      return parseStringValue(v);
    }if (typeof v === "bigint") {
      return new NativeBigInt(v);
    }return v;
  }for (var i = 0; i < 1e3; i++) {
    Integer[i] = parseValue(i);if (i > 0) Integer[-i] = parseValue(-i);
  }Integer.one = Integer[1];Integer.zero = Integer[0];Integer.minusOne = Integer[-1];Integer.max = max;Integer.min = min;Integer.gcd = gcd;Integer.lcm = lcm;Integer.isInstance = function (x) {
    return x instanceof BigInteger || x instanceof SmallInteger || x instanceof NativeBigInt;
  };Integer.randBetween = randBetween;Integer.fromArray = function (digits, base, isNegative) {
    return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
  };return Integer;
})();if (typeof module !== "undefined" && module.hasOwnProperty("exports")) {
  module.exports = bigInt;
}if (typeof define === "function" && define.amd) {
  define("big-integer", [], function () {
    return bigInt;
  });
}

},{}],2:[function(_dereq_,module,exports){
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

var ErrorsBase = (function () {
    function ErrorsBase() {
        _classCallCheck(this, ErrorsBase);
    }

    _createClass(ErrorsBase, [{
        key: 'extend',
        value: function extend(errors, config) {
            if (!errors) return;

            var override = config ? config.override : false;
            var publicOnly = config ? config.publicOnly : false;

            for (var err in errors) {
                if (!errors.hasOwnProperty(err) || this[err] && !override) continue;
                if (publicOnly && errors[err].indexOf('public_') === -1) continue;
                this[err] = errors[err];
            }
        }
    }]);

    return ErrorsBase;
})();

exports['default'] = ErrorsBase;
module.exports = exports['default'];

},{}],3:[function(_dereq_,module,exports){
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

},{}],4:[function(_dereq_,module,exports){
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreEventsEventsBase = _dereq_('../core/events/EventsBase');

var _coreEventsEventsBase2 = _interopRequireDefault(_coreEventsEventsBase);

var MssEvents = (function (_EventsBase) {
    _inherits(MssEvents, _EventsBase);

    function MssEvents() {
        _classCallCheck(this, MssEvents);

        _get(Object.getPrototypeOf(MssEvents.prototype), 'constructor', this).call(this);

        this.FRAGMENT_INFO_LOADING_COMPLETED = 'fragmentInfoLoadingCompleted';
    }

    return MssEvents;
})(_coreEventsEventsBase2['default']);

var mssEvents = new MssEvents();
exports['default'] = mssEvents;
module.exports = exports['default'];

},{"../core/events/EventsBase":3}],5:[function(_dereq_,module,exports){
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

var _MssEvents = _dereq_('./MssEvents');

var _MssEvents2 = _interopRequireDefault(_MssEvents);

var _MssFragmentMoofProcessor = _dereq_('./MssFragmentMoofProcessor');

var _MssFragmentMoofProcessor2 = _interopRequireDefault(_MssFragmentMoofProcessor);

var _streamingVoFragmentRequest = _dereq_('../streaming/vo/FragmentRequest');

var _streamingVoFragmentRequest2 = _interopRequireDefault(_streamingVoFragmentRequest);

function MssFragmentInfoController(config) {

    config = config || {};
    var context = this.context;

    var instance = undefined,
        logger = undefined,
        fragmentModel = undefined,
        started = undefined,
        type = undefined,
        bufferTimeout = undefined,
        startTime = undefined,
        startFragmentTime = undefined,
        index = undefined;

    var streamProcessor = config.streamProcessor;
    var eventBus = config.eventBus;
    var dashMetrics = config.dashMetrics;
    var playbackController = config.playbackController;
    var ISOBoxer = config.ISOBoxer;
    var baseURLController = config.baseURLController;
    var debug = config.debug;
    var controllerType = 'MssFragmentInfoController';

    function setup() {
        logger = debug.getLogger(instance);
    }

    function initialize() {
        started = false;

        startTime = null;
        startFragmentTime = null;

        // Register to StreamProcessor as external controller
        streamProcessor.registerExternalController(instance);
        type = streamProcessor.getType();
        fragmentModel = streamProcessor.getFragmentModel();
    }

    function doStart() {
        if (started === true) {
            return;
        }

        logger.debug('Do start');

        eventBus.on(_MssEvents2['default'].FRAGMENT_INFO_LOADING_COMPLETED, onFragmentInfoLoadedCompleted, instance);

        started = true;
        startTime = new Date().getTime();
        index = 0;

        loadNextFragmentInfo();
    }

    function doStop() {
        if (!started) {
            return;
        }
        logger.debug('Do stop');

        eventBus.off(_MssEvents2['default'].FRAGMENT_INFO_LOADING_COMPLETED, onFragmentInfoLoadedCompleted, instance);

        // Stop buffering process
        clearTimeout(bufferTimeout);
        started = false;

        startTime = null;
        startFragmentTime = null;
    }

    function reset() {
        doStop();
        streamProcessor.unregisterExternalController(instance);
    }

    function loadNextFragmentInfo() {
        // Check if running state
        if (!started) {
            return;
        }

        // Get last segment from SegmentTimeline
        var representation = getCurrentRepresentation();
        var manifest = representation.adaptation.period.mpd.manifest;
        var adaptation = manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index];
        var segments = adaptation.SegmentTemplate.SegmentTimeline.S_asArray;
        var segment = segments[segments.length - 1];

        logger.debug('Last fragment time: ' + segment.t / adaptation.SegmentTemplate.timescale);

        // Generate segment request
        var request = getRequestForSegment(adaptation, representation, segment);

        // Send segment request
        requestFragment.call(this, request);
    }

    function delayLoadNextFragmentInfo(delay) {
        clearTimeout(bufferTimeout);
        bufferTimeout = setTimeout(function () {
            bufferTimeout = null;
            loadNextFragmentInfo();
        }, delay * 1000);
    }

    function getRequestForSegment(adaptation, representation, segment) {
        var timescale = adaptation.SegmentTemplate.timescale;
        var request = new _streamingVoFragmentRequest2['default']();

        request.mediaType = type;
        request.type = 'FragmentInfoSegment';
        // request.range = segment.mediaRange;
        request.startTime = segment.t / timescale;
        request.duration = segment.d / timescale;
        request.timescale = timescale;
        // request.availabilityStartTime = segment.availabilityStartTime;
        // request.availabilityEndTime = segment.availabilityEndTime;
        // request.wallStartTime = segment.wallStartTime;
        request.quality = representation.index;
        request.index = index++;
        request.mediaInfo = streamProcessor.getMediaInfo();
        request.adaptationIndex = representation.adaptation.index;
        request.representationId = representation.id;
        request.url = baseURLController.resolve(representation.path).url + adaptation.SegmentTemplate.media;
        request.url = request.url.replace('$Bandwidth$', representation.bandwidth);
        request.url = request.url.replace('$Time$', segment.tManifest ? segment.tManifest : segment.t);
        request.url = request.url.replace('/Fragments(', '/FragmentInfo(');

        return request;
    }

    function getCurrentRepresentation() {
        var representationController = streamProcessor.getRepresentationController();
        var representation = representationController.getCurrentRepresentation();

        return representation;
    }

    function requestFragment(request) {

        logger.debug('Load fragment for time: ' + request.startTime);
        if (streamProcessor.getFragmentModel().isFragmentLoadedOrPending(request)) {
            // We may have reached end of timeline in case of start-over streams
            logger.debug('No more fragments');
            return;
        }

        fragmentModel.executeRequest(request);
    }

    function onFragmentInfoLoadedCompleted(e) {
        if (e.streamProcessor !== streamProcessor) {
            return;
        }

        var request = e.fragmentInfo.request;
        if (!e.fragmentInfo.response) {
            logger.error('Load error', request.url);
            return;
        }

        var deltaFragmentTime = undefined,
            deltaTime = undefined;

        logger.debug('FragmentInfo loaded: ', request.url);

        if (!startFragmentTime) {
            startFragmentTime = request.startTime;
        }

        try {
            // Process FramgentInfo in order to update segment timeline (DVR window)
            var mssFragmentMoofProcessor = (0, _MssFragmentMoofProcessor2['default'])(context).create({
                dashMetrics: dashMetrics,
                playbackController: playbackController,
                ISOBoxer: ISOBoxer,
                eventBus: eventBus,
                debug: debug
            });
            mssFragmentMoofProcessor.updateSegmentList(e.fragmentInfo, streamProcessor);

            deltaTime = (new Date().getTime() - startTime) / 1000;
            deltaFragmentTime = request.startTime + request.duration - startFragmentTime;
            delayLoadNextFragmentInfo(Math.max(0, deltaFragmentTime - deltaTime));
        } catch (e) {
            logger.fatal('Internal error while processing fragment info segment ');
        }
    }

    function getType() {
        return type;
    }

    instance = {
        initialize: initialize,
        controllerType: controllerType,
        start: doStart,
        getType: getType,
        reset: reset
    };

    setup();

    return instance;
}

MssFragmentInfoController.__dashjs_factory_name = 'MssFragmentInfoController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentInfoController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"../streaming/vo/FragmentRequest":16,"./MssEvents":4,"./MssFragmentMoofProcessor":6}],6:[function(_dereq_,module,exports){
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

var _streamingVoDashJSError = _dereq_('../streaming/vo/DashJSError');

var _streamingVoDashJSError2 = _interopRequireDefault(_streamingVoDashJSError);

var _errorsMssErrors = _dereq_('./errors/MssErrors');

var _errorsMssErrors2 = _interopRequireDefault(_errorsMssErrors);

var _streamingMediaPlayerEvents = _dereq_('../streaming/MediaPlayerEvents');

var _streamingMediaPlayerEvents2 = _interopRequireDefault(_streamingMediaPlayerEvents);

/**
 * @module MssFragmentMoofProcessor
 * @ignore
 * @param {Object} config object
 */
function MssFragmentMoofProcessor(config) {

    config = config || {};
    var instance = undefined,
        type = undefined,
        logger = undefined;
    var dashMetrics = config.dashMetrics;
    var playbackController = config.playbackController;
    var errorHandler = config.errHandler;
    var eventBus = config.eventBus;
    var ISOBoxer = config.ISOBoxer;
    var debug = config.debug;

    function setup() {
        logger = debug.getLogger(instance);
        type = '';
    }

    function processTfrf(request, tfrf, tfdt, streamProcessor) {
        var representationController = streamProcessor.getRepresentationController();
        var representation = representationController.getCurrentRepresentation();

        var manifest = representation.adaptation.period.mpd.manifest;
        var adaptation = manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index];
        var timescale = adaptation.SegmentTemplate.timescale;

        type = streamProcessor.getType();

        if (manifest.type !== 'dynamic' && !manifest.timeShiftBufferDepth) {
            return;
        }

        if (!tfrf) {
            errorHandler.error(new _streamingVoDashJSError2['default'](_errorsMssErrors2['default'].MSS_NO_TFRF_CODE, _errorsMssErrors2['default'].MSS_NO_TFRF_MESSAGE));
            return;
        }

        // Get adaptation's segment timeline (always a SegmentTimeline in Smooth Streaming use case)
        var segments = adaptation.SegmentTemplate.SegmentTimeline.S;
        var entries = tfrf.entry;
        var entry = undefined,
            segmentTime = undefined,
            range = undefined;
        var segment = null;
        var t = 0;
        var availabilityStartTime = null;

        if (entries.length === 0) {
            return;
        }

        // Consider only first tfrf entry (to avoid pre-condition failure on fragment info requests)
        entry = entries[0];

        // In case of start-over streams, check if we have reached end of original manifest duration (set in timeShiftBufferDepth)
        // => then do not update anymore timeline
        if (manifest.type === 'static') {
            // Get first segment time
            segmentTime = segments[0].tManifest ? parseFloat(segments[0].tManifest) : segments[0].t;
            if (entry.fragment_absolute_time > segmentTime + manifest.timeShiftBufferDepth * timescale) {
                return;
            }
        }

        logger.debug('entry - t = ', entry.fragment_absolute_time / timescale);

        // Get last segment time
        segmentTime = segments[segments.length - 1].tManifest ? parseFloat(segments[segments.length - 1].tManifest) : segments[segments.length - 1].t;
        logger.debug('Last segment - t = ', segmentTime / timescale);

        // Check if we have to append new segment to timeline
        if (entry.fragment_absolute_time <= segmentTime) {
            // Update DVR window range
            // => set range end to end time of current segment
            range = {
                start: segments[0].t / timescale,
                end: tfdt.baseMediaDecodeTime / timescale + request.duration
            };

            updateDVR(request.mediaType, range, streamProcessor.getStreamInfo().manifestInfo);
            return;
        }

        logger.debug('Add new segment - t = ', entry.fragment_absolute_time / timescale);
        segment = {};
        segment.t = entry.fragment_absolute_time;
        segment.d = entry.fragment_duration;
        // If timestamps starts at 0 relative to 1st segment (dynamic to static) then update segment time
        if (segments[0].tManifest) {
            segment.t -= parseFloat(segments[0].tManifest) - segments[0].t;
            segment.tManifest = entry.fragment_absolute_time;
        }
        segments.push(segment);

        // In case of static start-over streams, update content duration
        if (manifest.type === 'static') {
            if (type === 'video') {
                segment = segments[segments.length - 1];
                var end = (segment.t + segment.d) / timescale;
                if (end > representation.adaptation.period.duration) {
                    eventBus.trigger(_streamingMediaPlayerEvents2['default'].MANIFEST_VALIDITY_CHANGED, { sender: this, newDuration: end });
                }
            }
            return;
        }
        // In case of live streams, update segment timeline according to DVR window
        else if (manifest.timeShiftBufferDepth && manifest.timeShiftBufferDepth > 0) {
                // Get timestamp of the last segment
                segment = segments[segments.length - 1];
                t = segment.t;

                // Determine the segments' availability start time
                availabilityStartTime = Math.round((t - manifest.timeShiftBufferDepth * timescale) / timescale);

                // Remove segments prior to availability start time
                segment = segments[0];
                while (Math.round(segment.t / timescale) < availabilityStartTime) {
                    logger.debug('Remove segment  - t = ' + segment.t / timescale);
                    segments.splice(0, 1);
                    segment = segments[0];
                }

                // Update DVR window range => set range end to end time of current segment
                range = {
                    start: segments[0].t / timescale,
                    end: tfdt.baseMediaDecodeTime / timescale + request.duration
                };

                updateDVR(type, range, streamProcessor.getStreamInfo().manifestInfo);
            }

        representationController.updateRepresentation(representation, true);
    }

    function updateDVR(type, range, manifestInfo) {
        var dvrInfos = dashMetrics.getCurrentDVRInfo(type);
        if (!dvrInfos || range.end > dvrInfos.range.end) {
            logger.debug('Update DVR Infos [' + range.start + ' - ' + range.end + ']');
            dashMetrics.addDVRInfo(type, playbackController.getTime(), manifestInfo, range);
        }
    }

    // This function returns the offset of the 1st byte of a child box within a container box
    function getBoxOffset(parent, type) {
        var offset = 8;
        var i = 0;

        for (i = 0; i < parent.boxes.length; i++) {
            if (parent.boxes[i].type === type) {
                return offset;
            }
            offset += parent.boxes[i].size;
        }
        return offset;
    }

    function convertFragment(e, sp) {
        var i = undefined;

        // e.request contains request description object
        // e.response contains fragment bytes
        var isoFile = ISOBoxer.parseBuffer(e.response);
        // Update track_Id in tfhd box
        var tfhd = isoFile.fetch('tfhd');
        tfhd.track_ID = e.request.mediaInfo.index + 1;

        // Add tfdt box
        var tfdt = isoFile.fetch('tfdt');
        var traf = isoFile.fetch('traf');
        if (tfdt === null) {
            tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
            tfdt.version = 1;
            tfdt.flags = 0;
            tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
        }

        var trun = isoFile.fetch('trun');

        // Process tfxd boxes
        // This box provide absolute timestamp but we take the segment start time for tfdt
        var tfxd = isoFile.fetch('tfxd');
        if (tfxd) {
            tfxd._parent.boxes.splice(tfxd._parent.boxes.indexOf(tfxd), 1);
            tfxd = null;
        }
        var tfrf = isoFile.fetch('tfrf');
        processTfrf(e.request, tfrf, tfdt, sp);
        if (tfrf) {
            tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
            tfrf = null;
        }

        // If protected content in PIFF1.1 format (sepiff box = Sample Encryption PIFF)
        // => convert sepiff box it into a senc box
        // => create saio and saiz boxes (if not already present)
        var sepiff = isoFile.fetch('sepiff');
        if (sepiff !== null) {
            sepiff.type = 'senc';
            sepiff.usertype = undefined;

            var _saio = isoFile.fetch('saio');
            if (_saio === null) {
                // Create Sample Auxiliary Information Offsets Box box (saio)
                _saio = ISOBoxer.createFullBox('saio', traf);
                _saio.version = 0;
                _saio.flags = 0;
                _saio.entry_count = 1;
                _saio.offset = [0];

                var saiz = ISOBoxer.createFullBox('saiz', traf);
                saiz.version = 0;
                saiz.flags = 0;
                saiz.sample_count = sepiff.sample_count;
                saiz.default_sample_info_size = 0;
                saiz.sample_info_size = [];

                if (sepiff.flags & 0x02) {
                    // Sub-sample encryption => set sample_info_size for each sample
                    for (i = 0; i < sepiff.sample_count; i += 1) {
                        // 10 = 8 (InitializationVector field size) + 2 (subsample_count field size)
                        // 6 = 2 (BytesOfClearData field size) + 4 (BytesOfEncryptedData field size)
                        saiz.sample_info_size[i] = 10 + 6 * sepiff.entry[i].NumberOfEntries;
                    }
                } else {
                    // No sub-sample encryption => set default sample_info_size = InitializationVector field size (8)
                    saiz.default_sample_info_size = 8;
                }
            }
        }

        tfhd.flags &= 0xFFFFFE; // set tfhd.base-data-offset-present to false
        tfhd.flags |= 0x020000; // set tfhd.default-base-is-moof to true
        trun.flags |= 0x000001; // set trun.data-offset-present to true

        // Update trun.data_offset field that corresponds to first data byte (inside mdat box)
        var moof = isoFile.fetch('moof');
        var length = moof.getLength();
        trun.data_offset = length + 8;

        // Update saio box offset field according to new senc box offset
        var saio = isoFile.fetch('saio');
        if (saio !== null) {
            var trafPosInMoof = getBoxOffset(moof, 'traf');
            var sencPosInTraf = getBoxOffset(traf, 'senc');
            // Set offset from begin fragment to the first IV field in senc box
            saio.offset[0] = trafPosInMoof + sencPosInTraf + 16; // 16 = box header (12) + sample_count field size (4)
        }

        // Write transformed/processed fragment into request reponse data
        e.response = isoFile.write();
    }

    function updateSegmentList(e, sp) {
        // e.request contains request description object
        // e.response contains fragment bytes
        if (!e.response) {
            throw new Error('e.response parameter is missing');
        }

        var isoFile = ISOBoxer.parseBuffer(e.response);
        // Update track_Id in tfhd box
        var tfhd = isoFile.fetch('tfhd');
        tfhd.track_ID = e.request.mediaInfo.index + 1;

        // Add tfdt box
        var tfdt = isoFile.fetch('tfdt');
        var traf = isoFile.fetch('traf');
        if (tfdt === null) {
            tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
            tfdt.version = 1;
            tfdt.flags = 0;
            tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
        }

        var tfrf = isoFile.fetch('tfrf');
        processTfrf(e.request, tfrf, tfdt, sp);
        if (tfrf) {
            tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
            tfrf = null;
        }
    }

    function getType() {
        return type;
    }

    instance = {
        convertFragment: convertFragment,
        updateSegmentList: updateSegmentList,
        getType: getType
    };

    setup();
    return instance;
}

MssFragmentMoofProcessor.__dashjs_factory_name = 'MssFragmentMoofProcessor';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentMoofProcessor);
/* jshint ignore:line */
module.exports = exports['default'];

},{"../streaming/MediaPlayerEvents":13,"../streaming/vo/DashJSError":14,"./errors/MssErrors":10}],7:[function(_dereq_,module,exports){
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

var _errorsMssErrors = _dereq_('./errors/MssErrors');

var _errorsMssErrors2 = _interopRequireDefault(_errorsMssErrors);

/**
 * @module MssFragmentMoovProcessor
 * @ignore
 * @param {Object} config object
 */
function MssFragmentMoovProcessor(config) {
    config = config || {};
    var NALUTYPE_SPS = 7;
    var NALUTYPE_PPS = 8;
    var constants = config.constants;
    var ISOBoxer = config.ISOBoxer;

    var protectionController = config.protectionController;
    var instance = undefined,
        period = undefined,
        adaptationSet = undefined,
        representation = undefined,
        contentProtection = undefined,
        timescale = undefined,
        trackId = undefined;

    function createFtypBox(isoFile) {
        var ftyp = ISOBoxer.createBox('ftyp', isoFile);
        ftyp.major_brand = 'iso6';
        ftyp.minor_version = 1; // is an informative integer for the minor version of the major brand
        ftyp.compatible_brands = []; //is a list, to the end of the box, of brands isom, iso6 and msdh
        ftyp.compatible_brands[0] = 'isom'; // => decimal ASCII value for isom
        ftyp.compatible_brands[1] = 'iso6'; // => decimal ASCII value for iso6
        ftyp.compatible_brands[2] = 'msdh'; // => decimal ASCII value for msdh

        return ftyp;
    }

    function createMoovBox(isoFile) {

        // moov box
        var moov = ISOBoxer.createBox('moov', isoFile);

        // moov/mvhd
        createMvhdBox(moov);

        // moov/trak
        var trak = ISOBoxer.createBox('trak', moov);

        // moov/trak/tkhd
        createTkhdBox(trak);

        // moov/trak/mdia
        var mdia = ISOBoxer.createBox('mdia', trak);

        // moov/trak/mdia/mdhd
        createMdhdBox(mdia);

        // moov/trak/mdia/hdlr
        createHdlrBox(mdia);

        // moov/trak/mdia/minf
        var minf = ISOBoxer.createBox('minf', mdia);

        switch (adaptationSet.type) {
            case constants.VIDEO:
                // moov/trak/mdia/minf/vmhd
                createVmhdBox(minf);
                break;
            case constants.AUDIO:
                // moov/trak/mdia/minf/smhd
                createSmhdBox(minf);
                break;
            default:
                break;
        }

        // moov/trak/mdia/minf/dinf
        var dinf = ISOBoxer.createBox('dinf', minf);

        // moov/trak/mdia/minf/dinf/dref
        createDrefBox(dinf);

        // moov/trak/mdia/minf/stbl
        var stbl = ISOBoxer.createBox('stbl', minf);

        // Create empty stts, stsc, stco and stsz boxes
        // Use data field as for codem-isoboxer unknown boxes for setting fields value

        // moov/trak/mdia/minf/stbl/stts
        var stts = ISOBoxer.createFullBox('stts', stbl);
        stts._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

        // moov/trak/mdia/minf/stbl/stsc
        var stsc = ISOBoxer.createFullBox('stsc', stbl);
        stsc._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

        // moov/trak/mdia/minf/stbl/stco
        var stco = ISOBoxer.createFullBox('stco', stbl);
        stco._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

        // moov/trak/mdia/minf/stbl/stsz
        var stsz = ISOBoxer.createFullBox('stsz', stbl);
        stsz._data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, sample_size = 0, sample_count = 0

        // moov/trak/mdia/minf/stbl/stsd
        createStsdBox(stbl);

        // moov/mvex
        var mvex = ISOBoxer.createBox('mvex', moov);

        // moov/mvex/trex
        createTrexBox(mvex);

        if (contentProtection && protectionController) {
            var supportedKS = protectionController.getSupportedKeySystemsFromContentProtection(contentProtection);
            createProtectionSystemSpecificHeaderBox(moov, supportedKS);
        }
    }

    function createMvhdBox(moov) {

        var mvhd = ISOBoxer.createFullBox('mvhd', moov);

        mvhd.version = 1; // version = 1  in order to have 64bits duration value

        mvhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
        mvhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
        mvhd.timescale = timescale; // the time-scale for the entire presentation => 10000000 for MSS
        mvhd.duration = Math.round(period.duration * timescale); // the length of the presentation (in the indicated timescale) =>  take duration of period
        mvhd.rate = 1.0; // 16.16 number, '1.0' = normal playback
        mvhd.volume = 1.0; // 8.8 number, '1.0' = full volume
        mvhd.reserved1 = 0;
        mvhd.reserved2 = [0x0, 0x0];
        mvhd.matrix = [1, 0, 0, // provides a transformation matrix for the video;
        0, 1, 0, // (u,v,w) are restricted here to (0,0,1)
        0, 0, 16384];
        mvhd.pre_defined = [0, 0, 0, 0, 0, 0];
        mvhd.next_track_ID = trackId + 1; // indicates a value to use for the track ID of the next track to be added to this presentation

        return mvhd;
    }

    function createTkhdBox(trak) {

        var tkhd = ISOBoxer.createFullBox('tkhd', trak);

        tkhd.version = 1; // version = 1  in order to have 64bits duration value
        tkhd.flags = 0x1 | // Track_enabled (0x000001): Indicates that the track is enabled
        0x2 | // Track_in_movie (0x000002):  Indicates that the track is used in the presentation
        0x4; // Track_in_preview (0x000004):  Indicates that the track is used when previewing the presentation

        tkhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
        tkhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
        tkhd.track_ID = trackId; // uniquely identifies this track over the entire life-time of this presentation
        tkhd.reserved1 = 0;
        tkhd.duration = Math.round(period.duration * timescale); // the duration of this track (in the timescale indicated in the Movie Header Box) =>  take duration of period
        tkhd.reserved2 = [0x0, 0x0];
        tkhd.layer = 0; // specifies the front-to-back ordering of video tracks; tracks with lower numbers are closer to the viewer => 0 since only one video track
        tkhd.alternate_group = 0; // specifies a group or collection of tracks => ignore
        tkhd.volume = 1.0; // '1.0' = full volume
        tkhd.reserved3 = 0;
        tkhd.matrix = [1, 0, 0, // provides a transformation matrix for the video;
        0, 1, 0, // (u,v,w) are restricted here to (0,0,1)
        0, 0, 16384];
        tkhd.width = representation.width; // visual presentation width
        tkhd.height = representation.height; // visual presentation height

        return tkhd;
    }

    function createMdhdBox(mdia) {

        var mdhd = ISOBoxer.createFullBox('mdhd', mdia);

        mdhd.version = 1; // version = 1  in order to have 64bits duration value

        mdhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
        mdhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
        mdhd.timescale = timescale; // the time-scale for the entire presentation
        mdhd.duration = Math.round(period.duration * timescale); // the duration of this media (in the scale of the timescale). If the duration cannot be determined then duration is set to all 1s.
        mdhd.language = adaptationSet.lang || 'und'; // declares the language code for this media (see getLanguageCode())
        mdhd.pre_defined = 0;

        return mdhd;
    }

    function createHdlrBox(mdia) {

        var hdlr = ISOBoxer.createFullBox('hdlr', mdia);

        hdlr.pre_defined = 0;
        switch (adaptationSet.type) {
            case constants.VIDEO:
                hdlr.handler_type = 'vide';
                break;
            case constants.AUDIO:
                hdlr.handler_type = 'soun';
                break;
            default:
                hdlr.handler_type = 'meta';
                break;
        }
        hdlr.name = representation.id;
        hdlr.reserved = [0, 0, 0];

        return hdlr;
    }

    function createVmhdBox(minf) {

        var vmhd = ISOBoxer.createFullBox('vmhd', minf);

        vmhd.flags = 1;

        vmhd.graphicsmode = 0; // specifies a composition mode for this video track, from the following enumerated set, which may be extended by derived specifications: copy = 0 copy over the existing image
        vmhd.opcolor = [0, 0, 0]; // is a set of 3 colour values (red, green, blue) available for use by graphics modes

        return vmhd;
    }

    function createSmhdBox(minf) {

        var smhd = ISOBoxer.createFullBox('smhd', minf);

        smhd.flags = 1;

        smhd.balance = 0; // is a fixed-point 8.8 number that places mono audio tracks in a stereo space; 0 is centre (the normal value); full left is -1.0 and full right is 1.0.
        smhd.reserved = 0;

        return smhd;
    }

    function createDrefBox(dinf) {

        var dref = ISOBoxer.createFullBox('dref', dinf);

        dref.entry_count = 1;
        dref.entries = [];

        var url = ISOBoxer.createFullBox('url ', dref, false);
        url.location = '';
        url.flags = 1;

        dref.entries.push(url);

        return dref;
    }

    function createStsdBox(stbl) {

        var stsd = ISOBoxer.createFullBox('stsd', stbl);

        stsd.entries = [];
        switch (adaptationSet.type) {
            case constants.VIDEO:
            case constants.AUDIO:
                stsd.entries.push(createSampleEntry(stsd));
                break;
            default:
                break;
        }

        stsd.entry_count = stsd.entries.length; // is an integer that counts the actual entries
        return stsd;
    }

    function createSampleEntry(stsd) {
        var codec = representation.codecs.substring(0, representation.codecs.indexOf('.'));

        switch (codec) {
            case 'avc1':
                return createAVCVisualSampleEntry(stsd, codec);
            case 'mp4a':
                return createMP4AudioSampleEntry(stsd, codec);
            default:
                throw {
                    code: _errorsMssErrors2['default'].MSS_UNSUPPORTED_CODEC_CODE,
                    message: _errorsMssErrors2['default'].MSS_UNSUPPORTED_CODEC_MESSAGE,
                    data: {
                        codec: codec
                    }
                };
        }
    }

    function createAVCVisualSampleEntry(stsd, codec) {
        var avc1 = undefined;

        if (contentProtection) {
            avc1 = ISOBoxer.createBox('encv', stsd, false);
        } else {
            avc1 = ISOBoxer.createBox('avc1', stsd, false);
        }

        // SampleEntry fields
        avc1.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
        avc1.data_reference_index = 1;

        // VisualSampleEntry fields
        avc1.pre_defined1 = 0;
        avc1.reserved2 = 0;
        avc1.pre_defined2 = [0, 0, 0];
        avc1.height = representation.height;
        avc1.width = representation.width;
        avc1.horizresolution = 72; // 72 dpi
        avc1.vertresolution = 72; // 72 dpi
        avc1.reserved3 = 0;
        avc1.frame_count = 1; // 1 compressed video frame per sample
        avc1.compressorname = [0x0A, 0x41, 0x56, 0x43, 0x20, 0x43, 0x6F, 0x64, // = 'AVC Coding';
        0x69, 0x6E, 0x67, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        avc1.depth = 0x0018; // 0x0018 – images are in colour with no alpha.
        avc1.pre_defined3 = 65535;
        avc1.config = createAVC1ConfigurationRecord();
        if (contentProtection) {
            // Create and add Protection Scheme Info Box
            var sinf = ISOBoxer.createBox('sinf', avc1);

            // Create and add Original Format Box => indicate codec type of the encrypted content
            createOriginalFormatBox(sinf, codec);

            // Create and add Scheme Type box
            createSchemeTypeBox(sinf);

            // Create and add Scheme Information Box
            createSchemeInformationBox(sinf);
        }

        return avc1;
    }

    function createAVC1ConfigurationRecord() {

        var avcC = null;
        var avcCLength = 15; // length = 15 by default (0 SPS and 0 PPS)

        // First get all SPS and PPS from codecPrivateData
        var sps = [];
        var pps = [];
        var AVCProfileIndication = 0;
        var AVCLevelIndication = 0;
        var profile_compatibility = 0;

        var nalus = representation.codecPrivateData.split('00000001').slice(1);
        var naluBytes = undefined,
            naluType = undefined;

        for (var _i = 0; _i < nalus.length; _i++) {
            naluBytes = hexStringtoBuffer(nalus[_i]);

            naluType = naluBytes[0] & 0x1F;

            switch (naluType) {
                case NALUTYPE_SPS:
                    sps.push(naluBytes);
                    avcCLength += naluBytes.length + 2; // 2 = sequenceParameterSetLength field length
                    break;
                case NALUTYPE_PPS:
                    pps.push(naluBytes);
                    avcCLength += naluBytes.length + 2; // 2 = pictureParameterSetLength field length
                    break;
                default:
                    break;
            }
        }

        // Get profile and level from SPS
        if (sps.length > 0) {
            AVCProfileIndication = sps[0][1];
            profile_compatibility = sps[0][2];
            AVCLevelIndication = sps[0][3];
        }

        // Generate avcC buffer
        avcC = new Uint8Array(avcCLength);

        var i = 0;
        // length
        avcC[i++] = (avcCLength & 0xFF000000) >> 24;
        avcC[i++] = (avcCLength & 0x00FF0000) >> 16;
        avcC[i++] = (avcCLength & 0x0000FF00) >> 8;
        avcC[i++] = avcCLength & 0x000000FF;
        avcC.set([0x61, 0x76, 0x63, 0x43], i); // type = 'avcC'
        i += 4;
        avcC[i++] = 1; // configurationVersion = 1
        avcC[i++] = AVCProfileIndication;
        avcC[i++] = profile_compatibility;
        avcC[i++] = AVCLevelIndication;
        avcC[i++] = 0xFF; // '11111' + lengthSizeMinusOne = 3
        avcC[i++] = 0xE0 | sps.length; // '111' + numOfSequenceParameterSets
        for (var n = 0; n < sps.length; n++) {
            avcC[i++] = (sps[n].length & 0xFF00) >> 8;
            avcC[i++] = sps[n].length & 0x00FF;
            avcC.set(sps[n], i);
            i += sps[n].length;
        }
        avcC[i++] = pps.length; // numOfPictureParameterSets
        for (var n = 0; n < pps.length; n++) {
            avcC[i++] = (pps[n].length & 0xFF00) >> 8;
            avcC[i++] = pps[n].length & 0x00FF;
            avcC.set(pps[n], i);
            i += pps[n].length;
        }

        return avcC;
    }

    function createMP4AudioSampleEntry(stsd, codec) {
        var mp4a = undefined;

        if (contentProtection) {
            mp4a = ISOBoxer.createBox('enca', stsd, false);
        } else {
            mp4a = ISOBoxer.createBox('mp4a', stsd, false);
        }

        // SampleEntry fields
        mp4a.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
        mp4a.data_reference_index = 1;

        // AudioSampleEntry fields
        mp4a.reserved2 = [0x0, 0x0];
        mp4a.channelcount = representation.audioChannels;
        mp4a.samplesize = 16;
        mp4a.pre_defined = 0;
        mp4a.reserved_3 = 0;
        mp4a.samplerate = representation.audioSamplingRate << 16;

        mp4a.esds = createMPEG4AACESDescriptor();

        if (contentProtection) {
            // Create and add Protection Scheme Info Box
            var sinf = ISOBoxer.createBox('sinf', mp4a);

            // Create and add Original Format Box => indicate codec type of the encrypted content
            createOriginalFormatBox(sinf, codec);

            // Create and add Scheme Type box
            createSchemeTypeBox(sinf);

            // Create and add Scheme Information Box
            createSchemeInformationBox(sinf);
        }

        return mp4a;
    }

    function createMPEG4AACESDescriptor() {

        // AudioSpecificConfig (see ISO/IEC 14496-3, subpart 1) => corresponds to hex bytes contained in 'codecPrivateData' field
        var audioSpecificConfig = hexStringtoBuffer(representation.codecPrivateData);

        // ESDS length = esds box header length (= 12) +
        //               ES_Descriptor header length (= 5) +
        //               DecoderConfigDescriptor header length (= 15) +
        //               decoderSpecificInfo header length (= 2) +
        //               AudioSpecificConfig length (= codecPrivateData length)
        var esdsLength = 34 + audioSpecificConfig.length;
        var esds = new Uint8Array(esdsLength);

        var i = 0;
        // esds box
        esds[i++] = (esdsLength & 0xFF000000) >> 24; // esds box length
        esds[i++] = (esdsLength & 0x00FF0000) >> 16; // ''
        esds[i++] = (esdsLength & 0x0000FF00) >> 8; // ''
        esds[i++] = esdsLength & 0x000000FF; // ''
        esds.set([0x65, 0x73, 0x64, 0x73], i); // type = 'esds'
        i += 4;
        esds.set([0, 0, 0, 0], i); // version = 0, flags = 0
        i += 4;
        // ES_Descriptor (see ISO/IEC 14496-1 (Systems))
        esds[i++] = 0x03; // tag = 0x03 (ES_DescrTag)
        esds[i++] = 20 + audioSpecificConfig.length; // size
        esds[i++] = (trackId & 0xFF00) >> 8; // ES_ID = track_id
        esds[i++] = trackId & 0x00FF; // ''
        esds[i++] = 0; // flags and streamPriority

        // DecoderConfigDescriptor (see ISO/IEC 14496-1 (Systems))
        esds[i++] = 0x04; // tag = 0x04 (DecoderConfigDescrTag)
        esds[i++] = 15 + audioSpecificConfig.length; // size
        esds[i++] = 0x40; // objectTypeIndication = 0x40 (MPEG-4 AAC)
        esds[i] = 0x05 << 2; // streamType = 0x05 (Audiostream)
        esds[i] |= 0 << 1; // upStream = 0
        esds[i++] |= 1; // reserved = 1
        esds[i++] = 0xFF; // buffersizeDB = undefined
        esds[i++] = 0xFF; // ''
        esds[i++] = 0xFF; // ''
        esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // maxBitrate
        esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
        esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
        esds[i++] = representation.bandwidth & 0x000000FF; // ''
        esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // avgbitrate
        esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
        esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
        esds[i++] = representation.bandwidth & 0x000000FF; // ''

        // DecoderSpecificInfo (see ISO/IEC 14496-1 (Systems))
        esds[i++] = 0x05; // tag = 0x05 (DecSpecificInfoTag)
        esds[i++] = audioSpecificConfig.length; // size
        esds.set(audioSpecificConfig, i); // AudioSpecificConfig bytes

        return esds;
    }

    function createOriginalFormatBox(sinf, codec) {
        var frma = ISOBoxer.createBox('frma', sinf);
        frma.data_format = stringToCharCode(codec);
    }

    function createSchemeTypeBox(sinf) {
        var schm = ISOBoxer.createFullBox('schm', sinf);

        schm.flags = 0;
        schm.version = 0;
        schm.scheme_type = 0x63656E63; // 'cenc' => common encryption
        schm.scheme_version = 0x00010000; // version set to 0x00010000 (Major version 1, Minor version 0)
    }

    function createSchemeInformationBox(sinf) {
        var schi = ISOBoxer.createBox('schi', sinf);

        // Create and add Track Encryption Box
        createTrackEncryptionBox(schi);
    }

    function createProtectionSystemSpecificHeaderBox(moov, keySystems) {
        var pssh_bytes = undefined,
            pssh = undefined,
            i = undefined,
            parsedBuffer = undefined;

        for (i = 0; i < keySystems.length; i += 1) {
            pssh_bytes = keySystems[i].initData;
            if (pssh_bytes) {
                parsedBuffer = ISOBoxer.parseBuffer(pssh_bytes);
                pssh = parsedBuffer.fetch('pssh');
                if (pssh) {
                    ISOBoxer.Utils.appendBox(moov, pssh);
                }
            }
        }
    }

    function createTrackEncryptionBox(schi) {
        var tenc = ISOBoxer.createFullBox('tenc', schi);

        tenc.flags = 0;
        tenc.version = 0;

        tenc.default_IsEncrypted = 0x1;
        tenc.default_IV_size = 8;
        tenc.default_KID = contentProtection && contentProtection.length > 0 && contentProtection[0]['cenc:default_KID'] ? contentProtection[0]['cenc:default_KID'] : [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
    }

    function createTrexBox(moov) {
        var trex = ISOBoxer.createFullBox('trex', moov);

        trex.track_ID = trackId;
        trex.default_sample_description_index = 1;
        trex.default_sample_duration = 0;
        trex.default_sample_size = 0;
        trex.default_sample_flags = 0;

        return trex;
    }

    function hexStringtoBuffer(str) {
        var buf = new Uint8Array(str.length / 2);
        var i = undefined;

        for (i = 0; i < str.length / 2; i += 1) {
            buf[i] = parseInt('' + str[i * 2] + str[i * 2 + 1], 16);
        }
        return buf;
    }

    function stringToCharCode(str) {
        var code = 0;
        var i = undefined;

        for (i = 0; i < str.length; i += 1) {
            code |= str.charCodeAt(i) << (str.length - i - 1) * 8;
        }
        return code;
    }

    function generateMoov(rep) {
        if (!rep || !rep.adaptation) {
            return;
        }

        var isoFile = undefined,
            arrayBuffer = undefined;

        representation = rep;
        adaptationSet = representation.adaptation;

        period = adaptationSet.period;
        trackId = adaptationSet.index + 1;
        contentProtection = period.mpd.manifest.Period_asArray[period.index].AdaptationSet_asArray[adaptationSet.index].ContentProtection;

        timescale = period.mpd.manifest.Period_asArray[period.index].AdaptationSet_asArray[adaptationSet.index].SegmentTemplate.timescale;

        isoFile = ISOBoxer.createFile();
        createFtypBox(isoFile);
        createMoovBox(isoFile);

        arrayBuffer = isoFile.write();

        return arrayBuffer;
    }

    instance = {
        generateMoov: generateMoov
    };

    return instance;
}

MssFragmentMoovProcessor.__dashjs_factory_name = 'MssFragmentMoovProcessor';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentMoovProcessor);
/* jshint ignore:line */
module.exports = exports['default'];

},{"./errors/MssErrors":10}],8:[function(_dereq_,module,exports){
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

var _MssFragmentMoofProcessor = _dereq_('./MssFragmentMoofProcessor');

var _MssFragmentMoofProcessor2 = _interopRequireDefault(_MssFragmentMoofProcessor);

var _MssFragmentMoovProcessor = _dereq_('./MssFragmentMoovProcessor');

var _MssFragmentMoovProcessor2 = _interopRequireDefault(_MssFragmentMoovProcessor);

var _MssEvents = _dereq_('./MssEvents');

var _MssEvents2 = _interopRequireDefault(_MssEvents);

// Add specific box processors not provided by codem-isoboxer library

function arrayEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every(function (element, index) {
        return element === arr2[index];
    });
}

function saioProcessor() {
    this._procFullBox();
    if (this.flags & 1) {
        this._procField('aux_info_type', 'uint', 32);
        this._procField('aux_info_type_parameter', 'uint', 32);
    }
    this._procField('entry_count', 'uint', 32);
    this._procFieldArray('offset', this.entry_count, 'uint', this.version === 1 ? 64 : 32);
}

function saizProcessor() {
    this._procFullBox();
    if (this.flags & 1) {
        this._procField('aux_info_type', 'uint', 32);
        this._procField('aux_info_type_parameter', 'uint', 32);
    }
    this._procField('default_sample_info_size', 'uint', 8);
    this._procField('sample_count', 'uint', 32);
    if (this.default_sample_info_size === 0) {
        this._procFieldArray('sample_info_size', this.sample_count, 'uint', 8);
    }
}

function sencProcessor() {
    this._procFullBox();
    this._procField('sample_count', 'uint', 32);
    if (this.flags & 1) {
        this._procField('IV_size', 'uint', 8);
    }
    this._procEntries('entry', this.sample_count, function (entry) {
        this._procEntryField(entry, 'InitializationVector', 'data', 8);
        if (this.flags & 2) {
            this._procEntryField(entry, 'NumberOfEntries', 'uint', 16);
            this._procSubEntries(entry, 'clearAndCryptedData', entry.NumberOfEntries, function (clearAndCryptedData) {
                this._procEntryField(clearAndCryptedData, 'BytesOfClearData', 'uint', 16);
                this._procEntryField(clearAndCryptedData, 'BytesOfEncryptedData', 'uint', 32);
            });
        }
    });
}

function uuidProcessor() {
    var tfxdUserType = [0x6D, 0x1D, 0x9B, 0x05, 0x42, 0xD5, 0x44, 0xE6, 0x80, 0xE2, 0x14, 0x1D, 0xAF, 0xF7, 0x57, 0xB2];
    var tfrfUserType = [0xD4, 0x80, 0x7E, 0xF2, 0xCA, 0x39, 0x46, 0x95, 0x8E, 0x54, 0x26, 0xCB, 0x9E, 0x46, 0xA7, 0x9F];
    var sepiffUserType = [0xA2, 0x39, 0x4F, 0x52, 0x5A, 0x9B, 0x4f, 0x14, 0xA2, 0x44, 0x6C, 0x42, 0x7C, 0x64, 0x8D, 0xF4];

    if (arrayEqual(this.usertype, tfxdUserType)) {
        this._procFullBox();
        if (this._parsing) {
            this.type = 'tfxd';
        }
        this._procField('fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
        this._procField('fragment_duration', 'uint', this.version === 1 ? 64 : 32);
    }

    if (arrayEqual(this.usertype, tfrfUserType)) {
        this._procFullBox();
        if (this._parsing) {
            this.type = 'tfrf';
        }
        this._procField('fragment_count', 'uint', 8);
        this._procEntries('entry', this.fragment_count, function (entry) {
            this._procEntryField(entry, 'fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
            this._procEntryField(entry, 'fragment_duration', 'uint', this.version === 1 ? 64 : 32);
        });
    }

    if (arrayEqual(this.usertype, sepiffUserType)) {
        if (this._parsing) {
            this.type = 'sepiff';
        }
        sencProcessor.call(this);
    }
}

function MssFragmentProcessor(config) {

    config = config || {};
    var context = this.context;
    var dashMetrics = config.dashMetrics;
    var playbackController = config.playbackController;
    var eventBus = config.eventBus;
    var protectionController = config.protectionController;
    var ISOBoxer = config.ISOBoxer;
    var debug = config.debug;
    var mssFragmentMoovProcessor = undefined,
        mssFragmentMoofProcessor = undefined,
        instance = undefined;

    function setup() {
        ISOBoxer.addBoxProcessor('uuid', uuidProcessor);
        ISOBoxer.addBoxProcessor('saio', saioProcessor);
        ISOBoxer.addBoxProcessor('saiz', saizProcessor);
        ISOBoxer.addBoxProcessor('senc', sencProcessor);

        mssFragmentMoovProcessor = (0, _MssFragmentMoovProcessor2['default'])(context).create({ protectionController: protectionController,
            constants: config.constants, ISOBoxer: ISOBoxer });

        mssFragmentMoofProcessor = (0, _MssFragmentMoofProcessor2['default'])(context).create({
            dashMetrics: dashMetrics,
            playbackController: playbackController,
            ISOBoxer: ISOBoxer,
            eventBus: eventBus,
            debug: debug,
            errHandler: config.errHandler
        });
    }

    function generateMoov(rep) {
        return mssFragmentMoovProcessor.generateMoov(rep);
    }

    function processFragment(e, sp) {
        if (!e || !e.request || !e.response) {
            throw new Error('e parameter is missing or malformed');
        }

        var request = e.request;

        if (request.type === 'MediaSegment') {
            // it's a MediaSegment, let's convert fragment
            mssFragmentMoofProcessor.convertFragment(e, sp);
        } else if (request.type === 'FragmentInfoSegment') {

            // it's a FragmentInfo, ask relative fragment info controller to handle it
            eventBus.trigger(_MssEvents2['default'].FRAGMENT_INFO_LOADING_COMPLETED, {
                fragmentInfo: e,
                streamProcessor: sp
            });

            // Change the sender value to stop event to be propagated (fragment info must not be added to buffer)
            e.sender = null;
        }
    }

    instance = {
        generateMoov: generateMoov,
        processFragment: processFragment
    };

    setup();

    return instance;
}

MssFragmentProcessor.__dashjs_factory_name = 'MssFragmentProcessor';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentProcessor);
/* jshint ignore:line */
module.exports = exports['default'];

},{"./MssEvents":4,"./MssFragmentMoofProcessor":6,"./MssFragmentMoovProcessor":7}],9:[function(_dereq_,module,exports){
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

var _streamingVoDataChunk = _dereq_('../streaming/vo/DataChunk');

var _streamingVoDataChunk2 = _interopRequireDefault(_streamingVoDataChunk);

var _streamingVoFragmentRequest = _dereq_('../streaming/vo/FragmentRequest');

var _streamingVoFragmentRequest2 = _interopRequireDefault(_streamingVoFragmentRequest);

var _MssFragmentInfoController = _dereq_('./MssFragmentInfoController');

var _MssFragmentInfoController2 = _interopRequireDefault(_MssFragmentInfoController);

var _MssFragmentProcessor = _dereq_('./MssFragmentProcessor');

var _MssFragmentProcessor2 = _interopRequireDefault(_MssFragmentProcessor);

var _parserMssParser = _dereq_('./parser/MssParser');

var _parserMssParser2 = _interopRequireDefault(_parserMssParser);

var _errorsMssErrors = _dereq_('./errors/MssErrors');

var _errorsMssErrors2 = _interopRequireDefault(_errorsMssErrors);

var _streamingVoDashJSError = _dereq_('../streaming/vo/DashJSError');

var _streamingVoDashJSError2 = _interopRequireDefault(_streamingVoDashJSError);

function MssHandler(config) {

    config = config || {};
    var context = this.context;
    var eventBus = config.eventBus;
    var events = config.events;
    var constants = config.constants;
    var initSegmentType = config.initSegmentType;
    var dashMetrics = config.dashMetrics;
    var playbackController = config.playbackController;
    var protectionController = config.protectionController;
    var mssFragmentProcessor = (0, _MssFragmentProcessor2['default'])(context).create({
        dashMetrics: dashMetrics,
        playbackController: playbackController,
        protectionController: protectionController,
        eventBus: eventBus,
        constants: constants,
        ISOBoxer: config.ISOBoxer,
        debug: config.debug,
        errHandler: config.errHandler
    });
    var mssParser = undefined,
        instance = undefined;

    function setup() {}

    function onInitializationRequested(e) {
        var streamProcessor = e.sender.getStreamProcessor();
        var request = new _streamingVoFragmentRequest2['default']();
        var representationController = streamProcessor.getRepresentationController();
        var representation = representationController.getCurrentRepresentation();

        request.mediaType = representation.adaptation.type;
        request.type = initSegmentType;
        request.range = representation.range;
        request.quality = representation.index;
        request.mediaInfo = streamProcessor.getMediaInfo();
        request.representationId = representation.id;

        var chunk = createDataChunk(request, streamProcessor.getStreamInfo().id, e.type !== events.FRAGMENT_LOADING_PROGRESS);

        try {
            // Generate initialization segment (moov)
            chunk.bytes = mssFragmentProcessor.generateMoov(representation);
        } catch (e) {
            config.errHandler.error(new _streamingVoDashJSError2['default'](e.code, e.message, e.data));
        }

        eventBus.trigger(events.INIT_FRAGMENT_LOADED, {
            chunk: chunk,
            fragmentModel: streamProcessor.getFragmentModel()
        });

        // Change the sender value to stop event to be propagated
        e.sender = null;
    }

    function createDataChunk(request, streamId, endFragment) {
        var chunk = new _streamingVoDataChunk2['default']();

        chunk.streamId = streamId;
        chunk.mediaInfo = request.mediaInfo;
        chunk.segmentType = request.type;
        chunk.start = request.startTime;
        chunk.duration = request.duration;
        chunk.end = chunk.start + chunk.duration;
        chunk.index = request.index;
        chunk.quality = request.quality;
        chunk.representationId = request.representationId;
        chunk.endFragment = endFragment;

        return chunk;
    }

    function startFragmentInfoControllers() {

        var streamController = playbackController.getStreamController();
        if (!streamController) {
            return;
        }

        // Create MssFragmentInfoControllers for each StreamProcessor of active stream (only for audio, video or fragmentedText)
        var processors = streamController.getActiveStreamProcessors();
        processors.forEach(function (processor) {
            if (processor.getType() === constants.VIDEO || processor.getType() === constants.AUDIO || processor.getType() === constants.FRAGMENTED_TEXT) {

                // Check MssFragmentInfoController already registered to StreamProcessor
                var i = undefined;
                var alreadyRegistered = false;
                var externalControllers = processor.getExternalControllers();
                for (i = 0; i < externalControllers.length; i++) {
                    if (externalControllers[i].controllerType && externalControllers[i].controllerType === 'MssFragmentInfoController') {
                        alreadyRegistered = true;
                    }
                }

                if (!alreadyRegistered) {
                    var fragmentInfoController = (0, _MssFragmentInfoController2['default'])(context).create({
                        streamProcessor: processor,
                        eventBus: eventBus,
                        dashMetrics: dashMetrics,
                        playbackController: playbackController,
                        baseURLController: config.baseURLController,
                        ISOBoxer: config.ISOBoxer,
                        debug: config.debug
                    });
                    fragmentInfoController.initialize();
                    fragmentInfoController.start();
                }
            }
        });
    }

    function onSegmentMediaLoaded(e) {
        if (e.error) {
            return;
        }
        // Process moof to transcode it from MSS to DASH
        var streamProcessor = e.sender.getStreamProcessor();
        mssFragmentProcessor.processFragment(e, streamProcessor);

        // Start MssFragmentInfoControllers in case of start-over streams
        var streamInfo = streamProcessor.getStreamInfo();
        if (!streamInfo.manifestInfo.isDynamic && streamInfo.manifestInfo.DVRWindowSize !== Infinity) {
            startFragmentInfoControllers();
        }
    }

    function onPlaybackPaused() {
        if (playbackController.getIsDynamic() && playbackController.getTime() !== 0) {
            startFragmentInfoControllers();
        }
    }

    function onPlaybackSeekAsked() {
        if (playbackController.getIsDynamic() && playbackController.getTime() !== 0) {
            startFragmentInfoControllers();
        }
    }

    function onTTMLPreProcess(ttmlSubtitles) {
        if (!ttmlSubtitles || !ttmlSubtitles.data) {
            return;
        }

        ttmlSubtitles.data = ttmlSubtitles.data.replace(/http:\/\/www.w3.org\/2006\/10\/ttaf1/gi, 'http://www.w3.org/ns/ttml');
    }

    function registerEvents() {
        eventBus.on(events.INIT_REQUESTED, onInitializationRequested, instance, dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH); /* jshint ignore:line */
        eventBus.on(events.PLAYBACK_PAUSED, onPlaybackPaused, instance, dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH); /* jshint ignore:line */
        eventBus.on(events.PLAYBACK_SEEK_ASKED, onPlaybackSeekAsked, instance, dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH); /* jshint ignore:line */
        eventBus.on(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, instance, dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH); /* jshint ignore:line */
        eventBus.on(events.TTML_TO_PARSE, onTTMLPreProcess, instance);
    }

    function reset() {
        eventBus.off(events.INIT_REQUESTED, onInitializationRequested, this);
        eventBus.off(events.PLAYBACK_PAUSED, onPlaybackPaused, this);
        eventBus.off(events.PLAYBACK_SEEK_ASKED, onPlaybackSeekAsked, this);
        eventBus.off(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, this);
        eventBus.off(events.TTML_TO_PARSE, onTTMLPreProcess, this);
    }

    function createMssParser() {
        mssParser = (0, _parserMssParser2['default'])(context).create(config);
        return mssParser;
    }

    instance = {
        reset: reset,
        createMssParser: createMssParser,
        registerEvents: registerEvents
    };

    setup();

    return instance;
}

MssHandler.__dashjs_factory_name = 'MssHandler';
var factory = dashjs.FactoryMaker.getClassFactory(MssHandler); /* jshint ignore:line */
factory.errors = _errorsMssErrors2['default'];
dashjs.FactoryMaker.updateClassFactory(MssHandler.__dashjs_factory_name, factory); /* jshint ignore:line */
exports['default'] = factory;
/* jshint ignore:line */
module.exports = exports['default'];

},{"../streaming/vo/DashJSError":14,"../streaming/vo/DataChunk":15,"../streaming/vo/FragmentRequest":16,"./MssFragmentInfoController":5,"./MssFragmentProcessor":8,"./errors/MssErrors":10,"./parser/MssParser":12}],10:[function(_dereq_,module,exports){
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreErrorsErrorsBase = _dereq_('../../core/errors/ErrorsBase');

var _coreErrorsErrorsBase2 = _interopRequireDefault(_coreErrorsErrorsBase);

/**
 * @class
 *
 */

var MssErrors = (function (_ErrorsBase) {
  _inherits(MssErrors, _ErrorsBase);

  function MssErrors() {
    _classCallCheck(this, MssErrors);

    _get(Object.getPrototypeOf(MssErrors.prototype), 'constructor', this).call(this);
    /**
     * Error code returned when no tfrf box is detected in MSS live stream
     */
    this.MSS_NO_TFRF_CODE = 200;

    /**
     * Error code returned when one of the codecs defined in the manifest is not supported
     */
    this.MSS_UNSUPPORTED_CODEC_CODE = 201;

    this.MSS_NO_TFRF_MESSAGE = 'Missing tfrf in live media segment';
    this.MSS_UNSUPPORTED_CODEC_MESSAGE = 'Unsupported codec';
  }

  return MssErrors;
})(_coreErrorsErrorsBase2['default']);

var mssErrors = new MssErrors();
exports['default'] = mssErrors;
module.exports = exports['default'];

},{"../../core/errors/ErrorsBase":2}],11:[function(_dereq_,module,exports){
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

var _MssHandler = _dereq_('./MssHandler');

var _MssHandler2 = _interopRequireDefault(_MssHandler);

// Shove both of these into the global scope
var context = typeof window !== 'undefined' && window || global;

var dashjs = context.dashjs;
if (!dashjs) {
  dashjs = context.dashjs = {};
}

dashjs.MssHandler = _MssHandler2['default'];

exports['default'] = dashjs;
exports.MssHandler = _MssHandler2['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./MssHandler":9}],12:[function(_dereq_,module,exports){
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
 * @module MssParser
 * @ignore
 * @param {Object} config object
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _externalsBigInteger = _dereq_('../../../externals/BigInteger');

var _externalsBigInteger2 = _interopRequireDefault(_externalsBigInteger);

function MssParser(config) {
    config = config || {};
    var BASE64 = config.BASE64;
    var debug = config.debug;
    var constants = config.constants;
    var manifestModel = config.manifestModel;
    var mediaPlayerModel = config.mediaPlayerModel;
    var settings = config.settings;

    var DEFAULT_TIME_SCALE = 10000000.0;
    var SUPPORTED_CODECS = ['AAC', 'AACL', 'AVC1', 'H264', 'TTML', 'DFXP'];
    // MPEG-DASH Role and accessibility mapping for text tracks according to ETSI TS 103 285 v1.1.1 (section 7.1.2)
    var ROLE = {
        'CAPT': 'main',
        'SUBT': 'alternate',
        'DESC': 'main'
    };
    var ACCESSIBILITY = {
        'DESC': '2'
    };
    var samplingFrequencyIndex = {
        96000: 0x0,
        88200: 0x1,
        64000: 0x2,
        48000: 0x3,
        44100: 0x4,
        32000: 0x5,
        24000: 0x6,
        22050: 0x7,
        16000: 0x8,
        12000: 0x9,
        11025: 0xA,
        8000: 0xB,
        7350: 0xC
    };
    var mimeTypeMap = {
        'video': 'video/mp4',
        'audio': 'audio/mp4',
        'text': 'application/mp4'
    };

    var instance = undefined,
        logger = undefined;

    function setup() {
        logger = debug.getLogger(instance);
    }

    function mapPeriod(smoothStreamingMedia, timescale) {
        var period = {};
        var streams = undefined,
            adaptation = undefined;

        // For each StreamIndex node, create an AdaptationSet element
        period.AdaptationSet_asArray = [];
        streams = smoothStreamingMedia.getElementsByTagName('StreamIndex');
        for (var i = 0; i < streams.length; i++) {
            adaptation = mapAdaptationSet(streams[i], timescale);
            if (adaptation !== null) {
                period.AdaptationSet_asArray.push(adaptation);
            }
        }

        if (period.AdaptationSet_asArray.length > 0) {
            period.AdaptationSet = period.AdaptationSet_asArray.length > 1 ? period.AdaptationSet_asArray : period.AdaptationSet_asArray[0];
        }

        return period;
    }

    function mapAdaptationSet(streamIndex, timescale) {
        var adaptationSet = {};
        var representations = [];
        var segmentTemplate = undefined;
        var qualityLevels = undefined,
            representation = undefined,
            segments = undefined,
            i = undefined;

        var name = streamIndex.getAttribute('Name');
        var type = streamIndex.getAttribute('Type');
        var lang = streamIndex.getAttribute('Language');
        var fallBackId = lang ? type + '_' + lang : type;

        adaptationSet.id = name || fallBackId;
        adaptationSet.contentType = type;
        adaptationSet.lang = lang || 'und';
        adaptationSet.mimeType = mimeTypeMap[type];
        adaptationSet.subType = streamIndex.getAttribute('Subtype');
        adaptationSet.maxWidth = streamIndex.getAttribute('MaxWidth');
        adaptationSet.maxHeight = streamIndex.getAttribute('MaxHeight');

        // Map text tracks subTypes to MPEG-DASH AdaptationSet role and accessibility (see ETSI TS 103 285 v1.1.1, section 7.1.2)
        if (adaptationSet.subType) {
            if (ROLE[adaptationSet.subType]) {
                var role = {
                    schemeIdUri: 'urn:mpeg:dash:role:2011',
                    value: ROLE[adaptationSet.subType]
                };
                adaptationSet.Role = role;
                adaptationSet.Role_asArray = [role];
            }
            if (ACCESSIBILITY[adaptationSet.subType]) {
                var accessibility = {
                    schemeIdUri: 'urn:tva:metadata:cs:AudioPurposeCS:2007',
                    value: ACCESSIBILITY[adaptationSet.subType]
                };
                adaptationSet.Accessibility = accessibility;
                adaptationSet.Accessibility_asArray = [accessibility];
            }
        }

        // Create a SegmentTemplate with a SegmentTimeline
        segmentTemplate = mapSegmentTemplate(streamIndex, timescale);

        qualityLevels = streamIndex.getElementsByTagName('QualityLevel');
        // For each QualityLevel node, create a Representation element
        for (i = 0; i < qualityLevels.length; i++) {
            // Propagate BaseURL and mimeType
            qualityLevels[i].BaseURL = adaptationSet.BaseURL;
            qualityLevels[i].mimeType = adaptationSet.mimeType;

            // Set quality level id
            qualityLevels[i].Id = adaptationSet.id + '_' + qualityLevels[i].getAttribute('Index');

            // Map Representation to QualityLevel
            representation = mapRepresentation(qualityLevels[i], streamIndex);

            if (representation !== null) {
                // Copy SegmentTemplate into Representation
                representation.SegmentTemplate = segmentTemplate;

                representations.push(representation);
            }
        }

        if (representations.length === 0) {
            return null;
        }

        adaptationSet.Representation = representations.length > 1 ? representations : representations[0];
        adaptationSet.Representation_asArray = representations;

        // Set SegmentTemplate
        adaptationSet.SegmentTemplate = segmentTemplate;

        segments = segmentTemplate.SegmentTimeline.S_asArray;

        return adaptationSet;
    }

    function mapRepresentation(qualityLevel, streamIndex) {
        var representation = {};
        var type = streamIndex.getAttribute('Type');
        var fourCCValue = null;

        representation.id = qualityLevel.Id;
        representation.bandwidth = parseInt(qualityLevel.getAttribute('Bitrate'), 10);
        representation.mimeType = qualityLevel.mimeType;
        representation.width = parseInt(qualityLevel.getAttribute('MaxWidth'), 10);
        representation.height = parseInt(qualityLevel.getAttribute('MaxHeight'), 10);

        fourCCValue = qualityLevel.getAttribute('FourCC');

        // If FourCC not defined at QualityLevel level, then get it from StreamIndex level
        if (fourCCValue === null || fourCCValue === '') {
            fourCCValue = streamIndex.getAttribute('FourCC');
        }

        // If still not defined (optionnal for audio stream, see https://msdn.microsoft.com/en-us/library/ff728116%28v=vs.95%29.aspx),
        // then we consider the stream is an audio AAC stream
        if (fourCCValue === null || fourCCValue === '') {
            if (type === constants.AUDIO) {
                fourCCValue = 'AAC';
            } else if (type === constants.VIDEO) {
                logger.debug('FourCC is not defined whereas it is required for a QualityLevel element for a StreamIndex of type "video"');
                return null;
            }
        }

        // Check if codec is supported
        if (SUPPORTED_CODECS.indexOf(fourCCValue.toUpperCase()) === -1) {
            // Do not send warning
            logger.warn('Codec not supported: ' + fourCCValue);
            return null;
        }

        // Get codecs value according to FourCC field
        if (fourCCValue === 'H264' || fourCCValue === 'AVC1') {
            representation.codecs = getH264Codec(qualityLevel);
        } else if (fourCCValue.indexOf('AAC') >= 0) {
            representation.codecs = getAACCodec(qualityLevel, fourCCValue);
            representation.audioSamplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
            representation.audioChannels = parseInt(qualityLevel.getAttribute('Channels'), 10);
        } else if (fourCCValue.indexOf('TTML') || fourCCValue.indexOf('DFXP')) {
            representation.codecs = constants.STPP;
        }

        representation.codecPrivateData = '' + qualityLevel.getAttribute('CodecPrivateData');
        representation.BaseURL = qualityLevel.BaseURL;

        return representation;
    }

    function getH264Codec(qualityLevel) {
        var codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
        var nalHeader = undefined,
            avcoti = undefined;

        // Extract from the CodecPrivateData field the hexadecimal representation of the following
        // three bytes in the sequence parameter set NAL unit.
        // => Find the SPS nal header
        nalHeader = /00000001[0-9]7/.exec(codecPrivateData);
        // => Find the 6 characters after the SPS nalHeader (if it exists)
        avcoti = nalHeader && nalHeader[0] ? codecPrivateData.substr(codecPrivateData.indexOf(nalHeader[0]) + 10, 6) : undefined;

        return 'avc1.' + avcoti;
    }

    function getAACCodec(qualityLevel, fourCCValue) {
        var samplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
        var codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
        var objectType = 0;
        var codecPrivateDataHex = undefined,
            arr16 = undefined,
            indexFreq = undefined,
            extensionSamplingFrequencyIndex = undefined;

        //chrome problem, in implicit AAC HE definition, so when AACH is detected in FourCC
        //set objectType to 5 => strange, it should be 2
        if (fourCCValue === 'AACH') {
            objectType = 0x05;
        }
        //if codecPrivateData is empty, build it :
        if (codecPrivateData === undefined || codecPrivateData === '') {
            objectType = 0x02; //AAC Main Low Complexity => object Type = 2
            indexFreq = samplingFrequencyIndex[samplingRate];
            if (fourCCValue === 'AACH') {
                // 4 bytes :     XXXXX         XXXX          XXXX             XXXX                  XXXXX      XXX   XXXXXXX
                //           ' ObjectType' 'Freq Index' 'Channels value'   'Extens Sampl Freq'  'ObjectType'  'GAS' 'alignment = 0'
                objectType = 0x05; // High Efficiency AAC Profile = object Type = 5 SBR
                codecPrivateData = new Uint8Array(4);
                extensionSamplingFrequencyIndex = samplingFrequencyIndex[samplingRate * 2]; // in HE AAC Extension Sampling frequence
                // equals to SamplingRate*2
                //Freq Index is present for 3 bits in the first byte, last bit is in the second
                codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
                codecPrivateData[1] = indexFreq << 7 | qualityLevel.Channels << 3 | extensionSamplingFrequencyIndex >> 1;
                codecPrivateData[2] = extensionSamplingFrequencyIndex << 7 | 0x02 << 2; // origin object type equals to 2 => AAC Main Low Complexity
                codecPrivateData[3] = 0x0; //alignment bits

                arr16 = new Uint16Array(2);
                arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
                arr16[1] = (codecPrivateData[2] << 8) + codecPrivateData[3];
                //convert decimal to hex value
                codecPrivateDataHex = arr16[0].toString(16);
                codecPrivateDataHex = arr16[0].toString(16) + arr16[1].toString(16);
            } else {
                // 2 bytes :     XXXXX         XXXX          XXXX              XXX
                //           ' ObjectType' 'Freq Index' 'Channels value'   'GAS = 000'
                codecPrivateData = new Uint8Array(2);
                //Freq Index is present for 3 bits in the first byte, last bit is in the second
                codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
                codecPrivateData[1] = indexFreq << 7 | parseInt(qualityLevel.getAttribute('Channels'), 10) << 3;
                // put the 2 bytes in an 16 bits array
                arr16 = new Uint16Array(1);
                arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
                //convert decimal to hex value
                codecPrivateDataHex = arr16[0].toString(16);
            }

            codecPrivateData = '' + codecPrivateDataHex;
            codecPrivateData = codecPrivateData.toUpperCase();
            qualityLevel.setAttribute('CodecPrivateData', codecPrivateData);
        } else if (objectType === 0) {
            objectType = (parseInt(codecPrivateData.substr(0, 2), 16) & 0xF8) >> 3;
        }

        return 'mp4a.40.' + objectType;
    }

    function mapSegmentTemplate(streamIndex, timescale) {
        var segmentTemplate = {};
        var mediaUrl = undefined,
            streamIndexTimeScale = undefined,
            url = undefined;

        url = streamIndex.getAttribute('Url');
        mediaUrl = url ? url.replace('{bitrate}', '$Bandwidth$') : null;
        mediaUrl = mediaUrl ? mediaUrl.replace('{start time}', '$Time$') : null;

        streamIndexTimeScale = streamIndex.getAttribute('TimeScale');
        streamIndexTimeScale = streamIndexTimeScale ? parseFloat(streamIndexTimeScale) : timescale;

        segmentTemplate.media = mediaUrl;
        segmentTemplate.timescale = streamIndexTimeScale;

        segmentTemplate.SegmentTimeline = mapSegmentTimeline(streamIndex, segmentTemplate.timescale);

        return segmentTemplate;
    }

    function mapSegmentTimeline(streamIndex, timescale) {
        var segmentTimeline = {};
        var chunks = streamIndex.getElementsByTagName('c');
        var segments = [];
        var segment = undefined,
            prevSegment = undefined,
            tManifest = undefined,
            i = undefined,
            j = undefined,
            r = undefined;
        var duration = 0;

        for (i = 0; i < chunks.length; i++) {
            segment = {};

            // Get time 't' attribute value
            tManifest = chunks[i].getAttribute('t');

            // => segment.tManifest = original timestamp value as a string (for constructing the fragment request url, see DashHandler)
            // => segment.t = number value of timestamp (maybe rounded value, but only for 0.1 microsecond)
            if (tManifest && (0, _externalsBigInteger2['default'])(tManifest).greater((0, _externalsBigInteger2['default'])(Number.MAX_SAFE_INTEGER))) {
                segment.tManifest = tManifest;
            }
            segment.t = parseFloat(tManifest);

            // Get duration 'd' attribute value
            segment.d = parseFloat(chunks[i].getAttribute('d'));

            // If 't' not defined for first segment then t=0
            if (i === 0 && !segment.t) {
                segment.t = 0;
            }

            if (i > 0) {
                prevSegment = segments[segments.length - 1];
                // Update previous segment duration if not defined
                if (!prevSegment.d) {
                    if (prevSegment.tManifest) {
                        prevSegment.d = (0, _externalsBigInteger2['default'])(tManifest).subtract((0, _externalsBigInteger2['default'])(prevSegment.tManifest)).toJSNumber();
                    } else {
                        prevSegment.d = segment.t - prevSegment.t;
                    }
                    duration += prevSegment.d;
                }
                // Set segment absolute timestamp if not set in manifest
                if (!segment.t) {
                    if (prevSegment.tManifest) {
                        segment.tManifest = (0, _externalsBigInteger2['default'])(prevSegment.tManifest).add((0, _externalsBigInteger2['default'])(prevSegment.d)).toString();
                        segment.t = parseFloat(segment.tManifest);
                    } else {
                        segment.t = prevSegment.t + prevSegment.d;
                    }
                }
            }

            if (segment.d) {
                duration += segment.d;
            }

            // Create new segment
            segments.push(segment);

            // Support for 'r' attribute (i.e. "repeat" as in MPEG-DASH)
            r = parseFloat(chunks[i].getAttribute('r'));
            if (r) {

                for (j = 0; j < r - 1; j++) {
                    prevSegment = segments[segments.length - 1];
                    segment = {};
                    segment.t = prevSegment.t + prevSegment.d;
                    segment.d = prevSegment.d;
                    if (prevSegment.tManifest) {
                        segment.tManifest = (0, _externalsBigInteger2['default'])(prevSegment.tManifest).add((0, _externalsBigInteger2['default'])(prevSegment.d)).toString();
                    }
                    duration += segment.d;
                    segments.push(segment);
                }
            }
        }

        segmentTimeline.S = segments;
        segmentTimeline.S_asArray = segments;
        segmentTimeline.duration = duration / timescale;

        return segmentTimeline;
    }

    function getKIDFromProtectionHeader(protectionHeader) {
        var prHeader = undefined,
            wrmHeader = undefined,
            xmlReader = undefined,
            KID = undefined;

        // Get PlayReady header as byte array (base64 decoded)
        prHeader = BASE64.decodeArray(protectionHeader.firstChild.data);

        // Get Right Management header (WRMHEADER) from PlayReady header
        wrmHeader = getWRMHeaderFromPRHeader(prHeader);

        if (wrmHeader) {
            // Convert from multi-byte to unicode
            wrmHeader = new Uint16Array(wrmHeader.buffer);

            // Convert to string
            wrmHeader = String.fromCharCode.apply(null, wrmHeader);

            // Parse <WRMHeader> to get KID field value
            xmlReader = new DOMParser().parseFromString(wrmHeader, 'application/xml');
            KID = xmlReader.querySelector('KID').textContent;

            // Get KID (base64 decoded) as byte array
            KID = BASE64.decodeArray(KID);

            // Convert UUID from little-endian to big-endian
            convertUuidEndianness(KID);
        }

        return KID;
    }

    function getWRMHeaderFromPRHeader(prHeader) {
        var length = undefined,
            recordCount = undefined,
            recordType = undefined,
            recordLength = undefined,
            recordValue = undefined;
        var i = 0;

        // Parse PlayReady header

        // Length - 32 bits (LE format)
        length = (prHeader[i + 3] << 24) + (prHeader[i + 2] << 16) + (prHeader[i + 1] << 8) + prHeader[i];
        i += 4;

        // Record count - 16 bits (LE format)
        recordCount = (prHeader[i + 1] << 8) + prHeader[i];
        i += 2;

        // Parse records
        while (i < prHeader.length) {
            // Record type - 16 bits (LE format)
            recordType = (prHeader[i + 1] << 8) + prHeader[i];
            i += 2;

            // Check if Rights Management header (record type = 0x01)
            if (recordType === 0x01) {

                // Record length - 16 bits (LE format)
                recordLength = (prHeader[i + 1] << 8) + prHeader[i];
                i += 2;

                // Record value => contains <WRMHEADER>
                recordValue = new Uint8Array(recordLength);
                recordValue.set(prHeader.subarray(i, i + recordLength));
                return recordValue;
            }
        }

        return null;
    }

    function convertUuidEndianness(uuid) {
        swapBytes(uuid, 0, 3);
        swapBytes(uuid, 1, 2);
        swapBytes(uuid, 4, 5);
        swapBytes(uuid, 6, 7);
    }

    function swapBytes(bytes, pos1, pos2) {
        var temp = bytes[pos1];
        bytes[pos1] = bytes[pos2];
        bytes[pos2] = temp;
    }

    function createPRContentProtection(protectionHeader) {
        var pro = {
            __text: protectionHeader.firstChild.data,
            __prefix: 'mspr'
        };
        return {
            schemeIdUri: 'urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95',
            value: 'com.microsoft.playready',
            pro: pro,
            pro_asArray: pro
        };
    }

    function createWidevineContentProtection(KID) {
        var widevineCP = {
            schemeIdUri: 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
            value: 'com.widevine.alpha'
        };
        if (!KID) return widevineCP;
        // Create Widevine CENC header (Protocol Buffer) with KID value
        var wvCencHeader = new Uint8Array(2 + KID.length);
        wvCencHeader[0] = 0x12;
        wvCencHeader[1] = 0x10;
        wvCencHeader.set(KID, 2);

        // Create a pssh box
        var length = 12 /* box length, type, version and flags */ + 16 /* SystemID */ + 4 /* data length */ + wvCencHeader.length;
        var pssh = new Uint8Array(length);
        var i = 0;

        // Set box length value
        pssh[i++] = (length & 0xFF000000) >> 24;
        pssh[i++] = (length & 0x00FF0000) >> 16;
        pssh[i++] = (length & 0x0000FF00) >> 8;
        pssh[i++] = length & 0x000000FF;

        // Set type ('pssh'), version (0) and flags (0)
        pssh.set([0x70, 0x73, 0x73, 0x68, 0x00, 0x00, 0x00, 0x00], i);
        i += 8;

        // Set SystemID ('edef8ba9-79d6-4ace-a3c8-27dcd51d21ed')
        pssh.set([0xed, 0xef, 0x8b, 0xa9, 0x79, 0xd6, 0x4a, 0xce, 0xa3, 0xc8, 0x27, 0xdc, 0xd5, 0x1d, 0x21, 0xed], i);
        i += 16;

        // Set data length value
        pssh[i++] = (wvCencHeader.length & 0xFF000000) >> 24;
        pssh[i++] = (wvCencHeader.length & 0x00FF0000) >> 16;
        pssh[i++] = (wvCencHeader.length & 0x0000FF00) >> 8;
        pssh[i++] = wvCencHeader.length & 0x000000FF;

        // Copy Widevine CENC header
        pssh.set(wvCencHeader, i);

        // Convert to BASE64 string
        pssh = String.fromCharCode.apply(null, pssh);
        pssh = BASE64.encodeASCII(pssh);

        widevineCP.pssh = { __text: pssh };

        return widevineCP;
    }

    function processManifest(xmlDoc, manifestLoadedTime) {
        var manifest = {};
        var contentProtections = [];
        var smoothStreamingMedia = xmlDoc.getElementsByTagName('SmoothStreamingMedia')[0];
        var protection = xmlDoc.getElementsByTagName('Protection')[0];
        var protectionHeader = null;
        var period = undefined,
            adaptations = undefined,
            contentProtection = undefined,
            KID = undefined,
            timestampOffset = undefined,
            startTime = undefined,
            segments = undefined,
            timescale = undefined,
            segmentDuration = undefined,
            i = undefined,
            j = undefined;

        // Set manifest node properties
        manifest.protocol = 'MSS';
        manifest.profiles = 'urn:mpeg:dash:profile:isoff-live:2011';
        manifest.type = smoothStreamingMedia.getAttribute('IsLive') === 'TRUE' ? 'dynamic' : 'static';
        timescale = smoothStreamingMedia.getAttribute('TimeScale');
        manifest.timescale = timescale ? parseFloat(timescale) : DEFAULT_TIME_SCALE;
        var dvrWindowLength = parseFloat(smoothStreamingMedia.getAttribute('DVRWindowLength'));
        // If the DVRWindowLength field is omitted for a live presentation or set to 0, the DVR window is effectively infinite
        if (manifest.type === 'dynamic' && (dvrWindowLength === 0 || isNaN(dvrWindowLength))) {
            dvrWindowLength = Infinity;
        }
        // Star-over
        if (dvrWindowLength === 0 && smoothStreamingMedia.getAttribute('CanSeek') === 'TRUE') {
            dvrWindowLength = Infinity;
        }

        if (dvrWindowLength > 0) {
            manifest.timeShiftBufferDepth = dvrWindowLength / manifest.timescale;
        }

        var duration = parseFloat(smoothStreamingMedia.getAttribute('Duration'));
        manifest.mediaPresentationDuration = duration === 0 ? Infinity : duration / manifest.timescale;
        // By default, set minBufferTime to 2 sec. (but set below according to video segment duration)
        manifest.minBufferTime = 2;
        manifest.ttmlTimeIsRelative = true;

        // Live manifest with Duration = start-over
        if (manifest.type === 'dynamic' && duration > 0) {
            manifest.type = 'static';
            // We set timeShiftBufferDepth to initial duration, to be used by MssFragmentController to update segment timeline
            manifest.timeShiftBufferDepth = duration / manifest.timescale;
            // Duration will be set according to current segment timeline duration (see below)
        }

        if (manifest.type === 'dynamic' && manifest.timeShiftBufferDepth < Infinity) {
            manifest.refreshManifestOnSwitchTrack = true; // Refresh manifest when switching tracks
            manifest.doNotUpdateDVRWindowOnBufferUpdated = true; // DVRWindow is update by MssFragmentMoofPocessor based on tfrf boxes
            manifest.ignorePostponeTimePeriod = true; // Never update manifest
        }

        // Map period node to manifest root node
        manifest.Period = mapPeriod(smoothStreamingMedia, manifest.timescale);
        manifest.Period_asArray = [manifest.Period];

        // Initialize period start time
        period = manifest.Period;
        period.start = 0;

        // Uncomment to test live to static manifests
        // if (manifest.type !== 'static') {
        //     manifest.type = 'static';
        //     manifest.mediaPresentationDuration = manifest.timeShiftBufferDepth;
        //     manifest.timeShiftBufferDepth = null;
        // }

        // ContentProtection node
        if (protection !== undefined) {
            protectionHeader = xmlDoc.getElementsByTagName('ProtectionHeader')[0];

            // Some packagers put newlines into the ProtectionHeader base64 string, which is not good
            // because this cannot be correctly parsed. Let's just filter out any newlines found in there.
            protectionHeader.firstChild.data = protectionHeader.firstChild.data.replace(/\n|\r/g, '');

            // Get KID (in CENC format) from protection header
            KID = getKIDFromProtectionHeader(protectionHeader);

            // Create ContentProtection for PlayReady
            contentProtection = createPRContentProtection(protectionHeader);
            contentProtection['cenc:default_KID'] = KID;
            contentProtections.push(contentProtection);

            // Create ContentProtection for Widevine (as a CENC protection)
            contentProtection = createWidevineContentProtection(KID);
            contentProtection['cenc:default_KID'] = KID;
            contentProtections.push(contentProtection);

            manifest.ContentProtection = contentProtections;
            manifest.ContentProtection_asArray = contentProtections;
        }

        adaptations = period.AdaptationSet_asArray;

        for (i = 0; i < adaptations.length; i += 1) {
            adaptations[i].SegmentTemplate.initialization = '$Bandwidth$';
            // Propagate content protection information into each adaptation
            if (manifest.ContentProtection !== undefined) {
                adaptations[i].ContentProtection = manifest.ContentProtection;
                adaptations[i].ContentProtection_asArray = manifest.ContentProtection_asArray;
            }

            if (adaptations[i].contentType === 'video') {
                // Get video segment duration
                segmentDuration = adaptations[i].SegmentTemplate.SegmentTimeline.S_asArray[0].d / adaptations[i].SegmentTemplate.timescale;
                // Set minBufferTime
                manifest.minBufferTime = segmentDuration * 2;

                if (manifest.type === 'dynamic') {
                    // Set availabilityStartTime
                    segments = adaptations[i].SegmentTemplate.SegmentTimeline.S_asArray;
                    var endTime = (segments[segments.length - 1].t + segments[segments.length - 1].d) / adaptations[i].SegmentTemplate.timescale * 1000;
                    manifest.availabilityStartTime = new Date(manifestLoadedTime.getTime() - endTime);

                    // Match timeShiftBufferDepth to video segment timeline duration
                    if (manifest.timeShiftBufferDepth > 0 && manifest.timeShiftBufferDepth !== Infinity && manifest.timeShiftBufferDepth > adaptations[i].SegmentTemplate.SegmentTimeline.duration) {
                        manifest.timeShiftBufferDepth = adaptations[i].SegmentTemplate.SegmentTimeline.duration;
                    }
                }
            }
        }

        // Cap minBufferTime to timeShiftBufferDepth
        manifest.minBufferTime = Math.min(manifest.minBufferTime, manifest.timeShiftBufferDepth ? manifest.timeShiftBufferDepth : Infinity);

        // In case of live streams:
        // 1- configure player buffering properties according to target live delay
        // 2- adapt live delay and then buffers length in case timeShiftBufferDepth is too small compared to target live delay (see PlaybackController.computeLiveDelay())
        if (manifest.type === 'dynamic') {
            var targetLiveDelay = mediaPlayerModel.getLiveDelay();
            if (!targetLiveDelay) {
                var liveDelayFragmentCount = settings.get().streaming.liveDelayFragmentCount !== null && !isNaN(settings.get().streaming.liveDelayFragmentCount) ? settings.get().streaming.liveDelayFragmentCount : 4;
                targetLiveDelay = segmentDuration * liveDelayFragmentCount;
            }
            var targetDelayCapping = Math.max(manifest.timeShiftBufferDepth - 10, /*END_OF_PLAYLIST_PADDING*/manifest.timeShiftBufferDepth / 2);
            var liveDelay = Math.min(targetDelayCapping, targetLiveDelay);
            // Consider a margin of one segment in order to avoid Precondition Failed errors (412), for example if audio and video are not correctly synchronized
            var bufferTime = liveDelay - segmentDuration;
            settings.update({
                'streaming': {
                    'liveDelay': liveDelay,
                    'stableBufferTime': bufferTime,
                    'bufferTimeAtTopQuality': bufferTime,
                    'bufferTimeAtTopQualityLongForm': bufferTime
                }
            });
        }

        // Delete Content Protection under root manifest node
        delete manifest.ContentProtection;
        delete manifest.ContentProtection_asArray;

        // In case of VOD streams, check if start time is greater than 0
        // Then determine timestamp offset according to higher audio/video start time
        // (use case = live stream delinearization)
        if (manifest.type === 'static') {
            // In case of start-over stream and manifest reloading (due to track switch)
            // we consider previous timestampOffset to keep timelines synchronized
            var prevManifest = manifestModel.getValue();
            if (prevManifest && prevManifest.timestampOffset) {
                timestampOffset = prevManifest.timestampOffset;
            } else {
                for (i = 0; i < adaptations.length; i++) {
                    if (adaptations[i].contentType === constants.AUDIO || adaptations[i].contentType === constants.VIDEO) {
                        segments = adaptations[i].SegmentTemplate.SegmentTimeline.S_asArray;
                        startTime = segments[0].t / adaptations[i].SegmentTemplate.timescale;
                        if (timestampOffset === undefined) {
                            timestampOffset = startTime;
                        }
                        timestampOffset = Math.min(timestampOffset, startTime);
                        // Correct content duration according to minimum adaptation's segment timeline duration
                        // in order to force <video> element sending 'ended' event
                        manifest.mediaPresentationDuration = Math.min(manifest.mediaPresentationDuration, adaptations[i].SegmentTemplate.SegmentTimeline.duration);
                    }
                }
            }
            // Patch segment templates timestamps and determine period start time (since audio/video should not be aligned to 0)
            if (timestampOffset > 0) {
                manifest.timestampOffset = timestampOffset;
                for (i = 0; i < adaptations.length; i++) {
                    segments = adaptations[i].SegmentTemplate.SegmentTimeline.S_asArray;
                    for (j = 0; j < segments.length; j++) {
                        if (!segments[j].tManifest) {
                            segments[j].tManifest = segments[j].t;
                        }
                        segments[j].t -= timestampOffset * adaptations[i].SegmentTemplate.timescale;
                    }
                    if (adaptations[i].contentType === constants.AUDIO || adaptations[i].contentType === constants.VIDEO) {
                        period.start = Math.max(segments[0].t, period.start);
                        adaptations[i].SegmentTemplate.presentationTimeOffset = period.start;
                    }
                }
                period.start /= manifest.timescale;
            }
        }

        // Floor the duration to get around precision differences between segments timestamps and MSE buffer timestamps
        // and then avoid 'ended' event not being raised
        manifest.mediaPresentationDuration = Math.floor(manifest.mediaPresentationDuration * 1000) / 1000;
        period.duration = manifest.mediaPresentationDuration;

        return manifest;
    }

    function parseDOM(data) {
        var xmlDoc = null;

        if (window.DOMParser) {
            var parser = new window.DOMParser();

            xmlDoc = parser.parseFromString(data, 'text/xml');
            if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                throw new Error('parsing the manifest failed');
            }
        }

        return xmlDoc;
    }

    function getMatchers() {
        return null;
    }

    function getIron() {
        return null;
    }

    function internalParse(data) {
        var xmlDoc = null;
        var manifest = null;

        var startTime = window.performance.now();

        // Parse the MSS XML manifest
        xmlDoc = parseDOM(data);

        var xmlParseTime = window.performance.now();

        if (xmlDoc === null) {
            return null;
        }

        // Convert MSS manifest into DASH manifest
        manifest = processManifest(xmlDoc, new Date());

        var mss2dashTime = window.performance.now();

        logger.info('Parsing complete: (xmlParsing: ' + (xmlParseTime - startTime).toPrecision(3) + 'ms, mss2dash: ' + (mss2dashTime - xmlParseTime).toPrecision(3) + 'ms, total: ' + ((mss2dashTime - startTime) / 1000).toPrecision(3) + 's)');

        return manifest;
    }

    instance = {
        parse: internalParse,
        getMatchers: getMatchers,
        getIron: getIron
    };

    setup();

    return instance;
}

MssParser.__dashjs_factory_name = 'MssParser';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssParser);
/* jshint ignore:line */
module.exports = exports['default'];

},{"../../../externals/BigInteger":1}],13:[function(_dereq_,module,exports){
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreEventsEventsBase = _dereq_('../core/events/EventsBase');

var _coreEventsEventsBase2 = _interopRequireDefault(_coreEventsEventsBase);

/**
 * @class
 * @implements EventsBase
 */

var MediaPlayerEvents = (function (_EventsBase) {
  _inherits(MediaPlayerEvents, _EventsBase);

  /**
   * @description Public facing external events to be used when developing a player that implements dash.js.
   */

  function MediaPlayerEvents() {
    _classCallCheck(this, MediaPlayerEvents);

    _get(Object.getPrototypeOf(MediaPlayerEvents.prototype), 'constructor', this).call(this);
    /**
     * Triggered when playback will not start yet
     * as the MPD's availabilityStartTime is in the future.
     * Check delay property in payload to determine time before playback will start.
     * @event MediaPlayerEvents#AST_IN_FUTURE
     */
    this.AST_IN_FUTURE = 'astInFuture';

    /**
     * Triggered when the video element's buffer state changes to stalled.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_EMPTY
     */
    this.BUFFER_EMPTY = 'bufferStalled';

    /**
     * Triggered when the video element's buffer state changes to loaded.
     * Check mediaType in payload to determine type (Video, Audio, FragmentedText).
     * @event MediaPlayerEvents#BUFFER_LOADED
     */
    this.BUFFER_LOADED = 'bufferLoaded';

    /**
     * Triggered when the video element's buffer state changes, either stalled or loaded. Check payload for state.
     * @event MediaPlayerEvents#BUFFER_LEVEL_STATE_CHANGED
     */
    this.BUFFER_LEVEL_STATE_CHANGED = 'bufferStateChanged';

    /**
     * Triggered when there is an error from the element or MSE source buffer.
     * @event MediaPlayerEvents#ERROR
     */
    this.ERROR = 'error';
    /**
     * Triggered when a fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_COMPLETED
     */
    this.FRAGMENT_LOADING_COMPLETED = 'fragmentLoadingCompleted';

    /**
     * Triggered when a partial fragment download has completed.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_PROGRESS
     */
    this.FRAGMENT_LOADING_PROGRESS = 'fragmentLoadingProgress';
    /**
     * Triggered when a fragment download has started.
     * @event MediaPlayerEvents#FRAGMENT_LOADING_STARTED
     */
    this.FRAGMENT_LOADING_STARTED = 'fragmentLoadingStarted';

    /**
     * Triggered when a fragment download is abandoned due to detection of slow download base on the ABR abandon rule..
     * @event MediaPlayerEvents#FRAGMENT_LOADING_ABANDONED
     */
    this.FRAGMENT_LOADING_ABANDONED = 'fragmentLoadingAbandoned';

    /**
     * Triggered when {@link module:Debug} logger methods are called.
     * @event MediaPlayerEvents#LOG
     */
    this.LOG = 'log';

    //TODO refactor with internal event
    /**
     * Triggered when the manifest load is complete
     * @event MediaPlayerEvents#MANIFEST_LOADED
     */
    this.MANIFEST_LOADED = 'manifestLoaded';

    /**
     * Triggered anytime there is a change to the overall metrics.
     * @event MediaPlayerEvents#METRICS_CHANGED
     */
    this.METRICS_CHANGED = 'metricsChanged';

    /**
     * Triggered when an individual metric is added, updated or cleared.
     * @event MediaPlayerEvents#METRIC_CHANGED
     */
    this.METRIC_CHANGED = 'metricChanged';

    /**
     * Triggered every time a new metric is added.
     * @event MediaPlayerEvents#METRIC_ADDED
     */
    this.METRIC_ADDED = 'metricAdded';

    /**
     * Triggered every time a metric is updated.
     * @event MediaPlayerEvents#METRIC_UPDATED
     */
    this.METRIC_UPDATED = 'metricUpdated';

    /**
     * Triggered at the stream end of a period.
     * @event MediaPlayerEvents#PERIOD_SWITCH_COMPLETED
     */
    this.PERIOD_SWITCH_COMPLETED = 'periodSwitchCompleted';

    /**
     * Triggered when a new period starts.
     * @event MediaPlayerEvents#PERIOD_SWITCH_STARTED
     */
    this.PERIOD_SWITCH_STARTED = 'periodSwitchStarted';

    /**
     * Triggered when an ABR up /down switch is initiated; either by user in manual mode or auto mode via ABR rules.
     * @event MediaPlayerEvents#QUALITY_CHANGE_REQUESTED
     */
    this.QUALITY_CHANGE_REQUESTED = 'qualityChangeRequested';

    /**
     * Triggered when the new ABR quality is being rendered on-screen.
     * @event MediaPlayerEvents#QUALITY_CHANGE_RENDERED
     */
    this.QUALITY_CHANGE_RENDERED = 'qualityChangeRendered';

    /**
     * Triggered when the new track is being rendered.
     * @event MediaPlayerEvents#TRACK_CHANGE_RENDERED
     */
    this.TRACK_CHANGE_RENDERED = 'trackChangeRendered';

    /**
     * Triggered when the source is setup and ready.
     * @event MediaPlayerEvents#SOURCE_INITIALIZED
     */
    this.SOURCE_INITIALIZED = 'sourceInitialized';

    /**
     * Triggered when a stream (period) is being loaded
     * @event MediaPlayerEvents#STREAM_INITIALIZING
     */
    this.STREAM_INITIALIZING = 'streamInitializing';

    /**
     * Triggered when a stream (period) is loaded
     * @event MediaPlayerEvents#STREAM_INITIALIZED
     */
    this.STREAM_INITIALIZED = 'streamInitialized';

    /**
     * Triggered when the player has been reset.
     * @event MediaPlayerEvents#STREAM_TEARDOWN_COMPLETE
     */
    this.STREAM_TEARDOWN_COMPLETE = 'streamTeardownComplete';

    /**
     * Triggered once all text tracks detected in the MPD are added to the video element.
     * @event MediaPlayerEvents#TEXT_TRACKS_ADDED
     */
    this.TEXT_TRACKS_ADDED = 'allTextTracksAdded';

    /**
     * Triggered when a text track is added to the video element's TextTrackList
     * @event MediaPlayerEvents#TEXT_TRACK_ADDED
     */
    this.TEXT_TRACK_ADDED = 'textTrackAdded';

    /**
     * Triggered when a ttml chunk is parsed.
     * @event MediaPlayerEvents#TTML_PARSED
     */
    this.TTML_PARSED = 'ttmlParsed';

    /**
     * Triggered when a ttml chunk has to be parsed.
     * @event MediaPlayerEvents#TTML_TO_PARSE
     */
    this.TTML_TO_PARSE = 'ttmlToParse';

    /**
     * Triggered when a caption is rendered.
     * @event MediaPlayerEvents#CAPTION_RENDERED
     */
    this.CAPTION_RENDERED = 'captionRendered';

    /**
     * Triggered when the caption container is resized.
     * @event MediaPlayerEvents#CAPTION_CONTAINER_RESIZE
     */
    this.CAPTION_CONTAINER_RESIZE = 'captionContainerResize';

    /**
     * Sent when enough data is available that the media can be played,
     * at least for a couple of frames.  This corresponds to the
     * HAVE_ENOUGH_DATA readyState.
     * @event MediaPlayerEvents#CAN_PLAY
     */
    this.CAN_PLAY = 'canPlay';

    /**
     * Sent when playback completes.
     * @event MediaPlayerEvents#PLAYBACK_ENDED
     */
    this.PLAYBACK_ENDED = 'playbackEnded';

    /**
     * Sent when an error occurs.  The element's error
     * attribute contains more information.
     * @event MediaPlayerEvents#PLAYBACK_ERROR
     */
    this.PLAYBACK_ERROR = 'playbackError';

    /**
     * Sent when playback is not allowed (for example if user gesture is needed).
     * @event MediaPlayerEvents#PLAYBACK_NOT_ALLOWED
     */
    this.PLAYBACK_NOT_ALLOWED = 'playbackNotAllowed';

    /**
     * The media's metadata has finished loading; all attributes now
     * contain as much useful information as they're going to.
     * @event MediaPlayerEvents#PLAYBACK_METADATA_LOADED
     */
    this.PLAYBACK_METADATA_LOADED = 'playbackMetaDataLoaded';

    /**
     * Sent when playback is paused.
     * @event MediaPlayerEvents#PLAYBACK_PAUSED
     */
    this.PLAYBACK_PAUSED = 'playbackPaused';

    /**
     * Sent when the media begins to play (either for the first time, after having been paused,
     * or after ending and then restarting).
     *
     * @event MediaPlayerEvents#PLAYBACK_PLAYING
     */
    this.PLAYBACK_PLAYING = 'playbackPlaying';

    /**
     * Sent periodically to inform interested parties of progress downloading
     * the media. Information about the current amount of the media that has
     * been downloaded is available in the media element's buffered attribute.
     * @event MediaPlayerEvents#PLAYBACK_PROGRESS
     */
    this.PLAYBACK_PROGRESS = 'playbackProgress';

    /**
     * Sent when the playback speed changes.
     * @event MediaPlayerEvents#PLAYBACK_RATE_CHANGED
     */
    this.PLAYBACK_RATE_CHANGED = 'playbackRateChanged';

    /**
     * Sent when a seek operation completes.
     * @event MediaPlayerEvents#PLAYBACK_SEEKED
     */
    this.PLAYBACK_SEEKED = 'playbackSeeked';

    /**
     * Sent when a seek operation begins.
     * @event MediaPlayerEvents#PLAYBACK_SEEKING
     */
    this.PLAYBACK_SEEKING = 'playbackSeeking';

    /**
     * Sent when a seek operation has been asked.
     * @event MediaPlayerEvents#PLAYBACK_SEEK_ASKED
     */
    this.PLAYBACK_SEEK_ASKED = 'playbackSeekAsked';

    /**
     * Sent when the video element reports stalled
     * @event MediaPlayerEvents#PLAYBACK_STALLED
     */
    this.PLAYBACK_STALLED = 'playbackStalled';

    /**
     * Sent when playback of the media starts after having been paused;
     * that is, when playback is resumed after a prior pause event.
     *
     * @event MediaPlayerEvents#PLAYBACK_STARTED
     */
    this.PLAYBACK_STARTED = 'playbackStarted';

    /**
     * The time indicated by the element's currentTime attribute has changed.
     * @event MediaPlayerEvents#PLAYBACK_TIME_UPDATED
     */
    this.PLAYBACK_TIME_UPDATED = 'playbackTimeUpdated';

    /**
     * Sent when the media playback has stopped because of a temporary lack of data.
     *
     * @event MediaPlayerEvents#PLAYBACK_WAITING
     */
    this.PLAYBACK_WAITING = 'playbackWaiting';

    /**
     * Manifest validity changed - As a result of an MPD validity expiration event.
     * @event MediaPlayerEvents#MANIFEST_VALIDITY_CHANGED
     */
    this.MANIFEST_VALIDITY_CHANGED = 'manifestValidityChanged';
  }

  return MediaPlayerEvents;
})(_coreEventsEventsBase2['default']);

var mediaPlayerEvents = new MediaPlayerEvents();
exports['default'] = mediaPlayerEvents;
module.exports = exports['default'];

},{"../core/events/EventsBase":3}],14:[function(_dereq_,module,exports){
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

var DashJSError = function DashJSError(code, message, data) {
  _classCallCheck(this, DashJSError);

  this.code = code || null;
  this.message = message || null;
  this.data = data || null;
};

exports["default"] = DashJSError;
module.exports = exports["default"];

},{}],15:[function(_dereq_,module,exports){
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

var DataChunk =
//Represents a data structure that keep all the necessary info about a single init/media segment
function DataChunk() {
  _classCallCheck(this, DataChunk);

  this.streamId = null;
  this.mediaInfo = null;
  this.segmentType = null;
  this.quality = NaN;
  this.index = NaN;
  this.bytes = null;
  this.start = NaN;
  this.end = NaN;
  this.duration = NaN;
  this.representationId = null;
  this.endFragment = null;
};

exports["default"] = DataChunk;
module.exports = exports["default"];

},{}],16:[function(_dereq_,module,exports){
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _voMetricsHTTPRequest = _dereq_('../vo/metrics/HTTPRequest');

/**
 * @class
 * @ignore
 */

var FragmentRequest = (function () {
    function FragmentRequest(url) {
        _classCallCheck(this, FragmentRequest);

        this.action = FragmentRequest.ACTION_DOWNLOAD;
        this.startTime = NaN;
        this.mediaType = null;
        this.mediaInfo = null;
        this.type = null;
        this.duration = NaN;
        this.timescale = NaN;
        this.range = null;
        this.url = url || null;
        this.serviceLocation = null;
        this.requestStartDate = null;
        this.firstByteDate = null;
        this.requestEndDate = null;
        this.quality = NaN;
        this.index = NaN;
        this.availabilityStartTime = null;
        this.availabilityEndTime = null;
        this.wallStartTime = null;
        this.bytesLoaded = NaN;
        this.bytesTotal = NaN;
        this.delayLoadingTime = NaN;
        this.responseType = 'arraybuffer';
        this.representationId = null;
    }

    _createClass(FragmentRequest, [{
        key: 'isInitializationRequest',
        value: function isInitializationRequest() {
            return this.type && this.type === _voMetricsHTTPRequest.HTTPRequest.INIT_SEGMENT_TYPE;
        }
    }, {
        key: 'setInfo',
        value: function setInfo(info) {
            this.type = info && info.init ? _voMetricsHTTPRequest.HTTPRequest.INIT_SEGMENT_TYPE : _voMetricsHTTPRequest.HTTPRequest.MEDIA_SEGMENT_TYPE;
            this.url = info && info.url ? info.url : null;
            this.range = info && info.range ? info.range.start + '-' + info.range.end : null;
            this.mediaType = info && info.mediaType ? info.mediaType : null;
        }
    }]);

    return FragmentRequest;
})();

FragmentRequest.ACTION_DOWNLOAD = 'download';
FragmentRequest.ACTION_COMPLETE = 'complete';

exports['default'] = FragmentRequest;
module.exports = exports['default'];

},{"../vo/metrics/HTTPRequest":17}],17:[function(_dereq_,module,exports){
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
 * @classdesc This Object holds reference to the HTTPRequest for manifest, fragment and xlink loading.
 * Members which are not defined in ISO23009-1 Annex D should be prefixed by a _ so that they are ignored
 * by Metrics Reporting code.
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HTTPRequest =
/**
 * @class
 */
function HTTPRequest() {
  _classCallCheck(this, HTTPRequest);

  /**
   * Identifier of the TCP connection on which the HTTP request was sent.
   * @public
   */
  this.tcpid = null;
  /**
   * This is an optional parameter and should not be included in HTTP request/response transactions for progressive download.
   * The type of the request:
   * - MPD
   * - XLink expansion
   * - Initialization Fragment
   * - Index Fragment
   * - Media Fragment
   * - Bitstream Switching Fragment
   * - other
   * @public
   */
  this.type = null;
  /**
   * The original URL (before any redirects or failures)
   * @public
   */
  this.url = null;
  /**
   * The actual URL requested, if different from above
   * @public
   */
  this.actualurl = null;
  /**
   * The contents of the byte-range-spec part of the HTTP Range header.
   * @public
   */
  this.range = null;
  /**
   * Real-Time | The real time at which the request was sent.
   * @public
   */
  this.trequest = null;
  /**
   * Real-Time | The real time at which the first byte of the response was received.
   * @public
   */
  this.tresponse = null;
  /**
   * The HTTP response code.
   * @public
   */
  this.responsecode = null;
  /**
   * The duration of the throughput trace intervals (ms), for successful requests only.
   * @public
   */
  this.interval = null;
  /**
   * Throughput traces, for successful requests only.
   * @public
   */
  this.trace = [];

  /**
   * Type of stream ("audio" | "video" etc..)
   * @public
   */
  this._stream = null;
  /**
   * Real-Time | The real time at which the request finished.
   * @public
   */
  this._tfinish = null;
  /**
   * The duration of the media requests, if available, in milliseconds.
   * @public
   */
  this._mediaduration = null;
  /**
   * The media segment quality
   * @public
   */
  this._quality = null;
  /**
   * all the response headers from request.
   * @public
   */
  this._responseHeaders = null;
  /**
   * The selected service location for the request. string.
   * @public
   */
  this._serviceLocation = null;
}

/**
 * @classdesc This Object holds reference to the progress of the HTTPRequest.
 * @ignore
 */
;

var HTTPRequestTrace =
/**
* @class
*/
function HTTPRequestTrace() {
  _classCallCheck(this, HTTPRequestTrace);

  /**
   * Real-Time | Measurement stream start.
   * @public
   */
  this.s = null;
  /**
   * Measurement stream duration (ms).
   * @public
   */
  this.d = null;
  /**
   * List of integers counting the bytes received in each trace interval within the measurement stream.
   * @public
   */
  this.b = [];
};

HTTPRequest.GET = 'GET';
HTTPRequest.HEAD = 'HEAD';
HTTPRequest.MPD_TYPE = 'MPD';
HTTPRequest.XLINK_EXPANSION_TYPE = 'XLinkExpansion';
HTTPRequest.INIT_SEGMENT_TYPE = 'InitializationSegment';
HTTPRequest.INDEX_SEGMENT_TYPE = 'IndexSegment';
HTTPRequest.MEDIA_SEGMENT_TYPE = 'MediaSegment';
HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE = 'BitstreamSwitchingSegment';
HTTPRequest.OTHER_TYPE = 'other';

exports.HTTPRequest = HTTPRequest;
exports.HTTPRequestTrace = HTTPRequestTrace;

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvZXh0ZXJuYWxzL0JpZ0ludGVnZXIuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL2NvcmUvZXJyb3JzL0Vycm9yc0Jhc2UuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL2NvcmUvZXZlbnRzL0V2ZW50c0Jhc2UuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL21zcy9Nc3NFdmVudHMuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL21zcy9Nc3NGcmFnbWVudEluZm9Db250cm9sbGVyLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9tc3MvTXNzRnJhZ21lbnRNb29mUHJvY2Vzc29yLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9tc3MvTXNzRnJhZ21lbnRNb292UHJvY2Vzc29yLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9tc3MvTXNzRnJhZ21lbnRQcm9jZXNzb3IuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL21zcy9Nc3NIYW5kbGVyLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9tc3MvZXJyb3JzL01zc0Vycm9ycy5qcyIsIi9ob21lL3Byb25heWEvZ28vc3JjL2dpdGh1Yi5jb20vbHVjYXMtY2xlbWVudGUvcXVpYy1nby9leGFtcGxlL3BwZC9zZXJ2ZXIvZGFzaC5qcy9zcmMvbXNzL2luZGV4LmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9tc3MvcGFyc2VyL01zc1BhcnNlci5qcyIsIi9ob21lL3Byb25heWEvZ28vc3JjL2dpdGh1Yi5jb20vbHVjYXMtY2xlbWVudGUvcXVpYy1nby9leGFtcGxlL3BwZC9zZXJ2ZXIvZGFzaC5qcy9zcmMvc3RyZWFtaW5nL01lZGlhUGxheWVyRXZlbnRzLmpzIiwiL2hvbWUvcHJvbmF5YS9nby9zcmMvZ2l0aHViLmNvbS9sdWNhcy1jbGVtZW50ZS9xdWljLWdvL2V4YW1wbGUvcHBkL3NlcnZlci9kYXNoLmpzL3NyYy9zdHJlYW1pbmcvdm8vRGFzaEpTRXJyb3IuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL3N0cmVhbWluZy92by9EYXRhQ2h1bmsuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL3N0cmVhbWluZy92by9GcmFnbWVudFJlcXVlc3QuanMiLCIvaG9tZS9wcm9uYXlhL2dvL3NyYy9naXRodWIuY29tL2x1Y2FzLWNsZW1lbnRlL3F1aWMtZ28vZXhhbXBsZS9wcGQvc2VydmVyL2Rhc2guanMvc3JjL3N0cmVhbWluZy92by9tZXRyaWNzL0hUVFBSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLE1BQU0sR0FBQyxDQUFBLFVBQVMsU0FBUyxFQUFDO0FBQUMsY0FBWSxDQUFDLElBQUksSUFBSSxHQUFDLEdBQUc7TUFBQyxRQUFRLEdBQUMsQ0FBQztNQUFDLE9BQU8sR0FBQyxnQkFBZ0I7TUFBQyxXQUFXLEdBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztNQUFDLGdCQUFnQixHQUFDLHNDQUFzQyxDQUFDLElBQUksb0JBQW9CLEdBQUMsT0FBTyxNQUFNLEtBQUcsVUFBVSxDQUFDLFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQztBQUFDLFFBQUcsT0FBTyxDQUFDLEtBQUcsV0FBVyxFQUFDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsT0FBTyxLQUFLLEtBQUcsV0FBVyxFQUFDLE9BQU0sQ0FBQyxLQUFLLEtBQUcsRUFBRSxJQUFFLENBQUMsUUFBUSxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDO0FBQUMsUUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUE7R0FBQyxVQUFVLENBQUMsU0FBUyxHQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBQztBQUFDLFFBQUksQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQTtHQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFDO0FBQUMsUUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUE7R0FBQyxZQUFZLENBQUMsU0FBUyxHQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBQztBQUFDLFdBQU0sQ0FBQyxPQUFPLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxPQUFPLENBQUE7R0FBQyxTQUFTLFlBQVksQ0FBQyxDQUFDLEVBQUM7QUFBQyxRQUFHLENBQUMsR0FBQyxHQUFHLEVBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxHQUFDLElBQUksRUFBQyxPQUFNLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0dBQUMsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFDO0FBQUMsUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBRyxNQUFNLEdBQUMsQ0FBQyxJQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLEdBQUMsQ0FBQyxFQUFDO0FBQUMsY0FBTyxNQUFNLEdBQUUsS0FBSyxDQUFDO0FBQUMsaUJBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUFDLGlCQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFBQyxpQkFBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQztBQUFRLGlCQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFBLEdBQUUsSUFBSSxDQUFBLENBQUM7S0FBQyxPQUFPLEdBQUcsQ0FBQTtHQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0dBQUMsU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFDO0FBQUMsUUFBSSxDQUFDLEdBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxFQUFFLENBQUMsR0FBQyxNQUFNLEVBQUM7QUFBQyxPQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0tBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUM7QUFBQyxRQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLENBQUMsR0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFBQyxLQUFLLEdBQUMsQ0FBQztRQUFDLElBQUksR0FBQyxJQUFJO1FBQUMsR0FBRztRQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQztBQUFDLFNBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsR0FBRyxJQUFFLElBQUksR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsS0FBSyxHQUFDLElBQUksQ0FBQTtLQUFDLE9BQU0sQ0FBQyxHQUFDLEdBQUcsRUFBQztBQUFDLFNBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxHQUFHLEtBQUcsSUFBSSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxHQUFDLEtBQUssR0FBQyxJQUFJLENBQUE7S0FBQyxJQUFHLEtBQUssR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtHQUFDLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxRQUFHLENBQUMsQ0FBQyxNQUFNLElBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsQ0FBQyxHQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUFDLElBQUksR0FBQyxJQUFJO1FBQUMsR0FBRztRQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztBQUFDLFNBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssSUFBRSxDQUFDLENBQUE7S0FBQyxPQUFNLEtBQUssR0FBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsQ0FBQTtLQUFDLE9BQU8sQ0FBQyxDQUFBO0dBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUM7QUFBQyxhQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7S0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUFDLGFBQU8sSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFHLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksRUFBQztBQUFDLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtLQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFDO0FBQUMsVUFBRyxTQUFTLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFFBQUksR0FBRyxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsQ0FBQyxHQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUFDLE1BQU0sR0FBQyxDQUFDO1FBQUMsSUFBSSxHQUFDLElBQUk7UUFBQyxDQUFDO1FBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsZ0JBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLFVBQVUsR0FBQyxDQUFDLEVBQUM7QUFBQyxrQkFBVSxJQUFFLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBO09BQUMsTUFBSyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUE7S0FBQyxLQUFJLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQztBQUFDLGdCQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxJQUFHLFVBQVUsR0FBQyxDQUFDLEVBQUMsVUFBVSxJQUFFLElBQUksQ0FBQyxLQUFJO0FBQUMsU0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsVUFBVSxDQUFDLE1BQUs7T0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsVUFBVSxDQUFBO0tBQUMsT0FBSyxDQUFDLEdBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsT0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtHQUFDLFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDO0FBQUMsUUFBSSxLQUFLLENBQUMsSUFBRyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQztBQUFDLFdBQUssR0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsTUFBSTtBQUFDLFdBQUssR0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQTtLQUFDLEtBQUssR0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBRyxPQUFPLEtBQUssS0FBRyxRQUFRLEVBQUM7QUFBQyxVQUFHLElBQUksRUFBQyxLQUFLLEdBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0dBQUMsU0FBUyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLENBQUMsR0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQUMsSUFBSSxHQUFDLElBQUk7UUFBQyxDQUFDO1FBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsZ0JBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLEdBQUMsQ0FBQyxHQUFDLFVBQVUsR0FBQyxJQUFJLEdBQUMsVUFBVSxDQUFBO0tBQUMsQ0FBQyxHQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxLQUFHLFFBQVEsRUFBQztBQUFDLFVBQUcsSUFBSSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7R0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUksRUFBQztBQUFDLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtLQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLO1FBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFDLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFHLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksRUFBQztBQUFDLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtLQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFDO0FBQUMsYUFBTyxJQUFJLFlBQVksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsWUFBVTtBQUFDLFdBQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsWUFBVTtBQUFDLFFBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsWUFBVTtBQUFDLFdBQU8sSUFBSSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7R0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFlBQVU7QUFBQyxXQUFPLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFlBQVU7QUFBQyxXQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFlBQVU7QUFBQyxXQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7R0FBQyxDQUFDLFNBQVMsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsR0FBRztRQUFDLENBQUMsR0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQUMsSUFBSSxHQUFDLElBQUk7UUFBQyxPQUFPO1FBQUMsS0FBSztRQUFDLENBQUM7UUFBQyxHQUFHO1FBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQUMsU0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQUMsV0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLE9BQU8sR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQTtPQUFDO0tBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0dBQUMsU0FBUyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsQ0FBQyxHQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUFDLElBQUksR0FBQyxJQUFJO1FBQUMsS0FBSyxHQUFDLENBQUM7UUFBQyxPQUFPO1FBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsYUFBTyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsT0FBTyxHQUFDLEtBQUssR0FBQyxJQUFJLENBQUE7S0FBQyxPQUFNLEtBQUssR0FBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsQ0FBQTtLQUFDLE9BQU8sQ0FBQyxDQUFBO0dBQUMsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxPQUFNLENBQUMsRUFBRSxHQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsaUJBQWlCLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBRyxDQUFDLElBQUUsRUFBRSxFQUFDLE9BQU8sWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFBQyxFQUFFLEdBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUFDLElBQUksR0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQTtHQUFDLFNBQVMsWUFBWSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUM7QUFBQyxXQUFNLENBQUMsSUFBSSxHQUFDLEVBQUUsR0FBQyxJQUFJLEdBQUMsRUFBRSxHQUFDLEtBQUssR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQTtHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSztRQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQyxJQUFJO1FBQUMsR0FBRyxDQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUFDLFVBQUcsQ0FBQyxLQUFHLENBQUMsRUFBQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUMsT0FBTyxJQUFJLENBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLEVBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxHQUFHLEdBQUMsSUFBSSxFQUFDO0FBQUMsZUFBTyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO09BQUMsQ0FBQyxHQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUFDLElBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtHQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQztBQUFDLFFBQUcsQ0FBQyxHQUFDLElBQUksRUFBQztBQUFDLGFBQU8sSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtLQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQztBQUFDLGFBQU8sSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7S0FBQyxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0dBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsUUFBRyxDQUFDLENBQUMsS0FBSyxLQUFHLENBQUMsRUFBQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUcsQ0FBQyxFQUFDLE9BQU8sSUFBSSxDQUFDLElBQUcsQ0FBQyxDQUFDLEtBQUssS0FBRyxDQUFDLENBQUMsRUFBQyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLElBQUksS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxDQUFDLEdBQUMsV0FBVyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7UUFBQyxJQUFJLEdBQUMsSUFBSTtRQUFDLE9BQU87UUFBQyxLQUFLO1FBQUMsQ0FBQztRQUFDLEdBQUc7UUFBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7QUFBQyxTQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsV0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsQ0FBQyxJQUFFLEdBQUcsR0FBQyxHQUFHLENBQUEsQUFBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLE9BQU8sR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFBO09BQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLENBQUE7S0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsV0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsUUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0dBQUMsQ0FBQyxTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxHQUFHLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxJQUFJLEdBQUMsSUFBSTtRQUFDLE1BQU0sR0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUFDLDJCQUEyQixHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFFLENBQUMsR0FBQywyQkFBMkIsQ0FBQSxBQUFDLENBQUM7UUFBQyxTQUFTLEdBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxNQUFNLENBQUM7UUFBQyxPQUFPLEdBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxNQUFNLENBQUM7UUFBQyxhQUFhO1FBQUMsS0FBSztRQUFDLEtBQUs7UUFBQyxNQUFNO1FBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxDQUFDLENBQUMsSUFBRyxTQUFTLENBQUMsTUFBTSxJQUFFLEdBQUcsRUFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLEdBQUMsT0FBTyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLEtBQUssR0FBQyxHQUFHLEdBQUMsR0FBRyxFQUFDLEtBQUssSUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUM7QUFBQyxtQkFBYSxHQUFDLElBQUksR0FBQyxDQUFDLENBQUMsSUFBRyxTQUFTLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxLQUFHLDJCQUEyQixFQUFDO0FBQUMscUJBQWEsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsR0FBQyxJQUFJLEdBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUEsR0FBRSwyQkFBMkIsQ0FBQyxDQUFBO09BQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsYUFBSyxJQUFFLGFBQWEsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBRSxTQUFTLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxJQUFFLEtBQUssR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFBLEFBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLElBQUcsTUFBTSxHQUFDLENBQUMsRUFBQztBQUFDLG1CQUFTLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFBO1NBQUMsTUFBSTtBQUFDLG1CQUFTLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBO1NBQUM7T0FBQyxPQUFNLE1BQU0sS0FBRyxDQUFDLEVBQUM7QUFBQyxxQkFBYSxJQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsZUFBSyxJQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLEtBQUssR0FBQyxDQUFDLEVBQUM7QUFBQyxxQkFBUyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUE7V0FBQyxNQUFJO0FBQUMscUJBQVMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUE7V0FBQztTQUFDLE1BQU0sSUFBRSxLQUFLLENBQUE7T0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUMsYUFBYSxDQUFBO0tBQUMsU0FBUyxHQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLE1BQU0sR0FBQyxFQUFFO1FBQUMsSUFBSSxHQUFDLEVBQUU7UUFBQyxJQUFJLEdBQUMsSUFBSTtRQUFDLEtBQUs7UUFBQyxJQUFJO1FBQUMsS0FBSztRQUFDLEtBQUs7UUFBQyxLQUFLLENBQUMsT0FBTSxHQUFHLEVBQUM7QUFBQyxVQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUcsVUFBVSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7QUFBQyxjQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVE7T0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLElBQUksR0FBQyxHQUFHLEVBQUM7QUFBQyxhQUFLLEdBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBLEdBQUUsSUFBSSxDQUFBO09BQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUU7QUFBQyxhQUFLLEdBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxJQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxFQUFDLE1BQU0sS0FBSyxFQUFFLENBQUE7T0FBQyxRQUFNLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFBO0tBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7R0FBQyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUMsTUFBTSxFQUFDO0FBQUMsUUFBSSxNQUFNLEdBQUMsS0FBSyxDQUFDLE1BQU07UUFBQyxRQUFRLEdBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUFDLElBQUksR0FBQyxJQUFJO1FBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxTQUFTO1FBQUMsT0FBTyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQUMsYUFBTyxHQUFDLFNBQVMsR0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxRQUFRLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBQyxPQUFPLEdBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUFDLE9BQU0sQ0FBQyxRQUFRLEVBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQztBQUFDLFFBQUksS0FBSztRQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxvQkFBb0IsRUFBQztBQUFDLGFBQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUs7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztBQUFDLFVBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUFDLGVBQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxPQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFDO0FBQUMsVUFBRyxDQUFDLEtBQUcsQ0FBQyxFQUFDLE9BQU0sQ0FBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUMsT0FBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsR0FBRyxHQUFDLElBQUksRUFBQztBQUFDLGFBQUssR0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLElBQUksRUFBQyxTQUFTLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBRyxPQUFPLFFBQVEsS0FBRyxRQUFRLEVBQUM7QUFBQyxjQUFHLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUksRUFBQyxRQUFRLEdBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTSxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7U0FBQyxPQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLEdBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQUMsSUFBSSxVQUFVLEdBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLFVBQVUsS0FBRyxDQUFDLENBQUMsRUFBQyxPQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLElBQUcsVUFBVSxLQUFHLENBQUMsRUFBQyxPQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUksR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBRSxHQUFHLEVBQUMsS0FBSyxHQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUk7UUFBQyxHQUFHLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUcsT0FBTyxRQUFRLEtBQUcsUUFBUSxFQUFDO0FBQUMsVUFBRyxLQUFLLEVBQUMsUUFBUSxHQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUFDLE1BQUssUUFBUSxHQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQyxJQUFHLE9BQU8sR0FBRyxLQUFHLFFBQVEsRUFBQztBQUFDLFVBQUcsS0FBSyxFQUFDLEdBQUcsR0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUMsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7S0FBQyxNQUFLLEdBQUcsR0FBQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLENBQUMsT0FBTSxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQTtHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxNQUFNLEdBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxTQUFTLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFdBQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxTQUFTLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFdBQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSztRQUFDLEtBQUs7UUFBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxLQUFHLENBQUMsRUFBQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxFQUFDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxLQUFHLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUM7QUFBQyxhQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLElBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxHQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztBQUFDLFVBQUcsU0FBUyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7S0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxJQUFJLEVBQUM7QUFBQyxVQUFHLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxFQUFDO0FBQUMsU0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7T0FBQyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUMsTUFBTSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7S0FBQyxPQUFPLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUs7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUMsRUFBRSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFBQyxFQUFFLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxLQUFHLEVBQUUsRUFBQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsS0FBRyxFQUFFLEVBQUMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLEtBQUcsRUFBRSxFQUFDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxLQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBQyxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxJQUFJLEVBQUM7QUFBQyxVQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxLQUFJLEVBQUUsRUFBQztBQUFDLFNBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO09BQUMsSUFBRyxDQUFDLEtBQUcsRUFBRSxFQUFDLE1BQU0sQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0tBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVMsR0FBRyxFQUFDLEdBQUcsRUFBQztBQUFDLE9BQUcsR0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUFDLElBQUksR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU0sR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFDO0FBQUMsVUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxRQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBQztBQUFDLGFBQU8sQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztBQUFDLFVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUs7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxFQUFDO0FBQUMsT0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFHLENBQUMsS0FBRyxRQUFRLEVBQUM7QUFBQyxhQUFNLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxRQUFRLEVBQUM7QUFBQyxhQUFPLENBQUMsQ0FBQTtLQUFDLElBQUksQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUs7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFHLElBQUksQ0FBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLElBQUksRUFBQztBQUFDLGFBQU8sQ0FBQyxDQUFDLElBQUksR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxJQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUM7QUFBQyxhQUFPLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0tBQUMsT0FBTyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtHQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFHLENBQUMsS0FBRyxRQUFRLEVBQUM7QUFBQyxhQUFNLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxRQUFRLEVBQUM7QUFBQyxhQUFPLENBQUMsQ0FBQTtLQUFDLElBQUksQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUs7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUM7QUFBQyxhQUFPLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUM7QUFBQyxhQUFPLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0tBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFHLENBQUMsS0FBRyxRQUFRLEVBQUM7QUFBQyxhQUFNLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxRQUFRLEVBQUM7QUFBQyxhQUFPLENBQUMsQ0FBQTtLQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsV0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEtBQUksQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsV0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBLEtBQUksQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsV0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxZQUFVO0FBQUMsV0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEtBQUksQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxZQUFVO0FBQUMsV0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBLEtBQUksQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxZQUFVO0FBQUMsV0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxZQUFVO0FBQUMsV0FBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFDLFlBQVU7QUFBQyxXQUFPLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxZQUFVO0FBQUMsV0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxZQUFVO0FBQUMsV0FBTyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsWUFBVTtBQUFDLFdBQU8sS0FBSyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsV0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFlBQVU7QUFBQyxXQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEtBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsV0FBTyxLQUFLLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFlBQVU7QUFBQyxXQUFPLElBQUksQ0FBQyxLQUFLLEtBQUcsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxZQUFVO0FBQUMsV0FBTyxJQUFJLENBQUMsS0FBSyxLQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxLQUFLLENBQUMsSUFBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxJQUFJLENBQUMsSUFBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsRUFBQyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFNBQVMsWUFBWSxDQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEtBQUssQ0FBQyxJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sSUFBSSxDQUFDLElBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEtBQUssQ0FBQyxJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUMsT0FBTyxJQUFJLENBQUE7R0FBQyxTQUFTLGVBQWUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxLQUFLLEdBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtRQUFDLENBQUMsR0FBQyxLQUFLO1FBQUMsQ0FBQyxHQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUFDLFVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsU0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxLQUFLLENBQUMsSUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsSUFBSSxDQUFBO09BQUMsT0FBTyxLQUFLLENBQUE7S0FBQyxPQUFPLElBQUksQ0FBQTtHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFDLFVBQVMsTUFBTSxFQUFDO0FBQUMsUUFBSSxPQUFPLEdBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUcsT0FBTyxLQUFHLFNBQVMsRUFBQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxJQUFJLEdBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUcsSUFBSSxJQUFFLEVBQUUsRUFBQyxPQUFPLGVBQWUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUcsSUFBSSxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7QUFBQyxPQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLE9BQU8sZUFBZSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUMsVUFBUyxVQUFVLEVBQUM7QUFBQyxRQUFJLE9BQU8sR0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRyxPQUFPLEtBQUcsU0FBUyxFQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBQyxVQUFVLEtBQUcsU0FBUyxHQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsT0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLE9BQU8sZUFBZSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxNQUFNLENBQUMsSUFBSTtRQUFDLElBQUksR0FBQyxNQUFNLENBQUMsR0FBRztRQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFBQyxDQUFDO1FBQUMsS0FBSztRQUFDLEtBQUssQ0FBQyxPQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDO0FBQUMsT0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxFQUFDO0FBQUMsT0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxJQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQztBQUFDLGFBQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0tBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFDLFlBQVU7QUFBQyxRQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUcsSUFBSSxDQUFDLElBQUksRUFBQztBQUFDLGFBQU8sYUFBYSxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsWUFBVTtBQUFDLFFBQUksS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBRyxLQUFLLEdBQUMsQ0FBQyxHQUFDLE9BQU8sRUFBQyxPQUFPLElBQUksWUFBWSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsWUFBVTtBQUFDLFdBQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsWUFBVTtBQUFDLFFBQUksS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFDO0FBQUMsYUFBTyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO0tBQUMsT0FBTyxhQUFhLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFDLFlBQVU7QUFBQyxRQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUcsS0FBSyxHQUFDLENBQUMsR0FBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLElBQUksWUFBWSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsWUFBVTtBQUFDLFdBQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsSUFBSSxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsR0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLEVBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGFBQWEsR0FBQyxXQUFXLENBQUMsTUFBTTtNQUFDLGFBQWEsR0FBQyxXQUFXLENBQUMsYUFBYSxHQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsYUFBYSxDQUFDLENBQUMsRUFBQztBQUFDLFdBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUE7R0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsWUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsNkJBQTZCLENBQUMsQ0FBQTtLQUFDLElBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxNQUFNLENBQUMsT0FBTSxDQUFDLElBQUUsYUFBYSxFQUFDO0FBQUMsWUFBTSxHQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFFLGFBQWEsR0FBQyxDQUFDLENBQUE7S0FBQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsUUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxZQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFNLENBQUMsSUFBRSxhQUFhLEVBQUM7QUFBQyxVQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsYUFBYSxHQUFDLENBQUMsQ0FBQTtLQUFDLE1BQU0sR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDO0FBQUMsS0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFO1FBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFDLENBQUM7UUFBQyxJQUFJLEdBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEdBQUMsQ0FBQztRQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUMsSUFBSTtRQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLE9BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUM7QUFBQyxhQUFPLEdBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUcsS0FBSyxFQUFDO0FBQUMsY0FBTSxHQUFDLGFBQWEsR0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFBO09BQUMsT0FBTyxHQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFHLEtBQUssRUFBQztBQUFDLGNBQU0sR0FBQyxhQUFhLEdBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQTtPQUFDLElBQUksR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtLQUFDLElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLEVBQUM7QUFBQyxTQUFHLEdBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxPQUFPLEdBQUcsQ0FBQTtHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLFlBQVU7QUFBQyxXQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFPLE9BQU8sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUMsQ0FBQyxJQUFFLEVBQUU7TUFBQyxVQUFVLEdBQUMsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUEsSUFBRyxJQUFJLEdBQUMsQ0FBQyxJQUFJLENBQUEsQUFBQyxHQUFDLFNBQVMsQ0FBQyxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSztRQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsS0FBRyxRQUFRLEdBQUMsQ0FBQyxHQUFDLFNBQVMsR0FBQyxPQUFPLENBQUMsS0FBRyxRQUFRLEdBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksR0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7QUFBQyxRQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUUsQ0FBQyxFQUFDO0FBQUMsVUFBSSxHQUFHLEdBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUUsQ0FBQyxHQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsR0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQTtLQUFDLE9BQU0sRUFBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQTtHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFDLFlBQVU7QUFBQyxRQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQztBQUFDLE9BQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsRUFBQztBQUFDLGFBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLEtBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxLQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7R0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsS0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUM7QUFBQyxPQUFDLEdBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLE9BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDO0FBQUMsT0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxHQUFFO0FBQUMsYUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUM7QUFBQyxTQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLElBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxRQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLEtBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxLQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEdBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLEdBQUMsRUFBRTtRQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7QUFBQyxVQUFJLEdBQUcsR0FBQyxVQUFVLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBRyxLQUFLLEdBQUMsR0FBRyxFQUFDLFVBQVUsR0FBQyxLQUFLLENBQUE7S0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7R0FBQyxJQUFJLFNBQVMsR0FBQyxTQUFWLFNBQVMsQ0FBVSxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUM7QUFBQyxZQUFRLEdBQUMsUUFBUSxJQUFFLGdCQUFnQixDQUFDLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRyxDQUFDLGFBQWEsRUFBQztBQUFDLFVBQUksR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxHQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtLQUFDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLGNBQWMsR0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsb0JBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7S0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsS0FBRyxHQUFHLEVBQUMsU0FBUyxJQUFHLENBQUMsSUFBSSxjQUFjLEVBQUM7QUFBQyxZQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBRSxPQUFPLEVBQUM7QUFBQyxjQUFHLENBQUMsS0FBRyxHQUFHLElBQUUsT0FBTyxLQUFHLENBQUMsRUFBQyxTQUFTLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFDLGdDQUFnQyxHQUFDLElBQUksR0FBQyxHQUFHLENBQUMsQ0FBQTtTQUFDO09BQUM7S0FBQyxJQUFJLEdBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUcsR0FBRyxDQUFDLEtBQUksQ0FBQyxHQUFDLFVBQVUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxJQUFJLGNBQWMsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBRyxDQUFDLEtBQUcsR0FBRyxFQUFDO0FBQUMsWUFBSSxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUU7QUFBQyxXQUFDLEVBQUUsQ0FBQTtTQUFDLFFBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFHLEdBQUcsSUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsTUFBSyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsR0FBQywyQkFBMkIsQ0FBQyxDQUFBO0tBQUMsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxTQUFTLGtCQUFrQixDQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDO0FBQUMsUUFBSSxHQUFHLEdBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUFDLEdBQUcsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7QUFBQyxTQUFHLEdBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7S0FBQyxPQUFPLFVBQVUsR0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFBO0dBQUMsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQztBQUFDLFlBQVEsR0FBQyxRQUFRLElBQUUsZ0JBQWdCLENBQUMsSUFBRyxLQUFLLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQztBQUFDLGFBQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQUMsT0FBTSxHQUFHLEdBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQTtHQUFDLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUM7QUFBQyxRQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDO0FBQUMsVUFBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7S0FBQyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLFVBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUMsT0FBTSxFQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxFQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxDQUFBO0tBQUMsSUFBSSxHQUFHLEdBQUMsS0FBSyxDQUFDLElBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQztBQUFDLFNBQUcsR0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtLQUFDLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDO0FBQUMsVUFBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxPQUFNLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsR0FBRyxFQUFDLENBQUE7S0FBQyxJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEdBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxPQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsRUFBQztBQUFDLFlBQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxHQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBRyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUM7QUFBQyxhQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO09BQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtLQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTSxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUMsVUFBVSxFQUFDLEdBQUcsRUFBQyxDQUFBO0dBQUMsU0FBUyxZQUFZLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUM7QUFBQyxRQUFJLEdBQUcsR0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLE9BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUEsR0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sU0FBUyxDQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQTtLQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7R0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxVQUFTLEtBQUssRUFBQztBQUFDLFdBQU8sTUFBTSxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxLQUFLLEVBQUM7QUFBQyxXQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFDLFVBQVMsS0FBSyxFQUFDO0FBQUMsV0FBTyxNQUFNLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFBO0dBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBQyxVQUFTLEtBQUssRUFBQyxRQUFRLEVBQUM7QUFBQyxRQUFHLEtBQUssS0FBRyxTQUFTLEVBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxJQUFHLEtBQUssS0FBRyxFQUFFLEVBQUMsT0FBTyxZQUFZLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLEdBQUcsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFBQyxLQUFLLEdBQUMsU0FBUztRQUFDLEtBQUssQ0FBQyxPQUFNLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBQztBQUFDLFdBQUssR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFDLEtBQUssQ0FBQTtLQUFDLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksR0FBQyxHQUFHLENBQUE7R0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFDLFVBQVMsS0FBSyxFQUFDLFFBQVEsRUFBQztBQUFDLFFBQUcsS0FBSyxLQUFHLFNBQVMsRUFBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLElBQUcsS0FBSyxJQUFFLEVBQUUsRUFBQyxPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtHQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsWUFBVTtBQUFDLFdBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0dBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxZQUFVO0FBQUMsV0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxZQUFVO0FBQUMsV0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0dBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBQyxZQUFVO0FBQUMsV0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFBO0dBQUMsQ0FBQyxTQUFTLGdCQUFnQixDQUFDLENBQUMsRUFBQztBQUFDLFFBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsS0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxvQkFBb0IsR0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixHQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsSUFBSSxJQUFJLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLEdBQUcsQ0FBQyxJQUFHLElBQUksRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUcsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFHLENBQUMsRUFBQztBQUFDLFVBQUksR0FBRyxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBRyxHQUFHLEVBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxL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QUE7R0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDO0FBQUMsV0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFPLENBQUMsWUFBWSxVQUFVLElBQUUsQ0FBQyxZQUFZLFlBQVksSUFBRSxDQUFDLFlBQVksWUFBWSxDQUFBO0dBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFDLFVBQVMsTUFBTSxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUM7QUFBQyxXQUFPLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUMsVUFBVSxDQUFDLElBQUksSUFBRSxFQUFFLENBQUMsRUFBQyxVQUFVLENBQUMsQ0FBQTtHQUFDLENBQUMsT0FBTyxPQUFPLENBQUE7Q0FBQyxDQUFBLEVBQUUsQ0FBQyxJQUFHLE9BQU8sTUFBTSxLQUFHLFdBQVcsSUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFDO0FBQUMs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Q0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUEsSUFBSyxFQUFFLENBQUM7QUFDeEMsWUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFBLElBQUssRUFBRSxDQUFDO0FBQ3hDLFlBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQSxJQUFLLENBQUMsQ0FBQztBQUN2QyxZQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBSSxNQUFNLEdBQUcsVUFBVSxBQUFDLENBQUM7OztBQUdsQyxZQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlELFNBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdQLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvRyxTQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHUixZQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFBLElBQUssRUFBRSxDQUFDO0FBQ3JELFlBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUEsSUFBSyxFQUFFLENBQUM7QUFDckQsWUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxH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QUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztBQUNoRCxXQUFXLENBQUMsZ0NBQWdDLEdBQUcsMkJBQTJCLENBQUM7QUFDM0UsV0FBVyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7O1FBRXhCLFdBQVcsR0FBWCxXQUFXO1FBQUUsZ0JBQWdCLEdBQWhCLGdCQUFnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBiaWdJbnQ9ZnVuY3Rpb24odW5kZWZpbmVkKXtcInVzZSBzdHJpY3RcIjt2YXIgQkFTRT0xZTcsTE9HX0JBU0U9NyxNQVhfSU5UPTkwMDcxOTkyNTQ3NDA5OTIsTUFYX0lOVF9BUlI9c21hbGxUb0FycmF5KE1BWF9JTlQpLERFRkFVTFRfQUxQSEFCRVQ9XCIwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjt2YXIgc3VwcG9ydHNOYXRpdmVCaWdJbnQ9dHlwZW9mIEJpZ0ludD09PVwiZnVuY3Rpb25cIjtmdW5jdGlvbiBJbnRlZ2VyKHYscmFkaXgsYWxwaGFiZXQsY2FzZVNlbnNpdGl2ZSl7aWYodHlwZW9mIHY9PT1cInVuZGVmaW5lZFwiKXJldHVybiBJbnRlZ2VyWzBdO2lmKHR5cGVvZiByYWRpeCE9PVwidW5kZWZpbmVkXCIpcmV0dXJuK3JhZGl4PT09MTAmJiFhbHBoYWJldD9wYXJzZVZhbHVlKHYpOnBhcnNlQmFzZSh2LHJhZGl4LGFscGhhYmV0LGNhc2VTZW5zaXRpdmUpO3JldHVybiBwYXJzZVZhbHVlKHYpfWZ1bmN0aW9uIEJpZ0ludGVnZXIodmFsdWUsc2lnbil7dGhpcy52YWx1ZT12YWx1ZTt0aGlzLnNpZ249c2lnbjt0aGlzLmlzU21hbGw9ZmFsc2V9QmlnSW50ZWdlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShJbnRlZ2VyLnByb3RvdHlwZSk7ZnVuY3Rpb24gU21hbGxJbnRlZ2VyKHZhbHVlKXt0aGlzLnZhbHVlPXZhbHVlO3RoaXMuc2lnbj12YWx1ZTwwO3RoaXMuaXNTbWFsbD10cnVlfVNtYWxsSW50ZWdlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShJbnRlZ2VyLnByb3RvdHlwZSk7ZnVuY3Rpb24gTmF0aXZlQmlnSW50KHZhbHVlKXt0aGlzLnZhbHVlPXZhbHVlfU5hdGl2ZUJpZ0ludC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShJbnRlZ2VyLnByb3RvdHlwZSk7ZnVuY3Rpb24gaXNQcmVjaXNlKG4pe3JldHVybi1NQVhfSU5UPG4mJm48TUFYX0lOVH1mdW5jdGlvbiBzbWFsbFRvQXJyYXkobil7aWYobjwxZTcpcmV0dXJuW25dO2lmKG48MWUxNClyZXR1cm5bbiUxZTcsTWF0aC5mbG9vcihuLzFlNyldO3JldHVybltuJTFlNyxNYXRoLmZsb29yKG4vMWU3KSUxZTcsTWF0aC5mbG9vcihuLzFlMTQpXX1mdW5jdGlvbiBhcnJheVRvU21hbGwoYXJyKXt0cmltKGFycik7dmFyIGxlbmd0aD1hcnIubGVuZ3RoO2lmKGxlbmd0aDw0JiZjb21wYXJlQWJzKGFycixNQVhfSU5UX0FSUik8MCl7c3dpdGNoKGxlbmd0aCl7Y2FzZSAwOnJldHVybiAwO2Nhc2UgMTpyZXR1cm4gYXJyWzBdO2Nhc2UgMjpyZXR1cm4gYXJyWzBdK2FyclsxXSpCQVNFO2RlZmF1bHQ6cmV0dXJuIGFyclswXSsoYXJyWzFdK2FyclsyXSpCQVNFKSpCQVNFfX1yZXR1cm4gYXJyfWZ1bmN0aW9uIHRyaW0odil7dmFyIGk9di5sZW5ndGg7d2hpbGUodlstLWldPT09MCk7di5sZW5ndGg9aSsxfWZ1bmN0aW9uIGNyZWF0ZUFycmF5KGxlbmd0aCl7dmFyIHg9bmV3IEFycmF5KGxlbmd0aCk7dmFyIGk9LTE7d2hpbGUoKytpPGxlbmd0aCl7eFtpXT0wfXJldHVybiB4fWZ1bmN0aW9uIHRydW5jYXRlKG4pe2lmKG4+MClyZXR1cm4gTWF0aC5mbG9vcihuKTtyZXR1cm4gTWF0aC5jZWlsKG4pfWZ1bmN0aW9uIGFkZChhLGIpe3ZhciBsX2E9YS5sZW5ndGgsbF9iPWIubGVuZ3RoLHI9bmV3IEFycmF5KGxfYSksY2Fycnk9MCxiYXNlPUJBU0Usc3VtLGk7Zm9yKGk9MDtpPGxfYjtpKyspe3N1bT1hW2ldK2JbaV0rY2Fycnk7Y2Fycnk9c3VtPj1iYXNlPzE6MDtyW2ldPXN1bS1jYXJyeSpiYXNlfXdoaWxlKGk8bF9hKXtzdW09YVtpXStjYXJyeTtjYXJyeT1zdW09PT1iYXNlPzE6MDtyW2krK109c3VtLWNhcnJ5KmJhc2V9aWYoY2Fycnk+MClyLnB1c2goY2FycnkpO3JldHVybiByfWZ1bmN0aW9uIGFkZEFueShhLGIpe2lmKGEubGVuZ3RoPj1iLmxlbmd0aClyZXR1cm4gYWRkKGEsYik7cmV0dXJuIGFkZChiLGEpfWZ1bmN0aW9uIGFkZFNtYWxsKGEsY2Fycnkpe3ZhciBsPWEubGVuZ3RoLHI9bmV3IEFycmF5KGwpLGJhc2U9QkFTRSxzdW0saTtmb3IoaT0wO2k8bDtpKyspe3N1bT1hW2ldLWJhc2UrY2Fycnk7Y2Fycnk9TWF0aC5mbG9vcihzdW0vYmFzZSk7cltpXT1zdW0tY2FycnkqYmFzZTtjYXJyeSs9MX13aGlsZShjYXJyeT4wKXtyW2krK109Y2FycnklYmFzZTtjYXJyeT1NYXRoLmZsb29yKGNhcnJ5L2Jhc2UpfXJldHVybiByfUJpZ0ludGVnZXIucHJvdG90eXBlLmFkZD1mdW5jdGlvbih2KXt2YXIgbj1wYXJzZVZhbHVlKHYpO2lmKHRoaXMuc2lnbiE9PW4uc2lnbil7cmV0dXJuIHRoaXMuc3VidHJhY3Qobi5uZWdhdGUoKSl9dmFyIGE9dGhpcy52YWx1ZSxiPW4udmFsdWU7aWYobi5pc1NtYWxsKXtyZXR1cm4gbmV3IEJpZ0ludGVnZXIoYWRkU21hbGwoYSxNYXRoLmFicyhiKSksdGhpcy5zaWduKX1yZXR1cm4gbmV3IEJpZ0ludGVnZXIoYWRkQW55KGEsYiksdGhpcy5zaWduKX07QmlnSW50ZWdlci5wcm90b3R5cGUucGx1cz1CaWdJbnRlZ2VyLnByb3RvdHlwZS5hZGQ7U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odil7dmFyIG49cGFyc2VWYWx1ZSh2KTt2YXIgYT10aGlzLnZhbHVlO2lmKGE8MCE9PW4uc2lnbil7cmV0dXJuIHRoaXMuc3VidHJhY3Qobi5uZWdhdGUoKSl9dmFyIGI9bi52YWx1ZTtpZihuLmlzU21hbGwpe2lmKGlzUHJlY2lzZShhK2IpKXJldHVybiBuZXcgU21hbGxJbnRlZ2VyKGErYik7Yj1zbWFsbFRvQXJyYXkoTWF0aC5hYnMoYikpfXJldHVybiBuZXcgQmlnSW50ZWdlcihhZGRTbWFsbChiLE1hdGguYWJzKGEpKSxhPDApfTtTbWFsbEludGVnZXIucHJvdG90eXBlLnBsdXM9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5hZGQ7TmF0aXZlQmlnSW50LnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odil7cmV0dXJuIG5ldyBOYXRpdmVCaWdJbnQodGhpcy52YWx1ZStwYXJzZVZhbHVlKHYpLnZhbHVlKX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5wbHVzPU5hdGl2ZUJpZ0ludC5wcm90b3R5cGUuYWRkO2Z1bmN0aW9uIHN1YnRyYWN0KGEsYil7dmFyIGFfbD1hLmxlbmd0aCxiX2w9Yi5sZW5ndGgscj1uZXcgQXJyYXkoYV9sKSxib3Jyb3c9MCxiYXNlPUJBU0UsaSxkaWZmZXJlbmNlO2ZvcihpPTA7aTxiX2w7aSsrKXtkaWZmZXJlbmNlPWFbaV0tYm9ycm93LWJbaV07aWYoZGlmZmVyZW5jZTwwKXtkaWZmZXJlbmNlKz1iYXNlO2JvcnJvdz0xfWVsc2UgYm9ycm93PTA7cltpXT1kaWZmZXJlbmNlfWZvcihpPWJfbDtpPGFfbDtpKyspe2RpZmZlcmVuY2U9YVtpXS1ib3Jyb3c7aWYoZGlmZmVyZW5jZTwwKWRpZmZlcmVuY2UrPWJhc2U7ZWxzZXtyW2krK109ZGlmZmVyZW5jZTticmVha31yW2ldPWRpZmZlcmVuY2V9Zm9yKDtpPGFfbDtpKyspe3JbaV09YVtpXX10cmltKHIpO3JldHVybiByfWZ1bmN0aW9uIHN1YnRyYWN0QW55KGEsYixzaWduKXt2YXIgdmFsdWU7aWYoY29tcGFyZUFicyhhLGIpPj0wKXt2YWx1ZT1zdWJ0cmFjdChhLGIpfWVsc2V7dmFsdWU9c3VidHJhY3QoYixhKTtzaWduPSFzaWdufXZhbHVlPWFycmF5VG9TbWFsbCh2YWx1ZSk7aWYodHlwZW9mIHZhbHVlPT09XCJudW1iZXJcIil7aWYoc2lnbil2YWx1ZT0tdmFsdWU7cmV0dXJuIG5ldyBTbWFsbEludGVnZXIodmFsdWUpfXJldHVybiBuZXcgQmlnSW50ZWdlcih2YWx1ZSxzaWduKX1mdW5jdGlvbiBzdWJ0cmFjdFNtYWxsKGEsYixzaWduKXt2YXIgbD1hLmxlbmd0aCxyPW5ldyBBcnJheShsKSxjYXJyeT0tYixiYXNlPUJBU0UsaSxkaWZmZXJlbmNlO2ZvcihpPTA7aTxsO2krKyl7ZGlmZmVyZW5jZT1hW2ldK2NhcnJ5O2NhcnJ5PU1hdGguZmxvb3IoZGlmZmVyZW5jZS9iYXNlKTtkaWZmZXJlbmNlJT1iYXNlO3JbaV09ZGlmZmVyZW5jZTwwP2RpZmZlcmVuY2UrYmFzZTpkaWZmZXJlbmNlfXI9YXJyYXlUb1NtYWxsKHIpO2lmKHR5cGVvZiByPT09XCJudW1iZXJcIil7aWYoc2lnbilyPS1yO3JldHVybiBuZXcgU21hbGxJbnRlZ2VyKHIpfXJldHVybiBuZXcgQmlnSW50ZWdlcihyLHNpZ24pfUJpZ0ludGVnZXIucHJvdG90eXBlLnN1YnRyYWN0PWZ1bmN0aW9uKHYpe3ZhciBuPXBhcnNlVmFsdWUodik7aWYodGhpcy5zaWduIT09bi5zaWduKXtyZXR1cm4gdGhpcy5hZGQobi5uZWdhdGUoKSl9dmFyIGE9dGhpcy52YWx1ZSxiPW4udmFsdWU7aWYobi5pc1NtYWxsKXJldHVybiBzdWJ0cmFjdFNtYWxsKGEsTWF0aC5hYnMoYiksdGhpcy5zaWduKTtyZXR1cm4gc3VidHJhY3RBbnkoYSxiLHRoaXMuc2lnbil9O0JpZ0ludGVnZXIucHJvdG90eXBlLm1pbnVzPUJpZ0ludGVnZXIucHJvdG90eXBlLnN1YnRyYWN0O1NtYWxsSW50ZWdlci5wcm90b3R5cGUuc3VidHJhY3Q9ZnVuY3Rpb24odil7dmFyIG49cGFyc2VWYWx1ZSh2KTt2YXIgYT10aGlzLnZhbHVlO2lmKGE8MCE9PW4uc2lnbil7cmV0dXJuIHRoaXMuYWRkKG4ubmVnYXRlKCkpfXZhciBiPW4udmFsdWU7aWYobi5pc1NtYWxsKXtyZXR1cm4gbmV3IFNtYWxsSW50ZWdlcihhLWIpfXJldHVybiBzdWJ0cmFjdFNtYWxsKGIsTWF0aC5hYnMoYSksYT49MCl9O1NtYWxsSW50ZWdlci5wcm90b3R5cGUubWludXM9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5zdWJ0cmFjdDtOYXRpdmVCaWdJbnQucHJvdG90eXBlLnN1YnRyYWN0PWZ1bmN0aW9uKHYpe3JldHVybiBuZXcgTmF0aXZlQmlnSW50KHRoaXMudmFsdWUtcGFyc2VWYWx1ZSh2KS52YWx1ZSl9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUubWludXM9TmF0aXZlQmlnSW50LnByb3RvdHlwZS5zdWJ0cmFjdDtCaWdJbnRlZ2VyLnByb3RvdHlwZS5uZWdhdGU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEJpZ0ludGVnZXIodGhpcy52YWx1ZSwhdGhpcy5zaWduKX07U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5uZWdhdGU9ZnVuY3Rpb24oKXt2YXIgc2lnbj10aGlzLnNpZ247dmFyIHNtYWxsPW5ldyBTbWFsbEludGVnZXIoLXRoaXMudmFsdWUpO3NtYWxsLnNpZ249IXNpZ247cmV0dXJuIHNtYWxsfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLm5lZ2F0ZT1mdW5jdGlvbigpe3JldHVybiBuZXcgTmF0aXZlQmlnSW50KC10aGlzLnZhbHVlKX07QmlnSW50ZWdlci5wcm90b3R5cGUuYWJzPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKHRoaXMudmFsdWUsZmFsc2UpfTtTbWFsbEludGVnZXIucHJvdG90eXBlLmFicz1mdW5jdGlvbigpe3JldHVybiBuZXcgU21hbGxJbnRlZ2VyKE1hdGguYWJzKHRoaXMudmFsdWUpKX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5hYnM9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IE5hdGl2ZUJpZ0ludCh0aGlzLnZhbHVlPj0wP3RoaXMudmFsdWU6LXRoaXMudmFsdWUpfTtmdW5jdGlvbiBtdWx0aXBseUxvbmcoYSxiKXt2YXIgYV9sPWEubGVuZ3RoLGJfbD1iLmxlbmd0aCxsPWFfbCtiX2wscj1jcmVhdGVBcnJheShsKSxiYXNlPUJBU0UscHJvZHVjdCxjYXJyeSxpLGFfaSxiX2o7Zm9yKGk9MDtpPGFfbDsrK2kpe2FfaT1hW2ldO2Zvcih2YXIgaj0wO2o8Yl9sOysrail7Yl9qPWJbal07cHJvZHVjdD1hX2kqYl9qK3JbaStqXTtjYXJyeT1NYXRoLmZsb29yKHByb2R1Y3QvYmFzZSk7cltpK2pdPXByb2R1Y3QtY2FycnkqYmFzZTtyW2kraisxXSs9Y2Fycnl9fXRyaW0ocik7cmV0dXJuIHJ9ZnVuY3Rpb24gbXVsdGlwbHlTbWFsbChhLGIpe3ZhciBsPWEubGVuZ3RoLHI9bmV3IEFycmF5KGwpLGJhc2U9QkFTRSxjYXJyeT0wLHByb2R1Y3QsaTtmb3IoaT0wO2k8bDtpKyspe3Byb2R1Y3Q9YVtpXSpiK2NhcnJ5O2NhcnJ5PU1hdGguZmxvb3IocHJvZHVjdC9iYXNlKTtyW2ldPXByb2R1Y3QtY2FycnkqYmFzZX13aGlsZShjYXJyeT4wKXtyW2krK109Y2FycnklYmFzZTtjYXJyeT1NYXRoLmZsb29yKGNhcnJ5L2Jhc2UpfXJldHVybiByfWZ1bmN0aW9uIHNoaWZ0TGVmdCh4LG4pe3ZhciByPVtdO3doaWxlKG4tLSA+MClyLnB1c2goMCk7cmV0dXJuIHIuY29uY2F0KHgpfWZ1bmN0aW9uIG11bHRpcGx5S2FyYXRzdWJhKHgseSl7dmFyIG49TWF0aC5tYXgoeC5sZW5ndGgseS5sZW5ndGgpO2lmKG48PTMwKXJldHVybiBtdWx0aXBseUxvbmcoeCx5KTtuPU1hdGguY2VpbChuLzIpO3ZhciBiPXguc2xpY2UobiksYT14LnNsaWNlKDAsbiksZD15LnNsaWNlKG4pLGM9eS5zbGljZSgwLG4pO3ZhciBhYz1tdWx0aXBseUthcmF0c3ViYShhLGMpLGJkPW11bHRpcGx5S2FyYXRzdWJhKGIsZCksYWJjZD1tdWx0aXBseUthcmF0c3ViYShhZGRBbnkoYSxiKSxhZGRBbnkoYyxkKSk7dmFyIHByb2R1Y3Q9YWRkQW55KGFkZEFueShhYyxzaGlmdExlZnQoc3VidHJhY3Qoc3VidHJhY3QoYWJjZCxhYyksYmQpLG4pKSxzaGlmdExlZnQoYmQsMipuKSk7dHJpbShwcm9kdWN0KTtyZXR1cm4gcHJvZHVjdH1mdW5jdGlvbiB1c2VLYXJhdHN1YmEobDEsbDIpe3JldHVybi0uMDEyKmwxLS4wMTIqbDIrMTVlLTYqbDEqbDI+MH1CaWdJbnRlZ2VyLnByb3RvdHlwZS5tdWx0aXBseT1mdW5jdGlvbih2KXt2YXIgbj1wYXJzZVZhbHVlKHYpLGE9dGhpcy52YWx1ZSxiPW4udmFsdWUsc2lnbj10aGlzLnNpZ24hPT1uLnNpZ24sYWJzO2lmKG4uaXNTbWFsbCl7aWYoYj09PTApcmV0dXJuIEludGVnZXJbMF07aWYoYj09PTEpcmV0dXJuIHRoaXM7aWYoYj09PS0xKXJldHVybiB0aGlzLm5lZ2F0ZSgpO2Ficz1NYXRoLmFicyhiKTtpZihhYnM8QkFTRSl7cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKG11bHRpcGx5U21hbGwoYSxhYnMpLHNpZ24pfWI9c21hbGxUb0FycmF5KGFicyl9aWYodXNlS2FyYXRzdWJhKGEubGVuZ3RoLGIubGVuZ3RoKSlyZXR1cm4gbmV3IEJpZ0ludGVnZXIobXVsdGlwbHlLYXJhdHN1YmEoYSxiKSxzaWduKTtyZXR1cm4gbmV3IEJpZ0ludGVnZXIobXVsdGlwbHlMb25nKGEsYiksc2lnbil9O0JpZ0ludGVnZXIucHJvdG90eXBlLnRpbWVzPUJpZ0ludGVnZXIucHJvdG90eXBlLm11bHRpcGx5O2Z1bmN0aW9uIG11bHRpcGx5U21hbGxBbmRBcnJheShhLGIsc2lnbil7aWYoYTxCQVNFKXtyZXR1cm4gbmV3IEJpZ0ludGVnZXIobXVsdGlwbHlTbWFsbChiLGEpLHNpZ24pfXJldHVybiBuZXcgQmlnSW50ZWdlcihtdWx0aXBseUxvbmcoYixzbWFsbFRvQXJyYXkoYSkpLHNpZ24pfVNtYWxsSW50ZWdlci5wcm90b3R5cGUuX211bHRpcGx5QnlTbWFsbD1mdW5jdGlvbihhKXtpZihpc1ByZWNpc2UoYS52YWx1ZSp0aGlzLnZhbHVlKSl7cmV0dXJuIG5ldyBTbWFsbEludGVnZXIoYS52YWx1ZSp0aGlzLnZhbHVlKX1yZXR1cm4gbXVsdGlwbHlTbWFsbEFuZEFycmF5KE1hdGguYWJzKGEudmFsdWUpLHNtYWxsVG9BcnJheShNYXRoLmFicyh0aGlzLnZhbHVlKSksdGhpcy5zaWduIT09YS5zaWduKX07QmlnSW50ZWdlci5wcm90b3R5cGUuX211bHRpcGx5QnlTbWFsbD1mdW5jdGlvbihhKXtpZihhLnZhbHVlPT09MClyZXR1cm4gSW50ZWdlclswXTtpZihhLnZhbHVlPT09MSlyZXR1cm4gdGhpcztpZihhLnZhbHVlPT09LTEpcmV0dXJuIHRoaXMubmVnYXRlKCk7cmV0dXJuIG11bHRpcGx5U21hbGxBbmRBcnJheShNYXRoLmFicyhhLnZhbHVlKSx0aGlzLnZhbHVlLHRoaXMuc2lnbiE9PWEuc2lnbil9O1NtYWxsSW50ZWdlci5wcm90b3R5cGUubXVsdGlwbHk9ZnVuY3Rpb24odil7cmV0dXJuIHBhcnNlVmFsdWUodikuX211bHRpcGx5QnlTbWFsbCh0aGlzKX07U21hbGxJbnRlZ2VyLnByb3RvdHlwZS50aW1lcz1TbWFsbEludGVnZXIucHJvdG90eXBlLm11bHRpcGx5O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUubXVsdGlwbHk9ZnVuY3Rpb24odil7cmV0dXJuIG5ldyBOYXRpdmVCaWdJbnQodGhpcy52YWx1ZSpwYXJzZVZhbHVlKHYpLnZhbHVlKX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS50aW1lcz1OYXRpdmVCaWdJbnQucHJvdG90eXBlLm11bHRpcGx5O2Z1bmN0aW9uIHNxdWFyZShhKXt2YXIgbD1hLmxlbmd0aCxyPWNyZWF0ZUFycmF5KGwrbCksYmFzZT1CQVNFLHByb2R1Y3QsY2FycnksaSxhX2ksYV9qO2ZvcihpPTA7aTxsO2krKyl7YV9pPWFbaV07Y2Fycnk9MC1hX2kqYV9pO2Zvcih2YXIgaj1pO2o8bDtqKyspe2Ffaj1hW2pdO3Byb2R1Y3Q9MiooYV9pKmFfaikrcltpK2pdK2NhcnJ5O2NhcnJ5PU1hdGguZmxvb3IocHJvZHVjdC9iYXNlKTtyW2kral09cHJvZHVjdC1jYXJyeSpiYXNlfXJbaStsXT1jYXJyeX10cmltKHIpO3JldHVybiByfUJpZ0ludGVnZXIucHJvdG90eXBlLnNxdWFyZT1mdW5jdGlvbigpe3JldHVybiBuZXcgQmlnSW50ZWdlcihzcXVhcmUodGhpcy52YWx1ZSksZmFsc2UpfTtTbWFsbEludGVnZXIucHJvdG90eXBlLnNxdWFyZT1mdW5jdGlvbigpe3ZhciB2YWx1ZT10aGlzLnZhbHVlKnRoaXMudmFsdWU7aWYoaXNQcmVjaXNlKHZhbHVlKSlyZXR1cm4gbmV3IFNtYWxsSW50ZWdlcih2YWx1ZSk7cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKHNxdWFyZShzbWFsbFRvQXJyYXkoTWF0aC5hYnModGhpcy52YWx1ZSkpKSxmYWxzZSl9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuc3F1YXJlPWZ1bmN0aW9uKHYpe3JldHVybiBuZXcgTmF0aXZlQmlnSW50KHRoaXMudmFsdWUqdGhpcy52YWx1ZSl9O2Z1bmN0aW9uIGRpdk1vZDEoYSxiKXt2YXIgYV9sPWEubGVuZ3RoLGJfbD1iLmxlbmd0aCxiYXNlPUJBU0UscmVzdWx0PWNyZWF0ZUFycmF5KGIubGVuZ3RoKSxkaXZpc29yTW9zdFNpZ25pZmljYW50RGlnaXQ9YltiX2wtMV0sbGFtYmRhPU1hdGguY2VpbChiYXNlLygyKmRpdmlzb3JNb3N0U2lnbmlmaWNhbnREaWdpdCkpLHJlbWFpbmRlcj1tdWx0aXBseVNtYWxsKGEsbGFtYmRhKSxkaXZpc29yPW11bHRpcGx5U21hbGwoYixsYW1iZGEpLHF1b3RpZW50RGlnaXQsc2hpZnQsY2FycnksYm9ycm93LGksbCxxO2lmKHJlbWFpbmRlci5sZW5ndGg8PWFfbClyZW1haW5kZXIucHVzaCgwKTtkaXZpc29yLnB1c2goMCk7ZGl2aXNvck1vc3RTaWduaWZpY2FudERpZ2l0PWRpdmlzb3JbYl9sLTFdO2ZvcihzaGlmdD1hX2wtYl9sO3NoaWZ0Pj0wO3NoaWZ0LS0pe3F1b3RpZW50RGlnaXQ9YmFzZS0xO2lmKHJlbWFpbmRlcltzaGlmdCtiX2xdIT09ZGl2aXNvck1vc3RTaWduaWZpY2FudERpZ2l0KXtxdW90aWVudERpZ2l0PU1hdGguZmxvb3IoKHJlbWFpbmRlcltzaGlmdCtiX2xdKmJhc2UrcmVtYWluZGVyW3NoaWZ0K2JfbC0xXSkvZGl2aXNvck1vc3RTaWduaWZpY2FudERpZ2l0KX1jYXJyeT0wO2JvcnJvdz0wO2w9ZGl2aXNvci5sZW5ndGg7Zm9yKGk9MDtpPGw7aSsrKXtjYXJyeSs9cXVvdGllbnREaWdpdCpkaXZpc29yW2ldO3E9TWF0aC5mbG9vcihjYXJyeS9iYXNlKTtib3Jyb3crPXJlbWFpbmRlcltzaGlmdCtpXS0oY2FycnktcSpiYXNlKTtjYXJyeT1xO2lmKGJvcnJvdzwwKXtyZW1haW5kZXJbc2hpZnQraV09Ym9ycm93K2Jhc2U7Ym9ycm93PS0xfWVsc2V7cmVtYWluZGVyW3NoaWZ0K2ldPWJvcnJvdztib3Jyb3c9MH19d2hpbGUoYm9ycm93IT09MCl7cXVvdGllbnREaWdpdC09MTtjYXJyeT0wO2ZvcihpPTA7aTxsO2krKyl7Y2FycnkrPXJlbWFpbmRlcltzaGlmdCtpXS1iYXNlK2Rpdmlzb3JbaV07aWYoY2Fycnk8MCl7cmVtYWluZGVyW3NoaWZ0K2ldPWNhcnJ5K2Jhc2U7Y2Fycnk9MH1lbHNle3JlbWFpbmRlcltzaGlmdCtpXT1jYXJyeTtjYXJyeT0xfX1ib3Jyb3crPWNhcnJ5fXJlc3VsdFtzaGlmdF09cXVvdGllbnREaWdpdH1yZW1haW5kZXI9ZGl2TW9kU21hbGwocmVtYWluZGVyLGxhbWJkYSlbMF07cmV0dXJuW2FycmF5VG9TbWFsbChyZXN1bHQpLGFycmF5VG9TbWFsbChyZW1haW5kZXIpXX1mdW5jdGlvbiBkaXZNb2QyKGEsYil7dmFyIGFfbD1hLmxlbmd0aCxiX2w9Yi5sZW5ndGgscmVzdWx0PVtdLHBhcnQ9W10sYmFzZT1CQVNFLGd1ZXNzLHhsZW4saGlnaHgsaGlnaHksY2hlY2s7d2hpbGUoYV9sKXtwYXJ0LnVuc2hpZnQoYVstLWFfbF0pO3RyaW0ocGFydCk7aWYoY29tcGFyZUFicyhwYXJ0LGIpPDApe3Jlc3VsdC5wdXNoKDApO2NvbnRpbnVlfXhsZW49cGFydC5sZW5ndGg7aGlnaHg9cGFydFt4bGVuLTFdKmJhc2UrcGFydFt4bGVuLTJdO2hpZ2h5PWJbYl9sLTFdKmJhc2UrYltiX2wtMl07aWYoeGxlbj5iX2wpe2hpZ2h4PShoaWdoeCsxKSpiYXNlfWd1ZXNzPU1hdGguY2VpbChoaWdoeC9oaWdoeSk7ZG97Y2hlY2s9bXVsdGlwbHlTbWFsbChiLGd1ZXNzKTtpZihjb21wYXJlQWJzKGNoZWNrLHBhcnQpPD0wKWJyZWFrO2d1ZXNzLS19d2hpbGUoZ3Vlc3MpO3Jlc3VsdC5wdXNoKGd1ZXNzKTtwYXJ0PXN1YnRyYWN0KHBhcnQsY2hlY2spfXJlc3VsdC5yZXZlcnNlKCk7cmV0dXJuW2FycmF5VG9TbWFsbChyZXN1bHQpLGFycmF5VG9TbWFsbChwYXJ0KV19ZnVuY3Rpb24gZGl2TW9kU21hbGwodmFsdWUsbGFtYmRhKXt2YXIgbGVuZ3RoPXZhbHVlLmxlbmd0aCxxdW90aWVudD1jcmVhdGVBcnJheShsZW5ndGgpLGJhc2U9QkFTRSxpLHEscmVtYWluZGVyLGRpdmlzb3I7cmVtYWluZGVyPTA7Zm9yKGk9bGVuZ3RoLTE7aT49MDstLWkpe2Rpdmlzb3I9cmVtYWluZGVyKmJhc2UrdmFsdWVbaV07cT10cnVuY2F0ZShkaXZpc29yL2xhbWJkYSk7cmVtYWluZGVyPWRpdmlzb3ItcSpsYW1iZGE7cXVvdGllbnRbaV09cXwwfXJldHVybltxdW90aWVudCxyZW1haW5kZXJ8MF19ZnVuY3Rpb24gZGl2TW9kQW55KHNlbGYsdil7dmFyIHZhbHVlLG49cGFyc2VWYWx1ZSh2KTtpZihzdXBwb3J0c05hdGl2ZUJpZ0ludCl7cmV0dXJuW25ldyBOYXRpdmVCaWdJbnQoc2VsZi52YWx1ZS9uLnZhbHVlKSxuZXcgTmF0aXZlQmlnSW50KHNlbGYudmFsdWUlbi52YWx1ZSldfXZhciBhPXNlbGYudmFsdWUsYj1uLnZhbHVlO3ZhciBxdW90aWVudDtpZihiPT09MCl0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZGl2aWRlIGJ5IHplcm9cIik7aWYoc2VsZi5pc1NtYWxsKXtpZihuLmlzU21hbGwpe3JldHVybltuZXcgU21hbGxJbnRlZ2VyKHRydW5jYXRlKGEvYikpLG5ldyBTbWFsbEludGVnZXIoYSViKV19cmV0dXJuW0ludGVnZXJbMF0sc2VsZl19aWYobi5pc1NtYWxsKXtpZihiPT09MSlyZXR1cm5bc2VsZixJbnRlZ2VyWzBdXTtpZihiPT0tMSlyZXR1cm5bc2VsZi5uZWdhdGUoKSxJbnRlZ2VyWzBdXTt2YXIgYWJzPU1hdGguYWJzKGIpO2lmKGFiczxCQVNFKXt2YWx1ZT1kaXZNb2RTbWFsbChhLGFicyk7cXVvdGllbnQ9YXJyYXlUb1NtYWxsKHZhbHVlWzBdKTt2YXIgcmVtYWluZGVyPXZhbHVlWzFdO2lmKHNlbGYuc2lnbilyZW1haW5kZXI9LXJlbWFpbmRlcjtpZih0eXBlb2YgcXVvdGllbnQ9PT1cIm51bWJlclwiKXtpZihzZWxmLnNpZ24hPT1uLnNpZ24pcXVvdGllbnQ9LXF1b3RpZW50O3JldHVybltuZXcgU21hbGxJbnRlZ2VyKHF1b3RpZW50KSxuZXcgU21hbGxJbnRlZ2VyKHJlbWFpbmRlcildfXJldHVybltuZXcgQmlnSW50ZWdlcihxdW90aWVudCxzZWxmLnNpZ24hPT1uLnNpZ24pLG5ldyBTbWFsbEludGVnZXIocmVtYWluZGVyKV19Yj1zbWFsbFRvQXJyYXkoYWJzKX12YXIgY29tcGFyaXNvbj1jb21wYXJlQWJzKGEsYik7aWYoY29tcGFyaXNvbj09PS0xKXJldHVybltJbnRlZ2VyWzBdLHNlbGZdO2lmKGNvbXBhcmlzb249PT0wKXJldHVybltJbnRlZ2VyW3NlbGYuc2lnbj09PW4uc2lnbj8xOi0xXSxJbnRlZ2VyWzBdXTtpZihhLmxlbmd0aCtiLmxlbmd0aDw9MjAwKXZhbHVlPWRpdk1vZDEoYSxiKTtlbHNlIHZhbHVlPWRpdk1vZDIoYSxiKTtxdW90aWVudD12YWx1ZVswXTt2YXIgcVNpZ249c2VsZi5zaWduIT09bi5zaWduLG1vZD12YWx1ZVsxXSxtU2lnbj1zZWxmLnNpZ247aWYodHlwZW9mIHF1b3RpZW50PT09XCJudW1iZXJcIil7aWYocVNpZ24pcXVvdGllbnQ9LXF1b3RpZW50O3F1b3RpZW50PW5ldyBTbWFsbEludGVnZXIocXVvdGllbnQpfWVsc2UgcXVvdGllbnQ9bmV3IEJpZ0ludGVnZXIocXVvdGllbnQscVNpZ24pO2lmKHR5cGVvZiBtb2Q9PT1cIm51bWJlclwiKXtpZihtU2lnbiltb2Q9LW1vZDttb2Q9bmV3IFNtYWxsSW50ZWdlcihtb2QpfWVsc2UgbW9kPW5ldyBCaWdJbnRlZ2VyKG1vZCxtU2lnbik7cmV0dXJuW3F1b3RpZW50LG1vZF19QmlnSW50ZWdlci5wcm90b3R5cGUuZGl2bW9kPWZ1bmN0aW9uKHYpe3ZhciByZXN1bHQ9ZGl2TW9kQW55KHRoaXMsdik7cmV0dXJue3F1b3RpZW50OnJlc3VsdFswXSxyZW1haW5kZXI6cmVzdWx0WzFdfX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5kaXZtb2Q9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5kaXZtb2Q9QmlnSW50ZWdlci5wcm90b3R5cGUuZGl2bW9kO0JpZ0ludGVnZXIucHJvdG90eXBlLmRpdmlkZT1mdW5jdGlvbih2KXtyZXR1cm4gZGl2TW9kQW55KHRoaXMsdilbMF19O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUub3Zlcj1OYXRpdmVCaWdJbnQucHJvdG90eXBlLmRpdmlkZT1mdW5jdGlvbih2KXtyZXR1cm4gbmV3IE5hdGl2ZUJpZ0ludCh0aGlzLnZhbHVlL3BhcnNlVmFsdWUodikudmFsdWUpfTtTbWFsbEludGVnZXIucHJvdG90eXBlLm92ZXI9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGU9QmlnSW50ZWdlci5wcm90b3R5cGUub3Zlcj1CaWdJbnRlZ2VyLnByb3RvdHlwZS5kaXZpZGU7QmlnSW50ZWdlci5wcm90b3R5cGUubW9kPWZ1bmN0aW9uKHYpe3JldHVybiBkaXZNb2RBbnkodGhpcyx2KVsxXX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5tb2Q9TmF0aXZlQmlnSW50LnByb3RvdHlwZS5yZW1haW5kZXI9ZnVuY3Rpb24odil7cmV0dXJuIG5ldyBOYXRpdmVCaWdJbnQodGhpcy52YWx1ZSVwYXJzZVZhbHVlKHYpLnZhbHVlKX07U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5yZW1haW5kZXI9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5tb2Q9QmlnSW50ZWdlci5wcm90b3R5cGUucmVtYWluZGVyPUJpZ0ludGVnZXIucHJvdG90eXBlLm1vZDtCaWdJbnRlZ2VyLnByb3RvdHlwZS5wb3c9ZnVuY3Rpb24odil7dmFyIG49cGFyc2VWYWx1ZSh2KSxhPXRoaXMudmFsdWUsYj1uLnZhbHVlLHZhbHVlLHgseTtpZihiPT09MClyZXR1cm4gSW50ZWdlclsxXTtpZihhPT09MClyZXR1cm4gSW50ZWdlclswXTtpZihhPT09MSlyZXR1cm4gSW50ZWdlclsxXTtpZihhPT09LTEpcmV0dXJuIG4uaXNFdmVuKCk/SW50ZWdlclsxXTpJbnRlZ2VyWy0xXTtpZihuLnNpZ24pe3JldHVybiBJbnRlZ2VyWzBdfWlmKCFuLmlzU21hbGwpdGhyb3cgbmV3IEVycm9yKFwiVGhlIGV4cG9uZW50IFwiK24udG9TdHJpbmcoKStcIiBpcyB0b28gbGFyZ2UuXCIpO2lmKHRoaXMuaXNTbWFsbCl7aWYoaXNQcmVjaXNlKHZhbHVlPU1hdGgucG93KGEsYikpKXJldHVybiBuZXcgU21hbGxJbnRlZ2VyKHRydW5jYXRlKHZhbHVlKSl9eD10aGlzO3k9SW50ZWdlclsxXTt3aGlsZSh0cnVlKXtpZihiJjE9PT0xKXt5PXkudGltZXMoeCk7LS1ifWlmKGI9PT0wKWJyZWFrO2IvPTI7eD14LnNxdWFyZSgpfXJldHVybiB5fTtTbWFsbEludGVnZXIucHJvdG90eXBlLnBvdz1CaWdJbnRlZ2VyLnByb3RvdHlwZS5wb3c7TmF0aXZlQmlnSW50LnByb3RvdHlwZS5wb3c9ZnVuY3Rpb24odil7dmFyIG49cGFyc2VWYWx1ZSh2KTt2YXIgYT10aGlzLnZhbHVlLGI9bi52YWx1ZTt2YXIgXzA9QmlnSW50KDApLF8xPUJpZ0ludCgxKSxfMj1CaWdJbnQoMik7aWYoYj09PV8wKXJldHVybiBJbnRlZ2VyWzFdO2lmKGE9PT1fMClyZXR1cm4gSW50ZWdlclswXTtpZihhPT09XzEpcmV0dXJuIEludGVnZXJbMV07aWYoYT09PUJpZ0ludCgtMSkpcmV0dXJuIG4uaXNFdmVuKCk/SW50ZWdlclsxXTpJbnRlZ2VyWy0xXTtpZihuLmlzTmVnYXRpdmUoKSlyZXR1cm4gbmV3IE5hdGl2ZUJpZ0ludChfMCk7dmFyIHg9dGhpczt2YXIgeT1JbnRlZ2VyWzFdO3doaWxlKHRydWUpe2lmKChiJl8xKT09PV8xKXt5PXkudGltZXMoeCk7LS1ifWlmKGI9PT1fMClicmVhaztiLz1fMjt4PXguc3F1YXJlKCl9cmV0dXJuIHl9O0JpZ0ludGVnZXIucHJvdG90eXBlLm1vZFBvdz1mdW5jdGlvbihleHAsbW9kKXtleHA9cGFyc2VWYWx1ZShleHApO21vZD1wYXJzZVZhbHVlKG1vZCk7aWYobW9kLmlzWmVybygpKXRocm93IG5ldyBFcnJvcihcIkNhbm5vdCB0YWtlIG1vZFBvdyB3aXRoIG1vZHVsdXMgMFwiKTt2YXIgcj1JbnRlZ2VyWzFdLGJhc2U9dGhpcy5tb2QobW9kKTt3aGlsZShleHAuaXNQb3NpdGl2ZSgpKXtpZihiYXNlLmlzWmVybygpKXJldHVybiBJbnRlZ2VyWzBdO2lmKGV4cC5pc09kZCgpKXI9ci5tdWx0aXBseShiYXNlKS5tb2QobW9kKTtleHA9ZXhwLmRpdmlkZSgyKTtiYXNlPWJhc2Uuc3F1YXJlKCkubW9kKG1vZCl9cmV0dXJuIHJ9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUubW9kUG93PVNtYWxsSW50ZWdlci5wcm90b3R5cGUubW9kUG93PUJpZ0ludGVnZXIucHJvdG90eXBlLm1vZFBvdztmdW5jdGlvbiBjb21wYXJlQWJzKGEsYil7aWYoYS5sZW5ndGghPT1iLmxlbmd0aCl7cmV0dXJuIGEubGVuZ3RoPmIubGVuZ3RoPzE6LTF9Zm9yKHZhciBpPWEubGVuZ3RoLTE7aT49MDtpLS0pe2lmKGFbaV0hPT1iW2ldKXJldHVybiBhW2ldPmJbaV0/MTotMX1yZXR1cm4gMH1CaWdJbnRlZ2VyLnByb3RvdHlwZS5jb21wYXJlQWJzPWZ1bmN0aW9uKHYpe3ZhciBuPXBhcnNlVmFsdWUodiksYT10aGlzLnZhbHVlLGI9bi52YWx1ZTtpZihuLmlzU21hbGwpcmV0dXJuIDE7cmV0dXJuIGNvbXBhcmVBYnMoYSxiKX07U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5jb21wYXJlQWJzPWZ1bmN0aW9uKHYpe3ZhciBuPXBhcnNlVmFsdWUodiksYT1NYXRoLmFicyh0aGlzLnZhbHVlKSxiPW4udmFsdWU7aWYobi5pc1NtYWxsKXtiPU1hdGguYWJzKGIpO3JldHVybiBhPT09Yj8wOmE+Yj8xOi0xfXJldHVybi0xfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmNvbXBhcmVBYnM9ZnVuY3Rpb24odil7dmFyIGE9dGhpcy52YWx1ZTt2YXIgYj1wYXJzZVZhbHVlKHYpLnZhbHVlO2E9YT49MD9hOi1hO2I9Yj49MD9iOi1iO3JldHVybiBhPT09Yj8wOmE+Yj8xOi0xfTtCaWdJbnRlZ2VyLnByb3RvdHlwZS5jb21wYXJlPWZ1bmN0aW9uKHYpe2lmKHY9PT1JbmZpbml0eSl7cmV0dXJuLTF9aWYodj09PS1JbmZpbml0eSl7cmV0dXJuIDF9dmFyIG49cGFyc2VWYWx1ZSh2KSxhPXRoaXMudmFsdWUsYj1uLnZhbHVlO2lmKHRoaXMuc2lnbiE9PW4uc2lnbil7cmV0dXJuIG4uc2lnbj8xOi0xfWlmKG4uaXNTbWFsbCl7cmV0dXJuIHRoaXMuc2lnbj8tMToxfXJldHVybiBjb21wYXJlQWJzKGEsYikqKHRoaXMuc2lnbj8tMToxKX07QmlnSW50ZWdlci5wcm90b3R5cGUuY29tcGFyZVRvPUJpZ0ludGVnZXIucHJvdG90eXBlLmNvbXBhcmU7U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5jb21wYXJlPWZ1bmN0aW9uKHYpe2lmKHY9PT1JbmZpbml0eSl7cmV0dXJuLTF9aWYodj09PS1JbmZpbml0eSl7cmV0dXJuIDF9dmFyIG49cGFyc2VWYWx1ZSh2KSxhPXRoaXMudmFsdWUsYj1uLnZhbHVlO2lmKG4uaXNTbWFsbCl7cmV0dXJuIGE9PWI/MDphPmI/MTotMX1pZihhPDAhPT1uLnNpZ24pe3JldHVybiBhPDA/LTE6MX1yZXR1cm4gYTwwPzE6LTF9O1NtYWxsSW50ZWdlci5wcm90b3R5cGUuY29tcGFyZVRvPVNtYWxsSW50ZWdlci5wcm90b3R5cGUuY29tcGFyZTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmNvbXBhcmU9ZnVuY3Rpb24odil7aWYodj09PUluZmluaXR5KXtyZXR1cm4tMX1pZih2PT09LUluZmluaXR5KXtyZXR1cm4gMX12YXIgYT10aGlzLnZhbHVlO3ZhciBiPXBhcnNlVmFsdWUodikudmFsdWU7cmV0dXJuIGE9PT1iPzA6YT5iPzE6LTF9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuY29tcGFyZVRvPU5hdGl2ZUJpZ0ludC5wcm90b3R5cGUuY29tcGFyZTtCaWdJbnRlZ2VyLnByb3RvdHlwZS5lcXVhbHM9ZnVuY3Rpb24odil7cmV0dXJuIHRoaXMuY29tcGFyZSh2KT09PTB9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuZXE9TmF0aXZlQmlnSW50LnByb3RvdHlwZS5lcXVhbHM9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5lcT1TbWFsbEludGVnZXIucHJvdG90eXBlLmVxdWFscz1CaWdJbnRlZ2VyLnByb3RvdHlwZS5lcT1CaWdJbnRlZ2VyLnByb3RvdHlwZS5lcXVhbHM7QmlnSW50ZWdlci5wcm90b3R5cGUubm90RXF1YWxzPWZ1bmN0aW9uKHYpe3JldHVybiB0aGlzLmNvbXBhcmUodikhPT0wfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLm5lcT1OYXRpdmVCaWdJbnQucHJvdG90eXBlLm5vdEVxdWFscz1TbWFsbEludGVnZXIucHJvdG90eXBlLm5lcT1TbWFsbEludGVnZXIucHJvdG90eXBlLm5vdEVxdWFscz1CaWdJbnRlZ2VyLnByb3RvdHlwZS5uZXE9QmlnSW50ZWdlci5wcm90b3R5cGUubm90RXF1YWxzO0JpZ0ludGVnZXIucHJvdG90eXBlLmdyZWF0ZXI9ZnVuY3Rpb24odil7cmV0dXJuIHRoaXMuY29tcGFyZSh2KT4wfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmd0PU5hdGl2ZUJpZ0ludC5wcm90b3R5cGUuZ3JlYXRlcj1TbWFsbEludGVnZXIucHJvdG90eXBlLmd0PVNtYWxsSW50ZWdlci5wcm90b3R5cGUuZ3JlYXRlcj1CaWdJbnRlZ2VyLnByb3RvdHlwZS5ndD1CaWdJbnRlZ2VyLnByb3RvdHlwZS5ncmVhdGVyO0JpZ0ludGVnZXIucHJvdG90eXBlLmxlc3Nlcj1mdW5jdGlvbih2KXtyZXR1cm4gdGhpcy5jb21wYXJlKHYpPDB9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUubHQ9TmF0aXZlQmlnSW50LnByb3RvdHlwZS5sZXNzZXI9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5sdD1TbWFsbEludGVnZXIucHJvdG90eXBlLmxlc3Nlcj1CaWdJbnRlZ2VyLnByb3RvdHlwZS5sdD1CaWdJbnRlZ2VyLnByb3RvdHlwZS5sZXNzZXI7QmlnSW50ZWdlci5wcm90b3R5cGUuZ3JlYXRlck9yRXF1YWxzPWZ1bmN0aW9uKHYpe3JldHVybiB0aGlzLmNvbXBhcmUodik+PTB9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuZ2VxPU5hdGl2ZUJpZ0ludC5wcm90b3R5cGUuZ3JlYXRlck9yRXF1YWxzPVNtYWxsSW50ZWdlci5wcm90b3R5cGUuZ2VxPVNtYWxsSW50ZWdlci5wcm90b3R5cGUuZ3JlYXRlck9yRXF1YWxzPUJpZ0ludGVnZXIucHJvdG90eXBlLmdlcT1CaWdJbnRlZ2VyLnByb3RvdHlwZS5ncmVhdGVyT3JFcXVhbHM7QmlnSW50ZWdlci5wcm90b3R5cGUubGVzc2VyT3JFcXVhbHM9ZnVuY3Rpb24odil7cmV0dXJuIHRoaXMuY29tcGFyZSh2KTw9MH07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5sZXE9TmF0aXZlQmlnSW50LnByb3RvdHlwZS5sZXNzZXJPckVxdWFscz1TbWFsbEludGVnZXIucHJvdG90eXBlLmxlcT1TbWFsbEludGVnZXIucHJvdG90eXBlLmxlc3Nlck9yRXF1YWxzPUJpZ0ludGVnZXIucHJvdG90eXBlLmxlcT1CaWdJbnRlZ2VyLnByb3RvdHlwZS5sZXNzZXJPckVxdWFscztCaWdJbnRlZ2VyLnByb3RvdHlwZS5pc0V2ZW49ZnVuY3Rpb24oKXtyZXR1cm4odGhpcy52YWx1ZVswXSYxKT09PTB9O1NtYWxsSW50ZWdlci5wcm90b3R5cGUuaXNFdmVuPWZ1bmN0aW9uKCl7cmV0dXJuKHRoaXMudmFsdWUmMSk9PT0wfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmlzRXZlbj1mdW5jdGlvbigpe3JldHVybih0aGlzLnZhbHVlJkJpZ0ludCgxKSk9PT1CaWdJbnQoMCl9O0JpZ0ludGVnZXIucHJvdG90eXBlLmlzT2RkPWZ1bmN0aW9uKCl7cmV0dXJuKHRoaXMudmFsdWVbMF0mMSk9PT0xfTtTbWFsbEludGVnZXIucHJvdG90eXBlLmlzT2RkPWZ1bmN0aW9uKCl7cmV0dXJuKHRoaXMudmFsdWUmMSk9PT0xfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmlzT2RkPWZ1bmN0aW9uKCl7cmV0dXJuKHRoaXMudmFsdWUmQmlnSW50KDEpKT09PUJpZ0ludCgxKX07QmlnSW50ZWdlci5wcm90b3R5cGUuaXNQb3NpdGl2ZT1mdW5jdGlvbigpe3JldHVybiF0aGlzLnNpZ259O1NtYWxsSW50ZWdlci5wcm90b3R5cGUuaXNQb3NpdGl2ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlPjB9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuaXNQb3NpdGl2ZT1TbWFsbEludGVnZXIucHJvdG90eXBlLmlzUG9zaXRpdmU7QmlnSW50ZWdlci5wcm90b3R5cGUuaXNOZWdhdGl2ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNpZ259O1NtYWxsSW50ZWdlci5wcm90b3R5cGUuaXNOZWdhdGl2ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlPDB9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuaXNOZWdhdGl2ZT1TbWFsbEludGVnZXIucHJvdG90eXBlLmlzTmVnYXRpdmU7QmlnSW50ZWdlci5wcm90b3R5cGUuaXNVbml0PWZ1bmN0aW9uKCl7cmV0dXJuIGZhbHNlfTtTbWFsbEludGVnZXIucHJvdG90eXBlLmlzVW5pdD1mdW5jdGlvbigpe3JldHVybiBNYXRoLmFicyh0aGlzLnZhbHVlKT09PTF9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuaXNVbml0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYWJzKCkudmFsdWU9PT1CaWdJbnQoMSl9O0JpZ0ludGVnZXIucHJvdG90eXBlLmlzWmVybz1mdW5jdGlvbigpe3JldHVybiBmYWxzZX07U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5pc1plcm89ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZT09PTB9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUuaXNaZXJvPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWU9PT1CaWdJbnQoMCl9O0JpZ0ludGVnZXIucHJvdG90eXBlLmlzRGl2aXNpYmxlQnk9ZnVuY3Rpb24odil7dmFyIG49cGFyc2VWYWx1ZSh2KTtpZihuLmlzWmVybygpKXJldHVybiBmYWxzZTtpZihuLmlzVW5pdCgpKXJldHVybiB0cnVlO2lmKG4uY29tcGFyZUFicygyKT09PTApcmV0dXJuIHRoaXMuaXNFdmVuKCk7cmV0dXJuIHRoaXMubW9kKG4pLmlzWmVybygpfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmlzRGl2aXNpYmxlQnk9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5pc0RpdmlzaWJsZUJ5PUJpZ0ludGVnZXIucHJvdG90eXBlLmlzRGl2aXNpYmxlQnk7ZnVuY3Rpb24gaXNCYXNpY1ByaW1lKHYpe3ZhciBuPXYuYWJzKCk7aWYobi5pc1VuaXQoKSlyZXR1cm4gZmFsc2U7aWYobi5lcXVhbHMoMil8fG4uZXF1YWxzKDMpfHxuLmVxdWFscyg1KSlyZXR1cm4gdHJ1ZTtpZihuLmlzRXZlbigpfHxuLmlzRGl2aXNpYmxlQnkoMyl8fG4uaXNEaXZpc2libGVCeSg1KSlyZXR1cm4gZmFsc2U7aWYobi5sZXNzZXIoNDkpKXJldHVybiB0cnVlfWZ1bmN0aW9uIG1pbGxlclJhYmluVGVzdChuLGEpe3ZhciBuUHJldj1uLnByZXYoKSxiPW5QcmV2LHI9MCxkLHQsaSx4O3doaWxlKGIuaXNFdmVuKCkpYj1iLmRpdmlkZSgyKSxyKys7bmV4dDpmb3IoaT0wO2k8YS5sZW5ndGg7aSsrKXtpZihuLmxlc3NlcihhW2ldKSljb250aW51ZTt4PWJpZ0ludChhW2ldKS5tb2RQb3coYixuKTtpZih4LmlzVW5pdCgpfHx4LmVxdWFscyhuUHJldikpY29udGludWU7Zm9yKGQ9ci0xO2QhPTA7ZC0tKXt4PXguc3F1YXJlKCkubW9kKG4pO2lmKHguaXNVbml0KCkpcmV0dXJuIGZhbHNlO2lmKHguZXF1YWxzKG5QcmV2KSljb250aW51ZSBuZXh0fXJldHVybiBmYWxzZX1yZXR1cm4gdHJ1ZX1CaWdJbnRlZ2VyLnByb3RvdHlwZS5pc1ByaW1lPWZ1bmN0aW9uKHN0cmljdCl7dmFyIGlzUHJpbWU9aXNCYXNpY1ByaW1lKHRoaXMpO2lmKGlzUHJpbWUhPT11bmRlZmluZWQpcmV0dXJuIGlzUHJpbWU7dmFyIG49dGhpcy5hYnMoKTt2YXIgYml0cz1uLmJpdExlbmd0aCgpO2lmKGJpdHM8PTY0KXJldHVybiBtaWxsZXJSYWJpblRlc3QobixbMiwzLDUsNywxMSwxMywxNywxOSwyMywyOSwzMSwzN10pO3ZhciBsb2dOPU1hdGgubG9nKDIpKmJpdHMudG9KU051bWJlcigpO3ZhciB0PU1hdGguY2VpbChzdHJpY3Q9PT10cnVlPzIqTWF0aC5wb3cobG9nTiwyKTpsb2dOKTtmb3IodmFyIGE9W10saT0wO2k8dDtpKyspe2EucHVzaChiaWdJbnQoaSsyKSl9cmV0dXJuIG1pbGxlclJhYmluVGVzdChuLGEpfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmlzUHJpbWU9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5pc1ByaW1lPUJpZ0ludGVnZXIucHJvdG90eXBlLmlzUHJpbWU7QmlnSW50ZWdlci5wcm90b3R5cGUuaXNQcm9iYWJsZVByaW1lPWZ1bmN0aW9uKGl0ZXJhdGlvbnMpe3ZhciBpc1ByaW1lPWlzQmFzaWNQcmltZSh0aGlzKTtpZihpc1ByaW1lIT09dW5kZWZpbmVkKXJldHVybiBpc1ByaW1lO3ZhciBuPXRoaXMuYWJzKCk7dmFyIHQ9aXRlcmF0aW9ucz09PXVuZGVmaW5lZD81Oml0ZXJhdGlvbnM7Zm9yKHZhciBhPVtdLGk9MDtpPHQ7aSsrKXthLnB1c2goYmlnSW50LnJhbmRCZXR3ZWVuKDIsbi5taW51cygyKSkpfXJldHVybiBtaWxsZXJSYWJpblRlc3QobixhKX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5pc1Byb2JhYmxlUHJpbWU9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5pc1Byb2JhYmxlUHJpbWU9QmlnSW50ZWdlci5wcm90b3R5cGUuaXNQcm9iYWJsZVByaW1lO0JpZ0ludGVnZXIucHJvdG90eXBlLm1vZEludj1mdW5jdGlvbihuKXt2YXIgdD1iaWdJbnQuemVybyxuZXdUPWJpZ0ludC5vbmUscj1wYXJzZVZhbHVlKG4pLG5ld1I9dGhpcy5hYnMoKSxxLGxhc3RULGxhc3RSO3doaWxlKCFuZXdSLmlzWmVybygpKXtxPXIuZGl2aWRlKG5ld1IpO2xhc3RUPXQ7bGFzdFI9cjt0PW5ld1Q7cj1uZXdSO25ld1Q9bGFzdFQuc3VidHJhY3QocS5tdWx0aXBseShuZXdUKSk7bmV3Uj1sYXN0Ui5zdWJ0cmFjdChxLm11bHRpcGx5KG5ld1IpKX1pZighci5pc1VuaXQoKSl0aHJvdyBuZXcgRXJyb3IodGhpcy50b1N0cmluZygpK1wiIGFuZCBcIituLnRvU3RyaW5nKCkrXCIgYXJlIG5vdCBjby1wcmltZVwiKTtpZih0LmNvbXBhcmUoMCk9PT0tMSl7dD10LmFkZChuKX1pZih0aGlzLmlzTmVnYXRpdmUoKSl7cmV0dXJuIHQubmVnYXRlKCl9cmV0dXJuIHR9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUubW9kSW52PVNtYWxsSW50ZWdlci5wcm90b3R5cGUubW9kSW52PUJpZ0ludGVnZXIucHJvdG90eXBlLm1vZEludjtCaWdJbnRlZ2VyLnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKCl7dmFyIHZhbHVlPXRoaXMudmFsdWU7aWYodGhpcy5zaWduKXtyZXR1cm4gc3VidHJhY3RTbWFsbCh2YWx1ZSwxLHRoaXMuc2lnbil9cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKGFkZFNtYWxsKHZhbHVlLDEpLHRoaXMuc2lnbil9O1NtYWxsSW50ZWdlci5wcm90b3R5cGUubmV4dD1mdW5jdGlvbigpe3ZhciB2YWx1ZT10aGlzLnZhbHVlO2lmKHZhbHVlKzE8TUFYX0lOVClyZXR1cm4gbmV3IFNtYWxsSW50ZWdlcih2YWx1ZSsxKTtyZXR1cm4gbmV3IEJpZ0ludGVnZXIoTUFYX0lOVF9BUlIsZmFsc2UpfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IE5hdGl2ZUJpZ0ludCh0aGlzLnZhbHVlK0JpZ0ludCgxKSl9O0JpZ0ludGVnZXIucHJvdG90eXBlLnByZXY9ZnVuY3Rpb24oKXt2YXIgdmFsdWU9dGhpcy52YWx1ZTtpZih0aGlzLnNpZ24pe3JldHVybiBuZXcgQmlnSW50ZWdlcihhZGRTbWFsbCh2YWx1ZSwxKSx0cnVlKX1yZXR1cm4gc3VidHJhY3RTbWFsbCh2YWx1ZSwxLHRoaXMuc2lnbil9O1NtYWxsSW50ZWdlci5wcm90b3R5cGUucHJldj1mdW5jdGlvbigpe3ZhciB2YWx1ZT10aGlzLnZhbHVlO2lmKHZhbHVlLTE+LU1BWF9JTlQpcmV0dXJuIG5ldyBTbWFsbEludGVnZXIodmFsdWUtMSk7cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKE1BWF9JTlRfQVJSLHRydWUpfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLnByZXY9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IE5hdGl2ZUJpZ0ludCh0aGlzLnZhbHVlLUJpZ0ludCgxKSl9O3ZhciBwb3dlcnNPZlR3bz1bMV07d2hpbGUoMipwb3dlcnNPZlR3b1twb3dlcnNPZlR3by5sZW5ndGgtMV08PUJBU0UpcG93ZXJzT2ZUd28ucHVzaCgyKnBvd2Vyc09mVHdvW3Bvd2Vyc09mVHdvLmxlbmd0aC0xXSk7dmFyIHBvd2VyczJMZW5ndGg9cG93ZXJzT2ZUd28ubGVuZ3RoLGhpZ2hlc3RQb3dlcjI9cG93ZXJzT2ZUd29bcG93ZXJzMkxlbmd0aC0xXTtmdW5jdGlvbiBzaGlmdF9pc1NtYWxsKG4pe3JldHVybiBNYXRoLmFicyhuKTw9QkFTRX1CaWdJbnRlZ2VyLnByb3RvdHlwZS5zaGlmdExlZnQ9ZnVuY3Rpb24odil7dmFyIG49cGFyc2VWYWx1ZSh2KS50b0pTTnVtYmVyKCk7aWYoIXNoaWZ0X2lzU21hbGwobikpe3Rocm93IG5ldyBFcnJvcihTdHJpbmcobikrXCIgaXMgdG9vIGxhcmdlIGZvciBzaGlmdGluZy5cIil9aWYobjwwKXJldHVybiB0aGlzLnNoaWZ0UmlnaHQoLW4pO3ZhciByZXN1bHQ9dGhpcztpZihyZXN1bHQuaXNaZXJvKCkpcmV0dXJuIHJlc3VsdDt3aGlsZShuPj1wb3dlcnMyTGVuZ3RoKXtyZXN1bHQ9cmVzdWx0Lm11bHRpcGx5KGhpZ2hlc3RQb3dlcjIpO24tPXBvd2VyczJMZW5ndGgtMX1yZXR1cm4gcmVzdWx0Lm11bHRpcGx5KHBvd2Vyc09mVHdvW25dKX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5zaGlmdExlZnQ9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5zaGlmdExlZnQ9QmlnSW50ZWdlci5wcm90b3R5cGUuc2hpZnRMZWZ0O0JpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0UmlnaHQ9ZnVuY3Rpb24odil7dmFyIHJlbVF1bzt2YXIgbj1wYXJzZVZhbHVlKHYpLnRvSlNOdW1iZXIoKTtpZighc2hpZnRfaXNTbWFsbChuKSl7dGhyb3cgbmV3IEVycm9yKFN0cmluZyhuKStcIiBpcyB0b28gbGFyZ2UgZm9yIHNoaWZ0aW5nLlwiKX1pZihuPDApcmV0dXJuIHRoaXMuc2hpZnRMZWZ0KC1uKTt2YXIgcmVzdWx0PXRoaXM7d2hpbGUobj49cG93ZXJzMkxlbmd0aCl7aWYocmVzdWx0LmlzWmVybygpfHxyZXN1bHQuaXNOZWdhdGl2ZSgpJiZyZXN1bHQuaXNVbml0KCkpcmV0dXJuIHJlc3VsdDtyZW1RdW89ZGl2TW9kQW55KHJlc3VsdCxoaWdoZXN0UG93ZXIyKTtyZXN1bHQ9cmVtUXVvWzFdLmlzTmVnYXRpdmUoKT9yZW1RdW9bMF0ucHJldigpOnJlbVF1b1swXTtuLT1wb3dlcnMyTGVuZ3RoLTF9cmVtUXVvPWRpdk1vZEFueShyZXN1bHQscG93ZXJzT2ZUd29bbl0pO3JldHVybiByZW1RdW9bMV0uaXNOZWdhdGl2ZSgpP3JlbVF1b1swXS5wcmV2KCk6cmVtUXVvWzBdfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLnNoaWZ0UmlnaHQ9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5zaGlmdFJpZ2h0PUJpZ0ludGVnZXIucHJvdG90eXBlLnNoaWZ0UmlnaHQ7ZnVuY3Rpb24gYml0d2lzZSh4LHksZm4pe3k9cGFyc2VWYWx1ZSh5KTt2YXIgeFNpZ249eC5pc05lZ2F0aXZlKCkseVNpZ249eS5pc05lZ2F0aXZlKCk7dmFyIHhSZW09eFNpZ24/eC5ub3QoKTp4LHlSZW09eVNpZ24/eS5ub3QoKTp5O3ZhciB4RGlnaXQ9MCx5RGlnaXQ9MDt2YXIgeERpdk1vZD1udWxsLHlEaXZNb2Q9bnVsbDt2YXIgcmVzdWx0PVtdO3doaWxlKCF4UmVtLmlzWmVybygpfHwheVJlbS5pc1plcm8oKSl7eERpdk1vZD1kaXZNb2RBbnkoeFJlbSxoaWdoZXN0UG93ZXIyKTt4RGlnaXQ9eERpdk1vZFsxXS50b0pTTnVtYmVyKCk7aWYoeFNpZ24pe3hEaWdpdD1oaWdoZXN0UG93ZXIyLTEteERpZ2l0fXlEaXZNb2Q9ZGl2TW9kQW55KHlSZW0saGlnaGVzdFBvd2VyMik7eURpZ2l0PXlEaXZNb2RbMV0udG9KU051bWJlcigpO2lmKHlTaWduKXt5RGlnaXQ9aGlnaGVzdFBvd2VyMi0xLXlEaWdpdH14UmVtPXhEaXZNb2RbMF07eVJlbT15RGl2TW9kWzBdO3Jlc3VsdC5wdXNoKGZuKHhEaWdpdCx5RGlnaXQpKX12YXIgc3VtPWZuKHhTaWduPzE6MCx5U2lnbj8xOjApIT09MD9iaWdJbnQoLTEpOmJpZ0ludCgwKTtmb3IodmFyIGk9cmVzdWx0Lmxlbmd0aC0xO2k+PTA7aS09MSl7c3VtPXN1bS5tdWx0aXBseShoaWdoZXN0UG93ZXIyKS5hZGQoYmlnSW50KHJlc3VsdFtpXSkpfXJldHVybiBzdW19QmlnSW50ZWdlci5wcm90b3R5cGUubm90PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubmVnYXRlKCkucHJldigpfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLm5vdD1TbWFsbEludGVnZXIucHJvdG90eXBlLm5vdD1CaWdJbnRlZ2VyLnByb3RvdHlwZS5ub3Q7QmlnSW50ZWdlci5wcm90b3R5cGUuYW5kPWZ1bmN0aW9uKG4pe3JldHVybiBiaXR3aXNlKHRoaXMsbixmdW5jdGlvbihhLGIpe3JldHVybiBhJmJ9KX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5hbmQ9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS5hbmQ9QmlnSW50ZWdlci5wcm90b3R5cGUuYW5kO0JpZ0ludGVnZXIucHJvdG90eXBlLm9yPWZ1bmN0aW9uKG4pe3JldHVybiBiaXR3aXNlKHRoaXMsbixmdW5jdGlvbihhLGIpe3JldHVybiBhfGJ9KX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS5vcj1TbWFsbEludGVnZXIucHJvdG90eXBlLm9yPUJpZ0ludGVnZXIucHJvdG90eXBlLm9yO0JpZ0ludGVnZXIucHJvdG90eXBlLnhvcj1mdW5jdGlvbihuKXtyZXR1cm4gYml0d2lzZSh0aGlzLG4sZnVuY3Rpb24oYSxiKXtyZXR1cm4gYV5ifSl9O05hdGl2ZUJpZ0ludC5wcm90b3R5cGUueG9yPVNtYWxsSW50ZWdlci5wcm90b3R5cGUueG9yPUJpZ0ludGVnZXIucHJvdG90eXBlLnhvcjt2YXIgTE9CTUFTS19JPTE8PDMwLExPQk1BU0tfQkk9KEJBU0UmLUJBU0UpKihCQVNFJi1CQVNFKXxMT0JNQVNLX0k7ZnVuY3Rpb24gcm91Z2hMT0Iobil7dmFyIHY9bi52YWx1ZSx4PXR5cGVvZiB2PT09XCJudW1iZXJcIj92fExPQk1BU0tfSTp0eXBlb2Ygdj09PVwiYmlnaW50XCI/dnxCaWdJbnQoTE9CTUFTS19JKTp2WzBdK3ZbMV0qQkFTRXxMT0JNQVNLX0JJO3JldHVybiB4Ji14fWZ1bmN0aW9uIGludGVnZXJMb2dhcml0aG0odmFsdWUsYmFzZSl7aWYoYmFzZS5jb21wYXJlVG8odmFsdWUpPD0wKXt2YXIgdG1wPWludGVnZXJMb2dhcml0aG0odmFsdWUsYmFzZS5zcXVhcmUoYmFzZSkpO3ZhciBwPXRtcC5wO3ZhciBlPXRtcC5lO3ZhciB0PXAubXVsdGlwbHkoYmFzZSk7cmV0dXJuIHQuY29tcGFyZVRvKHZhbHVlKTw9MD97cDp0LGU6ZSoyKzF9OntwOnAsZTplKjJ9fXJldHVybntwOmJpZ0ludCgxKSxlOjB9fUJpZ0ludGVnZXIucHJvdG90eXBlLmJpdExlbmd0aD1mdW5jdGlvbigpe3ZhciBuPXRoaXM7aWYobi5jb21wYXJlVG8oYmlnSW50KDApKTwwKXtuPW4ubmVnYXRlKCkuc3VidHJhY3QoYmlnSW50KDEpKX1pZihuLmNvbXBhcmVUbyhiaWdJbnQoMCkpPT09MCl7cmV0dXJuIGJpZ0ludCgwKX1yZXR1cm4gYmlnSW50KGludGVnZXJMb2dhcml0aG0obixiaWdJbnQoMikpLmUpLmFkZChiaWdJbnQoMSkpfTtOYXRpdmVCaWdJbnQucHJvdG90eXBlLmJpdExlbmd0aD1TbWFsbEludGVnZXIucHJvdG90eXBlLmJpdExlbmd0aD1CaWdJbnRlZ2VyLnByb3RvdHlwZS5iaXRMZW5ndGg7ZnVuY3Rpb24gbWF4KGEsYil7YT1wYXJzZVZhbHVlKGEpO2I9cGFyc2VWYWx1ZShiKTtyZXR1cm4gYS5ncmVhdGVyKGIpP2E6Yn1mdW5jdGlvbiBtaW4oYSxiKXthPXBhcnNlVmFsdWUoYSk7Yj1wYXJzZVZhbHVlKGIpO3JldHVybiBhLmxlc3NlcihiKT9hOmJ9ZnVuY3Rpb24gZ2NkKGEsYil7YT1wYXJzZVZhbHVlKGEpLmFicygpO2I9cGFyc2VWYWx1ZShiKS5hYnMoKTtpZihhLmVxdWFscyhiKSlyZXR1cm4gYTtpZihhLmlzWmVybygpKXJldHVybiBiO2lmKGIuaXNaZXJvKCkpcmV0dXJuIGE7dmFyIGM9SW50ZWdlclsxXSxkLHQ7d2hpbGUoYS5pc0V2ZW4oKSYmYi5pc0V2ZW4oKSl7ZD1taW4ocm91Z2hMT0IoYSkscm91Z2hMT0IoYikpO2E9YS5kaXZpZGUoZCk7Yj1iLmRpdmlkZShkKTtjPWMubXVsdGlwbHkoZCl9d2hpbGUoYS5pc0V2ZW4oKSl7YT1hLmRpdmlkZShyb3VnaExPQihhKSl9ZG97d2hpbGUoYi5pc0V2ZW4oKSl7Yj1iLmRpdmlkZShyb3VnaExPQihiKSl9aWYoYS5ncmVhdGVyKGIpKXt0PWI7Yj1hO2E9dH1iPWIuc3VidHJhY3QoYSl9d2hpbGUoIWIuaXNaZXJvKCkpO3JldHVybiBjLmlzVW5pdCgpP2E6YS5tdWx0aXBseShjKX1mdW5jdGlvbiBsY20oYSxiKXthPXBhcnNlVmFsdWUoYSkuYWJzKCk7Yj1wYXJzZVZhbHVlKGIpLmFicygpO3JldHVybiBhLmRpdmlkZShnY2QoYSxiKSkubXVsdGlwbHkoYil9ZnVuY3Rpb24gcmFuZEJldHdlZW4oYSxiKXthPXBhcnNlVmFsdWUoYSk7Yj1wYXJzZVZhbHVlKGIpO3ZhciBsb3c9bWluKGEsYiksaGlnaD1tYXgoYSxiKTt2YXIgcmFuZ2U9aGlnaC5zdWJ0cmFjdChsb3cpLmFkZCgxKTtpZihyYW5nZS5pc1NtYWxsKXJldHVybiBsb3cuYWRkKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyYW5nZSkpO3ZhciBkaWdpdHM9dG9CYXNlKHJhbmdlLEJBU0UpLnZhbHVlO3ZhciByZXN1bHQ9W10scmVzdHJpY3RlZD10cnVlO2Zvcih2YXIgaT0wO2k8ZGlnaXRzLmxlbmd0aDtpKyspe3ZhciB0b3A9cmVzdHJpY3RlZD9kaWdpdHNbaV06QkFTRTt2YXIgZGlnaXQ9dHJ1bmNhdGUoTWF0aC5yYW5kb20oKSp0b3ApO3Jlc3VsdC5wdXNoKGRpZ2l0KTtpZihkaWdpdDx0b3ApcmVzdHJpY3RlZD1mYWxzZX1yZXR1cm4gbG93LmFkZChJbnRlZ2VyLmZyb21BcnJheShyZXN1bHQsQkFTRSxmYWxzZSkpfXZhciBwYXJzZUJhc2U9ZnVuY3Rpb24odGV4dCxiYXNlLGFscGhhYmV0LGNhc2VTZW5zaXRpdmUpe2FscGhhYmV0PWFscGhhYmV0fHxERUZBVUxUX0FMUEhBQkVUO3RleHQ9U3RyaW5nKHRleHQpO2lmKCFjYXNlU2Vuc2l0aXZlKXt0ZXh0PXRleHQudG9Mb3dlckNhc2UoKTthbHBoYWJldD1hbHBoYWJldC50b0xvd2VyQ2FzZSgpfXZhciBsZW5ndGg9dGV4dC5sZW5ndGg7dmFyIGk7dmFyIGFic0Jhc2U9TWF0aC5hYnMoYmFzZSk7dmFyIGFscGhhYmV0VmFsdWVzPXt9O2ZvcihpPTA7aTxhbHBoYWJldC5sZW5ndGg7aSsrKXthbHBoYWJldFZhbHVlc1thbHBoYWJldFtpXV09aX1mb3IoaT0wO2k8bGVuZ3RoO2krKyl7dmFyIGM9dGV4dFtpXTtpZihjPT09XCItXCIpY29udGludWU7aWYoYyBpbiBhbHBoYWJldFZhbHVlcyl7aWYoYWxwaGFiZXRWYWx1ZXNbY10+PWFic0Jhc2Upe2lmKGM9PT1cIjFcIiYmYWJzQmFzZT09PTEpY29udGludWU7dGhyb3cgbmV3IEVycm9yKGMrXCIgaXMgbm90IGEgdmFsaWQgZGlnaXQgaW4gYmFzZSBcIitiYXNlK1wiLlwiKX19fWJhc2U9cGFyc2VWYWx1ZShiYXNlKTt2YXIgZGlnaXRzPVtdO3ZhciBpc05lZ2F0aXZlPXRleHRbMF09PT1cIi1cIjtmb3IoaT1pc05lZ2F0aXZlPzE6MDtpPHRleHQubGVuZ3RoO2krKyl7dmFyIGM9dGV4dFtpXTtpZihjIGluIGFscGhhYmV0VmFsdWVzKWRpZ2l0cy5wdXNoKHBhcnNlVmFsdWUoYWxwaGFiZXRWYWx1ZXNbY10pKTtlbHNlIGlmKGM9PT1cIjxcIil7dmFyIHN0YXJ0PWk7ZG97aSsrfXdoaWxlKHRleHRbaV0hPT1cIj5cIiYmaTx0ZXh0Lmxlbmd0aCk7ZGlnaXRzLnB1c2gocGFyc2VWYWx1ZSh0ZXh0LnNsaWNlKHN0YXJ0KzEsaSkpKX1lbHNlIHRocm93IG5ldyBFcnJvcihjK1wiIGlzIG5vdCBhIHZhbGlkIGNoYXJhY3RlclwiKX1yZXR1cm4gcGFyc2VCYXNlRnJvbUFycmF5KGRpZ2l0cyxiYXNlLGlzTmVnYXRpdmUpfTtmdW5jdGlvbiBwYXJzZUJhc2VGcm9tQXJyYXkoZGlnaXRzLGJhc2UsaXNOZWdhdGl2ZSl7dmFyIHZhbD1JbnRlZ2VyWzBdLHBvdz1JbnRlZ2VyWzFdLGk7Zm9yKGk9ZGlnaXRzLmxlbmd0aC0xO2k+PTA7aS0tKXt2YWw9dmFsLmFkZChkaWdpdHNbaV0udGltZXMocG93KSk7cG93PXBvdy50aW1lcyhiYXNlKX1yZXR1cm4gaXNOZWdhdGl2ZT92YWwubmVnYXRlKCk6dmFsfWZ1bmN0aW9uIHN0cmluZ2lmeShkaWdpdCxhbHBoYWJldCl7YWxwaGFiZXQ9YWxwaGFiZXR8fERFRkFVTFRfQUxQSEFCRVQ7aWYoZGlnaXQ8YWxwaGFiZXQubGVuZ3RoKXtyZXR1cm4gYWxwaGFiZXRbZGlnaXRdfXJldHVyblwiPFwiK2RpZ2l0K1wiPlwifWZ1bmN0aW9uIHRvQmFzZShuLGJhc2Upe2Jhc2U9YmlnSW50KGJhc2UpO2lmKGJhc2UuaXNaZXJvKCkpe2lmKG4uaXNaZXJvKCkpcmV0dXJue3ZhbHVlOlswXSxpc05lZ2F0aXZlOmZhbHNlfTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29udmVydCBub256ZXJvIG51bWJlcnMgdG8gYmFzZSAwLlwiKX1pZihiYXNlLmVxdWFscygtMSkpe2lmKG4uaXNaZXJvKCkpcmV0dXJue3ZhbHVlOlswXSxpc05lZ2F0aXZlOmZhbHNlfTtpZihuLmlzTmVnYXRpdmUoKSlyZXR1cm57dmFsdWU6W10uY29uY2F0LmFwcGx5KFtdLEFycmF5LmFwcGx5KG51bGwsQXJyYXkoLW4udG9KU051bWJlcigpKSkubWFwKEFycmF5LnByb3RvdHlwZS52YWx1ZU9mLFsxLDBdKSksaXNOZWdhdGl2ZTpmYWxzZX07dmFyIGFycj1BcnJheS5hcHBseShudWxsLEFycmF5KG4udG9KU051bWJlcigpLTEpKS5tYXAoQXJyYXkucHJvdG90eXBlLnZhbHVlT2YsWzAsMV0pO2Fyci51bnNoaWZ0KFsxXSk7cmV0dXJue3ZhbHVlOltdLmNvbmNhdC5hcHBseShbXSxhcnIpLGlzTmVnYXRpdmU6ZmFsc2V9fXZhciBuZWc9ZmFsc2U7aWYobi5pc05lZ2F0aXZlKCkmJmJhc2UuaXNQb3NpdGl2ZSgpKXtuZWc9dHJ1ZTtuPW4uYWJzKCl9aWYoYmFzZS5pc1VuaXQoKSl7aWYobi5pc1plcm8oKSlyZXR1cm57dmFsdWU6WzBdLGlzTmVnYXRpdmU6ZmFsc2V9O3JldHVybnt2YWx1ZTpBcnJheS5hcHBseShudWxsLEFycmF5KG4udG9KU051bWJlcigpKSkubWFwKE51bWJlci5wcm90b3R5cGUudmFsdWVPZiwxKSxpc05lZ2F0aXZlOm5lZ319dmFyIG91dD1bXTt2YXIgbGVmdD1uLGRpdm1vZDt3aGlsZShsZWZ0LmlzTmVnYXRpdmUoKXx8bGVmdC5jb21wYXJlQWJzKGJhc2UpPj0wKXtkaXZtb2Q9bGVmdC5kaXZtb2QoYmFzZSk7bGVmdD1kaXZtb2QucXVvdGllbnQ7dmFyIGRpZ2l0PWRpdm1vZC5yZW1haW5kZXI7aWYoZGlnaXQuaXNOZWdhdGl2ZSgpKXtkaWdpdD1iYXNlLm1pbnVzKGRpZ2l0KS5hYnMoKTtsZWZ0PWxlZnQubmV4dCgpfW91dC5wdXNoKGRpZ2l0LnRvSlNOdW1iZXIoKSl9b3V0LnB1c2gobGVmdC50b0pTTnVtYmVyKCkpO3JldHVybnt2YWx1ZTpvdXQucmV2ZXJzZSgpLGlzTmVnYXRpdmU6bmVnfX1mdW5jdGlvbiB0b0Jhc2VTdHJpbmcobixiYXNlLGFscGhhYmV0KXt2YXIgYXJyPXRvQmFzZShuLGJhc2UpO3JldHVybihhcnIuaXNOZWdhdGl2ZT9cIi1cIjpcIlwiKSthcnIudmFsdWUubWFwKGZ1bmN0aW9uKHgpe3JldHVybiBzdHJpbmdpZnkoeCxhbHBoYWJldCl9KS5qb2luKFwiXCIpfUJpZ0ludGVnZXIucHJvdG90eXBlLnRvQXJyYXk9ZnVuY3Rpb24ocmFkaXgpe3JldHVybiB0b0Jhc2UodGhpcyxyYWRpeCl9O1NtYWxsSW50ZWdlci5wcm90b3R5cGUudG9BcnJheT1mdW5jdGlvbihyYWRpeCl7cmV0dXJuIHRvQmFzZSh0aGlzLHJhZGl4KX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS50b0FycmF5PWZ1bmN0aW9uKHJhZGl4KXtyZXR1cm4gdG9CYXNlKHRoaXMscmFkaXgpfTtCaWdJbnRlZ2VyLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbihyYWRpeCxhbHBoYWJldCl7aWYocmFkaXg9PT11bmRlZmluZWQpcmFkaXg9MTA7aWYocmFkaXghPT0xMClyZXR1cm4gdG9CYXNlU3RyaW5nKHRoaXMscmFkaXgsYWxwaGFiZXQpO3ZhciB2PXRoaXMudmFsdWUsbD12Lmxlbmd0aCxzdHI9U3RyaW5nKHZbLS1sXSksemVyb3M9XCIwMDAwMDAwXCIsZGlnaXQ7d2hpbGUoLS1sPj0wKXtkaWdpdD1TdHJpbmcodltsXSk7c3RyKz16ZXJvcy5zbGljZShkaWdpdC5sZW5ndGgpK2RpZ2l0fXZhciBzaWduPXRoaXMuc2lnbj9cIi1cIjpcIlwiO3JldHVybiBzaWduK3N0cn07U21hbGxJbnRlZ2VyLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbihyYWRpeCxhbHBoYWJldCl7aWYocmFkaXg9PT11bmRlZmluZWQpcmFkaXg9MTA7aWYocmFkaXghPTEwKXJldHVybiB0b0Jhc2VTdHJpbmcodGhpcyxyYWRpeCxhbHBoYWJldCk7cmV0dXJuIFN0cmluZyh0aGlzLnZhbHVlKX07TmF0aXZlQmlnSW50LnByb3RvdHlwZS50b1N0cmluZz1TbWFsbEludGVnZXIucHJvdG90eXBlLnRvU3RyaW5nO05hdGl2ZUJpZ0ludC5wcm90b3R5cGUudG9KU09OPUJpZ0ludGVnZXIucHJvdG90eXBlLnRvSlNPTj1TbWFsbEludGVnZXIucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRvU3RyaW5nKCl9O0JpZ0ludGVnZXIucHJvdG90eXBlLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gcGFyc2VJbnQodGhpcy50b1N0cmluZygpLDEwKX07QmlnSW50ZWdlci5wcm90b3R5cGUudG9KU051bWJlcj1CaWdJbnRlZ2VyLnByb3RvdHlwZS52YWx1ZU9mO1NtYWxsSW50ZWdlci5wcm90b3R5cGUudmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlfTtTbWFsbEludGVnZXIucHJvdG90eXBlLnRvSlNOdW1iZXI9U21hbGxJbnRlZ2VyLnByb3RvdHlwZS52YWx1ZU9mO05hdGl2ZUJpZ0ludC5wcm90b3R5cGUudmFsdWVPZj1OYXRpdmVCaWdJbnQucHJvdG90eXBlLnRvSlNOdW1iZXI9ZnVuY3Rpb24oKXtyZXR1cm4gcGFyc2VJbnQodGhpcy50b1N0cmluZygpLDEwKX07ZnVuY3Rpb24gcGFyc2VTdHJpbmdWYWx1ZSh2KXtpZihpc1ByZWNpc2UoK3YpKXt2YXIgeD0rdjtpZih4PT09dHJ1bmNhdGUoeCkpcmV0dXJuIHN1cHBvcnRzTmF0aXZlQmlnSW50P25ldyBOYXRpdmVCaWdJbnQoQmlnSW50KHgpKTpuZXcgU21hbGxJbnRlZ2VyKHgpO3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW50ZWdlcjogXCIrdil9dmFyIHNpZ249dlswXT09PVwiLVwiO2lmKHNpZ24pdj12LnNsaWNlKDEpO3ZhciBzcGxpdD12LnNwbGl0KC9lL2kpO2lmKHNwbGl0Lmxlbmd0aD4yKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW50ZWdlcjogXCIrc3BsaXQuam9pbihcImVcIikpO2lmKHNwbGl0Lmxlbmd0aD09PTIpe3ZhciBleHA9c3BsaXRbMV07aWYoZXhwWzBdPT09XCIrXCIpZXhwPWV4cC5zbGljZSgxKTtleHA9K2V4cDtpZihleHAhPT10cnVuY2F0ZShleHApfHwhaXNQcmVjaXNlKGV4cCkpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbnRlZ2VyOiBcIitleHArXCIgaXMgbm90IGEgdmFsaWQgZXhwb25lbnQuXCIpO3ZhciB0ZXh0PXNwbGl0WzBdO3ZhciBkZWNpbWFsUGxhY2U9dGV4dC5pbmRleE9mKFwiLlwiKTtpZihkZWNpbWFsUGxhY2U+PTApe2V4cC09dGV4dC5sZW5ndGgtZGVjaW1hbFBsYWNlLTE7dGV4dD10ZXh0LnNsaWNlKDAsZGVjaW1hbFBsYWNlKSt0ZXh0LnNsaWNlKGRlY2ltYWxQbGFjZSsxKX1pZihleHA8MCl0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgaW5jbHVkZSBuZWdhdGl2ZSBleHBvbmVudCBwYXJ0IGZvciBpbnRlZ2Vyc1wiKTt0ZXh0Kz1uZXcgQXJyYXkoZXhwKzEpLmpvaW4oXCIwXCIpO3Y9dGV4dH12YXIgaXNWYWxpZD0vXihbMC05XVswLTldKikkLy50ZXN0KHYpO2lmKCFpc1ZhbGlkKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW50ZWdlcjogXCIrdik7aWYoc3VwcG9ydHNOYXRpdmVCaWdJbnQpe3JldHVybiBuZXcgTmF0aXZlQmlnSW50KEJpZ0ludChzaWduP1wiLVwiK3Y6dikpfXZhciByPVtdLG1heD12Lmxlbmd0aCxsPUxPR19CQVNFLG1pbj1tYXgtbDt3aGlsZShtYXg+MCl7ci5wdXNoKCt2LnNsaWNlKG1pbixtYXgpKTttaW4tPWw7aWYobWluPDApbWluPTA7bWF4LT1sfXRyaW0ocik7cmV0dXJuIG5ldyBCaWdJbnRlZ2VyKHIsc2lnbil9ZnVuY3Rpb24gcGFyc2VOdW1iZXJWYWx1ZSh2KXtpZihzdXBwb3J0c05hdGl2ZUJpZ0ludCl7cmV0dXJuIG5ldyBOYXRpdmVCaWdJbnQoQmlnSW50KHYpKX1pZihpc1ByZWNpc2Uodikpe2lmKHYhPT10cnVuY2F0ZSh2KSl0aHJvdyBuZXcgRXJyb3IoditcIiBpcyBub3QgYW4gaW50ZWdlci5cIik7cmV0dXJuIG5ldyBTbWFsbEludGVnZXIodil9cmV0dXJuIHBhcnNlU3RyaW5nVmFsdWUodi50b1N0cmluZygpKX1mdW5jdGlvbiBwYXJzZVZhbHVlKHYpe2lmKHR5cGVvZiB2PT09XCJudW1iZXJcIil7cmV0dXJuIHBhcnNlTnVtYmVyVmFsdWUodil9aWYodHlwZW9mIHY9PT1cInN0cmluZ1wiKXtyZXR1cm4gcGFyc2VTdHJpbmdWYWx1ZSh2KX1pZih0eXBlb2Ygdj09PVwiYmlnaW50XCIpe3JldHVybiBuZXcgTmF0aXZlQmlnSW50KHYpfXJldHVybiB2fWZvcih2YXIgaT0wO2k8MWUzO2krKyl7SW50ZWdlcltpXT1wYXJzZVZhbHVlKGkpO2lmKGk+MClJbnRlZ2VyWy1pXT1wYXJzZVZhbHVlKC1pKX1JbnRlZ2VyLm9uZT1JbnRlZ2VyWzFdO0ludGVnZXIuemVybz1JbnRlZ2VyWzBdO0ludGVnZXIubWludXNPbmU9SW50ZWdlclstMV07SW50ZWdlci5tYXg9bWF4O0ludGVnZXIubWluPW1pbjtJbnRlZ2VyLmdjZD1nY2Q7SW50ZWdlci5sY209bGNtO0ludGVnZXIuaXNJbnN0YW5jZT1mdW5jdGlvbih4KXtyZXR1cm4geCBpbnN0YW5jZW9mIEJpZ0ludGVnZXJ8fHggaW5zdGFuY2VvZiBTbWFsbEludGVnZXJ8fHggaW5zdGFuY2VvZiBOYXRpdmVCaWdJbnR9O0ludGVnZXIucmFuZEJldHdlZW49cmFuZEJldHdlZW47SW50ZWdlci5mcm9tQXJyYXk9ZnVuY3Rpb24oZGlnaXRzLGJhc2UsaXNOZWdhdGl2ZSl7cmV0dXJuIHBhcnNlQmFzZUZyb21BcnJheShkaWdpdHMubWFwKHBhcnNlVmFsdWUpLHBhcnNlVmFsdWUoYmFzZXx8MTApLGlzTmVnYXRpdmUpfTtyZXR1cm4gSW50ZWdlcn0oKTtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlLmhhc093blByb3BlcnR5KFwiZXhwb3J0c1wiKSl7bW9kdWxlLmV4cG9ydHM9YmlnSW50fWlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShcImJpZy1pbnRlZ2VyXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gYmlnSW50fSl9IiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAaWdub3JlXG4gKi9cbmNsYXNzIEVycm9yc0Jhc2Uge1xuICAgIGV4dGVuZCAoZXJyb3JzLCBjb25maWcpIHtcbiAgICAgICAgaWYgKCFlcnJvcnMpIHJldHVybjtcblxuICAgICAgICBsZXQgb3ZlcnJpZGUgPSBjb25maWcgPyBjb25maWcub3ZlcnJpZGUgOiBmYWxzZTtcbiAgICAgICAgbGV0IHB1YmxpY09ubHkgPSBjb25maWcgPyBjb25maWcucHVibGljT25seSA6IGZhbHNlO1xuXG5cbiAgICAgICAgZm9yIChjb25zdCBlcnIgaW4gZXJyb3JzKSB7XG4gICAgICAgICAgICBpZiAoIWVycm9ycy5oYXNPd25Qcm9wZXJ0eShlcnIpIHx8ICh0aGlzW2Vycl0gJiYgIW92ZXJyaWRlKSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAocHVibGljT25seSAmJiBlcnJvcnNbZXJyXS5pbmRleE9mKCdwdWJsaWNfJykgPT09IC0xKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXNbZXJyXSA9IGVycm9yc1tlcnJdO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yc0Jhc2U7IiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbi8qKlxuICogQGNsYXNzXG4gKiBAaWdub3JlXG4gKi9cbmNsYXNzIEV2ZW50c0Jhc2Uge1xuICAgIGV4dGVuZCAoZXZlbnRzLCBjb25maWcpIHtcbiAgICAgICAgaWYgKCFldmVudHMpIHJldHVybjtcblxuICAgICAgICBsZXQgb3ZlcnJpZGUgPSBjb25maWcgPyBjb25maWcub3ZlcnJpZGUgOiBmYWxzZTtcbiAgICAgICAgbGV0IHB1YmxpY09ubHkgPSBjb25maWcgPyBjb25maWcucHVibGljT25seSA6IGZhbHNlO1xuXG5cbiAgICAgICAgZm9yIChjb25zdCBldnQgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldnQpIHx8ICh0aGlzW2V2dF0gJiYgIW92ZXJyaWRlKSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAocHVibGljT25seSAmJiBldmVudHNbZXZ0XS5pbmRleE9mKCdwdWJsaWNfJykgPT09IC0xKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXNbZXZ0XSA9IGV2ZW50c1tldnRdO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50c0Jhc2U7IiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBFdmVudHNCYXNlIGZyb20gJy4uL2NvcmUvZXZlbnRzL0V2ZW50c0Jhc2UnO1xuXG5jbGFzcyBNc3NFdmVudHMgZXh0ZW5kcyBFdmVudHNCYXNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuRlJBR01FTlRfSU5GT19MT0FESU5HX0NPTVBMRVRFRCA9ICdmcmFnbWVudEluZm9Mb2FkaW5nQ29tcGxldGVkJztcbiAgICB9XG59XG5cbmxldCBtc3NFdmVudHMgPSBuZXcgTXNzRXZlbnRzKCk7XG5leHBvcnQgZGVmYXVsdCBtc3NFdmVudHM7XG4iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuXG5pbXBvcnQgTXNzRXZlbnRzIGZyb20gJy4vTXNzRXZlbnRzJztcbmltcG9ydCBNU1NGcmFnbWVudE1vb2ZQcm9jZXNzb3IgZnJvbSAnLi9Nc3NGcmFnbWVudE1vb2ZQcm9jZXNzb3InO1xuaW1wb3J0IEZyYWdtZW50UmVxdWVzdCBmcm9tICcuLi9zdHJlYW1pbmcvdm8vRnJhZ21lbnRSZXF1ZXN0JztcblxuZnVuY3Rpb24gTXNzRnJhZ21lbnRJbmZvQ29udHJvbGxlcihjb25maWcpIHtcblxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgbGV0IGluc3RhbmNlLFxuICAgICAgICBsb2dnZXIsXG4gICAgICAgIGZyYWdtZW50TW9kZWwsXG4gICAgICAgIHN0YXJ0ZWQsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGJ1ZmZlclRpbWVvdXQsXG4gICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgc3RhcnRGcmFnbWVudFRpbWUsXG4gICAgICAgIGluZGV4O1xuXG4gICAgY29uc3Qgc3RyZWFtUHJvY2Vzc29yID0gY29uZmlnLnN0cmVhbVByb2Nlc3NvcjtcbiAgICBjb25zdCBldmVudEJ1cyA9IGNvbmZpZy5ldmVudEJ1cztcbiAgICBjb25zdCBkYXNoTWV0cmljcyA9IGNvbmZpZy5kYXNoTWV0cmljcztcbiAgICBjb25zdCBwbGF5YmFja0NvbnRyb2xsZXIgPSBjb25maWcucGxheWJhY2tDb250cm9sbGVyO1xuICAgIGNvbnN0IElTT0JveGVyID0gY29uZmlnLklTT0JveGVyO1xuICAgIGNvbnN0IGJhc2VVUkxDb250cm9sbGVyID0gY29uZmlnLmJhc2VVUkxDb250cm9sbGVyO1xuICAgIGNvbnN0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xuICAgIGNvbnN0IGNvbnRyb2xsZXJUeXBlID0gJ01zc0ZyYWdtZW50SW5mb0NvbnRyb2xsZXInO1xuXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAgIGxvZ2dlciA9IGRlYnVnLmdldExvZ2dlcihpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHN0YXJ0VGltZSA9IG51bGw7XG4gICAgICAgIHN0YXJ0RnJhZ21lbnRUaW1lID0gbnVsbDtcblxuICAgICAgICAvLyBSZWdpc3RlciB0byBTdHJlYW1Qcm9jZXNzb3IgYXMgZXh0ZXJuYWwgY29udHJvbGxlclxuICAgICAgICBzdHJlYW1Qcm9jZXNzb3IucmVnaXN0ZXJFeHRlcm5hbENvbnRyb2xsZXIoaW5zdGFuY2UpO1xuICAgICAgICB0eXBlID0gc3RyZWFtUHJvY2Vzc29yLmdldFR5cGUoKTtcbiAgICAgICAgZnJhZ21lbnRNb2RlbCA9IHN0cmVhbVByb2Nlc3Nvci5nZXRGcmFnbWVudE1vZGVsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9TdGFydCgpIHtcbiAgICAgICAgaWYgKHN0YXJ0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnRG8gc3RhcnQnKTtcblxuICAgICAgICBldmVudEJ1cy5vbihNc3NFdmVudHMuRlJBR01FTlRfSU5GT19MT0FESU5HX0NPTVBMRVRFRCwgb25GcmFnbWVudEluZm9Mb2FkZWRDb21wbGV0ZWQsIGluc3RhbmNlKTtcblxuICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICBsb2FkTmV4dEZyYWdtZW50SW5mbygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvU3RvcCgpIHtcbiAgICAgICAgaWYgKCFzdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdEbyBzdG9wJyk7XG5cbiAgICAgICAgZXZlbnRCdXMub2ZmKE1zc0V2ZW50cy5GUkFHTUVOVF9JTkZPX0xPQURJTkdfQ09NUExFVEVELCBvbkZyYWdtZW50SW5mb0xvYWRlZENvbXBsZXRlZCwgaW5zdGFuY2UpO1xuXG4gICAgICAgIC8vIFN0b3AgYnVmZmVyaW5nIHByb2Nlc3NcbiAgICAgICAgY2xlYXJUaW1lb3V0KGJ1ZmZlclRpbWVvdXQpO1xuICAgICAgICBzdGFydGVkID0gZmFsc2U7XG5cbiAgICAgICAgc3RhcnRUaW1lID0gbnVsbDtcbiAgICAgICAgc3RhcnRGcmFnbWVudFRpbWUgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICBkb1N0b3AoKTtcbiAgICAgICAgc3RyZWFtUHJvY2Vzc29yLnVucmVnaXN0ZXJFeHRlcm5hbENvbnRyb2xsZXIoaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWROZXh0RnJhZ21lbnRJbmZvKCkge1xuICAgICAgICAvLyBDaGVjayBpZiBydW5uaW5nIHN0YXRlXG4gICAgICAgIGlmICghc3RhcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGxhc3Qgc2VnbWVudCBmcm9tIFNlZ21lbnRUaW1lbGluZVxuICAgICAgICBjb25zdCByZXByZXNlbnRhdGlvbiA9IGdldEN1cnJlbnRSZXByZXNlbnRhdGlvbigpO1xuICAgICAgICBjb25zdCBtYW5pZmVzdCA9IHJlcHJlc2VudGF0aW9uLmFkYXB0YXRpb24ucGVyaW9kLm1wZC5tYW5pZmVzdDtcbiAgICAgICAgY29uc3QgYWRhcHRhdGlvbiA9IG1hbmlmZXN0LlBlcmlvZF9hc0FycmF5W3JlcHJlc2VudGF0aW9uLmFkYXB0YXRpb24ucGVyaW9kLmluZGV4XS5BZGFwdGF0aW9uU2V0X2FzQXJyYXlbcmVwcmVzZW50YXRpb24uYWRhcHRhdGlvbi5pbmRleF07XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gYWRhcHRhdGlvbi5TZWdtZW50VGVtcGxhdGUuU2VnbWVudFRpbWVsaW5lLlNfYXNBcnJheTtcbiAgICAgICAgY29uc3Qgc2VnbWVudCA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnTGFzdCBmcmFnbWVudCB0aW1lOiAnICsgKHNlZ21lbnQudCAvIGFkYXB0YXRpb24uU2VnbWVudFRlbXBsYXRlLnRpbWVzY2FsZSkpO1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIHNlZ21lbnQgcmVxdWVzdFxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gZ2V0UmVxdWVzdEZvclNlZ21lbnQoYWRhcHRhdGlvbiwgcmVwcmVzZW50YXRpb24sIHNlZ21lbnQpO1xuXG4gICAgICAgIC8vIFNlbmQgc2VnbWVudCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3RGcmFnbWVudC5jYWxsKHRoaXMsIHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGF5TG9hZE5leHRGcmFnbWVudEluZm8oZGVsYXkpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGJ1ZmZlclRpbWVvdXQpO1xuICAgICAgICBidWZmZXJUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidWZmZXJUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIGxvYWROZXh0RnJhZ21lbnRJbmZvKCk7XG4gICAgICAgIH0sIGRlbGF5ICogMTAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UmVxdWVzdEZvclNlZ21lbnQoYWRhcHRhdGlvbiwgcmVwcmVzZW50YXRpb24sIHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IHRpbWVzY2FsZSA9IGFkYXB0YXRpb24uU2VnbWVudFRlbXBsYXRlLnRpbWVzY2FsZTtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgRnJhZ21lbnRSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5tZWRpYVR5cGUgPSB0eXBlO1xuICAgICAgICByZXF1ZXN0LnR5cGUgPSAnRnJhZ21lbnRJbmZvU2VnbWVudCc7XG4gICAgICAgIC8vIHJlcXVlc3QucmFuZ2UgPSBzZWdtZW50Lm1lZGlhUmFuZ2U7XG4gICAgICAgIHJlcXVlc3Quc3RhcnRUaW1lID0gc2VnbWVudC50IC8gdGltZXNjYWxlO1xuICAgICAgICByZXF1ZXN0LmR1cmF0aW9uID0gc2VnbWVudC5kIC8gdGltZXNjYWxlO1xuICAgICAgICByZXF1ZXN0LnRpbWVzY2FsZSA9IHRpbWVzY2FsZTtcbiAgICAgICAgLy8gcmVxdWVzdC5hdmFpbGFiaWxpdHlTdGFydFRpbWUgPSBzZWdtZW50LmF2YWlsYWJpbGl0eVN0YXJ0VGltZTtcbiAgICAgICAgLy8gcmVxdWVzdC5hdmFpbGFiaWxpdHlFbmRUaW1lID0gc2VnbWVudC5hdmFpbGFiaWxpdHlFbmRUaW1lO1xuICAgICAgICAvLyByZXF1ZXN0LndhbGxTdGFydFRpbWUgPSBzZWdtZW50LndhbGxTdGFydFRpbWU7XG4gICAgICAgIHJlcXVlc3QucXVhbGl0eSA9IHJlcHJlc2VudGF0aW9uLmluZGV4O1xuICAgICAgICByZXF1ZXN0LmluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgcmVxdWVzdC5tZWRpYUluZm8gPSBzdHJlYW1Qcm9jZXNzb3IuZ2V0TWVkaWFJbmZvKCk7XG4gICAgICAgIHJlcXVlc3QuYWRhcHRhdGlvbkluZGV4ID0gcmVwcmVzZW50YXRpb24uYWRhcHRhdGlvbi5pbmRleDtcbiAgICAgICAgcmVxdWVzdC5yZXByZXNlbnRhdGlvbklkID0gcmVwcmVzZW50YXRpb24uaWQ7XG4gICAgICAgIHJlcXVlc3QudXJsID0gYmFzZVVSTENvbnRyb2xsZXIucmVzb2x2ZShyZXByZXNlbnRhdGlvbi5wYXRoKS51cmwgKyBhZGFwdGF0aW9uLlNlZ21lbnRUZW1wbGF0ZS5tZWRpYTtcbiAgICAgICAgcmVxdWVzdC51cmwgPSByZXF1ZXN0LnVybC5yZXBsYWNlKCckQmFuZHdpZHRoJCcsIHJlcHJlc2VudGF0aW9uLmJhbmR3aWR0aCk7XG4gICAgICAgIHJlcXVlc3QudXJsID0gcmVxdWVzdC51cmwucmVwbGFjZSgnJFRpbWUkJywgc2VnbWVudC50TWFuaWZlc3QgPyBzZWdtZW50LnRNYW5pZmVzdCA6IHNlZ21lbnQudCk7XG4gICAgICAgIHJlcXVlc3QudXJsID0gcmVxdWVzdC51cmwucmVwbGFjZSgnL0ZyYWdtZW50cygnLCAnL0ZyYWdtZW50SW5mbygnKTtcblxuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDdXJyZW50UmVwcmVzZW50YXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHJlcHJlc2VudGF0aW9uQ29udHJvbGxlciA9IHN0cmVhbVByb2Nlc3Nvci5nZXRSZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIoKTtcbiAgICAgICAgY29uc3QgcmVwcmVzZW50YXRpb24gPSByZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIuZ2V0Q3VycmVudFJlcHJlc2VudGF0aW9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlcHJlc2VudGF0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RGcmFnbWVudChyZXF1ZXN0KSB7XG5cbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdMb2FkIGZyYWdtZW50IGZvciB0aW1lOiAnICsgcmVxdWVzdC5zdGFydFRpbWUpO1xuICAgICAgICBpZiAoc3RyZWFtUHJvY2Vzc29yLmdldEZyYWdtZW50TW9kZWwoKS5pc0ZyYWdtZW50TG9hZGVkT3JQZW5kaW5nKHJlcXVlc3QpKSB7XG4gICAgICAgICAgICAvLyBXZSBtYXkgaGF2ZSByZWFjaGVkIGVuZCBvZiB0aW1lbGluZSBpbiBjYXNlIG9mIHN0YXJ0LW92ZXIgc3RyZWFtc1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdObyBtb3JlIGZyYWdtZW50cycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZnJhZ21lbnRNb2RlbC5leGVjdXRlUmVxdWVzdChyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZyYWdtZW50SW5mb0xvYWRlZENvbXBsZXRlZChlKSB7XG4gICAgICAgIGlmIChlLnN0cmVhbVByb2Nlc3NvciAhPT0gc3RyZWFtUHJvY2Vzc29yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gZS5mcmFnbWVudEluZm8ucmVxdWVzdDtcbiAgICAgICAgaWYgKCFlLmZyYWdtZW50SW5mby5yZXNwb25zZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKCdMb2FkIGVycm9yJywgcmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRlbHRhRnJhZ21lbnRUaW1lLFxuICAgICAgICAgICAgZGVsdGFUaW1lO1xuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnRnJhZ21lbnRJbmZvIGxvYWRlZDogJywgcmVxdWVzdC51cmwpO1xuXG4gICAgICAgIGlmICghc3RhcnRGcmFnbWVudFRpbWUpIHtcbiAgICAgICAgICAgIHN0YXJ0RnJhZ21lbnRUaW1lID0gcmVxdWVzdC5zdGFydFRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gUHJvY2VzcyBGcmFtZ2VudEluZm8gaW4gb3JkZXIgdG8gdXBkYXRlIHNlZ21lbnQgdGltZWxpbmUgKERWUiB3aW5kb3cpXG4gICAgICAgICAgICBjb25zdCBtc3NGcmFnbWVudE1vb2ZQcm9jZXNzb3IgPSBNU1NGcmFnbWVudE1vb2ZQcm9jZXNzb3IoY29udGV4dCkuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXNoTWV0cmljczogZGFzaE1ldHJpY3MsXG4gICAgICAgICAgICAgICAgcGxheWJhY2tDb250cm9sbGVyOiBwbGF5YmFja0NvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgSVNPQm94ZXI6IElTT0JveGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgICAgICAgICBkZWJ1ZzogZGVidWdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbXNzRnJhZ21lbnRNb29mUHJvY2Vzc29yLnVwZGF0ZVNlZ21lbnRMaXN0KGUuZnJhZ21lbnRJbmZvLCBzdHJlYW1Qcm9jZXNzb3IpO1xuXG4gICAgICAgICAgICBkZWx0YVRpbWUgPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgIGRlbHRhRnJhZ21lbnRUaW1lID0gKHJlcXVlc3Quc3RhcnRUaW1lICsgcmVxdWVzdC5kdXJhdGlvbikgLSBzdGFydEZyYWdtZW50VGltZTtcbiAgICAgICAgICAgIGRlbGF5TG9hZE5leHRGcmFnbWVudEluZm8oTWF0aC5tYXgoMCwgKGRlbHRhRnJhZ21lbnRUaW1lIC0gZGVsdGFUaW1lKSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZmF0YWwoJ0ludGVybmFsIGVycm9yIHdoaWxlIHByb2Nlc3NpbmcgZnJhZ21lbnQgaW5mbyBzZWdtZW50ICcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UgPSB7XG4gICAgICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG4gICAgICAgIGNvbnRyb2xsZXJUeXBlOiBjb250cm9sbGVyVHlwZSxcbiAgICAgICAgc3RhcnQ6IGRvU3RhcnQsXG4gICAgICAgIGdldFR5cGU6IGdldFR5cGUsXG4gICAgICAgIHJlc2V0OiByZXNldFxuICAgIH07XG5cbiAgICBzZXR1cCgpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5Nc3NGcmFnbWVudEluZm9Db250cm9sbGVyLl9fZGFzaGpzX2ZhY3RvcnlfbmFtZSA9ICdNc3NGcmFnbWVudEluZm9Db250cm9sbGVyJztcbmV4cG9ydCBkZWZhdWx0IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE1zc0ZyYWdtZW50SW5mb0NvbnRyb2xsZXIpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5pbXBvcnQgRGFzaEpTRXJyb3IgZnJvbSAnLi4vc3RyZWFtaW5nL3ZvL0Rhc2hKU0Vycm9yJztcbmltcG9ydCBNc3NFcnJvcnMgZnJvbSAnLi9lcnJvcnMvTXNzRXJyb3JzJztcblxuaW1wb3J0IEV2ZW50cyBmcm9tICcuLi9zdHJlYW1pbmcvTWVkaWFQbGF5ZXJFdmVudHMnO1xuXG4vKipcbiAqIEBtb2R1bGUgTXNzRnJhZ21lbnRNb29mUHJvY2Vzc29yXG4gKiBAaWdub3JlXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIG9iamVjdFxuICovXG5mdW5jdGlvbiBNc3NGcmFnbWVudE1vb2ZQcm9jZXNzb3IoY29uZmlnKSB7XG5cbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgbGV0IGluc3RhbmNlLFxuICAgICAgICB0eXBlLFxuICAgICAgICBsb2dnZXI7XG4gICAgY29uc3QgZGFzaE1ldHJpY3MgPSBjb25maWcuZGFzaE1ldHJpY3M7XG4gICAgY29uc3QgcGxheWJhY2tDb250cm9sbGVyID0gY29uZmlnLnBsYXliYWNrQ29udHJvbGxlcjtcbiAgICBjb25zdCBlcnJvckhhbmRsZXIgPSBjb25maWcuZXJySGFuZGxlcjtcbiAgICBjb25zdCBldmVudEJ1cyA9IGNvbmZpZy5ldmVudEJ1cztcbiAgICBjb25zdCBJU09Cb3hlciA9IGNvbmZpZy5JU09Cb3hlcjtcbiAgICBjb25zdCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcblxuICAgIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgICAgICBsb2dnZXIgPSBkZWJ1Zy5nZXRMb2dnZXIoaW5zdGFuY2UpO1xuICAgICAgICB0eXBlID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1RmcmYocmVxdWVzdCwgdGZyZiwgdGZkdCwgc3RyZWFtUHJvY2Vzc29yKSB7XG4gICAgICAgIGNvbnN0IHJlcHJlc2VudGF0aW9uQ29udHJvbGxlciA9IHN0cmVhbVByb2Nlc3Nvci5nZXRSZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIoKTtcbiAgICAgICAgY29uc3QgcmVwcmVzZW50YXRpb24gPSByZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIuZ2V0Q3VycmVudFJlcHJlc2VudGF0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgbWFuaWZlc3QgPSByZXByZXNlbnRhdGlvbi5hZGFwdGF0aW9uLnBlcmlvZC5tcGQubWFuaWZlc3Q7XG4gICAgICAgIGNvbnN0IGFkYXB0YXRpb24gPSBtYW5pZmVzdC5QZXJpb2RfYXNBcnJheVtyZXByZXNlbnRhdGlvbi5hZGFwdGF0aW9uLnBlcmlvZC5pbmRleF0uQWRhcHRhdGlvblNldF9hc0FycmF5W3JlcHJlc2VudGF0aW9uLmFkYXB0YXRpb24uaW5kZXhdO1xuICAgICAgICBjb25zdCB0aW1lc2NhbGUgPSBhZGFwdGF0aW9uLlNlZ21lbnRUZW1wbGF0ZS50aW1lc2NhbGU7XG5cbiAgICAgICAgdHlwZSA9IHN0cmVhbVByb2Nlc3Nvci5nZXRUeXBlKCk7XG5cbiAgICAgICAgaWYgKG1hbmlmZXN0LnR5cGUgIT09ICdkeW5hbWljJyAmJiAhbWFuaWZlc3QudGltZVNoaWZ0QnVmZmVyRGVwdGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGZyZikge1xuICAgICAgICAgICAgZXJyb3JIYW5kbGVyLmVycm9yKG5ldyBEYXNoSlNFcnJvcihNc3NFcnJvcnMuTVNTX05PX1RGUkZfQ09ERSwgTXNzRXJyb3JzLk1TU19OT19URlJGX01FU1NBR0UpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBhZGFwdGF0aW9uJ3Mgc2VnbWVudCB0aW1lbGluZSAoYWx3YXlzIGEgU2VnbWVudFRpbWVsaW5lIGluIFNtb290aCBTdHJlYW1pbmcgdXNlIGNhc2UpXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gYWRhcHRhdGlvbi5TZWdtZW50VGVtcGxhdGUuU2VnbWVudFRpbWVsaW5lLlM7XG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSB0ZnJmLmVudHJ5O1xuICAgICAgICBsZXQgZW50cnksXG4gICAgICAgICAgICBzZWdtZW50VGltZSxcbiAgICAgICAgICAgIHJhbmdlO1xuICAgICAgICBsZXQgc2VnbWVudCA9IG51bGw7XG4gICAgICAgIGxldCB0ID0gMDtcbiAgICAgICAgbGV0IGF2YWlsYWJpbGl0eVN0YXJ0VGltZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKGVudHJpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25zaWRlciBvbmx5IGZpcnN0IHRmcmYgZW50cnkgKHRvIGF2b2lkIHByZS1jb25kaXRpb24gZmFpbHVyZSBvbiBmcmFnbWVudCBpbmZvIHJlcXVlc3RzKVxuICAgICAgICBlbnRyeSA9IGVudHJpZXNbMF07XG5cbiAgICAgICAgLy8gSW4gY2FzZSBvZiBzdGFydC1vdmVyIHN0cmVhbXMsIGNoZWNrIGlmIHdlIGhhdmUgcmVhY2hlZCBlbmQgb2Ygb3JpZ2luYWwgbWFuaWZlc3QgZHVyYXRpb24gKHNldCBpbiB0aW1lU2hpZnRCdWZmZXJEZXB0aClcbiAgICAgICAgLy8gPT4gdGhlbiBkbyBub3QgdXBkYXRlIGFueW1vcmUgdGltZWxpbmVcbiAgICAgICAgaWYgKG1hbmlmZXN0LnR5cGUgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgICAgICAvLyBHZXQgZmlyc3Qgc2VnbWVudCB0aW1lXG4gICAgICAgICAgICBzZWdtZW50VGltZSA9IHNlZ21lbnRzWzBdLnRNYW5pZmVzdCA/IHBhcnNlRmxvYXQoc2VnbWVudHNbMF0udE1hbmlmZXN0KSA6IHNlZ21lbnRzWzBdLnQ7XG4gICAgICAgICAgICBpZiAoZW50cnkuZnJhZ21lbnRfYWJzb2x1dGVfdGltZSA+IChzZWdtZW50VGltZSArIChtYW5pZmVzdC50aW1lU2hpZnRCdWZmZXJEZXB0aCAqIHRpbWVzY2FsZSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdlbnRyeSAtIHQgPSAnLCAoZW50cnkuZnJhZ21lbnRfYWJzb2x1dGVfdGltZSAvIHRpbWVzY2FsZSkpO1xuXG4gICAgICAgIC8vIEdldCBsYXN0IHNlZ21lbnQgdGltZVxuICAgICAgICBzZWdtZW50VGltZSA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdLnRNYW5pZmVzdCA/IHBhcnNlRmxvYXQoc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV0udE1hbmlmZXN0KSA6IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdLnQ7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnTGFzdCBzZWdtZW50IC0gdCA9ICcsIChzZWdtZW50VGltZSAvIHRpbWVzY2FsZSkpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgdG8gYXBwZW5kIG5ldyBzZWdtZW50IHRvIHRpbWVsaW5lXG4gICAgICAgIGlmIChlbnRyeS5mcmFnbWVudF9hYnNvbHV0ZV90aW1lIDw9IHNlZ21lbnRUaW1lKSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgRFZSIHdpbmRvdyByYW5nZVxuICAgICAgICAgICAgLy8gPT4gc2V0IHJhbmdlIGVuZCB0byBlbmQgdGltZSBvZiBjdXJyZW50IHNlZ21lbnRcbiAgICAgICAgICAgIHJhbmdlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzZWdtZW50c1swXS50IC8gdGltZXNjYWxlLFxuICAgICAgICAgICAgICAgIGVuZDogKHRmZHQuYmFzZU1lZGlhRGVjb2RlVGltZSAvIHRpbWVzY2FsZSkgKyByZXF1ZXN0LmR1cmF0aW9uXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1cGRhdGVEVlIocmVxdWVzdC5tZWRpYVR5cGUsIHJhbmdlLCBzdHJlYW1Qcm9jZXNzb3IuZ2V0U3RyZWFtSW5mbygpLm1hbmlmZXN0SW5mbyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0FkZCBuZXcgc2VnbWVudCAtIHQgPSAnLCAoZW50cnkuZnJhZ21lbnRfYWJzb2x1dGVfdGltZSAvIHRpbWVzY2FsZSkpO1xuICAgICAgICBzZWdtZW50ID0ge307XG4gICAgICAgIHNlZ21lbnQudCA9IGVudHJ5LmZyYWdtZW50X2Fic29sdXRlX3RpbWU7XG4gICAgICAgIHNlZ21lbnQuZCA9IGVudHJ5LmZyYWdtZW50X2R1cmF0aW9uO1xuICAgICAgICAvLyBJZiB0aW1lc3RhbXBzIHN0YXJ0cyBhdCAwIHJlbGF0aXZlIHRvIDFzdCBzZWdtZW50IChkeW5hbWljIHRvIHN0YXRpYykgdGhlbiB1cGRhdGUgc2VnbWVudCB0aW1lXG4gICAgICAgIGlmIChzZWdtZW50c1swXS50TWFuaWZlc3QpIHtcbiAgICAgICAgICAgIHNlZ21lbnQudCAtPSBwYXJzZUZsb2F0KHNlZ21lbnRzWzBdLnRNYW5pZmVzdCkgLSBzZWdtZW50c1swXS50O1xuICAgICAgICAgICAgc2VnbWVudC50TWFuaWZlc3QgPSBlbnRyeS5mcmFnbWVudF9hYnNvbHV0ZV90aW1lO1xuICAgICAgICB9XG4gICAgICAgIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cbiAgICAgICAgLy8gSW4gY2FzZSBvZiBzdGF0aWMgc3RhcnQtb3ZlciBzdHJlYW1zLCB1cGRhdGUgY29udGVudCBkdXJhdGlvblxuICAgICAgICBpZiAobWFuaWZlc3QudHlwZSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudCA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSAoc2VnbWVudC50ICsgc2VnbWVudC5kKSAvIHRpbWVzY2FsZTtcbiAgICAgICAgICAgICAgICBpZiAoZW5kID4gcmVwcmVzZW50YXRpb24uYWRhcHRhdGlvbi5wZXJpb2QuZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcihFdmVudHMuTUFOSUZFU1RfVkFMSURJVFlfQ0hBTkdFRCwgeyBzZW5kZXI6IHRoaXMsIG5ld0R1cmF0aW9uOiBlbmQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluIGNhc2Ugb2YgbGl2ZSBzdHJlYW1zLCB1cGRhdGUgc2VnbWVudCB0aW1lbGluZSBhY2NvcmRpbmcgdG8gRFZSIHdpbmRvd1xuICAgICAgICBlbHNlIGlmIChtYW5pZmVzdC50aW1lU2hpZnRCdWZmZXJEZXB0aCAmJiBtYW5pZmVzdC50aW1lU2hpZnRCdWZmZXJEZXB0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIEdldCB0aW1lc3RhbXAgb2YgdGhlIGxhc3Qgc2VnbWVudFxuICAgICAgICAgICAgc2VnbWVudCA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgdCA9IHNlZ21lbnQudDtcblxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBzZWdtZW50cycgYXZhaWxhYmlsaXR5IHN0YXJ0IHRpbWVcbiAgICAgICAgICAgIGF2YWlsYWJpbGl0eVN0YXJ0VGltZSA9IE1hdGgucm91bmQoKHQgLSAobWFuaWZlc3QudGltZVNoaWZ0QnVmZmVyRGVwdGggKiB0aW1lc2NhbGUpKSAvIHRpbWVzY2FsZSk7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBzZWdtZW50cyBwcmlvciB0byBhdmFpbGFiaWxpdHkgc3RhcnQgdGltZVxuICAgICAgICAgICAgc2VnbWVudCA9IHNlZ21lbnRzWzBdO1xuICAgICAgICAgICAgd2hpbGUgKE1hdGgucm91bmQoc2VnbWVudC50IC8gdGltZXNjYWxlKSA8IGF2YWlsYWJpbGl0eVN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUmVtb3ZlIHNlZ21lbnQgIC0gdCA9ICcgKyAoc2VnbWVudC50IC8gdGltZXNjYWxlKSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQgPSBzZWdtZW50c1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVXBkYXRlIERWUiB3aW5kb3cgcmFuZ2UgPT4gc2V0IHJhbmdlIGVuZCB0byBlbmQgdGltZSBvZiBjdXJyZW50IHNlZ21lbnRcbiAgICAgICAgICAgIHJhbmdlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzZWdtZW50c1swXS50IC8gdGltZXNjYWxlLFxuICAgICAgICAgICAgICAgIGVuZDogKHRmZHQuYmFzZU1lZGlhRGVjb2RlVGltZSAvIHRpbWVzY2FsZSkgKyByZXF1ZXN0LmR1cmF0aW9uXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1cGRhdGVEVlIodHlwZSwgcmFuZ2UsIHN0cmVhbVByb2Nlc3Nvci5nZXRTdHJlYW1JbmZvKCkubWFuaWZlc3RJbmZvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcHJlc2VudGF0aW9uQ29udHJvbGxlci51cGRhdGVSZXByZXNlbnRhdGlvbihyZXByZXNlbnRhdGlvbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlRFZSKHR5cGUsIHJhbmdlLCBtYW5pZmVzdEluZm8pIHtcbiAgICAgICAgY29uc3QgZHZySW5mb3MgPSBkYXNoTWV0cmljcy5nZXRDdXJyZW50RFZSSW5mbyh0eXBlKTtcbiAgICAgICAgaWYgKCFkdnJJbmZvcyB8fCAocmFuZ2UuZW5kID4gZHZySW5mb3MucmFuZ2UuZW5kKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdVcGRhdGUgRFZSIEluZm9zIFsnICsgcmFuZ2Uuc3RhcnQgKyAnIC0gJyArIHJhbmdlLmVuZCArICddJyk7XG4gICAgICAgICAgICBkYXNoTWV0cmljcy5hZGREVlJJbmZvKHR5cGUsIHBsYXliYWNrQ29udHJvbGxlci5nZXRUaW1lKCksIG1hbmlmZXN0SW5mbywgcmFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhlIDFzdCBieXRlIG9mIGEgY2hpbGQgYm94IHdpdGhpbiBhIGNvbnRhaW5lciBib3hcbiAgICBmdW5jdGlvbiBnZXRCb3hPZmZzZXQocGFyZW50LCB0eXBlKSB7XG4gICAgICAgIGxldCBvZmZzZXQgPSA4O1xuICAgICAgICBsZXQgaSA9IDA7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcmVudC5ib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5ib3hlc1tpXS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9mZnNldCArPSBwYXJlbnQuYm94ZXNbaV0uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRGcmFnbWVudChlLCBzcCkge1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICAvLyBlLnJlcXVlc3QgY29udGFpbnMgcmVxdWVzdCBkZXNjcmlwdGlvbiBvYmplY3RcbiAgICAgICAgLy8gZS5yZXNwb25zZSBjb250YWlucyBmcmFnbWVudCBieXRlc1xuICAgICAgICBjb25zdCBpc29GaWxlID0gSVNPQm94ZXIucGFyc2VCdWZmZXIoZS5yZXNwb25zZSk7XG4gICAgICAgIC8vIFVwZGF0ZSB0cmFja19JZCBpbiB0ZmhkIGJveFxuICAgICAgICBjb25zdCB0ZmhkID0gaXNvRmlsZS5mZXRjaCgndGZoZCcpO1xuICAgICAgICB0ZmhkLnRyYWNrX0lEID0gZS5yZXF1ZXN0Lm1lZGlhSW5mby5pbmRleCArIDE7XG5cbiAgICAgICAgLy8gQWRkIHRmZHQgYm94XG4gICAgICAgIGxldCB0ZmR0ID0gaXNvRmlsZS5mZXRjaCgndGZkdCcpO1xuICAgICAgICBjb25zdCB0cmFmID0gaXNvRmlsZS5mZXRjaCgndHJhZicpO1xuICAgICAgICBpZiAodGZkdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGZkdCA9IElTT0JveGVyLmNyZWF0ZUZ1bGxCb3goJ3RmZHQnLCB0cmFmLCB0ZmhkKTtcbiAgICAgICAgICAgIHRmZHQudmVyc2lvbiA9IDE7XG4gICAgICAgICAgICB0ZmR0LmZsYWdzID0gMDtcbiAgICAgICAgICAgIHRmZHQuYmFzZU1lZGlhRGVjb2RlVGltZSA9IE1hdGguZmxvb3IoZS5yZXF1ZXN0LnN0YXJ0VGltZSAqIGUucmVxdWVzdC50aW1lc2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJ1biA9IGlzb0ZpbGUuZmV0Y2goJ3RydW4nKTtcblxuICAgICAgICAvLyBQcm9jZXNzIHRmeGQgYm94ZXNcbiAgICAgICAgLy8gVGhpcyBib3ggcHJvdmlkZSBhYnNvbHV0ZSB0aW1lc3RhbXAgYnV0IHdlIHRha2UgdGhlIHNlZ21lbnQgc3RhcnQgdGltZSBmb3IgdGZkdFxuICAgICAgICBsZXQgdGZ4ZCA9IGlzb0ZpbGUuZmV0Y2goJ3RmeGQnKTtcbiAgICAgICAgaWYgKHRmeGQpIHtcbiAgICAgICAgICAgIHRmeGQuX3BhcmVudC5ib3hlcy5zcGxpY2UodGZ4ZC5fcGFyZW50LmJveGVzLmluZGV4T2YodGZ4ZCksIDEpO1xuICAgICAgICAgICAgdGZ4ZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRmcmYgPSBpc29GaWxlLmZldGNoKCd0ZnJmJyk7XG4gICAgICAgIHByb2Nlc3NUZnJmKGUucmVxdWVzdCwgdGZyZiwgdGZkdCwgc3ApO1xuICAgICAgICBpZiAodGZyZikge1xuICAgICAgICAgICAgdGZyZi5fcGFyZW50LmJveGVzLnNwbGljZSh0ZnJmLl9wYXJlbnQuYm94ZXMuaW5kZXhPZih0ZnJmKSwgMSk7XG4gICAgICAgICAgICB0ZnJmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHByb3RlY3RlZCBjb250ZW50IGluIFBJRkYxLjEgZm9ybWF0IChzZXBpZmYgYm94ID0gU2FtcGxlIEVuY3J5cHRpb24gUElGRilcbiAgICAgICAgLy8gPT4gY29udmVydCBzZXBpZmYgYm94IGl0IGludG8gYSBzZW5jIGJveFxuICAgICAgICAvLyA9PiBjcmVhdGUgc2FpbyBhbmQgc2FpeiBib3hlcyAoaWYgbm90IGFscmVhZHkgcHJlc2VudClcbiAgICAgICAgY29uc3Qgc2VwaWZmID0gaXNvRmlsZS5mZXRjaCgnc2VwaWZmJyk7XG4gICAgICAgIGlmIChzZXBpZmYgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHNlcGlmZi50eXBlID0gJ3NlbmMnO1xuICAgICAgICAgICAgc2VwaWZmLnVzZXJ0eXBlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBsZXQgc2FpbyA9IGlzb0ZpbGUuZmV0Y2goJ3NhaW8nKTtcbiAgICAgICAgICAgIGlmIChzYWlvID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIFNhbXBsZSBBdXhpbGlhcnkgSW5mb3JtYXRpb24gT2Zmc2V0cyBCb3ggYm94IChzYWlvKVxuICAgICAgICAgICAgICAgIHNhaW8gPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCdzYWlvJywgdHJhZik7XG4gICAgICAgICAgICAgICAgc2Fpby52ZXJzaW9uID0gMDtcbiAgICAgICAgICAgICAgICBzYWlvLmZsYWdzID0gMDtcbiAgICAgICAgICAgICAgICBzYWlvLmVudHJ5X2NvdW50ID0gMTtcbiAgICAgICAgICAgICAgICBzYWlvLm9mZnNldCA9IFswXTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNhaXogPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCdzYWl6JywgdHJhZik7XG4gICAgICAgICAgICAgICAgc2Fpei52ZXJzaW9uID0gMDtcbiAgICAgICAgICAgICAgICBzYWl6LmZsYWdzID0gMDtcbiAgICAgICAgICAgICAgICBzYWl6LnNhbXBsZV9jb3VudCA9IHNlcGlmZi5zYW1wbGVfY291bnQ7XG4gICAgICAgICAgICAgICAgc2Fpei5kZWZhdWx0X3NhbXBsZV9pbmZvX3NpemUgPSAwO1xuICAgICAgICAgICAgICAgIHNhaXouc2FtcGxlX2luZm9fc2l6ZSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlcGlmZi5mbGFncyAmIDB4MDIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3ViLXNhbXBsZSBlbmNyeXB0aW9uID0+IHNldCBzYW1wbGVfaW5mb19zaXplIGZvciBlYWNoIHNhbXBsZVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2VwaWZmLnNhbXBsZV9jb3VudDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxMCA9IDggKEluaXRpYWxpemF0aW9uVmVjdG9yIGZpZWxkIHNpemUpICsgMiAoc3Vic2FtcGxlX2NvdW50IGZpZWxkIHNpemUpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA2ID0gMiAoQnl0ZXNPZkNsZWFyRGF0YSBmaWVsZCBzaXplKSArIDQgKEJ5dGVzT2ZFbmNyeXB0ZWREYXRhIGZpZWxkIHNpemUpXG4gICAgICAgICAgICAgICAgICAgICAgICBzYWl6LnNhbXBsZV9pbmZvX3NpemVbaV0gPSAxMCArICg2ICogc2VwaWZmLmVudHJ5W2ldLk51bWJlck9mRW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBObyBzdWItc2FtcGxlIGVuY3J5cHRpb24gPT4gc2V0IGRlZmF1bHQgc2FtcGxlX2luZm9fc2l6ZSA9IEluaXRpYWxpemF0aW9uVmVjdG9yIGZpZWxkIHNpemUgKDgpXG4gICAgICAgICAgICAgICAgICAgIHNhaXouZGVmYXVsdF9zYW1wbGVfaW5mb19zaXplID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0ZmhkLmZsYWdzICY9IDB4RkZGRkZFOyAvLyBzZXQgdGZoZC5iYXNlLWRhdGEtb2Zmc2V0LXByZXNlbnQgdG8gZmFsc2VcbiAgICAgICAgdGZoZC5mbGFncyB8PSAweDAyMDAwMDsgLy8gc2V0IHRmaGQuZGVmYXVsdC1iYXNlLWlzLW1vb2YgdG8gdHJ1ZVxuICAgICAgICB0cnVuLmZsYWdzIHw9IDB4MDAwMDAxOyAvLyBzZXQgdHJ1bi5kYXRhLW9mZnNldC1wcmVzZW50IHRvIHRydWVcblxuICAgICAgICAvLyBVcGRhdGUgdHJ1bi5kYXRhX29mZnNldCBmaWVsZCB0aGF0IGNvcnJlc3BvbmRzIHRvIGZpcnN0IGRhdGEgYnl0ZSAoaW5zaWRlIG1kYXQgYm94KVxuICAgICAgICBjb25zdCBtb29mID0gaXNvRmlsZS5mZXRjaCgnbW9vZicpO1xuICAgICAgICBsZXQgbGVuZ3RoID0gbW9vZi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdHJ1bi5kYXRhX29mZnNldCA9IGxlbmd0aCArIDg7XG5cbiAgICAgICAgLy8gVXBkYXRlIHNhaW8gYm94IG9mZnNldCBmaWVsZCBhY2NvcmRpbmcgdG8gbmV3IHNlbmMgYm94IG9mZnNldFxuICAgICAgICBsZXQgc2FpbyA9IGlzb0ZpbGUuZmV0Y2goJ3NhaW8nKTtcbiAgICAgICAgaWYgKHNhaW8gIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCB0cmFmUG9zSW5Nb29mID0gZ2V0Qm94T2Zmc2V0KG1vb2YsICd0cmFmJyk7XG4gICAgICAgICAgICBsZXQgc2VuY1Bvc0luVHJhZiA9IGdldEJveE9mZnNldCh0cmFmLCAnc2VuYycpO1xuICAgICAgICAgICAgLy8gU2V0IG9mZnNldCBmcm9tIGJlZ2luIGZyYWdtZW50IHRvIHRoZSBmaXJzdCBJViBmaWVsZCBpbiBzZW5jIGJveFxuICAgICAgICAgICAgc2Fpby5vZmZzZXRbMF0gPSB0cmFmUG9zSW5Nb29mICsgc2VuY1Bvc0luVHJhZiArIDE2OyAvLyAxNiA9IGJveCBoZWFkZXIgKDEyKSArIHNhbXBsZV9jb3VudCBmaWVsZCBzaXplICg0KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gV3JpdGUgdHJhbnNmb3JtZWQvcHJvY2Vzc2VkIGZyYWdtZW50IGludG8gcmVxdWVzdCByZXBvbnNlIGRhdGFcbiAgICAgICAgZS5yZXNwb25zZSA9IGlzb0ZpbGUud3JpdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTZWdtZW50TGlzdChlLCBzcCkge1xuICAgICAgICAvLyBlLnJlcXVlc3QgY29udGFpbnMgcmVxdWVzdCBkZXNjcmlwdGlvbiBvYmplY3RcbiAgICAgICAgLy8gZS5yZXNwb25zZSBjb250YWlucyBmcmFnbWVudCBieXRlc1xuICAgICAgICBpZiAoIWUucmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZS5yZXNwb25zZSBwYXJhbWV0ZXIgaXMgbWlzc2luZycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNvRmlsZSA9IElTT0JveGVyLnBhcnNlQnVmZmVyKGUucmVzcG9uc2UpO1xuICAgICAgICAvLyBVcGRhdGUgdHJhY2tfSWQgaW4gdGZoZCBib3hcbiAgICAgICAgY29uc3QgdGZoZCA9IGlzb0ZpbGUuZmV0Y2goJ3RmaGQnKTtcbiAgICAgICAgdGZoZC50cmFja19JRCA9IGUucmVxdWVzdC5tZWRpYUluZm8uaW5kZXggKyAxO1xuXG4gICAgICAgIC8vIEFkZCB0ZmR0IGJveFxuICAgICAgICBsZXQgdGZkdCA9IGlzb0ZpbGUuZmV0Y2goJ3RmZHQnKTtcbiAgICAgICAgbGV0IHRyYWYgPSBpc29GaWxlLmZldGNoKCd0cmFmJyk7XG4gICAgICAgIGlmICh0ZmR0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0ZmR0ID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgndGZkdCcsIHRyYWYsIHRmaGQpO1xuICAgICAgICAgICAgdGZkdC52ZXJzaW9uID0gMTtcbiAgICAgICAgICAgIHRmZHQuZmxhZ3MgPSAwO1xuICAgICAgICAgICAgdGZkdC5iYXNlTWVkaWFEZWNvZGVUaW1lID0gTWF0aC5mbG9vcihlLnJlcXVlc3Quc3RhcnRUaW1lICogZS5yZXF1ZXN0LnRpbWVzY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGZyZiA9IGlzb0ZpbGUuZmV0Y2goJ3RmcmYnKTtcbiAgICAgICAgcHJvY2Vzc1RmcmYoZS5yZXF1ZXN0LCB0ZnJmLCB0ZmR0LCBzcCk7XG4gICAgICAgIGlmICh0ZnJmKSB7XG4gICAgICAgICAgICB0ZnJmLl9wYXJlbnQuYm94ZXMuc3BsaWNlKHRmcmYuX3BhcmVudC5ib3hlcy5pbmRleE9mKHRmcmYpLCAxKTtcbiAgICAgICAgICAgIHRmcmYgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UgPSB7XG4gICAgICAgIGNvbnZlcnRGcmFnbWVudDogY29udmVydEZyYWdtZW50LFxuICAgICAgICB1cGRhdGVTZWdtZW50TGlzdDogdXBkYXRlU2VnbWVudExpc3QsXG4gICAgICAgIGdldFR5cGU6IGdldFR5cGVcbiAgICB9O1xuXG4gICAgc2V0dXAoKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbk1zc0ZyYWdtZW50TW9vZlByb2Nlc3Nvci5fX2Rhc2hqc19mYWN0b3J5X25hbWUgPSAnTXNzRnJhZ21lbnRNb29mUHJvY2Vzc29yJztcbmV4cG9ydCBkZWZhdWx0IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE1zc0ZyYWdtZW50TW9vZlByb2Nlc3Nvcik7IC8qIGpzaGludCBpZ25vcmU6bGluZSAqL1xuIiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbiBpbXBvcnQgTXNzRXJyb3JzIGZyb20gJy4vZXJyb3JzL01zc0Vycm9ycyc7XG5cbi8qKlxuICogQG1vZHVsZSBNc3NGcmFnbWVudE1vb3ZQcm9jZXNzb3JcbiAqIEBpZ25vcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIE1zc0ZyYWdtZW50TW9vdlByb2Nlc3Nvcihjb25maWcpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uc3QgTkFMVVRZUEVfU1BTID0gNztcbiAgICBjb25zdCBOQUxVVFlQRV9QUFMgPSA4O1xuICAgIGNvbnN0IGNvbnN0YW50cyA9IGNvbmZpZy5jb25zdGFudHM7XG4gICAgY29uc3QgSVNPQm94ZXIgPSBjb25maWcuSVNPQm94ZXI7XG5cbiAgICBsZXQgcHJvdGVjdGlvbkNvbnRyb2xsZXIgPSBjb25maWcucHJvdGVjdGlvbkNvbnRyb2xsZXI7XG4gICAgbGV0IGluc3RhbmNlLFxuICAgICAgICBwZXJpb2QsXG4gICAgICAgIGFkYXB0YXRpb25TZXQsXG4gICAgICAgIHJlcHJlc2VudGF0aW9uLFxuICAgICAgICBjb250ZW50UHJvdGVjdGlvbixcbiAgICAgICAgdGltZXNjYWxlLFxuICAgICAgICB0cmFja0lkO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnR5cEJveChpc29GaWxlKSB7XG4gICAgICAgIGxldCBmdHlwID0gSVNPQm94ZXIuY3JlYXRlQm94KCdmdHlwJywgaXNvRmlsZSk7XG4gICAgICAgIGZ0eXAubWFqb3JfYnJhbmQgPSAnaXNvNic7XG4gICAgICAgIGZ0eXAubWlub3JfdmVyc2lvbiA9IDE7IC8vIGlzIGFuIGluZm9ybWF0aXZlIGludGVnZXIgZm9yIHRoZSBtaW5vciB2ZXJzaW9uIG9mIHRoZSBtYWpvciBicmFuZFxuICAgICAgICBmdHlwLmNvbXBhdGlibGVfYnJhbmRzID0gW107IC8vaXMgYSBsaXN0LCB0byB0aGUgZW5kIG9mIHRoZSBib3gsIG9mIGJyYW5kcyBpc29tLCBpc282IGFuZCBtc2RoXG4gICAgICAgIGZ0eXAuY29tcGF0aWJsZV9icmFuZHNbMF0gPSAnaXNvbSc7IC8vID0+IGRlY2ltYWwgQVNDSUkgdmFsdWUgZm9yIGlzb21cbiAgICAgICAgZnR5cC5jb21wYXRpYmxlX2JyYW5kc1sxXSA9ICdpc282JzsgLy8gPT4gZGVjaW1hbCBBU0NJSSB2YWx1ZSBmb3IgaXNvNlxuICAgICAgICBmdHlwLmNvbXBhdGlibGVfYnJhbmRzWzJdID0gJ21zZGgnOyAvLyA9PiBkZWNpbWFsIEFTQ0lJIHZhbHVlIGZvciBtc2RoXG5cbiAgICAgICAgcmV0dXJuIGZ0eXA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTW9vdkJveChpc29GaWxlKSB7XG5cbiAgICAgICAgLy8gbW9vdiBib3hcbiAgICAgICAgbGV0IG1vb3YgPSBJU09Cb3hlci5jcmVhdGVCb3goJ21vb3YnLCBpc29GaWxlKTtcblxuICAgICAgICAvLyBtb292L212aGRcbiAgICAgICAgY3JlYXRlTXZoZEJveChtb292KTtcblxuICAgICAgICAvLyBtb292L3RyYWtcbiAgICAgICAgbGV0IHRyYWsgPSBJU09Cb3hlci5jcmVhdGVCb3goJ3RyYWsnLCBtb292KTtcblxuICAgICAgICAvLyBtb292L3RyYWsvdGtoZFxuICAgICAgICBjcmVhdGVUa2hkQm94KHRyYWspO1xuXG4gICAgICAgIC8vIG1vb3YvdHJhay9tZGlhXG4gICAgICAgIGxldCBtZGlhID0gSVNPQm94ZXIuY3JlYXRlQm94KCdtZGlhJywgdHJhayk7XG5cbiAgICAgICAgLy8gbW9vdi90cmFrL21kaWEvbWRoZFxuICAgICAgICBjcmVhdGVNZGhkQm94KG1kaWEpO1xuXG4gICAgICAgIC8vIG1vb3YvdHJhay9tZGlhL2hkbHJcbiAgICAgICAgY3JlYXRlSGRsckJveChtZGlhKTtcblxuICAgICAgICAvLyBtb292L3RyYWsvbWRpYS9taW5mXG4gICAgICAgIGxldCBtaW5mID0gSVNPQm94ZXIuY3JlYXRlQm94KCdtaW5mJywgbWRpYSk7XG5cbiAgICAgICAgc3dpdGNoIChhZGFwdGF0aW9uU2V0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlZJREVPOlxuICAgICAgICAgICAgICAgIC8vIG1vb3YvdHJhay9tZGlhL21pbmYvdm1oZFxuICAgICAgICAgICAgICAgIGNyZWF0ZVZtaGRCb3gobWluZik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BVURJTzpcbiAgICAgICAgICAgICAgICAvLyBtb292L3RyYWsvbWRpYS9taW5mL3NtaGRcbiAgICAgICAgICAgICAgICBjcmVhdGVTbWhkQm94KG1pbmYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vb3YvdHJhay9tZGlhL21pbmYvZGluZlxuICAgICAgICBsZXQgZGluZiA9IElTT0JveGVyLmNyZWF0ZUJveCgnZGluZicsIG1pbmYpO1xuXG4gICAgICAgIC8vIG1vb3YvdHJhay9tZGlhL21pbmYvZGluZi9kcmVmXG4gICAgICAgIGNyZWF0ZURyZWZCb3goZGluZik7XG5cbiAgICAgICAgLy8gbW9vdi90cmFrL21kaWEvbWluZi9zdGJsXG4gICAgICAgIGxldCBzdGJsID0gSVNPQm94ZXIuY3JlYXRlQm94KCdzdGJsJywgbWluZik7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGVtcHR5IHN0dHMsIHN0c2MsIHN0Y28gYW5kIHN0c3ogYm94ZXNcbiAgICAgICAgLy8gVXNlIGRhdGEgZmllbGQgYXMgZm9yIGNvZGVtLWlzb2JveGVyIHVua25vd24gYm94ZXMgZm9yIHNldHRpbmcgZmllbGRzIHZhbHVlXG5cbiAgICAgICAgLy8gbW9vdi90cmFrL21kaWEvbWluZi9zdGJsL3N0dHNcbiAgICAgICAgbGV0IHN0dHMgPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCdzdHRzJywgc3RibCk7XG4gICAgICAgIHN0dHMuX2RhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07IC8vIHZlcnNpb24gPSAwLCBmbGFncyA9IDAsIGVudHJ5X2NvdW50ID0gMFxuXG4gICAgICAgIC8vIG1vb3YvdHJhay9tZGlhL21pbmYvc3RibC9zdHNjXG4gICAgICAgIGxldCBzdHNjID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgnc3RzYycsIHN0YmwpO1xuICAgICAgICBzdHNjLl9kYXRhID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdOyAvLyB2ZXJzaW9uID0gMCwgZmxhZ3MgPSAwLCBlbnRyeV9jb3VudCA9IDBcblxuICAgICAgICAvLyBtb292L3RyYWsvbWRpYS9taW5mL3N0Ymwvc3Rjb1xuICAgICAgICBsZXQgc3RjbyA9IElTT0JveGVyLmNyZWF0ZUZ1bGxCb3goJ3N0Y28nLCBzdGJsKTtcbiAgICAgICAgc3Rjby5fZGF0YSA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTsgLy8gdmVyc2lvbiA9IDAsIGZsYWdzID0gMCwgZW50cnlfY291bnQgPSAwXG5cbiAgICAgICAgLy8gbW9vdi90cmFrL21kaWEvbWluZi9zdGJsL3N0c3pcbiAgICAgICAgbGV0IHN0c3ogPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCdzdHN6Jywgc3RibCk7XG4gICAgICAgIHN0c3ouX2RhdGEgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07IC8vIHZlcnNpb24gPSAwLCBmbGFncyA9IDAsIHNhbXBsZV9zaXplID0gMCwgc2FtcGxlX2NvdW50ID0gMFxuXG4gICAgICAgIC8vIG1vb3YvdHJhay9tZGlhL21pbmYvc3RibC9zdHNkXG4gICAgICAgIGNyZWF0ZVN0c2RCb3goc3RibCk7XG5cbiAgICAgICAgLy8gbW9vdi9tdmV4XG4gICAgICAgIGxldCBtdmV4ID0gSVNPQm94ZXIuY3JlYXRlQm94KCdtdmV4JywgbW9vdik7XG5cbiAgICAgICAgLy8gbW9vdi9tdmV4L3RyZXhcbiAgICAgICAgY3JlYXRlVHJleEJveChtdmV4KTtcblxuICAgICAgICBpZiAoY29udGVudFByb3RlY3Rpb24gJiYgcHJvdGVjdGlvbkNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGxldCBzdXBwb3J0ZWRLUyA9IHByb3RlY3Rpb25Db250cm9sbGVyLmdldFN1cHBvcnRlZEtleVN5c3RlbXNGcm9tQ29udGVudFByb3RlY3Rpb24oY29udGVudFByb3RlY3Rpb24pO1xuICAgICAgICAgICAgY3JlYXRlUHJvdGVjdGlvblN5c3RlbVNwZWNpZmljSGVhZGVyQm94KG1vb3YsIHN1cHBvcnRlZEtTKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU12aGRCb3gobW9vdikge1xuXG4gICAgICAgIGxldCBtdmhkID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgnbXZoZCcsIG1vb3YpO1xuXG4gICAgICAgIG12aGQudmVyc2lvbiA9IDE7IC8vIHZlcnNpb24gPSAxICBpbiBvcmRlciB0byBoYXZlIDY0Yml0cyBkdXJhdGlvbiB2YWx1ZVxuXG4gICAgICAgIG12aGQuY3JlYXRpb25fdGltZSA9IDA7IC8vIHRoZSBjcmVhdGlvbiB0aW1lIG9mIHRoZSBwcmVzZW50YXRpb24gPT4gaWdub3JlIChzZXQgdG8gMClcbiAgICAgICAgbXZoZC5tb2RpZmljYXRpb25fdGltZSA9IDA7IC8vIHRoZSBtb3N0IHJlY2VudCB0aW1lIHRoZSBwcmVzZW50YXRpb24gd2FzIG1vZGlmaWVkID0+IGlnbm9yZSAoc2V0IHRvIDApXG4gICAgICAgIG12aGQudGltZXNjYWxlID0gdGltZXNjYWxlOyAvLyB0aGUgdGltZS1zY2FsZSBmb3IgdGhlIGVudGlyZSBwcmVzZW50YXRpb24gPT4gMTAwMDAwMDAgZm9yIE1TU1xuICAgICAgICBtdmhkLmR1cmF0aW9uID0gTWF0aC5yb3VuZChwZXJpb2QuZHVyYXRpb24gKiB0aW1lc2NhbGUpOyAvLyB0aGUgbGVuZ3RoIG9mIHRoZSBwcmVzZW50YXRpb24gKGluIHRoZSBpbmRpY2F0ZWQgdGltZXNjYWxlKSA9PiAgdGFrZSBkdXJhdGlvbiBvZiBwZXJpb2RcbiAgICAgICAgbXZoZC5yYXRlID0gMS4wOyAvLyAxNi4xNiBudW1iZXIsICcxLjAnID0gbm9ybWFsIHBsYXliYWNrXG4gICAgICAgIG12aGQudm9sdW1lID0gMS4wOyAvLyA4LjggbnVtYmVyLCAnMS4wJyA9IGZ1bGwgdm9sdW1lXG4gICAgICAgIG12aGQucmVzZXJ2ZWQxID0gMDtcbiAgICAgICAgbXZoZC5yZXNlcnZlZDIgPSBbMHgwLCAweDBdO1xuICAgICAgICBtdmhkLm1hdHJpeCA9IFtcbiAgICAgICAgICAgIDEsIDAsIDAsIC8vIHByb3ZpZGVzIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IGZvciB0aGUgdmlkZW87XG4gICAgICAgICAgICAwLCAxLCAwLCAvLyAodSx2LHcpIGFyZSByZXN0cmljdGVkIGhlcmUgdG8gKDAsMCwxKVxuICAgICAgICAgICAgMCwgMCwgMTYzODRcbiAgICAgICAgXTtcbiAgICAgICAgbXZoZC5wcmVfZGVmaW5lZCA9IFswLCAwLCAwLCAwLCAwLCAwXTtcbiAgICAgICAgbXZoZC5uZXh0X3RyYWNrX0lEID0gdHJhY2tJZCArIDE7IC8vIGluZGljYXRlcyBhIHZhbHVlIHRvIHVzZSBmb3IgdGhlIHRyYWNrIElEIG9mIHRoZSBuZXh0IHRyYWNrIHRvIGJlIGFkZGVkIHRvIHRoaXMgcHJlc2VudGF0aW9uXG5cbiAgICAgICAgcmV0dXJuIG12aGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGtoZEJveCh0cmFrKSB7XG5cbiAgICAgICAgbGV0IHRraGQgPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCd0a2hkJywgdHJhayk7XG5cbiAgICAgICAgdGtoZC52ZXJzaW9uID0gMTsgLy8gdmVyc2lvbiA9IDEgIGluIG9yZGVyIHRvIGhhdmUgNjRiaXRzIGR1cmF0aW9uIHZhbHVlXG4gICAgICAgIHRraGQuZmxhZ3MgPSAweDEgfCAvLyBUcmFja19lbmFibGVkICgweDAwMDAwMSk6IEluZGljYXRlcyB0aGF0IHRoZSB0cmFjayBpcyBlbmFibGVkXG4gICAgICAgICAgICAweDIgfCAvLyBUcmFja19pbl9tb3ZpZSAoMHgwMDAwMDIpOiAgSW5kaWNhdGVzIHRoYXQgdGhlIHRyYWNrIGlzIHVzZWQgaW4gdGhlIHByZXNlbnRhdGlvblxuICAgICAgICAgICAgMHg0OyAvLyBUcmFja19pbl9wcmV2aWV3ICgweDAwMDAwNCk6ICBJbmRpY2F0ZXMgdGhhdCB0aGUgdHJhY2sgaXMgdXNlZCB3aGVuIHByZXZpZXdpbmcgdGhlIHByZXNlbnRhdGlvblxuXG4gICAgICAgIHRraGQuY3JlYXRpb25fdGltZSA9IDA7IC8vIHRoZSBjcmVhdGlvbiB0aW1lIG9mIHRoZSBwcmVzZW50YXRpb24gPT4gaWdub3JlIChzZXQgdG8gMClcbiAgICAgICAgdGtoZC5tb2RpZmljYXRpb25fdGltZSA9IDA7IC8vIHRoZSBtb3N0IHJlY2VudCB0aW1lIHRoZSBwcmVzZW50YXRpb24gd2FzIG1vZGlmaWVkID0+IGlnbm9yZSAoc2V0IHRvIDApXG4gICAgICAgIHRraGQudHJhY2tfSUQgPSB0cmFja0lkOyAvLyB1bmlxdWVseSBpZGVudGlmaWVzIHRoaXMgdHJhY2sgb3ZlciB0aGUgZW50aXJlIGxpZmUtdGltZSBvZiB0aGlzIHByZXNlbnRhdGlvblxuICAgICAgICB0a2hkLnJlc2VydmVkMSA9IDA7XG4gICAgICAgIHRraGQuZHVyYXRpb24gPSBNYXRoLnJvdW5kKHBlcmlvZC5kdXJhdGlvbiAqIHRpbWVzY2FsZSk7IC8vIHRoZSBkdXJhdGlvbiBvZiB0aGlzIHRyYWNrIChpbiB0aGUgdGltZXNjYWxlIGluZGljYXRlZCBpbiB0aGUgTW92aWUgSGVhZGVyIEJveCkgPT4gIHRha2UgZHVyYXRpb24gb2YgcGVyaW9kXG4gICAgICAgIHRraGQucmVzZXJ2ZWQyID0gWzB4MCwgMHgwXTtcbiAgICAgICAgdGtoZC5sYXllciA9IDA7IC8vIHNwZWNpZmllcyB0aGUgZnJvbnQtdG8tYmFjayBvcmRlcmluZyBvZiB2aWRlbyB0cmFja3M7IHRyYWNrcyB3aXRoIGxvd2VyIG51bWJlcnMgYXJlIGNsb3NlciB0byB0aGUgdmlld2VyID0+IDAgc2luY2Ugb25seSBvbmUgdmlkZW8gdHJhY2tcbiAgICAgICAgdGtoZC5hbHRlcm5hdGVfZ3JvdXAgPSAwOyAvLyBzcGVjaWZpZXMgYSBncm91cCBvciBjb2xsZWN0aW9uIG9mIHRyYWNrcyA9PiBpZ25vcmVcbiAgICAgICAgdGtoZC52b2x1bWUgPSAxLjA7IC8vICcxLjAnID0gZnVsbCB2b2x1bWVcbiAgICAgICAgdGtoZC5yZXNlcnZlZDMgPSAwO1xuICAgICAgICB0a2hkLm1hdHJpeCA9IFtcbiAgICAgICAgICAgIDEsIDAsIDAsIC8vIHByb3ZpZGVzIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IGZvciB0aGUgdmlkZW87XG4gICAgICAgICAgICAwLCAxLCAwLCAvLyAodSx2LHcpIGFyZSByZXN0cmljdGVkIGhlcmUgdG8gKDAsMCwxKVxuICAgICAgICAgICAgMCwgMCwgMTYzODRcbiAgICAgICAgXTtcbiAgICAgICAgdGtoZC53aWR0aCA9IHJlcHJlc2VudGF0aW9uLndpZHRoOyAvLyB2aXN1YWwgcHJlc2VudGF0aW9uIHdpZHRoXG4gICAgICAgIHRraGQuaGVpZ2h0ID0gcmVwcmVzZW50YXRpb24uaGVpZ2h0OyAvLyB2aXN1YWwgcHJlc2VudGF0aW9uIGhlaWdodFxuXG4gICAgICAgIHJldHVybiB0a2hkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1kaGRCb3gobWRpYSkge1xuXG4gICAgICAgIGxldCBtZGhkID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgnbWRoZCcsIG1kaWEpO1xuXG4gICAgICAgIG1kaGQudmVyc2lvbiA9IDE7IC8vIHZlcnNpb24gPSAxICBpbiBvcmRlciB0byBoYXZlIDY0Yml0cyBkdXJhdGlvbiB2YWx1ZVxuXG4gICAgICAgIG1kaGQuY3JlYXRpb25fdGltZSA9IDA7IC8vIHRoZSBjcmVhdGlvbiB0aW1lIG9mIHRoZSBwcmVzZW50YXRpb24gPT4gaWdub3JlIChzZXQgdG8gMClcbiAgICAgICAgbWRoZC5tb2RpZmljYXRpb25fdGltZSA9IDA7IC8vIHRoZSBtb3N0IHJlY2VudCB0aW1lIHRoZSBwcmVzZW50YXRpb24gd2FzIG1vZGlmaWVkID0+IGlnbm9yZSAoc2V0IHRvIDApXG4gICAgICAgIG1kaGQudGltZXNjYWxlID0gdGltZXNjYWxlOyAvLyB0aGUgdGltZS1zY2FsZSBmb3IgdGhlIGVudGlyZSBwcmVzZW50YXRpb25cbiAgICAgICAgbWRoZC5kdXJhdGlvbiA9IE1hdGgucm91bmQocGVyaW9kLmR1cmF0aW9uICogdGltZXNjYWxlKTsgLy8gdGhlIGR1cmF0aW9uIG9mIHRoaXMgbWVkaWEgKGluIHRoZSBzY2FsZSBvZiB0aGUgdGltZXNjYWxlKS4gSWYgdGhlIGR1cmF0aW9uIGNhbm5vdCBiZSBkZXRlcm1pbmVkIHRoZW4gZHVyYXRpb24gaXMgc2V0IHRvIGFsbCAxcy5cbiAgICAgICAgbWRoZC5sYW5ndWFnZSA9IGFkYXB0YXRpb25TZXQubGFuZyB8fCAndW5kJzsgLy8gZGVjbGFyZXMgdGhlIGxhbmd1YWdlIGNvZGUgZm9yIHRoaXMgbWVkaWEgKHNlZSBnZXRMYW5ndWFnZUNvZGUoKSlcbiAgICAgICAgbWRoZC5wcmVfZGVmaW5lZCA9IDA7XG5cbiAgICAgICAgcmV0dXJuIG1kaGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSGRsckJveChtZGlhKSB7XG5cbiAgICAgICAgbGV0IGhkbHIgPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCdoZGxyJywgbWRpYSk7XG5cbiAgICAgICAgaGRsci5wcmVfZGVmaW5lZCA9IDA7XG4gICAgICAgIHN3aXRjaCAoYWRhcHRhdGlvblNldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5WSURFTzpcbiAgICAgICAgICAgICAgICBoZGxyLmhhbmRsZXJfdHlwZSA9ICd2aWRlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkFVRElPOlxuICAgICAgICAgICAgICAgIGhkbHIuaGFuZGxlcl90eXBlID0gJ3NvdW4nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBoZGxyLmhhbmRsZXJfdHlwZSA9ICdtZXRhJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoZGxyLm5hbWUgPSByZXByZXNlbnRhdGlvbi5pZDtcbiAgICAgICAgaGRsci5yZXNlcnZlZCA9IFswLCAwLCAwXTtcblxuICAgICAgICByZXR1cm4gaGRscjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVWbWhkQm94KG1pbmYpIHtcblxuICAgICAgICBsZXQgdm1oZCA9IElTT0JveGVyLmNyZWF0ZUZ1bGxCb3goJ3ZtaGQnLCBtaW5mKTtcblxuICAgICAgICB2bWhkLmZsYWdzID0gMTtcblxuICAgICAgICB2bWhkLmdyYXBoaWNzbW9kZSA9IDA7IC8vIHNwZWNpZmllcyBhIGNvbXBvc2l0aW9uIG1vZGUgZm9yIHRoaXMgdmlkZW8gdHJhY2ssIGZyb20gdGhlIGZvbGxvd2luZyBlbnVtZXJhdGVkIHNldCwgd2hpY2ggbWF5IGJlIGV4dGVuZGVkIGJ5IGRlcml2ZWQgc3BlY2lmaWNhdGlvbnM6IGNvcHkgPSAwIGNvcHkgb3ZlciB0aGUgZXhpc3RpbmcgaW1hZ2VcbiAgICAgICAgdm1oZC5vcGNvbG9yID0gWzAsIDAsIDBdOyAvLyBpcyBhIHNldCBvZiAzIGNvbG91ciB2YWx1ZXMgKHJlZCwgZ3JlZW4sIGJsdWUpIGF2YWlsYWJsZSBmb3IgdXNlIGJ5IGdyYXBoaWNzIG1vZGVzXG5cbiAgICAgICAgcmV0dXJuIHZtaGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU21oZEJveChtaW5mKSB7XG5cbiAgICAgICAgbGV0IHNtaGQgPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCdzbWhkJywgbWluZik7XG5cbiAgICAgICAgc21oZC5mbGFncyA9IDE7XG5cbiAgICAgICAgc21oZC5iYWxhbmNlID0gMDsgLy8gaXMgYSBmaXhlZC1wb2ludCA4LjggbnVtYmVyIHRoYXQgcGxhY2VzIG1vbm8gYXVkaW8gdHJhY2tzIGluIGEgc3RlcmVvIHNwYWNlOyAwIGlzIGNlbnRyZSAodGhlIG5vcm1hbCB2YWx1ZSk7IGZ1bGwgbGVmdCBpcyAtMS4wIGFuZCBmdWxsIHJpZ2h0IGlzIDEuMC5cbiAgICAgICAgc21oZC5yZXNlcnZlZCA9IDA7XG5cbiAgICAgICAgcmV0dXJuIHNtaGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRHJlZkJveChkaW5mKSB7XG5cbiAgICAgICAgbGV0IGRyZWYgPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCdkcmVmJywgZGluZik7XG5cbiAgICAgICAgZHJlZi5lbnRyeV9jb3VudCA9IDE7XG4gICAgICAgIGRyZWYuZW50cmllcyA9IFtdO1xuXG4gICAgICAgIGxldCB1cmwgPSBJU09Cb3hlci5jcmVhdGVGdWxsQm94KCd1cmwgJywgZHJlZiwgZmFsc2UpO1xuICAgICAgICB1cmwubG9jYXRpb24gPSAnJztcbiAgICAgICAgdXJsLmZsYWdzID0gMTtcblxuICAgICAgICBkcmVmLmVudHJpZXMucHVzaCh1cmwpO1xuXG4gICAgICAgIHJldHVybiBkcmVmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN0c2RCb3goc3RibCkge1xuXG4gICAgICAgIGxldCBzdHNkID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgnc3RzZCcsIHN0YmwpO1xuXG4gICAgICAgIHN0c2QuZW50cmllcyA9IFtdO1xuICAgICAgICBzd2l0Y2ggKGFkYXB0YXRpb25TZXQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuVklERU86XG4gICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5BVURJTzpcbiAgICAgICAgICAgICAgICBzdHNkLmVudHJpZXMucHVzaChjcmVhdGVTYW1wbGVFbnRyeShzdHNkKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RzZC5lbnRyeV9jb3VudCA9IHN0c2QuZW50cmllcy5sZW5ndGg7IC8vIGlzIGFuIGludGVnZXIgdGhhdCBjb3VudHMgdGhlIGFjdHVhbCBlbnRyaWVzXG4gICAgICAgIHJldHVybiBzdHNkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNhbXBsZUVudHJ5KHN0c2QpIHtcbiAgICAgICAgbGV0IGNvZGVjID0gcmVwcmVzZW50YXRpb24uY29kZWNzLnN1YnN0cmluZygwLCByZXByZXNlbnRhdGlvbi5jb2RlY3MuaW5kZXhPZignLicpKTtcblxuICAgICAgICBzd2l0Y2ggKGNvZGVjKSB7XG4gICAgICAgICAgICBjYXNlICdhdmMxJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlQVZDVmlzdWFsU2FtcGxlRW50cnkoc3RzZCwgY29kZWMpO1xuICAgICAgICAgICAgY2FzZSAnbXA0YSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZU1QNEF1ZGlvU2FtcGxlRW50cnkoc3RzZCwgY29kZWMpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IE1zc0Vycm9ycy5NU1NfVU5TVVBQT1JURURfQ09ERUNfQ09ERSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogTXNzRXJyb3JzLk1TU19VTlNVUFBPUlRFRF9DT0RFQ19NRVNTQUdFLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlYzogY29kZWNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBVkNWaXN1YWxTYW1wbGVFbnRyeShzdHNkLCBjb2RlYykge1xuICAgICAgICBsZXQgYXZjMTtcblxuICAgICAgICBpZiAoY29udGVudFByb3RlY3Rpb24pIHtcbiAgICAgICAgICAgIGF2YzEgPSBJU09Cb3hlci5jcmVhdGVCb3goJ2VuY3YnLCBzdHNkLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdmMxID0gSVNPQm94ZXIuY3JlYXRlQm94KCdhdmMxJywgc3RzZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2FtcGxlRW50cnkgZmllbGRzXG4gICAgICAgIGF2YzEucmVzZXJ2ZWQxID0gWzB4MCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDBdO1xuICAgICAgICBhdmMxLmRhdGFfcmVmZXJlbmNlX2luZGV4ID0gMTtcblxuICAgICAgICAvLyBWaXN1YWxTYW1wbGVFbnRyeSBmaWVsZHNcbiAgICAgICAgYXZjMS5wcmVfZGVmaW5lZDEgPSAwO1xuICAgICAgICBhdmMxLnJlc2VydmVkMiA9IDA7XG4gICAgICAgIGF2YzEucHJlX2RlZmluZWQyID0gWzAsIDAsIDBdO1xuICAgICAgICBhdmMxLmhlaWdodCA9IHJlcHJlc2VudGF0aW9uLmhlaWdodDtcbiAgICAgICAgYXZjMS53aWR0aCA9IHJlcHJlc2VudGF0aW9uLndpZHRoO1xuICAgICAgICBhdmMxLmhvcml6cmVzb2x1dGlvbiA9IDcyOyAvLyA3MiBkcGlcbiAgICAgICAgYXZjMS52ZXJ0cmVzb2x1dGlvbiA9IDcyOyAvLyA3MiBkcGlcbiAgICAgICAgYXZjMS5yZXNlcnZlZDMgPSAwO1xuICAgICAgICBhdmMxLmZyYW1lX2NvdW50ID0gMTsgLy8gMSBjb21wcmVzc2VkIHZpZGVvIGZyYW1lIHBlciBzYW1wbGVcbiAgICAgICAgYXZjMS5jb21wcmVzc29ybmFtZSA9IFtcbiAgICAgICAgICAgIDB4MEEsIDB4NDEsIDB4NTYsIDB4NDMsIDB4MjAsIDB4NDMsIDB4NkYsIDB4NjQsIC8vID0gJ0FWQyBDb2RpbmcnO1xuICAgICAgICAgICAgMHg2OSwgMHg2RSwgMHg2NywgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIF07XG4gICAgICAgIGF2YzEuZGVwdGggPSAweDAwMTg7IC8vIDB4MDAxOCDigJMgaW1hZ2VzIGFyZSBpbiBjb2xvdXIgd2l0aCBubyBhbHBoYS5cbiAgICAgICAgYXZjMS5wcmVfZGVmaW5lZDMgPSA2NTUzNTtcbiAgICAgICAgYXZjMS5jb25maWcgPSBjcmVhdGVBVkMxQ29uZmlndXJhdGlvblJlY29yZCgpO1xuICAgICAgICBpZiAoY29udGVudFByb3RlY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIFByb3RlY3Rpb24gU2NoZW1lIEluZm8gQm94XG4gICAgICAgICAgICBsZXQgc2luZiA9IElTT0JveGVyLmNyZWF0ZUJveCgnc2luZicsIGF2YzEpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCBPcmlnaW5hbCBGb3JtYXQgQm94ID0+IGluZGljYXRlIGNvZGVjIHR5cGUgb2YgdGhlIGVuY3J5cHRlZCBjb250ZW50XG4gICAgICAgICAgICBjcmVhdGVPcmlnaW5hbEZvcm1hdEJveChzaW5mLCBjb2RlYyk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIFNjaGVtZSBUeXBlIGJveFxuICAgICAgICAgICAgY3JlYXRlU2NoZW1lVHlwZUJveChzaW5mKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgU2NoZW1lIEluZm9ybWF0aW9uIEJveFxuICAgICAgICAgICAgY3JlYXRlU2NoZW1lSW5mb3JtYXRpb25Cb3goc2luZik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXZjMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVBVkMxQ29uZmlndXJhdGlvblJlY29yZCgpIHtcblxuICAgICAgICBsZXQgYXZjQyA9IG51bGw7XG4gICAgICAgIGxldCBhdmNDTGVuZ3RoID0gMTU7IC8vIGxlbmd0aCA9IDE1IGJ5IGRlZmF1bHQgKDAgU1BTIGFuZCAwIFBQUylcblxuICAgICAgICAvLyBGaXJzdCBnZXQgYWxsIFNQUyBhbmQgUFBTIGZyb20gY29kZWNQcml2YXRlRGF0YVxuICAgICAgICBsZXQgc3BzID0gW107XG4gICAgICAgIGxldCBwcHMgPSBbXTtcbiAgICAgICAgbGV0IEFWQ1Byb2ZpbGVJbmRpY2F0aW9uID0gMDtcbiAgICAgICAgbGV0IEFWQ0xldmVsSW5kaWNhdGlvbiA9IDA7XG4gICAgICAgIGxldCBwcm9maWxlX2NvbXBhdGliaWxpdHkgPSAwO1xuXG4gICAgICAgIGxldCBuYWx1cyA9IHJlcHJlc2VudGF0aW9uLmNvZGVjUHJpdmF0ZURhdGEuc3BsaXQoJzAwMDAwMDAxJykuc2xpY2UoMSk7XG4gICAgICAgIGxldCBuYWx1Qnl0ZXMsIG5hbHVUeXBlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFsdXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5hbHVCeXRlcyA9IGhleFN0cmluZ3RvQnVmZmVyKG5hbHVzW2ldKTtcblxuICAgICAgICAgICAgbmFsdVR5cGUgPSBuYWx1Qnl0ZXNbMF0gJiAweDFGO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG5hbHVUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBOQUxVVFlQRV9TUFM6XG4gICAgICAgICAgICAgICAgICAgIHNwcy5wdXNoKG5hbHVCeXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIGF2Y0NMZW5ndGggKz0gbmFsdUJ5dGVzLmxlbmd0aCArIDI7IC8vIDIgPSBzZXF1ZW5jZVBhcmFtZXRlclNldExlbmd0aCBmaWVsZCBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBOQUxVVFlQRV9QUFM6XG4gICAgICAgICAgICAgICAgICAgIHBwcy5wdXNoKG5hbHVCeXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIGF2Y0NMZW5ndGggKz0gbmFsdUJ5dGVzLmxlbmd0aCArIDI7IC8vIDIgPSBwaWN0dXJlUGFyYW1ldGVyU2V0TGVuZ3RoIGZpZWxkIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBwcm9maWxlIGFuZCBsZXZlbCBmcm9tIFNQU1xuICAgICAgICBpZiAoc3BzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIEFWQ1Byb2ZpbGVJbmRpY2F0aW9uID0gc3BzWzBdWzFdO1xuICAgICAgICAgICAgcHJvZmlsZV9jb21wYXRpYmlsaXR5ID0gc3BzWzBdWzJdO1xuICAgICAgICAgICAgQVZDTGV2ZWxJbmRpY2F0aW9uID0gc3BzWzBdWzNdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgYXZjQyBidWZmZXJcbiAgICAgICAgYXZjQyA9IG5ldyBVaW50OEFycmF5KGF2Y0NMZW5ndGgpO1xuXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgLy8gbGVuZ3RoXG4gICAgICAgIGF2Y0NbaSsrXSA9IChhdmNDTGVuZ3RoICYgMHhGRjAwMDAwMCkgPj4gMjQ7XG4gICAgICAgIGF2Y0NbaSsrXSA9IChhdmNDTGVuZ3RoICYgMHgwMEZGMDAwMCkgPj4gMTY7XG4gICAgICAgIGF2Y0NbaSsrXSA9IChhdmNDTGVuZ3RoICYgMHgwMDAwRkYwMCkgPj4gODtcbiAgICAgICAgYXZjQ1tpKytdID0gKGF2Y0NMZW5ndGggJiAweDAwMDAwMEZGKTtcbiAgICAgICAgYXZjQy5zZXQoWzB4NjEsIDB4NzYsIDB4NjMsIDB4NDNdLCBpKTsgLy8gdHlwZSA9ICdhdmNDJ1xuICAgICAgICBpICs9IDQ7XG4gICAgICAgIGF2Y0NbaSsrXSA9IDE7IC8vIGNvbmZpZ3VyYXRpb25WZXJzaW9uID0gMVxuICAgICAgICBhdmNDW2krK10gPSBBVkNQcm9maWxlSW5kaWNhdGlvbjtcbiAgICAgICAgYXZjQ1tpKytdID0gcHJvZmlsZV9jb21wYXRpYmlsaXR5O1xuICAgICAgICBhdmNDW2krK10gPSBBVkNMZXZlbEluZGljYXRpb247XG4gICAgICAgIGF2Y0NbaSsrXSA9IDB4RkY7IC8vICcxMTExMScgKyBsZW5ndGhTaXplTWludXNPbmUgPSAzXG4gICAgICAgIGF2Y0NbaSsrXSA9IDB4RTAgfCBzcHMubGVuZ3RoOyAvLyAnMTExJyArIG51bU9mU2VxdWVuY2VQYXJhbWV0ZXJTZXRzXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgc3BzLmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgICBhdmNDW2krK10gPSAoc3BzW25dLmxlbmd0aCAmIDB4RkYwMCkgPj4gODtcbiAgICAgICAgICAgIGF2Y0NbaSsrXSA9IChzcHNbbl0ubGVuZ3RoICYgMHgwMEZGKTtcbiAgICAgICAgICAgIGF2Y0Muc2V0KHNwc1tuXSwgaSk7XG4gICAgICAgICAgICBpICs9IHNwc1tuXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgYXZjQ1tpKytdID0gcHBzLmxlbmd0aDsgLy8gbnVtT2ZQaWN0dXJlUGFyYW1ldGVyU2V0c1xuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHBwcy5sZW5ndGg7IG4rKykge1xuICAgICAgICAgICAgYXZjQ1tpKytdID0gKHBwc1tuXS5sZW5ndGggJiAweEZGMDApID4+IDg7XG4gICAgICAgICAgICBhdmNDW2krK10gPSAocHBzW25dLmxlbmd0aCAmIDB4MDBGRik7XG4gICAgICAgICAgICBhdmNDLnNldChwcHNbbl0sIGkpO1xuICAgICAgICAgICAgaSArPSBwcHNbbl0ubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF2Y0M7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTVA0QXVkaW9TYW1wbGVFbnRyeShzdHNkLCBjb2RlYykge1xuICAgICAgICBsZXQgbXA0YTtcblxuICAgICAgICBpZiAoY29udGVudFByb3RlY3Rpb24pIHtcbiAgICAgICAgICAgIG1wNGEgPSBJU09Cb3hlci5jcmVhdGVCb3goJ2VuY2EnLCBzdHNkLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtcDRhID0gSVNPQm94ZXIuY3JlYXRlQm94KCdtcDRhJywgc3RzZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2FtcGxlRW50cnkgZmllbGRzXG4gICAgICAgIG1wNGEucmVzZXJ2ZWQxID0gWzB4MCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDBdO1xuICAgICAgICBtcDRhLmRhdGFfcmVmZXJlbmNlX2luZGV4ID0gMTtcblxuICAgICAgICAvLyBBdWRpb1NhbXBsZUVudHJ5IGZpZWxkc1xuICAgICAgICBtcDRhLnJlc2VydmVkMiA9IFsweDAsIDB4MF07XG4gICAgICAgIG1wNGEuY2hhbm5lbGNvdW50ID0gcmVwcmVzZW50YXRpb24uYXVkaW9DaGFubmVscztcbiAgICAgICAgbXA0YS5zYW1wbGVzaXplID0gMTY7XG4gICAgICAgIG1wNGEucHJlX2RlZmluZWQgPSAwO1xuICAgICAgICBtcDRhLnJlc2VydmVkXzMgPSAwO1xuICAgICAgICBtcDRhLnNhbXBsZXJhdGUgPSByZXByZXNlbnRhdGlvbi5hdWRpb1NhbXBsaW5nUmF0ZSA8PCAxNjtcblxuICAgICAgICBtcDRhLmVzZHMgPSBjcmVhdGVNUEVHNEFBQ0VTRGVzY3JpcHRvcigpO1xuXG4gICAgICAgIGlmIChjb250ZW50UHJvdGVjdGlvbikge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgUHJvdGVjdGlvbiBTY2hlbWUgSW5mbyBCb3hcbiAgICAgICAgICAgIGxldCBzaW5mID0gSVNPQm94ZXIuY3JlYXRlQm94KCdzaW5mJywgbXA0YSk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIE9yaWdpbmFsIEZvcm1hdCBCb3ggPT4gaW5kaWNhdGUgY29kZWMgdHlwZSBvZiB0aGUgZW5jcnlwdGVkIGNvbnRlbnRcbiAgICAgICAgICAgIGNyZWF0ZU9yaWdpbmFsRm9ybWF0Qm94KHNpbmYsIGNvZGVjKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgU2NoZW1lIFR5cGUgYm94XG4gICAgICAgICAgICBjcmVhdGVTY2hlbWVUeXBlQm94KHNpbmYpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCBTY2hlbWUgSW5mb3JtYXRpb24gQm94XG4gICAgICAgICAgICBjcmVhdGVTY2hlbWVJbmZvcm1hdGlvbkJveChzaW5mKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtcDRhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1QRUc0QUFDRVNEZXNjcmlwdG9yKCkge1xuXG4gICAgICAgIC8vIEF1ZGlvU3BlY2lmaWNDb25maWcgKHNlZSBJU08vSUVDIDE0NDk2LTMsIHN1YnBhcnQgMSkgPT4gY29ycmVzcG9uZHMgdG8gaGV4IGJ5dGVzIGNvbnRhaW5lZCBpbiAnY29kZWNQcml2YXRlRGF0YScgZmllbGRcbiAgICAgICAgbGV0IGF1ZGlvU3BlY2lmaWNDb25maWcgPSBoZXhTdHJpbmd0b0J1ZmZlcihyZXByZXNlbnRhdGlvbi5jb2RlY1ByaXZhdGVEYXRhKTtcblxuICAgICAgICAvLyBFU0RTIGxlbmd0aCA9IGVzZHMgYm94IGhlYWRlciBsZW5ndGggKD0gMTIpICtcbiAgICAgICAgLy8gICAgICAgICAgICAgICBFU19EZXNjcmlwdG9yIGhlYWRlciBsZW5ndGggKD0gNSkgK1xuICAgICAgICAvLyAgICAgICAgICAgICAgIERlY29kZXJDb25maWdEZXNjcmlwdG9yIGhlYWRlciBsZW5ndGggKD0gMTUpICtcbiAgICAgICAgLy8gICAgICAgICAgICAgICBkZWNvZGVyU3BlY2lmaWNJbmZvIGhlYWRlciBsZW5ndGggKD0gMikgK1xuICAgICAgICAvLyAgICAgICAgICAgICAgIEF1ZGlvU3BlY2lmaWNDb25maWcgbGVuZ3RoICg9IGNvZGVjUHJpdmF0ZURhdGEgbGVuZ3RoKVxuICAgICAgICBsZXQgZXNkc0xlbmd0aCA9IDM0ICsgYXVkaW9TcGVjaWZpY0NvbmZpZy5sZW5ndGg7XG4gICAgICAgIGxldCBlc2RzID0gbmV3IFVpbnQ4QXJyYXkoZXNkc0xlbmd0aCk7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAvLyBlc2RzIGJveFxuICAgICAgICBlc2RzW2krK10gPSAoZXNkc0xlbmd0aCAmIDB4RkYwMDAwMDApID4+IDI0OyAvLyBlc2RzIGJveCBsZW5ndGhcbiAgICAgICAgZXNkc1tpKytdID0gKGVzZHNMZW5ndGggJiAweDAwRkYwMDAwKSA+PiAxNjsgLy8gJydcbiAgICAgICAgZXNkc1tpKytdID0gKGVzZHNMZW5ndGggJiAweDAwMDBGRjAwKSA+PiA4OyAvLyAnJ1xuICAgICAgICBlc2RzW2krK10gPSAoZXNkc0xlbmd0aCAmIDB4MDAwMDAwRkYpOyAvLyAnJ1xuICAgICAgICBlc2RzLnNldChbMHg2NSwgMHg3MywgMHg2NCwgMHg3M10sIGkpOyAvLyB0eXBlID0gJ2VzZHMnXG4gICAgICAgIGkgKz0gNDtcbiAgICAgICAgZXNkcy5zZXQoWzAsIDAsIDAsIDBdLCBpKTsgLy8gdmVyc2lvbiA9IDAsIGZsYWdzID0gMFxuICAgICAgICBpICs9IDQ7XG4gICAgICAgIC8vIEVTX0Rlc2NyaXB0b3IgKHNlZSBJU08vSUVDIDE0NDk2LTEgKFN5c3RlbXMpKVxuICAgICAgICBlc2RzW2krK10gPSAweDAzOyAvLyB0YWcgPSAweDAzIChFU19EZXNjclRhZylcbiAgICAgICAgZXNkc1tpKytdID0gMjAgKyBhdWRpb1NwZWNpZmljQ29uZmlnLmxlbmd0aDsgLy8gc2l6ZVxuICAgICAgICBlc2RzW2krK10gPSAodHJhY2tJZCAmIDB4RkYwMCkgPj4gODsgLy8gRVNfSUQgPSB0cmFja19pZFxuICAgICAgICBlc2RzW2krK10gPSAodHJhY2tJZCAmIDB4MDBGRik7IC8vICcnXG4gICAgICAgIGVzZHNbaSsrXSA9IDA7IC8vIGZsYWdzIGFuZCBzdHJlYW1Qcmlvcml0eVxuXG4gICAgICAgIC8vIERlY29kZXJDb25maWdEZXNjcmlwdG9yIChzZWUgSVNPL0lFQyAxNDQ5Ni0xIChTeXN0ZW1zKSlcbiAgICAgICAgZXNkc1tpKytdID0gMHgwNDsgLy8gdGFnID0gMHgwNCAoRGVjb2RlckNvbmZpZ0Rlc2NyVGFnKVxuICAgICAgICBlc2RzW2krK10gPSAxNSArIGF1ZGlvU3BlY2lmaWNDb25maWcubGVuZ3RoOyAvLyBzaXplXG4gICAgICAgIGVzZHNbaSsrXSA9IDB4NDA7IC8vIG9iamVjdFR5cGVJbmRpY2F0aW9uID0gMHg0MCAoTVBFRy00IEFBQylcbiAgICAgICAgZXNkc1tpXSA9IDB4MDUgPDwgMjsgLy8gc3RyZWFtVHlwZSA9IDB4MDUgKEF1ZGlvc3RyZWFtKVxuICAgICAgICBlc2RzW2ldIHw9IDAgPDwgMTsgLy8gdXBTdHJlYW0gPSAwXG4gICAgICAgIGVzZHNbaSsrXSB8PSAxOyAvLyByZXNlcnZlZCA9IDFcbiAgICAgICAgZXNkc1tpKytdID0gMHhGRjsgLy8gYnVmZmVyc2l6ZURCID0gdW5kZWZpbmVkXG4gICAgICAgIGVzZHNbaSsrXSA9IDB4RkY7IC8vICcnXG4gICAgICAgIGVzZHNbaSsrXSA9IDB4RkY7IC8vICcnXG4gICAgICAgIGVzZHNbaSsrXSA9IChyZXByZXNlbnRhdGlvbi5iYW5kd2lkdGggJiAweEZGMDAwMDAwKSA+PiAyNDsgLy8gbWF4Qml0cmF0ZVxuICAgICAgICBlc2RzW2krK10gPSAocmVwcmVzZW50YXRpb24uYmFuZHdpZHRoICYgMHgwMEZGMDAwMCkgPj4gMTY7IC8vICcnXG4gICAgICAgIGVzZHNbaSsrXSA9IChyZXByZXNlbnRhdGlvbi5iYW5kd2lkdGggJiAweDAwMDBGRjAwKSA+PiA4OyAvLyAnJ1xuICAgICAgICBlc2RzW2krK10gPSAocmVwcmVzZW50YXRpb24uYmFuZHdpZHRoICYgMHgwMDAwMDBGRik7IC8vICcnXG4gICAgICAgIGVzZHNbaSsrXSA9IChyZXByZXNlbnRhdGlvbi5iYW5kd2lkdGggJiAweEZGMDAwMDAwKSA+PiAyNDsgLy8gYXZnYml0cmF0ZVxuICAgICAgICBlc2RzW2krK10gPSAocmVwcmVzZW50YXRpb24uYmFuZHdpZHRoICYgMHgwMEZGMDAwMCkgPj4gMTY7IC8vICcnXG4gICAgICAgIGVzZHNbaSsrXSA9IChyZXByZXNlbnRhdGlvbi5iYW5kd2lkdGggJiAweDAwMDBGRjAwKSA+PiA4OyAvLyAnJ1xuICAgICAgICBlc2RzW2krK10gPSAocmVwcmVzZW50YXRpb24uYmFuZHdpZHRoICYgMHgwMDAwMDBGRik7IC8vICcnXG5cbiAgICAgICAgLy8gRGVjb2RlclNwZWNpZmljSW5mbyAoc2VlIElTTy9JRUMgMTQ0OTYtMSAoU3lzdGVtcykpXG4gICAgICAgIGVzZHNbaSsrXSA9IDB4MDU7IC8vIHRhZyA9IDB4MDUgKERlY1NwZWNpZmljSW5mb1RhZylcbiAgICAgICAgZXNkc1tpKytdID0gYXVkaW9TcGVjaWZpY0NvbmZpZy5sZW5ndGg7IC8vIHNpemVcbiAgICAgICAgZXNkcy5zZXQoYXVkaW9TcGVjaWZpY0NvbmZpZywgaSk7IC8vIEF1ZGlvU3BlY2lmaWNDb25maWcgYnl0ZXNcblxuICAgICAgICByZXR1cm4gZXNkcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVPcmlnaW5hbEZvcm1hdEJveChzaW5mLCBjb2RlYykge1xuICAgICAgICBsZXQgZnJtYSA9IElTT0JveGVyLmNyZWF0ZUJveCgnZnJtYScsIHNpbmYpO1xuICAgICAgICBmcm1hLmRhdGFfZm9ybWF0ID0gc3RyaW5nVG9DaGFyQ29kZShjb2RlYyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2NoZW1lVHlwZUJveChzaW5mKSB7XG4gICAgICAgIGxldCBzY2htID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgnc2NobScsIHNpbmYpO1xuXG4gICAgICAgIHNjaG0uZmxhZ3MgPSAwO1xuICAgICAgICBzY2htLnZlcnNpb24gPSAwO1xuICAgICAgICBzY2htLnNjaGVtZV90eXBlID0gMHg2MzY1NkU2MzsgLy8gJ2NlbmMnID0+IGNvbW1vbiBlbmNyeXB0aW9uXG4gICAgICAgIHNjaG0uc2NoZW1lX3ZlcnNpb24gPSAweDAwMDEwMDAwOyAvLyB2ZXJzaW9uIHNldCB0byAweDAwMDEwMDAwIChNYWpvciB2ZXJzaW9uIDEsIE1pbm9yIHZlcnNpb24gMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTY2hlbWVJbmZvcm1hdGlvbkJveChzaW5mKSB7XG4gICAgICAgIGxldCBzY2hpID0gSVNPQm94ZXIuY3JlYXRlQm94KCdzY2hpJywgc2luZik7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgVHJhY2sgRW5jcnlwdGlvbiBCb3hcbiAgICAgICAgY3JlYXRlVHJhY2tFbmNyeXB0aW9uQm94KHNjaGkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3RlY3Rpb25TeXN0ZW1TcGVjaWZpY0hlYWRlckJveChtb292LCBrZXlTeXN0ZW1zKSB7XG4gICAgICAgIGxldCBwc3NoX2J5dGVzLFxuICAgICAgICAgICAgcHNzaCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBwYXJzZWRCdWZmZXI7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleVN5c3RlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHBzc2hfYnl0ZXMgPSBrZXlTeXN0ZW1zW2ldLmluaXREYXRhO1xuICAgICAgICAgICAgaWYgKHBzc2hfYnl0ZXMpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWRCdWZmZXIgPSBJU09Cb3hlci5wYXJzZUJ1ZmZlcihwc3NoX2J5dGVzKTtcbiAgICAgICAgICAgICAgICBwc3NoID0gcGFyc2VkQnVmZmVyLmZldGNoKCdwc3NoJyk7XG4gICAgICAgICAgICAgICAgaWYgKHBzc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgSVNPQm94ZXIuVXRpbHMuYXBwZW5kQm94KG1vb3YsIHBzc2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRyYWNrRW5jcnlwdGlvbkJveChzY2hpKSB7XG4gICAgICAgIGxldCB0ZW5jID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgndGVuYycsIHNjaGkpO1xuXG4gICAgICAgIHRlbmMuZmxhZ3MgPSAwO1xuICAgICAgICB0ZW5jLnZlcnNpb24gPSAwO1xuXG4gICAgICAgIHRlbmMuZGVmYXVsdF9Jc0VuY3J5cHRlZCA9IDB4MTtcbiAgICAgICAgdGVuYy5kZWZhdWx0X0lWX3NpemUgPSA4O1xuICAgICAgICB0ZW5jLmRlZmF1bHRfS0lEID0gKGNvbnRlbnRQcm90ZWN0aW9uICYmIChjb250ZW50UHJvdGVjdGlvbi5sZW5ndGgpID4gMCAmJiBjb250ZW50UHJvdGVjdGlvblswXVsnY2VuYzpkZWZhdWx0X0tJRCddKSA/XG4gICAgICAgICAgICBjb250ZW50UHJvdGVjdGlvblswXVsnY2VuYzpkZWZhdWx0X0tJRCddIDogWzB4MCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDAsIDB4MF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVHJleEJveChtb292KSB7XG4gICAgICAgIGxldCB0cmV4ID0gSVNPQm94ZXIuY3JlYXRlRnVsbEJveCgndHJleCcsIG1vb3YpO1xuXG4gICAgICAgIHRyZXgudHJhY2tfSUQgPSB0cmFja0lkO1xuICAgICAgICB0cmV4LmRlZmF1bHRfc2FtcGxlX2Rlc2NyaXB0aW9uX2luZGV4ID0gMTtcbiAgICAgICAgdHJleC5kZWZhdWx0X3NhbXBsZV9kdXJhdGlvbiA9IDA7XG4gICAgICAgIHRyZXguZGVmYXVsdF9zYW1wbGVfc2l6ZSA9IDA7XG4gICAgICAgIHRyZXguZGVmYXVsdF9zYW1wbGVfZmxhZ3MgPSAwO1xuXG4gICAgICAgIHJldHVybiB0cmV4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhleFN0cmluZ3RvQnVmZmVyKHN0cikge1xuICAgICAgICBsZXQgYnVmID0gbmV3IFVpbnQ4QXJyYXkoc3RyLmxlbmd0aCAvIDIpO1xuICAgICAgICBsZXQgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aCAvIDI7IGkgKz0gMSkge1xuICAgICAgICAgICAgYnVmW2ldID0gcGFyc2VJbnQoJycgKyBzdHJbaSAqIDJdICsgc3RyW2kgKiAyICsgMV0sIDE2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cmluZ1RvQ2hhckNvZGUoc3RyKSB7XG4gICAgICAgIGxldCBjb2RlID0gMDtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29kZSB8PSBzdHIuY2hhckNvZGVBdChpKSA8PCAoKHN0ci5sZW5ndGggLSBpIC0gMSkgKiA4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1vb3YocmVwKSB7XG4gICAgICAgIGlmICghcmVwIHx8ICFyZXAuYWRhcHRhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlzb0ZpbGUsXG4gICAgICAgICAgICBhcnJheUJ1ZmZlcjtcblxuICAgICAgICByZXByZXNlbnRhdGlvbiA9IHJlcDtcbiAgICAgICAgYWRhcHRhdGlvblNldCA9IHJlcHJlc2VudGF0aW9uLmFkYXB0YXRpb247XG5cbiAgICAgICAgcGVyaW9kID0gYWRhcHRhdGlvblNldC5wZXJpb2Q7XG4gICAgICAgIHRyYWNrSWQgPSBhZGFwdGF0aW9uU2V0LmluZGV4ICsgMTtcbiAgICAgICAgY29udGVudFByb3RlY3Rpb24gPSBwZXJpb2QubXBkLm1hbmlmZXN0LlBlcmlvZF9hc0FycmF5W3BlcmlvZC5pbmRleF0uQWRhcHRhdGlvblNldF9hc0FycmF5W2FkYXB0YXRpb25TZXQuaW5kZXhdLkNvbnRlbnRQcm90ZWN0aW9uO1xuXG4gICAgICAgIHRpbWVzY2FsZSA9IHBlcmlvZC5tcGQubWFuaWZlc3QuUGVyaW9kX2FzQXJyYXlbcGVyaW9kLmluZGV4XS5BZGFwdGF0aW9uU2V0X2FzQXJyYXlbYWRhcHRhdGlvblNldC5pbmRleF0uU2VnbWVudFRlbXBsYXRlLnRpbWVzY2FsZTtcblxuICAgICAgICBpc29GaWxlID0gSVNPQm94ZXIuY3JlYXRlRmlsZSgpO1xuICAgICAgICBjcmVhdGVGdHlwQm94KGlzb0ZpbGUpO1xuICAgICAgICBjcmVhdGVNb292Qm94KGlzb0ZpbGUpO1xuXG4gICAgICAgIGFycmF5QnVmZmVyID0gaXNvRmlsZS53cml0ZSgpO1xuXG4gICAgICAgIHJldHVybiBhcnJheUJ1ZmZlcjtcbiAgICB9XG5cbiAgICBpbnN0YW5jZSA9IHtcbiAgICAgICAgZ2VuZXJhdGVNb292OiBnZW5lcmF0ZU1vb3ZcbiAgICB9O1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5Nc3NGcmFnbWVudE1vb3ZQcm9jZXNzb3IuX19kYXNoanNfZmFjdG9yeV9uYW1lID0gJ01zc0ZyYWdtZW50TW9vdlByb2Nlc3Nvcic7XG5leHBvcnQgZGVmYXVsdCBkYXNoanMuRmFjdG9yeU1ha2VyLmdldENsYXNzRmFjdG9yeShNc3NGcmFnbWVudE1vb3ZQcm9jZXNzb3IpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cbmltcG9ydCBNU1NGcmFnbWVudE1vb2ZQcm9jZXNzb3IgZnJvbSAnLi9Nc3NGcmFnbWVudE1vb2ZQcm9jZXNzb3InO1xuaW1wb3J0IE1TU0ZyYWdtZW50TW9vdlByb2Nlc3NvciBmcm9tICcuL01zc0ZyYWdtZW50TW9vdlByb2Nlc3Nvcic7XG5pbXBvcnQgTXNzRXZlbnRzIGZyb20gJy4vTXNzRXZlbnRzJztcblxuXG4vLyBBZGQgc3BlY2lmaWMgYm94IHByb2Nlc3NvcnMgbm90IHByb3ZpZGVkIGJ5IGNvZGVtLWlzb2JveGVyIGxpYnJhcnlcblxuZnVuY3Rpb24gYXJyYXlFcXVhbChhcnIxLCBhcnIyKSB7XG4gICAgcmV0dXJuIChhcnIxLmxlbmd0aCA9PT0gYXJyMi5sZW5ndGgpICYmIGFycjEuZXZlcnkoZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50ID09PSBhcnIyW2luZGV4XTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2Fpb1Byb2Nlc3NvcigpIHtcbiAgICB0aGlzLl9wcm9jRnVsbEJveCgpO1xuICAgIGlmICh0aGlzLmZsYWdzICYgMSkge1xuICAgICAgICB0aGlzLl9wcm9jRmllbGQoJ2F1eF9pbmZvX3R5cGUnLCAndWludCcsIDMyKTtcbiAgICAgICAgdGhpcy5fcHJvY0ZpZWxkKCdhdXhfaW5mb190eXBlX3BhcmFtZXRlcicsICd1aW50JywgMzIpO1xuICAgIH1cbiAgICB0aGlzLl9wcm9jRmllbGQoJ2VudHJ5X2NvdW50JywgJ3VpbnQnLCAzMik7XG4gICAgdGhpcy5fcHJvY0ZpZWxkQXJyYXkoJ29mZnNldCcsIHRoaXMuZW50cnlfY291bnQsICd1aW50JywgKHRoaXMudmVyc2lvbiA9PT0gMSkgPyA2NCA6IDMyKTtcbn1cblxuZnVuY3Rpb24gc2FpelByb2Nlc3NvcigpIHtcbiAgICB0aGlzLl9wcm9jRnVsbEJveCgpO1xuICAgIGlmICh0aGlzLmZsYWdzICYgMSkge1xuICAgICAgICB0aGlzLl9wcm9jRmllbGQoJ2F1eF9pbmZvX3R5cGUnLCAndWludCcsIDMyKTtcbiAgICAgICAgdGhpcy5fcHJvY0ZpZWxkKCdhdXhfaW5mb190eXBlX3BhcmFtZXRlcicsICd1aW50JywgMzIpO1xuICAgIH1cbiAgICB0aGlzLl9wcm9jRmllbGQoJ2RlZmF1bHRfc2FtcGxlX2luZm9fc2l6ZScsICd1aW50JywgOCk7XG4gICAgdGhpcy5fcHJvY0ZpZWxkKCdzYW1wbGVfY291bnQnLCAndWludCcsIDMyKTtcbiAgICBpZiAodGhpcy5kZWZhdWx0X3NhbXBsZV9pbmZvX3NpemUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fcHJvY0ZpZWxkQXJyYXkoJ3NhbXBsZV9pbmZvX3NpemUnLCB0aGlzLnNhbXBsZV9jb3VudCwgJ3VpbnQnLCA4KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNlbmNQcm9jZXNzb3IoKSB7XG4gICAgdGhpcy5fcHJvY0Z1bGxCb3goKTtcbiAgICB0aGlzLl9wcm9jRmllbGQoJ3NhbXBsZV9jb3VudCcsICd1aW50JywgMzIpO1xuICAgIGlmICh0aGlzLmZsYWdzICYgMSkge1xuICAgICAgICB0aGlzLl9wcm9jRmllbGQoJ0lWX3NpemUnLCAndWludCcsIDgpO1xuICAgIH1cbiAgICB0aGlzLl9wcm9jRW50cmllcygnZW50cnknLCB0aGlzLnNhbXBsZV9jb3VudCwgZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgIHRoaXMuX3Byb2NFbnRyeUZpZWxkKGVudHJ5LCAnSW5pdGlhbGl6YXRpb25WZWN0b3InLCAnZGF0YScsIDgpO1xuICAgICAgICBpZiAodGhpcy5mbGFncyAmIDIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2NFbnRyeUZpZWxkKGVudHJ5LCAnTnVtYmVyT2ZFbnRyaWVzJywgJ3VpbnQnLCAxNik7XG4gICAgICAgICAgICB0aGlzLl9wcm9jU3ViRW50cmllcyhlbnRyeSwgJ2NsZWFyQW5kQ3J5cHRlZERhdGEnLCBlbnRyeS5OdW1iZXJPZkVudHJpZXMsIGZ1bmN0aW9uIChjbGVhckFuZENyeXB0ZWREYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvY0VudHJ5RmllbGQoY2xlYXJBbmRDcnlwdGVkRGF0YSwgJ0J5dGVzT2ZDbGVhckRhdGEnLCAndWludCcsIDE2KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9jRW50cnlGaWVsZChjbGVhckFuZENyeXB0ZWREYXRhLCAnQnl0ZXNPZkVuY3J5cHRlZERhdGEnLCAndWludCcsIDMyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHV1aWRQcm9jZXNzb3IoKSB7XG4gICAgbGV0IHRmeGRVc2VyVHlwZSA9IFsweDZELCAweDFELCAweDlCLCAweDA1LCAweDQyLCAweEQ1LCAweDQ0LCAweEU2LCAweDgwLCAweEUyLCAweDE0LCAweDFELCAweEFGLCAweEY3LCAweDU3LCAweEIyXTtcbiAgICBsZXQgdGZyZlVzZXJUeXBlID0gWzB4RDQsIDB4ODAsIDB4N0UsIDB4RjIsIDB4Q0EsIDB4MzksIDB4NDYsIDB4OTUsIDB4OEUsIDB4NTQsIDB4MjYsIDB4Q0IsIDB4OUUsIDB4NDYsIDB4QTcsIDB4OUZdO1xuICAgIGxldCBzZXBpZmZVc2VyVHlwZSA9IFsweEEyLCAweDM5LCAweDRGLCAweDUyLCAweDVBLCAweDlCLCAweDRmLCAweDE0LCAweEEyLCAweDQ0LCAweDZDLCAweDQyLCAweDdDLCAweDY0LCAweDhELCAweEY0XTtcblxuICAgIGlmIChhcnJheUVxdWFsKHRoaXMudXNlcnR5cGUsIHRmeGRVc2VyVHlwZSkpIHtcbiAgICAgICAgdGhpcy5fcHJvY0Z1bGxCb3goKTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcnNpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9ICd0ZnhkJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm9jRmllbGQoJ2ZyYWdtZW50X2Fic29sdXRlX3RpbWUnLCAndWludCcsICh0aGlzLnZlcnNpb24gPT09IDEpID8gNjQgOiAzMik7XG4gICAgICAgIHRoaXMuX3Byb2NGaWVsZCgnZnJhZ21lbnRfZHVyYXRpb24nLCAndWludCcsICh0aGlzLnZlcnNpb24gPT09IDEpID8gNjQgOiAzMik7XG4gICAgfVxuXG4gICAgaWYgKGFycmF5RXF1YWwodGhpcy51c2VydHlwZSwgdGZyZlVzZXJUeXBlKSkge1xuICAgICAgICB0aGlzLl9wcm9jRnVsbEJveCgpO1xuICAgICAgICBpZiAodGhpcy5fcGFyc2luZykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gJ3RmcmYnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Byb2NGaWVsZCgnZnJhZ21lbnRfY291bnQnLCAndWludCcsIDgpO1xuICAgICAgICB0aGlzLl9wcm9jRW50cmllcygnZW50cnknLCB0aGlzLmZyYWdtZW50X2NvdW50LCBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2NFbnRyeUZpZWxkKGVudHJ5LCAnZnJhZ21lbnRfYWJzb2x1dGVfdGltZScsICd1aW50JywgKHRoaXMudmVyc2lvbiA9PT0gMSkgPyA2NCA6IDMyKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2NFbnRyeUZpZWxkKGVudHJ5LCAnZnJhZ21lbnRfZHVyYXRpb24nLCAndWludCcsICh0aGlzLnZlcnNpb24gPT09IDEpID8gNjQgOiAzMik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChhcnJheUVxdWFsKHRoaXMudXNlcnR5cGUsIHNlcGlmZlVzZXJUeXBlKSkge1xuICAgICAgICBpZiAodGhpcy5fcGFyc2luZykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gJ3NlcGlmZic7XG4gICAgICAgIH1cbiAgICAgICAgc2VuY1Byb2Nlc3Nvci5jYWxsKHRoaXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gTXNzRnJhZ21lbnRQcm9jZXNzb3IoY29uZmlnKSB7XG5cbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBkYXNoTWV0cmljcyA9IGNvbmZpZy5kYXNoTWV0cmljcztcbiAgICBjb25zdCBwbGF5YmFja0NvbnRyb2xsZXIgPSBjb25maWcucGxheWJhY2tDb250cm9sbGVyO1xuICAgIGNvbnN0IGV2ZW50QnVzID0gY29uZmlnLmV2ZW50QnVzO1xuICAgIGNvbnN0IHByb3RlY3Rpb25Db250cm9sbGVyID0gY29uZmlnLnByb3RlY3Rpb25Db250cm9sbGVyO1xuICAgIGNvbnN0IElTT0JveGVyID0gY29uZmlnLklTT0JveGVyO1xuICAgIGNvbnN0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xuICAgIGxldCBtc3NGcmFnbWVudE1vb3ZQcm9jZXNzb3IsXG4gICAgICAgIG1zc0ZyYWdtZW50TW9vZlByb2Nlc3NvcixcbiAgICAgICAgaW5zdGFuY2U7XG5cbiAgICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICAgICAgSVNPQm94ZXIuYWRkQm94UHJvY2Vzc29yKCd1dWlkJywgdXVpZFByb2Nlc3Nvcik7XG4gICAgICAgIElTT0JveGVyLmFkZEJveFByb2Nlc3Nvcignc2FpbycsIHNhaW9Qcm9jZXNzb3IpO1xuICAgICAgICBJU09Cb3hlci5hZGRCb3hQcm9jZXNzb3IoJ3NhaXonLCBzYWl6UHJvY2Vzc29yKTtcbiAgICAgICAgSVNPQm94ZXIuYWRkQm94UHJvY2Vzc29yKCdzZW5jJywgc2VuY1Byb2Nlc3Nvcik7XG5cbiAgICAgICAgbXNzRnJhZ21lbnRNb292UHJvY2Vzc29yID0gTVNTRnJhZ21lbnRNb292UHJvY2Vzc29yKGNvbnRleHQpLmNyZWF0ZSh7cHJvdGVjdGlvbkNvbnRyb2xsZXI6IHByb3RlY3Rpb25Db250cm9sbGVyLFxuICAgICAgICAgICAgY29uc3RhbnRzOiBjb25maWcuY29uc3RhbnRzLCBJU09Cb3hlcjogSVNPQm94ZXJ9KTtcblxuICAgICAgICBtc3NGcmFnbWVudE1vb2ZQcm9jZXNzb3IgPSBNU1NGcmFnbWVudE1vb2ZQcm9jZXNzb3IoY29udGV4dCkuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBkYXNoTWV0cmljczogZGFzaE1ldHJpY3MsXG4gICAgICAgICAgICAgICAgcGxheWJhY2tDb250cm9sbGVyOiBwbGF5YmFja0NvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgSVNPQm94ZXI6IElTT0JveGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgICAgICAgICBkZWJ1ZzogZGVidWcsXG4gICAgICAgICAgICAgICAgZXJySGFuZGxlcjogY29uZmlnLmVyckhhbmRsZXJcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlTW9vdihyZXApIHtcbiAgICAgICAgcmV0dXJuIG1zc0ZyYWdtZW50TW9vdlByb2Nlc3Nvci5nZW5lcmF0ZU1vb3YocmVwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzRnJhZ21lbnQoZSwgc3ApIHtcbiAgICAgICAgaWYgKCFlIHx8ICFlLnJlcXVlc3QgfHwgIWUucmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZSBwYXJhbWV0ZXIgaXMgbWlzc2luZyBvciBtYWxmb3JtZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXF1ZXN0ID0gZS5yZXF1ZXN0O1xuXG4gICAgICAgIGlmIChyZXF1ZXN0LnR5cGUgPT09ICdNZWRpYVNlZ21lbnQnKSB7XG4gICAgICAgICAgICAvLyBpdCdzIGEgTWVkaWFTZWdtZW50LCBsZXQncyBjb252ZXJ0IGZyYWdtZW50XG4gICAgICAgICAgICBtc3NGcmFnbWVudE1vb2ZQcm9jZXNzb3IuY29udmVydEZyYWdtZW50KGUsIHNwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QudHlwZSA9PT0gJ0ZyYWdtZW50SW5mb1NlZ21lbnQnKSB7XG5cbiAgICAgICAgICAgIC8vIGl0J3MgYSBGcmFnbWVudEluZm8sIGFzayByZWxhdGl2ZSBmcmFnbWVudCBpbmZvIGNvbnRyb2xsZXIgdG8gaGFuZGxlIGl0XG4gICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKE1zc0V2ZW50cy5GUkFHTUVOVF9JTkZPX0xPQURJTkdfQ09NUExFVEVELCB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnRJbmZvOiBlLFxuICAgICAgICAgICAgICAgIHN0cmVhbVByb2Nlc3Nvcjogc3BcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIHNlbmRlciB2YWx1ZSB0byBzdG9wIGV2ZW50IHRvIGJlIHByb3BhZ2F0ZWQgKGZyYWdtZW50IGluZm8gbXVzdCBub3QgYmUgYWRkZWQgdG8gYnVmZmVyKVxuICAgICAgICAgICAgZS5zZW5kZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5zdGFuY2UgPSB7XG4gICAgICAgIGdlbmVyYXRlTW9vdjogZ2VuZXJhdGVNb292LFxuICAgICAgICBwcm9jZXNzRnJhZ21lbnQ6IHByb2Nlc3NGcmFnbWVudFxuICAgIH07XG5cbiAgICBzZXR1cCgpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5Nc3NGcmFnbWVudFByb2Nlc3Nvci5fX2Rhc2hqc19mYWN0b3J5X25hbWUgPSAnTXNzRnJhZ21lbnRQcm9jZXNzb3InO1xuZXhwb3J0IGRlZmF1bHQgZGFzaGpzLkZhY3RvcnlNYWtlci5nZXRDbGFzc0ZhY3RvcnkoTXNzRnJhZ21lbnRQcm9jZXNzb3IpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi8iLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuXG5pbXBvcnQgRGF0YUNodW5rIGZyb20gJy4uL3N0cmVhbWluZy92by9EYXRhQ2h1bmsnO1xuaW1wb3J0IEZyYWdtZW50UmVxdWVzdCBmcm9tICcuLi9zdHJlYW1pbmcvdm8vRnJhZ21lbnRSZXF1ZXN0JztcbmltcG9ydCBNc3NGcmFnbWVudEluZm9Db250cm9sbGVyIGZyb20gJy4vTXNzRnJhZ21lbnRJbmZvQ29udHJvbGxlcic7XG5pbXBvcnQgTXNzRnJhZ21lbnRQcm9jZXNzb3IgZnJvbSAnLi9Nc3NGcmFnbWVudFByb2Nlc3Nvcic7XG5pbXBvcnQgTXNzUGFyc2VyIGZyb20gJy4vcGFyc2VyL01zc1BhcnNlcic7XG5pbXBvcnQgTXNzRXJyb3JzIGZyb20gJy4vZXJyb3JzL01zc0Vycm9ycyc7XG5pbXBvcnQgRGFzaEpTRXJyb3IgZnJvbSAnLi4vc3RyZWFtaW5nL3ZvL0Rhc2hKU0Vycm9yJztcblxuZnVuY3Rpb24gTXNzSGFuZGxlcihjb25maWcpIHtcblxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBsZXQgY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICBsZXQgZXZlbnRCdXMgPSBjb25maWcuZXZlbnRCdXM7XG4gICAgY29uc3QgZXZlbnRzID0gY29uZmlnLmV2ZW50cztcbiAgICBjb25zdCBjb25zdGFudHMgPSBjb25maWcuY29uc3RhbnRzO1xuICAgIGNvbnN0IGluaXRTZWdtZW50VHlwZSA9IGNvbmZpZy5pbml0U2VnbWVudFR5cGU7XG4gICAgbGV0IGRhc2hNZXRyaWNzID0gY29uZmlnLmRhc2hNZXRyaWNzO1xuICAgIGxldCBwbGF5YmFja0NvbnRyb2xsZXIgPSBjb25maWcucGxheWJhY2tDb250cm9sbGVyO1xuICAgIGxldCBwcm90ZWN0aW9uQ29udHJvbGxlciA9IGNvbmZpZy5wcm90ZWN0aW9uQ29udHJvbGxlcjtcbiAgICBsZXQgbXNzRnJhZ21lbnRQcm9jZXNzb3IgPSBNc3NGcmFnbWVudFByb2Nlc3Nvcihjb250ZXh0KS5jcmVhdGUoe1xuICAgICAgICBkYXNoTWV0cmljczogZGFzaE1ldHJpY3MsXG4gICAgICAgIHBsYXliYWNrQ29udHJvbGxlcjogcGxheWJhY2tDb250cm9sbGVyLFxuICAgICAgICBwcm90ZWN0aW9uQ29udHJvbGxlcjogcHJvdGVjdGlvbkNvbnRyb2xsZXIsXG4gICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgY29uc3RhbnRzOiBjb25zdGFudHMsXG4gICAgICAgIElTT0JveGVyOiBjb25maWcuSVNPQm94ZXIsXG4gICAgICAgIGRlYnVnOiBjb25maWcuZGVidWcsXG4gICAgICAgIGVyckhhbmRsZXI6IGNvbmZpZy5lcnJIYW5kbGVyXG4gICAgfSk7XG4gICAgbGV0IG1zc1BhcnNlcixcbiAgICAgICAgaW5zdGFuY2U7XG5cbiAgICBmdW5jdGlvbiBzZXR1cCgpIHt9XG5cbiAgICBmdW5jdGlvbiBvbkluaXRpYWxpemF0aW9uUmVxdWVzdGVkKGUpIHtcbiAgICAgICAgbGV0IHN0cmVhbVByb2Nlc3NvciA9IGUuc2VuZGVyLmdldFN0cmVhbVByb2Nlc3NvcigpO1xuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBGcmFnbWVudFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHJlcHJlc2VudGF0aW9uQ29udHJvbGxlciA9IHN0cmVhbVByb2Nlc3Nvci5nZXRSZXByZXNlbnRhdGlvbkNvbnRyb2xsZXIoKTtcbiAgICAgICAgbGV0IHJlcHJlc2VudGF0aW9uID0gcmVwcmVzZW50YXRpb25Db250cm9sbGVyLmdldEN1cnJlbnRSZXByZXNlbnRhdGlvbigpO1xuXG4gICAgICAgIHJlcXVlc3QubWVkaWFUeXBlID0gcmVwcmVzZW50YXRpb24uYWRhcHRhdGlvbi50eXBlO1xuICAgICAgICByZXF1ZXN0LnR5cGUgPSBpbml0U2VnbWVudFR5cGU7XG4gICAgICAgIHJlcXVlc3QucmFuZ2UgPSByZXByZXNlbnRhdGlvbi5yYW5nZTtcbiAgICAgICAgcmVxdWVzdC5xdWFsaXR5ID0gcmVwcmVzZW50YXRpb24uaW5kZXg7XG4gICAgICAgIHJlcXVlc3QubWVkaWFJbmZvID0gc3RyZWFtUHJvY2Vzc29yLmdldE1lZGlhSW5mbygpO1xuICAgICAgICByZXF1ZXN0LnJlcHJlc2VudGF0aW9uSWQgPSByZXByZXNlbnRhdGlvbi5pZDtcblxuICAgICAgICBjb25zdCBjaHVuayA9IGNyZWF0ZURhdGFDaHVuayhyZXF1ZXN0LCBzdHJlYW1Qcm9jZXNzb3IuZ2V0U3RyZWFtSW5mbygpLmlkLCBlLnR5cGUgIT09IGV2ZW50cy5GUkFHTUVOVF9MT0FESU5HX1BST0dSRVNTKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gR2VuZXJhdGUgaW5pdGlhbGl6YXRpb24gc2VnbWVudCAobW9vdilcbiAgICAgICAgICAgIGNodW5rLmJ5dGVzID0gbXNzRnJhZ21lbnRQcm9jZXNzb3IuZ2VuZXJhdGVNb292KHJlcHJlc2VudGF0aW9uKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uZmlnLmVyckhhbmRsZXIuZXJyb3IobmV3IERhc2hKU0Vycm9yKGUuY29kZSwgZS5tZXNzYWdlLCBlLmRhdGEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50QnVzLnRyaWdnZXIoZXZlbnRzLklOSVRfRlJBR01FTlRfTE9BREVELCB7XG4gICAgICAgICAgICBjaHVuazogY2h1bmssXG4gICAgICAgICAgICBmcmFnbWVudE1vZGVsOiBzdHJlYW1Qcm9jZXNzb3IuZ2V0RnJhZ21lbnRNb2RlbCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENoYW5nZSB0aGUgc2VuZGVyIHZhbHVlIHRvIHN0b3AgZXZlbnQgdG8gYmUgcHJvcGFnYXRlZFxuICAgICAgICBlLnNlbmRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRGF0YUNodW5rKHJlcXVlc3QsIHN0cmVhbUlkLCBlbmRGcmFnbWVudCkge1xuICAgICAgICBjb25zdCBjaHVuayA9IG5ldyBEYXRhQ2h1bmsoKTtcblxuICAgICAgICBjaHVuay5zdHJlYW1JZCA9IHN0cmVhbUlkO1xuICAgICAgICBjaHVuay5tZWRpYUluZm8gPSByZXF1ZXN0Lm1lZGlhSW5mbztcbiAgICAgICAgY2h1bmsuc2VnbWVudFR5cGUgPSByZXF1ZXN0LnR5cGU7XG4gICAgICAgIGNodW5rLnN0YXJ0ID0gcmVxdWVzdC5zdGFydFRpbWU7XG4gICAgICAgIGNodW5rLmR1cmF0aW9uID0gcmVxdWVzdC5kdXJhdGlvbjtcbiAgICAgICAgY2h1bmsuZW5kID0gY2h1bmsuc3RhcnQgKyBjaHVuay5kdXJhdGlvbjtcbiAgICAgICAgY2h1bmsuaW5kZXggPSByZXF1ZXN0LmluZGV4O1xuICAgICAgICBjaHVuay5xdWFsaXR5ID0gcmVxdWVzdC5xdWFsaXR5O1xuICAgICAgICBjaHVuay5yZXByZXNlbnRhdGlvbklkID0gcmVxdWVzdC5yZXByZXNlbnRhdGlvbklkO1xuICAgICAgICBjaHVuay5lbmRGcmFnbWVudCA9IGVuZEZyYWdtZW50O1xuXG4gICAgICAgIHJldHVybiBjaHVuaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydEZyYWdtZW50SW5mb0NvbnRyb2xsZXJzKCkge1xuXG4gICAgICAgIGxldCBzdHJlYW1Db250cm9sbGVyID0gcGxheWJhY2tDb250cm9sbGVyLmdldFN0cmVhbUNvbnRyb2xsZXIoKTtcbiAgICAgICAgaWYgKCFzdHJlYW1Db250cm9sbGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgTXNzRnJhZ21lbnRJbmZvQ29udHJvbGxlcnMgZm9yIGVhY2ggU3RyZWFtUHJvY2Vzc29yIG9mIGFjdGl2ZSBzdHJlYW0gKG9ubHkgZm9yIGF1ZGlvLCB2aWRlbyBvciBmcmFnbWVudGVkVGV4dClcbiAgICAgICAgbGV0IHByb2Nlc3NvcnMgPSBzdHJlYW1Db250cm9sbGVyLmdldEFjdGl2ZVN0cmVhbVByb2Nlc3NvcnMoKTtcbiAgICAgICAgcHJvY2Vzc29ycy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9jZXNzb3IpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzb3IuZ2V0VHlwZSgpID09PSBjb25zdGFudHMuVklERU8gfHxcbiAgICAgICAgICAgICAgICBwcm9jZXNzb3IuZ2V0VHlwZSgpID09PSBjb25zdGFudHMuQVVESU8gfHxcbiAgICAgICAgICAgICAgICBwcm9jZXNzb3IuZ2V0VHlwZSgpID09PSBjb25zdGFudHMuRlJBR01FTlRFRF9URVhUKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayBNc3NGcmFnbWVudEluZm9Db250cm9sbGVyIGFscmVhZHkgcmVnaXN0ZXJlZCB0byBTdHJlYW1Qcm9jZXNzb3JcbiAgICAgICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgICAgICBsZXQgYWxyZWFkeVJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsZXQgZXh0ZXJuYWxDb250cm9sbGVycyA9IHByb2Nlc3Nvci5nZXRFeHRlcm5hbENvbnRyb2xsZXJzKCk7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV4dGVybmFsQ29udHJvbGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVybmFsQ29udHJvbGxlcnNbaV0uY29udHJvbGxlclR5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsQ29udHJvbGxlcnNbaV0uY29udHJvbGxlclR5cGUgPT09ICdNc3NGcmFnbWVudEluZm9Db250cm9sbGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxyZWFkeVJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5UmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJhZ21lbnRJbmZvQ29udHJvbGxlciA9IE1zc0ZyYWdtZW50SW5mb0NvbnRyb2xsZXIoY29udGV4dCkuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbVByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXM6IGV2ZW50QnVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaE1ldHJpY3M6IGRhc2hNZXRyaWNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWJhY2tDb250cm9sbGVyOiBwbGF5YmFja0NvbnRyb2xsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlVVJMQ29udHJvbGxlcjogY29uZmlnLmJhc2VVUkxDb250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgSVNPQm94ZXI6IGNvbmZpZy5JU09Cb3hlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnOiBjb25maWcuZGVidWdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50SW5mb0NvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudEluZm9Db250cm9sbGVyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNlZ21lbnRNZWRpYUxvYWRlZChlKSB7XG4gICAgICAgIGlmIChlLmVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJvY2VzcyBtb29mIHRvIHRyYW5zY29kZSBpdCBmcm9tIE1TUyB0byBEQVNIXG4gICAgICAgIGxldCBzdHJlYW1Qcm9jZXNzb3IgPSBlLnNlbmRlci5nZXRTdHJlYW1Qcm9jZXNzb3IoKTtcbiAgICAgICAgbXNzRnJhZ21lbnRQcm9jZXNzb3IucHJvY2Vzc0ZyYWdtZW50KGUsIHN0cmVhbVByb2Nlc3Nvcik7XG5cbiAgICAgICAgLy8gU3RhcnQgTXNzRnJhZ21lbnRJbmZvQ29udHJvbGxlcnMgaW4gY2FzZSBvZiBzdGFydC1vdmVyIHN0cmVhbXNcbiAgICAgICAgbGV0IHN0cmVhbUluZm8gPSBzdHJlYW1Qcm9jZXNzb3IuZ2V0U3RyZWFtSW5mbygpO1xuICAgICAgICBpZiAoIXN0cmVhbUluZm8ubWFuaWZlc3RJbmZvLmlzRHluYW1pYyAmJiBzdHJlYW1JbmZvLm1hbmlmZXN0SW5mby5EVlJXaW5kb3dTaXplICE9PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgc3RhcnRGcmFnbWVudEluZm9Db250cm9sbGVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5YmFja1BhdXNlZCgpIHtcbiAgICAgICAgaWYgKHBsYXliYWNrQ29udHJvbGxlci5nZXRJc0R5bmFtaWMoKSAmJiBwbGF5YmFja0NvbnRyb2xsZXIuZ2V0VGltZSgpICE9PSAwKSB7XG4gICAgICAgICAgICBzdGFydEZyYWdtZW50SW5mb0NvbnRyb2xsZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBsYXliYWNrU2Vla0Fza2VkKCkge1xuICAgICAgICBpZiAocGxheWJhY2tDb250cm9sbGVyLmdldElzRHluYW1pYygpICYmIHBsYXliYWNrQ29udHJvbGxlci5nZXRUaW1lKCkgIT09IDApIHtcbiAgICAgICAgICAgIHN0YXJ0RnJhZ21lbnRJbmZvQ29udHJvbGxlcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVFRNTFByZVByb2Nlc3ModHRtbFN1YnRpdGxlcykge1xuICAgICAgICBpZiAoIXR0bWxTdWJ0aXRsZXMgfHwgIXR0bWxTdWJ0aXRsZXMuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHRtbFN1YnRpdGxlcy5kYXRhID0gdHRtbFN1YnRpdGxlcy5kYXRhLnJlcGxhY2UoL2h0dHA6XFwvXFwvd3d3LnczLm9yZ1xcLzIwMDZcXC8xMFxcL3R0YWYxL2dpLCAnaHR0cDovL3d3dy53My5vcmcvbnMvdHRtbCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRzKCkge1xuICAgICAgICBldmVudEJ1cy5vbihldmVudHMuSU5JVF9SRVFVRVNURUQsIG9uSW5pdGlhbGl6YXRpb25SZXF1ZXN0ZWQsIGluc3RhbmNlLCBkYXNoanMuRmFjdG9yeU1ha2VyLmdldFNpbmdsZXRvbkZhY3RvcnlCeU5hbWUoZXZlbnRCdXMuZ2V0Q2xhc3NOYW1lKCkpLkVWRU5UX1BSSU9SSVRZX0hJR0gpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbiAgICAgICAgZXZlbnRCdXMub24oZXZlbnRzLlBMQVlCQUNLX1BBVVNFRCwgb25QbGF5YmFja1BhdXNlZCwgaW5zdGFuY2UsIGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0U2luZ2xldG9uRmFjdG9yeUJ5TmFtZShldmVudEJ1cy5nZXRDbGFzc05hbWUoKSkuRVZFTlRfUFJJT1JJVFlfSElHSCk7IC8qIGpzaGludCBpZ25vcmU6bGluZSAqL1xuICAgICAgICBldmVudEJ1cy5vbihldmVudHMuUExBWUJBQ0tfU0VFS19BU0tFRCwgb25QbGF5YmFja1NlZWtBc2tlZCwgaW5zdGFuY2UsIGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0U2luZ2xldG9uRmFjdG9yeUJ5TmFtZShldmVudEJ1cy5nZXRDbGFzc05hbWUoKSkuRVZFTlRfUFJJT1JJVFlfSElHSCk7IC8qIGpzaGludCBpZ25vcmU6bGluZSAqL1xuICAgICAgICBldmVudEJ1cy5vbihldmVudHMuRlJBR01FTlRfTE9BRElOR19DT01QTEVURUQsIG9uU2VnbWVudE1lZGlhTG9hZGVkLCBpbnN0YW5jZSwgZGFzaGpzLkZhY3RvcnlNYWtlci5nZXRTaW5nbGV0b25GYWN0b3J5QnlOYW1lKGV2ZW50QnVzLmdldENsYXNzTmFtZSgpKS5FVkVOVF9QUklPUklUWV9ISUdIKTsgLyoganNoaW50IGlnbm9yZTpsaW5lICovXG4gICAgICAgIGV2ZW50QnVzLm9uKGV2ZW50cy5UVE1MX1RPX1BBUlNFLCBvblRUTUxQcmVQcm9jZXNzLCBpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIGV2ZW50QnVzLm9mZihldmVudHMuSU5JVF9SRVFVRVNURUQsIG9uSW5pdGlhbGl6YXRpb25SZXF1ZXN0ZWQsIHRoaXMpO1xuICAgICAgICBldmVudEJ1cy5vZmYoZXZlbnRzLlBMQVlCQUNLX1BBVVNFRCwgb25QbGF5YmFja1BhdXNlZCwgdGhpcyk7XG4gICAgICAgIGV2ZW50QnVzLm9mZihldmVudHMuUExBWUJBQ0tfU0VFS19BU0tFRCwgb25QbGF5YmFja1NlZWtBc2tlZCwgdGhpcyk7XG4gICAgICAgIGV2ZW50QnVzLm9mZihldmVudHMuRlJBR01FTlRfTE9BRElOR19DT01QTEVURUQsIG9uU2VnbWVudE1lZGlhTG9hZGVkLCB0aGlzKTtcbiAgICAgICAgZXZlbnRCdXMub2ZmKGV2ZW50cy5UVE1MX1RPX1BBUlNFLCBvblRUTUxQcmVQcm9jZXNzLCB0aGlzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVNc3NQYXJzZXIoKSB7XG4gICAgICAgIG1zc1BhcnNlciA9IE1zc1BhcnNlcihjb250ZXh0KS5jcmVhdGUoY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIG1zc1BhcnNlcjtcbiAgICB9XG5cbiAgICBpbnN0YW5jZSA9IHtcbiAgICAgICAgcmVzZXQ6IHJlc2V0LFxuICAgICAgICBjcmVhdGVNc3NQYXJzZXI6IGNyZWF0ZU1zc1BhcnNlcixcbiAgICAgICAgcmVnaXN0ZXJFdmVudHM6IHJlZ2lzdGVyRXZlbnRzXG4gICAgfTtcblxuICAgIHNldHVwKCk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbk1zc0hhbmRsZXIuX19kYXNoanNfZmFjdG9yeV9uYW1lID0gJ01zc0hhbmRsZXInO1xuY29uc3QgZmFjdG9yeSA9IGRhc2hqcy5GYWN0b3J5TWFrZXIuZ2V0Q2xhc3NGYWN0b3J5KE1zc0hhbmRsZXIpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbmZhY3RvcnkuZXJyb3JzID0gTXNzRXJyb3JzO1xuZGFzaGpzLkZhY3RvcnlNYWtlci51cGRhdGVDbGFzc0ZhY3RvcnkoTXNzSGFuZGxlci5fX2Rhc2hqc19mYWN0b3J5X25hbWUsIGZhY3RvcnkpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbmV4cG9ydCBkZWZhdWx0IGZhY3Rvcnk7IC8qIGpzaGludCBpZ25vcmU6bGluZSAqL1xuIiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cbmltcG9ydCBFcnJvcnNCYXNlIGZyb20gJy4uLy4uL2NvcmUvZXJyb3JzL0Vycm9yc0Jhc2UnO1xuLyoqXG4gKiBAY2xhc3NcbiAqXG4gKi9cbmNsYXNzIE1zc0Vycm9ycyBleHRlbmRzIEVycm9yc0Jhc2Uge1xuXHRjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFcnJvciBjb2RlIHJldHVybmVkIHdoZW4gbm8gdGZyZiBib3ggaXMgZGV0ZWN0ZWQgaW4gTVNTIGxpdmUgc3RyZWFtXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLk1TU19OT19URlJGX0NPREUgPSAyMDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVycm9yIGNvZGUgcmV0dXJuZWQgd2hlbiBvbmUgb2YgdGhlIGNvZGVjcyBkZWZpbmVkIGluIHRoZSBtYW5pZmVzdCBpcyBub3Qgc3VwcG9ydGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLk1TU19VTlNVUFBPUlRFRF9DT0RFQ19DT0RFID0gMjAxO1xuXG4gICAgICAgIHRoaXMuTVNTX05PX1RGUkZfTUVTU0FHRSA9ICdNaXNzaW5nIHRmcmYgaW4gbGl2ZSBtZWRpYSBzZWdtZW50JztcbiAgICAgICAgdGhpcy5NU1NfVU5TVVBQT1JURURfQ09ERUNfTUVTU0FHRSA9ICdVbnN1cHBvcnRlZCBjb2RlYyc7XG4gICAgfVxufVxuXG5sZXQgbXNzRXJyb3JzID0gbmV3IE1zc0Vycm9ycygpO1xuZXhwb3J0IGRlZmF1bHQgbXNzRXJyb3JzOyIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cbmltcG9ydCBNc3NIYW5kbGVyIGZyb20gJy4vTXNzSGFuZGxlcic7XG5cbi8vIFNob3ZlIGJvdGggb2YgdGhlc2UgaW50byB0aGUgZ2xvYmFsIHNjb3BlXG52YXIgY29udGV4dCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cpIHx8IGdsb2JhbDtcblxudmFyIGRhc2hqcyA9IGNvbnRleHQuZGFzaGpzO1xuaWYgKCFkYXNoanMpIHtcbiAgICBkYXNoanMgPSBjb250ZXh0LmRhc2hqcyA9IHt9O1xufVxuXG5kYXNoanMuTXNzSGFuZGxlciA9IE1zc0hhbmRsZXI7XG5cbmV4cG9ydCBkZWZhdWx0IGRhc2hqcztcbmV4cG9ydCB7IE1zc0hhbmRsZXIgfTtcbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cbi8qKlxuICogQG1vZHVsZSBNc3NQYXJzZXJcbiAqIEBpZ25vcmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgb2JqZWN0XG4gKi9cblxuaW1wb3J0IEJpZ0ludCBmcm9tICcuLi8uLi8uLi9leHRlcm5hbHMvQmlnSW50ZWdlcic7XG5cbmZ1bmN0aW9uIE1zc1BhcnNlcihjb25maWcpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uc3QgQkFTRTY0ID0gY29uZmlnLkJBU0U2NDtcbiAgICBjb25zdCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcbiAgICBjb25zdCBjb25zdGFudHMgPSBjb25maWcuY29uc3RhbnRzO1xuICAgIGNvbnN0IG1hbmlmZXN0TW9kZWwgPSBjb25maWcubWFuaWZlc3RNb2RlbDtcbiAgICBjb25zdCBtZWRpYVBsYXllck1vZGVsID0gY29uZmlnLm1lZGlhUGxheWVyTW9kZWw7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBjb25maWcuc2V0dGluZ3M7XG5cbiAgICBjb25zdCBERUZBVUxUX1RJTUVfU0NBTEUgPSAxMDAwMDAwMC4wO1xuICAgIGNvbnN0IFNVUFBPUlRFRF9DT0RFQ1MgPSBbJ0FBQycsICdBQUNMJywgJ0FWQzEnLCAnSDI2NCcsICdUVE1MJywgJ0RGWFAnXTtcbiAgICAvLyBNUEVHLURBU0ggUm9sZSBhbmQgYWNjZXNzaWJpbGl0eSBtYXBwaW5nIGZvciB0ZXh0IHRyYWNrcyBhY2NvcmRpbmcgdG8gRVRTSSBUUyAxMDMgMjg1IHYxLjEuMSAoc2VjdGlvbiA3LjEuMilcbiAgICBjb25zdCBST0xFID0ge1xuICAgICAgICAnQ0FQVCc6ICdtYWluJyxcbiAgICAgICAgJ1NVQlQnOiAnYWx0ZXJuYXRlJyxcbiAgICAgICAgJ0RFU0MnOiAnbWFpbidcbiAgICB9O1xuICAgIGNvbnN0IEFDQ0VTU0lCSUxJVFkgPSB7XG4gICAgICAgICdERVNDJzogJzInXG4gICAgfTtcbiAgICBjb25zdCBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4ID0ge1xuICAgICAgICA5NjAwMDogMHgwLFxuICAgICAgICA4ODIwMDogMHgxLFxuICAgICAgICA2NDAwMDogMHgyLFxuICAgICAgICA0ODAwMDogMHgzLFxuICAgICAgICA0NDEwMDogMHg0LFxuICAgICAgICAzMjAwMDogMHg1LFxuICAgICAgICAyNDAwMDogMHg2LFxuICAgICAgICAyMjA1MDogMHg3LFxuICAgICAgICAxNjAwMDogMHg4LFxuICAgICAgICAxMjAwMDogMHg5LFxuICAgICAgICAxMTAyNTogMHhBLFxuICAgICAgICA4MDAwOiAweEIsXG4gICAgICAgIDczNTA6IDB4Q1xuICAgIH07XG4gICAgY29uc3QgbWltZVR5cGVNYXAgPSB7XG4gICAgICAgICd2aWRlbyc6ICd2aWRlby9tcDQnLFxuICAgICAgICAnYXVkaW8nOiAnYXVkaW8vbXA0JyxcbiAgICAgICAgJ3RleHQnOiAnYXBwbGljYXRpb24vbXA0J1xuICAgIH07XG5cbiAgICBsZXQgaW5zdGFuY2UsXG4gICAgICAgIGxvZ2dlcjtcblxuXG4gICAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgICAgIGxvZ2dlciA9IGRlYnVnLmdldExvZ2dlcihpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwUGVyaW9kKHNtb290aFN0cmVhbWluZ01lZGlhLCB0aW1lc2NhbGUpIHtcbiAgICAgICAgY29uc3QgcGVyaW9kID0ge307XG4gICAgICAgIGxldCBzdHJlYW1zLFxuICAgICAgICAgICAgYWRhcHRhdGlvbjtcblxuICAgICAgICAvLyBGb3IgZWFjaCBTdHJlYW1JbmRleCBub2RlLCBjcmVhdGUgYW4gQWRhcHRhdGlvblNldCBlbGVtZW50XG4gICAgICAgIHBlcmlvZC5BZGFwdGF0aW9uU2V0X2FzQXJyYXkgPSBbXTtcbiAgICAgICAgc3RyZWFtcyA9IHNtb290aFN0cmVhbWluZ01lZGlhLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTdHJlYW1JbmRleCcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmVhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFkYXB0YXRpb24gPSBtYXBBZGFwdGF0aW9uU2V0KHN0cmVhbXNbaV0sIHRpbWVzY2FsZSk7XG4gICAgICAgICAgICBpZiAoYWRhcHRhdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBlcmlvZC5BZGFwdGF0aW9uU2V0X2FzQXJyYXkucHVzaChhZGFwdGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwZXJpb2QuQWRhcHRhdGlvblNldF9hc0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHBlcmlvZC5BZGFwdGF0aW9uU2V0ID0gKHBlcmlvZC5BZGFwdGF0aW9uU2V0X2FzQXJyYXkubGVuZ3RoID4gMSkgPyBwZXJpb2QuQWRhcHRhdGlvblNldF9hc0FycmF5IDogcGVyaW9kLkFkYXB0YXRpb25TZXRfYXNBcnJheVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwZXJpb2Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwQWRhcHRhdGlvblNldChzdHJlYW1JbmRleCwgdGltZXNjYWxlKSB7XG4gICAgICAgIGNvbnN0IGFkYXB0YXRpb25TZXQgPSB7fTtcbiAgICAgICAgY29uc3QgcmVwcmVzZW50YXRpb25zID0gW107XG4gICAgICAgIGxldCBzZWdtZW50VGVtcGxhdGU7XG4gICAgICAgIGxldCBxdWFsaXR5TGV2ZWxzLFxuICAgICAgICAgICAgcmVwcmVzZW50YXRpb24sXG4gICAgICAgICAgICBzZWdtZW50cyxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IHN0cmVhbUluZGV4LmdldEF0dHJpYnV0ZSgnTmFtZScpO1xuICAgICAgICBjb25zdCB0eXBlID0gc3RyZWFtSW5kZXguZ2V0QXR0cmlidXRlKCdUeXBlJyk7XG4gICAgICAgIGNvbnN0IGxhbmcgPSBzdHJlYW1JbmRleC5nZXRBdHRyaWJ1dGUoJ0xhbmd1YWdlJyk7XG4gICAgICAgIGNvbnN0IGZhbGxCYWNrSWQgPSBsYW5nID8gdHlwZSArICdfJyArIGxhbmcgOiB0eXBlO1xuXG4gICAgICAgIGFkYXB0YXRpb25TZXQuaWQgPSBuYW1lIHx8IGZhbGxCYWNrSWQ7XG4gICAgICAgIGFkYXB0YXRpb25TZXQuY29udGVudFR5cGUgPSB0eXBlO1xuICAgICAgICBhZGFwdGF0aW9uU2V0LmxhbmcgPSBsYW5nIHx8ICd1bmQnO1xuICAgICAgICBhZGFwdGF0aW9uU2V0Lm1pbWVUeXBlID0gbWltZVR5cGVNYXBbdHlwZV07XG4gICAgICAgIGFkYXB0YXRpb25TZXQuc3ViVHlwZSA9IHN0cmVhbUluZGV4LmdldEF0dHJpYnV0ZSgnU3VidHlwZScpO1xuICAgICAgICBhZGFwdGF0aW9uU2V0Lm1heFdpZHRoID0gc3RyZWFtSW5kZXguZ2V0QXR0cmlidXRlKCdNYXhXaWR0aCcpO1xuICAgICAgICBhZGFwdGF0aW9uU2V0Lm1heEhlaWdodCA9IHN0cmVhbUluZGV4LmdldEF0dHJpYnV0ZSgnTWF4SGVpZ2h0Jyk7XG5cbiAgICAgICAgLy8gTWFwIHRleHQgdHJhY2tzIHN1YlR5cGVzIHRvIE1QRUctREFTSCBBZGFwdGF0aW9uU2V0IHJvbGUgYW5kIGFjY2Vzc2liaWxpdHkgKHNlZSBFVFNJIFRTIDEwMyAyODUgdjEuMS4xLCBzZWN0aW9uIDcuMS4yKVxuICAgICAgICBpZiAoYWRhcHRhdGlvblNldC5zdWJUeXBlKSB7XG4gICAgICAgICAgICBpZiAoUk9MRVthZGFwdGF0aW9uU2V0LnN1YlR5cGVdKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvbGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNjaGVtZUlkVXJpOiAndXJuOm1wZWc6ZGFzaDpyb2xlOjIwMTEnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogUk9MRVthZGFwdGF0aW9uU2V0LnN1YlR5cGVdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGFwdGF0aW9uU2V0LlJvbGUgPSByb2xlO1xuICAgICAgICAgICAgICAgIGFkYXB0YXRpb25TZXQuUm9sZV9hc0FycmF5ID0gW3JvbGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEFDQ0VTU0lCSUxJVFlbYWRhcHRhdGlvblNldC5zdWJUeXBlXSkge1xuICAgICAgICAgICAgICAgIGxldCBhY2Nlc3NpYmlsaXR5ID0ge1xuICAgICAgICAgICAgICAgICAgICBzY2hlbWVJZFVyaTogJ3Vybjp0dmE6bWV0YWRhdGE6Y3M6QXVkaW9QdXJwb3NlQ1M6MjAwNycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBBQ0NFU1NJQklMSVRZW2FkYXB0YXRpb25TZXQuc3ViVHlwZV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFkYXB0YXRpb25TZXQuQWNjZXNzaWJpbGl0eSA9IGFjY2Vzc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgYWRhcHRhdGlvblNldC5BY2Nlc3NpYmlsaXR5X2FzQXJyYXkgPSBbYWNjZXNzaWJpbGl0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYSBTZWdtZW50VGVtcGxhdGUgd2l0aCBhIFNlZ21lbnRUaW1lbGluZVxuICAgICAgICBzZWdtZW50VGVtcGxhdGUgPSBtYXBTZWdtZW50VGVtcGxhdGUoc3RyZWFtSW5kZXgsIHRpbWVzY2FsZSk7XG5cbiAgICAgICAgcXVhbGl0eUxldmVscyA9IHN0cmVhbUluZGV4LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdRdWFsaXR5TGV2ZWwnKTtcbiAgICAgICAgLy8gRm9yIGVhY2ggUXVhbGl0eUxldmVsIG5vZGUsIGNyZWF0ZSBhIFJlcHJlc2VudGF0aW9uIGVsZW1lbnRcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHF1YWxpdHlMZXZlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIFByb3BhZ2F0ZSBCYXNlVVJMIGFuZCBtaW1lVHlwZVxuICAgICAgICAgICAgcXVhbGl0eUxldmVsc1tpXS5CYXNlVVJMID0gYWRhcHRhdGlvblNldC5CYXNlVVJMO1xuICAgICAgICAgICAgcXVhbGl0eUxldmVsc1tpXS5taW1lVHlwZSA9IGFkYXB0YXRpb25TZXQubWltZVR5cGU7XG5cbiAgICAgICAgICAgIC8vIFNldCBxdWFsaXR5IGxldmVsIGlkXG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWxzW2ldLklkID0gYWRhcHRhdGlvblNldC5pZCArICdfJyArIHF1YWxpdHlMZXZlbHNbaV0uZ2V0QXR0cmlidXRlKCdJbmRleCcpO1xuXG4gICAgICAgICAgICAvLyBNYXAgUmVwcmVzZW50YXRpb24gdG8gUXVhbGl0eUxldmVsXG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbiA9IG1hcFJlcHJlc2VudGF0aW9uKHF1YWxpdHlMZXZlbHNbaV0sIHN0cmVhbUluZGV4KTtcblxuICAgICAgICAgICAgaWYgKHJlcHJlc2VudGF0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gQ29weSBTZWdtZW50VGVtcGxhdGUgaW50byBSZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uLlNlZ21lbnRUZW1wbGF0ZSA9IHNlZ21lbnRUZW1wbGF0ZTtcblxuICAgICAgICAgICAgICAgIHJlcHJlc2VudGF0aW9ucy5wdXNoKHJlcHJlc2VudGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXByZXNlbnRhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkYXB0YXRpb25TZXQuUmVwcmVzZW50YXRpb24gPSAocmVwcmVzZW50YXRpb25zLmxlbmd0aCA+IDEpID8gcmVwcmVzZW50YXRpb25zIDogcmVwcmVzZW50YXRpb25zWzBdO1xuICAgICAgICBhZGFwdGF0aW9uU2V0LlJlcHJlc2VudGF0aW9uX2FzQXJyYXkgPSByZXByZXNlbnRhdGlvbnM7XG5cbiAgICAgICAgLy8gU2V0IFNlZ21lbnRUZW1wbGF0ZVxuICAgICAgICBhZGFwdGF0aW9uU2V0LlNlZ21lbnRUZW1wbGF0ZSA9IHNlZ21lbnRUZW1wbGF0ZTtcblxuICAgICAgICBzZWdtZW50cyA9IHNlZ21lbnRUZW1wbGF0ZS5TZWdtZW50VGltZWxpbmUuU19hc0FycmF5O1xuXG4gICAgICAgIHJldHVybiBhZGFwdGF0aW9uU2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcFJlcHJlc2VudGF0aW9uKHF1YWxpdHlMZXZlbCwgc3RyZWFtSW5kZXgpIHtcbiAgICAgICAgY29uc3QgcmVwcmVzZW50YXRpb24gPSB7fTtcbiAgICAgICAgY29uc3QgdHlwZSA9IHN0cmVhbUluZGV4LmdldEF0dHJpYnV0ZSgnVHlwZScpO1xuICAgICAgICBsZXQgZm91ckNDVmFsdWUgPSBudWxsO1xuXG4gICAgICAgIHJlcHJlc2VudGF0aW9uLmlkID0gcXVhbGl0eUxldmVsLklkO1xuICAgICAgICByZXByZXNlbnRhdGlvbi5iYW5kd2lkdGggPSBwYXJzZUludChxdWFsaXR5TGV2ZWwuZ2V0QXR0cmlidXRlKCdCaXRyYXRlJyksIDEwKTtcbiAgICAgICAgcmVwcmVzZW50YXRpb24ubWltZVR5cGUgPSBxdWFsaXR5TGV2ZWwubWltZVR5cGU7XG4gICAgICAgIHJlcHJlc2VudGF0aW9uLndpZHRoID0gcGFyc2VJbnQocXVhbGl0eUxldmVsLmdldEF0dHJpYnV0ZSgnTWF4V2lkdGgnKSwgMTApO1xuICAgICAgICByZXByZXNlbnRhdGlvbi5oZWlnaHQgPSBwYXJzZUludChxdWFsaXR5TGV2ZWwuZ2V0QXR0cmlidXRlKCdNYXhIZWlnaHQnKSwgMTApO1xuXG4gICAgICAgIGZvdXJDQ1ZhbHVlID0gcXVhbGl0eUxldmVsLmdldEF0dHJpYnV0ZSgnRm91ckNDJyk7XG5cbiAgICAgICAgLy8gSWYgRm91ckNDIG5vdCBkZWZpbmVkIGF0IFF1YWxpdHlMZXZlbCBsZXZlbCwgdGhlbiBnZXQgaXQgZnJvbSBTdHJlYW1JbmRleCBsZXZlbFxuICAgICAgICBpZiAoZm91ckNDVmFsdWUgPT09IG51bGwgfHwgZm91ckNDVmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBmb3VyQ0NWYWx1ZSA9IHN0cmVhbUluZGV4LmdldEF0dHJpYnV0ZSgnRm91ckNDJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBzdGlsbCBub3QgZGVmaW5lZCAob3B0aW9ubmFsIGZvciBhdWRpbyBzdHJlYW0sIHNlZSBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2ZmNzI4MTE2JTI4dj12cy45NSUyOS5hc3B4KSxcbiAgICAgICAgLy8gdGhlbiB3ZSBjb25zaWRlciB0aGUgc3RyZWFtIGlzIGFuIGF1ZGlvIEFBQyBzdHJlYW1cbiAgICAgICAgaWYgKGZvdXJDQ1ZhbHVlID09PSBudWxsIHx8IGZvdXJDQ1ZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IGNvbnN0YW50cy5BVURJTykge1xuICAgICAgICAgICAgICAgIGZvdXJDQ1ZhbHVlID0gJ0FBQyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IGNvbnN0YW50cy5WSURFTykge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRm91ckNDIGlzIG5vdCBkZWZpbmVkIHdoZXJlYXMgaXQgaXMgcmVxdWlyZWQgZm9yIGEgUXVhbGl0eUxldmVsIGVsZW1lbnQgZm9yIGEgU3RyZWFtSW5kZXggb2YgdHlwZSBcInZpZGVvXCInKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGNvZGVjIGlzIHN1cHBvcnRlZFxuICAgICAgICBpZiAoU1VQUE9SVEVEX0NPREVDUy5pbmRleE9mKGZvdXJDQ1ZhbHVlLnRvVXBwZXJDYXNlKCkpID09PSAtMSkge1xuICAgICAgICAgICAgLy8gRG8gbm90IHNlbmQgd2FybmluZ1xuICAgICAgICAgICAgbG9nZ2VyLndhcm4oJ0NvZGVjIG5vdCBzdXBwb3J0ZWQ6ICcgKyBmb3VyQ0NWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBjb2RlY3MgdmFsdWUgYWNjb3JkaW5nIHRvIEZvdXJDQyBmaWVsZFxuICAgICAgICBpZiAoZm91ckNDVmFsdWUgPT09ICdIMjY0JyB8fCBmb3VyQ0NWYWx1ZSA9PT0gJ0FWQzEnKSB7XG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbi5jb2RlY3MgPSBnZXRIMjY0Q29kZWMocXVhbGl0eUxldmVsKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3VyQ0NWYWx1ZS5pbmRleE9mKCdBQUMnKSA+PSAwKSB7XG4gICAgICAgICAgICByZXByZXNlbnRhdGlvbi5jb2RlY3MgPSBnZXRBQUNDb2RlYyhxdWFsaXR5TGV2ZWwsIGZvdXJDQ1ZhbHVlKTtcbiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uLmF1ZGlvU2FtcGxpbmdSYXRlID0gcGFyc2VJbnQocXVhbGl0eUxldmVsLmdldEF0dHJpYnV0ZSgnU2FtcGxpbmdSYXRlJyksIDEwKTtcbiAgICAgICAgICAgIHJlcHJlc2VudGF0aW9uLmF1ZGlvQ2hhbm5lbHMgPSBwYXJzZUludChxdWFsaXR5TGV2ZWwuZ2V0QXR0cmlidXRlKCdDaGFubmVscycpLCAxMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm91ckNDVmFsdWUuaW5kZXhPZignVFRNTCcpIHx8IGZvdXJDQ1ZhbHVlLmluZGV4T2YoJ0RGWFAnKSkge1xuICAgICAgICAgICAgcmVwcmVzZW50YXRpb24uY29kZWNzID0gY29uc3RhbnRzLlNUUFA7XG4gICAgICAgIH1cblxuICAgICAgICByZXByZXNlbnRhdGlvbi5jb2RlY1ByaXZhdGVEYXRhID0gJycgKyBxdWFsaXR5TGV2ZWwuZ2V0QXR0cmlidXRlKCdDb2RlY1ByaXZhdGVEYXRhJyk7XG4gICAgICAgIHJlcHJlc2VudGF0aW9uLkJhc2VVUkwgPSBxdWFsaXR5TGV2ZWwuQmFzZVVSTDtcblxuICAgICAgICByZXR1cm4gcmVwcmVzZW50YXRpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SDI2NENvZGVjKHF1YWxpdHlMZXZlbCkge1xuICAgICAgICBsZXQgY29kZWNQcml2YXRlRGF0YSA9IHF1YWxpdHlMZXZlbC5nZXRBdHRyaWJ1dGUoJ0NvZGVjUHJpdmF0ZURhdGEnKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgbmFsSGVhZGVyLFxuICAgICAgICAgICAgYXZjb3RpO1xuXG5cbiAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBDb2RlY1ByaXZhdGVEYXRhIGZpZWxkIHRoZSBoZXhhZGVjaW1hbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZm9sbG93aW5nXG4gICAgICAgIC8vIHRocmVlIGJ5dGVzIGluIHRoZSBzZXF1ZW5jZSBwYXJhbWV0ZXIgc2V0IE5BTCB1bml0LlxuICAgICAgICAvLyA9PiBGaW5kIHRoZSBTUFMgbmFsIGhlYWRlclxuICAgICAgICBuYWxIZWFkZXIgPSAvMDAwMDAwMDFbMC05XTcvLmV4ZWMoY29kZWNQcml2YXRlRGF0YSk7XG4gICAgICAgIC8vID0+IEZpbmQgdGhlIDYgY2hhcmFjdGVycyBhZnRlciB0aGUgU1BTIG5hbEhlYWRlciAoaWYgaXQgZXhpc3RzKVxuICAgICAgICBhdmNvdGkgPSBuYWxIZWFkZXIgJiYgbmFsSGVhZGVyWzBdID8gKGNvZGVjUHJpdmF0ZURhdGEuc3Vic3RyKGNvZGVjUHJpdmF0ZURhdGEuaW5kZXhPZihuYWxIZWFkZXJbMF0pICsgMTAsIDYpKSA6IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gJ2F2YzEuJyArIGF2Y290aTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBQUNDb2RlYyhxdWFsaXR5TGV2ZWwsIGZvdXJDQ1ZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHNhbXBsaW5nUmF0ZSA9IHBhcnNlSW50KHF1YWxpdHlMZXZlbC5nZXRBdHRyaWJ1dGUoJ1NhbXBsaW5nUmF0ZScpLCAxMCk7XG4gICAgICAgIGxldCBjb2RlY1ByaXZhdGVEYXRhID0gcXVhbGl0eUxldmVsLmdldEF0dHJpYnV0ZSgnQ29kZWNQcml2YXRlRGF0YScpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBvYmplY3RUeXBlID0gMDtcbiAgICAgICAgbGV0IGNvZGVjUHJpdmF0ZURhdGFIZXgsXG4gICAgICAgICAgICBhcnIxNixcbiAgICAgICAgICAgIGluZGV4RnJlcSxcbiAgICAgICAgICAgIGV4dGVuc2lvblNhbXBsaW5nRnJlcXVlbmN5SW5kZXg7XG5cbiAgICAgICAgLy9jaHJvbWUgcHJvYmxlbSwgaW4gaW1wbGljaXQgQUFDIEhFIGRlZmluaXRpb24sIHNvIHdoZW4gQUFDSCBpcyBkZXRlY3RlZCBpbiBGb3VyQ0NcbiAgICAgICAgLy9zZXQgb2JqZWN0VHlwZSB0byA1ID0+IHN0cmFuZ2UsIGl0IHNob3VsZCBiZSAyXG4gICAgICAgIGlmIChmb3VyQ0NWYWx1ZSA9PT0gJ0FBQ0gnKSB7XG4gICAgICAgICAgICBvYmplY3RUeXBlID0gMHgwNTtcbiAgICAgICAgfVxuICAgICAgICAvL2lmIGNvZGVjUHJpdmF0ZURhdGEgaXMgZW1wdHksIGJ1aWxkIGl0IDpcbiAgICAgICAgaWYgKGNvZGVjUHJpdmF0ZURhdGEgPT09IHVuZGVmaW5lZCB8fCBjb2RlY1ByaXZhdGVEYXRhID09PSAnJykge1xuICAgICAgICAgICAgb2JqZWN0VHlwZSA9IDB4MDI7IC8vQUFDIE1haW4gTG93IENvbXBsZXhpdHkgPT4gb2JqZWN0IFR5cGUgPSAyXG4gICAgICAgICAgICBpbmRleEZyZXEgPSBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4W3NhbXBsaW5nUmF0ZV07XG4gICAgICAgICAgICBpZiAoZm91ckNDVmFsdWUgPT09ICdBQUNIJykge1xuICAgICAgICAgICAgICAgIC8vIDQgYnl0ZXMgOiAgICAgWFhYWFggICAgICAgICBYWFhYICAgICAgICAgIFhYWFggICAgICAgICAgICAgWFhYWCAgICAgICAgICAgICAgICAgIFhYWFhYICAgICAgWFhYICAgWFhYWFhYWFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAnIE9iamVjdFR5cGUnICdGcmVxIEluZGV4JyAnQ2hhbm5lbHMgdmFsdWUnICAgJ0V4dGVucyBTYW1wbCBGcmVxJyAgJ09iamVjdFR5cGUnICAnR0FTJyAnYWxpZ25tZW50ID0gMCdcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlID0gMHgwNTsgLy8gSGlnaCBFZmZpY2llbmN5IEFBQyBQcm9maWxlID0gb2JqZWN0IFR5cGUgPSA1IFNCUlxuICAgICAgICAgICAgICAgIGNvZGVjUHJpdmF0ZURhdGEgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25TYW1wbGluZ0ZyZXF1ZW5jeUluZGV4ID0gc2FtcGxpbmdGcmVxdWVuY3lJbmRleFtzYW1wbGluZ1JhdGUgKiAyXTsgLy8gaW4gSEUgQUFDIEV4dGVuc2lvbiBTYW1wbGluZyBmcmVxdWVuY2VcbiAgICAgICAgICAgICAgICAvLyBlcXVhbHMgdG8gU2FtcGxpbmdSYXRlKjJcbiAgICAgICAgICAgICAgICAvL0ZyZXEgSW5kZXggaXMgcHJlc2VudCBmb3IgMyBiaXRzIGluIHRoZSBmaXJzdCBieXRlLCBsYXN0IGJpdCBpcyBpbiB0aGUgc2Vjb25kXG4gICAgICAgICAgICAgICAgY29kZWNQcml2YXRlRGF0YVswXSA9IChvYmplY3RUeXBlIDw8IDMpIHwgKGluZGV4RnJlcSA+PiAxKTtcbiAgICAgICAgICAgICAgICBjb2RlY1ByaXZhdGVEYXRhWzFdID0gKGluZGV4RnJlcSA8PCA3KSB8IChxdWFsaXR5TGV2ZWwuQ2hhbm5lbHMgPDwgMykgfCAoZXh0ZW5zaW9uU2FtcGxpbmdGcmVxdWVuY3lJbmRleCA+PiAxKTtcbiAgICAgICAgICAgICAgICBjb2RlY1ByaXZhdGVEYXRhWzJdID0gKGV4dGVuc2lvblNhbXBsaW5nRnJlcXVlbmN5SW5kZXggPDwgNykgfCAoMHgwMiA8PCAyKTsgLy8gb3JpZ2luIG9iamVjdCB0eXBlIGVxdWFscyB0byAyID0+IEFBQyBNYWluIExvdyBDb21wbGV4aXR5XG4gICAgICAgICAgICAgICAgY29kZWNQcml2YXRlRGF0YVszXSA9IDB4MDsgLy9hbGlnbm1lbnQgYml0c1xuXG4gICAgICAgICAgICAgICAgYXJyMTYgPSBuZXcgVWludDE2QXJyYXkoMik7XG4gICAgICAgICAgICAgICAgYXJyMTZbMF0gPSAoY29kZWNQcml2YXRlRGF0YVswXSA8PCA4KSArIGNvZGVjUHJpdmF0ZURhdGFbMV07XG4gICAgICAgICAgICAgICAgYXJyMTZbMV0gPSAoY29kZWNQcml2YXRlRGF0YVsyXSA8PCA4KSArIGNvZGVjUHJpdmF0ZURhdGFbM107XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IGRlY2ltYWwgdG8gaGV4IHZhbHVlXG4gICAgICAgICAgICAgICAgY29kZWNQcml2YXRlRGF0YUhleCA9IGFycjE2WzBdLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICBjb2RlY1ByaXZhdGVEYXRhSGV4ID0gYXJyMTZbMF0udG9TdHJpbmcoMTYpICsgYXJyMTZbMV0udG9TdHJpbmcoMTYpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIDIgYnl0ZXMgOiAgICAgWFhYWFggICAgICAgICBYWFhYICAgICAgICAgIFhYWFggICAgICAgICAgICAgIFhYWFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAnIE9iamVjdFR5cGUnICdGcmVxIEluZGV4JyAnQ2hhbm5lbHMgdmFsdWUnICAgJ0dBUyA9IDAwMCdcbiAgICAgICAgICAgICAgICBjb2RlY1ByaXZhdGVEYXRhID0gbmV3IFVpbnQ4QXJyYXkoMik7XG4gICAgICAgICAgICAgICAgLy9GcmVxIEluZGV4IGlzIHByZXNlbnQgZm9yIDMgYml0cyBpbiB0aGUgZmlyc3QgYnl0ZSwgbGFzdCBiaXQgaXMgaW4gdGhlIHNlY29uZFxuICAgICAgICAgICAgICAgIGNvZGVjUHJpdmF0ZURhdGFbMF0gPSAob2JqZWN0VHlwZSA8PCAzKSB8IChpbmRleEZyZXEgPj4gMSk7XG4gICAgICAgICAgICAgICAgY29kZWNQcml2YXRlRGF0YVsxXSA9IChpbmRleEZyZXEgPDwgNykgfCAocGFyc2VJbnQocXVhbGl0eUxldmVsLmdldEF0dHJpYnV0ZSgnQ2hhbm5lbHMnKSwgMTApIDw8IDMpO1xuICAgICAgICAgICAgICAgIC8vIHB1dCB0aGUgMiBieXRlcyBpbiBhbiAxNiBiaXRzIGFycmF5XG4gICAgICAgICAgICAgICAgYXJyMTYgPSBuZXcgVWludDE2QXJyYXkoMSk7XG4gICAgICAgICAgICAgICAgYXJyMTZbMF0gPSAoY29kZWNQcml2YXRlRGF0YVswXSA8PCA4KSArIGNvZGVjUHJpdmF0ZURhdGFbMV07XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IGRlY2ltYWwgdG8gaGV4IHZhbHVlXG4gICAgICAgICAgICAgICAgY29kZWNQcml2YXRlRGF0YUhleCA9IGFycjE2WzBdLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29kZWNQcml2YXRlRGF0YSA9ICcnICsgY29kZWNQcml2YXRlRGF0YUhleDtcbiAgICAgICAgICAgIGNvZGVjUHJpdmF0ZURhdGEgPSBjb2RlY1ByaXZhdGVEYXRhLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBxdWFsaXR5TGV2ZWwuc2V0QXR0cmlidXRlKCdDb2RlY1ByaXZhdGVEYXRhJywgY29kZWNQcml2YXRlRGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqZWN0VHlwZSA9PT0gMCkge1xuICAgICAgICAgICAgb2JqZWN0VHlwZSA9IChwYXJzZUludChjb2RlY1ByaXZhdGVEYXRhLnN1YnN0cigwLCAyKSwgMTYpICYgMHhGOCkgPj4gMztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnbXA0YS40MC4nICsgb2JqZWN0VHlwZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXBTZWdtZW50VGVtcGxhdGUoc3RyZWFtSW5kZXgsIHRpbWVzY2FsZSkge1xuICAgICAgICBjb25zdCBzZWdtZW50VGVtcGxhdGUgPSB7fTtcbiAgICAgICAgbGV0IG1lZGlhVXJsLFxuICAgICAgICAgICAgc3RyZWFtSW5kZXhUaW1lU2NhbGUsXG4gICAgICAgICAgICB1cmw7XG5cbiAgICAgICAgdXJsID0gc3RyZWFtSW5kZXguZ2V0QXR0cmlidXRlKCdVcmwnKTtcbiAgICAgICAgbWVkaWFVcmwgPSB1cmwgPyB1cmwucmVwbGFjZSgne2JpdHJhdGV9JywgJyRCYW5kd2lkdGgkJykgOiBudWxsO1xuICAgICAgICBtZWRpYVVybCA9IG1lZGlhVXJsID8gbWVkaWFVcmwucmVwbGFjZSgne3N0YXJ0IHRpbWV9JywgJyRUaW1lJCcpIDogbnVsbDtcblxuICAgICAgICBzdHJlYW1JbmRleFRpbWVTY2FsZSA9IHN0cmVhbUluZGV4LmdldEF0dHJpYnV0ZSgnVGltZVNjYWxlJyk7XG4gICAgICAgIHN0cmVhbUluZGV4VGltZVNjYWxlID0gc3RyZWFtSW5kZXhUaW1lU2NhbGUgPyBwYXJzZUZsb2F0KHN0cmVhbUluZGV4VGltZVNjYWxlKSA6IHRpbWVzY2FsZTtcblxuICAgICAgICBzZWdtZW50VGVtcGxhdGUubWVkaWEgPSBtZWRpYVVybDtcbiAgICAgICAgc2VnbWVudFRlbXBsYXRlLnRpbWVzY2FsZSA9IHN0cmVhbUluZGV4VGltZVNjYWxlO1xuXG4gICAgICAgIHNlZ21lbnRUZW1wbGF0ZS5TZWdtZW50VGltZWxpbmUgPSBtYXBTZWdtZW50VGltZWxpbmUoc3RyZWFtSW5kZXgsIHNlZ21lbnRUZW1wbGF0ZS50aW1lc2NhbGUpO1xuXG4gICAgICAgIHJldHVybiBzZWdtZW50VGVtcGxhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwU2VnbWVudFRpbWVsaW5lKHN0cmVhbUluZGV4LCB0aW1lc2NhbGUpIHtcbiAgICAgICAgY29uc3Qgc2VnbWVudFRpbWVsaW5lID0ge307XG4gICAgICAgIGNvbnN0IGNodW5rcyA9IHN0cmVhbUluZGV4LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdjJyk7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gW107XG4gICAgICAgIGxldCBzZWdtZW50LFxuICAgICAgICAgICAgcHJldlNlZ21lbnQsXG4gICAgICAgICAgICB0TWFuaWZlc3QsXG4gICAgICAgICAgICBpLGoscjtcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gMDtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWdtZW50ID0ge307XG5cbiAgICAgICAgICAgIC8vIEdldCB0aW1lICd0JyBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgICAgIHRNYW5pZmVzdCA9IGNodW5rc1tpXS5nZXRBdHRyaWJ1dGUoJ3QnKTtcblxuICAgICAgICAgICAgLy8gPT4gc2VnbWVudC50TWFuaWZlc3QgPSBvcmlnaW5hbCB0aW1lc3RhbXAgdmFsdWUgYXMgYSBzdHJpbmcgKGZvciBjb25zdHJ1Y3RpbmcgdGhlIGZyYWdtZW50IHJlcXVlc3QgdXJsLCBzZWUgRGFzaEhhbmRsZXIpXG4gICAgICAgICAgICAvLyA9PiBzZWdtZW50LnQgPSBudW1iZXIgdmFsdWUgb2YgdGltZXN0YW1wIChtYXliZSByb3VuZGVkIHZhbHVlLCBidXQgb25seSBmb3IgMC4xIG1pY3Jvc2Vjb25kKVxuICAgICAgICAgICAgaWYgKHRNYW5pZmVzdCAmJiBCaWdJbnQodE1hbmlmZXN0KS5ncmVhdGVyKEJpZ0ludChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC50TWFuaWZlc3QgPSB0TWFuaWZlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWdtZW50LnQgPSBwYXJzZUZsb2F0KHRNYW5pZmVzdCk7XG5cbiAgICAgICAgICAgIC8vIEdldCBkdXJhdGlvbiAnZCcgYXR0cmlidXRlIHZhbHVlXG4gICAgICAgICAgICBzZWdtZW50LmQgPSBwYXJzZUZsb2F0KGNodW5rc1tpXS5nZXRBdHRyaWJ1dGUoJ2QnKSk7XG5cbiAgICAgICAgICAgIC8vIElmICd0JyBub3QgZGVmaW5lZCBmb3IgZmlyc3Qgc2VnbWVudCB0aGVuIHQ9MFxuICAgICAgICAgICAgaWYgKChpID09PSAwKSAmJiAhc2VnbWVudC50KSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC50ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgcHJldlNlZ21lbnQgPSBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgcHJldmlvdXMgc2VnbWVudCBkdXJhdGlvbiBpZiBub3QgZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmICghcHJldlNlZ21lbnQuZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldlNlZ21lbnQudE1hbmlmZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VnbWVudC5kID0gQmlnSW50KHRNYW5pZmVzdCkuc3VidHJhY3QoQmlnSW50KHByZXZTZWdtZW50LnRNYW5pZmVzdCkpLnRvSlNOdW1iZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWdtZW50LmQgPSBzZWdtZW50LnQgLSBwcmV2U2VnbWVudC50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uICs9IHByZXZTZWdtZW50LmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNldCBzZWdtZW50IGFic29sdXRlIHRpbWVzdGFtcCBpZiBub3Qgc2V0IGluIG1hbmlmZXN0XG4gICAgICAgICAgICAgICAgaWYgKCFzZWdtZW50LnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZTZWdtZW50LnRNYW5pZmVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC50TWFuaWZlc3QgPSBCaWdJbnQocHJldlNlZ21lbnQudE1hbmlmZXN0KS5hZGQoQmlnSW50KHByZXZTZWdtZW50LmQpKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC50ID0gcGFyc2VGbG9hdChzZWdtZW50LnRNYW5pZmVzdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnQgPSBwcmV2U2VnbWVudC50ICsgcHJldlNlZ21lbnQuZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlZ21lbnQuZCkge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uICs9IHNlZ21lbnQuZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyBzZWdtZW50XG4gICAgICAgICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuXG4gICAgICAgICAgICAvLyBTdXBwb3J0IGZvciAncicgYXR0cmlidXRlIChpLmUuIFwicmVwZWF0XCIgYXMgaW4gTVBFRy1EQVNIKVxuICAgICAgICAgICAgciA9IHBhcnNlRmxvYXQoY2h1bmtzW2ldLmdldEF0dHJpYnV0ZSgncicpKTtcbiAgICAgICAgICAgIGlmIChyKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgKHIgLSAxKTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZTZWdtZW50ID0gc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC50ID0gcHJldlNlZ21lbnQudCArIHByZXZTZWdtZW50LmQ7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZCA9IHByZXZTZWdtZW50LmQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2U2VnbWVudC50TWFuaWZlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQudE1hbmlmZXN0ICA9IEJpZ0ludChwcmV2U2VnbWVudC50TWFuaWZlc3QpLmFkZChCaWdJbnQocHJldlNlZ21lbnQuZCkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gKz0gc2VnbWVudC5kO1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNlZ21lbnRUaW1lbGluZS5TID0gc2VnbWVudHM7XG4gICAgICAgIHNlZ21lbnRUaW1lbGluZS5TX2FzQXJyYXkgPSBzZWdtZW50cztcbiAgICAgICAgc2VnbWVudFRpbWVsaW5lLmR1cmF0aW9uID0gZHVyYXRpb24gLyB0aW1lc2NhbGU7XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRUaW1lbGluZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRLSURGcm9tUHJvdGVjdGlvbkhlYWRlcihwcm90ZWN0aW9uSGVhZGVyKSB7XG4gICAgICAgIGxldCBwckhlYWRlcixcbiAgICAgICAgICAgIHdybUhlYWRlcixcbiAgICAgICAgICAgIHhtbFJlYWRlcixcbiAgICAgICAgICAgIEtJRDtcblxuICAgICAgICAvLyBHZXQgUGxheVJlYWR5IGhlYWRlciBhcyBieXRlIGFycmF5IChiYXNlNjQgZGVjb2RlZClcbiAgICAgICAgcHJIZWFkZXIgPSBCQVNFNjQuZGVjb2RlQXJyYXkocHJvdGVjdGlvbkhlYWRlci5maXJzdENoaWxkLmRhdGEpO1xuXG4gICAgICAgIC8vIEdldCBSaWdodCBNYW5hZ2VtZW50IGhlYWRlciAoV1JNSEVBREVSKSBmcm9tIFBsYXlSZWFkeSBoZWFkZXJcbiAgICAgICAgd3JtSGVhZGVyID0gZ2V0V1JNSGVhZGVyRnJvbVBSSGVhZGVyKHBySGVhZGVyKTtcblxuICAgICAgICBpZiAod3JtSGVhZGVyKSB7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IGZyb20gbXVsdGktYnl0ZSB0byB1bmljb2RlXG4gICAgICAgICAgICB3cm1IZWFkZXIgPSBuZXcgVWludDE2QXJyYXkod3JtSGVhZGVyLmJ1ZmZlcik7XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgdG8gc3RyaW5nXG4gICAgICAgICAgICB3cm1IZWFkZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHdybUhlYWRlcik7XG5cbiAgICAgICAgICAgIC8vIFBhcnNlIDxXUk1IZWFkZXI+IHRvIGdldCBLSUQgZmllbGQgdmFsdWVcbiAgICAgICAgICAgIHhtbFJlYWRlciA9IChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyh3cm1IZWFkZXIsICdhcHBsaWNhdGlvbi94bWwnKTtcbiAgICAgICAgICAgIEtJRCA9IHhtbFJlYWRlci5xdWVyeVNlbGVjdG9yKCdLSUQnKS50ZXh0Q29udGVudDtcblxuICAgICAgICAgICAgLy8gR2V0IEtJRCAoYmFzZTY0IGRlY29kZWQpIGFzIGJ5dGUgYXJyYXlcbiAgICAgICAgICAgIEtJRCA9IEJBU0U2NC5kZWNvZGVBcnJheShLSUQpO1xuXG4gICAgICAgICAgICAvLyBDb252ZXJ0IFVVSUQgZnJvbSBsaXR0bGUtZW5kaWFuIHRvIGJpZy1lbmRpYW5cbiAgICAgICAgICAgIGNvbnZlcnRVdWlkRW5kaWFubmVzcyhLSUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEtJRDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXUk1IZWFkZXJGcm9tUFJIZWFkZXIocHJIZWFkZXIpIHtcbiAgICAgICAgbGV0IGxlbmd0aCxcbiAgICAgICAgICAgIHJlY29yZENvdW50LFxuICAgICAgICAgICAgcmVjb3JkVHlwZSxcbiAgICAgICAgICAgIHJlY29yZExlbmd0aCxcbiAgICAgICAgICAgIHJlY29yZFZhbHVlO1xuICAgICAgICBsZXQgaSA9IDA7XG5cbiAgICAgICAgLy8gUGFyc2UgUGxheVJlYWR5IGhlYWRlclxuXG4gICAgICAgIC8vIExlbmd0aCAtIDMyIGJpdHMgKExFIGZvcm1hdClcbiAgICAgICAgbGVuZ3RoID0gKHBySGVhZGVyW2kgKyAzXSA8PCAyNCkgKyAocHJIZWFkZXJbaSArIDJdIDw8IDE2KSArIChwckhlYWRlcltpICsgMV0gPDwgOCkgKyBwckhlYWRlcltpXTtcbiAgICAgICAgaSArPSA0O1xuXG4gICAgICAgIC8vIFJlY29yZCBjb3VudCAtIDE2IGJpdHMgKExFIGZvcm1hdClcbiAgICAgICAgcmVjb3JkQ291bnQgPSAocHJIZWFkZXJbaSArIDFdIDw8IDgpICsgcHJIZWFkZXJbaV07XG4gICAgICAgIGkgKz0gMjtcblxuICAgICAgICAvLyBQYXJzZSByZWNvcmRzXG4gICAgICAgIHdoaWxlIChpIDwgcHJIZWFkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBSZWNvcmQgdHlwZSAtIDE2IGJpdHMgKExFIGZvcm1hdClcbiAgICAgICAgICAgIHJlY29yZFR5cGUgPSAocHJIZWFkZXJbaSArIDFdIDw8IDgpICsgcHJIZWFkZXJbaV07XG4gICAgICAgICAgICBpICs9IDI7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIFJpZ2h0cyBNYW5hZ2VtZW50IGhlYWRlciAocmVjb3JkIHR5cGUgPSAweDAxKVxuICAgICAgICAgICAgaWYgKHJlY29yZFR5cGUgPT09IDB4MDEpIHtcblxuICAgICAgICAgICAgICAgIC8vIFJlY29yZCBsZW5ndGggLSAxNiBiaXRzIChMRSBmb3JtYXQpXG4gICAgICAgICAgICAgICAgcmVjb3JkTGVuZ3RoID0gKHBySGVhZGVyW2kgKyAxXSA8PCA4KSArIHBySGVhZGVyW2ldO1xuICAgICAgICAgICAgICAgIGkgKz0gMjtcblxuICAgICAgICAgICAgICAgIC8vIFJlY29yZCB2YWx1ZSA9PiBjb250YWlucyA8V1JNSEVBREVSPlxuICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlID0gbmV3IFVpbnQ4QXJyYXkocmVjb3JkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5zZXQocHJIZWFkZXIuc3ViYXJyYXkoaSwgaSArIHJlY29yZExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRVdWlkRW5kaWFubmVzcyh1dWlkKSB7XG4gICAgICAgIHN3YXBCeXRlcyh1dWlkLCAwLCAzKTtcbiAgICAgICAgc3dhcEJ5dGVzKHV1aWQsIDEsIDIpO1xuICAgICAgICBzd2FwQnl0ZXModXVpZCwgNCwgNSk7XG4gICAgICAgIHN3YXBCeXRlcyh1dWlkLCA2LCA3KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2FwQnl0ZXMoYnl0ZXMsIHBvczEsIHBvczIpIHtcbiAgICAgICAgY29uc3QgdGVtcCA9IGJ5dGVzW3BvczFdO1xuICAgICAgICBieXRlc1twb3MxXSA9IGJ5dGVzW3BvczJdO1xuICAgICAgICBieXRlc1twb3MyXSA9IHRlbXA7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQUkNvbnRlbnRQcm90ZWN0aW9uKHByb3RlY3Rpb25IZWFkZXIpIHtcbiAgICAgICAgbGV0IHBybyA9IHtcbiAgICAgICAgICAgIF9fdGV4dDogcHJvdGVjdGlvbkhlYWRlci5maXJzdENoaWxkLmRhdGEsXG4gICAgICAgICAgICBfX3ByZWZpeDogJ21zcHInXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2hlbWVJZFVyaTogJ3Vybjp1dWlkOjlhMDRmMDc5LTk4NDAtNDI4Ni1hYjkyLWU2NWJlMDg4NWY5NScsXG4gICAgICAgICAgICB2YWx1ZTogJ2NvbS5taWNyb3NvZnQucGxheXJlYWR5JyxcbiAgICAgICAgICAgIHBybzogcHJvLFxuICAgICAgICAgICAgcHJvX2FzQXJyYXk6IHByb1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdpZGV2aW5lQ29udGVudFByb3RlY3Rpb24oS0lEKSB7XG4gICAgICAgIGxldCB3aWRldmluZUNQID0ge1xuICAgICAgICAgICAgc2NoZW1lSWRVcmk6ICd1cm46dXVpZDplZGVmOGJhOS03OWQ2LTRhY2UtYTNjOC0yN2RjZDUxZDIxZWQnLFxuICAgICAgICAgICAgdmFsdWU6ICdjb20ud2lkZXZpbmUuYWxwaGEnXG4gICAgICAgIH07XG4gICAgICAgIGlmICghS0lEKVxuICAgICAgICAgICAgcmV0dXJuIHdpZGV2aW5lQ1A7XG4gICAgICAgIC8vIENyZWF0ZSBXaWRldmluZSBDRU5DIGhlYWRlciAoUHJvdG9jb2wgQnVmZmVyKSB3aXRoIEtJRCB2YWx1ZVxuICAgICAgICBjb25zdCB3dkNlbmNIZWFkZXIgPSBuZXcgVWludDhBcnJheSgyICsgS0lELmxlbmd0aCk7XG4gICAgICAgIHd2Q2VuY0hlYWRlclswXSA9IDB4MTI7XG4gICAgICAgIHd2Q2VuY0hlYWRlclsxXSA9IDB4MTA7XG4gICAgICAgIHd2Q2VuY0hlYWRlci5zZXQoS0lELCAyKTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBwc3NoIGJveFxuICAgICAgICBjb25zdCBsZW5ndGggPSAxMiAvKiBib3ggbGVuZ3RoLCB0eXBlLCB2ZXJzaW9uIGFuZCBmbGFncyAqLyArIDE2IC8qIFN5c3RlbUlEICovICsgNCAvKiBkYXRhIGxlbmd0aCAqLyArIHd2Q2VuY0hlYWRlci5sZW5ndGg7XG4gICAgICAgIGxldCBwc3NoID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIC8vIFNldCBib3ggbGVuZ3RoIHZhbHVlXG4gICAgICAgIHBzc2hbaSsrXSA9IChsZW5ndGggJiAweEZGMDAwMDAwKSA+PiAyNDtcbiAgICAgICAgcHNzaFtpKytdID0gKGxlbmd0aCAmIDB4MDBGRjAwMDApID4+IDE2O1xuICAgICAgICBwc3NoW2krK10gPSAobGVuZ3RoICYgMHgwMDAwRkYwMCkgPj4gODtcbiAgICAgICAgcHNzaFtpKytdID0gKGxlbmd0aCAmIDB4MDAwMDAwRkYpO1xuXG4gICAgICAgIC8vIFNldCB0eXBlICgncHNzaCcpLCB2ZXJzaW9uICgwKSBhbmQgZmxhZ3MgKDApXG4gICAgICAgIHBzc2guc2V0KFsweDcwLCAweDczLCAweDczLCAweDY4LCAweDAwLCAweDAwLCAweDAwLCAweDAwXSwgaSk7XG4gICAgICAgIGkgKz0gODtcblxuICAgICAgICAvLyBTZXQgU3lzdGVtSUQgKCdlZGVmOGJhOS03OWQ2LTRhY2UtYTNjOC0yN2RjZDUxZDIxZWQnKVxuICAgICAgICBwc3NoLnNldChbMHhlZCwgMHhlZiwgMHg4YiwgMHhhOSwgIDB4NzksIDB4ZDYsIDB4NGEsIDB4Y2UsIDB4YTMsIDB4YzgsIDB4MjcsIDB4ZGMsIDB4ZDUsIDB4MWQsIDB4MjEsIDB4ZWRdLCBpKTtcbiAgICAgICAgaSArPSAxNjtcblxuICAgICAgICAvLyBTZXQgZGF0YSBsZW5ndGggdmFsdWVcbiAgICAgICAgcHNzaFtpKytdID0gKHd2Q2VuY0hlYWRlci5sZW5ndGggJiAweEZGMDAwMDAwKSA+PiAyNDtcbiAgICAgICAgcHNzaFtpKytdID0gKHd2Q2VuY0hlYWRlci5sZW5ndGggJiAweDAwRkYwMDAwKSA+PiAxNjtcbiAgICAgICAgcHNzaFtpKytdID0gKHd2Q2VuY0hlYWRlci5sZW5ndGggJiAweDAwMDBGRjAwKSA+PiA4O1xuICAgICAgICBwc3NoW2krK10gPSAod3ZDZW5jSGVhZGVyLmxlbmd0aCAmIDB4MDAwMDAwRkYpO1xuXG4gICAgICAgIC8vIENvcHkgV2lkZXZpbmUgQ0VOQyBoZWFkZXJcbiAgICAgICAgcHNzaC5zZXQod3ZDZW5jSGVhZGVyLCBpKTtcblxuICAgICAgICAvLyBDb252ZXJ0IHRvIEJBU0U2NCBzdHJpbmdcbiAgICAgICAgcHNzaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgcHNzaCk7XG4gICAgICAgIHBzc2ggPSBCQVNFNjQuZW5jb2RlQVNDSUkocHNzaCk7XG5cbiAgICAgICAgd2lkZXZpbmVDUC5wc3NoID0geyBfX3RleHQ6IHBzc2ggfTtcblxuICAgICAgICByZXR1cm4gd2lkZXZpbmVDUDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTWFuaWZlc3QoeG1sRG9jLCBtYW5pZmVzdExvYWRlZFRpbWUpIHtcbiAgICAgICAgY29uc3QgbWFuaWZlc3QgPSB7fTtcbiAgICAgICAgY29uc3QgY29udGVudFByb3RlY3Rpb25zID0gW107XG4gICAgICAgIGNvbnN0IHNtb290aFN0cmVhbWluZ01lZGlhID0geG1sRG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdTbW9vdGhTdHJlYW1pbmdNZWRpYScpWzBdO1xuICAgICAgICBjb25zdCBwcm90ZWN0aW9uID0geG1sRG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdQcm90ZWN0aW9uJylbMF07XG4gICAgICAgIGxldCBwcm90ZWN0aW9uSGVhZGVyID0gbnVsbDtcbiAgICAgICAgbGV0IHBlcmlvZCxcbiAgICAgICAgICAgIGFkYXB0YXRpb25zLFxuICAgICAgICAgICAgY29udGVudFByb3RlY3Rpb24sXG4gICAgICAgICAgICBLSUQsXG4gICAgICAgICAgICB0aW1lc3RhbXBPZmZzZXQsXG4gICAgICAgICAgICBzdGFydFRpbWUsXG4gICAgICAgICAgICBzZWdtZW50cyxcbiAgICAgICAgICAgIHRpbWVzY2FsZSxcbiAgICAgICAgICAgIHNlZ21lbnREdXJhdGlvbixcbiAgICAgICAgICAgIGksIGo7XG5cbiAgICAgICAgLy8gU2V0IG1hbmlmZXN0IG5vZGUgcHJvcGVydGllc1xuICAgICAgICBtYW5pZmVzdC5wcm90b2NvbCA9ICdNU1MnO1xuICAgICAgICBtYW5pZmVzdC5wcm9maWxlcyA9ICd1cm46bXBlZzpkYXNoOnByb2ZpbGU6aXNvZmYtbGl2ZToyMDExJztcbiAgICAgICAgbWFuaWZlc3QudHlwZSA9IHNtb290aFN0cmVhbWluZ01lZGlhLmdldEF0dHJpYnV0ZSgnSXNMaXZlJykgPT09ICdUUlVFJyA/ICdkeW5hbWljJyA6ICdzdGF0aWMnO1xuICAgICAgICB0aW1lc2NhbGUgPSAgc21vb3RoU3RyZWFtaW5nTWVkaWEuZ2V0QXR0cmlidXRlKCdUaW1lU2NhbGUnKTtcbiAgICAgICAgbWFuaWZlc3QudGltZXNjYWxlID0gdGltZXNjYWxlID8gcGFyc2VGbG9hdCh0aW1lc2NhbGUpIDogREVGQVVMVF9USU1FX1NDQUxFO1xuICAgICAgICBsZXQgZHZyV2luZG93TGVuZ3RoID0gcGFyc2VGbG9hdChzbW9vdGhTdHJlYW1pbmdNZWRpYS5nZXRBdHRyaWJ1dGUoJ0RWUldpbmRvd0xlbmd0aCcpKTtcbiAgICAgICAgLy8gSWYgdGhlIERWUldpbmRvd0xlbmd0aCBmaWVsZCBpcyBvbWl0dGVkIGZvciBhIGxpdmUgcHJlc2VudGF0aW9uIG9yIHNldCB0byAwLCB0aGUgRFZSIHdpbmRvdyBpcyBlZmZlY3RpdmVseSBpbmZpbml0ZVxuICAgICAgICBpZiAobWFuaWZlc3QudHlwZSA9PT0gJ2R5bmFtaWMnICYmIChkdnJXaW5kb3dMZW5ndGggPT09IDAgfHwgaXNOYU4oZHZyV2luZG93TGVuZ3RoKSkpIHtcbiAgICAgICAgICAgIGR2cldpbmRvd0xlbmd0aCA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0YXItb3ZlclxuICAgICAgICBpZiAoZHZyV2luZG93TGVuZ3RoID09PSAwICYmIHNtb290aFN0cmVhbWluZ01lZGlhLmdldEF0dHJpYnV0ZSgnQ2FuU2VlaycpID09PSAnVFJVRScpIHtcbiAgICAgICAgICAgIGR2cldpbmRvd0xlbmd0aCA9IEluZmluaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGR2cldpbmRvd0xlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1hbmlmZXN0LnRpbWVTaGlmdEJ1ZmZlckRlcHRoID0gZHZyV2luZG93TGVuZ3RoIC8gbWFuaWZlc3QudGltZXNjYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGR1cmF0aW9uID0gcGFyc2VGbG9hdChzbW9vdGhTdHJlYW1pbmdNZWRpYS5nZXRBdHRyaWJ1dGUoJ0R1cmF0aW9uJykpO1xuICAgICAgICBtYW5pZmVzdC5tZWRpYVByZXNlbnRhdGlvbkR1cmF0aW9uID0gKGR1cmF0aW9uID09PSAwKSA/IEluZmluaXR5IDogZHVyYXRpb24gLyBtYW5pZmVzdC50aW1lc2NhbGU7XG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHNldCBtaW5CdWZmZXJUaW1lIHRvIDIgc2VjLiAoYnV0IHNldCBiZWxvdyBhY2NvcmRpbmcgdG8gdmlkZW8gc2VnbWVudCBkdXJhdGlvbilcbiAgICAgICAgbWFuaWZlc3QubWluQnVmZmVyVGltZSA9IDI7XG4gICAgICAgIG1hbmlmZXN0LnR0bWxUaW1lSXNSZWxhdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgLy8gTGl2ZSBtYW5pZmVzdCB3aXRoIER1cmF0aW9uID0gc3RhcnQtb3ZlclxuICAgICAgICBpZiAobWFuaWZlc3QudHlwZSA9PT0gJ2R5bmFtaWMnICYmIGR1cmF0aW9uID4gMCkge1xuICAgICAgICAgICAgbWFuaWZlc3QudHlwZSA9ICdzdGF0aWMnO1xuICAgICAgICAgICAgLy8gV2Ugc2V0IHRpbWVTaGlmdEJ1ZmZlckRlcHRoIHRvIGluaXRpYWwgZHVyYXRpb24sIHRvIGJlIHVzZWQgYnkgTXNzRnJhZ21lbnRDb250cm9sbGVyIHRvIHVwZGF0ZSBzZWdtZW50IHRpbWVsaW5lXG4gICAgICAgICAgICBtYW5pZmVzdC50aW1lU2hpZnRCdWZmZXJEZXB0aCA9IGR1cmF0aW9uIC8gbWFuaWZlc3QudGltZXNjYWxlO1xuICAgICAgICAgICAgLy8gRHVyYXRpb24gd2lsbCBiZSBzZXQgYWNjb3JkaW5nIHRvIGN1cnJlbnQgc2VnbWVudCB0aW1lbGluZSBkdXJhdGlvbiAoc2VlIGJlbG93KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hbmlmZXN0LnR5cGUgPT09ICdkeW5hbWljJyAgJiYgbWFuaWZlc3QudGltZVNoaWZ0QnVmZmVyRGVwdGggPCBJbmZpbml0eSkge1xuICAgICAgICAgICAgbWFuaWZlc3QucmVmcmVzaE1hbmlmZXN0T25Td2l0Y2hUcmFjayA9IHRydWU7IC8vIFJlZnJlc2ggbWFuaWZlc3Qgd2hlbiBzd2l0Y2hpbmcgdHJhY2tzXG4gICAgICAgICAgICBtYW5pZmVzdC5kb05vdFVwZGF0ZURWUldpbmRvd09uQnVmZmVyVXBkYXRlZCA9IHRydWU7IC8vIERWUldpbmRvdyBpcyB1cGRhdGUgYnkgTXNzRnJhZ21lbnRNb29mUG9jZXNzb3IgYmFzZWQgb24gdGZyZiBib3hlc1xuICAgICAgICAgICAgbWFuaWZlc3QuaWdub3JlUG9zdHBvbmVUaW1lUGVyaW9kID0gdHJ1ZTsgLy8gTmV2ZXIgdXBkYXRlIG1hbmlmZXN0XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYXAgcGVyaW9kIG5vZGUgdG8gbWFuaWZlc3Qgcm9vdCBub2RlXG4gICAgICAgIG1hbmlmZXN0LlBlcmlvZCA9IG1hcFBlcmlvZChzbW9vdGhTdHJlYW1pbmdNZWRpYSwgbWFuaWZlc3QudGltZXNjYWxlKTtcbiAgICAgICAgbWFuaWZlc3QuUGVyaW9kX2FzQXJyYXkgPSBbbWFuaWZlc3QuUGVyaW9kXTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHBlcmlvZCBzdGFydCB0aW1lXG4gICAgICAgIHBlcmlvZCA9IG1hbmlmZXN0LlBlcmlvZDtcbiAgICAgICAgcGVyaW9kLnN0YXJ0ID0gMDtcblxuICAgICAgICAvLyBVbmNvbW1lbnQgdG8gdGVzdCBsaXZlIHRvIHN0YXRpYyBtYW5pZmVzdHNcbiAgICAgICAgLy8gaWYgKG1hbmlmZXN0LnR5cGUgIT09ICdzdGF0aWMnKSB7XG4gICAgICAgIC8vICAgICBtYW5pZmVzdC50eXBlID0gJ3N0YXRpYyc7XG4gICAgICAgIC8vICAgICBtYW5pZmVzdC5tZWRpYVByZXNlbnRhdGlvbkR1cmF0aW9uID0gbWFuaWZlc3QudGltZVNoaWZ0QnVmZmVyRGVwdGg7XG4gICAgICAgIC8vICAgICBtYW5pZmVzdC50aW1lU2hpZnRCdWZmZXJEZXB0aCA9IG51bGw7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBDb250ZW50UHJvdGVjdGlvbiBub2RlXG4gICAgICAgIGlmIChwcm90ZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHByb3RlY3Rpb25IZWFkZXIgPSB4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1Byb3RlY3Rpb25IZWFkZXInKVswXTtcblxuICAgICAgICAgICAgLy8gU29tZSBwYWNrYWdlcnMgcHV0IG5ld2xpbmVzIGludG8gdGhlIFByb3RlY3Rpb25IZWFkZXIgYmFzZTY0IHN0cmluZywgd2hpY2ggaXMgbm90IGdvb2RcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgdGhpcyBjYW5ub3QgYmUgY29ycmVjdGx5IHBhcnNlZC4gTGV0J3MganVzdCBmaWx0ZXIgb3V0IGFueSBuZXdsaW5lcyBmb3VuZCBpbiB0aGVyZS5cbiAgICAgICAgICAgIHByb3RlY3Rpb25IZWFkZXIuZmlyc3RDaGlsZC5kYXRhID0gcHJvdGVjdGlvbkhlYWRlci5maXJzdENoaWxkLmRhdGEucmVwbGFjZSgvXFxufFxcci9nLCAnJyk7XG5cbiAgICAgICAgICAgIC8vIEdldCBLSUQgKGluIENFTkMgZm9ybWF0KSBmcm9tIHByb3RlY3Rpb24gaGVhZGVyXG4gICAgICAgICAgICBLSUQgPSBnZXRLSURGcm9tUHJvdGVjdGlvbkhlYWRlcihwcm90ZWN0aW9uSGVhZGVyKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIENvbnRlbnRQcm90ZWN0aW9uIGZvciBQbGF5UmVhZHlcbiAgICAgICAgICAgIGNvbnRlbnRQcm90ZWN0aW9uID0gY3JlYXRlUFJDb250ZW50UHJvdGVjdGlvbihwcm90ZWN0aW9uSGVhZGVyKTtcbiAgICAgICAgICAgIGNvbnRlbnRQcm90ZWN0aW9uWydjZW5jOmRlZmF1bHRfS0lEJ10gPSBLSUQ7XG4gICAgICAgICAgICBjb250ZW50UHJvdGVjdGlvbnMucHVzaChjb250ZW50UHJvdGVjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBDb250ZW50UHJvdGVjdGlvbiBmb3IgV2lkZXZpbmUgKGFzIGEgQ0VOQyBwcm90ZWN0aW9uKVxuICAgICAgICAgICAgY29udGVudFByb3RlY3Rpb24gPSBjcmVhdGVXaWRldmluZUNvbnRlbnRQcm90ZWN0aW9uKEtJRCk7XG4gICAgICAgICAgICBjb250ZW50UHJvdGVjdGlvblsnY2VuYzpkZWZhdWx0X0tJRCddID0gS0lEO1xuICAgICAgICAgICAgY29udGVudFByb3RlY3Rpb25zLnB1c2goY29udGVudFByb3RlY3Rpb24pO1xuXG4gICAgICAgICAgICBtYW5pZmVzdC5Db250ZW50UHJvdGVjdGlvbiA9IGNvbnRlbnRQcm90ZWN0aW9ucztcbiAgICAgICAgICAgIG1hbmlmZXN0LkNvbnRlbnRQcm90ZWN0aW9uX2FzQXJyYXkgPSBjb250ZW50UHJvdGVjdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBhZGFwdGF0aW9ucyA9IHBlcmlvZC5BZGFwdGF0aW9uU2V0X2FzQXJyYXk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFkYXB0YXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhZGFwdGF0aW9uc1tpXS5TZWdtZW50VGVtcGxhdGUuaW5pdGlhbGl6YXRpb24gPSAnJEJhbmR3aWR0aCQnO1xuICAgICAgICAgICAgLy8gUHJvcGFnYXRlIGNvbnRlbnQgcHJvdGVjdGlvbiBpbmZvcm1hdGlvbiBpbnRvIGVhY2ggYWRhcHRhdGlvblxuICAgICAgICAgICAgaWYgKG1hbmlmZXN0LkNvbnRlbnRQcm90ZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBhZGFwdGF0aW9uc1tpXS5Db250ZW50UHJvdGVjdGlvbiA9IG1hbmlmZXN0LkNvbnRlbnRQcm90ZWN0aW9uO1xuICAgICAgICAgICAgICAgIGFkYXB0YXRpb25zW2ldLkNvbnRlbnRQcm90ZWN0aW9uX2FzQXJyYXkgPSBtYW5pZmVzdC5Db250ZW50UHJvdGVjdGlvbl9hc0FycmF5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWRhcHRhdGlvbnNbaV0uY29udGVudFR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdmlkZW8gc2VnbWVudCBkdXJhdGlvblxuICAgICAgICAgICAgICAgIHNlZ21lbnREdXJhdGlvbiA9IGFkYXB0YXRpb25zW2ldLlNlZ21lbnRUZW1wbGF0ZS5TZWdtZW50VGltZWxpbmUuU19hc0FycmF5WzBdLmQgLyBhZGFwdGF0aW9uc1tpXS5TZWdtZW50VGVtcGxhdGUudGltZXNjYWxlO1xuICAgICAgICAgICAgICAgIC8vIFNldCBtaW5CdWZmZXJUaW1lXG4gICAgICAgICAgICAgICAgbWFuaWZlc3QubWluQnVmZmVyVGltZSA9IHNlZ21lbnREdXJhdGlvbiAqIDI7XG5cbiAgICAgICAgICAgICAgICBpZiAobWFuaWZlc3QudHlwZSA9PT0gJ2R5bmFtaWMnICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgYXZhaWxhYmlsaXR5U3RhcnRUaW1lXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzID0gYWRhcHRhdGlvbnNbaV0uU2VnbWVudFRlbXBsYXRlLlNlZ21lbnRUaW1lbGluZS5TX2FzQXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRUaW1lID0gKHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDFdLnQgKyBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXS5kKSAvIGFkYXB0YXRpb25zW2ldLlNlZ21lbnRUZW1wbGF0ZS50aW1lc2NhbGUgKiAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBtYW5pZmVzdC5hdmFpbGFiaWxpdHlTdGFydFRpbWUgPSBuZXcgRGF0ZShtYW5pZmVzdExvYWRlZFRpbWUuZ2V0VGltZSgpIC0gZW5kVGltZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTWF0Y2ggdGltZVNoaWZ0QnVmZmVyRGVwdGggdG8gdmlkZW8gc2VnbWVudCB0aW1lbGluZSBkdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAobWFuaWZlc3QudGltZVNoaWZ0QnVmZmVyRGVwdGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBtYW5pZmVzdC50aW1lU2hpZnRCdWZmZXJEZXB0aCAhPT0gSW5maW5pdHkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmlmZXN0LnRpbWVTaGlmdEJ1ZmZlckRlcHRoID4gYWRhcHRhdGlvbnNbaV0uU2VnbWVudFRlbXBsYXRlLlNlZ21lbnRUaW1lbGluZS5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFuaWZlc3QudGltZVNoaWZ0QnVmZmVyRGVwdGggPSBhZGFwdGF0aW9uc1tpXS5TZWdtZW50VGVtcGxhdGUuU2VnbWVudFRpbWVsaW5lLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FwIG1pbkJ1ZmZlclRpbWUgdG8gdGltZVNoaWZ0QnVmZmVyRGVwdGhcbiAgICAgICAgbWFuaWZlc3QubWluQnVmZmVyVGltZSA9IE1hdGgubWluKG1hbmlmZXN0Lm1pbkJ1ZmZlclRpbWUsIChtYW5pZmVzdC50aW1lU2hpZnRCdWZmZXJEZXB0aCA/IG1hbmlmZXN0LnRpbWVTaGlmdEJ1ZmZlckRlcHRoIDogSW5maW5pdHkpKTtcblxuICAgICAgICAvLyBJbiBjYXNlIG9mIGxpdmUgc3RyZWFtczpcbiAgICAgICAgLy8gMS0gY29uZmlndXJlIHBsYXllciBidWZmZXJpbmcgcHJvcGVydGllcyBhY2NvcmRpbmcgdG8gdGFyZ2V0IGxpdmUgZGVsYXlcbiAgICAgICAgLy8gMi0gYWRhcHQgbGl2ZSBkZWxheSBhbmQgdGhlbiBidWZmZXJzIGxlbmd0aCBpbiBjYXNlIHRpbWVTaGlmdEJ1ZmZlckRlcHRoIGlzIHRvbyBzbWFsbCBjb21wYXJlZCB0byB0YXJnZXQgbGl2ZSBkZWxheSAoc2VlIFBsYXliYWNrQ29udHJvbGxlci5jb21wdXRlTGl2ZURlbGF5KCkpXG4gICAgICAgIGlmIChtYW5pZmVzdC50eXBlID09PSAnZHluYW1pYycpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRMaXZlRGVsYXkgPSBtZWRpYVBsYXllck1vZGVsLmdldExpdmVEZWxheSgpO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRMaXZlRGVsYXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXZlRGVsYXlGcmFnbWVudENvdW50ID0gc2V0dGluZ3MuZ2V0KCkuc3RyZWFtaW5nLmxpdmVEZWxheUZyYWdtZW50Q291bnQgIT09IG51bGwgJiYgIWlzTmFOKHNldHRpbmdzLmdldCgpLnN0cmVhbWluZy5saXZlRGVsYXlGcmFnbWVudENvdW50KSA/IHNldHRpbmdzLmdldCgpLnN0cmVhbWluZy5saXZlRGVsYXlGcmFnbWVudENvdW50IDogNDtcbiAgICAgICAgICAgICAgICB0YXJnZXRMaXZlRGVsYXkgPSBzZWdtZW50RHVyYXRpb24gKiBsaXZlRGVsYXlGcmFnbWVudENvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRhcmdldERlbGF5Q2FwcGluZyA9IE1hdGgubWF4KG1hbmlmZXN0LnRpbWVTaGlmdEJ1ZmZlckRlcHRoIC0gMTAvKkVORF9PRl9QTEFZTElTVF9QQURESU5HKi8sIG1hbmlmZXN0LnRpbWVTaGlmdEJ1ZmZlckRlcHRoIC8gMik7XG4gICAgICAgICAgICBsZXQgbGl2ZURlbGF5ID0gTWF0aC5taW4odGFyZ2V0RGVsYXlDYXBwaW5nLCB0YXJnZXRMaXZlRGVsYXkpO1xuICAgICAgICAgICAgLy8gQ29uc2lkZXIgYSBtYXJnaW4gb2Ygb25lIHNlZ21lbnQgaW4gb3JkZXIgdG8gYXZvaWQgUHJlY29uZGl0aW9uIEZhaWxlZCBlcnJvcnMgKDQxMiksIGZvciBleGFtcGxlIGlmIGF1ZGlvIGFuZCB2aWRlbyBhcmUgbm90IGNvcnJlY3RseSBzeW5jaHJvbml6ZWRcbiAgICAgICAgICAgIGxldCBidWZmZXJUaW1lID0gbGl2ZURlbGF5IC0gc2VnbWVudER1cmF0aW9uO1xuICAgICAgICAgICAgc2V0dGluZ3MudXBkYXRlKHtcbiAgICAgICAgICAgICAgICAnc3RyZWFtaW5nJzoge1xuICAgICAgICAgICAgICAgICAgICAnbGl2ZURlbGF5JzogbGl2ZURlbGF5LFxuICAgICAgICAgICAgICAgICAgICAnc3RhYmxlQnVmZmVyVGltZSc6IGJ1ZmZlclRpbWUsXG4gICAgICAgICAgICAgICAgICAgICdidWZmZXJUaW1lQXRUb3BRdWFsaXR5JzogYnVmZmVyVGltZSxcbiAgICAgICAgICAgICAgICAgICAgJ2J1ZmZlclRpbWVBdFRvcFF1YWxpdHlMb25nRm9ybSc6IGJ1ZmZlclRpbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlbGV0ZSBDb250ZW50IFByb3RlY3Rpb24gdW5kZXIgcm9vdCBtYW5pZmVzdCBub2RlXG4gICAgICAgIGRlbGV0ZSBtYW5pZmVzdC5Db250ZW50UHJvdGVjdGlvbjtcbiAgICAgICAgZGVsZXRlIG1hbmlmZXN0LkNvbnRlbnRQcm90ZWN0aW9uX2FzQXJyYXk7XG5cbiAgICAgICAgLy8gSW4gY2FzZSBvZiBWT0Qgc3RyZWFtcywgY2hlY2sgaWYgc3RhcnQgdGltZSBpcyBncmVhdGVyIHRoYW4gMFxuICAgICAgICAvLyBUaGVuIGRldGVybWluZSB0aW1lc3RhbXAgb2Zmc2V0IGFjY29yZGluZyB0byBoaWdoZXIgYXVkaW8vdmlkZW8gc3RhcnQgdGltZVxuICAgICAgICAvLyAodXNlIGNhc2UgPSBsaXZlIHN0cmVhbSBkZWxpbmVhcml6YXRpb24pXG4gICAgICAgIGlmIChtYW5pZmVzdC50eXBlID09PSAnc3RhdGljJykge1xuICAgICAgICAgICAgLy8gSW4gY2FzZSBvZiBzdGFydC1vdmVyIHN0cmVhbSBhbmQgbWFuaWZlc3QgcmVsb2FkaW5nIChkdWUgdG8gdHJhY2sgc3dpdGNoKVxuICAgICAgICAgICAgLy8gd2UgY29uc2lkZXIgcHJldmlvdXMgdGltZXN0YW1wT2Zmc2V0IHRvIGtlZXAgdGltZWxpbmVzIHN5bmNocm9uaXplZFxuICAgICAgICAgICAgdmFyIHByZXZNYW5pZmVzdCA9IG1hbmlmZXN0TW9kZWwuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmIChwcmV2TWFuaWZlc3QgJiYgcHJldk1hbmlmZXN0LnRpbWVzdGFtcE9mZnNldCkge1xuICAgICAgICAgICAgICAgIHRpbWVzdGFtcE9mZnNldCA9IHByZXZNYW5pZmVzdC50aW1lc3RhbXBPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhZGFwdGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWRhcHRhdGlvbnNbaV0uY29udGVudFR5cGUgPT09IGNvbnN0YW50cy5BVURJTyB8fCBhZGFwdGF0aW9uc1tpXS5jb250ZW50VHlwZSA9PT0gY29uc3RhbnRzLlZJREVPKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50cyA9IGFkYXB0YXRpb25zW2ldLlNlZ21lbnRUZW1wbGF0ZS5TZWdtZW50VGltZWxpbmUuU19hc0FycmF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gc2VnbWVudHNbMF0udCAvIGFkYXB0YXRpb25zW2ldLlNlZ21lbnRUZW1wbGF0ZS50aW1lc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGltZXN0YW1wT2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXBPZmZzZXQgPSBzdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXBPZmZzZXQgPSBNYXRoLm1pbih0aW1lc3RhbXBPZmZzZXQsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb3JyZWN0IGNvbnRlbnQgZHVyYXRpb24gYWNjb3JkaW5nIHRvIG1pbmltdW0gYWRhcHRhdGlvbidzIHNlZ21lbnQgdGltZWxpbmUgZHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIG9yZGVyIHRvIGZvcmNlIDx2aWRlbz4gZWxlbWVudCBzZW5kaW5nICdlbmRlZCcgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmlmZXN0Lm1lZGlhUHJlc2VudGF0aW9uRHVyYXRpb24gPSBNYXRoLm1pbihtYW5pZmVzdC5tZWRpYVByZXNlbnRhdGlvbkR1cmF0aW9uLCBhZGFwdGF0aW9uc1tpXS5TZWdtZW50VGVtcGxhdGUuU2VnbWVudFRpbWVsaW5lLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFBhdGNoIHNlZ21lbnQgdGVtcGxhdGVzIHRpbWVzdGFtcHMgYW5kIGRldGVybWluZSBwZXJpb2Qgc3RhcnQgdGltZSAoc2luY2UgYXVkaW8vdmlkZW8gc2hvdWxkIG5vdCBiZSBhbGlnbmVkIHRvIDApXG4gICAgICAgICAgICBpZiAodGltZXN0YW1wT2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIG1hbmlmZXN0LnRpbWVzdGFtcE9mZnNldCA9IHRpbWVzdGFtcE9mZnNldDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWRhcHRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMgPSBhZGFwdGF0aW9uc1tpXS5TZWdtZW50VGVtcGxhdGUuU2VnbWVudFRpbWVsaW5lLlNfYXNBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHNlZ21lbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZ21lbnRzW2pdLnRNYW5pZmVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzW2pdLnRNYW5pZmVzdCA9IHNlZ21lbnRzW2pdLnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50c1tqXS50IC09ICh0aW1lc3RhbXBPZmZzZXQgKiBhZGFwdGF0aW9uc1tpXS5TZWdtZW50VGVtcGxhdGUudGltZXNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYWRhcHRhdGlvbnNbaV0uY29udGVudFR5cGUgPT09IGNvbnN0YW50cy5BVURJTyB8fCBhZGFwdGF0aW9uc1tpXS5jb250ZW50VHlwZSA9PT0gY29uc3RhbnRzLlZJREVPKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJpb2Quc3RhcnQgPSBNYXRoLm1heChzZWdtZW50c1swXS50LCBwZXJpb2Quc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRhcHRhdGlvbnNbaV0uU2VnbWVudFRlbXBsYXRlLnByZXNlbnRhdGlvblRpbWVPZmZzZXQgPSBwZXJpb2Quc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGVyaW9kLnN0YXJ0IC89IG1hbmlmZXN0LnRpbWVzY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZsb29yIHRoZSBkdXJhdGlvbiB0byBnZXQgYXJvdW5kIHByZWNpc2lvbiBkaWZmZXJlbmNlcyBiZXR3ZWVuIHNlZ21lbnRzIHRpbWVzdGFtcHMgYW5kIE1TRSBidWZmZXIgdGltZXN0YW1wc1xuICAgICAgICAvLyBhbmQgdGhlbiBhdm9pZCAnZW5kZWQnIGV2ZW50IG5vdCBiZWluZyByYWlzZWRcbiAgICAgICAgbWFuaWZlc3QubWVkaWFQcmVzZW50YXRpb25EdXJhdGlvbiA9IE1hdGguZmxvb3IobWFuaWZlc3QubWVkaWFQcmVzZW50YXRpb25EdXJhdGlvbiAqIDEwMDApIC8gMTAwMDtcbiAgICAgICAgcGVyaW9kLmR1cmF0aW9uID0gbWFuaWZlc3QubWVkaWFQcmVzZW50YXRpb25EdXJhdGlvbjtcblxuICAgICAgICByZXR1cm4gbWFuaWZlc3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VET00oZGF0YSkge1xuICAgICAgICBsZXQgeG1sRG9jID0gbnVsbDtcblxuICAgICAgICBpZiAod2luZG93LkRPTVBhcnNlcikge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IHdpbmRvdy5ET01QYXJzZXIoKTtcblxuICAgICAgICAgICAgeG1sRG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhkYXRhLCAndGV4dC94bWwnKTtcbiAgICAgICAgICAgIGlmICh4bWxEb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGFyc2luZyB0aGUgbWFuaWZlc3QgZmFpbGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geG1sRG9jO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1hdGNoZXJzKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJcm9uKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnRlcm5hbFBhcnNlKGRhdGEpIHtcbiAgICAgICAgbGV0IHhtbERvYyA9IG51bGw7XG4gICAgICAgIGxldCBtYW5pZmVzdCA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgICAgIC8vIFBhcnNlIHRoZSBNU1MgWE1MIG1hbmlmZXN0XG4gICAgICAgIHhtbERvYyA9IHBhcnNlRE9NKGRhdGEpO1xuXG4gICAgICAgIGNvbnN0IHhtbFBhcnNlVGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgICBpZiAoeG1sRG9jID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnZlcnQgTVNTIG1hbmlmZXN0IGludG8gREFTSCBtYW5pZmVzdFxuICAgICAgICBtYW5pZmVzdCA9IHByb2Nlc3NNYW5pZmVzdCh4bWxEb2MsIG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIGNvbnN0IG1zczJkYXNoVGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblxuICAgICAgICBsb2dnZXIuaW5mbygnUGFyc2luZyBjb21wbGV0ZTogKHhtbFBhcnNpbmc6ICcgKyAoeG1sUGFyc2VUaW1lIC0gc3RhcnRUaW1lKS50b1ByZWNpc2lvbigzKSArICdtcywgbXNzMmRhc2g6ICcgKyAobXNzMmRhc2hUaW1lIC0geG1sUGFyc2VUaW1lKS50b1ByZWNpc2lvbigzKSArICdtcywgdG90YWw6ICcgKyAoKG1zczJkYXNoVGltZSAtIHN0YXJ0VGltZSkgLyAxMDAwKS50b1ByZWNpc2lvbigzKSArICdzKScpO1xuXG4gICAgICAgIHJldHVybiBtYW5pZmVzdDtcbiAgICB9XG5cbiAgICBpbnN0YW5jZSA9IHtcbiAgICAgICAgcGFyc2U6IGludGVybmFsUGFyc2UsXG4gICAgICAgIGdldE1hdGNoZXJzOiBnZXRNYXRjaGVycyxcbiAgICAgICAgZ2V0SXJvbjogZ2V0SXJvblxuICAgIH07XG5cbiAgICBzZXR1cCgpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5Nc3NQYXJzZXIuX19kYXNoanNfZmFjdG9yeV9uYW1lID0gJ01zc1BhcnNlcic7XG5leHBvcnQgZGVmYXVsdCBkYXNoanMuRmFjdG9yeU1ha2VyLmdldENsYXNzRmFjdG9yeShNc3NQYXJzZXIpOyAvKiBqc2hpbnQgaWdub3JlOmxpbmUgKi9cbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5pbXBvcnQgRXZlbnRzQmFzZSBmcm9tICcuLi9jb3JlL2V2ZW50cy9FdmVudHNCYXNlJztcbi8qKlxuICogQGNsYXNzXG4gKiBAaW1wbGVtZW50cyBFdmVudHNCYXNlXG4gKi9cbmNsYXNzIE1lZGlhUGxheWVyRXZlbnRzIGV4dGVuZHMgRXZlbnRzQmFzZSB7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUHVibGljIGZhY2luZyBleHRlcm5hbCBldmVudHMgdG8gYmUgdXNlZCB3aGVuIGRldmVsb3BpbmcgYSBwbGF5ZXIgdGhhdCBpbXBsZW1lbnRzIGRhc2guanMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBwbGF5YmFjayB3aWxsIG5vdCBzdGFydCB5ZXRcbiAgICAgICAgICogYXMgdGhlIE1QRCdzIGF2YWlsYWJpbGl0eVN0YXJ0VGltZSBpcyBpbiB0aGUgZnV0dXJlLlxuICAgICAgICAgKiBDaGVjayBkZWxheSBwcm9wZXJ0eSBpbiBwYXlsb2FkIHRvIGRldGVybWluZSB0aW1lIGJlZm9yZSBwbGF5YmFjayB3aWxsIHN0YXJ0LlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjQVNUX0lOX0ZVVFVSRVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5BU1RfSU5fRlVUVVJFID0gJ2FzdEluRnV0dXJlJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIHdoZW4gdGhlIHZpZGVvIGVsZW1lbnQncyBidWZmZXIgc3RhdGUgY2hhbmdlcyB0byBzdGFsbGVkLlxuICAgICAgICAgKiBDaGVjayBtZWRpYVR5cGUgaW4gcGF5bG9hZCB0byBkZXRlcm1pbmUgdHlwZSAoVmlkZW8sIEF1ZGlvLCBGcmFnbWVudGVkVGV4dCkuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNCVUZGRVJfRU1QVFlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuQlVGRkVSX0VNUFRZID0gJ2J1ZmZlclN0YWxsZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgdmlkZW8gZWxlbWVudCdzIGJ1ZmZlciBzdGF0ZSBjaGFuZ2VzIHRvIGxvYWRlZC5cbiAgICAgICAgICogQ2hlY2sgbWVkaWFUeXBlIGluIHBheWxvYWQgdG8gZGV0ZXJtaW5lIHR5cGUgKFZpZGVvLCBBdWRpbywgRnJhZ21lbnRlZFRleHQpLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjQlVGRkVSX0xPQURFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5CVUZGRVJfTE9BREVEID0gJ2J1ZmZlckxvYWRlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCB3aGVuIHRoZSB2aWRlbyBlbGVtZW50J3MgYnVmZmVyIHN0YXRlIGNoYW5nZXMsIGVpdGhlciBzdGFsbGVkIG9yIGxvYWRlZC4gQ2hlY2sgcGF5bG9hZCBmb3Igc3RhdGUuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNCVUZGRVJfTEVWRUxfU1RBVEVfQ0hBTkdFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5CVUZGRVJfTEVWRUxfU1RBVEVfQ0hBTkdFRCA9ICdidWZmZXJTdGF0ZUNoYW5nZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGVyZSBpcyBhbiBlcnJvciBmcm9tIHRoZSBlbGVtZW50IG9yIE1TRSBzb3VyY2UgYnVmZmVyLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjRVJST1JcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRVJST1IgPSAnZXJyb3InO1xuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIHdoZW4gYSBmcmFnbWVudCBkb3dubG9hZCBoYXMgY29tcGxldGVkLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjRlJBR01FTlRfTE9BRElOR19DT01QTEVURURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRlJBR01FTlRfTE9BRElOR19DT01QTEVURUQgPSAnZnJhZ21lbnRMb2FkaW5nQ29tcGxldGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIHdoZW4gYSBwYXJ0aWFsIGZyYWdtZW50IGRvd25sb2FkIGhhcyBjb21wbGV0ZWQuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNGUkFHTUVOVF9MT0FESU5HX1BST0dSRVNTXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkZSQUdNRU5UX0xPQURJTkdfUFJPR1JFU1MgPSAnZnJhZ21lbnRMb2FkaW5nUHJvZ3Jlc3MnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIHdoZW4gYSBmcmFnbWVudCBkb3dubG9hZCBoYXMgc3RhcnRlZC5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI0ZSQUdNRU5UX0xPQURJTkdfU1RBUlRFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5GUkFHTUVOVF9MT0FESU5HX1NUQVJURUQgPSAnZnJhZ21lbnRMb2FkaW5nU3RhcnRlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCB3aGVuIGEgZnJhZ21lbnQgZG93bmxvYWQgaXMgYWJhbmRvbmVkIGR1ZSB0byBkZXRlY3Rpb24gb2Ygc2xvdyBkb3dubG9hZCBiYXNlIG9uIHRoZSBBQlIgYWJhbmRvbiBydWxlLi5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI0ZSQUdNRU5UX0xPQURJTkdfQUJBTkRPTkVEXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkZSQUdNRU5UX0xPQURJTkdfQUJBTkRPTkVEID0gJ2ZyYWdtZW50TG9hZGluZ0FiYW5kb25lZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCB3aGVuIHtAbGluayBtb2R1bGU6RGVidWd9IGxvZ2dlciBtZXRob2RzIGFyZSBjYWxsZWQuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNMT0dcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuTE9HID0gJ2xvZyc7XG5cbiAgICAgICAgLy9UT0RPIHJlZmFjdG9yIHdpdGggaW50ZXJuYWwgZXZlbnRcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCB3aGVuIHRoZSBtYW5pZmVzdCBsb2FkIGlzIGNvbXBsZXRlXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNNQU5JRkVTVF9MT0FERURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuTUFOSUZFU1RfTE9BREVEID0gJ21hbmlmZXN0TG9hZGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIGFueXRpbWUgdGhlcmUgaXMgYSBjaGFuZ2UgdG8gdGhlIG92ZXJhbGwgbWV0cmljcy5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI01FVFJJQ1NfQ0hBTkdFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5NRVRSSUNTX0NIQU5HRUQgPSAnbWV0cmljc0NoYW5nZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhbiBpbmRpdmlkdWFsIG1ldHJpYyBpcyBhZGRlZCwgdXBkYXRlZCBvciBjbGVhcmVkLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjTUVUUklDX0NIQU5HRURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuTUVUUklDX0NIQU5HRUQgPSAnbWV0cmljQ2hhbmdlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCBldmVyeSB0aW1lIGEgbmV3IG1ldHJpYyBpcyBhZGRlZC5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI01FVFJJQ19BRERFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5NRVRSSUNfQURERUQgPSAnbWV0cmljQWRkZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgZXZlcnkgdGltZSBhIG1ldHJpYyBpcyB1cGRhdGVkLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjTUVUUklDX1VQREFURURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuTUVUUklDX1VQREFURUQgPSAnbWV0cmljVXBkYXRlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCBhdCB0aGUgc3RyZWFtIGVuZCBvZiBhIHBlcmlvZC5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1BFUklPRF9TV0lUQ0hfQ09NUExFVEVEXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlBFUklPRF9TV0lUQ0hfQ09NUExFVEVEID0gJ3BlcmlvZFN3aXRjaENvbXBsZXRlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCB3aGVuIGEgbmV3IHBlcmlvZCBzdGFydHMuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNQRVJJT0RfU1dJVENIX1NUQVJURURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUEVSSU9EX1NXSVRDSF9TVEFSVEVEID0gJ3BlcmlvZFN3aXRjaFN0YXJ0ZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhbiBBQlIgdXAgL2Rvd24gc3dpdGNoIGlzIGluaXRpYXRlZDsgZWl0aGVyIGJ5IHVzZXIgaW4gbWFudWFsIG1vZGUgb3IgYXV0byBtb2RlIHZpYSBBQlIgcnVsZXMuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNRVUFMSVRZX0NIQU5HRV9SRVFVRVNURURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUVVBTElUWV9DSEFOR0VfUkVRVUVTVEVEID0gJ3F1YWxpdHlDaGFuZ2VSZXF1ZXN0ZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgbmV3IEFCUiBxdWFsaXR5IGlzIGJlaW5nIHJlbmRlcmVkIG9uLXNjcmVlbi5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1FVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlFVQUxJVFlfQ0hBTkdFX1JFTkRFUkVEID0gJ3F1YWxpdHlDaGFuZ2VSZW5kZXJlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCB3aGVuIHRoZSBuZXcgdHJhY2sgaXMgYmVpbmcgcmVuZGVyZWQuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNUUkFDS19DSEFOR0VfUkVOREVSRURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuVFJBQ0tfQ0hBTkdFX1JFTkRFUkVEID0gJ3RyYWNrQ2hhbmdlUmVuZGVyZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgc291cmNlIGlzIHNldHVwIGFuZCByZWFkeS5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1NPVVJDRV9JTklUSUFMSVpFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5TT1VSQ0VfSU5JVElBTElaRUQgPSAnc291cmNlSW5pdGlhbGl6ZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhIHN0cmVhbSAocGVyaW9kKSBpcyBiZWluZyBsb2FkZWRcbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1NUUkVBTV9JTklUSUFMSVpJTkdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuU1RSRUFNX0lOSVRJQUxJWklORyA9ICdzdHJlYW1Jbml0aWFsaXppbmcnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhIHN0cmVhbSAocGVyaW9kKSBpcyBsb2FkZWRcbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1NUUkVBTV9JTklUSUFMSVpFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5TVFJFQU1fSU5JVElBTElaRUQgPSAnc3RyZWFtSW5pdGlhbGl6ZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgcGxheWVyIGhhcyBiZWVuIHJlc2V0LlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjU1RSRUFNX1RFQVJET1dOX0NPTVBMRVRFXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlNUUkVBTV9URUFSRE9XTl9DT01QTEVURSA9ICdzdHJlYW1UZWFyZG93bkNvbXBsZXRlJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIG9uY2UgYWxsIHRleHQgdHJhY2tzIGRldGVjdGVkIGluIHRoZSBNUEQgYXJlIGFkZGVkIHRvIHRoZSB2aWRlbyBlbGVtZW50LlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjVEVYVF9UUkFDS1NfQURERURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuVEVYVF9UUkFDS1NfQURERUQgPSAnYWxsVGV4dFRyYWNrc0FkZGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIHdoZW4gYSB0ZXh0IHRyYWNrIGlzIGFkZGVkIHRvIHRoZSB2aWRlbyBlbGVtZW50J3MgVGV4dFRyYWNrTGlzdFxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjVEVYVF9UUkFDS19BRERFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5URVhUX1RSQUNLX0FEREVEID0gJ3RleHRUcmFja0FkZGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHJpZ2dlcmVkIHdoZW4gYSB0dG1sIGNodW5rIGlzIHBhcnNlZC5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1RUTUxfUEFSU0VEXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlRUTUxfUEFSU0VEID0gJ3R0bWxQYXJzZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhIHR0bWwgY2h1bmsgaGFzIHRvIGJlIHBhcnNlZC5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1RUTUxfVE9fUEFSU0VcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuVFRNTF9UT19QQVJTRSA9ICd0dG1sVG9QYXJzZSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyaWdnZXJlZCB3aGVuIGEgY2FwdGlvbiBpcyByZW5kZXJlZC5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI0NBUFRJT05fUkVOREVSRURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuQ0FQVElPTl9SRU5ERVJFRCA9ICdjYXB0aW9uUmVuZGVyZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyZWQgd2hlbiB0aGUgY2FwdGlvbiBjb250YWluZXIgaXMgcmVzaXplZC5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI0NBUFRJT05fQ09OVEFJTkVSX1JFU0laRVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5DQVBUSU9OX0NPTlRBSU5FUl9SRVNJWkUgPSAnY2FwdGlvbkNvbnRhaW5lclJlc2l6ZSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbnQgd2hlbiBlbm91Z2ggZGF0YSBpcyBhdmFpbGFibGUgdGhhdCB0aGUgbWVkaWEgY2FuIGJlIHBsYXllZCxcbiAgICAgICAgICogYXQgbGVhc3QgZm9yIGEgY291cGxlIG9mIGZyYW1lcy4gIFRoaXMgY29ycmVzcG9uZHMgdG8gdGhlXG4gICAgICAgICAqIEhBVkVfRU5PVUdIX0RBVEEgcmVhZHlTdGF0ZS5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI0NBTl9QTEFZXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkNBTl9QTEFZID0gJ2NhblBsYXknO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZW50IHdoZW4gcGxheWJhY2sgY29tcGxldGVzLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjUExBWUJBQ0tfRU5ERURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUExBWUJBQ0tfRU5ERUQgPSAncGxheWJhY2tFbmRlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbnQgd2hlbiBhbiBlcnJvciBvY2N1cnMuICBUaGUgZWxlbWVudCdzIGVycm9yXG4gICAgICAgICAqIGF0dHJpYnV0ZSBjb250YWlucyBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjUExBWUJBQ0tfRVJST1JcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUExBWUJBQ0tfRVJST1IgPSAncGxheWJhY2tFcnJvcic7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbnQgd2hlbiBwbGF5YmFjayBpcyBub3QgYWxsb3dlZCAoZm9yIGV4YW1wbGUgaWYgdXNlciBnZXN0dXJlIGlzIG5lZWRlZCkuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNQTEFZQkFDS19OT1RfQUxMT1dFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5QTEFZQkFDS19OT1RfQUxMT1dFRCA9ICdwbGF5YmFja05vdEFsbG93ZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWVkaWEncyBtZXRhZGF0YSBoYXMgZmluaXNoZWQgbG9hZGluZzsgYWxsIGF0dHJpYnV0ZXMgbm93XG4gICAgICAgICAqIGNvbnRhaW4gYXMgbXVjaCB1c2VmdWwgaW5mb3JtYXRpb24gYXMgdGhleSdyZSBnb2luZyB0by5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1BMQVlCQUNLX01FVEFEQVRBX0xPQURFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5QTEFZQkFDS19NRVRBREFUQV9MT0FERUQgPSAncGxheWJhY2tNZXRhRGF0YUxvYWRlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbnQgd2hlbiBwbGF5YmFjayBpcyBwYXVzZWQuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNQTEFZQkFDS19QQVVTRURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUExBWUJBQ0tfUEFVU0VEID0gJ3BsYXliYWNrUGF1c2VkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VudCB3aGVuIHRoZSBtZWRpYSBiZWdpbnMgdG8gcGxheSAoZWl0aGVyIGZvciB0aGUgZmlyc3QgdGltZSwgYWZ0ZXIgaGF2aW5nIGJlZW4gcGF1c2VkLFxuICAgICAgICAgKiBvciBhZnRlciBlbmRpbmcgYW5kIHRoZW4gcmVzdGFydGluZykuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNQTEFZQkFDS19QTEFZSU5HXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlBMQVlCQUNLX1BMQVlJTkcgPSAncGxheWJhY2tQbGF5aW5nJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VudCBwZXJpb2RpY2FsbHkgdG8gaW5mb3JtIGludGVyZXN0ZWQgcGFydGllcyBvZiBwcm9ncmVzcyBkb3dubG9hZGluZ1xuICAgICAgICAgKiB0aGUgbWVkaWEuIEluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50IGFtb3VudCBvZiB0aGUgbWVkaWEgdGhhdCBoYXNcbiAgICAgICAgICogYmVlbiBkb3dubG9hZGVkIGlzIGF2YWlsYWJsZSBpbiB0aGUgbWVkaWEgZWxlbWVudCdzIGJ1ZmZlcmVkIGF0dHJpYnV0ZS5cbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1BMQVlCQUNLX1BST0dSRVNTXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlBMQVlCQUNLX1BST0dSRVNTID0gJ3BsYXliYWNrUHJvZ3Jlc3MnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZW50IHdoZW4gdGhlIHBsYXliYWNrIHNwZWVkIGNoYW5nZXMuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNQTEFZQkFDS19SQVRFX0NIQU5HRURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gJ3BsYXliYWNrUmF0ZUNoYW5nZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZW50IHdoZW4gYSBzZWVrIG9wZXJhdGlvbiBjb21wbGV0ZXMuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNQTEFZQkFDS19TRUVLRURcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUExBWUJBQ0tfU0VFS0VEID0gJ3BsYXliYWNrU2Vla2VkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VudCB3aGVuIGEgc2VlayBvcGVyYXRpb24gYmVnaW5zLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjUExBWUJBQ0tfU0VFS0lOR1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5QTEFZQkFDS19TRUVLSU5HID0gJ3BsYXliYWNrU2Vla2luZyc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbnQgd2hlbiBhIHNlZWsgb3BlcmF0aW9uIGhhcyBiZWVuIGFza2VkLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjUExBWUJBQ0tfU0VFS19BU0tFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5QTEFZQkFDS19TRUVLX0FTS0VEID0gJ3BsYXliYWNrU2Vla0Fza2VkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VudCB3aGVuIHRoZSB2aWRlbyBlbGVtZW50IHJlcG9ydHMgc3RhbGxlZFxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjUExBWUJBQ0tfU1RBTExFRFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5QTEFZQkFDS19TVEFMTEVEID0gJ3BsYXliYWNrU3RhbGxlZCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbnQgd2hlbiBwbGF5YmFjayBvZiB0aGUgbWVkaWEgc3RhcnRzIGFmdGVyIGhhdmluZyBiZWVuIHBhdXNlZDtcbiAgICAgICAgICogdGhhdCBpcywgd2hlbiBwbGF5YmFjayBpcyByZXN1bWVkIGFmdGVyIGEgcHJpb3IgcGF1c2UgZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNQTEFZQkFDS19TVEFSVEVEXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlBMQVlCQUNLX1NUQVJURUQgPSAncGxheWJhY2tTdGFydGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRpbWUgaW5kaWNhdGVkIGJ5IHRoZSBlbGVtZW50J3MgY3VycmVudFRpbWUgYXR0cmlidXRlIGhhcyBjaGFuZ2VkLlxuICAgICAgICAgKiBAZXZlbnQgTWVkaWFQbGF5ZXJFdmVudHMjUExBWUJBQ0tfVElNRV9VUERBVEVEXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlBMQVlCQUNLX1RJTUVfVVBEQVRFRCA9ICdwbGF5YmFja1RpbWVVcGRhdGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VudCB3aGVuIHRoZSBtZWRpYSBwbGF5YmFjayBoYXMgc3RvcHBlZCBiZWNhdXNlIG9mIGEgdGVtcG9yYXJ5IGxhY2sgb2YgZGF0YS5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IE1lZGlhUGxheWVyRXZlbnRzI1BMQVlCQUNLX1dBSVRJTkdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuUExBWUJBQ0tfV0FJVElORyA9ICdwbGF5YmFja1dhaXRpbmcnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYW5pZmVzdCB2YWxpZGl0eSBjaGFuZ2VkIC0gQXMgYSByZXN1bHQgb2YgYW4gTVBEIHZhbGlkaXR5IGV4cGlyYXRpb24gZXZlbnQuXG4gICAgICAgICAqIEBldmVudCBNZWRpYVBsYXllckV2ZW50cyNNQU5JRkVTVF9WQUxJRElUWV9DSEFOR0VEXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLk1BTklGRVNUX1ZBTElESVRZX0NIQU5HRUQgPSAnbWFuaWZlc3RWYWxpZGl0eUNoYW5nZWQnO1xuICAgIH1cbn1cblxubGV0IG1lZGlhUGxheWVyRXZlbnRzID0gbmV3IE1lZGlhUGxheWVyRXZlbnRzKCk7XG5leHBvcnQgZGVmYXVsdCBtZWRpYVBsYXllckV2ZW50cztcbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG4vKipcbiAqIEBjbGFzc1xuICogQGlnbm9yZVxuICovXG5jbGFzcyBEYXNoSlNFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSwgZGF0YSkge1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlIHx8IG51bGw7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YSB8fCBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGFzaEpTRXJyb3I7IiwiLyoqXG4gKiBUaGUgY29weXJpZ2h0IGluIHRoaXMgc29mdHdhcmUgaXMgYmVpbmcgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBMaWNlbnNlLFxuICogaW5jbHVkZWQgYmVsb3cuIFRoaXMgc29mdHdhcmUgbWF5IGJlIHN1YmplY3QgdG8gb3RoZXIgdGhpcmQgcGFydHkgYW5kIGNvbnRyaWJ1dG9yXG4gKiByaWdodHMsIGluY2x1ZGluZyBwYXRlbnQgcmlnaHRzLCBhbmQgbm8gc3VjaCByaWdodHMgYXJlIGdyYW50ZWQgdW5kZXIgdGhpcyBsaWNlbnNlLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMywgRGFzaCBJbmR1c3RyeSBGb3J1bS5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbiAqIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICogIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG4gKiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgRGFzaCBJbmR1c3RyeSBGb3J1bSBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmVcbiAqICB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBBUyBJUyBBTkQgQU5ZXG4gKiAgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC5cbiAqICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULFxuICogIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVRcbiAqICBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SXG4gKiAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksXG4gKiAgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiAgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBpZ25vcmVcbiAqL1xuY2xhc3MgRGF0YUNodW5rIHtcbiAgICAvL1JlcHJlc2VudHMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IGtlZXAgYWxsIHRoZSBuZWNlc3NhcnkgaW5mbyBhYm91dCBhIHNpbmdsZSBpbml0L21lZGlhIHNlZ21lbnRcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdHJlYW1JZCA9IG51bGw7XG4gICAgICAgIHRoaXMubWVkaWFJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWdtZW50VHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMucXVhbGl0eSA9IE5hTjtcbiAgICAgICAgdGhpcy5pbmRleCA9IE5hTjtcbiAgICAgICAgdGhpcy5ieXRlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBOYU47XG4gICAgICAgIHRoaXMuZW5kID0gTmFOO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gTmFOO1xuICAgICAgICB0aGlzLnJlcHJlc2VudGF0aW9uSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmVuZEZyYWdtZW50ID0gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFDaHVuazsiLCIvKipcbiAqIFRoZSBjb3B5cmlnaHQgaW4gdGhpcyBzb2Z0d2FyZSBpcyBiZWluZyBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UsXG4gKiBpbmNsdWRlZCBiZWxvdy4gVGhpcyBzb2Z0d2FyZSBtYXkgYmUgc3ViamVjdCB0byBvdGhlciB0aGlyZCBwYXJ0eSBhbmQgY29udHJpYnV0b3JcbiAqIHJpZ2h0cywgaW5jbHVkaW5nIHBhdGVudCByaWdodHMsIGFuZCBubyBzdWNoIHJpZ2h0cyBhcmUgZ3JhbnRlZCB1bmRlciB0aGlzIGxpY2Vuc2UuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLCBEYXNoIEluZHVzdHJ5IEZvcnVtLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gKiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAqICBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBEYXNoIEluZHVzdHJ5IEZvcnVtIG5vciB0aGUgbmFtZXMgb2YgaXRzXG4gKiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZVxuICogIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIEFTIElTIEFORCBBTllcbiAqICBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELlxuICogIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsXG4gKiAgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVFxuICogIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1JcbiAqICBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSxcbiAqICBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuXG5pbXBvcnQgeyBIVFRQUmVxdWVzdCB9IGZyb20gJy4uL3ZvL21ldHJpY3MvSFRUUFJlcXVlc3QnO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQGlnbm9yZVxuICovXG5jbGFzcyBGcmFnbWVudFJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuICAgICAgICB0aGlzLmFjdGlvbiA9IEZyYWdtZW50UmVxdWVzdC5BQ1RJT05fRE9XTkxPQUQ7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gTmFOO1xuICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMubWVkaWFJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IE5hTjtcbiAgICAgICAgdGhpcy50aW1lc2NhbGUgPSBOYU47XG4gICAgICAgIHRoaXMucmFuZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLnVybCA9IHVybCB8fCBudWxsO1xuICAgICAgICB0aGlzLnNlcnZpY2VMb2NhdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMucmVxdWVzdFN0YXJ0RGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlyc3RCeXRlRGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMucmVxdWVzdEVuZERhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnF1YWxpdHkgPSBOYU47XG4gICAgICAgIHRoaXMuaW5kZXggPSBOYU47XG4gICAgICAgIHRoaXMuYXZhaWxhYmlsaXR5U3RhcnRUaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdmFpbGFiaWxpdHlFbmRUaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy53YWxsU3RhcnRUaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5ieXRlc0xvYWRlZCA9IE5hTjtcbiAgICAgICAgdGhpcy5ieXRlc1RvdGFsID0gTmFOO1xuICAgICAgICB0aGlzLmRlbGF5TG9hZGluZ1RpbWUgPSBOYU47XG4gICAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgdGhpcy5yZXByZXNlbnRhdGlvbklkID0gbnVsbDtcbiAgICB9XG5cbiAgICBpc0luaXRpYWxpemF0aW9uUmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnR5cGUgJiYgdGhpcy50eXBlID09PSBIVFRQUmVxdWVzdC5JTklUX1NFR01FTlRfVFlQRSk7XG4gICAgfVxuXG4gICAgc2V0SW5mbyhpbmZvKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IGluZm8gJiYgaW5mby5pbml0ID8gSFRUUFJlcXVlc3QuSU5JVF9TRUdNRU5UX1RZUEUgOiBIVFRQUmVxdWVzdC5NRURJQV9TRUdNRU5UX1RZUEU7XG4gICAgICAgIHRoaXMudXJsID0gaW5mbyAmJiBpbmZvLnVybCA/IGluZm8udXJsIDogbnVsbDtcbiAgICAgICAgdGhpcy5yYW5nZSA9IGluZm8gJiYgaW5mby5yYW5nZSA/IGluZm8ucmFuZ2Uuc3RhcnQgKyAnLScgKyBpbmZvLnJhbmdlLmVuZCA6IG51bGw7XG4gICAgICAgIHRoaXMubWVkaWFUeXBlID0gaW5mbyAmJiBpbmZvLm1lZGlhVHlwZSA/IGluZm8ubWVkaWFUeXBlIDogbnVsbDtcbiAgICB9XG59XG5cbkZyYWdtZW50UmVxdWVzdC5BQ1RJT05fRE9XTkxPQUQgPSAnZG93bmxvYWQnO1xuRnJhZ21lbnRSZXF1ZXN0LkFDVElPTl9DT01QTEVURSA9ICdjb21wbGV0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IEZyYWdtZW50UmVxdWVzdDtcbiIsIi8qKlxuICogVGhlIGNvcHlyaWdodCBpbiB0aGlzIHNvZnR3YXJlIGlzIGJlaW5nIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgTGljZW5zZSxcbiAqIGluY2x1ZGVkIGJlbG93LiBUaGlzIHNvZnR3YXJlIG1heSBiZSBzdWJqZWN0IHRvIG90aGVyIHRoaXJkIHBhcnR5IGFuZCBjb250cmlidXRvclxuICogcmlnaHRzLCBpbmNsdWRpbmcgcGF0ZW50IHJpZ2h0cywgYW5kIG5vIHN1Y2ggcmlnaHRzIGFyZSBncmFudGVkIHVuZGVyIHRoaXMgbGljZW5zZS5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMsIERhc2ggSW5kdXN0cnkgRm9ydW0uXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG4gKiBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAqICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vclxuICogIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIERhc2ggSW5kdXN0cnkgRm9ydW0gbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAqICBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlXG4gKiAgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgQVMgSVMgQU5EIEFOWVxuICogIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqICBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuXG4gKiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCxcbiAqICBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUXG4gKiAgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICogIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLFxuICogIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqICBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG4vKipcbiAqIEBjbGFzc2Rlc2MgVGhpcyBPYmplY3QgaG9sZHMgcmVmZXJlbmNlIHRvIHRoZSBIVFRQUmVxdWVzdCBmb3IgbWFuaWZlc3QsIGZyYWdtZW50IGFuZCB4bGluayBsb2FkaW5nLlxuICogTWVtYmVycyB3aGljaCBhcmUgbm90IGRlZmluZWQgaW4gSVNPMjMwMDktMSBBbm5leCBEIHNob3VsZCBiZSBwcmVmaXhlZCBieSBhIF8gc28gdGhhdCB0aGV5IGFyZSBpZ25vcmVkXG4gKiBieSBNZXRyaWNzIFJlcG9ydGluZyBjb2RlLlxuICogQGlnbm9yZVxuICovXG5jbGFzcyBIVFRQUmVxdWVzdCB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSBUQ1AgY29ubmVjdGlvbiBvbiB3aGljaCB0aGUgSFRUUCByZXF1ZXN0IHdhcyBzZW50LlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRjcGlkID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgaXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIGFuZCBzaG91bGQgbm90IGJlIGluY2x1ZGVkIGluIEhUVFAgcmVxdWVzdC9yZXNwb25zZSB0cmFuc2FjdGlvbnMgZm9yIHByb2dyZXNzaXZlIGRvd25sb2FkLlxuICAgICAgICAgKiBUaGUgdHlwZSBvZiB0aGUgcmVxdWVzdDpcbiAgICAgICAgICogLSBNUERcbiAgICAgICAgICogLSBYTGluayBleHBhbnNpb25cbiAgICAgICAgICogLSBJbml0aWFsaXphdGlvbiBGcmFnbWVudFxuICAgICAgICAgKiAtIEluZGV4IEZyYWdtZW50XG4gICAgICAgICAqIC0gTWVkaWEgRnJhZ21lbnRcbiAgICAgICAgICogLSBCaXRzdHJlYW0gU3dpdGNoaW5nIEZyYWdtZW50XG4gICAgICAgICAqIC0gb3RoZXJcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvcmlnaW5hbCBVUkwgKGJlZm9yZSBhbnkgcmVkaXJlY3RzIG9yIGZhaWx1cmVzKVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVybCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYWN0dWFsIFVSTCByZXF1ZXN0ZWQsIGlmIGRpZmZlcmVudCBmcm9tIGFib3ZlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWN0dWFsdXJsID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb250ZW50cyBvZiB0aGUgYnl0ZS1yYW5nZS1zcGVjIHBhcnQgb2YgdGhlIEhUVFAgUmFuZ2UgaGVhZGVyLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJhbmdlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWwtVGltZSB8IFRoZSByZWFsIHRpbWUgYXQgd2hpY2ggdGhlIHJlcXVlc3Qgd2FzIHNlbnQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVhbC1UaW1lIHwgVGhlIHJlYWwgdGltZSBhdCB3aGljaCB0aGUgZmlyc3QgYnl0ZSBvZiB0aGUgcmVzcG9uc2Ugd2FzIHJlY2VpdmVkLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRyZXNwb25zZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgSFRUUCByZXNwb25zZSBjb2RlLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlc3BvbnNlY29kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZHVyYXRpb24gb2YgdGhlIHRocm91Z2hwdXQgdHJhY2UgaW50ZXJ2YWxzIChtcyksIGZvciBzdWNjZXNzZnVsIHJlcXVlc3RzIG9ubHkuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhyb3VnaHB1dCB0cmFjZXMsIGZvciBzdWNjZXNzZnVsIHJlcXVlc3RzIG9ubHkuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHJhY2UgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVHlwZSBvZiBzdHJlYW0gKFwiYXVkaW9cIiB8IFwidmlkZW9cIiBldGMuLilcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc3RyZWFtID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlYWwtVGltZSB8IFRoZSByZWFsIHRpbWUgYXQgd2hpY2ggdGhlIHJlcXVlc3QgZmluaXNoZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3RmaW5pc2ggPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGR1cmF0aW9uIG9mIHRoZSBtZWRpYSByZXF1ZXN0cywgaWYgYXZhaWxhYmxlLCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX21lZGlhZHVyYXRpb24gPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1lZGlhIHNlZ21lbnQgcXVhbGl0eVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9xdWFsaXR5ID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFsbCB0aGUgcmVzcG9uc2UgaGVhZGVycyBmcm9tIHJlcXVlc3QuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlSGVhZGVycyA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2VsZWN0ZWQgc2VydmljZSBsb2NhdGlvbiBmb3IgdGhlIHJlcXVlc3QuIHN0cmluZy5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fc2VydmljZUxvY2F0aW9uID0gbnVsbDtcbiAgICB9XG59XG5cbi8qKlxuICogQGNsYXNzZGVzYyBUaGlzIE9iamVjdCBob2xkcyByZWZlcmVuY2UgdG8gdGhlIHByb2dyZXNzIG9mIHRoZSBIVFRQUmVxdWVzdC5cbiAqIEBpZ25vcmVcbiAqL1xuY2xhc3MgSFRUUFJlcXVlc3RUcmFjZSB7XG4gICAgLyoqXG4gICAgKiBAY2xhc3NcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVhbC1UaW1lIHwgTWVhc3VyZW1lbnQgc3RyZWFtIHN0YXJ0LlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnMgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogTWVhc3VyZW1lbnQgc3RyZWFtIGR1cmF0aW9uIChtcykuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaXN0IG9mIGludGVnZXJzIGNvdW50aW5nIHRoZSBieXRlcyByZWNlaXZlZCBpbiBlYWNoIHRyYWNlIGludGVydmFsIHdpdGhpbiB0aGUgbWVhc3VyZW1lbnQgc3RyZWFtLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmIgPSBbXTtcbiAgICB9XG59XG5cbkhUVFBSZXF1ZXN0LkdFVCA9ICdHRVQnO1xuSFRUUFJlcXVlc3QuSEVBRCA9ICdIRUFEJztcbkhUVFBSZXF1ZXN0Lk1QRF9UWVBFID0gJ01QRCc7XG5IVFRQUmVxdWVzdC5YTElOS19FWFBBTlNJT05fVFlQRSA9ICdYTGlua0V4cGFuc2lvbic7XG5IVFRQUmVxdWVzdC5JTklUX1NFR01FTlRfVFlQRSA9ICdJbml0aWFsaXphdGlvblNlZ21lbnQnO1xuSFRUUFJlcXVlc3QuSU5ERVhfU0VHTUVOVF9UWVBFID0gJ0luZGV4U2VnbWVudCc7XG5IVFRQUmVxdWVzdC5NRURJQV9TRUdNRU5UX1RZUEUgPSAnTWVkaWFTZWdtZW50JztcbkhUVFBSZXF1ZXN0LkJJVFNUUkVBTV9TV0lUQ0hJTkdfU0VHTUVOVF9UWVBFID0gJ0JpdHN0cmVhbVN3aXRjaGluZ1NlZ21lbnQnO1xuSFRUUFJlcXVlc3QuT1RIRVJfVFlQRSA9ICdvdGhlcic7XG5cbmV4cG9ydCB7IEhUVFBSZXF1ZXN0LCBIVFRQUmVxdWVzdFRyYWNlIH07XG4iXX0=
