# Back-End-byteTeam

id primary key di tiap table: integer, not null, type: identity, identity: always, increment: 1, start: 1.  

[users]  
| key          | data type | not_null? | unique? | primary_key? | foreign_key |
| ------------ | --------- | --------- | ------- | -----------  | ----------- |
| id           | int       | y         | y       | y            | -           |
| fullname     | varchar   | y         | -       | -            | -           |
| email        | varchar   | y         | y       | -            | -           |
| password     | varchar   | y         | -       | -            | -           |

[user_profile]    
| key          | data type | not_null? | unique? | primary_key? | foreign_key | notes            |
| ------------ | --------- | --------- | ------- | -----------  | ----------- | ---------------- |
| id           | int       | y         | y       | y            | -           | auto-increment   |
| role         | varchar   | y         | -       | -            | -           | admin / customer |
| fullname     | varchar   | y         | -       | -            | -           | -                |
| email        | varchar   | y         | -       | -            | -           | -                |
| phone_number | int       | -         | -       | -            | -           | -                |
| city         | varchar   | -         | -       | -            | -           | -                |
| id_place     | int       | -         | -       | -            | *           | *places.id       |
| post_code    | int       | -         | -       | -            | -           | -                |
| photo        | varchar   | -         | -       | -            | -           | !image external  |
| credit_card  | int       | -         | -       | -            | -           | -                |
| id_user      | int       | -         | -       | *            | *           | ? *users.id      |

[tickets] *create and edit by admin  
| key              | data type         | not_null? | unique? | primary_key? | foreign_key |      notes                    |
| ---------------- | ----------------- | --------- | ------- | -----------  | ----------- | ----------------------------- |
| id               | int               | y         | y       | y            | -           | auto-increment                |
| stock            | int               | y         | -       | -            | -           | -                             |
| id_airline       | int               | y         | -       | -            | *           | *airlines.id                  |
| airline_code     | varchar           | y         | -       | -            | -           | -                             |
| id_from_place    | int               | y         | -       | -            | *           | *places.id                    |
| from_date        | date              | y         | -       | -            | -           | -                             |
| from_time        | time w/ time zone | y         | -       | -            | -           | -                             |
| from_gate        | varchar           | y         | -       | -            | -           | !custom/dummy data            |
| from_terminal    | varchar           | y         | -       | -            | -           | !custom/dummy data            |
| id_to_place      | int               | y         | -       | -            | *           | *places.id                    |
| to_date          | date              | y         | -       | -            | -           | -                             |
| to_time          | time w/ time zone | y         | -       | -            | -           | -                             |
| facilities       | varchar           | -         | -       | -            | -           | [wifi, snack, toilet, luggage, ... |
| price_economy    | int               | -         | -       | -            | -           | -                             |
| price_bussiness  | int               | -         | -       | -            | -           | -                             |
| price_firstclass | int               | -         | -       | -            | -           | -                             |
| class_type       |                   |           |         |              |             | economy/business/firstclass * |

[bookings] *by customer  
| key             | data type | not_null? | unique? | primary_key? | foreign_key | notes                  |
| --------------- | --------- | --------- | ------- | -----------  | ----------- | ---------------------- |
| id_booking      | int       | y         | y       | y            | -           | auto-increment         |
| id_ticket       | int       | y         | -       | -            | *           | tickets.id             |
| total_passanger | int       | y         | -       | -            | -           | -                      |
| total_payment   | int       | y         | -       | -            | -           | -                      |
| id_user         | int       | y         | -       | -            | *           | users.id               |
| status_payment  | varchar   | y         | -       | -            | -           | waiting/issue/boarding |

[ticket_personal]  
| key          | data type | not_null? | unique? | primary_key? | foreign_key | notes              |
| ------------ | --------- | --------- | ------- | -----------  | ----------- | --------------     |
| id           | int       | y         | y       | y            | -           | auto-increment     |
| id_tickets   | int       | y         | -       | -            | *           | tickets.id         |
| title        | varchar   | y         | -       | -            | -           | Mr / Mrs / Ms      |
| fullname     | varchar   | y         | -       | -            | -           | -                  |
| nationality  | int       | y         | -       | -            | -           | !custom/dummy data |

[places]  
| key     | data type | not_null? | unique? | primary_key? | foreign_key | notes              |
| ------- | --------- | --------- | ------- | -----------  | ----------- | ------------------ |
| id      | int       | y         | y       | y            | -           | auto-increment     |
| name    | varchar   | y         | -       | -            | -           | !custom/dummy data |
| country | varchar   | y         | -       | -            | -           | !custom/dummy data |
| photo   | varchar   | -         | -       | -            | -           | ?? !image external |

[airlines]  
| key          | data type | not_null? | unique? | primary_key? | foreign_key | notes              |
| ------------ | --------- | --------- | ------- | -----------  | ----------- | ------------------ |
| id           | int       | y         | y       | y            | -           | auto-increment     |
| name         | varchar   | y         | -       | -            | -           | !custom/dummy data |
| logo         | varchar   | y         | -       | -            | -           | !image external    |
| pic          | varchar   | -         | -       | -            | -           | ?? !image external |
| phone_number | int       | -         | -       | -            | -           | !custom/dummy data |

### syntax create table in database