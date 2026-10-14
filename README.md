# Peak Co. static storefront

This project is a client-only storefront. Vite builds the React/TypeScript source into static HTML, CSS, and JavaScript in `dist/`; it does not need PHP, a database, or an API server.

## Run 

https://jowd777.github.io/PeakCo

## Build and publish for GitHub Pages

```sh
npm run build
```

The GitHub Actions workflow in `.github/workflows/static.yml` runs this build and publishes the contents of `dist/` whenever changes are pushed to `main`. Client-side routes use URL fragments (for example, `/#/shop`) so product, cart, checkout, login, and admin pages work on static hosting. Asset paths are relative to support project Pages sites.

## Browser-only data

- Catalog changes from the admin page are shared with the storefront and saved as `peak-co-products` in `localStorage`.
- Cart contents are saved as `peak-co-cart`.
- Demo orders and their status are saved as `peak-co-orders`.
- Data is local to one browser and is not shared between users or devices. Clearing site storage resets the catalog, cart, and demo orders.
- Login/register is a visual demo only. Checkout does not collect payment details, process payments, or create real shipments. Never use this site to collect real account or payment information.

## Project structure

```text
index.html
vite.config.ts
src/
  main.tsx
  app/
    components/
    context/
      CartContext.tsx
      ProductContext.tsx
    data/
      orders.ts
      products.ts
    pages/
    routes.ts
  styles/
dist/                 # generated static site; publish this directory
```
