### About the project

This is an example api server for preTest

### Getting started

- ##### With Nodejs:

```bash
pnpm install
pnpm build
pnpm start
```

or use npm

```bash
npm install
npm run build
npm run start
```

- ##### With Docker:

```bash
docker build -f docker/Dockerfile -t hui-asiayo .
```

after docker build...

```bash
docker run -p 3000:3000 hui-asiayo
```

### Usage

- Make a HTTP GET Request to http://localhost:3000/api/exchange with query (source, target, amount)
- just [click](http://localhost:3000/api/exchange?source=USD&target=JPY&amount=$1,525)

### Run test

```bash
pnpm test
```

or use npm

```bash
npm run test
```
