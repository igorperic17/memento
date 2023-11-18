// modularArithmeticWorker.js

function modPow(base, exponent, modulus) {
    let result = BigInt(1);
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % BigInt(2) === BigInt(1)) {
            result = (result * base) % modulus;
        }
        exponent = exponent / BigInt(2);
        base = (base * base) % modulus;
    }

    return result;
}

function modInverse(a, m) {
    let m0 = m;
    let y = BigInt(0);
    let x = BigInt(1);

    if (m === BigInt(1)) {
        return BigInt(0);
    }

    while (a > BigInt(1)) {
        let q = a / m0;
        let t = m0;

        m0 = a % m0;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < BigInt(0)) {
        x = x + m;
    }

    return x % m;
}

function forwardComputation(x, e, m, steps, onProgress) {
    let result = x;
    for (let i = BigInt(0); i < steps; i++) {
        result = modPow(result, e, m);
        if (i % BigInt(1000) === BigInt(0)) {
            onProgress(Number(i * BigInt(100) / steps));
        }
    }
    return result;
}

function backwardComputation(y, d, m, steps, onProgress) {
    let result = y;
    for (let i = BigInt(0); i < steps; i++) {
        result = modPow(result, d, m);
        if (i % BigInt(1000) === BigInt(0)) {
            onProgress(Number(i * BigInt(100) / steps));
        }
    }
    return result;
}

// Add an error listener
onerror = function(error) {
    console.error('Error in worker:', error.message);
    postMessage({ error: error.message });
}

onmessage = function(e) {
    console.log("Message received!");
    const { x, e: exponent, m, steps, type } = e.data;

    const bigX = BigInt(x);
    const bigE = BigInt(exponent);
    const bigM = BigInt(m);
    const bigSteps = BigInt(steps);
    const d = modInverse(bigE, bigM - BigInt(1)); // Assuming m is prime

    let result;
    if (type === 'forward') {
        result = forwardComputation(bigX, bigE, bigM, bigSteps, progress => postMessage({ progress }));
    } else if (type === 'backward') {
        result = backwardComputation(bigX, d, bigM, bigSteps, progress => postMessage({ progress }));
    }

    postMessage({ result: result.toString(), progress: 100 });
}
