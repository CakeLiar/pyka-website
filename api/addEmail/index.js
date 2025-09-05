const admin = require('firebase-admin');
require('dotenv').config(); // for environment

// Import credentials from environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

// Email validation regex
function isValidEmail(email) {
  return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

// Allowed origins for CORS
const allowedOrigins = [
  'https://polite-hill-068b7010f.2.azurestaticapps.net',
  'https://pyka.boo',
  'https://www.pyka.boo'
];

// Set CORS headers helper (dynamic origin)
function setCORSHeaders(res, req) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.headers = {
      ...res.headers,
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  } else {
    res.headers = {
      ...res.headers,
      // No CORS header if not allowed
    };
  }
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

module.exports = async function (context, req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    let headers = {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (allowedOrigins.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
    }
    context.res = {
      status: 200,
      headers,
      body: ''
    };
    return;
  }

  console.log('[WAITLIST] Received request:', req.body);
  console.log('trying with configs: ');
  console.log(process.env.FIREBASE_DATABASE_URL);

  const email = req.body?.email;
  if (!email || !isValidEmail(email)) {
    console.log('[WAITLIST] Invalid email:', email);
    context.res = {
      status: 400,
      body: { error: 'Invalid email' }
    };
    setCORSHeaders(context.res, req);
    return;
  }

  try {
    // Add email to waitlist in Firestore using email as document ID
    const db = admin.firestore();
    const docRef = db.collection('waitlist').doc(email);
    await docRef.set({ email });

    console.log('[WAITLIST] Successfully added email:', email);
    console.log('[WAITLIST] Firestore document reference: ', email);
    context.res = { status: 200, body: { success: true }, headers: {} };
    setCORSHeaders(context.res, req);
  } catch (err) {
    console.error('[WAITLIST] Error adding email:', err);
    context.res = { status: 500, body: { error: 'Failed to add email' }, headers: {} };
    setCORSHeaders(context.res, req);
  }
};
