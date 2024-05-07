import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

import { firebaseConfig } from '@/lib/firebase/secrets';

let adminApp;
if (!admin.apps.length) {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount)
  });
}
const adminAuth = getAuth(adminApp);

export { adminApp, adminAuth };
