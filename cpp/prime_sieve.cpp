#include <iostream>
#include <vector>

// Simple program that uses the Sieve of Eratosthenes to compute all
// prime numbers up to a specified limit.

// Returns a vector of prime numbers up to n (inclusive).
std::vector<int> primes_up_to(int n) {
    std::vector<bool> is_prime(n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= n; ++p) {
        if (is_prime[p]) {
            for (int multiple = p * p; multiple <= n; multiple += p) {
                is_prime[multiple] = false;
            }
        }
    }
    std::vector<int> primes;
    for (int i = 2; i <= n; ++i) {
        if (is_prime[i]) {
            primes.push_back(i);
        }
    }
    return primes;
}

int main() {
    int limit = 100;
    auto primes = primes_up_to(limit);
    std::cout << "Primes up to " << limit << ":";
    for (int p : primes) {
        std::cout << ' ' << p;
    }
    std::cout << std::endl;
    return 0;
}
