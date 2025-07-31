# Focus Flock MVP

## 🧠 ADHD-Friendly Social Productivity Platform

Focus Flock is a body doubling platform designed specifically for neurodivergent users, making productivity accessible, social, and shame-free.

### ✨ Key Features

- **Body Doubling Sessions**: Real-time video/audio focus sessions
- **Energy Matching**: Connect with study buddies who share your energy level
- **ADHD-Optimized Design**: Dopamine-driven micro-rewards and gentle encouragement
- **Creator Economy**: Monetization opportunities for session hosts
- **University Partnerships**: Bulk acquisition through educational institutions
- **Freemium Model**: Free tier with premium features for power users

### 🎯 Target Market

- **Primary**: Students (60%) - Ages 18-24, price-sensitive, high ADHD diagnosis rates
- **Secondary**: Young Professionals with ADHD (25%) - Remote work challenges
- **Tertiary**: Content Creators (10%) - Natural community builders
- **Quaternary**: Neurodivergent Community (5%) - ADHD, autism, anxiety

### 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom ADHD-friendly design system
- **Animations**: Framer Motion for dopamine-driven micro-rewards
- **State Management**: Zustand for lightweight state management
- **Real-time**: Socket.io for chat and presence, WebRTC for video
- **UI Components**: Custom ADHD-optimized component library

### 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 📁 Project Structure

```
focus-flock-mvp/
├── src/
│   ├── components/          # ADHD-friendly UI components
│   │   ├── Button.tsx      # Celebration animations
│   │   ├── Card.tsx        # Session and achievement cards
│   │   ├── ProgressBar.tsx # Progress Garden alternative
│   │   └── EnergySelector.tsx # Energy level matching
│   ├── pages/              # Next.js pages
│   │   ├── index.tsx       # Landing page
│   │   └── _app.tsx       # App wrapper
│   ├── store/              # Zustand state management
│   │   └── index.ts        # User, session, achievement stores
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # User, session, achievement types
│   └── styles/             # Global styles
│       └── globals.css     # ADHD-friendly design tokens
├── public/                 # Static assets
├── docs/                   # Documentation
└── package.json           # Dependencies and scripts
```

### 🎨 Design System

#### ADHD-Friendly Principles
- **Dopamine-Driven Micro-Rewards**: Immediate feedback and celebration animations
- **Shame-Free Environment**: No failure language, gentle redirects
- **Visual Hierarchy**: Clear information architecture for attention differences
- **Executive Function Support**: Context reminders and transition assistance

#### Brand Colors
- **Focus Purple** (`#8B5FBF`): Primary brand color - focus and intention
- **Flock Coral** (`#FF6B7A`): Community warmth and connection
- **Community Teal** (`#4ECDC4`): Growth and harmony
- **Dopamine Yellow** (`#FFD93D`): Celebration and achievement

#### Typography Scale
- **Display**: `clamp(2rem, 4vw, 2.5rem)` - Hero headlines
- **H1**: `clamp(1.75rem, 3vw, 2rem)` - Page titles
- **H2**: `clamp(1.5rem, 2.5vw, 1.75rem)` - Section headers
- **H3**: `clamp(1.25rem, 2vw, 1.5rem)` - Card titles
- **Body**: `1rem` - Default text
- **Small**: `0.875rem` - Secondary text

### 🧩 Core Components

#### Button Component
```tsx
<Button 
  variant="celebration" 
  size="lg"
  onClick={handleClick}
  loading={isLoading}
>
  ✨ Start Focus Session
</Button>
```

#### Card Component
```tsx
<Card variant="session" onClick={handleSessionClick}>
  <CardHeader>
    <CardTitle>Active Body Doubling</CardTitle>
    <CardSubtitle>25 minutes of focused work</CardSubtitle>
  </CardHeader>
  <CardContent>
    Great job staying focused!
  </CardContent>
</Card>
```

