export default class BookDto {
    title;
    author;
    description;
    cover;
    genres;
    _id;

    constructor(model) {
        this.title = model.title;
        this.author = {
            name: model.author_id?.name || '',
            surname: model.author_id?.surname || ''
        };
        this.description = model.description;
        this.cover = model.cover;
        this.genres = model.genres_id?.map(genre => ({ name: genre.name })) || [];
        this._id = model._id;
    }
}