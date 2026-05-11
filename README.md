# ParuvaKaala | பருவகாலம் 🌾

**ParuvaKaala** is an advanced AI agent framework built specifically for farmers. It revolutionizes precision agriculture by synchronizing the profound mathematical accuracy of ancient **Surya Siddhanta (Panchangam)** with real-time **Sentinel-1 & 2 Satellite Data**. 

By calculating localized solar transits and lunar phases, and correlating them with live soil moisture and NDVI (Normalized Difference Vegetation Index) data, ParuvaKaala generates an optimal, 16-week step-by-step agricultural timeline.

![UI Preview](public/farm_banner.png)

## 🌟 Key Benefits

- **Hyper-Localized Intelligence**: By selecting your state and district, the AI dynamically pulls exact environmental and celestial data tailored to your specific micro-climate.
- **Ancient Meets Modern**: Blends traditional, historically proven lunar sap-flow cycles (Shukla/Krishna Paksha) with modern predictive vegetation indices.
- **Actionable 16-Week Timelines**: Provides precise, week-by-week actionable intelligence on when to prepare soil, sow seeds, irrigate, weed, and harvest.
- **Premium Glassmorphic UI**: Features a highly accessible, visually stunning "Bento Grid" dashboard utilizing modern web design aesthetics for maximum readability and engagement.
- **Bilingual Support**: Fully supports both English and Tamil natively for seamless adoption by local agricultural communities.

---

## 🛠️ Technical Architecture

ParuvaKaala is built on a modern, high-performance web stack:

- **Framework**: [Next.js 13+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism utilities and responsive Bento Grid layouts.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth, performant micro-interactions and layout transitions.
- **Data Visualization**: [Recharts](https://recharts.org/) for rendering dynamic, beautiful NDVI AreaCharts.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, scalable vector graphics.
- **Progressive Web App (PWA)**: Optimized for mobile installation and offline caching capabilities.

---

## 🤝 How to Contribute

We welcome contributions from developers, agricultural experts, and data scientists! Here is how you can set up the project locally and contribute:

### 1. Local Setup

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/SivaArulveli/ParuvaKaala.git
cd agri
npm install
```

### 2. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 3. Contribution Guidelines

We follow a standard Git Feature Branch Workflow:

1. **Fork & Branch**: Fork the repository and create a new feature branch (`git checkout -b feature/your-feature-name`).
2. **Code Standards**: 
   - Ensure all new components use Tailwind CSS for styling.
   - Maintain the "Premium Dark Aesthetic" (use the `background`, `card`, and `primary` CSS variables).
   - All interactive elements must include `framer-motion` micro-animations.
3. **Commit Messages**: Use Conventional Commits (e.g., `feat: add new weather API`, `fix: correct layout shift on mobile`).
4. **Pull Requests**: Submit a PR against the `main` branch. Include screenshots or videos of UI changes if applicable.

### 4. Technical Roadmap
- [ ] Integration of real-time weather API fallback.
- [ ] Expansion of the crop database.
- [ ] Multi-tenant backend for saving user profiles and historical harvest data.

---

*Empowering the roots of agriculture with the stars of the cosmos.* ✨
