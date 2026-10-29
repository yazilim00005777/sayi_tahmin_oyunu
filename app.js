/* ===================================================
   AŞK TAHMİNİ - MERYEM & SABRİ
   Game Engine, Romantic Dares & Interactive Audio
   =================================================== */

// --- Sound Synthesizer (Web Audio API - Zero External Dependencies) ---
class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playHigher() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Rising two-tone chime for "higher"
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.16);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playLower() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Falling two-tone chime for "lower"
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.16);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Celebratory romantic fanfare chords (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0, now + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.48);
    });
  }
}

// --- Dare Deck Engine (Non-Repeating Shuffled Bag) ---
class DareDeck {
  constructor(items) {
    this.original = [...items];
    this.pool = [];
    this.shuffle();
  }

  shuffle() {
    this.pool = [...this.original];
    for (let i = this.pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.pool[i], this.pool[j]] = [this.pool[j], this.pool[i]];
    }
  }

  next() {
    if (this.pool.length === 0) {
      this.shuffle();
    }
    return this.pool.pop();
  }
}

// --- Romantic Flirty Dares & Punishments Database (+135 İlk Date & Bank Aktiviteleri) ---
const ROMANTIC_DARES = {
  general: [
    "Bankta aradaki mesafeyi sıfırlayıp omuz omuza yapışık oturmak ve sonraki tura kadar öyle kalmak 🥰",
    "Üşüyen ellerinizi birleştirip 'Kimin eli daha sıcak?' testi yapmak ve elini montunun cebine sokmak 🧤🤍",
    "Kazananın omzuna başını yaslayıp gözlerini kapatarak 15 saniye öylece dinlenmek 🧸✨",
    "Fal bakma bahanesiyle kazananın avuç içini parmaklarınla yavaşça ve gıdıklayarak okşamak 🖐️✨",
    "Kulaklığın tekini kazanana verip en sevdiğin şarkıyı açmak ve bankta omuz omuza ritim tutmak 🎶",
    "Kızın köprücük kemiğinden/boyun çukurundan koklayarak minik bir buse almak 💋🔥",
    "Erkeğin çenesini parmakla hafifçe tutup yanağına/çenesine sıcak bir öpücük kondurmak 🥰",
    "Burun buruna gelip 5 saniye boyunca göz göze 'Eskimo öpücüğü' yapmak (ilk gülen kaybeder!) 👃✨",
    "Kazananın boynuna hafifçe sıcak bir nefes üfleyip 'Tüylerin diken diken oldu mu?' diye fısıldamak 🌬️🔥",
    "Avucunun içini öpüp parmaklarını birbirine kenetlemek ve sıradaki tura kadar eli bırakmamak 🤝🤍",
    "Kazananın çenesini parmağınla tutup gözlerinin içine 10 saniye boyunca hiç kırpmadan bakmak 👀🔥",
    "Kazananın kulağının arkasını usulca koklayıp parfümün notalarını tahmin etmeye çalışmak 🌸",
    "Bankta bir kolunu kazananın omzuna veya arkasına atıp hafifçe kendine doğru çekmek 🤗",
    "Kazananın rüzgarda dağılan saçlarını ellerinle düzeltip kulağının arkasına usulca iliştirmek ✨",
    "Dudağının hemen kenarına/gamzesine minicik ve kaçak bir öpücük çalmak 💋",
    "Bankta bacak bacağa değecek şekilde oturup 'Burası çok mu soğuk yoksa sadece sen mi yakıyorsun?' demek 😏🔥",
    "Kazananın yanağını iki parmağınla hafifçe sıkıp 'Çok tatlısın ama bu turu ben aldım' demek 🤏😄",
    "Kazananın ensesindeki saç diplerini parmak uçlarıyla hafifçe okşamak 🧸",
    "Ellerle parmak güreşi yapmak, kaybeden kazananın elinin üstünü öpmek 🖐️💋",
    "Kazananın kulağına çok yakın bir mesafeden 'İlk gördüğüm andan beri bende bıraktığın etkiyi' fısıldamak 🤫",
    "Kazananın parmak boğumlarını tek tek öpmek ve gözlerine bakıp gülümsemek 🤍",
    "Kazananın ellerini tutup avuçlarının içine sıcak nefesini üfleyerek ısıtmak 🌬️🤲",
    "Göz temasını hiç kesmeden kazananın yüzündeki en sevdiğin 3 detayı söylemek ✨",
    "Bankta kazananın montunun cebine elini sokup orada elini tutmak 🧤🥰",
    "Kazananın boynundaki atkıyı/yakayı düzeltme bahanesiyle boynuna çok yaklaşıp kokusunu içine çekmek 🧣🔥",
    "Kazananın alnına sıcacık, şefkatli bir buse kondurmak 💋✨",
    "Kazananın yanağına burnunu değdirip 'Tenin çok güzel kokuyor' demek 🌸",
    "Bankta otururken kazananın elini bacağının üzerine koyup sımsıkı tutmak 🤝🔥",
    "Kazananın kulağına eğilip 'Kalp atışlarımı duyabiliyor musun?' diye fısıldamak 💓",
    "Burun ucuna tatlı bir öpücük kondurup 'Çok şebeksin' demek 👃🥰",
    "Kazananın boynundaki nabzını parmak uçlarınla ölçmeye çalışıp 'Bence heyecanlandın' demek 🩺😏",
    "Bankta sırt sırta verip arkana yaslanmak ve derin bir nefes almak 🤗",
    "Kazananın elini tutup kendi göğsünün üzerine (kalbinin tam üstüne) koymak 💓✨",
    "Kazananın çenesini gıdıklayıp güldürmek, sonra hemen yanağından öpmek 🤏💋",
    "Kazananın kulağına çok sessizce 'Bu date hiç bitmesin istiyorum' diye fısıldamak 🤫",
    "Kazananın parmaklarıyla kendi parmaklarını birbirine geçirip kenetlenmiş ellerin fotoğrafını çekmek 📸🤍",
    "Kazananın göz kapağına minik ve tüy kadar hafif bir öpücük kondurmak 🕊️💋",
    "Bankta otururken kazananın koluna girip başını omzuna yaslamak 🥰",
    "Kazananın yüzüne dikkatlice bakıp 'Gözlerinin rengi yakından çok daha tehlikeli' demek 👀🔥",
    "Kazananın elini kaldırıp prenses/prens gibi elinin tersini nazikçe öpmek 👑",
    "Kazananın boynunu parmak uçlarınla hafifçe gıdıklayıp kaçmak 😄✨",
    "Bankta yan yana otururken birden kazananın beline sarılıp kendine çekmek 🤗🔥",
    "Kazananın iki elini birden tutup gözlerinin içine bakarak 'Şu an ne düşündüğümü tahmin et' demek 😏",
    "Kazananın kulak memesine hafifçe dokunup 'Burası da kızardı mı acaba?' diye takılmak 👂🥰",
    "Kazananın yanağını okşarken baş parmağınla dudağının kenarına hafifçe dokunmak 💋🔥",
    "Bankın kenarından gökyüzüne bakıp kazananın kulağına 'Sen yanımdayken manzara pek ilgimi çekmiyor' demek 🌌",
    "Kazananın burnunu iki parmağınla hafifçe sıkıp 'Bu burun çok tatlı' demek 👃😄",
    "Kazananın bileğindeki nabzına sıcak bir buse kondurmak 💋",
    "Kazananın saçından minik bir tutamı parmağına dolayıp gözlerinin içine bakmak 🧸✨",
    "Bankta birbirinize o kadar yaklaşın ki nefesleriniz birbirine karışsın ve 5 saniye öyle durun 🔥",
    "Kazananın yanağına peş peşe 3 minik 'pıt pıt' öpücük kondurmak 💋💋💋",
    "Kazananın avucuna parmağınla gizli bir harf çizip hangi harf olduğunu tahmin ettirmek ✍️🤍",
    "Bankta kazananın ceketinin fermuarını veya yakasını düzeltirken göz göze gelip gülümsemek ✨",
    "Kazananın çenesinden tutup başını hafifçe yana eğdirerek boynuna derin bir nefes bırakmak 🌬️🔥",
    "Kazananın elini kendi cebine sokup 'Burası daha sıcak' demek 🧤🥰",
    "Kazananın kulağına en fısıltılı ses tonuyla 'Bu banktan hiç kalkmayalım mı?' demek 🤫🔥",
    "Kazananın gözlerini ellerinle kapatıp arkadan kulağına yaklaşarak sürpriz bir iltifat fısıldamak 🙈✨",
    "Kazananın omzuna başını koyup 'Kokun çok huzur verici' demek 🌸",
    "Ellerini kenetleyip sallayarak bankta ritim tutmak ve kazananın yanağını öpmek 🎶💋",
    "Kazananın yüzündeki gamzeyi veya beni parmağınla gösterip tam oraya minik bir buse kondurmak 💋✨",
    "Bankta bacaklarınızı birbirine bitiştirip 'Kaç derece sıcaklık üretiyoruz acaba?' diye takılmak 🔥😄",
    "Kazananın elinin içini koklayıp 'Parfümün tenine çok yakışmış' demek 🌸🤍",
    "Kazananın saçlarını koklayıp içine derin bir nefes çekmek 🧸",
    "Kazananın iki elini ellerinin arasına alıp 'Bugün seninle olmak çok iyi geldi' demek 🤍",
    "Bankta kazananın omzuna yaslanıp gökyüzüne birlikte bakarak 10 saniye sessizce sarılmak ✨"
  ],
  meryemWins: [
    "Sabri hemen Meryem'in köprücük kemiğinden/boyun çukurundan koklayarak öpecek! 💋🔥",
    "Sabri, Meryem'in çenesini hafifçe kaldırıp yanağına sıcacık bir buse konduracak 🥰",
    "Sabri, burnunu Meryem'in burnuna dayayıp 5 saniye 'Eskimo öpücüğü' yapacak (ilk gülen yenilir)! 👃💖",
    "Sabri, Meryem'in ela gözlerinin içine 10 saniye hipnotize olmuş gibi bakıp 'Gözlerin aklımı başımdan alıyor' diyecek 👀✨",
    "Sabri, Meryem'in kulağının arkasını usulca koklayıp 'Parfümün başımı döndürdü' diye fısıldayacak 🌸",
    "Sabri, Meryem'in elini iki eliyle tutup parmak uçlarını tek tek öpecek 🤍",
    "Sabri, Meryem'in kumral saçlarını kulağının arkasına atıp boynuna hafifçe üfleyecek 🌬️🥰",
    "Sabri, Meryem'i belinden tutup hafifçe kendine çekecek ve 15 saniye sımsıkı sarılacak 🤗",
    "Sabri, Meryem'in yanağını hafifçe sıkıp 'Çok güzelsin ama bu sayı tesadüftü' diye takılacak 🤏😄",
    "Sabri, Meryem'in avucunun tam ortasına sıcak ve uzun bir öpücük konduracak 💋",
    "Sabri, bankta Meryem'in üşüyen ellerini montunun cebine alıp orada sımsıkı tutacak 🧤🤍",
    "Sabri, Meryem'in omzuna kolunu atıp başını hafifçe omzuna yaslamasını isteyecek 🥰",
    "Sabri, Meryem'in alnına koruyucu ve içten bir öpücük bırakacak ✨",
    "Sabri, Meryem'in çenesini tutup 'Bu gülüş için tüm oyunları kaybetmeye değer' diyecek 💋",
    "Sabri, Meryem'in avucuna parmağıyla minik bir kalp çizecek ✍️💖",
    "Sabri, Meryem'in kulak memesine hafifçe dokunup kulağına 'Gözlerin çok tehlikeli bakıyor' diyecek 👂🔥",
    "Sabri, Meryem'in ensesindeki saçları hafifçe toplayıp kokusunu içine çekecek 🌸",
    "Sabri, Meryem'in göz kapağına tüy kadar hafif bir kelebek öpücüğü konduracak 🦋💋",
    "Sabri, Meryem'in bacağına hafifçe dokunup 'Bankta biraz daha bana yaklaşır mısın?' diyecek 😏🔥",
    "Sabri, Meryem'in yanağındaki gamzeyi/gülüşü öpüp 'Burası benim favorim' diyecek 💋",
    "Sabri, Meryem'in iki elini birden tutup kalbinin üzerine koyacak: 'Hızını duyabiliyor musun?' 💓",
    "Sabri, Meryem'in burnunu hafifçe sıkıp 'Çok tatlı bir şeysin' diyecek 👃😄",
    "Sabri, Meryem'e kulaklığını takıp ona özel en romantik melodiyi açacak 🎶",
    "Sabri, Meryem'in ceketinin yakasını düzeltirken gözlerine bakıp büyülenmiş gibi duracak ✨",
    "Sabri, Meryem'in parmaklarıyla kendi parmaklarını kenetleyip elinin üstünü öpecek 🤍",
    "Sabri, Meryem'in bileğindeki nabzını dudaklarıyla hissetmeye çalışacak 💋",
    "Sabri, Meryem'in kulağına fısıldayıp 'Sıradaki turu da kazanırsan kaçamam senden' diyecek 🤫🔥",
    "Sabri, Meryem'in yanağına peş peşe 3 pıt pıt öpücük bırakacak 💋💋💋",
    "Sabri, bankta Meryem'in arkasına kolunu uzatıp rüzgardan korur gibi sarılacak 🤗",
    "Sabri, Meryem'in saçından bir bukleyi parmağına dolayıp 'Kumral saçların çok güzel' diyecek 🧸",
    "Sabri, Meryem'in dudaklarının hemen kenarına kaçak bir öpücük çalacak 💋✨",
    "Sabri, Meryem'in ellerini nefesiyle ısıtıp 'İçim ısınıyor sana bakınca' diyecek 🌬️🤍",
    "Sabri, Meryem'in çenesini hafifçe gıdıklayıp güldürdükten sonra sımsıkı sarılacak 😄💖",
    "Sabri, Meryem'in ela gözlerine 10 saniye gözünü kırpmadan bakma meydan okumasını kabul edecek 👀✨",
    "Sabri, Meryem'in başını göğsüne yaslayıp saçlarını usulca okşayacak 🧸🤍"
  ],
  sabriWins: [
    "Meryem, Sabri'nin çenesinden hafifçe tutup yanağına/çenesine sıcak bir öpücük konduracak! 💋",
    "Meryem, burnunu Sabri'nin burnuna sürtüp tatlı bir 'Eskimo öpücüğü' verecek! 👃🥰",
    "Meryem, Sabri'nin boyun çukuruna burnunu değdirip parfümünü derin bir nefesle içine çekecek 🔥",
    "Meryem, Sabri'nin mavi gözlerinin içine 10 saniye boyunca gözünü kırpmadan bakacak (ilk gülen kaybeder)! 👀💙",
    "Meryem, Sabri'nin kumral saçlarını parmaklarıyla karıştırıp kulağına 'Çok tatlısın yakışıklı' diyecek 🧸",
    "Meryem, Sabri'nin yanağını iki parmağıyla sıkıp tatlı tatlı 'Seni yerim' diyecek! 🤏😄",
    "Meryem, Sabri'nin ellerini tutup parmaklarını kenetleyecek ve avucunun içini öpecek 🤍",
    "Meryem, Sabri'nin beline sarılıp kafasını göğsüne yaslayarak 15 saniye öylece kalacak 🤗",
    "Meryem, Sabri'nin ensesindeki saçları usulca okşayıp 'Şanslıydın ama hoşuma gitti' diye fısıldayacak 🤫✨",
    "Meryem, Sabri'nin dudağının hemen kenarına minik ve kaçak bir buse konduracak 💋✨",
    "Meryem, bankta yana kayıp Sabri'nin koluna girecek ve başını omzuna yaslayacak 🥰",
    "Meryem, elini Sabri'nin ceketinin cebine sokup orada elini tutacak 🧤🤍",
    "Meryem, Sabri'nin kulak memesine hafifçe dokunup 'Kızardın mı sen?' diye takılacak 👂🥰",
    "Meryem, Sabri'nin alnına sıcacık bir tebrik öpücüğü bırakacak ✨",
    "Meryem, Sabri'nin mavi gözlerini överken çenesini parmağıyla tutup gülümseyecek 👀💙",
    "Meryem, Sabri'nin avucuna gizli bir harf çizip 'Bil bakalım ne yazdım?' diyecek ✍️🤍",
    "Meryem, Sabri'nin boynuna hafifçe üfleyip 'Nasıl ürperdin ama!' diye gülecek 🌬️😄",
    "Meryem, Sabri'nin parmak boğumlarını tek tek öpecek 🤍",
    "Meryem, Sabri'nin omzuna başını koyup 'Kokun çok güzelmiş' diyecek 🌸",
    "Meryem, Sabri'nin burnuna minik bir dokunuş yapıp 'Bu tur senin olsun bakalım' diyecek 👃💋",
    "Meryem, Sabri'nin elini kaldırıp nazikçe elinin üstünü öpecek 👑",
    "Meryem, Sabri'nin yanağına 3 kere peş peşe minik buse konduracak 💋💋💋",
    "Meryem, Sabri'nin kulağına çok yakınlaşıp 'Gözlerin beni biraz heyecanlandırıyor' diye fısıldayacak 🤫🔥",
    "Meryem, Sabri'nin ellerini kendi ellerinin arasına alıp ısıtacak 🤲✨",
    "Meryem, Sabri'nin çenesini tutup 'Bugün bayağı şanslısın' deyip yanağından öpecek 💋",
    "Meryem, Sabri'ye bankta sımsıkı sarılıp 15 saniye boyunca hiç bırakmayacak 🤗",
    "Meryem, Sabri'nin boynundaki atkıyı/yakayı düzeltirken gözlerinin içine bakacak ✨",
    "Meryem, Sabri'nin avucunun içine derin bir buse konduracak 💋",
    "Meryem, Sabri'nin ensesine parmaklarıyla hafifçe masaj yapacak 🧸",
    "Meryem, Sabri'nin kulağının arkasını koklayıp 'Parfümüne 10 üzerinden 10 verdim' diyecek 🌸",
    "Meryem, Sabri'nin elini bacağının üzerine koyup 'Böyle kalsın' diyecek 🤝🔥",
    "Meryem, Sabri'nin göğsüne elini koyup 'Kalbin çok mu hızlı atıyor?' diye kontrol edecek 💓",
    "Meryem, Sabri'nin burnunu burnuna 5 saniye boyunca sürtüp kıkırdayacak 👃🥰",
    "Meryem, Sabri'nin ceketini hafifçe çekiştirip 'Biraz daha yakın otur bakalım' diyecek 😏🔥",
    "Meryem, Sabri'nin yanağına tüy gibi bir kelebek öpücüğü konduracak 🦋💋"
  ]
};

