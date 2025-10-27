#include "kami_auth.h"
#include <fstream>
#include <sstream>
#include <iostream>

namespace kami_auth {
using namespace kami512;

bool AuthDB::registerUser(const std::string& username, const std::string& password) {
    if (userExists(username)) return false; // już istnieje
    std::string hash = hashPassword(password);
    db_[username] = hash;
    return true;
}

bool AuthDB::verifyUser(const std::string& username, const std::string& password) const {
    auto it = db_.find(username);
    if (it == db_.end()) return false; // brak użytkownika
    return matches_hex(password, it->second);
}

bool AuthDB::userExists(const std::string& username) const {
    return db_.find(username) != db_.end();
}

std::string AuthDB::hashPassword(const std::string& password) {
    return hashHex(password);
}

bool AuthDB::saveToFile(const std::string& path) const {
    std::ofstream out(path);
    if (!out) return false;
    for (const auto& [user, hash] : db_) {
        out << user << ":" << hash << "\n";
    }
    return true;
}

bool AuthDB::loadFromFile(const std::string& path) {
    std::ifstream in(path);
    if (!in) return false;
    db_.clear();
    std::string line;
    while (std::getline(in, line)) {
        std::istringstream ss(line);
        std::string user, hash;
        if (std::getline(ss, user, ':') && std::getline(ss, hash)) {
            db_[user] = hash;
        }
    }
    return true;
}

} // namespace kami_auth
