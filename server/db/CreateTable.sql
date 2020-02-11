-- this is a file that runs only one time upon DB installation, in order to create table
USE crm;

-- SELECT clients.id, clients.name, clients.email, clients.first_contact, clients.sold, countries.name as country, owners.name as owner_name, email_type.type as email_type
--     FROM clients, owners, countries, email_type 
--     WHERE clients.owner_id = owners.id
--     AND clients.email_type = email_type.id
--     AND clients.country_id = countries.id

--   Find sales by owners:
--   SELECT owners.name as owner_name, count(clients.name) as num_of_orders
--   FROM clients, owners
--   WHERE clients.owner_id = owners.id AND clients.sold = 1
--   GROUP BY owners.name
--   ORDER BY num_of_orders desc
--   LIMIT 3


--   Find sales by countries:
--   SELECT countries.name as country, count(clients.name) as num_of_orders
--   FROM clients, countries
--   WHERE clients.country_id = countries.id AND clients.sold = 1
--   GROUP BY countries.name
--   ORDER BY num_of_orders desc

--   Find top countries:
  SELECT email_type.type as email_type, count(clients.name) as num_of_orders
  FROM clients, email_type
  WHERE clients.email_type = email_type.id AND clients.sold = 1
  GROUP BY email_type.type
  ORDER BY num_of_orders desc