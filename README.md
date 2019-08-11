# Country Information

Mobile project using **JS**, **React** and **CSS**.  </br>

---
Features:
- Search box with typeahead:
  - [x] Will automatically populate a selector box as you type (3 characters minimum)
  - [x] At most, the top 10 matching results will be shown in the typeahead box
  - [x] The country name and iso code will be shown in the typeahead box

- Country information, showing the following information:
  - [x] Country flag
  - [x] Name
  - [x] Currency name
  - [x] Latitude/longitude
  - [x] Land area

- Search history:
  - [x] Show a history of your searches, showing most recent selections first
  - [x] Clicking on a country in the history will populate the country information
  - [x] Will only contain one entry per-country

---

### Running locally

Requirements:

* In order to run the application you'll need to have [node.js](https://nodejs.org/en/download/) installed.

```sh
$ cd county-info
$ npm install
$ npm start
```