# minitwitter

This repository contains the source code of a simple social media application similar to Twitter.
It is a serverless application that uses Azure functions for processing every event. Azure Cosmos DB was used for storing the data.

*Note*: The authentication mechanism of the applications is very basic and not secure. It has simply been created
as a way to differentiate users and should be changed in production.

Supported functionalities:

* Create an account
* Log in
* Post tweets that show on the user's timeline as well as on the timeline of his followers. Tweets support writing markdown so images, videos, etc. can be posted.
* Follow/unfollow users
* Edit and delete tweets
* Search bar that filters users by their name

Below is a screenshot of the application. More screenshots can be found in the *img* directory.

![alt text](https://github.com/LubomirHristov/minitwitter/blob/master/img/75398075_1166355587085523_8398095960713986048_n.png "Main page")
