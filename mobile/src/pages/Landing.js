import React, { useRef, useEffect, useState,useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext } from "../context/AppContext"; // ربط بالـ context
import { themes } from "../theme/theme"; // استيراد themes

/* =====================
   Responsive
===================== */
const { width } = Dimensions.get("window");
const isTablet = width > 600;
const numColumns = isTablet ? 3 : 2;

/* =====================
   Data
===================== */
 const images = {
  communication: require("../assets/communication.jpg"),
  library: require("../assets/R.jpg"),
  simple: require("../assets/OIP.jpg"),

  autism: require("../assets/autism.jpg"),
  cerebral: require("../assets/cerebral palsy.jpg"),
  elderly: require("../assets/Elderly.jpg"),
  emergency: require("../assets/emergency.jpg"),
  learning: require("../assets/Learning.jpg"),
  reading: require("../assets/beginning to read.jpg"),
  tourist: require("../assets/Tourist .jpg"),
  everyone: require("../assets/everyone.jpg"),
};
const texts = {
  en: {
    home: "Home",
    features: "Features",
    users: "Users",
    about: "About",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome",

    heroTitle: "Communication For Everyone.",
    heroDesc:
      "Voxi helps individuals with communication challenges such as Alzheimer’s, stroke, autism, or speech difficulties express their thoughts clearly and confidently.",
    startBtn: "Start with Voxi →",

    featuresTitle: "Features",
    feature1: {
      title: "Easy Communication",
      desc: "Express needs and feelings through intuitive visual icons.",
      image: images.communication,
    },
    feature2: {
      title: "Large Icon Library",
      desc: "Hundreds of categorized icons for daily life communication.",
      image: images.library,
    },
    feature3: {
      title: "Fast & Simple",
      desc: "Clean interface designed for seniors and kids.",
      image: images.simple,
    },

    usersTitle: "Who Can Use Voxi?",
    usersList: [
      {
        image: images.autism,
        title: "Children with Special Needs",
        desc: "For children with autism, intellectual disability, Down syndrome, hearing impairment...",
      },
      {
        image: images.cerebral,
        title: "Children & Adults with Severe Physical Difficulties",
        desc: "For people with cerebral palsy, head trauma, or stroke...",
      },
      {
        image: images.elderly,
        title: "Elderly People",
        desc: "Cognitive impairments from aphasia, Alzheimer, dementia...",
      },
      {
        image: images.emergency,
        title: "Emergency or Sanitary Situations",
        desc: "When patients are intubated or can't speak...",
      },
      {
        image: images.learning,
        title: "Children Beginning to Read",
        desc: "Symbols help children decode written text...",
      },
      {
        image: images.reading,
        title: "Learning a Second Language",
        desc: "Visual supports help native and non-native speakers...",
      },
      {
        image: images.tourist,
        title: "Tourists & Visitors",
        desc: "Symbols facilitate access to culture and shops...",
      },
      {
        image: images.everyone,
        title: "For Everyone",
        desc: "Visual aids help anyone navigate unknown places...",
      },
    ],

    aboutTitle: "About Voxi",
    aboutDesc1:
      "Voxi is built to make communication smooth, accessible, and human-centered.",
    aboutDesc2:
      "Whether it's emotions, needs, or everyday activities—Voxi helps bridge the communication gap.",
    footer: "© 2025 Voxi — Communication For Everyone",
  },
  ar: {
  home: "الرئيسية",
  features: "المميزات",
  users: "المستخدمون",
  about: "عن Voxi",
  settings: "الإعدادات",
  logout: "تسجيل الخروج",
  welcome: "مرحبًا",

  heroTitle: "التواصل للجميع.",
  heroDesc:
    "يساعد Voxi الأشخاص الذين يعانون من صعوبات في التواصل مثل الزهايمر، الجلطات، التوحد أو مشاكل النطق على التعبير عن أفكارهم بثقة ووضوح.",
  startBtn: "ابدأ مع Voxi →",

  featuresTitle: "المميزات",
  feature1: {
    title: "تواصل سهل",
    desc: "التعبير عن الاحتياجات والمشاعر باستخدام أيقونات مرئية سهلة وبديهية.",
    image: images.communication,
  },
  feature2: {
    title: "مكتبة أيقونات كبيرة",
    desc: "مئات الأيقونات المصنفة لتسهيل التواصل اليومي.",
    image: images.library,
  },
  feature3: {
    title: "سريع وبسيط",
    desc: "واجهة نظيفة وبسيطة مناسبة لكبار السن والأطفال.",
    image: images.simple,
  },

  usersTitle: "من يمكنه استخدام Voxi؟",
  usersList: [
    {
      image: images.autism,
      title: "الأطفال ذوو الاحتياجات الخاصة",
      desc: "للأطفال المصابين بالتوحد، الإعاقات الذهنية، متلازمة داون أو ضعف السمع...",
    },
    {
      image: images.cerebral,
      title: "الأطفال والبالغون ذوو الإعاقات الحركية الشديدة",
      desc: "للأشخاص المصابين بالشلل الدماغي، إصابات الرأس أو الجلطات...",
    },
    {
      image: images.elderly,
      title: "كبار السن",
      desc: "اضطرابات معرفية مثل الحبسة الكلامية، الزهايمر أو الخرف...",
    },
    {
      image: images.emergency,
      title: "حالات الطوارئ أو الحالات الصحية",
      desc: "عندما يكون المرضى غير قادرين على الكلام أو موصولين بأجهزة...",
    },
    {
      image: images.learning,
      title: "الأطفال في بداية تعلم القراءة",
      desc: "الرموز تساعد الأطفال على فهم النصوص المكتوبة بسهولة...",
    },
    {
      image: images.reading,
      title: "تعلم لغة ثانية",
      desc: "الدعم البصري يساعد المتعلمين من مختلف اللغات...",
    },
    {
      image: images.tourist,
      title: "السياح والزوار",
      desc: "الرموز تسهّل الوصول إلى الأماكن والثقافات المختلفة...",
    },
    {
      image: images.everyone,
      title: "للجميع",
      desc: "المساعدات البصرية تفيد أي شخص في أماكن أو مواقف غير مألوفة...",
    },
  ],

  aboutTitle: "عن Voxi",
  aboutDesc1:
    "تم تصميم Voxi لجعل التواصل أكثر سهولة وشمولية وملائمًا للجميع.",
  aboutDesc2:
    "سواء كانت مشاعر، احتياجات أو أنشطة يومية — يساعد Voxi على سد فجوة التواصل.",
  footer: "© 2025 Voxi — التواصل للجميع",
},
fr: {
  home: "Accueil",
  features: "Fonctionnalités",
  users: "Utilisateurs",
  about: "À propos",
  settings: "Paramètres",
  logout: "Déconnexion",
  welcome: "Bienvenue",

  heroTitle: "La communication pour tous.",
  heroDesc:
    "Voxi aide les personnes ayant des difficultés de communication telles que la maladie d’Alzheimer, les AVC, l’autisme ou les troubles de la parole à exprimer leurs pensées clairement et en toute confiance.",
  startBtn: "Commencer avec Voxi →",

  featuresTitle: "Fonctionnalités",
  feature1: {
    title: "Communication facile",
    desc: "Exprimez vos besoins et vos émotions grâce à des icônes visuelles intuitives.",
    image: images.communication,
  },
  feature2: {
    title: "Grande bibliothèque d’icônes",
    desc: "Des centaines d’icônes classées pour la communication quotidienne.",
    image: images.library,
  },
  feature3: {
    title: "Rapide et simple",
    desc: "Interface claire conçue pour les personnes âgées et les enfants.",
    image: images.simple,
  },

  usersTitle: "Qui peut utiliser Voxi ?",
  usersList: [
    {
      image: images.autism,
      title: "Enfants ayant des besoins spécifiques",
      desc: "Pour les enfants atteints d’autisme, de handicap intellectuel, du syndrome de Down ou de déficience auditive...",
    },
    {
      image: images.cerebral,
      title: "Enfants et adultes avec des difficultés physiques sévères",
      desc: "Pour les personnes atteintes de paralysie cérébrale, de traumatismes crâniens ou d’AVC...",
    },
    {
      image: images.elderly,
      title: "Personnes âgées",
      desc: "Troubles cognitifs liés à l’aphasie, à la maladie d’Alzheimer ou à la démence...",
    },
    {
      image: images.emergency,
      title: "Situations d’urgence ou médicales",
      desc: "Lorsque les patients sont intubés ou incapables de parler...",
    },
    {
      image: images.learning,
      title: "Enfants qui commencent à lire",
      desc: "Les symboles aident les enfants à décoder et comprendre le texte écrit...",
    },
    {
      image: images.reading,
      title: "Apprentissage d’une langue étrangère",
      desc: "Les supports visuels aident les locuteurs natifs et non natifs...",
    },
    {
      image: images.tourist,
      title: "Touristes et visiteurs",
      desc: "Les symboles facilitent l’accès à la culture et aux commerces...",
    },
    {
      image: images.everyone,
      title: "Pour tous",
      desc: "Les aides visuelles aident chacun à s’orienter dans des lieux inconnus...",
    },
  ],

  aboutTitle: "À propos de Voxi",
  aboutDesc1:
    "Voxi est conçu pour rendre la communication fluide, accessible et centrée sur l’humain.",
  aboutDesc2:
    "Qu’il s’agisse d’émotions, de besoins ou d’activités quotidiennes — Voxi aide à combler le fossé de la communication.",
  footer: "© 2025 Voxi — La communication pour tous",
},
es: {
  home: "Inicio",
  features: "Características",
  users: "Usuarios",
  about: "Acerca de",
  settings: "Configuración",
  logout: "Cerrar sesión",
  welcome: "Bienvenido",

  heroTitle: "Comunicación para todos.",
  heroDesc:
    "Voxi ayuda a las personas con dificultades de comunicación como Alzheimer, accidentes cerebrovasculares, autismo o problemas del habla a expresar sus pensamientos de manera clara y segura.",
  startBtn: "Comienza con Voxi →",

  featuresTitle: "Características",
  feature1: {
    title: "Comunicación fácil",
    desc: "Expresa necesidades y sentimientos mediante iconos visuales intuitivos.",
    image: images.communication,
  },
  feature2: {
    title: "Gran biblioteca de iconos",
    desc: "Cientos de iconos categorizados para la comunicación diaria.",
    image: images.library,
  },
  feature3: {
    title: "Rápido y simple",
    desc: "Interfaz limpia diseñada para personas mayores y niños.",
    image: images.simple,
  },

  usersTitle: "¿Quién puede usar Voxi?",
  usersList: [
    {
      image: images.autism,
      title: "Niños con necesidades especiales",
      desc: "Para niños con autismo, discapacidad intelectual, síndrome de Down o discapacidad auditiva...",
    },
    {
      image: images.cerebral,
      title: "Niños y adultos con dificultades físicas graves",
      desc: "Para personas con parálisis cerebral, traumatismos craneales o accidentes cerebrovasculares...",
    },
    {
      image: images.elderly,
      title: "Personas mayores",
      desc: "Deterioros cognitivos debidos a afasia, Alzheimer o demencia...",
    },
    {
      image: images.emergency,
      title: "Situaciones de emergencia o sanitarias",
      desc: "Cuando los pacientes están intubados o no pueden hablar...",
    },
    {
      image: images.learning,
      title: "Niños que comienzan a leer",
      desc: "Los símbolos ayudan a los niños a decodificar el texto escrito...",
    },
    {
      image: images.reading,
      title: "Aprendizaje de un segundo idioma",
      desc: "Los apoyos visuales ayudan a hablantes nativos y no nativos...",
    },
    {
      image: images.tourist,
      title: "Turistas y visitantes",
      desc: "Los símbolos facilitan el acceso a la cultura y a las tiendas...",
    },
    {
      image: images.everyone,
      title: "Para todos",
      desc: "Las ayudas visuales ayudan a cualquiera a orientarse en lugares desconocidos...",
    },
  ],

  aboutTitle: "Acerca de Voxi",
  aboutDesc1:
    "Voxi está diseñado para hacer la comunicación fluida, accesible y centrada en las personas.",
  aboutDesc2:
    "Ya sean emociones, necesidades o actividades diarias — Voxi ayuda a cerrar la brecha de comunicación.",
  footer: "© 2025 Voxi — Comunicación para todos",
},

};


