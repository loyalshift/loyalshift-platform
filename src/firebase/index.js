const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize the Firebase Admin SDK to access Firestore and Auth.
admin.initializeApp();

/**
 * Compares two arrays of strings to see if they contain the same elements,
 * regardless of order.
 * @param {string[]} arr1 The first array.
 * @param {string[]} arr2 The second array.
 * @returns {boolean} True if the arrays are equal, false otherwise.
 */
const areRolesEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

/**
 * Triggered when a partner document is updated in Firestore.
 * This function syncs the 'roles' array from the document to the user's
 * custom authentication claims.
 */
exports.syncRolesToCustomClaims = functions.firestore
  .document("partners/{partnerId}")
  .onUpdate(async (change, context) => {
    const { partnerId } = context.params;
    console.log(`Triggered syncRolesToCustomClaims for partner: ${partnerId}`);

    const beforeData = change.before.data() || {};
    const afterData = change.after.data() || {};

    const beforeRoles = beforeData.roles || [];
    const afterRoles = afterData.roles || [];

    // Exit early if the roles have not changed to prevent unnecessary updates.
    if (areRolesEqual(beforeRoles, afterRoles)) {
      console.log(`Roles for ${partnerId} have not changed. Exiting function.`);
      return null;
    }

    // The nonce ensures that the token is refreshed on the client-side.
    // A simple timestamp is effective for this purpose.
    const nonce = new Date().getTime().toString();
    const claims = {
      roles: afterRoles,
      nonce: nonce,
    };

    try {
      // Apply the new roles and nonce as custom claims to the user.
      await admin.auth().setCustomUserClaims(partnerId, claims);
      console.log(
        `Successfully set custom claims for ${partnerId}:`,
        JSON.stringify(claims)
      );
    } catch (error) {
      console.error(
        `Error setting custom claims for partner ${partnerId}:`,
        error
      );
      // Re-throwing the error ensures the function execution is marked as a failure.
      throw new functions.https.HttpsError(
        "internal",
        "Failed to set custom claims."
      );
    }

    return null;
  });
