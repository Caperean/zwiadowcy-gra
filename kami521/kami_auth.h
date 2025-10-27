#ifndef KAMI_AUTH_H
#define KAMI_AUTH_H

#include <string>
#include <unordered_map>
#include "kami512.h"

namespace kami_auth {

class AuthDB {
public:
    AuthDB() = default;

    // Rejestruje użytkownika z hasłem (hashuje automatycznie)
    bool registerUser(const std::string& username, const std::string& password);

    // Sprawdza czy użytkownik istnieje i czy hasło jest poprawne
    bool verifyUser(const std::string& username, const std::string& password) const;

    // Czy użytkownik istnieje?
    bool userExists(const std::string& username) const;

    // Zapisz/odczytaj bazę (prosty format tekstowy: login:hash)
    bool saveToFile(const std::string& path) const;
    bool loadFromFile(const std::string& path);

    // Hash bezpośredni (udostępnienie funkcji z KAMI512)
    static std::string hashPassword(const std::string& password);

private:
    std::unordered_map<std::string, std::string> db_; // login -> hashHex
};

} // namespace kami_auth

#endif
