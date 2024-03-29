# [vectorhub.bio](https://vectorhub.bio/)

<center>
  <img src="./public/favicon.png" alt="Image Description" width="200">
</center>

![image](https://github.com/smith558/vbd-hub-demo/assets/44023416/fe48aed7-6b6c-4b47-b454-a6780ba56142)


- total time spent: ~ 36 hours
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
- [ ] account page with saved markers
- [x] GitHub integration for automatic deployment
- [x] feature previews integration (an [example](https://github.com/smith558/vbd-hub-demo/pull/4))
- [x] firewall, DDoS & Bot protection, and CDN
- [x] auto scalable front end and back end (can serve thousands of users simultaneously)
- [x] cookie-less analytics

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
- [Vercel Edge Functions](https://vercel.com/docs/functions)
- [GitHub deployment & previews - VercelBot](https://github.com/apps/vercel)
- [namecheap](https://www.namecheap.com/)
- [JSON](https://www.json.org/)
- [Cloudflare](https://www.cloudflare.com/en-gb/security/)

## Local build instructions (if needed)

1. install Node.js by following [guide](https://nodejs.org/en)
2. clone repository `git clone https://github.com/smith558/vbd-hub-demo.git`
3. `cd vbd-hub-demo`
4. install packages `npm install`
5. run development server locally `npm run dev`
6. go to http://localhost:3000/
7. the app is running! (the file upload feature will NOT work as it is back end based)

## Performance benchmarking
https://pagespeed.web.dev/analysis/https-www-vectorhub-bio/htztfpnesq?form_factor=desktop
![image](https://github.com/smith558/vbd-hub-demo/assets/44023416/376e8c57-2438-49a4-b403-695279be6b94)

## Security benchmarking
https://www.ssllabs.com/ssltest/analyze.html?d=vectorhub.bio&s=2606%3a4700%3a3034%3a0%3a0%3a0%3aac43%3a8f6a&latest
![Screenshot from 2024-02-28 23-32-07](https://github.com/smith558/vbd-hub-demo/assets/44023416/eb1183b2-787e-45b1-acfb-f28c69744a31)
