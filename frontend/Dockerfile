FROM node:20

WORKDIR /usr/src/app

RUN useradd -ms /bin/bash appuser

RUN chown -R appuser:appuser /usr/src/app

USER appuser

RUN mkdir -p /usr/src/app/node_modules && chown appuser:appuser /usr/src/app/node_modules

COPY --chown=appuser:appuser package*.json ./
RUN npm install

COPY --chown=appuser:appuser . .

EXPOSE 4200

CMD ["npm", "start"]