// Initialize Dare Decks for seamless non-repeating draws
const DareDecks = {
  general: new DareDeck(ROMANTIC_DARES.general),
  meryemWins: new DareDeck(ROMANTIC_DARES.meryemWins),
  sabriWins: new DareDeck(ROMANTIC_DARES.sabriWins)
};

// --- Game State Object ---
const GameState = {
  secretNumber: 0,
  currentTurn: 'sabri', // 'sabri' or 'meryem'
  minBound: 0,
  maxBound: 100,
  attempts: { sabri: 0, meryem: 0 },
  scores: { sabri: 0, meryem: 0 },
  round: 1,
  history: [],
  decks: DareDecks,
  isGameOver: false,
  sound: new SoundController()
};

// --- DOM Elements ---
const DOM = {
  bgHearts: document.getElementById('bgHearts'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  resetGameBtn: document.getElementById('resetGameBtn'),
  shuffleDareBtn: document.getElementById('shuffleDareBtn'),
  dareText: document.getElementById('dareText'),
  cardSabri: document.getElementById('cardSabri'),
  cardMeryem: document.getElementById('cardMeryem'),
  sabriAttempts: document.getElementById('sabriAttempts'),
  meryemAttempts: document.getElementById('meryemAttempts'),
  sabriScore: document.getElementById('sabriScore'),
  meryemScore: document.getElementById('meryemScore'),
  roundCounter: document.getElementById('roundCounter'),
  minBound: document.getElementById('minBound'),
  maxBound: document.getElementById('maxBound'),
  rangeBarFill: document.getElementById('rangeBarFill'),
  statusMessage: document.getElementById('statusMessage'),
  currentTurnBanner: document.getElementById('currentTurnBanner'),
  turnAvatarIcon: document.getElementById('turnAvatarIcon'),
  turnBannerText: document.getElementById('turnBannerText'),
  guessInput: document.getElementById('guessInput'),
  quickSlider: document.getElementById('quickSlider'),
  btnMinus5: document.getElementById('btnMinus5'),
  btnMinus1: document.getElementById('btnMinus1'),
  btnPlus1: document.getElementById('btnPlus1'),
  btnPlus5: document.getElementById('btnPlus5'),
  submitGuessBtn: document.getElementById('submitGuessBtn'),
  historyList: document.getElementById('historyList'),
  historyCount: document.getElementById('historyCount'),
  victoryModal: document.getElementById('victoryModal'),
  winnerAvatar: document.getElementById('winnerAvatar'),
  winnerTitle: document.getElementById('winnerTitle'),
  winnerSubtitle: document.getElementById('winnerSubtitle'),
  dareResultAction: document.getElementById('dareResultAction'),
  nextRoundBtn: document.getElementById('nextRoundBtn'),
  shareResultBtn: document.getElementById('shareResultBtn'),
  modalConfetti: document.getElementById('modalConfetti'),
  toastMessage: document.getElementById('toastMessage')
};

// --- Initialization ---
function initApp() {
  createFloatingHearts();
  pickRandomDare();
  startNewRound(true);
  attachEventListeners();
}

// --- Floating Hearts Background ---
function createFloatingHearts() {
  const heartEmojis = ['💖', '💕', '🌸', '✨', '🤍', '🧸', '💋'];
  const count = 18;
  
  DOM.bgHearts.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.classList.add('floating-heart');
    span.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${8 + Math.random() * 12}s`;
    span.style.animationDelay = `${Math.random() * 8}s`;
    span.style.fontSize = `${0.9 + Math.random() * 1.1}rem`;
    DOM.bgHearts.appendChild(span);
  }
}

// --- Dare Shuffle System (Non-Repeating Shuffled Bag) ---
function pickRandomDare() {
  const nextDare = GameState.decks.general.next();
  updateDareDisplay(nextDare);
}

function updateDareDisplay(text) {
  DOM.dareText.style.opacity = '0';
  setTimeout(() => {
    DOM.dareText.textContent = text;
    DOM.dareText.style.opacity = '1';
  }, 150);
}

// --- Start / Reset Round ---
function startNewRound(isFullReset = false) {
  GameState.secretNumber = Math.floor(Math.random() * 101); // 0 to 100
  GameState.minBound = 0;
  GameState.maxBound = 100;
  GameState.attempts.sabri = 0;
  GameState.attempts.meryem = 0;
  GameState.history = [];
  GameState.isGameOver = false;

  if (isFullReset) {
    GameState.round = 1;
    GameState.scores.sabri = 0;
    GameState.scores.meryem = 0;
    // Alternate or pick randomly who starts
    GameState.currentTurn = Math.random() > 0.5 ? 'sabri' : 'meryem';
  } else {
    GameState.round += 1;
    // Winner starts or alternating
    GameState.currentTurn = (GameState.round % 2 === 0) ? 'meryem' : 'sabri';
  }

  // Update UI Elements
  updatePlayerHUD();
  updateRangeDisplay();
  updateTurnDisplay();
  clearHistoryList();
  
  DOM.guessInput.value = '';
  DOM.quickSlider.value = 50;
  DOM.quickSlider.min = 0;
  DOM.quickSlider.max = 100;

  DOM.statusMessage.innerHTML = `Gizli sayı tutuldu (0 - 100)! İlk tahmini <b>${getPlayerName(GameState.currentTurn)}</b> yapacak. 🎯`;
  closeVictoryModal();
}

// --- Helpers ---
function getPlayerName(playerKey) {
  return playerKey === 'sabri' ? 'Sabri' : 'Meryem';
}

function getPlayerAvatar(playerKey) {
  return playerKey === 'sabri' ? '👨🏻‍💼' : '👩🏻‍🦰';
}

// --- Turn & HUD Updates ---
function updatePlayerHUD() {
  DOM.sabriAttempts.textContent = GameState.attempts.sabri;
  DOM.meryemAttempts.textContent = GameState.attempts.meryem;
  DOM.sabriScore.textContent = GameState.scores.sabri;
  DOM.meryemScore.textContent = GameState.scores.meryem;
  DOM.roundCounter.textContent = `Tur ${GameState.round}`;

  if (GameState.currentTurn === 'sabri') {
    DOM.cardSabri.classList.add('active-turn');
    DOM.cardMeryem.classList.remove('active-turn');
  } else {
    DOM.cardMeryem.classList.add('active-turn');
    DOM.cardSabri.classList.remove('active-turn');
  }
}

function updateTurnDisplay() {
  const current = GameState.currentTurn;
  const name = getPlayerName(current);
  const avatar = getPlayerAvatar(current);
  const attemptNum = GameState.attempts[current] + 1;

  DOM.turnAvatarIcon.textContent = avatar;
  DOM.turnBannerText.innerHTML = `Sıra <b>${name}</b>'de! (${attemptNum}. tahmini)`;

  if (current === 'sabri') {
    DOM.currentTurnBanner.style.borderColor = 'rgba(56, 189, 248, 0.4)';
    DOM.currentTurnBanner.style.background = 'rgba(56, 189, 248, 0.1)';
  } else {
    DOM.currentTurnBanner.style.borderColor = 'rgba(255, 117, 140, 0.4)';
    DOM.currentTurnBanner.style.background = 'rgba(255, 117, 140, 0.1)';
  }
}

function updateRangeDisplay() {
  DOM.minBound.textContent = GameState.minBound;
  DOM.maxBound.textContent = GameState.maxBound;

  // Narrow slider bounds to guide the player
  DOM.quickSlider.min = GameState.minBound;
  DOM.quickSlider.max = GameState.maxBound;

  // Visual Range Track Fill percentage
  const leftPct = GameState.minBound;
  const widthPct = Math.max(GameState.maxBound - GameState.minBound, 1);
  DOM.rangeBarFill.style.left = `${leftPct}%`;
  DOM.rangeBarFill.style.width = `${widthPct}%`;
}

// --- Submit Guess Logic ---
function handleGuessSubmit() {
  if (GameState.isGameOver) return;

  const rawVal = DOM.guessInput.value.trim();
  if (rawVal === '') {
    showToast('Lütfen bir sayı gir tatlım! 💖');
    DOM.guessInput.focus();
    return;
  }

  const guess = parseInt(rawVal, 10);
  if (isNaN(guess) || guess < 0 || guess > 100) {
    showToast('0 ile 100 arasında bir sayı olmalı! ✨');
    return;
  }

  // Check if out of narrowed bounds
  if (guess < GameState.minBound || guess > GameState.maxBound) {
    showToast(`Aralığımız ${GameState.minBound} ile ${GameState.maxBound} arası! 🌸`);
    return;
  }

  const activePlayer = GameState.currentTurn;
  GameState.attempts[activePlayer] += 1;
  const playerAttempts = GameState.attempts[activePlayer];

  const diff = Math.abs(guess - GameState.secretNumber);

  // Victory Condition
  if (guess === GameState.secretNumber) {
    handleWin(activePlayer, guess, playerAttempts);
    return;
  }

  // Higher or Lower evaluation
  let clueDirection = '';
  let clueType = '';
  let clueText = '';
  let soundType = '';

  if (guess < GameState.secretNumber) {
    // Secret is bigger
    clueDirection = '⬆️ Daha BÜYÜK bir sayı!';
    clueType = 'clue-higher';
    soundType = 'higher';
    if (guess >= GameState.minBound) {
      GameState.minBound = guess + 1;
    }
  } else {
    // Secret is smaller
    clueDirection = '⬇️ Daha KÜÇÜK bir sayı!';
    clueType = 'clue-lower';
    soundType = 'lower';
    if (guess <= GameState.maxBound) {
      GameState.maxBound = guess - 1;
    }
  }

  // Proximity hint (Warm / Cold)
  let proximityHint = '';
  if (diff <= 3) {
    proximityHint = 'Alev Alev! 🔥 Çok yakın!';
    clueType = 'clue-hot';
  } else if (diff <= 8) {
    proximityHint = 'Sıcak! ♨️';
  } else if (diff <= 15) {
    proximityHint = 'Ilık 🌤️';
  } else {
    proximityHint = 'Soğuk ❄️';
  }

  clueText = `${clueDirection} (${proximityHint})`;

  // Play audio
  if (soundType === 'higher') {
    GameState.sound.playHigher();
  } else {
    GameState.sound.playLower();
  }

  // Log to history
  addHistoryItem(activePlayer, guess, playerAttempts, clueText, clueType);

  // Update Status Message
  DOM.statusMessage.innerHTML = `<b>${getPlayerName(activePlayer)}</b> ${guess} dedi: <span class="${clueType}">${clueText}</span>`;

  // Update Visual Bounds
  updateRangeDisplay();

  // Switch Turn
  GameState.currentTurn = (activePlayer === 'sabri') ? 'meryem' : 'sabri';
  updatePlayerHUD();
  updateTurnDisplay();

  // Reset Input for next player with sensible midpoint
  const newSuggested = Math.round((GameState.minBound + GameState.maxBound) / 2);
  DOM.guessInput.value = '';
  DOM.quickSlider.value = newSuggested;
  DOM.guessInput.placeholder = newSuggested;
}

// --- Victory Handler ---
function handleWin(winnerKey, luckyNumber, attempts) {
  GameState.isGameOver = true;
  GameState.scores[winnerKey] += 1;
  updatePlayerHUD();

  GameState.sound.playWin();

  const winnerName = getPlayerName(winnerKey);
  const loserName = (winnerKey === 'sabri') ? 'Meryem' : 'Sabri';
  
  // Render custom SVG Avatar in victory modal
  const winnerWrap = document.getElementById(winnerKey === 'sabri' ? 'sabriAvatarWrap' : 'meryemAvatarWrap');
  if (winnerWrap && winnerWrap.querySelector('svg')) {
    DOM.winnerAvatar.innerHTML = winnerWrap.querySelector('svg').outerHTML;
  } else {
    DOM.winnerAvatar.textContent = getPlayerAvatar(winnerKey);
  }

  DOM.winnerTitle.textContent = `Tebrikler ${winnerName}! 💖`;
  DOM.winnerSubtitle.innerHTML = `Gizli sayıyı (<b>${luckyNumber}</b>) ${attempts}. denemede bildin!`;

  // Pick non-repeating flirty dare customized for this outcome
  const deck = (winnerKey === 'sabri') ? GameState.decks.sabriWins : GameState.decks.meryemWins;
  const dareAction = deck.next();

  DOM.dareResultAction.textContent = dareAction;

  // Add final victory item to history
  addHistoryItem(winnerKey, luckyNumber, attempts, 'BİLDİ! 🏆 Kazandı!', 'clue-hot');

  // Launch confetti & open modal
  triggerConfetti();
  openVictoryModal();
}

// --- History List Display ---
function addHistoryItem(playerKey, guess, attemptCount, clueText, clueClass) {
  const emptyPlaceholder = DOM.historyList.querySelector('.empty-history-placeholder');
  if (emptyPlaceholder) {
    emptyPlaceholder.remove();
  }

  const name = getPlayerName(playerKey);
  const avatar = getPlayerAvatar(playerKey);

  const item = document.createElement('div');
  item.className = `history-item ${playerKey}`;
  item.innerHTML = `
    <div class="history-player-badge">
      <span>${avatar}</span>
      <span>${name} <small>(${attemptCount}.)</small></span>
    </div>
    <div class="history-guess-bubble">${guess}</div>
    <div class="history-clue-text ${clueClass}">${clueText}</div>
  `;

  DOM.historyList.prepend(item);
  GameState.history.push({ player: playerKey, guess, clueText });
  DOM.historyCount.textContent = `${GameState.history.length} Hamle`;
}

function clearHistoryList() {
  DOM.historyList.innerHTML = `
    <div class="empty-history-placeholder">
      Henüz tahmin yapılmadı. Bakalım ilk kim yaklaşacak? 🧸
    </div>
  `;
  DOM.historyCount.textContent = '0 Hamle';
}

// --- Confetti Generator ---
function triggerConfetti() {
  DOM.modalConfetti.innerHTML = '';
  const colors = ['#ff4d79', '#ff758c', '#38bdf8', '#fbbf24', '#a855f7', '#ffffff'];
  const count = 36;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${1.5 + Math.random() * 2}s`;
    p.style.animationDelay = `${Math.random() * 0.4}s`;
    p.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    DOM.modalConfetti.appendChild(p);
  }
}

// --- Modal Control ---
function openVictoryModal() {
  DOM.victoryModal.classList.add('active');
  DOM.victoryModal.setAttribute('aria-hidden', 'false');
}

function closeVictoryModal() {
  DOM.victoryModal.classList.remove('active');
  DOM.victoryModal.setAttribute('aria-hidden', 'true');
}

// --- Toast Messages ---
let toastTimer = null;
function showToast(message) {
  DOM.toastMessage.textContent = message;
  DOM.toastMessage.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    DOM.toastMessage.classList.remove('show');
  }, 2400);
}

// --- Share / Copy Results ---
function shareResults() {
  const winner = (GameState.scores.sabri > GameState.scores.meryem) ? 'Sabri' : 'Meryem';
  const text = `🔥 İlk Date & Flört Tahmin Oyunu:
🏆 Skor: Sabri ${GameState.scores.sabri} - ${GameState.scores.meryem} Meryem
💋 Son Tur Cezası: ${DOM.dareResultAction.textContent}
Bakalım sıradaki tur kim kazanacak? 😉✨`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Sonuç kopyalandı! WhatsApp\'tan atabilirsin 📋💖');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast('Sonuç kopyalandı! 💌');
}

// --- Quick Stepper Adjuster ---
function adjustGuess(amount) {
  GameState.sound.playClick();
  let current = parseInt(DOM.guessInput.value, 10);
  if (isNaN(current)) {
    current = parseInt(DOM.quickSlider.value, 10) || Math.round((GameState.minBound + GameState.maxBound) / 2);
  }
  let newVal = Math.min(Math.max(current + amount, GameState.minBound), GameState.maxBound);
  DOM.guessInput.value = newVal;
  DOM.quickSlider.value = newVal;
}

// --- Event Listeners ---
function attachEventListeners() {
  // Submit Guess
  DOM.submitGuessBtn.addEventListener('click', () => {
    GameState.sound.playClick();
    handleGuessSubmit();
  });

  // Enter Key on input
  DOM.guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGuessSubmit();
    }
  });

  // Quick Slider real-time sync with input
  DOM.quickSlider.addEventListener('input', (e) => {
    DOM.guessInput.value = e.target.value;
  });

  DOM.guessInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      DOM.quickSlider.value = val;
    }
  });

  // Stepper buttons
  DOM.btnMinus5.addEventListener('click', () => adjustGuess(-5));
  DOM.btnMinus1.addEventListener('click', () => adjustGuess(-1));
  DOM.btnPlus1.addEventListener('click', () => adjustGuess(1));
  DOM.btnPlus5.addEventListener('click', () => adjustGuess(5));

  // Sound Toggle
  DOM.soundToggleBtn.addEventListener('click', () => {
    const isEnabled = GameState.sound.toggle();
    DOM.soundToggleBtn.querySelector('.btn-icon').textContent = isEnabled ? '🔊' : '🔇';
    showToast(isEnabled ? 'Sesler açıldı 🎶' : 'Sesler kapatıldı 🔇');
  });

  // Reset Game Button
  DOM.resetGameBtn.addEventListener('click', () => {
    GameState.sound.playClick();
    if (confirm('Tüm skorlar sıfırlansın ve yeni oyun başlasın mı? 🔄')) {
      startNewRound(true);
      pickRandomDare();
      showToast('Oyun sıfırlandı! İyi eğlenceler 💖');
    }
  });

  // Shuffle Dare Button
  DOM.shuffleDareBtn.addEventListener('click', () => {
    GameState.sound.playClick();
    pickRandomDare();
    showToast('Yeni aşk iddiası seçildi! 💌');
  });

  // Modal Buttons
  DOM.nextRoundBtn.addEventListener('click', () => {
    GameState.sound.playClick();
    closeVictoryModal();
    startNewRound(false);
    pickRandomDare();
    showToast(`Yeni tur başladı! Sıra ${getPlayerName(GameState.currentTurn)}'de 🌸`);
  });

  DOM.shareResultBtn.addEventListener('click', () => {
    GameState.sound.playClick();
    shareResults();
  });
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);
