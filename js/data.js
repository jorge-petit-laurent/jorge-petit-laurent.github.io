/* English strings for every data-i18n key in index.html. Spanish lives directly in the HTML
   (default language), so the page is fully readable even if this script fails to load. */
var I18N_EN = {
  'hint': 'tap to learn more →',
  'bio': 'Chilean energy engineer and data scientist. Studies how <strong>climate change</strong> stresses the electrical grid — and believes the <strong>ambition</strong> to solve it starts in the rural southern Chile where he grew up.',
  'wallpaper': 'natural affinity for data natural affinity for data climate change climate change energy resilience natural affinity for data',
  'langLabel': 'English',
  'filterAll': 'All',
  'filterClimate': 'Climate & Energy',
  'filterData': 'Data & AI',
  'filterAwards': 'Awards & Papers',
  'filterCommunity': 'Community & Nature',

  'eeeic.tag': 'Conference paper · EEEIC 2026', 'eeeic.title': 'IEEE EEEIC 2026, Lisbon',
  'calabria.tag': 'Jan–Mar 2026 · Italy', 'calabria.title': 'Research stay, University of Calabria',
  'sherpas.tag': '2025 — present', 'sherpas.title': 'Data Analytics Engineer, Sherpas',
  'thesis.tag': '2025 — present · UAI', 'thesis.title': 'Thesis: heatwaves and electricity demand',
  'conference.tag': 'SICyR · CEES · 2024–2025', 'conference.title': 'Conference circuit',
  'ssrn.tag': '2025 · SSRN', 'ssrn.title': 'Preprint: solar panel diagnostics',
  'tid.tag': '2022 / 2024 · TID Award', 'tid.title': 'TID Award + Las Campanas',
  'pvcv.tag': '2023–2025 · TRL Level Up', 'pvcv.title': 'Computer vision for solar panels',
  'upenn.tag': '2024 · Pennsylvania', 'upenn.title': 'Santander Scholarship, UPenn',
  'naturecomms.tag': '2025 · Nature Communications', 'naturecomms.title': 'Peer reviewer',
  'graduation.tag': '2021 → 2025/26 · UAI', 'graduation.title': 'From admission to graduation',
  'teaching.tag': '2021–2025 · UAI', 'teaching.title': 'Teaching & mentorship',
  'acciona.tag': '2024 · ACCIONA', 'acciona.title': 'ACCIONA Academy Program',
  'docongress.tag': '2023 · Data Observatory', 'docongress.title': 'Poster, 1st DO Congress',
  'uaifeature.tag': '2025 · Instagram, UAI Engineering', 'uaifeature.title': 'Specialty feature',
  'nature.tag': '2023 —', 'nature.title': 'Nursery & reforestation',
  'amigo.tag': '2022 — present · Exchange', 'amigo.title': 'Ambassador & podcast',
  'hackathon.tag': 'Google Cloud · Kaggle', 'hackathon.title': '3rd place, Data Challenge',
  'atamostec.tag': 'ATAMOSTEC · Nov 2024', 'atamostec.title': '"La Ruta del Sol" mobility program'
};

