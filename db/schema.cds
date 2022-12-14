using {
    Currency,
    managed,
    sap
} from '@sap/cds/common';

namespace sap.capire.bookshop;

entity Books : managed {
    key ID           : Integer;
        title        : String(65) @title : 'Title';
        price        : Integer    @title : 'Price';
        descr        : String(65);
        autor_ID     : Integer;
        stock        : Integer;
        genre_ID     : Integer;
}

entity Authors : managed {
    key ID           : Integer;
        name         : String(65);
        price        : Integer;
        supplier     : String(65);
        workSince    : Date;
        remains      : Integer;
        availability : String(24);
}

entity Genres : managed {
    key ID           : Integer;
        name         : String(65);
        price        : Integer;
        supplier     : String(65);
        workSince    : Date;
        remains      : Integer;
        availability : String(24);
}
