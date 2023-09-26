const AWS = require('aws-sdk');
const qldbSession = new AWS.QLDBSession();

const LEDGER_NAME = 'ElectionLedger';

function executeStatement(statement, parameters = []) {
    return qldbSession.sendCommand({
        SessionToken: /* Session Token here if needed */,
        StartTransaction: {},
        ExecuteStatement: {
            Statement: statement,
            Parameters: parameters.map(value => ({ IonText: JSON.stringify(value) })) // Convert parameters to Ion format
        }
    }).promise();
}

function addToPollingCentre( electionId, partyName, voteCount, officerId, electionDate) {
  let currentTransactionId;
  let currentCommitDigest;
  
  const statement = `
      INSERT INTO pollingCentre 
      VALUE { 'electionId': ?, 'partyName': ?, 'voteCount': ?, 'officerId': ?, 'electionDate': ? }
  `;

  return startTransaction()
      .then(transaction => {
          currentTransactionId = transaction.TransactionId;
          return executeStatement(statement, [electionId, partyName, voteCount, electionDate]);
      })
      .then(response => {
          currentCommitDigest = /* Extract commitDigest from the Ion response */;
          return commitTransaction(currentTransactionId, currentCommitDigest);
      })
      .then(() => {
        console.log("Polling Centre results updated successfully!");
        const wardId = /* Extract wardId from the Ion response */;
        return addToWard(wardId, electionId, partyName, voteCount, officerId, electionDate);
      })
      .catch(error => {
          console.error("Error adding to pollingCentre:", error);
          throw error;
      });
}

function addToWard(wardId, electionId, partyName, voteCount, electionDate) {
  let currentTransactionId;
  let currentCommitDigest;
  
  const statement = `
      UPDATE wards 
      SET result = result + ?
      WHERE wardId = ? AND electionId = ?;
  `;

  return startTransaction()
      .then(transaction => {
          currentTransactionId = transaction.TransactionId;
          return executeStatement(statement, [voteCount, wardId, electionId]);
      })
      .then(response => {
          currentCommitDigest = /* Extract commitDigest from the Ion response */;
          return commitTransaction(currentTransactionId, currentCommitDigest);
      })
      .then(() => {
        console.log("Ward results updated successfully!");
        const lgaId = /* Extract lgaId from the Ion response */;
        return addToLGA(lgaId, electionId, partyName, voteCount, electionDate);
    })
      .catch(error => {
          console.error("Error updating ward:", error);
          throw error;
      });
}

function addToLGA(lgaId, electionId, partyName, voteCount, electionDate) {
  let currentTransactionId;
  let currentCommitDigest;

  const statement = `
      UPDATE lga
      SET result = result + ?
      WHERE lgaId = ? AND electionId = ?;
  `;

  return startTransaction()
      .then(transaction => {
          currentTransactionId = transaction.TransactionId;
          return executeStatement(statement, [voteCount, lgaId, electionId]);
      })
      .then(response => {
          currentCommitDigest = /* Extract commitDigest from the Ion response */;
          return commitTransaction(currentTransactionId, currentCommitDigest);
      })
      .then(() => {
        console.log("LGA results updated successfully!");
        const stateId = /* Extract stateId from the Ion response */;
        return addToState(stateId, electionId, partyName, voteCount, officerId, electionDate);
    })
      .catch(error => {
          console.error("Error updating LGA:", error);
          throw error;
      });
}

function addToState(stateId, electionId, partyName, voteCount, officerId, electionDate) {
  let currentTransactionId;
  let currentCommitDigest;

  const statement = `
      UPDATE states 
      SET result = result + ?
      WHERE stateId = ? AND electionId = ?;
  `;

  return startTransaction()
      .then(transaction => {
          currentTransactionId = transaction.TransactionId;
          
          return executeStatement(statement, [voteCount, stateId, electionId]);
      })
      .then(response => {
          currentCommitDigest = /* Extract commitDigest from the Ion response */;
          return commitTransaction(currentTransactionId, currentCommitDigest);
      })
      .then(() => {
        console.log("State results updated successfully!");
      })
      .then(() => {
        return addToFederal(electionId, partyName, voteCount, electionDate);
      })
      .catch(error => {
          console.error("Error updating state:", error);
          throw error;
      });
}

function addToFederal(electionId, partyName, voteCount, electionDate) {
  let currentTransactionId;
  let currentCommitDigest;

  const statement = `
      UPDATE federal 
      SET result = result + ?
      WHERE electionId = ?;
  `;

  return startTransaction()
      .then(transaction => {
          currentTransactionId = transaction.TransactionId;
          
          return executeStatement(statement, [electionId, partyName, voteCount, electionDate]);
      })
      .then(response => {
          currentCommitDigest = /* Extract commitDigest from the Ion response */;
          
          return commitTransaction(currentTransactionId, currentCommitDigest);
      })
      .then(() => {
          console.log("Federal results updated successfully!");
      })
      .catch(error => {
          console.error("Error updating federal results:", error);
          throw error;
      });
}



function startTransaction() {
    return qldbSession.sendCommand({
        StartTransaction: {}
    }).promise();
}

function commitTransaction(transactionId) {
    return qldbSession.sendCommand({
        CommitTransaction: {
            TransactionId: transactionId,
            CommitDigest: /* Some commit digest value, which is a SHA-256 hash of the transaction payload */
        }
    }).promise();
}

// Usage
addToPollingCentre(electionId, partyName, voteCount, officerId, electionDate)
.then(() => {
    console.log("All updates completed successfully!");
})
.catch(error => {
    console.error("Error in transaction:", error);
    // Handle transaction rollback or compensating actions here
});