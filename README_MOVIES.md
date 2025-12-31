# FilmKu - Movie Discovery App

This is a React Native movie discovery application built with TypeScript, using TMDB API for movie data.

## 🎯 Project Transformation

This project has been transformed from a Todo app to a Movie app with the following changes:

### ✅ Changes Made

1. **State Management Migration**
   - ✅ Removed Redux (@reduxjs/toolkit, react-redux)
   - ✅ Implemented Zustand for lightweight state management
   - ✅ Converted auth and focus stores to Zustand
   - ✅ Created new movies store for favorites management

2. **Code Cleanup**
   - ✅ Removed all todo-related code and directories
   - ✅ Removed import/export services
   - ✅ Cleaned up navigation types

3. **Movie API Integration**
   - ✅ Created TMDB API endpoints
   - ✅ Setup React Query hooks for movies
   - ✅ Created repository layer for movies
   - ✅ Implemented API calls for:
     - Popular movies
     - Now playing movies
     - Upcoming movies
     - Top rated movies
     - Movie search
     - Movie details
     - Cast information
     - Videos/trailers
     - Similar movies

4. **Navigation Structure**
   - ✅ Updated tab navigation with 3 tabs:
     - Movies (Now Showing)
     - Favourites
     - Search
   - ✅ Created MovieDetailScreen
   - ✅ Removed todo-related screens

5. **Component Structure**
   - ✅ Created base movie screens (Movies, Favourites, Search, MovieDetail)
   - ✅ Created MovieCard component with proper structure:
     - `index.tsx` - Component UI
     - `styles.ts` - Stylesheets
     - `utils.ts` - Helper functions
     - `types.ts` - TypeScript types

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- yarn
- React Native development environment set up
- TMDB API Key

### Installation

1. Install dependencies:
```bash
yarn install
```

2. **IMPORTANT: Add your TMDB API Key**
   
   Open `src/api/endpoints/movies.ts` and add your API key:
   ```typescript
   const API_KEY = 'YOUR_TMDB_API_KEY_HERE';
   ```
   
   Get your free API key from: https://www.themoviedb.org/settings/api

3. Install iOS pods (iOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```

## 📁 Project Structure

```
src/
├── api/
│   └── endpoints/
│       └── movies.ts          # TMDB API calls
├── stores/
│   ├── movies/                # Zustand store for favorites
│   ├── auth/                  # Zustand store for auth
│   └── focus/                 # Zustand store for focus
├── react-query/
│   └── movies/                # React Query hooks
├── repository/
│   └── movies/                # Repository layer
├── types/
│   └── movie.types.ts         # Movie type definitions
├── views/
│   ├── screens/
│   │   └── movies/
│   │       ├── movies-screen/
│   │       ├── favourites-screen/
│   │       ├── search-screen/
│   │       └── movie-detail-screen/
│   └── components/
│       └── movie-card/        # Reusable movie card
│           ├── index.tsx      # Component UI
│           ├── styles.ts      # Styles
│           ├── utils.ts       # Helper functions
│           └── types.ts       # Types
└── navigation/
    ├── app-navigator.tsx      # Main navigator
    └── tab-navigator/         # Bottom tab navigator
```

## 🎨 Design Patterns

### Component Structure
Each component/screen follows this structure:
- `index.tsx` - Main component with UI only (dumb component)
- `styles.ts` - StyleSheet definitions
- `utils.ts` - Business logic and helper functions
- `types.ts` - TypeScript interfaces and types

### State Management
- **Zustand** - For client-side state (favorites, auth, focus)
- **React Query** - For server state (movies data)

### Code Organization
- Components are dumb (no logic)
- Logic is in utils files
- Types are in separate files (global if used in multiple places)
- Follows existing codebase patterns

## 🔜 Next Steps

To complete the movie app, you should:

1. **Enhance Movie Screens**
   - Implement horizontal scroll lists for different movie categories
   - Add loading and error states
   - Implement pagination

2. **Movie Detail Screen**
   - Display backdrop image
   - Show cast members with horizontal scroll
   - Add trailer player
   - Show similar movies
   - Implement favorite toggle

3. **Favourites Screen**
   - Display favorited movies from Zustand store
   - Persist favorites to MMKV storage
   - Add remove from favorites functionality

4. **Search Screen**
   - Implement search results grid
   - Add search history
   - Implement filters (genre, year, etc.)

5. **Additional Components**
   - MovieList component (horizontal/vertical)
   - CastCard component
   - GenreChip component
   - VideoPlayer component

6. **Persistence**
   - Save favorites to MMKV storage
   - Restore favorites on app start
   - Cache movie data

## 🛠 Technologies Used

- React Native 0.83
- TypeScript
- Zustand (State Management)
- React Query (Server State)
- React Navigation 7
- Axios
- TMDB API

## 📝 Notes

- The app still retains auth, categories, profile, and focus features from the original todo app
- You may want to remove these if they're not needed for your movie app
- The notification service references have been removed from the app initialization
- Focus mode functionality is still present but not integrated into the movie app flow

## 🔑 Environment Variables

Consider moving the API key to environment variables:
1. Create a `.env` file
2. Add: `TMDB_API_KEY=your_key_here`
3. Use a package like `react-native-config` to access it

## 📄 License

This project structure follows the original UpTodo app license.
