/**
 * ============================================================
 *  OUR LITTLE PRINCESS — MEMORIES DATA FILE
 * ============================================================
 *
 *  This is the ONLY file you need to edit to customize the website.
 *
 *  HOW TO ADD / EDIT MEMORIES:
 *  -----------------------------------------------------------
 *  1. Place your photos in the appropriate folder under  public/images/
 *        - public/images/baby/          → Baby photos
 *        - public/images/first-birthday/→ First birthday photos
 *        - public/images/childhood/     → Childhood photos
 *        - public/images/family/        → Family photos
 *        - public/images/recent/        → Recent photos
 *
 *  2. In the `timelineMemories` array below, add or edit objects:
 *        {
 *          id: 1,                                    // Unique number
 *          image: '/images/baby/first-day.jpg',      // Path to your photo
 *          title: 'The Day You Were Born',           // Title for this memory
 *          age: 'Day 1',                             // Age or date label
 *          date: '2024-10-24',                       // Actual date (YYYY-MM-DD)
 *          caption: 'Your first moment in this world.', // Short emotional caption
 *          category: 'baby',                         // Category: baby | first-birthday | childhood | family | recent
 *        }
 *
 *  3. You can add as many memories as you want — just keep adding objects.
 *  4. You can remove memories by deleting the objects.
 *  5. You can reorder them by changing their position in the array.
 *
 *  HOW TO CHANGE HER NAME:
 *  -----------------------------------------------------------
 *  Edit the `princessName` variable below.
 *
 *  HOW TO CHANGE THE BIRTHDAY:
 *  -----------------------------------------------------------
 *  Edit the `birthdayDate` variable below (YYYY-MM-DD format).
 *
 *  HOW TO CHANGE THE BIRTHDAY MESSAGE:
 *  -----------------------------------------------------------
 *  Edit the `birthdayMessage` variable below.
 *
 *  HOW TO ADD BACKGROUND MUSIC:
 *  -----------------------------------------------------------
 *  Place your music file (MP3) in public/music/ and update the
 *  `musicFile` variable below.
 *
 * ============================================================
 */

// ─── PRINCESS NAME ──────────────────────────────────────────
// Change this to her name
export const princessName = 'Pragathi';

// ─── BIRTHDAY DATE ──────────────────────────────────────────
// Format: YYYY-MM-DD  (Her birthday)
export const birthdayDate = '2019-10-24';

// ─── BIRTHDAY YEAR SHE WAS BORN ────────────────────────────
export const birthYear = 2019;

// ─── BACKGROUND MUSIC ───────────────────────────────────────
// Place your music file in public/music/ and update the path
// Example: '/music/lullaby.mp3'
export const musicFile = '/music/background-music.mp3';

// ─── BIRTHDAY MESSAGE ───────────────────────────────────────
// This message appears when the birthday gift box is opened
export const birthdayMessage = `Happy Birthday, our little princess! 🎂✨

Every day you fill our hearts with so much joy and love. 
Watching you grow is the most beautiful gift life has given us.

May your day be as magical as you are, 
filled with laughter, cake, and lots of hugs!

We love you more than all the stars in the sky. 💖`;

// ─── BIRTHDAY LETTER ────────────────────────────────────────
// This is the letter that appears when the envelope is opened
// Edit this to write your own personal message
export const birthdayLetter = `My Dearest Little Princess,

From the very first moment you came into our lives, everything changed. 
The world became brighter, more beautiful, and so full of love.

Every smile of yours lights up our entire day. Every laugh of yours 
is our favorite melody. Every tiny step you take fills us with so 
much pride and happiness.

You are growing up so fast, and yet no matter how big you get, 
you will always be our little princess.

Today, on your special day, we want you to know that you are 
the most precious gift we have ever received. You are loved 
beyond measure, beyond words, beyond everything.

May your life always be filled with magic, laughter, and endless love.

Happy Birthday, sweetheart! 🎀💕

With all our love forever,
Your Family`;

