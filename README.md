# back-end-byteteam

### ENV EXAMPLE
USER: "postgres"
HOST: "localhost"
DATABASE: "byte-ticketing"
PASSWORD: "*****"  // password local postgres masing masing
PORT: "5432" // port postgres
API_PORT: "8000" // port rest api / backend
JWT_KEY: "byte"
JWT_ALG: "HS256"

PASSWORD: ~ password di postgres local masing masing
PORT: ~ port postgres
API_PORT: ~ port rest api / backend
buat database "byte-ticketing" di postgres local masing masing

### POSTGRES DATABASE :
databases: 	byte-ticketing
owner: 		postgres
port: 		5432
password: 	**

id: integer, not null, type: identity, identity: always, increment: 1, start: 1.

:::users:::
id		    int, not null, primary key
fullname	varchar, not null
email		  varchar, not null
password	varchar, not null

:::user_profile:::
id				                int, not null, primary key
role (admin/customer)		  varchar, not null
fullname			            varchar, not null
password          			  varchar, not null
phone_number			        int
city          			    	varchar
id_place (REL: places.id)	int
post_code			            int
photo (~image)			      varchar
credit_card		          	int
id_user (REL: users.id)		int

:::tickets::: ***create and edit by admin
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

:::bookings::: ***by customer
id					                                 	int, not null, primary key
id_user (REL: users.id)			                 	int, not null
id_ticket (REL: tickets.id)		               	int, not null
adult_quant				                           	int, not null
child_quant ***min. w/ 1 adult		          	int
class_type [ economy/business/firstclass ]	  varchar, not null
payment_status [ waiting/canceled/purchased ]	varchar, not null

:::ticket_personal:::
id				                    int, not null, primary key
id_tickets (REL: tickets.id)	int, not null
title [Mr./Mrs./Ms.]	      	varchar, not null
fullname			                varchar, not null
nationality [ ... ]	        	int, not null

:::places:::
id 		            int, not null, primary key
name [ ... ]	    varchar, not null
country [ ... ]	  varchar, not null
photo (~image)	  varchar

:::airlines:::
id 		          int, not null, primary key
name [ ... ]	  varchar, not null
logo (~image)	  varchar, not null
pic (~image)	  varchar
phone_number	  int