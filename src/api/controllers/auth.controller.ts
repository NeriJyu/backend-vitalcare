import AuthService from "../services/auth.service";

export default class AuthController {
  private authService = new AuthService();

  constructor() {}

  signIn(email: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await this.authService.signIn(email, password);

        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }
}
