function setPixel(x,y) {
  var r,g,b;
  function nthPrime(n) { // https://github.com/Daniel-Hug/JS-nth-prime/blob/master/nth-prime-calculator.js
  	l: for (var primes = [2], i = 3, root; primes.length < n; i += 2) {
  		for (root = Math.sqrt(i), j = 0; primes[j] <= root; j++) {
  			if (i%primes[j] === 0) continue l;
  		}
  		primes.push(i);
  	}
  	return primes[n - 1];
  }
  
  var n = nthPrime(floor(y*64));
  var d = floor(x*24);
  
  if (d > n) return [0, 0, 0];
  
  var rem = n % d;
  
  r = rem * 8;
  g = rem * 32;
  
  return [mod(r,256),mod(g,256),mod(b,256)];
}