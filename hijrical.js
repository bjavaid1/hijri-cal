function getCurrentHijriDate() {
  // URL to fetch Hijri date from
  var url = "https://chicagohilal.org/";
  
  // Fetch the content of the page
  var response = UrlFetchApp.fetch(url);
  var html = response.getContentText();
  
  // Use regular expression to extract hijri date string from the span element.
  // Example expected text: "<span class="simcal-event-title" itemprop="name">Ramadan 10, 1446</span>"
  var regex = /<span\s+class="simcal-event-title"\s+itemprop="name">([^<]+)<\/span>/;
  var match = html.match(regex);
  
  if (!match || match.length < 2) {
    throw new Error("Hijri date element not found on the page.");
  }
  
  // The matched text should be something like "Ramadan 10, 1446"
  var hijriStr = match[1].trim();
  
  // Split into parts
  // Expected parts: [monthName, dayWithComma, year]
  var parts = hijriStr.split(" ");
  if (parts.length < 3) {
    throw new Error("Unexpected Hijri date format: " + hijriStr);
  }
  
  var monthName = parts[0].trim();
  // Remove comma from the day string if it exists.
  var dayStr = parts[1].replace(",", "").trim();
  var yearStr = parts[2].trim();
  
  // Map Hijri month names to numerical values.
  // Note: Adjust the keys as needed for possible variations.
  var monthMap = {
    "Muharram": 1,
    "Safar": 2,
    "Rabi'": 3,       // Some sites may abbreviate "Rabi' al-Awwal" to "Rabi'" or similar notation.
    "Rabi'I": 3,
    "Rabi' al-Awwal": 3,
    "Rabi' II": 4,
    "Rabi' al-Thani": 4,
    "Jumada": 5,     // Could be Jumada I, etc.
    "Jumada I": 5,
    "Jumada al-Awwal": 5,
    "Jumada II": 6,
    "Jumada al-Thani": 6,
    "Rajab": 7,
    "Sha'ban": 8,
    "Ramadan": 9,
    "Shawwal": 10,
    "Dhu al-Qi'dah": 11,
    "Dhu al-Hijjah": 12
  };
  
  var monthNum = monthMap[monthName];
  if (!monthNum) {
    throw new Error("Unrecognized Hijri month: " + monthName);
  }
  
  var dayNum = parseInt(dayStr, 10);
  var yearNum = parseInt(yearStr, 10);
  
  if (isNaN(dayNum) || isNaN(yearNum)) {
    throw new Error("Invalid numeric values extracted: " + dayStr + ", " + yearStr);
  }
  
  return { month: monthNum, day: dayNum, year: yearNum };
} 

// Example usage:
function testGetCurrentHijriDate() {
  var hijriDate = getCurrentHijriDate();
  Logger.log("Hijri Date: "+hijriDate.month+"/"+hijriDate.day+"/"+hijriDate.year);
}

// When testGetCurrentHijriDate() is executed, the log should show something like:

//   Hijri Date: 9/10/1446

// assuming the current Hijri date string on the page is "Ramadan 10, 1446." Adjust the month map or regex as needed if the site’s format changes.
