use std::time::Instant;

use num_bigint::BigUint;
use num_traits::{One, Zero};

fn mod_pow(base: &BigUint, exponent: &BigUint, modulus: &BigUint) -> BigUint {
    let mut result = BigUint::one();
    let mut base = base.clone();
    let mut exponent = exponent.clone();

    while exponent > BigUint::zero() {
        if &exponent % 2u8 == BigUint::one() {
            result = (&result * &base) % modulus;
        }
        exponent >>= 1;
        base = (&base * &base) % modulus;
    }

    result
}

fn mod_inverse(a: &BigUint, m: &BigUint) -> BigUint {
    let mut m0 = m.clone();
    let mut y = BigUint::zero();
    let mut x = BigUint::one();

    if m == &BigUint::one() {
        return BigUint::zero();
    }

    let mut a = a.clone();
    while a > BigUint::one() {
        let q = &a / m0.clone();
        let mut t = m0.clone();

        m0 = &a % m0;
        a = t;
        t = y.clone();

        // Update y and x correctly for modular arithmetic
        let qy = &q * &y;
        if x < qy {
            y = m - (&qy - &x) % m;
        } else {
            y = &x - &qy;
        }
        x = t;
    }

    x % m
}


fn forward_computation(x: &BigUint, e: &BigUint, m: &BigUint, steps: u32) -> BigUint {
    let mut result = x.clone();
    for _ in 0..steps {
        result = mod_pow(&result, e, m);
    }
    result
}

fn backward_computation(y: &BigUint, d: &BigUint, m: &BigUint, steps: u32) -> BigUint {
    let mut result = y.clone();
    for _ in 0..steps {
        result = mod_pow(&result, d, m);
    }
    result
}

fn main() {
    let x = BigUint::parse_bytes(b"12345", 10).unwrap();
    let e = BigUint::parse_bytes(b"3", 10).unwrap();
    let m = BigUint::parse_bytes(b"1000000007", 10).unwrap();
    let steps = 1000000;

    // Measure forward computation time
    let start_time = Instant::now();
    let forward_result = forward_computation(&x, &e, &m, steps);
    let forward_duration = start_time.elapsed();
    println!("Forward Result: {}", forward_result);
    println!("Time taken for forward computation: {:?}", forward_duration);

    let phi = m.clone() - BigUint::one();
    let d = mod_inverse(&e, &phi);

    // Measure backward computation time
    let start_time = Instant::now();
    let backward_result = backward_computation(&forward_result, &d, &m, steps);
    let backward_duration = start_time.elapsed();
    println!("Backward Result: {}", backward_result);
    println!("Time taken for backward computation: {:?}", backward_duration);
}
