<!-- View this in this website https://mermaidviewer.com/ perfect for diagrams of architecture -->

# Movies App - Product Requirements Document (PRD) Diagrams

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph "Presentation Layer"
        UI[React Native UI]
        Movies[Movies Screen]
        Favourites[Favourites Screen]
        Search[Search Screen]
        Details[Movie Details Screen]
    end

    subgraph "State Management"
        Zustand[Zustand Store<br/>Favourites]
        ReactQuery[React Query<br/>Server State Cache]
    end

    subgraph "Business Logic"
        Hooks[React Query Hooks]
        Repository[Repository Layer]
        Services[Services Layer]
    end

    subgraph "Data Layer"
        API[Axios HTTP Client]
        TMDB[TMDB API<br/>api.themoviedb.org]
        Storage[MMKV Storage]
    end

    UI --> Zustand
    UI --> Hooks
    Hooks --> ReactQuery
    Hooks --> Repository
    Repository --> API
    API --> TMDB
    Zustand -.-> Storage
    ReactQuery -.-> Storage
    Services --> Storage
```

## 2. Application Navigation Flow

```mermaid
graph TD
    Start([App Launch]) --> Splash[Splash Screen]
    Splash --> Main[Main Navigator]

    Main --> Tabs{Bottom Tabs}

    Tabs --> Tab1[Movies Tab<br/>Now Playing & Popular]
    Tabs --> Tab2[Favourites Tab<br/>Saved Movies]
    Tabs --> Tab3[Search Tab<br/>Find Movies]

    Tab1 --> Details[Movie Details Screen]
    Tab2 --> Details
    Tab3 --> Details

    Details --> Play[Watch Trailer]
    Details --> Fav[Add/Remove Favourite]
    Details --> Similar[Similar Movies]

    style Start fill:#90EE90
    style Details fill:#FFD700
    style Tabs fill:#87CEEB
```

## 3. Feature Architecture

```mermaid
graph LR
    subgraph "Core Features"
        F1[Browse Movies]
        F2[Search Movies]
        F3[View Details]
        F4[Manage Favourites]
        F5[Watch Trailers]
    end

    subgraph "Supporting Features"
        S1[Theme Toggle<br/>Light/Dark]
        S2[Localization<br/>Multi-language]
        S3[Error Handling]
        S4[Offline Support]
    end

    F1 --> |Uses| API1[TMDB API]
    F2 --> |Uses| API1
    F3 --> |Uses| API1
    F4 --> |Uses| Store[Zustand Store]
    F5 --> |Opens| External[YouTube]

    S1 --> |Stored in| Local[MMKV]
    S2 --> |i18next| Local
    S4 --> |React Query Cache| Local
```

## 4. Data Flow - Movie Browsing

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Movies Screen
    participant Hook as useNowPlayingMovies
    participant RQ as React Query
    participant Repo as Repository
    participant API as Axios Client
    participant TMDB as TMDB API
    participant Cache as Query Cache

    U->>UI: Opens Movies Screen
    UI->>Hook: Call hook
    Hook->>RQ: useQuery()

    alt Data in Cache & Fresh
        RQ->>Cache: Get cached data
        Cache-->>UI: Return movies
    else Data Stale or Missing
        RQ->>Repo: Fetch movies
        Repo->>API: GET /movie/now_playing
        API->>TMDB: HTTP Request
        TMDB-->>API: JSON Response
        API-->>Repo: Parsed data
        Repo-->>RQ: Movies array
        RQ->>Cache: Update cache (15min)
        RQ-->>UI: Return movies
    end

    UI->>U: Display movie carousel
```

## 5. Data Flow - Favourites Management

```mermaid
sequenceDiagram
    participant U as User
    participant D as Detail Screen
    participant Z as Zustand Store
    participant M as MMKV Storage
    participant F as Favourites Screen

    U->>D: Taps Favourite Button
    D->>Z: addToFavourites(movieId)
    Z->>Z: Update Set<number>
    Z->>M: Persist to storage
    M-->>Z: Saved
    Z-->>D: State updated
    D->>U: Show heart filled

    Note over F: User navigates to Favourites

    U->>F: Opens Favourites Tab
    F->>Z: Get favourites Set
    Z-->>F: [123, 456, 789]

    loop For each favourite ID
        F->>F: Fetch movie details from cache/API
    end

    F->>U: Display favourite movies
```

