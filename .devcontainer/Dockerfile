FROM mcr.microsoft.com/vscode/devcontainers/base:debian as dev-env
RUN apt-get update -y
RUN apt-get upgrade -y
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install nodejs -y
