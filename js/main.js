const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const languageButtons = [...document.querySelectorAll(".language-button")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectGrid = document.querySelector("#project-grid");
const projectsMoreButton = document.querySelector("#projects-more-button");
const contactForm = document.querySelector("#contact-form");
const modal = document.querySelector("#project-modal");
const modalCloseButton = document.querySelector("#project-modal-close");
const modalCategory = document.querySelector("#project-modal-category");
const modalTitle = document.querySelector("#project-modal-title");
const modalDescription = document.querySelector("#project-modal-description");
const modalTools = document.querySelector("#project-modal-tools");
const modalDetail = document.querySelector("#project-modal-detail");
const modalVisual = document.querySelector("#project-modal-visual");
const modalCta = document.querySelector("#project-modal-cta");
const imageLightbox = document.querySelector("#image-lightbox");
const imageLightboxImage = document.querySelector("#image-lightbox-image");
const imageLightboxCloseButton = document.querySelector("#image-lightbox-close");
const lifestyleList = document.querySelector("#lifestyle-list");
const lifestyleDetailLabel = document.querySelector("#lifestyle-detail-label");
const lifestyleDetailCopy = document.querySelector("#lifestyle-detail-copy");
const lifestyleCollageImages = [
  document.querySelector("#lifestyle-collage-image-1"),
  document.querySelector("#lifestyle-collage-image-2"),
  document.querySelector("#lifestyle-collage-image-3"),
];

const portfolioContent = {
  de: {
    meta: {
      title: "Khalil Nabu - Webdesigner & Frontend Entwickler",
      description:
        "Portfolio von Khalil Nabu, Webdesigner und Frontend Entwickler mit Fokus auf moderne Websites, Screen Design und digitale Inhalte.",
    },
    common: {
      skip: "Zum Inhalt springen",
    },
    header: {
      brandAria: "Khalil Nabu Startseite",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen",
      navAria: "Hauptnavigation",
      navHome: "Home",
      navAbout: "Über mich",
      navProjects: "Projekte",
      navServices: "Leistungen",
      navExperience: "Erfahrung",
      navContact: "Kontakt",
      languageAria: "Sprache auswählen",
      contactCta: "Kontakt",
    },
    hero: {
      status: "Verfügbar für neue Projekte",
      titleLine1: "Hallo, ich bin Khalil Nabu.",
      titleLine2: "Webdesigner & Frontend Entwickler.",
      copy: "Ich gestalte moderne Websites, klare Benutzeroberflächen und digitale Inhalte für Marken, Unternehmen und kreative Projekte.",
      primaryCta: "Projekte ansehen",
      secondaryCta: "Kontakt aufnehmen",
      cvCta: "Lebenslauf herunterladen",
      applicationCta: "Bewerbung herunterladen",
      ticker1: "WEBDESIGN",
      ticker2: "FRONTEND",
      ticker3: "SCREEN DESIGN",
      ticker4: "CONTENT",
      ticker5: "SOCIAL MEDIA",
      ticker6: "VIDEO EDITING",
    },
    about: {
      kicker: "Über mich",
      title: "Fokus auf klare digitale Erlebnisse.",
      copy: "Ich bin Fachinformatiker für Anwendungsentwicklung mit vier Jahren Berufserfahrung im Bereich Webdesign, Frontend-Entwicklung und digitale Medien. Mein Schwerpunkt liegt auf modernen Unternehmenswebsites, responsivem Design, klaren Benutzeroberflächen und kreativen digitalen Inhalten.",
      copySecondary: "Ich verbinde Gestaltung, Struktur und technische Umsetzung zu digitalen Auftritten, die professionell wirken und einfach zu bedienen sind.",
      link: "Mehr über meinen Weg",
      cvCta: "Lebenslauf herunterladen",
      applicationCta: "Bewerbung herunterladen",
      fact1: "Jahre Berufserfahrung",
      fact2: "Instagram Community",
      fact3: "Bilingual für internationale Kommunikation",
      fact4: "Design, Code und Content",
    },
    skills: {
      kicker: "Skills & Tools",
      title: "Gestaltung trifft Technik.",
      intro: "Ein vielseitiges Profil für moderne Markenauftritte, digitale Produkte und visuelle Kommunikation.",
      webTitle: "Webentwicklung",
      webList: "HTML5, CSS3, JavaScript, Responsive Webdesign, WordPress, CMS",
      designTitle: "Design",
      designList: "Figma, Adobe XD, Photoshop, Illustrator, InDesign, UI Design, Screen Design",
      contentTitle: "Content & Video",
      contentList: "Premiere Pro, After Effects, Final Cut Pro, Canva, Social Media, Content Creation, Video Editing",
      platformsTitle: "Plattformen",
      platformsList: "Instagram, TikTok, YouTube, LinkedIn, Facebook, Meta Business Suite, Facebook Ads, Google Ads",
    },
    projects: {
      kicker: "Portfolio",
      title: "Ausgewählte<br>Projekte",
      filtersAria: "Projekte filtern",
      filterAll: "Alle",
      filterWebsites: "Websites",
      filterScreenDesigns: "Screen Designs",
      filterBusinessCards: "Visitenkarten",
      filterBrochures: "Broschüren",
      filterSocialMedia: "Social Media",
      filterVideo: "Video",
      showMore: "Mehr anzeigen",
      viewMore: "Mehr ansehen",
      toolsLabel: "Tools",
      detailLabel: "Projektbeschreibung",
      modalCta: "Projekt anfragen",
      liveCta: "Website ansehen",
      modalCloseAria: "Projekt schließen",
      zoomHint: "Vollansicht",
      uploadNote:
        "Weitere Projektbilder, PDFs oder Videos kannst du später einfach im Ordner assets/projects ergänzen und direkt in der Projektliste verknüpfen.",
      emptyTitle: "Noch kein Projekt in dieser Kategorie",
      emptyCopy:
        "Weitere Reels, Videos oder zusätzliche Arbeiten können hier später ergänzt werden.",
      items: [
        {
          id: "mt-propeller",
          category: "websites",
          categoryLabel: "Website",
          title: "MT-Propeller Facts",
          description:
            "Technischer Vergleich und Corporate Website mit Produktlogik, Suchsystem, Kartenmodul und Dokument-Downloads.",
          detail:
            "Für MT-Propeller habe ich das komplette Design und die technische Umsetzung des Projekts entwickelt. Die Website verbindet einen komplexen technischen Produktvergleich mit klarer Informationsarchitektur, Filter- und Suchfunktionen, Kartenansichten und downloadbaren Dokumenten.",
          tools: ["MySite", "HTML", "CSS", "JavaScript", "PHP"],
          image: "assets/projects/mt-propeller-home.png",
          imageAlt: "Startseite des MT-Propeller Projekts",
          link: "https://www.mt-website.breadcrumb-online.de/",
        },
        {
          id: "tima-tungsten",
          category: "websites",
          categoryLabel: "Website",
          title: "Tima Tungsten",
          description:
            "Kompletter Unternehmensauftritt mit mehrsprachiger Website, modernem Screen Design und strukturierter Produktpräsentation.",
          detail:
            "Dieses Projekt habe ich vollständig gestaltet und umgesetzt. Der Fokus lag auf einem klaren, technisch sauberen Markenauftritt, einer verständlichen Produktdarstellung und einer mehrsprachigen Struktur für internationale Kommunikation.",
          tools: ["Figma", "HTML", "CSS", "JavaScript", "CMS"],
          image: "assets/projects/tima-tungsten-home.png",
          imageAlt: "Startseite des Projekts Tima Tungsten",
          link: "https://tima-tungsten.de/",
        },
        {
          id: "klp-baumaschinen",
          category: "websites",
          categoryLabel: "Website",
          title: "KLP Baumaschinen",
          description:
            "Corporate Website mit Kategorien, Gerätefinder-Logik und individuell gestalteten Custom Icons für verschiedene Maschinenbereiche.",
          detail:
            "Für KLP Baumaschinen habe ich die Website strukturiert, gestaltet und technisch umgesetzt. Besonders wichtig waren die klare Kategorisierung, die schnelle Orientierung für Nutzer und die von mir entwickelten individuellen Icons für die jeweiligen Leistungsbereiche.",
          tools: ["Figma", "HTML", "CSS", "JavaScript", "Custom Icons"],
          image: "assets/projects/klp-home.png",
          imageAlt: "Startseite von KLP Baumaschinen",
          link: "https://www.klp-baumaschinen.de/",
        },
        {
          id: "wicklein-group",
          category: "screen-designs",
          categoryLabel: "Screen Design & Website",
          title: "Wicklein Group",
          description:
            "Screen Design und Website-Relaunch inklusive Logoentwicklung, Markenstruktur sowie ergänzenden Broschüren und Printmaterialien.",
          detail:
            "Bei diesem Projekt war ich für das Screen Design und die Entwicklung der Website verantwortlich. Zusätzlich habe ich das Logo mitentwickelt und visuelle Materialien wie Broschüren und weitere Markenelemente gestaltet.",
          tools: ["Screen Design", "Logo Design", "HTML", "CSS", "Branding"],
          image: "assets/projects/wicklein-home.png",
          imageAlt: "Website der Wicklein Group",
          link: "https://www.wicklein-group.de/",
        },
        {
          id: "ausbildungsportal-kulmbach",
          category: "websites",
          categoryLabel: "Website",
          title: "Ausbildungsportal Kulmbach",
          description:
            "Ausbildungsportal zur regionalen Jobsuche mit Stellenübersicht, zielgruppengerechtem UI und starker Nutzerführung für Schüler und Unternehmen.",
          detail:
            "Dieses Portal wurde für die Suche nach Ausbildungsplätzen in der Region entwickelt. Ich habe an Design und Umsetzung gearbeitet, damit Ausbildungsstellen, Praktika und Firmen klar strukturiert, leicht filterbar und mobil gut nutzbar sind.",
          tools: ["UI Design", "HTML", "CSS", "JavaScript", "Portal UX"],
          image: "assets/projects/ausbildungsportal-home.png",
          imageAlt: "Startseite des Ausbildungsportals Kulmbach",
          link: "https://www.ausbildungsportal-kulmbach.de/",
        },
        {
          id: "bindlach-rathaus",
          category: "websites",
          categoryLabel: "Website",
          title: "Gemeinde Bindlach",
          description:
            "Kommunale Website mit klarer Informationsarchitektur für Bürgerservice, Gemeindeinhalte und eine moderne digitale Präsenz.",
          detail:
            "Für die Gemeinde Bindlach habe ich an einer übersichtlichen und vertrauenswürdigen Webpräsenz mitgearbeitet. Ziel war es, wichtige Informationen für Bürger schnell zugänglich zu machen und gleichzeitig einen modernen kommunalen Auftritt zu schaffen.",
          tools: ["HTML", "CSS", "JavaScript", "Information Design", "CMS"],
          image: "assets/projects/bindlach-home.png",
          imageAlt: "Website der Gemeinde Bindlach",
          link: "https://bindlach-rathaus.breadcrumb-online.de/",
        },
        {
          id: "enjoy-future",
          category: "websites",
          categoryLabel: "Website",
          title: "enjoy future GmbH",
          description:
            "Umsetzung gemÃ¤ÃŸ der Screendesigns mit responsiver Webseiten-Entwicklung und sauberem Styling.",
          detail:
            "FÃ¼r enjoy future GmbH habe ich die Website auf Grundlage der Screendesigns umgesetzt, responsiv entwickelt und visuell sauber ausgearbeitet. Der Fokus lag auf einer stabilen technischen Umsetzung und einem konsistenten digitalen Auftritt auf allen BildschirmgrÃ¶ÃŸen.",
          tools: ["HTML", "CSS", "JavaScript", "Responsive Design", "Styling"],
          image: "assets/projects/enjoy-future-website.png",
          imageAlt: "Website Umsetzung fÃ¼r enjoy future GmbH",
        },
        {
          id: "instagram-campaigns",
          category: "social-media",
          categoryLabel: "Social Media",
          title: "Ausbildungsportal Instagram Posts",
          description:
            "Instagram-Posts, Content Templates und Redaktionsplanung für Recruiting- und Informationskampagnen.",
          detail:
            "Neben Websites entwickle ich auch Social-Media-Content. Dazu gehören Post-Serien, visuelle Templates, Veröffentlichungspläne und Inhalte, die sowohl informativ als auch aufmerksamkeitsstark funktionieren.",
          tools: ["Photoshop", "Illustrator", "Canva", "Instagram", "Content Planning"],
          image: "assets/projects/instagram-profile-posts.png",
          imageAlt: "Instagram Profil und Beiträge für das Ausbildungsportal",
        },
        {
          id: "tshirt-designs",
          category: "business-cards",
          categoryLabel: "Logo Design",
          title: "Dörnhöfer Logo & Workwear",
          description:
            "Shirt-Designs und Branding-Mockups für Arbeitgeber-, Team- und Eventauftritte mit mehreren Logo-Varianten.",
          detail:
            "Diese Entwürfe zeigen, wie ich Logos und Branding auch auf physische Produkte übertrage. Die Serie umfasst verschiedene Platzierungen, Varianten und Mockups für ein konsistentes Erscheinungsbild.",
          tools: ["Illustrator", "Photoshop", "Mockup Design", "Branding"],
          image: "assets/projects/doernhoefer-logo-design.png",
          imageAlt: "Dörnhöfer Logoentwicklung und Anwendung auf Workwear",
        },
        {
          id: "invitation-designs",
          category: "screen-designs",
          categoryLabel: "Einladungsdesign",
          title: "Event & Einladungsgestaltung",
          description:
            "Einladungsdesigns für private und festliche Events mit Bildkomposition, Typografie und druckfertigen Layouts.",
          detail:
            "Auch im Printbereich gestalte ich komplette Layouts von der Idee bis zur finalen Version. Diese Beispiele zeigen Einladungen mit emotionaler Bildsprache, klarer Struktur und unterschiedlichen Designstilen.",
          tools: ["Photoshop", "InDesign", "Typography", "Print Layout"],
          image: "assets/projects/invitation-design-1.png",
          imageAlt: "Gestaltete Einladung für ein Event",
        },
        {
          id: "gemeinde-heinersreuth",
          category: "websites",
          categoryLabel: "Website",
          title: "Gemeinde Heinersreuth",
          description:
            "Moderner kommunaler Webauftritt mit klarer Startseite, Servicebereichen und einer strukturierten Nutzerführung für Bürgerinnen und Bürger.",
          detail:
            "Dieser Entwurf zeigt meine Arbeit an kommunalen Interfaces mit vertrauenswürdigem Look, guter Übersicht und schnellen Einstiegen in die wichtigsten Themenbereiche wie Bürgerservice, Leben & Wohnen und Freizeit.",
          tools: ["HTML", "CSS", "JavaScript", "UI Design", "CMS"],
          image: "assets/projects/gemeinde-heinersreuth-home.png",
          imageAlt: "Startseite der Gemeinde Heinersreuth",
        },
        {
          id: "saga-medien-mysyde",
          category: "screen-designs",
          categoryLabel: "MySyde Umsetzung",
          title: "SaGa Medien & Vertrieb OHG",
          description:
            "Grundeinrichtung und Umsetzung in MySyde für einen strukturierten digitalen Unternehmensauftritt.",
          detail:
            "Für SaGa Medien & Vertrieb OHG habe ich die Grundeinrichtung in MySyde vorbereitet und die Umsetzung innerhalb des Systems begleitet. Der Schwerpunkt lag auf sauberer Struktur, konsistenter Gestaltung und einer funktionalen Basis für den späteren Ausbau.",
          tools: ["MySyde", "Setup", "Content Structure", "UI Styling"],
          image: "assets/projects/saga-medien-vg-creussen.png",
          imageAlt: "MySyde Umsetzung für SaGa Medien und VG Creußen",
        },
        {
          id: "protec-magnets-banners",
          category: "screen-designs",
          categoryLabel: "Print Design",
          title: "Protec Auto-Magnete & Banner",
          description:
            "Neues Design für Auto-Magnete und Banner mit klarer Markenwirkung und hoher Sichtbarkeit im Außenbereich.",
          detail:
            "Dieses Projekt war auf schnelle Wiedererkennbarkeit im öffentlichen Raum ausgerichtet. Die Gestaltung wurde so aufgebaut, dass Logo, Botschaft und Kontaktdaten auch aus Distanz klar funktionieren.",
          tools: ["Photoshop", "Illustrator", "Print Layout", "Branding"],
          image: "assets/projects/protec-auto-magnets-banners.png",
          imageAlt: "Protec Auto-Magnete und Banner Design",
        },
        {
          id: "wicklein-wood-energy-packaging",
          category: "brochures",
          categoryLabel: "Infopoint",
          title: "Wicklein Wood & Energy",
          description:
            "Neues Verpackungsdesign mit klarer Markenführung und passender visueller Sprache für das Produktumfeld.",
          detail:
            "Für Wicklein Wood & Energy habe ich eine Verpackungslösung entwickelt, die Markenidentität, Produktwirkung und klare Informationshierarchie miteinander verbindet.",
          tools: ["Packaging Design", "Illustrator", "Typography", "Branding"],
          image: "assets/projects/packaging-wicklein-wood-energy.png",
          imageAlt: "Packaging Design für Wicklein Wood & Energy",
        },
        {
          id: "ago-packaging",
          category: "screen-designs",
          categoryLabel: "Infopoint",
          title: "AGO Infopoint",
          description:
            "Verpackungsdesign und visuelle Aufbereitung für ein technisches Unternehmensumfeld.",
          detail:
            "Der Fokus lag auf einer klaren, technisch passenden Gestaltung mit professionellem Gesamtbild und gut lesbarer Informationsstruktur.",
          tools: ["InfoPoint UI", "Dashboard", "UI Design", "Information Design"],
          image: "assets/projects/ago-infopoint.png",
          imageAlt: "AGO Infopoint Design",
        },
        {
          id: "kuefner-infopoint",
          category: "brochures",
          categoryLabel: "Mietbroschüre",
          title: "Küfner Arbeitsbühnen",
          description:
            "Infopoint-Konzept mit strukturierter Oberfläche für Informationen, Orientierung und schnelle Bedienbarkeit.",
          detail:
            "Für Küfner Arbeitsbühnen habe ich ein Screen-Konzept entwickelt, das Informationen klar gliedert und auf eine direkte Nutzung im Unternehmens- oder Messekontext ausgerichtet ist.",
          tools: ["Screen Design", "UI Layout", "Information Design"],
          image: "assets/projects/kuefner-mietbroschuere.png",
          imageAlt: "Mietbroschüre für Küfner Arbeitsbühnen",
        },
        {
          id: "edeka-wiki-intranet",
          category: "screen-designs",
          categoryLabel: "Intranet Styling",
          title: "EDEKA Wiki Intranet Styling",
          description:
            "Visuelles Styling für ein internes Wiki- und Intranet-Umfeld mit Fokus auf Lesbarkeit und Struktur.",
          detail:
            "Hier stand eine saubere Informationsdarstellung im Vordergrund. Das Styling wurde so aufgebaut, dass Inhalte intern schneller erfasst und im täglichen Gebrauch angenehmer genutzt werden können.",
          tools: ["Intranet UI", "Typography", "Design System", "UX"],
          image: "assets/projects/edeka-wiki-intranet-styling.png",
          imageAlt: "EDEKA Wiki Intranet Styling",
        },
        {
          id: "uni-bayreuth-screen",
          category: "screen-designs",
          categoryLabel: "Screen Design",
          title: "Screendesign Uni Bayreuth",
          description:
            "Screen-Design-Arbeit für ein universitäres Umfeld mit klarer Struktur und professioneller visueller Sprache.",
          detail:
            "Das Projekt konzentrierte sich auf ein ruhiges, seriöses Interface mit klaren Informationsblöcken und einer Gestaltung, die zum akademischen Kontext passt.",
          tools: ["Screen Design", "Figma", "Layout", "UX"],
          image: "assets/projects/screendesign-uni-bayreuth.png",
          imageAlt: "Screendesign für die Uni Bayreuth",
        },
        {
          id: "doernhoefer-company-ad",
          category: "brochures",
          categoryLabel: "Anzeige",
          title: "Dörnhöfer Unternehmensanzeige",
          description:
            "Design für eine Unternehmensanzeige mit prägnanter Botschaft, klarer Typografie und professionellem Markenbild.",
          detail:
            "Für Dörnhöfer wurde eine Anzeige entwickelt, die Leistungen und Markencharakter kompakt vermittelt und im Printumfeld aufmerksamkeitsstark funktioniert.",
          tools: ["InDesign", "Illustrator", "Ad Design", "Typography"],
          image: "assets/projects/doernhoefer-company-ad.png",
          imageAlt: "Unternehmensanzeige für Dörnhöfer",
        },
        {
          id: "protec-company-ad",
          category: "brochures",
          categoryLabel: "Anzeige",
          title: "Protec Technologies Anzeige",
          description:
            "Unternehmensanzeige für Protec Technologies GmbH mit technischer Klarheit und sauberer Markenkommunikation.",
          detail:
            "Die Gestaltung wurde auf ein modernes, zuverlässiges Erscheinungsbild ausgerichtet und verbindet präzise Informationen mit einer klaren visuellen Hierarchie.",
          tools: ["Print Design", "Typography", "Corporate Design"],
          image: "assets/projects/protec-technologies-ad.png",
          imageAlt: "Anzeige für Protec Technologies",
        },
        {
          id: "ausbildungsmesse-flyer",
          category: "brochures",
          categoryLabel: "Flyer",
          title: "Flyer für Ausbildungsmesse",
          description:
            "Flyer-Entwicklung für eine Ausbildungsmesse mit klarer Zielgruppenansprache und gutem Informationsfluss.",
          detail:
            "Der Flyer wurde so gestaltet, dass junge Zielgruppen schnell die wichtigsten Inhalte erfassen und gleichzeitig ein professioneller Eindruck des Veranstalters entsteht.",
          tools: ["Flyer Design", "InDesign", "Typography", "Print Layout"],
          placeholder: "Flyer",
        },
        {
          id: "ago-tradefair-stand",
          category: "screen-designs",
          categoryLabel: "Messestand",
          title: "AGO Messestand Konzept",
          description:
            "Entwicklung eines Messestand-Konzepts für die Ausbildungsmesse mit klarer Markenpräsenz und guter Besucherführung.",
          detail:
            "Bei diesem Projekt ging es um die visuelle Planung eines Standes, der im Raum funktioniert, aufmerksam macht und Informationen klar kommuniziert.",
          tools: ["Exhibition Design", "Branding", "Visual Concept", "Layout"],
          placeholder: "Trade Fair",
        },
        {
          id: "hausaufgabenheft-ad",
          category: "brochures",
          categoryLabel: "Anzeige",
          title: "Hausaufgabenheft Anzeige",
          description:
            "Anzeigengestaltung für ein Hausaufgabenheft mit jugendnaher Ansprache und klarer Leserichtung.",
          detail:
            "Die Anzeige wurde auf ein junges Umfeld ausgerichtet und verbindet Aufmerksamkeit, Übersicht und Markenwirkung in einem kompakten Format.",
          tools: ["Ad Design", "Illustrator", "InDesign", "Layout"],
          image: "assets/projects/ago-hausaufgabenheft-anzeige.png",
          imageAlt: "AGO Hausaufgabenheft Anzeige",
        },
        {
          id: "kwb-screen-design",
          category: "screen-designs",
          categoryLabel: "Screen Design",
          title: "KWB Screendesigns",
          description:
            "Entwicklung von Screendesigns für das KWB Marketingcenter mit strukturierter Oberfläche und klarer Nutzerführung.",
          detail:
            "Für KWB habe ich Screendesigns entwickelt, die Inhalte, Medien und interne Prozesse visuell klar strukturieren. Der Fokus lag auf einer modernen Oberfläche und einer gut nutzbaren Informationslogik.",
          tools: ["Screen Design", "UI Design", "Dashboard Layout", "Responsive Design"],
          image: "assets/projects/kwb-screen.png",
          imageAlt: "Screendesign für das KWB Marketingcenter",
        },
        {
          id: "willach-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "Willach Portal",
          description:
            "Neue Designelemente, Stilisierung des Willach-Portals und responsive Umsetzung für eine moderne Benutzeroberfläche.",
          detail:
            "Ich habe das Willach-Portal visuell überarbeitet, neue Designbausteine entwickelt und die responsive Darstellung umgesetzt. Dadurch entstand ein klareres und moderneres Portal für den Arbeitsalltag.",
          tools: ["Portal Styling", "Responsive Design", "UI Elements", "Intranet UI"],
          image: "assets/projects/willach-intranet.png",
          imageAlt: "Willach Portal und Intranet Styling",
        },
        {
          id: "gwb-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "GWB Portal",
          description:
            "Stilisierung des GWB-Portals mit responsiver Umsetzung und klarer Gestaltung für interne Inhalte.",
          detail:
            "Für GWB habe ich das Portal gestalterisch überarbeitet und responsiv umgesetzt. Die Struktur wurde so aufgebaut, dass News, Kommunikation und interne Bereiche schnell erfassbar bleiben.",
          tools: ["Portal Styling", "Responsive Design", "Intranet UI", "Dashboard"],
          image: "assets/projects/gwb-intranet.png",
          imageAlt: "GWB Portal Styling",
        },
        {
          id: "premo-group-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "PREMO Group Portal",
          description:
            "Neue Designelemente, Stilisierung des PREMO-Portals und responsive Umsetzung für ein modernes Intranet-Erlebnis.",
          detail:
            "Ich habe für PREMO Group neue Designbausteine entwickelt, das Portal visuell stilisiert und die responsive Darstellung umgesetzt. Das Ergebnis ist ein klar gegliedertes Portal mit starker Markenwirkung.",
          tools: ["Portal Styling", "Responsive Design", "UI Elements", "Intranet UI"],
          image: "assets/projects/premo-intranet.png",
          imageAlt: "PREMO Group Portal Styling",
        },
        {
          id: "drz-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "DRZ Portal",
          description:
            "Stilisierung des DRZ-Portals mit klarer Benutzeroberfläche und strukturiertem Aufbau für interne Inhalte.",
          detail:
            "Beim DRZ-Portal lag mein Fokus auf einer klaren visuellen Struktur, guten Kontrasten und einer benutzerfreundlichen Darstellung für die wichtigsten Portalbereiche.",
          tools: ["Portal Styling", "UI Design", "Information Design", "Dashboard"],
          image: "assets/projects/drz-infopoint.png",
          imageAlt: "DRZ Portal Styling",
        },
        {
          id: "kadeco-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "KADECO Portal",
          description:
            "Stilisierung des KADECO-Portals, responsive Umsetzung und Integration der Mehrsprachigkeit.",
          detail:
            "Für KADECO habe ich das Portal gestaltet, responsiv umgesetzt und die Mehrsprachigkeit integriert. Dadurch wurde die Benutzeroberfläche sowohl visuell stimmig als auch flexibler für verschiedene Sprachversionen.",
          tools: ["Portal Styling", "Responsive Design", "Multilingual UI", "Intranet UI"],
          image: "assets/projects/kadeco-intranet.png",
          imageAlt: "KADECO Portal Styling",
        },
        {
          id: "schiller-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "SCHILLER Portal",
          description:
            "Stilisierung des SCHILLER-Portals und responsive Umsetzung für einen klaren und modernen internen Auftritt.",
          detail:
            "Ich habe das SCHILLER-Portal visuell überarbeitet und für verschiedene Bildschirmgrößen responsiv angepasst. Ziel war eine strukturierte Oberfläche mit starker Wiedererkennbarkeit.",
          tools: ["Portal Styling", "Responsive Design", "UI Design", "Intranet UI"],
          image: "assets/projects/schiller-intranet.png",
          imageAlt: "SCHILLER Portal Styling",
        },
        {
          id: "tourismusteam-nordstrand",
          category: "websites",
          categoryLabel: "Website",
          title: "TourismusTeam Nordstrand",
          description:
            "Screen Design, Websitebau, Überarbeitung von Änderungen und GoLive für einen touristischen Webauftritt.",
          detail:
            "Bei TourismusTeam Nordstrand habe ich den Screen-Design-Prozess begleitet, die Website selbst aufgebaut, Änderungen eingearbeitet und den GoLive umgesetzt. Damit wurde aus dem Entwurf ein vollständiger live geschalteter Webauftritt.",
          tools: ["Screen Design", "HTML", "CSS", "JavaScript", "GoLive"],
          image: "assets/projects/tourismusteam-nordstrand.png",
          imageAlt: "Website von TourismusTeam Nordstrand",
        },
        {
          id: "ago-infopoint-dashboard",
          category: "screen-designs",
          categoryLabel: "Infopoint",
          title: "AGO Dashboard Infopoint",
          description:
            "Dashboard- und Infopoint-Design für AGO mit Live-Daten, Kennzahlen und einer klaren Kachelstruktur.",
          detail:
            "Dieses AGO-Konzept zeigt die von mir gestaltete Dashboard-Ansicht für einen Infopoint. Der Fokus lag auf Live-Daten, technischem Kontext und einer klaren visuellen Führung durch die Inhalte.",
          tools: ["Dashboard", "InfoPoint UI", "Data Visualisation", "UI Design"],
          image: "assets/projects/ago-infopoint-dashboard.png",
          imageAlt: "Dashboard Infopoint für AGO",
        },
        {
          id: "awo-infopoint",
          category: "screen-designs",
          categoryLabel: "Infopoint",
          title: "AWO Infopoint",
          description:
            "Infopoint für eine Kita mit Informationen zu Tagesabläufen, Essensplänen und organisatorischen Hinweisen.",
          detail:
            "Für AWO habe ich einen Infopoint gestaltet, der wichtige Informationen für den Kita-Alltag klar und freundlich aufbereitet. Dazu gehören Termine, Mittagessen, Hinweise und Kontaktinformationen.",
          tools: ["InfoPoint UI", "Information Design", "Dashboard Layout", "UI Design"],
          image: "assets/projects/awo-infopoint.png",
          imageAlt: "AWO Infopoint Design",
        },
        {
          id: "klp-business-card",
          category: "business-cards",
          categoryLabel: "Visitenkarte",
          title: "KLP Visitenkarte",
          description:
            "Neues Design für eine Visitenkarte mit klarer Markenführung und direkter Kontaktstruktur.",
          detail:
            "Für KLP habe ich eine Visitenkarte gestaltet, die Markenfarben, technische Bildwelt und Kontaktinformationen sauber miteinander verbindet. Ziel war ein professioneller und direkt nutzbarer Firmenauftritt im Printformat.",
          tools: ["Business Card Design", "Branding", "Print Layout", "Typography"],
          image: "assets/projects/klp-visitenkarte.png",
          imageAlt: "Visitenkarten-Design für KLP",
        },
        {
          id: "wicklein-flyer",
          category: "brochures",
          categoryLabel: "Broschüre",
          title: "Wicklein Flyer",
          description:
            "Druckbarer Flyer mit Leistungsübersicht, Standorten und einer klar strukturierten Darstellung der Unternehmensbereiche.",
          detail:
            "Dieser Flyer wurde für Wicklein als druckbare Übersicht gestaltet. Ich habe Inhalte, Karten, Leistungsblöcke und Bilder so aufgebaut, dass der Gesamtauftritt informativ und professionell wirkt.",
          tools: ["Brochure Design", "Print Layout", "Branding", "Information Design"],
          image: "assets/projects/wicklein-broschuere.png",
          imageAlt: "Druckbarer Wicklein Flyer",
        },
        {
          id: "wicklein-wood-energy-website",
          category: "websites",
          categoryLabel: "Website",
          title: "Wicklein Wood & Energy",
          description:
            "Screen Design und Websitebau für Wicklein Wood & Energy mit modernem Auftritt und klarer Bildsprache.",
          detail:
            "Ich habe für Wicklein Wood & Energy sowohl das Screendesign als auch die Website selbst entwickelt. Der Fokus lag auf einem starken visuellen Auftritt, klaren Leistungsbereichen und einer modernen Unternehmensdarstellung.",
          tools: ["Screen Design", "HTML", "CSS", "JavaScript", "Website Build"],
          image: "assets/projects/wicklein-wood-energy-website.png",
          imageAlt: "Website von Wicklein Wood & Energy",
        },
        {
          id: "wicklein-bag-designs",
          category: "brochures",
          categoryLabel: "Verpackungsdesign",
          title: "Wicklein Sackdesigns",
          description:
            "Neue Designs für Säcke sowie Logoentwicklung für Wicklein Wood & Energy GmbH.",
          detail:
            "Für Wicklein Wood & Energy habe ich neue Designs für die Säcke entwickelt und die visuelle Markenführung inklusive Logoarbeit weiter aufgebaut. Das Projekt verbindet Verpackung, Produktpräsenz und Wiedererkennbarkeit.",
          tools: ["Packaging Design", "Logo Design", "Illustrator", "Branding"],
          image: "assets/projects/wicklein-wood-energy-bags.png",
          imageAlt: "Neue Sackdesigns für Wicklein Wood & Energy",
        },
        {
          id: "team-photo-editing",
          category: "social-media",
          categoryLabel: "Bildbearbeitung",
          title: "Bearbeitung von Teamfotos",
          description:
            "Retusche und visuelle Aufbereitung von Teamfotos für einen einheitlichen, professionellen Unternehmensauftritt.",
          detail:
            "Auch die Nachbearbeitung von Bildmaterial gehört zu meinem Workflow. Dazu zählen Farbkorrektur, Freistellung, Bildharmonie und die Vorbereitung für Web, Print oder Social Media.",
          tools: ["Photoshop", "Retouching", "Color Correction", "Image Editing"],
          image: "assets/projects/rotec-photo-editing.png",
          imageAlt: "Vorher-Nachher Bearbeitung von Teamfotos",
        },
      ],
    },
    services: {
      kicker: "Leistungen",
      title: "Digitale Gestaltung für starke Auftritte.",
      item1Title: "Websites",
      item1Copy: "Moderne, responsive Websites für Unternehmen, Bewerbungen und kreative Projekte.",
      item2Title: "Screen Design",
      item2Copy: "Klare Benutzeroberflächen, Landingpages und Layouts mit Fokus auf Struktur und Nutzerführung.",
      item3Title: "Print & Branding",
      item3Copy: "Visitenkarten, Broschüren und visuelle Gestaltung für einen konsistenten Markenauftritt.",
      item4Title: "Content & Video",
      item4Copy: "Social Media Assets, Video Editing und digitale Inhalte für Reichweite und Wiedererkennung.",
    },
    experience: {
      kicker: "Erfahrung",
      title: "Beruf, Ausbildung und Studium.",
      intro:
        "Ein Überblick über meinen beruflichen Weg, meine Ausbildung und mein aktuelles Studium im Bereich Technologie und digitale Gestaltung.",
      cvCta: "Lebenslauf herunterladen",
      applicationCta: "Bewerbung herunterladen",
      block1Label: "Berufserfahrung",
      block1Title: "Webdesigner & Frontend Entwickler",
      block1Org: "breadcrumb mediasolutions GmbH",
      block1Date: "09.2023 - heute",
      block1Copy:
        "Während meiner vierjährigen Berufserfahrung war ich an der Entwicklung und Betreuung zahlreicher Websites sowie digitaler Projekte beteiligt. Zu meinen Aufgaben gehörten die Gestaltung moderner Benutzeroberflächen, die technische Umsetzung responsiver Websites, die Erstellung von Werbematerialien und digitalen Inhalten sowie die Zusammenarbeit mit Kunden und Projektteams.",
      block2Label: "Ausbildung",
      block2Title: "Fachinformatiker für Anwendungsentwicklung",
      block2Org: "breadcrumb mediasolutions GmbH",
      block2Date: "09.2023 - 06.2026",
      block2Copy:
        "Während meiner Ausbildung bei breadcrumb mediasolutions GmbH war ich direkt in reale Kundenprojekte eingebunden. Dort habe ich den größten Teil meiner Websites, Screen Designs, Printmaterialien, CMS-Strukturen, Social-Media-Assets und digitalen Markenauftritte gestaltet und umgesetzt.",
      block2Tag1: "Schwerpunkt Webentwicklung",
      block2Tag2: "Erfolgreich abgeschlossen",
      block2Tag3: "Corporate Websites & Portale",
      block2Tag4: "Screen Design & UI Konzepte",
      block2Tag5: "Print, Content & Social Media",
      block3Label: "Studium",
      block3Title: "Bachelorstudium Computer Engineering",
      block3Org: "Charkiwer Nationaluniversität für Radioelektronik (ChNURE)",
      block3Date: "seit 2023",
      block3Tag1: "Aktuell im 4. Studienjahr",
    },
    presence: {
      kicker: "Online Präsenz",
      title: "Public Presence & digitale Reichweite.",
      copy:
        "Neben Websites und Designprojekten entwickle ich auch Content, persönliche Formate und Social Media Präsenz über mehrere Plattformen hinweg.",
      instagram: "33.000+ Community",
      tiktok: "Short-form content & reach",
      youtube: "Vlogs, storytelling & video",
      linkedin: "Professional profile",
    },
    lifestyle: {
      kicker: "Hobbys & Persönlichkeit",
      title: "Was mich außerhalb der Arbeit inspiriert.",
      copy:
        "Reisen, Musik, Konzerte, Blogging, Videoformate und ein aktiver Lifestyle inspirieren meine Arbeit und beeinflussen, wie ich Marken, Content und digitale Erlebnisse denke. Dieser Bereich zeigt die persönlichen Interessen, die meine Kreativität mitprägen.",
      tag1: "Reisen",
      tag2: "Konzerte & Musik",
      tag3: "Blogging & Social Media",
      tag4: "Content Produktion",
      tag5: "Vlogs & Storytelling",
      tag6: "Fitness & Gym",
      caption1: "Travel inspiration",
      caption2: "Street & personal branding",
      caption3: "Culture & live experiences",
      caption4: "Visual storytelling",
    },
    contact: {
      kicker: "Kontakt",
      overline: "Haben Sie ein Projekt im Kopf?",
      title: "Lassen Sie uns zusammen etwas Starkes gestalten.",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
      instagramLabel: "Instagram",
      name: "Name",
      namePlaceholder: "Ihr Name",
      email: "E-Mail",
      emailPlaceholder: "name@unternehmen.de",
      subject: "Worum geht es?",
      subjectOption1: "Websites",
      subjectOption2: "Screen Design",
      subjectOption3: "Visitenkarten / Broschüren",
      subjectOption4: "Social Media",
      subjectOption5: "Video",
      message: "Nachricht",
      messagePlaceholder: "Erzählen Sie mir kurz von Ihrem Projekt ...",
      submit: "Nachricht senden",
      note: "Das Formular öffnet Ihr E-Mail-Programm. Es werden keine Daten gespeichert.",
      sentSubject: "Portfolio-Anfrage",
    },
    footer: {
      copy: "Webdesigner & Frontend Entwickler<br>Portfolio & Digital Presence",
      backToTop: "Nach oben ↑",
      copyright: "©",
    },
  },
  en: {
    meta: {
      title: "Khalil Nabu - Web Designer & Frontend Developer",
      description:
        "Portfolio of Khalil Nabu, web designer and frontend developer focused on modern websites, screen design and digital content.",
    },
    common: {
      skip: "Skip to content",
    },
    header: {
      brandAria: "Khalil Nabu homepage",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      navAria: "Main navigation",
      navHome: "Home",
      navAbout: "About",
      navProjects: "Projects",
      navServices: "Services",
      navExperience: "Experience",
      navContact: "Contact",
      languageAria: "Choose language",
      contactCta: "Contact",
    },
    hero: {
      status: "Available for new projects",
      titleLine1: "Hello, I am Khalil Nabu.",
      titleLine2: "Web Designer & Frontend Developer.",
      copy: "I create modern websites, clean user interfaces and digital content for brands, companies and creative projects.",
      primaryCta: "View Projects",
      secondaryCta: "Get in Touch",
      cvCta: "Download CV",
      applicationCta: "Download Application",
      ticker1: "WEB DESIGN",
      ticker2: "FRONTEND",
      ticker3: "SCREEN DESIGN",
      ticker4: "CONTENT",
      ticker5: "SOCIAL MEDIA",
      ticker6: "VIDEO EDITING",
    },
    about: {
      kicker: "About",
      title: "Focused on clean digital experiences.",
      copy: "I am a qualified application development specialist with four years of professional experience in web design, frontend development and digital media. My focus is on modern company websites, responsive design, clean user interfaces and creative digital content.",
      copySecondary:
        "I combine design, structure and technical execution into digital presences that look professional and feel easy to use.",
      link: "More about my journey",
      cvCta: "Download CV",
      applicationCta: "Download Application",
      fact1: "Years of experience",
      fact2: "Instagram community",
      fact3: "Bilingual for international communication",
      fact4: "Design, code and content",
    },
    skills: {
      kicker: "Skills & Tools",
      title: "Design meets technology.",
      intro: "A versatile profile for modern brand presences, digital products and visual communication.",
      webTitle: "Web Development",
      webList: "HTML5, CSS3, JavaScript, Responsive Web Design, WordPress, CMS",
      designTitle: "Design",
      designList: "Figma, Adobe XD, Photoshop, Illustrator, InDesign, UI Design, Screen Design",
      contentTitle: "Content & Video",
      contentList: "Premiere Pro, After Effects, Final Cut Pro, Canva, Social Media, Content Creation, Video Editing",
      platformsTitle: "Platforms",
      platformsList: "Instagram, TikTok, YouTube, LinkedIn, Facebook, Meta Business Suite, Facebook Ads, Google Ads",
    },
    projects: {
      kicker: "Portfolio",
      title: "Selected<br>Projects",
      filtersAria: "Filter projects",
      filterAll: "All",
      filterWebsites: "Websites",
      filterScreenDesigns: "Screen Designs",
      filterBusinessCards: "Business Cards",
      filterBrochures: "Brochures",
      filterSocialMedia: "Social Media",
      filterVideo: "Video",
      showMore: "Show More",
      viewMore: "View More",
      toolsLabel: "Tools",
      detailLabel: "Project Description",
      modalCta: "Discuss Project",
      liveCta: "View Live Website",
      modalCloseAria: "Close project",
      zoomHint: "Full view",
      uploadNote:
        "You can later add more screenshots, PDFs or videos inside assets/projects and link them directly in the project list.",
      emptyTitle: "No project in this category yet",
      emptyCopy:
        "Additional reels, videos or more work samples can be added here later.",
      items: [
        {
          id: "mt-propeller",
          category: "websites",
          categoryLabel: "Website",
          title: "MT-Propeller Facts",
          description:
            "Technical comparison and corporate website with product logic, search system, map module and document downloads.",
          detail:
            "For MT-Propeller I created the complete design and technical implementation of the project. The website combines a complex technical comparison with clear information architecture, filter and search functions, map views and downloadable documents.",
          tools: ["MySite", "HTML", "CSS", "JavaScript", "PHP"],
          image: "assets/projects/mt-propeller-home.png",
          imageAlt: "MT-Propeller project homepage",
          link: "https://www.mt-website.breadcrumb-online.de/",
        },
        {
          id: "tima-tungsten",
          category: "websites",
          categoryLabel: "Website",
          title: "Tima Tungsten",
          description:
            "Complete company presence with a multilingual website, modern screen design and structured product presentation.",
          detail:
            "I designed and built this project end to end. The focus was a clean technical brand presence, understandable product communication and a multilingual structure for international audiences.",
          tools: ["Figma", "HTML", "CSS", "JavaScript", "CMS"],
          image: "assets/projects/tima-tungsten-home.png",
          imageAlt: "Tima Tungsten website homepage",
          link: "https://tima-tungsten.de/",
        },
        {
          id: "klp-baumaschinen",
          category: "websites",
          categoryLabel: "Website",
          title: "KLP Baumaschinen",
          description:
            "Corporate website with category logic, equipment finder structure and custom-made icons for machine segments.",
          detail:
            "For KLP Baumaschinen I structured, designed and implemented the website. A key part of the work was clear categorization, fast user orientation and the custom icons I created for each service area.",
          tools: ["Figma", "HTML", "CSS", "JavaScript", "Custom Icons"],
          image: "assets/projects/klp-home.png",
          imageAlt: "KLP Baumaschinen homepage",
          link: "https://www.klp-baumaschinen.de/",
        },
        {
          id: "wicklein-group",
          category: "screen-designs",
          categoryLabel: "Screen Design & Website",
          title: "Wicklein Group",
          description:
            "Screen design and website relaunch including logo development, brand structure and supporting brochures and print materials.",
          detail:
            "In this project I was responsible for the screen design and website development. I also contributed to the logo and created additional visual material such as brochures and supporting brand assets.",
          tools: ["Screen Design", "Logo Design", "HTML", "CSS", "Branding"],
          image: "assets/projects/wicklein-home.png",
          imageAlt: "Wicklein Group website",
          link: "https://www.wicklein-group.de/",
        },
        {
          id: "ausbildungsportal-kulmbach",
          category: "websites",
          categoryLabel: "Website",
          title: "Ausbildungsportal Kulmbach",
          description:
            "Training and job portal for regional career search with a clear job overview, strong UX and easy orientation for students and companies.",
          detail:
            "This portal was developed to help users find apprenticeships in the region. I worked on the design and implementation so that job listings, internships and company pages are clearly structured, easy to filter and mobile-friendly.",
          tools: ["UI Design", "HTML", "CSS", "JavaScript", "Portal UX"],
          image: "assets/projects/ausbildungsportal-home.png",
          imageAlt: "Ausbildungsportal Kulmbach homepage",
          link: "https://www.ausbildungsportal-kulmbach.de/",
        },
        {
          id: "bindlach-rathaus",
          category: "websites",
          categoryLabel: "Website",
          title: "Gemeinde Bindlach",
          description:
            "Municipal website with clear information architecture for public services, local content and a modern civic web presence.",
          detail:
            "For the municipality of Bindlach I contributed to a clear and trustworthy website experience. The goal was to make important information for citizens easy to reach while creating a modern digital presence for the community.",
          tools: ["HTML", "CSS", "JavaScript", "Information Design", "CMS"],
          image: "assets/projects/bindlach-home.png",
          imageAlt: "Gemeinde Bindlach website",
          link: "https://bindlach-rathaus.breadcrumb-online.de/",
        },
        {
          id: "enjoy-future",
          category: "websites",
          categoryLabel: "Website",
          title: "enjoy future GmbH",
          description:
            "Implementation based on the screen designs with responsive website development and polished styling.",
          detail:
            "For enjoy future GmbH I implemented the website based on the approved screen designs, built the responsive frontend and refined the visual styling. The focus was on clean implementation quality and a consistent user experience across screen sizes.",
          tools: ["HTML", "CSS", "JavaScript", "Responsive Design", "Styling"],
          image: "assets/projects/enjoy-future-website.png",
          imageAlt: "Website implementation for enjoy future GmbH",
        },
        {
          id: "instagram-campaigns",
          category: "social-media",
          categoryLabel: "Social Media",
          title: "Ausbildungsportal Instagram Posts",
          description:
            "Instagram post series, content templates and publication planning for recruiting and information campaigns.",
          detail:
            "Alongside websites I also create social media content. This includes visual post series, reusable templates, publishing plans and assets that work both informatively and with strong visual impact.",
          tools: ["Photoshop", "Illustrator", "Canva", "Instagram", "Content Planning"],
          image: "assets/projects/instagram-profile-posts.png",
          imageAlt: "Instagram profile and post designs for Ausbildungsportal",
        },
        {
          id: "tshirt-designs",
          category: "business-cards",
          categoryLabel: "Logo Design",
          title: "Dörnhöfer Logo & Workwear",
          description:
            "T-shirt designs and branding mockups for employer branding, teamwear and event appearances with multiple logo variations.",
          detail:
            "These concepts show how I translate logos and brand identity onto physical products. The series includes different placements, visual directions and mockups for a consistent appearance.",
          tools: ["Illustrator", "Photoshop", "Mockup Design", "Branding"],
          image: "assets/projects/doernhoefer-logo-design.png",
          imageAlt: "Dörnhöfer logo design and workwear application",
        },
        {
          id: "invitation-designs",
          category: "brochures",
          categoryLabel: "Invitation Design",
          title: "Event & Invitation Design",
          description:
            "Invitation layouts for private and festive events with image composition, typography and print-ready design systems.",
          detail:
            "I also work on print-focused layouts from concept to final version. These examples show invitations with emotional imagery, clear structure and different design styles tailored to the occasion.",
          tools: ["Photoshop", "InDesign", "Typography", "Print Layout"],
          image: "assets/projects/invitation-design-1.png",
          imageAlt: "Designed invitation for an event",
        },
        {
          id: "gemeinde-heinersreuth",
          category: "websites",
          categoryLabel: "Website",
          title: "Gemeinde Heinersreuth",
          description:
            "Modern municipal website with a clear homepage, service areas and structured user guidance for citizens.",
          detail:
            "This example shows my work on civic interfaces with a trustworthy visual language, strong overview and quick access to key topics such as public service, living and leisure.",
          tools: ["HTML", "CSS", "JavaScript", "UI Design", "CMS"],
          image: "assets/projects/gemeinde-heinersreuth-home.png",
          imageAlt: "Gemeinde Heinersreuth homepage",
        },
        {
          id: "saga-medien-mysyde",
          category: "screen-designs",
          categoryLabel: "MySyde Implementation",
          title: "SaGa Medien & Vertrieb OHG",
          description:
            "Basic setup and implementation in MySyde for a structured digital company presence.",
          detail:
            "For SaGa Medien & Vertrieb OHG I prepared the basic setup in MySyde and supported the implementation inside the system. The focus was on clean structure, visual consistency and a functional base for future expansion.",
          tools: ["MySyde", "Setup", "Content Structure", "UI Styling"],
          image: "assets/projects/saga-medien-vg-creussen.png",
          imageAlt: "MySyde implementation for SaGa Medien and VG Creußen",
        },
        {
          id: "protec-magnets-banners",
          category: "brochures",
          categoryLabel: "Print Design",
          title: "Protec Auto Magnets & Banners",
          description:
            "New design for auto magnets and banners with strong brand visibility and outdoor readability.",
          detail:
            "This project focused on fast recognition in public space. The layout was developed so that logo, message and contact information stay clear even from a distance.",
          tools: ["Photoshop", "Illustrator", "Print Layout", "Branding"],
          image: "assets/projects/protec-auto-magnets-banners.png",
          imageAlt: "Protec auto magnets and banners design",
        },
        {
          id: "wicklein-wood-energy-packaging",
          category: "brochures",
          categoryLabel: "Packaging Design",
          title: "Wicklein Wood & Energy",
          description:
            "New packaging design with clear brand guidance and a visual language tailored to the product context.",
          detail:
            "For Wicklein Wood & Energy I developed a packaging solution that combines brand identity, product appeal and a strong information hierarchy.",
          tools: ["Packaging Design", "Illustrator", "Typography", "Branding"],
          image: "assets/projects/packaging-wicklein-wood-energy.png",
          imageAlt: "Packaging design for Wicklein Wood & Energy",
        },
        {
          id: "ago-packaging",
          category: "screen-designs",
          categoryLabel: "Infopoint",
          title: "AGO Infopoint",
          description:
            "Packaging design and visual preparation for a technical company environment.",
          detail:
            "The focus was a clear and technically fitting design with a professional overall appearance and readable information structure.",
          tools: ["InfoPoint UI", "Dashboard", "UI Design", "Information Design"],
          image: "assets/projects/ago-infopoint.png",
          imageAlt: "AGO infopoint design",
        },
        {
          id: "kuefner-infopoint",
          category: "screen-designs",
          categoryLabel: "Infopoint",
          title: "Küfner Arbeitsbühnen",
          description:
            "Infopoint concept with a structured interface for information, orientation and quick usability.",
          detail:
            "For Küfner Arbeitsbühnen I developed a screen concept that organizes information clearly and is aimed at direct use in a company or trade fair context.",
          tools: ["Screen Design", "UI Layout", "Information Design"],
          image: "assets/projects/kuefner-mietbroschuere.png",
          imageAlt: "Rental brochure for Küfner Arbeitsbühnen",
        },
        {
          id: "edeka-wiki-intranet",
          category: "screen-designs",
          categoryLabel: "Intranet Styling",
          title: "EDEKA Wiki Intranet Styling",
          description:
            "Visual styling for an internal wiki and intranet environment with a focus on readability and structure.",
          detail:
            "This work focused on clean information presentation so internal content becomes easier to scan and more pleasant to use in day-to-day work.",
          tools: ["Intranet UI", "Typography", "Design System", "UX"],
          image: "assets/projects/edeka-wiki-intranet-styling.png",
          imageAlt: "EDEKA wiki intranet styling",
        },
        {
          id: "uni-bayreuth-screen",
          category: "screen-designs",
          categoryLabel: "Screen Design",
          title: "Screen Design Uni Bayreuth",
          description:
            "Screen design work for a university context with clear structure and a professional visual tone.",
          detail:
            "The project focused on a calm and serious interface with clear information blocks and a visual language appropriate for an academic environment.",
          tools: ["Screen Design", "Figma", "Layout", "UX"],
          image: "assets/projects/screendesign-uni-bayreuth.png",
          imageAlt: "Screen design for the University of Bayreuth",
        },
        {
          id: "doernhoefer-company-ad",
          category: "brochures",
          categoryLabel: "Ad Design",
          title: "Dörnhöfer Company Ad",
          description:
            "Company advertisement design with a clear message, strong typography and professional brand presentation.",
          detail:
            "For Dörnhöfer I developed an ad layout that communicates services and brand character in a compact and attention-grabbing print format.",
          tools: ["InDesign", "Illustrator", "Ad Design", "Typography"],
          image: "assets/projects/doernhoefer-company-ad.png",
          imageAlt: "Company ad for Dörnhöfer",
        },
        {
          id: "protec-company-ad",
          category: "brochures",
          categoryLabel: "Ad Design",
          title: "Protec Technologies Ad",
          description:
            "Corporate advertisement for Protec Technologies GmbH with technical clarity and clean brand communication.",
          detail:
            "The design was built around a modern and reliable appearance, combining precise information with a clear visual hierarchy.",
          tools: ["Print Design", "Typography", "Corporate Design"],
          image: "assets/projects/protec-technologies-ad.png",
          imageAlt: "Corporate ad for Protec Technologies",
        },
        {
          id: "ausbildungsmesse-flyer",
          category: "brochures",
          categoryLabel: "Flyer",
          title: "Training Fair Flyer",
          description:
            "Flyer development for a training fair with clear audience targeting and strong information flow.",
          detail:
            "The flyer was designed so younger audiences can capture the key content quickly while the organizer still appears professional and well structured.",
          tools: ["Flyer Design", "InDesign", "Typography", "Print Layout"],
          placeholder: "Flyer",
        },
        {
          id: "ago-tradefair-stand",
          category: "screen-designs",
          categoryLabel: "Trade Fair Stand",
          title: "AGO Trade Fair Stand Concept",
          description:
            "Trade fair stand concept for a training fair with clear brand presence and strong visitor guidance.",
          detail:
            "This project focused on the visual planning of a stand that works in physical space, attracts attention and communicates information clearly.",
          tools: ["Exhibition Design", "Branding", "Visual Concept", "Layout"],
          placeholder: "Trade Fair",
        },
        {
          id: "hausaufgabenheft-ad",
          category: "brochures",
          categoryLabel: "Ad Design",
          title: "Homework Planner Ad",
          description:
            "Advertisement design for a homework planner with youth-oriented communication and a clear reading flow.",
          detail:
            "The layout was tailored to a younger audience and combines attention, clarity and brand impact in a compact format.",
          tools: ["Ad Design", "Illustrator", "InDesign", "Layout"],
          image: "assets/projects/ago-hausaufgabenheft-anzeige.png",
          imageAlt: "AGO homework planner ad",
        },
        {
          id: "kwb-screen-design",
          category: "screen-designs",
          categoryLabel: "Screen Design",
          title: "KWB Screen Designs",
          description:
            "Development of screen designs for the KWB marketing center with a structured interface and clear user guidance.",
          detail:
            "For KWB I developed screen designs that organize content, media and internal processes in a visually clear way. The focus was on a modern interface and a strong information structure.",
          tools: ["Screen Design", "UI Design", "Dashboard Layout", "Responsive Design"],
          image: "assets/projects/kwb-screen.png",
          imageAlt: "Screen design for the KWB marketing center",
        },
        {
          id: "willach-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "Willach Portal",
          description:
            "New design elements, visual styling of the Willach portal and responsive implementation for a modern interface.",
          detail:
            "I visually refined the Willach portal, created new design elements and implemented the responsive layout. The result is a cleaner and more modern portal for everyday internal use.",
          tools: ["Portal Styling", "Responsive Design", "UI Elements", "Intranet UI"],
          image: "assets/projects/willach-intranet.png",
          imageAlt: "Willach portal and intranet styling",
        },
        {
          id: "gwb-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "GWB Portal",
          description:
            "Styling of the GWB portal with responsive implementation and a clear layout for internal content.",
          detail:
            "For GWB I redesigned the portal visually and implemented it responsively. The structure was built so news, communication and internal sections stay easy to understand.",
          tools: ["Portal Styling", "Responsive Design", "Intranet UI", "Dashboard"],
          image: "assets/projects/gwb-intranet.png",
          imageAlt: "GWB portal styling",
        },
        {
          id: "premo-group-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "PREMO Group Portal",
          description:
            "New design elements, portal styling and responsive implementation for a modern PREMO intranet experience.",
          detail:
            "For PREMO Group I created new design components, styled the portal and implemented the responsive behavior. The result is a clearly structured portal with stronger brand presence.",
          tools: ["Portal Styling", "Responsive Design", "UI Elements", "Intranet UI"],
          image: "assets/projects/premo-intranet.png",
          imageAlt: "PREMO Group portal styling",
        },
        {
          id: "drz-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "DRZ Portal",
          description:
            "Styling of the DRZ portal with a clean user interface and structured layout for internal content.",
          detail:
            "For the DRZ portal I focused on clear visual structure, good contrast and a user-friendly presentation of the most important portal areas.",
          tools: ["Portal Styling", "UI Design", "Information Design", "Dashboard"],
          image: "assets/projects/drz-infopoint.png",
          imageAlt: "DRZ portal styling",
        },
        {
          id: "kadeco-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "KADECO Portal",
          description:
            "Styling of the KADECO portal, responsive implementation and multilingual integration.",
          detail:
            "For KADECO I designed the portal, implemented the responsive behavior and integrated multilingual support. This made the interface more flexible and visually consistent across language versions.",
          tools: ["Portal Styling", "Responsive Design", "Multilingual UI", "Intranet UI"],
          image: "assets/projects/kadeco-intranet.png",
          imageAlt: "KADECO portal styling",
        },
        {
          id: "schiller-portal",
          category: "screen-designs",
          categoryLabel: "Portal Styling",
          title: "SCHILLER Portal",
          description:
            "Styling of the SCHILLER portal and responsive implementation for a clean and modern internal experience.",
          detail:
            "I visually refined the SCHILLER portal and adapted it responsively for different screen sizes. The goal was a structured interface with strong brand recognition.",
          tools: ["Portal Styling", "Responsive Design", "UI Design", "Intranet UI"],
          image: "assets/projects/schiller-intranet.png",
          imageAlt: "SCHILLER portal styling",
        },
        {
          id: "tourismusteam-nordstrand",
          category: "websites",
          categoryLabel: "Website",
          title: "TourismusTeam Nordstrand",
          description:
            "Screen design, website build, change revisions and go-live for a tourism-focused website.",
          detail:
            "For TourismusTeam Nordstrand I worked on the screen design, built the website, implemented requested changes and handled the go-live. This turned the concept into a complete live website.",
          tools: ["Screen Design", "HTML", "CSS", "JavaScript", "GoLive"],
          image: "assets/projects/tourismusteam-nordstrand.png",
          imageAlt: "TourismusTeam Nordstrand website",
        },
        {
          id: "ago-infopoint-dashboard",
          category: "screen-designs",
          categoryLabel: "Infopoint",
          title: "AGO Dashboard Infopoint",
          description:
            "Dashboard and infopoint design for AGO with live data, key figures and a clearly structured tile layout.",
          detail:
            "This AGO concept shows the dashboard view I designed for an infopoint. The focus was live data, technical context and a clear visual hierarchy across the interface.",
          tools: ["Dashboard", "InfoPoint UI", "Data Visualisation", "UI Design"],
          image: "assets/projects/ago-infopoint-dashboard.png",
          imageAlt: "AGO dashboard infopoint",
        },
        {
          id: "awo-infopoint",
          category: "screen-designs",
          categoryLabel: "Infopoint",
          title: "AWO Infopoint",
          description:
            "Infopoint for a kindergarten with information about daily routines, meal plans and organisational updates.",
          detail:
            "For AWO I designed an infopoint that prepares important kindergarten information in a clear and friendly way. This includes appointments, meals, notes and contact details.",
          tools: ["InfoPoint UI", "Information Design", "Dashboard Layout", "UI Design"],
          image: "assets/projects/awo-infopoint.png",
          imageAlt: "AWO infopoint design",
        },
        {
          id: "klp-business-card",
          category: "business-cards",
          categoryLabel: "Business Card",
          title: "KLP Business Card",
          description:
            "New business card design with clear brand guidance and direct contact structure.",
          detail:
            "For KLP I designed a business card that combines brand colors, technical imagery and contact information in a clean professional print format.",
          tools: ["Business Card Design", "Branding", "Print Layout", "Typography"],
          image: "assets/projects/klp-visitenkarte.png",
          imageAlt: "Business card design for KLP",
        },
        {
          id: "wicklein-flyer",
          category: "brochures",
          categoryLabel: "Brochure",
          title: "Wicklein Flyer",
          description:
            "Printable flyer with service overview, locations and a clearly structured presentation of company divisions.",
          detail:
            "This flyer was created as a printable overview for Wicklein. I structured the content, map, service blocks and imagery so the overall presentation feels informative and professional.",
          tools: ["Brochure Design", "Print Layout", "Branding", "Information Design"],
          image: "assets/projects/wicklein-broschuere.png",
          imageAlt: "Printable Wicklein flyer",
        },
        {
          id: "wicklein-wood-energy-website",
          category: "websites",
          categoryLabel: "Website",
          title: "Wicklein Wood & Energy",
          description:
            "Screen design and website build for Wicklein Wood & Energy with a modern presence and strong visual language.",
          detail:
            "For Wicklein Wood & Energy I created both the screen design and the website itself. The focus was a strong visual identity, clear service areas and a modern company presentation.",
          tools: ["Screen Design", "HTML", "CSS", "JavaScript", "Website Build"],
          image: "assets/projects/wicklein-wood-energy-website.png",
          imageAlt: "Wicklein Wood & Energy website",
        },
        {
          id: "wicklein-bag-designs",
          category: "brochures",
          categoryLabel: "Packaging Design",
          title: "Wicklein Bag Designs",
          description:
            "New sack designs and logo development for Wicklein Wood & Energy GmbH.",
          detail:
            "For Wicklein Wood & Energy I developed new sack designs and expanded the visual brand direction including logo work. The project combines packaging, product presentation and brand recognition.",
          tools: ["Packaging Design", "Logo Design", "Illustrator", "Branding"],
          image: "assets/projects/wicklein-wood-energy-bags.png",
          imageAlt: "New bag designs for Wicklein Wood & Energy",
        },
        {
          id: "team-photo-editing",
          category: "social-media",
          categoryLabel: "Photo Editing",
          title: "Team Photo Editing",
          description:
            "Retouching and visual refinement of team photos for a consistent and professional company presence.",
          detail:
            "Image post-production is also part of my workflow. This includes color correction, retouching, visual harmony and preparation for web, print or social media use.",
          tools: ["Photoshop", "Retouching", "Color Correction", "Image Editing"],
          image: "assets/projects/rotec-photo-editing.png",
          imageAlt: "Before and after team photo editing",
        },
      ],
    },
    services: {
      kicker: "Services",
      title: "Digital design for strong brand presence.",
      item1Title: "Websites",
      item1Copy: "Modern, responsive websites for companies, applications and creative projects.",
      item2Title: "Screen Design",
      item2Copy: "Clean user interfaces, landing pages and layouts with a focus on structure and usability.",
      item3Title: "Print & Branding",
      item3Copy: "Business cards, brochures and visual design for a consistent brand presence.",
      item4Title: "Content & Video",
      item4Copy: "Social media assets, video editing and digital content for reach and recognition.",
    },
    experience: {
      kicker: "Experience",
      title: "Work, training and studies.",
      intro:
        "An overview of my professional path, my formal training and my current degree in technology and digital design.",
      cvCta: "Download CV",
      applicationCta: "Download Application",
      block1Label: "Professional Experience",
      block1Title: "Web Designer & Frontend Developer",
      block1Org: "breadcrumb mediasolutions GmbH",
      block1Date: "09/2023 - present",
      block1Copy:
        "During my four years of professional experience, I have been involved in the development and support of numerous websites and digital projects. My tasks included designing modern user interfaces, implementing responsive websites, creating promotional materials and digital content, and collaborating with clients and project teams.",
      block2Label: "Education",
      block2Title: "Application Development Specialist",
      block2Org: "breadcrumb mediasolutions GmbH",
      block2Date: "09/2023 - 06/2026",
      block2Copy:
        "During my training at breadcrumb mediasolutions GmbH I was already deeply involved in real client work. Most of my websites, screen designs, print materials, CMS structures, social-media assets and digital brand projects were created and implemented there.",
      block2Tag1: "Focus on web development",
      block2Tag2: "Successfully completed",
      block2Tag3: "Corporate websites & portals",
      block2Tag4: "Screen design & UI concepts",
      block2Tag5: "Print, content & social media",
      block3Label: "Studies",
      block3Title: "Bachelor's Degree in Computer Engineering",
      block3Org: "Kharkiv National University of Radio Electronics (KhNURE)",
      block3Date: "since 2023",
      block3Tag1: "Currently in the 4th academic year",
    },
    presence: {
      kicker: "Online Presence",
      title: "Public presence and digital reach.",
      copy:
        "Alongside websites and design projects, I also develop content, personal formats and social media presence across multiple platforms.",
      instagram: "33,000+ community",
      tiktok: "Short-form content & reach",
      youtube: "Vlogs, storytelling & video",
      linkedin: "Professional profile",
    },
    lifestyle: {
      kicker: "Interests & Personality",
      title: "What inspires me beyond work.",
      copy:
        "Travel, music, concerts, blogging, video formats and an active lifestyle inspire my work and shape how I think about brands, content and digital experiences. This section highlights the personal interests that influence my creative perspective.",
      tag1: "Travel",
      tag2: "Concerts & music",
      tag3: "Blogging & social media",
      tag4: "Content production",
      tag5: "Vlogs & storytelling",
      tag6: "Fitness & gym",
      caption1: "Travel inspiration",
      caption2: "Street & personal branding",
      caption3: "Culture & live experiences",
      caption4: "Visual storytelling",
    },
    contact: {
      kicker: "Contact",
      overline: "Do you have a project in mind?",
      title: "Let us build something strong together.",
      emailLabel: "Email",
      phoneLabel: "Phone",
      instagramLabel: "Instagram",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "name@company.com",
      subject: "What is it about?",
      subjectOption1: "Websites",
      subjectOption2: "Screen Design",
      subjectOption3: "Business Cards / Brochures",
      subjectOption4: "Social Media",
      subjectOption5: "Video",
      message: "Message",
      messagePlaceholder: "Tell me a little about your project ...",
      submit: "Send Message",
      note: "The form opens your email app. No data is stored.",
      sentSubject: "Portfolio inquiry",
    },
    footer: {
      copy: "Web Designer & Frontend Developer<br>Portfolio & Digital Presence",
      backToTop: "Back to top ↑",
      copyright: "©",
    },
  },
};

const lifestyleProfiles = {
  de: [
    {
      id: "travel",
      label: "Reisen",
      detail: "Ich liebe Reisen in warme Länder, entdecke gerne neue Architektur, Museen und Kunst und sammle so ständig neue visuelle Eindrücke.",
      collage: [
        { image: "assets/images/travel-1.png", alt: "Khalil Nabu travelling" },
        { image: "assets/images/travel-2.png", alt: "Khalil Nabu travel portrait" },
        { image: "assets/images/travel-3.png", alt: "Khalil Nabu in Paris" },
        { image: "assets/images/lifestyle-3.png", alt: "Khalil Nabu outdoors" },
      ],
    },
    {
      id: "music",
      label: "Konzerte & Musik",
      detail: "Musik, Konzerte und Live-Erlebnisse inspirieren mein Gefühl für Rhythmus, Atmosphäre, Inszenierung und kreative Dramaturgie.",
      collage: [
        { image: "assets/images/concert-1.png", alt: "Khalil Nabu in a music setting" },
        { image: "assets/images/lifestyle-2.png", alt: "Black and white portrait" },
        { image: "assets/images/lifestyle-1.png", alt: "Khalil Nabu portrait" },
        { image: "assets/images/travel-4.png", alt: "Khalil Nabu lifestyle" },
      ],
    },
    {
      id: "blogging",
      label: "Blogging & Social Media",
      detail: "Ich entwickle gerne eigene Formate, filme, poste und denke Ideen direkt in Reichweite, Storytelling und Community-Aufbau.",
      collage: [
        { image: "assets/images/travel-2.png", alt: "Content creation lifestyle visual" },
        { image: "assets/images/travel-4.png", alt: "Khalil Nabu social media portrait" },
        { image: "assets/images/lifestyle-1.png", alt: "Street style portrait" },
        { image: "assets/images/concert-1.png", alt: "Lifestyle and culture" },
      ],
    },
    {
      id: "content",
      label: "Blogging & Content",
      detail: "Content Creation gehört für mich ganz natürlich dazu. Ich mag es, Ideen visuell aufzubereiten und Inhalte mit Persönlichkeit zu verbinden.",
      collage: [
        { image: "assets/images/lifestyle-1.png", alt: "Content production portrait" },
        { image: "assets/images/travel-1.png", alt: "Travel visual" },
        { image: "assets/images/travel-2.png", alt: "Lifestyle content" },
        { image: "assets/images/lifestyle-4.png", alt: "Outdoor portrait" },
      ],
    },
    {
      id: "vlogs",
      label: "Vlogs & Storytelling",
      detail: "Ich liebe es, Erlebnisse in kleine Geschichten zu verwandeln, besondere Momente festzuhalten und visuell spannend zu erzählen.",
      collage: [
        { image: "assets/images/travel-3.png", alt: "Travel storytelling image" },
        { image: "assets/images/travel-4.png", alt: "Story driven portrait" },
        { image: "assets/images/travel-1.png", alt: "Travel architecture inspiration" },
        { image: "assets/images/concert-1.png", alt: "Lifestyle moment" },
      ],
    },
    {
      id: "fitness",
      label: "Fitness & Aktivität",
      detail: "Ein aktiver Lebensstil gibt mir Fokus, Disziplin und Energie. Das hilft mir auch im kreativen Alltag strukturiert und klar zu bleiben.",
      collage: [
        { image: "assets/images/lifestyle-1.png", alt: "Fitness and lifestyle portrait" },
        { image: "assets/images/lifestyle-4.png", alt: "Active outdoor photo" },
        { image: "assets/images/lifestyle-2.png", alt: "Focused portrait" },
        { image: "assets/images/lifestyle-3.png", alt: "Outdoor chair portrait" },
      ],
    },
  ],
  en: [
    {
      id: "travel",
      label: "Travel",
      detail: "I love travelling to warm countries, exploring new architecture, museums and art, and constantly collecting fresh visual impressions.",
      collage: [
        { image: "assets/images/travel-1.png", alt: "Khalil Nabu travelling" },
        { image: "assets/images/travel-2.png", alt: "Khalil Nabu travel portrait" },
        { image: "assets/images/travel-3.png", alt: "Khalil Nabu in Paris" },
        { image: "assets/images/lifestyle-3.png", alt: "Khalil Nabu outdoors" },
      ],
    },
    {
      id: "music",
      label: "Concerts & Music",
      detail: "Music, concerts and live experiences inspire my sense of rhythm, atmosphere, staging and creative storytelling.",
      collage: [
        { image: "assets/images/concert-1.png", alt: "Khalil Nabu in a music setting" },
        { image: "assets/images/lifestyle-2.png", alt: "Black and white portrait" },
        { image: "assets/images/lifestyle-1.png", alt: "Khalil Nabu portrait" },
        { image: "assets/images/travel-4.png", alt: "Khalil Nabu lifestyle" },
      ],
    },
    {
      id: "blogging",
      label: "Blogging & Social Media",
      detail: "I enjoy building personal formats, filming, posting and thinking ideas directly in terms of reach, storytelling and community.",
      collage: [
        { image: "assets/images/travel-2.png", alt: "Content creation lifestyle visual" },
        { image: "assets/images/travel-4.png", alt: "Khalil Nabu social media portrait" },
        { image: "assets/images/lifestyle-1.png", alt: "Street style portrait" },
        { image: "assets/images/concert-1.png", alt: "Lifestyle and culture" },
      ],
    },
    {
      id: "content",
      label: "Content Production",
      detail: "Content creation is a natural part of my work. I enjoy shaping ideas visually and giving digital formats a personal voice.",
      collage: [
        { image: "assets/images/lifestyle-1.png", alt: "Content production portrait" },
        { image: "assets/images/travel-1.png", alt: "Travel visual" },
        { image: "assets/images/travel-2.png", alt: "Lifestyle content" },
        { image: "assets/images/lifestyle-4.png", alt: "Outdoor portrait" },
      ],
    },
    {
      id: "vlogs",
      label: "Vlogs & Storytelling",
      detail: "I love turning experiences into short stories, capturing special moments and telling them in a visually engaging way.",
      collage: [
        { image: "assets/images/travel-3.png", alt: "Travel storytelling image" },
        { image: "assets/images/travel-4.png", alt: "Story driven portrait" },
        { image: "assets/images/travel-1.png", alt: "Travel architecture inspiration" },
        { image: "assets/images/concert-1.png", alt: "Lifestyle moment" },
      ],
    },
    {
      id: "fitness",
      label: "Fitness & Gym",
      detail: "An active lifestyle gives me focus, discipline and energy. It helps me stay structured and clear in creative work too.",
      collage: [
        { image: "assets/images/lifestyle-1.png", alt: "Fitness and lifestyle portrait" },
        { image: "assets/images/lifestyle-4.png", alt: "Active outdoor photo" },
        { image: "assets/images/lifestyle-2.png", alt: "Focused portrait" },
        { image: "assets/images/lifestyle-3.png", alt: "Outdoor chair portrait" },
      ],
    },
  ],
};

let currentLanguage = "de";
let activeFilter = "all";
let activeProjectId = null;
let activeLightboxSource = null;
let lastFocusedElement = null;
let activeLifestyleId = "travel";
let areAllProjectsVisible = false;
const INITIAL_PROJECT_COUNT = 12;
const HIDDEN_PROJECT_IDS = new Set([
  "ausbildungsmesse-flyer",
  "ago-tradefair-stand",
]);
const PREFERRED_PROJECT_ORDER = [
  "mt-propeller",
  "tima-tungsten",
  "ausbildungsportal-kulmbach",
  "wicklein-group",
  "klp-baumaschinen",
  "enjoy-future",
  "wicklein-wood-energy-website",
  "bindlach-rathaus",
  "tourismusteam-nordstrand",
  "kwb-screen-design",
  "willach-portal",
  "kadeco-portal",
];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getText(language, key) {
  return key.split(".").reduce((value, segment) => value && value[segment], portfolioContent[language]);
}

function getProjects(language) {
  return portfolioContent[language].projects.items
    .filter((project) => !HIDDEN_PROJECT_IDS.has(project.id))
    .sort((a, b) => {
      const indexA = PREFERRED_PROJECT_ORDER.indexOf(a.id);
      const indexB = PREFERRED_PROJECT_ORDER.indexOf(b.id);
      const rankA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
      const rankB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

      if (rankA !== rankB) {
        return rankA - rankB;
      }

      return 0;
    });
}

function getLifestyleProfiles(language) {
  return lifestyleProfiles[language] || lifestyleProfiles.de;
}

function escapeSvgText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function splitTitleLines(value, maxLineLength = 16, maxLines = 3) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxLineLength) {
      currentLine = candidate;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, maxLines);
}