## 6. Component Hierarchy

```mermaid
graph TD
    App[App Root] --> RQ[React Query Provider]
    RQ --> Nav[Navigation Container]
    Nav --> Tabs[Bottom Tabs Navigator]

    Tabs --> M[Movies Screen]
    Tabs --> Fav[Favourites Screen]
    Tabs --> S[Search Screen]

    M --> ML1[MovieList<br/>Now Playing]
    M --> ML2[MovieList<br/>Popular]

    ML1 --> MC1[MovieCard]
    ML1 --> MC2[MovieCard]
    ML2 --> MC3[MovieCard]

    Nav --> Det[Movie Detail Screen]
    Det --> Hero[Hero Image]
    Det --> Info[Movie Info]
    Det --> Cast[Cast List]
    Det --> Similar[Similar Movies]

    Similar --> MC4[MovieCard]

    style App fill:#FFB6C1
    style RQ fill:#DDA0DD
    style Nav fill:#87CEEB
```

## 7. State Management Strategy

```mermaid
graph TB
    subgraph "Client State (Zustand)"
        ZS[Zustand Store]
        Fav[Favourites Set<number>]
        ZS --> Fav
    end

    subgraph "Server State (React Query)"
        RQC[Query Client]

        Q1[Popular Movies<br/>15min cache]
        Q2[Now Playing<br/>15min cache]
        Q3[Search Results<br/>15min cache]
        Q4[Movie Details<br/>30min cache]
        Q5[Cast Info<br/>30min cache]
        Q6[Videos<br/>30min cache]

        RQC --> Q1
        RQC --> Q2
        RQC --> Q3
        RQC --> Q4
        RQC --> Q5
        RQC --> Q6
    end

    subgraph "Persistent Storage"
        MMKV[MMKV Storage]
        P1[Favourites]
        P2[Theme Preference]
        P3[Language]

        MMKV --> P1
        MMKV --> P2
        MMKV --> P3
    end

    Fav -.Sync.-> P1
    Q1 -.Cache.-> MMKV
    Q2 -.Cache.-> MMKV
    Q3 -.Cache.-> MMKV
    Q4 -.Cache.-> MMKV
```

## 8. API Integration Architecture

```mermaid
graph LR
    subgraph "React Query Hooks"
        H1[usePopularMovies]
        H2[useNowPlayingMovies]
        H3[useSearchMovies]
        H4[useMovieDetails]
        H5[useMovieCast]
        H6[useMovieVideos]
    end

    subgraph "Repository Layer"
        R[Movies Repository]
    end

    subgraph "API Endpoints"
        E1[/movie/popular]
        E2[/movie/now_playing]
        E3[/search/movie]
        E4[/movie/:id]
        E5[/movie/:id/credits]
        E6[/movie/:id/videos]
    end

    subgraph "External API"
        TMDB[TMDB API<br/>api.themoviedb.org/3]
    end

    H1 --> R
    H2 --> R
    H3 --> R
    H4 --> R
    H5 --> R
    H6 --> R

    R --> E1
    R --> E2
    R --> E3
    R --> E4
    R --> E5
    R --> E6

    E1 --> TMDB
    E2 --> TMDB
    E3 --> TMDB
    E4 --> TMDB
    E5 --> TMDB
    E6 --> TMDB
```

## 9. Caching Strategy

```mermaid
graph TD
    Request[API Request] --> Check{Data in Cache?}

    Check -->|Yes| Fresh{Is Fresh?}
    Check -->|No| Fetch[Fetch from API]

    Fresh -->|Yes, within staleTime| Return[Return Cached Data]
    Fresh -->|No, stale| Background[Return Cache + Background Refetch]

    Fetch --> API[TMDB API Call]
    Background --> API

    API --> Cache[Update Cache]
    Cache --> Return

    Return --> Display[Display to User]

    subgraph "Cache Durations"
        D1[Popular: 15min stale, 1hr cache]
        D2[Details: 30min stale, 2hr cache]
        D3[Search: 15min stale, 1hr cache]
    end

    style Check fill:#FFD700
    style Fresh fill:#87CEEB
    style Cache fill:#90EE90
```

