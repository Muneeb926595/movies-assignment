# Movies Assignment - React Native Application

## 📱 Demo

https://drive.google.com/file/d/1TTdC7FRURCnjyVM5HbJe8ch73jNYBSs_/view?usp=sharing

---

## 📋 Overview

A production-ready React Native mobile application that allows users to browse, search, and explore movies using The Movie Database (TMDB) API. The app features a clean architecture with proper separation of concerns, comprehensive testing, and modern development practices.

### Key Features

- 🎬 Browse popular, now playing, upcoming, and top-rated movies
- 🔍 Search functionality with real-time results
- 📖 Detailed movie information with cast and trailers
- ⭐ Add movies to favorites
- 🌐 Internationalization (i18n) ready
- 💾 Persistent storage with MMKV
- 🧪 Comprehensive unit test coverage

---

## 🛠 Tech Stack

### Core Technologies

- **React Native** (0.83.0) - Cross-platform mobile framework
- **TypeScript** (5.8.3) - Type-safe development
- **React** (19.2.0) - UI library

### State Management & Data Fetching

- **TanStack React Query** (5.90.12) - Server state management, caching, and synchronization
- **Zustand** (5.0.9) - Lightweight local state management
- **Axios** (1.13.2) - HTTP client with interceptors

### Navigation

- **React Navigation** (7.x) - Native stack and bottom tab navigation
- Bottom tabs for main screens
- Stack navigation for detailed views

### Styling & UI

- **styled-components** (6.2.0) - CSS-in-JS styling solution
- **react-native-vector-icons** (10.3.0) - Icon library
- **react-native-fast-image** (@d11/react-native-fast-image) - Optimized image loading
- **sonner-native** (0.22.2) - Toast notifications
- **react-native-theme-switch-animation** (0.8.0) - Smooth theme transitions

### Storage & Persistence

- **MMKV** (4.1.0) - High-performance key-value storage
- Custom adapter pattern for storage abstraction

### Internationalization

- **i18next** (25.7.3) - Internationalization framework
- **react-i18next** (16.5.0) - React bindings for i18next

### Testing

- **Jest** (29.6.3) - Testing framework
- **@testing-library/react-native** - Component testing utilities
- 146 unit tests with comprehensive coverage

### Development Tools

- **Rozenite DevTools** - Development plugins for debugging
  - Metro plugin
  - MMKV plugin
  - Network activity monitor
  - React Navigation plugin
  - Redux DevTools integration
  - TanStack Query plugin
  - Require profiler
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20
- **Yarn** package manager
- **React Native development environment** (Android Studio / Xcode)
- **TMDB API Key** (already configured in the project)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd movies-assignment

# Install dependencies
yarn install

# iOS: Install CocoaPods dependencies
cd ios && pod install && cd ..
```

### Running the Application

```bash
# Start Metro bundler
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Run with Rozenite DevTools (development mode)
yarn start:rozenite
```

### Running Tests

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test --coverage

# Run specific test suites
yarn test --testPathPattern="repository|utils|error-handler"

# Run tests in watch mode
yarn test --watch
```

### Development Commands

```bash
# Lint code
yarn lint

# Setup ADB reverse for Android (port forwarding)
yarn adb

# Reset Metro cache
yarn start --reset-cache
```

---

## 🏗 Architecture & Separation of Concerns

The application follows a **clean architecture** pattern with clear separation of concerns across multiple layers:

### Directory Structure

```
movies-assignment/
├── __tests__/                    # All test files (mirrors src structure)
│   ├── repository/
│   ├── services/
│   └── utils/
├── src/
│   ├── api/                      # API Layer
│   │   ├── axios/               # Axios client configuration
│   │   ├── config/              # API configuration (TMDB)
│   │   └── endpoints/           # API endpoint definitions
│   ├── repository/              # Repository Layer (Data Access)
│   │   └── movies/              # Movies repository with normalization
│   ├── react-query/             # React Query Layer
│   │   └── movies/              # Query hooks and keys
│   ├── services/                # Service Layer
│   │   ├── error-handler/       # Global error handling
│   │   ├── storage/             # Storage abstraction (MMKV)
│   │   ├── localisation/        # i18n services
│   │   └── toast/               # Toast notifications
│   ├── stores/                  # Zustand Stores
│   │   └── movies/              # Local state management
│   ├── navigation/              # Navigation Configuration
│   │   └── tab-navigator/       # Tab navigation setup
│   ├── views/                   # Presentation Layer
│   │   ├── components/          # Reusable UI components
│   │   └── screens/             # Screen components
│   ├── theme/                   # Theme Configuration
│   │   └── styled-theme-config.ts  # Single source of truth for theming
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   ├── hooks/                   # Custom React hooks
│   └── globals/                 # Global constants
└── __mocks__/                   # Root-level mocks
```

