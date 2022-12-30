using {sap.capire.bookshop as bookshop} from '../db/schema';

service BookShopService {
    entity Books @(restrict : [
        {
            grant : ['READ'],
            to    : ['BooksViewer']
        },
        {
            grant : ['*'],
            to    : ['BooksManager']
        }
    ]) as projection on bookshop.Books;

    entity Authors @(restrict : [
        {
            grant : ['READ'],
            to    : ['BooksViewer']
        },
        {
            grant : ['*'],
            to    : ['BooksManager']
        }
    ]) as projection on bookshop.Authors;

    entity Genres @(restrict : [
        {
            grant : ['READ'],
            to    : ['BooksViewer']
        },
        {
            grant : ['*'],
            to    : ['BooksManager']
        }
    ]) as projection on bookshop.Genres;

}
