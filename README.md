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
| key          | data type | not_null? | unique? | primary_key? | foreign_key |      notes       |
| ------------ | --------- | --------- | ------- | -----------  | ----------- | ---------------- |
| id           | int       | y         | y       | y            | -           |         -        |
| role         | varchar   | y         | -       | -            | -           | admin / customer |
| fullname     | varchar   | y         | -       | -            | -           |         -        |
| email        | varchar   | y         | -       | -            | -           |         -        |
| phone_number | int       | -         | -       | -            | -           |         -        |
| city         | varchar   | -         | -       | -            | -           |         -        |
| id_place     | int       | -         | -       | -            | *           |    *places.id    |
| post_code    | int       | -         | -       | -            | -           |         -        |
| photo        | varchar   | -         | -       | -            | -           |         -        |
| credit_card  | int       | -         | -       | -            | -           |         -        |
| id_user      | int       | -         | -       | *            | *           |    ? *users.id   |

[tickets] *create and edit by admin  
| key              | data type         | not_null? | unique? | primary_key? | foreign_key |      notes       |
| ------------     | ---------         | --------- | ------- | -----------  | ----------- | ---------------- |
| id               | int               | y         | y       | y            | -           |         -        |
| stock            | int               | y         | -       | -            | -           | admin / customer |
| id_airline       | int               | y         | -       | -            | -           |         -        |
| airline_code     | varchar           | y         | -       | -            | -           |         -        |
| id_from_place    | int               | y         | -       | -            | -           |         -        |
| from_date        | date              | y         | -       | -            | -           |         -        |
| from_time        | time w/ time zone | y         | -       | -            | *           |    *places.id    |
| from_gate        | varchar           | y         | -       | -            | -           |         -        |
| from_terminal    | varchar           | y         | -       | -            | -           |         -        |
| id_to_place      | int               | y         | -       | -            | -           |         -        |
| to_date          | date              | y         | -       | -            | *           |     *users.id    |
| to_time          | time w/ time zone | y         | -       | -            | *           |    *places.id    |
| facilities       | varchar           | -         | -       | -            | -           |         -        |
| price_economy    | int               | -         | -       | -            | -           |         -        |
| price_bussiness  | int               | -         | -       | -            | -           |         -        |
| price_firstclass | int               | -         | -       | -            | *           |     *users.id    |
id					                                	int, not null, primary key  
stock					                              	int, not null  
id_airline (REL: airlines.id)		            	int, not null  
airline_code				                        	varchar, not null  
id_from_place (REL: places.id)		          	int, not null  
from_date				                            	date, not null  
from_time				                            	time w/ time zone, not null  
from_gate [ ... ]			                      	varchar, not null  
from_terminal [ ... ]			                  	varchar, not null  
id_to_place (REL: places.id)	            		int, not null  
to_date						                            date, not null  
to_time						                            time w/ time zone, not null  
facilities [ wifi~snack~toilet~luggage~... ]	varchar  
price_economy				                        	int  
price_bussiness				                      	int  
price_firstclass			                      	int  

[bookings] *by customer  
id					                                 	int, not null, primary key  
id_user (REL: users.id)			                 	int, not null  
id_ticket (REL: tickets.id)		               	int, not null  
adult_quant				                           	int, not null  
child_quant ***min. w/ 1 adult		          	int  
class_type [ economy/business/firstclass ]	  varchar, not null  
payment_status [ waiting/canceled/purchased ]	varchar, not null  

[ticket_personal]  
id				                    int, not null, primary key  
id_tickets (REL: tickets.id)	int, not null  
title [Mr./Mrs./Ms.]	      	varchar, not null  
fullname			                varchar, not null  
nationality [ ... ]	        	int, not null  

[places]  
id 		            int, not null, primary key  
name [ ... ]	    varchar, not null  
country [ ... ]	  varchar, not null  
photo (~image)	  varchar  

[airlines]  
id 		          int, not null, primary key  
name [ ... ]	  varchar, not null  
logo (~image)	  varchar, not null  
pic (~image)	  varchar  
phone_number	  int  