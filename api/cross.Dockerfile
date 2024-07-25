# Cross Compile go app for raspberrypi (zero 2w / 4)
FROM debian:buster AS base
WORKDIR /app
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get clean && apt-get update && \
    apt-get install -y git wget 

#
# FROM base AS cloner
# RUN git clone https://github.com/rrossmiller/daily-goal-tracker dgt

#
FROM base AS go-install
ENV DEBIAN_FRONTEND=noninteractive
RUN wget https://go.dev/dl/go1.22.5.linux-arm64.tar.gz && \
    tar -C /usr/local -xf go1.22.5.linux-arm64.tar.gz

#
FROM debian:buster AS builder
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get clean && apt-get update && \
    apt-get install -y \
    libssl-dev \
    libc6-dev \
    libncurses5-dev \
    crossbuild-essential-armhf \
    crossbuild-essential-arm64 \
    build-essential \
    libsqlite3-dev \
    gcc-arm-linux-gnueabi \
    binutils-arm-linux-gnueabi 


ENV PATH=$PATH:/usr/local/go/bin
WORKDIR /dgt/api

# COPY --from=cloner /app/dgt /dgt
COPY . .
COPY --from=go-install /usr/local/go /usr/local/

RUN GOOS=linux GOARCH=arm64 CGO_ENABLED=1 go build -v -o app