### Layer Responsibilities

#### 1. **API Layer** (`src/api/`)

- **Purpose**: Direct communication with external APIs
- **Responsibilities**:
  - Axios client configuration with interceptors
  - Request/response transformations
  - API endpoint definitions
  - Base URL and authentication management
- **Key Files**: `axios-client.ts`, `movies.ts`

#### 2. **Repository Layer** (`src/repository/`)

- **Purpose**: Data access abstraction between React Query and API
- **Responsibilities**:
  - Centralized data fetching logic
  - Data normalization and validation
  - Error handling and transformation
  - Business logic for data operations
- **Benefits**:
  - Single source of truth for data operations
  - Easily testable with mocks
  - Decouples UI from API implementation
- **Key Pattern**: Class-based repository with typed methods

```typescript
// Example: MoviesRepository
class MoviesRepository {
  async getPopularMovies(page = 1): Promise<MoviesResponse>;
  async getMovieDetails(movieId: number): Promise<MovieDetails>;
  getImageUrl(path: string | null, size?: string): string | null;
}
```

#### 3. **React Query Layer** (`src/react-query/`)

- **Purpose**: Server state management and caching
- **Responsibilities**:
  - Query hooks for data fetching
  - Cache management
  - Automatic refetching and background updates
  - Optimistic updates and mutations
- **Key Pattern**: Custom hooks that use repository methods

```typescript
// Hooks call repository instead of API directly
export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: moviesKeys.popular(page),
    queryFn: () => moviesRepository.getPopularMovies(page),
  });
};
```

#### 4. **Service Layer** (`src/services/`)

- **Purpose**: Cross-cutting concerns and utilities
- **Components**:
  - **Error Handler**: Centralized error parsing and user alerts
  - **Storage**: MMKV adapter with type-safe keys
  - **Localisation**: i18n configuration and providers
  - **Toast**: Notification system
- **Pattern**: Singleton services with clear interfaces

#### 5. **State Management** (`src/stores/`)

- **Purpose**: Local UI state (non-server state)
- **Technology**: Zustand for lightweight state
- **Use Cases**:
  - Favorites management

#### 6. **Presentation Layer** (`src/views/`)

- **Purpose**: UI components and screens
- **Structure**:
  - **Screens**: Full-page components
  - **Components**: Reusable UI elements
- **Responsibilities**:
  - Render UI based on props/state
  - Handle user interactions
  - Delegate business logic to services/repositories
- **Styling**: styled-components for component-scoped styles

#### 7. **Theme Layer** (`src/theme/`)

- **Purpose**: Single source of truth for all styling
- **Configuration**: `styled-theme-config.ts`
- **Includes**:
  - Color palettes (light/dark themes)
  - Typography (fonts, sizes, weights)
  - Layout constants (spacing, breakpoints)
  - Responsive utilities
  - Shadow definitions
- **Benefits**: Consistent design system across the app

#### 8. **Testing Layer** (`__tests__/`)

- **Purpose**: Comprehensive unit and integration tests
- **Structure**: Mirrors `src/` directory structure
- **Coverage**:
  - Repository layer: 37 tests
  - Utils: 51 tests
  - Services: 58 tests
  - Total: 146 tests
- **Patterns**:
  - AAA (Arrange, Act, Assert)
  - Comprehensive mocking
  - Edge case coverage

### Data Flow

```
User Interaction
    ↓
React Component
    ↓
React Query Hook (usePopularMovies)
    ↓
Repository Layer (moviesRepository.getPopularMovies)
    ↓
API Layer (moviesEndpoints.getPopularMovies)
    ↓
Axios Client (HTTP Request)
    ↓
TMDB API
    ↓
Response flows back up with:
- Normalization at Repository
- Caching at React Query
- Rendering at Component
```

### Key Architectural Benefits

1. **Testability**: Each layer can be tested independently with mocks
2. **Maintainability**: Clear boundaries make code easier to understand and modify
3. **Scalability**: Easy to add new features without affecting existing code
4. **Type Safety**: TypeScript ensures compile-time error detection
5. **Reusability**: Repository methods can be used across multiple components
6. **Performance**: React Query handles caching and prevents unnecessary API calls
7. **Error Handling**: Centralized error management provides consistent UX

### Design Patterns Used

- **Repository Pattern**: Data access abstraction
- **Adapter Pattern**: Storage service abstraction
- **Singleton Pattern**: Service instances
- **Factory Pattern**: Theme configuration
- **Observer Pattern**: React Query subscriptions
- **Provider Pattern**: Theme and i18n context

---

## 📝 API Configuration

The app uses **The Movie Database (TMDB) API**. The API key is configured in:

```
src/api/config/tmdb.config.ts
```

To use your own API key, update the `API_KEY` constant in the configuration file.

---
