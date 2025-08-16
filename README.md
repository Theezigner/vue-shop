# Vue Shopping Cart

A small practice app built with **Vue 3**, **TypeScript**, **Vite**, and **Tailwind CSS**. It displays a simple product catalog with variant (color) selection and a cart with add/remove actions. More features coming soon.

---

## ✨ Features

### Catalog & Cart
- Product display with **variant color** selection  
- **Add to Cart** / **Remove from Cart** actions  
- Disabled **Add to Cart** when out of stock (styled)  
- Image updates when selecting a variant  
- Hidden “Remove” button when cart is empty

### App Shell & Navigation (new)
- **Responsive Header**: logo (left), desktop nav (center/right), **Cart** icon with badge (right)
- **Mobile hamburger menu**: slide-in panel with overlay, closes on link click / overlay click / close button
- **Active link highlighting** using Vue Router’s active classes
- **Routing** with clean URLs (history mode), including:
  - `/` Home  
  - `/shop` Shop  
  - `/product/:slug` Product Details  
  - `/cart` Cart  
  - `/checkout` Checkout  
  - Catch-all **404** page  
- **Scroll to top** on route change (smooth UX)

### Developer Experience (new)
- `@` **alias** for clean imports from `src`
- Clear **project structure** (components, pages, stores, router, etc.)
- Tailwind CSS for fast, consistent styling
- Composition API (`<script setup>`) + TypeScript

> Coming soon: **Pinia** global cart state, **localStorage** cart persistence, **subtotals/totals**, accessibility polish, and tests.

---

## 🧰 Tech Stack

- **Framework:** Vue 3 + Vite  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS (via `@tailwindcss/vite`)  
- **State:** Local component state (can be upgraded to Pinia later)
- **Routing:** Vue Router (history mode) 

---

## 🚀 Quick Start

```bash
# 1) Clone
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2) Install
pnpm install

# 3) Run dev server
pnpm run dev
```

- Dev server (Vite) starts at: http://localhost:5173 (by default)

---

## ⚙️ Required Config (new)

### 1) `@` alias to `src`
So imports like `@/pages/Home.vue` work everywhere.

**vite.config.ts** (ESM-safe)
```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }
  }
});
```

**tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["node"]
  }
}
```

> After changing config, **stop and restart** the dev server.

### 2) Tailwind (minimal)
`src/style.css`
```css
@import "tailwindcss";
```

---

## 🗺️ Routes (new)

- `/` — Home  
- `/shop` — Product catalog  
- `/product/:slug` — Product details (dynamic)  
- `/cart` — Cart  
- `/checkout` — Checkout  
- `/:pathMatch(.*)*` — Not Found (404)

Extras:
- **Active link classes**: `router-link-active`, `router-link-exact-active`  
- **Scroll behavior**: page scrolls to top on every navigation

---

## 🧭 Header & Navigation (new)

### Desktop
- **Logo** (left) → routes to `/`  
- **Nav links** (Shop, About, Contact…) with **active** styling  
- **Cart icon** with count badge → routes to `/cart`

### Mobile
- **Hamburger button** toggles a **slide-in menu** (overlay + panel)  
- Menu **closes** on: link click, overlay click, or the **X** button  
- Big, thumb-friendly tap targets  
- (Planned) Escape key closes and focus management for full a11y polish

**Menu layout (three simple zones):**
1. **Top Bar:** Store name/logo + Close (X)  
2. **Main Nav:** Vertical links (same list as desktop)  
3. **Footer Actions:** Optional Login/Help/Language or social links

---

## 🗂️ Project Structure

```
.
├─ src/
│  ├─ assets/
│  │  └─ images/
│  ├─ components/
│  │  ├─ header/
│  │  │  ├─ Logo.vue
│  │  │  ├─ NavLinks.vue
│  │  │  ├─ CartIcon.vue
│  │  │  ├─ HamburgerButton.vue
│  │  │  └─ MobileMenu.vue  # or MainMenu.vue (slide-in panel)
│  │  └─ common/
│  │     ├─ ProductCard.vue
│  │     ├─ ProductGrid.vue
│  │     ├─ QuantityStepper.vue
│  │     ├─ Price.vue
│  │     └─ StarRating.vue
│  ├─ layouts/
│  │  └─ DefaultLayout.vue
│  ├─ pages/
│  │  ├─ Home.vue
│  │  ├─ Shop.vue
│  │  ├─ ProductDetail.vue
│  │  ├─ Cart.vue
│  │  ├─ Checkout.vue
│  │  └─ NotFound.vue
│  ├─ router/
│  │  └─ index.ts
│  ├─ stores/                # (planned) Pinia: cart.ts, products.ts, user.ts
│  ├─ services/
│  │  └─ api.ts
│  ├─ types/
│  │  └─ index.ts
│  ├─ utils/
│  │  └─ format.ts
│  ├─ styles/
│  │  └─ globals.css
│  └─ App.vue
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 🧪 Manual Test Checklist

