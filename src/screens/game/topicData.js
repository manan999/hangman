const f1 = (num) => {
	if(num < 10)
		return {startTime : 60, initGuess : ['a','e','i','o','u']} ;
	else if(num < 20)
		return {startTime : 50, initGuess : ['a','e','i','o']} ;
	else if(num < 30)
		return {startTime : 40, initGuess : ['a','e','i']} ;
	else if(num < 40)
		return {startTime : 30, initGuess : ['a','e']} ;
	else if(num < 50)
		return {startTime : 20, initGuess : ['a']} ;
	else
		return {startTime : 15, initGuess : []} ;
}

const f2 = (num) => {
	if(num < 10)
		return {startTime : 60, initGuess : ['a','e','i','o','u']} ;
	else if(num < 20)
		return {startTime : 50, initGuess : ['a','e','i','o']} ;
	else if(num < 30)
		return {startTime : 40, initGuess : ['a','e','i']} ;
	else if(num < 35)
		return {startTime : 30, initGuess : ['a','e']} ;
	else if(num < 40)
		return {startTime : 20, initGuess : ['a']} ;
	else
		return {startTime : 15, initGuess : []} ;
}

const topicData = {f1, f2} ;

export {topicData} ;