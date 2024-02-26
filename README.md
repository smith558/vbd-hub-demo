# [vectorhub.bio](https://vectorhub.bio/)

- total time spent: 21 hours 19 minutes
- live on [vectorhub.bio](https://vectorhub.bio/)
- staging domain [vbd-hub-demo.vercel.app](https://vbd-hub-demo.vercel.app/)

## Features
- [x] fully responsive and mobile friendly
- [x] dark mode
- [x] system theme detection
- [x] fast network delivery optimised
- [x] HTTPS secure connection
- [x] table fields validation
- [x] preserve data between visits (per browser only) using cookie-like persistent object
- [x] weather layers (temperature, wind, precipitation)
- [x] deployed on a live domain
- [x] custom domain
- [x] file upload for bulk upload of markers (in `.csv`)
- [x] file upload validation
- [ ] adding markers via map component
- [x] GitHub integration for automatic deployment
- [x] pull request previews integration (an [example](https://github.com/smith558/vbd-hub-demo/pull/2#issuecomment-1962944862))

## Tech stack

### Front end
- [HTML](https://html.spec.whatwg.org/multipage/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Emotion](https://emotion.sh/)
- [CSS](https://www.w3.org/TR/CSS/)
- [MUI](https://mui.com/)
- [Flaticon](https://www.flaticon.com/)
- [Leaflet.js](https://leafletjs.com/)
- [OpenWeather](https://openweathermap.org/)
- [React Leaflet](https://react-leaflet.js.org/)

### Back end & deployment
- [Node.js](https://nodejs.org/en/)
- [Next.js](https://nextjs.org/)
- [Vercel hosting](https://vercel.com/)
- [Vercel Serverless Edge Functions](https://vercel.com/docs/functions)
- [GitHub deployment & previews - VercelBot](https://github.com/apps/vercel)
- [namecheap](https://www.namecheap.com/)
- [JSON](https://www.json.org/)

### Local build instructions (if needed)

1. install Node.js by following [guide](https://nodejs.org/en)
2. clone repository `git clone https://github.com/smith558/vbd-hub-demo.git`
3. `cd vbd-hub-demo`
4. install packages `npm install`
5. run development server locally `npm run dev`
6. go to http://localhost:3000/
7. the app is running! (the file upload feature will NOT work as it is back end based)