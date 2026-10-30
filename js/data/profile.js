/**
 * Portfolio content for profile, experience, education, certifications, skills, and projects.
 *
 * Edit this file to update the website.
 * ------------------------------------------------------------------------------------------------
 * Notes:
 *  - Use { en, el } for translations.
 *  - Use YYYY-MM for dates; null means ongoing.
 *  - Timeline entries are sorted newest first.
 */

export const profile = {
  name: 'Orfeas Marougkas',
  email: 'marougkasorfeas@outlook.com',
  links: {
    github: 'https://github.com/MarougkasOrfeas',
    linkedin: 'https://www.linkedin.com/in/marougkas-orfeas',
  },
};

const GITHUB = 'https://github.com/MarougkasOrfeas';

/* --------------------- Experience -------------------------- */
export const experience = [
  {
    id: 'european-dynamics',
    type: 'experience',
    org: 'EUROPEAN DYNAMICS',
    orgUrl: 'https://www.eurodyn.com',
    location: { en: 'Marousi, Attica, Greece', el: 'Μαρούσι, Αττική' },
    employment: { en: 'Full-time', el: 'Πλήρης απασχόληση' },
    roles: [
      {
        title: 'Java Web Developer',
        start: '2023-11',
        end: null,
        highlights: {
          en: [
            'Development and maintenance of web applications using Java, Spring Boot and Angular.',
            'Microservices-based project development, including contributions to EU Law Tracker.',
            'Design and implementation of solutions aligned with business requirements.',
            'Automation, debugging, testing and deployment.',
          ],
          el: [
            'Ανάπτυξη και συντήρηση web εφαρμογών με Java, Spring Boot και Angular.',
            'Ανάπτυξη έργων με αρχιτεκτονική microservices, με συνεισφορά στο EU Law Tracker.',
            'Σχεδιασμός και υλοποίηση λύσεων σύμφωνα με τις επιχειρησιακές απαιτήσεις.',
            'Αυτοματοποίηση, αποσφαλμάτωση, έλεγχος και deployment.',
          ],
        },
        tech: ['Java', 'Spring Boot', 'Angular', 'RabbitMQ', 'Microservices', 'Redis', 'SQL*Plus', 'podman', 'docker compose', 'Keycloak', 'PostgreSQL', 'seaweedfs', 'ClamAV', 'liquidbase', 'Docker'],
      },
      {
        title: 'Junior Java Web Developer',
        start: '2022-10',
        end: '2023-11',
        highlights: {
          en: [
            'Maintenance across multiple projects.',
            'Security fixes, Java and dependency upgrades.',
            'Debugging, testing and deployment.',
          ],
          el: [
            'Συντήρηση σε πολλαπλά έργα.',
            'Διορθώσεις ασφαλείας, αναβαθμίσεις Java και εξαρτήσεων.',
            'Αποσφαλμάτωση, έλεγχος και deployment.',
          ],
        },
        tech: ['Java', 'Spring Framework', 'Spring Boot', 'AngularJS', 'JavaScript', 'Oracle Database', 'Struts', 'AJAX', 'Flyway', 'JQuery', 'Bootstrap', 'JSP', 'Hibernate', 'JDBC'],
      },
    ],
  },
  {
    id: 'vr-arena',
    type: 'experience',
    org: 'VR Arena',
    location: { en: 'Athens, Attica, Greece', el: 'Αθήνα, Αττική' },
    employment: { en: 'Full-time', el: 'Πλήρης απασχόληση' },
    roles: [
      {
        title: { en: 'Cashier & Website Maintainer', el: 'Ταμείο & Συντήρηση Ιστοσελίδας' },
        start: '2021-11',
        end: '2022-09',
        highlights: {
          en: [
            'Cashier and customer service.',
            'Maintained the business website and implemented new features and functionality with WordPress.',
          ],
          el: [
            'Ταμείο και εξυπηρέτηση πελατών.',
            'Συντήρηση της ιστοσελίδας της επιχείρησης και υλοποίηση νέων λειτουργιών με WordPress.',
          ],
        },
        tech: ['WordPress', 'PHP'],
      },
    ],
  },
  {
    id: 'greek-army',
    type: 'experience',
    icon: 'shield',
    org: { en: 'Greek Army', el: 'Ελληνικός Στρατός' },
    location: { en: 'Samos, North Aegean, Greece', el: 'Σάμος, Βόρειο Αιγαίο' },
    employment: { en: 'Full-time', el: 'Πλήρης απασχόληση' },
    roles: [
      {
        title: { en: 'Military Police', el: 'Στρατονομία' },
        start: '2020-03',
        end: '2020-12',
        highlights: {
          en: ['Fulfilled military service obligation.'],
          el: ['Εκπλήρωση στρατιωτικών υποχρεώσεων.'],
        },
        tech: [],
      },
    ],
  },
];

