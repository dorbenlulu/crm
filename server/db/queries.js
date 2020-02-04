// const Connection = require('tedious').Connection
// const Request = require('tedious').Request
// const TYPES = require('tedious').TYPES
// const config = require('../../../../../Vicki's Home Assignment/bThere-home-assignment/server/config/config')

// const connection = new Connection(config.db)
// const data = require("./data");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:123456@localhost/crm");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

exports.getOwnerIdByName = async ownerName => {
  const getOwnerIdQuery = `
        SELECT id 
        FROM owners
        Where name = "${ownerName}"`;

  try {
    const result = await sequelize.query(getOwnerIdQuery);
    const ownerId = result[0][0].id;
    console.log(`In getOwnerIdByName(): owner is `, ownerId);
    return ownerId;
  } catch (err) {
    console.log(`In getOwnerIdByName(): error is `, err);
    throw err;
  }
};

exports.updateOwnerInClient = async (clientId, newOwnerId) => {
  const updateOwnerInClientQuery = `
    UPDATE clients
    SET owner_id = ${newOwnerId}
    WHERE id = ${clientId};
    `;

  try {
    const result = await sequelize.query(updateOwnerInClientQuery);
    console.log(`In updateOwnerInClient(): result is `, result);
    return result;
  } catch (err) {
    console.log(`In updateOwnerInClient(): error is `, err);
    throw err;
  }
};

exports.getEmailTypeId = async emailTypeToUpdate => {
  const getOwnerIdQuery = `
    SELECT id 
    FROM email_type
    Where type = "${emailTypeToUpdate}"`;

  try {
    const result = await sequelize.query(getOwnerIdQuery);
    const emailTypeId = result[0][0].id;
    console.log(`In getEmailTypeId(): emailTypeId is `, emailTypeId);
    return emailTypeId;
  } catch (err) {
    console.log(`In getEmailTypeId(): error is `, err);
    throw err;
  }
};

exports.updateEmailTypeInClient = async (clientId, emailTypeId) => {
    const updateEmailTypeInClientQuery = `
      UPDATE clients
      SET email_type = ${emailTypeId}
      WHERE id = ${clientId};
      `;
  
    try {
      const result = await sequelize.query(updateEmailTypeInClientQuery);
      console.log(`In updateEmailTypeInClient(): result is `, result);
      return result;
    } catch (err) {
      console.log(`In updateEmailTypeInClient(): error is `, err);
      throw err;
    }
  };

  exports.setSoldInClient = async (clientId, isSold) => {
    const setSoldInClientQuery = `
      UPDATE clients
      SET sold = ${isSold}
      WHERE id = ${clientId};
      `;
  
    try {
      const result = await sequelize.query(setSoldInClientQuery);
      console.log(`In setSoldInClient(): result is `, result);
      return result;
    } catch (err) {
      console.log(`In setSoldInClient(): error is `, err);
      throw err;
    }
  };

  exports.getAllClientsFromDb = async () => {
    const getAllClientsQuery = `
    SELECT clients.id, clients.name, clients.email, clients.first_contact as firstContact, clients.sold, countries.name as country, owners.name as owner, email_type.type as emailType
    FROM clients, owners, countries, email_type 
    WHERE clients.owner_id = owners.id
    AND clients.email_type = email_type.id
    AND clients.country_id = countries.id`;
  
    try {
      const result = await sequelize.query(getAllClientsQuery);
      console.log(`In getAllClientsFromDb(): result is `, result[0]);
      return result[0];
    } catch (err) {
      console.log(`In getAllClientsFromDb(): error is `, err);
      throw err;
    }
  };

  exports.getAllOwnersFromDb = async () => {
    const getAllOwnersQuery = `
    SELECT name
    FROM owners`;
  
    try {
      const result = await sequelize.query(getAllOwnersQuery);
      console.log(`In getAllOwnersFromDb(): result is `, result[0]);
      return result[0];
    } catch (err) {
      console.log(`In getAllOwnersFromDb(): error is `, err);
      throw err;
    }
  };


/***************************************************************************************/

exports.findClientById = async userId => {
  const findClientQuery = `
        SELECT * 
        FROM clients
        Where id = ${userId}`;

  const client = await sequelize.query(findClientQuery);
  console.log(`In findClientById(): client is `, client[0][0]);
};

exports.insert = function(url, description) {
  const request = new Request(
    `INSERT INTO ImgSchema.Images (url, description) OUTPUT INSERTED.Id VALUES ('${url}', '${description}');`,

    function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) inserted");
      }
    }
  );

  request.addParameter("url", TYPES.NVarChar, url);
  request.addParameter("description", TYPES.NVarChar, description);

  connection.execSql(request);
};

exports.getData = function(callback) {
  const request = new Request(
    `SELECT url, description FROM ImgSchema.Images;`,

    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) returned");
      }
    }
  );

  const newResults = [];

  request.on("row", function(columns) {
    let results = [];
    columns.forEach(function(column) {
      results.push({
        col: column.metadata.colName,
        val: column.value
      });
    });

    let url = "";
    let desc = "";
    for (let i = 0; i < results.length; i++) {
      if (i % 2 == 0) {
        url = results[i]["val"];
      } else {
        desc = results[i]["val"];
        newResults.push({ url, desc });
      }
    }
  });

  request.on("doneProc", (rowCount, more, rows) => {
    callback(newResults);
  });

  connection.execSql(request);
};
