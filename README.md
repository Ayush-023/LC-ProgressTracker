# LeetCode Progress Tracker

A static website to track your LeetCode problem-solving progress. Built with React, TypeScript, Vite, and Tailwind CSS. Uses localStorage for persistence - no backend required.

## Features

- View categorized LeetCode problems
- Mark problems as solved with checkboxes
- Track progress visually with a progress bar
- Filter by difficulty, topic, and status
- Statistics panel showing breakdown by difficulty
- Zero hosting cost (static site)
- No authentication needed

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment to any static hosting service like Azure Static Web Apps, Netlify, or Vercel.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with title and progress summary
│   ├── ProgressBar.tsx     # Visual progress indicator
│   ├── StatsPanel.tsx      # Statistics by difficulty
│   ├── Filters.tsx         # Filter controls
│   ├── ProblemList.tsx     # List of problems
│   └── ProblemItem.tsx     # Individual problem item
├── hooks/
│   └── useLocalStorage.ts  # Custom hook for localStorage
├── utils/
│   ├── constants.ts        # App constants
│   └── helpers.ts          # Utility functions
├── types/
│   └── Problem.ts          # TypeScript types
├── App.tsx                 # Main app component
└── main.tsx                # App entry point

public/
└── problems.json           # Static problem data
```

## Data Structure

### problems.json

```json
[
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": ["Array", "Hash Table"],
    "url": "https://leetcode.com/problems/two-sum/"
  }
]
```

### localStorage

Progress is stored in localStorage under the key `lc_tracker_progress`:

```json
{
  "two-sum": true,
  "add-two-numbers": false
}
```

## Deployment

### Azure Static Web Apps

1. Build the project: `npm run build`
2. Upload the `dist` folder to Azure Static Web Apps
3. Enable gzip compression and caching for optimal performance

Expected cost: ₹0/month

## Future Enhancements

- Export/import progress as JSON
- Dark mode
- Search functionality
- Notes per problem
- Preset collections (e.g., Blind 75, NeetCode 150)

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
