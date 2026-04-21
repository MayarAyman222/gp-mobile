export const mainCategories = [
  {
    name:     "Real Life Activities",
    title_en: "Real Life Activities",
    title_ar: "أنشطة الحياة اليومية",
    title_fr: "Activités de la vie quotidienne",
    title_es: "Actividades de la vida diaria",
    imgUrl:   "/public/categories/real-life.png"
  },
  {
    name:     "Reminder Me",
    title_en: "Reminder Me",
    title_ar: "ذكّرني",
    title_fr: "Rappelle-moi",
    title_es: "Recuérdame",
    imgUrl:   "/public/categories/reminder.png"
  },
  {
    name:     "Emergency",
    title_en: "Emergency",
    title_ar: "طوارئ",
    title_fr: "Urgence",
    title_es: "Emergencia",
    imgUrl:   "/public/categories/emergency.png"
  },
  {
    name:     "Try and Train to Speak",
    title_en: "Try and Train to Speak",
    title_ar: "حاول وتدرب على الكلام",
    title_fr: "Essayez et entraînez-vous à parler",
    title_es: "Intenta y entrena para hablar",
    imgUrl:   "/public/categories/train.png"
  },
  {
    name:     "expressyourfeelingsbydrawing",
    title_en: "Express By Drawing",
    title_ar: "عبّر بالرسم",
    title_fr: "Exprime-toi par le dessin",
    title_es: "ExprÃ©sate dibujando",
    imgUrl:   "/public/categories/train.png"
  }
];
 
export const timePeriods = [
  {
    name:         "Morning",
    title_en:     "Morning",
    title_ar:     "صباح",
    title_fr:     "Matin",
    title_es:     "Mañana",
    imgUrl:       "/public/timeperiods/morning.png",
    mainCategory: "Real Life Activities",
    order:        1
  },
  {
    name:         "Noon",
    title_en:     "Noon",
    title_ar:     "ظهر",
    title_fr:     "Midi",
    title_es:     "Mediodía",
    imgUrl:       "/public/timeperiods/noon.png",
    mainCategory: "Real Life Activities",
    order:        2
  },
  {
    name:         "Afternoon",
    title_en:     "Afternoon",
    title_ar:     "بعد الظهر",
    title_fr:     "Après-midi",
    title_es:     "Tarde",
    imgUrl:       "/public/timeperiods/afternoon.png",
    mainCategory: "Real Life Activities",
    order:        3
  },
  {
    name:         "Evening",
    title_en:     "Evening",
    title_ar:     "مساء",
    title_fr:     "Soir",
    title_es:     "Noche",
    imgUrl:       "/public/timeperiods/evening.png",
    mainCategory: "Real Life Activities",
    order:        4
  }
];

export const emergencyNumbers = [
  { number: "01063930981", label_ar: "رقم طوارئ 1", label_en: "Emergency Number 1", label_fr: "Numéro d'urgence 1", label_es: "Número de emergencia 1" },
  { number: "01062021589", label_ar: "رقم طوارئ 2", label_en: "Emergency Number 2", label_fr: "Numéro d'urgence 2", label_es: "Número de emergencia 2" }
];
// ─────────────────────────────────────────────
//  MAIN ICONS
// ─────────────────────────────────────────────
export const icons = [

  // ====== REAL LIFE ACTIVITIES ======
  {
    title_en: "Eating", title_ar: "أكل", title_fr: "Manger", title_es: "Comer",
    expression_en: "I am hungry", expression_ar: "أنا جائع", expression_fr: "J'ai faim", expression_es: "Tengo hambre",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    category: "Food and Drink", timePeriod: "Morning", mainCategory: "Real Life Activities"
  },
  /*{
    title_en: "Clothes", title_ar: "ملابس", title_fr: "Vêtements", title_es: "Ropa",
    expression_en: "I want to wear my clothes", expression_ar: "أريد ارتداء ملابسي", expression_fr: "Je veux porter mes vêtements", expression_es: "Quiero ponerme mi ropa",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    category: "Clothes", timePeriod: "Morning", mainCategory: "Real Life Activities"
  },*/
  {
    title_en: "Feelings", title_ar: "مشاعر", title_fr: "Sentiments", title_es: "Sentimientos",
    expression_en: "I feel sad", expression_ar: "أشعر بالحزن", expression_fr: "Je me sens triste", expression_es: "Me siento triste",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/742/742751.png",
    category: "Feelings", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Animals", title_ar: "حيوان", title_fr: "Animaux", title_es: "Animales",
    expression_en: "I love animals", expression_ar: "أحب الحيوانات", expression_fr: "J'aime les animaux", expression_es: "Me gustan los animales",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    category: "Animals", timePeriod: "Afternoon", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Place", title_ar: "مكان", title_fr: "Lieu", title_es: "Lugar",
    expression_en: "I want to go somewhere", expression_ar: "أريد الذهاب إلى مكان", expression_fr: "Je veux aller quelque part", expression_es: "Quiero ir a algún lugar",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    category: "Places", timePeriod: "Noon", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Question", title_ar: "سؤال", title_fr: "Question", title_es: "Pregunta",
    expression_en: "I have a question", expression_ar: "لدي سؤال", expression_fr: "J'ai une question", expression_es: "Tengo una pregunta",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/471/471664.png",
    category: "Questions", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Relation", title_ar: "علاقة", title_fr: "Relation", title_es: "Relación",
    expression_en: "This person is close to me", expression_ar: "هذا شخص قريب مني", expression_fr: "Cette personne m'est proche", expression_es: "Esta persona es cercana a mí",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    category: "Relations", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Time", title_ar: "وقت", title_fr: "Temps", title_es: "Tiempo",
    expression_en: "What time is it now", expression_ar: "الوقت الآن", expression_fr: "Quelle heure est-il", expression_es: "¿Qué hora es ahora?",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
    category: "Times", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Tools", title_ar: "أدوات", title_fr: "Outils", title_es: "Herramientas",
    expression_en: "I need a tool", expression_ar: "أحتاج أداة", expression_fr: "J'ai besoin d'un outil", expression_es: "Necesito una herramienta",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/3079/3079169.png",
    category: "Tools", timePeriod: "Morning", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Transport", title_ar: "مواصلات", title_fr: "Transport", title_es: "Transporte",
    expression_en: "I want to use transportation", expression_ar: "أريد الذهاب بالمواصلات", expression_fr: "Je veux prendre les transports", expression_es: "Quiero usar transporte",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png",
    category: "Transport", timePeriod: "Noon", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Verbs", title_ar: "فعل", title_fr: "Verbes", title_es: "Verbos",
    expression_en: "I want to do something", expression_ar: "أريد أن أفعل شيئًا", expression_fr: "Je veux faire quelque chose", expression_es: "Quiero hacer algo",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
    category: "Verbs", timePeriod: "Afternoon", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Sleeping", title_ar: "نوم", title_fr: "Dormir", title_es: "Dormir",
    expression_en: "I want to sleep", expression_ar: "أريد أن أنام", expression_fr: "Je veux dormir", expression_es: "Quiero dormir",
    imgUrl: "/public/icons/Sleeping.png",
    category: "Sleeping", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Drinking", title_ar: "شرب", title_fr: "Boire", title_es: "Beber",
    expression_en: "I want to drink", expression_ar: "أريد أن أشرب", expression_fr: "Je veux boire", expression_es: "Quiero beber",
    imgUrl: "/public/icons/Drinking.png",
    category: "Drinking", timePeriod: "Morning", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Breakfast", title_ar: "إفطار", title_fr: "Petit-déjeuner", title_es: "Desayuno",
    expression_en: "I want breakfast", expression_ar: "أريد الإفطار", expression_fr: "Je veux le petit-déjeuner", expression_es: "Quiero desayuno",
    imgUrl: "/public/icons/Breakfast.png",
    category: "Breakfast", timePeriod: "Morning", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Lunch", title_ar: "غداء", title_fr: "Déjeuner", title_es: "Almuerzo",
    expression_en: "I want lunch", expression_ar: "أريد الغداء", expression_fr: "Je veux déjeuner", expression_es: "Quiero almuerzo",
    imgUrl: "/public/icons/Lunch.png",
    category: "Lunch", timePeriod: "Noon", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Dinner", title_ar: "عشاء", title_fr: "Dîner", title_es: "Cena",
    expression_en: "I want dinner", expression_ar: "أريد العشاء", expression_fr: "Je veux dîner", expression_es: "Quiero cena",
    imgUrl: "/public/icons/Dinner.png",
    category: "Dinner", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Snack", title_ar: "وجبة خفيفة", title_fr: "Collation", title_es: "Merienda",
    expression_en: "I want a snack", expression_ar: "أريد وجبة خفيفة", expression_fr: "Je veux une collation", expression_es: "Quiero una merienda",
    imgUrl: "/public/icons/Snack.png",
    category: "Snack", timePeriod: "Afternoon", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Get Dressed", title_ar: "ارتداء ملابس", title_fr: "S'habiller", title_es: "Vestirse",
    expression_en: "I want to get dressed", expression_ar: "أريد أن أرتدي ملابسي", expression_fr: "Je veux m'habiller", expression_es: "Quiero vestirme",
    imgUrl: "/public/icons/GetDressed.png",
    category: "Get Dressed", timePeriod: "Morning", mainCategory: "Real Life Activities"
  },
  {
    title_en: "TV", title_ar: "تلفاز", title_fr: "Télévision", title_es: "Televisión",
    expression_en: "I want to watch TV", expression_ar: "أريد مشاهدة التلفاز", expression_fr: "Je veux regarder la télévision", expression_es: "Quiero ver la televisión",
    imgUrl: "/public/icons/TV.png",
    category: "TV", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Play", title_ar: "لعب", title_fr: "Jouer", title_es: "Jugar",
    expression_en: "I want to play", expression_ar: "أريد اللعب", expression_fr: "Je veux jouer", expression_es: "Quiero jugar",
    imgUrl: "/public/icons/Play.png",
    category: "Play", timePeriod: "Afternoon", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Music", title_ar: "موسيقى", title_fr: "Musique", title_es: "Música",
    expression_en: "I want to listen to music", expression_ar: "أريد الاستماع للموسيقى", expression_fr: "Je veux écouter de la musique", expression_es: "Quiero escuchar música",
    imgUrl: "/public/icons/Music.png",
    category: "Music", timePeriod: "Afternoon", mainCategory: "Real Life Activities"
  },
  /*{
    title_en: "Shower", title_ar: "استحمام", title_fr: "Douche", title_es: "Ducha",
    expression_en: "I want to take a shower", expression_ar: "أريد الاستحمام", expression_fr: "Je veux prendre une douche", expression_es: "Quiero ducharme",
    imgUrl: "/public/icons/Shower.png",
    category: "Shower", timePeriod: "Morning", mainCategory: "Real Life Activities"
  },*/
  {
  title_en: "Bathroom", title_ar: "الحمام", title_fr: "Salle de bain", title_es: "Baño",
  expression_en: "I want to go to the bathroom", expression_ar: "أريد الذهاب إلى الحمام", expression_fr: "Je veux aller à la salle de bain", expression_es: "Quiero ir al baño",
  imgUrl: "/public/icons/Bathroom.png",
  category: "Bathroom", timePeriod: "Morning", mainCategory: "Real Life Activities"
},
  {
    title_en: "Afraid", title_ar: "خائف", title_fr: "Effrayé", title_es: "Asustado",
    expression_en: "I feel afraid", expression_ar: "أشعر بالخوف", expression_fr: "J'ai peur", expression_es: "Tengo miedo",
    imgUrl: "/public/Feelings/4.png",
    category: "Afraid", timePeriod: "Evening", mainCategory: "Real Life Activities"
  },
  {
    title_en: "Call", title_ar: "اتصال", title_fr: "Appeler", title_es: "Llamar",
    expression_en: "I want to make a call", expression_ar: "أريد إجراء مكالمة", expression_fr: "Je veux passer un appel", expression_es: "Quiero hacer una llamada",
    imgUrl: "/public/icons/Call.png",
    category: "Call", mainCategory: "Real Life Activities",  timePeriod: "Evening"
  },
  {
    title_en: "Talk", title_ar: "تحدث", title_fr: "Parler", title_es: "Hablar",
    expression_en: "I want to talk", expression_ar: "أريد أن أتحدث", expression_fr: "Je veux parler", expression_es: "Quiero hablar",
    imgUrl: "/public/icons/Talk.png",
    category: "Talk", mainCategory: "Real Life Activities" , timePeriod: "Afternoon"

  },
  {
    title_en: "Listen", title_ar: "استمع", title_fr: "Écouter", title_es: "Escuchar",
    expression_en: "I want to listen", expression_ar: "أريد الاستماع", expression_fr: "Je veux écouter", expression_es: "Quiero escuchar",
    imgUrl: "/public/icons/Listen.png",
    category: "Listen", mainCategory: "Real Life Activities", timePeriod: "Afternoon"
  },
  {
    title_en: "Home", title_ar: "المنزل", title_fr: "Maison", title_es: "Casa",
    expression_en: "I want to go home", expression_ar: "أريد الذهاب إلى المنزل", expression_fr: "Je veux rentrer à la maison", expression_es: "Quiero ir a casa",
    imgUrl: "/public/icons/Home.png",
    category: "Home", mainCategory: "Real Life Activities"  , timePeriod: "Evening"

  },
  {
    title_en: "Places", title_ar: "أماكن", title_fr: "Lieux", title_es: "Lugares",
    expression_en: "I want to go to a place", expression_ar: "أريد الذهاب إلى مكان", expression_fr: "Je veux aller à un endroit", expression_es: "Quiero ir a un lugar",
    imgUrl: "/public/icons/Places.png",
    category: "places", mainCategory: "Real Life Activities"  , timePeriod: "Noon"

  },
// ====== EXTRA CATEGORIES ======

{
  title_en: "Communication", title_ar: "تواصل", title_fr: "Communication", title_es: "Comunicación",
  expression_en: "I want to communicate", expression_ar: "أريد التواصل", expression_fr: "Je veux communiquer", expression_es: "Quiero comunicarme",
  imgUrl: "/public/icons/Communication.png",
  category: "Communication",
  timePeriod: "Evening",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Leisure", title_ar: "ترفيه", title_fr: "Loisir", title_es: "Ocio",
  expression_en: "I want to relax", expression_ar: "أريد الاسترخاء", expression_fr: "Je veux me détendre", expression_es: "Quiero relajarme",
  imgUrl: "/public/icons/Leisure.png",
  category: "Leisure",
  timePeriod: "Afternoon",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Document", title_ar: "مستند", title_fr: "Document", title_es: "Documento",
  expression_en: "I need a document", expression_ar: "أحتاج مستند", expression_fr: "J'ai besoin d'un document", expression_es: "Necesito un documento",
  imgUrl: "/public/icons/Document.png",
  category: "Document",
  timePeriod: "Morning",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Living Being", title_ar: "كائن حي", title_fr: "Être vivant", title_es: "Ser vivo",
  expression_en: "This is a living being", expression_ar: "هذا كائن حي", expression_fr: "C'est un être vivant", expression_es: "Este es un ser vivo",
  imgUrl: "/public/icons/LivingBeing.png",
  category: "Living Being",
  timePeriod: "Afternoon",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Knowledge", title_ar: "معرفة", title_fr: "Connaissance", title_es: "Conocimiento",
  expression_en: "I want to learn", expression_ar: "أريد التعلم", expression_fr: "Je veux apprendre", expression_es: "Quiero aprender",
  imgUrl: "/public/icons/Knowledge.png",
  category: "Knowledge",
  timePeriod: "Morning",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Education", title_ar: "تعليم", title_fr: "Éducation", title_es: "Educación",
  expression_en: "I want to study", expression_ar: "أريد الدراسة", expression_fr: "Je veux étudier", expression_es: "Quiero estudiar",
  imgUrl: "/public/icons/Education.png",
  category: "Education",
  timePeriod: "Morning",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Miscellaneous", title_ar: "متفرقات", title_fr: "Divers", title_es: "Misceláneo",
  expression_en: "Other things", expression_ar: "أشياء أخرى", expression_fr: "Autres choses", expression_es: "Otras cosas",
  imgUrl: "/public/icons/Misc.png",
  category: "Miscellaneous",
  timePeriod: "Noon",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Movement", title_ar: "حركة", title_fr: "Mouvement", title_es: "Movimiento",
  expression_en: "I want to move", expression_ar: "أريد التحرك", expression_fr: "Je veux bouger", expression_es: "Quiero moverme",
  imgUrl: "/public/icons/Movement.png",
  category: "Movement",
  timePeriod: "Afternoon",
  mainCategory: "Real Life Activities"
},
 {
   title_en: "Economic Sector",
  title_ar: "القطاع الاقتصادي",
  title_fr: "Secteur économique",
  title_es: "Sector económico",
  expression_en: "I want to go to work",
  expression_ar: "أريد الذهاب إلى العمل",
  expression_fr: "Je veux aller au travail",
  expression_es: "Quiero ir a trabajar",
  imgUrl: "/public/icons/sector.png",
 mainCategory: "Real Life Activities",
  timePeriod: "Morning",
  category: "work"
},
{
  title_en: "Religion", title_ar: "دين", title_fr: "Religion", title_es: "Religión",
  expression_en: "I want to pray", expression_ar: "أريد الصلاة", expression_fr: "Je veux prier", expression_es: "Quiero rezar",
  imgUrl: "/public/icons/Religion.png",
  category: "Religion",
  timePeriod: "Evening",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Work", title_ar: "عمل", title_fr: "Travail", title_es: "Trabajo",
  expression_en: "I want to work", expression_ar: "أريد العمل", expression_fr: "Je veux travailler", expression_es: "Quiero trabajar",
  imgUrl: "/public/icons/Work.png",
  category: "Work",
  timePeriod: "Morning",
  mainCategory: "Real Life Activities"
},
/*{
  title_en: "Object", title_ar: "شيء", title_fr: "Objet", title_es: "Objeto",
  expression_en: "I need an object", expression_ar: "أحتاج شيء", expression_fr: "J'ai besoin d'un objet", expression_es: "Necesito un objeto",
  imgUrl: "/public/icons/Object.png",
  category: "Object",
  timePeriod: "Noon",
  mainCategory: "c"
},*/
{
  title_en: "Plant",
  title_ar: "نبات",
  title_fr: "Plante",
  title_es: "Planta",
  expression_en: "I want to learn about plants",
  expression_ar: "أريد التعلم عن النباتات",
  expression_fr: "Je veux apprendre sur les plantes",
  expression_es: "Quiero aprender sobre plantas",
  imgUrl: "/public/icons/Plant.png",
  category: "Plant",
  timePeriod: "Morning",
  mainCategory: "Real Life Activities"
},
{
  title_en: "Education",
  title_ar: "تعليم",
  title_fr: "Éducation",
  title_es: "Educación",
  expression_en: "I want to learn",
  expression_ar: "أريد التعلم",
  expression_fr: "Je veux apprendre",
  expression_es: "Quiero aprender",
  imgUrl: "/public/icons/Education.png",
  category: "Education",
    timePeriod: "Morning",

  mainCategory: "Real Life Activities"
},
  // ====== REMINDER ME ======
  {
    title_en: "Medicine", title_ar: "دواء", title_fr: "Médicament", title_es: "Medicina",
    expression_en: "I need my medicine", expression_ar: "أحتاج دوائي", expression_fr: "J'ai besoin de mon médicament", expression_es: "Necesito mi medicina",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/3034/3034690.png",
    category: "Medicine", mainCategory: "Reminder Me"
  },
  {
    title_en: "Family", title_ar: "عائلتي", title_fr: "Ma famille", title_es: "Mi familia",
    expression_en: "I want to see my family", expression_ar: "أريد رؤية عائلتي", expression_fr: "Je veux voir ma famille", expression_es: "Quiero ver a mi familia",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
    category: "Family", mainCategory: "Reminder Me"
  },
  {
    title_en: "Doctor", title_ar: "طبيب", title_fr: "Médecin", title_es: "Doctor",
    expression_en: "I need to see a doctor", expression_ar: "أحتاج لرؤية الطبيب", expression_fr: "J'ai besoin de voir un médecin", expression_es: "Necesito ver a un doctor",
    imgUrl: "/public/icons/Doctor.png",
    category: "Doctor", mainCategory: "Reminder Me"
  },
  {
    title_en: "Memories", title_ar: "ذكرني", title_fr: "Souvenirs", title_es: "Recuerdos",
    expression_en: "Reminder", expression_ar: "تذكير", expression_fr: "Rappel", expression_es: "Recordatorio",
    imgUrl: "/public/memories/memories.png",
    category: "Reminder Mee", mainCategory: "Reminder Me"
  },
  {
    title_en: "Neighbours", title_ar: "جيراني", title_fr: "Mes voisins", title_es: "Mis vecinos",
    expression_en: "My neighbours", expression_ar: "جيراني", expression_fr: "Mes voisins", expression_es: "Mis vecinos",
    imgUrl: "/public/memories/neighborhood.png",
    category: "Neighbours", mainCategory: "Reminder Me"
  },
  {
  title_en: "Friends",
  title_ar: "أصدقائي",
  title_fr: "Mes amis",
  title_es: "Mis amigos",
  expression_en: "My friends",
  expression_ar: "أصدقائي",
  expression_fr: "Mes amis",
  expression_es: "Mis amigos",
  imgUrl: "/public/icons/friends.png",
  category: "Friends",
  mainCategory: "Reminder Me"
},
]
// ─────────────────────────────────────────────
//  SUB-ICONS
// ─────────────────────────────────────────────