/* -------------------------------- Education ----------------------------------------- */
export const education = [
  {
    id: 'uniwa',
    type: 'education',
    title: { en: 'Informatics and Computer Engineering', el: 'Μηχανικών Πληροφορικής και Υπολογιστών' },
    field: { en: 'Computer Science', el: 'Επιστήμη Υπολογιστών' },
    org: { en: 'University of West Attica', el: 'Πανεπιστήμιο Δυτικής Αττικής' },
    orgUrl: 'https://www.uniwa.gr',
    location: { en: 'Athens, Greece', el: 'Αθήνα' },
    start: '2018-01',
    end: '2026-10',
    relatedRepos: [
      { name: 'Unihealth (thesis)', url: `${GITHUB}/Unihealth` },
      { name: 'MultimediaApp', url: `${GITHUB}/MultimediaApp` },
      { name: 'MusicPlayerApp', url: `${GITHUB}/MusicPlayerApp` },
      { name: 'Search-Engine', url: `${GITHUB}/Search-Engine` },
      { name: 'WebGL', url: `${GITHUB}/WebGL` },
      { name: 'Pandemic-Analytics', url: `${GITHUB}/Pandemic-Analytics` },
      { name: 'TheaterBookingApp', url: `${GITHUB}/TheaterBookingApp` },
    ],
  },
];

/* ---------------------------------- Licences & certifications ----------------------------------------- */
export const certifications = [
  {
    id: 'codehub-402',
    type: 'certification',
    title: '402 Advanced Docker & Kubernetes',
    org: 'Code.Hub',
    date: '2025-01',
    credentialId: '25C015294',
    credentialUrl: 'https://certificates.codehub.gr/legacy/2025/01/Certificate-of-Completion-25C015294-402-Advanced-Docker-Kubernetes-Orfeas-Marougkas.pdf',
    tech: ['Docker', 'Kubernetes'],
  },
  {
    id: 'codehub-401',
    type: 'certification',
    title: '401 Basic Docker & Kubernetes',
    org: 'Code.Hub',
    date: '2024-11',
    credentialId: '24C015140',
    credentialUrl: 'https://certificates.codehub.gr/legacy/2024/12/Certificate-of-Completion-24C015140-401-Basic-Docker-and-Kubernetes-Orfeas-Marougkas.pdf',
    tech: ['Docker', 'Kubernetes'],
  },
  {
    id: 'codehub-301',
    type: 'certification',
    title: '301 Spring Boot',
    org: 'Code.Hub',
    date: '2024-03',
    credentialId: '24C015351',
    credentialUrl: 'https://certificates.codehub.gr/legacy/2024/03/Certificate-of-Completion-24C015351-301-Spring-Boot-Orfeas-Marougkas.pdf',
    tech: ['Spring Boot'],
    relatedRepo: { name: 'SampleMovieDatabase', url: `${GITHUB}/SampleMovieDatabase` },
  },
  {
    id: 'codehub-201',
    type: 'certification',
    title: '201 Angular',
    org: 'Code.Hub',
    date: '2022-12',
    credentialId: '22C024084',
    credentialUrl: 'https://certificates.codehub.gr/legacy/2022/12/Certificate-of-Completion-22C024084-201-Angular-Orfeas-Marougkas.pdf',
    tech: ['Angular', 'TypeScript'],
  },
  {
    id: 'udemy-spring-hibernate',
    type: 'certification',
    title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
    org: 'Udemy',
    date: '2022-11',
    credentialId: 'UC-4088cd52-d802-4413-bcb6-517044baf973',
    credentialUrl: 'https://ude.my/UC-4088cd52-d802-4413-bcb6-517044baf973',
    tech: ['Spring', 'Hibernate', 'Spring Boot'],
  },
  {
    id: 'codehub-bootcamp',
    type: 'certification',
    title: 'Coding Bootcamp for Junior Java Web Developers',
    org: 'Code.Hub',
    date: '2022-10',
    credentialId: '22C013494',
    credentialUrl: null,
    tech: ['Java', 'Java EE'],
    relatedRepo: { name: 'TravelCompany-eShop', url: `${GITHUB}/TravelCompany-eShop` },
  },
  {
    id: 'ecpe',
    type: 'certification',
    title: 'Certificate of Proficiency in English (ECPE)',
    org: 'University of Michigan',
    date: '2019-05',
    credentialId: null,
    credentialUrl: null,
    tech: [],
  },
];

