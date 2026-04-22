export const chatbotDefaultReplies = {
  en: [
    "I can help with feelings, food, water, pain, toilet, sleep, school, family, transport, medicine, and short phrases.",
    "Try a short sentence like: I am sad, I need water, my head hurts, I want to rest, or help me talk.",
    "Tell me one topic: feeling, food, drink, pain, toilet, sleep, family, school, doctor, transport, or emergency.",
  ],
  ar: [
    "أقدر أساعدك في المشاعر والأكل والماء والألم والحمام والنوم والمدرسة والعائلة والمواصلات والدواء والجمل القصيرة.",
    "جرب جملة قصيرة مثل: أنا زعلان، أنا محتاج مية، رأسي تؤلمني، أنا عايز أرتاح، أو ساعدني أتكلم.",
    "قل لي موضوعا واحدا: شعور، أكل، شرب، ألم، حمام، نوم، عائلة، مدرسة، دكتور، مواصلات، أو طوارئ.",
  ],
  fr: [
    "Je peux aider pour les emotions, la nourriture, l'eau, la douleur, les toilettes, le sommeil, l'ecole, la famille, le transport, les medicaments, et de petites phrases.",
    "Essaie une phrase courte: je suis triste, j'ai besoin d'eau, j'ai mal a la tete, je veux me reposer, ou aide-moi a parler.",
    "Dis-moi un seul sujet: emotion, nourriture, boisson, douleur, toilettes, sommeil, famille, ecole, medecin, transport, ou urgence.",
  ],
  es: [
    "Puedo ayudar con emociones, comida, agua, dolor, bano, sueno, escuela, familia, transporte, medicina y frases cortas.",
    "Prueba una frase corta: estoy triste, necesito agua, me duele la cabeza, quiero descansar, o ayudame a hablar.",
    "Dime un tema: emocion, comida, bebida, dolor, bano, sueno, familia, escuela, doctor, transporte o emergencia.",
  ],
};

