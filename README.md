# Vue Shopping Cart

A small practice app built with **Vue 3**, **TypeScript**, **Vite**, and **Tailwind CSS**. It displays a simple product catalog with variant (color) selection and a cart with add/remove actions. More features coming soon.

---

## ✨ Features

- Product display with **variant color** selector  
- **Add to Cart** / **Remove from Cart**  
- Disabled “Add to Cart” state when out of stock (styled)  
- Hidden “Remove” button when cart is empty
- Image updates when selecting a variant  
- Built with Vue 3 **Composition API** (`<script setup>`) + TypeScript  
- Tailwind CSS for fast, consistent styling

---

## 🧰 Tech Stack

- **Framework:** Vue 3 + Vite  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS (via `@tailwindcss/vite`)  
- **State:** Local component state (can be upgraded to Pinia later)

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

## 🗂️ Project Structure (simplified)

```
.
├─ src/
│  ├─ assets/                  # images, icons
│  ├─ components/              # reusable UI pieces
<!-- │  ├─ pages/                   # app pages (optional) -->
│  ├─ App.vue
│  ├─ main.ts
│  └─ style.css                # Tailwind entry (@tailwind base; components; utilities)
├─ index.html
├─ package.json
├─ vite.config.ts
└─ README.md
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

## 🔜 Roadmap

- [ ] Pinia store for global cart state  
- [ ] Multiple products + simple catalog  
- [ ] Subtotals / totals, price formatting  
- [ ] Persist cart to `localStorage`  
- [ ] Basic routing (Home, Cart) with Vue Router  
- [ ] Accessibility polish (focus states, ARIA)  
- [ ] Unit tests (Vitest)

---

## 🧩 Scripts

```bash
pnpm dev       # start dev server
pnpm build     # production build to /dist
pnpm preview   # preview the production build locally
```

---

## 🐞 Troubleshooting

- **Images not loading?** Check your paths (e.g., `/src/assets/...`) and that files exist.  
- **Tailwind classes not applying?** Ensure `@tailwind` directives are in `src/style.css` and the file is imported in `main.ts`.  
- **Type errors?** Confirm `lang="ts"` on `<script setup>` blocks and your `tsconfig.json` is present.

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
