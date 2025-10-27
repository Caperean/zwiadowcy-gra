Moduł: KAMI512

Pliki: kami512.h, kami512.cpp
Opis: Prosty algorytm tworzący 512-bitowy (64 bajtowy) hash z dowolnego ciągu danych.
Nie wymaga żadnych zewnętrznych zależności.

🔹 Funkcje
std::array<uint8_t, 64> kami512::hash(const std::string& input)

Opis:
Tworzy 512-bitowy hash z podanego ciągu znaków.
Zwraca wynik jako tablicę 64 bajtów (uint8_t[64]).

Parametry:

input — tekst wejściowy do zhaszowania.

Zwraca:

Tablica 64 bajtów z wynikiem hashowania.

Użycie:

auto raw = kami512::hash("test");

std::string kami512::hashHex(const std::string& input)

Opis:
Zwraca wynik hashowania jako ciąg 128 znaków w zapisie szesnastkowym (hex).

Parametry:

input — tekst wejściowy.

Zwraca:

std::string – hash w formacie hex (np. "a3bff19c...").

Użycie:

std::string hash = kami512::hashHex("mojehaslo");

bool kami512::compareHex(const std::string& hash1, const std::string& hash2)

Opis:
Porównuje dwa ciągi hashów w formacie hex w sposób odporny na timing attacks (czas porównania nie zależy od treści).

Parametry:

hash1 — pierwszy hash (np. z bazy danych)

hash2 — drugi hash (np. obliczony z podanego hasła)

Zwraca:

true jeśli są identyczne,

false jeśli różne.

Użycie:

if (kami512::compareHex(dbHash, kami512::hashHex(userInput))) {
    // hasło poprawne
}

bool kami512::compareRaw(const std::array<uint8_t,64>& a, const std::array<uint8_t,64>& b)

Opis:
Porównuje dwa 512-bitowe hashe w formacie binarnym.
Działa w czasie stałym.

Parametry:

a — pierwszy hash (tablica 64 bajtów)

b — drugi hash

Zwraca:

true jeśli identyczne,

false w przeciwnym wypadku.

🧠 Działanie algorytmu (wersja uproszczona)

Dzieli wejście na bajty.

Każdy bajt jest mieszany (bitowe przesunięcia, XOR, dodawanie) z 64-elementowym stanem.

Po przetworzeniu całości wykonuje dodatkowe rundy mieszania.

Wynik to 64 bajty (512 bitów).

🧩 Moduł: KAMIAuth

Pliki: kami_auth.h, kami_auth.cpp
Opis: Warstwa zarządzania użytkownikami.
Zawiera prostą bazę (w pamięci lub w pliku), która przechowuje login i hash hasła.

🔹 Klasa: kami_auth::AuthDB
bool registerUser(const std::string& username, const std::string& password)

Opis:
Rejestruje nowego użytkownika.
Automatycznie hashuje podane hasło przy użyciu KAMI512.

Parametry:

username — nazwa użytkownika (unikalna),

password — hasło w postaci tekstowej.

Zwraca:

true, jeśli użytkownik został dodany,

false, jeśli już istnieje w bazie.

Działanie:

Sprawdza, czy username już istnieje.

Jeśli nie, tworzy hash hasła: hash = kami512::hashHex(password)

Zapisuje parę {username, hash} w mapie db_.

bool verifyUser(const std::string& username, const std::string& password) const

Opis:
Sprawdza, czy podany login i hasło zgadzają się z danymi w bazie.

Parametry:

username — login użytkownika,

password — hasło do sprawdzenia.

Zwraca:

true – jeśli login istnieje i hash hasła się zgadza,

false – w przeciwnym przypadku.

Działanie:

Wyszukuje użytkownika w mapie.

Jeśli istnieje, oblicza hash z podanego hasła.

Porównuje hash z zapisanym w bazie (kami512::compareHex()).

Użycie:

if (db.verifyUser("jan", "tajnehaslo")) {
    std::cout << "Login OK\n";
}

bool userExists(const std::string& username) const

Opis:
Sprawdza, czy użytkownik o danym loginie istnieje w bazie.

Parametry:

username — login.

Zwraca:

true jeśli istnieje,

false jeśli nie.

bool saveToFile(const std::string& path) const

Opis:
Zapisuje aktualną zawartość bazy użytkowników do pliku tekstowego.

Parametry:

path — ścieżka do pliku (np. "users.db").

Format pliku:

login:hash


Zwraca:

true – jeśli zapis zakończył się sukcesem,

false – jeśli nie udało się otworzyć pliku.

bool loadFromFile(const std::string& path)

Opis:
Wczytuje dane użytkowników z pliku w formacie login:hash.

Parametry:

path — ścieżka do pliku.

Zwraca:

true, jeśli plik udało się poprawnie wczytać,

false, jeśli plik nie istnieje lub nie udało się go otworzyć.

Działanie:

Czyści aktualną bazę (db_).

Wczytuje każdą linię w formacie nazwa:hash.

Dodaje do mapy db_.

static std::string hashPassword(const std::string& password)

Opis:
Pomocnicza funkcja, która zwraca hash hasła w formacie hex.
Używa wewnętrznie kami512::hashHex().

Parametry:

password — tekstowe hasło.

Zwraca:

128-znakowy ciąg hex (hash 512-bitowy).

Użycie:

std::string h = kami_auth::AuthDB::hashPassword("12345");

🧱 Pola prywatne
std::unordered_map<std::string, std::string> db_;

Przechowuje mapę użytkowników:
klucz: login
wartość: hash (w formacie hex)