export const educationSubIcons = [
  {
    title_en: "Teaching activity",
    title_ar: "نشاط تعليمي",
    title_fr: "Activité pédagogique",
    title_es: "Actividad educativa",
    expression_en: "I want to do a learning activity",
    expression_ar: "أريد القيام بنشاط تعليمي",
    expression_fr: "Je veux faire une activité pédagogique",
    expression_es: "Quiero hacer una actividad educativa",
    imgUrl: "/public/education/activity.png",
    category: "Education"
  },

  {
    title_en: "Subject",
    title_ar: "مادة دراسية",
    title_fr: "Matière",
    title_es: "Asignatura",
    expression_en: "I want to study a subject",
    expression_ar: "أريد دراسة مادة",
    expression_fr: "Je veux étudier une matière",
    expression_es: "Quiero estudiar una asignatura",
    imgUrl: "/public/education/subject.png",
    category: "Education"
  },

  {
    title_en: "Institution",
    title_ar: "مؤسسة تعليمية",
    title_fr: "Institution",
    title_es: "Institución",
    expression_en: "I want to go to an educational institution",
    expression_ar: "أريد الذهاب إلى مؤسسة تعليمية",
    expression_fr: "Je veux aller à une institution éducative",
    expression_es: "Quiero ir a una institución educativa",
    imgUrl: "/public/education/institution.png",
    category: "Education"
  },

  {
    title_en: "Task",
    title_ar: "مهمة تعليمية",
    title_fr: "Tâche éducative",
    title_es: "Tarea educativa",
    expression_en: "I want to do a task",
    expression_ar: "أريد القيام بمهمة",
    expression_fr: "Je veux faire une tâche",
    expression_es: "Quiero hacer una tarea",
    imgUrl: "/public/education/task.png",
    category: "Education"
  },

  {
    title_en: "Material",
    title_ar: "مواد تعليمية",
    title_fr: "Matériel éducatif",
    title_es: "Material educativo",
    expression_en: "I need learning materials",
    expression_ar: "أحتاج مواد تعليمية",
    expression_fr: "J'ai besoin de matériel éducatif",
    expression_es: "Necesito material educativo",
    imgUrl: "/public/education/material.png",
    category: "Education"
  },

  {
    title_en: "Equipment",
    title_ar: "معدات تعليمية",
    title_fr: "Équipement éducatif",
    title_es: "Equipo educativo",
    expression_en: "I need equipment",
    expression_ar: "أحتاج معدات",
    expression_fr: "J'ai besoin d'équipement",
    expression_es: "Necesito equipo",
    imgUrl: "/public/education/equipment.png",
    category: "Education"
  },

  {
    title_en: "Space",
    title_ar: "مكان تعليمي",
    title_fr: "Espace éducatif",
    title_es: "Espacio educativo",
    expression_en: "I want to go to a learning space",
    expression_ar: "أريد الذهاب إلى مكان تعليمي",
    expression_fr: "Je veux aller dans un espace éducatif",
    expression_es: "Quiero ir a un espacio educativo",
    imgUrl: "/public/education/space.png",
    category: "Education"
  },

  {
    title_en: "Organization",
    title_ar: "منظمة تعليمية",
    title_fr: "Organisation éducative",
    title_es: "Organización educativa",
    expression_en: "This is an educational organization",
    expression_ar: "هذه منظمة تعليمية",
    expression_fr: "C'est une organisation éducative",
    expression_es: "Esta es una organización educativa",
    imgUrl: "/public/education/org.png",
    category: "Education"
  },

  {
    title_en: "Establishment",
    title_ar: "مؤسسة تعليمية",
    title_fr: "Établissement",
    title_es: "Establecimiento",
    expression_en: "This is an educational establishment",
    expression_ar: "هذه مؤسسة تعليمية",
    expression_fr: "C'est un établissement éducatif",
    expression_es: "Este es un establecimiento educativo",
    imgUrl: "/public/education/establishment.png",
    category: "Education"
  },

  {
    title_en: "Special Education",
    title_ar: "تعليم خاص",
    title_fr: "Éducation spéciale",
    title_es: "Educación especial",
    expression_en: "I need special education",
    expression_ar: "أحتاج تعليم خاص",
    expression_fr: "J'ai besoin d'une éducation spéciale",
    expression_es: "Necesito educación especial",
    imgUrl: "/public/education/special.png",
    category: "Education"
  },

  {
    title_en: "Staff",
    title_ar: "طاقم تعليمي",
    title_fr: "Personnel éducatif",
    title_es: "Personal educativo",
    expression_en: "I want to talk to staff",
    expression_ar: "أريد التحدث مع الطاقم",
    expression_fr: "Je veux parler au personnel",
    expression_es: "Quiero hablar con el personal",
    imgUrl: "/public/education/staff.png",
    category: "Education"
  },

  {
    title_en: "Documentation",
    title_ar: "وثائق تعليمية",
    title_fr: "Documentation",
    title_es: "Documentación",
    expression_en: "I need documents",
    expression_ar: "أحتاج مستندات",
    expression_fr: "J'ai besoin de documents",
    expression_es: "Necesito documentos",
    imgUrl: "/public/education/docs.png",
    category: "Education"
  },

  {
    title_en: "Students",
    title_ar: "طلاب",
    title_fr: "Étudiants",
    title_es: "Estudiantes",
    expression_en: "Students are here",
    expression_ar: "الطلاب هنا",
    expression_fr: "Les étudiants sont ici",
    expression_es: "Los estudiantes están aquí",
    imgUrl: "/public/education/students.png",
    category: "Education"
  },

  {
    title_en: "Methodology",
    title_ar: "منهجية",
    title_fr: "Méthodologie",
    title_es: "Metodología",
    expression_en: "I want to learn a method",
    expression_ar: "أريد تعلم منهج",
    expression_fr: "Je veux apprendre une méthode",
    expression_es: "Quiero aprender un método",
    imgUrl: "/public/education/method.png",
    category: "Education"
  },

  {
    title_en: "Core vocabulary",
    title_ar: "مفردات أساسية",
    title_fr: "Vocabulaire de base",
    title_es: "Vocabulario básico",
    expression_en: "I want to learn basic words",
    expression_ar: "أريد تعلم كلمات أساسية",
    expression_fr: "Je veux apprendre le vocabulaire de base",
    expression_es: "Quiero aprender vocabulario básico",
    imgUrl: "/public/education/vocab.png",
    category: "Education"
  },
];
export const animalSubIcons = [
  /*{ title_en: "Bird",   title_ar: "طائر",  title_fr: "Oiseau",  title_es: "Pájaro",  expression_en: "This is a bird",    expression_ar: "هذا طائر",  expression_fr: "C'est un oiseau",  expression_es: "Este es un pájaro",  imgUrl: "/public/Animals/Bird.png",      category: "Animals" },
  { title_en: "Cat",    title_ar: "قطة",   title_fr: "Chat",    title_es: "Gato",    expression_en: "This is a cat",     expression_ar: "هذه قطة",   expression_fr: "C'est un chat",    expression_es: "Este es un gato",    imgUrl: "/public/Animals/Cat.png",       category: "Animals" },
  { title_en: "Dog",    title_ar: "كلب",   title_fr: "Chien",   title_es: "Perro",   expression_en: "This is a dog",     expression_ar: "هذا كلب",   expression_fr: "C'est un chien",   expression_es: "Este es un perro",   imgUrl: "/public/Animals/Dog.png",       category: "Animals" },
  { title_en: "Fish",   title_ar: "سمكة",  title_fr: "Poisson", title_es: "Pez",     expression_en: "This is a fish",    expression_ar: "هذه سمكة",  expression_fr: "C'est un poisson", expression_es: "Este es un pez",     imgUrl: "/public/Animals/Fish.png",      category: "Animals" },
  { title_en: "Insect", title_ar: "حشرة",  title_fr: "Insecte", title_es: "Insecto", expression_en: "This is an insect", expression_ar: "هذه حشرة",  expression_fr: "C'est un insecte", expression_es: "Este es un insecto", imgUrl: "/public/Animals/7shraat.png",   category: "Animals" },
  */

 {
    title_en: "Anatomy",
    title_ar: "تشريح",
    title_fr: "Anatomie",
    title_es: "Anatomía",
    expression_en: "This is animal anatomy",
    expression_ar: "هذا تشريح الحيوانات",
    expression_fr: "C'est l'anatomie des animaux",
    expression_es: "Esta es la anatomía de los animales",
    imgUrl: "/public/Animals/anatomy.png",
    category: "Animals"
  },
  {
    title_en: "Nutrition",
    title_ar: "تغذية",
    title_fr: "Nutrition",
    title_es: "Nutrición",
    expression_en: "This is animal nutrition",
    expression_ar: "هذه تغذية الحيوانات",
    expression_fr: "C'est la nutrition animale",
    expression_es: "Esta es la nutrición animal",
    imgUrl: "/public/Animals/nutrition.png",
    category: "Animals"
  },
  {
    title_en: "Types",
    title_ar: "أنواع الحيوانات",
    title_fr: "Types d'animaux",
    title_es: "Tipos de animales",
    expression_en: "These are animal types",
    expression_ar: "هذه أنواع الحيوانات",
    expression_fr: "Ce sont des types d'animaux",
    expression_es: "Estos son tipos de animales",
    imgUrl: "/public/Animals/types.png",
    category: "Animals"
  },
  {
    title_en: "Reproduction",
    title_ar: "التكاثر",
    title_fr: "Reproduction",
    title_es: "Reproducción",
    expression_en: "This is animal reproduction",
    expression_ar: "هذا تكاثر الحيوانات",
    expression_fr: "C'est la reproduction animale",
    expression_es: "Esta es la reproducción animal",
    imgUrl: "/public/Animals/reproduction.png",
    category: "Animals"
  },
  {
    title_en: "Physiology",
    title_ar: "فسيولوجيا",
    title_fr: "Physiologie",
    title_es: "Fisiología",
    expression_en: "This is animal physiology",
    expression_ar: "هذه فسيولوجيا الحيوانات",
    expression_fr: "C'est la physiologie animale",
    expression_es: "Esta es la fisiología animal",
    imgUrl: "/public/Animals/physiology.png",
    category: "Animals"
  },
  {
    title_en: "Environment",
    title_ar: "البيئة",
    title_fr: "Environnement",
    title_es: "Medio ambiente",
    expression_en: "This is the animal environment",
    expression_ar: "هذه بيئة الحيوانات",
    expression_fr: "C'est l'environnement des animaux",
    expression_es: "Este es el entorno de los animales",
    imgUrl: "/public/Animals/environment.png",
    category: "Animals"
  },
  {
    title_en: "Behavior",
    title_ar: "سلوك",
    title_fr: "Comportement",
    title_es: "Comportamiento",
    expression_en: "This is animal behavior",
    expression_ar: "هذا سلوك الحيوانات",
    expression_fr: "C'est le comportement animal",
    expression_es: "Este es el comportamiento animal",
    imgUrl: "/public/Animals/behavior.png",
    category: "Animals"
  },
  {
    title_en: "Housing",
    title_ar: "سكن الحيوانات",
    title_fr: "Habitat",
    title_es: "Hábitat",
    expression_en: "This is animal housing",
    expression_ar: "هذا سكن الحيوانات",
    expression_fr: "C'est l'habitat des animaux",
    expression_es: "Este es el hábitat de los animales",
    imgUrl: "/public/Animals/housing.png",
    category: "Animals"
  },
  {
    title_en: "Therapy",
    title_ar: "العلاج بالحيوانات",
    title_fr: "Thérapie animale",
    title_es: "Terapia con animales",
    expression_en: "This is animal-assisted therapy",
    expression_ar: "هذا العلاج بالحيوانات",
    expression_fr: "C'est la thérapie assistée par les animaux",
    expression_es: "Esta es la terapia asistida con animales",
    imgUrl: "/public/Animals/therapy.png",
    category: "Animals"
  },
  {
    title_en: "Pets & Wild",
    title_ar: "أليفة وبرية",
    title_fr: "Animaux domestiques et sauvages",
    title_es: "Mascotas y animales salvajes",
    expression_en: "These are pets and wild animals",
    expression_ar: "هذه حيوانات أليفة وبرية",
    expression_fr: "Ce sont des animaux domestiques et sauvages",
    expression_es: "Estos son animales domésticos y salvajes",
    imgUrl: "/public/Animals/pets.png",
    category: "Animals"
  }
];


/*export const clothesSubIcons = [
  { title_en: "Shirt",   title_ar: "قميص",   title_fr: "Chemise",     title_es: "Camisa",      expression_en: "This is a shirt",   expression_ar: "هذا قميص",   expression_fr: "C'est une chemise",      expression_es: "Esta es una camisa",   imgUrl: "/public/Clothes/2amis.png",  category: "Clothes" },
  { title_en: "Suit",    title_ar: "بدلة",   title_fr: "Costume",     title_es: "Traje",       expression_en: "This is a suit",    expression_ar: "هذه بدلة",   expression_fr: "C'est un costume",       expression_es: "Este es un traje",     imgUrl: "/public/Clothes/Badla.png",  category: "Clothes" },
  { title_en: "Blouse",  title_ar: "بلوزة",  title_fr: "Blouse",      title_es: "Blusa",       expression_en: "This is a blouse",  expression_ar: "هذه بلوزة",  expression_fr: "C'est une blouse",       expression_es: "Esta es una blusa",    imgUrl: "/public/Clothes/blouse.png", category: "Clothes" },
  { title_en: "Pants",   title_ar: "بنطلون", title_fr: "Pantalon",    title_es: "Pantalón",    expression_en: "These are pants",   expression_ar: "هذا بنطلون", expression_fr: "C'est un pantalon",      expression_es: "Estos son pantalones", imgUrl: "/public/Clothes/Bntlon.png", category: "Clothes" },
  { title_en: "Dress",   title_ar: "فستان",  title_fr: "Robe",        title_es: "Vestido",     expression_en: "This is a dress",   expression_ar: "هذا فستان",  expression_fr: "C'est une robe",         expression_es: "Este es un vestido",   imgUrl: "/public/Clothes/Dress.png",  category: "Clothes" },
  { title_en: "Jacket",  title_ar: "جاكيت",  title_fr: "Veste",       title_es: "Chaqueta",    expression_en: "This is a jacket",  expression_ar: "هذا جاكيت",  expression_fr: "C'est une veste",        expression_es: "Esta es una chaqueta", imgUrl: "/public/Clothes/Jacket.png", category: "Clothes" },
  { title_en: "Pajamas", title_ar: "بيجامة", title_fr: "Pyjama",      title_es: "Pijama",      expression_en: "These are pajamas", expression_ar: "هذه بيجامة", expression_fr: "C'est un pyjama",        expression_es: "Este es un pijama",    imgUrl: "/public/Clothes/Pijama.png", category: "Clothes" },
  { title_en: "Shoes",   title_ar: "أحذية",  title_fr: "Chaussures",  title_es: "Zapatos",     expression_en: "These are shoes",   expression_ar: "هذه أحذية",  expression_fr: "Ce sont des chaussures", expression_es: "Estos son zapatos",    imgUrl: "/public/Clothes/Shoes.png",  category: "Clothes" },
  { title_en: "Socks",   title_ar: "جوارب",  title_fr: "Chaussettes", title_es: "Calcetines",  expression_en: "These are socks",   expression_ar: "هذه جوارب",  expression_fr: "Ce sont des chaussettes", expression_es: "Estos son calcetines", imgUrl: "/public/Clothes/Shrab.png",  category: "Clothes" },
  { title_en: "Skirt",   title_ar: "تنورة",  title_fr: "Jupe",        title_es: "Falda",       expression_en: "This is a skirt",   expression_ar: "هذه تنورة",  expression_fr: "C'est une jupe",         expression_es: "Esta es una falda",    imgUrl: "/public/Clothes/Skirt.png",  category: "Clothes" }
];*/
export const leisureSubIcons = [
  {
    title_en: "Sports",
    title_ar: "رياضة",
    title_fr: "Sport",
    title_es: "Deporte",
    expression_en: "I want to do sports",
    expression_ar: "أريد ممارسة الرياضة",
    expression_fr: "Je veux faire du sport",
    expression_es: "Quiero hacer deporte",
    imgUrl: "/public/leisure/sport.png",
    category: "Leisure"
  },
  {
    title_en: "Games",
    title_ar: "ألعاب",
    title_fr: "Jeux",
    title_es: "Juegos",
    expression_en: "I want to play games",
    expression_ar: "أريد اللعب",
    expression_fr: "Je veux jouer",
    expression_es: "Quiero jugar",
    imgUrl: "/public/leisure/games.png",
    category: "Leisure"
  },
  {
    title_en: "Video Games",
    title_ar: "ألعاب فيديو",
    title_fr: "Jeux vidéo",
    title_es: "Videojuegos",
    expression_en: "I want video games",
    expression_ar: "أريد ألعاب فيديو",
    expression_fr: "Je veux des jeux vidéo",
    expression_es: "Quiero videojuegos",
    imgUrl: "/public/leisure/videogame.png",
    category: "Leisure"
  },
  {
    title_en: "Outdoor Activities",
    title_ar: "أنشطة خارجية",
    title_fr: "Activités extérieures",
    title_es: "Actividades al aire libre",
    expression_en: "I want outdoor activities",
    expression_ar: "أريد أنشطة خارجية",
    expression_fr: "Je veux des activités extérieures",
    expression_es: "Quiero actividades al aire libre",
    imgUrl: "/public/leisure/outdoor.png",
    category: "Leisure"
  },
  {
    title_en: "Beach",
    title_ar: "شاطئ",
    title_fr: "Plage",
    title_es: "Playa",
    expression_en: "I want to go to the beach",
    expression_ar: "أريد الذهاب إلى الشاطئ",
    expression_fr: "Je veux aller à la plage",
    expression_es: "Quiero ir a la playa",
    imgUrl: "/public/leisure/beach.png",
    category: "Leisure"
  },
  {
    title_en: "Hobby",
    title_ar: "هواية",
    title_fr: "Passe-temps",
    title_es: "Afición",
    expression_en: "I want to do my hobby",
    expression_ar: "أريد ممارسة هوايتي",
    expression_fr: "Je veux faire mon passe-temps",
    expression_es: "Quiero hacer mi afición",
    imgUrl: "/public/leisure/hobby.png",
    category: "Leisure"
  },
  {
    title_en: "Entertainment",
    title_ar: "ترفيه",
    title_fr: "Divertissement",
    title_es: "Entretenimiento",
    expression_en: "I want entertainment",
    expression_ar: "أريد الترفيه",
    expression_fr: "Je veux du divertissement",
    expression_es: "Quiero entretenimiento",
    imgUrl: "/public/leisure/entertainment.png",
    category: "Leisure"
  },
  {
    title_en: "Show",
    title_ar: "عرض",
    title_fr: "Spectacle",
    title_es: "Espectáculo",
    expression_en: "I want to watch a show",
    expression_ar: "أريد مشاهدة عرض",
    expression_fr: "Je veux voir un spectacle",
    expression_es: "Quiero ver un espectáculo",
    imgUrl: "/public/leisure/show.png",
    category: "Leisure"
  }
];

