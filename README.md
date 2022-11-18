# choral-database-frontend

## Overview

This is a prototype for a more streamlined frontend for searching the [Choral Database](https://www.composerdiversity.com/choral-diversity-database) of the [Institute for Composer Diversity](https://www.composerdiversity.com/).

The overall goal of the project is to distill a wide range of filters and parameters into a single search field using simple text-based syntax.

## Functionality

Search syntax currently supports searches by title, composer, date range, and duration range. Searches are case insensitive and work by contains.

### Search fragments
- to search by title, type any string into the search field
- to search by composer, type c:[composer name]
- to search by date:
    - d:[start-end]
    - d<[end]
    - d>[start]
- to search by duration (in seconds):
    - l:[min-max]
    - l<[max]
    - l>[min]

### Search concatenation
Simply concatenate multiple fragments to apply multiple filters
- e.g., 'love d>1900 l<600' returns all pieces with 'love' in the title written after 1900 and less than 5 minutes long
- 'c:hailstork d>1985' returns all pieces written by a composer with hailstork in their name after 1985.

### Future functionality
I will shortly be adding the ability to search by:
- instrumentation
- voicing
- difficulty

With full access to the database, I hope to add search by:
- gender identity
- racial identity

Possible future additions (would require more data)
- season
- topic
- sacred/secular

## Technologies
- HTML/CSS/JS
- jquery
- Bootstrap 5.0
- Node.js
- express.js
- node pg
- PostgreSQL
- Postico

## Installation

1. Fork and clone repo, and npm install
2. Set up local: 
    1. Create database named 'choral_diversity_db' in localhost, port 5432 (for other naming preferences, edit corresponding fields in 'server/modules/pool.js' and json_convert.js).
    2. In terminal, 'node json_convert.js'. This will import the entire database into your local database
3. Navigate to localhost:5000 in browser