/* Full modal content per card — bilingual body + real outbound links. */
var CARD_DATA = {
  eeeic: {
    es: { tag:'Conference paper · EEEIC 2026', title:'IEEE EEEIC 2026, Lisboa',
      body:'"Substation-Level Heat-Wave Vulnerability of the Chilean Grid Under Global Warming", aceptado en el 26° IEEE EEEIC & I&CPS Europe, Portugal — coautoría con Cristián Martínez (UAI) y la climatóloga Katerina Goubanova (CEAZA), sesión SS13 sobre gemelos digitales para sistemas eléctricos resilientes. Lo presentó oralmente, en persona, el lunes 29 de junio de 2026.',
      links:[{label:'Programa oficial EEEIC 2026 (PDF)', url:'https://www.eeeic.net/EEEIC%20Downloads/EEEIC2026_Program_R1.pdf'}] },
    en: { tag:'Conference paper · EEEIC 2026', title:'IEEE EEEIC 2026, Lisbon',
      body:'"Substation-Level Heat-Wave Vulnerability of the Chilean Grid Under Global Warming", accepted at the 26th IEEE EEEIC & I&CPS Europe, Portugal — co-authored with Cristian Martinez (UAI) and climate scientist Katerina Goubanova (CEAZA), session SS13 on digital twins for resilient power systems. He presented it orally, in person, on Monday 29 June 2026.',
      links:[{label:'Official EEEIC 2026 program (PDF)', url:'https://www.eeeic.net/EEEIC%20Downloads/EEEIC2026_Program_R1.pdf'}] },
    photos:['assets/images/eeeic-photo.webp']
  },
  calabria: {
    es: { tag:'Ene–Mar 2026 · Italia', title:'Estadía de investigación, U. de Calabria',
      body:'Beca competitiva de movilidad Next Generation EU (proyecto herIT4Future) financió una estadía de investigación de enero a marzo de 2026 en la Universidad de Calabria, Italia — avanzando su tesis, destacado en un artículo de prensa de Data Observatory con sus propias citas.',
      links:[{label:'Artículo de Data Observatory', url:'https://dataobservatory.net/news/alumni-data-observatory-realizo-pasantia-en-la-universidad-de-calabria'}] },
    en: { tag:'Jan–Mar 2026 · Italy', title:'Research stay, University of Calabria',
      body:'A competitive Next Generation EU mobility grant (herIT4Future project) funded a Jan–Mar 2026 visiting-research stay at the University of Calabria, Italy — advancing his thesis, featured in a Data Observatory press article with his own quotes.',
      links:[{label:'Data Observatory article', url:'https://dataobservatory.net/news/alumni-data-observatory-realizo-pasantia-en-la-universidad-de-calabria'}] },
    embed_html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7454601520353906688?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
  },
  sherpas: {
    es: { tag:'2025 — presente', title:'Data Analytics Engineer, Sherpas',
      body:'Como Data Analytics Engineer en Sherpas — For a Zero Carbon Society, construyó desde cero el área de datos: infraestructura en la nube (BigQuery, Neo4j) que centraliza datos del mercado eléctrico latinoamericano, y un modelo automatizado de despacho de BESS para el SEN que permite certificar reducciones de más de 250.000 toneladas de CO2 al año. Sherpas estructuró la primera autorización mundial de un BESS bajo el Artículo 6.2 del Acuerdo de París: 228 MW de baterías de litio en la Región de Atacama, junto a Colbún, financiado por la Fundación KliK de Suiza.',
      links:[
        {label:'sherpas.net', url:'https://www.sherpas.net/'},
        {label:'Hito: primera autorización mundial BESS Art. 6.2', url:'https://www.linkedin.com/posts/sherpas-net_authorisation-switzerland-chile-activity-7447641698295406592-yilI'},
        {label:'Sherpas, cultura de equipo (2025)', url:'https://www.linkedin.com/posts/sherpas-net_celebrating-2025-by-living-up-to-our-name-activity-7414372535972036609-Sfsd'}
      ] },
    en: { tag:'2025 — present', title:'Data Analytics Engineer, Sherpas',
      body:'As Data Analytics Engineer at Sherpas — For a Zero Carbon Society, he built the company\'s entire data department from scratch: cloud infrastructure (BigQuery, Neo4j) centralizing Latin American electricity-market data, and an automated BESS dispatch-simulation model for Chile\'s grid enabling 250,000+ tonnes CO2/year in certified reductions. Sherpas structured the world\'s first BESS authorization under Article 6.2 of the Paris Agreement: 228 MW of lithium-ion batteries in the Atacama Region, with Colbún, financed by Switzerland\'s KliK Foundation.',
      links:[
        {label:'sherpas.net', url:'https://www.sherpas.net/'},
        {label:"Milestone: world's first BESS Art. 6.2 authorization", url:'https://www.linkedin.com/posts/sherpas-net_authorisation-switzerland-chile-activity-7447641698295406592-yilI'},
        {label:'Sherpas team culture (2025)', url:'https://www.linkedin.com/posts/sherpas-net_celebrating-2025-by-living-up-to-our-name-activity-7414372535972036609-Sfsd'}
      ] },
    embed_html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7447641698295406592?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe><iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7414372535972036609?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
  },
  thesis: {
    es: { tag:'2025 — presente · UAI', title:'Tesis: olas de calor y demanda eléctrica',
      body:'Tesis de Magíster en Ciencia de Datos en la UAI, "Efectos de las olas de calor en la demanda eléctrica en Chile bajo Cambio Climático". Financiada por el Fondo FEI (marzo 2025) y la Beca Tesis Data Observatory (octubre 2025). En noviembre de 2025 presentó avances en la "Sesión DO Science" del Data Observatory. Manuscrito como autor principal, "The future of atmospheric heatwaves in Chile projected by a regional climate model", en revisión en el International Journal of Climatology.',
      links:[] },
    en: { tag:'2025 — present · UAI', title:'Thesis: heatwaves and electricity demand',
      body:'MSc Data Science thesis at UAI, "Effects of heat waves on electricity demand in Chile under Climate Change." Funded by an FEI Research Grant (March 2025) and the Data Observatory Thesis Scholarship (October 2025). In November 2025 he presented progress at Data Observatory\'s "DO Science Session." First-authored manuscript "The future of atmospheric heatwaves in Chile projected by a regional climate model," currently under review at the International Journal of Climatology.',
      links:[] },
    embed_html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7398827399653560320?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
  },
  conference: {
    es: { tag:'SICyR · CEES · 2024–2025', title:'Circuito de congresos',
      body:'Presentaciones orales en SICyR 2025 ("El Futuro de las Olas de Calor en Chile") y CEES 2025 ("Efectos de las olas de calor en la demanda eléctrica en Chile"), y póster en el 7° Congreso de Oceanografía Física, Meteorología y Clima (2024).',
      links:[] },
    en: { tag:'SICyR · CEES · 2024–2025', title:'Conference circuit',
      body:'Oral presentations at SICyR 2025 ("The Future of Heatwaves in Chile") and CEES 2025 ("Effects of heatwaves on electricity demand in Chile"), and a poster at the 7th Congress of Physical Oceanography, Meteorology & Climate (2024).',
      links:[] },
    photos:['assets/images/conference-photo-1.webp', 'assets/images/conference-photo-2.webp'],
    embed_html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7263367576288743424?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
  },
  ssrn: {
    es: { tag:'2025 · SSRN', title:'Preprint: diagnóstico de paneles solares',
      body:'Coautor (Investigación, Metodología, Visualización, Curación de datos, Análisis formal) de "Daylight Photoluminescence Imaging of PV Modules Under Power Curtailment and Background Mismatch", preprint en SSRN del Centro de Transición Energética de la UAI sobre detección no invasiva de fallas en paneles solares.',
      links:[{label:'Ver preprint en SSRN', url:'https://ssrn.com/abstract=6333508'}] },
    en: { tag:'2025 · SSRN', title:'Preprint: solar panel diagnostics',
      body:'Co-author (Investigation, Methodology, Visualization, Data curation, Formal analysis) of "Daylight Photoluminescence Imaging of PV Modules Under Power Curtailment and Background Mismatch," an SSRN preprint from UAI\'s Center for Energy Transition on a non-invasive fault-detection technique for solar panels.',
      links:[{label:'View preprint on SSRN', url:'https://ssrn.com/abstract=6333508'}] }
  },
  tid: {
    es: { tag:'2022 / 2024 · Premio TID', title:'Premio TID + Las Campanas',
      body:'Su proyecto sobre los efectos del cambio climático en el cultivo de maíz en Chile, guiado por Cristián Martínez-Villalobos, fue uno de los 3 mejores proyectos de investigación de pregrado del Taller de Investigación Dirigida (TID, 2022) de la UAI — premio individual, no un trabajo en equipo. Publicado en la primera edición de la Revista TID; como premio, visitó el Observatorio Las Campanas (Carnegie Institution for Science) en enero de 2024.',
      links:[
        {label:'UAI premia los mejores proyectos del TID', url:'https://www.uai.cl/noticias/ingenieria-y-ciencias/ingenieria-uai-premia-a-los-mejores-proyectos-del-taller-de-investigacion-dirigida'},
        {label:'Visita al Observatorio Las Campanas (artículo)', url:'https://www.lco.cl/es/estudiantes-de-la-uai-visitaron-lco/'},
        {label:'Su post sobre la investigación TID', url:'https://www.linkedin.com/posts/jorge-petit-laurent_ingenieraedauai-ingenieraedauai-uai-activity-7123286618752331776-tZrV'},
        {label:'Celebrando la primera edición de la Revista TID', url:'https://www.linkedin.com/posts/jorge-petit-laurent_ingenieraedaycienciasuai-revistatid-investigaciaejnuai-activity-7322712830175031297-0jEk'}
      ] },
    en: { tag:'2022 / 2024 · TID Award', title:'TID Award + Las Campanas',
      body:'His research on climate change\'s effects on corn cultivation in Chile, advised by Cristián Martínez-Villalobos, was one of the 3 best undergraduate research projects in UAI\'s Directed Research Workshop (TID, 2022) — an individual award, not a team project. Published in the first edition of Revista TID; as a prize, he visited the Las Campanas Observatory (Carnegie Institution for Science) in January 2024.',
      links:[
        {label:'UAI awards the best TID projects', url:'https://www.uai.cl/noticias/ingenieria-y-ciencias/ingenieria-uai-premia-a-los-mejores-proyectos-del-taller-de-investigacion-dirigida'},
        {label:'Las Campanas Observatory visit (article)', url:'https://www.lco.cl/es/estudiantes-de-la-uai-visitaron-lco/'},
        {label:'His post on the TID research', url:'https://www.linkedin.com/posts/jorge-petit-laurent_ingenieraedauai-ingenieraedauai-uai-activity-7123286618752331776-tZrV'},
        {label:'Celebrating the first edition of Revista TID', url:'https://www.linkedin.com/posts/jorge-petit-laurent_ingenieraedaycienciasuai-revistatid-investigaciaejnuai-activity-7322712830175031297-0jEk'}
      ] },
    embed_html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7156368030741008384?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
  },
  pvcv: {
    es: { tag:'2023–2025 · TRL Level Up', title:'Visión computacional en paneles solares',
      body:'Investigador (Ciencia de Datos) en el proyecto TRL Level Up de la UAI: pipeline de visión computacional en Python para imágenes de fotoluminiscencia diurna que detecta microfisuras y soldaduras defectuosas en paneles solares en operación, sin desconectar la generación.',
      links:[] },
    en: { tag:'2023–2025 · TRL Level Up', title:'Computer vision for solar panels',
      body:'Researcher (Data Science) on UAI\'s TRL Level Up project: a Python computer-vision pipeline for daylight photoluminescence imaging to detect microcracks and faulty solder joints in operating PV modules without disconnecting generation.',
      links:[] },
    photos:['assets/images/pvcv-photo.webp']
  },
  upenn: {
    es: { tag:'2024 · Pennsylvania', title:'Beca Santander, UPenn',
      body:'Beca completa de Santander Open Academy para el programa de 3 semanas "USA Summer Experience" en la Universidad de Pennsylvania; citado en prensa de Banco Santander Chile.',
      links:[
        {label:'Nota de prensa, Santander Chile', url:'https://saladecomunicacion.santander.cl/noticias/banca-responsable/detalles/postula-a-los-cursos-gratuitos-para-estudiar-ingles-en-estados-unidos-con-santander-open-academy'},
        {label:'Su post de LinkedIn', url:'https://es.linkedin.com/posts/jorge-petit-laurent_santanderopenacademy-elp-upenn-activity-7224809785072758785-A3_B'}
      ] },
    en: { tag:'2024 · Pennsylvania', title:'Santander Scholarship, UPenn',
      body:'Fully-funded Santander Open Academy scholarship for the 3-week "USA Summer Experience" at the University of Pennsylvania; quoted in Banco Santander Chile press.',
      links:[
        {label:'Santander Chile press release', url:'https://saladecomunicacion.santander.cl/noticias/banca-responsable/detalles/postula-a-los-cursos-gratuitos-para-estudiar-ingles-en-estados-unidos-con-santander-open-academy'},
        {label:'His LinkedIn post', url:'https://es.linkedin.com/posts/jorge-petit-laurent_santanderopenacademy-elp-upenn-activity-7224809785072758785-A3_B'}
      ] },
    photos:['assets/images/upenn-photo.webp'],
    embed_html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7232464704755888128?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
  },
  naturecomms: {
    es: { tag:'2025 · Nature Communications', title:'Revisor par',
      body:'Realizó una revisión por pares en 2025 para Nature Communications (Springer Nature), según su registro ORCID — señal notable de reconocimiento siendo aún estudiante de posgrado.',
      links:[{label:'Ver perfil ORCID', url:'https://orcid.org/0009-0006-2945-610X'}] },
    en: { tag:'2025 · Nature Communications', title:'Peer reviewer',
      body:'Completed a peer review in 2025 for Nature Communications (Springer Nature), per his ORCID record — a notable mark of standing while still a graduate student.',
      links:[{label:'View ORCID profile', url:'https://orcid.org/0009-0006-2945-610X'}] }
  },
  graduation: {
    es: { tag:'2021 → 2025/26 · UAI', title:'De la admisión a la titulación',
      body:'En marzo de 2021 entró a la UAI con 771,7 puntos PSU (Colegio San Mateo), elegida en primera preferencia — la campaña "Yo elegí la UAI" lo citó: "Elegí la UAI porque quiero crear innovaciones que vuelvan al planeta más verde, más inteligente, o simplemente más humano." Cursó una doble titulación en Ingeniería Civil en Energía (titulado, diciembre 2025) e Ingeniería Civil Industrial (en curso, estimada julio 2026), sostenida con dos becas de mérito académico consecutivas.',
      links:[] },
    en: { tag:'2021 → 2025/26 · UAI', title:'From admission to graduation',
      body:'In March 2021 he entered UAI with a 771.7 PSU score (Colegio San Mateo), admitted as his first choice — the "I chose UAI" campaign quoted him: "I chose UAI because I want to create innovations that make the planet greener, smarter, or simply more human." He pursued a dual degree in Energy Engineering (graduated, December 2025) and Industrial Engineering (in progress, estimated completion July 2026), sustained on two consecutive merit scholarships.',
      links:[] }
  },
  teaching: {
    es: { tag:'2021–2025 · UAI', title:'Docencia y mentoría',
      body:'Ayudante de cátedra y tutor de matemáticas en 7 cursos de la UAI, llegando a más de 300 estudiantes en tres años, además de educador STEM voluntario enseñando programación y liderazgo a niños en comunidades vulnerables, y como integrante de la organización estudiantil Visionarios.',
      links:[] },
    en: { tag:'2021–2025 · UAI', title:'Teaching & mentorship',
      body:'Teaching assistant and math tutor across 7 UAI courses, reaching 300+ students over three years, plus volunteer STEM educator teaching programming and leadership to children in vulnerable communities, and as a member of the Visionarios student organization.',
      links:[] }
  },
  acciona: {
    es: { tag:'2024 · ACCIONA', title:'Programa Academy de ACCIONA',
      body:'Participó en la 5ta versión del Programa Academy de ACCIONA en Chile, que reunió a 22 estudiantes — dos semanas intensivas de aprendizaje y colaboración en energías renovables.',
      links:[] },
    en: { tag:'2024 · ACCIONA', title:'ACCIONA Academy Program',
      body:'Took part in the 5th edition of ACCIONA\'s Academy Program in Chile, which gathered 22 students — two intensive weeks of learning and collaboration in renewables.',
      links:[] },
    photos:['assets/images/acciona-photo.webp']
  },
  docongress: {
    es: { tag:'2023 · Data Observatory', title:'Póster, 1er Congreso DO',
      body:'Presentó el póster "Análisis de la evolución proyectada de olas de calor en Chile" en el 1er Congreso de Ciencia de Datos del Data Observatory — confirmado por su propio post de LinkedIn.',
      links:[] },
    en: { tag:'2023 · Data Observatory', title:'Poster, 1st DO Congress',
      body:'Presented the poster "Análisis de la evolución proyectada de olas de calor en Chile" at the 1st Data Observatory Data Science Congress — confirmed via his own LinkedIn post.',
      links:[] },
    photos:['assets/images/do-congress-photo.webp']
  },
  uaifeature: {
    es: { tag:'2025 · Instagram, Ingeniería UAI', title:'Feature de especialidad',
      body:'El 2 de octubre de 2025, Ingeniería UAI lo eligió como ejemplo de la especialidad de Ingeniería Civil en Energía en su Instagram: "Estudia cómo las olas de calor impactan el consumo eléctrico en Chile y, con experiencia internacional, busca garantizar un acceso justo y renovable para todos."',
      links:[] },
    en: { tag:'2025 · Instagram, UAI Engineering', title:'Specialty feature',
      body:'On October 2, 2025, UAI Engineering featured him as an example student for the Energy Engineering specialty on Instagram: "Studies how heat waves impact electricity consumption in Chile and, with international experience, seeks to guarantee fair, renewable access for everyone."',
      links:[] }
  },
  nature: {
    es: { tag:'2023 —', title:'Vivero y reforestación',
      body:'Estuvo a cargo operativo del vivero Pillmaiquén (sur de Chile, liderando brevemente a un equipo de 4) y es voluntario independiente en reforestación con especies nativas desde 2023 — el hilo más directo y concreto de amor por la naturaleza.',
      links:[] },
    en: { tag:'2023 —', title:'Nursery & reforestation',
      body:'Operationally ran the Vivero Pillmaiquén plant nursery (southern Chile, briefly leading a team of 4) and has independently volunteered in native-species reforestation since 2023 — his most direct, hands-on love-of-nature thread.',
      links:[] }
  },
  amigo: {
    es: { tag:'2022 — presente · Intercambio', title:'Embajador y podcast',
      body:'Hizo su propio intercambio de pregrado en el Tecnológico de Monterrey (ago–dic 2022) — experiencia que lo llevó después a ser embajador local de AmiGo Abroad a cargo del nodo de la costa de Viña del Mar/Valparaíso, e invitado al podcast "AmiGo en el extranjero", conversando sobre vínculos comunitarios e inclusión social.',
      links:[] },
    en: { tag:'2022 — present · Exchange', title:'Ambassador & podcast',
      body:'Did his own undergraduate exchange at Tecnológico de Monterrey (Aug–Dec 2022) — an experience that later led him to become a local ambassador for AmiGo Abroad, leading the Viña del Mar/Valparaíso coastal node, and a guest speaker on the "AmiGo en el extranjero" podcast, speaking about community ties and social inclusion.',
      links:[] },
    photos:['assets/images/amigo-photo.webp']
  },
  hackathon: {
    es: { tag:'Google Cloud · Kaggle', title:'3er lugar, Data Challenge',
      body:'3er lugar en "Data Challenge in the Cloud", hackathon organizado por Google Cloud, Le Wagon Latam y Kaggle, en equipo con Clemente Jara, Renzo Devoto Aspe, Benjamín Saldivia y Pablo Reinoso S.',
      links:[{label:'Publicación de Clemente Jara en LinkedIn', url:'https://www.linkedin.com/posts/clemente-jara_el-jueves-pasado-tuve-la-incre%C3%ADble-oportunidad-ugcPost-7234557571620065280-qFen/'}] },
    en: { tag:'Google Cloud · Kaggle', title:'3rd place, Data Challenge',
      body:'3rd place in "Data Challenge in the Cloud," a hackathon organized by Google Cloud, Le Wagon Latam, and Kaggle, as part of a team with Clemente Jara, Renzo Devoto Aspe, Benjamín Saldivia, and Pablo Reinoso S.',
      links:[{label:"Clemente Jara's LinkedIn post", url:'https://www.linkedin.com/posts/clemente-jara_el-jueves-pasado-tuve-la-incre%C3%ADble-oportunidad-ugcPost-7234557571620065280-qFen/'}] },
    embed_html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7234557571620065280?collapsed=1" height="565" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
  },
  atamostec: {
    es: { tag:'ATAMOSTEC · Nov 2024', title:'Movilidad "La Ruta del Sol"',
      body:'Del 11 al 13 de noviembre de 2024, completó la 3era versión del Programa de Movilidad Estudiantil ATAMOSTEC "La Ruta del Sol: Antofagasta 2024" de SERC Chile — un programa de movilidad/intercambio, no un congreso donde presentara.',
      links:[] },
    en: { tag:'ATAMOSTEC · Nov 2024', title:'"La Ruta del Sol" mobility program',
      body:'From November 11–13, 2024, he completed the 3rd edition of SERC Chile\'s ATAMOSTEC Student Mobility Program, "La Ruta del Sol: Antofagasta 2024" — a mobility/exchange program, not a conference he presented at.',
      links:[] }
  }
};
CARD_DATA.graduation.photos = ['assets/images/graduation-photo.webp'];
