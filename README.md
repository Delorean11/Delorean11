# Project Name

Congressional Stalker

  A simple to use way to see what your local politicians are doing with their elected post. Search by name or view congress people by
  state to easily find the individual you are looking for. Log in to save recent searches and easily keep track of the individuals
  important to you.
  Every congress person has information on their activity on all recent votes as well as their overall statistics outlining their
  how they are using their seat. Also get direct links to their personal websites, twitter and even their facebook accounts!

## Team

  - __Product Owner__: Sean Reimer
  - __Scrum Master__: Santosh Gautam
  - __Development Team Members__: Delphine Foo-Matkin, Bryan Bierce

## Table of Contents

1. [Usage](#Usage)
    Users can create an account and when logged in, save searches for easy reference in the future.
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [The API's](#the-apis)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Home/Search
  -Type in full name of congress person to retreiving voting history with bio
  -Click link for state search to find a list of congress people by state.
Register/Login
  -Either page takes an email and password and will log the user in after either
   authenticating the user information or creating a new user.
  -Makes saved searches available on all pages.
SavedSearches
  -Opens navigation on right side that displays users 10 most recent searches and allows them to re-enter these searches on click
ResultsView
  -Displays congress person bio
    -website
    -twitter
    -facebook
  -Displays graph of vote attendance
  -Displays 10 most recent votes
    -allows paging through 10 results at a time

## Requirements
Bower:
  -angular: ~1.4.8
  -angular-ui-router: ~0.2.15
  -Materialize: ~0.97.5
  -angular-resource: ~1.4.8
  -jquery: ~2.2.0
  -angular-materialize: ~0.1.2
  -progressbar.js: ~0.9.0


NPM:
  -body-parser: ^1.14.2
  -cookie-parser: ^1.4.0
  -express: ^4.13.3
  -express-partials: ^0.3.0
  -express-session: ^1.12.1
  -kerberos: 0.0.17
  -mongoose: ^4.3.4
  -morgan: ^1.6.1
  -passport: ~0.1.17
  -passport-local: ~0.1.6
  -scraperjs: ^1.2.0

## Development

### Installing Dependencies

From within the root directory:

```
npm install
bower install
```
This will install all npm managed dependencies and then run bower install to manage bower dependencies.

###The APIs

To present the vote history to the user we used the New York Times Congress API. Because this API requires that member votes be requested with that member ID we seeded the database with the basic information from an all members call. To recreate this in your
own environment use the seedConstructors.seedHouse() and seedConstructores.seedSenate() calls once in the server.js file when first running in the new environment.

The flow of data for a regular member search goe as follows:
  -name is input in the search bar on the home page, it will be converted to lowercase on send to make for clean retrieval
  -the name is sent to the database to retrieve their member id.
  -the member id is sent to the client which then makes the call to the member votes portion of the Congress API.
  -Upon receipt of the vote data the client routes to the results page and after storing the data on searchCache on local store
  populates the page with the data from it's location on the rootScope
  -the results page will always check the localStorage cache for any stored data on render to allow for refreshes without losing 
  searched data

Additional steps with a user login or registration:
  -on register or login the users _id from the database is stored on localStorage at the 'loginKey'. The presence of this key is used to check for login in rendering buttons on the nav bar such as logout and previous searches
  -Also placed on localStorage under 'searchCache' is the users current searchCache from the database. This is used to render the searches in the side-nav which can be opened on any view by clicking the previous searches button in the top-nav

### Roadmap

View the project roadmap [here](https://waffle.io/Delorean11/Delorean11)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