export const bathroomSubIcons = [
  {
    title_en: "Shower", title_ar: "استحمام", title_fr: "Douche", title_es: "Ducha",
    expression_en: "I want to take a shower", expression_ar: "أريد الاستحمام", expression_fr: "Je veux prendre une douche", expression_es: "Quiero ducharme",
    imgUrl: "/public/icons/Shower.png",
    category: "Bathroom"
  },
  {
    title_en: "Toilet", title_ar: "المرحاض", title_fr: "Toilettes", title_es: "Inodoro",
    expression_en: "I need to use the toilet", expression_ar: "أريد استخدام المرحاض", expression_fr: "Je dois utiliser les toilettes", expression_es: "Necesito usar el baño",
    imgUrl: "/public/icons/Toilet.png",
    category: "Bathroom"
  },
  {
    title_en: "Brush Teeth", title_ar: "تنظيف الأسنان", title_fr: "Se brosser les dents", title_es: "Cepillarse los dientes",
    expression_en: "I want to brush my teeth", expression_ar: "أريد تنظيف أسناني", expression_fr: "Je veux me brosser les dents", expression_es: "Quiero cepillarme los dientes",
    imgUrl: "/public/icons/BrushTeeth.png",
    category: "Bathroom"
  },
  {
    title_en: "Wash Hands", title_ar: "غسل اليدين", title_fr: "Se laver les mains", title_es: "Lavarse las manos",
    expression_en: "I want to wash my hands", expression_ar: "أريد غسل يدي", expression_fr: "Je veux me laver les mains", expression_es: "Quiero lavarme las manos",
    imgUrl: "/public/icons/WashHands.png",
    category: "Bathroom"
  },
  {
    title_en: "Wash Face", title_ar: "غسل الوجه", title_fr: "Se laver le visage", title_es: "Lavarse la cara",
    expression_en: "I want to wash my face", expression_ar: "أريد غسل وجهي", expression_fr: "Je veux me laver le visage", expression_es: "Quiero lavarme la cara",
    imgUrl: "/public/icons/WashFace.png",
    category: "Bathroom"
  },
  {
    title_en: "Shave", title_ar: "حلاقة", title_fr: "Se raser", title_es: "Afeitarse",
    expression_en: "I want to shave", expression_ar: "أريد الحلاقة", expression_fr: "Je veux me raser", expression_es: "Quiero afeitarme",
    imgUrl: "/public/icons/Shave.png",
    category: "Bathroom"
  },
  {
    title_en: "Comb Hair", title_ar: "تمشيط الشعر", title_fr: "Se coiffer", title_es: "Peinarse",
    expression_en: "I want to comb my hair", expression_ar: "أريد تمشيط شعري", expression_fr: "Je veux me coiffer", expression_es: "Quiero peinarme",
    imgUrl: "/public/icons/CombHair.png",
    category: "Bathroom"
  },
  {
    title_en: "Use Towel", title_ar: "استخدام المنشفة", title_fr: "Utiliser une serviette", title_es: "Usar toalla",
    expression_en: "I need a towel", expression_ar: "أحتاج منشفة", expression_fr: "J'ai besoin d'une serviette", expression_es: "Necesito una toalla",
    imgUrl: "/public/icons/Towel.png",
    category: "Bathroom"
  }
];
export const getDressedSubIcons = [
  { title_en: "Shirt",   title_ar: "قميص",   title_fr: "Chemise",     title_es: "Camisa",     expression_en: "I want a shirt",   expression_ar: "أريد قميصاً",   expression_fr: "Je veux une chemise",      expression_es: "Quiero una camisa",   imgUrl: "/public/Clothes/2amis.png",  category: "Get Dressed" },
  { title_en: "Suit",    title_ar: "بدلة",   title_fr: "Costume",     title_es: "Traje",      expression_en: "I want a suit",    expression_ar: "أريد بدلة",     expression_fr: "Je veux un costume",       expression_es: "Quiero un traje",     imgUrl: "/public/Clothes/Badla.png",  category: "Get Dressed" },
  { title_en: "Blouse",  title_ar: "بلوزة",  title_fr: "Blouse",      title_es: "Blusa",      expression_en: "I want a blouse",  expression_ar: "أريد بلوزة",    expression_fr: "Je veux une blouse",       expression_es: "Quiero una blusa",    imgUrl: "/public/Clothes/blouse.png", category: "Get Dressed" },
  { title_en: "Pants",   title_ar: "بنطلون", title_fr: "Pantalon",    title_es: "Pantalón",   expression_en: "I want pants",     expression_ar: "أريد بنطلوناً", expression_fr: "Je veux un pantalon",      expression_es: "Quiero pantalones",   imgUrl: "/public/Clothes/Bntlon.png", category: "Get Dressed" },
  { title_en: "Dress",   title_ar: "فستان",  title_fr: "Robe",        title_es: "Vestido",    expression_en: "I want a dress",   expression_ar: "أريد فستاناً",  expression_fr: "Je veux une robe",         expression_es: "Quiero un vestido",   imgUrl: "/public/Clothes/Dress.png",  category: "Get Dressed" },
  { title_en: "Jacket",  title_ar: "جاكيت",  title_fr: "Veste",       title_es: "Chaqueta",   expression_en: "I want a jacket",  expression_ar: "أريد جاكيت",    expression_fr: "Je veux une veste",        expression_es: "Quiero una chaqueta", imgUrl: "/public/Clothes/Jacket.png", category: "Get Dressed" },
  { title_en: "Pajamas", title_ar: "بيجامة", title_fr: "Pyjama",      title_es: "Pijama",     expression_en: "I want pajamas",   expression_ar: "أريد بيجامة",   expression_fr: "Je veux un pyjama",        expression_es: "Quiero un pijama",    imgUrl: "/public/Clothes/Pijama.png", category: "Get Dressed" },
  { title_en: "Shoes",   title_ar: "أحذية",  title_fr: "Chaussures",  title_es: "Zapatos",    expression_en: "I want shoes",     expression_ar: "أريد أحذية",    expression_fr: "Je veux des chaussures",   expression_es: "Quiero zapatos",      imgUrl: "/public/Clothes/Shoes.png",  category: "Get Dressed" },
  { title_en: "Socks",   title_ar: "جوارب",  title_fr: "Chaussettes", title_es: "Calcetines", expression_en: "I want socks",     expression_ar: "أريد جوارب",    expression_fr: "Je veux des chaussettes", expression_es: "Quiero calcetines",    imgUrl: "/public/Clothes/Shrab.png",  category: "Get Dressed" },
  { title_en: "Skirt",   title_ar: "تنورة",  title_fr: "Jupe",        title_es: "Falda",      expression_en: "I want a skirt",   expression_ar: "أريد تنورة",    expression_fr: "Je veux une jupe",         expression_es: "Quiero una falda",    imgUrl: "/public/Clothes/Skirt.png",  category: "Get Dressed" }
];

export const familySubIcons = [
  { title_en: "Mother",      title_ar: "أم",           title_fr: "Mère",       title_es: "Madre",   expression_en: "This is my mother",      expression_ar: "هذه أمي",          expression_fr: "C'est ma mère",        expression_es: "Esta es mi madre",     imgUrl: "/public/Family/Mother.png",  category: "Family" },
  { title_en: "Father",      title_ar: "أب",           title_fr: "Père",       title_es: "Padre",   expression_en: "This is my father",      expression_ar: "هذا أبي",          expression_fr: "C'est mon père",       expression_es: "Este es mi padre",     imgUrl: "/public/Family/father.png",  category: "Family" },
  { title_en: "Brother",     title_ar: "أخ",           title_fr: "Frère",      title_es: "Hermano", expression_en: "This is my brother",     expression_ar: "هذا أخي",          expression_fr: "C'est mon frère",      expression_es: "Este es mi hermano",   imgUrl: "/public/Family/brother.png",  category: "Family" },
  { title_en: "Sister",      title_ar: "أخت",          title_fr: "Sœur",       title_es: "Hermana", expression_en: "This is my sister",      expression_ar: "هذه أختي",         expression_fr: "C'est ma sœur",        expression_es: "Esta es mi hermana",   imgUrl: "/public/Family/sister.png",  category: "Family" },
  { title_en: "Grandfather", title_ar: "جد",           title_fr: "Grand-père", title_es: "Abuelo",  expression_en: "This is my grandfather", expression_ar: "هذا جدي",          expression_fr: "C'est mon grand-père", expression_es: "Este es mi abuelo",    imgUrl: "/public/Family/grandfather.png",  category: "Family" },
  { title_en: "Grandmother", title_ar: "جدة",          title_fr: "Grand-mère", title_es: "Abuela",  expression_en: "This is my grandmother", expression_ar: "هذه جدتي",         expression_fr: "C'est ma grand-mère",  expression_es: "Esta es mi abuela",    imgUrl: "/public/Family/grandmother.png", category: "Family" },
  { title_en: "Uncle",       title_ar: "عم",           title_fr: "Oncle",      title_es: "Tío",     expression_en: "This is my uncle",       expression_ar: "هذا عمي",          expression_fr: "C'est mon oncle",      expression_es: "Este es mi tío",       imgUrl: "/public/Family/uncle.png",  category: "Family" },
  { title_en: "Aunt",        title_ar: "عمة",          title_fr: "Tante",      title_es: "Tía",     expression_en: "This is my aunt",        expression_ar: "هذه عمتي",         expression_fr: "C'est ma tante",       expression_es: "Esta es mi tía",       imgUrl: "/public/Family/aunt.png",  category: "Family" },
  { title_en: "Cousin",      title_ar: "ابن/بنت العم", title_fr: "Cousin(e)",  title_es: "Primo/a", expression_en: "This is my cousin",      expression_ar: "هذا ابن عمي",      expression_fr: "C'est mon cousin",     expression_es: "Este es mi primo",     imgUrl: "/public/Family/cousin.png",  category: "Family" },
  { title_en: "Baby",        title_ar: "طفل",          title_fr: "Bébé",       title_es: "Bebé",    expression_en: "This is a baby",         expression_ar: "هذا طفل",          expression_fr: "C'est un bébé",        expression_es: "Este es un bebé",      imgUrl: "/public/Family/baby.png",  category: "Family" },
  { title_en: "Uncle (M)",   title_ar: "خالي",         title_fr: "Mon oncle",  title_es: "Mi tío",  expression_en: "This is my uncle",       expression_ar: "هذا خالي",         expression_fr: "C'est mon oncle",      expression_es: "Este es mi tío",       imgUrl: "/public/Family/unclee.png",  category: "Family" },
  { title_en: "Aunt (M)",    title_ar: "خالتي",        title_fr: "Ma tante",   title_es: "Mi tía",  expression_en: "This is my aunt",        expression_ar: "هذه خالتي",        expression_fr: "C'est ma tante",       expression_es: "Esta es mi tía",       imgUrl: "/public/Family/aunte.png",  category: "Family" }];

export const feelingsSubIcons = [
  { title_en: "Happy",      title_ar: "سعيد",   title_fr: "Heureux",   title_es: "Feliz",       expression_en: "I am happy",      expression_ar: "أنا سعيد",    expression_fr: "Je suis heureux",   expression_es: "Estoy feliz",       imgUrl: "/public/Feelings/1.png",  category: "Feelings" },
  { title_en: "Amazed",     title_ar: "منبهر",  title_fr: "Étonné",    title_es: "Asombrado",   expression_en: "I am amazed",     expression_ar: "أنا منبهر",   expression_fr: "Je suis étonné",    expression_es: "Estoy asombrado",   imgUrl: "/public/Feelings/2.png",  category: "Feelings" },
  { title_en: "Angry",      title_ar: "غاضب",   title_fr: "Fâché",     title_es: "Enojado",     expression_en: "I am angry",      expression_ar: "أنا غاضب",    expression_fr: "Je suis fâché",     expression_es: "Estoy enojado",     imgUrl: "/public/Feelings/3.png",  category: "Feelings" },
  { title_en: "Afraid",     title_ar: "خائف",   title_fr: "Effrayé",   title_es: "Asustado",    expression_en: "I am afraid",     expression_ar: "أنا خائف",    expression_fr: "J'ai peur",         expression_es: "Tengo miedo",       imgUrl: "/public/Feelings/4.png",  category: "Feelings" },
  { title_en: "Tired",      title_ar: "متعب",   title_fr: "Fatigué",   title_es: "Cansado",     expression_en: "I am tired",      expression_ar: "أنا متعب",    expression_fr: "Je suis fatigué",   expression_es: "Estoy cansado",     imgUrl: "/public/Feelings/5.png",  category: "Feelings" },
  { title_en: "Excited",    title_ar: "متحمس",  title_fr: "Excité",    title_es: "Emocionado",  expression_en: "I am excited",    expression_ar: "أنا متحمس",   expression_fr: "Je suis excité",    expression_es: "Estoy emocionado",  imgUrl: "/public/Feelings/6.png",  category: "Feelings" },
  { title_en: "Surprised",  title_ar: "مندهش",  title_fr: "Surpris",   title_es: "Sorprendido", expression_en: "I am surprised",  expression_ar: "أنا مندهش",   expression_fr: "Je suis surpris",   expression_es: "Estoy sorprendido", imgUrl: "/public/Feelings/7.png",  category: "Feelings" },
  { title_en: "Relaxed",    title_ar: "مرتاح",  title_fr: "Détendu",   title_es: "Relajado",    expression_en: "I am relaxed",    expression_ar: "أنا مرتاح",   expression_fr: "Je suis détendu",   expression_es: "Estoy relajado",    imgUrl: "/public/Feelings/8.png",  category: "Feelings" },
  { title_en: "Anxious",    title_ar: "مضطرب",  title_fr: "Anxieux",   title_es: "Ansioso",     expression_en: "I am anxious",    expression_ar: "أنا مضطرب",   expression_fr: "Je suis anxieux",   expression_es: "Estoy ansioso",     imgUrl: "/public/Feelings/9.png",  category: "Feelings" },
  { title_en: "Confused",   title_ar: "مستغرب", title_fr: "Confus",    title_es: "Confundido",  expression_en: "I am confused",   expression_ar: "أنا مستغرب",  expression_fr: "Je suis confus",    expression_es: "Estoy confundido",  imgUrl: "/public/Feelings/10.png", category: "Feelings" },
  { title_en: "Frustrated", title_ar: "محبط",   title_fr: "Frustré",   title_es: "Frustrado",   expression_en: "I am frustrated", expression_ar: "أنا محبط",    expression_fr: "Je suis frustré",   expression_es: "Estoy frustrado",   imgUrl: "/public/Feelings/11.png", category: "Feelings" },
  { title_en: "Proud",      title_ar: "فخور",   title_fr: "Fier",      title_es: "Orgulloso",   expression_en: "I am proud",      expression_ar: "أنا فخور",    expression_fr: "Je suis fier",      expression_es: "Estoy orgulloso",   imgUrl: "/public/Feelings/12.png", category: "Feelings" },
  { title_en: "Optimistic", title_ar: "متفائل", title_fr: "Optimiste", title_es: "Optimista",   expression_en: "I am optimistic", expression_ar: "أنا متفائل",  expression_fr: "Je suis optimiste", expression_es: "Soy optimista",     imgUrl: "/public/Feelings/13.png", category: "Feelings" }
];

export const foodAndDrinkSubIcons = [
  { title_en: "Apple",      title_ar: "تفاح",     title_fr: "Pomme",         title_es: "Manzana",   expression_en: "This is an apple",      expression_ar: "هذا تفاح",     expression_fr: "C'est une pomme",         expression_es: "Esta es una manzana",   imgUrl: "/public/Food and Drink/apple.png",       category: "Food and Drink" },
  { title_en: "Biscuit",    title_ar: "بسكوت",    title_fr: "Biscuit",       title_es: "Galleta",   expression_en: "This is a biscuit",     expression_ar: "هذا بسكوت",    expression_fr: "C'est un biscuit",        expression_es: "Esta es una galleta",   imgUrl: "/public/Food and Drink/baskot.png",      category: "Food and Drink" },
  { title_en: "Watermelon", title_ar: "بطيخ",     title_fr: "Pastèque",      title_es: "Sandía",    expression_en: "This is a watermelon",  expression_ar: "هذا بطيخ",     expression_fr: "C'est une pastèque",      expression_es: "Esta es una sandía",    imgUrl: "/public/Food and Drink/batek.png",       category: "Food and Drink" },
  { title_en: "Potato",     title_ar: "بطاطس",    title_fr: "Pomme de terre", title_es: "Patata",   expression_en: "This is a potato",      expression_ar: "هذه بطاطس",    expression_fr: "C'est une pomme de terre", expression_es: "Esta es una patata",  imgUrl: "/public/Food and Drink/btats.png",       category: "Food and Drink" },
  { title_en: "Chocolate",  title_ar: "شوكولاتة", title_fr: "Chocolat",      title_es: "Chocolate", expression_en: "This is chocolate",     expression_ar: "هذه شوكولاتة", expression_fr: "C'est du chocolat",       expression_es: "Este es chocolate",     imgUrl: "/public/Food and Drink/chocolate.png",   category: "Food and Drink" },
  { title_en: "Egg",        title_ar: "بيض",      title_fr: "Œuf",           title_es: "Huevo",     expression_en: "This is an egg",        expression_ar: "هذا بيض",      expression_fr: "C'est un œuf",            expression_es: "Este es un huevo",      imgUrl: "/public/Food and Drink/egg.png",         category: "Food and Drink" },
  { title_en: "Grapes",     title_ar: "عنب",      title_fr: "Raisin",        title_es: "Uvas",      expression_en: "This is grapes",        expression_ar: "هذا عنب",      expression_fr: "Ce sont des raisins",     expression_es: "Estas son uvas",        imgUrl: "/public/Food and Drink/enab.png",        category: "Food and Drink" },
  { title_en: "Bread",      title_ar: "عيش",      title_fr: "Pain",          title_es: "Pan",       expression_en: "This is bread",         expression_ar: "هذا عيش",      expression_fr: "C'est du pain",           expression_es: "Este es pan",           imgUrl: "/public/Food and Drink/esh.png",         category: "Food and Drink" },
  { title_en: "Fish",       title_ar: "سمك",      title_fr: "Poisson",       title_es: "Pescado",   expression_en: "This is fish",          expression_ar: "هذا سمك",      expression_fr: "C'est du poisson",        expression_es: "Este es pescado",       imgUrl: "/public/Food and Drink/fish.png",        category: "Food and Drink" },
  { title_en: "Chicken",    title_ar: "فراخ",     title_fr: "Poulet",        title_es: "Pollo",     expression_en: "This is chicken",       expression_ar: "هذه فراخ",     expression_fr: "C'est du poulet",         expression_es: "Este es pollo",         imgUrl: "/public/Food and Drink/frahk.png",       category: "Food and Drink" },
  { title_en: "Strawberry", title_ar: "فراولة",   title_fr: "Fraise",        title_es: "Fresa",     expression_en: "This is a strawberry",  expression_ar: "هذه فراولة",   expression_fr: "C'est une fraise",        expression_es: "Esta es una fresa",     imgUrl: "/public/Food and Drink/frawla.png",      category: "Food and Drink" },
  { title_en: "Popcorn",    title_ar: "فشار",     title_fr: "Pop-corn",      title_es: "Palomitas", expression_en: "This is popcorn",       expression_ar: "هذا فشار",     expression_fr: "C'est du pop-corn",       expression_es: "Estas son palomitas",   imgUrl: "/public/Food and Drink/fshaar.png",      category: "Food and Drink" },
  { title_en: "Carrot",     title_ar: "جزر",      title_fr: "Carotte",       title_es: "Zanahoria", expression_en: "This is a carrot",      expression_ar: "هذا جزر",      expression_fr: "C'est une carotte",       expression_es: "Esta es una zanahoria", imgUrl: "/public/Food and Drink/gazr.png",        category: "Food and Drink" },
  { title_en: "Cheese",     title_ar: "جبنة",     title_fr: "Fromage",       title_es: "Queso",     expression_en: "This is cheese",        expression_ar: "هذه جبنة",     expression_fr: "C'est du fromage",        expression_es: "Este es queso",         imgUrl: "/public/Food and Drink/gebna.png",       category: "Food and Drink" },
  { title_en: "Guava",      title_ar: "جوافة",    title_fr: "Goyave",        title_es: "Guayaba",   expression_en: "This is a guava",       expression_ar: "هذه جوافة",    expression_fr: "C'est une goyave",        expression_es: "Esta es una guayaba",   imgUrl: "/public/Food and Drink/gwafa.png",       category: "Food and Drink" },
  { title_en: "Ice Cream",  title_ar: "آيس كريم", title_fr: "Glace",         title_es: "Helado",    expression_en: "This is ice cream",     expression_ar: "هذا آيس كريم", expression_fr: "C'est de la glace",       expression_es: "Este es helado",        imgUrl: "/public/Food and Drink/icecream.png",    category: "Food and Drink" },
  { title_en: "Milk",       title_ar: "لبن",      title_fr: "Lait",          title_es: "Leche",     expression_en: "This is milk",          expression_ar: "هذا لبن",      expression_fr: "C'est du lait",           expression_es: "Esta es leche",         imgUrl: "/public/Food and Drink/labn.png",        category: "Food and Drink" },
  { title_en: "Mango",      title_ar: "مانجو",    title_fr: "Mangue",        title_es: "Mango",     expression_en: "This is a mango",       expression_ar: "هذه مانجو",    expression_fr: "C'est une mangue",        expression_es: "Este es un mango",      imgUrl: "/public/Food and Drink/mango.png",       category: "Food and Drink" },
  { title_en: "Jam",        title_ar: "مربى",     title_fr: "Confiture",     title_es: "Mermelada", expression_en: "This is jam",           expression_ar: "هذه مربى",     expression_fr: "C'est de la confiture",   expression_es: "Esta es mermelada",     imgUrl: "/public/Food and Drink/marba.png",       category: "Food and Drink" },
  { title_en: "Meat",       title_ar: "لحم",      title_fr: "Viande",        title_es: "Carne",     expression_en: "This is meat",          expression_ar: "هذا لحم",      expression_fr: "C'est de la viande",      expression_es: "Esta es carne",         imgUrl: "/public/Food and Drink/meat.png",        category: "Food and Drink" },
  { title_en: "Pear",       title_ar: "كمثرى",    title_fr: "Poire",         title_es: "Pera",      expression_en: "This is a pear",        expression_ar: "هذه كمثرى",    expression_fr: "C'est une poire",         expression_es: "Esta es una pera",      imgUrl: "/public/Food and Drink/komtra.png",      category: "Food and Drink" },
  { title_en: "Cucumber",   title_ar: "خيار",     title_fr: "Concombre",     title_es: "Pepino",    expression_en: "This is a cucumber",    expression_ar: "هذا خيار",     expression_fr: "C'est un concombre",      expression_es: "Este es un pepino",     imgUrl: "/public/Food and Drink/kyar.png",        category: "Food and Drink" },
  { title_en: "Orange",     title_ar: "برتقال",   title_fr: "Orange",        title_es: "Naranja",   expression_en: "This is an orange",     expression_ar: "هذا برتقال",   expression_fr: "C'est une orange",        expression_es: "Esta es una naranja",   imgUrl: "/public/Food and Drink/orange.png",      category: "Food and Drink" },
  { title_en: "Pizza",      title_ar: "بيتزا",    title_fr: "Pizza",         title_es: "Pizza",     expression_en: "This is pizza",         expression_ar: "هذه بيتزا",    expression_fr: "C'est une pizza",         expression_es: "Esta es pizza",         imgUrl: "/public/Food and Drink/pizza.png",       category: "Food and Drink" },
  { title_en: "Rice",       title_ar: "أرز",      title_fr: "Riz",           title_es: "Arroz",     expression_en: "This is rice",          expression_ar: "هذا أرز",      expression_fr: "C'est du riz",            expression_es: "Este es arroz",         imgUrl: "/public/Food and Drink/roz.png",         category: "Food and Drink" },
  { title_en: "Sandwich",   title_ar: "ساندوتش",  title_fr: "Sandwich",      title_es: "Sándwich",  expression_en: "This is a sandwich",    expression_ar: "هذا ساندوتش",  expression_fr: "C'est un sandwich",       expression_es: "Este es un sándwich",   imgUrl: "/public/Food and Drink/sandwich.png",    category: "Food and Drink" },
  { title_en: "Soup",       title_ar: "شوربة",    title_fr: "Soupe",         title_es: "Sopa",      expression_en: "This is soup",          expression_ar: "هذه شوربة",    expression_fr: "C'est de la soupe",       expression_es: "Esta es sopa",          imgUrl: "/public/Food and Drink/shorba.png",      category: "Food and Drink" },
  { title_en: "Tomato",     title_ar: "طماطم",    title_fr: "Tomate",        title_es: "Tomate",    expression_en: "This is a tomato",      expression_ar: "هذه طماطم",    expression_fr: "C'est une tomate",        expression_es: "Este es un tomate",     imgUrl: "/public/Food and Drink/tomato.png",      category: "Food and Drink" },
  { title_en: "Vegetables", title_ar: "خضار",     title_fr: "Légumes",       title_es: "Verduras",  expression_en: "These are vegetables",  expression_ar: "هذه خضار",     expression_fr: "Ce sont des légumes",     expression_es: "Estas son verduras",    imgUrl: "/public/Food and Drink/vegetablesz.png", category: "Food and Drink" },
  { title_en: "Water",      title_ar: "ماء",      title_fr: "Eau",           title_es: "Agua",      expression_en: "This is water",         expression_ar: "هذا ماء",      expression_fr: "C'est de l'eau",          expression_es: "Esta es agua",          imgUrl: "/public/Food and Drink/water.png",       category: "Food and Drink" },
  { title_en: "Yogurt",     title_ar: "زبادي",    title_fr: "Yaourt",        title_es: "Yogur",     expression_en: "This is yogurt",        expression_ar: "هذا زبادي",    expression_fr: "C'est du yaourt",         expression_es: "Este es yogur",         imgUrl: "/public/Food and Drink/zbady.png",       category: "Food and Drink" }
];

