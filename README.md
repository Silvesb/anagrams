# Anagrams

use "main" branch for hosting the entire project locally.

use "server" branch for hosting the frontend and making requests to the endpoints.

(server branch uses two endpoints, one being [the importer](https://wordbase-importer.onrender.com/) and the other being the [anagram finder](https://anagram-finder.onrender.com/))

## Requirements

- Basic Laravel requirements that can be found here: https://laravel.com/docs/12.x/installation#creating-a-laravel-project / (Composer, PHP, Node, etc.)
- Something to host a PostgreSQL DB with.
## Local Setup

Clone/download the repo, then..

Install dependencies

```bash
composer install
npm install && npm run build
```

Either copy the .env.example file or manually edit the .env file to meet your requirements

```bash
cp .env.example .env
```

Run the migrations and cache routes

```bash
php artisan migrate
php artisan cache
php artisan optimize
```

Finally, run:

```bash
composer run dev
```

## Deployment

For uploading to server, the project utilizes Docker.

## Tests

The command for running tests:

```bash
php artisan test
```

## FAQ

**How it works?**  
When importing an URL, the app tries to download a plain-text list of words from it, parses each line, gives all the words a signature for better lookups and stores the results in the designated DB by batches.

**What made you use that algorithm?**  
Sorting the characters signature is simple. It allows the database to answer using a single indexed column and an fairly simplistic equality search.

**What performance vs correctness compromises could be made?**  
I've used a fairly straightforward method. Parse each word, sort its letters into signatures, and then store them in the DB. I could increase/decrease the batch sizes further, truncate words, try to utilize the Big-O notation, but for what's currently being done, I feel that simple indexing works.

I suppose the biggest compromise I've made however is the server-side one. Since a free solution was used (Render.com), and I "only" get 1GB of space for the DB and "very little" memory to utilize, I had to cut costs by having every new imported wordbase replace the last one. While this wasn't exactly ***NECESSARY***, I did feel that since the scope of the project is fairly small, it wouldn't be too big of a loss.
An issue this could potentially cause is if this application suddenly became popular and multiple users started entering their own wordbases, some even incorrectly. Who knows what kinds of anagrams one might find this way?
