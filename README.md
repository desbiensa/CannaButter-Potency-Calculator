# CannaButter THC Potency Calculator

A modern, type-safe web application for calculating the optimal THC potency in your cannabutter. Built with the latest web technologies for a fast, reliable, and beautiful user experience.

## 🚀 Tech Stack

This project has been completely modernized with:

- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[React 19](https://react.dev/)** - Latest version of React
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible React components
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## ✨ Features

- 🎯 **Accurate Calculations**: Calculate optimal THC potency with scientific precision
- ✅ **Form Validation**: Real-time input validation with helpful error messages
- 💡 **Helpful Tooltips**: Contextual help for each input field
- 🎨 **Modern UI**: Beautiful interface built with shadcn/ui components
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Vite for instant hot module replacement
- 🔒 **Type Safety**: Full TypeScript coverage for reliable code

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/desbiensa/CannaButter-Potency-Calculator.git
cd CannaButter-Potency-Calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

1. **THC/mg (Active)**: Enter the amount of active THC in your marijuana (typically 1-4% for raw buds)
2. **TOTAL THC/mg**: Enter the total THC content (active + inactive) from your product label
3. **Amount of Cannabis/g**: Enter how many grams of cannabis you used
4. **Produced Butter/g**: Enter how many grams of cannabutter you produced

Click "Calculate Potency" to see your results. The calculator will show:
- The optimal potency per gram
- The final approximation (with 10% removed for accuracy)

## 🧪 Formula

The calculator uses the following formula to account for decarboxylation:

```
Potency = (((totalThc - thcActive) × 0.877 + thcActive) × cannabisAmount) / butterAmount
```

The factor 0.877 represents the conversion rate during decarboxylation when THCA converts to THC.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Fork the repository
- Create a feature branch
- Make your improvements
- Submit a pull request

## 📺 Support

Please **support** and **subscribe** to my [Youtube Channel](http://www.youtube.com/channel/UC627LnTjnTPFwITyWguF0tg?sub_confirmation=1) for more cannabis cooking content!

## 📝 License

This project is open source and available for anyone to use and improve.

## 🌿 About

New recipes with Cannabis (butter, powder, oil) and learning as we go about infusion and absorption. Since marijuana has been legalized in Canada, it's time we enjoy all aspects of it. This channel is also dedicated to people who love to get high and are maybe not fans of smoking. Edible making is much more than just getting stoned - the buzz you get when THC and/or CBD is introduced to food is so different, and you get to balance things out to guide the people you serve food to on a calculated journey!

---

Made with 🌿 by [The Cannabis Cook](http://www.youtube.com/channel/UC627LnTjnTPFwITyWguF0tg)
