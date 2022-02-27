//Importo la clase axios para poder hacer llamadas a otros endpoints
const axios = require("axios");
const { Film } = require('../models/index')
const API_KEY = "210d6a5dd3f16419ce349c9f1b200d6d";
const minMaxRoundedRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}
class FilmClass {
    constructor(){

    };
    clone = async () => {
        let TMDBimgUrlRoot = "https://image.tmdb.org/t/p/original";
        let firstScan = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        let numbOfPagesTMDB = firstScan.data.total_pages
        let numbOfFilmsTMDB = firstScan.data.total_results
        for(let j=1 ; j<=25 ; j++) {
            let resultss = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${minMaxRoundedRandom(1, 25)}&with_watch_monetization_types=flatrate`);
            let numbOfResultsPerPageTMDB = resultss.data.results.length
            for(let i=0; i<numbOfResultsPerPageTMDB ; i++) {
                Film.create({
                    title : resultss.data.results[i].original_title,
                    synopsis : resultss.data.results[i].overview,
                    adult : resultss.data.results[i].adult,
                    popularity : resultss.data.results[i].popularity,
                    image : (TMDBimgUrlRoot + "/" + resultss.data.results[i].poster_path)
                })
            }
        }

        return (`${25} pages have been clonated satisfactorily, with a total amount of ${500} films`)
    };
    register = async (title, synopsis, adult, popularity, image) => {
        return (
            Film.findAll({
            where : {title : title}
            }).then(repeatedFilm => {
                if(repeatedFilm == 0) {
                    return Film.create({
                        title : title,
                        synopsis : synopsis,
                        adult : adult,
                        popularity : popularity,
                        image : image
                    }).then(film => {
                        return (`The film ${film.dataValues.title}, has been registered satisfactorily`);
                    }).catch((error) => {
                        return (error);
                    });
                }else {
                    return (`The film ${repeatedFilm[0].title}, is already registered in the database`);
                }
            })
        )

    // // {
    // //     "title": "El silencio de los corderos",
    // //     "synopsis": "Un tío muy carismático que come personas",
    // //     "adult" : true,
    // //     "popularity": 7.3,
    // //     "image": "stringIMAGE"
    // // }

    };
    deleteAll = async () => {
        return ( 
            Film.destroy({
            where : {},
            truncate : false
            }).then (elmnt => {
                return  (`${elmnt} films have been deleted`)
            })    
        )
    };
    APIgetByTitle = async (title) => {
        let results = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`);

        return(results.data);

    };
    APItopRated = async () => {
        const ratedArr = [];
        for(let i=1 ; i<6 ; i++){
            let results = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${i}`);
            ratedArr.push(results.data)
        }
        return (ratedArr);
    };
    getAmount = async () => {
        let consult = `SELECT COUNT(*) FROM films;`;
        let result = await Film.sequelize.query(consult,{
            type: Film.sequelize.QueryTypes.SELECT});
        if(result){
            let value = result[0]['COUNT(*)']
            if(value > 0) {
                return (`There are ${value} registered films in the database`);
            }else {
                return(`There are not films registered in the database`)
            };
        };
    };
    searchByTerm = async (arg) => {
        let consult = 
            `SELECT * FROM videoclub.films
            WHERE title LIKE '%${arg}%'
            OR synopsis LIKE '%${arg}%'`;
        let result = await Film.sequelize.query(consult,{
            type: Film.sequelize.QueryTypes.SELECT});
        if(result != 0){
           return result
        }else {
            return (`The term ${arg} is not present at films database`)
        }

    };
    APIgetById = async (id) => {
        let results = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)

        return results.data
    };

}








let FilmsController = new FilmClass();
module.exports = FilmsController;