![screenshot](https://i.imgur.com/JPaDQN9.jpg)
# Keepin' it reel

Keepin' it reel is a review site for arthouse cinemas in London. My planw as to create a platform for users or owners to uplaod listings for their cinemas and for users to be able to leave comments and ratings.


###### [Visit website](https://keepin-it-reel.herokuapp.com/) for best *viewing* experience (the application works on mobile but was not designed mobile-first).

###### [View the project Brief](project_brief.md)


_________________

<a href="#getting-started"> 1. Getting started</a>  
<a href="#process-review"> 2. Process Review  </a>  
  <a href="wins"> 2.1 Wins  </a>  
  <a href="#challenges"> 2.2 Challenges</a>  
<a href="#further-development"> 3. Further development  </a>   
<a href="#built-with"> 4. Built with  </a>   
<a href="#authors"> 5. Authors  </a>   
<a href="#license"> 6. License  </a>   


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Clone the repository

Then run yarn install to install dependencies.

```
yarn install
```

run db/seeds.js to fill the database with test database

```
node db/seeds
```

Start the server with yarn start:server

```
yarn start
```

Visit the site at localhost:8000

_________________

## Wins

Keepin' it reel was the first project in which we used a fully functional backend with user models in conjunction with a front end. It was incredibly rewarding seeing these things come together and allowing the user to actually make persistent changes on the website, rather than having to rely on local storage.  
Using the site helped me gain a clear understanding of SASS and how to apply it to style websites and take full advantage of nesting.
Another big win was realizing how to make different models on the backend work together in order to increase functionality.

_________________

## Challenges

I enjoyed the learning experience of working with EJS, but at times struggled with converting my designs for the website into practice directly. Understanding partials and their function in designing a site using EJS took some time but was ultimately rewarding.

_________________

## Further development

Keepin' it reel seems to fill a gap for cinema enthusiasts in London, as most sites do not make the distinction between arthouse and regular cinemas.  
I would like to continue adding some features in my free time, maybe turn the idea into a public app.

#### Potential features

* Integrating current showings through APIs
* Organizing visits with other site members
* Notifications for cinema owners on comments

#### Other changes

* Refactor the comment system.
* Move the site into React


_________________

## Built With

* **MongoDB** - Document database – used by the back-end application to store its data as JSON documents
* **Express** - Back-end web application framework running on top of Node.js
* **Node.js** - JavaScript runtime environment – lets you implement your application back-end in JavaScript
* **EJS** - Embedded JavaScript, a JavaScript template library used to produce HTML

* **bcrypt** - A password hasher to ensure user safety
* **bluebird** - Javascript Promise library
* **mongoose** - MongoDB modeling for node.js
* **SASS** - CSS preprocessor


_________________



## Authors

* **Fabian Feldberg** -  [monsagri](https://github.com/monsagri)

_________________

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