export const drinkingSubIcons = [
  { title_en: "Water",            title_ar: "ماء",          title_fr: "Eau",                    title_es: "Agua",              expression_en: "I want water",             expression_ar: "أريد ماء",           expression_fr: "Je veux de l'eau",              expression_es: "Quiero agua",           imgUrl: "/public/Food and Drink/water.png",       category: "Drinking" },
  { title_en: "Mango Juice",      title_ar: "عصير مانجو",   title_fr: "Jus de mangue",          title_es: "Jugo de mango",     expression_en: "I want mango juice",       expression_ar: "أريد عصير مانجو",    expression_fr: "Je veux du jus de mangue",       expression_es: "Quiero jugo de mango",  imgUrl: "/public/Food and Drink/mango.png",       category: "Drinking" },
  { title_en: "Apple Juice",      title_ar: "عصير تفاح",    title_fr: "Jus de pomme",           title_es: "Jugo de manzana",   expression_en: "I want apple juice",       expression_ar: "أريد عصير تفاح",     expression_fr: "Je veux du jus de pomme",        expression_es: "Quiero jugo de manzana", imgUrl: "/public/Food and Drink/apple.png",      category: "Drinking" },
  { title_en: "Guava Juice",      title_ar: "عصير جوافة",   title_fr: "Jus de goyave",          title_es: "Jugo de guayaba",   expression_en: "I want guava juice",       expression_ar: "أريد عصير جوافة",    expression_fr: "Je veux du jus de goyave",       expression_es: "Quiero jugo de guayaba", imgUrl: "/public/Food and Drink/gwafa.png",      category: "Drinking" },
  { title_en: "Strawberry Juice", title_ar: "عصير فراولة",  title_fr: "Jus de fraise",          title_es: "Jugo de fresa",     expression_en: "I want strawberry juice",  expression_ar: "أريد عصير فراولة",   expression_fr: "Je veux du jus de fraise",       expression_es: "Quiero jugo de fresa",  imgUrl: "/public/Food and Drink/frawla.png",      category: "Drinking" },
  { title_en: "Chocolate Juice",  title_ar: "عصير شوكولاتة", title_fr: "Boisson chocolatée",   title_es: "Bebida de chocolate", expression_en: "I want chocolate drink", expression_ar: "أريد عصير شوكولاتة", expression_fr: "Je veux une boisson chocolatée",  expression_es: "Quiero bebida de chocolate", imgUrl: "/public/Food and Drink/chocolate.png", category: "Drinking" },
  { title_en: "Juice",            title_ar: "عصير",         title_fr: "Jus",                    title_es: "Jugo",              expression_en: "I want juice",             expression_ar: "أريد عصير",          expression_fr: "Je veux du jus",                 expression_es: "Quiero jugo",           imgUrl: "/public/Food and Drink/aser.png",        category: "Drinking" },
  { title_en: "Milk",             title_ar: "لبن",          title_fr: "Lait",                   title_es: "Leche",             expression_en: "I want milk",              expression_ar: "أريد لبن",           expression_fr: "Je veux du lait",                expression_es: "Quiero leche",          imgUrl: "/public/Food and Drink/labn.png",        category: "Drinking" },
  { title_en: "Fayrouz",          title_ar: "فيروز",        title_fr: "Fayrouz",                title_es: "Fayrouz",           expression_en: "I want Fayrouz",           expression_ar: "أريد فيروز",         expression_fr: "Je veux du Fayrouz",             expression_es: "Quiero Fayrouz",        imgUrl: "/public/Food and Drink/fayrouz.jpg",     category: "Drinking" },
  { title_en: "Schweppes",        title_ar: "شويبس",        title_fr: "Schweppes",              title_es: "Schweppes",         expression_en: "I want Schweppes",         expression_ar: "أريد شويبس",         expression_fr: "Je veux du Schweppes",           expression_es: "Quiero Schweppes",      imgUrl: "/public/Food and Drink/schweppes.jpg",   category: "Drinking" },
  { title_en: "Pomegranate Juice", title_ar: "عصير رمان",   title_fr: "Jus de grenade",         title_es: "Jugo de granada",   expression_en: "I want pomegranate juice", expression_ar: "أريد عصير رمان",    expression_fr: "Je veux du jus de grenade",      expression_es: "Quiero jugo de granada", imgUrl: "/public/Food and Drink/roman.jpg",      category: "Drinking" },
  { title_en: "Mint Juice",       title_ar: "عصير نعناع",   title_fr: "Jus de menthe",          title_es: "Jugo de menta",     expression_en: "I want mint juice",        expression_ar: "أريد عصير نعناع",    expression_fr: "Je veux du jus de menthe",       expression_es: "Quiero jugo de menta",  imgUrl: "/public/Food and Drink/mint.jpg",        category: "Drinking" },
  { title_en: "Sobia",            title_ar: "سوبيا",        title_fr: "Sobia",                  title_es: "Sobia",             expression_en: "I want Sobia",             expression_ar: "أريد سوبيا",         expression_fr: "Je veux de la Sobia",            expression_es: "Quiero Sobia",          imgUrl: "/public/Food and Drink/sobia.png",       category: "Drinking" },
  { title_en: "Tea",              title_ar: "شاي",          title_fr: "Thé",                    title_es: "Té",                expression_en: "I want tea",               expression_ar: "أريد شاي",           expression_fr: "Je veux du thé",                 expression_es: "Quiero té",             imgUrl: "/public/Food and Drink/tea.png",         category: "Drinking" },
  { title_en: "Coffee",           title_ar: "قهوة",         title_fr: "Café",                   title_es: "Café",              expression_en: "I want coffee",            expression_ar: "أريد قهوة",          expression_fr: "Je veux du café",                expression_es: "Quiero café",           imgUrl: "/public/Food and Drink/coffe.png",       category: "Drinking" },
  { title_en: "Nescafe",          title_ar: "نسكافيه",      title_fr: "Nescafé",                title_es: "Nescafé",           expression_en: "I want Nescafe",           expression_ar: "أريد نسكافيه",       expression_fr: "Je veux du Nescafé",             expression_es: "Quiero Nescafé",        imgUrl: "/public/Food and Drink/nescafe.png",     category: "Drinking" },
  { title_en: "Orange Juice",     title_ar: "عصير برتقال",  title_fr: "Jus d'orange",           title_es: "Jugo de naranja",   expression_en: "I want orange juice",      expression_ar: "أريد عصير برتقال",   expression_fr: "Je veux du jus d'orange",        expression_es: "Quiero jugo de naranja", imgUrl: "/public/Food and Drink/orange.png",     category: "Drinking" },
  { title_en: "Lemon Juice",      title_ar: "عصير ليمون",   title_fr: "Jus de citron",          title_es: "Jugo de limón",     expression_en: "I want lemon juice",       expression_ar: "أريد عصير ليمون",    expression_fr: "Je veux du jus de citron",       expression_es: "Quiero jugo de limón",  imgUrl: "/public/Food and Drink/lemon.png",       category: "Drinking" },
  { title_en: "Pepsi",            title_ar: "بيبسي",        title_fr: "Pepsi",                  title_es: "Pepsi",             expression_en: "I want Pepsi",             expression_ar: "أريد بيبسي",         expression_fr: "Je veux du Pepsi",               expression_es: "Quiero Pepsi",          imgUrl: "/public/Food and Drink/pepsi.png",       category: "Drinking" },
  { title_en: "Coca Cola",        title_ar: "كوكاكولا",     title_fr: "Coca-Cola",              title_es: "Coca-Cola",         expression_en: "I want Coca Cola",         expression_ar: "أريد كوكاكولا",      expression_fr: "Je veux du Coca-Cola",           expression_es: "Quiero Coca-Cola",      imgUrl: "/public/Food and Drink/cocacola.png",    category: "Drinking" },
  { title_en: "7up",              title_ar: "سبعة أب",      title_fr: "7up",                    title_es: "7up",               expression_en: "I want 7up",               expression_ar: "أريد سبعة أب",       expression_fr: "Je veux du 7up",                 expression_es: "Quiero 7up",            imgUrl: "/public/Food and Drink/7up.png",         category: "Drinking" },
  { title_en: "Energy Drink",     title_ar: "مشروب طاقة",   title_fr: "Boisson énergisante",    title_es: "Bebida energética", expression_en: "I want an energy drink",   expression_ar: "أريد مشروب طاقة",    expression_fr: "Je veux une boisson énergisante", expression_es: "Quiero una bebida energética", imgUrl: "/public/Food and Drink/energy-drink.png", category: "Drinking" }
];

export const sleepingSubIcons = [
  { title_en: "6 Hours",       title_ar: "٦ ساعات",         title_fr: "6 heures",              title_es: "6 horas",          expression_en: "I want to sleep 6 hours",       expression_ar: "أريد النوم ٦ ساعات",      expression_fr: "Je veux dormir 6 heures",            expression_es: "Quiero dormir 6 horas",        imgUrl: "/public/sleeping/6.png",         category: "Sleeping" },
  { title_en: "7 Hours",       title_ar: "٧ ساعات",         title_fr: "7 heures",              title_es: "7 horas",          expression_en: "I want to sleep 7 hours",       expression_ar: "أريد النوم ٧ ساعات",      expression_fr: "Je veux dormir 7 heures",            expression_es: "Quiero dormir 7 horas",        imgUrl: "/public/sleeping/7.png",         category: "Sleeping" },
  { title_en: "8 Hours",       title_ar: "٨ ساعات",         title_fr: "8 heures",              title_es: "8 horas",          expression_en: "I want to sleep 8 hours",       expression_ar: "أريد النوم ٨ ساعات",      expression_fr: "Je veux dormir 8 heures",            expression_es: "Quiero dormir 8 horas",        imgUrl: "/public/Sleeping/8.png",         category: "Sleeping" },
  { title_en: "Nap Only",      title_ar: "قيلولة فقط",      title_fr: "Sieste seulement",      title_es: "Solo siesta",      expression_en: "I want a nap only",             expression_ar: "أريد قيلولة فقط",        expression_fr: "Je veux faire une sieste",           expression_es: "Solo quiero una siesta",       imgUrl: "/public/sleeping/siesta.png",    category: "Sleeping" },
  { title_en: "Take me to Bed", title_ar: "خذني إلى السرير", title_fr: "Emmène-moi au lit",    title_es: "Llévame a la cama", expression_en: "Take me to bed",               expression_ar: "خذني إلى السرير",        expression_fr: "Emmène-moi au lit",                  expression_es: "Llévame a la cama",            imgUrl: "/public/sleeping/bed.png",       category: "Sleeping" },
  { title_en: "Pillow",        title_ar: "وسادة",           title_fr: "Oreiller",              title_es: "Almohada",         expression_en: "I need a pillow",               expression_ar: "أحتاج وسادة",            expression_fr: "J'ai besoin d'un oreiller",          expression_es: "Necesito una almohada",        imgUrl: "/public/sleeping/pillow.png",    category: "Sleeping" },
  { title_en: "Blanket",       title_ar: "بطانية",          title_fr: "Couverture",            title_es: "Manta",            expression_en: "Cover me with a blanket",       expression_ar: "غطيني بالبطانية",        expression_fr: "Couvre-moi avec une couverture",     expression_es: "Cúbreme con una manta",        imgUrl: "/public/sleeping/blanket.png",   category: "Sleeping" },
  { title_en: "Night Lamp",    title_ar: "مصباح الليل",     title_fr: "Lampe de nuit",         title_es: "Lámpara de noche", expression_en: "Turn off the night lamp",        expression_ar: "أطفئ مصباح الليل",       expression_fr: "Éteindre la lampe de nuit",          expression_es: "Apaga la lámpara de noche",    imgUrl: "/public/sleeping/night-lamp.png", category: "Sleeping" },
  { title_en: "Relax",         title_ar: "استرخاء",         title_fr: "Se détendre",           title_es: "Relajarse",        expression_en: "I want to relax",               expression_ar: "أريد الاسترخاء",         expression_fr: "Je veux me détendre",                expression_es: "Quiero relajarme",             imgUrl: "/public/sleeping/relax.png",     category: "Sleeping" },
  { title_en: "Tired",         title_ar: "متعب",            title_fr: "Fatigué",               title_es: "Cansado",          expression_en: "I feel tired",                  expression_ar: "أشعر بالتعب",            expression_fr: "Je me sens fatigué",                 expression_es: "Me siento cansado",            imgUrl: "/public/sleeping/tired.png",     category: "Sleeping" },
  { title_en: "Wake Up Early", title_ar: "استيقاظ مبكر",   title_fr: "Se réveiller tôt",      title_es: "Despertar temprano", expression_en: "I want to wake up early",     expression_ar: "أريد الاستيقاظ مبكراً",  expression_fr: "Je veux me réveiller tôt",           expression_es: "Quiero despertarme temprano",  imgUrl: "/public/sleeping/wake-up.png",   category: "Sleeping" }
];

export const transportSubIcons = [
  { title_en: "Bicycle",    title_ar: "عجلة",        title_fr: "Vélo",        title_es: "Bicicleta",   expression_en: "I want to use a bicycle",    expression_ar: "أريد استخدام عجلة",      expression_fr: "Je veux utiliser un vélo",      expression_es: "Quiero usar una bicicleta",  imgUrl: "/public/Transport/1.png",  category: "Transport" },
  { title_en: "Taxi",       title_ar: "تاكسي",       title_fr: "Taxi",        title_es: "Taxi",        expression_en: "I want a taxi",              expression_ar: "أريد تاكسي",             expression_fr: "Je veux un taxi",               expression_es: "Quiero un taxi",             imgUrl: "/public/Transport/2.png",  category: "Transport" },
  { title_en: "Motorcycle", title_ar: "دراجة نارية", title_fr: "Moto",        title_es: "Motocicleta", expression_en: "I want to ride a motorcycle", expression_ar: "أريد ركوب دراجة نارية",  expression_fr: "Je veux rouler en moto",        expression_es: "Quiero montar una moto",     imgUrl: "/public/Transport/3.png",  category: "Transport" },
  { title_en: "Airplane",   title_ar: "طائرة",       title_fr: "Avion",       title_es: "Avión",       expression_en: "I want to travel by airplane", expression_ar: "أريد السفر بالطائرة",   expression_fr: "Je veux voyager en avion",      expression_es: "Quiero viajar en avión",     imgUrl: "/public/Transport/4.png",  category: "Transport" },
  { title_en: "Bus",        title_ar: "باص",         title_fr: "Bus",         title_es: "Autobús",     expression_en: "I want to ride the bus",     expression_ar: "أريد ركوب الباص",        expression_fr: "Je veux prendre le bus",        expression_es: "Quiero tomar el autobús",    imgUrl: "/public/Transport/5.png",  category: "Transport" },
  { title_en: "Car",        title_ar: "سيارة",       title_fr: "Voiture",     title_es: "Coche",       expression_en: "I want to ride in a car",    expression_ar: "أريد ركوب السيارة",      expression_fr: "Je veux monter en voiture",     expression_es: "Quiero ir en coche",         imgUrl: "/public/Transport/6.png",  category: "Transport" },
  { title_en: "Tram",       title_ar: "ترام",        title_fr: "Tramway",     title_es: "Tranvía",     expression_en: "I want to ride the tram",    expression_ar: "أريد ركوب الترام",       expression_fr: "Je veux prendre le tramway",    expression_es: "Quiero tomar el tranvía",    imgUrl: "/public/Transport/7.png",  category: "Transport" },
  { title_en: "Elevator",   title_ar: "أسانسير",     title_fr: "Ascenseur",   title_es: "Ascensor",    expression_en: "I want to use the elevator", expression_ar: "أريد استخدام الأسانسير", expression_fr: "Je veux utiliser l'ascenseur",  expression_es: "Quiero usar el ascensor",    imgUrl: "/public/Transport/8.png",  category: "Transport" },
  { title_en: "Ship",       title_ar: "سفينة",       title_fr: "Navire",      title_es: "Barco",       expression_en: "I want to ride a ship",      expression_ar: "أريد ركوب السفينة",      expression_fr: "Je veux prendre un navire",     expression_es: "Quiero tomar un barco",      imgUrl: "/public/Transport/9.png",  category: "Transport" },
  { title_en: "Train",      title_ar: "قطار",        title_fr: "Train",       title_es: "Tren",        expression_en: "I want to ride the train",   expression_ar: "أريد ركوب القطار",       expression_fr: "Je veux prendre le train",      expression_es: "Quiero tomar el tren",       imgUrl: "/public/Transport/10.png", category: "Transport" }
];

export const medicineSubIcons = [
  { title_en: "Profen",      title_ar: "بروفين",      title_fr: "Profén",      title_es: "Profen",      expression_en: "I need Profen",      expression_ar: "أحتاج بروفين",      expression_fr: "J'ai besoin de Profén",      expression_es: "Necesito Profen",      imgUrl: "/public/medicine/Profen.png",      category: "Medicine" },
  { title_en: "Panadol",     title_ar: "بانادول",     title_fr: "Panadol",     title_es: "Panadol",     expression_en: "I need Panadol",     expression_ar: "أحتاج بانادول",     expression_fr: "J'ai besoin de Panadol",     expression_es: "Necesito Panadol",     imgUrl: "/public/medicine/Panadol.png",     category: "Medicine" },
  { title_en: "Augmentin",   title_ar: "أوجمنتين",    title_fr: "Augmentin",   title_es: "Augmentin",   expression_en: "I need Augmentin",   expression_ar: "أحتاج أوجمنتين",    expression_fr: "J'ai besoin d'Augmentin",   expression_es: "Necesito Augmentin",   imgUrl: "/public/medicine/Augmentin.png",   category: "Medicine" },
  { title_en: "Phenadone",   title_ar: "فينادون",     title_fr: "Phénadone",   title_es: "Fenadona",    expression_en: "I need Phenadone",   expression_ar: "أحتاج فينادون",     expression_fr: "J'ai besoin de Phénadone",  expression_es: "Necesito Fenadona",    imgUrl: "/public/medicine/Phenadone.png",   category: "Medicine" },
  { title_en: "Vitamin C",   title_ar: "فيتامين سي",  title_fr: "Vitamine C",  title_es: "Vitamina C",  expression_en: "I need Vitamin C",   expression_ar: "أحتاج فيتامين سي",  expression_fr: "J'ai besoin de Vitamine C", expression_es: "Necesito Vitamina C",  imgUrl: "/public/medicine/VitaminC.png",    category: "Medicine" },
  { title_en: "Vitamin D",   title_ar: "فيتامين د",   title_fr: "Vitamine D",  title_es: "Vitamina D",  expression_en: "I need Vitamin D",   expression_ar: "أحتاج فيتامين د",   expression_fr: "J'ai besoin de Vitamine D", expression_es: "Necesito Vitamina D",  imgUrl: "/public/medicine/VitaminD.png",    category: "Medicine" },
  { title_en: "Aspirin",     title_ar: "أسبرين",      title_fr: "Aspirine",    title_es: "Aspirina",    expression_en: "I need Aspirin",     expression_ar: "أحتاج أسبرين",      expression_fr: "J'ai besoin d'Aspirine",    expression_es: "Necesito Aspirina",    imgUrl: "/public/medicine/Aspirin.png",     category: "Medicine" },
  { title_en: "Ibuprofen",   title_ar: "إيبوبروفين",  title_fr: "Ibuprofène",  title_es: "Ibuprofeno",  expression_en: "I need Ibuprofen",   expression_ar: "أحتاج إيبوبروفين",  expression_fr: "J'ai besoin d'Ibuprofène", expression_es: "Necesito Ibuprofeno",  imgUrl: "/public/medicine/Ibuprofen.png",   category: "Medicine" },
  { title_en: "Zyrtec",      title_ar: "زيرتك",       title_fr: "Zyrtec",      title_es: "Zyrtec",      expression_en: "I need Zyrtec",      expression_ar: "أحتاج زيرتك",       expression_fr: "J'ai besoin de Zyrtec",     expression_es: "Necesito Zyrtec",      imgUrl: "/public/medicine/Zyrtec.png",      category: "Medicine" },
  { title_en: "Clarinase",   title_ar: "كلاريناس",    title_fr: "Clarinase",   title_es: "Clarinase",   expression_en: "I need Clarinase",   expression_ar: "أحتاج كلاريناس",    expression_fr: "J'ai besoin de Clarinase",  expression_es: "Necesito Clarinase",   imgUrl: "/public/medicine/Clarinase.png",   category: "Medicine" },
  { title_en: "Paracetamol", title_ar: "باراسيتامول", title_fr: "Paracétamol", title_es: "Paracetamol", expression_en: "I need Paracetamol", expression_ar: "أحتاج باراسيتامول", expression_fr: "J'ai besoin de Paracétamol", expression_es: "Necesito Paracetamol", imgUrl: "/public/medicine/Paracetamol.png", category: "Medicine" },
  { title_en: "Flagyl",      title_ar: "فلاجيل",      title_fr: "Flagyl",      title_es: "Flagyl",      expression_en: "I need Flagyl",      expression_ar: "أحتاج فلاجيل",      expression_fr: "J'ai besoin de Flagyl",     expression_es: "Necesito Flagyl",      imgUrl: "/public/medicine/Flagyl.png",      category: "Medicine" },
  { title_en: "Cetirizine",  title_ar: "سيتيريزين",   title_fr: "Cétirizine",  title_es: "Cetirizina",  expression_en: "I need Cetirizine",  expression_ar: "أحتاج سيتيريزين",   expression_fr: "J'ai besoin de Cétirizine", expression_es: "Necesito Cetirizina",  imgUrl: "/public/medicine/Cetirizine.png",  category: "Medicine" },
  { title_en: "Bisolvon",    title_ar: "بيسولفون",    title_fr: "Bisolvon",    title_es: "Bisolvon",    expression_en: "I need Bisolvon",    expression_ar: "أحتاج بيسولفون",    expression_fr: "J'ai besoin de Bisolvon",   expression_es: "Necesito Bisolvon",    imgUrl: "/public/medicine/Bisolvon.png",    category: "Medicine" },
  { title_en: "Ventolin",    title_ar: "فينتولين",    title_fr: "Ventoline",   title_es: "Ventolin",    expression_en: "I need Ventolin",    expression_ar: "أحتاج فينتولين",    expression_fr: "J'ai besoin de Ventoline",  expression_es: "Necesito Ventolin",    imgUrl: "/public/medicine/Ventolin.png",    category: "Medicine" },
  { title_en: "Cataflam",    title_ar: "كاتافلام",    title_fr: "Cataflam",    title_es: "Cataflam",    expression_en: "I need Cataflam",    expression_ar: "أحتاج كاتافلام",    expression_fr: "J'ai besoin de Cataflam",   expression_es: "Necesito Cataflam",    imgUrl: "/public/medicine/Cataflam.png",    category: "Medicine" },
  { title_en: "Brufen",      title_ar: "بروفين",      title_fr: "Brufen",      title_es: "Brufen",      expression_en: "I need Brufen",      expression_ar: "أحتاج بروفين",      expression_fr: "J'ai besoin de Brufen",     expression_es: "Necesito Brufen",      imgUrl: "/public/medicine/Brufen.png",      category: "Medicine" },
  { title_en: "Omeprazole",  title_ar: "أوميبرازول",  title_fr: "Oméprazole",  title_es: "Omeprazol",   expression_en: "I need Omeprazole",  expression_ar: "أحتاج أوميبرازول",  expression_fr: "J'ai besoin d'Oméprazole",  expression_es: "Necesito Omeprazol",   imgUrl: "/public/medicine/Omeprazole.png",  category: "Medicine" },
  { title_en: "Antinal",     title_ar: "أنتينال",     title_fr: "Antinal",     title_es: "Antinal",     expression_en: "I need Antinal",     expression_ar: "أحتاج أنتينال",     expression_fr: "J'ai besoin d'Antinal",     expression_es: "Necesito Antinal",     imgUrl: "/public/medicine/Antinal.png",     category: "Medicine" },
  { title_en: "Strepsils",   title_ar: "ستربسيلز",    title_fr: "Strepsils",   title_es: "Strepsils",   expression_en: "I need Strepsils",   expression_ar: "أحتاج ستربسيلز",    expression_fr: "J'ai besoin de Strepsils",  expression_es: "Necesito Strepsils",   imgUrl: "/public/medicine/Strepsils.png",   category: "Medicine" }
];