function getProjectPreview(project) {
  if (project.image) {
    return {
      src: project.image,
      alt: project.imageAlt || `${project.title} preview`,
    };
  }

  const themeByCategory = {
    websites: { background: "#141412", accent: "#c7ff3d", text: "#fffef9" },
    "screen-designs": { background: "#11110f", accent: "#f0c88a", text: "#fffef9" },
    "business-cards": { background: "#1b1d24", accent: "#7cb6ff", text: "#fffef9" },
    brochures: { background: "#1f1711", accent: "#f4a261", text: "#fffef9" },
    "social-media": { background: "#11110f", accent: "#ffffff", text: "#fffef9" },
    video: { background: "#11110f", accent: "#c7ff3d", text: "#fffef9" },
  };

  const theme = themeByCategory[project.category] || themeByCategory.websites;
  const lines = splitTitleLines(project.placeholder || project.title);
  const titleMarkup = lines
    .map((line, index) => `<tspan x="74" dy="${index === 0 ? 0 : 102}">${escapeSvgText(line)}</tspan>`)
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 860" role="img" aria-label="${escapeSvgText(project.title)}">
      <rect width="1200" height="860" fill="${theme.background}" />
      <rect x="34" y="34" width="1132" height="792" fill="none" stroke="rgba(255,255,255,.14)" />
      <circle cx="1050" cy="145" r="150" fill="${theme.accent}" opacity=".18" />
      <path d="M74 670H1126" stroke="${theme.accent}" stroke-width="8" opacity=".55" />
      <text x="74" y="108" fill="${theme.accent}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="5">
        ${escapeSvgText(project.categoryLabel.toUpperCase())}
      </text>
      <text x="74" y="325" fill="${theme.text}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="116" font-weight="900" letter-spacing="-4">
        ${titleMarkup}
      </text>
      <text x="74" y="742" fill="${theme.text}" font-family="Arial, Helvetica, sans-serif" font-size="26" opacity=".72">
        ${escapeSvgText("Khalil Nabu Portfolio")}
      </text>
    </svg>
  `;

  return {
    src: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    alt: project.title,
  };
}

function setLifestyleProfile(profile) {
  if (!profile || !lifestyleList || !lifestyleDetailLabel || !lifestyleDetailCopy) {
    return;
  }

  activeLifestyleId = profile.id;
  lifestyleDetailLabel.textContent = profile.label;
  lifestyleDetailCopy.textContent = profile.detail;

  lifestyleCollageImages.forEach((image, index) => {
    const collageItem = profile.collage[index];
    if (!image || !collageItem) {
      return;
    }
    image.src = collageItem.image;
    image.alt = collageItem.alt;
  });

  lifestyleList.querySelectorAll(".hobby-card").forEach((card) => {
    const active = card.dataset.hobbyId === profile.id;
    card.classList.toggle("is-active", active);
    card.setAttribute("aria-pressed", String(active));
  });
}

function renderLifestyleProfiles() {
  if (!lifestyleList) {
    return;
  }

  const profiles = getLifestyleProfiles(currentLanguage);
  if (!profiles.length) {
    lifestyleList.innerHTML = "";
    return;
  }

  const availableActive = profiles.find((profile) => profile.id === activeLifestyleId) || profiles[0];
  activeLifestyleId = availableActive.id;

  lifestyleList.innerHTML = profiles.map((profile) => `
    <button class="hobby-card ${profile.id === activeLifestyleId ? "is-active" : ""}" type="button" data-hobby-id="${profile.id}" aria-pressed="${profile.id === activeLifestyleId}">
      ${profile.label}
    </button>
  `).join("");

  lifestyleList.querySelectorAll(".hobby-card").forEach((card) => {
    const profile = profiles.find((item) => item.id === card.dataset.hobbyId);
    if (!profile) {
      return;
    }

    card.addEventListener("mouseenter", () => setLifestyleProfile(profile));
    card.addEventListener("focus", () => setLifestyleProfile(profile));
    card.addEventListener("click", () => setLifestyleProfile(profile));
  });

  setLifestyleProfile(availableActive);
}

function observeReveals(root = document) {
  root.querySelectorAll(".reveal").forEach((element) => {
    if (!element.dataset.revealBound) {
      revealObserver.observe(element);
      element.dataset.revealBound = "true";
    }
  });
}

function setMenu(open) {
  navigation.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);

  const label = menuToggle.querySelector(".sr-only");
  label.textContent = open
    ? getText(currentLanguage, "header.menuClose")
    : getText(currentLanguage, "header.menuOpen");
}

menuToggle.addEventListener("click", () => {
  setMenu(!navigation.classList.contains("is-open"));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1100) {
    setMenu(false);
  }
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

observeReveals();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

function buildProjectCard(project) {
  const preview = getProjectPreview(project);

  return `
    <article class="project-card reveal" data-category="${project.category}">
      <div class="project-image ${project.image ? "" : "project-image--generated"}">
        <img src="${preview.src}" alt="${preview.alt}" loading="lazy">
        <span class="project-image-badge">${project.categoryLabel}</span>
      </div>
      <div class="project-card-body">
        <p class="project-category">${project.categoryLabel}</p>
        <h3>${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tools">${project.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
        <button class="button button-outline button-small project-open" type="button" data-project-id="${project.id}">
          ${getText(currentLanguage, "projects.viewMore")}
        </button>
      </div>
    </article>
  `;
}

function buildEmptyState() {
  const activeFilterLabel = document.querySelector(`.filter-button[data-filter="${activeFilter}"]`)?.textContent
    || getText(currentLanguage, "projects.filterAll");

  return `
    <article class="project-card project-card-empty reveal">
      <div class="project-card-body">
        <p class="project-category">${activeFilterLabel}</p>
        <h3>${getText(currentLanguage, "projects.emptyTitle")}</h3>
        <p class="project-description">${getText(currentLanguage, "projects.emptyCopy")}</p>
      </div>
    </article>
  `;
}

function renderProjects() {
  const projects = getProjects(currentLanguage);
  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.category === activeFilter);
  const visibleProjects = areAllProjectsVisible
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);

  projectGrid.innerHTML = filteredProjects.length
    ? visibleProjects.map(buildProjectCard).join("")
    : buildEmptyState();

  if (projectsMoreButton) {
    const shouldShowMoreButton = filteredProjects.length > INITIAL_PROJECT_COUNT && !areAllProjectsVisible;
    projectsMoreButton.hidden = !shouldShowMoreButton;
    projectsMoreButton.textContent = getText(currentLanguage, "projects.showMore");
  }

  observeReveals(projectGrid);

  projectGrid.querySelectorAll(".project-open").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(button.dataset.projectId));
  });
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function setModalCta(project) {
  // Website projects should point to the live case, while print and content work keeps the contact CTA.
  if (project.link) {
    modalCta.href = project.link;
    modalCta.target = "_blank";
    modalCta.rel = "noreferrer";
    modalCta.innerHTML = `<span>${getText(currentLanguage, "projects.liveCta")}</span><span aria-hidden="true">↗</span>`;
    return;
  }

  modalCta.href = "#contact";
  modalCta.removeAttribute("target");
  modalCta.removeAttribute("rel");
  modalCta.innerHTML = `<span>${getText(currentLanguage, "projects.modalCta")}</span><span aria-hidden="true">↗</span>`;
}

function openImageLightbox(source, alt) {
  if (!imageLightbox || !imageLightboxImage || !source) {
    return;
  }

  activeLightboxSource = source;
  imageLightboxImage.src = source;
  imageLightboxImage.alt = alt || "";
  imageLightbox.hidden = false;
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  imageLightboxCloseButton.focus();
}

function closeImageLightbox() {
  if (!imageLightbox || imageLightbox.hidden) {
    return;
  }

  imageLightbox.hidden = true;
  imageLightbox.setAttribute("aria-hidden", "true");
  imageLightboxImage.src = "";
  imageLightboxImage.alt = "";
  activeLightboxSource = null;

  if (modal.hidden) {
    document.body.classList.remove("modal-open");
  }
}

function openProjectModal(projectId) {
  const project = getProjects(currentLanguage).find((item) => item.id === projectId);
  if (!project) {
    return;
  }

  const preview = getProjectPreview(project);

  activeProjectId = projectId;
  lastFocusedElement = document.activeElement;
  modalCategory.textContent = project.categoryLabel;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDetail.textContent = project.detail;
  modalTools.innerHTML = project.tools.map((tool) => `<li>${tool}</li>`).join("");
  modalVisual.className = `project-modal-visual ${project.image ? "" : "project-modal-visual--generated"}`;
  modalVisual.innerHTML = `
    <div class="project-modal-stage">
      <div class="project-modal-browser">
        <div class="project-modal-browser-bar"><span></span><span></span><span></span></div>
        <button class="project-modal-image-button" type="button" data-project-image="${preview.src}" data-project-image-alt="${preview.alt}">
          <div class="project-modal-image-frame">
            <img src="${preview.src}" alt="${preview.alt}">
          </div>
          <span class="project-modal-visual-badge">${project.categoryLabel}</span>
          <span class="project-modal-zoom-hint">${getText(currentLanguage, "projects.zoomHint")}</span>
        </button>
      </div>
    </div>
  `;
  setModalCta(project);

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalVisual.querySelector("[data-project-image]")?.addEventListener("click", () => {
    openImageLightbox(preview.src, preview.alt);
  });
  modalCloseButton.focus();
}

function closeProjectModal() {
  closeImageLightbox();
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeProjectId = null;

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

modal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-modal-close")) {
    closeProjectModal();
  }
});

imageLightbox?.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-lightbox-close")) {
    closeImageLightbox();
  }
});

modalCloseButton.addEventListener("click", closeProjectModal);
imageLightboxCloseButton?.addEventListener("click", closeImageLightbox);
modalCta.addEventListener("click", () => closeProjectModal());

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageLightbox && !imageLightbox.hidden) {
    closeImageLightbox();
    return;
  }

  if (event.key === "Escape" && !modal.hidden) {
    closeProjectModal();
  }
});

function applyTranslations(language) {
  document.documentElement.lang = language;
  document.title = portfolioContent[language].meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", portfolioContent[language].meta.description);
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getText(language, element.dataset.i18n);
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = getText(language, element.dataset.i18nHtml);
    if (typeof value === "string") {
      element.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = getText(language, element.dataset.i18nPlaceholder);
    if (typeof value === "string") {
      element.setAttribute("placeholder", value);
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = getText(language, element.dataset.i18nAria);
    if (typeof value === "string") {
      element.setAttribute("aria-label", value);
    }
  });
}

function setLanguage(language) {
  if (!portfolioContent[language]) {
    return;
  }

  currentLanguage = language;
  areAllProjectsVisible = false;
  applyTranslations(language);
  renderProjects();
  renderLifestyleProfiles();
  updateFilterButtons();

  if (activeProjectId) {
    openProjectModal(activeProjectId);
  }

  languageButtons.forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  try {
    localStorage.setItem("portfolio-language", language);
  } catch {
    // Keep the switcher working even when storage is blocked.
  }

  setMenu(false);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    areAllProjectsVisible = false;
    updateFilterButtons();
    renderProjects();
  });
});

projectsMoreButton?.addEventListener("click", () => {
  areAllProjectsVisible = true;
  renderProjects();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    if (targetId === "#top") {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      setMenu(false);
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setMenu(false);
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const selectedSubject = contactForm.querySelector('select[name="subject"]').selectedOptions[0].textContent;
  const subject = `${getText(currentLanguage, "contact.sentSubject")}: ${selectedSubject}`;
  const body = `${formData.get("message")}\n\n-\n${formData.get("name")}\n${formData.get("email")}`;
  window.location.href = `mailto:halilnabu23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

let savedLanguage = "de";
try {
  savedLanguage = localStorage.getItem("portfolio-language") || "de";
} catch {
  savedLanguage = "de";
}

setLanguage(savedLanguage);
document.querySelector("#current-year").textContent = new Date().getFullYear();
