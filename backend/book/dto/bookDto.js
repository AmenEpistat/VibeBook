export default class BookDto {
    title;
    author;
    genres_id;
    description;
    cover;
    genres;
    _id;
    year_publication;

    constructor(model) {
        this.title = model.title;
        this.author = {
            name: model.author_id?.name || '',
            surname: model.author_id?.surname || '',
            _id: model.author_id?._id || '',
        };
        this.description = model.description;
        this.cover = model.cover;
        this.genres = model.genres_id?.map(genre => ({ name: genre.name, _id: genre._id })) || [];
        this._id = model._id;
        this.year_publication = new Date(model.year_publication).getFullYear();
    }
}