export const doctorSubIcons = [
  { title_en: "Headache",    title_ar: "صداع",           title_fr: "Mal de tête",      title_es: "Dolor de cabeza",   expression_en: "I have a headache",    expression_ar: "أعاني من صداع",          expression_fr: "J'ai mal à la tête",     expression_es: "Tengo dolor de cabeza",   imgUrl: "/public/Health/headache.png",    category: "Doctor" },
  { title_en: "Fever",       title_ar: "حمى",            title_fr: "Fièvre",           title_es: "Fiebre",            expression_en: "I have a fever",       expression_ar: "لدي حمى",               expression_fr: "J'ai de la fièvre",      expression_es: "Tengo fiebre",            imgUrl: "/public/Health/fever.png",       category: "Doctor" },
  { title_en: "Cough",       title_ar: "سعال",           title_fr: "Toux",             title_es: "Tos",               expression_en: "I have a cough",       expression_ar: "لدي سعال",              expression_fr: "J'ai une toux",          expression_es: "Tengo tos",               imgUrl: "/public/Health/cough.png",       category: "Doctor" },
  { title_en: "Cold",        title_ar: "نزلة برد",       title_fr: "Rhume",            title_es: "Resfriado",         expression_en: "I have a cold",        expression_ar: "أعاني من نزلة برد",      expression_fr: "J'ai un rhume",          expression_es: "Tengo un resfriado",      imgUrl: "/public/Health/cold.png",        category: "Doctor" },
  { title_en: "Sore Throat", title_ar: "التهاب حلق",     title_fr: "Mal de gorge",     title_es: "Dolor de garganta", expression_en: "I have a sore throat", expression_ar: "أعاني من التهاب الحلق",  expression_fr: "J'ai mal à la gorge",    expression_es: "Tengo dolor de garganta", imgUrl: "/public/Health/sore-throat.png", category: "Doctor" },
  { title_en: "Stomachache", title_ar: "ألم في المعدة",  title_fr: "Mal de ventre",    title_es: "Dolor de estómago", expression_en: "I have a stomachache", expression_ar: "أعاني من ألم في المعدة", expression_fr: "J'ai mal au ventre",     expression_es: "Tengo dolor de estómago", imgUrl: "/public/Health/stomachache.png", category: "Doctor" },
  { title_en: "Toothache",   title_ar: "ألم في الأسنان", title_fr: "Mal de dents",     title_es: "Dolor de muelas",   expression_en: "I have a toothache",   expression_ar: "أعاني من ألم في الأسنان", expression_fr: "J'ai mal aux dents",    expression_es: "Tengo dolor de muelas",   imgUrl: "/public/Health/toothache.png",   category: "Doctor" },
  { title_en: "Earache",     title_ar: "ألم في الأذن",   title_fr: "Mal d'oreille",    title_es: "Dolor de oído",     expression_en: "I have an earache",    expression_ar: "أعاني من ألم في الأذن",  expression_fr: "J'ai mal à l'oreille",  expression_es: "Tengo dolor de oído",     imgUrl: "/public/Health/earache.png",     category: "Doctor" },
  { title_en: "Back Pain",   title_ar: "ألم في الظهر",   title_fr: "Mal de dos",       title_es: "Dolor de espalda",  expression_en: "I have back pain",     expression_ar: "أعاني من ألم في الظهر",  expression_fr: "J'ai mal au dos",        expression_es: "Tengo dolor de espalda", imgUrl: "/public/Health/back-pain.png",   category: "Doctor" },
  { title_en: "Dizzy",       title_ar: "دوار",           title_fr: "Vertiges",         title_es: "Mareos",            expression_en: "I feel dizzy",         expression_ar: "أشعر بالدوار",          expression_fr: "J'ai des vertiges",      expression_es: "Tengo mareos",            imgUrl: "/public/Health/dizzy.png",       category: "Doctor" },
  { title_en: "Tired",       title_ar: "تعب",            title_fr: "Fatigué",          title_es: "Cansado",           expression_en: "I feel tired",         expression_ar: "أشعر بالتعب",           expression_fr: "Je me sens fatigué",     expression_es: "Me siento cansado",       imgUrl: "/public/Health/tired.png",       category: "Doctor" },
  { title_en: "Allergies",   title_ar: "حساسية",         title_fr: "Allergies",        title_es: "Alergia",           expression_en: "I have allergies",     expression_ar: "لدي حساسية",            expression_fr: "J'ai des allergies",     expression_es: "Tengo alergia",           imgUrl: "/public/Health/allergies.png",   category: "Doctor" },
  { title_en: "Diarrhea",    title_ar: "إسهال",          title_fr: "Diarrhée",         title_es: "Diarrea",           expression_en: "I have diarrhea",      expression_ar: "أعاني من إسهال",         expression_fr: "J'ai la diarrhée",       expression_es: "Tengo diarrea",           imgUrl: "/public/Health/diarrhea.png",    category: "Doctor" },
  { title_en: "Nausea",      title_ar: "غثيان",          title_fr: "Nausée",           title_es: "Náuseas",           expression_en: "I have nausea",        expression_ar: "أشعر بالغثيان",         expression_fr: "J'ai des nausées",       expression_es: "Tengo náuseas",           imgUrl: "/public/Health/nausea.png",      category: "Doctor" },
  { title_en: "Rash",        title_ar: "طفح جلدي",       title_fr: "Éruption cutanée", title_es: "Erupción cutánea",  expression_en: "I have a rash",        expression_ar: "لدي طفح جلدي",          expression_fr: "J'ai une éruption",      expression_es: "Tengo una erupción",      imgUrl: "/public/Health/rash.png",        category: "Doctor" }
];

export const afraidSubIcons = [
  { title_en: "Insect", title_ar: "حشرة", title_fr: "Insecte", title_es: "Insecto", expression_en: "I am afraid of insects", expression_ar: "أنا خائف من حشرة", expression_fr: "J'ai peur des insectes", expression_es: "Tengo miedo de los insectos", imgUrl: "/public/Animals/7shraat.png", category: "Afraid" },
  { title_en: "Bird",   title_ar: "طائر", title_fr: "Oiseau",  title_es: "Pájaro",  expression_en: "I am afraid of birds",   expression_ar: "أنا خائف من طائر",   expression_fr: "J'ai peur des oiseaux",  expression_es: "Tengo miedo de los pájaros",  imgUrl: "/public/Animals/Bird.png",      category: "Afraid" },
  { title_en: "Cat",    title_ar: "قطة",  title_fr: "Chat",    title_es: "Gato",    expression_en: "I am afraid of cats",    expression_ar: "أنا خائف من قطة",    expression_fr: "J'ai peur des chats",    expression_es: "Tengo miedo de los gatos",    imgUrl: "/public/Animals/Cat.png",       category: "Afraid" },
  { title_en: "Dog",    title_ar: "كلب",  title_fr: "Chien",   title_es: "Perro",   expression_en: "I am afraid of dogs",    expression_ar: "أنا خائف من كلب",    expression_fr: "J'ai peur des chiens",   expression_es: "Tengo miedo de los perros",   imgUrl: "/public/Animals/Dog.png",       category: "Afraid" },
  { title_en: "Fish",   title_ar: "سمك",  title_fr: "Poisson", title_es: "Pescado", expression_en: "I am afraid of fish",    expression_ar: "أنا خائف من سمك",    expression_fr: "J'ai peur du poisson",   expression_es: "Tengo miedo del pescado",     imgUrl: "/public/Animals/Fish.png",      category: "Afraid" }
];

export const callSubIcons = [
  { title_en: "Mobile",         title_ar: "موبايل",       title_fr: "Mobile",           title_es: "Móvil",                  expression_en: "I want to use a mobile",          expression_ar: "أريد استخدام الموبايل",   expression_fr: "Je veux utiliser un mobile",       expression_es: "Quiero usar un móvil",              imgUrl: "/public/call/moble.png",        category: "Call" },
  { title_en: "Headset",        title_ar: "سماعة رأس",    title_fr: "Casque",           title_es: "Auricular",              expression_en: "I want a headset",                expression_ar: "أريد سماعة رأس",          expression_fr: "Je veux un casque",                expression_es: "Quiero un auricular",               imgUrl: "/public/call/Headset.png",      category: "Call" },
  { title_en: "Dial Pad",       title_ar: "لوحة الاتصال", title_fr: "Clavier",          title_es: "Teclado",                expression_en: "I want the dial pad",             expression_ar: "أريد لوحة الاتصال",       expression_fr: "Je veux le clavier",               expression_es: "Quiero el teclado",                 imgUrl: "/public/call/DialPad.png",      category: "Call" },
  { title_en: "Video Call",     title_ar: "مكالمة فيديو", title_fr: "Appel vidéo",      title_es: "Videollamada",           expression_en: "I want a video call",             expression_ar: "أريد مكالمة فيديو",       expression_fr: "Je veux un appel vidéo",           expression_es: "Quiero una videollamada",           imgUrl: "/public/call/Videocall.png",    category: "Call" },
  { title_en: "Landline",       title_ar: "هاتف أرضي",    title_fr: "Téléphone fixe",   title_es: "Teléfono fijo",          expression_en: "I want a landline phone",         expression_ar: "أريد هاتفاً أرضياً",      expression_fr: "Je veux un téléphone fixe",        expression_es: "Quiero un teléfono fijo",           imgUrl: "/public/call/Landline.png",     category: "Call" },
  { title_en: "Messenger",      title_ar: "رسائل",        title_fr: "Messagerie",       title_es: "Mensajero",              expression_en: "I want to send messages",         expression_ar: "أريد إرسال رسائل",        expression_fr: "Je veux envoyer des messages",     expression_es: "Quiero enviar mensajes",            imgUrl: "/public/call/Messenger.png",    category: "Call" },
  { title_en: "Conference",     title_ar: "مؤتمر",        title_fr: "Conférence",       title_es: "Conferencia",            expression_en: "I want a conference call",        expression_ar: "أريد مؤتمر",              expression_fr: "Je veux une conférence",           expression_es: "Quiero una conferencia",            imgUrl: "/public/call/Conference.png",   category: "Call" },
  { title_en: "Call Center",    title_ar: "مركز اتصال",   title_fr: "Centre d'appel",   title_es: "Centro de llamadas",     expression_en: "I want the call center",          expression_ar: "أريد مركز اتصال",         expression_fr: "Je veux le centre d'appel",        expression_es: "Quiero el call center",             imgUrl: "/public/call/CallCenter.png",   category: "Call" },
  { title_en: "Emergency Call", title_ar: "مكالمة طوارئ", title_fr: "Appel d'urgence",  title_es: "Llamada de emergencia",  expression_en: "I want to make an emergency call", expression_ar: "أريد مكالمة طوارئ",      expression_fr: "Je veux un appel d'urgence",       expression_es: "Quiero hacer una llamada de emergencia", imgUrl: "/public/call/EmergencyCall.png", category: "Call" }
];

export const talkSubIcons = [
  { title_en: "Discussion",   title_ar: "مناقشة",       title_fr: "Discussion",    title_es: "Discusión",    expression_en: "I want a discussion",    expression_ar: "أريد مناقشة",       expression_fr: "Je veux une discussion",    expression_es: "Quiero una discusión",    imgUrl: "/public/talk/Discussion.png",    category: "Talk" },
  { title_en: "Group Chat",   title_ar: "دردشة جماعية", title_fr: "Chat de groupe", title_es: "Chat grupal",  expression_en: "I want a group chat",    expression_ar: "أريد دردشة جماعية", expression_fr: "Je veux un chat de groupe", expression_es: "Quiero un chat grupal",   imgUrl: "/public/talk/GroupChat.png",      category: "Talk" },
  { title_en: "Message",      title_ar: "رسالة",        title_fr: "Message",       title_es: "Mensaje",      expression_en: "I want to send a message", expression_ar: "أريد إرسال رسالة",  expression_fr: "Je veux envoyer un message", expression_es: "Quiero enviar un mensaje", imgUrl: "/public/talk/MessageBubble.png", category: "Talk" },
  { title_en: "Speech",       title_ar: "كلام",         title_fr: "Parole",        title_es: "Habla",        expression_en: "I want to speak",        expression_ar: "أريد التحدث",       expression_fr: "Je veux parler",           expression_es: "Quiero hablar",           imgUrl: "/public/talk/SpeechBubble.png",  category: "Talk" },
  { title_en: "Microphone",   title_ar: "ميكروفون",     title_fr: "Microphone",    title_es: "Micrófono",    expression_en: "I want a microphone",    expression_ar: "أريد ميكروفون",     expression_fr: "Je veux un microphone",    expression_es: "Quiero un micrófono",     imgUrl: "/public/talk/Microphone.png",    category: "Talk" },
  { title_en: "Conversation", title_ar: "محادثة",       title_fr: "Conversation",  title_es: "Conversación", expression_en: "I want a conversation",  expression_ar: "أريد محادثة",       expression_fr: "Je veux une conversation", expression_es: "Quiero una conversación", imgUrl: "/public/talk/Conversation.png",  category: "Talk" },
  { title_en: "Voice Chat",   title_ar: "دردشة صوتية",  title_fr: "Chat vocal",    title_es: "Chat de voz",  expression_en: "I want a voice chat",    expression_ar: "أريد دردشة صوتية",  expression_fr: "Je veux un chat vocal",    expression_es: "Quiero un chat de voz",   imgUrl: "/public/talk/VoiceChat.png",     category: "Talk" },
  { title_en: "Broadcast",    title_ar: "إرسال مباشر",  title_fr: "Diffusion",     title_es: "Transmisión",  expression_en: "I want to broadcast",    expression_ar: "أريد إرسالاً مباشراً", expression_fr: "Je veux diffuser",        expression_es: "Quiero transmitir",       imgUrl: "/public/talk/Broadcast.png",     category: "Talk" },
  { title_en: "Announcement", title_ar: "إعلان",        title_fr: "Annonce",       title_es: "Anuncio",      expression_en: "I want to announce",     expression_ar: "أريد إعلاناً",      expression_fr: "Je veux annoncer",         expression_es: "Quiero anunciar",         imgUrl: "/public/talk/Announcement.png",  category: "Talk" },
  { title_en: "Dialog",       title_ar: "حوار",         title_fr: "Dialogue",      title_es: "Diálogo",      expression_en: "I want a dialog",        expression_ar: "أريد حواراً",       expression_fr: "Je veux un dialogue",      expression_es: "Quiero un diálogo",       imgUrl: "/public/talk/Dialog.png",        category: "Talk" }
];

export const listenSubIcons = [
  { title_en: "Earphones",    title_ar: "سماعات أذن",   title_fr: "Écouteurs",    title_es: "Auriculares",  expression_en: "I want earphones",              expression_ar: "أريد سماعات أذن",       expression_fr: "Je veux des écouteurs",          expression_es: "Quiero auriculares",       imgUrl: "/public/listen/Earphones.png",     category: "Listen" },
  { title_en: "Music",        title_ar: "موسيقى",       title_fr: "Musique",      title_es: "Música",       expression_en: "I want to listen to music",     expression_ar: "أريد الاستماع للموسيقى",  expression_fr: "Je veux écouter de la musique", expression_es: "Quiero escuchar música",    imgUrl: "/public/listen/Music.png",         category: "Listen" },
  { title_en: "Podcast",      title_ar: "بودكاست",      title_fr: "Podcast",      title_es: "Podcast",      expression_en: "I want to listen to a podcast", expression_ar: "أريد الاستماع لبودكاست",  expression_fr: "Je veux écouter un podcast",    expression_es: "Quiero escuchar un podcast", imgUrl: "/public/listen/Podcast.png",      category: "Listen" },
  { title_en: "Lecture",      title_ar: "محاضرة",       title_fr: "Conférence",   title_es: "Conferencia",  expression_en: "I want to listen to a lecture", expression_ar: "أريد الاستماع لمحاضرة",   expression_fr: "Je veux écouter une conférence", expression_es: "Quiero escuchar una conferencia", imgUrl: "/public/listen/Lecture.png", category: "Listen" },
  { title_en: "Audiobook",    title_ar: "كتاب صوتي",    title_fr: "Livre audio",  title_es: "Audiolibro",   expression_en: "I want an audiobook",           expression_ar: "أريد الاستماع لكتاب صوتي", expression_fr: "Je veux un livre audio",       expression_es: "Quiero un audiolibro",     imgUrl: "/public/listen/Audiobook.png",     category: "Listen" },
  { title_en: "Radio",        title_ar: "راديو",        title_fr: "Radio",        title_es: "Radio",        expression_en: "I want to listen to radio",     expression_ar: "أريد الاستماع للراديو",   expression_fr: "Je veux écouter la radio",      expression_es: "Quiero escuchar la radio", imgUrl: "/public/listen/Radio.png",         category: "Listen" },
  { title_en: "Voice Note",   title_ar: "ملاحظة صوتية", title_fr: "Note vocale",  title_es: "Nota de voz",  expression_en: "I want a voice note",           expression_ar: "أريد ملاحظة صوتية",      expression_fr: "Je veux une note vocale",       expression_es: "Quiero una nota de voz",   imgUrl: "/public/listen/VoiceNote.png",     category: "Listen" },
  { title_en: "Announcement", title_ar: "إعلان",        title_fr: "Annonce",      title_es: "Anuncio",      expression_en: "I want to hear an announcement", expression_ar: "أريد الاستماع لإعلان",   expression_fr: "Je veux entendre une annonce",  expression_es: "Quiero escuchar un anuncio", imgUrl: "/public/listen/Announcementt.png", category: "Listen" },
  { title_en: "Alert",        title_ar: "تنبيه",        title_fr: "Alerte",       title_es: "Alerta",       expression_en: "I want an alert",               expression_ar: "أريد تنبيهاً",           expression_fr: "Je veux une alerte",            expression_es: "Quiero una alerta",        imgUrl: "/public/listen/Alert.png",         category: "Listen" },
  { title_en: "Conversation", title_ar: "محادثة",       title_fr: "Conversation", title_es: "Conversación", expression_en: "I want to listen to a conversation", expression_ar: "أريد الاستماع لمحادثة", expression_fr: "Je veux écouter une conversation", expression_es: "Quiero escuchar una conversación", imgUrl: "/public/listen/Conversationn.png", category: "Listen" }
];

