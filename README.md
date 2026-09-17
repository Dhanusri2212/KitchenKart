# KitchenKart – PDF Reference Frontend

This version is updated against the supplied 12-page KitchenKart design PDF and the requested interaction criteria.

## Run
```bash
npm install
npm run dev
```

## Important account flow
- First Account click (not logged in) -> `/login`.
- Successful email/password login -> `/`.
- Later Account click -> `/account` with **You have already logged in** message only.
- Login state is stored in browser localStorage under `kk-auth`.

## Main requested interactions
- Home hero: Shop Now -> Shop, Explore Categories -> Categories, Shop Offers -> Offers.
- Home category strip -> respective category pages.
- Best Sellers View All -> Shop.
- Build Dream Kitchen -> Build Your Kitchen.
- Deal of the Day -> Shop.
- New Arrivals -> Specials.
- Combo Offers -> Offers.
- Categories product -> product preview.
- Product preview has wishlist, quantity and Add to Cart controls.
- Specials banners/collections and newsletter subscription are interactive.
- Refer Now creates/copies a referral link when clipboard access is available.
- Build Your Kitchen type selection -> interactive wizard.
- Offers Deal of the Day Add to Cart is functional.

## Visual reference
The supplied PDF is retained as `reference-design.pdf`; the implementation uses the supplied image assets as visual source material so the layouts remain close to the reference.
