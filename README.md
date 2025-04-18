# Mines Igra

### Osnovno
- **Next.js**
- **TypeScript**
- **CSS Modules**

### Upravljanje stateovima
- **Redux Toolkit** 
- **React-Redux**

### Povezivanje s API-jem
- **TanStack React Query**

### UI/UX
- **Motion**
- **React Hot Toast**
- **Lucide React**

## Arhitektura projekta

### Struktura direktorija
- `/src/app` - Next.js stranice i layouti
- `/src/components` - React komponente za igru i UI
- `/src/api` - API servisi i konfiguracija
- `/src/store` - Redux store i slice-ovi
- `/src/lib` - Pomoćne funkcije, konstante i tipovi
- `/src/styles` - Globalni stilovi i varijable

### Komponente za igru
- **GameGrid** - Prikazuje ploču za igru s pločicama
- **GameControls** - Kontrole za igru
- **Tile** - Pojedinačna pločica s različitim stanjima

### Redux
- **gameSlice** - Logika igre, stanje ploče
- **walletSlice** - Upravljanje balancom i API integracija