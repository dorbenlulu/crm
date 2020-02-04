-- this is a file that runs only one time upon DB installation, in order to create table
USE crm;

SELECT clients.id, clients.name, clients.email, clients.first_contact, clients.sold, countries.name as country, owners.name as owner_name, email_type.type as email_type
    FROM clients, owners, countries, email_type 
    WHERE clients.owner_id = owners.id
    AND clients.email_type = email_type.id
    AND clients.country_id = countries.id