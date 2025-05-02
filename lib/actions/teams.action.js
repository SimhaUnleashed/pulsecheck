import { db } from "../../firebase/client";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
  getDoc,
  arrayRemove,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export async function addUserToTeam({ name, teamId, userEmail }) {
  if (!name || !teamId || !userEmail) {
    return {
      success: false,
      message: "name, teamId and userEmail are required.",
    };
  }

  try {
    const teamsRef = collection(db, "teams");
    const userRef = collection(db, "users");
    const q = query(teamsRef, where("teamId", "==", teamId));
    const querySnapshot = await getDocs(q);
    const user = query(userRef, where("email", "==", userEmail))
    const userSnapshot = await getDocs(user);

    if(userSnapshot.empty) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (querySnapshot.empty) {
      return {
        success: false,
        message: "Team not found.",
      };
    }

    // Assuming teamId is unique, use the first match
    const teamDoc = querySnapshot.docs[0];
    const teamDocRef = teamDoc.ref;

    const userDoc = userSnapshot.docs[0];
    const userDocRef = userDoc.ref;

    await updateDoc(teamDocRef, {
      participants: arrayUnion(userEmail),
      participantNames: arrayUnion(name)
    });

    await updateDoc(userDocRef, {
      teamId: teamId,
    });

    return {
      success: true,
      message: `Added ${userEmail} to team ${teamId}.`,
    };
  } catch (error) {
    console.error("Error adding user to team:", error);
    return {
      success: false,
      message: "Failed to add user to team. Please try again.",
    };
  }
}

export async function checkUserInTeam({ teamId, userEmail }) {
  console.log(teamId,userEmail)
  if (!teamId || !userEmail) {
    return {
      success: false,
      message: "teamId and userEmail are required.",
    };
  }

  try {
    const teamsRef = collection(db, "teams");
    const q = query(teamsRef, where("teamId", "==", teamId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: "Team not found.",
      };
    }

    const teamDoc = querySnapshot.docs[0];
    const teamData = teamDoc.data();

    const participants = teamData.participants || [];

    const isMember = participants.includes(userEmail);

    return {
      success: true,
      isMember,
      message: isMember
        ? `${userEmail} is already a participant.`
        : `${userEmail} is not a participant.`,
    };
  } catch (error) {
    console.error("Error checking user in team:", error);
    return {
      success: false,
      message: "Failed to check user in team. Please try again.",
    };
  }
}

const generatedColors = []; // Initialize an empty array to store generated colors

function getRandomColor() {
  let color;
  do {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    color = '#' + n.slice(0, 6).padEnd(6, '0');
  } while (generatedColors.includes(color)); // Check if the color already exists

  generatedColors.push(color);

  return color;
}

export async function fetchTeamUsers(teamId) {
  try {
    const q = query(collection(db, "teams"), where("teamId", "==", teamId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "Team not found." };
    }

    const teamData = querySnapshot.docs[0].data();
    const participants = teamData.participants || [];
    const participantNames = teamData.participantNames || [];

    const users = participants.map((email, index) => ({
      id: uuidv4(),
      name: participantNames?.[index] || "Unknown",
      email,
      color: getRandomColor(),
    }));

    return { success: true, users };
  } catch (error) {
    console.error("Error fetching team users:", error);
    return { success: false, message: "Failed to fetch team data." };
  }
}

export async function createTeam(name,creatorEmail,teamId) {
  try {
    const teamDocRef = doc(collection(db, "teams"), teamId);

    await setDoc(teamDocRef, {
      teamId,
      creator: creatorEmail,
      participants: [creatorEmail],
      participantNames: [name],
      createdAt: new Date().toISOString(),
    });
    const userRef = collection(db, "users");
    const user = query(userRef, where("email", "==", creatorEmail))
    const userSnapshot = await getDocs(user);
    const userDoc = userSnapshot.docs[0];
    const userDocRef = userDoc.ref;
    await updateDoc(userDocRef, {
      teamId: teamId,
    });

    return { success: true, teamId };
  } catch (error) {
    console.error("Error creating team:", error);
    return { success: false, error };
  }
}

export async function clearUserFieldByEmail(email, fieldName) {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No user found with email: ${email}`);
      return { success: false, message: "User not found" };
    }

    const userDoc = querySnapshot.docs[0]; // Assuming email is unique
    await updateDoc(userDoc.ref, { [fieldName]: "" });

    console.log(`${fieldName} cleared for user: ${email}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error };
  }
}

export async function removeParticipant(teamId, email) {
  try {
    const teamRef = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamRef);

    if (!teamSnap.exists()) {
      throw new Error("Team not found");
    }

    const teamData = teamSnap.data();
    const { participants, participantNames } = teamData;

    const indexToRemove = participants.indexOf(email);
    if (indexToRemove === -1) {
      throw new Error("Email not found in participants");
    }

    // Remove email from participants
    await updateDoc(teamRef, {
      participants: arrayRemove(email),
    });

    // Remove the corresponding participant name
    const updatedNames = [...participantNames];
    updatedNames.splice(indexToRemove, 1); // Remove name at the same index

    await updateDoc(teamRef, {
      participantNames: updatedNames,
    });

    // Set teamId to null in users collection
    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("email", "==", email));
    const userSnap = await getDocs(userQuery);

    if (!userSnap.empty) {
      const userDoc = userSnap.docs[0];
      await updateDoc(userDoc.ref, { teamId: null });
    }

    return { success: true };
  } catch (error) {
    console.error("Error removing participant:", error);
    return { success: false, error: error.message };
  }
}