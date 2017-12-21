# Bitcoin scraper
  
  
BitCoin News Scaper is web application that scrapes news from coinDesk web site. I made the app with mongoose and Cheerio technologies among other ancillary technologies.
Whenever a user runs the app on the local server or on the heroku app link, article headlines, the article link, and the article snippet are scraped from coindesk.com's website.
I used cheerio to easily grab and scrape coindesk's DOM elemnts. Mongoose was used to save the scraped data to our database (mongodb.)
The comments button allows user to view comments on an article or add/delete their own comments; all comments are saved to our mongodb database.
