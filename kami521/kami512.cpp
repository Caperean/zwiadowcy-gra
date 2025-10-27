// trzeba zmienić nazwę folderu
#include "kami512.h"
#include <array>
#include <cstring>
#include <sstream>
#include <iomanip>
#include <stdexcept>

namespace kami512 {

// --- --- Implementacja "zera-dependency" KAMI512 (edukacyjna) --- ---

// Pomocnicze funkcje lokalne
namespace {
inline uint64_t rotr(uint64_t x, unsigned s) noexcept {
    return (x >> s) | (x << (64 - s));
}
inline void store_be64(uint8_t out[8], uint64_t v) noexcept {
    for (int i = 7; i >= 0; --i) { out[i] = uint8_t(v & 0xFF); v >>= 8; }
}
inline uint64_t load_be64(const uint8_t in[8]) noexcept {
    uint64_t v = 0;
    for (int i = 0; i < 8; ++i) v = (v << 8) | in[i];
    return v;
}
} // namespace

struct KAMI512::Impl {
    std::array<uint64_t, 8> state;
    uint8_t buffer[BLOCK_SIZE];
    size_t buffer_len;
    uint64_t total_bits_hi;
    uint64_t total_bits_lo;

    Impl() {
        // Inicjalizacja (arbitralne IV)
        state = {
            0x6a09e667f3bcc908ULL ^ 0x0123456789abcdefULL,
            0xbb67ae8584caa73bULL ^ 0xfedcba9876543210ULL,
            0x3c6ef372fe94f82bULL ^ 0x0f0f0f0f0f0f0f0fULL,
            0xa54ff53a5f1d36f1ULL ^ 0xf0f0f0f0f0f0f0f0ULL,
            0x510e527fade682d1ULL ^ 0x0011223344556677ULL,
            0x9b05688c2b3e6c1fULL ^ 0x8899aabbccddeeffULL,
            0x1f83d9abfb41bd6bULL ^ 0xdeadbeefcafebabeULL,
            0x5be0cd19137e2179ULL ^ 0x0121002100120012ULL
        };
        buffer_len = 0;
        total_bits_hi = 0;
        total_bits_lo = 0;
    }

    void reset() {
        *this = Impl();
    }

    void add_bits(size_t len_bytes) {
        uint64_t add = uint64_t(len_bytes) * 8ULL;
        uint64_t old_lo = total_bits_lo;
        total_bits_lo += add;
        if (total_bits_lo < old_lo) total_bits_hi += 1;
    }

    static constexpr uint64_t K32[32] = {
        0x428a2f98d728ae22ULL, 0x7137449123ef65cdULL, 0xb5c0fbcfec4d3b2fULL, 0xe9b5dba58189dbbcULL,
        0x3956c25bf348b538ULL, 0x59f111f1b605d019ULL, 0x923f82a4af194f9bULL, 0xab1c5ed5da6d8118ULL,
        0xd807aa98a3030242ULL, 0x12835b0145706fbeULL, 0x243185be4ee4b28cULL, 0x550c7dc3d5ffb4e2ULL,
        0x72be5d74f27b896fULL, 0x80deb1fe3b1696b1ULL, 0x9bdc06a725c71235ULL, 0xc19bf174cf692694ULL,
        0xe49b69c19ef14ad2ULL, 0xefbe4786384f25e3ULL, 0x0fc19dc68b8cd5b5ULL, 0x240ca1cc77ac9c65ULL,
        0x2de92c6f592b0275ULL, 0x4a7484aa6ea6e483ULL, 0x5cb0a9dcbd41fbd4ULL, 0x76f988da831153b5ULL,
        0x983e5152ee66dfabULL, 0xa831c66d2db43210ULL, 0xb00327c898fb213fULL, 0xbf597fc7beef0ee4ULL,
        0xc6e00bf33da88fc2ULL, 0xd5a79147930aa725ULL, 0x06ca6351e003826fULL, 0x142929670a0e6e70ULL
    };