**Routing**
- Can navigate to `/`, `/shop`, `/product/test`, `/cart`, `/checkout`
- Unknown routes show **404**
- Page scroll resets to top on navigation

**Header (Desktop)**
- Logo goes to Home
- Links navigate and **active** state highlights correctly
- Cart icon routes to `/cart`

**Header (Mobile)**
- Nav links hidden; hamburger visible
- Tap hamburger → menu opens
- Tap overlay or X → closes
- Tap any menu link → navigates **and** closes

---

## 🐞 Troubleshooting

**“Failed to resolve import '@/pages/...'”**  
- Files exist under `src/pages` with **exact** names/casing  
- `vite.config.ts` alias points `@ → src`  
- `tsconfig.json` has `"paths": { "@/*": ["src/*"] }`  
- Restart dev server

**“path is not defined” in `vite.config.ts`**  
- Use ESM import: `import { fileURLToPath, URL } from "node:url"` (see config above)  
  or `import path from "node:path"`

**Hamburger doesn’t open the menu**  
- Parent holds a reactive `isMenuOpen` and passes `:isOpen="isMenuOpen"`  
- Hamburger emits `"toggle"`; parent listens with `@toggle="isMenuOpen = !isMenuOpen"`  
- Menu emits `"close"`; parent listens with `@close="isMenuOpen = false"`  
- Ensure you imported and rendered the **same** component you created (`MobileMenu.vue` vs `MainMenu.vue`)

---

## 🧭 Design & A11y Notes

- **Tap targets:** aim for ~44–48px height on touch items  
- **Focus styles:** visible outlines for keyboard users  
- **Alt text:** meaningful `alt` on logos/images  
- **Active link:** color + underline or border for clarity  
- **Z-index & overlay:** menu above page content; overlay dims the background  
- **(Planned)** Focus trap inside the mobile menu and ESC to close

---

## 🔜 Roadmap

- [ ] **Pinia** cart store: items, count, totals, actions  
- [ ] **localStorage** cart persistence  
- [ ] **Price formatting** + tax/subtotal/total  
- [ ] **Catalog filters** (search, category, sort by price)  
- [ ] **Accessibility**: focus trap + ESC for menus/drawers  
- [ ] **Unit tests** (Vitest) and **E2E** (Cypress/Playwright)  
- [ ] **Empty states / skeleton loaders**  
- [ ] Optional: Auth stubs (Login/Register) and Order Success flow

---

## 🧩 Scripts

```bash
pnpm dev        # start dev server
pnpm build      # production build to /dist
pnpm preview    # preview the production build
```

---

## 🧪 Example Snippets

**Variant model (TypeScript):**
```ts
type Variant = {
  variantId: number
  variantColor: string
  variantImage: string
}
```

**Reactive state + actions:**
```ts
import { ref, computed } from 'vue'

const variants = ref<Variant[]>([
  { variantId: 2234, variantColor: 'green', variantImage: '/src/assets/vmSocks-green-onWhite.jpg' },
  { variantId: 2235, variantColor: 'blue',  variantImage: '/src/assets/vmSocks-blue-onWhite.jpg' }
])

const selectedIndex = ref(0)
const image = computed(() => variants.value[selectedIndex.value].variantImage)

const cart = ref(0)
const addToCart = () => (cart.value++)
const removeFromCart = () => (cart.value--)
```

**Disabled button styling (Tailwind):**
```html
<button
  @click="addToCart"
  :disabled="!inventory"
  class="
        px-3 py-2 rounded border text-white bg-blue-600
        disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-100 
        disabled:cursor-not-allowed disabled:opacity-40 ">
  Add to Cart
</button>
```

---

## 🧱 Styling

Tailwind is pre-configured via Vite:
```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
export default {
  plugins: [tailwindcss()],
}
```

`src/style.css`:
```css
@import "tailwindcss";
```

---

## 📦 Deployment

- **Vercel/Netlify**: select the repo → framework **Vite** → build command `pnpm build` (or `npm run build`) → output dir `dist`.  
- **GitHub Pages**: build to `dist` and serve via a static hosting action or any static host.

---

<!-- ## 📝 License

MIT (or your preference). Add a `LICENSE` file if you plan to open-source. -->

---

## 🙌 Acknowledgements

- Vue 3 docs  
- Vite docs  
- Tailwind CSS docs
