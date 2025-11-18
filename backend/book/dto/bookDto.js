export default class BookDto {
    title;
    author;
    description;
    image_path;
    genres;

    constructor(model) {
        this.title = model.title;
        this.author = {
            name: model.author_id?.name || '',
            surname: model.author_id?.surname || ''
        };
        this.description = model.description;
        this.image_path = model.image_path;
        this.genres = model.genres_id?.map(genre => ({ name: genre.name })) || [];
    }
}