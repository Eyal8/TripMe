module.exports = function (movieName,year){
    this.movieName = movieName;
    this.year = year;
    this.fullName = function() {
        return this.movieName + "(" + this.year + ")";
    }
};