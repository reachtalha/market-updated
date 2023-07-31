import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

import serviceAccount from '@/lib/firebase/secrets.json';

let adminApp;
if (!admin.apps.length) {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}
const adminAuth = getAuth(adminApp);

export { adminApp, adminAuth };
