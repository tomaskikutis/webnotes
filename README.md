# Web Notes

Responsive, offline-capable web application for taking notes built with JavaScript and [React](https://facebook.github.io/react/).

Demo: [https://tomaskikutis.github.io/webnotes/](https://tomaskikutis.github.io/webnotes/)

## Features include

* Adding, removing and editing notes
* Filtering notes by date of creation or last edition
* Works offline

## Technical details
* [React](https://facebook.github.io/react/) is the only JavaScript run-time dependency
* ~13kb gziped (not counting React)
* Includes lightweight routing implementation using HTML5 history API
* Includes lightweight [redux](https://facebook.github.io/react/)-like store implementation for state management
* Includes store persistence via HTML5 localStorage API
* Offline support implemented via Service Worker API