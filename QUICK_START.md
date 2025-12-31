# 🎬 Quick Reference - Movie App

## 🔑 CRITICAL: First Step

**Add your TMDB API Key to start using the app!**

File: `src/api/endpoints/movies.ts` (Line 11)
```typescript
const API_KEY = 'YOUR_TMDB_API_KEY_HERE';
```

Get your free key: https://www.themoviedb.org/settings/api

---

## 🎯 What Was Done

✅ **Removed**: Redux, All Todo code, Unused services  
✅ **Added**: Zustand state management, TMDB API integration  
✅ **Created**: 3 tabs (Movies/Favourites/Search), Movie detail screen  
✅ **Components**: MovieCard with proper structure (index/styles/utils/types)

---

## 📱 Current App Structure

### Bottom Tabs
1. **Movies** - Shows "Now Playing" movies from TMDB
2. **Favourites** - Displays favorited movies (Zustand store)
3. **Search** - Search movies with debounced input

### Navigation Flow
```
Tabs → MovieDetailScreen (when movie is pressed)
```

---

## 🗂️ Key Files Created

### API & Data
- `src/api/endpoints/movies.ts` - TMDB API calls
- `src/react-query/movies/index.ts` - React Query hooks
- `src/repository/movies/index.ts` - Repository layer
- `src/types/movie.types.ts` - TypeScript types

### State Management
- `src/stores/movies/index.ts` - Favorites store (Zustand)
- `src/stores/auth/index.ts` - Auth store (migrated to Zustand)
- `src/stores/focus/index.ts` - Focus store (migrated to Zustand)

### Screens
- `src/views/screens/movies/movies-screen/` - Now showing
- `src/views/screens/movies/favourites-screen/` - Favorites
- `src/views/screens/movies/search-screen/` - Search
- `src/views/screens/movies/movie-detail-screen/` - Detail view

### Components
- `src/views/components/movie-card/` - Reusable movie card
  - `index.tsx` - UI (dumb component)
  - `styles.ts` - Stylesheets
  - `utils.ts` - Helper functions
  - `types.ts` - TypeScript types

---

## 🔨 How to Use

### Add to Favorites
```typescript
import { useMoviesStore } from '../stores';

const addToFavourites = useMoviesStore(state => state.addToFavourites);
const isFavourite = useMoviesStore(state => state.isFavourite);

// Usage
addToFavourites(movieId);
isFavourite(movieId); // returns boolean
```

### Fetch Movies
```typescript
import { useNowPlayingMovies } from '../react-query/movies';

const { data, isLoading, error } = useNowPlayingMovies(page);
// data: MoviesResponse with results array
```

### Navigate to Detail
```typescript
import { useNavigation } from '@react-navigation/native';

navigation.navigate('MovieDetailScreen', { movieId: movie.id });
```

---

## 📋 Component Structure Pattern

```
my-component/
├── index.tsx      # UI only, no logic
├── styles.ts      # StyleSheet with theme
├── utils.ts       # Business logic & helpers
└── types.ts       # TypeScript interfaces
```

**Example:**
```typescript
// index.tsx - Dumb component
export const MyComponent = ({ data }: MyComponentProps) => {
  const styles = createStyles(theme);
  return <View>{formatData(data)}</View>;
};

// utils.ts - Logic
export const formatData = (data) => { /* logic */ };

// styles.ts - Styles
export const createStyles = (theme) => StyleSheet.create({});

// types.ts - Types
export interface MyComponentProps { data: any; }
```

---

## 🎨 Available React Query Hooks

```typescript
usePopularMovies(page)        // Popular movies
useNowPlayingMovies(page)     // Now playing
useUpcomingMovies(page)       // Upcoming
useTopRatedMovies(page)       // Top rated
useSearchMovies(query, page)  // Search
useMovieDetails(movieId)      // Movie details
useMovieCast(movieId)         // Cast info
useMovieVideos(movieId)       // Trailers
useSimilarMovies(movieId)     // Similar movies
```

---

## 🎯 Next Implementation Steps

### Priority 1: Enhance Screens
1. Display movie list/grid in MoviesScreen
2. Add MovieCard component to lists
3. Implement detail screen with backdrop
4. Show cast horizontally

### Priority 2: Favorites
1. Persist favorites to MMKV storage
2. Display favorites grid
3. Add toggle functionality everywhere

### Priority 3: Search
1. Display search results
2. Add filters
3. Search history

---

## 🐛 Troubleshooting

**Movies not loading?**  
→ Check if you added the TMDB API key

**Build errors?**  
→ Run `yarn install` and rebuild

**Navigation issues?**  
→ Clear metro cache: `yarn start --reset-cache`

---

## 📚 Useful Links

- [TMDB API Docs](https://developers.themoviedb.org/3)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [React Query Docs](https://tanstack.com/query/latest)

---

## ✅ Checklist

- [ ] Added TMDB API key
- [ ] Ran `yarn install`
- [ ] Tested app on device/simulator
- [ ] Verified all 3 tabs work
- [ ] Can navigate to detail screen

---

**Note**: See `TRANSFORMATION_SUMMARY.md` for complete details and `README_MOVIES.md` for full documentation.
