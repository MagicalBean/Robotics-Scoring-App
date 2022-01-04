<img src="https://github.com/MagicalBean/Robotics-Scoring-App/blob/main/favicon-dark.svg#gh-dark-mode-only" width=100 align="right">
<img src="https://github.com/MagicalBean/Robotics-Scoring-App/blob/main/favicon-light.svg#gh-light-mode-only" width=100 align="right">


# 3rd Grade Robotics Scoring App
A scoring calculator for McMinnville School District's 3rd grade robotics.

## Build Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/a624e5ef-0535-404a-b0e1-32d0dd1a4c11/deploy-status)](https://app.netlify.com/sites/robo-scoring/deploys)

## Update/Change the Scoring Fields

Changing the fields available on website requires little to none coding experience, although some practice with JSON will help. To start go to this link:

> [npoint.io](<https://www.npoint.io/docs/e73f0e42f66d55498c6b>)

Formatting is important so here are a few guidelines to follow:
* The "fields" property is an important header, and should be left alone.
* To create the counter lines follow this format:
	```
	{  
		"name": "[variable safe name]",  
		"displayName": "[dispaly name]",  
		"multiplier": [the value of each point]  
	 }
	 ```
	* **Name:** cannot have any spaces or special characters, stick to your basic letters and numbers for safety
	* **Display Name:** what will be displayed on the website next to the counter. You can use any symbols you want in this field*
	* **Multiplier:** any number +/- including decimals, and will be multiplied by the counter during calculations
		* There is also the option of replacing the multiplier with an array (`[0, 1, 2, 3...]`) which would instead select the corresponding value from the array based on the counter (start with 0 if you wish 0 on the counter to equal 0 points).
* Along with counter lines there is also the option of check boxes setup like this:
	```
	[5, 5, 10, 10, 10, 15, 20, 20, 25, 25, 25, 30, 30, 30, 40, 40, 60]
	```
	* Each number represents an individual checkbox value
		* **DISCLAIMER:** currently adding or removing a value would ruin the formatting, but adjusting values will behave as expected, just don't change the total number of values!
* **Finally:** remember to click save at the top for the changes to take affect. (You may need to refresh the app in order to see the changes)

## Contributors

 - Thanks to Aemelia for the awesome logo design.

#### Contact me with any issues at <ben.weisz13@gmail.com>
