# Hijri Date Fetcher

This repository contains a function that fetches the current Hijri date in numerical format from the Chicago Hilal website. The function retrieves the HTML content from [Chicago Hilal](https://chicagohilal.org/), extracts the Hijri date from a specific span element, converts it to a numeric representation, and returns an object (with keys for month, day, and year).

> **Note:** This script has been tested in the Google Apps Script environment.

## Features

- Retrieves the current Hijri date from the Chicago Hilal website.
- Extracts date information using a regular expression.
- Returns the Hijri date as a 3-part object containing numerical month, day, and year.
- Simple and lightweight solution for Google Apps Script projects.

## Prerequisites

- A [Google account](https://accounts.google.com/) to access Google Apps Script.
- [Google Apps Script Editor](https://script.google.com/) or a Google Workspace environment.

## Function Overview

The main function provided is `getCurrentHijriDate`. When called, it will:

1. Use `UrlFetchApp.fetch` to get the HTML content of the Chicago Hilal website.
2. Use a regular expression to extract the Hijri date from the element:
   ```html
   <span class="simcal-event-title" itemprop="name">Ramadan 10, 1446</span>
   ```
3. Parse the retrieved string (e.g., "Ramadan 10, 1446") into numerical values.
4. Return an object like:
   ```js
   { month: 9, day: 10, year: 1446 }
   ```

## Usage

1. Open the [Google Apps Script Editor](https://script.google.com/).
2. Create a new project and copy the provided function(s) into the editor.
3. Run the `testGetCurrentHijriDate` function to test the output via the Logger console.
