declare module "iron-session" {
  interface IronSessionData {
    nonce?: string
    siwe?: {
      address: string
    }
  }
}

export {}
