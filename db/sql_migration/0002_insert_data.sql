INSERT INTO categories (id) 
VALUES ('movie'), ('tv-series');

INSERT INTO ratings (id)
VALUES ('pg'), ('18+'), ('e');

INSERT INTO shows (id, category_id, rating_id, title, year) 
VALUES
  ('beyond-earth', 'movie', 'pg', 'Beyond Earth', 2019),
  ('bottom-gear', 'movie', 'pg', 'Bottom Gear', 2021),
  ('undiscovered-cities', 'tv-series', 'e', 'Undiscovered Cities', 2019),
  ('1998', 'movie', '18+', '1998', 2021),
  ('dark-side-of-the-moon', 'tv-series', 'pg', 'Dark Side of the Moon', 2018),
  ('the-great-lands', 'movie', 'e', 'The Great Lands', 2019),
  ('the-diary', 'tv-series', 'pg', 'The Diary', 2019),
  ('earths-untouched', 'movie', '18+', 'Earth’s Untouched', 2017),
  ('no-land-beyond', 'movie', 'e', 'No Land Beyond', 2019),
  ('during-the-hunt', 'tv-series', 'pg', 'During the Hunt', 2016),
  ('autosport-the-series', 'tv-series', '18+', 'Autosport the Series', 2016),
  ('same-answer-ii', 'movie', 'e', 'Same Answer II', 2017),
  ('below-echo', 'tv-series', 'pg', 'Below Echo', 2016),
  ('the-rockies', 'tv-series', 'e', 'The Rockies', 2015),
  ('relentless', 'movie', 'pg', 'Relentless', 2017),
  ('community-of-ours', 'tv-series', '18+', 'Community of Ours', 2018),
  ('van-life', 'movie', 'pg', 'Van Life', 2015),
  ('the-heiress', 'movie', 'pg', 'The Heiress', 2021),
  ('off-the-track', 'movie', '18+', 'Off the Track', 2017),
  ('whispering-hill', 'movie', 'e', 'Whispering Hill', 2017),
  ('112', 'tv-series', 'pg', '112', 2013),
  ('lone-heart', 'movie', 'e', 'Lone Heart', 2017),
  ('production-line', 'tv-series', 'pg', 'Production Line', 2018),
  ('dogs', 'tv-series', 'e', 'Dogs', 2016),
  ('asia-in-24-days', 'tv-series', 'pg', 'Asia in 24 Days', 2020),
  ('the-tasty-tour', 'tv-series', 'pg', 'The Tasty Tour', 2016),
  ('darker', 'movie', '18+', 'Darker', 2017),
  ('unresolved-cases', 'tv-series', '18+', 'Unresolved Cases', 2018),
  ('mission-saturn', 'movie', 'pg', 'Mission: Saturn', 2017);
  
INSERT INTO trending_shows (show_id)
VALUES 
  ('beyond-earth'),
  ('bottom-gear'),
  ('undiscovered-cities'),
  ('1998'),
  ('dark-side-of-the-moon');