/* =====================
   Component
===================== */
export default function Landing() {
   const navigation = useNavigation();
  const { theme, language } = useContext(AppContext);

  const currentTheme = themes[theme]; // اللون الحالي حسب theme
  const t = texts[language];
  const features = [t.feature1, t.feature2, t.feature3];
  const users = t.usersList;


// ===== refs لكل section =====
  const scrollRef = useRef();
  const featuresRef = useRef();
  const usersRef = useRef();
  const aboutRef = useRef();

 
  // ===== fetch user from AsyncStorage =====
  const [userName, setUserName] = useState("");
 const [sectionPositions, setSectionPositions] = useState({});


useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("loggedInUser");
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.firstName); // <-- هنا بيخزن الاسم صح
      }
    } catch (error) {
      console.log("Error reading user:", error);
    }
  };
  fetchUser();
}, []);

  const scrollToSection = (section) => {
    if (sectionPositions[section] !== undefined) {
      scrollRef.current.scrollTo({
        y: sectionPositions[section],
        animated: true,
      });
    }
  };
  return(

 <View  key={language} style={{ flex: 1, backgroundColor: currentTheme.background }}>
  <View
    style={[
      styles.navbar,
      {
        backgroundColor: currentTheme.header, // لون الخلفية حسب theme
        borderColor: currentTheme.card,       // لون الحد السفلي
      },
    ]}
  >
     <Text style={[styles.logo, { color: currentTheme.text }]}>Voxi</Text>

  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View style={styles.navLinks}>
      <TouchableOpacity onPress={() => scrollToSection("features")}>
        <Text style={[styles.navText, { color: currentTheme.text }]}>{t.features}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => scrollToSection("users")}>
        <Text style={[styles.navText, { color: currentTheme.text }]}>{t.users}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => scrollToSection("about")}>
        <Text style={[styles.navText, { color: currentTheme.text }]}>{t.about}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
        <Text style={[styles.navText, { color: currentTheme.text }]}>{t.settings}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={[styles.logout]}>{t.logout}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
  <Text style={[styles.welcomeText, { color: currentTheme.text }]}>
    {t.welcome}, {userName || "Guest"}
  </Text>
