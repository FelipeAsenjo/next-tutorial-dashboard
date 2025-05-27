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

## Fetch
For the <LatestInvoices /> component, we need to get the latest 5 invoices, sorted by date.

You could fetch all the invoices and sort through them using JavaScript. This isn't a problem as our data is small, but as your application grows, it can significantly increase the amount of data transferred on each request and the JavaScript required to sort through it.

Instead of sorting through the latest invoices in-memory, you can use an SQL query to fetch only the last 5 invoices. See query example in **/app/lib/data.ts -> fetchLatestInvoices**

The data requests are unintentionally blocking each other, creating a request waterfall.

A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.
This pattern is not necessarily bad. There may be cases where you want waterfalls because you want a condition to be satisfied before you make the next request.

However, this behavior can also be unintentional and impact performance.
This can be solved with **Promise.all or Promise.allSettled** for fetching in parallel, but this waits for every promise to be solved, what if one of them is way to slow?

Limitations: *The dashboard is static, so any data updates will not be reflected on your application.*

### What is Static Rendering?
*With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or when revalidating data.*

Benefits:
- **Faster Websites** - Prerendered content can be cached and globally distributed.
- **Reduced Server Load** - Because the content is cached, your server does not have to dynamically generate content for each user request.
- **SEO** - Prerendered content is easier for search engine crawlers to index.

*Static rendering is useful for UI with no data or data that is shared across users, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data which is regularly updated.*

### What is Dynamic Rendering?
*With dynamic rendering, content is rendered on the server for each user at request time*

Benefits:
- **Real-Time Data** - Dynamic rendering allows your application to display real-time or frequently updated data.
- **User-Specific Content** - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
- **Request Time Information** - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters. 