export const chatbotKnowledgeBase = [
  {
    id: "greeting",
    phrases: {
      en: ["hello", "hi", "hey", "good morning", "good evening"],
      ar: ["مرحبا", "اهلا", "السلام عليكم", "صباح الخير", "مساء الخير", "mar7aba", "salam"],
      fr: ["bonjour", "salut", "coucou", "bonsoir"],
      es: ["hola", "buenos dias", "buenas tardes", "buenas noches"],
    },
    responses: {
      en: [
        "Hello. I am here with you. Tell me what you need.",
        "Hi. We can talk about feelings, food, pain, school, or daily needs.",
        "Hello. Type a feeling, a need, or a short message you want to say.",
      ],
      ar: [
        "أهلا. أنا معك. قل لي ماذا تحتاج.",
        "مرحبا. يمكننا التحدث عن المشاعر أو الأكل أو الألم أو الاحتياجات اليومية.",
        "أهلا. اكتب شعورا أو احتياجا أو رسالة قصيرة تريد قولها.",
      ],
      fr: [
        "Bonjour. Je suis avec toi. Dis-moi ce dont tu as besoin.",
        "Salut. Nous pouvons parler des emotions, de la nourriture, de la douleur, de l'ecole, ou des besoins quotidiens.",
        "Bonjour. Ecris une emotion, un besoin, ou un petit message a dire.",
      ],
      es: [
        "Hola. Estoy contigo. Dime que necesitas.",
        "Hola. Podemos hablar de emociones, comida, dolor, escuela o necesidades diarias.",
        "Escribe una emocion, una necesidad o un mensaje corto que quieras decir.",
      ],
    },
  },
  {
    id: "help",
    phrases: {
      en: ["help", "help me", "can you help", "what can you do", "i need help"],
      ar: ["ساعدني", "محتاج مساعدة", "عايز مساعدة", "ممكن تساعدني", "بتعمل ايه", "sa3dni", "m7tag mosa3da"],
      fr: ["aide moi", "j ai besoin d aide", "peux tu m aider", "que peux tu faire"],
      es: ["ayudame", "necesito ayuda", "puedes ayudarme", "que puedes hacer"],
    },
    responses: {
      en: [
        "I can help you express a need, describe a feeling, or suggest a simple phrase to say.",
        "Tell me the topic and I will try to help. For example: food, pain, school, family, or doctor.",
        "I can suggest short messages like: I need help, I need water, I feel sad, or I want to rest.",
      ],
      ar: [
        "أقدر أساعدك في التعبير عن احتياج أو شعور أو اقتراح جملة بسيطة تقولها.",
        "قل لي الموضوع وسأحاول المساعدة. مثلا: أكل، ألم، مدرسة، عائلة، أو دكتور.",
        "أقدر أقترح رسائل قصيرة مثل: أنا محتاج مساعدة، أنا محتاج مية، أنا زعلان، أو أنا عايز أرتاح.",
      ],
      fr: [
        "Je peux t'aider a exprimer un besoin, decrire une emotion, ou proposer une phrase simple.",
        "Dis-moi le sujet et j'essaierai d'aider. Par exemple: nourriture, douleur, ecole, famille, ou medecin.",
        "Je peux proposer de petites phrases comme: j'ai besoin d'aide, j'ai besoin d'eau, je suis triste, ou je veux me reposer.",
      ],
      es: [
        "Puedo ayudarte a expresar una necesidad, describir una emocion o sugerir una frase simple.",
        "Dime el tema y tratare de ayudar. Por ejemplo: comida, dolor, escuela, familia o doctor.",
        "Puedo sugerir frases cortas como: necesito ayuda, necesito agua, estoy triste o quiero descansar.",
      ],
    },
  },
  {
    id: "sadness",
    phrases: {
      en: ["i am sad", "sad", "upset", "cry", "i feel lonely"],
      ar: ["انا زعلان", "حزين", "مضايق", "عايز اعيط", "حاسس اني لوحدي", "za3lan", "7azin"],
      fr: ["je suis triste", "triste", "je veux pleurer", "je me sens seul"],
      es: ["estoy triste", "triste", "quiero llorar", "me siento solo"],
    },
    responses: {
      en: [
        "I am sorry you feel sad. You can say: I need comfort, I want to talk, or please stay with me.",
        "You can tell someone: I feel sad and I need support.",
        "Take a slow breath. A simple message is: I am sad. Please help me.",
      ],
      ar: [
        "آسف لأنك تشعر بالحزن. يمكنك أن تقول: أنا محتاج دعم، أنا عايز أتكلم، أو من فضلك ابق معي.",
        "ممكن تقول لشخص: أنا زعلان ومحتاج مساندة.",
        "خذ نفسا هادئا. جملة بسيطة هي: أنا زعلان. من فضلك ساعدني.",
      ],
      fr: [
        "Je suis desole que tu sois triste. Tu peux dire: j'ai besoin de soutien, je veux parler, ou reste avec moi s'il te plait.",
        "Tu peux dire a quelqu'un: je suis triste et j'ai besoin d'aide.",
        "Respire doucement. Une phrase simple est: je suis triste. Aide-moi s'il te plait.",
      ],
      es: [
        "Siento que te sientas triste. Puedes decir: necesito apoyo, quiero hablar, o por favor quedate conmigo.",
        "Puedes decirle a alguien: estoy triste y necesito ayuda.",
        "Respira despacio. Una frase simple es: estoy triste. Por favor ayudame.",
      ],
    },
  },
  {
    id: "anger",
    phrases: {
      en: ["i am angry", "angry", "mad", "annoyed", "frustrated"],
      ar: ["انا متعصب", "غضبان", "متضايق جدا", "متنرفز", "مقهور", "3asban", "mtnarvez"],
      fr: ["je suis en colere", "en colere", "fache", "frustre"],
      es: ["estoy enojado", "enojado", "molesto", "frustrado"],
    },
    responses: {
      en: [
        "I understand. You can say: I am angry. I need a break.",
        "A calm message is: Please give me space. I will talk soon.",
        "You can ask for support with: I feel angry and I need help to calm down.",
      ],
      ar: [
        "فهمت. يمكنك أن تقول: أنا متعصب. أنا محتاج استراحة.",
        "رسالة هادئة هي: من فضلك اتركني قليلا. سأتكلم بعد قليل.",
        "ممكن تطلب دعما بهذه الجملة: أنا غضبان ومحتاج مساعدة لكي أهدأ.",
      ],
      fr: [
        "Je comprends. Tu peux dire: je suis en colere. J'ai besoin d'une pause.",
        "Un message calme est: laisse-moi un peu d'espace. Je parlerai bientot.",
        "Tu peux demander de l'aide avec: je me sens en colere et j'ai besoin d'aide pour me calmer.",
      ],
      es: [
        "Entiendo. Puedes decir: estoy enojado. Necesito un descanso.",
        "Un mensaje tranquilo es: por favor dame espacio. Hablare pronto.",
        "Puedes pedir apoyo con: me siento enojado y necesito ayuda para calmarme.",
      ],
    },
  },
  {
    id: "fear",
    phrases: {
      en: ["i am scared", "scared", "afraid", "nervous", "anxious"],
      ar: ["انا خايف", "خايف", "قلقان", "متوتر", "مرعوب", "5ayef", "2al2an"],
      fr: ["j ai peur", "peur", "anxieux", "nerveux"],
      es: ["tengo miedo", "miedo", "ansioso", "nervioso"],
    },
    responses: {
      en: [
        "I am sorry you feel scared. You can say: I am scared. Please stay with me.",
        "A simple message is: I feel nervous and I need reassurance.",
        "If you feel unsafe, say: I need help now.",
      ],
      ar: [
        "آسف لأنك تشعر بالخوف. يمكنك أن تقول: أنا خايف. من فضلك ابق معي.",
        "جملة بسيطة هي: أنا متوتر ومحتاج طمأنة.",
        "لو كنت تشعر بعدم الأمان فقل: أنا محتاج مساعدة الآن.",
      ],
      fr: [
        "Je suis desole que tu aies peur. Tu peux dire: j'ai peur. Reste avec moi s'il te plait.",
        "Une phrase simple est: je suis nerveux et j'ai besoin d'etre rassure.",
        "Si tu ne te sens pas en securite, dis: j'ai besoin d'aide maintenant.",
      ],
      es: [
        "Siento que tengas miedo. Puedes decir: tengo miedo. Por favor quedate conmigo.",
        "Una frase simple es: me siento nervioso y necesito tranquilidad.",
        "Si no te sientes seguro, di: necesito ayuda ahora.",
      ],
    },
  },
  {
    id: "happy",
    phrases: {
      en: ["i am happy", "happy", "excited", "good news", "i feel good"],
      ar: ["انا مبسوط", "فرحان", "متحمس", "عندي خبر حلو", "حاسس كويس", "mabsoot", "far7an"],
      fr: ["je suis content", "heureux", "excite", "je me sens bien"],
      es: ["estoy feliz", "feliz", "emocionado", "me siento bien"],
    },
    responses: {
      en: [
        "That is nice to hear. You can say: I am happy today.",
        "Wonderful. A simple phrase is: I feel good and I want to share it.",
        "I am glad. You can tell someone: I am excited and happy.",
      ],
      ar: [
        "هذا جميل. يمكنك أن تقول: أنا مبسوط اليوم.",
        "رائع. جملة بسيطة هي: أنا حاسس كويس وعايز أشارك هذا.",
        "أنا سعيد بهذا. يمكنك أن تقول لشخص: أنا فرحان ومتحمس.",
      ],
      fr: [
        "C'est une bonne nouvelle. Tu peux dire: je suis content aujourd'hui.",
        "Formidable. Une phrase simple est: je me sens bien et je veux le partager.",
        "Je suis content pour toi. Tu peux dire: je suis heureux et excite.",
      ],
      es: [
        "Que bueno escuchar eso. Puedes decir: estoy feliz hoy.",
        "Excelente. Una frase simple es: me siento bien y quiero compartirlo.",
        "Me alegra. Puedes decirle a alguien: estoy feliz y emocionado.",
      ],
    },
  },
  {
    id: "tired",
    phrases: {
      en: ["i am tired", "tired", "exhausted", "low energy", "i need rest"],
      ar: ["انا تعبان", "تعبان", "مرهق", "محتاج راحة", "معنديش طاقة", "ta3ban", "m7tag ra7a"],
      fr: ["je suis fatigue", "fatigue", "epuise", "j ai besoin de repos"],
      es: ["estoy cansado", "cansado", "agotado", "necesito descansar"],
    },
    responses: {
      en: [
        "You can say: I am tired and I need to rest.",
        "A helpful message is: I need a break, please.",
        "Try this: I have low energy today. I want to rest.",
      ],
      ar: [
        "ممكن تقول: أنا تعبان ومحتاج أرتاح.",
        "رسالة مفيدة هي: أنا محتاج استراحة من فضلك.",
        "جرب هذه الجملة: طاقتي قليلة اليوم. أنا عايز أرتاح.",
      ],
      fr: [
        "Tu peux dire: je suis fatigue et j'ai besoin de repos.",
        "Un message utile est: j'ai besoin d'une pause s'il te plait.",
        "Essaie ceci: j'ai peu d'energie aujourd'hui. Je veux me reposer.",
      ],
      es: [
        "Puedes decir: estoy cansado y necesito descansar.",
        "Un mensaje util es: necesito un descanso, por favor.",
        "Prueba esto: tengo poca energia hoy. Quiero descansar.",
      ],
    },
  },
  {
    id: "pain",
    phrases: {
      en: ["pain", "it hurts", "my head hurts", "stomach hurts", "i am in pain"],
      ar: ["وجع", "عندي ألم", "رأسي بتوجعني", "بطني بتوجعني", "موجوع", "waga3", "2alam"],
      fr: ["douleur", "j ai mal", "j ai mal a la tete", "j ai mal au ventre"],
      es: ["dolor", "me duele", "me duele la cabeza", "me duele el estomago"],
    },
    responses: {
      en: [
        "You can say: I am in pain and I need help.",
        "A clear message is: My head hurts, or my stomach hurts.",
        "If the pain is strong, say: I need a doctor now.",
      ],
      ar: [
        "ممكن تقول: عندي ألم ومحتاج مساعدة.",
        "رسالة واضحة هي: رأسي تؤلمني، أو بطني تؤلمني.",
        "لو كان الألم شديدا فقل: أنا محتاج دكتور الآن.",
      ],
      fr: [
        "Tu peux dire: j'ai mal et j'ai besoin d'aide.",
        "Un message clair est: j'ai mal a la tete, ou j'ai mal au ventre.",
        "Si la douleur est forte, dis: j'ai besoin d'un medecin maintenant.",
      ],
      es: [
        "Puedes decir: tengo dolor y necesito ayuda.",
        "Un mensaje claro es: me duele la cabeza, o me duele el estomago.",
        "Si el dolor es fuerte, di: necesito un doctor ahora.",
      ],
    },
  },
  {
    id: "sickness",
    phrases: {
      en: ["i am sick", "sick", "fever", "cough", "nausea"],
      ar: ["انا مريض", "مريض", "عندي سخونية", "عندي كحة", "حاسس بغثيان", "marid", "so5onia"],
      fr: ["je suis malade", "malade", "fievre", "toux", "nausee"],
      es: ["estoy enfermo", "enfermo", "fiebre", "tos", "nauseas"],
    },
    responses: {
      en: [
        "You can say: I feel sick and I need care.",
        "A simple message is: I have fever, cough, or nausea.",
        "If you are not feeling well, you can ask: Please call the doctor.",
      ],
      ar: [
        "ممكن تقول: أنا مريض ومحتاج رعاية.",
        "جملة بسيطة هي: عندي سخونية أو كحة أو غثيان.",
        "لو كنت لست بخير فممكن تطلب: من فضلك اتصل بالدكتور.",
      ],
      fr: [
        "Tu peux dire: je me sens malade et j'ai besoin de soins.",
        "Une phrase simple est: j'ai de la fievre, de la toux, ou des nausees.",
        "Si tu ne te sens pas bien, tu peux demander: appelle le medecin s'il te plait.",
      ],
      es: [
        "Puedes decir: me siento enfermo y necesito cuidado.",
        "Una frase simple es: tengo fiebre, tos o nauseas.",
        "Si no te sientes bien, puedes pedir: por favor llama al doctor.",
      ],
    },
  },
  {
    id: "emergency",
    phrases: {
      en: ["emergency", "urgent", "call ambulance", "danger", "help now"],
      ar: ["طوارئ", "خطر", "اسعاف", "ساعدني حالا", "مشكلة عاجلة", "taware2", "5atar", "esa3af"],
      fr: ["urgence", "dangereux", "appelez une ambulance", "aide maintenant"],
      es: ["emergencia", "urgente", "llama una ambulancia", "peligro", "ayuda ahora"],
    },
    responses: {
      en: [
        "If this is urgent, contact emergency services or a trusted adult now.",
        "You can say: This is an emergency. I need help now.",
        "Please use the Emergency section immediately if someone is in danger.",
      ],
      ar: [
        "إذا كان الأمر عاجلا فاتصل بخدمة الطوارئ أو بشخص موثوق الآن.",
        "ممكن تقول: هذه حالة طوارئ. أنا محتاج مساعدة الآن.",
        "من فضلك استخدم قسم الطوارئ فورا إذا كان هناك خطر.",
      ],
      fr: [
        "Si c'est urgent, contacte les secours ou un adulte de confiance maintenant.",
        "Tu peux dire: c'est une urgence. J'ai besoin d'aide maintenant.",
        "Utilise tout de suite la section d'urgence si quelqu'un est en danger.",
      ],
      es: [
        "Si es urgente, contacta a emergencias o a un adulto de confianza ahora.",
        "Puedes decir: es una emergencia. Necesito ayuda ahora.",
        "Usa la seccion de emergencia de inmediato si alguien esta en peligro.",
      ],
    },
  },
  {
    id: "hunger",
    phrases: {
      en: ["i am hungry", "hungry", "i want food", "eat", "meal"],
      ar: ["انا جعان", "جعان", "عايز اكل", "محتاج اكل", "عايز وجبة", "ga3an", "3ayz akl"],
      fr: ["j ai faim", "faim", "je veux manger", "nourriture"],
      es: ["tengo hambre", "hambre", "quiero comer", "comida"],
    },
    responses: {
      en: [
        "You can say: I am hungry and I want food.",
        "A simple message is: I want to eat now.",
        "You can ask for a meal, a snack, or your favorite food.",
      ],
      ar: [
        "ممكن تقول: أنا جعان وعايز أكل.",
        "جملة بسيطة هي: أنا عايز آكل الآن.",
        "يمكنك أن تطلب وجبة أو سناكا أو أكلك المفضل.",
      ],
      fr: [
        "Tu peux dire: j'ai faim et je veux manger.",
        "Une phrase simple est: je veux manger maintenant.",
        "Tu peux demander un repas, un snack, ou ton aliment prefere.",
      ],
      es: [
        "Puedes decir: tengo hambre y quiero comida.",
        "Una frase simple es: quiero comer ahora.",
        "Puedes pedir una comida, un bocadillo o tu alimento favorito.",
      ],
    },
  },
  {
    id: "thirst",
    phrases: {
      en: ["i am thirsty", "thirsty", "i want water", "drink", "juice"],
      ar: ["انا عطشان", "عطشان", "عايز مية", "محتاج اشرب", "عايز عصير", "3atshan", "3ayz maya"],
      fr: ["j ai soif", "soif", "je veux de l eau", "boire", "jus"],
      es: ["tengo sed", "sed", "quiero agua", "beber", "jugo"],
    },
    responses: {
      en: [
        "You can say: I am thirsty and I need water.",
        "A short message is: I want a drink, please.",
        "You can ask for water, juice, or another drink.",
      ],
      ar: [
        "ممكن تقول: أنا عطشان ومحتاج مية.",
        "رسالة قصيرة هي: أنا عايز أشرب من فضلك.",
        "يمكنك أن تطلب ماء أو عصيرا أو أي مشروب آخر.",
      ],
      fr: [
        "Tu peux dire: j'ai soif et j'ai besoin d'eau.",
        "Un petit message est: je veux boire s'il te plait.",
        "Tu peux demander de l'eau, du jus, ou une autre boisson.",
      ],
      es: [
        "Puedes decir: tengo sed y necesito agua.",
        "Un mensaje corto es: quiero beber, por favor.",
        "Puedes pedir agua, jugo u otra bebida.",
      ],
    },
  },
  {
    id: "bathroom",
    phrases: {
      en: ["toilet", "bathroom", "i need toilet", "i need bathroom", "washroom"],
      ar: ["حمام", "عايز الحمام", "محتاج الحمام", "المرحاض", "عايز ادخل الحمام", "7amam"],
      fr: ["toilettes", "salle de bain", "j ai besoin des toilettes"],
      es: ["bano", "necesito ir al bano", "quiero ir al bano", "servicio"],
    },
    responses: {
      en: [
        "You can say: I need to go to the bathroom.",
        "A short message is: Please take me to the toilet.",
        "You can also say: I need privacy in the bathroom.",
      ],
      ar: [
        "ممكن تقول: أنا محتاج أروح الحمام.",
        "رسالة قصيرة هي: من فضلك خذني إلى الحمام.",
        "ويمكنك أيضا أن تقول: أنا محتاج خصوصية في الحمام.",
      ],
      fr: [
        "Tu peux dire: j'ai besoin d'aller aux toilettes.",
        "Un petit message est: emmene-moi aux toilettes s'il te plait.",
        "Tu peux aussi dire: j'ai besoin d'intimite dans la salle de bain.",
      ],
      es: [
        "Puedes decir: necesito ir al bano.",
        "Un mensaje corto es: por favor llevame al bano.",
        "Tambien puedes decir: necesito privacidad en el bano.",
      ],
    },
  },
  {
    id: "sleep",
    phrases: {
      en: ["sleep", "sleepy", "i want to sleep", "bed", "nap"],
      ar: ["عايز انام", "نعسان", "محتاج انام", "عايز السرير", "قيلولة", "na3san", "3ayz anam"],
      fr: ["je veux dormir", "fatigue pour dormir", "lit", "sieste"],
      es: ["quiero dormir", "tengo sueno", "cama", "siesta"],
    },
    responses: {
      en: [
        "You can say: I am sleepy and I want to sleep.",
        "A calm message is: I need my bed or a quiet place.",
        "You can ask for a nap, rest, or bedtime.",
      ],
      ar: [
        "ممكن تقول: أنا نعسان وعايز أنام.",
        "رسالة هادئة هي: أنا محتاج سريري أو مكانا هادئا.",
        "يمكنك أن تطلب قيلولة أو راحة أو وقت النوم.",
      ],
      fr: [
        "Tu peux dire: j'ai sommeil et je veux dormir.",
        "Un message calme est: j'ai besoin de mon lit ou d'un endroit calme.",
        "Tu peux demander une sieste, du repos, ou l'heure du coucher.",
      ],
      es: [
        "Puedes decir: tengo sueno y quiero dormir.",
        "Un mensaje tranquilo es: necesito mi cama o un lugar silencioso.",
        "Puedes pedir una siesta, descanso o la hora de dormir.",
      ],
    },
  },
  {
    id: "school",
    phrases: {
      en: ["school", "study", "homework", "class", "teacher", "help with school", "help with homework"],
      ar: ["مدرسة", "مذاكرة", "واجب", "حصة", "مدرس", "مساعدة في المدرسة", "مساعدة في الواجب", "madrasa", "wageb"],
      fr: ["ecole", "etudier", "devoirs", "classe", "professeur", "aide pour l ecole", "aide pour les devoirs"],
      es: ["escuela", "estudiar", "tarea", "clase", "maestro", "ayuda con la escuela", "ayuda con la tarea"],
    },
    responses: {
      en: [
        "You can say: I need help with school or homework.",
        "A useful phrase is: I do not understand this lesson.",
        "You can ask: Please explain the class again.",
      ],
      ar: [
        "ممكن تقول: أنا محتاج مساعدة في المدرسة أو الواجب.",
        "جملة مفيدة هي: أنا لا أفهم هذا الدرس.",
        "يمكنك أن تطلب: من فضلك اشرح الحصة مرة أخرى.",
      ],
      fr: [
        "Tu peux dire: j'ai besoin d'aide pour l'ecole ou les devoirs.",
        "Une phrase utile est: je ne comprends pas cette lecon.",
        "Tu peux demander: explique la classe encore une fois s'il te plait.",
      ],
      es: [
        "Puedes decir: necesito ayuda con la escuela o la tarea.",
        "Una frase util es: no entiendo esta leccion.",
        "Puedes pedir: por favor explica la clase otra vez.",
      ],
    },
  },
  {
    id: "family",
    phrases: {
      en: ["family", "mom", "dad", "brother", "sister"],
      ar: ["عائلة", "ماما", "بابا", "اخويا", "اختي", "family", "mama", "baba"],
      fr: ["famille", "maman", "papa", "frere", "soeur"],
      es: ["familia", "mama", "papa", "hermano", "hermana"],
    },
    responses: {
      en: [
        "You can tell your family: I need you, please stay with me.",
        "A simple phrase is: I want to talk to my mom or dad.",
        "You can also say: I need support from my family.",
      ],
      ar: [
        "ممكن تقول لعائلتك: أنا محتاجكم، من فضلكم ابقوا معي.",
        "جملة بسيطة هي: أنا عايز أتكلم مع ماما أو بابا.",
        "ويمكنك أيضا أن تقول: أنا محتاج دعم من عائلتي.",
      ],
      fr: [
        "Tu peux dire a ta famille: j'ai besoin de vous, restez avec moi s'il vous plait.",
        "Une phrase simple est: je veux parler a ma maman ou a mon papa.",
        "Tu peux aussi dire: j'ai besoin du soutien de ma famille.",
      ],
      es: [
        "Puedes decirle a tu familia: los necesito, por favor queden conmigo.",
        "Una frase simple es: quiero hablar con mi mama o mi papa.",
        "Tambien puedes decir: necesito apoyo de mi familia.",
      ],
    },
  },
  {
    id: "friends",
    phrases: {
      en: ["friend", "friends", "talk to my friend", "i feel alone", "company"],
      ar: ["صاحب", "اصحابي", "عايز اكلم صاحبي", "حاسس بالوحدة", "رفقة", "sa7by", "as7aby"],
      fr: ["ami", "amis", "je veux parler a mon ami", "je me sens seul"],
      es: ["amigo", "amigos", "quiero hablar con mi amigo", "me siento solo"],
    },
    responses: {
      en: [
        "You can say: I want to talk to my friend.",
        "A helpful message is: I need company right now.",
        "You can also say: I miss my friends and I want to see them.",
      ],
      ar: [
        "ممكن تقول: أنا عايز أتكلم مع صاحبي.",
        "رسالة مفيدة هي: أنا محتاج رفقة الآن.",
        "ويمكنك أيضا أن تقول: أنا مشتاق لأصحابي وعايز أشوفهم.",
      ],
      fr: [
        "Tu peux dire: je veux parler a mon ami.",
        "Un message utile est: j'ai besoin de compagnie maintenant.",
        "Tu peux aussi dire: mes amis me manquent et je veux les voir.",
      ],
      es: [
        "Puedes decir: quiero hablar con mi amigo.",
        "Un mensaje util es: necesito compania ahora.",
        "Tambien puedes decir: extrano a mis amigos y quiero verlos.",
      ],
    },
  },
  {
    id: "doctor_medicine",
    phrases: {
      en: ["doctor", "medicine", "medication", "pill", "appointment"],
      ar: ["دكتور", "دواء", "علاج", "حباية", "ميعاد", "doktor", "dawa"],
      fr: ["medecin", "medicament", "traitement", "pilule", "rendez vous"],
      es: ["doctor", "medicina", "medicamento", "pastilla", "cita"],
    },
    responses: {
      en: [
        "You can say: I need my medicine or I need the doctor.",
        "A clear phrase is: Please check my appointment or my medication time.",
        "If you need care, say: I want to see the doctor.",
      ],
      ar: [
        "ممكن تقول: أنا محتاج دوائي أو محتاج الدكتور.",
        "جملة واضحة هي: من فضلك راجع موعدي أو وقت الدواء.",
        "إذا كنت تحتاج رعاية فقل: أنا عايز أشوف الدكتور.",
      ],
      fr: [
        "Tu peux dire: j'ai besoin de mon medicament ou j'ai besoin du medecin.",
        "Une phrase claire est: verifie mon rendez-vous ou l'heure du medicament s'il te plait.",
        "Si tu as besoin de soins, dis: je veux voir le medecin.",
      ],
      es: [
        "Puedes decir: necesito mi medicina o necesito al doctor.",
        "Una frase clara es: por favor revisa mi cita o la hora de la medicina.",
        "Si necesitas atencion, di: quiero ver al doctor.",
      ],
    },
  },
  {
    id: "play_relax",
    phrases: {
      en: ["play", "game", "music", "bored", "relax"],
      ar: ["ألعب", "لعبة", "موسيقى", "زهقان", "استرخاء", "al3ab", "zah2an"],
      fr: ["jouer", "jeu", "musique", "ennui", "detente"],
      es: ["jugar", "juego", "musica", "aburrido", "relajarme"],
    },
    responses: {
      en: [
        "You can say: I want to play or listen to music.",
        "A useful phrase is: I am bored and I want an activity.",
        "You can ask for a game, music, drawing, or quiet relaxation.",
      ],
      ar: [
        "ممكن تقول: أنا عايز ألعب أو أسمع موسيقى.",
        "جملة مفيدة هي: أنا زهقان وعايز نشاطا.",
        "يمكنك أن تطلب لعبة أو موسيقى أو رسما أو استرخاء هادئا.",
      ],
      fr: [
        "Tu peux dire: je veux jouer ou ecouter de la musique.",
        "Une phrase utile est: je m'ennuie et je veux une activite.",
        "Tu peux demander un jeu, de la musique, du dessin, ou un moment calme.",
      ],
      es: [
        "Puedes decir: quiero jugar o escuchar musica.",
        "Una frase util es: estoy aburrido y quiero una actividad.",
        "Puedes pedir un juego, musica, dibujo o un momento tranquilo.",
      ],
    },
  },
  {
    id: "transport",
    phrases: {
      en: ["car", "bus", "transport", "go outside", "ride"],
      ar: ["عربية", "اتوبيس", "مواصلات", "عايز اخرج", "مشوار", "3arabya", "atobees"],
      fr: ["voiture", "bus", "transport", "sortir", "trajet"],
      es: ["coche", "autobus", "transporte", "salir", "viaje"],
    },
    responses: {
      en: [
        "You can say: I need transport or I want to go outside.",
        "A short phrase is: I want to ride in the car or bus.",
        "You can ask: When are we leaving, and how will we go?",
      ],
      ar: [
        "ممكن تقول: أنا محتاج مواصلات أو عايز أخرج.",
        "جملة قصيرة هي: أنا عايز أركب العربية أو الأتوبيس.",
        "يمكنك أن تسأل: متى سنخرج وكيف سنذهب؟",
      ],
      fr: [
        "Tu peux dire: j'ai besoin d'un transport ou je veux sortir.",
        "Une petite phrase est: je veux prendre la voiture ou le bus.",
        "Tu peux demander: quand partons-nous et comment allons-nous y aller ?",
      ],
      es: [
        "Puedes decir: necesito transporte o quiero salir.",
        "Una frase corta es: quiero ir en coche o autobus.",
        "Puedes preguntar: cuando salimos y como vamos a ir ?",
      ],
    },
  },
  {
    id: "weather",
    phrases: {
      en: ["hot", "cold", "weather", "rain", "jacket"],
      ar: ["حر", "برد", "الجو", "مطر", "جاكت", "7ar", "bard"],
      fr: ["chaud", "froid", "meteo", "pluie", "veste"],
      es: ["calor", "frio", "clima", "lluvia", "chaqueta"],
    },
    responses: {
      en: [
        "You can say: I feel hot, or I feel cold.",
        "A useful phrase is: I need a jacket, lighter clothes, or shade.",
        "You can also ask: Is it raining, and what should I wear?",
      ],
      ar: [
        "ممكن تقول: أنا حران، أو أنا بردان.",
        "جملة مفيدة هي: أنا محتاج جاكيت أو ملابس أخف أو ظلا.",
        "ويمكنك أيضا أن تسأل: هل تمطر وماذا أرتدي؟",
      ],
      fr: [
        "Tu peux dire: j'ai chaud, ou j'ai froid.",
        "Une phrase utile est: j'ai besoin d'une veste, de vetements plus legers, ou d'ombre.",
        "Tu peux aussi demander: est-ce qu'il pleut et que dois-je porter ?",
      ],
      es: [
        "Puedes decir: tengo calor, o tengo frio.",
        "Una frase util es: necesito una chaqueta, ropa mas ligera o sombra.",
        "Tambien puedes preguntar: esta lloviendo y que debo ponerme ?",
      ],
    },
  },
  {
    id: "communication",
    phrases: {
      en: ["what should i say", "help me answer", "message", "talk", "say this"],
      ar: ["أقول ايه", "ساعدني ارد", "رسالة", "عايز اتكلم", "قول هذه", "2ol eh", "sa3dni ard"],
      fr: ["que dois je dire", "aide moi a repondre", "message", "parler", "dis ceci"],
      es: ["que debo decir", "ayudame a responder", "mensaje", "hablar", "di esto"],
    },
    responses: {
      en: [
        "I can help with a short phrase. Tell me the topic and I will suggest words.",
        "You can start with: I need help, I feel sad, I want water, or I want to go home.",
        "If you want, type the situation and I will suggest a simple message.",
      ],
      ar: [
        "أقدر أساعد بجملة قصيرة. قل لي الموضوع وسأقترح كلمات مناسبة.",
        "يمكنك أن تبدأ بـ: أنا محتاج مساعدة، أنا زعلان، أنا عايز مية، أو أنا عايز أروح البيت.",
        "إذا أردت فاكتب الموقف وسأقترح رسالة بسيطة.",
      ],
      fr: [
        "Je peux aider avec une phrase courte. Dis-moi le sujet et je proposerai des mots.",
        "Tu peux commencer par: j'ai besoin d'aide, je suis triste, je veux de l'eau, ou je veux rentrer a la maison.",
        "Si tu veux, ecris la situation et je proposerai un message simple.",
      ],
      es: [
        "Puedo ayudar con una frase corta. Dime el tema y sugerire palabras.",
        "Puedes empezar con: necesito ayuda, estoy triste, quiero agua, o quiero ir a casa.",
        "Si quieres, escribe la situacion y sugerire un mensaje simple.",
      ],
    },
  },
  {
    id: "goodbye",
    phrases: {
      en: ["bye", "goodbye", "see you", "talk later", "thank you bye"],
      ar: ["مع السلامة", "باي", "اشوفك بعدين", "هنتكلم بعدين", "شكرا", "bye", "ma3 el salama"],
      fr: ["au revoir", "a bientot", "merci au revoir"],
      es: ["adios", "hasta luego", "nos vemos", "gracias adios"],
    },
    responses: {
      en: [
        "Goodbye. I am here whenever you want to talk again.",
        "See you later. Take care.",
        "Bye. You can come back any time.",
      ],
      ar: [
        "مع السلامة. أنا هنا كلما أردت أن تتحدث مرة أخرى.",
        "إلى اللقاء. اعتن بنفسك.",
        "باي. يمكنك العودة في أي وقت.",
      ],
      fr: [
        "Au revoir. Je suis ici quand tu veux reparler.",
        "A plus tard. Prends soin de toi.",
        "Bye. Tu peux revenir quand tu veux.",
      ],
      es: [
        "Adios. Estoy aqui cuando quieras hablar otra vez.",
        "Hasta luego. Cuidate.",
        "Bye. Puedes volver cuando quieras.",
      ],
    },
  },
];