#### Progress Bar
```tsx
<ProgressBar 
  progress={75} 
  variant="celebration"
  showLabel
  label="Session Progress"
/>
```

#### Energy Selector
```tsx
<EnergySelector
  selectedEnergy={selectedEnergy}
  onEnergySelect={setSelectedEnergy}
/>
```

### 📊 State Management

#### User Store
```tsx
const { currentUser, setUser, updateUser, logout } = useUserStore();
```

#### Session Store
```tsx
const { activeSession, availableSessions, setActiveSession } = useSessionStore();
```

#### Achievement Store
```tsx
const { achievements, unlockAchievement } = useAchievementStore();
```

#### UI Store
```tsx
const { theme, sidebarOpen, toggleSidebar } = useUIStore();
```

### 🎯 Key Features Implemented

#### ✅ MVP Features
- [x] ADHD-friendly landing page with energy selector
- [x] Custom design system with celebration animations
- [x] Responsive layout with mobile-first design
- [x] State management with Zustand
- [x] TypeScript type definitions
- [x] Accessibility features (WCAG 2.1 AA)

#### 🚧 Planned Features
- [ ] Real-time video/audio sessions
- [ ] User authentication and profiles
- [ ] Session scheduling and matching
- [ ] Achievement and gamification system
- [ ] Creator economy features
- [ ] University partnership integration

### 🧠 ADHD-Specific Features

#### Progress Garden
Instead of linear streaks that create shame when broken, we use a growing garden metaphor:
- 🌱 **Seeds** - Potential (unused days)
- 🌿 **Sprouts** - Progress (partial sessions)
- 🌸 **Blooms** - Achievement (completed sessions)

#### Energy Matching
Users select their energy level to match with compatible study buddies:
- ⚡ **High Energy** - Ready for big challenges
- 🌊 **Steady Flow** - Consistent, focused work
- 🌙 **Gentle Pace** - Calm, methodical approach
- 🔋 **Recharge Mode** - Taking it easy today

#### Celebration Moments
- Immediate feedback within 100ms of actions
- Particle effects for achievements
- Haptic feedback for mobile devices
- Variable reward schedules to maintain engagement

### 🎨 Accessibility Features

- **High Contrast Mode**: Enhanced color ratios for visibility
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **Large Text**: Scaled typography for readability
- **Focus Indicators**: Clear focus rings for keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

### 📱 Responsive Design

- **Mobile-First**: Thumb-friendly navigation and touch targets
- **Tablet**: Two-column layouts with medium spacing
- **Desktop**: Flexible columns with optimized spacing
- **Touch Targets**: Minimum 44px height for all interactive elements

### 🚀 Performance Optimizations

- **GPU Acceleration**: Smooth animations with transform properties
- **Lazy Loading**: Components load on demand
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Splitting**: Code splitting for faster initial loads

### 🧪 Testing Strategy

- **Unit Tests**: Jest for component testing
- **Integration Tests**: User flow testing
- **Accessibility Tests**: Automated a11y testing
- **Performance Tests**: Lighthouse CI integration

### 📈 Success Metrics

#### User Engagement
- Session completion rate (target: 80%+)
- Daily active users (target: 60%+ retention)
- Community interaction rate (40%+ weekly engagement)

#### ADHD-Specific Outcomes
- Self-reported productivity improvement (70%+)
- Shame-free environment rating (4.5+ stars)
- Community connection score (80%+ feel connected)

#### Business Metrics
- Monthly recurring revenue growth
- Customer acquisition cost <$25
- LTV:CAC ratio >6:1
- Monthly churn <5.5%

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- ADHD community for feedback and insights
- Design system inspired by ADHD-friendly UX research
- Celebration animations inspired by successful gamification patterns
- Body doubling concept from ADHD productivity research

---

**Built with ❤️ for the neurodivergent community**

*Making productivity accessible, social, and ADHD-friendly* 