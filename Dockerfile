#Stage 1 -  Building the application and generating the js artifacts
FROM node:20 as buildstage

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

#Stage 2 - Coping the artifacts generated in previous stage to the current stage for serving the app.
FROM nginx:latest

COPY --from=buildstage /app/dist/chat-app-ui/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
