function Movies(input) {
    let movies = [];

    for (const line of input) {
        let cmd = line.split(" ");
        
        if (line.includes("addMovie")) {
            let movie = cmd.slice(1).join(" ");
            addMovie(movie);
        }
        else if (line.includes("directedBy")) {
            let index = cmd.indexOf("directedBy");
            let movie = cmd.slice(0, index).join(" ");
            let director = cmd.slice(index + 1).join(" ");
            addDirector(movie, director);
        }
        else {
            let index = cmd.indexOf("onDate");
            let movie = cmd.slice(0, index).join(" ");
            let date = cmd.slice(index + 1).join(" ");
            addDate(movie, date);
        }
    }

    for (const movie of movies) {
        if (movie.hasOwnProperty("name") && movie.hasOwnProperty("director") && movie.hasOwnProperty("date")) {
            console.log(JSON.stringify(movie));
        }    
    }

    function addMovie(name) {
        movies.push({name});
    }

    function addDirector(name, director) {
        let movie = movies.find(m => m.name === name);
        if (movie) {
            movie.director = director;
        }
    }

    function addDate(name, date) {
        let movie = movies.find(m => m.name === name);
        if (movie) {
            movie.date = date;
        }
    }
}

Movies([
'addMovie Fast and Furious',
'addMovie Godfather',
'Inception directedBy Christopher Nolan',
'Godfather directedBy Francis Ford Coppola',
'Godfather onDate 29.07.2018',
'Fast and Furious onDate 30.07.2018',
'Batman onDate 01.08.2018',
'Fast and Furious directedBy Rob Cohen'
]
);