# MediaHub - Dokumentace projektu (KAJ)

## 1. Cíl projektu
Projekt **MediaHub** byl vytvořen jako komplexní řešení pro správu osobní knihovny médií, zahrnující knihy, filmy a videohry. Aplikace umožňuje uživatelům interaktivně spravovat svou sbírku, hodnotit jednotlivé položky a sledovat statistické přehledy.

## 2. Technická architektura
Aplikace využívá hybridní přístup, který kombinuje moderní vývojové trendy s klasickými principy objektově orientovaného programování v JavaScriptu:
- **Frontend Framework:** Next.js (React) zajišťuje reaktivitu uživatelského rozhraní a efektivní správu stavu pomocí Hooks (`useState`, `useEffect`, `useRef`).
- **Core Business Logika:** Implementována v čistém JavaScriptu (Vanilla JS) s využitím prototypové dědičnosti a jmenných prostorů pro zajištění izolace a znovupoužitelnosti kódu.
- **Styling:** CSS Moduly s využitím moderních vlastností jako jsou CSS proměnné a zanořování (Nested CSS).
- **Persistence dat:** Využití rozhraní LocalStorage API pro trvalé uchování dat přímo v prohlížeči uživatele bez nutnosti backendu.

## 3. Implementace funkčních požadavků

### 3.1 HTML 5 a Sémantika
- **Struktura:** Důsledné využití sémantických značek (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`) pro zajištění přístupnosti a správné struktury dokumentu.
- **Grafické rozhraní (Canvas):** 
    - Dynamické generování koláčových grafů v reálném čase (`components/StatsChart.js`).
    - Klientské zpracování a optimalizace (resize) obrázků obalů před uložením (`components/AddMediaForm.js`).
- **Multimédia:** Integrace video přehrávače pomocí tagu `<video>` pro zobrazení filmových trailerů.
- **Formuláře:** Využití pokročilých atributů HTML5 (validace, autofocus, placeholder) pro zvýšení uživatelského komfortu.

### 3.2 CSS3 a Responzivita
- **3D Transformace:** Implementace interaktivního 3D efektu překlápění karet médií pomocí vlastností `perspective` a `rotateY`.
- **Pokročilý design:** Využití animací, přechodů (`transitions`) a přizpůsobení systémových prvků (scrollbar).
- **Responzivní design:** Aplikace je plně optimalizována pro mobilní zařízení i desktop pomocí Media Queries.

### 3.3 JavaScript (Moderní & OOP)
- **Objektově orientovaný přístup:** Využití prototypové dědičnosti (`Object.setPrototypeOf`) pro modelování hierarchie médií: základní třída `MediaItem` a specializované třídy `Book`, `Movie`, `Game`.
- **Web Components:** Implementace vlastního HTML elementu `<rating-stars>` pomocí Custom Elements API pro modulární hodnocení položek.
- **Pokročilá API:** 
    - **File API:** Asynchronní zpracování nahraných souborů.
    - **Media API:** Plné programové ovládání video prvků.
- **Progressive Web App (PWA):** Podpora offline režimu díky integraci Service Workerů a souboru manifestu.

## 4. Nasazení
Aplikace je plně optimalizována pro statický export a nasazena v prostředí **GitHub Pages**, což zajišťuje její okamžitou dostupnost bez nutnosti lokální instalace závislostí.