export const homeSubIcons = [
  { title_en: "Bedroom",     title_ar: "غرفة النوم",   title_fr: "Chambre",    title_es: "Dormitorio",    expression_en: "I want to go to the bedroom",    expression_ar: "أريد الذهاب لغرفة النوم",   expression_fr: "Je veux aller dans la chambre",  expression_es: "Quiero ir al dormitorio",    imgUrl: "/public/Places/bedroom.png",    category: "Home" },
  { title_en: "Kitchen",     title_ar: "المطبخ",       title_fr: "Cuisine",    title_es: "Cocina",        expression_en: "I want to go to the kitchen",    expression_ar: "أريد الذهاب للمطبخ",        expression_fr: "Je veux aller dans la cuisine",  expression_es: "Quiero ir a la cocina",      imgUrl: "/public/Places/kitchen.png",    category: "Home" },
  { title_en: "Living Room", title_ar: "غرفة المعيشة", title_fr: "Salon",      title_es: "Sala de estar", expression_en: "I want to go to the living room", expression_ar: "أريد الذهاب لغرفة المعيشة", expression_fr: "Je veux aller au salon",          expression_es: "Quiero ir a la sala",        imgUrl: "/public/Places/livingroom.png", category: "Home" },
  { title_en: "Toilet",      title_ar: "الحمام",       title_fr: "Toilettes",  title_es: "Baño",          expression_en: "I want to go to the toilet",     expression_ar: "أريد الذهاب للحمام",        expression_fr: "Je veux aller aux toilettes",    expression_es: "Quiero ir al baño",          imgUrl: "/public/Places/toilet.png",     category: "Home" }
];

export const placesSubIcons = [
  { title_en: "By Motorcycle", title_ar: "دراجة نارية", title_fr: "En moto",        title_es: "En moto",         expression_en: "I want to go by motorcycle", expression_ar: "أريد الذهاب بدراجة نارية", expression_fr: "Je veux aller en moto",        expression_es: "Quiero ir en moto",         imgUrl: "/public/Places/3.png",           category: "places" },
  { title_en: "By Airplane",   title_ar: "طائرة",       title_fr: "En avion",       title_es: "En avión",        expression_en: "I want to go by airplane",   expression_ar: "أريد الذهاب بطائرة",       expression_fr: "Je veux aller en avion",       expression_es: "Quiero ir en avión",        imgUrl: "/public/Places/4.png",           category: "places" },
  { title_en: "By Bus",        title_ar: "حافلة",       title_fr: "En bus",         title_es: "En autobús",      expression_en: "I want to go by bus",        expression_ar: "أريد الذهاب بحافلة",       expression_fr: "Je veux aller en bus",         expression_es: "Quiero ir en autobús",      imgUrl: "/public/Places/5.png",           category: "places" },
  { title_en: "By Car",        title_ar: "سيارة",       title_fr: "En voiture",     title_es: "En coche",        expression_en: "I want to go by car",        expression_ar: "أريد الذهاب بسيارة",       expression_fr: "Je veux aller en voiture",     expression_es: "Quiero ir en coche",        imgUrl: "/public/Places/6.png",           category: "places" },
  { title_en: "By Tram",       title_ar: "ترام",        title_fr: "En tramway",     title_es: "En tranvía",      expression_en: "I want to go by tram",       expression_ar: "أريد الذهاب بترام",        expression_fr: "Je veux aller en tramway",     expression_es: "Quiero ir en tranvía",      imgUrl: "/public/Places/7.png",           category: "places" },
  { title_en: "By Elevator",   title_ar: "أسانسير",     title_fr: "En ascenseur",   title_es: "En ascensor",     expression_en: "I want to use the elevator", expression_ar: "أريد استخدام الأسانسير",   expression_fr: "Je veux utiliser l'ascenseur", expression_es: "Quiero usar el ascensor",    imgUrl: "/public/Places/8.png",           category: "places" },
  { title_en: "By Ship",       title_ar: "سفينة",       title_fr: "En navire",      title_es: "En barco",        expression_en: "I want to go by ship",       expression_ar: "أريد الذهاب بسفينة",       expression_fr: "Je veux aller en navire",      expression_es: "Quiero ir en barco",        imgUrl: "/public/Places/9.png",           category: "places" },
  { title_en: "By Train",      title_ar: "قطار",        title_fr: "En train",       title_es: "En tren",         expression_en: "I want to go by train",      expression_ar: "أريد الذهاب بقطار",        expression_fr: "Je veux aller en train",       expression_es: "Quiero ir en tren",         imgUrl: "/public/Places/10.png",          category: "places" },
  { title_en: "Bus Station",   title_ar: "محطة أتوبيس", title_fr: "Gare routière",  title_es: "Estación de autobús", expression_en: "I want to go to the bus station", expression_ar: "أريد الذهاب إلى محطة أتوبيس", expression_fr: "Je veux aller à la gare routière", expression_es: "Quiero ir a la estación de autobús", imgUrl: "/public/Places/busstation.png", category: "places" },
  { title_en: "Hospital",      title_ar: "المستشفى",    title_fr: "Hôpital",        title_es: "Hospital",        expression_en: "I want to go to the hospital", expression_ar: "أريد الذهاب إلى المستشفى", expression_fr: "Je veux aller à l'hôpital",  expression_es: "Quiero ir al hospital",     imgUrl: "/public/Places/hospital.png",    category: "places" },
  { title_en: "Home",          title_ar: "المنزل",      title_fr: "Maison",         title_es: "Casa",            expression_en: "I want to go home",          expression_ar: "أريد الذهاب إلى المنزل",   expression_fr: "Je veux rentrer à la maison", expression_es: "Quiero ir a casa",          imgUrl: "/public/Places/home.png",        category: "places" },
  { title_en: "Park",          title_ar: "الحديقة",     title_fr: "Parc",           title_es: "Parque",          expression_en: "I want to go to the park",   expression_ar: "أريد الذهاب إلى الحديقة",  expression_fr: "Je veux aller au parc",        expression_es: "Quiero ir al parque",       imgUrl: "/public/Places/park.png",        category: "places" },
  { title_en: "School",        title_ar: "المدرسة",     title_fr: "École",          title_es: "Escuela",         expression_en: "I want to go to school",     expression_ar: "أريد الذهاب إلى المدرسة",  expression_fr: "Je veux aller à l'école",      expression_es: "Quiero ir a la escuela",    imgUrl: "/public/Places/school.png",      category: "places" },
  { title_en: "Supermarket",   title_ar: "السوبرماركت", title_fr: "Supermarché",    title_es: "Supermercado",    expression_en: "I want to go to the supermarket", expression_ar: "أريد الذهاب إلى السوبرماركت", expression_fr: "Je veux aller au supermarché", expression_es: "Quiero ir al supermercado", imgUrl: "/public/Places/supermarket.png", category: "places" },
  { title_en: "University",    title_ar: "الجامعة",     title_fr: "Université",     title_es: "Universidad",     expression_en: "I want to go to the university", expression_ar: "أريد الذهاب إلى الجامعة",  expression_fr: "Je veux aller à l'université", expression_es: "Quiero ir a la universidad", imgUrl: "/public/Places/university.png",  category: "places" },
  { title_en: "Work",          title_ar: "العمل",       title_fr: "Travail",        title_es: "Trabajo",         expression_en: "I want to go to work",       expression_ar: "أريد الذهاب إلى العمل",    expression_fr: "Je veux aller au travail",     expression_es: "Quiero ir al trabajo",      imgUrl: "/public/Places/work.png",        category: "places" }
];

export const breakfastSubIcons = [
  { title_en: "Bread",    title_ar: "خبز",        title_fr: "Pain",      title_es: "Pan",        expression_en: "I want bread",    expression_ar: "أريد خبزاً",       expression_fr: "Je veux du pain",      expression_es: "Quiero pan",        imgUrl: "/public/breakfast/breadd.png",   category: "Breakfast" },
  { title_en: "Eggs",     title_ar: "بيض",        title_fr: "Œufs",      title_es: "Huevos",     expression_en: "I want eggs",     expression_ar: "أريد بيضاً",       expression_fr: "Je veux des œufs",     expression_es: "Quiero huevos",     imgUrl: "/public/breakfast/eggs.png",     category: "Breakfast" },
  { title_en: "Cheese",   title_ar: "جبن",        title_fr: "Fromage",   title_es: "Queso",      expression_en: "I want cheese",   expression_ar: "أريد جبناً",       expression_fr: "Je veux du fromage",   expression_es: "Quiero queso",      imgUrl: "/public/breakfast/cheese.png",   category: "Breakfast" },
  { title_en: "Milk",     title_ar: "حليب",       title_fr: "Lait",      title_es: "Leche",      expression_en: "I want milk",     expression_ar: "أريد حليباً",      expression_fr: "Je veux du lait",      expression_es: "Quiero leche",      imgUrl: "/public/breakfast/milk.png",     category: "Breakfast" },
  { title_en: "Juice",    title_ar: "عصير",       title_fr: "Jus",       title_es: "Jugo",       expression_en: "I want juice",    expression_ar: "أريد عصيراً",      expression_fr: "Je veux du jus",       expression_es: "Quiero jugo",       imgUrl: "/public/breakfast/juice.png",    category: "Breakfast" },
  { title_en: "Cereal",   title_ar: "حبوب إفطار", title_fr: "Céréales",  title_es: "Cereal",     expression_en: "I want cereal",   expression_ar: "أريد حبوب إفطار",  expression_fr: "Je veux des céréales", expression_es: "Quiero cereal",     imgUrl: "/public/breakfast/cereal.png",   category: "Breakfast" },
  { title_en: "Pancakes", title_ar: "فطائر",      title_fr: "Crêpes",    title_es: "Panqueques", expression_en: "I want pancakes", expression_ar: "أريد فطائر",       expression_fr: "Je veux des crêpes",   expression_es: "Quiero panqueques", imgUrl: "/public/breakfast/pancakes.png", category: "Breakfast" },
  { title_en: "Fruits",   title_ar: "فواكه",      title_fr: "Fruits",    title_es: "Frutas",     expression_en: "I want fruits",   expression_ar: "أريد فواكه",       expression_fr: "Je veux des fruits",   expression_es: "Quiero frutas",     imgUrl: "/public/breakfast/fruits.png",   category: "Breakfast" },
  { title_en: "Coffee",   title_ar: "قهوة",       title_fr: "Café",      title_es: "Café",       expression_en: "I want coffee",   expression_ar: "أريد قهوة",        expression_fr: "Je veux du café",      expression_es: "Quiero café",       imgUrl: "/public/breakfast/coffee.png",   category: "Breakfast" },
  { title_en: "Tea",      title_ar: "شاي",        title_fr: "Thé",       title_es: "Té",         expression_en: "I want tea",      expression_ar: "أريد شاياً",       expression_fr: "Je veux du thé",       expression_es: "Quiero té",         imgUrl: "/public/breakfast/tea.png",      category: "Breakfast" },
  { title_en: "Beans",    title_ar: "فول",        title_fr: "Haricots",  title_es: "Frijoles",   expression_en: "I want beans",    expression_ar: "أريد فولاً",       expression_fr: "Je veux des haricots", expression_es: "Quiero frijoles",   imgUrl: "/public/breakfast/beans.png",    category: "Breakfast" },
  { title_en: "Tomato",   title_ar: "طماطم",      title_fr: "Tomate",    title_es: "Tomate",     expression_en: "I want tomato",   expression_ar: "أريد طماطم",       expression_fr: "Je veux des tomates",  expression_es: "Quiero tomate",     imgUrl: "/public/breakfast/tomato.png",   category: "Breakfast" },
  { title_en: "Fetera",   title_ar: "فتيرة",      title_fr: "Fetera",    title_es: "Fetera",     expression_en: "I want fetera",   expression_ar: "أريد فتيرة",       expression_fr: "Je veux de la fetera", expression_es: "Quiero fetera",     imgUrl: "/public/breakfast/fetera.png",   category: "Breakfast" },
  { title_en: "Yogurt",   title_ar: "زبادي",      title_fr: "Yaourt",    title_es: "Yogur",      expression_en: "I want yogurt",   expression_ar: "أريد زبادي",       expression_fr: "Je veux du yaourt",    expression_es: "Quiero yogur",      imgUrl: "/public/breakfast/yogurt.png",   category: "Breakfast" },
  { title_en: "Honey",    title_ar: "عسل",        title_fr: "Miel",      title_es: "Miel",       expression_en: "I want honey",    expression_ar: "أريد عسلاً",       expression_fr: "Je veux du miel",      expression_es: "Quiero miel",       imgUrl: "/public/breakfast/honey.png",    category: "Breakfast" },
  { title_en: "Taameya",  title_ar: "طعمية",      title_fr: "Taameya",   title_es: "Taameya",    expression_en: "I want taameya",  expression_ar: "أريد طعمية",       expression_fr: "Je veux de la taameya", expression_es: "Quiero taameya",   imgUrl: "/public/breakfast/taameya.png",  category: "Breakfast" }
];

export const lunchSubIcons = [
  { title_en: "Rice",    title_ar: "أرز",    title_fr: "Riz",     title_es: "Arroz",    expression_en: "I want rice",    expression_ar: "أريد أرزاً",   expression_fr: "Je veux du riz",       expression_es: "Quiero arroz",    imgUrl: "/public/lunch/rice.png",    category: "Lunch" },
  { title_en: "Pasta",   title_ar: "مكرونة", title_fr: "Pâtes",   title_es: "Pasta",    expression_en: "I want pasta",   expression_ar: "أريد مكرونة",  expression_fr: "Je veux des pâtes",    expression_es: "Quiero pasta",    imgUrl: "/public/lunch/pasta.png",   category: "Lunch" },
  { title_en: "Chicken", title_ar: "دجاج",   title_fr: "Poulet",  title_es: "Pollo",    expression_en: "I want chicken", expression_ar: "أريد دجاجاً",  expression_fr: "Je veux du poulet",    expression_es: "Quiero pollo",    imgUrl: "/public/lunch/chicken.png", category: "Lunch" },
  { title_en: "Meat",    title_ar: "لحم",    title_fr: "Viande",  title_es: "Carne",    expression_en: "I want meat",    expression_ar: "أريد لحماً",   expression_fr: "Je veux de la viande", expression_es: "Quiero carne",    imgUrl: "/public/lunch/meat.png",    category: "Lunch" },
  { title_en: "Fish",    title_ar: "سمك",    title_fr: "Poisson", title_es: "Pescado",  expression_en: "I want fish",    expression_ar: "أريد سمكاً",   expression_fr: "Je veux du poisson",   expression_es: "Quiero pescado",  imgUrl: "/public/lunch/fish.png",    category: "Lunch" },
  { title_en: "Salad",   title_ar: "سلطة",   title_fr: "Salade",  title_es: "Ensalada", expression_en: "I want salad",   expression_ar: "أريد سلطة",    expression_fr: "Je veux de la salade", expression_es: "Quiero ensalada", imgUrl: "/public/lunch/salad.png",   category: "Lunch" },
  { title_en: "Soup",    title_ar: "شوربة",  title_fr: "Soupe",   title_es: "Sopa",     expression_en: "I want soup",    expression_ar: "أريد شوربة",   expression_fr: "Je veux de la soupe",  expression_es: "Quiero sopa",     imgUrl: "/public/lunch/soup.png",    category: "Lunch" },
  { title_en: "Bread",   title_ar: "خبز",    title_fr: "Pain",    title_es: "Pan",      expression_en: "I want bread",   expression_ar: "أريد خبزاً",   expression_fr: "Je veux du pain",      expression_es: "Quiero pan",      imgUrl: "/public/lunch/bread.png",   category: "Lunch" },
  { title_en: "Juice",   title_ar: "عصير",   title_fr: "Jus",     title_es: "Jugo",     expression_en: "I want juice",   expression_ar: "أريد عصيراً",  expression_fr: "Je veux du jus",       expression_es: "Quiero jugo",     imgUrl: "/public/lunch/juice.png",   category: "Lunch" },
  { title_en: "Dessert", title_ar: "تحلية",  title_fr: "Dessert", title_es: "Postre",   expression_en: "I want dessert", expression_ar: "أريد تحلية",   expression_fr: "Je veux un dessert",   expression_es: "Quiero postre",   imgUrl: "/public/lunch/dessert.png", category: "Lunch" }
];

export const dinnerSubIcons = [
  { title_en: "Rice",    title_ar: "أرز",    title_fr: "Riz",     title_es: "Arroz",    expression_en: "I want rice",    expression_ar: "أريد أرزاً",   expression_fr: "Je veux du riz",       expression_es: "Quiero arroz",    imgUrl: "/public/dinner/rice.png",    category: "Dinner" },
  { title_en: "Pasta",   title_ar: "مكرونة", title_fr: "Pâtes",   title_es: "Pasta",    expression_en: "I want pasta",   expression_ar: "أريد مكرونة",  expression_fr: "Je veux des pâtes",    expression_es: "Quiero pasta",    imgUrl: "/public/dinner/pasta.png",   category: "Dinner" },
  { title_en: "Chicken", title_ar: "دجاج",   title_fr: "Poulet",  title_es: "Pollo",    expression_en: "I want chicken", expression_ar: "أريد دجاجاً",  expression_fr: "Je veux du poulet",    expression_es: "Quiero pollo",    imgUrl: "/public/dinner/chicken.png", category: "Dinner" },
  { title_en: "Meat",    title_ar: "لحم",    title_fr: "Viande",  title_es: "Carne",    expression_en: "I want meat",    expression_ar: "أريد لحماً",   expression_fr: "Je veux de la viande", expression_es: "Quiero carne",    imgUrl: "/public/dinner/meat.png",    category: "Dinner" },
  { title_en: "Fish",    title_ar: "سمك",    title_fr: "Poisson", title_es: "Pescado",  expression_en: "I want fish",    expression_ar: "أريد سمكاً",   expression_fr: "Je veux du poisson",   expression_es: "Quiero pescado",  imgUrl: "/public/dinner/fish.png",    category: "Dinner" },
  { title_en: "Salad",   title_ar: "سلطة",   title_fr: "Salade",  title_es: "Ensalada", expression_en: "I want salad",   expression_ar: "أريد سلطة",    expression_fr: "Je veux de la salade", expression_es: "Quiero ensalada", imgUrl: "/public/dinner/salad.png",   category: "Dinner" },
  { title_en: "Soup",    title_ar: "شوربة",  title_fr: "Soupe",   title_es: "Sopa",     expression_en: "I want soup",    expression_ar: "أريد شوربة",   expression_fr: "Je veux de la soupe",  expression_es: "Quiero sopa",     imgUrl: "/public/dinner/soup.png",    category: "Dinner" },
  { title_en: "Bread",   title_ar: "خبز",    title_fr: "Pain",    title_es: "Pan",      expression_en: "I want bread",   expression_ar: "أريد خبزاً",   expression_fr: "Je veux du pain",      expression_es: "Quiero pan",      imgUrl: "/public/dinner/bread.png",   category: "Dinner" },
  { title_en: "Juice",   title_ar: "عصير",   title_fr: "Jus",     title_es: "Jugo",     expression_en: "I want juice",   expression_ar: "أريد عصيراً",  expression_fr: "Je veux du jus",       expression_es: "Quiero jugo",     imgUrl: "/public/dinner/juice.png",   category: "Dinner" },
  { title_en: "Dessert", title_ar: "تحلية",  title_fr: "Dessert", title_es: "Postre",   expression_en: "I want dessert", expression_ar: "أريد تحلية",   expression_fr: "Je veux un dessert",   expression_es: "Quiero postre",   imgUrl: "/public/dinner/dessert.png", category: "Dinner" }
];

export const snackSubIcons = [
  { title_en: "Chips",     title_ar: "رقائق",    title_fr: "Chips",    title_es: "Papas fritas", expression_en: "I want chips",     expression_ar: "أريد رقائق",    expression_fr: "Je veux des chips",    expression_es: "Quiero papas fritas", imgUrl: "/public/snack/chips.png",    category: "Snack" },
  { title_en: "Cookies",   title_ar: "كوكيز",    title_fr: "Biscuits", title_es: "Galletas",     expression_en: "I want cookies",   expression_ar: "أريد كوكيز",    expression_fr: "Je veux des biscuits", expression_es: "Quiero galletas",     imgUrl: "/public/snack/cookies.png",  category: "Snack" },
  { title_en: "Chocolate", title_ar: "شوكولاتة", title_fr: "Chocolat", title_es: "Chocolate",    expression_en: "I want chocolate", expression_ar: "أريد شوكولاتة", expression_fr: "Je veux du chocolat",  expression_es: "Quiero chocolate",    imgUrl: "/public/snack/chocolate.png", category: "Snack" },
  { title_en: "Fruits",    title_ar: "فواكه",    title_fr: "Fruits",   title_es: "Frutas",       expression_en: "I want fruits",    expression_ar: "أريد فواكه",    expression_fr: "Je veux des fruits",   expression_es: "Quiero frutas",       imgUrl: "/public/snack/fruits.png",   category: "Snack" },
  { title_en: "Nuts",      title_ar: "مكسرات",   title_fr: "Noix",     title_es: "Frutos secos", expression_en: "I want nuts",      expression_ar: "أريد مكسرات",   expression_fr: "Je veux des noix",     expression_es: "Quiero frutos secos", imgUrl: "/public/snack/nuts.png",      category: "Snack" },
  { title_en: "Yogurt",    title_ar: "زبادي",    title_fr: "Yaourt",   title_es: "Yogur",        expression_en: "I want yogurt",    expression_ar: "أريد زبادي",    expression_fr: "Je veux du yaourt",    expression_es: "Quiero yogur",        imgUrl: "/public/snack/yogurt.png",   category: "Snack" },
  { title_en: "Sandwich",  title_ar: "ساندوتش",  title_fr: "Sandwich", title_es: "Sándwich",     expression_en: "I want a sandwich", expression_ar: "أريد ساندوتش",  expression_fr: "Je veux un sandwich",  expression_es: "Quiero un sándwich",  imgUrl: "/public/snack/sandwich.png", category: "Snack" },
  { title_en: "Juice",     title_ar: "عصير",     title_fr: "Jus",      title_es: "Jugo",         expression_en: "I want juice",     expression_ar: "أريد عصيراً",   expression_fr: "Je veux du jus",       expression_es: "Quiero jugo",         imgUrl: "/public/snack/juice.png",    category: "Snack" },
  { title_en: "Tea",       title_ar: "شاي",      title_fr: "Thé",      title_es: "Té",           expression_en: "I want tea",       expression_ar: "أريد شاياً",    expression_fr: "Je veux du thé",       expression_es: "Quiero té",           imgUrl: "/public/snack/tea.png",      category: "Snack" },
  { title_en: "Coffee",    title_ar: "قهوة",     title_fr: "Café",     title_es: "Café",         expression_en: "I want coffee",    expression_ar: "أريد قهوة",     expression_fr: "Je veux du café",      expression_es: "Quiero café",         imgUrl: "/public/snack/coffee.png",   category: "Snack" }
];

