export const GRAVITY = 0.5;
export const PLAYER_WIDTH = 32;
export const PLAYER_HEIGHT = 48;
export const PLAYER_SPEED = 2;
export const JUMP_STRENGTH = -10;
export const PLAYER_ANIMATION_SPEED = 150;
export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;
export const FIRE_SIZE = 32;
export const WOLF_WIDTH = 48;
export const WOLF_HEIGHT = 32;
export const WOLF_SPEED = 1;
export const WOLF_CHASE_DISTANCE = 200;
export const WOLF_ATTACK_DISTANCE = 50;
export const WOLF_RETREAT_DISTANCE = 100;
export const WOLF_ANIMATION_SPEED = 100;

// Nowe stałe do obsługi strzały i paska siły
export const MAX_POWER_CHARGE = 1600; //sekundy w milisekundach
export const ARROW_WIDTH = 64;
export const ARROW_HEIGHT = 16;
export const ARROW_SPEED = 24
export const ARROW_VERTICAL_STRENGTH = -2;
// Nowe stałe dla nietoperza
export const BAT_WIDTH = 18;
export const BAT_HEIGHT = 12;
// ... (istniejące stałe)

// Nowe stałe dla araba
export const ARAB_WIDTH = 24;
export const ARAB_HEIGHT = 48;
export const ARAB_SPEED = 1;
export const ARAB_DETECTION_RANGE = 300;
export const ARAB_FOV_ANGLE = Math.PI / 3; // 60 stopni w radianach
// Nowe stałe dla klauna
export const CLOWN_WIDTH = 32;
export const CLOWN_HEIGHT = 48;
export const CLOWN_DETECTION_RANGE = 250;
export const CLOWN_ATTACK_COOLDOWN = 1500; // 1.5 sekundy

// Nowe stałe dla maski
export const MASK_WIDTH = 32;
export const MASK_HEIGHT = 32;
export const MASK_SPEED = 4;
// nowe stałe dla dzika
export const BOAR_WIDTH = 48;
export const BOAR_HEIGHT = 32;
export const BOAR_SPEED = 1.5; // Trochę szybszy niż WOLF_SPEED (1)
export const BOAR_CHASE_DISTANCE = 250; // Większy zasięg wykrywania niż Wilk (200)
export const BOAR_ATTACK_DISTANCE = 50;
export const BOAR_RETREAT_DISTANCE = 100;
export const BOAR_DAMAGE = 3; // Zadaje 3 HP obrażeń
export const BOAR_ANIMATION_SPEED = 100;
// nowe zmienne dla tatara
export const TATAR_WIDTH = 50;
export const TATAR_HEIGHT = 70;
export const TATAR_SPEED = 3;
export const TATAR_ANIMATION_SPEED = 200;
// Nowe stałe dla Bałwana
export const SNOWMAN_WIDTH = 48;
export const SNOWMAN_HEIGHT = 64;
export const SNOWMAN_HP = 3;
export const SNOWMAN_DETECTION_RANGE = 400;

// Nowe stałe dla Pocisków Bałwana
export const SNOWBALL_SIZE = 16;
export const SNOWBALL_SPEED = 6;
export const SNOWBALL_COOLDOWN = 250; // 0.25 sekundy

export const SNOWBULLET_SIZE = 32;
export const SNOWBULLET_SPEED = 8;
export const SNOWBULLET_COOLDOWN = 5000; // 5 sekund

// Nowe stałe dla Lodowego Bloku
export const ICEBLOCK_SIZE_MULTIPLIER = 3;
export const ICEBLOCK_DURATION = 5000; // 5 sekund
// ... (istniejące stałe)

// Zmiana nazwy/dodanie dla spójności ze Snowball.js
export const SNOWBALL_KNOCKBACK = 5; 

// Nowe stałe dla Pocisków Bałwana
export const SNOWBULLET_SIZE = 32;
export const SNOWBULLET_SPEED = 8;
export const SNOWBULLET_COOLDOWN = 5000; // 5 sekund
export const SNOWBULLET_KNOCKBACK_MULTIPLIER = 3; // Mnożnik knockback
export const SNOWBULLET_DAMAGE = 1; // Obrażenia zadawane przez pocisk

// ...
