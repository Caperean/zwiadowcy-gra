#ifndef KAMI512_H
#define KAMI512_H

#include <array>
#include <cstdint>
#include <cstddef>
#include <string>
#include <vector>

namespace kami512 {

// stałe
constexpr size_t DIGEST_SIZE = 64;   // 512 bitów
constexpr size_t BLOCK_SIZE  = 128;  // 1024 bity

// Klasa streamingowa (można update() w pętlach)
class KAMI512 {
public:
    KAMI512() noexcept;
    ~KAMI512() = default;

    // Zresetuj do stanu początkowego
    void reset() noexcept;

    // Dodaj dane (można wywołać wielokrotnie)
    void update(const void* data, size_t len);

    // Finalizuj i zapisz digest (64 bajty). Po final() stan zostaje zresetowany.
    void final(std::array<uint8_t, DIGEST_SIZE>& out);

    // Convenience: zwraca hex digest (czyści stan)
    std::string digestHex();

private:
    struct Impl;
    Impl* impl_;
};

// One-shot: hashuje dane do std::array
std::array<uint8_t, DIGEST_SIZE> hash(const void* data, size_t len);
std::string hashHex(const void* data, size_t len);

// overloady dla std::string
inline std::array<uint8_t, DIGEST_SIZE> hash(const std::string& s) {
    return hash(s.data(), s.size());
}
inline std::string hashHex(const std::string& s) {
    return hashHex(s.data(), s.size());
}

// konwersje hex <-> digest
std::string to_hex(const std::array<uint8_t, DIGEST_SIZE>& d);
bool hex_to_digest(const std::string& hex, std::array<uint8_t, DIGEST_SIZE>& out);

// Porównania w czasie stałym (constant-time)
// Porównuje dwa digesty (binarnie)
bool equal_digests_ct(const std::array<uint8_t, DIGEST_SIZE>& a,
                      const std::array<uint8_t, DIGEST_SIZE>& b) noexcept;

// Wygodne funkcje do porównania: weź input (string/bytes) -> zhashuj -> porównaj z zapisanym hexem
// Zwraca true jeśli hashe zgodne. Zapisany hash może być w formacie hex (najczęstsze).
bool matches_hex(const std::string& input, const std::string& stored_hex);

// Alternatywa: stored digest jako binarny blob
bool matches_digest(const std::string& input, const std::array<uint8_t, DIGEST_SIZE>& stored);

} // namespace kami512

#endif // KAMI512_H