</TouchableOpacity>
    </View>
  </ScrollView>
</View>
   {/* ===== SCROLLVIEW ===== */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* HERO */}
        <View style={[styles.hero, { backgroundColor: currentTheme.background }]}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            {t.heroTitle}
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.text }]}>
            {t.heroDesc}
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: currentTheme.link }]}
             onPress={() => navigation.navigate("Category")}
          >
            <Text style={styles.buttonText}>{t.startBtn}</Text>
          </TouchableOpacity>
        </View>

        {/* FEATURES */}
        <View
          ref={featuresRef}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setSectionPositions((prev) => ({ ...prev, features: y }));
          }}
        >
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            {t.featuresTitle}
          </Text>
          <View style={styles.featuresRow}>
            {features.map((item, index) => (
              <View key={index} style={styles.featureCard}>
                <Image source={item.image} style={styles.featureImage} />
                <Text style={[styles.cardTitle, { color: currentTheme.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.cardDesc, { color: currentTheme.text }]}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* USERS */}
        <View
          ref={usersRef}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setSectionPositions((prev) => ({ ...prev, users: y }));
          }}
        >
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            {t.usersTitle}
          </Text>
          <FlatList
            data={users}
            numColumns={numColumns}
            scrollEnabled={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.userCard}>
                <Image source={item.image} style={styles.userImage} />
                <Text style={[styles.cardTitle, { color: currentTheme.text }]}>
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>

        {/* ABOUT */}
        <View
          ref={aboutRef}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setSectionPositions((prev) => ({ ...prev, about: y }));
          }}
        >
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            {t.aboutTitle}
          </Text>
          <Text style={[styles.aboutText, { color: currentTheme.text }]}>
            {t.aboutDesc1}
          </Text>
          <Text style={[styles.aboutText, { color: currentTheme.text }]}>
            {t.aboutDesc2}
          </Text>
        </View>

        {/* FOOTER */}
        <Text style={[styles.footer, { color: currentTheme.text }]}>{t.footer}</Text>
      </ScrollView>
    </View>
  );}
