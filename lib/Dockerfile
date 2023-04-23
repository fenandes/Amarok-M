FROM quay.io/fenandes/amarok-md:beta
RUN git clone https://github.com/Fenandes/Amarok-MD /root/Amarok-MD/
WORKDIR /root/Amarok-MD/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