    void process_block(const uint8_t block[BLOCK_SIZE]) {
        uint64_t W[32];
        for (int i = 0; i < 16; ++i) W[i] = load_be64(block + i*8);
        for (int i = 16; i < 32; ++i) {
            uint64_t s0 = rotr(W[i-15], 1) ^ rotr(W[i-15], 8) ^ (W[i-15] >> 7);
            uint64_t s1 = rotr(W[i-2], 19) ^ rotr(W[i-2], 61) ^ (W[i-2] >> 6);
            W[i] = W[i-16] + s0 + W[i-7] + s1;
        }

        uint64_t a = state[0], b = state[1], c = state[2], d = state[3];
        uint64_t e = state[4], f = state[5], g = state[6], h = state[7];

        for (int r = 0; r < 32; ++r) {
            uint64_t S1 = rotr(e, 14) ^ rotr(e, 18) ^ rotr(e, 41);
            uint64_t ch = (e & f) ^ ((~e) & g);
            uint64_t temp1 = h + S1 + ch + K32[r] + W[r % 32];
            uint64_t S0 = rotr(a, 28) ^ rotr(a, 34) ^ rotr(a, 39);
            uint64_t maj = (a & b) ^ (a & c) ^ (b & c);
            uint64_t temp2 = S0 + maj;

            h = g; g = f; f = e;
            e = d + temp1;
            d = c; c = b; b = a;
            a = temp1 + temp2;
        }

        state[0] += a; state[1] += b; state[2] += c; state[3] += d;
        state[4] += e; state[5] += f; state[6] += g; state[7] += h;
    }
};

// --- KAMI512 (wrapper) ---
KAMI512::KAMI512() : impl_(new Impl()) {}
void KAMI512::reset() noexcept { try { impl_->reset(); } catch(...) {} }

void KAMI512::update(const void* data, size_t len) {
    if (!data || len == 0) return;
    const uint8_t* p = static_cast<const uint8_t*>(data);
    impl_->add_bits(len);

    if (impl_->buffer_len > 0) {
        size_t need = BLOCK_SIZE - impl_->buffer_len;
        if (len < need) {
            std::memcpy(impl_->buffer + impl_->buffer_len, p, len);
            impl_->buffer_len += len;
            return;
        }
        std::memcpy(impl_->buffer + impl_->buffer_len, p, need);
        p += need; len -= need;
        impl_->process_block(impl_->buffer);
        impl_->buffer_len = 0;
    }

    while (len >= BLOCK_SIZE) {
        impl_->process_block(p);
        p += BLOCK_SIZE; len -= BLOCK_SIZE;
    }

    if (len > 0) {
        std::memcpy(impl_->buffer, p, len);
        impl_->buffer_len = len;
    }
}

void KAMI512::final(std::array<uint8_t, DIGEST_SIZE>& out) {
    uint64_t hi = impl_->total_bits_hi;
    uint64_t lo = impl_->total_bits_lo;

    // padding
    std::vector<uint8_t> pad;
    pad.push_back(0x80);

    size_t cur = impl_->buffer_len;
    size_t padZeros;
    if ((cur + 1 + 16) <= BLOCK_SIZE) padZeros = BLOCK_SIZE - (cur + 1 + 16);
    else padZeros = 2*BLOCK_SIZE - (cur + 1 + 16);

    pad.insert(pad.end(), padZeros, 0);

    uint8_t len16[16];
    store_be64(len16 + 0, hi);
    store_be64(len16 + 8, lo);
    pad.insert(pad.end(), len16, len16 + 16);

    update(pad.data(), pad.size());

    if (impl_->buffer_len != 0) {
        uint8_t tmp[BLOCK_SIZE];
        std::memset(tmp, 0, BLOCK_SIZE);
        std::memcpy(tmp, impl_->buffer, impl_->buffer_len);
        impl_->process_block(tmp);
        impl_->buffer_len = 0;
    }

    for (size_t i = 0; i < 8; ++i) store_be64(out.data() + i*8, impl_->state[i]);

    impl_->reset();
}

std::string KAMI512::digestHex() {
    std::array<uint8_t, DIGEST_SIZE> d;
    final(d);
    std::ostringstream oss;
    oss << std::hex << std::setfill('0');
    for (auto b : d) oss << std::setw(2) << (int)b;
    return oss.str();
}

// one-shot
std::array<uint8_t, DIGEST_SIZE> hash(const void* data, size_t len) {
    KAMI512 ctx;
    ctx.update(data, len);
    std::array<uint8_t, DIGEST_SIZE> out;
    ctx.final(out);
    return out;
}
std::string hashHex(const void* data, size_t len) {
    auto d = hash(data, len);
    std::ostringstream oss;
    oss << std::hex << std::setfill('0');
    for (auto b : d) oss << std::setw(2) << (int)b;
    return oss.str();
}

// hex <-> digest
std::string to_hex(const std::array<uint8_t, DIGEST_SIZE>& d) {
    std::ostringstream oss;
    oss << std::hex << std::setfill('0');
    for (auto b : d) oss << std::setw(2) << (int)b;
    return oss.str();
}
bool hex_to_digest(const std::string& hex, std::array<uint8_t, DIGEST_SIZE>& out) {
    if (hex.size() != DIGEST_SIZE * 2) return false;
    for (size_t i = 0; i < DIGEST_SIZE; ++i) {
        unsigned int v = 0;
        char hi = hex[i*2], lo = hex[i*2 + 1];
        auto hexVal = [](char c)->int {
            if (c >= '0' && c <= '9') return c - '0';
            if (c >= 'a' && c <= 'f') return c - 'a' + 10;
            if (c >= 'A' && c <= 'F') return c - 'A' + 10;
            return -1;
        };
        int h = hexVal(hi), l = hexVal(lo);
        if (h < 0 || l < 0) return false;
        v = (h << 4) | l;
        out[i] = static_cast<uint8_t>(v);
    }
    return true;
}

// constant-time compare
bool equal_digests_ct(const std::array<uint8_t, DIGEST_SIZE>& a,
                      const std::array<uint8_t, DIGEST_SIZE>& b) noexcept {
    uint8_t diff = 0;
    for (size_t i = 0; i < DIGEST_SIZE; ++i) diff |= (a[i] ^ b[i]);
    return diff == 0;
}

// matches_hex: zhashuj input i porównaj z stored_hex (hex string)
bool matches_hex(const std::string& input, const std::string& stored_hex) {
    std::array<uint8_t, DIGEST_SIZE> stored;
    if (!hex_to_digest(stored_hex, stored)) return false;
    auto h = hash(input);
    return equal_digests_ct(h, stored);
}

// matches_digest: stored as binary digest
bool matches_digest(const std::string& input, const std::array<uint8_t, DIGEST_SIZE>& stored) {
    auto h = hash(input);
    return equal_digests_ct(h, stored);
}

} // namespace kami512
