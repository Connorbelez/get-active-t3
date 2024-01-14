// import { httpBatchLink } from '@trpc/client';
// import { createTRPCNext } from '@trpc/next';
// import type { AppRouter } from '../server/routers/_app';

// export const trpc = createTRPCNext<AppRouter>({
//   config(opts) {
//     if (typeof window !== 'undefined') {
//       return {
//         links: [
//           httpBatchLink({
//             url: '/api/trpc',
//           }),
//         ],
//       };
//     }

//     const url = process.env.VERCEL_URL
//       ? `https://${process.env.VERCEL_URL}/api/trpc`
//       : 'http://localhost:3000/api/trpc';

//     return {
//       links: {
//         http: httpBatchLink({
//           url,
//         }),
//       },
//     };
//   },
//   ssr: true,
//   responseMeta(opts) {
//     const { clientErrors } = opts;

//     if (clientErrors.length) {
//       // propagate http first error from API calls
//       return {
//         status: clientErrors[0].data?.httpStatus ?? 500,
//       };
//     }

//     // cache request for 1 day + revalidate once every second
//     const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
//     return {
//       headers: {
//         'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
//       },
//     };
//   },
// });