const filmForm = document.getElementById("filmForm");
const suggestionElement = document.getElementById("suggestedFilm");

filmForm.addEventListener("submit", function(event) {
    event.preventDefault();  

    const genre = document.getElementById("genre").value;
    const mood = document.getElementById("mood").value;
    const viewingPreference = document.getElementById("viewingPreference").value;
    const language = document.getElementById("language").value;

    let recommendedFilm = "";

    const homeMovies = {
        en: {
            aksiyon: ["Mad Max: Fury Road", "John Wick", "The Dark Knight", "Mission: Impossible – Fallout", "Die Hard", "Gladiator", "The Matrix", "Terminator 2: Judgment Day", "The Bourne Identity", "Casino Royale"],
            komedi: ["The Hangover", "Superbad", "The Mask", "The Big Lebowski", "Anchorman", "Step Brothers", "Dumb and Dumber", "Groundhog Day", "Ferris Bueller's Day Off", "Bridesmaids"],
            romantik: ["The Notebook", "Pride and Prejudice", "La La Land", "500 Days of Summer", "Notting Hill", "Love Actually", "A Walk to Remember", "The Princess Bride", "Eternal Sunshine of the Spotless Mind", "Before Sunrise"],
            korku: ["The Conjuring", "Get Out", "A Quiet Place", "It Follows", "The Exorcist", "Halloween", "The Shining", "Hereditary", "The Babadook", "Paranormal Activity"],
            bilimkurgu: ["Inception", "Blade Runner 2049", "Interstellar", "The Martian", "The Matrix", "Star Wars: Episode IV - A New Hope", "Back to the Future", "E.T. the Extra-Terrestrial", "Jurassic Park", "The Terminator"],
            dram: ["The Pursuit of Happyness", "Forrest Gump", "A Beautiful Mind", "The Shawshank Redemption", "Schindler's List", "The Godfather", "Fight Club", "Good Will Hunting", "The Green Mile", "12 Years a Slave"],
            belgesel: ["Won't You Be My Neighbor?", "13th", "Jiro Dreams of Sushi", "Free Solo", "The Last Dance", "Planet Earth", "Blackfish", "The Cove", "An Inconvenient Truth", "Bowling for Columbine"]
        },
        tr: {
            aksiyon: ["Kabadayı", "Fetih 1453", "Dağ II", "Kurtlar Vadisi: Irak", "Deliler Fatih'in Fermanı", "Cingöz Recai", "Behzat Ç. Ankara Yanıyor", "Deli Yürek", "Son Osmanlı Yandım Ali", "Eşkıya"],
            komedi: ["G.O.R.A", "A.R.O.G", "Recep İvedik", "Düğün Dernek", "Çalgı Çengi", "Kardeş Payı", "Leyla ile Mecnun", "Vizontele", "Hokkabaz", "Organize İşler"],
            romantik: ["Aşk Tesadüfleri Sever", "Issız Adam", "Bir Küçük Eylül Meselesi", "Sadece Sen", "İncir Reçeli", "Aşk Geliyorum Demez", "Romantik Komedi", "Evim Sensin", "Aşk Kırmızı", "Mutluluk"],
            korku: ["Dabbe", "Siccin", "Musallat", "Üç Harfliler", "Semum", "Büyü", "Azazil", "El-Cin", "Alkarısı: Cinnet", "Ammar: Cin Tarikatı"],
            bilimkurgu: ["G.O.R.A", "A.R.O.G", "Hokkabaz", "Karakomik Filmler", "Arif V 216", "Küçük Esnaf", "Kötü Kedi Şerafettin", "Karakomik Filmler 2", "Karakomik Filmler 3", "Karakomik Filmler 4"],
            dram: ["Babam ve Oğlum", "Kış Uykusu", "Ahlat Ağacı", "Bir Zamanlar Anadolu'da", "Kelebeğin Rüyası", "Eşkıya", "Vizontele", "Mustang", "Sivas", "Kader"],
            belgesel: ["Kedi", "Buğday", "Yeryüzü Aşkın Yüzü Oluncaya Dek", "Ekümenopolis", "İstanbul'un Fethi", "Anadolu'nun Kayıp Şarkıları", "Kars Öyküleri", "İstanbul Hatırası", "Kuzey Güney", "İstanbul'un Sırları"]
        }
    };

    const cinemaMovies = {
        en: {
            aksiyon: ["Avengers: Endgame", "Spider-Man: No Way Home", "Guardians of the Galaxy", "Fast & Furious 9", "Black Panther", "Wonder Woman", "Mad Max: Fury Road", "The Dark Knight", "Inception", "Gladiator"],
            komedi: ["Deadpool", "The Grand Budapest Hotel", "Thor: Ragnarok", "The Other Guys", "Superbad", "The Hangover", "Anchorman", "Step Brothers", "Dumb and Dumber", "Ferris Bueller's Day Off"],
            romantik: ["Titanic", "La La Land", "The Fault in Our Stars", "A Star is Born", "The Notebook", "Pride and Prejudice", "Love Actually", "Notting Hill", "Before Sunrise", "Eternal Sunshine of the Spotless Mind"],
            korku: ["A Quiet Place Part II", "Hereditary", "Midsommar", "The Lighthouse", "The Conjuring", "Get Out", "It Follows", "The Babadook", "The Exorcist", "Halloween"],
            bilimkurgu: ["Dune", "Star Wars: The Force Awakens", "Avatar", "Edge of Tomorrow", "Inception", "Blade Runner 2049", "Interstellar", "The Martian", "The Matrix", "Jurassic Park"],
            dram: ["1917", "La La Land", "The Revenant", "Once Upon a Time in Hollywood", "The Pursuit of Happyness", "Forrest Gump", "A Beautiful Mind", "The Shawshank Redemption", "Schindler's List", "The Godfather"],
            belgesel: ["Free Solo", "13th", "Jiro Dreams of Sushi", "Won't You Be My Neighbor?", "The Last Dance", "Planet Earth", "Blackfish", "The Cove", "An Inconvenient Truth", "Bowling for Columbine"]
        },
        tr: {
            aksiyon: ["Kabadayı", "Fetih 1453", "Dağ II", "Kurtlar Vadisi: Irak", "Deliler Fatih'in Fermanı", "Cingöz Recai", "Behzat Ç. Ankara Yanıyor", "Deli Yürek", "Son Osmanlı Yandım Ali", "Eşkıya"],
            komedi: ["G.O.R.A", "A.R.O.G", "Recep İvedik", "Düğün Dernek", "Çalgı Çengi", "Kardeş Payı", "Leyla ile Mecnun", "Vizontele", "Hokkabaz", "Organize İşler"],
            romantik: ["Aşk Tesadüfleri Sever", "Issız Adam", "Bir Küçük Eylül Meselesi", "Sadece Sen", "İncir Reçeli", "Aşk Geliyorum Demez", "Romantik Komedi", "Evim Sensin", "Aşk Kırmızı", "Mutluluk"],
            korku: ["Dabbe", "Siccin", "Musallat", "Üç Harfliler", "Semum", "Büyü", "Azazil", "El-Cin", "Alkarısı: Cinnet", "Ammar: Cin Tarikatı"],
            bilimkurgu: ["G.O.R.A", "A.R.O.G", "Hokkabaz", "Karakomik Filmler", "Arif V 216", "Küçük Esnaf", "Kötü Kedi Şerafettin", "Karakomik Filmler 2", "Karakomik Filmler 3", "Karakomik Filmler 4"],
            dram: ["Babam ve Oğlum", "Kış Uykusu", "Ahlat Ağacı", "Bir Zamanlar Anadolu'da", "Kelebeğin Rüyası", "Eşkıya", "Vizontele", "Mustang", "Sivas", "Kader"],
            belgesel: ["Kedi", "Buğday", "Yeryüzü Aşkın Yüzü Oluncaya Dek", "Ekümenopolis", "İstanbul'un Fethi", "Anadolu'nun Kayıp Şarkıları", "Kars Öyküleri", "İstanbul Hatırası", "Kuzey Güney", "İstanbul'un Sırları"]
        }
    };

    if (viewingPreference === "evde") {
        recommendedFilm = homeMovies[language][genre][Math.floor(Math.random() * homeMovies[language][genre].length)];
        recommendedFilm += " (Evde rahatça izleyebilirsiniz.)";
    } else if (viewingPreference === "sinema") {
        recommendedFilm = cinemaMovies[language][genre][Math.floor(Math.random() * cinemaMovies[language][genre].length)];
        recommendedFilm += " (Sinemada izlemek için mükemmel bir seçim!)";
    }

    if (mood === "mutlu") {
        recommendedFilm += " - Harika bir zaman geçirirsiniz!";
    } else if (mood === "üzgün") {
        recommendedFilm += " - Huzurlu bir deneyim sunar.";
    } else if (mood === "heyecanlı") {
        recommendedFilm += " - Sürükleyici bir hikaye!";
    } else if (mood === "korkmuş") {
        recommendedFilm += " - Tüyler ürperten bir deneyim!";
    }

    suggestionElement.textContent = recommendedFilm;
});