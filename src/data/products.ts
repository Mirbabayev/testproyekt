export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  gender: 'kişi' | 'qadın' | 'uniseks';
  size: string;
  concentration: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  inStock: boolean;
  category: string;
  popularity: number;
  // Yeni əlavə edilən xüsusiyyətlər
  ageGroup?: 'gənc' | 'orta yaş' | 'yetkin' | 'hamı üçün'; // Məqsədli yaş qrupu
  timeOfUse?: ('səhər' | 'gündüz' | 'axşam' | 'gecə')[]; // İstifadə üçün tövsiyə olunan vaxt
  season?: ('yaz' | 'yay' | 'payız' | 'qış')[]; // Mövsüm üçün uyğunluq
  style?: ('klassik' | 'müasir' | 'cəsarətli' | 'təbii' | 'ekzotik' | 'zərif')[]; // Ətrin üslubu
  longevity?: 'az' | 'orta' | 'yüksək'; // Qalıcılıq dərəcəsi
  sillage?: 'yaxın' | 'orta' | 'güclü'; // Yayılma gücü (sezilmə məsafəsi)
}

export const products: Product[] = [
  {
    id: "1",
    name: "Dior Sauvage Elixir",
    brand: "Dior",
    description: "Dior Sauvage Elixir - Françis Kurkdjian-ın dəsti-xətti ilə yaradılmış, orijinal Sauvage-ın daha zəngin və konsantrə olunmuş versiyası. Bu əfsanəvi ətrin fəlsəfəsinə sadiq qalaraq daha cəsur və zəngin kompozisiya təqdim edir. Kristal şişədə təqdim olunan bu ətir şəffaf Dior DNA-sını daha tumlu bir strukturda təcəssüm etdirir, şəxsiyyətinizi vurğulayır və özünəməxsus iz buraxır.",
    image: "/images/perfumes/perfume1.jpg",
    price: 160,
    rating: 4.9,
    gender: "kişi",
    size: "60ml",
    concentration: "Elixir",
    notes: {
      top: ["Qreypfrut", "Portağal", "Qara istiot"],
      middle: ["Darçın", "Lavanda"],
      base: ["Vanil", "Ənbər", "Paçuli", "Sedir", "Meşə notları"]
    },
    inStock: true,
    category: "parfum",
    popularity: 98,
    // Yeni əlavə edilən parametrlər
    ageGroup: "orta yaş",
    timeOfUse: ["axşam", "gecə"],
    season: ["payız", "qış"],
    style: ["cəsarətli", "müasir"],
    longevity: "yüksək",
    sillage: "güclü"
  },
  {
    id: "2",
    name: "Chanel Coco Mademoiselle",
    brand: "Chanel",
    description: "Chanel Coco Mademoiselle - Jacques Polge tərəfindən müasir qadının azadlıq ruhunu və cazibədarlığını əks etdirmək üçün yaradılan efsanəvi ətir. Şərq üslublu çiçəkli kompozisiya incə, parlaq və müasir xarakter təqdim edir. Bu gənc və dinamik qoxu seçim edən, öz yolunu çəkən xanımlar üçün mükəmməl ifadədir. İstehsal edildiyi 2001-ci ildən bəri qadın ətirlərinin klassikasına çevrilən bu parfüm həm gündəlik, həm də xüsusi gecələr üçün ideal seçimdir.",
    image: "/images/perfumes/perfume2.jpg",
    price: 145,
    rating: 4.8,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Portağal", "Mandarin", "Bergamot"],
      middle: ["Jasmin", "Çəhrayı istiot", "May gülü", "Dəfnə yarpağı"],
      base: ["Paçuli", "Vetiver", "Vanil", "Ağ müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 95,
    // Yeni əlavə edilən parametrlər
    ageGroup: "gənc",
    timeOfUse: ["gündüz", "axşam"],
    season: ["yaz", "yay"],
    style: ["müasir", "zərif"],
    longevity: "yüksək",
    sillage: "orta"
  },
  {
    id: "3",
    name: "Tom Ford Noir Extreme",
    brand: "Tom Ford",
    description: "Tom Ford Noir Extreme - istilik və ədviyyəli notlarla zəngin olan, kişilər üçün şərq üslublu gourmet ətir. Sandro Massimonun yaratdığı bu parfüm 2015-ci ildən bəri lüks və zarafatlıq imicinə malik kişilər üçün ideal seçimdir. Kulinar-şərq ətri olaraq həm istilik, həm də təzad yaradan kompozisiya təqdim edir. Qəhvə və ədviyyələrlə başlayan, nərgiz və gül notları ilə davam edən, vanil və qozla tamamlanan bu ətir dəbli kişilərin qarderobunun vacib elementidir.",
    image: "/images/perfumes/perfume3.jpg",
    price: 230,
    rating: 4.7,
    gender: "kişi",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Kardamom", "Zəfəran", "Nutmeq", "Mandarin"],
      middle: ["Kulinar notlar", "Mastika", "Qəhvə", "Nərgiz", "Qızılgül", "Jasmin"],
      base: ["Müşk", "Ənbər", "Sandal ağacı", "Vanil", "Tonka fasulyesi", "Qoz"]
    },
    inStock: true,
    category: "parfum",
    popularity: 92,
    // Yeni əlavə edilən parametrlər
    ageGroup: "orta yaş",
    timeOfUse: ["axşam", "gecə"],
    season: ["payız", "qış"],
    style: ["ekzotik", "klassik"],
    longevity: "yüksək",
    sillage: "orta"
  },
  {
    id: "4",
    name: "Yves Saint Laurent Black Opium",
    brand: "YSL",
    description: "YSL Black Opium - Nathalie Lorson, Marie Salamagne, Olivier Cresp və Honorine Blanc tərəfindən 2014-cü ildə yaradılan, cəsarətli və enerjili ətirlər sevən qadınlar üçün mükəmməl seçim. Ağır qəhvə notları, ağ gül və şirin vanil tərkibli bu şərq-vanil kompozisiya, rock-chic imicinə malik qadınlar üçün xüsusi yaradılmışdır. İkonik YSL 'Opium' ətrinin müasir və gənc versiyası olan Black Opium, xüsusilə axşam saatlarında və qış mövsümündə heyranedici təsir buraxır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.25324.jpg",
    price: 125,
    rating: 4.6,
    gender: "qadın",
    size: "90ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qəhvə", "Portağal çiçəyi", "Armud"],
      middle: ["Çəhrayı istiot", "Jasmin", "Badam çiçəyi"],
      base: ["Şirin vanil", "Kedr", "Paçuli", "Kakao"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "5",
    name: "Guerlain Mon Guerlain",
    brand: "Guerlain",
    description: "Guerlain Mon Guerlain - Angelina Jolie-nin ilham qaynağı olduğu, Thierry Wasser və Delphine Jelk tərəfindən 2017-ci ildə yaradılan müasir qadın parfümü. Bu ətir, güclü, azad və parlaq müasir qadını təcəssüm etdirir. Mərakeş'dən gələn lavanda, Sumatra'dan gələn Sambac jasmin, Hindistan'dan gələn sandalağacı və Papua Yeni Qvineya'dan gələn Tahiti vanili istifadə edilərək yaradılan bu dərin və həssas kompozisiya həm gündəlik, həm də xüsusi günlər üçün unikaldır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.43365.jpg",
    price: 135,
    rating: 4.7,
    gender: "qadın",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Lavanda", "Bergamot", "Məryəm noxudu"],
      middle: ["Jasmin Sambac", "Iris"],
      base: ["Qızılgül", "Vanil", "Kumarin", "Bənzoin", "Sandal ağacı", "Paçuli", "Likris"]
    },
    inStock: true,
    category: "parfum",
    popularity: 90
  },
  {
    id: "6",
    name: "Acqua di Gio Profumo",
    brand: "Giorgio Armani",
    description: "Acqua di Gio Profumo - Alberto Morillas tərəfindən 2015-ci ildə yaradılmış, orijinal Acqua di Gio'nun daha dərin və güclü versiyası. Bu ətir güclü dəniz, zəngin odunsu və cəlbedici tütsü elementlərini birləşdirərək su və daş harmoniyasını yaradır. Qara şüşə dizaynı ilə təqdim olunan bu ətir dəniz notlarının təzəliyi və dərinliyi ilə məşhurdur. Payız və qış mövsümlərində, xüsusilə rəsmi tədbirlər üçün ideal seçim olan parfüm, Armani'nin zərif və lüks imicinə uyğundur.",
    image: "https://fimgs.net/mdimg/perfume/375x500.29727.jpg",
    price: 150,
    rating: 4.8,
    gender: "kişi",
    size: "75ml",
    concentration: "Parfum",
    notes: {
      top: ["Dəniz notları", "Bergamot", "Portağal"],
      middle: ["Adaçayı", "Geranium", "Rozmarin"],
      base: ["Tütsü", "Paçuli", "Ənbər", "Kedr"]
    },
    inStock: true,
    category: "parfum",
    popularity: 85
  },
  {
    id: "7",
    name: "Jo Malone Oud & Bergamot",
    brand: "Jo Malone",
    description: "Jo Malone Oud & Bergamot - Christine Nagel tərəfindən 2010-cu ildə yaradılan lüks və zərif qoxu, Cologne Intense kolleksiyasının bir parçası. Bu ətir, Şərqin ekzotik oud notlarını Qərbin klassik bergamot notları ilə birləşdirərək mürəkkəb və sofistike bir harmoniya yaradır. Sedir və ənbər notları ilə dəstəklənən bu ətir gözlənilməz bir təzəlikdən, qızmış oud notlarına doğru səyahət etməyə dəvət edir. Bu ətir, oud macərasına girmək istəyənlər üçün mükəmməl bir başlanğıc nöqtəsidir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.10355.jpg",
    price: 180,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Cologne Intense",
    notes: {
      top: ["Oud", "Bergamot"],
      middle: ["Sedir", "Ənbər"],
      base: ["Quru meyvələr", "Tütün", "Sitra", "Apelsin çiçəyi", "Sandal ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 96
  },
  {
    id: "8",
    name: "Byredo Black Saffron",
    brand: "Byredo",
    description: "Byredo Black Saffron - Jerome Epinette tərəfindən 2012-ci ildə Hindistandan ilhamlanaraq yaradılan uniseks parfüm. Bu ətir, zəfəran ədviyyatının şirinlik, dəri və çiçək notları ilə füsunkar bir şəkildə birləşərək yaranıb. Açılışında zəfəran, ciddi daş və çin gülünün yaratdığı təzad, ortalarda dəri və qızılgül, təməldə isə müşk və ağ odunsu notlarla tamamlanır. Byredo'nun minimalist dizaynına sahib olan bu kompozisiya həm kişi, həm də qadınlar tərəfindən məftunluqla qarşılanıb.",
    image: "https://fimgs.net/mdimg/perfume/375x500.16227.jpg",
    price: 210,
    rating: 4.7,
    gender: "uniseks",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Zəfəran"],
      middle: ["Juniper yağları", "Çin gülü"],
      base: ["Qara bənövşə", "Dəri", "Qızılgül", "Müşk", "Vetiver", "Rasberry"]
    },
    inStock: true,
    category: "parfum",
    popularity: 93
  },
  {
    id: "9",
    name: "Lancôme Trésor",
    brand: "Lancôme",
    description: "Lancôme Trésor - Sophia Grojsman tərəfindən 1990-cı ildə yaradılan, zamansız bir klassika halına gəlmiş qadın ətrləri arasında ən məşhur olanlardan biri. Bu ətir parlaq şaftalı və gül notları ilə başlayır, iris və yasəmən notları ilə davam edir və sandal ağacı və müşk notları ilə sonlanır. Romantik və şirin, isti və pudralı bu ətir, zərifliyi və cazibədarlığı təcəssüm etdirən qadınlar üçün mükəmməl seçimdir. Trésor, fransız dilində 'xəzinə' mənasını verir və doğrudan da, parfümeriya dünyasında bir xəzinədir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.37.jpg",
    price: 110,
    rating: 4.5,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Şaftalı"],
      middle: ["Bergamot", "Anaşı", "Apelsin çiçəyi"],
      base: ["Qızılgül", "İris", "Yasəmən", "Lilyum", "Vanil", "Sandal ağacı", "Müşk", "Ənbər", "Abrikos"]
    },
    inStock: true,
    category: "parfum",
    popularity: 91
  },
  {
    id: "10",
    name: "Amouage Lyric Man",
    brand: "Amouage",
    description: "Amouage Lyric Man - Daniel Maurel tərəfindən yaradılan bu parfüm, lüks Amouage brendi üçün tipik olan əla keyfiyyət və sənətkarlıqla hazırlanmış şədəvr. Klassik ərəb ənənəsi ilə müasir qərb yanaşmasını harmonik şəkildə birləşdirən Oman markalı bu ətir, mərkəzində qızılgül olan nadir bir kişi ətridir. Güclü ədviyyəli notlarla şərq zənginliyi və ərəb dünyasının gözəlliyini təcəssüm etdirən bu ətir, öz stilinə önəm verən kişilər üçün mükəmməl seçimdir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.4288.jpg",
    price: 290,
    rating: 4.8,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qızılgül", "Əhəng", "Limon", "Bergamot", "Zəfəran"],
      middle: ["Angelika", "Nutmeg"],
      base: ["Ardıc", "Galbanum", "Qarağat yarpaqları", "Buxur", "Sedir", "Sandal ağacı", "Vanil", "Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "11",
    name: "Maison Margiela Replica Jazz Club",
    brand: "Maison Margiela",
    description: "Maison Margiela Replica Jazz Club - Aliénor Massenet tərəfindən 2013-cü ildə yaradılan və Bruklində bir caz klubunda gecə atmosferini əks etdirmək üçün dizayn edilmiş uniseks ətir. Viski, tütün və şirin vanil notlarının harmoniyası ilə yaratdığı təsiri, həm güclü, həm də rahat ifadə edən bir ətir. Qara istiot və sitrus notları ilə açılan, sonra viski, rum və tütün notları ilə davam edərək vanil, storaks və sedir baza notlarına keçir. Replika seriyasının bu kompozisiyası lüks şərab və siqar salonu atmosferini mükəmməl şəkildə canlandırır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.15060.jpg",
    price: 140,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Toilette",
    notes: {
      top: ["Qara istiot", "Limetta", "Nanə"],
      middle: ["Rum"],
      base: ["Tütün yarpaqları", "Sedir", "Vetiver", "Vanil", "Storaks"]
    },
    inStock: true,
    category: "parfum",
    popularity: 91
  },
  {
    id: "12",
    name: "Dolce & Gabbana The One",
    brand: "D&G",
    description: "Dolce & Gabbana The One - Stefano Gabbana'nın rəhbərliyi altında Christine Nagel tərəfindən 2006-cı ildə yaradılan və o vaxtdan bəri qadın ətirləri arasında klassik statusu qazanan bir ətir. The One, adından da bəlli olduğu kimi, unikal və təkrarsız olmaq iddiasında olan bir qadının simvoludur. İsti və zərif şərq-çiçəkli kompozisiya, lüks və cazibədarlıq duyğusu yaradır. Möhtəşəm şüşə dizaynı ilə təqdim olunan bu ətir, italyan brendindən gözlənildiyi kimi, müasir qadının lüks və qlamurunun simvoludur. Madonna kimi məşhur simalar tərəfindən də təbliğ edilən ətir, özünəgüvənli, cazibədar və göz önündə olan qadınlar üçün mükəmməl seçimdir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1319.jpg",
    price: 115,
    rating: 4.7,
    gender: "qadın",
    size: "75ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Şaftalı"],
      middle: ["Vanil"],
      base: ["Jasmin"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "13",
    name: "Prada Infusion d'Iris",
    brand: "Prada",
    description: "Qadınlar üçün yumşaq və çiçəkli ətir",
    image: "https://fimgs.net/mdimg/perfume/375x500.2064.jpg",
    price: 130,
    rating: 4.5,
    gender: "qadın",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["İris"],
      middle: ["Mandarin"],
      base: ["Sandal ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "14",
    name: "Viktor & Rolf Spicebomb",
    brand: "Viktor & Rolf",
    description: "Kişilər üçün ədviyyatlı və partlayıcı ətir",
    image: "https://fimgs.net/mdimg/perfume/375x500.13857.jpg",
    price: 120,
    rating: 4.6,
    gender: "kişi",
    size: "90ml",
    concentration: "Eau de Toilette",
    notes: {
      top: ["Darçın"],
      middle: ["Qırmızı istiot"],
      base: ["Tütün"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "15",
    name: "Hermès Un Jardin Sur Le Nil",
    brand: "Hermès",
    description: "Uniseks, təravətli və meyvəli ətir",
    image: "https://fimgs.net/mdimg/perfume/375x500.18.jpg",
    price: 145,
    rating: 4.5,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Toilette",
    notes: {
      top: ["Manqo"],
      middle: ["Lotus"],
      base: ["Sitra"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "16",
    name: "Estée Lauder Modern Muse",
    brand: "Estée Lauder",
    description: "Qadınlar üçün çiçəkli və müşk qoxusu",
    image: "https://fimgs.net/mdimg/perfume/375x500.22059.jpg",
    price: 105,
    rating: 4.4,
    gender: "qadın",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Jasmin"],
      middle: ["Paçuli"],
      base: ["Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 85
  },
  {
    id: "17",
    name: "Le Labo Another 13",
    brand: "Le Labo",
    description: "Uniseks, unikal və müşk qoxulu ətir",
    image: "https://fimgs.net/mdimg/perfume/375x500.6333.jpg",
    price: 250,
    rating: 4.8,
    gender: "uniseks",
    size: "50ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Müşk"],
      middle: ["Ambra"],
      base: ["Jasmin"]
    },
    inStock: false,
    category: "parfum",
    popularity: 93
  },
  {
    id: "18",
    name: "Givenchy Gentleman Boisee",
    brand: "Givenchy",
    description: "Kişilər üçün odunsu və isti ətir",
    image: "https://fimgs.net/mdimg/perfume/375x500.60673.jpg",
    price: 130,
    rating: 4.7,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Kakao"],
      middle: ["Sandal ağacı"],
      base: ["İris"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "19",
    name: "Acqua di Parma Rosa Nobile",
    brand: "Acqua di Parma",
    description: "Qadınlar üçün zərif və güllü ətir",
    image: "https://fimgs.net/mdimg/perfume/375x500.27975.jpg",
    price: 155,
    rating: 4.6,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qızılgül"],
      middle: ["Pion"],
      base: ["Sitra"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "20",
    name: "Creed Silver Mountain Water",
    brand: "Creed",
    description: "Uniseks, təravətli və dağ havası kimi ətir",
    image: "https://fimgs.net/mdimg/perfume/375x500.472.jpg",
    price: 340,
    rating: 4.9,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Yaşıl çay"],
      middle: ["Qara qarağat"],
      base: ["Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 96
  },
  {
    id: "21",
    name: "Creed Aventus",
    brand: "Creed",
    description: "Creed Aventus kişilər üçün hazırlanmış əfsanəvi bir ətirdir və özünə inamlı, cəsarətli xarakteri ilə tanınır. Bu ətir meyvəli və odunsu notların mükəmməl harmoniyasını təqdim edir. Açılışda ananasın şirəli və parlaq akordları, berqamotun sitruslu təravəti və qara qarağatın yüngül turşluğu ilə zəngin bir başlanğıc yaradır. Ürək notlarında yasəmənin incə çiçəkli qoxusu, paçulinin torpaq xarakteri və ağcaqayın odunsu dərinliyi ilə ətirə kişiyə xas bir ağırlıq qatılır. Baza isə müşkün isti, duyğusal örtüyü, palıd yosununun klassik toxunuşu və kəhrəbanın qatranlı izi ilə tamamlanır. Həm gündəlik istifadə, həm də xüsusi anlar üçün ideal seçimdir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
    price: 450,
    rating: 4.8,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Ananas", "Berqamot", "Qara qarağat"],
      middle: ["Yasəmən", "Paçuli", "Ağcaqayın"],
      base: ["Müşk", "Palıd yosunu", "Kəhrəba"]
    },
    inStock: true,
    category: "parfum",
    popularity: 95
  },
  {
    id: "22",
    name: "Chanel Coco Mademoiselle",
    brand: "Chanel",
    description: "Chanel Coco Mademoiselle qadınlar üçün zəriflik və təravətin simvolu olan bir ətirdir. Bu ətir parlaq sitrus notları ilə açılır: portağalın şirəli və enerjili qoxusu berqamotun incə təravəti ilə birləşərək yüngül və şən bir başlanğıc yaradır. Ürək notlarında gülün romantik və zərif akordları ilə yasəmənin dərin çiçəkli ətirləri ətirə qadına xas bir incəlik qatır. Baza isə vanilin şirin və isti örtüyü, paçulinin torpaq xarakteri və ağ müşkün təmiz, uzunmüddətli izi ilə tamamlanır. Həm gündüz, həm də axşam istifadəsi üçün uyğun olan bu ətir, özünəməxsus üslubu ilə hər zaman diqqət çəkir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
    price: 300,
    rating: 4.7,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Portağal", "Berqamot"],
      middle: ["Gül", "Yasəmən"],
      base: ["Vanil", "Paçuli", "Ağ müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 92
  },
  {
    id: "23",
    name: "Tom Ford Oud Wood",
    brand: "Tom Ford",
    description: "Tom Ford Oud Wood həm kişilər, həm də qadınlar üçün uyğun uniseks bir ətirdir və ekzotik notların zəngin qarışığı ilə seçilir. Açılışda kardamonun ədviyyatlı və kəskin qoxusu ilə qızılgül ağacının odunsu təravəti qarşılayır, bu da ətirə xüsusi bir enerji qatır. Ürəkdə oudun dərin və sirli ətirləri səndəl ağacının kremli, isti toxunuşu ilə birləşərək ətirə lüks bir xarakter verir. Baza notlarında tonka fasulyesinin şirin və ədviyyatlı izi, kəhrəbanın qatranlı örtüyü və vetiverin torpaq notları ilə tamamlanır. Xüsusi anlar üçün ideal olan bu ətir, sakitləşdirici və dəbdəbəli bir təcrübə vəd edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1825.jpg",
    price: 500,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Kardamon", "Qızılgül ağacı"],
      middle: ["Oud", "Səndəl ağacı"],
      base: ["Tonka fasulyesi", "Kəhrəba", "Vetiver"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "24",
    name: "Yves Saint Laurent Libre",
    brand: "Yves Saint Laurent",
    description: "Yves Saint Laurent Libre qadınlar üçün azadlıq və güclü xarakter ifadə edən müasir bir ətirdir. Açılışda lavandanın təmiz və aromatik qoxusu, mandarin portağalının şirəli və parlaq akordları ilə birləşərək təravətli bir başlanğıc yaradır. Ürək notlarında portağal çiçəyinin zərif və çiçəkli ətirləri ilə yasəmənin dərin qoxusu ətirə qadına xas bir incəlik qatır. Baza isə vanilin isti və şirin örtüyü, tonka fasulyesinin ədviyyatlı izi və müşkün duyğusal toxunuşu ilə tamamlanır. Gündüzdən gecəyə keçid üçün mükəmməl olan bu ətir, həm güclü, həm də zərif bir təəssürat yaradır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.55676.jpg",
    price: 280,
    rating: 4.9,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Lavanda", "Mandarin portağalı"],
      middle: ["Portağal çiçəyi", "Yasəmən"],
      base: ["Vanil", "Tonka fasulyesi", "Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 90
  },
  {
    id: "25",
    name: "Amouage Reflection Man",
    brand: "Amouage",
    description: "Amouage Reflection Man kişilər üçün zəriflik və dərinliyin birləşdiyi unikal bir ətirdir. Açılışda berqamotun sitruslu təravəti, qırmızı bibərin ədviyyatlı kəskinliyi və rozmarinin aromatik qoxusu ilə parlaq bir başlanğıc yaradır. Ürək notlarında yasəmənin incə çiçəkli akordları, nerolinin təravətli ətirləri və süsən çiçəyinin pudralı toxunuşu ilə zənginləşir. Baza isə səndəl ağacının kremli isti örtüyü, paçulinin torpaq xarakteri və vetiverin odunsu izi ilə tamamlanır. Həm işgüzar görüşlər, həm də xüsusi axşamlar üçün uyğun olan bu ətir, klassik və müasir notların harmoniyasını təqdim edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1772.jpg",
    price: 420,
    rating: 4.7,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Qırmızı bibər", "Rozmarin"],
      middle: ["Yasəmən", "Neroli", "Süsən çiçəyi"],
      base: ["Səndəl ağacı", "Paçuli", "Vetiver"]
    },
    inStock: true,
    category: "parfum",
    popularity: 85
  },
  {
    id: "26",
    name: "Lancôme La Vie Est Belle",
    brand: "Lancôme",
    description: "Lancôme La Vie Est Belle qadınlar üçün həyatın gözəlliyini qeyd edən şirin və cazibədar bir ətirdir. Açılışda qara qarağatın meyvəli və yüngül turş akordları ilə armudun təzə, şirəli qoxusu qarşılayır, bu da ətirə şən bir başlanğıc verir. Ürək notlarında iris çiçəyinin pudralı və zərif ətirləri, yasəmənin dərin çiçəkli toxunuşu və portağal çiçəyinin parlaq akordları ilə zənginləşir. Baza isə pralinin şokolad kimi şirin və isti örtüyü, vanilin yumşaq izi və tonka fasulyesinin ədviyyatlı dərinliyi ilə tamamlanır. Xoşbəxtlik hissi yaradan bu ətir, xüsusi anlar üçün idealdır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.14951.jpg",
    price: 260,
    rating: 4.8,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qara qarağat", "Armud"],
      middle: ["Iris çiçəyi", "Yasəmən", "Portağal çiçəyi"],
      base: ["Pralin", "Vanil", "Tonka fasulyesi"]
    },
    inStock: true,
    category: "parfum",
    popularity: 93
  },
  {
    id: "27",
    name: "Byredo Rose Noir",
    brand: "Byredo",
    description: "Byredo Rose Noir uniseks bir ətir olaraq qızılgülün qaranlıq və sirli tərəfini vurğulayır. Açılışda qreypfrutun sitruslu və yüngül turş qoxusu ilə qızılgülün zəngin, romantik akordları qarşılayır, bu da ətirə təravətli bir başlanğıc verir. Ürək notlarında paçulinin torpaq və dərin ətirləri ilə labdanumun qatranlı toxunuşu ətirə ağırlıq və cazibə qatır. Baza isə müşkün isti, duyğusal örtüyü və palıd yosununun təbii, yaşıl izi ilə tamamlanır. Həm gündüz, həm də gecə istifadəsi üçün uyğun olan bu ətir, özünəməxsus və dərin bir təəssürat yaradır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1778.jpg",
    price: 380,
    rating: 4.5,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qreypfrut", "Qızılgül"],
      middle: ["Paçuli", "Labdanum"],
      base: ["Müşk", "Palıd yosunu"]
    },
    inStock: true,
    category: "parfum",
    popularity: 87
  },
  {
    id: "28",
    name: "Guerlain Spiritueuse Double Vanille",
    brand: "Guerlain",
    description: "Guerlain Spiritueuse Double Vanille uniseks bir ətir olaraq vanil sevənlər üçün hazırlanmış dəbdəbəli bir kompozisiyadır. Açılışda çəhrayı bibərin ədviyyatlı və kəskin qoxusu ilə berqamotun sitruslu təravəti qarşılayır, bu da ətirə zəngin bir başlanğıc verir. Ürək notlarında ylang-ylangın ekzotik və çiçəkli ətirləri ilə romun isti, spirtli akordları özünü göstərir. Baza isə vanilin dərin, şirin örtüyü, benzoinin qatranlı toxunuşu və tonka fasulyesinin ədviyyatlı izi ilə tamamlanır. Soyuq günlərdə istifadə üçün ideal olan bu ətir, isti və cazibədar bir atmosfer yaradır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1820.jpg",
    price: 470,
    rating: 4.9,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Çəhrayı bibər", "Berqamot"],
      middle: ["Ylang-ylang", "Rom"],
      base: ["Vanil", "Benzoin", "Tonka fasulyesi"]
    },
    inStock: true,
    category: "parfum",
    popularity: 91
  },
  {
    id: "29",
    name: "Diptyque Oud Palao",
    brand: "Diptyque",
    description: "Diptyque Oud Palao uniseks bir ətir olaraq Şərq notlarının zəngin və dəbdəbəli birləşməsini təqdim edir. Açılışda safranın ədviyyatlı və isti qoxusu ilə Bolqar qızılgülünün zərif, romantik akordları qarşılayır, bu da ətirə ekzotik bir başlanğıc verir. Ürək notlarında oudun dərin və sirli ətirləri ilə səndəl ağacının kremli toxunuşu özünü göstərir. Baza isə vanilin şirin və yumşaq örtüyü, tonka fasulyesinin ədviyyatlı izi və paçulinin torpaq dərinliyi ilə tamamlanır. Xüsusi anlar üçün mükəmməl olan bu ətir, həm kişilər, həm də qadınlar tərəfindən sevilir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.31872.jpg",
    price: 390,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Safran", "Bolqar qızılgülü"],
      middle: ["Oud", "Səndəl ağacı"],
      base: ["Vanil", "Tonka fasulyesi", "Paçuli"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "30",
    name: "Jo Malone Peony & Blush Suede",
    brand: "Jo Malone",
    description: "Jo Malone Peony & Blush Suede qadınlar üçün meyvəli və çiçəkli notların zərif birləşməsini təqdim edən romantik bir ətirdir. Açılışda qırmızı almanın təzə və şirəli qoxusu ilə pionun yumşaq, parlaq akordları qarşılayır, bu da ətirə şən və yüngül bir başlanğıc verir. Ürək notlarında qızılgülün incə və romantik ətirləri ilə yasəmənin dərin çiçəkli toxunuşu özünü göstərir. Baza isə süetin yumşaq, isti örtüyü və gavalının şirin izi ilə tamamlanır, ətirə unikal bir zəriflik qatır. Bahar və yay mövsümləri üçün ideal olan bu ətir, həm gündüz, həm də axşam istifadəsi üçün uyğundur.",
    image: "https://fimgs.net/mdimg/perfume/375x500.23341.jpg",
    price: 320,
    rating: 4.7,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qırmızı alma", "Pion"],
      middle: ["Qızılgül", "Yasəmən"],
      base: ["Süet", "Gavalı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 86
  },
  {
    id: "31",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    description: "Baccarat Rouge 540 uniseks bir ətir olaraq lüks və incəliyin zirvəsini təmsil edir. Açılışda safranın ədviyyatlı və isti qoxusu ilə badamın yumşaq, şirin akordları qarşılayır, bu da ətirə ekzotik və zəngin bir başlanğıc verir. Ürək notlarında yasəmənin parlaq və çiçəkli ətirləri ilə şam ağacının quru, odunsu toxunuşu özünü göstərir, ətirə dərinlik qatır. Baza isə kəhrəbanın qatranlı və isti örtüyü, müşkün duyğusal izi və paçulinin torpaq xarakteri ilə tamamlanır. Gecə istifadəsi üçün ideal olan bu ətir, uzunmüddətli və cazibədar bir təəssürat yaradır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.31816.jpg",
    price: 550,
    rating: 4.9,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Safran", "Badam"],
      middle: ["Yasəmən", "Şam ağacı"],
      base: ["Kəhrəba", "Müşk", "Paçuli"]
    },
    inStock: true,
    category: "parfum",
    popularity: 94
  },
  {
    id: "32",
    name: "Chloé Eau de Parfum",
    brand: "Chloé",
    description: "Chloé Eau de Parfum qadınlar üçün zəriflik və romantizmin təcəssümü olan bir ətirdir. Açılışda pionun yumşaq və təravətli qoxusu, liçinin meyvəli şirinliyi və freziyanın incə çiçəkli akordları ilə qarşılaşırıq, bu da ətirə yüngül bir başlanğıc verir. Ürək notlarında qızılgülün romantik və zərif ətirləri ilə maqnoliyanın təmiz, çiçəkli toxunuşu özünü göstərir. Baza isə kəhrəbanın isti və qatranlı örtüyü ilə ağacın odunsu izi ilə tamamlanır. Bahar və yay mövsümləri üçün mükəmməl olan bu ətir, qadına xas incəlik və təravət vəd edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1659.jpg",
    price: 250,
    rating: 4.6,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Pion", "Liçi", "Freziya"],
      middle: ["Qızılgül", "Maqnoliya"],
      base: ["Kəhrəba", "Ağac"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "33",
    name: "Le Labo Santal 33",
    brand: "Le Labo",
    description: "Le Labo Santal 33 uniseks bir ətir olaraq odunsu və dəri notlarının unikal qarışığını təqdim edir. Açılışda kardamonun ədviyyatlı və kəskin qoxusu ilə yaşıl notların təravəti qarşılayır, bu da ətirə təbii bir başlanğıc verir. Ürək notlarında səndəl ağacının kremli və isti ətirləri ilə süsən çiçəyinin pudralı toxunuşu özünü göstərir, ətirə dərinlik qatır. Baza isə dərinin quru və dəbdəbəli izi, vetiverin torpaq xarakteri və müşkün yumşaq örtüyü ilə tamamlanır. Müasir və şəhər həyatı üçün ideal olan bu ətir, özünəməxsus bir xarakterə malikdir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.12163.jpg",
    price: 400,
    rating: 4.7,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Kardamon", "Yaşıl notlar"],
      middle: ["Səndəl ağacı", "Süsən çiçəyi"],
      base: ["Dəri", "Vetiver", "Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 90
  },
  {
    id: "34",
    name: "Dior Sauvage",
    brand: "Dior",
    description: "Dior Sauvage kişilər üçün təbiətin vəhşi və sərbəst ruhunu əks etdirən bir ətirdir. Açılışda berqamotun sitruslu və parlaq qoxusu ilə çəhrayı bibərin ədviyyatlı kəskinliyi qarşılayır, bu da ətirə təravətli bir başlanğıc verir. Ürək notlarında lavandanın təmiz və aromatik ətirləri ilə vetiverin torpaq xarakteri özünü göstərir, ətirə kişiyə xas bir dərinlik qatır. Baza isə kəhrəbanın isti və qatranlı örtüyü, paçulinin odunsu izi və labdanumun dəbdəbəli toxunuşu ilə tamamlanır. Gündəlik istifadədən xüsusi anlara qədər hər vəziyyətə uyğun bir ətir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.31881.jpg",
    price: 320,
    rating: 4.8,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Çəhrayı bibər"],
      middle: ["Lavanda", "Vetiver"],
      base: ["Kəhrəba", "Paçuli", "Labdanum"]
    },
    inStock: true,
    category: "parfum",
    popularity: 93
  },
  {
    id: "35",
    name: "Guerlain Mon Guerlain",
    brand: "Guerlain",
    description: "Guerlain Mon Guerlain qadınlar üçün müasir feminitəni tərənnüm edən isti və şirin bir ətirdir. Açılışda lavandanın təmiz və aromatik qoxusu ilə berqamotun sitruslu təravəti qarşılayır, bu da ətirə yüngül bir başlanğıc verir. Ürək notlarında yasəmənin dərin və çiçəkli ətirləri ilə süsən çiçəyinin pudralı toxunuşu özünü göstərir. Baza isə vanilin şirin və isti örtüyü, tonka fasulyesinin ədviyyatlı izi və səndəl ağacının kremli dərinliyi ilə tamamlanır. Həm gündüz, həm də axşam istifadəsi üçün uyğun olan bu ətir, qadına xas zəriflik və güc ifadə edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.41366.jpg",
    price: 290,
    rating: 4.7,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Lavanda", "Berqamot"],
      middle: ["Yasəmən", "Süsən çiçəyi"],
      base: ["Vanil", "Tonka fasulyesi", "Səndəl ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "36",
    name: "Creed Silver Mountain Water",
    brand: "Creed",
    description: "Creed Silver Mountain Water uniseks bir ətir olaraq dağların təmiz və sərin havasını xatırladan təravətli bir kompozisiyadır. Açılışda berqamotun sitruslu və parlaq qoxusu ilə mandarin portağalının şirəli akordları qarşılayır, bu da ətirə yüngül və enerjili bir başlanğıc verir. Ürək notlarında yaşıl çayın təravətli və aromatik ətirləri ilə qara qarağatın meyvəli izi özünü göstərir. Baza isə müşkün təmiz və yumşaq örtüyü ilə petitgrainin odunsu toxunuşu ilə tamamlanır. Yay mövsümü və gündüz istifadəsi üçün ideal olan bu ətir, təbiət sevgisini əks etdirir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.614.jpg",
    price: 430,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Mandarin portağalı"],
      middle: ["Yaşıl çay", "Qara qarağat"],
      base: ["Müşk", "Petitgrain"]
    },
    inStock: true,
    category: "parfum",
    popularity: 87
  },
  {
    id: "37",
    name: "Yves Saint Laurent La Nuit de l'Homme",
    brand: "Yves Saint Laurent",
    description: "Yves Saint Laurent La Nuit de l'Homme kişilər üçün sirli və cazibədar bir gecə ətridir. Açılışda kardamonun ədviyyatlı və isti qoxusu ilə berqamotun sitruslu təravəti qarşılayır, bu da ətirə zəngin bir başlanğıc verir. Ürək notlarında lavandanın təmiz və aromatik ətirləri ilə sedr ağacının odunsu toxunuşu özünü göstərir, ətirə kişiyə xas bir dərinlik qatır. Baza isə tonka fasulyesinin şirin və ədviyyatlı izi, paçulinin torpaq xarakteri və vetiverin quru örtüyü ilə tamamlanır. Axşam və xüsusi görüşlər üçün ideal olan bu ətir, gizli bir cazibə vəd edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.6769.jpg",
    price: 310,
    rating: 4.8,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Kardamon", "Berqamot"],
      middle: ["Lavanda", "Sedr ağacı"],
      base: ["Tonka fasulyesi", "Paçuli", "Vetiver"]
    },
    inStock: true,
    category: "parfum",
    popularity: 91
  },
  {
    id: "38",
    name: "Jo Malone Oud & Bergamot",
    brand: "Jo Malone",
    description: "Jo Malone Oud & Bergamot uniseks bir ətir olaraq Şərq notlarının müasir bir təfsirini təqdim edir. Açılışda berqamotun sitruslu və parlaq qoxusu ilə limonun təravətli akordları qarşılayır, bu da ətirə yüngül bir başlanğıc verir. Ürək notlarında oudun dərin və sirli ətirləri ilə portağal çiçəyinin zərif çiçəkli toxunuşu özünü göstərir. Baza isə sedr ağacının odunsu və quru izi, paçulinin torpaq xarakteri və müşkün yumşaq örtüyü ilə tamamlanır. Həm gündüz, həm də gecə istifadəsi üçün uyğun olan bu ətir, zəriflik və dərinliyi birləşdirir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.23342.jpg",
    price: 350,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Limon"],
      middle: ["Oud", "Portağal çiçəyi"],
      base: ["Sedr ağacı", "Paçuli", "Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 85
  },
  {
    id: "39",
    name: "Lancôme Trésor",
    brand: "Lancôme",
    description: "Lancôme Trésor qadınlar üçün sevginin və romantizmin simvolu olan klassik bir ətirdir. Açılışda şaftalının şirəli və şirin qoxusu ilə ananasın meyvəli təravəti qarşılayır, bu da ətirə şən bir başlanğıc verir. Ürək notlarında qızılgülün zərif və romantik ətirləri ilə yasəmənin dərin çiçəkli akordları özünü göstərir. Baza isə vanilin isti və şirin örtüyü, səndəl ağacının kremli izi və müşkün yumşaq toxunuşu ilə tamamlanır. Xüsusi anlar və axşam istifadəsi üçün ideal olan bu ətir, qadına xas incəlik və duyğusallıq vəd edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.616.jpg",
    price: 270,
    rating: 4.7,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Şaftalı", "Ananas"],
      middle: ["Qızılgül", "Yasəmən"],
      base: ["Vanil", "Səndəl ağacı", "Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "40",
    name: "Tom Ford Noir de Noir",
    brand: "Tom Ford",
    description: "Tom Ford Noir de Noir uniseks bir ətir olaraq qaranlıq və sirli bir romantizmi təcəssüm etdirir. Açılışda safranın ədviyyatlı və isti qoxusu ilə qızılgülün zəngin, romantik akordları qarşılayır, bu da ətirə dəbdəbəli bir başlanğıc verir. Ürək notlarında trüfün torpaq və zəngin ətirləri ilə yasəmənin dərin toxunuşu özünü göstərir. Baza isə paçulinin odunsu və torpaq izi, oudun sirli dərinliyi və vanilin şirin örtüyü ilə tamamlanır. Gecə istifadəsi və xüsusi anlar üçün mükəmməl olan bu ətir, cəsarətli və unudulmazdır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1776.jpg",
    price: 480,
    rating: 4.8,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Safran", "Qızılgül"],
      middle: ["Trüf", "Yasəmən"],
      base: ["Paçuli", "Oud", "Vanil"]
    },
    inStock: true,
    category: "parfum",
    popularity: 92
  },
  {
    id: "41",
    name: "Maison Francis Kurkdjian Oud Satin Mood",
    brand: "Maison Francis Kurkdjian",
    description: "Maison Francis Kurkdjian Oud Satin Mood uniseks bir ətir olaraq Şərq notlarının dəbdəbəli və zəngin birləşməsini təqdim edir. Açılışda Bolqar qızılgülünün romantik və zərif qoxusu ilə violetin pudralı təravəti qarşılayır, bu da ətirə yumşaq bir başlanğıc verir. Ürək notlarında oudun dərin və sirli ətirləri ilə vanilin şirin toxunuşu özünü göstərir, ətirə isti və cazibədar bir xarakter qatır. Baza isə kəhrəbanın qatranlı və dərin örtüyü, benzoinin qatranlı izi və paçulinin torpaq dərinliyi ilə tamamlanır. Gecə istifadəsi və xüsusi anlar üçün ideal olan bu ətir, lüks və duyğusallıq vəd edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.31817.jpg",
    price: 520,
    rating: 4.9,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Bolqar qızılgülü", "Violet"],
      middle: ["Oud", "Vanil"],
      base: ["Kəhrəba", "Benzoin", "Paçuli"]
    },
    inStock: true,
    category: "parfum",
    popularity: 93
  },
  {
    id: "42",
    name: "Guerlain L'Heure Bleue",
    brand: "Guerlain",
    description: "Guerlain L'Heure Bleue qadınlar üçün nostalji və romantizmin təcəssümü olan klassik bir ətirdir. Açılışda berqamotun sitruslu təravəti ilə anisinin ədviyyatlı və yüngül kəskin qoxusu qarşılayır, bu da ətirə unikal bir başlanğıc verir. Ürək notlarında yasəmənin dərin və çiçəkli ətirləri ilə qızılgülün zərif akordları özünü göstərir, ətirə qadına xas bir incəlik qatır. Baza isə vanilin şirin və isti örtüyü, tonka fasulyesinin ədviyyatlı izi və səndəl ağacının kremli toxunuşu ilə tamamlanır. Axşam istifadəsi və xüsusi anlar üçün ideal olan bu ətir, zamansız bir gözəllik təqdim edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.620.jpg",
    price: 310,
    rating: 4.7,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Anis"],
      middle: ["Yasəmən", "Qızılgül"],
      base: ["Vanil", "Tonka fasulyesi", "Səndəl ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "43",
    name: "Creed Bois du Portugal",
    brand: "Creed",
    description: "Creed Bois du Portugal kişilər üçün odunsu və zərif bir ətirdir, klassik maskulinliyi əks etdirir. Açılışda berqamotun sitruslu və parlaq qoxusu ilə lavandanın təmiz və aromatik ətirləri qarşılayır, bu da ətirə təravətli bir başlanğıc verir. Ürək notlarında sedr ağacının quru və odunsu toxunuşu ilə səndəl ağacının kremli ətirləri özünü göstərir, ətirə dərinlik qatır. Baza isə vetiverin torpaq xarakteri, paçulinin odunsu izi və müşkün yumşaq örtüyü ilə tamamlanır. Gündüz istifadəsi və işgüzar görüşlər üçün ideal olan bu ətir, zərif və güclü bir təəssürat yaradır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.621.jpg",
    price: 400,
    rating: 4.6,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Lavanda"],
      middle: ["Sedr ağacı", "Səndəl ağacı"],
      base: ["Vetiver", "Paçuli", "Müşk"]
    },
    inStock: true,
    category: "parfum",
    popularity: 87
  },
  {
    id: "44",
    name: "Jo Malone English Pear & Freesia",
    brand: "Jo Malone",
    description: "Jo Malone English Pear & Freesia qadınlar üçün meyvəli və çiçəkli notların təravətli birləşməsini təqdim edir. Açılışda armudun şirəli və şirin qoxusu ilə melonun yüngül təravəti qarşılayır, bu da ətirə şən bir başlanğıc verir. Ürək notlarında freziyanın incə və çiçəkli ətirləri ilə qızılgülün zərif akordları özünü göstərir, ətirə qadına xas bir incəlik qatır. Baza isə paçulinin torpaq xarakteri, müşkün yumşaq örtüyü və kəhrəbanın isti izi ilə tamamlanır. Bahar və yay mövsümləri üçün ideal olan bu ətir, təbii və yüngül bir təcrübə vəd edir.",
    image: "https://fimgs.net/mdimg/perfume/375x500.12164.jpg",
    price: 320,
    rating: 4.7,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Armud", "Melon"],
      middle: ["Freziya", "Qızılgül"],
      base: ["Paçuli", "Müşk", "Kəhrəba"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "45",
    name: "Tom Ford Black Orchid",
    brand: "Tom Ford",
    description: "Tom Ford Black Orchid uniseks bir ətir olaraq qaranlıq və sirli bir cazibə təqdim edir. Açılışda qara trüfün torpaq və zəngin qoxusu ilə berqamotun sitruslu təravəti qarşılayır, bu da ətirə unikal bir başlanğıc verir. Ürək notlarında qara orkidenin ekzotik və çiçəkli ətirləri ilə yasəmənin dərin toxunuşu özünü göstərir, ətirə dəbdəbəli bir xarakter qatır. Baza isə paçulinin torpaq izi, vanilin şirin örtüyü və kəhrəbanın qatranlı dərinliyi ilə tamamlanır. Gecə istifadəsi və xüsusi anlar üçün mükəmməl olan bu ətir, cəsarətli və unudulmazdır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.1774.jpg",
    price: 450,
    rating: 4.8,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qara trüf", "Berqamot"],
      middle: ["Qara orkide", "Yasəmən"],
      base: ["Paçuli", "Vanil", "Kəhrəba"]
    },
    inStock: true,
    category: "parfum",
    popularity: 91
  },
  {
    id: "46",
    name: "Chanel Bleu de Chanel",
    brand: "Chanel",
    description: "Chanel Bleu de Chanel kişilər üçün müasir və zərif bir ətirdir, odunsu və aromatik notların harmoniyasını təqdim edir. Açılışda limonun sitruslu təravəti ilə nanənin sərin qoxusu qarşılayır, bu da ətirə enerjili bir başlanğıc verir. Ürək notlarında zəncəfilin ədviyyatlı kəskinliyi ilə muskat qozunun isti ətirləri özünü göstərir, ətirə kişiyə xas bir dərinlik qatır. Baza isə səndəl ağacının kremli örtüyü, tütsünün sirli izi və sedr ağacının quru toxunuşu ilə tamamlanır. Gündəlik istifadədən xüsusi anlara qədər hər vəziyyətə uyğun olan bu ətir, zərif və güclüdür.",
    image: "https://fimgs.net/mdimg/perfume/375x500.6767.jpg",
    price: 340,
    rating: 4.9,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Limon", "Nanə"],
      middle: ["Zəncəfil", "Muskat qozu"],
      base: ["Səndəl ağacı", "Tütsü", "Sedr ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 94
  },
  {
    id: "47",
    name: "Lancôme Oud Bouquet",
    brand: "Lancôme",
    description: "Lancôme Oud Bouquet uniseks bir ətir olaraq Şərq notlarının zəngin və dəbdəbəli birləşməsini təqdim edir. Açılışda pralinin şokolad kimi şirin qoxusu ilə qızılgülün romantik təravəti qarşılayır, bu da ətirə isti bir başlanğıc verir. Ürək notlarında oudun dərin və sirli ətirləri ilə vanilin şirin toxunuşu özünü göstərir, ətirə lüks bir xarakter qatır. Baza isə kəhrəbanın qatranlı örtüyü, tonka fasulyesinin ədviyyatlı izi və paçulinin torpaq dərinliyi ilə tamamlanır. Gecə istifadəsi və xüsusi anlar üçün ideal olan bu ətir, duyğusal və cazibədardır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.31818.jpg",
    price: 370,
    rating: 4.7,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Pralin", "Qızılgül"],
      middle: ["Oud", "Vanil"],
      base: ["Kəhrəba", "Tonka fasulyesi", "Paçuli"]
    },
    inStock: true,
    category: "parfum",
    popularity: 88
  },
  {
    id: "48",
    name: "Yves Saint Laurent Black Opium",
    brand: "Yves Saint Laurent",
    description: "Yves Saint Laurent Black Opium qadınlar üçün enerjili və cazibədar bir ətirdir, müasir Şərq notlarını təqdim edir. Açılışda qəhvənin zəngin və isti qoxusu ilə çəhrayı bibərin ədviyyatlı kəskinliyi qarşılayır, bu da ətirə unikal bir başlanğıc verir. Ürək notlarında portağal çiçəyinin zərif və çiçəkli ətirləri ilə yasəmənin dərin toxunuşu özünü göstərir, ətirə qadına xas bir incəlik qatır. Baza isə vanilin şirin və isti örtüyü, paçulinin torpaq izi və sedr ağacının quru dərinliyi ilə tamamlanır. Gecə istifadəsi və əyləncəli anlar üçün ideal olan bu ətir, cəsarətli və duyğusaldır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.25323.jpg",
    price: 290,
    rating: 4.8,
    gender: "qadın",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Qəhvə", "Çəhrayı bibər"],
      middle: ["Portağal çiçəyi", "Yasəmən"],
      base: ["Vanil", "Paçuli", "Sedr ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 92
  },
  {
    id: "49",
    name: "Amouage Interlude Man",
    brand: "Amouage",
    description: "Amouage Interlude Man kişilər üçün qüvvətli və dərin bir ətirdir, xaotik və sirli bir atmosfer yaradır. Açılışda berqamotun sitruslu təravəti ilə oreqanonun ədviyyatlı qoxusu qarşılayır, bu da ətirə enerjili bir başlanğıc verir. Ürək notlarında tütsünün dumanlı və sirli ətirləri ilə paçulinin torpaq xarakteri özünü göstərir, ətirə kişiyə xas bir ağırlıq qatır. Baza isə dərinin quru və isti örtüyü, oudun odunsu dərinliyi və səndəl ağacının kremli izi ilə tamamlanır. Axşam istifadəsi və cəsarətli anlar üçün ideal olan bu ətir, unikal və güclüdür.",
    image: "https://fimgs.net/mdimg/perfume/375x500.18210.jpg",
    price: 430,
    rating: 4.7,
    gender: "kişi",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Oreqano"],
      middle: ["Tütsü", "Paçuli"],
      base: ["Dəri", "Oud", "Səndəl ağacı"]
    },
    inStock: true,
    category: "parfum",
    popularity: 89
  },
  {
    id: "50",
    name: "Byredo Gypsy Water",
    brand: "Byredo",
    description: "Byredo Gypsy Water uniseks bir ətir olaraq təbiətin sərbəst ruhunu və yüngüllüyünü əks etdirir. Açılışda berqamotun sitruslu təravəti ilə limonun parlaq qoxusu qarşılayır, bu da ətirə təravətli bir başlanğıc verir. Ürək notlarında şam iynələrinin yaşıl və aromatik ətirləri ilə bibərin ədviyyatlı kəskinliyi özünü göstərir, ətirə təbii bir dərinlik qatır. Baza isə səndəl ağacının kremli örtüyü, vanilin şirin izi və kəhrəbanın isti toxunuşu ilə tamamlanır. Gündüz istifadəsi və açıq hava fəaliyyətləri üçün ideal olan bu ətir, sadə və cazibədardır.",
    image: "https://fimgs.net/mdimg/perfume/375x500.6769.jpg",
    price: 360,
    rating: 4.6,
    gender: "uniseks",
    size: "100ml",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Berqamot", "Limon"],
      middle: ["Şam iynələri", "Bibər"],
      base: ["Səndəl ağacı", "Vanil", "Kəhrəba"]
    },
    inStock: true,
    category: "parfum",
    popularity: 87
  },
  {
    "id": "53",
    "name": "Diptyque Philosykos",
    "brand": "Diptyque",
    "description": "Diptyque Philosykos uniseks bir ətir olaraq əncir ağacının təbii və təravətli qoxusunu təqdim edir. Açılışda əncir yarpağının yaşıl və təravətli qoxusu ilə limonun sitruslu parlaqlığı qarşılayır, bu da ətirə enerjili bir başlanğıc verir. Ürək notlarında əncir meyvəsinin şirin və yumşaq ətirləri ilə kokosun kremli toxunuşu özünü göstərir, ətirə təbii bir dərinlik qatır. Baza isə sedr ağacının quru və odunsu örtüyü, ağ müşkün təmiz izi və əncir ağacının torpaq xarakteri ilə tamamlanır. Yay mövsümü və gündüz istifadəsi üçün ideal olan bu ətir, sadəlik və təravət vəd edir.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.6770.jpg",
    "price": 330,
    "rating": 4.7,
    "gender": "uniseks",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Əncir yarpağı", "Limon"],
      "middle": ["Əncir meyvəsi", "Kokos"],
      "base": ["Sedr ağacı", "Ağ müşk", "Əncir ağacı"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 88
  },
  {
    "id": "54",
    "name": "Chanel Chance Eau Tendre",
    "brand": "Chanel",
    "description": "Chanel Chance Eau Tendre qadınlar üçün yüngül və romantik bir ətirdir, çiçəkli və meyvəli notların harmoniyasını təqdim edir. Açılışda ayvanın şirin və meyvəli qoxusu ilə qreypfrutun sitruslu təravəti qarşılayır, bu da ətirə şən bir başlanğıc verir. Ürək notlarında yasəmənin dərin və çiçəkli ətirləri ilə sümbülün zərif akordları özünü göstərir, ətirə qadına xas bir incəlik qatır. Baza isə ağ müşkün təmiz və yumşaq örtüyü, iris çiçəyinin pudralı izi və sedr ağacının odunsu toxunuşu ilə tamamlanır. Bahar və yay mövsümləri üçün ideal olan bu ətir, təravətli və zərifdir.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.6766.jpg",
    "price": 300,
    "rating": 4.8,
    "gender": "qadın",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Ayva", "Qreypfrut"],
      "middle": ["Yasəmən", "Sümbül"],
      "base": ["Ağ müşk", "Iris çiçəyi", "Sedr ağacı"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 90
  },
  {
    "id": "55",
    "name": "Amouage Jubilation XXV",
    "brand": "Amouage",
    "description": "Amouage Jubilation XXV kişilər üçün Şərq notlarının zəngin və dəbdəbəli birləşməsini təqdim edən bir ətirdir. Açılışda qarağatın meyvəli və turş qoxusu ilə portağalın sitruslu təravəti qarşılayır, bu da ətirə enerjili bir başlanğıc verir. Ürək notlarında tütsünün sirli və dumanlı ətirləri ilə darçının ədviyyatlı kəskinliyi özünü göstərir, ətirə kişiyə xas bir ağırlıq qatır. Baza isə oudun odunsu dərinliyi, paçulinin torpaq izi və müşkün isti örtüyü ilə tamamlanır. Axşam istifadəsi və xüsusi anlar üçün ideal olan bu ətir, lüks və cəsarət vəd edir.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.6764.jpg",
    "price": 450,
    "rating": 4.8,
    "gender": "kişi",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Qarağat", "Portağal"],
      "middle": ["Tütsü", "Darçın"],
      "base": ["Oud", "Paçuli", "Müşk"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 91
  },
  {
    "id": "56",
    "name": "Jo Malone Rose & White Musk",
    "brand": "Jo Malone",
    "description": "Jo Malone Rose & White Musk uniseks bir ətir olaraq çiçəkli və müşk notlarının zərif birləşməsini təqdim edir. Açılışda qızılgülün romantik və təravətli qoxusu ilə mandarin portağalının şirəli akordları qarşılayır, bu da ətirə yüngül bir başlanğıc verir. Ürək notlarında yasəmənin dərin və çiçəkli ətirləri ilə sümbülün incə toxunuşu özünü göstərir. Baza isə ağ müşkün təmiz və yumşaq örtüyü, səndəl ağacının kremli izi və paçulinin torpaq xarakteri ilə tamamlanır. Həm gündüz, həm də axşam istifadəsi üçün uyğun olan bu ətir, sadəlik və incəlik vəd edir.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.23343.jpg",
    "price": 340,
    "rating": 4.6,
    "gender": "uniseks",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Qızılgül", "Mandarin portağalı"],
      "middle": ["Yasəmən", "Sümbül"],
      "base": ["Ağ müşk", "Səndəl ağacı", "Paçuli"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 86
  },
  {
    "id": "57",
    "name": "Tom Ford Velvet Orchid",
    "brand": "Tom Ford",
    "description": "Tom Ford Velvet Orchid qadınlar üçün dəbdəbəli və cazibədar bir ətirdir, çiçəkli və Şərq notlarının birləşməsini təqdim edir. Açılışda berqamotun sitruslu təravəti ilə romun isti və spirtli qoxusu qarşılayır, bu da ətirə zəngin bir başlanğıc verir. Ürək notlarında qara orkidenin ekzotik və sirli ətirləri ilə yasəmənin dərin toxunuşu özünü göstərir, ətirə qadına xas bir cazibə qatır. Baza isə vanilin şirin və isti örtüyü, səndəl ağacının kremli izi və süetin yumşaq dərinliyi ilə tamamlanır. Gecə istifadəsi və xüsusi anlar üçün ideal olan bu ətir, dəbdəbəli və duyğusaldır.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.25324.jpg",
    "price": 420,
    "rating": 4.7,
    "gender": "qadın",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Berqamot", "Rom"],
      "middle": ["Qara orkide", "Yasəmən"],
      "base": ["Vanil", "Səndəl ağacı", "Süet"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 89
  },
  {
    "id": "58",
    "name": "Creed Royal Oud",
    "brand": "Creed",
    "description": "Creed Royal Oud uniseks bir ətir olaraq Şərq və odunsu notların kral birləşməsini təqdim edir. Açılışda limonun sitruslu təravəti ilə çəhrayı bibərin ədviyyatlı kəskinliyi qarşılayır, bu da ətirə enerjili bir başlanğıc verir. Ürək notlarında oudun dərin və sirli ətirləri ilə səndəl ağacının kremli toxunuşu özünü göstərir, ətirə lüks bir xarakter qatır. Baza isə müşkün isti və duyğusal örtüyü, tonka fasulyesinin ədviyyatlı izi və sedr ağacının quru dərinliyi ilə tamamlanır. Gündüzdən gecəyə keçid üçün ideal olan bu ətir, zərif və güclüdür.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.12165.jpg",
    "price": 470,
    "rating": 4.8,
    "gender": "uniseks",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Limon", "Çəhrayı bibər"],
      "middle": ["Oud", "Səndəl ağacı"],
      "base": ["Müşk", "Tonka fasulyesi", "Sedr ağacı"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 92
  },
  {
    "id": "59",
    "name": "Lancôme Poême",
    "brand": "Lancôme",
    "description": "Lancôme Poême qadınlar üçün poetik və romantik bir ətirdir, çiçəkli notların zəngin birləşməsini təqdim edir. Açılışda qarağatın meyvəli və turş qoxusu ilə naberanın şirin təravəti qarşılayır, bu da ətirə şən bir başlanğıc verir. Ürək notlarında portağal çiçəyinin parlaq və çiçəkli ətirləri ilə freziyanın incə akordları özünü göstərir, ətirə qadına xas bir incəlik qatır. Baza isə vanilin şirin və isti örtüyü, kəhrəbanın qatranlı izi və müşkün yumşaq toxunuşu ilə tamamlanır. Xüsusi anlar və axşam istifadəsi üçün ideal olan bu ətir, duyğusal və zərifdir.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.618.jpg",
    "price": 280,
    "rating": 4.7,
    "gender": "qadın",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Qarağat", "Nabera"],
      "middle": ["Portağal çiçəyi", "Freziya"],
      "base": ["Vanil", "Kəhrəba", "Müşk"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 87
  },
  {
    "id": "60",
    "name": "Byredo Bal d'Afrique",
    "brand": "Byredo",
    "description": "Byredo Bal d'Afrique uniseks bir ətir olaraq Afrika mədəniyyətinin canlılığını və enerjisini əks etdirir. Açılışda berqamotun sitruslu təravəti ilə limonun parlaq qoxusu qarşılayır, bu da ətirə təravətli bir başlanğıc verir. Ürək notlarında violetin pudralı və zərif ətirləri ilə yasəmənin dərin toxunuşu özünü göstərir, ətirə ekzotik bir xarakter qatır. Baza isə vetiverin torpaq izi, müşkün yumşaq örtüyü və sedr ağacının quru dərinliyi ilə tamamlanır. Gündüz istifadəsi və xüsusi anlar üçün ideal olan bu ətir, canlı və unikal bir təcrübə vəd edir.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.6765.jpg",
    "price": 380,
    "rating": 4.7,
    "gender": "uniseks",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Berqamot", "Limon"],
      "middle": ["Violet", "Yasəmən"],
      "base": ["Vetiver", "Müşk", "Sedr ağacı"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 88
  },
  {
    "id": "61",
    "name": "Dior J'Adore",
    "brand": "Dior",
    "description": "Dior J'Adore qadınlar üçün zəriflik və feminitənin simvolu olan bir ətirdir, çiçəkli notların parlaq birləşməsini təqdim edir. Açılışda berqamotun sitruslu təravəti ilə şaftalının şirin qoxusu qarşılayır, bu da ətirə enerjili bir başlanğıc verir. Ürək notlarında yasəmənin dərin və çiçəkli ətirləri ilə maqnoliyanın zərif akordları özünü göstərir, ətirə qadına xas bir incəlik qatır. Baza isə vanilin şirin və isti örtüyü, səndəl ağacının kremli izi və müşkün yumşaq toxunuşu ilə tamamlanır. Gündüzdən axşama keçid üçün ideal olan bu ətir, zamansız bir gözəllik təqdim edir.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.612.jpg",
    "price": 310,
    "rating": 4.8,
    "gender": "qadın",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Berqamot", "Şaftalı"],
      "middle": ["Yasəmən", "Maqnoliya"],
      "base": ["Vanil", "Səndəl ağacı", "Müşk"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 93
  },
  {
    "id": "62",
    "name": "Tom Ford Tobacco Vanille",
    "brand": "Tom Ford",
    "description": "Tom Ford Tobacco Vanille uniseks bir ətir olaraq isti və zəngin notların dəbdəbəli birləşməsini təqdim edir. Açılışda tütün yarpağının quru və aromatik qoxusu ilə ədviyyatlı notların kəskinliyi qarşılayır, bu da ətirə unikal bir başlanğıc verir. Ürək notlarında tonka fasulyesinin ədviyyatlı və şirin ətirləri ilə kakao tozunun zəngin toxunuşu özünü göstərir, ətirə dərinlik qatır. Baza isə vanilin isti və şirin örtüyü, tütün çiçəyinin dəbdəbəli izi və odunsu notların quru dərinliyi ilə tamamlanır. Soyuq günlər və axşam istifadəsi üçün ideal olan bu ətir, lüks və cazibədardır.",
    "image": "https://fimgs.net/mdimg/perfume/375x500.1773.jpg",
    "price": 460,
    "rating": 4.9,
    "gender": "uniseks",
    "size": "100ml",
    "concentration": "Eau de Parfum",
    "notes": {
      "top": ["Tütün yarpağı", "Ədviyyatlı notlar"],
      "middle": ["Tonka fasulyesi", "Kakao tozu"],
      "base": ["Vanil", "Tütün çiçəyi", "Odunsu notlar"]
    },
    "inStock": true,
    "category": "parfum",
    "popularity": 94
  } // Add the new products here
]; 