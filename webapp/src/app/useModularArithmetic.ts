// useModularArithmetic.ts
import { useCallback } from 'react';

const useModularArithmetic = (e: bigint, m: bigint) => {
    const modPow = useCallback((base: bigint, exponent: bigint, modulus: bigint): bigint => {
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
    }, []);

    const modInverse = useCallback((a: bigint, m: bigint): bigint => {
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
    }, []);

    const d = modInverse(e, m - BigInt(1)); // Assuming m is prime

    const forwardComputation = useCallback((x: bigint, steps: bigint, onProgress: (progress: number) => void): bigint => {
        let result = x;
        for (let i = BigInt(0); i < steps; i++) {
            result = modPow(result, e, m);
            if (i % BigInt(1000) === BigInt(0)) { // Update progress every 1000 iterations
                onProgress(Number(i * BigInt(100) / steps));
            }
        }
        return result;
    }, [e, m, modPow]);

    const backwardComputation = useCallback((y: bigint, steps: bigint, onProgress: (progress: number) => void): bigint => {
        let result = y;
        for (let i = BigInt(0); i < steps; i++) {
            result = modPow(result, d, m);
            if (i % BigInt(1000) === BigInt(0)) { // Update progress every 1000 iterations
                onProgress(Number(i * BigInt(100) / steps));
            }
        }
        return result;
    }, [d, m, modPow]);


    return [forwardComputation, backwardComputation];
};

export default useModularArithmetic;
