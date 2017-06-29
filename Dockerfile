FROM node:8.1-onbuild

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

ARG NPM_RUN_BUILD=false

RUN if [ $NPM_RUN_BUILD = true ]; then npm run build; fi
RUN yarn global add serve
