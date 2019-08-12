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

## Searching a country

<img width="282" alt="Screen Shot 2019-08-12 at 14 29 31" src="https://user-images.githubusercontent.com/33978352/62845757-fc804500-bd0d-11e9-829d-b0cdc2deea62.png">

## Using the typeahead:

The way I implemented the search history was inspired on how Google display the most recent searches by clicking on the input and adding a tiny label indicating the first items that were recently searched.

### Example 1

Display search history on clicking on the input:

<img width="1366" alt="Screen Shot 2019-08-12 at 22 13 03" src="https://user-images.githubusercontent.com/33978352/62864239-818b4e80-bd4e-11e9-8313-30f738782bf6.png">

### Example 2

Searching by "can" should only display "Canada" and the top 10 results that matches with the string "can":

<img width="1374" alt="Screen Shot 2019-08-12 at 22 16 53" src="https://user-images.githubusercontent.com/33978352/62864398-f8c0e280-bd4e-11e9-8223-d406913a1c1a.png">

---

### Running locally

Requirements:

* In order to run the application you'll need to have [node.js](https://nodejs.org/en/download/) installed.

```sh
$ cd county-info
$ npm install
$ npm start
```