// ─── TIMELINE MEMORIES ──────────────────────────────────────
// These appear on the fairytale timeline (Her Life Journey section)
// Add, edit, remove, or reorder as you wish!
export const timelineMemories = [
  {
    id: 1,
    image: '/images/baby/first-day.jpg',
    title: 'The Day You Were Born',
    age: '',
    date: '2024-10-24',
    caption: 'The most magical day of all — when our little princess arrived and stole our hearts forever.',
    category: 'baby',
  },
  {
    id: 2,
    image: '/images/baby/tiny-baby.jpg',
    title: 'Tiny Baby Days',
    age: '',
    date: '2024-11-24',
    caption: 'So tiny, so perfect. Every little yawn and stretch was the cutest thing we had ever seen.',
    category: 'baby',
  },
  {
    id: 3,
    image: '/images/baby/first-smile.jpg',
    title: 'Smile',
    age: '',
    date: '2025-01-24',
    caption: 'The day you smiled at us for the first time — our hearts melted into a thousand pieces.',
    category: 'baby',
  },
  {
    id: 4,
    image: '/images/first-birthday/birthday-cake.jpg',
    title: 'Your First Birthday',
    age: '',
    date: '2025-10-24',
    caption: 'One whole year of pure love and happiness. You made everything so special!',
    category: 'first-birthday',
  },
  {
    id: 5,
    image: '/images/childhood/adventures.jpg',
    title: 'Little Adventures',
    age: '',
    date: '2026-04-24',
    caption: 'Exploring the world with those curious little eyes and tiny brave steps.',
    category: 'childhood',
  },
  {
    id: 6,
    image: '/images/childhood/first-steps.jpg',
    title: 'Your Steps',
    age: '',
    date: '2025-09-24',
    caption: 'Those wobbly little steps were the beginning of your biggest adventures.',
    category: 'childhood',
    imagePosition: 'top',  // face is at the bottom of this photo
  },
  {
    id: 7,
    image: '/images/childhood/playing.jpg',
    title: 'Playtime Magic',
    age: '',
    date: '2026-04-24',
    caption: 'Every toy became a treasure, every game became an adventure.',
    category: 'childhood',
  },
  {
    id: 8,
    image: '/images/family/family-love.jpg',
    title: 'Beautiful Family Moments',
    age: '',
    date: '2026-06-24',
    caption: 'Surrounded by love — the warmest, safest place in the whole world.',
    category: 'family',
  },
  {
    id: 9,
    image: '/images/recent/recent-photo.jpg',
    title: 'Growing So Beautiful',
    age: '',
    date: '2026-09-24',
    caption: 'Every day you become more beautiful, more curious, more amazing.',
    category: 'recent',
  },
  {
    id: 10,
    image: '/images/recent/princess-today.jpg',
    title: 'Our Little Princess Today',
    age: '',
    date: '2026-10-20',
    caption: 'Look how far you have come! You are our everything, today and always.',
    category: 'recent',
  },
];

// ─── GALLERY PHOTOS ─────────────────────────────────────────
// These appear in the Photo Gallery section
// Add as many as you want! They can overlap with timeline photos.
export const galleryPhotos = [
  {
    id: 'g1',
    image: '/images/baby/first-day.jpg',
    caption: 'Welcome to the world, little one',
    category: 'baby',
    style: 'polaroid', // 'polaroid' or 'rounded'
  },
  {
    id: 'g2',
    image: '/images/baby/tiny-baby.jpg',
    caption: 'Tiny fingers, tiny toes',
    category: 'baby',
    style: 'rounded',
  },
  {
    id: 'g3',
    image: '/images/baby/first-smile.jpg',
    caption: 'That magical first smile',
    category: 'baby',
    style: 'polaroid',
  },
  {
    id: 'g4',
    image: '/images/first-birthday/birthday-cake.jpg',
    caption: 'Happy First Birthday!',
    category: 'first-birthday',
    style: 'rounded',
  },
  {
    id: 'g5',
    image: '/images/childhood/adventures.jpg',
    caption: 'Little explorer',
    category: 'childhood',
    style: 'polaroid',
  },
  {
    id: 'g6',
    image: '/images/childhood/first-steps.jpg',
    caption: 'Look at me walk!',
    category: 'childhood',
    style: 'rounded',
  },
  {
    id: 'g7',
    image: '/images/childhood/playing.jpg',
    caption: 'Playtime fun',
    category: 'childhood',
    style: 'polaroid',
  },
  {
    id: 'g8',
    image: '/images/family/family-love.jpg',
    caption: 'Family is everything',
    category: 'family',
    style: 'rounded',
  },
  {
    id: 'g9',
    image: '/images/recent/recent-photo.jpg',
    caption: 'Growing up so fast',
    category: 'recent',
    style: 'polaroid',
  },
  {
    id: 'g10',
    image: '/images/recent/princess-today.jpg',
    caption: 'Our princess today',
    category: 'recent',
    style: 'rounded',
  },
];

// ─── GALLERY FILTER CATEGORIES ──────────────────────────────
export const galleryCategories = [
  { key: 'all', label: '✨ All Memories' },
  { key: 'baby', label: '👶 Baby Days' },
  { key: 'first-birthday', label: '🎂 First Birthday' },
  { key: 'childhood', label: '🌸 Childhood' },
  { key: 'family', label: '👨‍👩‍👧 Family' },
  { key: 'recent', label: '📷 Recent' },
];
