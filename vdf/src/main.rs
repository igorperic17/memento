use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use num_bigint::BigUint;
use num_traits::{One, Zero};
use serde_derive::{Deserialize, Serialize};
use std::time::Instant;

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

#[derive(Deserialize)]
struct ComputationRequest {
    x: String,
    e: String,
    m: String,
    steps: u32,
}

#[derive(Serialize)]
struct ComputationResponse {
    result: String,
    computation_time: String,
}

async fn forward(request: web::Json<ComputationRequest>) -> impl Responder {
    let x = BigUint::parse_bytes(request.x.as_bytes(), 10).unwrap();
    let e = BigUint::parse_bytes(request.e.as_bytes(), 10).unwrap();
    let m = BigUint::parse_bytes(request.m.as_bytes(), 10).unwrap();

    let start_time = Instant::now();
    let result = forward_computation(&x, &e, &m, request.steps);
    let duration = start_time.elapsed();

    HttpResponse::Ok().json(ComputationResponse {
        result: result.to_str_radix(10),
        computation_time: format!("{:?}", duration),
    })
}

async fn backward(request: web::Json<ComputationRequest>) -> impl Responder {
    let y = BigUint::parse_bytes(request.x.as_bytes(), 10).unwrap();
    let e = BigUint::parse_bytes(request.e.as_bytes(), 10).unwrap();
    let m = BigUint::parse_bytes(request.m.as_bytes(), 10).unwrap();

    let phi = m.clone() - BigUint::one(); // Assuming 'm' is the modulus for the inverse calculation
    let d = mod_inverse(&e, &phi);        // Calculate the modular inverse of 'e'

    let start_time = Instant::now();
    let result = backward_computation(&y, &d, &m, request.steps);
    let duration = start_time.elapsed();

    HttpResponse::Ok().json(ComputationResponse {
        result: result.to_str_radix(10),
        computation_time: format!("{:?}", duration),
    })
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/forward", web::post().to(forward))
            .route("/backward", web::post().to(backward))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

// example usage (from terminal):

// curl -X POST http://localhost:8080/forward -H "Content-Type: application/json" -d '{"x": "12345", "e": "3", "m": "1000000007", "steps": 1000000}'
// {"result":"353814440","computation_time":"5.225790833s"}

// curl -X POST http://localhost:8080/backward -H "Content-Type: application/json" -d '{"x": "353814440", "e": "3", "m": "1000000007", "steps": 1000000}'
// {"result":"12345","computation_time":"57.650758875s"}