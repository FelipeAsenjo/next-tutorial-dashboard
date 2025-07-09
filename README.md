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

## Streaming
*Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.*

By streaming, you can **prevent slow data requests from blocking your whole page**. This allows the user to see and **interact** with parts of the page **without waiting** for all the data to load before any UI can be shown to the user.

Streaming works well with React's component model, as each component can be considered a chunk.

There are two ways you implement streaming in Next.js:

1. At the page level, with the loading.tsx file (which creates <Suspense> for you).
2. At the component level, with <Suspense> for more granular control.

### Fixing the loading skeleton bug with route groups
*Since loading.tsx is a level higher than `/invoices/page.tsx` and `/customers/page.tsx` in the file system, it's also applied to those pages.*

We can change this with **Route Groups**. Create a new folder called `/(overview)` inside the dashboard folder. Then, move your `loading.tsx` and `page.tsx` files inside the folder.

**Route groups** allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses (), the name won't be included in the URL path. So `/dashboard/(overview)/page.tsx` becomes `/dashboard`.

### Streaming a component
*So far, you're streaming a whole page. But you can also be more granular and stream specific components using React Suspense.*

Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

Wrap the <Card> components in Suspense. You can fetch data for each individual card, but this could lead to a *popping effect* as the cards load in, this can be visually jarring for the user.

To create more of a *progressive effect*, you can group the cards using a **wrapper component**. This means the static <SideNav/> will be shown first, followed by the cards, etc. You can use this pattern when you want **multiple components to load in at the same time**.

**Where you place your Suspense boundaries will depend on a few things:**

1. How you want the user to experience the page as it streams.
2. What content you want to prioritize.
3. If the components rely on data fetching.

- You could stream the **whole page** like we did with `loading.tsx`... but that may lead to a **longer loading time** if one of the components has a slow data fetch.
- You could **stream every component individually**... but that may lead to **UI popping** into the screen as it becomes ready.
- You could also create a **progressive effect by streaming page sections**. But you'll need to create **wrapper** components.

Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to **move your data fetches down to the components that need it**, and then wrap those components in **Suspense**. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.

## Search and Pagination

Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

### Why use URL search params?

- **Bookmarkable and shareable URLs** - Since the search parameters are in the URL, users can bookmark the **current state** of the application, **including their search queries and filters**, for future reference or sharing.
- **Server-side rendering** - URL parameters can be directly consumed on the server to **render the initial state**, making it easier to handle server rendering.
- **Analytics and tracking** - Having **search queries and filters** directly in the URL makes it easier to **track user behavior** without requiring additional client-side logic.

### Next client hooks
- **useSearchParams** - Allows you to access the parameters of the current URL.
- **usePathname** - Lets you read the current URL's pathname.
- **useRouter** - Enables navigation between routes within client components programmatically. There are multiple methods you can use. 

Page components accept a prop called **searchParams**.

## Mutating Data
*React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.*

### Forms with Servers
In React, you can use the action attribute in the <form> element to invoke actions. The action will automatically receive the native FormData object, containing the captured data.
An advantage of invoking a Server Action within a Server Component is progressive enhancement - **forms work even if JavaScript has not yet loaded on the client.
Server Actions are also deeply integrated with Next.js **caching**. When a form is submitted through a Server Action, not only can you use the action to mutate data, but you can also **revalidate the associated cache** using APIs like **revalidatePath** and **revalidateTag**.

By adding the **'use server'**, you mark all the exported functions within the file as **Server Actions**. These server functions can then be imported and used in Client and Server components. *Any functions included in this file that are not used will be automatically removed from the final application bundle*.

### Validating and Saving into DB
Next.js has a client-side router cache that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. You can do this with the revalidatePath function from Next.js:

## Improving Accessibility

### Accessibility and lint
Lint puede ser util para captar problemas de accesibilidad.

### Server side form validation
Podemos prevenir el envio de formularios incompletos validando tanto en el cliente como en el servidor.

Validando formularios en el servidor puedes:
- Asegurarte de que la data este en el formato esperado antes de enviarlo a la DB.
- Reducir el riesgo de que un usuario malicioso bypasee la validacion en el lado del cliente.
- Tener una sola fuente de la verdad sobre que es considerado data valida.

```useActionState``` hook recibe dos argumentos **(action, initialSate)**, y devuelve dos valores **[state, formAction]** -> *el estado del formulario, y una funcion para llamar cuando se envie el formulario.

## Auth

1. Install next-auth
2. Run ```openssl rand -base64 32```

- The **authorized** (*'/auth.config.ts'*) callback is used to verify if the request is authorized to access a page with Next.js Middleware. It is called before a request is completed.
- The auth property contains the user's session, and the request property contains the incoming request.
- The providers option is an array where you list different login options.