export const tvSubIcons = [
  { title_en: "News",        title_ar: "أخبار",       title_fr: "Nouvelles",      title_es: "Noticias",         expression_en: "I want to watch the news",      expression_ar: "أريد مشاهدة الأخبار",      expression_fr: "Je veux regarder les nouvelles",     expression_es: "Quiero ver las noticias",      imgUrl: "/public/TV/news.png",        category: "TV" },
  { title_en: "Series",      title_ar: "مسلسلات",     title_fr: "Séries",         title_es: "Series",           expression_en: "I want to watch a series",      expression_ar: "أريد مشاهدة مسلسلات",      expression_fr: "Je veux regarder des séries",        expression_es: "Quiero ver una serie",         imgUrl: "/public/TV/series.png",      category: "TV" },
  { title_en: "Movie",       title_ar: "أفلام",       title_fr: "Film",           title_es: "Película",         expression_en: "I want to watch a movie",       expression_ar: "أريد مشاهدة فيلم",         expression_fr: "Je veux regarder un film",           expression_es: "Quiero ver una película",      imgUrl: "/public/TV/movie.png",       category: "TV" },
  { title_en: "Cartoon",     title_ar: "رسوم متحركة", title_fr: "Dessins animés", title_es: "Dibujos animados", expression_en: "I want to watch cartoons",      expression_ar: "أريد مشاهدة رسوم متحركة",  expression_fr: "Je veux regarder des dessins animés", expression_es: "Quiero ver dibujos animados", imgUrl: "/public/TV/cartoon.png",     category: "TV" },
  { title_en: "Documentary", title_ar: "وثائقي",      title_fr: "Documentaire",   title_es: "Documental",       expression_en: "I want to watch a documentary", expression_ar: "أريد مشاهدة وثائقي",        expression_fr: "Je veux regarder un documentaire",   expression_es: "Quiero ver un documental",     imgUrl: "/public/TV/documentary.png", category: "TV" },
  { title_en: "Sports",      title_ar: "رياضة",       title_fr: "Sports",         title_es: "Deportes",         expression_en: "I want to watch sports",        expression_ar: "أريد مشاهدة الرياضة",      expression_fr: "Je veux regarder du sport",          expression_es: "Quiero ver deportes",          imgUrl: "/public/TV/sports.png",      category: "TV" },
  { title_en: "Music",       title_ar: "موسيقى",      title_fr: "Musique",        title_es: "Música",           expression_en: "I want to watch music",         expression_ar: "أريد مشاهدة موسيقى",        expression_fr: "Je veux regarder de la musique",     expression_es: "Quiero ver música",            imgUrl: "/public/TV/music.png",       category: "TV" },
  { title_en: "Kids",        title_ar: "أطفال",       title_fr: "Enfants",        title_es: "Niños",            expression_en: "I want to watch kids channel",  expression_ar: "أريد مشاهدة قناة أطفال",   expression_fr: "Je veux regarder une chaîne enfants", expression_es: "Quiero ver canal infantil",    imgUrl: "/public/TV/kids.png",        category: "TV" },
  { title_en: "Comedy",      title_ar: "كوميديا",     title_fr: "Comédie",        title_es: "Comedia",          expression_en: "I want to watch comedy",        expression_ar: "أريد مشاهدة كوميديا",      expression_fr: "Je veux regarder une comédie",       expression_es: "Quiero ver comedia",           imgUrl: "/public/TV/comedy.png",      category: "TV" },
  { title_en: "Drama",       title_ar: "دراما",       title_fr: "Drame",          title_es: "Drama",            expression_en: "I want to watch drama",         expression_ar: "أريد مشاهدة دراما",         expression_fr: "Je veux regarder un drame",          expression_es: "Quiero ver drama",             imgUrl: "/public/TV/drama.png",       category: "TV" }
];

export const playSubIcons = [
  { title_en: "Football",    title_ar: "كرة قدم",      title_fr: "Football",      title_es: "Fútbol",      expression_en: "I want to play football",    expression_ar: "أريد لعب كرة القدم",      expression_fr: "Je veux jouer au football",  expression_es: "Quiero jugar fútbol",     imgUrl: "/public/Play/football.png",    category: "Play" },
  { title_en: "Basketball",  title_ar: "كرة سلة",      title_fr: "Basket-ball",   title_es: "Baloncesto",  expression_en: "I want to play basketball",  expression_ar: "أريد لعب كرة السلة",      expression_fr: "Je veux jouer au basket",    expression_es: "Quiero jugar baloncesto", imgUrl: "/public/Play/basketball.png",  category: "Play" },
  { title_en: "Tennis",      title_ar: "تنس",          title_fr: "Tennis",        title_es: "Tenis",       expression_en: "I want to play tennis",      expression_ar: "أريد لعب التنس",          expression_fr: "Je veux jouer au tennis",    expression_es: "Quiero jugar tenis",      imgUrl: "/public/Play/tennis.png",      category: "Play" },
  { title_en: "Chess",       title_ar: "شطرنج",        title_fr: "Échecs",        title_es: "Ajedrez",     expression_en: "I want to play chess",       expression_ar: "أريد لعب الشطرنج",        expression_fr: "Je veux jouer aux échecs",   expression_es: "Quiero jugar ajedrez",    imgUrl: "/public/Play/chess.png",       category: "Play" },
  { title_en: "Video Games", title_ar: "ألعاب فيديو",  title_fr: "Jeux vidéo",    title_es: "Videojuegos", expression_en: "I want to play video games", expression_ar: "أريد لعب ألعاب فيديو",    expression_fr: "Je veux jouer aux jeux vidéo", expression_es: "Quiero jugar videojuegos", imgUrl: "/public/Play/video-games.png", category: "Play" },
  { title_en: "Board Games", title_ar: "ألعاب لوحية",  title_fr: "Jeux de société", title_es: "Juegos de mesa", expression_en: "I want to play board games", expression_ar: "أريد لعب ألعاب لوحية", expression_fr: "Je veux jouer à des jeux de société", expression_es: "Quiero juegos de mesa", imgUrl: "/public/Play/board-games.png", category: "Play" },
  { title_en: "Swimming",    title_ar: "سباحة",        title_fr: "Natation",      title_es: "Natación",    expression_en: "I want to swim",             expression_ar: "أريد السباحة",            expression_fr: "Je veux nager",              expression_es: "Quiero nadar",            imgUrl: "/public/Play/swimming.png",    category: "Play" },
  { title_en: "Running",     title_ar: "جري",          title_fr: "Course",        title_es: "Correr",      expression_en: "I want to run",              expression_ar: "أريد الجري",              expression_fr: "Je veux courir",             expression_es: "Quiero correr",           imgUrl: "/public/Play/running.png",     category: "Play" },
  { title_en: "Cycling",     title_ar: "ركوب الدراجات", title_fr: "Cyclisme",     title_es: "Ciclismo",    expression_en: "I want to go cycling",       expression_ar: "أريد ركوب الدراجة",       expression_fr: "Je veux faire du vélo",      expression_es: "Quiero ir en bicicleta",  imgUrl: "/public/Play/cycling.png",     category: "Play" },
  { title_en: "Gym",         title_ar: "صالة رياضية",  title_fr: "Salle de sport", title_es: "Gimnasio",   expression_en: "I want to go to the gym",    expression_ar: "أريد الذهاب للصالة الرياضية", expression_fr: "Je veux aller à la salle de sport", expression_es: "Quiero ir al gimnasio", imgUrl: "/public/Play/gym.png",         category: "Play" }
];

export const musicSubIcons = [
  { title_en: "Guitar",      title_ar: "غيتار",    title_fr: "Guitare",       title_es: "Guitarra",    expression_en: "I want to play guitar",      expression_ar: "أريد العزف على الغيتار",   expression_fr: "Je veux jouer de la guitare",    expression_es: "Quiero tocar la guitarra",   imgUrl: "/public/Music/guitar.png",      category: "Music" },
  { title_en: "Piano",       title_ar: "بيانو",    title_fr: "Piano",         title_es: "Piano",       expression_en: "I want to play piano",       expression_ar: "أريد العزف على البيانو",   expression_fr: "Je veux jouer du piano",         expression_es: "Quiero tocar el piano",      imgUrl: "/public/Music/piano.png",       category: "Music" },
  { title_en: "Drums",       title_ar: "طبول",     title_fr: "Batterie",      title_es: "Batería",     expression_en: "I want to play drums",       expression_ar: "أريد العزف على الطبول",    expression_fr: "Je veux jouer de la batterie",   expression_es: "Quiero tocar la batería",    imgUrl: "/public/Music/drums.png",       category: "Music" },
  { title_en: "Violin",      title_ar: "كمان",     title_fr: "Violon",        title_es: "Violín",      expression_en: "I want to play violin",      expression_ar: "أريد العزف على الكمان",    expression_fr: "Je veux jouer du violon",        expression_es: "Quiero tocar el violín",     imgUrl: "/public/Music/violin.png",      category: "Music" },
  { title_en: "Saxophone",   title_ar: "ساكسفون",  title_fr: "Saxophone",     title_es: "Saxofón",     expression_en: "I want to play saxophone",   expression_ar: "أريد العزف على الساكسفون", expression_fr: "Je veux jouer du saxophone",      expression_es: "Quiero tocar el saxofón",    imgUrl: "/public/Music/saxophone.png",   category: "Music" },
  { title_en: "Microphone",  title_ar: "ميكروفون", title_fr: "Microphone",    title_es: "Micrófono",   expression_en: "I want a microphone",        expression_ar: "أريد ميكروفوناً",          expression_fr: "Je veux un microphone",          expression_es: "Quiero un micrófono",        imgUrl: "/public/Music/microphone.png",  category: "Music" },
  { title_en: "Headphones",  title_ar: "سماعات",   title_fr: "Casque",        title_es: "Auriculares", expression_en: "I want headphones",          expression_ar: "أريد سماعات",              expression_fr: "Je veux un casque",              expression_es: "Quiero auriculares",         imgUrl: "/public/Music/headphones.png",  category: "Music" },
  { title_en: "Speaker",     title_ar: "مكبر صوت", title_fr: "Haut-parleur",  title_es: "Altavoz",     expression_en: "I want a speaker",           expression_ar: "أريد مكبر صوت",            expression_fr: "Je veux un haut-parleur",        expression_es: "Quiero un altavoz",          imgUrl: "/public/Music/speaker.png",     category: "Music" },
  { title_en: "DJ",          title_ar: "دي جي",    title_fr: "DJ",            title_es: "DJ",          expression_en: "I want DJ music",            expression_ar: "أريد دي جي",               expression_fr: "Je veux de la musique DJ",       expression_es: "Quiero música DJ",           imgUrl: "/public/Music/dj.png",          category: "Music" },
  { title_en: "Music Notes", title_ar: "نوتات",    title_fr: "Notes de musique", title_es: "Notas",   expression_en: "I want music notes",         expression_ar: "أريد نوتات موسيقية",       expression_fr: "Je veux des notes de musique",  expression_es: "Quiero notas musicales",     imgUrl: "/public/Music/music-notes.png", category: "Music" }
];

export const questionsSubIcons = [
  { title_en: "When",      title_ar: "متى",        title_fr: "Quand",    title_es: "Cuándo",   expression_en: "When does this happen?",   expression_ar: "متى يحدث هذا؟",   expression_fr: "Quand cela se passe-t-il?",  expression_es: "¿Cuándo ocurre esto?",   imgUrl: "/public/Questions/date.png",     category: "Questions" },
  { title_en: "Where",     title_ar: "أين",        title_fr: "Où",       title_es: "Dónde",    expression_en: "Where is this place?",     expression_ar: "أين هذا المكان؟",  expression_fr: "Où est cet endroit?",        expression_es: "¿Dónde está este lugar?", imgUrl: "/public/Questions/where.png",    category: "Questions" },
  { title_en: "Who",       title_ar: "من",         title_fr: "Qui",      title_es: "Quién",    expression_en: "Who is this person?",      expression_ar: "من هذا الشخص؟",   expression_fr: "Qui est cette personne?",    expression_es: "¿Quién es esta persona?", imgUrl: "/public/Questions/who.png",      category: "Questions" },
  { title_en: "Which",     title_ar: "أي واحد",    title_fr: "Lequel",   title_es: "Cuál",     expression_en: "Which one do you choose?", expression_ar: "أي واحد تختار؟",  expression_fr: "Lequel choisis-tu?",         expression_es: "¿Cuál eliges?",          imgUrl: "/public/Questions/whichone.png", category: "Questions" },
  { title_en: "How many",  title_ar: "كم",         title_fr: "Combien",  title_es: "Cuánto",   expression_en: "How many?",                expression_ar: "كم العدد؟",        expression_fr: "Combien?",                   expression_es: "¿Cuánto?",               imgUrl: "/public/Questions/money.png",    category: "Questions" },
  { title_en: "Question",  title_ar: "سؤال",       title_fr: "Question", title_es: "Pregunta", expression_en: "I have a question",        expression_ar: "لدي سؤال",        expression_fr: "J'ai une question",          expression_es: "Tengo una pregunta",     imgUrl: "/public/Questions/?.png",        category: "Questions" },
  { title_en: "What time", title_ar: "وقت",        title_fr: "L'heure",  title_es: "La hora",  expression_en: "What time is it now?",     expression_ar: "ما الوقت الآن؟",  expression_fr: "Quelle heure est-il?",       expression_es: "¿Qué hora es?",          imgUrl: "/public/Questions/time.png",     category: "Questions" }
];

export const relationsSubIcons = [
  { title_en: "Up",      title_ar: "أعلى",   title_fr: "En haut",       title_es: "Arriba",      expression_en: "It is up",      expression_ar: "إنه فوق",         expression_fr: "C'est en haut",      expression_es: "Está arriba",      imgUrl: "/public/Relations/up.png",      category: "Relations" },
  { title_en: "Down",    title_ar: "أسفل",   title_fr: "En bas",        title_es: "Abajo",       expression_en: "It is down",    expression_ar: "إنه تحت",         expression_fr: "C'est en bas",       expression_es: "Está abajo",       imgUrl: "/public/Relations/down.png",    category: "Relations" },
  { title_en: "Right",   title_ar: "يمين",   title_fr: "À droite",      title_es: "Derecha",     expression_en: "It is right",   expression_ar: "إنه على اليمين",  expression_fr: "C'est à droite",     expression_es: "Está a la derecha", imgUrl: "/public/Relations/right.png",   category: "Relations" },
  { title_en: "Left",    title_ar: "يسار",   title_fr: "À gauche",      title_es: "Izquierda",   expression_en: "It is left",    expression_ar: "إنه على اليسار", expression_fr: "C'est à gauche",     expression_es: "Está a la izquierda", imgUrl: "/public/Relations/left.png",  category: "Relations" },
  { title_en: "Inside",  title_ar: "داخل",   title_fr: "À l'intérieur", title_es: "Dentro",      expression_en: "It is inside",  expression_ar: "إنه بالداخل",     expression_fr: "C'est à l'intérieur", expression_es: "Está adentro",    imgUrl: "/public/Relations/inside.png",  category: "Relations" },
  { title_en: "Outside", title_ar: "خارج",   title_fr: "À l'extérieur", title_es: "Fuera",       expression_en: "It is outside", expression_ar: "إنه بالخارج",     expression_fr: "C'est à l'extérieur", expression_es: "Está afuera",     imgUrl: "/public/Relations/outside.png", category: "Relations" },
  { title_en: "Middle",  title_ar: "منتصف",  title_fr: "Au milieu",     title_es: "En el medio", expression_en: "It is in the middle", expression_ar: "إنه في المنتصف", expression_fr: "C'est au milieu",  expression_es: "Está en el medio", imgUrl: "/public/Relations/middle.png",  category: "Relations" },
  { title_en: "Beside",  title_ar: "جنب",    title_fr: "À côté",        title_es: "Al lado",     expression_en: "It is beside",  expression_ar: "إنه بجانب شيء",   expression_fr: "C'est à côté",       expression_es: "Está al lado",     imgUrl: "/public/Relations/ganb.png",    category: "Relations" },
  { title_en: "Around",  title_ar: "حول",    title_fr: "Autour",        title_es: "Alrededor",   expression_en: "It is around",  expression_ar: "إنه حول المكان",  expression_fr: "C'est autour",       expression_es: "Está alrededor",   imgUrl: "/public/Relations/around.png",  category: "Relations" },
  { title_en: "Tool",    title_ar: "أداة",   title_fr: "Outil",         title_es: "Herramienta", expression_en: "It is a tool",   expression_ar: "إنه أداة",         expression_fr: "C'est un outil",     expression_es: "Es una herramienta", imgUrl: "/public/Relations/alatol.png", category: "Relations" }
];

export const timesSubIcons = [
  { title_en: "Sunrise",   title_ar: "شروق الشمس", title_fr: "Lever du soleil", title_es: "Amanecer", expression_en: "It is sunrise time",   expression_ar: "الوقت الآن وقت شروق الشمس", expression_fr: "C'est l'heure du lever du soleil", expression_es: "Es la hora del amanecer", imgUrl: "/public/Times/1.png", category: "Times" },
  { title_en: "Dawn",      title_ar: "وقت الفجر",  title_fr: "Aube",            title_es: "Alba",     expression_en: "It is dawn time",      expression_ar: "الوقت الآن وقت الفجر",      expression_fr: "C'est l'heure de l'aube",          expression_es: "Es la hora del alba",     imgUrl: "/public/Times/2.png", category: "Times" },
  { title_en: "Noon",      title_ar: "ظهراً",       title_fr: "Midi",            title_es: "Mediodía", expression_en: "It is noon",           expression_ar: "الوقت الآن ظهراً",          expression_fr: "C'est midi",                       expression_es: "Es mediodía",             imgUrl: "/public/Times/3.png", category: "Times" },
  { title_en: "4 O'Clock", title_ar: "الساعة 4",   title_fr: "4 heures",        title_es: "Las 4",    expression_en: "It is 4 o'clock",      expression_ar: "الوقت الآن الساعة 4",       expression_fr: "Il est 4 heures",                  expression_es: "Son las 4",               imgUrl: "/public/Times/4.png", category: "Times" },
  { title_en: "5 O'Clock", title_ar: "الساعة 5",   title_fr: "5 heures",        title_es: "Las 5",    expression_en: "It is 5 o'clock",      expression_ar: "الوقت الآن الساعة 5",       expression_fr: "Il est 5 heures",                  expression_es: "Son las 5",               imgUrl: "/public/Times/5.png", category: "Times" },
  { title_en: "6 O'Clock", title_ar: "الساعة 6",   title_fr: "6 heures",        title_es: "Las 6",    expression_en: "It is 6 o'clock",      expression_ar: "الوقت الآن الساعة 6",       expression_fr: "Il est 6 heures",                  expression_es: "Son las 6",               imgUrl: "/public/Times/6.png", category: "Times" }
];

export const toolsSubIcons = [
  { title_en: "Spoon",    title_ar: "معلقة",   title_fr: "Cuillère",   title_es: "Cuchara",   expression_en: "I need a spoon",    expression_ar: "أحتاج إلى معلقة", expression_fr: "J'ai besoin d'une cuillère",  expression_es: "Necesito una cuchara",   imgUrl: "/public/Tools/1.png",  category: "Tools" },
  { title_en: "Toy",      title_ar: "لعبة",    title_fr: "Jouet",      title_es: "Juguete",   expression_en: "I need a toy",      expression_ar: "أحتاج لعبة",      expression_fr: "J'ai besoin d'un jouet",      expression_es: "Necesito un juguete",    imgUrl: "/public/Tools/2.png",  category: "Tools" },
  { title_en: "Ball",     title_ar: "كرة",     title_fr: "Balle",      title_es: "Pelota",    expression_en: "I need a ball",     expression_ar: "أحتاج كرة",       expression_fr: "J'ai besoin d'une balle",     expression_es: "Necesito una pelota",    imgUrl: "/public/Tools/3.png",  category: "Tools" },
  { title_en: "Bag",      title_ar: "شنطة",    title_fr: "Sac",        title_es: "Bolsa",     expression_en: "I need a bag",      expression_ar: "أحتاج شنطة",      expression_fr: "J'ai besoin d'un sac",        expression_es: "Necesito una bolsa",     imgUrl: "/public/Tools/4.png",  category: "Tools" },
  { title_en: "Glasses",  title_ar: "نظارة",   title_fr: "Lunettes",   title_es: "Gafas",     expression_en: "I need glasses",    expression_ar: "أحتاج نظارة",     expression_fr: "J'ai besoin de lunettes",     expression_es: "Necesito gafas",         imgUrl: "/public/Tools/5.png",  category: "Tools" },
  { title_en: "Clock",    title_ar: "ساعة",    title_fr: "Montre",     title_es: "Reloj",     expression_en: "I need a clock",    expression_ar: "أحتاج ساعة",      expression_fr: "J'ai besoin d'une montre",    expression_es: "Necesito un reloj",      imgUrl: "/public/Tools/6.png",  category: "Tools" },
  { title_en: "Computer", title_ar: "كمبيوتر", title_fr: "Ordinateur", title_es: "Computadora", expression_en: "I need a computer", expression_ar: "أحتاج كمبيوتر",  expression_fr: "J'ai besoin d'un ordinateur", expression_es: "Necesito una computadora", imgUrl: "/public/Tools/7.png", category: "Tools" },
  { title_en: "Laptop",   title_ar: "لابتوب",  title_fr: "Portable",   title_es: "Portátil",  expression_en: "I need a laptop",   expression_ar: "أحتاج لابتوب",    expression_fr: "J'ai besoin d'un portable",   expression_es: "Necesito un portátil",   imgUrl: "/public/Tools/8.png",  category: "Tools" },
  { title_en: "Knife",    title_ar: "سكين",    title_fr: "Couteau",    title_es: "Cuchillo",  expression_en: "I need a knife",    expression_ar: "أحتاج سكين",      expression_fr: "J'ai besoin d'un couteau",    expression_es: "Necesito un cuchillo",   imgUrl: "/public/Tools/9.png",  category: "Tools" },
  { title_en: "Scissors", title_ar: "مقص",     title_fr: "Ciseaux",    title_es: "Tijeras",   expression_en: "I need scissors",   expression_ar: "أحتاج مقص",       expression_fr: "J'ai besoin de ciseaux",      expression_es: "Necesito tijeras",       imgUrl: "/public/Tools/10.png", category: "Tools" },
  { title_en: "Pen",      title_ar: "قلم جاف", title_fr: "Stylo",      title_es: "Bolígrafo", expression_en: "I need a pen",      expression_ar: "أحتاج قلم جاف",   expression_fr: "J'ai besoin d'un stylo",      expression_es: "Necesito un bolígrafo",  imgUrl: "/public/Tools/11.png", category: "Tools" },
  { title_en: "Book",     title_ar: "كتاب",    title_fr: "Livre",      title_es: "Libro",     expression_en: "I need a book",     expression_ar: "أحتاج كتاب",      expression_fr: "J'ai besoin d'un livre",      expression_es: "Necesito un libro",      imgUrl: "/public/Tools/12.png", category: "Tools" },
  { title_en: "Plate",    title_ar: "طبق",     title_fr: "Assiette",   title_es: "Plato",     expression_en: "I need a plate",    expression_ar: "أحتاج طبق",       expression_fr: "J'ai besoin d'une assiette",  expression_es: "Necesito un plato",      imgUrl: "/public/Tools/13.png", category: "Tools" },
  { title_en: "Chair",    title_ar: "كرسي",    title_fr: "Chaise",     title_es: "Silla",     expression_en: "I need a chair",    expression_ar: "أحتاج كرسي",      expression_fr: "J'ai besoin d'une chaise",    expression_es: "Necesito una silla",     imgUrl: "/public/Tools/14.png", category: "Tools" },
  { title_en: "Table",    title_ar: "طاولة",   title_fr: "Table",      title_es: "Mesa",      expression_en: "I need a table",    expression_ar: "أحتاج طاولة",     expression_fr: "J'ai besoin d'une table",     expression_es: "Necesito una mesa",      imgUrl: "/public/Tools/15.png", category: "Tools" },
  { title_en: "Cup",      title_ar: "فنجان",   title_fr: "Tasse",      title_es: "Taza",      expression_en: "I need a cup",      expression_ar: "أحتاج فنجان",     expression_fr: "J'ai besoin d'une tasse",     expression_es: "Necesito una taza",      imgUrl: "/public/Tools/16.png", category: "Tools" }
];

