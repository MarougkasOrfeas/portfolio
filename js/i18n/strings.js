/**
 * Website text in English and Greek.
 *
 * Notes:
 * - Use en and el for translations.
 * - HTML uses data-i18n to display translated text.
 * - Use {name} for dynamic values.
 */
export const strings = {
  en: {
    meta: {
      title: 'Orfeas Marougkas · Full-Stack Web Developer',
      description:
        'Orfeas Marougkas, Full-Stack Web Developer at EUROPEAN DYNAMICS in Athens, specialising in Java, Spring Boot and Angular. Career timeline, certifications and projects.',
    },
    a11y: {
      skip: 'Skip to main content',
      newTab: '(opens in new tab)',
      langChanged: 'Language changed to English',
    },
    lang: { label: 'Language' },
    motion: { pause: 'Pause animations' },
    nav: {
      label: 'Primary',
      mobileLabel: 'Mobile',
      home: 'Orfeas Marougkas, back to top',
      menu: 'Menu',
      about: 'About',
      journey: 'Journey',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hi, my name is',
      roleSr: 'Full-Stack Web Developer working with Java, Spring Boot and Angular.',
      rolePrefix: 'Coffee first. Then I',
      rotator: ['plan.', 'build.', 'break things.', 'fix bugs.', 'test.', 'refactor.', 'repeat.'],
      pitch:
        'Full-Stack Web Developer currently working at EUROPEAN DYNAMICS in Athens. I build and maintain web applications all the way from backend to frontend, turning complex problems into clean and reliable solutions. I write code, chase bugs, and occasionally create a few of my own.',
      ctaJourney: 'View my journey',
      ctaContact: 'Get in touch',
    },
    about: {
      title: 'About me',
      p1: "I'm a <strong>Full-Stack Web Developer</strong> at <strong>EUROPEAN DYNAMICS</strong>, specialising in <strong>Java</strong> and <strong>Angular</strong>. For more than four years I've been building and maintaining web applications across multiple projects, including contributions to the European Union's <strong>EU Law Tracker</strong> platform.",
      p2: 'I have a solid foundation in software engineering principles, object-oriented programming and end-to-end web development, from Spring Boot microservices and RabbitMQ messaging to Angular front ends, containerised with Docker and Kubernetes.',
      p3: "I enjoy new challenges and I'm always learning new technologies. I studied <strong>Informatics and Computer Engineering</strong> at the University of West Attica.",
      portraitAlt: 'Orfeas Marougkas monogram',
      skillsTitle: 'Technologies I work with',
      stats: {
        years: 'Years of professional experience',
        certifications: 'Certifications',
        projects: 'Featured projects',
      },
    },
    journey: {
      title: 'My journey',
      intro: 'Experience, education and certifications, from the latest to the earliest.',
      filterLabel: 'Filter timeline',
      filters: {
        all: 'All',
        experience: 'Experience',
        education: 'Education',
        certification: 'Certifications',
      },
      status: 'Showing {count} of {total} entries',
      types: {
        experience: 'Experience',
        education: 'Education',
        certification: 'Certification',
      },
      present: 'Present',
      current: 'Current',
      issued: 'Issued',
      promoted: 'Promotion',
      technologies: 'Technologies',
      credentialId: 'Credential ID',
      viewCredential: 'View credential',
      relatedProject: 'Related project',
      universityProjects: 'University projects',
    },
    duration: {
      year: { one: '{n} yr', other: '{n} yrs' },
      month: { one: '{n} mo', other: '{n} mos' },
    },
    projects: {
      title: 'Projects',
      intro: "Team projects I've contributed to professionally, and projects I've built myself.",
      groups: {
        team: {
          title: "Projects I've been part of",
          intro: 'Publicly accessible project I\'ve contributed to as part of the development team at EUROPEAN DYNAMICS.',
        },
        built: {
          title: "Things I've built",
          intro: 'My diploma thesis, plus personal and university projects I designed and developed myself.',
        },
      },
      kinds: {
        professional: 'Team project · EUROPEAN DYNAMICS',
        thesis: 'Diploma thesis',
        featured: 'Featured project',
        personal: 'Personal project',
        university: 'University project',
      },
      caseStudy: 'Read case study',
      source: 'Source code',
      live: 'Live site',
      download: 'Download',
      more: 'More on GitHub',
      privateSource: 'Client project. Source code is not public.',
      technologies: 'Technologies',
      stack: {
        frontend: 'Frontend',
        backend: 'Backend',
        messaging: 'Messaging',
        architecture: 'Architecture',
        tooling: 'Tooling',
      },
      dialogClose: 'Close',
      sections: {
        overview: 'Overview',
        role: 'My role',
        highlights: 'Highlights',
        stack: 'Tech stack',
      },
    },
    contact: {
      eyebrow: "What's next?",
      title: "Let's build <span>something great</span>.",
      text: "I'm open to new opportunities, collaborations and conversations.",
      linkedin: 'Connect on LinkedIn',
      email: 'Send an email',
      copy: 'Copy email address',
      copied: 'Email address copied to clipboard',
      copyFailed: 'Could not copy. The address is {email}',
    },
    footer: {
      built: 'Designed & built with HTML, CSS and JavaScript.',
      top: 'Back to top',
    },
  },

  el: {
    meta: {
      title: 'Ορφέας Μαρούγκας · Full-Stack Web Developer (Java & Angular)',
      description:
        'Ορφέας Μαρούγκας, Full-Stack Web Developer στην EUROPEAN DYNAMICS στην Αθήνα, με εξειδίκευση σε Java, Spring Boot και Angular. Επαγγελματική πορεία, πιστοποιήσεις και έργα.',
    },
    a11y: {
      skip: 'Μετάβαση στο κύριο περιεχόμενο',
      newTab: '(ανοίγει σε νέα καρτέλα)',
      langChanged: 'Η γλώσσα άλλαξε σε Ελληνικά',
    },
    lang: { label: 'Γλώσσα' },
    motion: { pause: 'Παύση κινήσεων' },
    nav: {
      label: 'Κύρια πλοήγηση',
      mobileLabel: 'Πλοήγηση κινητού',
      home: 'Ορφέας Μαρούγκας, επιστροφή στην αρχή',
      menu: 'Μενού',
      about: 'Σχετικά',
      journey: 'Πορεία',
      projects: 'Έργα',
      contact: 'Επικοινωνία',
    },
    hero: {
      greeting: 'Γεια σας, ονομάζομαι',
      roleSr: 'Full-Stack Web Developer με Java, Spring Boot και Angular.',
      rolePrefix: 'Αναπτύσσω με',
      rotator: ['Java', 'Spring Boot', 'Angular', 'Microservices', 'Docker & Kubernetes'],
      pitch:
        'Full-Stack Web Developer στην EUROPEAN DYNAMICS στην Αθήνα. Σχεδιάζω, αναπτύσσω και συντηρώ ολοκληρωμένες web εφαρμογές, με microservices σε Spring Boot στο back end και Angular στο front end.',
      ctaJourney: 'Δείτε την πορεία μου',
      ctaContact: 'Επικοινωνήστε μαζί μου',
    },
    about: {
      title: 'Σχετικά με εμένα',
      p1: 'Είμαι <strong>Full-Stack Web Developer</strong> στην <strong>EUROPEAN DYNAMICS</strong>, με εξειδίκευση σε <strong>Java</strong> και <strong>Angular</strong>. Εδώ και πάνω από τέσσερα χρόνια αναπτύσσω και συντηρώ web εφαρμογές σε πολλαπλά έργα, με συνεισφορά μεταξύ άλλων στην πλατφόρμα <strong>EU Law Tracker</strong> της Ευρωπαϊκής Ένωσης.',
      p2: 'Διαθέτω στέρεες βάσεις στις αρχές της τεχνολογίας λογισμικού, στον αντικειμενοστρεφή προγραμματισμό και στην ολοκληρωμένη ανάπτυξη web εφαρμογών: από microservices σε Spring Boot και ανταλλαγή μηνυμάτων με RabbitMQ, μέχρι front end σε Angular, με Docker και Kubernetes.',
      p3: 'Μου αρέσουν οι νέες προκλήσεις και μαθαίνω συνεχώς νέες τεχνολογίες. Σπούδασα στο Τμήμα <strong>Μηχανικών Πληροφορικής και Υπολογιστών</strong> του Πανεπιστημίου Δυτικής Αττικής.',
      portraitAlt: 'Μονόγραμμα Ορφέα Μαρούγκα',
      skillsTitle: 'Τεχνολογίες που χρησιμοποιώ',
      stats: {
        years: 'Χρόνια επαγγελματικής εμπειρίας',
        certifications: 'Πιστοποιήσεις',
        projects: 'Επιλεγμένα έργα',
      },
    },
    journey: {
      title: 'Η πορεία μου',
      intro: 'Εμπειρία, σπουδές και πιστοποιήσεις, από τα πιο πρόσφατα στα παλαιότερα.',
      filterLabel: 'Φιλτράρισμα χρονολογίου',
      filters: {
        all: 'Όλα',
        experience: 'Εμπειρία',
        education: 'Σπουδές',
        certification: 'Πιστοποιήσεις',
      },
      status: 'Εμφανίζονται {count} από {total} καταχωρίσεις',
      types: {
        experience: 'Εμπειρία',
        education: 'Σπουδές',
        certification: 'Πιστοποίηση',
      },
      present: 'Σήμερα',
      current: 'Τρέχουσα',
      issued: 'Έκδοση',
      promoted: 'Προαγωγή',
      technologies: 'Τεχνολογίες',
      credentialId: 'Κωδικός πιστοποίησης',
      viewCredential: 'Προβολή πιστοποίησης',
      relatedProject: 'Σχετικό έργο',
      universityProjects: 'Πανεπιστημιακά έργα',
    },
    duration: {
      year: { one: '{n} έτος', other: '{n} έτη' },
      month: { one: '{n} μήνας', other: '{n} μήνες' },
    },
    projects: {
      title: 'Έργα',
      intro: 'Ομαδικά έργα στα οποία συμμετείχα επαγγελματικά, και προσωπικά έργα που έχω αναπτύξει.',
      groups: {
        team: {
          title: 'Έργα στα οποία συμμετείχα',
          intro: 'Ομαδικά έργα στην EUROPEAN DYNAMICS, όπου εργάστηκα ως μέλος της ομάδας ανάπτυξης.',
        },
        built: {
          title: 'Έργα που έχω αναπτύξει',
          intro: 'Η διπλωματική μου εργασία, καθώς και προσωπικά και πανεπιστημιακά έργα που σχεδίασα και ανέπτυξα.',
        },
      },
      kinds: {
        professional: 'Ομαδικό έργο · EUROPEAN DYNAMICS',
        thesis: 'Διπλωματική εργασία',
        featured: 'Προτεινόμενο έργο',
        personal: 'Προσωπικό έργο',
        university: 'Πανεπιστημιακό έργο',
      },
      caseStudy: 'Περισσότερα',
      source: 'Πηγαίος κώδικας',
      live: 'Ιστότοπος',
      download: 'Λήψη',
      more: 'Περισσότερα στο GitHub',
      privateSource: 'Έργο πελάτη. Ο κώδικας δεν είναι δημόσιος.',
      technologies: 'Τεχνολογίες',
      stack: {
        frontend: 'Frontend',
        backend: 'Backend',
        messaging: 'Μηνύματα',
        architecture: 'Αρχιτεκτονική',
        tooling: 'Εργαλεία',
      },
      dialogClose: 'Κλείσιμο',
      sections: {
        overview: 'Επισκόπηση',
        role: 'Ο ρόλος μου',
        highlights: 'Σημεία',
        stack: 'Τεχνολογίες',
      },
    },
    contact: {
      eyebrow: 'Τι ακολουθεί;',
      title: 'Ας φτιάξουμε <span>κάτι σπουδαίο</span>.',
      text: 'Ενδιαφέρομαι για νέες ευκαιρίες, συνεργασίες και συζητήσεις.',
      linkedin: 'Συνδεθείτε στο LinkedIn',
      email: 'Αποστολή email',
      copy: 'Αντιγραφή email',
      copied: 'Η διεύθυνση email αντιγράφηκε',
      copyFailed: 'Η αντιγραφή απέτυχε. Η διεύθυνση είναι {email}',
    },
    footer: {
      built: 'Σχεδιασμός & υλοποίηση με HTML, CSS και JavaScript.',
      top: 'Επιστροφή στην αρχή',
    },
  },
};
