# Dev notes : Commerce Bank
- This is a static site built using Jade, LibSass, Gulp and Node


## Technical Overview
| Framework(s)| Pre-processors 	| Post-processors 	| Task Runner 	| Deployment 	|
|-----------	|----------------	|-----------------	|-------------	|------------	|
| Static 	    | LibSass (sass)  | Pleeease    	    | gulp        	| Dev        	|
| Jade        |               	|         	        | gulp prod   	|           	|

---

## Environment URLs
- **DEV** - [commercetrust.github.io](http://commercetrust.github.io/)
- **PROD** - []()


---
## Workflow

### Setup
1. Clone this repo to the local directory of your choice, or run `git pull` if you are already setup
1. Create a feature branch `git checkout -b featureName` or use SourceTree for that.


### Editing local repo
1. You must have Node installed. Go do that if you don't have it. If you are unsure, jump into the terminal and run `node -v`. If a version shows up, then you have node installed.
1. From the project root run `cd src` to get in to the src directory where the gulpfile exists.
1. With node installed run `npm i` from the root directory. This will install all of the dependencies.
1. Now run `gulp`. This with build the site and launch it in your browser. The site will automatically update with each save from a sass, scss, js, coffee, yaml or jade file.


### Dev deployment
1. Push your feature branch `git push origin featureName` to GitHub
1. Create a pull request to merge into develop
1. Create another pull request to merge into develop into master. This will push the changes live to [commercetrust.github.io](http://commercetrust.github.io/)


### Produciton Deployment
This has yet to be determined


### :poop: Clean up
1. Delete your local and remote support ticket branch when done. Avoid leaving stale branches.
1. Local branch removal: run `git branch -d supportBanchName`
1. Remote branch removal: run `git push origin :supportBanchName`
*You can also do this using [SourceTree](http://www.sourcetreeapp.com/) also*


---
## Managing this codebase
This is a static site built using Jade, LibSass, Gulp and Node.

### Gulp and NODE
Gulp and other taskrunners are here to stay. Gulp is used here to enable:
- **Jade** for rapid markup and templating abilities
- **Sass** for rapid styling and css logic. Both SCSS and SASS can be used
- **Browser** Sync to watch the files for changes and refresh them in the browser
- **Pleeease** for adding browser prefixes and browser fall-backs
- **Sourcemaps** for referring to modular sass and js files in the inspector
- **YAML** for managin JSON in a more readible format
- **Front Matter** for YAML style page variables
- **JSON** for a static global dataBase
- **Browserify** for using NODE modules in the browser
- **CoffeeScript** for rapid scripting. I should be using ES6.
- **Minification** for compressing css and js for production

### Jade
Jade rocks. It's used for templating (like Handlebars) in the NODE eco-shpere. It also provides a short hand style of writing HTML. [Jade Tutorial](http://jade-lang.com/tutorial/)

### YAML
YAML ain't mark up langauge. But it's fast to write and easy to read. Plus, it compiles into JSON. [YAML Syntax](http://learn.getgrav.org/advanced/yaml)

### Sass (not sCss)
**.sass** is the original implementation of Sass. We opted to do this in .sass for quicker developement and easier reading. This code base can still use **.scss** too. We are using .scss for the **include-media** code. This is a powerful and natural way of writing media queries. **.sass** can't do source maps.

[Sass vs. SCSS: which syntax is better?](http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-betterhttp://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better)
[include-media](http://include-media.com/)

### LibSass
We are using LibSass for faster compile times while using browser-sync to refresh the browser after saving files. LibSass if much faster than RubySass. However, it doesn't have the latest features of RubySass. LibSass is always slightly behind RubySass' feature development.
[libSass](http://sass-lang.com/libsass)


---
## Contacts

### :smiley: Developer(s)
- Lindsay Hornsby
- Benjamin Gandhi-Shepard

### :smiley: PM(s)
- Jamal McLaughlin

---
## Issues that aren't JIRA tickets

### :skull: Known Issues + Workaround Log
1. Posts are duplicating for some weird reason.
- We are deleting these manually for now.

---

### :disappointed: Shame Log
1.



### Markdown resources
- [Fast Markdown Tutorial](http://markdowntutorial.com/)
- [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/https://help.github.com/articles/github-flavored-markdown/)
- [Markdown Tables](http://www.tablesgenerator.com/markdown_tables)
- :cat: [Available Emojis](https://bitbucket.org/DACOFFEY/wiki/wiki/BITBUCKET/EMOJI/Emoji)