## 10. User Journey - Complete Flow

```mermaid
journey
    title Movie Discovery User Journey
    section Browse
      Open App: 5: User
      View Now Playing: 5: User, API
      View Popular Movies: 4: User, API
      Scroll through list: 4: User
    section Discover
      Tap on movie: 5: User
      View details: 5: User, API
      Read overview: 4: User
      Watch trailer: 5: User, YouTube
      See cast: 4: User, API
    section Save
      Add to favourites: 5: User, Storage
      Browse similar: 4: User, API
    section Search
      Go to search tab: 5: User
      Type movie name: 4: User
      View results: 5: User, API
      Find movie: 5: User
    section Manage
      Open favourites: 5: User
      Review saved movies: 5: User, Storage
      Remove favourites: 3: User, Storage
```

## 11. Error Handling Flow

```mermaid
graph TD
    Action[User Action] --> Try{Try API Call}

    Try --> Success[Success Response]
    Try --> Error{Error Type?}

    Error --> Network[Network Error]
    Error --> Auth[401 Unauthorized]
    Error --> NotFound[404 Not Found]
    Error --> Server[500 Server Error]

    Network --> Retry{Auto Retry<br/>2 times}
    Retry -->|Success| Success
    Retry -->|Failed| ShowError[Show Error Toast]

    Auth --> ShowError
    NotFound --> ShowError
    Server --> ShowError

    Success --> UpdateCache[Update React Query Cache]
    UpdateCache --> Display[Display Data]

    ShowError --> Fallback{Has Cache?}
    Fallback -->|Yes| ShowCached[Show Cached Data]
    Fallback -->|No| Empty[Show Empty State]

    style Success fill:#90EE90
    style Error fill:#FFB6C1
    style ShowError fill:#FF6B6B
```

## 12. Technology Stack

```mermaid
graph TB
    subgraph "Frontend Framework"
        RN[React Native 0.83]
        TS[TypeScript]
        RN19[React 19.2]
    end

    subgraph "Navigation"
        RNNav[React Navigation 7]
        Stack[Stack Navigator]
        Tabs[Bottom Tabs]
    end

    subgraph "State Management"
        Zustand5[Zustand 5.0.9]
        RQ5[React Query 5.90]
    end

    subgraph "Network & Data"
        Axios[Axios 1.13]
        MMKV[MMKV Storage 4.1]
        FImg[FastImage 8.13]
    end

    subgraph "UI & Theme"
        Theme[Custom Theme System]
        i18n[i18next 25.7]
        GH[Gesture Handler 2.29]
    end

    subgraph "External Services"
        TMDB[TMDB API v3]
        YT[YouTube]
    end

    RN --> RNNav
    RN --> Zustand5
    RN --> RQ5
    RQ5 --> Axios
    Axios --> TMDB
    Zustand5 --> MMKV
    RN --> FImg
    RN --> Theme
    RN --> i18n
```

---

## Key Features Summary

### Functional Requirements

1. **Browse Movies**: Now Playing (carousel), Popular (list)
2. **Search**: Real-time search with debounce
3. **Movie Details**: Full info, cast, trailers, similar movies
4. **Favourites**: Add/remove/view saved movies
5. **Themes**: Light/Dark mode toggle

### Non-Functional Requirements

1. **Performance**: 15-30 min caching strategy
2. **Offline Support**: React Query cache persistence
3. **Error Handling**: Toast notifications, retry logic
4. **Accessibility**: Localization support
5. **Scalability**: Repository pattern, modular architecture

### Technical Constraints

- TMDB API rate limits (cached to prevent abuse)
- Mobile-first design (iOS/Android)
- TypeScript strict mode
- React Native 0.83 compatibility