/* ---------------------------------- Skills (About section) ---------------------------------------- */
export const skills = [
  {
    id: 'backend',
    icon: 'server',
    title: 'Backend',
    items: ['Java', 'Spring Boot', 'Hibernate / JPA', 'QueryDSL', 'REST APIs',  'Microservices'],
  },
  {
    id: 'frontend',
    icon: 'monitor',
    title: 'Frontend',
    items: ['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'Reactive Forms', 'JavaScript', 'SCSS' ],
  },
  {
    id: 'databases',
    icon: 'database',
    title: {
      en: 'DB & Migrations',
      el: 'Βάσεις Δεδομένων & Migrations'
    },
    items: [
      'Oracle Database',
      'PostgreSQL',
      'Flyway',
      'Liquibase'
    ],
  },
  {
    id: 'devops',
    icon: 'box',
    title: { en: 'DevOps & Tooling', el: 'DevOps & Εργαλεία' },
    items: ['Docker', 'Kubernetes', 'Git', 'Maven'],
  },
  {
    id: 'testing',
    icon: 'check-circle',
    title: {
      en: 'Testing & Quality',
      el: 'Έλεγχος & Ποιότητα Κώδικα',
    },
    items: [
      'JUnit 5',
      'Mockito',
      'Jasmine',
      'Karma',
       'SonarQube',
    ],
  },
  {
    id: 'also',
    icon: 'code',
    title: { en: 'Also worked with', el: 'Επίσης' },
    items: ['Python', 'C#', 'Android',  'Keycloak', 'Elasticsearch', 'SeaweedFS', 'ClamAV', 'RabbitMQ', 'Redis', 'Apache Struts', 'JSP', 'Bootstrap'],
  },
  {
    id: 'languages',
    icon: 'globe',
    title: { en: 'Languages', el: 'Γλώσσες' },
    items: [
      { en: 'Greek (native)', el: 'Ελληνικά (μητρική)' },
      { en: 'English (C2 - ECPE)', el: 'Αγγλικά (C2 - ECPE)' },
    ],
  },
];

/* ------------------------------------- Projects ------------------------------------------------ */
export const projects = [
  {
    id: 'eu-law-tracker',
    kind: 'professional',
    featured: true,
    title: 'EU Law Tracker',
    description: {
      en: 'European Union platform for searching and tracking EU legislative procedures, with timelines, progress updates and related documents throughout the legislative process.',
      el: 'Πλατφόρμα της Ευρωπαϊκής Ένωσης για αναζήτηση και παρακολούθηση νομοθετικών διαδικασιών, με χρονολόγια, ενημερώσεις προόδου και σχετικά έγγραφα σε όλη τη νομοθετική διαδικασία.',
    },
    stack: {
      backend: ['Java', 'Spring Boot'],
      messaging: ['RabbitMQ'],
      architecture: ['Microservices'],
    },
    links: {
      live: 'https://law-tracker.europa.eu/homepage?lang=en',
      source: null,
    },
    caseStudy: {
      overview: {
        en: 'EU Law Tracker is a European Union platform that helps users explore and follow EU legislative procedures, track their progress, and access related documents.',
        el: 'Το EU Law Tracker είναι μια πλατφόρμα της Ευρωπαϊκής Ένωσης που επιτρέπει στους χρήστες να αναζητούν και να παρακολουθούν νομοθετικές διαδικασίες της ΕΕ, να ενημερώνονται για την εξέλιξή τους και να έχουν πρόσβαση στα σχετικά έγγραφα.',
      },
      role: {
        en: 'I was part of the EUROPEAN DYNAMICS development team, worked as a Java Web Developer.',
        el: 'Ήμουν μέλος της ομάδας ανάπτυξης της EUROPEAN DYNAMICS, όπου εργάστηκα ως Java Web Developer.',
      },
      highlights: {
        en: [
          'Back-end services built with Java and Spring Boot in a microservices architecture.',
          'Asynchronous, message-driven communication between services over RabbitMQ.',
          'Solutions that match business requirements, together with the wider team.',
          'Automation, debugging, testing and deployment.',
        ],
        el: [
          'Back-end υπηρεσίες με Java και Spring Boot σε αρχιτεκτονική microservices.',
          'Ασύγχρονη επικοινωνία μεταξύ υπηρεσιών μέσω μηνυμάτων με RabbitMQ.',
          'Λύσεις σύμφωνα με τις επιχειρησιακές απαιτήσεις, σε συνεργασία με την ομάδα.',
          'Αυτοματοποίηση, αποσφαλμάτωση, έλεγχος και deployment.',
        ],
      },
    },
  },
  {
    id: 'unihealth',
    kind: 'thesis',
    featured: true,
    title: 'Unihealth',
    description: {
      en: 'A student healthcare platform offering personalized health information, recommendations, and services based on individual health profiles. It features a rule-based personalization system, symptom information, health news, an AI assistant, and tools for managing users and university departments. Developed as part of my diploma thesis at the University of West Attica.',
      el: 'Πλατφόρμα υγείας για φοιτητές που προσφέρει εξατομικευμένες πληροφορίες, συμβουλές και υπηρεσίες με βάση το προφίλ υγείας κάθε χρήστη. Περιλαμβάνει μηχανισμό εξατομίκευσης βασισμένο σε κανόνες, πληροφορίες για συμπτώματα, νέα υγείας, AI βοηθό και εργαλεία διαχείρισης χρηστών και πανεπιστημιακών τμημάτων. Αναπτύχθηκε στο πλαίσιο της διπλωματικής μου εργασίας στο Πανεπιστήμιο Δυτικής Αττικής.',
    },
    stack: {
      backend: ['Java', 'Spring Boot'],
      frontend: ['Angular'],
      tooling: ['Maven', 'Docker Compose'],
      architecture: ['REST API', 'Rule-Based Personalization'],
    },
    links: { source: `${GITHUB}/Unihealth`, live: null },
    caseStudy: {
      overview: {
          en: 'Unihealth uses a rule-based personalization engine to adapt health-related content to each student. Users complete a health questionnaire, which generates health labels based on their responses, lifestyle information, and relevant keywords. These labels are prioritized and used to rank content according to the user’s individual needs.',
          el: 'Το Unihealth χρησιμοποιεί έναν μηχανισμό εξατομίκευσης βασισμένο σε κανόνες, ώστε να προσαρμόζει το περιεχόμενο υγείας στις ανάγκες κάθε φοιτητή. Οι χρήστες συμπληρώνουν ένα ερωτηματολόγιο υγείας, από το οποίο δημιουργούνται ετικέτες με βάση τις απαντήσεις τους, τις συνήθειες ζωής και σχετικές λέξεις-κλειδιά. Οι ετικέτες ιεραρχούνται και χρησιμοποιούνται για την κατάταξη του περιεχομένου ανάλογα με τις ανάγκες του χρήστη.',
      },
      role: {
          en: 'Developed as part of my diploma thesis at the University of West Attica.',
          el: 'Αναπτύχθηκε στο πλαίσιο της διπλωματικής μου εργασίας στο Πανεπιστήμιο Δυτικής Αττικής.',
      },
      highlights: {
          en: [
            'Full-stack application with a Spring Boot REST API.',
            'Rule-based personalization using health profiles and prioritized labels.',
            'Personalized health content, symptom information, and an AI assistant.',
            'Containerized development environment using Docker Compose.',
          ],
          el: [
              'Full-stack εφαρμογή με Angular και REST API σε Spring Boot.',
              'Εξατομίκευση μέσω κανόνων, ερωτηματολογίων υγείας, αντιστοίχισης λέξεων-κλειδιών και ιεράρχησης ετικετών.',
              'Εξατομικευμένο περιεχόμενο υγείας, πληροφορίες για συμπτώματα και AI βοηθός.',
              'Περιβάλλον ανάπτυξης με χρήση Docker Compose.',
          ],
      },
    },
  },
  {
    id: 'pet-eshop',
    kind: 'featured',
    featured: true,
    title: 'PetEshop',
    description: {
      en: 'A full-stack e-commerce application for an aquarium pet shop, built with Spring Boot and Angular. Features product browsing and filtering, shopping cart, guest and member checkout, secure authentication with Okta, order tracking, and automated email confirmations with PDF receipts.',
      el: 'Full-stack εφαρμογή ηλεκτρονικού καταστήματος με προϊόντα ενυδρείου, αναπτυγμένη με Spring Boot και Angular. Περιλαμβάνει κατάλογο και αναζήτηση προϊόντων, καλάθι αγορών, ολοκλήρωση παραγγελιών για επισκέπτες και μέλη, ασφαλή σύνδεση χρηστών με Okta, παρακολούθηση παραγγελιών και αυτόματη αποστολή email με αποδείξεις PDF.',
    },
    stack: {
      frontend: ['Angular', 'TypeScript'],
      backend: ['Java', 'Spring Boot'],
      architecture: ['MySQL', 'Okta', 'Docker Compose']
    },
    links: { source: `${GITHUB}/PetEshop`, live: null },
    caseStudy: {
      overview: {
        en: 'PetEshop is a full-stack online store for aquarium fish, plants, and accessories. It supports the complete shopping experience, from browsing products and managing a cart to placing orders and tracking their progress. The application follows a client-server architecture, with an Angular frontend, a Spring Boot REST API, a MySQL database and Login using Okta',
        el: 'Ένα ολοκληρωμένο έργο ηλεκτρονικού εμπορίου που συνδυάζει το stack που χρησιμοποιώ καθημερινά: back end σε Spring Boot με REST APIs και front end σε Angular για περιήγηση προϊόντων και παραγγελίες.',
      },
      role: {
        en: 'A personal full-stack project inspired by an Udemy course by Chad Darby.',
        el: 'Σχεδιασμός και ανάπτυξη τόσο του back end όσο και του front end.',
      },
      highlights: {
        en: [
          'Product catalogue with search, category filters, and pagination.',
          'Shopping cart and checkout for guests and registered users.',
          'Secure authentication with Okta and member order history.',
          'Server-side stock validation, shipping calculations, and order processing.',
          'Automated order confirmation emails with PDF receipts.',
          'Containerized application environment using Docker Compose.'
        ],
        el: [
          'Back end σε Spring Boot με REST API.',
          'Single-page εφαρμογή σε Angular που καταναλώνει το API.',
        ],
      },
    },
  },
  {
    id: 'password-generator',
    kind: 'personal',
    title: 'PasswordGenerator',
    description: {
      en: 'Command-line tool for cryptographically secure passwords: SecureRandom with uniform sampling, custom policies, entropy-based strength ratings, clipboard auto-clear and batch generation. It ships as native executables built with GraalVM.',
      el: 'Εργαλείο γραμμής εντολών για κρυπτογραφικά ασφαλείς κωδικούς: SecureRandom με ομοιόμορφη δειγματοληψία, παραμετροποιήσιμες πολιτικές, βαθμολογία ισχύος βάσει εντροπίας, αυτόματο καθάρισμα πρόχειρου και μαζική δημιουργία. Διανέμεται ως native εκτελέσιμα μέσω GraalVM.',
    },
    tech: ['Java 21', 'CLI', 'GraalVM Native Image', 'GitHub Actions'],
    links: { source: `${GITHUB}/PasswordGenerator`, download: `${GITHUB}/PasswordGenerator/releases/latest`, },
  },
  {
    id: 'qrcodegen',
    kind: 'personal',
    title: 'QRCodeGen',
    description: {
      en: 'A Java-based QR code generator supporting console, CLI, and JavaFX GUI modes. Generates customizable QR codes from text or URLs, with configurable output settings and Google Drive integration for uploading files securely using OAuth2.',
      el: 'Εφαρμογή δημιουργίας QR codes σε Java, με υποστήριξη console, CLI και γραφικού περιβάλλοντος JavaFX. Επιτρέπει τη δημιουργία QR codes από κείμενο ή URLs, την παραμετροποίηση των διαστάσεων και της αποθήκευσής τους, καθώς και την ασφαλή μεταφόρτωση αρχείων στο Google Drive μέσω OAuth2.',
    },
    tech: ['Java 21', 'JavaFX', 'Maven', 'Google Drive API', 'OAuth2'],
    links: { source: `${GITHUB}/QRCodeGen` },
  },
  {
    id: 'multimedia-app',
    kind: 'university',
    title: 'MultimediaApp',
    description: {
      en: 'A Java-based client-server multimedia streaming application with a JavaFX interface. Supports video streaming in multiple resolutions, adaptive streaming quality, video uploads, local caching, and automatic video processing with FFmpeg.',
      el: 'Εφαρμογή streaming πολυμέσων σε Java, βασισμένη σε αρχιτεκτονική client-server, με γραφικό περιβάλλον JavaFX. Υποστηρίζει αναπαραγωγή βίντεο σε διαφορετικές αναλύσεις, προσαρμογή ποιότητας σύνδεσης, μεταφόρτωση βίντεο, τοπική αποθήκευση και αυτόματη επεξεργασία μέσω FFmpeg.',
    },
    tech: ['Java 21', 'JavaFX', 'FFmpeg', 'TCP / UDP / RTP', 'Multithreading', 'Maven'],
    links: { source: `${GITHUB}/MultimediaApp` },
  },
  {
    id: 'webgl',
    kind: 'university',
    title: 'WebGL',
    description: {
      en: 'An interactive 3D computer graphics project built with JavaScript and WebGL, featuring 3D models, camera controls, textures, animations, and user interactions.',
      el: 'Διαδραστική εφαρμογή τρισδιάστατων γραφικών με JavaScript και WebGL, που περιλαμβάνει 3D μοντέλα, χειρισμό κάμερας, υφές, κινούμενα σχέδια και αλληλεπίδραση με τον χρήστη.',
    },
    tech: ['JavaScript', 'WebGL'],
    links: { source: `${GITHUB}/WebGL`, live: 'https://MarougkasOrfeas.github.io/WebGL/', },
  },
  {
    id: 'search-engine',
    kind: 'university',
    title: 'Search Engine',
    description: {
      en: 'A Python and Flask-based search engine for academic papers from arXiv. Features web crawling, advanced search filters, inverted indexing, and information retrieval algorithms including Boolean Search, TF-IDF, cosine similarity, and BM25.',
      el: 'Μηχανή αναζήτησης επιστημονικών δημοσιεύσεων από το arXiv, αναπτυγμένη με Python και Flask. Περιλαμβάνει web crawler, προηγμένα φίλτρα αναζήτησης, ανεστραμμένη ευρετηρίαση (inverted indexing) και αλγορίθμους ανάκτησης πληροφοριών, όπως Boolean Search, TF-IDF, cosine similarity και BM25.',
    },
    tech: [ 'Python', 'Flask', 'Web Crawling', 'Information Retrieval', 'TF-IDF', 'BM25',],
    links: { source: `${GITHUB}/Search-Engine` },
  },
];
