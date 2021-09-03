import { firestore, store } from "./client";
export default async function isAdmin(email: string): Promise<boolean> {
  const adminQuery = firestore.query(
    firestore.collection(store, "admins"),
    firestore.where("email", "==", email)
  );
  const admin = await firestore.getDocs(adminQuery);
  return !admin.empty;
}
