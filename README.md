# digiOH - Digital Events Redefined

> **Professional React-based company profile website for digiOH - a leading digital event production company since 2015.**

![digiOH Hero](src/assets/hero-bg.jpg)

## 🚀 Overview

digiOH is a modern, responsive company profile website built with React, TypeScript, and Tailwind CSS. It showcases our expertise in digital event production, virtual events, hybrid solutions, and professional AV services.

### ✨ Key Features

- **Modern Design System**: Custom design tokens based on digiOH brand colors
- **Fully Responsive**: Optimized for all devices and screen sizes
- **SEO Optimized**: Comprehensive meta tags, structured data, and semantic HTML
- **Performance Focused**: Optimized images, smooth animations, and fast loading
- **Interactive Components**: Dynamic portfolio filtering, contact forms, and smooth scrolling
- **Professional Typography**: Bebas Neue for headings, Poppins for body text

## 🎨 Design System

### Brand Colors
- **Primary Blue**: `#5B82C3` - Main brand color
- **Deep Navy**: `#12234F` - Text and backgrounds
- **Accent Gold**: `#FBBC51` - Call-to-action elements
- **Accent Orange**: `#F98D2E` - Hover states and highlights
- **Brand Indigo**: `#655BC2` - Secondary accents
- **Surface Light**: `#F3F9FF` - Light backgrounds

### Typography
- **Headings**: Bebas Neue (uppercase, bold)
- **Body Text**: Poppins (clean, professional)

## 📱 Sections

### 🏠 Hero Section
- Compelling tagline with animated statistics
- Professional event photography background
- Dual call-to-action buttons
- Trust indicator: "500+ successful events since 2015"

### 🏢 Client Logos
- Trusted brand showcase
- Animated hover effects
- Trust metric highlighting

### 🛠️ Services
- 5 core service offerings:
  - Virtual Events
  - Hybrid Solutions
  - Event Management
  - Audio/Visual Production
  - Digital Transformation
- Feature lists and detailed descriptions
- Call-to-action for consultations

### 🎯 Portfolio
- Filterable project showcase
- 6 featured case studies with results
- Modal-ready project details
- Category filtering (Virtual, Hybrid, Corporate, Conference)

### 👥 About Us
- Company history since 2015
- Core values and mission
- 6-member team showcase
- Performance metrics and achievements

### 📞 Contact Section
- Professional contact form
- Multiple contact methods
- WhatsApp integration
- Interactive map placeholder
- Immediate response promise

### 🦶 Footer
- Newsletter subscription
- Comprehensive link structure
- Social media integration
- Professional footer design

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: CSS transitions + Tailwind animations
- **Forms**: React Hook Form
- **Notifications**: Sonner toasts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digioh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── Navigation.tsx   # Main navigation
│   ├── Hero.tsx         # Hero section
│   ├── Services.tsx     # Services showcase
│   ├── Portfolio.tsx    # Project portfolio
│   ├── About.tsx        # About section
│   ├── Contact.tsx      # Contact form
│   ├── ClientLogos.tsx  # Client showcase
│   └── Footer.tsx       # Site footer
├── pages/
│   ├── Index.tsx        # Main landing page
│   └── NotFound.tsx     # 404 page
├── assets/              # Images and media
├── hooks/               # Custom React hooks
├── lib/                 # Utilities
├── index.css           # Global styles & design system
└── main.tsx            # App entry point
```

## 🎨 Customization

### Design System
All design tokens are defined in `src/index.css` and `tailwind.config.ts`. Modify these files to customize:
- Brand colors
- Typography scales
- Spacing systems
- Animation timings
- Shadow styles

### Content Updates
- Update company information in respective components
- Replace placeholder images with actual photos
- Modify service offerings in `Services.tsx`
- Update portfolio projects in `Portfolio.tsx`
- Customize team members in `About.tsx`

### SEO Optimization
SEO meta tags and structured data are configured in `index.html`. Update:
- Page titles and descriptions
- Open Graph tags
- Structured data (JSON-LD)
- Keywords and author information

## 📈 Performance Features

- **Optimized Images**: Responsive images with proper alt attributes
- **Lazy Loading**: Images load only when needed
- **Smooth Animations**: CSS-based animations for better performance
- **Efficient Bundling**: Vite's optimized build process
- **Clean Code**: TypeScript for better maintainability

## 🔧 Backend Integration Ready

This frontend is designed to integrate seamlessly with:
- **Laravel Backend**: For CMS functionality
- **Supabase**: For real-time features
- **Contact Forms**: Ready for email service integration
- **Analytics**: Google Analytics and tracking ready

## 🌐 Deployment

### Lovable Platform
1. Connect to Lovable
2. Deploy with one click
3. Custom domain support available

### Manual Deployment
```bash
npm run build
# Deploy 'dist' folder to your hosting provider
```

## 📞 Support & Contact

- **Website**: [digioh.com](https://digioh.com)
- **Email**: hello@digioh.com
- **Phone**: +1 (555) 123-4567
- **WhatsApp**: Available for instant support

## 📄 License

© 2024 digiOH. All rights reserved.

---

**Built with ❤️ for professional digital events**

*This React frontend provides a solid foundation for digiOH's online presence and can be extended with backend functionality as needed.*