export const verbsSubIcons = [
  { title_en: "Prepare",     title_ar: "يحضر",        title_fr: "Préparer",     title_es: "Preparar",   expression_en: "I want to prepare something", expression_ar: "أريد أن أحضر شيئًا",  expression_fr: "Je veux préparer quelque chose",  expression_es: "Quiero preparar algo",       imgUrl: "/public/Verbs/1.png",  category: "Verbs" },
  { title_en: "Wear",        title_ar: "يلبس",        title_fr: "Porter",       title_es: "Vestir",     expression_en: "I want to wear something",    expression_ar: "أريد أن ألبس شيئًا",  expression_fr: "Je veux porter quelque chose",    expression_es: "Quiero vestir algo",         imgUrl: "/public/Verbs/2.png",  category: "Verbs" },
  { title_en: "Sleep",       title_ar: "ينام",        title_fr: "Dormir",       title_es: "Dormir",     expression_en: "I want to sleep",             expression_ar: "أريد أن أنام",        expression_fr: "Je veux dormir",                  expression_es: "Quiero dormir",              imgUrl: "/public/Verbs/3.png",  category: "Verbs" },
  { title_en: "Think",       title_ar: "يفكر",        title_fr: "Penser",       title_es: "Pensar",     expression_en: "I want to think",             expression_ar: "أريد أن أفكر",        expression_fr: "Je veux penser",                  expression_es: "Quiero pensar",              imgUrl: "/public/Verbs/4.png",  category: "Verbs" },
  { title_en: "Read",        title_ar: "يقرأ",        title_fr: "Lire",         title_es: "Leer",       expression_en: "I want to read",              expression_ar: "أريد أن أقرأ",        expression_fr: "Je veux lire",                    expression_es: "Quiero leer",                imgUrl: "/public/Verbs/5.png",  category: "Verbs" },
  { title_en: "Write",       title_ar: "يكتب",        title_fr: "Écrire",       title_es: "Escribir",   expression_en: "I want to write",             expression_ar: "أريد أن أكتب",        expression_fr: "Je veux écrire",                  expression_es: "Quiero escribir",            imgUrl: "/public/Verbs/6.png",  category: "Verbs" },
  { title_en: "Run",         title_ar: "يجري",        title_fr: "Courir",       title_es: "Correr",     expression_en: "I want to run",               expression_ar: "أريد أن أجري",        expression_fr: "Je veux courir",                  expression_es: "Quiero correr",              imgUrl: "/public/Verbs/7.png",  category: "Verbs" },
  { title_en: "Walk Fast",   title_ar: "يمشي بسرعة", title_fr: "Marcher vite", title_es: "Caminar rápido", expression_en: "I want to walk fast",      expression_ar: "أريد المشي بسرعة",    expression_fr: "Je veux marcher vite",            expression_es: "Quiero caminar rápido",      imgUrl: "/public/Verbs/8.png",  category: "Verbs" },
  { title_en: "Brush Teeth", title_ar: "يغسل أسنانه", title_fr: "Se brosser",  title_es: "Cepillarse", expression_en: "I want to brush my teeth",     expression_ar: "أريد أن أغسل أسناني", expression_fr: "Je veux me brosser les dents",    expression_es: "Quiero cepillarme los dientes", imgUrl: "/public/Verbs/10.png", category: "Verbs" },
  { title_en: "Shout",       title_ar: "صارح",        title_fr: "Crier",        title_es: "Gritar",     expression_en: "I want to shout",             expression_ar: "أريد أن أصارح",       expression_fr: "Je veux crier",                   expression_es: "Quiero gritar",              imgUrl: "/public/Verbs/11.png", category: "Verbs" }
];

export const memoriesSubIcons = [
  { title_en: "2018 – Park",     title_ar: "سنة 2018 – زيارة الحديقة",  title_fr: "2018 – Parc",      title_es: "2018 – Parque",     expression_en: "In 2018 I went to the park",         expression_ar: "في سنة 2018 ذهبت إلى الحديقة",          expression_fr: "En 2018 je suis allé au parc",           expression_es: "En 2018 fui al parque",            imgUrl: "/public/memories/park_2018.png",       category: "Reminder Mee" },
  { title_en: "2018 – Birthday", title_ar: "سنة 2018 – عيد ميلاد",      title_fr: "2018 – Anniversaire", title_es: "2018 – Cumpleaños", expression_en: "In 2018 I celebrated my birthday",   expression_ar: "في سنة 2018 احتفلت بعيد ميلادي",        expression_fr: "En 2018 j'ai célébré mon anniversaire",  expression_es: "En 2018 celebré mi cumpleaños",    imgUrl: "/public/memories/birthday_2018.png",   category: "Reminder Mee" },
  { title_en: "2018 – Trip",     title_ar: "سنة 2018 – رحلة مدرسية",    title_fr: "2018 – Voyage",     title_es: "2018 – Excursión",  expression_en: "In 2018 I went on a school trip",    expression_ar: "في سنة 2018 ذهبت في رحلة مدرسية",       expression_fr: "En 2018 je suis parti en voyage",        expression_es: "En 2018 fui de excursión",         imgUrl: "/public/memories/school_trip_2018.png", category: "Reminder Mee" },
  { title_en: "2019 – Farm",     title_ar: "سنة 2019 – زيارة المزرعة",  title_fr: "2019 – Ferme",      title_es: "2019 – Granja",     expression_en: "In 2019 I visited the farm",         expression_ar: "في سنة 2019 زرت المزرعة",               expression_fr: "En 2019 j'ai visité la ferme",          expression_es: "En 2019 visité la granja",         imgUrl: "/public/memories/farm_2019.png",        category: "Reminder Mee" },
  { title_en: "2019 – Party",    title_ar: "سنة 2019 – حفلة",           title_fr: "2019 – Fête",       title_es: "2019 – Fiesta",     expression_en: "In 2019 I attended a party",         expression_ar: "في سنة 2019 حضرت حفلة في المدرسة",      expression_fr: "En 2019 j'ai assisté à une fête",        expression_es: "En 2019 fui a una fiesta",         imgUrl: "/public/memories/party_2019.png",       category: "Reminder Mee" },
  { title_en: "2019 – Library",  title_ar: "سنة 2019 – زيارة المكتبة",  title_fr: "2019 – Bibliothèque", title_es: "2019 – Biblioteca", expression_en: "In 2019 I went to the library",    expression_ar: "في سنة 2019 ذهبت إلى المكتبة",          expression_fr: "En 2019 je suis allé à la bibliothèque", expression_es: "En 2019 fui a la biblioteca",     imgUrl: "/public/memories/library_2019.png",     category: "Reminder Mee" },
  { title_en: "2020 – Trip",     title_ar: "سنة 2020 – رحلة مدرسية",    title_fr: "2020 – Voyage",     title_es: "2020 – Excursión",  expression_en: "In 2020 I went on a school trip",    expression_ar: "في سنة 2020 ذهبت في رحلة مدرسية",       expression_fr: "En 2020 je suis parti en voyage",        expression_es: "En 2020 fui de excursión",         imgUrl: "/public/memories/school_trip_2020.png", category: "Reminder Mee" },
  { title_en: "2020 – Sports",   title_ar: "سنة 2020 – يوم رياضي",      title_fr: "2020 – Sport",      title_es: "2020 – Deporte",    expression_en: "In 2020 I attended sports day",      expression_ar: "في سنة 2020 حضرت اليوم الرياضي",        expression_fr: "En 2020 j'ai assisté à la journée sportive", expression_es: "En 2020 fui al día deportivo", imgUrl: "/public/memories/sports_day_2020.png",  category: "Reminder Mee" },
  { title_en: "2020 – Museum",   title_ar: "سنة 2020 – زيارة المتحف",   title_fr: "2020 – Musée",      title_es: "2020 – Museo",      expression_en: "In 2020 I visited the museum",       expression_ar: "في سنة 2020 زرت المتحف",                expression_fr: "En 2020 j'ai visité le musée",           expression_es: "En 2020 visité el museo",          imgUrl: "/public/memories/museum_2020.png",      category: "Reminder Mee" },
  { title_en: "2020 – Birthday", title_ar: "سنة 2020 – حفلة عيد ميلاد", title_fr: "2020 – Anniversaire", title_es: "2020 – Cumpleaños", expression_en: "In 2020 I attended a birthday party", expression_ar: "في سنة 2020 حضرت حفلة عيد ميلاد صديقي", expression_fr: "En 2020 j'ai assisté à un anniversaire", expression_es: "En 2020 fui a un cumpleaños", imgUrl: "/public/memories/birthday_2020.png",   category: "Reminder Mee" },
  { title_en: "2021 – Park",     title_ar: "سنة 2021 – زيارة الحديقة",  title_fr: "2021 – Parc",       title_es: "2021 – Parque",     expression_en: "In 2021 I went to the park with my family", expression_ar: "في سنة 2021 ذهبت إلى الحديقة مع أسرتي", expression_fr: "En 2021 je suis allé au parc avec ma famille", expression_es: "En 2021 fui al parque con mi familia", imgUrl: "/public/memories/park_2021.png", category: "Reminder Mee" },
  { title_en: "2021 – School",   title_ar: "سنة 2021 – زيارة المدرسة",  title_fr: "2021 – École",      title_es: "2021 – Escuela",    expression_en: "In 2021 I visited the school",       expression_ar: "في سنة 2021 زرت المدرسة",               expression_fr: "En 2021 j'ai visité l'école",            expression_es: "En 2021 visité la escuela",        imgUrl: "/public/memories/school_2021.png",      category: "Reminder Mee" }
];

export const neighboursSubIcons = [
  { title_en: "Thank Ali & Fatma", title_ar: "شكر علي وفاطمة",        title_fr: "Remercier Ali et Fatma",    title_es: "Agradecer a Ali y Fatma",    expression_en: "I want to thank Ali and Fatma",   expression_ar: "أريد شكر علي وفاطمة من الجيران",    expression_fr: "Je veux remercier Ali et Fatma",   expression_es: "Quiero agradecer a Ali y Fatma",   imgUrl: "/public/Neighbours/ali_fatma_thank.png",   category: "Neighbours" },
  { title_en: "Neighbour Mona",    title_ar: "جارتنا منى",             title_fr: "Notre voisine Mona",        title_es: "Nuestra vecina Mona",        expression_en: "I want to talk to our neighbour Mona", expression_ar: "أريد التحدث إلى جارتنا منى",  expression_fr: "Je veux parler à notre voisine Mona", expression_es: "Quiero hablar con nuestra vecina Mona", imgUrl: "/public/Neighbours/mona.png",          category: "Neighbours" },
  { title_en: "Play Salem & Hind", title_ar: "لعب مع سالم وهند",       title_fr: "Jouer avec Salem et Hind",  title_es: "Jugar con Salem y Hind",     expression_en: "I want to play with Salem and Hind", expression_ar: "أريد اللعب مع سالم وهند من الجيران", expression_fr: "Je veux jouer avec Salem et Hind", expression_es: "Quiero jugar con Salem y Hind",   imgUrl: "/public/Neighbours/salem_hind_play.png",   category: "Neighbours" },
  { title_en: "Visit Khaled",      title_ar: "زيارة جاري خالد",        title_fr: "Rendre visite à Khaled",    title_es: "Visitar a Khaled",           expression_en: "I want to visit my neighbour Khaled", expression_ar: "أريد زيارة جاري خالد",       expression_fr: "Je veux rendre visite à Khaled",   expression_es: "Quiero visitar a Khaled",          imgUrl: "/public/Neighbours/khaled_visit.png",      category: "Neighbours" },
  { title_en: "Thank Youssef & Layla", title_ar: "شكر يوسف وليلى",    title_fr: "Remercier Youssef et Layla", title_es: "Agradecer a Youssef y Layla", expression_en: "I want to thank Youssef and Layla", expression_ar: "أريد شكر يوسف وليلى من الجيران", expression_fr: "Je veux remercier Youssef et Layla", expression_es: "Quiero agradecer a Youssef y Layla", imgUrl: "/public/Neighbours/youssef_lyla_thank.png", category: "Neighbours" },
  { title_en: "Play with Sara",    title_ar: "لعب مع جارتنا سارة",     title_fr: "Jouer avec Sara",           title_es: "Jugar con Sara",             expression_en: "I want to play with Sara",        expression_ar: "أريد اللعب مع جارتنا سارة",        expression_fr: "Je veux jouer avec Sara",           expression_es: "Quiero jugar con Sara",            imgUrl: "/public/Neighbours/sara_play.png",         category: "Neighbours" },
  { title_en: "Help from Amr",     title_ar: "طلب مساعدة من جاري عمرو", title_fr: "Aide d'Amr",              title_es: "Ayuda de Amr",               expression_en: "I need help from my neighbour Amr", expression_ar: "أحتاج مساعدة من جاري عمرو",      expression_fr: "J'ai besoin de l'aide d'Amr",      expression_es: "Necesito ayuda de Amr",            imgUrl: "/public/Neighbours/amr_help.png",          category: "Neighbours" }
];
export const friendsSubIcons = [
  {
    title_en: "Ahmed",
    title_ar: "أحمد",
    title_fr: "Ahmed",
    title_es: "Ahmed",
    expression_en: "Ahmed, my best friend from school",
    expression_ar: " أحمد، أعز أصدقائي من المدرسة",
    expression_fr: "Ahmed, mon meilleur ami d'école",
    expression_es: "Ahmed, mi mejor amigo de la escuela",
    imgUrl: "/public/Family/ahmed.png",
    category: "Friends"
  },
  {
    title_en: "Mohamed",
    title_ar: "محمد",
    title_fr: "Mohamed",
    title_es: "Mohamed",
    expression_en: "Mohamed, a close friend I haven't seen in a while",
    expression_ar: " محمد، صديق قريب من زمان لا اراه",
    expression_fr: "Mohamed, un ami proche que je n'ai pas vu depuis longtemps",
    expression_es: "Mohamed, un amigo cercano que no veo hace tiempo",
    imgUrl: "/public/Family/mohamed.png",
    category: "Friends"
  },
  {
    title_en: "Sara",
    title_ar: "سارة",
    title_fr: "Sara",
    title_es: "Sara",
    expression_en: "Sara, my childhood friend",
    expression_ar: "سارة, صديقة الطفولة",
    expression_fr: "Sara, mon amie d'enfance",
    expression_es: "Sara, mi amiga de la infancia",
    imgUrl: "/public/Family/sara.png",
    category: "Friends"
  },
  {
    title_en: "Mona",
    title_ar: "منى",
    title_fr: "Mona",
    title_es: "Mona",
    expression_en: "Mona, a kind friend who always helps me",
    expression_ar: " Mona, صديقة طيبة دايمًا بتساعدني",
    expression_fr: "Mona, une amie gentille qui m'aide toujours",
    expression_es: "Mona, una amiga amable que siempre me ayuda",
    imgUrl: "/public/Family/mona.png",
    category: "Friends"
  },
  {
    title_en: "Omar",
    title_ar: "عمر",
    title_fr: "Omar",
    title_es: "Omar",
    expression_en: "Omar, my old friend from neighborhood",
    expression_ar: " Omar, my old friend from neighborhood",
    expression_fr: "Omar, mon ancien ami du quartier",
    expression_es: "Omar, mi antiguo amigo del barrio",
    imgUrl: "/public/Family/omar.png",
    category: "Friends"
  },
  {
    title_en: "Youssef",
    title_ar: "يوسف",
    title_fr: "Youssef",
    title_es: "Youssef",
    expression_en: "Youssef, my best friend from childhood",
    expression_ar: " يوسف، أعز أصدقائي من الطفولة",
    expression_fr: "Youssef, mon meilleur ami d'enfance",
    expression_es: "Youssef, mi mejor amigo de la infancia",
    imgUrl: "/public/Family/youssef.png",
    category: "Friends"
  },
  {
    title_en: "Laila",
    title_ar: "ليلى",
    title_fr: "Laila",
    title_es: "Laila",
    expression_en: "Laila, a very close friend",
    expression_ar: " ليلى، صديقة قريبة جدًا",
    expression_fr: "Laila, une amie très proche",
    expression_es: "Laila, una amiga muy cercana",
    imgUrl: "/public/Family/laila.png",
    category: "Friends"
  },
  {
    title_en: "Hassan",
    title_ar: "حسن",
    title_fr: "Hassan",
    title_es: "Hassan",
    expression_en: "Hassan, a loyal friend I trust",
    expression_ar: " حسن، صديق وفي باثق فيه",
    expression_fr: "Hassan, un ami loyal en qui j'ai confiance",
    expression_es: "Hassan, un amigo leal en quien confío",
    imgUrl: "/public/Family/hassan.png",
    category: "Friends"
  },
  {
    title_en: "Nour",
    title_ar: "نور",
    title_fr: "Nour",
    title_es: "Nour",
    expression_en: " Nour, a cheerful friend who makes me happy",
    expression_ar: " نور، صديق بيخليني سعيد",
    expression_fr: " Nour, un ami joyeux qui me rend heureux",
    expression_es: "Nour, un amigo alegre que me hace feliz",
    imgUrl: "/public/Family/nour.png",
    category: "Friends"
  },
  {
    title_en: "Karim",
    title_ar: "كريم",
    title_fr: "Karim",
    title_es: "Karim",
    expression_en: "Karim, a friend I grew up with",
    expression_ar: " كريم، صديق كبرت معاه",
    expression_fr: "Karim, un ami avec qui j'ai grandi",
    expression_es: "Karim, un amigo con el que crecí",
    imgUrl: "/public/Family/karim.png",
    category: "Friends"
  }
];
export const economicSubIcons = [
  {
    title_en: "Primary Sector",
    title_ar: "القطاع الأولي",
    title_fr: "Secteur primaire",
    title_es: "Sector primario",
    expression_en: "I want to work in primary sector",
    expression_ar: "أريد العمل في القطاع الأولي",
    expression_fr: "Je veux travailler dans le secteur primaire",
    expression_es: "Quiero trabajar en el sector primario",
    imgUrl: "/public/economic/primary.png",
    category: "work",
  },

  {
    title_en: "Secondary Sector",
    title_ar: "القطاع الثانوي",
    title_fr: "Secteur secondaire",
    title_es: "Sector secundario",
    expression_en: "I want to work in secondary sector",
    expression_ar: "أريد العمل في القطاع الثانوي",
    expression_fr: "Je veux travailler dans le secteur secondaire",
    expression_es: "Quiero trabajar en el sector secundario",
    imgUrl: "/public/economic/secondary.png",
    category: "work",
  },

  {
    title_en: "Tertiary Sector",
    title_ar: "القطاع الثالثي",
    title_fr: "Secteur tertiaire",
    title_es: "Sector terciario",
    expression_en: "I want to work in tertiary sector",
    expression_ar: "أريد العمل في القطاع الثالثي",
    expression_fr: "Je veux travailler dans le secteur tertiaire",
    expression_es: "Quiero trabajar en el sector terciario",
    imgUrl: "/public/economic/tertiary.png",
    category: "work",
  },

  {
    title_en: "Profession",
    title_ar: "مهنة",
    title_fr: "Profession",
    title_es: "Profesión",
    expression_en: "I want a job",
    expression_ar: "أريد وظيفة",
    expression_fr: "Je veux un emploi",
    expression_es: "Quiero un trabajo",
    imgUrl: "/public/economic/job.png",
    category: "work",
  }
];