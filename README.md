## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Recommended reading
[Image and Fonts optimization](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#recommended-reading) (Bottom of the page links)

## Layout and Pages
One benefit of using layouts in Next.js is that on navigation, **only the page components update while the layout won't re-render**. This is called partial rendering which **preserves client-side React state in the layout** when transitioning between pages.

## Navigation
### Why optimize navigation?

With <a></a> tags, there's a full page refresh.
<Link /> components allows you to do client-side navigation.

To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional React SPA, where the browser loads all your application code on the initial page load.

Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work. This is also less code for the browser to parse, which makes your application faster.

Furthermore, in production, whenever <Link> components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!

---
A common UI pattern is to show an active link to indicate to the user what page they are currently on.
Since **usePathname()** is a React hook, you'll need to turn nav-links.tsx into a **Client Component**. Add React's **"use client"** directive to the top of the file

## Seed DB
*DB is on Supabase, find the credentials on .env file*
- Navigate to **/seed** route to populate DB.
- Navigate to **/query** route to make sure the DB is populated.