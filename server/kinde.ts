import {createKindeServerClient, GrantType, type SessionManager} from "@kinde-oss/kinde-typescript-sdk";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_ISSUER_URL!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: process.env.KINDE_SITE_URL!,
  logoutRedirectURL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL!,
});

let store: Record<string, unknown> = {};

export const sessionManager: SessionManager = {
  async getSessionItem(key: string) {
    return store[key];
  },
  async setSessionItem(key: string, value: unknown) {
    store[key] = value;
  },
  async removeSessionItem(key: string) {
    delete store[key];
  },
  async destroySession() {
    store = {};
  }
};