/*=====================
   Styles
===================== */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
navbar: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderColor: "#eee",
  zIndex: 100,
},

logo: {
  fontSize: isTablet ? 24 : 20,
  fontWeight: "bold",
},

navLinksContainer: {
  flex: 1,
  marginLeft: 10,
},

navLinksScroll: {
  flexDirection: "row",
},

navText: {
  fontSize: isTablet ? 16 : 14,
  marginRight: 15, // بدل gap
},

logout: {
  fontSize: isTablet ? 16 : 14,
  color: "red",
  marginLeft: 10,
},

welcomeText: {
  fontSize: isTablet ? 16 : 14,
  fontWeight: "500",
},

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    zIndex: 100, 
  },

  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },

  navLinks: {
    flexDirection: "row",
    gap: 20,
  },

  navText: {
    fontSize: 16,
  },

  logout: {
    fontSize: 16,
    color: "red",
  },

  hero: {
    paddingHorizontal: isTablet ? 80 : 20,
    paddingVertical: 40,
  },

  title: {
    fontSize: isTablet ? 48 : 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: isTablet ? 18 : 14,
    color: "#555",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: isTablet ? 28 : 22,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },

  featuresRow: {
    flexDirection: isTablet ? "row" : "column",
    paddingHorizontal: 15,
  },

  featureCard: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },

  featureImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },

  userCard: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },

  userImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },

  cardDesc: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },

  about: {
    padding: 20,
  },

  aboutText: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
  },

  footer: {
    textAlign: "center",
    color: "#999",
    marginTop: 60,
  },
});

