using {sap.capire.bookshop as bookshop} from '../db/schema';

service BookShopService {

    entity Books   as projection on bookshop.Books;

    entity Authors as projection on bookshop.Authors;

    entity Genres  as projection on bookshop.Genres;

}
